"use client";

import React from "react";
import Link from "next/link";
import { Twitter, Linkedin, Youtube, Instagram, Music2 } from "lucide-react";

export const SubFooter = () => {
    return (
        <div className="w-full pt-8 pb-12 px-6" style={{ backgroundColor: '#0B0B0F' }}>
            <div className="max-w-[1450px] mx-auto">
                <div className="bg-[#111111] rounded-2xl py-6 px-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
                    {/* Left: Location */}
                    <div className="flex items-center gap-2 text-base text-gray-400 font-medium whitespace-nowrap">
                        Built with <span className="text-red-500">❤️</span> in India 🇮🇳 for San Francisco 🇺🇸
                    </div>

                    {/* Center: Copyright */}
                    <div className="text-base text-gray-500 font-medium whitespace-nowrap">
                        Copyright © {new Date().getFullYear()} Collectly. All rights reserved
                    </div>

                    {/* Right: Socials */}
                    <div className="flex items-center gap-5">
                        <Link href="#" className="text-gray-400 hover:text-gray-900 transition-colors">
                            <Linkedin size={18} />
                        </Link>
                        <Link href="#" className="text-gray-400 hover:text-gray-900 transition-colors">
                            <Youtube size={18} />
                        </Link>
                        <Link href="#" className="text-gray-400 hover:text-gray-900 transition-colors">
                            <Twitter size={18} />
                        </Link>
                        <Link href="#" className="text-gray-400 hover:text-gray-900 transition-colors">
                            <Instagram size={18} />
                        </Link>
                        <Link href="#" className="text-gray-400 hover:text-gray-900 transition-colors">
                            <Music2 size={18} />
                        </Link>
                        <Link href="#" className="text-gray-400 hover:text-gray-900 transition-colors">
                            <span className="text-lg leading-none">🦋</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
