import type { SxProps, Theme } from '@mui/material';

export const containerStyles: SxProps<Theme> = {
  minHeight: '100vh',
  width: '100vw',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  py: { xs: 4, md: 6 },
  px: 2,
  boxSizing: 'border-box',
};

export const backButtonStyles: SxProps<Theme> = {
  mb: 2,
};

export const cardStyles: SxProps<Theme> = {
  borderRadius: 4,
  boxShadow: '0 24px 80px rgba(15, 23, 42, 0.35)',
};

export const loadingBoxStyles: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'center',
  mt: 4,
};

export const errorTextStyles: SxProps<Theme> = {
  mt: 4,
};
