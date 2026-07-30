import React from 'react';
import './components.css';
import clsx from 'clsx';

// ============================================================================
// BUTTON COMPONENT - Premium Banking Button
// ============================================================================

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      loading = false,
      icon,
      iconPosition = 'left',
      children,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={clsx(
          'btn',
          `btn-${variant}`,
          `btn-${size}`,
          fullWidth && 'btn-full-width',
          loading && 'btn-loading',
          disabled && 'btn-disabled',
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <span className="btn-spinner"></span>
            <span>{children}</span>
          </>
        ) : (
          <>
            {icon && iconPosition === 'left' && <span className="btn-icon">{icon}</span>}
            {children}
            {icon && iconPosition === 'right' && <span className="btn-icon">{icon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

// ============================================================================
// CARD COMPONENT - Glassmorphism Cards
// ============================================================================

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'elevated' | 'flat';
  interactive?: boolean;
  hoverEffect?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', interactive = false, hoverEffect = true, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          'card',
          `card-${variant}`,
          interactive && 'card-interactive',
          hoverEffect && 'card-hover',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

// ============================================================================
// INPUT COMPONENT - Modern Input Field
// ============================================================================

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, helperText, className, ...props }, ref) => {
    return (
      <div className="input-wrapper">
        {label && (
          <label className="input-label" htmlFor={props.id}>
            {label}
          </label>
        )}
        <div className="input-container">
          {icon && <span className="input-icon">{icon}</span>}
          <input
            ref={ref}
            className={clsx('input', error && 'input-error', icon && 'input-with-icon', className)}
            {...props}
          />
        </div>
        {error && <span className="input-error-message">{error}</span>}
        {helperText && !error && <span className="input-helper-text">{helperText}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';

// ============================================================================
// BADGE COMPONENT - Status Badges
// ============================================================================

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'primary', size = 'md', className, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={clsx('badge', `badge-${variant}`, `badge-${size}`, className)}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

// ============================================================================
// SKELETON COMPONENT - Loading State
// ============================================================================

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string | number;
  height?: string | number;
  borderRadius?: string;
}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ width = '100%', height = '1rem', borderRadius = '0.5rem', className, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx('skeleton', className)}
        style={{
          width,
          height,
          borderRadius,
          ...style,
        }}
        {...props}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';

// ============================================================================
// PROGRESS COMPONENT - Progress Bars
// ============================================================================

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  variant?: 'primary' | 'success' | 'warning' | 'error';
  showLabel?: boolean;
}

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ value, max = 100, variant = 'primary', showLabel = false, className, ...props }, ref) => {
    const percentage = Math.min((value / max) * 100, 100);

    return (
      <div ref={ref} className={clsx('progress-wrapper', className)} {...props}>
        <div className="progress-bar">
          <div
            className={clsx('progress-fill', `progress-${variant}`)}
            style={{ width: `${percentage}%` }}
          />
        </div>
        {showLabel && <span className="progress-label">{Math.round(percentage)}%</span>}
      </div>
    );
  }
);

Progress.displayName = 'Progress';

// ============================================================================
// PILL COMPONENT - Tag/Pill Component
// ============================================================================

export interface PillProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  onClose?: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
}

export const Pill = React.forwardRef<HTMLDivElement, PillProps>(
  ({ icon, onClose, variant = 'primary', className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={clsx('pill', `pill-${variant}`, className)} {...props}>
        {icon && <span className="pill-icon">{icon}</span>}
        <span className="pill-label">{children}</span>
        {onClose && (
          <button className="pill-close" onClick={onClose} type="button" aria-label="Remove">
            ×
          </button>
        )}
      </div>
    );
  }
);

Pill.displayName = 'Pill';

// ============================================================================
// AVATAR COMPONENT - User Avatars
// ============================================================================

export interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fallback?: string;
  status?: 'online' | 'offline' | 'away';
}

export const Avatar = React.forwardRef<HTMLImageElement, AvatarProps>(
  ({ size = 'md', fallback, status, className, alt, src, ...props }, ref) => {
    const [imageError, setImageError] = React.useState(!src);

    return (
      <div className={clsx('avatar-container', `avatar-${size}`, status && `avatar-status-${status}`)}>
        {!imageError ? (
          <img
            ref={ref}
            src={src}
            alt={alt || 'Avatar'}
            className={clsx('avatar-image', className)}
            onError={() => setImageError(true)}
            {...props}
          />
        ) : (
          <div className={clsx('avatar-fallback', className)}>
            {fallback || alt?.charAt(0).toUpperCase() || '?'}
          </div>
        )}
        {status && <div className="avatar-status-indicator" />}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

// ============================================================================
// ALERT COMPONENT - Alerts & Notifications
// ============================================================================

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  description?: string;
  closeable?: boolean;
  onClose?: () => void;
  icon?: React.ReactNode;
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ variant = 'info', title, description, closeable = false, onClose, icon, className, children, ...props }, ref) => {
    const [isOpen, setIsOpen] = React.useState(true);

    if (!isOpen) return null;

    return (
      <div ref={ref} className={clsx('alert', `alert-${variant}`, className)} role="alert" {...props}>
        <div className="alert-content">
          {icon && <span className="alert-icon">{icon}</span>}
          <div>
            {title && <h4 className="alert-title">{title}</h4>}
            {description && <p className="alert-description">{description}</p>}
            {children}
          </div>
        </div>
        {closeable && (
          <button
            className="alert-close"
            onClick={() => {
              setIsOpen(false);
              onClose?.();
            }}
            type="button"
            aria-label="Close alert"
          >
            ×
          </button>
        )}
      </div>
    );
  }
);

Alert.displayName = 'Alert';

// ============================================================================
// DIVIDER COMPONENT - Visual Separator
// ============================================================================

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'horizontal' | 'vertical';
  spacing?: 'compact' | 'normal' | 'loose';
}

export const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  ({ variant = 'horizontal', spacing = 'normal', className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx('divider', `divider-${variant}`, `divider-${spacing}`, className)}
        {...props}
      />
    );
  }
);

Divider.displayName = 'Divider';

// ============================================================================
// LOADING SPINNER COMPONENT
// ============================================================================

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary';
}

export const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ size = 'md', variant = 'primary', className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx('spinner', `spinner-${size}`, `spinner-${variant}`, className)}
        role="status"
        aria-label="Loading"
        {...props}
      >
        <span className="sr-only">Loading...</span>
      </div>
    );
  }
);

Spinner.displayName = 'Spinner';

export default {
  Button,
  Card,
  Input,
  Badge,
  Skeleton,
  Progress,
  Pill,
  Avatar,
  Alert,
  Divider,
  Spinner,
};
