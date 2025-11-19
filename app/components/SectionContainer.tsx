interface SectionContainerProps {
  children: React.ReactNode;
  className?: string;
  background?: "white" | "gray" | "primary";
}

export default function SectionContainer({
  children,
  className = "",
  background = "white"
}: SectionContainerProps) {
  const backgrounds = {
    white: "bg-white",
    gray: "bg-background",
    primary: "bg-primary text-white"
  };

  return (
    <section className={`${backgrounds[background]} py-16 md:py-24 ${className}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}
