import type { SxProps, Theme } from '@mui/material';

export const brandWrapperStyles: SxProps<Theme> = {
  mb: 2,
  animation: 'scaleIn 0.6s ease-out',
};

export const brandNameStyles: SxProps<Theme> = {
  fontSize: { xs: '3.5rem', sm: '5rem', md: '6.5rem' },
  fontWeight: 800,
  fontFamily: '"Space Grotesk", "Outfit", "Poppins", sans-serif',
  background: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 50%, #e0e0e0 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  textShadow: '0 4px 20px rgba(0,0,0,0.2)',
  letterSpacing: '-0.03em',
  margin: 0,
  lineHeight: 1,
  mb: 1,
};

export const taglineStyles: SxProps<Theme> = {
  fontSize: { xs: '1rem', sm: '1.2rem' },
  fontFamily: '"DM Sans", "Inter", sans-serif',
  color: 'rgba(255,255,255,0.9)',
  fontWeight: 500,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  margin: 0,
  textShadow: '0 2px 10px rgba(0,0,0,0.2)',
};
