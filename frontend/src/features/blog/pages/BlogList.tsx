import { Helmet } from "react-helmet-async";
import { PenLine, Loader2, Plus } from "lucide-react";
import { useState } from "react";
import { useGetBlogsQuery, type BlogItem } from "../api";
import BlogCard from "../components/BlogCard";
import BlogEditorModal from "../components/BlogEditorModal";
import { useAdmin } from "../../../hooks/useAdmin";

export default function BlogList() {
  const { isAdmin } = useAdmin();
  const [activeEditor, setActiveEditor] = useState<{ mode: 'add' | 'edit', blog?: BlogItem } | null>(null);
  // We use our local component state to drive the RTK Query page argument
  const [page, setPage] = useState(1);
  const size = 6; // 6 blogs per page

  const { data, isLoading, isFetching } = useGetBlogsQuery({ page, size });

  return (
    <>
      <Helmet>
        <title>Blog — Eashwar Sai</title>
        <meta name="description" content="Technical blog posts by Eashwar Sai." />
      </Helmet>

      <section className="section-spacing">
        <div className="section-container">
          
          <div className="mb-12 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-card bg-accent/10 border border-accent/20">
              <PenLine size={24} className="text-accent" />
            </div>
            <h1 className="text-display-sm font-display font-bold mb-3">
              <span className="gradient-text">Writing</span>
            </h1>
            <p className="text-content-secondary max-w-lg mx-auto">
              Explorations, tutorials, and deep-dives regarding all things Frontend, Backend, and distributed system design.
            </p>
          </div>

          {/* Admin Controls */}
          {isAdmin && (
            <div className="flex justify-center mb-8 animate-fade-in">
              <button 
                onClick={() => setActiveEditor({ mode: 'add' })}
                className="flex items-center gap-2 px-6 py-3 bg-surface hover:bg-surface-hover border border-accent/20 hover:border-accent text-accent rounded-button font-semibold transition-all shadow-glow-sm"
              >
                <Plus size={20} />
                Add New Deep Dive
              </button>
            </div>
          )}

          {/* Initial Loading States */}
          {isLoading && !data && (
            <div className="flex justify-center py-20">
              <Loader2 className="animate-spin text-accent" size={32} />
            </div>
          )}

          {/* Empty State */}
          {!isLoading && data?.items.length === 0 && (
            <div className="glass-card p-card text-center max-w-sm mx-auto flex flex-col items-center">
               <p className="text-content-secondary mt-2">No blogs published yet.</p>
            </div>
          )}

          {/* Grid State (with subtle background fetch indicator if needed) */}
          {data && data.items.length > 0 && (
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up ${isFetching ? 'opacity-70' : ''}`}>
              {data?.items.map((blog: BlogItem) => (
                <BlogCard key={blog.id} blog={blog} onEdit={(b) => setActiveEditor({ mode: 'edit', blog: b })} />
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {data && data.total > size && (
             <div className="flex justify-center items-center gap-4 mt-12 bg-surface/50 border border-border-secondary w-fit mx-auto rounded-button p-2">
                 <button 
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1 || isFetching}
                  className="px-4 py-2 text-sm font-medium rounded text-content-primary hover:bg-surface-hover hover:text-accent disabled:opacity-50 disabled:pointer-events-none transition-all"
                 >
                   Previous
                 </button>
                 <span className="text-sm font-semibold text-content-secondary">
                   Page {page} of {Math.ceil(data.total / size)}
                 </span>
                 <button 
                  onClick={() => setPage(page + 1)}
                  disabled={page * size >= data.total || isFetching}
                  className="px-4 py-2 text-sm font-medium rounded text-content-primary hover:bg-surface-hover hover:text-accent disabled:opacity-50 disabled:pointer-events-none transition-all"
                 >
                   Next {isFetching && <Loader2 className="inline ml-1 animate-spin" size={14}/>}
                 </button>
             </div>
          )}

        </div>
      </section>

      {/* Page Level Modal - only one can be active at once */}
      {activeEditor && (
        <BlogEditorModal 
          blog={activeEditor.blog} 
          onClose={() => setActiveEditor(null)} 
        />
      )}
    </>
  );
}
