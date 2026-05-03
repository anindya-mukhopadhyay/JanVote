import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Map, Users, Info } from 'lucide-react';
import { useSoundEffects } from '../hooks/useSoundEffects';

// Sample data for some key states to keep it simple but illustrative
const statesData = [
  { id: 'UP', name: 'Uttar Pradesh', seats: 80, fact: 'Has the highest number of Lok Sabha seats.' },
  { id: 'MH', name: 'Maharashtra', seats: 48, fact: 'The second highest number of constituencies.' },
  { id: 'WB', name: 'West Bengal', seats: 42, fact: 'Known for highly competitive regional elections.' },
  { id: 'BR', name: 'Bihar', seats: 40, fact: 'A politically crucial state in the Hindi heartland.' },
  { id: 'TN', name: 'Tamil Nadu', seats: 39, fact: 'Politics here has historically been dominated by regional parties.' },
  { id: 'MP', name: 'Madhya Pradesh', seats: 29, fact: 'Geographically the second largest state in India.' },
  { id: 'KA', name: 'Karnataka', seats: 28, fact: 'A key southern state with a mix of national and regional influence.' },
  { id: 'GJ', name: 'Gujarat', seats: 26, fact: 'The home state of many prominent national leaders.' },
  { id: 'RJ', name: 'Rajasthan', seats: 25, fact: 'Often sees a bipolar contest between two major national parties.' },
  { id: 'AP', name: 'Andhra Pradesh', seats: 25, fact: 'Recently bifurcated, but remains a major political battleground.' },
  { id: 'OD', name: 'Odisha', seats: 21, fact: 'Known for having simultaneous state and national elections.' },
  { id: 'KL', name: 'Kerala', seats: 20, fact: 'Known for high literacy rates and alternating coalition governments.' }
];

function StatesExplorer() {
  const [hoveredState, setHoveredState] = useState(null);
  const { playPop } = useSoundEffects();

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 border-brand-500/20">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-lg">
          <Map className="w-6 h-6" />
        </div>
        <div>
          <h2 className="font-display text-2xl font-extrabold text-slate-900 dark:text-white">Constituency Explorer</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">Hover over key states to see their Lok Sabha seat count and facts.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {statesData.map((state) => (
          <motion.div
            key={state.id}
            onMouseEnter={() => {
              setHoveredState(state);
              playPop();
            }}
            onMouseLeave={() => setHoveredState(null)}
            whileHover={{ scale: 1.05, y: -5 }}
            className="relative cursor-pointer rounded-2xl bg-white/50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 p-4 text-center transition-colors hover:bg-brand-50 dark:hover:bg-brand-900/20 hover:border-brand-300 dark:hover:border-brand-700"
          >
            <div className="font-display font-bold text-slate-800 dark:text-slate-200">{state.id}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 truncate">{state.name}</div>
            
            {/* Tooltip */}
            <AnimatePresence>
              {hoveredState?.id === state.id && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 5, scale: 0.95 }}
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-48 z-20 glass-panel rounded-xl p-4 border border-brand-500/30 shadow-xl pointer-events-none"
                >
                  <div className="font-bold text-brand-700 dark:text-brand-300 mb-1">{state.name}</div>
                  <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200 mb-2 font-semibold">
                    <Users className="w-4 h-4 text-brand-500" /> {state.seats} Seats
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 flex items-start gap-1 text-left leading-tight">
                    <Info className="w-3 h-3 mt-0.5 shrink-0" /> {state.fact}
                  </div>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white/70 dark:bg-slate-800/80 backdrop-blur-md border-b border-r border-brand-500/30 rotate-45"></div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default StatesExplorer;
