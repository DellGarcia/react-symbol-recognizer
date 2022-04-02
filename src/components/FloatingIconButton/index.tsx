import React from "react";
import { ButtonHTMLAttributes } from "react";
import { IconType } from "react-icons";

import './styles.css';

interface FloatingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconType;
  tooltip: string;
  disabled?: boolean;
  left?: boolean
};

export function FloatingIconButton({ icon, tooltip, left = false, ...props}: FloatingButtonProps) {
  return (
    <button className="floating-button" {...props}>
      {React.createElement(icon)}
      <label className={`tooltip ${left?"tooltip-left":""}`}>{tooltip}</label>
    </button>
  );
}