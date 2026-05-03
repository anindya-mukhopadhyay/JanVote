import { motion } from 'framer-motion'
import StepCard from './StepCard'

function Timeline({ steps, isEli10Mode, onStepInView }) {
  return (
    <div className="relative mx-auto max-w-4xl py-10">
      {/* Animated Center Line */}
      <motion.div 
        initial={{ height: 0 }}
        animate={{ height: "100%" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-brand-500 via-accent-500 to-brand-500 md:-translate-x-1/2 rounded-full opacity-30" 
      />

      <div className="space-y-12">
        {steps.map((step, index) => {
          const isEven = index % 2 === 0;
          return (
            <div key={step.id} className={`relative flex flex-col md:flex-row ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8`}>
              
              {/* Timeline Dot */}
              <motion.div 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
                className="absolute left-4 md:left-1/2 w-8 h-8 -translate-x-[14px] md:-translate-x-1/2 rounded-full border-4 border-white dark:border-slate-900 bg-brand-500 shadow-glow z-10 hidden md:block" 
              />
              
              <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? 'md:pr-12' : 'md:pl-12'}`}>
                <StepCard
                  step={step}
                  stepNumber={index + 1}
                  isEli10Mode={isEli10Mode}
                  onInView={onStepInView}
                />
              </div>
              <div className="hidden md:block md:w-1/2"></div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Timeline

