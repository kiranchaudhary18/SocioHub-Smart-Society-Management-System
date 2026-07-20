import { Link } from "react-router-dom";
import { MessageCircle, Share2, Mail, Globe } from "lucide-react";

const footerLinks = {
  Product: ["Ecosystem", "Intelligence", "Security", "Changelog", "Status"],
  Company: ["About Us", "Careers", "Manifesto", "Contact", "Partners"],
  Resources: ["Documentation", "Help Center", "Community", "API SDKs"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
};

export function Footer() {
  return (
    <footer className="bg-background pt-32 pb-12 border-t border-border/30 relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[100vw] h-[20vw] bg-aurora-mint/10 blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12 mb-20">
          <div className="col-span-2 lg:col-span-2">
            <Link to="/" className="text-2xl font-heading font-black tracking-tighter text-foreground flex items-center gap-2 mb-6">
              <div className="h-8 w-8 rounded-lg bg-foreground flex items-center justify-center shadow-soft">
                <span className="text-background text-lg font-bold">S</span>
              </div>
              SocioHub
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-8 max-w-xs font-light">
              The OS for Modern Communities. <br />
              Orchestrate your entire residential ecosystem with invisible, intelligent software.
            </p>
            <div className="flex gap-4">
              <a href="#" className="h-10 w-10 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-all duration-300">
                <MessageCircle className="h-4 w-4" />
              </a>
              <a href="#" className="h-10 w-10 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-all duration-300">
                <Share2 className="h-4 w-4" />
              </a>
              <a href="#" className="h-10 w-10 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-all duration-300">
                <Mail className="h-4 w-4" />
              </a>
              <a href="#" className="h-10 w-10 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-all duration-300">
                <Globe className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-heading font-bold text-foreground mb-6">Product</h4>
            <ul className="space-y-4">
              {footerLinks.Product.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm font-light text-muted-foreground hover:text-foreground transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-foreground mb-6">Company</h4>
            <ul className="space-y-4">
              {footerLinks.Company.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm font-light text-muted-foreground hover:text-foreground transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-foreground mb-6">Resources</h4>
            <ul className="space-y-4">
              {footerLinks.Resources.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm font-light text-muted-foreground hover:text-foreground transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border/30 text-xs text-muted-foreground font-light">
          <p>© {new Date().getFullYear()} SocioHub OS. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            {footerLinks.Legal.map((link) => (
              <a key={link} href="#" className="hover:text-foreground transition-colors">{link}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
