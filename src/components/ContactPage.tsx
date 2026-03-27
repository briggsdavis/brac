import { motion } from "motion/react";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

export default function ContactPage() {
  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center">
      <motion.div {...fadeIn} className="mb-20 text-center">
        <span className="text-[10px] uppercase tracking-[0.5em] text-neutral-400 mb-4 block">Get in Touch</span>
        <h2 className="text-5xl sm:text-7xl font-serif mb-8">Direct Inquiry</h2>
        <p className="max-w-2xl mx-auto text-neutral-500 leading-relaxed">
          Whether you are a professional developer, a private investor, or seeking a legacy family home, 
          our team is here to provide technical documentation and site visit coordination.
        </p>
      </motion.div>

      <div className="w-full max-w-2xl">
        {/* Maxwell Briggs Contact Card */}
        <motion.div 
          {...fadeIn} 
          transition={{ delay: 0.2 }}
          className="bg-neutral-50 p-12 rounded-3xl border border-black/5 flex flex-col items-center text-center group"
        >
          <div className="relative mb-8">
            <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400" 
                alt="Maxwell Briggs" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-4 border-white rounded-full animate-pulse"></div>
          </div>
          
          <h3 className="text-3xl font-serif mb-2">Maxwell Briggs</h3>
          <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 mb-8 font-bold">Investment Director</p>
          
          <div className="space-y-6 w-full max-w-md">
            <a 
              href="https://wa.me/251944825058" 
              className="flex items-center justify-center gap-3 bg-black text-white py-5 px-4 rounded-xl text-[9px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.3em] font-bold hover:bg-neutral-800 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <MessageCircle className="w-5 h-5 flex-shrink-0" />
              <span className="truncate">WhatsApp: +251 944 825 058</span>
            </a>
            
            <div className="p-6 bg-white rounded-2xl border border-black/5">
              <p className="text-sm font-serif italic text-neutral-600">
                "I personally guarantee a response to all investment inquiries within the hour."
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
