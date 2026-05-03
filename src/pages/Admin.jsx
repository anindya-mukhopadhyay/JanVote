import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, MessageSquare, ListCheck, Clock, User } from 'lucide-react';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';

function Admin() {
  const [chatLogs, setChatLogs] = useState([]);
  const [quizResults, setQuizResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const chatQ = query(collection(db, "chat_logs"), orderBy("timestamp", "desc"), limit(10));
        const chatSnap = await getDocs(chatQ);
        setChatLogs(chatSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

        const quizQ = query(collection(db, "quiz_results"), orderBy("timestamp", "desc"), limit(10));
        const quizSnap = await getDocs(quizQ);
        setQuizResults(quizSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching admin data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-6xl mx-auto space-y-8 pb-20"
    >
      <header className="glass-panel rounded-3xl p-8 border-brand-500/20">
        <div className="flex items-center gap-3 mb-2">
          <Shield className="w-8 h-8 text-brand-500" />
          <h2 className="font-display text-3xl font-extrabold text-slate-900 dark:text-white">Admin Console</h2>
        </div>
        <p className="text-slate-600 dark:text-slate-400">Live monitoring of system activity and user interactions.</p>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Recent Chat Logs */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 px-2">
            <MessageSquare className="w-5 h-5 text-brand-500" />
            <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200">Recent Chat Logs</h3>
          </div>
          <div className="glass-panel rounded-2xl overflow-hidden border-slate-200/50 dark:border-slate-700/50">
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {chatLogs.map(log => (
                <div key={log.id} className="p-4 space-y-2 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                  <div className="flex justify-between items-start gap-4">
                    <span className="text-xs font-mono text-slate-400">#{log.id.substring(0, 6)}</span>
                    <span className="text-[10px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {log.timestamp?.seconds ? new Date(log.timestamp.seconds * 1000).toLocaleString() : 'Just now'}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs font-bold text-brand-600 dark:text-brand-400 flex items-center gap-1">
                      <User className="w-3 h-3" /> User:
                    </div>
                    <p className="text-sm text-slate-700 dark:text-slate-300 italic">"{log.userMessage}"</p>
                  </div>
                </div>
              ))}
              {chatLogs.length === 0 && !loading && <p className="p-8 text-center text-slate-500">No chat logs found.</p>}
            </div>
          </div>
        </div>

        {/* Recent Quiz Results */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 px-2">
            <ListCheck className="w-5 h-5 text-brand-500" />
            <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200">Recent Quiz Activity</h3>
          </div>
          <div className="glass-panel rounded-2xl overflow-hidden border-slate-200/50 dark:border-slate-700/50">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 uppercase text-[10px] font-bold">
                <tr>
                  <th className="px-4 py-3">Result ID</th>
                  <th className="px-4 py-3">Score</th>
                  <th className="px-4 py-3">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {quizResults.map(res => (
                  <tr key={res.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-slate-400">#{res.id.substring(0, 6)}</td>
                    <td className="px-4 py-3">
                      <span className={`font-bold ${res.percentage >= 80 ? 'text-emerald-500' : 'text-brand-500'}`}>
                        {res.percentage}%
                      </span>
                      <span className="text-slate-400 ml-1">({res.score}/{res.total})</span>
                    </td>
                    <td className="px-4 py-3 text-[10px] text-slate-400">
                      {res.timestamp?.seconds ? new Date(res.timestamp.seconds * 1000).toLocaleTimeString() : 'Just now'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {quizResults.length === 0 && !loading && <p className="p-8 text-center text-slate-500">No quiz activity found.</p>}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default Admin;
