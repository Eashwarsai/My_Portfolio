import type { LearningLogItem } from '../api';
import { useDeleteLearningLogMutation } from '../api';
import MarkdownRenderer from '../../blog/components/MarkdownRenderer';
import { formatDistanceToNow } from 'date-fns';
import { Edit2, Trash2, Loader2 } from 'lucide-react';
import { useAdmin } from '../../../hooks/useAdmin';

interface LogEntryCardProps {
  log: LearningLogItem;
  onEdit: (log: LearningLogItem) => void;
}

export default function LogEntryCard({ log, onEdit }: LogEntryCardProps) {
  const { isAdmin } = useAdmin();
  const [deleteLog, { isLoading: isDeleting }] = useDeleteLearningLogMutation();

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this log?")) {
      try {
         await deleteLog(log.id).unwrap();
         window.dispatchEvent(new Event("log-mutated"));
      } catch (err) {
         console.error(err);
         alert("Failed to delete.");
      }
    }
  };

  // Relative time e.g., "3 hours ago"
  const relativeTime = formatDistanceToNow(new Date(log.created_at), { addSuffix: true });

  // Map category to generic Badge coloring intelligently
  const getCategoryColor = (category: string) => {
    switch(category.toLowerCase()) {
      case 'frontend': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'backend': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'devops': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'system design': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  }

  return (
    <div className="relative group animate-fade-in-up">
      {/* Timeline connector line */}
      <div className="absolute left-[-21px] top-6 bottom-[-24px] w-[2px] bg-border-secondary group-last:bg-transparent hidden md:block" />
      
      {/* Timeline dot */}
      <div className="absolute left-[-26px] top-[18px] w-3 h-3 rounded-full border-2 border-accent bg-bg-primary z-10 hidden md:block" />

      <div className="glass-card p-5 md:p-7 mb-8 transition-all hover:shadow-glow-sm hover:border-accent/30">
        <header className="flex flex-wrap justify-between items-start gap-4 mb-5">
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-1">
              <span className={`px-2.5 py-0.5 text-[10px] uppercase tracking-wider font-bold rounded-full border ${getCategoryColor(log.category)}`}>
                {log.category}
              </span>
              <span className="text-xs font-mono text-content-tertiary">
                {new Date(log.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
            <span className="text-xs text-content-tertiary italic">
              Logged {relativeTime}
            </span>
          </div>

          {isAdmin && (
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={() => onEdit(log)} 
                className="p-1.5 text-content-tertiary hover:text-accent hover:bg-accent/10 rounded-button transition-all" 
                title="Edit"
              >
                <Edit2 size={16} />
              </button>
              <button 
                onClick={handleDelete} 
                disabled={isDeleting} 
                className="p-1.5 text-content-tertiary hover:text-status-error hover:bg-status-error/10 rounded-button transition-all" 
                title="Delete"
              >
                {isDeleting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={16} />}
              </button>
            </div>
          )}
        </header>

        {/* Content area */}
        <div className="prose prose-invert prose-sm max-w-none text-content-secondary leading-relaxed">
          <MarkdownRenderer content={log.content} />
        </div>
      </div>
    </div>
  );
}
