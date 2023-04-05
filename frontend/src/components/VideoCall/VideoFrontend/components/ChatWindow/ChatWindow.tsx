import { Theme } from '@mui/material/styles';
import React from 'react';
import { makeStyles } from 'tss-react/mui';
import useChatContext from '../../hooks/useChatContext/useChatContext';
import ChatInput from './ChatInput/ChatInput';
import ChatWindowHeader from './ChatWindowHeader/ChatWindowHeader';
import MessageList from './MessageList/MessageList';

const useStyles = makeStyles()((theme: Theme) => ({
  chatWindowContainer: {
    'pointerEvents': 'auto',
    'background': '#FFFFFF',
    'zIndex': 1000,
    'display': 'flex',
    'flexDirection': 'column',
    'borderLeft': '1px solid #E4E7E9',
    [theme.breakpoints.down('md')]: {
      position: 'fixed',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      zIndex: 100,
    },
    'position': 'fixed',
    'bottom': 0,
    'left': 0,
    'top': 0,
    'max-width': '250px',
  },

  hide: {
    display: 'none',
  },
}));

// In this component, we are toggling the visibility of the ChatWindow with CSS instead of
// conditionally rendering the component in the DOM. This is done so that the ChatWindow is
// not unmounted while a file upload is in progress.

export default function ChatWindow() {
  const { classes, cx } = useStyles();
  const { isChatWindowOpen, messages, conversation } = useChatContext();

  return (
    <aside className={cx(classes.chatWindowContainer, { [classes.hide]: !isChatWindowOpen })}>
      <ChatWindowHeader />
      <MessageList messages={messages} />
      <ChatInput conversation={conversation!} isChatWindowOpen={isChatWindowOpen} />
    </aside>
  );
}
