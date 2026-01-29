import type { SxProps, Theme } from '@mui/material';

export const searchPaperStyles: SxProps<Theme> = {
  mt: 5,
  borderRadius: '60px',
  overflow: 'hidden',
  background: 'rgba(255,255,255,0.98)',
  backdropFilter: 'blur(20px)',
  border: '2px solid rgba(255,255,255,0.3)',
  boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
  animation: 'slideUp 0.8s ease-out',
  animationDelay: '0.2s',
  animationFillMode: 'both',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 25px 70px rgba(0,0,0,0.35)',
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
