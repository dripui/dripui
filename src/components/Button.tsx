import { ComponentProps, JSX } from 'react';
import { twJoin, twMerge } from 'tailwind-merge';

// Infer types from props to improve intellisense
type Size = Exclude<ButtonProps['size'], undefined>;
type Variant = Exclude<ButtonProps['variant'], undefined>;
type Color = Exclude<ButtonProps['color'], undefined>;

const baseClassnames = twJoin(
  'rounded-md border',
  'font-medium',
  'flex items-center justify-center',
  'select-none disabled:cursor-not-allowed',
  'disabled:opacity-50',
  'transition duration-100 ease-in-out',
);

const sizeClassnames: Record<Size, string> = {
  xs: 'text-xs px-2 py-0.5',
  sm: 'text-sm px-3 py-1',
  md: 'text-md px-3.5 py-1.5',
  lg: 'text-lg px-4 py-2',
  xl: 'text-xl px-5 py-2.5',
};

const variantClassnames: Record<Variant, string> = {
  primary: 'text-white border-transparent',
  secondary: 'bg-white shadow-sm',
};

const variantColorClassnames: Record<Variant, Record<Color, string>> = {
  primary: {
    danger: 'bg-danger hover:bg-danger-400 disabled:bg-danger',
    info: 'bg-info hover:bg-info-400 disabled:bg-info',
    success: 'bg-success-600 hover:bg-success-500 disabled:bg-success',
    warning: 'bg-warning hover:bg-warning-400 disabled:bg-warning',
    default: 'bg-default-900 hover:bg-default-700 disabled:bg-default-300',
  },
  secondary: {
    danger:
      'text-danger-600 border-danger-300 hover:bg-danger-100 disabled:bg-danger-50',
    info: 'text-info-600 border-info-300 hover:bg-info-100 disabled:bg-info-50',
    success:
      'text-success-600 border-success-300 hover:bg-success-100 disabled:bg-success-50',
    warning:
      'text-warning-600 border-warning-300 hover:bg-warning-100 disabled:bg-warning-50',
    default:
      'text-default-900 border-default-300 hover:bg-default-100 disabled:bg-default-300',
  },
};

interface ButtonProps extends ComponentProps<'button'> {
  variant?: 'primary' | 'secondary';
  color?: 'danger' | 'info' | 'success' | 'warning' | 'default';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  icon?: JSX.Element;
}

export const Button = ({
  children,
  className,
  disabled,
  size = 'sm',
  variant = 'primary',
  color = 'default',
  icon,
  ...rest
}: ButtonProps) => (
  <button
    className={twMerge(
      baseClassnames,
      variantClassnames[variant],
      variantColorClassnames[variant][color],
      sizeClassnames[size],
      className,
    )}
    disabled={disabled}
    {...rest}
  >
    {icon && <span className="mr-2">{icon}</span>}
    {children}
  </button>
);
