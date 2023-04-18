import React from 'react';
import { makeStyles } from 'tss-react/mui';
import { Participant } from 'twilio-video';
import useParticipantIsReconnecting from '../../../hooks/useParticipantIsReconnecting/useParticipantIsReconnecting';
import { Tooltip } from '@mui/material';

const useStyles = makeStyles()({
  indicator: {
    width: '10px',
    height: '10px',
    borderRadius: '100%',
    background: '#0c0',
    display: 'inline-block',
    marginRight: '3px',
  },
  isReconnecting: {
    background: '#ffb100',
  },
});

export default function ParticipantConnectionIndicator({ participant }: { participant: Participant }) {
  const isReconnecting = useParticipantIsReconnecting(participant);
  const { classes, cx } = useStyles();
  return (
    <Tooltip title={isReconnecting ? 'Participant is reconnecting' : 'Participant is connected'}>
      <span className={cx(classes.indicator, { [classes.isReconnecting]: isReconnecting })}></span>
    </Tooltip>
  );
}
