import { useParams, NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Loader2, Calendar } from "lucide-react";
import { useGetBlogBySlugQuery } from "../api";
import MarkdownRenderer from "../components/MarkdownRenderer";

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data: blog, isLoading, isError } = useGetBlogBySlugQuery(slug!);

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-accent" size={32} />
      </div>
    );
  }

  if (isError || !blog) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center">
         <h1 className="text-display-sm font-display font-bold mb-4">Blog Not Found</h1>
         <p className="text-content-secondary mb-6">The article you are looking for does not exist or was removed.</p>
         <NavLink to="/blog" className="px-6 py-2 bg-accent hover:bg-accent-secondary rounded-button text-white shadow-button">
           Return to Blog
         </NavLink>
      </div>
    );
  }

  const formattedDate = new Date(blog.created_at).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <>
      <Helmet>
        <title>{blog.title} — Eashwar Sai</title>
        <meta name="description" content={blog.content.substring(0, 150)} />
      </Helmet>

      <article className="section-spacing animate-fade-in-up">
        {/* Maximum narrow width creates perfect reading typography */}
        <div className="max-w-narrow mx-auto px-container">
          
          <NavLink
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-content-tertiary hover:text-accent mb-8 transition-colors duration-normal"
          >
            <ArrowLeft size={16} /> Back to blogs
          </NavLink>

          <header className="mb-12 pb-8 border-b border-border-secondary">
            <h1 className="text-display-sm md:text-display font-display font-bold text-content-primary mb-4 leading-tight">
              {blog.title}
            </h1>
            <div className="flex items-center gap-2 text-sm text-content-secondary">
              <Calendar size={16} />
              <time dateTime={blog.created_at}>{formattedDate}</time>
            </div>
          </header>

          <div className="bg-surface/30 p-4 md:p-8 rounded-card border border-border-secondary">
            <MarkdownRenderer content={blog.content} />
          </div>

        </div>
      </article>
    </>
  );
}
