import React from 'react';

export default function Input({
  label,
  error,
  icon,
  rightIcon,
  className = '',
  ...props
}) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-purple-800 font-body">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-400 text-sm">
            {icon}
          </span>
        )}
        <input
          className={`
            w-full rounded-2xl border border-lilac/60 bg-white/80
            px-4 py-3 text-sm font-body text-gray-800
            placeholder:text-purple-300
            focus:outline-none focus:ring-2 focus:ring-lilac focus:border-transparent
            transition-all duration-200
            ${icon ? 'pl-10' : ''}
            ${rightIcon ? 'pr-10' : ''}
            ${error ? 'border-red-300 focus:ring-red-200' : ''}
            ${className}
          `}
          {...props}
        />
        {rightIcon && (
          <span className="absolute right-3.5 top-1/2 -translate-y-1/2">
            {rightIcon}
          </span>
        )}
      </div>
      {error && (
        <p className="text-xs text-red-500 font-body">{error}</p>
      )}
    </div>
  );
}
