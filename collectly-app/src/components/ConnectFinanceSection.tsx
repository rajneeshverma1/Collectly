"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import createGlobe from 'cobe';

const FloatingCard = ({ icon, title, items }: { icon: React.ReactNode, title: string, items: { label: string, value: string }[] }) => (
    <div className="bg-white/90 backdrop-blur-md border border-white rounded-xl p-4 shadow-[0_8px_30px_rgb(0,0,0,0.06)] w-72 mb-4 transition-all duration-500">
        <div className="flex items-center gap-2 mb-3">
            {icon}
            <h4 className="font-semibold text-gray-900">{title}</h4>
        </div>
        <div className="space-y-1.5">
            {items.map((item, idx) => (
                <div key={idx} className="flex justify-between text-sm">
                    <span className="text-gray-500">{item.label}</span>
                    <span className="font-medium text-gray-900 transition-all duration-300">{item.value}</span>
                </div>
            ))}
        </div>
    </div>
);

const Globe = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const phiRef = useRef(0);
  
  useEffect(() => {
    let width = 0;
    const onResize = () => canvasRef.current && (width = canvasRef.current.offsetWidth)
    window.addEventListener('resize', onResize)
    onResize()
    const globe = createGlobe(canvasRef.current!, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.3,
      dark: 0,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [1, 1, 1],
      markerColor: [251 / 255, 100 / 255, 21 / 255],
      glowColor: [1, 1, 1],
      markers: [
        { location: [37.7595, -122.4367], size: 0.04 },
        { location: [40.7128, -74.0060], size: 0.05 },
        { location: [51.5074, -0.1278], size: 0.05 },
        { location: [48.8566, 2.3522], size: 0.04 },
        { location: [35.6762, 139.6503], size: 0.05 }
      ],
      onRender: (state: Record<string, any>) => {
        if (pointerInteracting.current === null) {
          phiRef.current += 0.003;
        }
        state.phi = phiRef.current;
        state.width = width * 2;
        state.height = width * 2;
      }
    } as any)

    return () => {
      globe.destroy();
      window.removeEventListener('resize', onResize);
    }
  }, [])

  return (
    <div style={{ width: '100%', maxWidth: 1000, aspectRatio: 1, margin: 'auto', position: 'relative' }}>
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          cursor: 'grab',
          contain: 'layout paint size',
          opacity: 1,
          transition: 'opacity 1s ease',
        }}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX;
          canvasRef.current!.style.cursor = 'grabbing';
        }}
        onPointerUp={() => {
          pointerInteracting.current = null;
          canvasRef.current!.style.cursor = 'grab';
        }}
        onPointerOut={() => {
          pointerInteracting.current = null;
          canvasRef.current!.style.cursor = 'grab';
        }}
        onMouseMove={(e) => {
          if (pointerInteracting.current !== null) {
            const delta = e.clientX - pointerInteracting.current;
            phiRef.current += delta / 200;
            pointerInteracting.current = e.clientX;
          }
        }}
        onTouchMove={(e) => {
          if (pointerInteracting.current !== null && e.touches[0]) {
            const delta = e.touches[0].clientX - pointerInteracting.current;
            phiRef.current += delta / 200;
            pointerInteracting.current = e.touches[0].clientX;
          }
        }}
      />
      <div className="absolute inset-0 pointer-events-none rounded-full shadow-[inset_0_0_120px_60px_#f8f9fa]"></div>
    </div>
  )
}

export const ConnectFinanceSection = () => {
    const [dataIdx, setDataIdx] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setDataIdx(prev => (prev + 1) % 5);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    const invoiceData = [
        { amount: '$2,450.00', customer: 'Acme Corp' },
        { amount: '$1,200.50', customer: 'Globex Inc' },
        { amount: '$8,900.00', customer: 'Soylent Corp' },
        { amount: '$450.00', customer: 'Initech' },
        { amount: '$12,050.25', customer: 'Umbrella Corp' },
    ];

    const aiData = [
        { scanned: '128 scanned', flags: '3 anomalies' },
        { scanned: '245 scanned', flags: '0 anomalies' },
        { scanned: '56 scanned', flags: '1 anomaly' },
        { scanned: '890 scanned', flags: '5 anomalies' },
        { scanned: '12 scanned', flags: '0 anomalies' },
    ];

    const retryData = [
        { invoice: '#1920', status: 'Retrying at best time' },
        { invoice: '#1045', status: 'Scheduled for 2:00 PM' },
        { invoice: '#3302', status: 'Processing network' },
        { invoice: '#0984', status: 'Awaiting gateway' },
        { invoice: '#2109', status: 'Retrying at best time' },
    ];

    return (
        <section className="bg-[#f8f9fa] pt-20 pb-32 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative">
                
                <div className="flex flex-col lg:flex-row relative z-10 h-[500px]">
                    {/* Globe Area - offset to left */}
                    <div className="absolute -top-40 -left-[10%] lg:-left-[20%] w-[800px] h-[800px] md:w-[1000px] md:h-[1000px] opacity-90">
                        <Globe />
                    </div>
                    
                    {/* Floating Cards on Right */}
                    <div className="absolute right-0 top-10 flex-col items-end z-20 hidden lg:flex">
                        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                            <FloatingCard 
                                icon={<div className="w-4 h-4 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />}
                                title="Invoice paid"
                                items={[
                                    { label: 'Amount', value: invoiceData[dataIdx].amount },
                                    { label: 'Customer', value: invoiceData[dataIdx].customer }
                                ]}
                            />
                        </motion.div>
                        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                            <FloatingCard 
                                icon={<span className="text-lg leading-none">🤖</span>}
                                title="AI review complete"
                                items={[
                                    { label: 'Invoices', value: aiData[dataIdx].scanned },
                                    { label: 'Flags', value: aiData[dataIdx].flags }
                                ]}
                            />
                        </motion.div>
                        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                            <FloatingCard 
                                icon={<div className="bg-blue-100 p-1.5 rounded"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21.5 2v6h-6M2.13 15.57a9 9 0 1 0 3.84-10.36L2 8"/></svg></div>}
                                title="Smart retry queued"
                                items={[
                                    { label: 'Invoice', value: retryData[dataIdx].invoice },
                                    { label: 'Status', value: retryData[dataIdx].status }
                                ]}
                            />
                        </motion.div>
                    </div>
                </div>

                {/* Bottom Text Area */}
                <div className="max-w-4xl mx-auto text-center relative z-30 mt-8">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-medium text-gray-900 mb-6 tracking-tight"
                    >
                        Battle-tested billing infrastructure
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-gray-500 leading-relaxed max-w-3xl mx-auto"
                    >
                        Processing millions in payments across global businesses — automated invoicing, collections, and reconciliation that finance teams trust.
                    </motion.p>
                </div>

            </div>
        </section>
    );
};

