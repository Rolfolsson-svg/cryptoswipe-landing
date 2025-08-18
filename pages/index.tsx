import dynamic from "next/dynamic";
import React from "react";
import Image from "next/image";
import { Button } from "../components/ui/Button";
import { Shield, Zap, Smartphone, Fingerprint, Coins, ArrowRight, Check, Menu, X } from "lucide-react";
import { Card, CardBody } from "../components/ui/Card";

const SwipeCards = dynamic(() => import("../components/SwipeCards"), { ssr: false });

function Navbar() {
  const [open, setOpen] = React.useState(false);
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-white/10 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between text-white"> {/* 🔥 text vit */}
        <a href="#" className="flex items-center gap-2">
          <Image src="/logo.png" alt="CryptoSwipe" width={36} height={36} />
          <span className="font-semibold tracking-tight text-lg">CryptoSwipe</span>
        </a>
        <nav className="hidden md:flex items-center gap-6 text-sm opacity-90">
          <a href="#features" className="hover:opacity-80">Funktioner</a>
          <a href="#how" className="hover:opacity-80">Så funkar det</a>
          <a href="#pricing" className="hover:opacity-80">Priser</a>
          <a href="#faq" className="hover:opacity-80">FAQ</a>
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" className="rounded-2xl">Logga in</Button>
          <Button className="rounded-2xl">Kom igång</Button>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden p-2 rounded-xl border border-white/15">
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
    </header>
  );
}

function Feature({ icon: Icon, title, desc }: { icon: any; title: string; desc: string }) {
  return (
    <Card className="bg-white/5 backdrop-blur text-white"> {/* 🔥 glas-effekt */}
      <CardBody>
        <div className="h-10 w-10 rounded-2xl grid place-items-center bg-gradient-to-br from-brand-start to-brand-end text-white">
          <Icon size={18} />
        </div>
        <h3 className="font-semibold mt-4">{title}</h3>
        <p className="text-sm opacity-70 mt-1">{desc}</p>
      </CardBody>
    </Card>
  );
}

function PricingTier({ name, price, features, highlight }: { name: string; price: string; features: string[]; highlight?: boolean }) {
  return (
    <Card className={`bg-white/5 backdrop-blur text-white ${highlight ? "ring-2 ring-brand/80 shadow-xl" : ""}`}>
      {/* 🔥 glas-effekt */}
      <CardBody>
        <div className="flex items-baseline justify-between">
          <h4 className="font-semibold">{name}</h4>
          <div className="text-3xl font-bold tracking-tight">
            {price}
            <span className="text-base font-normal opacity-70">/mån</span>
          </div>
        </div>
        <ul className="mt-4 space-y-2 text-sm">
          {features.map((f, i) => (
            <li key={i} className="flex items-start gap-2">
              <Check size={16} className="mt-0.5" /> <span>{f}</span>
            </li>
          ))}
        </ul>
        <Button className="w-full mt-5 rounded-2xl">Välj {name}</Button>
      </CardBody>
    </Card>
  );
}

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-fuchsia-700 text-white"> {/* 🔥 gradient bakgrund */}
      <Navbar />

      <section className="pt-28 md:pt-32 pb-10">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          {/* Vänstra sidan */}
          <div>
            <div className="inline-flex items-center gap-2 text-xs bg-white/10 text-white px-3 py-1 rounded-full">
              <Smartphone size={14} /> Bygg kryptoportfölj med swipe
            </div>
            <h1 className="mt-4 text-4xl md:text-6xl font-bold tracking-tight">
              Investera snabbare med{" "}
              <span className="bg-gradient-to-r from-brand-start to-brand-end bg-clip-text text-transparent">
                CryptoSwipe
              </span>
            </h1>
            <p className="mt-4 text-base opacity-80 max-w-prose">
              Utforska tokens, swipa höger/vänster och bygg en diversifierad portfölj på några sekunder.
              Icke-förvar, låga avgifter och bankklassad säkerhet.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button className="rounded-2xl">
                Kom igång gratis <ArrowRight className="ml-2" size={16} />
              </Button>
              <Button variant="ghost" className="rounded-2xl">
                Se demo
              </Button>
            </div>
            <div className="mt-6 flex items-center gap-3 text-xs opacity-80">
              <Fingerprint size={16} /> <span>Verifierat med biometriskt skydd</span>
            </div>
          </div>

          {/* Högra sidan: SwipeCards */}
          <div className="relative">
            <div className="absolute -inset-6 blur-2xl bg-gradient-to-tr from-brand-start/30 to-brand-end/30 rounded-[3rem]" />
            <div className="relative rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur p-6 shadow-2xl">
              <div className="h-[520px] w-full max-w-sm mx-auto">
                <SwipeCards />
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <Button variant="ghost" className="rounded-2xl">Sälj</Button>
                <Button className="rounded-2xl">Köp</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-6">
          <Feature icon={Zap} title="Blixtsnabb onboarding" desc="Skapa konto och börja swipa på under en minut – utan KYC för småbelopp." />
          <Feature icon={Shield} title="Säkerhet i fokus" desc="Icke-förvar, hårdvarunycklar och smarta riskgränser skyddar dina medel." />
          <Feature icon={Coins} title="Smart orderrouting" desc="Får automatiskt bästa pris via ledande DEX:ar/CEX:ar med låg slippage." />
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-6 items-stretch">
          <PricingTier name="Free" price="0 kr" features={["Upp till 5 köp/mån","Grundläggande analyser","E-postsupport"]} />
          <PricingTier name="Pro" price="129 kr" highlight features={["Obegränsade köp","Avancerade signaler","Prioriterad support"]} />
          <PricingTier name="Team" price="299 kr" features={["Delade portföljer","Behörigheter","SLA-support"]} />
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 max-w-4xl mx-auto px-4">
        <div className="bg-white/5 backdrop-blur rounded-2xl p-6 text-white"> {/* 🔥 glas-effekt */}
          <h3 className="text-2xl font-semibold">Vanliga frågor</h3>
          <div className="mt-6 space-y-4">
            <details className="p-4 rounded-xl bg-white/5">
              <summary className="font-medium cursor-pointer">Är CryptoSwipe en förvaringsplånbok?</summary>
              <p className="mt-2 text-sm opacity-80">Nej. Vi är icke-förvar – du äger dina nycklar och ansluter din egen plånbok.</p>
            </details>
            <details className="p-4 rounded-xl bg-white/5">
              <summary className="font-medium cursor-pointer">Vilka kedjor stöds?</summary>
              <p className="mt-2 text-sm opacity-80">Startar med Ethereum och Arbitrum; fler EVM-kedjor läggs till löpande.</p>
            </details>
            <details className="p-4 rounded-xl bg-white/5">
              <summary className="font-medium cursor-pointer">Tar ni avgifter?</summary>
              <p className="mt-2 text-sm opacity-80">Gratis för småvolymer. Pro och Team erbjuder lägre spread och premiumfunktioner.</p>
            </details>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-white/10 text-sm opacity-80 text-center">
        © {new Date().getFullYear()} CryptoSwipe AB
      </footer>
    </div>
  );
}
