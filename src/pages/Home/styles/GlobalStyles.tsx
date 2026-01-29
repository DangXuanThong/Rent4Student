import { GlobalStyles } from '@mui/material';

export const AppGlobalStyles = () => (
  <GlobalStyles
    styles={{
      '*': {
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
      },
      'html, body': {
        margin: 0,
        padding: 0,
        width: '100%',
        height: '100%',
        overflow: 'auto',
      },
      '#root': {
        margin: 0,
        padding: 0,
        width: '100%',
        minHeight: '100vh',
      },
    }}
  />
);

export default AppGlobalStyles;
