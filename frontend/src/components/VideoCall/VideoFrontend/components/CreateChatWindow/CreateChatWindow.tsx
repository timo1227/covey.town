'use client';
import { useState, useEffect } from 'react';
import { makeStyles } from 'tss-react/mui';
import useChatContext from '../../hooks/useChatContext/useChatContext';
import TownController from '../../../../../classes/TownController';
import useTownController from '../../../../../hooks/useTownController';
import CloseIcon from '../../icons/CloseIcon';

const useStyles = makeStyles()(() => ({
  createChatWindowContainer: {
    pointerEvents: 'auto',
    background: '#FFFFFF',
    borderRadius: '2rem',
    border: '10px solid #E4E7E9',
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    height: '10rem',
    width: '20rem',
    top: '100%',
  },
  hide: {
    display: 'none',
  },
  closeChatWindow: {
    cursor: 'pointer',
    display: 'flex',
    background: 'transparent',
    border: '0',
    padding: '0.4em',
    position: 'absolute',
    right: '0',
  },
}));

// In this component, we are toggling the visibility of the ChatWindow with CSS instead of
// conditionally rendering the component in the DOM. This is done so that the ChatWindow is
// not unmounted while a file upload is in progress.

export default function CreateChatWindow() {
  const { classes, cx } = useStyles();
  const { isCreateChatWindowOpen, setCreateChatWindowOpen } = useChatContext();
  const townController = useTownController();
  const [playersList, setPlayersList] = useState<TownController['players']>([]);
  const [playerChatToken, setplayerChatToken] = useState<string>('');

  let coveyRoom = townController?.townID;
  if (!coveyRoom) coveyRoom = 'Disconnected';

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setplayerChatToken(event.target.value);
  };

  useEffect(() => {
    if (coveyRoom) {
      const User = townController.userID;
      const players = townController.players || [];
      const filteredPlayers = players.filter(player => player.id !== User);
      setPlayersList(filteredPlayers);
    } else {
      console.log('townController is null');
    }
  }, [coveyRoom, townController.players, townController.userID]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // CREATE CHAT FROM SID AND NAME
    console.log(playerChatToken);
  };

  return (
    <aside
      className={`text-center ${cx(classes.createChatWindowContainer, {
        [classes.hide]: !isCreateChatWindowOpen,
      })}`}>
      <h1>Create Chat Window</h1>
      <button className={classes.closeChatWindow} onClick={() => setCreateChatWindowOpen(false)}>
        <CloseIcon />
      </button>
      <form className='flex justify-center items-center h-full' onSubmit={handleSubmit}>
        <label className='mr-2'>
          User:
          <select onChange={handleChange} className='ml-2 p-2 border rounded-md'>
            <option value=''>Select a user</option>
            {playersList.map(player => (
              <option key={player.id} value={player.chatToken}>
                {player.userName}
              </option>
            ))}
          </select>
        </label>
        <input
          type='submit'
          value='Create'
          className='p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer'
        />
      </form>
    </aside>
  );
}
