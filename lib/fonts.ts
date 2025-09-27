import { cn } from "./utils";

// Font utility classes for easy use throughout the app
export const fontClasses = {
  heading: "font-heading", // Playfair Display for main headings
  secondaryHeading: "font-secondary-heading", // Poppins for secondary headings
  body: "font-body", // Lato for body text
} as const;

// Helper functions to combine font classes with other classes
export const headingFont = (className?: string) => 
  cn("font-heading", className);

export const secondaryHeadingFont = (className?: string) => 
  cn("font-secondary-heading", className);

export const bodyFont = (className?: string) => 
  cn("font-body", className);

// Pre-configured heading components classes
export const headingVariants = {
  h1: "font-heading text-4xl md:text-6xl font-bold",
  h2: "font-heading text-3xl md:text-5xl font-bold", 
  h3: "font-heading text-2xl md:text-4xl font-semibold",
  h4: "font-secondary-heading text-xl md:text-2xl font-semibold",
  h5: "font-secondary-heading text-lg md:text-xl font-medium",
  h6: "font-secondary-heading text-base md:text-lg font-medium",
} as const;

// Body text variants
export const bodyVariants = {
  large: "font-body text-lg leading-relaxed",
  default: "font-body text-base leading-normal", 
  small: "font-body text-sm leading-normal",
  xs: "font-body text-xs leading-tight",
} as const;