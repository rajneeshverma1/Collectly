'use client';

import React, { createContext, useContext, useState } from 'react';

const MockAuthContext = createContext<any>(null);

export function MockClerkProvider({ children }: { children: React.ReactNode }) {
  const [isSignedIn, setIsSignedIn] = useState(true);
  const [user, setUser] = useState({
    id: "user_2Pz4WkL2Z7X7vF8t1q2r3s4t5u6",
    firstName: "Rajneesh",
    lastName: "Verma",
    fullName: "Rajneesh Verma",
    username: "rajneeshverma1",
    emailAddresses: [{ emailAddress: "curiousrajneesh2024@gmail.com" }]
  });

  return (
    <MockAuthContext.Provider value={{ isSignedIn, setIsSignedIn, user, setUser }}>
      {children}
    </MockAuthContext.Provider>
  );
}

export function useMockUser() {
  const ctx = useContext(MockAuthContext);
  return {
    isLoaded: true,
    isSignedIn: ctx ? ctx.isSignedIn : true,
    user: ctx ? (ctx.isSignedIn ? ctx.user : null) : null
  };
}

export function useMockAuth() {
  const ctx = useContext(MockAuthContext);
  return {
    isLoaded: true,
    isSignedIn: ctx ? ctx.isSignedIn : true,
    userId: ctx ? (ctx.isSignedIn ? ctx.user?.id : null) : "user_2Pz4WkL2Z7X7vF8t1q2r3s4t5u6",
    signOut: async () => {
      if (ctx) ctx.setIsSignedIn(false);
    },
    getToken: async () => {
      const payload = {
        sub: ctx ? ctx.user?.id : "user_2Pz4WkL2Z7X7vF8t1q2r3s4t5u6",
        email: ctx ? ctx.user?.emailAddresses[0]?.emailAddress : "curiousrajneesh2024@gmail.com",
        name: ctx ? ctx.user?.fullName : "Rajneesh Verma",
        iss: "https://clerk.dev"
      };
      
      // Generate standard base64 encoded JWT structure to satisfy development mock decoders
      const headerStr = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
      const payloadStr = btoa(JSON.stringify(payload));
      return `${headerStr}.${payloadStr}.mock_signature`;
    }
  };
}

export function MockShow({ when, children }: { when: 'signed-in' | 'signed-out', children: React.ReactNode }) {
  const { isSignedIn } = useMockUser();
  if (when === 'signed-in' && isSignedIn) return <>{children}</>;
  if (when === 'signed-out' && !isSignedIn) return <>{children}</>;
  return null;
}

export function MockUserButton() {
  const { user, isSignedIn } = useMockUser();
  const ctx = useContext(MockAuthContext);
  if (!isSignedIn) return null;
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-indigo-600 border border-white/10 flex items-center justify-center font-bold text-xs text-white">
        {user?.firstName?.[0] || 'U'}
      </div>
      <button 
        onClick={() => ctx?.setIsSignedIn(false)}
        className="text-[10px] text-white/40 hover:text-white font-bold uppercase tracking-wider transition-colors"
      >
        Sign Out
      </button>
    </div>
  );
}

export function MockSignIn() {
  const ctx = useContext(MockAuthContext);
  return (
    <div className="p-8 bg-white/[0.02] border border-white/10 rounded-[32px] max-w-sm w-full text-center">
      <h3 className="text-xl font-bold mb-4">Mock Sign In</h3>
      <button 
        onClick={() => ctx?.setIsSignedIn(true)}
        className="w-full py-4 bg-white text-black font-black uppercase text-xs rounded-xl"
      >
        Sign In as Mock User
      </button>
    </div>
  );
}

export function MockSignUp() {
  const ctx = useContext(MockAuthContext);
  return (
    <div className="p-8 bg-white/[0.02] border border-white/10 rounded-[32px] max-w-sm w-full text-center">
      <h3 className="text-xl font-bold mb-4">Mock Sign Up</h3>
      <button 
        onClick={() => ctx?.setIsSignedIn(true)}
        className="w-full py-4 bg-white text-black font-black uppercase text-xs rounded-xl"
      >
        Sign Up as Mock User
      </button>
    </div>
  );
}
