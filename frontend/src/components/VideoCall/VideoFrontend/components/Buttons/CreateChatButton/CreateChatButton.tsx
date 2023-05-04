import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { makeStyles } from 'tss-react/mui';
import useChatContext from '../../../hooks/useChatContext/useChatContext';
import useVideoContext from '../../../hooks/useVideoContext/useVideoContext';
import { HiOutlineUserGroup } from 'react-icons/hi';

export const ANIMATION_DURATION = 700;

const useStyles = makeStyles()({
  'iconContainer': {
    position: 'relative',
    display: 'flex',
  },
  'circle': {
    width: '10px',
    height: '10px',
    backgroundColor: '#5BB75B',
    borderRadius: '50%',
    position: 'absolute',
    top: '-3px',
    left: '13px',
    opacity: 0,
    transition: `opacity ${ANIMATION_DURATION * 0.5}ms ease-in`,
  },
  'hasUnreadMessages': {
    opacity: 1,
  },
  'ring': {
    border: '3px solid #5BB75B',
    borderRadius: '30px',
    height: '14px',
    width: '14px',
    position: 'absolute',
    left: '11px',
    top: '-5px',
    opacity: 0,
  },
  'animateRing': {
    animation: `$expand ${ANIMATION_DURATION}ms ease-out`,
    animationIterationCount: 1,
  },
  '@keyframes expand': {
    '0%': {
      transform: 'scale(0.1, 0.1)',
      opacity: 0,
    },
    '50%': {
      opacity: 1,
    },
    '100%': {
      transform: 'scale(1.4, 1.4)',
      opacity: 0,
    },
  },
});

export default function CreateChatButton() {
  const { classes, cx } = useStyles();
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const {
    setIsChatWindowOpen,
    conversation,
    hasUnreadMessages,
    isCreateChatWindowOpen,
    setCreateChatWindowOpen,
  } = useChatContext();
  const { setIsBackgroundSelectionOpen } = useVideoContext();

  const createChatWindow = () => {
    setCreateChatWindowOpen(!isCreateChatWindowOpen);
    setIsBackgroundSelectionOpen(false);
    setIsChatWindowOpen(false);
  };

  useEffect(() => {
    if (shouldAnimate) {
      setTimeout(() => setShouldAnimate(false), ANIMATION_DURATION);
    }
  }, [shouldAnimate]);

  return (
    <Button
      data-cy-chat-button
      onClick={createChatWindow}
      disabled={!conversation}
      startIcon={
        <div className={classes.iconContainer}>
          <HiOutlineUserGroup className=' text-gray-400 ' />
          <div className={cx(classes.ring, { [classes.animateRing]: shouldAnimate })} />
          <div className={cx(classes.circle, { [classes.hasUnreadMessages]: hasUnreadMessages })} />
        </div>
      }>
      Create Chat
    </Button>
  );
}
