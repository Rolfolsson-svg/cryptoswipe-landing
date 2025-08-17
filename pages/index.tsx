import dynamic from "next/dynamic";
const SwipeCards = dynamic(() => import("../components/SwipeCards"), { ssr: false });




import React from 'react'
import Image from 'next/image'
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion'
import { Button } from '../components/ui/Button'
import { Card, CardBody } from '../components/ui/Card'
import { Shield, Zap, Smartphone, Fingerprint, Coins, ArrowRight, Star, Lock, Menu, X, Check } from 'lucide-react'

function Navbar() {
  const [open, setOpen] = React.useState(false)
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-white/10 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
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
        <button onClick={()=>setOpen(!open)} className="md:hidden p-2 rounded-xl border border-white/15">
          {open ? <X size={18}/> : <Menu size={18}/>}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-white/10">
          <div className="max-w-6xl mx-auto px-4 py-4 grid gap-3 text-sm">
            <a href="#features" onClick={()=>setOpen(false)}>Funktioner</a>
            <a href="#how" onClick={()=>setOpen(false)}>Så funkar det</a>
            <a href="#pricing" onClick={()=>setOpen(false)}>Priser</a>
            <a href="#faq" onClick={()=>setOpen(false)}>FAQ</a>
            <div className="flex gap-2 pt-2">
              <Button variant="ghost" className="flex-1 rounded-2xl">Logga in</Button>
              <Button className="flex-1 rounded-2xl">Kom igång</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

function SwipeCard({ i, onRemove }: { i:number; onRemove: ()=>void }) {
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 0, 200], [-12, 0, 12])
  const opacity = useTransform(x, [-200, 0, 200], [0.4, 1, 0.4])
  const likeOpacity = useTransform(x, [80, 160], [0, 1])
  const nopeOpacity = useTransform(x, [-160, -80], [1, 0])
  return (
    <motion.div
      className="absolute inset-0"
      style={{ x, rotate, opacity }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.8}
      onDragEnd={(e, info) => {
        if (info.offset.x > 160 || info.velocity.x > 800) onRemove()
        if (info.offset.x < -160 || info.velocity.x < -800) onRemove()
      }}
    >
      <div className="h-full rounded-3xl overflow-hidden shadow-2xl">
        <div className="h-full relative text-white bg-gradient-to-br from-slate-900 via-indigo-900 to-fuchsia-700">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.12),transparent_60%)]" />
          <div className="p-6 flex items-start justify-between">
            <span className="inline-flex items-center gap-2 text-xs bg-white/10 px-3 py-1 rounded-full">
              <Shield size={14}/> Säker verifiering
            </span>
            <Star className="opacity-70" size={18} />
          </div>
          <div className="px-6 pb-6 flex flex-col h-full justify-end">
            <h3 className="text-2xl font-semibold">Token #{i+1}</h3>
            <p className="text-sm opacity-90">Snabbt val med höger/vänster-swipe. Bygg din korg på sekunder.</p>
            <div className="mt-4 flex items-center gap-3 text-xs">
              <span className="inline-flex items-center gap-1 bg-white/10 px-2 py-1 rounded-full"><Zap size={14}/> Snabb</span>
              <span className="inline-flex items-center gap-1 bg-white/10 px-2 py-1 rounded-full"><Lock size={14}/> Icke-förvar</span>
              <span className="inline-flex items-center gap-1 bg-white/10 px-2 py-1 rounded-full"><Coins size={14}/> Låga avgifter</span>
            </div>
          </div>
          <motion.div style={{ opacity: likeOpacity }} className="absolute top-5 left-5">
            <div className="uppercase tracking-widest text-xs bg-emerald-400 text-slate-900 px-3 py-1 rounded-full">Like</div>
          </motion.div>
          <motion.div style={{ opacity: nopeOpacity }} className="absolute top-5 right-5">
            <div className="uppercase tracking-widest text-xs bg-rose-400 text-slate-900 px-3 py-1 rounded-full">Nope</div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

