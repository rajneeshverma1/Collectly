'use client';
import React from "react";
import Link from "next/link";
import { Twitter, Linkedin, Github } from "lucide-react";

const Footer = () => {
    return (
        <footer className="pt-24 pb-8 text-white relative overflow-hidden" style={{ backgroundColor: '#0B0B0F' }}>
            <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
                
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-16 xl:gap-12 mb-24">
                    
                    {/* Newsletter & Badges - Col Span 4 */}
                    <div className="xl:col-span-4 flex flex-col">
                        <h3 className="text-2xl font-bold mb-4">Subscribe to Collectly Newsletter</h3>
                        <p className="text-gray-400 text-[15px] mb-8 leading-relaxed max-w-sm">
                            Stay updated with the latest insights on AI-powered billing automation and financial operations.
                        </p>
                        <form className="flex gap-2 mb-12 max-w-md">
                            <input 
                                type="email" 
                                placeholder="Email address" 
                                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm w-full focus:outline-none focus:border-[#22c55e] text-white transition-colors"
                            />
                            <button type="submit" className="bg-[#22c55e] hover:bg-green-500 text-white px-6 py-3 rounded-xl text-sm font-semibold transition-colors shrink-0">
                                Subscribe
                            </button>
                        </form>
                        
                        <div className="space-y-8 mt-auto">

                            
                            <div className="flex flex-wrap gap-3">
                                <span className="text-[11px] font-semibold tracking-wide uppercase px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-gray-400">SOC-2 Certified</span>
                                <span className="text-[11px] font-semibold tracking-wide uppercase px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-gray-400">GDPR Compliant</span>
                                <span className="text-[11px] font-semibold tracking-wide uppercase px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-gray-400">HIPAA Compliant</span>
                            </div>
                        </div>
                    </div>

                    {/* Link Columns - Col Span 8 */}
                    <div className="xl:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-16">
                        {/* Column 1 */}
                        <div>
                            <h4 className="text-[13px] font-bold text-white mb-6 uppercase tracking-widest">Platform</h4>
                            <ul className="space-y-4">
                                <li><Link href="#" className="text-[14px] text-gray-400 hover:text-white transition-colors">AI Financial Copilot</Link></li>
                                <li><Link href="#" className="text-[14px] text-gray-400 hover:text-white transition-colors">Pricing Page Builder</Link></li>
                                <li><Link href="#" className="text-[14px] text-gray-400 hover:text-white transition-colors">Accounts Receivable</Link></li>
                                <li><Link href="#" className="text-[14px] text-gray-400 hover:text-white transition-colors">Contract & Billing AI</Link></li>
                                <li><Link href="#" className="text-[14px] text-gray-400 hover:text-white transition-colors">Reminder AI</Link></li>
                                <li><Link href="#" className="text-[14px] text-gray-400 hover:text-white transition-colors">Contract Management</Link></li>
                                <li><Link href="#" className="text-[14px] text-gray-400 hover:text-white transition-colors">Usage-Based Billing</Link></li>
                                <li><Link href="#" className="text-[14px] text-gray-400 hover:text-white transition-colors">Billing Models</Link></li>
                                <li><Link href="#" className="text-[14px] text-gray-400 hover:text-white transition-colors">Customer Invoicing</Link></li>
                                <li><Link href="#" className="text-[14px] text-gray-400 hover:text-white transition-colors">Revenue Insights</Link></li>
                                <li><Link href="#" className="text-[14px] text-gray-400 hover:text-white transition-colors">Upsells & Renewals</Link></li>
                            </ul>
                        </div>

                        {/* Column 2 */}
                        <div>
                            <h4 className="text-[13px] font-bold text-white mb-6 uppercase tracking-widest">Solutions</h4>
                            <ul className="space-y-4 mb-12">
                                <li><Link href="#" className="text-[14px] text-gray-400 hover:text-white transition-colors">AI Companies</Link></li>
                                <li><Link href="#" className="text-[14px] text-gray-400 hover:text-white transition-colors">Founders</Link></li>
                                <li><Link href="#" className="text-[14px] text-gray-400 hover:text-white transition-colors">Startups</Link></li>
                                <li><Link href="#" className="text-[14px] text-gray-400 hover:text-white transition-colors">Mid-Market</Link></li>
                                <li><Link href="#" className="text-[14px] text-gray-400 hover:text-white transition-colors">Enterprise</Link></li>
                                <li><Link href="#" className="text-[14px] text-gray-400 hover:text-white transition-colors">Healthcare</Link></li>
                                <li><Link href="#" className="text-[14px] text-gray-400 hover:text-white transition-colors">Real Estate</Link></li>
                                <li><Link href="#" className="text-[14px] text-gray-400 hover:text-white transition-colors">Finance</Link></li>
                                <li><Link href="#" className="text-[14px] text-gray-400 hover:text-white transition-colors">Accounting</Link></li>
                            </ul>
                            
                            <h4 className="text-[13px] font-bold text-white mb-6 uppercase tracking-widest">Contact</h4>
                            <ul className="space-y-4">
                                <li><a href="mailto:sales@collectly.ai" className="text-[14px] font-semibold text-[#22c55e] hover:text-green-400 transition-colors">sales@collectly.ai</a></li>
                            </ul>
                        </div>

                        {/* Column 3 */}
                        <div>
                            <h4 className="text-[13px] font-bold text-white mb-6 uppercase tracking-widest">Company</h4>
                            <ul className="space-y-4 mb-12">
                                <li><Link href="#" className="text-[14px] text-gray-400 hover:text-white transition-colors">Mission</Link></li>
                                <li><Link href="#" className="text-[14px] text-gray-400 hover:text-white transition-colors">Customers</Link></li>
                                <li><Link href="#" className="text-[14px] text-gray-400 hover:text-white transition-colors">Case Studies</Link></li>
                                <li><Link href="#" className="text-[14px] text-gray-400 hover:text-white transition-colors">Team</Link></li>
                                <li><Link href="#" className="text-[14px] text-gray-400 hover:text-white transition-colors">Careers</Link></li>
                                <li><Link href="#" className="text-[14px] text-gray-400 hover:text-white transition-colors">Investors</Link></li>
                                <li><Link href="#" className="text-[14px] text-gray-400 hover:text-white transition-colors">Events</Link></li>
                                <li><Link href="#" className="text-[14px] text-gray-400 hover:text-white transition-colors">Trust</Link></li>
                            </ul>
                            
                            <h4 className="text-[13px] font-bold text-white mb-6 uppercase tracking-widest">Policies</h4>
                            <ul className="space-y-4">
                                <li><Link href="#" className="text-[14px] text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                                <li><Link href="#" className="text-[14px] text-gray-400 hover:text-white transition-colors">Terms and Conditions</Link></li>
                                <li><Link href="#" className="text-[14px] text-gray-400 hover:text-white transition-colors">Legal</Link></li>
                                <li><Link href="#" className="text-[14px] text-gray-400 hover:text-white transition-colors">Community Guidelines</Link></li>
                                <li><Link href="#" className="text-[14px] text-gray-400 hover:text-white transition-colors">Cookies</Link></li>
                            </ul>
                        </div>

                        {/* Column 4 */}
                        <div>
                            <h4 className="text-[13px] font-bold text-white mb-6 uppercase tracking-widest">Compare</h4>
                            <ul className="space-y-4 mb-12">
                                <li><Link href="#" className="text-[14px] text-gray-400 hover:text-white transition-colors">Lemon Squeezy</Link></li>
                                <li><Link href="#" className="text-[14px] text-gray-400 hover:text-white transition-colors">Stripe Billing</Link></li>
                                <li><Link href="#" className="text-[14px] text-gray-400 hover:text-white transition-colors">Tabs</Link></li>
                                <li><Link href="#" className="text-[14px] text-gray-400 hover:text-white transition-colors">Campfire</Link></li>
                                <li><Link href="#" className="text-[14px] text-gray-400 hover:text-white transition-colors">Chargebee</Link></li>
                                <li><Link href="#" className="text-[14px] text-gray-400 hover:text-white transition-colors">Zuora</Link></li>
                                <li><Link href="#" className="text-[14px] text-gray-400 hover:text-white transition-colors">Maxio</Link></li>
                                <li><Link href="#" className="text-[14px] text-gray-400 hover:text-white transition-colors">PandaDoc</Link></li>
                                <li><Link href="#" className="text-[14px] text-gray-400 hover:text-white transition-colors">Recurly</Link></li>
                                <li><Link href="#" className="text-[14px] text-gray-400 hover:text-white transition-colors">FreshBooks</Link></li>
                                <li><Link href="#" className="text-[14px] text-gray-400 hover:text-white transition-colors">QuickBooks</Link></li>
                                <li><Link href="#" className="text-[14px] text-gray-400 hover:text-white transition-colors">Zoho Billing</Link></li>
                            </ul>
                            
                            <h4 className="text-[13px] font-bold text-white mb-6 uppercase tracking-widest">Resources</h4>
                            <ul className="space-y-4">
                                <li><Link href="#" className="text-[14px] text-gray-400 hover:text-white transition-colors">Blog</Link></li>
                                <li><Link href="#" className="text-[14px] text-gray-400 hover:text-white transition-colors">Tools</Link></li>
                                <li><Link href="#" className="text-[14px] text-gray-400 hover:text-white transition-colors">Integrations</Link></li>
                                <li><Link href="#" className="text-[14px] text-gray-400 hover:text-white transition-colors">Glossary</Link></li>
                                <li><Link href="#" className="text-[14px] text-gray-400 hover:text-white transition-colors">Podcast</Link></li>
                                <li><Link href="#" className="text-[14px] text-gray-400 hover:text-white transition-colors">Learning Center</Link></li>
                                <li><Link href="#" className="text-[14px] text-gray-400 hover:text-white transition-colors">Press</Link></li>
                                <li><Link href="#" className="text-[14px] text-gray-400 hover:text-white transition-colors">Changelog</Link></li>
                                <li><Link href="#" className="text-[14px] text-gray-400 hover:text-white transition-colors">Help Center</Link></li>
                                <li><Link href="#" className="text-[14px] text-gray-400 hover:text-white transition-colors">Onboarding</Link></li>
                                <li><Link href="#" className="text-[14px] text-gray-400 hover:text-white transition-colors">Partner Services</Link></li>
                                <li><Link href="#" className="text-[14px] text-gray-400 hover:text-white transition-colors">Directory</Link></li>
                                <li><Link href="#" className="text-[14px] text-gray-400 hover:text-white transition-colors">API</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
