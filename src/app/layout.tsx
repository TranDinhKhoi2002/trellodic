'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Lexend } from 'next/font/google';
import { Provider } from 'react-redux';
import { Experimental_CssVarsProvider as CssVarsProvider, StyledEngineProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { CacheProvider } from '@emotion/react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import AppBar from '@/components/AppBar';
import BackdropLoading from '@/components/Loading/Backdrop';
import theme from '@/common/styles/theme';
import createEmotionCache from '@/common/styles/createEmotionCache';
import { withAuth } from '@/hocs';
import store from '@/redux/store';
import 'react-toastify/dist/ReactToastify.css';
import '@/common/styles/globals.css';

const clientSideEmotionCache = createEmotionCache();
const roboto = Lexend({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});
const queryClient = new QueryClient();

function RootLayout({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <html lang="en" className={roboto.className}>
      <Provider store={store}>
        <StyledEngineProvider injectFirst>
          <CacheProvider value={clientSideEmotionCache}>
            <CssVarsProvider theme={theme}>
              <CssBaseline />
              <QueryClientProvider client={queryClient}>
                <body>
                  {!isLoaded ? (
                    <BackdropLoading />
                  ) : (
                    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
                      {pathname.startsWith('/auth') ? <></> : <AppBar />}
                      {!isLoaded ? <BackdropLoading /> : children}
                    </Container>
                  )}
                  <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    closeOnClick
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                  />
                </body>
              </QueryClientProvider>
            </CssVarsProvider>
          </CacheProvider>
        </StyledEngineProvider>
      </Provider>
    </html>
  );
}

export default withAuth(RootLayout);
