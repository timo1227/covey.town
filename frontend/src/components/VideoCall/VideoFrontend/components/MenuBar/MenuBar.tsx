import React from 'react';
import { makeStyles } from 'tss-react/mui';
import { Theme } from '@mui/material/styles';

import Button from '@mui/material/Button';
import EndCallButton from '../Buttons/EndCallButton/EndCallButton';
import { isMobile } from '../../utils';
import Menu from './Menu/Menu';
import useRoomState from '../../hooks/useRoomState/useRoomState';
import useVideoContext from '../../hooks/useVideoContext/useVideoContext';
import { Typography, Grid, Hidden } from '@mui/material';
import ToggleAudioButton from '../Buttons/ToggleAudioButton/ToggleAudioButton';
import ToggleChatButton from '../Buttons/ToggleChatButton/ToggleChatButton';
import CreateChatButton from '../Buttons/CreateChatButton/CreateChatButton';
import ToggleVideoButton from '../Buttons/ToggleVideoButton/ToggleVideoButton';
import ToggleScreenShareButton from '../Buttons/ToogleScreenShareButton/ToggleScreenShareButton';
import TownSettings from '../../../../Login/TownSettings';

const useStyles = makeStyles()((theme: Theme) => ({
  container: {
    backgroundColor: theme.palette.background.default,
    bottom: 0,
    left: 0,
    right: 0,
    height: `3rem`,
    position: 'absolute',
    display: 'flex',
    padding: '0 1.43em',
    zIndex: 10,
    [theme.breakpoints.down('md')]: {
      height: `${theme.mobileFooterHeight}px`,
      padding: 0,
    },
  },

  screenShareBanner: {
    'position': 'fixed',
    'zIndex': 8,
    'bottom': `${theme.footerHeight}px`,
    'left': 0,
    'right': 0,
    'height': '104px',
    'background': 'rgba(0, 0, 0, 0.5)',
    '& h6': {
      color: 'white',
    },
    '& button': {
      'background': 'white',
      'color': theme.brand,
      'border': `2px solid ${theme.brand}`,
      'margin': '0 2em',
      '&:hover': {
        color: '#600101',
        border: `2px solid #600101`,
        background: '#FFE9E7',
      },
    },
  },

  hideMobile: {
    display: 'initial',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
}));

export default function MenuBar() {
  const { classes } = useStyles();
  const { isSharingScreen, toggleScreenShare } = useVideoContext();
  const roomState = useRoomState();
  const isReconnecting = roomState === 'reconnecting';
  const { room } = useVideoContext();

  return (
    <>
      {isSharingScreen && (
        <Grid
          container
          justifyContent='center'
          alignItems='center'
          className={classes.screenShareBanner}>
          <Typography variant='h6'>You are sharing your screen</Typography>
          <Button onClick={() => toggleScreenShare()}>Stop Sharing</Button>
        </Grid>
      )}
      <footer className={`justify-center ${classes.container}`}>
        <Grid container justifyContent='space-around' alignItems='center'>
          <Grid item>
            <Grid container justifyContent='center'>
              {process.env.REACT_APP_DISABLE_TWILIO_CONVERSATIONS !== 'true' && (
                <>
                  <ToggleChatButton />
                  <CreateChatButton />
                </>
              )}
              <ToggleAudioButton disabled={isReconnecting} />
              <ToggleVideoButton disabled={isReconnecting} />
              {!isSharingScreen && !isMobile && (
                <ToggleScreenShareButton disabled={isReconnecting} />
              )}
              <Hidden mdDown>
                <Menu />
                <TownSettings />
              </Hidden>
            </Grid>
          </Grid>
          <Hidden mdDown>
            <Grid style={{ flex: 1 }}>
              <Grid container justifyContent='flex-end'>
                <EndCallButton />
              </Grid>
            </Grid>
          </Hidden>
        </Grid>
      </footer>
    </>
  );
}
