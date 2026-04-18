import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { useCreateLearningLogMutation, useUpdateLearningLogMutation, type LearningLogItem } from "../api";

interface LearningLogEditorModalProps {
  log?: LearningLogItem; // If provided, we are in Edit mode
  onClose: () => void;
}

export default function LearningLogEditorModal({ log, onClose }: LearningLogEditorModalProps) {
  const [category, setCategory] = useState(log?.category || "Frontend");
  const [content, setContent] = useState(log?.content || "");
  
  const [createLog, { isLoading: isCreating }] = useCreateLearningLogMutation();
  const [updateLog, { isLoading: isUpdating }] = useUpdateLearningLogMutation();

  const isLoading = isCreating || isUpdating;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      if (log) {
        await updateLog({ id: log.id, body: { category, content } }).unwrap();
      } else {
        await createLog({ category, content }).unwrap();
      }
      onClose();
      // To simulate instantaneous refetch trigger without full reload, we can trigger window event
      window.dispatchEvent(new Event("log-mutated"));
    } catch (err) {
      console.error("Failed to save log:", err);
      alert("Failed to save. Ensure your API key is correct.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 animate-fade-in backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-bg-primary border border-border-secondary rounded-card shadow-glow-lg overflow-hidden animate-fade-in-up">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border-secondary bg-surface/50">
          <h2 className="text-xl font-display font-semibold text-content-primary">
            {log ? "Edit Journal Entry" : "New Journal Entry"}
          </h2>
          <button 
            onClick={onClose}
            className="p-2 -mr-2 text-content-tertiary hover:text-content-primary transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <label className="block text-sm font-semibold text-content-secondary mb-2">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 bg-surface border border-border-secondary rounded-button text-content-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
            >
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="DevOps">DevOps</option>
              <option value="System Design">System Design</option>
              <option value="General">General</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-content-secondary mb-2">Content (Markdown Format)</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
              required
              placeholder="e.g., Today I learned how Vite HMR invalidation actually works..."
              className="w-full px-4 py-3 bg-surface border border-border-secondary rounded-card text-content-primary font-mono text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all resize-y"
            />
          </div>

          <div className="flex justify-end gap-3">
             <button
               type="button"
               onClick={onClose}
               className="px-5 py-2 text-sm font-semibold text-content-secondary hover:text-content-primary hover:bg-surface-hover rounded-button transition-colors"
               disabled={isLoading}
             >
               Cancel
             </button>
             <button
               type="submit"
               disabled={isLoading}
               className="flex items-center justify-center gap-2 px-6 py-2 text-sm font-semibold text-bg-primary bg-accent hover:opacity-90 rounded-button shadow-glow-sm transition-all disabled:opacity-50"
             >
               {isLoading && <Loader2 size={16} className="animate-spin" />}
               {log ? "Save Changes" : "Post Log"}
             </button>
          </div>
        </form>
      </div>
    </div>
  );
}
