const SkyBackground = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <img
        src="/images/sky-bg.png"
        alt="Sky Background"
        className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-multiply"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#A6CBE8]/20 via-[#BFD9EF]/40 to-[#EAE3D6]" />
      <img
        src="/images/cloud-left.jpg"
        className="absolute top-[20%] -left-[10%] w-[50%] opacity-40 mix-blend-screen blur-xl pointer-events-none"
        alt="cloud"
      />
      <img
        src="/images/cloud-right.jpg"
        className="absolute top-[30%] -right-[10%] w-[50%] opacity-40 mix-blend-screen blur-xl pointer-events-none"
        alt="cloud"
      />
    </div>
  );
};

export default SkyBackground;
