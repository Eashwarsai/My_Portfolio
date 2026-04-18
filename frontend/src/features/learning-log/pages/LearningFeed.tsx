import { Helmet } from "react-helmet-async";
import { BookOpen, Loader2, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { useGetLearningLogsQuery } from "../api";
import LogEntryCard from "../components/LogEntryCard";
import LearningLogEditorModal from "../components/LearningLogEditorModal";
import { useAdmin } from "../../../hooks/useAdmin";

export default function LearningFeed() {
  const { isAdmin } = useAdmin();
  const [showEditor, setShowEditor] = useState(false);
  const [skip, setSkip] = useState(0);
  const limit = 10;
  
  // Trigger RTK Query cache mechanism targeting appending items seamlessly!
  const { data: logs, isLoading, isFetching } = useGetLearningLogsQuery({ skip, limit });

  // Intersection Observer triggers when the "bottom invisible div" scrolls into view
  const { ref: observerRef, inView } = useInView({ threshold: 0 });

  useEffect(() => {
    // If the hidden bottom div appears and we possess items and aren't already fetching
    // Then increment the offset by our limit boundary to fetch exactly the next chunk natively
    if (inView && !isFetching && logs && logs.length > 0) {
      // Small safeguard to ensure we don't infinitely request empty pages
      if (logs.length % limit === 0) {
          // Defer to avoid synchronous setState-in-effect lint rule while keeping the correct scroll behaviour
          setTimeout(() => setSkip((prev) => prev + limit), 0);
      }
    }
  }, [inView, isFetching, logs]);

  return (
    <>
      <Helmet>
        <title>Learning Log — Eashwar Sai</title>
        <meta name="description" content="Daily engineering journal chronicling Frontend, Backend, and Systems design insights." />
      </Helmet>

      <section className="section-spacing">
        <div className="section-container max-w-narrow">
          
          <div className="mb-8 md:mb-12 text-center animate-fade-in-up">
            <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-card bg-accent/10 border border-accent/20">
              <BookOpen size={24} className="text-accent" />
            </div>
            <h1 className="text-display-sm font-display font-bold mb-3">
              Learning <span className="gradient-text">Log</span>
            </h1>
            <p className="text-content-secondary max-w-lg mx-auto">
              Real-time engineering journal. These are the scattered bits of wisdom, debugging victories, and daily discoveries I catalogue.
            </p>
          </div>

          <div className="relative animate-fade-in-up stagger-2">
            {isAdmin && (
              <div className="flex justify-center mb-8 animate-fade-in">
                <button 
                  onClick={() => setShowEditor(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-surface hover:bg-surface-hover border border-accent/20 hover:border-accent text-accent rounded-button font-semibold transition-all shadow-glow-sm"
                >
                  <Plus size={20} />
                  Add New Log Entry
                </button>
              </div>
            )}
            {/* The infinite vertical scroll feed timeline */}
            {logs?.map((log) => (
              <LogEntryCard key={`log-${log.id}`} log={log} />
            ))}

            {/* Loading Indicator Spinner */}
            {(isLoading || isFetching) && (
               <div className="flex justify-center py-6">
                 <Loader2 className="animate-spin text-accent" size={28} />
               </div>
            )}

            {/* Invisible Intersection Target bound 50px before the bottom */}
            <div ref={observerRef} className="h-20 w-full" aria-hidden="true" />
            
            {logs?.length === 0 && !isLoading && (
               <div className="text-center text-content-tertiary">No learning logs have been created yet.</div>
            )}
          </div>

        </div>
      </section>

      {showEditor && <LearningLogEditorModal onClose={() => setShowEditor(false)} />}
    </>
  );
}
