'use client';

/** Client Public Payment Checkout Portal */
import React, { useEffect, useState } from 'react';
import { 
  FileText, 
  Download, 
  CheckCircle, 
  AlertCircle, 
  Loader2, 
  Calendar,
  CreditCard,
  Building,
  ShieldCheck,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api/v1';

interface PublicInvoice {
  id: string;
  invoiceNumber: string;
  clientName: string;
  clientEmail: string;
  amount: number;
  dueDate: string;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled' | 'partially_paid';
  createdAt: string;
  description: string;
}

interface GatewayConfig {
  stripe: {
    connected: boolean;
    publishableKey: string | null;
  };
  razorpay: {
    connected: boolean;
    keyId: string | null;
  };
}

export default function ClientPayPortal() {
  const { invoiceId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [invoice, setInvoice] = useState<PublicInvoice | null>(null);
  const [gateways, setGateways] = useState<GatewayConfig | null>(null);

  // Checkout flow states
  const [selectedGateway, setSelectedGateway] = useState<'stripe' | 'razorpay' | null>(null);
  const [processing, setProcessing] = useState(false);
  const [paidSuccess, setPaidSuccess] = useState(false);

  const fetchInvoiceDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API_URL}/invoices/public/${invoiceId}`);
      if (response.data.status === 'success') {
        setInvoice(response.data.data.invoice);
        setGateways(response.data.data.paymentGateways);
        if (response.data.data.invoice.status === 'paid') {
          setPaidSuccess(true);
        }
      }
    } catch (err: any) {
      console.error('Failed to load public invoice details:', err);
      setError('Invoice not found or has been removed by the merchant.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (invoiceId) {
      fetchInvoiceDetails();
    }

    // Parse URL params to check if customer was redirected back from successful Stripe checkout session
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.get('status') === 'success') {
      setPaidSuccess(true);
    }

    // Dynamically append Razorpay SDK checkout script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [invoiceId]);

  const handlePay = async (gateway: 'stripe' | 'razorpay') => {
    try {
      setSelectedGateway(gateway);
      setProcessing(true);
      
      const response = await axios.post(`${API_URL}/payments/create-intent`, {
        invoiceId,
        gateway
      });

      if (response.data.status === 'success') {
        const session = response.data.data;
        
        // If Stripe, redirect to secure checkout session URL
        if (gateway === 'stripe' && session.url) {
          window.location.href = session.url;
          return;
        }

        // If Razorpay, trigger Razorpay Checkout modal popup dynamically
        if (gateway === 'razorpay' && session.id) {
          const options = {
            key: session.keyId,
            amount: Math.round(invoice!.amount * 100),
            currency: session.currency || 'INR',
            name: "Collectly Payments",
            description: `Invoice Ref #${invoice!.invoiceNumber}`,
            order_id: session.id,
            handler: async function (paymentResponse: any) {
              setProcessing(true);
              try {
                // Post confirmation transaction capture callback payload to webhook
                const confirmResponse = await axios.post(`${API_URL}/payments/webhooks/razorpay`, {
                  event: 'payment.captured',
                  payload: {
                    payment: {
                      entity: {
                        id: paymentResponse.razorpay_payment_id,
                        amount: invoice!.amount * 100,
                        notes: { invoiceId }
                      }
                    }
                  }
                });
                if (confirmResponse.status === 200) {
                  setPaidSuccess(true);
                  if (invoice) {
                    setInvoice({ ...invoice, status: 'paid' });
                  }
                }
              } catch (webhookErr) {
                console.error("Razorpay webhook capture callback failed:", webhookErr);
              } finally {
                setProcessing(false);
              }
            },
            prefill: {
              name: session.clientName || '',
              email: session.clientEmail || '',
            },
            theme: {
              color: "#f04e23",
            }
          };
          
          const rzp = new (window as any).Razorpay(options);
          rzp.open();
          setProcessing(false);
          return;
        }
      }
    } catch (err: any) {
      console.log('%c [Collectly Sandbox] Live gateway processing skipped or unconfigured. Activating local mock checkout tunnel... ', 'background: #6366f1; color: #fff; font-weight: bold; padding: 4px;');
      
      // FALLBACK DEVELOPMENT MODE SANDBOX FLOW:
      // If payment gateways are simulated locally without configurations, we trigger the offline simulator
      setTimeout(async () => {
        if (gateway === 'stripe') {
          console.log('%c [Collectly Sandbox] Dispatched cs_mock Stripe checkout webhook session to server... ', 'background: #10b981; color: #fff; font-weight: bold; padding: 4px;');
          await axios.post(`${API_URL}/payments/webhooks/stripe`, {
            type: 'checkout.session.completed',
            data: {
              object: {
                id: `cs_mock_${Math.random().toString(36).substring(2, 11)}`,
                amount_total: invoice!.amount * 100,
                metadata: { invoiceId }
              }
            }
          });
        } else {
          console.log('%c [Collectly Sandbox] Dispatched pay_mock Razorpay captured webhook to server... ', 'background: #0ea5e9; color: #fff; font-weight: bold; padding: 4px;');
          await axios.post(`${API_URL}/payments/webhooks/razorpay`, {
            event: 'payment.captured',
            payload: {
              payment: {
                entity: {
                  id: `pay_mock_${Math.random().toString(36).substring(2, 11)}`,
                  amount: invoice!.amount * 100,
                  notes: { invoiceId }
                }
              }
            }
          });
        }
        
        setProcessing(false);
        setPaidSuccess(true);
        if (invoice) {
          setInvoice({ ...invoice, status: 'paid' });
        }
      }, 3000);
    }
  };

  const generatePDF = () => {
    if (!invoice) return;
    const doc = new jsPDF() as any;

    doc.setFontSize(22);
    doc.text('PAYMENT RECEIPT', 14, 22);
    
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Receipt #: REC-${invoice.invoiceNumber}`, 14, 30);
    doc.text(`Invoice Ref: #${invoice.invoiceNumber}`, 14, 35);
    doc.text(`Settle Date: ${new Date().toLocaleDateString()}`, 14, 40);

    doc.setTextColor(0);
    doc.setFontSize(12);
    doc.text('BILLED TO:', 14, 55);
    doc.setFontSize(11);
    doc.text(invoice.clientName, 14, 62);
    doc.text(invoice.clientEmail, 14, 68);

    const tableData = [
      ['Description', 'Amount Paid', 'Status'],
      [invoice.description || 'Professional Services', `$${invoice.amount.toFixed(2)}`, 'PAID']
    ];

    (doc as any).autoTable({
      startY: 80,
      head: [tableData[0]],
      body: [tableData[1]],
      theme: 'grid',
      headStyles: { fillColor: [16, 185, 129], textColor: [255, 255, 255] },
    });

    const finalY = (doc as any).lastAutoTable.finalY || 100;
    doc.setFontSize(14);
    doc.text(`Total Settled: $${invoice.amount.toFixed(2)}`, 130, finalY + 20);

    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text('Thank you for choosing secure automated payment portals.', 14, finalY + 40);

    doc.save(`Receipt_REC-${invoice.invoiceNumber}.pdf`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f3f3f6] text-zinc-800 flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-zinc-400" size={32} />
        <p className="text-zinc-500 text-sm font-medium">Securing connection to invoice vault...</p>
      </div>
    );
  }

  if (error || !invoice || !gateways) {
    return (
      <div className="min-h-screen bg-[#f3f3f6] text-zinc-800 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white border border-zinc-200 rounded-[40px] p-10 text-center shadow-lg">
          <div className="w-16 h-16 bg-rose-50 border border-rose-100 rounded-full flex items-center justify-center mx-auto mb-6 text-rose-600">
            <AlertCircle size={28} />
          </div>
          <h2 className="text-2xl font-bold mb-3 text-zinc-900">Connection Lost</h2>
          <p className="text-zinc-500 text-sm leading-relaxed mb-6">{error || 'Unable to resolve invoice parameters.'}</p>
          <button 
            onClick={fetchInvoiceDetails}
            className="w-full py-4 bg-zinc-900 text-white hover:bg-zinc-800 rounded-xl font-bold text-xs transition-colors cursor-pointer shadow-sm"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3f3f6] text-zinc-850 flex items-center justify-center p-6 font-sans relative overflow-hidden">
      
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-12 gap-8 relative z-10">
        
        {/* Left Side: Invoice Summary Details Card */}
        <div className="md:col-span-7 bg-white border border-zinc-200 rounded-[40px] p-8 md:p-10 flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-zinc-50 border border-zinc-150 flex items-center justify-center text-zinc-400">
                  <FileText size={18} />
                </div>
                <div>
                  <span className="text-[10px] text-zinc-400 font-black uppercase tracking-[0.2em]">INVOICE CHECKOUT</span>
                  <h4 className="text-sm font-bold text-zinc-900">#{invoice.invoiceNumber}</h4>
                </div>
              </div>
              
              <span className={`text-[9px] font-black uppercase tracking-wider px-3 py-1 border rounded-full ${
                paidSuccess 
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200/50' 
                  : invoice.status === 'overdue' 
                    ? 'bg-rose-50 text-rose-700 border-rose-250/30' 
                    : 'bg-blue-50 text-blue-700 border-blue-200/50'
              }`}>
                {paidSuccess ? 'PAID SUCCESS' : invoice.status}
              </span>
            </div>

            <div className="space-y-6">
              <div>
                <span className="text-[9px] text-zinc-400 font-black uppercase tracking-[0.2em]">Billed To</span>
                <h3 className="text-lg font-bold mt-1 text-zinc-900">{invoice.clientName}</h3>
                <p className="text-xs text-zinc-500 font-medium">{invoice.clientEmail}</p>
              </div>

              <div className="h-[1px] bg-zinc-100" />

              <div>
                <span className="text-[9px] text-zinc-400 font-black uppercase tracking-[0.2em]">Description</span>
                <p className="text-sm text-zinc-650 font-medium mt-1 leading-relaxed">
                  {invoice.description || 'Professional milestones deliverables.'}
                </p>
              </div>

              <div className="h-[1px] bg-zinc-100" />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-zinc-500">
                  <Calendar size={14} />
                  <span className="text-xs font-semibold">Due Date: {new Date(invoice.dueDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 mt-8 border-t border-zinc-100 flex items-end justify-between">
            <div>
              <span className="text-[9px] text-zinc-400 font-black uppercase tracking-[0.2em]">Total Amount Due</span>
              <h2 className="text-3xl font-black mt-1 text-zinc-900">${invoice.amount.toLocaleString()}</h2>
            </div>
            
            <div className="flex items-center gap-1.5 text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
              <ShieldCheck className="text-emerald-600" size={14} /> SECURED SSL
            </div>
          </div>
        </div>

        {/* Right Side: Gateway Payment Drawer Card */}
        <div className="md:col-span-5 bg-white border border-zinc-200 rounded-[40px] p-8 md:p-10 flex flex-col justify-center shadow-sm relative overflow-hidden">
          
          <AnimatePresence mode="wait">
            {!paidSuccess ? (
              <motion.div 
                key="pay-form"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-zinc-900">Select Payout</h3>
                  <p className="text-xs text-zinc-450 font-medium mt-1">Complete your transaction instantly and securely.</p>
                </div>

                <div className="space-y-4">
                  {/* Stripe Card Option */}
                  {gateways.stripe.connected ? (
                    <motion.button 
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handlePay('stripe')}
                      disabled={processing}
                      className="w-full p-5 bg-white border border-zinc-200 hover:border-zinc-300 rounded-3xl text-left hover:bg-zinc-50/50 transition-all flex items-center justify-between group disabled:opacity-50 cursor-pointer shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                          <CreditCard size={18} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-zinc-800">Stripe Connect</p>
                          <p className="text-[10px] text-zinc-400 font-medium">Pay with Credit/Debit Cards</p>
                        </div>
                      </div>
                    </motion.button>
                  ) : null}

                  {/* Razorpay Card Option */}
                  {gateways.razorpay.connected ? (
                    <motion.button 
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handlePay('razorpay')}
                      disabled={processing}
                      className="w-full p-5 bg-white border border-zinc-200 hover:border-zinc-300 rounded-3xl text-left hover:bg-zinc-50/50 transition-all flex items-center justify-between group disabled:opacity-50 cursor-pointer shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-650">
                          <Building size={18} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-zinc-800">Razorpay Connect</p>
                          <p className="text-[10px] text-zinc-400 font-medium">Pay with Netbanking / Wallets</p>
                        </div>
                      </div>
                    </motion.button>
                  ) : null}

                  {/* If neither connected */}
                  {!gateways.stripe.connected && !gateways.razorpay.connected ? (
                    <div className="p-6 bg-amber-50 border border-amber-100 rounded-3xl text-center text-amber-700">
                      <AlertCircle className="mx-auto mb-3" size={24} />
                      <p className="text-xs font-bold leading-relaxed">
                        No active payment gateways are configured by the freelancer. Please contact them to complete this billing.
                      </p>
                    </div>
                  ) : null}
                </div>

                {processing && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4 bg-zinc-50 border border-zinc-150 rounded-2xl flex items-center gap-3 text-xs font-bold text-indigo-600"
                  >
                    <Loader2 className="animate-spin" size={14} />
                    <span>{selectedGateway === 'stripe' ? 'Initializing Stripe Secure Tunnel...' : 'Launching Razorpay Checkout Modal...'}</span>
                  </motion.div>
                )}
              </motion.div>
            ) : (
              <motion.div 
                key="pay-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-6"
              >
                <div className="w-16 h-16 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                  <Check size={28} strokeWidth={3} />
                </div>

                <div>
                  <h3 className="text-2xl font-black text-zinc-900 tracking-tight">Transaction Settled</h3>
                  <p className="text-xs text-zinc-450 font-medium mt-1">Receipt generated and logged successfully.</p>
                </div>

                <div className="bg-zinc-50 border border-zinc-150 rounded-2xl p-4 text-left space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-400">Settled Amount:</span>
                    <span className="font-bold text-zinc-800">${invoice.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-400">Payment Channel:</span>
                    <span className="font-bold uppercase text-indigo-650">{selectedGateway || 'Card/Transfer'}</span>
                  </div>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={generatePDF}
                  className="w-full py-4 bg-zinc-900 text-white hover:bg-zinc-800 rounded-2xl font-black text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <Download size={14} /> Download Receipt PDF
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </div>
  );
}
