import React from 'react';

const variants = {
  primary:   'bg-lilac hover:bg-purple-300 text-purple-900 border border-purple-300',
  blush:     'bg-blush hover:bg-pink-300 text-pink-900 border border-pink-300',
  mint:      'bg-mint hover:bg-green-200 text-green-900 border border-green-300',
  outline:   'bg-transparent border-2 border-lilac text-purple-700 hover:bg-lilac hover:text-purple-900',
  ghost:     'bg-transparent text-purple-600 hover:bg-lilac/30',
  danger:    'bg-red-100 hover:bg-red-200 text-red-700 border border-red-200',
};

const sizes = {
  sm:  'px-4 py-1.5 text-sm',
  md:  'px-6 py-2.5 text-sm',
  lg:  'px-8 py-3 text-base',
  xl:  'px-10 py-4 text-lg',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  loading = false,
  disabled = false,
  fullWidth = false,
  onClick,
  type = 'button',
  ...props
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center gap-2
        rounded-full font-body font-medium
        transition-all duration-200
        hover:scale-[1.02] active:scale-[0.98]
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <>
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Loading...
        </>
      ) : children}
    </button>
  );
}
