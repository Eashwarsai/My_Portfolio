import { useState } from 'react';
import type { LearningLogItem } from '../api';
import { useDeleteLearningLogMutation } from '../api';
import MarkdownRenderer from '../../blog/components/MarkdownRenderer';
import { formatDistanceToNow } from 'date-fns';
import { Edit2, Trash2, Loader2 } from 'lucide-react';
import { useAdmin } from '../../../hooks/useAdmin';
import LearningLogEditorModal from './LearningLogEditorModal';

interface LogEntryCardProps {
  log: LearningLogItem;
}

export default function LogEntryCard({ log }: LogEntryCardProps) {
  const { isAdmin } = useAdmin();
  const [isEditing, setIsEditing] = useState(false);
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
          case 'frontend': return 'bg-status-info/10 text-status-info border-status-info/20';
          case 'backend': return 'bg-status-success/10 text-status-success border-status-success/20';
          case 'devops': return 'bg-status-warning/10 text-status-warning border-status-warning/20';
          default: return 'bg-accent/10 text-accent border-accent/20';
      }
  }

  return (
    <div className="glass-card p-4 md:p-6 mb-6">
      <header className="flex justify-between items-start mb-4">
        <div className="flex flex-col">
           <span className="text-sm font-semibold text-content-primary mb-1 flex items-center gap-2">
             Journal Update
             {isAdmin && (
               <span className="flex items-center gap-1 ml-2">
                 <button onClick={() => setIsEditing(true)} className="p-1 text-content-tertiary hover:text-accent transition-colors" title="Edit">
                   <Edit2 size={14} />
                 </button>
                 <button onClick={handleDelete} disabled={isDeleting} className="p-1 text-content-tertiary hover:text-status-error transition-colors" title="Delete">
                   {isDeleting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                 </button>
               </span>
             )}
           </span>
           <span className="text-xs text-content-tertiary">
             {relativeTime}
           </span>
        </div>
        <span className={`px-2.5 py-1 text-xs font-semibold rounded-badge border ${getCategoryColor(log.category)}`}>
          {log.category}
        </span>
      </header>

      {/* Render the markdown snippet reliably utilizing the Blog markdown engine */}
      <div className="bg-surface/50 p-4 rounded-button border border-border-secondary">
          <MarkdownRenderer content={log.content} />
      </div>

      {isEditing && <LearningLogEditorModal log={log} onClose={() => setIsEditing(false)} />}
    </div>
  );
}
