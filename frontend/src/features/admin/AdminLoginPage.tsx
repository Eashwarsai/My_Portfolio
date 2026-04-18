import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Loader2, LogIn, Mail, Lock, ArrowLeft, ShieldCheck } from "lucide-react";
import { useAdmin } from "../../hooks/useAdmin";
import { Helmet } from "react-helmet-async";

// Map Firebase auth error codes to clean human-readable messages
function getAuthErrorMessage(code: string): string {
  switch (code) {
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Incorrect email or password.";
    case "auth/user-not-found":
      return "No account found for this email.";
    case "auth/too-many-requests":
      return "Too many attempts. Please try again later.";
    case "auth/network-request-failed":
      return "Network error. Check your connection.";
    default:
      return "Login failed. Please try again.";
  }
}

export default function AdminLoginPage() {
  const { login, isAdmin, loading } = useAdmin();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // If already logged in, redirect to home
  useEffect(() => {
    if (!loading && isAdmin) {
      navigate("/");
    }
  }, [isAdmin, loading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoggingIn(true);
    try {
      await login(email, password);
      // navigation is handled by the useEffect above
    } catch (err: unknown) {
      const code = (err as { code?: string }).code ?? "";
      setError(getAuthErrorMessage(code));
      setIsLoggingIn(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Admin Access — Eashwar Sai</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-bg-primary relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="w-full max-w-md animate-fade-in">
          {/* Back button */}
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-content-tertiary hover:text-content-primary transition-colors mb-8 group"
          >
            <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
            <span className="text-sm font-medium">Back to Portfolio</span>
          </Link>

          <div className="bg-surface/50 backdrop-blur-md border border-border-secondary rounded-card shadow-glow-lg overflow-hidden">
            {/* Header */}
            <div className="px-8 pt-8 pb-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-card bg-accent/10 border border-accent/20">
                <ShieldCheck size={32} className="text-accent" />
              </div>
              <h1 className="text-2xl font-display font-bold text-content-primary mb-2">Admin Access</h1>
              <p className="text-content-secondary text-sm">
                Please enter your credentials to access administrative features.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="px-8 pb-8 flex flex-col gap-5">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-content-tertiary ml-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-content-tertiary" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoFocus
                    placeholder="admin@example.com"
                    className="w-full pl-11 pr-4 py-3 bg-bg-primary border border-border-secondary rounded-button text-content-primary text-sm placeholder:text-content-tertiary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-content-tertiary ml-1">
                  Password
                </label>
                <div className="relative">
                  <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-content-tertiary" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full pl-11 pr-4 py-3 bg-bg-primary border border-border-secondary rounded-button text-content-primary text-sm placeholder:text-content-tertiary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                  />
                </div>
              </div>

              {error && (
                <div className="text-sm text-status-error bg-status-error/10 border border-status-error/20 px-4 py-3 rounded-button animate-fade-in flex items-start gap-2">
                  <span className="mt-0.5">•</span>
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoggingIn}
                className="flex items-center justify-center gap-2 w-full py-3.5 mt-2 text-sm font-bold text-bg-primary bg-accent hover:opacity-90 rounded-button transition-all disabled:opacity-50 shadow-glow-sm"
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <LogIn size={18} />
                    <span>Sign In</span>
                  </>
                )}
              </button>
            </form>
          </div>

          <p className="mt-8 text-center text-xs text-content-tertiary">
            &copy; {new Date().getFullYear()} Eashwar Sai. Restricted access.
          </p>
        </div>
      </div>
    </>
  );
}
