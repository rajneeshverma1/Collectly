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
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);

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
        setCheckoutUrl(session.url);
        
        // Simulating the secure gateway checkout redirect
        setTimeout(async () => {
          // Send checkout success capture trigger to webhook
          if (gateway === 'stripe') {
            await axios.post(`${API_URL}/payments/webhooks/stripe`, {
              type: 'checkout.session.completed',
              data: {
                object: {
                  id: session.id,
                  amount_total: invoice!.amount * 100,
                  metadata: { invoiceId }
                }
              }
            });
          } else {
            await axios.post(`${API_URL}/payments/webhooks/razorpay`, {
              event: 'payment.captured',
              payload: {
                payment: {
                  entity: {
                    id: session.id,
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
    } catch (err) {
      console.error('Gateway processing failed:', err);
      setProcessing(false);
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

    doc.autoTable({
      startY: 80,
      head: [tableData[0]],
      body: [tableData[1]],
      theme: 'grid',
      headStyles: { fillStyle: [16, 185, 129], textColor: [255, 255, 255] },
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
      <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-white/30" size={32} />
        <p className="text-white/40 text-sm font-medium">Securing connection to invoice vault...</p>
      </div>
    );
  }

  if (error || !invoice || !gateways) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white/[0.02] border border-white/10 rounded-[40px] p-10 text-center">
          <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-red-400">
            <AlertCircle size={28} />
          </div>
          <h2 className="text-2xl font-bold mb-3">Connection Lost</h2>
          <p className="text-white/40 text-sm leading-relaxed mb-6">{error || 'Unable to resolve invoice parameters.'}</p>
          <button 
            onClick={fetchInvoiceDetails}
            className="px-8 py-3.5 bg-white text-black hover:bg-neutral-200 rounded-xl font-bold text-xs transition-colors"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-6 font-sans relative overflow-hidden">
      
      {/* Dynamic Background Blurs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/10 blur-[130px] rounded-full -mr-72 -mt-72 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-600/5 blur-[120px] rounded-full -ml-64 -mb-64 pointer-events-none" />

      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-12 gap-8 relative z-10">
        
        {/* Left Side: Invoice Summary Details Card */}
        <div className="md:col-span-7 bg-white/[0.02] border border-white/5 rounded-[40px] p-8 md:p-10 flex flex-col justify-between backdrop-blur-3xl">
          <div>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/60">
                  <FileText size={18} />
                </div>
                <div>
                  <span className="text-[10px] text-white/30 font-black uppercase tracking-[0.2em]">INVOICE CHECKOUT</span>
                  <h4 className="text-sm font-bold">#{invoice.invoiceNumber}</h4>
                </div>
              </div>
              
              <span className={`text-[9px] font-black uppercase tracking-wider px-3 py-1 border rounded-full ${
                paidSuccess 
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                  : invoice.status === 'overdue' 
                    ? 'bg-red-500/10 text-red-400 border-red-500/20' 
                    : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
              }`}>
                {paidSuccess ? 'PAID SUCCESS' : invoice.status}
              </span>
            </div>

            <div className="space-y-6">
              <div>
                <span className="text-[9px] text-white/30 font-black uppercase tracking-[0.2em]">Billed To</span>
                <h3 className="text-lg font-bold mt-1">{invoice.clientName}</h3>
                <p className="text-xs text-white/40 font-medium">{invoice.clientEmail}</p>
              </div>

              <div className="h-[1px] bg-white/5" />

              <div>
                <span className="text-[9px] text-white/30 font-black uppercase tracking-[0.2em]">Description</span>
                <p className="text-sm text-white/70 font-medium mt-1 leading-relaxed">
                  {invoice.description || 'Professional milestones deliverables.'}
                </p>
              </div>

              <div className="h-[1px] bg-white/5" />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-white/40">
                  <Calendar size={14} />
                  <span className="text-xs font-semibold">Due Date: {new Date(invoice.dueDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 mt-8 border-t border-white/5 flex items-end justify-between">
            <div>
              <span className="text-[9px] text-white/30 font-black uppercase tracking-[0.2em]">Total Amount Due</span>
              <h2 className="text-3xl font-black mt-1">${invoice.amount.toLocaleString()}</h2>
            </div>
            
            <div className="flex items-center gap-1.5 text-[10px] text-white/30 font-bold uppercase tracking-wider">
              <ShieldCheck className="text-emerald-500" size={14} /> SECURED SSL
            </div>
          </div>
        </div>

        {/* Right Side: Gateway Payment Drawer Card */}
        <div className="md:col-span-5 bg-white/[0.02] border border-white/5 rounded-[40px] p-8 md:p-10 flex flex-col justify-center backdrop-blur-3xl relative overflow-hidden">
          
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
                  <h3 className="text-xl font-bold tracking-tight">Select Payout</h3>
                  <p className="text-xs text-white/40 font-medium mt-1">Complete your transaction instantly and securely.</p>
                </div>

                <div className="space-y-4">
                  {/* Stripe Card Option */}
                  {gateways.stripe.connected ? (
                    <motion.button 
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handlePay('stripe')}
                      disabled={processing}
                      className="w-full p-5 bg-white/[0.03] border border-white/10 rounded-3xl text-left hover:bg-white/[0.06] hover:border-indigo-500/30 transition-all flex items-center justify-between group disabled:opacity-50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                          <CreditCard size={18} />
                        </div>
                        <div>
                          <p className="text-sm font-bold">Stripe Connect</p>
                          <p className="text-[10px] text-white/30 font-medium">Pay with Credit/Debit Cards</p>
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
                      className="w-full p-5 bg-white/[0.03] border border-white/10 rounded-3xl text-left hover:bg-white/[0.06] hover:border-teal-500/30 transition-all flex items-center justify-between group disabled:opacity-50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400">
                          <Building size={18} />
                        </div>
                        <div>
                          <p className="text-sm font-bold">Razorpay Connect</p>
                          <p className="text-[10px] text-white/30 font-medium">Pay with Netbanking / Wallets</p>
                        </div>
                      </div>
                    </motion.button>
                  ) : null}

                  {/* If neither connected */}
                  {!gateways.stripe.connected && !gateways.razorpay.connected ? (
                    <div className="p-6 bg-amber-500/10 border border-amber-500/20 rounded-3xl text-center text-amber-400">
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
                    className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl flex items-center gap-3 text-xs font-bold text-indigo-400"
                  >
                    <Loader2 className="animate-spin" size={14} />
                    {selectedGateway === 'stripe' ? 'Initializing Stripe Secure Tunnel...' : 'Launching Razorpay Checkout Modal...'}
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
                <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
                  <Check size={28} strokeWidth={3} />
                </div>

                <div>
                  <h3 className="text-2xl font-black">Transaction Settled</h3>
                  <p className="text-xs text-white/40 font-medium mt-1">Receipt generated and logged successfully.</p>
                </div>

                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 text-left space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-white/30">Settled Amount:</span>
                    <span className="font-bold">${invoice.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-white/30">Payment Channel:</span>
                    <span className="font-bold uppercase text-indigo-400">{selectedGateway || 'Card/Transfer'}</span>
                  </div>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={generatePDF}
                  className="w-full py-4 bg-white text-black hover:bg-neutral-200 rounded-2xl font-black text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2 shadow-[0_20px_40px_rgba(255,255,255,0.05)]"
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
