import { useState, useRef, useEffect, type ReactNode } from "react";
import { useMediaQuery } from "../../hooks/useMediaQuery";

interface TooltipProps {
  trigger: ReactNode;
  desktopContent: ReactNode;
  mobileContent: ReactNode;
}

export default function Tooltip({
  trigger,
  desktopContent,
  mobileContent,
}: TooltipProps) {
  const [isTooltipPinned, setIsTooltipPinned] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");

  const tooltipRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      const isClickingOutside =
        tooltipRef.current &&
        !tooltipRef.current.contains(target) &&
        triggerRef.current &&
        !triggerRef.current.contains(target);

      if (isClickingOutside) {
        setIsTooltipPinned(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isTooltipVisible = isTooltipPinned || (isHovering && isLargeScreen);
  const content = isLargeScreen ? desktopContent : mobileContent;

  return (
    <div className="relative">
      <div
        ref={triggerRef}
        onClick={() => setIsTooltipPinned(!isTooltipPinned)}
        onMouseEnter={() => isLargeScreen && setIsHovering(true)}
        onMouseLeave={() => isLargeScreen && setIsHovering(false)}
      >
        {trigger}
      </div>
      <div
        ref={tooltipRef}
        className={`absolute bottom-full left-1 -translate-x-70 mb-2 w-max max-w-xs p-3 bg-input-hover text-xs rounded-lg shadow-lg transition-opacity md:max-w-sm lg:max-w-md lg:-translate-x-90 xl:max-w-lg ${
          isTooltipVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        } after:content-[''] after:absolute after:top-full after:left-73 after:-translate-x-1/2 after:border-8 after:border-solid after:border-x-transparent after:border-b-0 after:border-t-input-hover lg:after:left-93`}
      >
        {content}
      </div>
    </div>
  );
}
