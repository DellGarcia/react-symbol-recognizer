import React from "react";
import { ButtonHTMLAttributes } from "react";
import { IconType } from "react-icons";

import './styles.css';

interface FloatingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconType;
  disabled?: boolean;
};

export function FloatingIconButton({ icon, ...props}: FloatingButtonProps) {
  return (
    <button className="floating-button" {...props}>
      {React.createElement(icon)}
    </button>
  );
}