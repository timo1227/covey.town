import React from 'react';
import { makeStyles } from 'tss-react/mui';
import { Theme } from '@mui/material/styles';
import {
  LocalAudioTrack,
  LocalVideoTrack,
  Participant,
  RemoteAudioTrack,
  RemoteVideoTrack,
} from 'twilio-video';

import AudioLevelIndicator from '../AudioLevelIndicator/AudioLevelIndicator';
import AvatarIcon from '../../icons/AvatarIcon';
import NetworkQualityLevel from '../NetworkQualityLevel/NetworkQualityLevel';
import PinIcon from './PinIcon/PinIcon';
import ScreenShareIcon from '../../icons/ScreenShareIcon';
import Typography from '@mui/material/Typography';

import useIsTrackSwitchedOff from '../../hooks/useIsTrackSwitchedOff/useIsTrackSwitchedOff';
import usePublications from '../../hooks/usePublications/usePublications';
import useTrack from '../../hooks/useTrack/useTrack';
import useParticipantIsReconnecting from '../../hooks/useParticipantIsReconnecting/useParticipantIsReconnecting';
import { UserProfile } from '../../../../../CoveyTypes';

const useStyles = makeStyles()((theme: Theme) => ({
  container: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    height: 0,
    overflow: 'hidden',
    marginBottom: '0.5em',
    // '& video': {
    //   filter: 'none',
    //   objectFit: 'contain !important',
    // },
    borderRadius: '4px',
    border: `2px solid rgb(245, 248, 255)`,
    paddingTop: `calc(${(9 / 16) * 100}% - 2px)`,
    background: 'black',
  },

  innerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },

  infoContainer: {
    position: 'absolute',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    width: '100%',
    background: 'transparent',
    top: 0,
  },

  avatarContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'black',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 1,
    [theme.breakpoints.down('md')]: {
      '& svg': {
        transform: 'scale(0.7)',
      },
    },
  },

  reconnectingContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(40, 42, 43, 0.75)',
    zIndex: 1,
  },

  screenShareIconContainer: {
    background: 'rgba(0, 0, 0, 0.5)',
    padding: '0.18em 0.3em',
    marginRight: '0.3em',
    display: 'flex',
  },

  identity: {
    background: 'rgba(0, 0, 0, 0.5)',
    color: 'white',
    padding: '0.18em 0.3em',
    margin: 0,
    display: 'flex',
    alignItems: 'center',
  },

  infoRowBottom: {
    display: 'flex',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    left: 0,
  },

  typeography: {
    color: 'white',
    [theme.breakpoints.down('md')]: {
      fontSize: '0.75rem',
    },
  },

  hideParticipant: {
    display: 'none',
  },

  cursorPointer: {
    cursor: 'pointer',
  },
}));

interface ParticipantInfoProps {
  participant: Participant;
  profile?: UserProfile;
  children: React.ReactNode;
  onClick?: () => void;
  isSelected?: boolean;
  isLocalParticipant?: boolean;
  hideParticipant?: boolean;
  slot?: number;
  insideGrid: boolean;
}

export default function ParticipantInfo({
  participant,
  profile,
  onClick,
  isSelected,
  children,
  isLocalParticipant,
  slot,
  hideParticipant,
}: ParticipantInfoProps) {
  const publications = usePublications(participant);

  const audioPublication = publications.find(p => p.kind === 'audio');
  const videoPublication = publications.find(
    p => !p.trackName.includes('screen') && p.kind === 'video',
  );

  const isVideoEnabled = Boolean(videoPublication);
  const isScreenShareEnabled = publications.find(p => p.trackName.includes('screen'));

  const videoTrack = useTrack(videoPublication);
  const isVideoSwitchedOff = useIsTrackSwitchedOff(
    videoTrack as LocalVideoTrack | RemoteVideoTrack,
  );

  const audioTrack = useTrack(audioPublication) as LocalAudioTrack | RemoteAudioTrack | undefined;
  const isParticipantReconnecting = useParticipantIsReconnecting(participant);

  const { classes, cx } = useStyles();

  return (
    <div
      className={cx(
        classes.container,
        {
          [classes.hideParticipant]: hideParticipant,
          [classes.cursorPointer]: Boolean(onClick),
        },
        slot !== undefined ? `area-${slot}` : undefined,
      )}
      onClick={onClick}
      data-cy-participant={participant.identity}>
      <div className={classes.infoContainer}>
        <NetworkQualityLevel participant={participant} />
        <div className={classes.infoRowBottom}>
          {isScreenShareEnabled && (
            <span className={classes.screenShareIconContainer}>
              <ScreenShareIcon />
            </span>
          )}
          <span className={classes.identity}>
            <AudioLevelIndicator audioTrack={audioTrack} />
            <Typography variant='body1' className={classes.typeography} component='span'>
              {profile ? profile.displayName : ''}
              {isLocalParticipant && ' (You)'}
            </Typography>
          </span>
        </div>
        <div>{isSelected && <PinIcon />}</div>
      </div>
      <div className={classes.innerContainer}>
        {(!isVideoEnabled || isVideoSwitchedOff) && (
          <div className={classes.avatarContainer}>
            <AvatarIcon />
          </div>
        )}
        {isParticipantReconnecting && (
          <div className={classes.reconnectingContainer}>
            <Typography variant='body1' className={classes.typeography}>
              Reconnecting...
            </Typography>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
