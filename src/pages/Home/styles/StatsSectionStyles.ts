import type { SxProps, Theme } from '@mui/material';

export const statsContainerStyles: SxProps<Theme> = {
  mt: 6,
  display: 'flex',
  justifyContent: 'center',
  gap: 4,
  flexWrap: 'wrap',
  animation: 'slideUp 0.8s ease-out',
  animationDelay: '0.4s',
  animationFillMode: 'both',
};

export const statItemStyles = (index: number): SxProps<Theme> => ({
  textAlign: 'center',
  minWidth: '120px',
  animation: 'slideUp 0.8s ease-out',
  animationDelay: `${0.5 + index * 0.1}s`,
  animationFillMode: 'both',
});

export const statNumberStyles: SxProps<Theme> = {
  fontSize: { xs: '1.8rem', sm: '2.2rem' },
  fontWeight: 800,
  fontFamily: '"Space Grotesk", sans-serif',
  color: 'white',
  textShadow: '0 3px 15px rgba(0,0,0,0.3)',
  mb: 0.5,
};

export const statLabelStyles: SxProps<Theme> = {
  fontSize: { xs: '0.9rem', sm: '1rem' },
  fontFamily: '"DM Sans", sans-serif',
  color: 'rgba(255,255,255,0.85)',
  fontWeight: 500,
  letterSpacing: '0.05em',
};
