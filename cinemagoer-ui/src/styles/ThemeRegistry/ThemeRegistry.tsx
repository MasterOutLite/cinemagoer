import * as React from 'react';
import {ThemeProvider} from '@mui/material/styles';
import theme from './theme';
import {AppRouterCacheProvider} from '@mui/material-nextjs/v14-appRouter';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


export default function ThemeRegistry({children}: { children: React.ReactNode }) {

    return (
        <AppRouterCacheProvider
            options={{key: 'css'}}
        >
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </AppRouterCacheProvider>
    )
}
