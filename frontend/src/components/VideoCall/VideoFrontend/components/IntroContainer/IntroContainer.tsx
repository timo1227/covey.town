import { Theme } from '@mui/material';
import React from 'react';
import { makeStyles } from 'tss-react/mui';
import Swoosh from './swoosh';

const useStyles = makeStyles()((theme: Theme) => ({
  background: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgb(40, 42, 43)',
    height: '100%',
  },
  container: {
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
  },
  swooshContainer: {
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
    width: '210px',
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
      'display': 'flex',
      'alignItems': 'center',
      'width': '90%',
      'textAlign': 'initial',
      '& svg': {
        height: '64px',
      },
    },
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
// eslint-disable-next-line @typescript-eslint/naming-convention
const IntroContainer = (props: IntroContainerProps) => {
  const { classes } = useStyles();

  return (
    <div className={`min-h-[calc(100vh-5rem)] ${classes.background}`}>
      <div className={classes.container}>
        <div className={classes.innerContainer}>
          <div className={classes.content}>{props.children}</div>
        </div>
      </div>
    </div>
  );
};

export default IntroContainer;
