import { useState, useEffect } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Platform", href: "#platform" },
  { name: "Solutions", href: "#solutions" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
  { name: "Resources", href: "#resources" },
];

export default function PublicLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll to hash on mount if present
  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const element = document.querySelector(location.hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [location]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      if (location.pathname !== "/") {
        navigate("/" + href);
      } else {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          window.history.pushState(null, "", href);
        }
      }
      setMobileMenuOpen(false);
    } else if (href === "/") {
      if (location.pathname === "/") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        window.history.pushState(null, "", "/");
      }
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col font-body selection:bg-aurora-mint/30 selection:text-foreground relative">
      
      {/* Global Luxury Aurora Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[10%] -left-[10%] w-[40vw] h-[40vw] bg-aurora-mint rounded-full blur-[120px] mix-blend-multiply opacity-30" 
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-[20%] -left-[10%] w-[50vw] h-[50vw] bg-aurora-pink rounded-full blur-[150px] mix-blend-multiply opacity-20" 
        />
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -top-[10%] -right-[10%] w-[45vw] h-[45vw] bg-aurora-lavender rounded-full blur-[130px] mix-blend-multiply opacity-30" 
        />
        <motion.div 
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute -bottom-[10%] -right-[10%] w-[60vw] h-[60vw] bg-aurora-aqua rounded-full blur-[160px] mix-blend-multiply opacity-20" 
        />
      </div>

      {/* VisionOS Floating Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 pt-[24px] flex justify-center w-full">
        <div 
          className="w-[92%] h-[74px] rounded-[24px] bg-white/10 backdrop-blur-3xl border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.04)] flex items-center justify-between px-6 transition-all duration-300"
        >
          {/* Logo Area */}
          <Link to="/" onClick={(e) => handleNavClick(e, "/")} className="flex items-center gap-3 group relative z-10">
            {/* Custom Abstract Logo */}
            <div className="relative w-9 h-9 flex items-center justify-center">
              <svg viewBox="0 0 40 40" className="w-full h-full drop-shadow-md">
                <defs>
                  <linearGradient id="logo-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#72F1D1" />
                    <stop offset="100%" stopColor="#3DD9FF" />
                  </linearGradient>
                  <linearGradient id="logo-gradient-2" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#8F7CFF" />
                    <stop offset="100%" stopColor="#FF5DA2" />
                  </linearGradient>
                </defs>
                <circle cx="16" cy="16" r="10" fill="none" stroke="url(#logo-gradient-1)" strokeWidth="4" className="opacity-90" />
                <circle cx="24" cy="24" r="10" fill="none" stroke="url(#logo-gradient-2)" strokeWidth="4" className="opacity-90 mix-blend-multiply" />
                <circle cx="28" cy="12" r="4" fill="url(#logo-gradient-1)" />
              </svg>
            </div>
            <span className="text-xl font-heading font-black tracking-tighter text-foreground">ResiCore</span>
          </Link>
          
          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/20 p-1 rounded-full border border-white/30 backdrop-blur-md relative z-10">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href || (link.href !== "/" && location.hash === link.href);
              return (
                <Link 
                  key={link.name} 
                  to={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="relative px-5 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors rounded-full overflow-hidden group"
                >
                  {isActive && (
                    <motion.div 
                      layoutId="active-nav-pill"
                      className="absolute inset-0 bg-white shadow-sm rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  {/* Hover background for inactive items */}
                  {!isActive && (
                    <div className="absolute inset-0 bg-white/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-full -z-10" />
                  )}
                  {link.name}
                </Link>
              );
            })}
          </nav>
          
          {/* Desktop Right Actions */}
          <div className="hidden lg:flex items-center gap-2 relative z-10">
            <Link 
              to="/auth/login" 
              className="px-5 py-2.5 text-sm font-semibold text-foreground/80 hover:text-foreground hover:bg-white/40 rounded-full transition-all"
            >
              Sign In
            </Link>
            
            <Link 
              to="/auth/signup" 
              className="group relative inline-flex h-10 items-center justify-center gap-2 overflow-hidden rounded-full bg-foreground px-6 font-semibold text-background transition-all hover:scale-105 shadow-lg"
            >
              {/* Aurora Hover Gradient inside button */}
              <span className="absolute inset-0 bg-gradient-to-r from-aurora-mint via-aurora-aqua to-aurora-lavender opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <span className="relative z-10 transition-colors group-hover:text-foreground">Get Started</span>
              <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-foreground" />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2 text-foreground relative z-10 h-10 w-10 flex items-center justify-center rounded-full hover:bg-white/30 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-[110px] z-40 bg-white/70 backdrop-blur-3xl border border-white/50 rounded-3xl p-6 shadow-2xl lg:hidden overflow-hidden"
          >
            <div className="flex flex-col gap-2 text-center relative z-10">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-lg font-heading font-semibold text-foreground/80 hover:text-foreground py-3 rounded-xl hover:bg-white/50 transition-all"
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-px w-full bg-border/50 my-4" />
              <Link 
                to="/auth/login" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-3 text-lg font-semibold text-foreground hover:bg-white/50 rounded-xl transition-all"
              >
                Sign In
              </Link>
              <Link 
                to="/auth/signup" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-3 mt-2 text-lg font-semibold bg-gradient-to-r from-aurora-mint to-aurora-aqua text-foreground rounded-xl shadow-lg"
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1 relative z-10">
        <Outlet />
      </main>
    </div>
  );
}
