import type { ComponentProps } from "react";

interface IconProps extends ComponentProps<"div"> {
  name: "rating" | "runtime" | "trailer";
}

export default function Icon({ name, className, ...props }: IconProps) {
  const iconUrl = `/images/icons/${name}.svg`;

  return (
    <div
      className={`w-7 h-7 bg-accent ${className}`}
      style={{
        maskImage: `url('${iconUrl}')`,
        WebkitMaskImage: `url('${iconUrl}')`,
      }}
      {...props}
    />
  );
}
