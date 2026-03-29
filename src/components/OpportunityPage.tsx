import { motion, useScroll, useSpring } from "motion/react";
import ParallaxImage from "./ParallaxImage";
import { useEffect, useState } from "react";

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
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200"
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
    image: "https://images.unsplash.com/photo-1600607687940-47a0f9259017?auto=format&fit=crop&q=80&w=1200"
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
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=1200"
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
    image: "https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?auto=format&fit=crop&q=80&w=1200"
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

