import { Link } from "wouter";
import { SiLinkedin, SiGmail } from "react-icons/si";
import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="relative border-t bg-gradient-to-b from-background/95 to-background via-background/98 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="absolute inset-0 bg-grid-slate-100/[0.05] [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb),0.08),transparent)]" />
      <div className="container relative flex flex-col items-center py-10 md:flex-row md:justify-between">
        <div className="flex flex-col items-center space-y-2 md:items-start">
          <motion.p 
            className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Created by Shubham Chakrawarti
          </motion.p>
          <p className="text-sm text-muted-foreground italic">
            Building delightful experiences with AI
          </p>
        </div>
        <div className="mt-6 flex items-center space-x-8 md:mt-0">
          <motion.a
            href="https://www.linkedin.com/in/shubham-chakrawarti"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center space-x-2 text-muted-foreground transition-all duration-300 hover:text-primary relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <div className="p-2 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
              <SiLinkedin className="h-6 w-6 transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />
            </div>
            <span className="text-sm font-medium opacity-90 transition-opacity duration-300 group-hover:opacity-100">
              LinkedIn
            </span>
          </motion.a>
          <motion.a
            href="mailto:shubham2004.hc@gmail.com"
            className="group flex items-center space-x-2 text-muted-foreground transition-all duration-300 hover:text-primary relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <div className="p-2 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
              <SiGmail className="h-6 w-6 transform transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6" />
            </div>
            <span className="text-sm font-medium opacity-90 transition-opacity duration-300 group-hover:opacity-100">
              Gmail
            </span>
          </motion.a>
        </div>
      </div>
    </footer>
  );
}