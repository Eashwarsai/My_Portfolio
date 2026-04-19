import { useState } from "react";
import { NavLink } from "react-router-dom";
import { ArrowRight, Calendar, Edit2, Trash2, Loader2 } from "lucide-react";
import type { BlogItem } from "../api";
import { useDeleteBlogMutation } from "../api";
import { useAdmin } from "../../../hooks/useAdmin";
import BlogEditorModal from "./BlogEditorModal";

interface BlogCardProps {
  blog: BlogItem;
  onEdit: (blog: BlogItem) => void;
}

export default function BlogCard({ blog, onEdit }: BlogCardProps) {
  const { isAdmin } = useAdmin();
  const [deleteBlog, { isLoading: isDeleting }] = useDeleteBlogMutation();

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this blog?")) {
      try {
        await deleteBlog(blog.slug).unwrap();
      } catch (err) {
        console.error(err);
        alert("Failed to delete blog.");
      }
    }
  };

  // Format the date into a readable string (e.g., "Apr 12, 2026")
  const formattedDate = new Date(blog.created_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article className="glass-card p-card flex flex-col group transition-all duration-normal hover:shadow-card-hover hover:border-border-accent h-full">
      <div className="flex items-center justify-between gap-2 text-xs text-content-tertiary mb-3">
        <div className="flex items-center gap-2">
           <Calendar size={14} />
           <time dateTime={blog.created_at}>{formattedDate}</time>
        </div>
        {isAdmin && (
           <div className="flex items-center gap-1">
             <button onClick={() => onEdit(blog)} className="p-1 text-content-tertiary hover:text-accent transition-colors" title="Edit">
               <Edit2 size={14} />
             </button>
             <button onClick={handleDelete} disabled={isDeleting} className="p-1 text-content-tertiary hover:text-status-error transition-colors" title="Delete">
               {isDeleting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
             </button>
           </div>
        )}
      </div>

      <h2 className="font-display font-semibold text-xl text-content-primary mb-3">
        <NavLink
            to={`/blog/${blog.slug}`}
            className="hover:text-accent transition-colors duration-normal focus:outline-none"
        >
          {blog.title}
        </NavLink>
      </h2>
      
      {/* Short preview snippet cutting the markdown at 100 characters */}
      <p className="text-content-secondary line-clamp-3 mb-6 flex-grow">
        {blog.content.substring(0, 150).replace(/[#*`_]/g, '')}...
      </p>

      <div className="mt-auto">
        <NavLink
          to={`/blog/${blog.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-secondary transition-colors duration-normal"
        >
          Read article <ArrowRight size={14} />
        </NavLink>
      </div>

      {isEditing && <BlogEditorModal blog={blog} onClose={() => setIsEditing(false)} />}
    </article>
  );
}
