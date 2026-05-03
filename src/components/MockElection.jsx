import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Vote, BarChart3, CheckCircle2, AlertCircle } from 'lucide-react';
import { useSoundEffects } from '../hooks/useSoundEffects';
import confetti from 'canvas-confetti';

const PARTIES = [
  { id: 'tech', name: 'Technology Party', color: 'bg-blue-500', hex: '#3b82f6', icon: '💻' },
  { id: 'nature', name: 'Green Earth Alliance', color: 'bg-emerald-500', hex: '#10b981', icon: '🌳' },
  { id: 'edu', name: 'Education First Coalition', color: 'bg-purple-500', hex: '#a855f7', icon: '📚' },
  { id: 'space', name: 'Galactic Future Front', color: 'bg-rose-500', hex: '#f43f5e', icon: '🚀' }
];

function MockElection() {
  const [hasVoted, setHasVoted] = useState(false);
  const [selectedParty, setSelectedParty] = useState(null);
  const [votes, setVotes] = useState({ tech: 452, nature: 410, edu: 380, space: 300 });
  const [isCounting, setIsCounting] = useState(false);
  const { playClick, playSuccess } = useSoundEffects();

  const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0);

  // Simulate live counting
  useEffect(() => {
    if (isCounting) {
      const interval = setInterval(() => {
        setVotes(prev => {
          // Add random votes to parties to simulate live counting
          const newVotes = { ...prev };
          PARTIES.forEach(party => {
            if (Math.random() > 0.4) {
              newVotes[party.id] += Math.floor(Math.random() * 5);
            }
          });
          return newVotes;
        });
      }, 800);
      
      // Stop counting after 10 seconds to show "Final Results"
      const timeout = setTimeout(() => {
        setIsCounting(false);
        playSuccess();
        confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
      }, 10000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [isCounting, playSuccess]);

  const handleVote = (partyId) => {
    playClick();
    setSelectedParty(partyId);
  };

  const submitVote = () => {
    if (!selectedParty) return;
    playClick();
    setVotes(prev => ({ ...prev, [selectedParty]: prev[selectedParty] + 1 }));
    setHasVoted(true);
    setIsCounting(true);
  };

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 border-brand-500/20">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-400 to-blue-600 text-white shadow-lg">
          <Vote className="w-6 h-6" />
        </div>
        <div>
          <h2 className="font-display text-2xl font-extrabold text-slate-900 dark:text-white">Mock Election Booth</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">Experience the voting process and watch live counting.</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!hasVoted ? (
          <motion.div
            key="voting-booth"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-700/50 rounded-xl p-4 flex gap-3 text-amber-800 dark:text-amber-200">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <p className="text-sm font-medium">Please select a party below and cast your vote. Your vote is secret and secure.</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {PARTIES.map(party => (
                <motion.button
                  key={party.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleVote(party.id)}
                  className={`relative flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${
                    selectedParty === party.id 
                      ? 'border-brand-500 bg-brand-500/10 shadow-[0_0_15px_rgba(59,130,246,0.2)]' 
                      : 'border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 hover:border-brand-300 dark:hover:border-slate-600'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${party.color} text-white shadow-md`}>
                    {party.icon}
                  </div>
                  <div className="text-left flex-1">
                    <h3 className="font-display font-bold text-slate-900 dark:text-white">{party.name}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Tap to select</p>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                    selectedParty === party.id ? 'border-brand-500 bg-brand-500' : 'border-slate-300 dark:border-slate-600'
                  }`}>
                    {selectedParty === party.id && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                  </div>
                </motion.button>
              ))}
            </div>

            <div className="flex justify-end pt-4">
              <motion.button
                whileHover={selectedParty ? { scale: 1.05 } : {}}
                whileTap={selectedParty ? { scale: 0.95 } : {}}
                disabled={!selectedParty}
                onClick={submitVote}
                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-600 to-accent-600 px-8 py-3 text-base font-bold text-white transition-all disabled:opacity-50 disabled:grayscale shadow-lg"
              >
                Cast Vote <CheckCircle2 className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-brand-500" /> Live Counting Dashboard
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Total Votes Counted: {totalVotes.toLocaleString()}</p>
              </div>
              {isCounting ? (
                <span className="flex items-center gap-2 rounded-full bg-rose-500/10 border border-rose-500/20 px-3 py-1 text-xs font-bold uppercase tracking-widest text-rose-600 dark:text-rose-400">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span> Live
                </span>
              ) : (
                <span className="flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-3 h-3" /> Final Results
                </span>
              )}
            </div>

            <div className="space-y-5 bg-white/30 dark:bg-slate-900/30 p-5 rounded-2xl border border-slate-200/50 dark:border-slate-700/50">
              {PARTIES.sort((a, b) => votes[b.id] - votes[a.id]).map((party) => {
                const percentage = ((votes[party.id] / totalVotes) * 100) || 0;
                
                return (
                  <div key={party.id} className="space-y-2">
                    <div className="flex justify-between items-end text-sm">
                      <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                        <span>{party.icon}</span> {party.name}
                      </span>
                      <span className="font-mono font-bold text-slate-600 dark:text-slate-400">
                        {votes[party.id].toLocaleString()} ({percentage.toFixed(1)}%)
                      </span>
                    </div>
                    <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full ${party.color}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            
            <p className="text-xs text-center text-slate-500 dark:text-slate-400 italic">
              * This is a simulated environment. Real counting uses highly secure EVMs and VVPAT verification.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default MockElection;
