'use client'
import {createTheme} from '@mui/material/styles';
import {deepOrange} from "@mui/material/colors";

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: deepOrange,
    secondary: deepOrange,
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.severity === 'info' && {
            backgroundColor: '#60a5fa',
          }),
        }),
      },
    },
  },
});

export default theme;
