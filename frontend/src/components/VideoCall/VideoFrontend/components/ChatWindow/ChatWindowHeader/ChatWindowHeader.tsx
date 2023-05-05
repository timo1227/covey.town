'use client';
import React, { useEffect, useState } from 'react';
import { makeStyles } from 'tss-react/mui';
import CloseIcon from '../../../icons/CloseIcon';
import useTownController from '../../../../../../hooks/useTownController';

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

interface Chats {
  userName: string;
  tokenID: string;
}

export default function ChatWindowHeader() {
  const { classes } = useStyles();
  const {
    setIsChatWindowOpen,
    setIsGlobal,
    isChatWindowOpen,
    isCreateChatWindowOpen,
    setdirectMessageUsername,
  } = useChatContext();
  const townController = useTownController();
  const [chatList, setChatList] = useState<Chats[]>([]);

  useEffect(() => {
    const getChats = async () => {
      const userId = townController.userID;
      const townId = townController.townID;
      const res = await fetch(`/api/chats/${userId}/${townId}`);
      const data = await res.json();
      if (!data.error) {
        setChatList(data);
      }
    };
    getChats();
  }, [townController?.townID, townController.userID, isChatWindowOpen, isCreateChatWindowOpen]);

  return (
    <div className={classes.container}>
      <div className={classes.text}>Chat</div>
      <select
        name='chatList'
        id='chatList'
        className='block px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
        onChange={e => {
          setdirectMessageUsername(e.target.value);
          if (e.target.value === 'Global') {
            setIsGlobal(true);
          } else {
            setIsGlobal(false);
          }
        }}>
        <option value='Global' className='text-gray-900'>
          Global
        </option>
        {chatList &&
          chatList.map((chat: Chats) => (
            <option key={chat.tokenID} value={chat.tokenID}>
              {chat.userName}
            </option>
          ))}
      </select>
      <button className={classes.closeChatWindow} onClick={() => setIsChatWindowOpen(false)}>
        <CloseIcon />
      </button>
    </div>
  );
}
