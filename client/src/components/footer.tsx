import { Link } from "wouter";
import { SiLinkedin, SiGmail } from "react-icons/si";

export function Footer() {
  return (
    <footer className="relative border-t bg-gradient-to-b from-background/95 to-background via-background/98 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="absolute inset-0 bg-grid-slate-100/[0.05] [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
      <div className="container relative flex flex-col items-center py-10 md:flex-row md:justify-between">
        <div className="flex flex-col items-center space-y-2 md:items-start">
          <p className="text-lg font-medium bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Created by Shubham Chakrawarti
          </p>
          <p className="text-sm text-muted-foreground">
            Building delightful experiences with AI
          </p>
        </div>
        <div className="mt-6 flex items-center space-x-6 md:mt-0">
          <a
            href="https://www.linkedin.com/in/shubham-chakrawarti"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center space-x-2 text-muted-foreground transition-all duration-300 hover:text-primary relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
          >
            <SiLinkedin className="h-6 w-6 transform transition-transform duration-300 group-hover:scale-110" />
            <span className="text-sm font-medium opacity-90 transition-opacity duration-300 group-hover:opacity-100">
              LinkedIn
            </span>
          </a>
          <a
            href="mailto:shubham2004.hc@gmail.com"
            className="group flex items-center space-x-2 text-muted-foreground transition-all duration-300 hover:text-primary relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
          >
            <SiGmail className="h-6 w-6 transform transition-transform duration-300 group-hover:scale-110" />
            <span className="text-sm font-medium opacity-90 transition-opacity duration-300 group-hover:opacity-100">
              Gmail
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}