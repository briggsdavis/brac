import { motion, useScroll, useSpring } from "motion/react";
import ParallaxImage from "./ParallaxImage";
import { useEffect, useState } from "react";

const OPPORTUNITIES = [
  {
    id: "multi-unit",
    number: "01",
    title: "The Four-Unit Yield",
    subtitle: "The Developer Play",
    objective: "Renovate the existing structure into four standalone luxury units — three floors plus the detached stone stable.",
    strategy: "Convert each floor into a private suite with independent entrances, and convert the detached stone stable into a compact garden apartment with its own private access from the lower garden.",
    financialUpside: "Four independent units quadruple the occupancy potential. In Brač, luxury stone apartments in heritage villages like Dol rent for €150–€250 per night during peak season. The stable unit, positioned as a boutique garden retreat, can command a premium.",
    target: "Investors looking for high-yield short-term rental income through platforms like Airbnb and Booking.com.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: "capital-appreciation",
    number: "02",
    title: "The Capital Appreciation Play",
    subtitle: "The Flip",
    objective: "Buy as a ruin, renovate to \"Turnkey\" status, and resell.",
    strategy: "Leverage the \"Protected Village\" status. Because new construction is strictly limited in Dol, renovated stone houses are \"rare assets.\"",
    financialUpside: "Unrenovated ruins on Brač often sell for €150,000–€250,000, while fully restored luxury stone villas in the same area can command €600,000 to €1.2M+ depending on the finish and views.",
    target: "Professional flippers or equity investors.",
    image: "https://images.unsplash.com/photo-1600607687940-47a0f9259017?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: "digital-nomad",
    number: "03",
    title: "The Digital Nomad / Co-Living Hub",
    subtitle: "Work-from-Paradise",
    objective: "A \"Work-from-Paradise\" rental model.",
    strategy: "One unit serves as a communal \"Co-working\" space with high-speed Starlink internet, while the other two provide private accommodation.",
    financialUpside: "High-occupancy during the \"shoulder seasons\" (May, June, September, October) when traditional tourists are gone but digital nomads are seeking monthly stays.",
    target: "Investors targeting the growing \"Remote Work\" migration to Croatia following the 2023 Schengen/Eurozone entry.",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: "family-estate",
    number: "04",
    title: "The Modern Heritage Family Estate",
    subtitle: "Legacy Home",
    objective: "A single-family \"Legacy Home\" that blends 200-year-old stone with a high-tech interior.",
    strategy: "Keep the main house as one large connected home — Guest wing, Kids' wing, Master suite — while converting the detached stone stable into a caretaker's cottage or private guest annexe. Add an infinity pool overlooking the 2.2km valley view to the sea.",
    lifestyleValue: "A secure, \"off-the-grid\" feel in a protected eco-ethno village, yet only 5 minutes from the ferry port in Postira.",
    target: "High-net-worth families seeking a private summer compound.",
    image: "https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: "retirement",
    number: "05",
    title: "The \"Golden Years\" Retirement Retreat",
    subtitle: "Sanctuary",
    objective: "A low-maintenance, high-comfort sanctuary for year-round living.",
    strategy: "Focus on the ground floor as the primary living space with underfloor heating (crucial for Brač winters). Use the other units as hobby spaces or guest suites for visiting family.",
    lifestyleValue: "Dol is famous for its \"slow living,\" clean air, and proximity to local agriculture (olive oil, wine, and the famous Dol lamb). It offers a peaceful pace of life away from the heavy tourist crowds of Bol.",
    target: "Retirees from Northern Europe or North America looking for a tax-efficient, high-quality lifestyle in the EU.",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200"
  }
];

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

export default function OpportunityPage() {
  const [activeSection, setActiveSection] = useState(OPPORTUNITIES[0].id);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      const sections = OPPORTUNITIES.map(opt => document.getElementById(opt.id));
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      sections.forEach(section => {
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveSection(section.id);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="relative">
      {/* Fast Travel Sidebar */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col gap-8 items-end">
        {OPPORTUNITIES.map((opt) => (
          <button
            key={opt.id}
            onClick={() => scrollToSection(opt.id)}
            className="group flex items-center transition-all"
          >
            <div className={`h-px transition-all duration-500 ${
              activeSection === opt.id ? "w-12 bg-black" : "w-6 bg-neutral-300 group-hover:bg-black group-hover:w-8"
            }`} />
          </button>
        ))}
      </div>

      {/* Progress Bar */}
      <motion.div
        className="fixed top-20 left-0 right-0 h-0.5 bg-black origin-left z-[75]"
        style={{ scaleX }}
      />

      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto space-y-40 sm:space-y-64">
        {OPPORTUNITIES.map((opt, i) => (
          <section 
            key={opt.id} 
            id={opt.id}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center"
          >
            <motion.div 
              {...fadeIn}
              className={i % 2 === 0 ? "lg:order-1" : "lg:order-2"}
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="font-serif italic text-3xl text-neutral-300">{opt.number}</span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-400">{opt.subtitle}</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-serif mb-8 leading-tight">{opt.title}</h2>
              
              <div className="space-y-8 text-neutral-600 leading-relaxed">
                <div>
                  <h4 className="text-black font-bold uppercase text-[10px] tracking-[0.2em] mb-2">Objective</h4>
                  <p className="text-sm">{opt.objective}</p>
                </div>
                
                <div>
                  <h4 className="text-black font-bold uppercase text-[10px] tracking-[0.2em] mb-2">The Strategy</h4>
                  <p className="text-sm">{opt.strategy}</p>
                </div>

                {opt.financialUpside && (
                  <div>
                    <h4 className="text-black font-bold uppercase text-[10px] tracking-[0.2em] mb-2">Financial Upside</h4>
                    <p className="text-sm italic font-serif text-neutral-800">{opt.financialUpside}</p>
                  </div>
                )}

                {opt.lifestyleValue && (
                  <div>
                    <h4 className="text-black font-bold uppercase text-[10px] tracking-[0.2em] mb-2">Lifestyle Value</h4>
                    <p className="text-sm italic font-serif text-neutral-800">{opt.lifestyleValue}</p>
                  </div>
                )}

                <div className="pt-4 border-t border-black/5">
                  <h4 className="text-black font-bold uppercase text-[10px] tracking-[0.2em] mb-2">Target Audience</h4>
                  <p className="text-xs uppercase tracking-wider">{opt.target}</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              {...fadeIn}
              transition={{ ...fadeIn.transition, delay: 0.2 }}
              className={i % 2 === 0 ? "lg:order-2" : "lg:order-1"}
            >
              <div className="relative group overflow-hidden">
                <ParallaxImage
                  src={opt.image}
                  alt={opt.title}
                  aspectRatio="aspect-[4/5]"
                  className="w-full transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-black/10 transition-colors duration-1000" />
              </div>
            </motion.div>
          </section>
        ))}

        {/* Final CTA */}
        <motion.section {...fadeIn} className="text-center py-20 border-t border-black/5">
          <h3 className="text-3xl font-serif mb-8 italic">Ready to explore the technical documentation?</h3>
          <a
            href="https://wa.me/385912345678"
            className="inline-block bg-black text-white px-12 py-5 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-neutral-800 transition-all hover:scale-105"
          >
            Request Full Investment Pack
          </a>
        </motion.section>
      </div>
    </div>
  );
}

