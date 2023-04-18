'use client';
import { ChakraProvider } from '@chakra-ui/react';
import { StyledEngineProvider, ThemeProvider } from '@mui/material';
import assert from 'assert';
import { useCallback, useState } from 'react';
import TownController from '../../classes/TownController';
import TownMap from './TownMap';
import { ChatProvider } from '../VideoCall/VideoFrontend/components/ChatProvider';
import ErrorDialog from '../VideoCall/VideoFrontend/components/ErrorDialog/ErrorDialog';
import PreJoinScreens from '../VideoCall/VideoFrontend/components/PreJoinScreens/PreJoinScreens';
import { VideoProvider } from '../VideoCall/VideoFrontend/components/VideoProvider';
import AppStateProvider, { useAppState } from '../VideoCall/VideoFrontend/state';
import theme from '../VideoCall/VideoFrontend/theme';
import useConnectionOptions from '../VideoCall/VideoFrontend/utils/useConnectionOptions/useConnectionOptions';
import VideoOverlay from '../VideoCall/VideoOverlay/VideoOverlay';
import LoginControllerContext from '../../contexts/LoginControllerContext';
import TownControllerContext from '../../contexts/TownControllerContext';
import { TownsServiceClient } from '../../generated/client';
import dynamic from 'next/dynamic';
import Nav from './TownNav';

// eslint-disable-next-line @typescript-eslint/naming-convention
const UnsupportedBrowserWarning = dynamic(
  () =>
    import(
      '../VideoCall/VideoFrontend/components/UnsupportedBrowserWarning/UnsupportedBrowserWarning'
    ),
  { ssr: false },
);

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
    page = (
      <>
        <PreJoinScreens />
      </>
    );
  }
  const url = process.env.NEXT_PUBLIC_TOWNS_SERVICE_URL;
  assert(url);
  const townsService = new TownsServiceClient({ BASE: url }).towns;

  return (
    <>
      <LoginControllerContext.Provider value={{ setTownController, townsService }}>
        <UnsupportedBrowserWarning>
          <VideoProvider options={connectionOptions} onError={setError} onDisconnect={onDisconnect}>
            <ErrorDialog dismissError={() => setError(null)} error={error} />
            <Nav />
            {page}
          </VideoProvider>
        </UnsupportedBrowserWarning>
      </LoginControllerContext.Provider>
    </>
  );
}

export default function AppStateWrapper(): JSX.Element {
  return (
    <ChakraProvider>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <AppStateProvider>
            <JoinTown />
          </AppStateProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </ChakraProvider>
  );
}
