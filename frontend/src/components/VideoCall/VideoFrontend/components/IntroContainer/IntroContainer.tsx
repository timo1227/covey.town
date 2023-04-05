import React from 'react';
import { makeStyles } from 'tss-react/mui';
import { Theme, Typography } from '@mui/material';
import Swoosh from './swoosh';
import VideoLogo from './VideoLogo';
import TwilioLogo from './TwilioLogo';
import { useAppState } from '../../state';
import UserMenu from './UserMenu/UserMenu';
import { useLocation } from 'react-router-dom';

const useStyles = makeStyles()((theme: Theme) => ({
  background: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgb(40, 42, 43)',
    height: '100%',
  },
  container: {
    position: 'relative',
    flex: '1',
  },
  innerContainer: {
    display: 'block',
    height: 'auto',
    width: 'calc(100% - 40px)',
    margin: '10px auto',
    maxWidth: '700px',

    borderRadius: '8px',
    border: '1px solid #ccc',
    overflow: 'hidden',
    position: 'relative',
  },
  swooshContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: Swoosh,
    backgroundSize: 'cover',
    width: '296px',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      height: '100px',
      backgroundPositionY: '140px',
    },
  },
  logoContainer: {
    position: 'absolute',
    width: '210px',
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      alignItems: 'center',
      width: '90%',
      textAlign: 'initial',
      '& svg': {
        height: '64px',
      },
    },
  },
  twilioLogo: {
    position: 'absolute',
    top: 0,
    left: 0,
    margin: '20px',
  },
  content: {
    background: 'white',
    width: '100%',
    padding: '4em',
    flex: 1,
    [theme.breakpoints.down('md')]: {
      padding: '2em',
    },
  },
  title: {
    color: 'white',
    margin: '1em 0 0',
    [theme.breakpoints.down('md')]: {
      margin: 0,
      fontSize: '1.1rem',
    },
  },
}));

interface IntroContainerProps {
  children: React.ReactNode;
}

const IntroContainer = (props: IntroContainerProps) => {
  const { classes } = useStyles();
  const location = useLocation();

  return (
    <div className='bg-gray-700 flex justify-center py-5'>
      <div className='w-1/3 bg-white rounded-md p-5'>
        <div className='rounded flex'>
          <div className=''>{props.children}</div>
        </div>
      </div>
    </div >
  );
};

export default IntroContainer;
