"use client";
import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LightSlider from "../components/LightSlider";
import Contact from "../components/Contact";
const Glow = dynamic(() => import("../components/Glow"), { ssr: false });

const PHONE = "09879914995", WA = "919879914995";
const MAP_LINK = "https://maps.app.goo.gl/by6a4PDN9fHnJVmLA";
const MAP_EMBED = "https://www.google.com/maps?q=TJ+Mistry+Interior+Nirvana+Shoppers+Dandi+Rd+Jahangirabad+Surat+395005&output=embed";
const work = [
  { src: "/images/p1.jpg", t: "Living room", d: "Grey sectional, white panelling, balcony light" },
  { src: "/images/p2.jpg", t: "TV unit", d: "Marble-finish wall with backlit panel" },
  { src: "/images/p4.jpg", t: "Hall with cove lights", d: "Double amber cove and curtain wall" },
  { src: "/images/p8.jpg", t: "Pooja mandir", d: "Jali backdrop lit from inside" },
  { src: "/images/p9.jpg", t: "Modular kitchen", d: "Soft-close drawers, stone counter" },
  { src: "/images/p10.jpg", t: "Carved mandir", d: "Hand-carved Om panel with halo light" },
  { src: "/images/p6.jpg", t: "Kitchen", d: "Two-sided counter with tall windows" },
];
const services = [
  ["Full home interiors", "Living, bedrooms, kitchen and storage planned together, so the whole flat feels like one home."],
  ["Modular kitchens", "Drawer-first layouts with stone counters and fittings sized to how you cook."],
  ["TV units and wall panelling", "Marble-finish, wood and backlit panels that turn a blank wall into the room's focus."],
  ["Pooja mandirs", "Carved or modern mandirs with jali backdrops and warm lighting."],
  ["False ceilings and cove lighting", "Clean ceiling lines with warm LED coves that set the mood at night."],
];
const steps = [
  ["Visit the studio", "Bring your flat plan or photos. We listen and measure."],
  ["See the design", "Layouts and materials shown before anything is ordered."],
  ["We build", "Carpentry, ceiling, lighting and finishing handled by one team."],
  ["Handover", "A walk-through of every unit and light before you move in."],
];
const hours = [["Monday to Saturday", "10 am – 9 pm"], ["Sunday", "10 am – 1:30 pm"]];

export default function Home() {
  const root = useRef(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // One orchestrated moment: the hero headline rises line by line.
      gsap.from(".hl span", { yPercent: 110, duration: 1.2, stagger: 0.15, ease: "expo.out", delay: 0.3 });
      gsap.from(".hero-sub, .hero-cta", { opacity: 0, y: 20, duration: 1, delay: 1.1, stagger: 0.15 });
      gsap.to(".hero-video", { scale: 1.12, scrollTrigger: { trigger: ".hero", scrub: true, start: "top top", end: "bottom top" } });
      const mm = gsap.matchMedia();
      mm.add("(min-width: 900px)", () => {
        const track = document.querySelector(".track");
        gsap.to(track, { x: () => -(track.scrollWidth - innerWidth + 80), ease: "none",
          scrollTrigger: { trigger: ".work", pin: true, scrub: 1, end: () => "+=" + track.scrollWidth, invalidateOnRefresh: true } });
      });
      gsap.utils.toArray(".panel img").forEach((im) =>
        gsap.fromTo(im, { scale: 1.15 }, { scale: 1, ease: "none", scrollTrigger: { trigger: im, scrub: true, start: "top bottom", end: "bottom top" } }));
      gsap.from(".svc li", { opacity: 0, y: 30, stagger: 0.1, scrollTrigger: { trigger: ".svc", start: "top 80%" } });
      gsap.from(".step", { opacity: 0, x: -30, stagger: 0.15, scrollTrigger: { trigger: ".steps", start: "top 80%" } });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={root}>
      <nav className="nav">
        <a href="#top" className="logo">TJ Mistry Interior</a>
        <div><a href="#work">Work</a><a href="#services">Services</a><a href="#visit">Visit</a><a className="btn sm" href={`tel:${PHONE}`}>Call {PHONE}</a></div>
      </nav>

      <section className="hero" id="top">
        <video className="hero-video" src="/hero.mp4" poster="/images/p4.jpg" autoPlay muted loop playsInline />
        <div className="shade" />
        <Glow />
        <div className="hero-in">
          <h1 className="hl"><span>Homes in Surat,</span><span>finished in light.</span></h1>
          <p className="hero-sub">Interiors, kitchens, mandirs and ceilings, designed and built under one roof on Dandi Road.</p>
          <div className="hero-cta">
            <a className="btn" href="#visit">Plan your home</a>
            <a className="btn ghost" href={`https://wa.me/${WA}`} target="_blank" rel="noreferrer">Chat on WhatsApp</a>
          </div>
        </div>
      </section>

      <section className="work" id="work">
        <div className="work-head"><h2>Rooms we have finished</h2><p>Scroll sideways through real homes.</p></div>
        <div className="track">
          {work.map((w) => (
            <figure className="panel" key={w.src}>
              <div className="ph"><img src={w.src} alt={w.t} /></div>
              <figcaption><b>{w.t}</b><span>{w.d}</span></figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="light">
        <div className="light-txt">
          <h2>Good lighting is half the design</h2>
          <p>Our cove lights change a room after sunset. Drag the handle to see the same hall with the lights dimmed and on.</p>
        </div>
        <LightSlider src="/images/p4.jpg" />
      </section>

      <section className="services" id="services">
        <h2>What we build</h2>
        <ul className="svc">
          {services.map(([t, d]) => (<li key={t}><h3>{t}</h3><p>{d}</p></li>))}
        </ul>
      </section>

      <section className="process">
        <h2>How a project runs</h2>
        <ol className="steps">
          {steps.map(([t, d], i) => (<li className="step" key={t}><span>{i + 1}</span><div><h3>{t}</h3><p>{d}</p></div></li>))}
        </ol>
      </section>

      <section className="visit" id="visit">
        <div className="visit-l">
          <h2>Visit the studio</h2>
          <address>TJ Mistry Interior, Nirvana Shoppers, 129, Dandi Rd, opp. CNG pump, Jahangirabad, Dahin Nagar, Surat, Gujarat 395005</address>
          <dl className="hours">{hours.map(([d, t]) => (<div key={d}><dt>{d}</dt><dd>{t}</dd></div>))}</dl>
          <a className="btn" href={`tel:${PHONE}`}>Call {PHONE}</a>
          <a className="btn ghost" href={MAP_LINK} target="_blank" rel="noreferrer">Open in Google Maps</a>
          <Contact />
        </div>
        <iframe className="map" title="TJ Mistry Interior on Google Maps" src={MAP_EMBED} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      </section>

      <footer><span>© {new Date().getFullYear()} TJ Mistry Interior, Surat</span><a href={`tel:${PHONE}`}>{PHONE}</a></footer>
      <a className="wa" href={`https://wa.me/${WA}`} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp">WhatsApp</a>
    </main>
  );
}
