
import React from 'react';
import { motion } from 'framer-motion';

interface PricingSectionProps {
  isDark: boolean;
}

const PricingSection: React.FC<PricingSectionProps> = ({ isDark }) => {
  const textColor = isDark ? 'text-white' : 'text-black';
  const subTextColor = isDark ? 'text-white/40' : 'text-black/50';
  const cardBg = isDark ? 'bg-white/[0.03] border-white/5' : 'bg-black/[0.02] border-black/5';

  const plans = [
    {
      name: 'Monthly Access',
      price: '25',
      period: '/month',
      description: 'Flexible access to the Skool community and live workshops.',
      features: ['Neural Workflows', 'Weekly Live Sync', 'Asset Library', 'Cancel Anytime'],
      button: 'Join Monthly'
    },
    {
      name: 'Annual Nexus',
      price: '14.58',
      period: '/month',
      billed: 'Billed annually (€175)',
      description: 'The complete creative engine for committed visionaries.',
      features: ['Everything in Monthly', '1-on-1 Strategy Call', 'Priority AI Models', 'Lifetime Updates'],
      button: 'Join Annual',
      highlight: true
    }
  ];

  return (
    <section className={`py-40 px-8 transition-colors duration-700 ${isDark ? 'bg-[#050505]' : 'bg-[#f4f5f5]'}`}>
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`uppercase tracking-[0.5em] text-[10px] font-black mb-6 ${isDark ? 'text-[#a4e37d]' : 'text-[#8ccb64]'}`}
          >
            Nexus Community
          </motion.h3>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] ${textColor}`}
          >
            Access the <br/><span className="italic">Intelligence.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className={`relative p-12 rounded-3xl border transition-all duration-500 flex flex-col ${cardBg} hover:border-[#a4e37d]/30 group`}
            >
              {plan.highlight && (
                <div className="absolute top-8 right-8 bg-[#a4e37d] text-black text-[9px] font-black uppercase px-3 py-1 rounded-full tracking-widest">
                  Best Value
                </div>
              )}

              <div className="mb-12">
                <h4 className={`text-xl font-bold uppercase tracking-tight mb-4 ${textColor}`}>
                  {plan.name}
                </h4>
                <div className="flex items-baseline gap-1">
                  <span className={`text-2xl font-bold ${textColor}`}>€</span>
                  <span className={`text-6xl md:text-7xl font-black tracking-tighter ${textColor}`}>
                    {plan.price}
                  </span>
                  <span className={`text-lg font-medium ${subTextColor}`}>{plan.period}</span>
                </div>
                {plan.billed && (
                  <div className={`text-[10px] font-bold uppercase tracking-widest mt-2 ${isDark ? 'text-[#a4e37d]' : 'text-[#8ccb64]'}`}>
                    {plan.billed}
                  </div>
                )}
              </div>

              <p className={`mb-12 text-base leading-relaxed ${subTextColor}`}>
                {plan.description}
              </p>

              <div className="space-y-4 mb-12 flex-grow">
                {plan.features.map((feature, j) => (
                  <div key={j} className="flex items-center gap-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#a4e37d]"></div>
                    <span className={`text-sm font-medium uppercase tracking-wider ${textColor}`}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <button className={`w-full py-6 rounded-full font-black tracking-[0.2em] uppercase text-xs transition-all duration-300 ${
                plan.highlight 
                  ? 'bg-[#a4e37d] text-black hover:scale-[1.02] shadow-lg shadow-[#a4e37d]/10' 
                  : `border ${isDark ? 'border-white/10 text-white hover:bg-white hover:text-black' : 'border-black/10 text-black hover:bg-black hover:text-white'}`
              }`}>
                {plan.button}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
