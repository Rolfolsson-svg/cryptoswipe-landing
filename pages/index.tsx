import React, { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { Shield, Zap, Smartphone, Fingerprint, Coins, ArrowRight, Check, Menu, X, Star, Lock } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card, CardBody } from "../components/ui/Card";
import confetti from "canvas-confetti"; // 🎉 konfetti

// ====================== NAVBAR ======================
function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-white/10 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between text-white">
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

// ====================== SWIPE CARD ======================
function SwipeCard({ i, onRemove }: { i: number; onRemove: (dir: "left" | "right") => void }) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 0, 200], [-12, 0, 12]);
  const opacity = useTransform(x, [-200, 0, 200], [0.4, 1, 0.4]);
  const likeOpacity = useTransform(x, [80, 160], [0, 1]);
  const nopeOpacity = useTransform(x, [-160, -80], [1, 0]);

  const fling = (dir: "left" | "right") => {
    if (dir === "right") {
      // 🎉 konfetti vid höger-swipe
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
    onRemove(dir);
  };

  return (
    <motion.div
      className="absolute inset-0"
      style={{ x, rotate, opacity }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.8}
      onDragEnd={(_, info) => {
        if (info.offset.x > 160 || info.velocity.x > 800) fling("right");
        if (info.offset.x < -160 || info.velocity.x < -800) fling("left");
      }}
    >
      <div className="h-full rounded-3xl overflow-hidden shadow-2xl">
        <div className="h-full relative text-white bg-gradient-to-br from-slate-900 via-indigo-900 to-fuchsia-700">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.12),transparent_60%)]" />

          {/* Top badges */}
          <div className="p-6 flex items-start justify-between">
            <span className="inline-flex items-center gap-2 text-xs bg-white/10 px-3 py-1 rounded-full">
              <Shield size={14}/> Säker verifiering
            </span>
            <Star className="opacity-70" size={18} />
          </div>

          {/* Content */}
          <div className="px-6 pb-6 flex flex-col h-full justify-end">
            <h3 className="text-2xl font-semibold">Token #{i + 1}</h3>
            <p className="text-sm opacity-90">
              Snabbt val med höger/vänster-swipe. Bygg din korg på sekunder.
            </p>
            <div className="mt-4 flex items-center gap-3 text-xs">
              <span className="inline-flex items-center gap-1 bg-white/10 px-2 py-1 rounded-full"><Zap size={14}/> Snabb</span>
              <span className="inline-flex items-center gap-1 bg-white/10 px-2 py-1 rounded-full"><Lock size={14}/> Icke-förvar</span>
              <span className="inline-flex items-center gap-1 bg-white/10 px-2 py-1 rounded-full"><Coins size={14}/> Låga avgifter</span>
            </div>

            {/* Knapparna ingår i kortet */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                onClick={(e) => { e.stopPropagation(); fling("left"); }}
                className="btn-ghost rounded-2xl border border-white/15 px-4 py-2"
              >
                Sälj
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); fling("right"); }}
                className="btn rounded-2xl px-4 py-2"
              >
                Köp
              </button>
            </div>
          </div>

          {/* Swipe labels */}
          <motion.div style={{ opacity: likeOpacity }} className="absolute top-5 left-5">
            <div className="uppercase tracking-widest text-xs bg-emerald-400 text-slate-900 px-3 py-1 rounded-full">Köp</div>
          </motion.div>
          <motion.div style={{ opacity: nopeOpacity }} className="absolute top-5 right-5">
            <div className="uppercase tracking-widest text-xs bg-rose-400 text-slate-900 px-3 py-1 rounded-full">Sälj</div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

// ====================== SWIPE DECK ======================
function SwipeDeck() {
  const [cards, setCards] = useState([0, 1, 2, 3]);
  const removeTop = () => setCards((c) => c.slice(0, -1));
  return (
    <div className="relative h-[520px] w-full max-w-sm mx-auto">
      <AnimatePresence>
        {cards.map((c) => (
          <SwipeCard key={c} i={c} onRemove={() => removeTop()} />
        ))}
      </AnimatePresence>
      {cards.length === 0 && (
        <Card className="absolute inset-0 grid place-items-center">
          <CardBody className="text-center">
            <h4 className="font-semibold">Klart! 🎉</h4>
            <p className="text-sm opacity-70">Du har byggt din korg. Tryck på "Köp" för att slutföra.</p>
          </CardBody>
        </Card>
      )}
    </div>
  );
}

