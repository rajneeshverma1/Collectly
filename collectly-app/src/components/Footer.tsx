import React from "react";
import Link from "next/link";
import { Twitter, Linkedin, Github, Mail } from "lucide-react";

const Footer = () => {
    return (
        <footer className="pt-12 pb-12" style={{ backgroundColor: '#0B0B0F' }}>
            <div className="max-w-[1450px] mx-auto px-6 sm:px-10 lg:px-12">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-16 mb-16">
                    <div className="col-span-2 lg:col-span-2">
                        <Link href="/" className="inline-block mb-10">
                            <div className="flex items-center gap-2">
                                <span className="text-3xl md:text-4xl font-bold tracking-wide text-white">Collectly.ai</span>
                                <div className="w-3 h-3 bg-green-500 rounded-full mt-2.5" />
                            </div>
                        </Link>
                        <p className="text-[#94A3B8] text-lg max-w-md mb-8 leading-relaxed">
                            AI-powered revenue operations for modern finance teams. Automate
                            your billing and get paid faster.
                        </p>
                        <div className="flex space-x-4">
                            <Link href="#" className="p-2 bg-white/5 rounded-full text-gray-400 hover:text-white transition-colors">
                                <Twitter size={20} />
                            </Link>
                            <Link href="#" className="p-2 bg-white/5 rounded-full text-gray-400 hover:text-white transition-colors">
                                <Linkedin size={20} />
                            </Link>
                            <Link href="#" className="p-2 bg-white/5 rounded-full text-gray-400 hover:text-white transition-colors">
                                <Github size={20} />
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold text-white mb-8">Product</h4>
                        <ul className="space-y-5">
                            <li><Link href="#" className="text-base text-[#94A3B8] hover:text-white transition-colors">AI Billing</Link></li>
                            <li><Link href="#" className="text-base text-[#94A3B8] hover:text-white transition-colors">Contract Extraction</Link></li>
                            <li><Link href="#" className="text-base text-[#94A3B8] hover:text-white transition-colors">Collections</Link></li>
                            <li><Link href="#" className="text-base text-[#94A3B8] hover:text-white transition-colors">Reconciliation</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold text-white mb-8">Company</h4>
                        <ul className="space-y-5">
                            <li><Link href="#" className="text-base text-[#94A3B8] hover:text-white transition-colors">About Us</Link></li>
                            <li><Link href="#" className="text-base text-[#94A3B8] hover:text-white transition-colors">Careers</Link></li>
                            <li><Link href="#" className="text-base text-[#94A3B8] hover:text-white transition-colors">Press Kit</Link></li>
                            <li><Link href="#" className="text-base text-[#94A3B8] hover:text-white transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold text-white mb-8">Support</h4>
                        <ul className="space-y-5">
                            <li><Link href="#" className="text-base text-[#94A3B8] hover:text-white transition-colors">Help Center</Link></li>
                            <li><Link href="#" className="text-base text-[#94A3B8] hover:text-white transition-colors">API Docs</Link></li>
                            <li><Link href="#" className="text-base text-[#94A3B8] hover:text-white transition-colors">System Status</Link></li>
                            <li><Link href="#" className="text-base text-[#94A3B8] hover:text-white transition-colors">Privacy</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom row removed in favor of SubFooter bar */}
            </div>
        </footer>
    );
};

export default Footer;
