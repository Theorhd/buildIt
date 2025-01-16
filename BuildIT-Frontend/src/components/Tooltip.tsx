import { ReactNode } from "react";
import '../styles/Tooltip.css';

interface TooltipProps {
    text: string;
    position: "top" | "bottom" | "left" | "right";
    children: ReactNode;
}

export default function Tooltip({ text, position, children }: TooltipProps) {
  return (
    <div className="tooltip">
      <span className="tooltip-trigger">{children}</span>
      <span className={`tooltiptext tooltip-${position}`}>{text}</span>
    </div>
  )
}