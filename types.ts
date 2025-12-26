// Add React import to resolve missing namespace error for ReactNode on line 9
import React from 'react';

export interface NavLink {
  label: string;
  path: string;
}

export interface ServiceCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  className?: string;
  bgImage?: string;
  dark?: boolean;
  tags?: string[];
}