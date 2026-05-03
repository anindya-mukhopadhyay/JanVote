import { motion } from 'framer-motion'
import { CheckCircle2, XCircle } from 'lucide-react'

function QuizCard({
  question,
  questionIndex,
  selectedOption,
  onSelectOption,
  isSubmitted,
}) {
  return (
    <motion.article 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: questionIndex * 0.1 }}
      className="glass-panel rounded-3xl p-6 md:p-8"
    >
      <div className="flex items-start gap-4 mb-6">
        <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 font-display font-bold border border-brand-500/20">
          {questionIndex + 1}
        </span>
        <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white pt-1">
          {question.question}
        </h3>
      </div>

      <div className="mt-4 space-y-3">
        {question.options.map((option) => {
          const isCorrectOption = option === question.correctAnswer
          const isWrongSelection =
            isSubmitted && selectedOption === option && !isCorrectOption
          const isSelected = selectedOption === option

          let optionStateClasses = 'border-slate-200/50 bg-slate-50/50 text-slate-700 hover:border-brand-300 dark:border-slate-700/50 dark:bg-slate-800/50 dark:text-slate-200'
          
          if (isSubmitted) {
            if (isCorrectOption) {
              optionStateClasses = 'border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:border-emerald-400 dark:bg-emerald-400/10 dark:text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
            } else if (isWrongSelection) {
              optionStateClasses = 'border-rose-500 bg-rose-500/10 text-rose-700 dark:border-rose-400 dark:bg-rose-400/10 dark:text-rose-300'
            } else {
              optionStateClasses = 'border-slate-200/50 bg-slate-50/50 text-slate-400 dark:border-slate-700/50 dark:bg-slate-800/50 dark:text-slate-500 opacity-50'
            }
          } else if (isSelected) {
            optionStateClasses = 'border-brand-500 bg-brand-500/10 text-brand-700 dark:border-brand-400 dark:bg-brand-400/10 dark:text-brand-300 shadow-[0_0_10px_rgba(59,130,246,0.2)]'
          }

          return (
            <motion.label
              key={option}
              whileHover={!isSubmitted ? { scale: 1.01 } : {}}
              whileTap={!isSubmitted ? { scale: 0.99 } : {}}
              className={`flex cursor-pointer items-center justify-between rounded-2xl border-2 px-5 py-4 transition-all duration-300 ${optionStateClasses}`}
            >
              <span className="pr-3 font-medium">{option}</span>
              <div className="flex items-center">
                {!isSubmitted && (
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${isSelected ? 'border-brand-500 bg-brand-500' : 'border-slate-300 dark:border-slate-600'}`}>
                    {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                )}
                {isSubmitted && isCorrectOption && <CheckCircle2 className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />}
                {isSubmitted && isWrongSelection && <XCircle className="w-5 h-5 text-rose-500 dark:text-rose-400" />}
              </div>
              <input
                type="radio"
                name={`question-${question.id}`}
                checked={isSelected}
                disabled={isSubmitted}
                onChange={() => onSelectOption(question.id, option)}
                className="hidden"
              />
            </motion.label>
          )
        })}
      </div>

      {isSubmitted && !selectedOption && (
         <p className="mt-4 text-sm font-medium text-rose-500">You didn't answer this question.</p>
      )}
    </motion.article>
  )
}

export default QuizCard

