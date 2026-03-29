import { motion } from "motion/react";
import ParallaxImage from "./ParallaxImage";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

const OPPORTUNITIES = [
  {
    id: "multi-unit",
    number: "01",
    title: "Multi-Unit Rental",
    subtitle: "Short-Term Lets",
    objective: "Renovate the three floors as standalone units, each with an independent entrance.",
    strategy: "Each floor becomes a self-contained 1-bedroom apartment. The detached stone stable could be converted separately as a garden-level studio, providing a fourth rentable unit.",
    financialUpside: "Stone apartments in heritage villages on Brač typically rent for €150–€250 per night during peak season. The stable unit, if converted, would add further rental income independently of the main house.",
    target: "Investors looking for short-term rental income through Airbnb or Booking.com.",
    image: "/images/multi.jpg"
  },
  {
    id: "capital-appreciation",
    number: "02",
    title: "Renovate and Resell",
    subtitle: "Capital Appreciation",
    objective: "Buy as a renovation project, restore to a finished standard, and resell.",
    strategy: "New construction is not permitted in Dol due to its protected village status. This restricts supply and supports resale values for renovated properties. A well-finished stone house in this location is difficult to replicate.",
    financialUpside: "Unrestored stone properties on Brač typically sell for €150,000–€250,000. Fully restored stone houses in the same area have sold for €600,000 to €1.2M depending on finish and views.",
    target: "Buyers looking to renovate and resell.",
    image: "/images/renderfront.jpg"
  },
  {
    id: "digital-nomad",
    number: "03",
    title: "Co-Living / Remote Work",
    subtitle: "Monthly Rentals",
    objective: "Set up the property as a co-living space targeting remote workers on monthly stays.",
    strategy: "One unit functions as a shared workspace with Starlink internet, while the other two operate as private accommodation. The stable could serve as an additional private room.",
    financialUpside: "Remote workers tend to book outside peak summer months (May, June, September, October), filling gaps in the rental calendar when short-stay tourist demand drops.",
    target: "Investors targeting the remote work market following Croatia's 2023 Schengen entry.",
    image: "/images/revamp.jpg"
  },
  {
    id: "family-estate",
    number: "04",
    title: "Single Family Home",
    subtitle: "Private Purchase",
    objective: "Use the full 140m² as one large connected home.",
    strategy: "Keep the three floors open as a single residence — separate wings for guests, children, and the main bedroom. Convert the stone stable into a guest annexe or caretaker's quarters. A pool could be added in the lower garden.",
    lifestyleValue: "Quiet village setting with no new development permitted. 5 minutes from Postira and the ferry to Split.",
    target: "Families looking for a private summer or year-round home.",
    image: "/images/family.jpg"
  },
  {
    id: "retirement",
    number: "05",
    title: "Retirement Home",
    subtitle: "Year-Round Living",
    objective: "A manageable home for year-round or seasonal living.",
    strategy: "Use the ground floor as the main living space. Add underfloor heating for winter comfort. Use the upper floors and stable for visiting family or as hobby rooms.",
    lifestyleValue: "Dol has clean air, low traffic, and is close to local farms producing olive oil, wine, and lamb. It is a quieter alternative to the more tourist-heavy coastal towns.",
    target: "Retirees from Northern Europe or North America considering a permanent or seasonal move to the EU.",
    image: "/images/retirement.jpg"
  }
];

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

export default function OpportunityPage({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const [activeSection, setActiveSection] = useState(OPPORTUNITIES[0].id);

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

      {/* Roadmap Intro */}
      <section className="pt-32 pb-0 px-6 max-w-7xl mx-auto">
        <motion.div {...fadeIn} className="mb-6">
          <span className="text-[10px] uppercase tracking-[0.5em] text-neutral-400">The Property</span>
        </motion.div>
        <motion.h1 {...fadeIn} transition={{ ...fadeIn.transition, delay: 0.1 }} className="text-4xl sm:text-5xl font-serif leading-tight mb-10 max-w-4xl">
          Authentic Stone Property with Dual Potential —<br className="hidden sm:block" /> Dol, Island of Brač, Croatia
        </motion.h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-24">
          <motion.div {...fadeIn} transition={{ ...fadeIn.transition, delay: 0.15 }} className="space-y-6 text-neutral-600 leading-relaxed">
            <p className="text-base font-serif italic text-neutral-800">
              Unlock the charm of traditional Dalmatian village life with a rare renovation project in the EU-protected ethno eco village of Dol on the iconic Island of Brač — the second-largest island in the Adriatic Sea, known for historic villages, unspoiled beaches, the highest point in the Mediterranean (Vidova Gora), Mediterranean landscapes, and easy access from Split (airport and ferry).
            </p>
            <p className="text-sm">
              This unique stone property offers two structures with flexible redevelopment options — perfect for investors, renovators, extended families, or dual-income living.
            </p>
            <div className="border-l-2 border-black/10 pl-6 space-y-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 mb-1">Main House</p>
                <p className="text-sm">Approximately 166 m² across three distinct levels of solid stone construction. Could be kept as one large family residence or subdivided into two self-contained units — ideal for short-term rentals, long-term letting, or a high-value resale after renovation.</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 mb-1">The Stable</p>
                <p className="text-sm">A detached stone structure with its own entrance from the lower garden. Independent from the main house and fully convertible into a studio or one-bedroom annexe — a self-contained income unit or guest accommodation.</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 mb-1">The Gardens & Views</p>
                <p className="text-sm">All units have access to the gardens. The upper unit enjoys Adriatic sea views from the terrace. The lower units and the stable have both sea and mountain views from the lower garden. Whether kept as one estate or split into multiple properties, every unit carries genuine view value.</p>
              </div>
            </div>
          </motion.div>
          <motion.div {...fadeIn} transition={{ ...fadeIn.transition, delay: 0.3 }} className="overflow-hidden">
            <ParallaxImage
              src="/images/potentialdol.jpg"
              alt="Stone Property Brač"
              aspectRatio="aspect-[4/5]"
            />
          </motion.div>
        </div>
        <motion.div {...fadeIn} transition={{ ...fadeIn.transition, delay: 0.2 }} className="mb-12 pb-12 border-b border-black/5">
          <span className="text-[10px] uppercase tracking-[0.5em] text-neutral-400">Investment Scenarios</span>
          <h2 className="text-3xl font-serif mt-3">How You Could Use This Property</h2>
        </motion.div>
      </section>

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

        {/* Funnel CTA → Location */}
        {onNavigate && (
          <motion.section {...fadeIn} className="py-20 border-t border-black/5 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 mb-1">Next Step</p>
              <p className="font-serif text-3xl">Discover the Location</p>
              <p className="text-sm text-neutral-500 mt-2">Beaches, towns, transport links, and what makes Brač stand out.</p>
            </div>
            <button
              onClick={() => { onNavigate('location'); window.scrollTo(0, 0); }}
              className="flex items-center gap-3 bg-black text-white px-10 py-4 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-neutral-800 transition-all hover:scale-105 flex-shrink-0"
            >
              View Location <ArrowRight className="w-4 h-4" />
            </button>
          </motion.section>
        )}

        {/* Final CTA */}
        <motion.section {...fadeIn} className="text-center py-20 border-t border-black/5">
          <h3 className="text-3xl font-serif mb-8 italic">Request the full property documents.</h3>
          <a
            href="https://wa.me/251944825058"
            className="inline-block bg-black text-white px-12 py-5 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-neutral-800 transition-all hover:scale-105"
          >
            Request Full Investment Pack
          </a>
        </motion.section>
      </div>
    </div>
  );
}

