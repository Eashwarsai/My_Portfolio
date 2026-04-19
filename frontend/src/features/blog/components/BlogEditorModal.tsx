import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { useCreateBlogMutation, useUpdateBlogMutation, type BlogItem } from "../api";

interface BlogEditorModalProps {
  blog?: BlogItem;
  onClose: () => void;
}

export default function BlogEditorModal({ blog, onClose }: BlogEditorModalProps) {
  const [title, setTitle] = useState(blog?.title || "");
  const [slug, setSlug] = useState(blog?.slug || "");
  const [content, setContent] = useState(blog?.content || "");
  const [published, setPublished] = useState(blog ? blog.published : true);
  
  const [createBlog, { isLoading: isCreating }] = useCreateBlogMutation();
  const [updateBlog, { isLoading: isUpdating }] = useUpdateBlogMutation();

  const isLoading = isCreating || isUpdating;

  // Auto-generate slug from title if empty
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     setTitle(e.target.value);
     if (!blog) {
        setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
     }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !slug.trim() || !content.trim()) return;

    try {
      if (blog) {
        await updateBlog({ slug: blog.slug, body: { title, slug, content, published } }).unwrap();
      } else {
        await createBlog({ title, slug, content, published }).unwrap();
      }
      onClose();
    } catch (err: any) {
      console.error("Failed to save blog:", err);
      // Give a little hint if it's a conflict
      const errorMessage = err?.data?.detail || "An unexpected error occurred.";
      
      if (err?.status === 400) {
        alert(`Request Failed: ${errorMessage}`);
      } else if (err?.status === 401) {
        alert(`Unauthorized: ${errorMessage}. Please ensure you are logged in correctly.`);
      } else {
        alert(`Failed to save: ${errorMessage}`);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 animate-fade-in backdrop-blur-sm">
      <div className="w-full max-w-3xl bg-bg-primary border border-border-secondary rounded-card shadow-glow-lg overflow-hidden animate-fade-in-up flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border-secondary bg-surface/50 shrink-0">
          <h2 className="text-xl font-display font-semibold text-content-primary">
            {blog ? "Edit Deep Dive" : "New Deep Dive"}
          </h2>
          <button 
            onClick={onClose}
            className="p-2 -mr-2 text-content-tertiary hover:text-content-primary transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-content-secondary mb-2">Title</label>
              <input
                type="text"
                value={title}
                onChange={handleTitleChange}
                required
                className="w-full px-4 py-2 bg-surface border border-border-secondary rounded-button text-content-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-content-secondary mb-2">URL Slug</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                required
                className="w-full px-4 py-2 bg-surface border border-border-secondary rounded-button text-content-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all font-mono text-sm"
              />
            </div>
          </div>

          <div className="mb-6 flex items-center gap-3">
             <input type="checkbox" id="published" checked={published} onChange={(e) => setPublished(e.target.checked)} className="w-4 h-4 accent-accent" />
             <label htmlFor="published" className="text-sm font-semibold text-content-secondary select-none cursor-pointer">Published to public feed</label>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-content-secondary mb-2">Markdown Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={14}
              required
              className="w-full px-4 py-3 bg-surface border border-border-secondary rounded-card text-content-primary font-mono text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all resize-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-border-secondary">
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
               {blog ? "Save Changes" : "Publish"}
             </button>
          </div>
        </form>
      </div>
    </div>
  );
}
