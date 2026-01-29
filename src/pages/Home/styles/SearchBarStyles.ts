import type { SxProps, Theme } from '@mui/material';

export const searchPaperStyles: SxProps<Theme> = {
  mt: 5,
  borderRadius: '60px',
  overflow: 'hidden',
  background: '#ffffff',
  backdropFilter: 'blur(20px)',
  border: '3px solid rgba(102, 126, 234, 0.4)',
  boxShadow: 'none',
  animation: 'slideUp 0.8s ease-out',
  animationDelay: '0.2s',
  animationFillMode: 'both',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: 'none',
    border: '3px solid rgba(102, 126, 234, 0.6)',
  },
  '&:focus-within': {
    border: '3px solid rgba(102, 126, 234, 0.8)',
  },
};

export const locationIconStyles: SxProps<Theme> = {
  color: '#667eea',
  fontSize: '1.8rem',
  ml: 1,
};

export const searchButtonStyles: SxProps<Theme> = {
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  width: '56px',
  height: '56px',
  mr: 0.5,
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
    transform: 'scale(1.05)',
  },
};

export const searchIconStyles: SxProps<Theme> = {
  fontSize: '1.8rem',
};

export const textFieldInputStyles: SxProps<Theme> = {
  fontSize: { xs: '1rem', sm: '1.1rem' },
  fontFamily: '"DM Sans", "Inter", sans-serif',
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  '& input': {
    padding: '20px 10px',
  },
};
