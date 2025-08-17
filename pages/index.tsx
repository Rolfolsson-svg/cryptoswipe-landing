import dynamic from "next/dynamic";
import React from "react";
import Image from "next/image";
import { Button } from "../components/ui/Button";
import { Card, CardBody } from "../components/ui/Card";
import {
  Shield,
  Zap,
  Smartphone,
  Fingerprint,
  Coins,
  ArrowRight,
  Star,
  Lock,
  Menu,
  X,
  Check,
} from "lucide-react";

const SwipeCards = dynamic(() => import("../components/SwipeCards"), {
  ssr: false,
});

function Navbar() {
  const [open, setOpen] = React.useState(false);
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-white/10 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <Image src="/logo.png" alt="CryptoSwipe" width={36} height={36} />
          <span className="font-semibold tracking-tight text-lg">
            CryptoSwipe
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-6 text-sm opacity-90">
          <a href="#features" className="hover:opacity-80">
            Funktioner
          </a>
          <a href="#how" className="hover:opacity-80">
            Så funkar det
          </a>
          <a href="#pricing" className="hover:opacity-80">
            Priser
          </a>
          <a href="#faq" className="hover:opacity-80">
            FAQ
          </a>
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" className="rounded-2xl">
            Logga in
          </Button>
          <Button className="rounded-2xl">Kom igång</Button>
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-xl border border-white/15"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-white/10">
          <div className="max-w-6xl mx-auto px-4 py-4 grid gap-3 text-sm">
            <a href="#features" onClick={() => setOpen(false)}>
              Funktioner
            </a>
            <a href="#how" onClick={() => setOpen(false)}>
              Så funkar det
            </a>
            <a href="#pricing" onClick={() => setOpen(false)}>
              Priser
            </a>
            <a href="#faq" onClick={() => setOpen(false)}>
              FAQ
            </a>
            <div className="flex gap-2 pt-2">
              <Button variant="ghost" className="flex-1 rounded-2xl">
                Logga in
              </Button>
              <Button className="flex-1 rounded-2xl">Kom igång</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function Feature({
  icon: Icon,
  title,
  desc,
}: {
  icon: any;
  title: string;
  desc: string;
}) {
  return (
    <Card>
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

function PricingTier({
  name,
  price,
  features,
  highlight,
}: {
  name: string;
  price: string;
  features: string[];
  highlight?: boolean;
}) {
  return (
    <Card className={highlight ? "ring-2 ring-brand/80 shadow-xl" : ""}>
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
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <section className="pt-28 md:pt-32 pb-10">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
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
              Utforska tokens, swipa höger/vänster och bygg en diversifierad
              portfölj på några sekunder. Icke-förvar, låga avgifter och
              bankklassad säkerhet.
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
              <Fingerprint size={16} />{" "}
              <span>Verifierat med biometriskt skydd</span>
            </div>
          </div>

          {/* 👉 Här använder vi SwipeCards istället för SwipeDeck */}
          <div className="relative">
            <div className="absolute -inset-6 blur-2xl bg-gradient-to-tr from-brand-start/30 to-brand-end/30 rounded-[3rem]" />
            <div className="relative rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur p-6 shadow-2xl">
              <SwipeCards />
            </div>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-xs uppercase tracking-widest opacity-60">
            Betrodd av tidiga användare på
          </div>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-6 opacity-60">
            {[
              "BlockWave",
              "NordChain",
              "ZeroEx",
              "Viking Ventures",
              "Arctic Labs",
            ].map((l) => (
              <div
                key={l}
                className="h-10 rounded-xl border border-white/10 grid place-items-center text-sm"
              >
                {l}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            <Feature
              icon={Zap}
              title="Blixtsnabb onboarding"
              desc="Skapa konto och börja swipa på under en minut – utan KYC för småbelopp."
            />
            <Feature
              icon={Shield}
              title="Säkerhet i fokus"
              desc="Icke-förvar, hårdvarunycklar och smarta riskgränser skyddar dina medel."
            />
            <Feature
              icon={Coins}
              title="Smart orderrouting"
              desc="Får automatiskt bästa pris via ledande DEX:ar/CEX:ar med låg slippage."
            />
          </div>
        </div>
      </section>

      <section id="how" className="py-16">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-6 items-start">
          {[1, 2, 3].map((s) => (
            <Card key={s}>
              <CardBody>
                <div className="h-8 w-8 rounded-xl grid place-items-center bg-white/10 font-semibold">
                  {s}
                </div>
                <h4 className="font-semibold mt-4">
                  {s === 1
                    ? "Välj strategi"
                    : s === 2
                    ? "Swipa tokens"
                    : "Köp och följ"}
                </h4>
                <p className="text-sm opacity-70 mt-1">
                  {s === 1 &&
                    "Välj risknivå och tema – t.ex. L1, DeFi eller AI."}
                  {s === 2 &&
                    "Höger för gilla, vänster för hoppa över. Vi balanserar automatiskt vikter."}
                  {s === 3 &&
                    "Genomför köpet och följ resultat i realtid, med varningar vid större rörelser."}
                </p>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>

      <section id="pricing" className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 items-stretch">
            <PricingTier
              name="Free"
              price="0 kr"
              features={[
                "Upp till 5 köp/mån",
                "Grundläggande analyser",
                "E-postsupport",
              ]}
            />
            <PricingTier
              name="Pro"
              price="129 kr"
              highlight
              features={[
                "Obegränsade köp",
                "Avancerade signaler",
                "Prioriterad support",
              ]}
            />
            <PricingTier
              name="Team"
              price="299 kr"
              features={[
                "Delade portföljer",
                "Behörigheter",
                "SLA-support",
              ]}
            />
          </div>
        </div>
      </section>

      <section id="faq" className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="text-2xl font-semibold">Vanliga frågor</h3>
          <div className="mt-6 space-y-4">
            <details className="card p-4">
              <summary className="font-medium cursor-pointer">
                Är CryptoSwipe en förvaringsplånbok?
              </summary>
              <p className="mt-2 text-sm opacity-80">
                Nej. Vi är icke-förvar – du äger dina nycklar och ansluter din
                egen plånbok.
              </p>
            </details>
            <details className="card p-4">
              <summary className="font-medium cursor-pointer">
                Vilka kedjor stöds?
              </summary>
              <p className="mt-2 text-sm opacity-80">
                Startar med Ethereum och Arbitrum; fler EVM-kedjor läggs till
                löpande.
              </p>
            </details>
            <details className="card p-4">
              <summary className="font-medium cursor-pointer">
                Tar ni avgifter?
              </summary>
              <p className="mt-2 text-sm opacity-80">
                Gratis för småvolymer. Pro och Team erbjuder lägre spread och
                premiumfunktioner.
              </p>
            </details>
          </div>
        </div>
      </section>

      <section className="py-20 text-center">
        <h3 className="text-3xl md:text-4xl font-bold tracking-tight">
          Redo att swipa din första portfölj?
        </h3>
        <p className="mt-2 opacity-80">
          Skapa konto på <span className="font-medium">under 60 sekunder</span>.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Button className="rounded-2xl">Kom igång</Button>
          <Button variant="ghost" className="rounded-2xl">
            Boka demo
          </Button>
        </div>
      </section>

      <footer className="py-10 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 text-sm flex flex-col md:flex-row items-center md:items-start gap-6 justify-between">
          <div className="opacity-70">
            © {new Date().getFullYear()} CryptoSwipe AB
          </div>
          <div className="flex gap-6 opacity-80">
            <a href="#">Integritet</a>
            <a href="#">Villkor</a>
            <a href="#">Kontakt</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
