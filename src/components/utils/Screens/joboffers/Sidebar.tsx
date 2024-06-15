import React, { ReactNode, ChangeEvent } from 'react';
import { Checkbox as BaseCheckbox } from '@/components/ui/checkbox';

interface CheckboxProps {
  id: string;
  children: ReactNode;
  className?: string;
  checked?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ id, children, className, checked, onChange }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event);
  };

  return (
    <div className={`flex items-center space-x-2 mb-4 ${className}`}>
      <BaseCheckbox id={id} checked={checked} onChange={(e) => handleChange(e as ChangeEvent<HTMLInputElement>)} />
      <label
        htmlFor={id}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {children}
      </label>
    </div>
  );
};

export default Checkbox;
