import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Loader2 } from 'lucide-react';
import { getTopScores } from '../firebase';

function Leaderboard() {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchScores() {
      try {
        const topScores = await getTopScores(5);
        setScores(topScores);
      } catch (error) {
        console.error("Failed to fetch leaderboard:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchScores();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-12">
        <Loader2 className="w-8 h-8 text-brand-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="glass-panel rounded-3xl p-6 border-brand-500/20">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 text-white shadow-lg">
          <Trophy className="w-6 h-6" />
        </div>
        <div>
          <h2 className="font-display text-2xl font-extrabold text-slate-900 dark:text-white">Leaderboard</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">Top contributors to civic awareness.</p>
        </div>
      </div>

      <div className="space-y-3">
        {scores.length > 0 ? (
          scores.map((score, index) => (
            <motion.div
              key={score.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 rounded-2xl bg-white/50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50"
            >
              <div className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                  index === 0 ? 'bg-yellow-400 text-white' :
                  index === 1 ? 'bg-slate-300 text-slate-700' :
                  index === 2 ? 'bg-orange-300 text-orange-800' :
                  'bg-slate-100 dark:bg-slate-700 text-slate-500'
                }`}>
                  {index < 3 ? <Medal className="w-4 h-4" /> : index + 1}
                </div>
                <span className="font-medium text-slate-700 dark:text-slate-200">
                  Civic Learner #{score.id.substring(0, 4)}
                </span>
              </div>
              <div className="text-right">
                <div className="font-display font-bold text-brand-600 dark:text-brand-400">
                  {score.percentage}%
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {score.score}/{score.total} Correct
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-8 text-slate-500 dark:text-slate-400">
            No scores yet. Be the first to complete the quiz!
          </div>
        )}
      </div>
    </div>
  );
}

export default Leaderboard;
