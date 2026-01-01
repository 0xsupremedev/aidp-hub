import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    children: React.ReactNode;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
    className?: string;
}

export const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    size = 'md',
    children,
    icon,
    iconPosition = 'left',
    className = '',
    ...props
}) => {
    const variantClass = `btn-${variant}`;
    const sizeClass = size === 'md' ? '' : `btn-${size}`;

    return (
        <button
            className={`btn ${variantClass} ${sizeClass} ${className} flex items-center justify-center gap-2`}
            {...props}
        >
            {icon && iconPosition === 'left' && icon}
            {children}
            {icon && iconPosition === 'right' && icon}
        </button>
    );
};
