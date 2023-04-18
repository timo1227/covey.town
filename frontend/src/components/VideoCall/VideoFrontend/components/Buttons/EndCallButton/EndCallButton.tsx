import { Button } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import useVideoContext from '../../../hooks/useVideoContext/useVideoContext';

const useStyles = makeStyles()(() => ({
  button: {
    background: '#E22525',
    color: 'white',
  },
}));

export default function EndCallButton(props: { className?: string }) {
  const { cx } = useStyles();
  const { room } = useVideoContext();

  return (
    <Button
      onClick={() => room?.disconnect()}
      className={'text-white bg-red-500 hover:bg-red-900' + cx(props.className)}
      data-cy-disconnect>
      Disconnect
    </Button>
  );
}
