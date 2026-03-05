"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const AlexMax = dynamic(() => import("@/components/AlexMax"), { ssr: false });
const ZoeAaron = dynamic(() => import("@/components/ZoeAaron"), { ssr: false });
const BenAbby = dynamic(() => import("@/components/BenAbby"), { ssr: false });
const BenMaximus = dynamic(() => import("@/components/BenMaximus"), { ssr: false });

const TABS = [
  { id: "alex-max", label: "Alex & Max" },
  { id: "zoe-aaron", label: "Zoe & Aaron" },
  { id: "ben-abby", label: "Ben & Abby" },
  { id: "ben-maximus", label: "Ben & Maximus" },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("alex-max");

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="flex min-h-screen">
        <aside className="fixed top-0 left-0 z-50 flex h-screen w-48 flex-col items-start justify-center gap-3 border-r border-zinc-800 bg-zinc-950 px-4 font-sans">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full rounded-xl px-4 py-3 text-left text-sm font-medium transition ${
                activeTab === tab.id
                  ? "bg-amber-500/15 text-amber-300 ring-1 ring-amber-500/40"
                  : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </aside>

        <main className="ml-48 flex-1 bg-zinc-950">
          {activeTab === "alex-max" && <AlexMax />}
          {activeTab === "zoe-aaron" && <ZoeAaron />}
          {activeTab === "ben-abby" && <BenAbby />}
          {activeTab === "ben-maximus" && <BenMaximus />}
        </main>
      </div>
    </div>
  );
}
