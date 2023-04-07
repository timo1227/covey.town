import React, { ChangeEvent, useState, FormEvent } from 'react';
import { useAppState } from '../../state';
import Button from '@mui/material/Button';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Grid from '@mui/material/Grid';
import GoogleLogo from './google-logo.svg';
import { InputLabel, Theme } from '@mui/material';
import IntroContainer from '../IntroContainer/IntroContainer';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { makeStyles } from 'tss-react/mui';
import { useLocation, useNavigate } from 'react-router-dom';

const useStyles = makeStyles()((theme: Theme) => ({
  googleButton: {
    'background': 'white',
    'color': 'rgb(0, 94, 166)',
    'borderRadius': '4px',
    'border': '2px solid rgb(2, 122, 197)',
    'margin': '1.8em 0 0.7em',
    'textTransform': 'none',
    'boxShadow': 'none',
    'padding': '0.3em 1em',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
    '&:hover': {
      background: 'white',
      boxShadow: 'none',
    },
  },
  errorMessage: {
    'color': 'red',
    'display': 'flex',
    'alignItems': 'center',
    'margin': '1em 0 0.2em',
    '& svg': {
      marginRight: '0.4em',
    },
  },
  gutterBottom: {
    marginBottom: '1em',
  },
  passcodeContainer: {
    minHeight: '120px',
  },
  submitButton: {
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
}));

export default function LoginPage() {
  const { classes } = useStyles();
  const { signIn, user, isAuthReady } = useAppState();
  const navigate = useNavigate();
  const location = useLocation();
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState<Error | null>(null);

  const isAuthEnabled = Boolean(process.env.REACT_APP_SET_AUTH);

  const login = () => {
    setAuthError(null);
    signIn?.(passcode)
      .then(() => {
        navigate({ pathname: '/' });
      })
      .catch(err => setAuthError(err));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login();
  };

  if (user || !isAuthEnabled) {
    navigate('/');
  }

  if (!isAuthReady) {
    return null;
  }

  return (
    <IntroContainer>
      {process.env.REACT_APP_SET_AUTH === 'firebase' && (
        <>
          <Typography variant='h5' className={classes.gutterBottom}>
            Sign in to join a room
          </Typography>
          <Typography variant='body1'>Sign in using your Twilio Google Account</Typography>
          <Button
            variant='contained'
            className={classes.googleButton}
            onClick={login}
            startIcon={<GoogleLogo />}>
            Sign in with Google
          </Button>
        </>
      )}

      {process.env.REACT_APP_SET_AUTH === 'passcode' && (
        <>
          <Typography variant='h5' className={classes.gutterBottom}>
            Enter passcode to join a room
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container justifyContent='space-between'>
              <div className={classes.passcodeContainer}>
                <InputLabel shrink htmlFor='input-passcode'>
                  Passcode
                </InputLabel>
                <TextField
                  id='input-passcode'
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setPasscode(e.target.value)}
                  type='password'
                  variant='outlined'
                  size='small'
                />
                <div>
                  {authError && (
                    <Typography variant='caption' className={classes.errorMessage}>
                      <ErrorOutlineIcon />
                      {authError.message}
                    </Typography>
                  )}
                </div>
              </div>
            </Grid>
            <Grid container justifyContent='flex-end'>
              <Button
                variant='contained'
                color='primary'
                type='submit'
                disabled={!passcode.length}
                className={classes.submitButton}>
                Submit
              </Button>
            </Grid>
          </form>
        </>
      )}
    </IntroContainer>
  );
}
