import Link from "next/link";

interface ButtonProps {
  href?: string;
  variant?: "primary" | "secondary" | "outline";
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function Button({
  href,
  variant = "primary",
  children,
  onClick,
  className = ""
}: ButtonProps) {
  const baseStyles = "inline-block px-6 py-3 rounded-lg font-semibold transition-all duration-200";

  const variants = {
    primary: "bg-accent text-white hover:bg-accent/90 shadow-md hover:shadow-lg",
    secondary: "bg-primary text-white hover:bg-primary/90 shadow-md hover:shadow-lg",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white"
  };

  const classes = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