function SwipeDeck() {
  const [cards, setCards] = React.useState([0,1,2,3])
  const removeTop = () => setCards((c) => c.slice(0, -1))
  return (
    <div className="relative h-[520px] w-full max-w-sm mx-auto">
      <AnimatePresence>
        {cards.map((c) => (
          <SwipeCard key={c} i={c} onRemove={removeTop} />
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
  )
}

function Feature({icon:Icon, title, desc}:{icon: any; title:string; desc:string}){
  return (
    <Card>
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

function PricingTier({name, price, features, highlight}:{name:string; price:string; features:string[]; highlight?:boolean}){
  return (
    <Card className={highlight ? 'ring-2 ring-brand/80 shadow-xl' : ''}>
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

export default function Page(){
  return ( <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <SwipeCards />
    <div className="min-h-screen">
      <Navbar />

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
              Icke-förvar, låga avgifter och bankklassad säkerhet.
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
              <div className="mt-6 grid grid-cols-2 gap-3">
                <Button variant="ghost" className="rounded-2xl">Nej tack</Button>
                <Button className="rounded-2xl">Köp</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-xs uppercase tracking-widest opacity-60">Betrodd av tidiga användare på</div>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-6 opacity-60">
            {["BlockWave","NordChain","ZeroEx","Viking Ventures","Arctic Labs"].map((l)=>(
              <div key={l} className="h-10 rounded-xl border border-white/10 grid place-items-center text-sm">{l}</div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            <Feature icon={Zap} title="Blixtsnabb onboarding" desc="Skapa konto och börja swipa på under en minut – utan KYC för småbelopp." />
            <Feature icon={Shield} title="Säkerhet i fokus" desc="Icke-förvar, hårdvarunycklar och smarta riskgränser skyddar dina medel." />
            <Feature icon={Coins} title="Smart orderrouting" desc="Får automatiskt bästa pris via ledande DEX:ar/CEX:ar med låg slippage." />
          </div>
        </div>
      </section>

      <section id="how" className="py-16">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-6 items-start">
          {[1,2,3].map((s)=> (
            <Card key={s}>
              <CardBody>
                <div className="h-8 w-8 rounded-xl grid place-items-center bg-white/10 font-semibold">{s}</div>
                <h4 className="font-semibold mt-4">{s===1?'Välj strategi': s===2?'Swipa tokens':'Köp och följ'}</h4>
                <p className="text-sm opacity-70 mt-1">
                  {s===1 && 'Välj risknivå och tema – t.ex. L1, DeFi eller AI.'}
                  {s===2 && 'Höger för gilla, vänster för hoppa över. Vi balanserar automatiskt vikter.'}
                  {s===3 && 'Genomför köpet och följ resultat i realtid, med varningar vid större rörelser.'}
                </p>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>

      <section id="pricing" className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 items-stretch">
            <PricingTier name="Free" price="0 kr" features={["Upp till 5 köp/mån","Grundläggande analyser","E-postsupport"]} />
            <PricingTier name="Pro" price="129 kr" highlight features={["Obegränsade köp","Avancerade signaler","Prioriterad support"]} />
            <PricingTier name="Team" price="299 kr" features={["Delade portföljer","Behörigheter","SLA-support"]} />
          </div>
        </div>
      </section>

      <section id="faq" className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="text-2xl font-semibold">Vanliga frågor</h3>
          <div className="mt-6 space-y-4">
            <details className="card p-4">
              <summary className="font-medium cursor-pointer">Är CryptoSwipe en förvaringsplånbok?</summary>
              <p className="mt-2 text-sm opacity-80">Nej. Vi är icke-förvar – du äger dina nycklar och ansluter din egen plånbok.</p>
            </details>
            <details className="card p-4">
              <summary className="font-medium cursor-pointer">Vilka kedjor stöds?</summary>
              <p className="mt-2 text-sm opacity-80">Startar med Ethereum och Arbitrum; fler EVM-kedjor läggs till löpande.</p>
            </details>
            <details className="card p-4">
              <summary className="font-medium cursor-pointer">Tar ni avgifter?</summary>
              <p className="mt-2 text-sm opacity-80">Gratis för småvolymer. Pro och Team erbjuder lägre spread och premiumfunktioner.</p>
            </details>
          </div>
        </div>
      </section>

      <section className="py-20 text-center">
        <h3 className="text-3xl md:text-4xl font-bold tracking-tight">Redo att swipa din första portfölj?</h3>
        <p className="mt-2 opacity-80">Skapa konto på <span className="font-medium">under 60 sekunder</span>.</p>
        <div className="mt-6 flex justify-center gap-3">
          <Button className="rounded-2xl">Kom igång</Button>
          <Button variant="ghost" className="rounded-2xl">Boka demo</Button>
        </div>
      </section>

      <footer className="py-10 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 text-sm flex flex-col md:flex-row items-center md:items-start gap-6 justify-between">
          <div className="opacity-70">© {new Date().getFullYear()} CryptoSwipe AB</div>
          <div className="flex gap-6 opacity-80">
            <a href="#">Integritet</a>
            <a href="#">Villkor</a>
            <a href="#">Kontakt</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
