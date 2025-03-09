import { Link } from "wouter";
import { SiLinkedin, SiGmail } from "react-icons/si";

export function Footer() {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex flex-col items-center py-8 md:flex-row md:justify-between">
        <p className="text-sm text-muted-foreground mb-4 md:mb-0">
          Created by Shubham Chakrawarti
        </p>
        <div className="flex items-center space-x-4">
          <a
            href="https://www.linkedin.com/in/shubham-chakrawarti"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <SiLinkedin className="h-5 w-5" />
            <span className="text-sm">LinkedIn</span>
          </a>
          <a
            href="mailto:shubham2004.hc@gmail.com"
            className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <SiGmail className="h-5 w-5" />
            <span className="text-sm">Gmail</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
