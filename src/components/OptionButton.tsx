import React from 'react'
import Button from './Button';

interface OptionButtonProps {
    logo: React.ReactNode;
    name: string;
    isSelected: boolean;
    onClick: () => void;
}

export const OptionButton = ({ logo, name, isSelected, onClick } : OptionButtonProps) => {
    return (
        <div className={`flex items-center gap-1 font-medium ${isSelected ? "text-indigo-500" : ""}`}>
          <Button className={`h-10 w-10 ${isSelected ? "bg-indigo-500" : ""}`} onClick={onClick}>
            {logo}
          </Button>
          {name}
        </div>
      );
}
