'use client';;
import { ChakraProvider } from '@chakra-ui/react';
import { ThemeProvider, Theme, StyledEngineProvider } from '@mui/material';
import assert from 'assert';
import { useCallback, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import TownController from '../../classes/TownController';
import { ChatProvider } from '../../components/VideoCall/VideoFrontend/components/ChatProvider';
import ErrorDialog from '../../components/VideoCall/VideoFrontend/components/ErrorDialog/ErrorDialog';
import PreJoinScreens from '../../components/VideoCall/VideoFrontend/components/PreJoinScreens/PreJoinScreens';
import UnsupportedBrowserWarning from '../../components/VideoCall/VideoFrontend/components/UnsupportedBrowserWarning/UnsupportedBrowserWarning';
import { VideoProvider } from '../../components/VideoCall/VideoFrontend/components/VideoProvider';
import AppStateProvider, { useAppState } from '../../components/VideoCall/VideoFrontend/state';
import theme from '../../components/VideoCall/VideoFrontend/theme';
import useConnectionOptions from '../../components/VideoCall/VideoFrontend/utils/useConnectionOptions/useConnectionOptions';
import VideoOverlay from '../../components/VideoCall/VideoOverlay/VideoOverlay';
import TownMap from '../../components/Town/TownMap';
import TownControllerContext from '../../contexts/TownControllerContext';
import LoginControllerContext from '../../contexts/LoginControllerContext';
import { TownsServiceClient } from '../../generated/client';


declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}


function JoinTown() {
  const [townController, setTownController] = useState<TownController | null>(null);
  const { error, setError } = useAppState();
  const connectionOptions = useConnectionOptions();
  const onDisconnect = useCallback(() => {
    townController?.disconnect();
  }, [townController]);

  let page: JSX.Element;
  if (townController) {
    page = (
      <TownControllerContext.Provider value={townController}>
        <ChatProvider>
          <TownMap />
          <VideoOverlay preferredMode='fullwidth' />
        </ChatProvider>
      </TownControllerContext.Provider>
    );
  } else {
    page = <PreJoinScreens />;
  }
  const url = process.env.REACT_APP_TOWNS_SERVICE_URL;
  assert(url);
  const townsService = new TownsServiceClient({ BASE: url }).towns;

  return (
    <>
      <LoginControllerContext.Provider value={{ setTownController, townsService }}>
        <UnsupportedBrowserWarning>
          <VideoProvider options={connectionOptions} onError={setError} onDisconnect={onDisconnect}>
            <ErrorDialog dismissError={() => setError(null)} error={error} />
            {page}
          </VideoProvider>
        </UnsupportedBrowserWarning>
      </LoginControllerContext.Provider>
    </>
  );
}

export default function AppStateWrapper(): JSX.Element {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <AppStateProvider>
              <JoinTown />
            </AppStateProvider>
          </ThemeProvider>
        </StyledEngineProvider>
      </ChakraProvider>
    </BrowserRouter>
  );
}
