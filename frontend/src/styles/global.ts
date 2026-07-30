import { colors, typography, spacing, shadows, borderRadius, transitions, animations as animationNames } from './designSystem';

const GlobalStyles = `
/* ============================================================================
   RESET & BASE STYLES
   ============================================================================ */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

*::before,
*::after {
  box-sizing: inherit;
}

html {
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  scroll-behavior: smooth;
}

body {
  margin: 0;
  padding: 0;
  font-family: ${typography.fontFamily.body};
  font-size: 1rem;
  line-height: 1.5;
  color: ${colors.gray[900]};
  background: linear-gradient(135deg, #fafbfc 0%, #f3f5f9 100%);
  background-attachment: fixed;
}

html,
body,
#root {
  width: 100%;
  height: 100%;
}

/* ============================================================================
   TYPOGRAPHY
   ============================================================================ */

h1, h2, h3, h4, h5, h6 {
  font-weight: 600;
  line-height: 1.2;
  margin-bottom: ${spacing[4]};
  color: ${colors.gray[900]};
}

h1 {
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.01em;
}

h2 {
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.005em;
}

h3 {
  font-size: 1.25rem;
  font-weight: 600;
}

h4 {
  font-size: 1.125rem;
}

h5 {
  font-size: 1rem;
}

h6 {
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: ${colors.gray[600]};
}

p {
  margin-bottom: ${spacing[4]};
  color: ${colors.gray[700]};
}

a {
  color: ${colors.primary[500]};
  text-decoration: none;
  transition: all ${transitions.fast};
}

a:hover {
  color: ${colors.primary[600]};
  text-decoration: underline;
}

button {
  font-family: inherit;
}

input,
select,
textarea {
  font-family: inherit;
  font-size: 1rem;
}

/* ============================================================================
   KEYFRAME ANIMATIONS
   ============================================================================ */

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slideDown {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slideLeft {
  from {
    transform: translateX(20px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideRight {
  from {
    transform: translateX(-20px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes glow {
  0%, 100% {
    box-shadow: 0 0 20px rgba(91, 143, 255, 0.3);
  }
  50% {
    box-shadow: 0 0 30px rgba(91, 143, 255, 0.6);
  }
}

@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes scale {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes slideInFromLeft {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes slideOutToLeft {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}

@keyframes slideInFromRight {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes slideOutToRight {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
}

@keyframes scaleIn {
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes microInteraction {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

/* ============================================================================
   SCROLLBAR - Custom Styling
   ============================================================================ */

::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: ${colors.gray[300]};
  border-radius: 4px;
  transition: background ${transitions.fast};
}

::-webkit-scrollbar-thumb:hover {
  background: ${colors.gray[400]};
}

/* ============================================================================
   SELECTION
   ============================================================================ */

::selection {
  background-color: ${colors.primary[500]};
  color: white;
}

::-moz-selection {
  background-color: ${colors.primary[500]};
  color: white;
}

/* ============================================================================
   FOCUS STYLES - Accessibility
   ============================================================================ */

*:focus-visible {
  outline: 2px solid ${colors.primary[500]};
  outline-offset: 2px;
}

/* ============================================================================
   UTILITY CLASSES
   ============================================================================ */

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 ${spacing[4]};
}

@media (max-width: 768px) {
  .container {
    padding: 0 ${spacing[3]};
  }
}

.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* ============================================================================
   REDUCED MOTION - Accessibility
   ============================================================================ */

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* ============================================================================
   PRINT STYLES
   ============================================================================ */

@media print {
  body {
    background: white;
  }

  a {
    text-decoration: underline;
  }

  button,
  input,
  select,
  textarea {
    background: inherit;
    border: inherit;
    padding: inherit;
    color: inherit;
  }
}
`;

export default GlobalStyles;