// ====================== FEATURE ======================
function Feature({icon:Icon, title, desc}:{icon: any; title:string; desc:string}){
  return (
    <Card className="bg-white/5 backdrop-blur text-white">
      <CardBody>
        <div className="h-10 w-10 rounded-2xl grid place-items-center bg-gradient-to-br from-brand-start to-brand-end text-white">
          <Icon size={18}/>
        </div>
        <h3 className="font-semibold mt-4">{title}</h3>
        <p className="text-sm opacity-70 mt-1">{desc}</p>
      </CardBody>
    </Card>
  )
}

// ====================== PRICING ======================
function PricingTier({name, price, features, highlight}:{name:string; price:string; features:string[]; highlight?:boolean}){
  return (
    <Card className={`bg-white/5 backdrop-blur text-white ${highlight ? 'ring-2 ring-brand/80 shadow-xl' : ''}`}>
      <CardBody>
        <div className="flex items-baseline justify-between">
          <h4 className="font-semibold">{name}</h4>
          <div className="text-3xl font-bold tracking-tight">{price}<span className="text-base font-normal opacity-70">/mån</span></div>
        </div>
        <ul className="mt-4 space-y-2 text-sm">
          {features.map((f,i)=>(
            <li key={i} className="flex items-start gap-2"><Check size={16} className="mt-0.5"/> <span>{f}</span></li>
          ))}
        </ul>
        <Button className="w-full mt-5 rounded-2xl">Välj {name}</Button>
      </CardBody>
    </Card>
  )
}

// ====================== PAGE ======================
export default function Page(){
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-fuchsia-700 text-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 md:pt-32 pb-10">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-xs bg-white/10 text-white px-3 py-1 rounded-full">
              <Smartphone size={14}/> Bygg kryptoportfölj med swipe
            </div>
            <h1 className="mt-4 text-4xl md:text-6xl font-bold tracking-tight">
              Investera snabbare med <span className="bg-gradient-to-r from-brand-start to-brand-end bg-clip-text text-transparent">CryptoSwipe</span>
            </h1>
            <p className="mt-4 text-base opacity-80 max-w-prose">
              Utforska tokens, swipa höger/vänster och bygg en diversifierad portfölj på några sekunder.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button className="rounded-2xl">Kom igång gratis <ArrowRight className="ml-2" size={16}/></Button>
              <Button variant="ghost" className="rounded-2xl">Se demo</Button>
            </div>
            <div className="mt-6 flex items-center gap-3 text-xs opacity-80">
              <Fingerprint size={16}/> <span>Verifierat med biometriskt skydd</span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 blur-2xl bg-gradient-to-tr from-brand-start/30 to-brand-end/30 rounded-[3rem]" />
            <div className="relative rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur p-6 shadow-2xl">
              <SwipeDeck />
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
        <div className="bg-white/5 backdrop-blur rounded-2xl p-6 text-white">
          <h3 className="text-2xl font-semibold">Vanliga frågor</h3>
          <div className="mt-6 space-y-4">
            <details className="p-4 rounded-xl bg-white/5">
              <summary className="font-medium cursor-pointer">Är CryptoSwipe en förvaringsplånbok?</summary>
              <p className="mt-2 text-sm opacity-80">Nej. Vi är icke-förvar – du äger dina nycklar.</p>
            </details>
            <details className="p-4 rounded-xl bg-white/5">
              <summary className="font-medium cursor-pointer">Vilka kedjor stöds?</summary>
              <p className="mt-2 text-sm opacity-80">Ethereum och Arbitrum; fler EVM-kedjor kommer.</p>
            </details>
          </div>
        </div>
      </section>

      <footer className="py-10 border-t border-white/10 text-sm opacity-80 text-center">
        © {new Date().getFullYear()} CryptoSwipe AB
      </footer>
    </div>
  )
}
