import { Helmet } from "react-helmet-async";
import { BookOpen, Loader2, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { useGetLearningLogsQuery, type LearningLogItem } from "../api";
import LogEntryCard from "../components/LogEntryCard";
import LearningLogEditorModal from "../components/LearningLogEditorModal";
import { useAdmin } from "../../../hooks/useAdmin";

export default function LearningFeed() {
  const { isAdmin } = useAdmin();
  const [activeEditor, setActiveEditor] = useState<{ mode: 'add' | 'edit', log?: LearningLogItem } | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const categories = ["All", "Frontend", "Backend", "DevOps", "System Design", "General"];

  const [skip, setSkip] = useState(0);
  const limit = 10;
  
  const { data: logs, isLoading, isFetching } = useGetLearningLogsQuery({ skip, limit });

  // Intersection Observer
  const { ref: observerRef, inView } = useInView({ 
    threshold: 0,
    rootMargin: '100px', // Start loading before reaching the absolute bottom
  });

  useEffect(() => {
    if (inView && !isFetching && logs && logs.length > 0 && logs.length % limit === 0) {
      setSkip(logs.length);
    }
  }, [inView, isFetching, logs]);

  const filteredLogs = logs?.filter(log => 
    selectedCategory === "All" || log.category === selectedCategory
  );

  return (
    <>
      <Helmet>
        <title>Learning Log — Eashwar Sai</title>
        <meta name="description" content="Daily engineering journal chronicling Frontend, Backend, and Systems design insights." />
      </Helmet>

      <section className="section-spacing min-h-screen">
        <div className="section-container max-w-narrow">
          
          <div className="mb-12 text-center animate-fade-in-up">
            <div className="inline-flex items-center justify-center w-14 h-14 mb-6 rounded-2xl bg-accent/10 border border-accent/20">
              <BookOpen size={28} className="text-accent" />
            </div>
            <h1 className="text-display-sm font-display font-bold mb-4">
              Daily <span className="gradient-text">Log</span>
            </h1>
            <p className="text-content-secondary max-w-lg mx-auto text-lg leading-relaxed">
              Tracking my evolution in real-time. A raw, chronological feed of engineering insights and breakthroughs.
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-12 animate-fade-in-up stagger-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-sm font-semibold rounded-full border transition-all ${
                  selectedCategory === cat
                    ? "bg-accent text-bg-primary border-accent shadow-glow-sm"
                    : "bg-surface/50 text-content-secondary border-border-secondary hover:border-accent/40"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative animate-fade-in-up stagger-2 pl-4 md:pl-10 border-l border-border-secondary/30 ml-4 md:ml-6">
            {isAdmin && (
              <div className="flex justify-center mb-10">
                <button 
                  onClick={() => setActiveEditor({ mode: 'add' })}
                  className="flex items-center gap-2 px-8 py-3 bg-accent text-bg-primary hover:opacity-90 rounded-button font-bold transition-all shadow-glow-md"
                >
                  <Plus size={20} />
                  Log New Discovery
                </button>
              </div>
            )}

            {/* The infinite vertical scroll feed timeline */}
            {filteredLogs && filteredLogs.length > 0 ? (
              <div className="flex flex-col">
                {filteredLogs.map((log) => (
                  <LogEntryCard key={`log-${log.id}`} log={log} onEdit={(l) => setActiveEditor({ mode: 'edit', log: l })} />
                ))}
              </div>
            ) : (
              !isLoading && (
                <div className="py-20 text-center flex flex-col items-center">
                  <div className="text-content-tertiary mb-2">No entries found for this category.</div>
                  <button 
                    onClick={() => setSelectedCategory("All")}
                    className="text-accent hover:underline text-sm font-medium"
                  >
                    Clear Filter
                  </button>
                </div>
              )
            )}

            {/* Loading Indicator */}
            {(isLoading || isFetching) && (
               <div className="flex justify-center py-12">
                 <Loader2 className="animate-spin text-accent" size={32} />
               </div>
            )}

            {/* Intersection Guard */}
            <div ref={observerRef} className="h-20 w-full" />
          </div>

        </div>
      </section>

      {/* Page Level Modal - only one can be active */}
      {activeEditor && (
        <LearningLogEditorModal 
          log={activeEditor.log} 
          onClose={() => setActiveEditor(null)} 
        />
      )}
    </>
  );
}
