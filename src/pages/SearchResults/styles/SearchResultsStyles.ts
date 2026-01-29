import type { SxProps, Theme } from '@mui/material';

export const resultsContainerStyles: SxProps<Theme> = {
  minHeight: '100vh',
  width: '100vw',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
  py: { xs: 4, md: 6 },
  px: 2,
};

export const resultsInnerCardStyles: SxProps<Theme> = {
  bgcolor: 'rgba(255,255,255,0.96)',
  borderRadius: 4,
  boxShadow: '0 24px 80px rgba(15, 23, 42, 0.35)',
  px: { xs: 2.5, md: 4 },
  py: { xs: 3, md: 4 },
  backdropFilter: 'blur(18px)',
};

export const resultsHeaderTitleStyles: SxProps<Theme> = {
  fontSize: { xs: '2rem', sm: '2.4rem' },
  fontWeight: 800,
  fontFamily: '"Space Grotesk", "Outfit", "Poppins", sans-serif',
  color: '#1e293b',
  letterSpacing: '-0.03em',
  lineHeight: 1.1,
};

export const resultsHeaderSubtitleStyles: SxProps<Theme> = {
  fontSize: { xs: '0.85rem', sm: '0.95rem' },
  fontFamily: '"DM Sans", "Inter", sans-serif',
  color: 'rgba(15,23,42,0.7)',
  fontWeight: 500,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
};

