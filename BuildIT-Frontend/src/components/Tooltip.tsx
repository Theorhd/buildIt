import { ElementType, ReactNode } from "react";
import '../styles/Tooltip.css';

interface TooltipProps {
    text: string;
    position: "top" | "bottom" | "left" | "right";
    as: ElementType;
    children: ReactNode;
}

export default function Tooltip({ text, position, as: Component, children, ...rest }: TooltipProps) {
  return (
    <div className="tooltip">
        <Component {...rest}>
            <span className="tooltip-trigger">{children}</span>
            <span className={`tooltiptext tooltip-${position}`}>{text}</span>
        </Component>
    </div>
  )
}