import type { SxProps, Theme } from '@mui/material';

export const containerStyles: SxProps<Theme> = {
  width: '100vw',
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
  position: 'relative',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: 0,
  padding: 0,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.15) 0%, transparent 50%)',
    pointerEvents: 'none',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    width: '500px',
    height: '500px',
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.05)',
    top: '-250px',
    right: '-250px',
    animation: 'float 20s infinite ease-in-out',
  },
  '@keyframes float': {
    '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
    '25%': { transform: 'translate(-50px, 50px) rotate(90deg)' },
    '50%': { transform: 'translate(0, 100px) rotate(180deg)' },
    '75%': { transform: 'translate(50px, 50px) rotate(270deg)' },
  },
  '@keyframes slideUp': {
    from: {
      opacity: 0,
      transform: 'translateY(40px)',
    },
    to: {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
  '@keyframes scaleIn': {
    from: {
      opacity: 0,
      transform: 'scale(0.9)',
    },
    to: {
      opacity: 1,
      transform: 'scale(1)',
    },
  },
};

export const decorativeElement1Styles: SxProps<Theme> = {
  position: 'absolute',
  top: '10%',
  left: '10%',
  width: '100px',
  height: '100px',
  borderRadius: '20px',
  background: 'rgba(255,255,255,0.1)',
  transform: 'rotate(25deg)',
  animation: 'float 15s infinite ease-in-out',
  animationDelay: '2s',
};

export const decorativeElement2Styles: SxProps<Theme> = {
  position: 'absolute',
  bottom: '15%',
  right: '15%',
  width: '80px',
  height: '80px',
  borderRadius: '50%',
  background: 'rgba(255,255,255,0.08)',
  animation: 'float 18s infinite ease-in-out',
  animationDelay: '4s',
};

export const contentWrapperStyles: SxProps<Theme> = {
  textAlign: 'center',
  animation: 'slideUp 0.8s ease-out',
};