import React from 'react';
import { makeStyles } from 'tss-react/mui';
import CloseIcon from '../../../icons/CloseIcon';
import getConversationFromSID from '../../../../../../classes/TextConversation';

import useChatContext from '../../../hooks/useChatContext/useChatContext';

const useStyles = makeStyles()(() => ({
  container: {
    height: '56px',
    background: '#E4E7E9',
    borderBottom: '1px solid #E4E7E9',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 1em',
  },

  text: {
    fontWeight: 'bold',
  },

  closeChatWindow: {
    cursor: 'pointer',
    display: 'flex',
    background: 'transparent',
    border: '0',
    padding: '0.4em',
  },
}));

export default function ChatWindowHeader() {
  const { classes } = useStyles();
  const { setIsChatWindowOpen } = useChatContext();

  return (
    <div className={classes.container}>
      <div className={classes.text}>Chat</div>
      <button className={classes.closeChatWindow} onClick={() => setIsChatWindowOpen(false)}>
        <CloseIcon />
      </button>
    </div>
  );
}
