import { SignIn } from "@/lib/auth-wrapper";

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0B0B0F]">
      <SignIn 
        appearance={{
          elements: {
            formButtonPrimary: 'bg-white text-black hover:bg-zinc-200 transition-colors',
            card: 'bg-[#111114] border border-white/[0.05] rounded-3xl',
            headerTitle: 'text-white',
            headerSubtitle: 'text-zinc-400',
            socialButtonsBlockButton: 'bg-white/5 border-white/10 text-white hover:bg-white/10',
            dividerLine: 'bg-white/10',
            dividerText: 'text-zinc-500',
            formFieldLabel: 'text-zinc-400',
            formFieldInput: 'bg-white/5 border-white/10 text-white rounded-xl focus:ring-1 focus:ring-white/20',
            footerActionText: 'text-zinc-500',
            footerActionLink: 'text-white hover:text-zinc-300 transition-colors'
          }
        }}
      />
    </div>
  );
}
