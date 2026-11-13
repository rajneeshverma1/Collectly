'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  Mail, 
  Sparkles, 
  Code, 
  Cpu, 
  Palette, 
  TrendingUp, 
  Check, 
  CheckCircle2, 
  MapPin, 
  Users, 
  DollarSign, 
  ChevronRight,
  ExternalLink,
  Plus
} from 'lucide-react';
import ParadevNavbar from "@/components/paradev/ParadevNavbar";
import ParadevFooter from "@/components/paradev/ParadevFooter";
import { FounderModal } from "@/components/FounderModal";

export default function CareersPage() {
  const [selectedRole, setSelectedRole] = useState<string | null>("fullstack");

  const openFounder = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('open-founder-modal'));
    }
  };

  const polaroids = [
    {
      title: "Vibecon Hackathon",
      date: "Nov 2025",
      tag: "Winning 1st Prize",
      color: "from-amber-900/40 to-stone-900",
      caption: "Winning 1st place building the first Collectly SQLite prototype at Vibecon.",
      fanX: "-360px",
      fanY: "50px",
      fanR: "-16deg",
      fanS: "0.96",
      fanZ: 5,
    },
    {
      title: "First 100 Users",
      date: "Dec 2025",
      tag: "Studio Deployments",
      color: "from-orange-950/40 to-stone-900",
      caption: "Deploying Collectly with early design agencies in San Francisco & Bengaluru.",
      fanX: "-220px",
      fanY: "20px",
      fanR: "-8deg",
      fanS: "1.0",
      fanZ: 6,
    },
    {
      title: "Open Batch Demo",
      date: "Mar 2026",
      tag: "Agent Orchestration",
      color: "from-stone-900 to-amber-950/40",
      caption: "Presenting the tone-aware dunning engine to a packed room of founders.",
      fanX: "-80px",
      fanY: "-2px",
      fanR: "-1deg",
      fanS: "1.02",
      fanZ: 8,
    },
    {
      title: "YC Demo Day",
      date: "Jun 2026",
      tag: "Seed Milestone",
      color: "from-amber-950/50 to-stone-900",
      caption: "On stage presenting Collectly: billing automation that actually gets paid.",
      fanX: "80px",
      fanY: "14px",
      fanR: "6deg",
      fanS: "1.01",
      fanZ: 7,
    },
    {
      title: "Moving In",
      date: "Sep 2026",
      tag: "First Studio",
      color: "from-stone-900 to-orange-950/30",
      caption: "Moving into our first dedicated office space. Endless coffee and whiteboards.",
      fanX: "240px",
      fanY: "36px",
      fanR: "12deg",
      fanS: "0.98",
      fanZ: 6,
    },
    {
      title: "Late Night Ship",
      date: "Oct 2026",
      tag: "v2.4 Release",
      color: "from-orange-900/40 to-stone-900",
      caption: "Shipping the multi-tenant Stripe + Mercury auto-reconciler at 3 AM.",
      fanX: "370px",
      fanY: "56px",
      fanR: "18deg",
      fanS: "0.95",
      fanZ: 5,
    },
  ];

  const roles = [
    {
      id: "fullstack",
      title: "Founding Full-Stack Engineer",
      team: "Core Platform & Infrastructure",
      location: "San Francisco, CA or Remote",
      salary: "$140K – $190K",
      equity: "0.5% – 2.0%",
      type: "Full-Time",
      icon: Code,
      description: "You will build the core billing pipeline: local SQLite sync, Next.js App Router dashboards, webhooks, and the payment signature vault handling millions of dollars in receivables.",
      requirements: [
        "Strong production experience with TypeScript, Next.js, and Node.js backend systems",
        "Deep familiarity with SQL/SQLite, background queues, and webhook idempotency",
        "Obsession with crafting ultra-fast, snappy developer tools and beautiful UIs",
        "Experience integrating financial APIs (Stripe, Plaid, Mercury, or QuickBooks) is a big plus",
      ],
      techStack: ["TypeScript", "Next.js", "React", "SQLite", "Node.js", "TailwindCSS", "Stripe API"],
    },
    {
      id: "ai-systems",
      title: "Founding AI & Agent Systems Engineer",
      team: "Autonomous Dunning & Intelligence",
      location: "San Francisco, CA or Remote",
      salary: "$150K – $200K",
      equity: "0.5% – 2.0%",
      type: "Full-Time",
      icon: Cpu,
      description: "Design and implement the autonomous payment collection agents, tone-aware escalation logic, contract invoice auto-extraction, and smart client response classifiers.",
      requirements: [
        "Experience building production agentic workflows, function calling, and structured outputs",
        "Understanding of financial pipelines, dunning cadences, and client communication dynamics",
        "Ability to evaluate model accuracy, minimize hallucinations, and guarantee guardrails for automated client emails",
        "Curiosity about local-first LLM inference and structured document parsing",
      ],
      techStack: ["Python", "TypeScript", "LangChain / OpenAI SDK", "Vector DBs", "Structured JSON", "FastAPI"],
    },
    {
      id: "product-design",
      title: "Founding Product Designer (Systems & Craft)",
      team: "Design & UX",
      location: "Remote / Hybrid",
      salary: "$120K – $160K",
      equity: "0.5% – 1.5%",
      type: "Full-Time",
      icon: Palette,
      description: "Shape the next-generation financial operating system: typography, micro-interactions, dark-mode design systems, native macOS window chrome, and mobile workflows.",
      requirements: [
        "Exceptional portfolio of complex developer tools, financial software, or productivity apps",
        "Obsession with typography, subtle animations, and information hierarchy",
        "Proficiency in Figma and translating design tokens directly into React/CSS",
        "A strong aesthetic instinct aligned with dark mode, monospace accents, and precision craft",
      ],
      techStack: ["Figma", "Design Systems", "CSS / Tailwind", "Prototyping", "Typography", "Micro-interactions"],
    },
    {
      id: "growth-devrel",
      title: "Founding Growth & Technical DevRel",
      team: "Go-to-Market & Community",
      location: "Remote",
      salary: "$100K – $140K",
      equity: "0.3% – 1.0%",
      type: "Full-Time",
      icon: TrendingUp,
      description: "Drive adoption across high-growth startups, engineering agencies, and freelancers. Run open-source community engagement, tutorials, and documentation.",
      requirements: [
        "Technical background with the ability to write code examples, scripts, and tutorials",
        "Experience engaging developer communities (GitHub, X, Discord, Hacker News)",
        "Relentless drive to help builders eliminate awkward payment chasing",
        "Strong writing skills with a clear, concise, developer-centric voice",
      ],
      techStack: ["Technical Writing", "DevRel", "GitHub", "Community", "Analytics", "CLI Tools"],
    },
  ];

  const hiringSteps = [
    {
      step: "01",
      duration: "15 min",
      title: "Intro call",
      description: "Bring a link to something you built recently. We'll share our vision and see if there's a strong fit.",
    },
    {
      step: "02",
      duration: "1 hr",
      title: "Technical session",
      description: "A practical TypeScript & systems problem, like the ones we solve every day. No LeetCode puzzles.",
    },
    {
      step: "03",
      duration: "1 hr",
      title: "System architecture",
      description: "Design a resilient payment reconciliation engine on a whiteboard with one of the founders.",
    },
    {
      step: "04",
      duration: "3-5 days",
      title: "Paid work trial",
      description: "Spend 3 to 5 days building real features with the team. You get paid standard consulting rates.",
    },
  ];

  const faqs = [
    {
      q: "Do you sponsor visas?",
      a: "Yes. You don't need US work authorization to apply. We sponsor O-1, H-1B transfers, and TN visas for exceptional builders willing to work in San Francisco or remotely.",
    },
    {
      q: "What are the benefits?",
      a: "Comprehensive medical and dental at no cost to you, a 401(k), unlimited paid time off, a $5,000 desk & hardware stipend, and lunch/meals covered in the office.",
    },
    {
      q: "No role fits me exactly. Should I still reach out?",
      a: "Yes! Apply to the role that is closest or email the founder directly. Tell us what you would build and include a repo, PR, or demo of something you've shipped.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#090a0b] text-[#ededed] antialiased selection:bg-brand selection:text-white">
      <ParadevNavbar />

      <div className="mx-auto max-w-[80rem] px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20">
        
        {/* Two-Column Hero (Paradev exact style) */}
        <section className="grid gap-8 lg:grid-cols-[2fr_3fr] lg:gap-24 xl:gap-32 items-start border-b border-[#232529]/60 pb-12 sm:pb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-[2px] border border-[#232529] bg-[#111214] text-[11px] font-mono text-brand mb-4">
              <span className="size-1.5 rounded-full bg-brand animate-ping"></span>
              <span>WE&apos;RE HIRING · SAN FRANCISCO & REMOTE</span>
            </div>
            <h1 className="m-0 text-balance text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-foreground leading-[1.1]">
              Building the last piece of financial software.
            </h1>
          </div>

          <div className="space-y-4">
            <p className="m-0 text-base sm:text-lg leading-relaxed text-muted-foreground font-light">
              Collectly is building self-reconciling autonomous billing. It starts with giving founders and finance teams the best tools that adapt to their needs over time.
            </p>
            <p className="m-0 text-base sm:text-lg leading-relaxed text-muted-foreground font-light">
              We&apos;re building a flat, high-agency and talent-dense team, and we&apos;re looking for people who have crazy ideas and are crazy enough to ship them.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#open-roles"
                className="bg-foreground text-background font-mono text-xs uppercase px-5 py-2.5 rounded-[2px] font-medium hover:bg-brand hover:text-white transition-colors"
              >
                See open roles ↓
              </a>
              <button
                type="button"
                onClick={openFounder}
                className="font-mono text-xs uppercase px-4 py-2.5 rounded-[2px] border border-[#232529] bg-[#111214] text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                Talk to Founder →
              </button>
            </div>
          </div>
        </section>

        {/* Photo Fan Showcase (Paradev signature Polaroid stack) */}
        <section className="mt-12 sm:mt-16 overflow-hidden py-4">
          <div className="hidden md:block relative h-[380px] w-full max-w-5xl mx-auto">
            <ul className="list-none p-0 m-0">
              {polaroids.map((p, idx) => (
                <li
                  key={idx}
                  style={{
                    // @ts-expect-error CSS custom properties for fan
                    '--fan-x': p.fanX,
                    '--fan-y': p.fanY,
                    '--fan-r': p.fanR,
                    '--fan-s': p.fanS,
                    '--fan-z': p.fanZ,
                  }}
                  className="group absolute left-1/2 top-4 w-[210px] -ml-[105px] transition-transform duration-300 ease-out cursor-pointer [transform:translateX(var(--fan-x))_translateY(var(--fan-y))_rotate(var(--fan-r))_scale(var(--fan-s))] hover:z-50 hover:[transform:translateX(var(--fan-x))_translateY(calc(var(--fan-y)-24px))_rotate(0deg)_scale(1.1)]"
                >
                  <div className="rounded-sm bg-[#f1e9d5] p-2.5 shadow-[0_12px_28px_rgba(0,0,0,0.6)] border border-[#dfd4bd] text-[#2b241b]">
                    {/* Photo Container */}
                    <div className={`relative aspect-[4/5] rounded-[2px] bg-gradient-to-br ${p.color} p-3 flex flex-col justify-between text-white overflow-hidden border border-black/20`}>
                      <div className="flex justify-between items-start font-mono text-[9px] uppercase tracking-wider text-white/70">
                        <span>COLLECTLY</span>
                        <span className="bg-black/40 px-1 py-0.5 rounded text-[8px] text-brand-light">{p.tag}</span>
                      </div>
                      <div className="space-y-1">
                        <div className="font-mono text-xs font-bold tracking-tight text-white">{p.title}</div>
                        <div className="text-[10px] text-white/80 line-clamp-3 leading-snug">{p.caption}</div>
                      </div>
                    </div>
                    {/* Handwritten Caption */}
                    <div className="pt-2 pb-0.5 px-1 font-mono text-[11px] text-[#3b3226] font-semibold flex justify-between items-center">
                      <span>{p.title}</span>
                      <span className="text-[10px] text-[#6d5e4b]">{p.date}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile Horizontal Scroll */}
          <div className="md:hidden flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory">
            {polaroids.map((p, idx) => (
              <div key={idx} className="shrink-0 w-56 snap-center rounded-sm bg-[#f1e9d5] p-2.5 shadow-xl border border-[#dfd4bd] text-[#2b241b]">
                <div className={`aspect-[4/5] rounded-[2px] bg-gradient-to-br ${p.color} p-3 flex flex-col justify-between text-white`}>
                  <span className="font-mono text-[9px] text-brand-light">{p.tag}</span>
                  <div>
                    <div className="font-mono text-xs font-bold text-white">{p.title}</div>
                    <div className="text-[10px] text-white/80 mt-1">{p.caption}</div>
                  </div>
                </div>
                <div className="pt-2 font-mono text-[11px] text-[#3b3226] font-semibold flex justify-between">
                  <span>{p.title}</span>
                  <span className="text-[10px]">{p.date}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Stats Strip (Paradev dl/dt/dd style) */}
        <dl className="grid grid-cols-1 gap-5 border-y border-[#232529] py-6 sm:grid-cols-3 sm:gap-x-8 mt-12 sm:mt-16">
          <div className="space-y-1">
            <dt className="font-mono text-[11px] tracking-[0.08em] uppercase text-muted-foreground">Location</dt>
            <dd className="m-0 text-xl sm:text-2xl font-medium tracking-tight text-foreground">San Francisco & Remote</dd>
          </div>
          <div className="space-y-1">
            <dt className="font-mono text-[11px] tracking-[0.08em] uppercase text-muted-foreground">Team</dt>
            <dd className="m-0 text-xl sm:text-2xl font-medium tracking-tight text-foreground">4 founder-led builders</dd>
          </div>
          <div className="space-y-1">
            <dt className="font-mono text-[11px] tracking-[0.08em] uppercase text-muted-foreground">Processed</dt>
            <dd className="m-0 text-xl sm:text-2xl font-medium tracking-tight text-foreground tabular-nums text-brand">$2.4M+ ARR automated</dd>
          </div>
        </dl>

        {/* Open Roles Section */}
        <section className="scroll-mt-24 mt-16 sm:mt-24" id="open-roles">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <h2 className="mb-2 text-2xl sm:text-3xl font-medium tracking-tight text-foreground">
                Open roles
              </h2>
              <p className="m-0 max-w-xl text-sm sm:text-base text-muted-foreground">
                In person in San Francisco & Bengaluru, or remote. You work directly with the founder.
              </p>
            </div>
            <div className="font-mono text-xs text-brand">
              4 OPEN POSITIONS
            </div>
          </div>

          <div className="space-y-4">
            {roles.map((role) => {
              const Icon = role.icon;
              const isSelected = selectedRole === role.id;

              return (
                <div
                  key={role.id}
                  className={`rounded-lg border transition-all duration-200 overflow-hidden ${
                    isSelected 
                      ? 'border-brand/70 bg-[#121316] shadow-[0_0_25px_rgba(232,128,74,0.1)]' 
                      : 'border-[#232529] bg-[#111214] hover:border-[#383a3f]'
                  }`}
                >
                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="size-10 rounded-[4px] bg-brand/10 border border-brand/20 flex items-center justify-center text-brand shrink-0 mt-0.5">
                          <Icon className="size-5" />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-foreground tracking-tight">
                            {role.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs font-mono text-muted-foreground">
                            <span className="text-brand">{role.team}</span>
                            <span>•</span>
                            <span>{role.location}</span>
                            <span>•</span>
                            <span>{role.salary}</span>
                            <span>•</span>
                            <span className="text-foreground/80">{role.equity}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0 self-end lg:self-center">
                        <button
                          type="button"
                          onClick={() => setSelectedRole(isSelected ? null : role.id)}
                          className="px-3.5 py-1.5 rounded-[2px] font-mono text-xs border border-[#232529] bg-[#1a1d21] text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                        >
                          {isSelected ? 'Collapse' : 'Details'}
                        </button>
                        <a
                          href={`mailto:rajneeshverma3536@gmail.com?subject=Application: ${role.title}&body=Hi Rajneesh,%0D%0A%0D%0AI would like to apply for the ${role.title} position at Collectly.%0D%0A%0D%0APortfolio / GitHub link:%0D%0AWhat I built recently:%0D%0A`}
                          className="px-4 py-1.5 rounded-[2px] font-mono text-xs uppercase tracking-wider bg-brand text-white hover:bg-brand-dark transition-colors flex items-center gap-1.5 shadow-sm font-semibold"
                        >
                          <span>Apply</span>
                          <ArrowRight className="size-3" />
                        </a>
                      </div>
                    </div>

                    {/* Expanded Job Details */}
                    {isSelected && (
                      <div className="mt-6 pt-6 border-t border-[#232529]/70 space-y-5 text-sm text-muted-foreground font-light leading-relaxed animate-in fade-in duration-200">
                        <div>
                          <h4 className="font-mono text-xs uppercase font-semibold text-foreground tracking-wider mb-2">
                            THE MISSION:
                          </h4>
                          <p>{role.description}</p>
                        </div>

                        <div>
                          <h4 className="font-mono text-xs uppercase font-semibold text-foreground tracking-wider mb-2">
                            WHAT WE&apos;RE LOOKING FOR:
                          </h4>
                          <ul className="space-y-2">
                            {role.requirements.map((req, rIdx) => (
                              <li key={rIdx} className="flex items-start gap-2.5 text-xs text-foreground/90 font-mono">
                                <Check className="size-3.5 text-brand shrink-0 mt-0.5" />
                                <span>{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-mono text-xs uppercase font-semibold text-foreground tracking-wider mb-2">
                            PRIMARY TOOLS & TECHNOLOGIES:
                          </h4>
                          <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                            {role.techStack.map((tech, tIdx) => (
                              <span key={tIdx} className="px-2 py-0.5 rounded-[2px] border border-[#232529] bg-[#1a1d21] text-muted-foreground">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="pt-2 flex items-center justify-between flex-wrap gap-3 font-mono text-xs">
                          <a
                            href={`mailto:rajneeshverma3536@gmail.com?subject=Application: ${role.title}`}
                            className="inline-flex items-center gap-2 text-brand hover:underline"
                          >
                            <Mail className="size-3.5" />
                            <span>Direct email to founder: rajneeshverma3536@gmail.com ↗</span>
                          </a>
                          <span className="text-muted-foreground/60 text-[11px]">We respond within 48 hours</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* How We Work (Paradev 3 pillars with 01, 02, 03) */}
        <section className="mt-24 sm:mt-28">
          <h2 className="mb-2 text-2xl sm:text-3xl font-medium tracking-tight text-foreground">
            How we work
          </h2>
          <p className="mb-8 text-sm sm:text-base text-muted-foreground font-light">
            You can see how we work before you talk to us.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 border-t border-[#232529]">
            <div className="border-t border-[#232529] sm:border-t-0 py-6 sm:pr-6 sm:[&+&]:border-l sm:[&+&]:border-[#232529] sm:[&+&]:pl-6">
              <span className="font-mono text-xs text-brand font-semibold">01</span>
              <h3 className="mt-3 mb-2 text-lg font-medium text-foreground tracking-tight">Built in Collectly</h3>
              <p className="m-0 text-xs sm:text-sm text-muted-foreground leading-relaxed font-light">
                Collectly is built in Collectly, so we&apos;re our own #1 users. Every invoice, retainer, and consulting bill is managed autonomously. You get paid to make your own life easier.
              </p>
            </div>

            <div className="border-t border-[#232529] sm:border-t-0 py-6 sm:pr-6 sm:[&+&]:border-l sm:[&+&]:border-[#232529] sm:[&+&]:pl-6">
              <span className="font-mono text-xs text-brand font-semibold">02</span>
              <h3 className="mt-3 mb-2 text-lg font-medium text-foreground tracking-tight">Ship every week</h3>
              <p className="m-0 text-xs sm:text-sm text-muted-foreground leading-relaxed font-light">
                A changelog goes out every single week. Most new hires ship noticeable improvements to production within their first few days.
              </p>
              <Link href="#architecture" className="mt-4 inline-block font-mono text-[11px] tracking-wider text-brand hover:underline uppercase">
                Explore architecture →
              </Link>
            </div>

            <div className="border-t border-[#232529] sm:border-t-0 py-6 sm:pr-6 sm:[&+&]:border-l sm:[&+&]:border-[#232529] sm:[&+&]:pl-6">
              <span className="font-mono text-xs text-brand font-semibold">03</span>
              <h3 className="mt-3 mb-2 text-lg font-medium text-foreground tracking-tight">Build in public</h3>
              <p className="m-0 text-xs sm:text-sm text-muted-foreground leading-relaxed font-light">
                Collectly is transparent. Our CLI tap, SQLite schema designs, roadmap, and customer reviews are openly documented.
              </p>
              <button 
                type="button" 
                onClick={openFounder}
                className="mt-4 inline-block font-mono text-[11px] tracking-wider text-brand hover:underline uppercase cursor-pointer"
              >
                Meet the founder →
              </button>
            </div>
          </div>
        </section>

        {/* Founders Quote Block */}
        <section className="mt-24 sm:mt-28">
          <blockquote className="m-0 mb-12 max-w-4xl text-2xl sm:text-3xl font-normal leading-snug tracking-tight text-foreground/90 border-l-2 border-brand pl-6">
            “We&apos;re redefining the way businesses collect revenue and manage cash flow. To do that, we need a group of outliers. Everyone on the team is deeply technical, opinionated, and optimistic. We have spirited debates, high trust in each other, and a ton of fun.”
            <cite className="mt-4 block font-mono text-xs uppercase tracking-widest text-muted-foreground not-italic">
              — Rajneesh Verma, Founder & CEO
            </cite>
          </blockquote>
        </section>

        {/* How We Hire (Paradev 4-step process) */}
        <section className="mt-24 sm:mt-28">
          <h2 className="mb-2 text-2xl sm:text-3xl font-medium tracking-tight text-foreground">
            How we hire
          </h2>
          <p className="mb-8 max-w-2xl text-sm sm:text-base text-muted-foreground font-light">
            About two to three weeks from first call to offer, ending with a paid work trial. Every step is with a founder, and you hear back within 48 hours.
          </p>

          <ol className="m-0 grid list-none grid-cols-1 p-0 sm:grid-cols-2 lg:grid-cols-4">
            {hiringSteps.map((step, idx) => (
              <li
                key={idx}
                className="border-t border-[#232529] py-6 sm:pr-6 lg:[&+&]:border-l lg:[&+&]:border-[#232529] lg:[&+&]:pl-6"
              >
                <div className="mb-3 flex items-baseline justify-between font-mono text-xs uppercase">
                  <span className="text-brand font-semibold">{step.step}</span>
                  <span className="text-muted-foreground/60">{step.duration}</span>
                </div>
                <h3 className="m-0 mb-2 text-base font-medium text-foreground tracking-tight">
                  {step.title}
                </h3>
                <p className="m-0 text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* Careers Questions FAQ */}
        <section className="grid gap-8 lg:grid-cols-[2fr_3fr] lg:gap-24 xl:gap-32 mt-24 sm:mt-28 border-t border-[#232529] pt-16">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-brand block mb-2">
              Common Questions
            </span>
            <h2 className="m-0 text-2xl sm:text-3xl font-medium tracking-tight text-foreground">
              Everything you might wonder about joining us
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <details
                key={idx}
                className="group border border-[#232529] rounded-lg bg-[#111214] p-5 cursor-pointer"
              >
                <summary className="flex items-center justify-between font-medium text-foreground text-sm focus:outline-none select-none list-none">
                  <span>{faq.q}</span>
                  <Plus className="size-4 text-muted-foreground transition-transform duration-200 group-open:rotate-45 group-open:text-brand shrink-0 ml-4" />
                </summary>
                <p className="mt-3 text-xs sm:text-sm text-muted-foreground font-light leading-relaxed border-t border-[#232529]/60 pt-3">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* Come Build It With Us Final Section */}
        <section className="border-t border-[#232529] py-20 sm:py-28 text-center mt-24 sm:mt-28">
          <h2 className="mb-3 text-3xl sm:text-4xl font-medium tracking-tight text-foreground">
            Come build it with us.
          </h2>
          <p className="mx-auto mb-8 max-w-lg text-sm sm:text-base text-muted-foreground font-light">
            Check the open roles, or reach out to the founder to discuss where you can make an immediate impact.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#open-roles"
              className="px-6 py-2.5 font-mono text-xs tracking-wider uppercase transition-colors bg-foreground text-background hover:bg-brand hover:text-white font-medium"
            >
              See open roles ↑
            </a>
            <button
              type="button"
              onClick={openFounder}
              className="px-6 py-2.5 font-mono text-xs tracking-wider uppercase transition-colors border border-[#232529] bg-[#111214] text-foreground hover:bg-[#1a1d21] cursor-pointer"
            >
              Talk to Founder →
            </button>
          </div>
        </section>

      </div>

      <ParadevFooter />
      <FounderModal />
    </main>
  );
}
