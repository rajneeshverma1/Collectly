import { MapPin, BrainCircuit, Navigation } from 'lucide-react';

const steps = [
  {
    icon: MapPin,
    title: 'Tell Vayu Where to Go',
    description: "Enter your start and end point anywhere in Lucknow. Pick how you're travelling — walking, cycling, auto, or car.",
  },
  {
    icon: BrainCircuit,
    title: 'AI Scores Every Route',
    description: 'Vayu weighs AQI data, construction zones, traffic density, and industrial areas to give each route a Health Score.',
  },
  {
    icon: Navigation,
    title: 'Walk the Cleanest Path',
    description: 'Get turn-by-turn directions with live health alerts. "Turn left here — avoids the construction dust zone ahead."',
  },
];

const HowItWorks = () => {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 md:px-6 py-24 relative z-10">
      <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
        <span className="text-xs font-bold tracking-widest text-slate-500 uppercase mb-4 block font-sans">
          Three steps. One clean commute.
        </span>
        <h2 className="md:text-5xl text-3xl font-semibold text-[#1A1A1A] tracking-tight font-nunito mb-6">
          How It Works
        </h2>
        <p className="text-lg text-slate-600 font-medium font-sans">
          Simple steps to save your lungs. Vayu AI makes healthy navigation effortless.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step) => (
          <div
            key={step.title}
            className="bg-white/80 backdrop-blur-md rounded-[32px] p-8 border border-white/60 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-transparent opacity-50 pointer-events-none" />
            <div className="w-14 h-14 bg-[#F6F4F0] rounded-2xl flex items-center justify-center mb-6 text-slate-900 shadow-sm group-hover:scale-110 transition-transform duration-300 border border-white">
              <step.icon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#1A1A1A] font-nunito mb-3">{step.title}</h3>
            <p className="text-[15px] leading-relaxed text-slate-600 font-sans">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
