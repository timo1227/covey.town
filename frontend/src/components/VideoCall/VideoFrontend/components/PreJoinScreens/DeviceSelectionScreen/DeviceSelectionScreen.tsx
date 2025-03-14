import { Grid, Hidden, Theme } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import useVideoContext from '../../../hooks/useVideoContext/useVideoContext';
import { useAppState } from '../../../state';
import ToggleAudioButton from '../../Buttons/ToggleAudioButton/ToggleAudioButton';
import ToggleVideoButton from '../../Buttons/ToggleVideoButton/ToggleVideoButton';
import LocalVideoPreview from './LocalVideoPreview/LocalVideoPreview';
import SettingsMenu from './SettingsMenu/SettingsMenu';

const useStyles = makeStyles()((theme: Theme) => ({
  gutterBottom: {
    marginBottom: '1em',
  },
  marginTop: {
    marginTop: '1em',
  },
  deviceButton: {
    width: '100%',
    border: '2px solid #aaa',
    margin: '1em 0',
  },
  localPreviewContainer: {
    paddingRight: '2em',
    [theme.breakpoints.down('md')]: {
      padding: '0 2.5em',
    },
  },
  joinButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('md')]: {
      'flexDirection': 'column-reverse',
      'width': '100%',
      '& button': {
        margin: '0.5em 0',
      },
    },
  },
  mobileButtonBar: {
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      justifyContent: 'space-between',
      margin: '1.5em 0 1em',
    },
  },
  mobileButton: {
    padding: '0.8em 0',
    margin: 0,
  },
}));

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface DeviceSelectionScreenProps {}

// eslint-disable-next-line no-empty-pattern
export default function DeviceSelectionScreen({}: DeviceSelectionScreenProps) {
  const { classes } = useStyles();
  const { getToken, isFetching } = useAppState();
  const { connect: videoConnect, isAcquiringLocalTracks, isConnecting } = useVideoContext();
  const disableButtons = isFetching || isAcquiringLocalTracks || isConnecting;

  return (
    <>
      <Grid container justifyContent='center'>
        <Grid item md={7} sm={12} xs={12}>
          <div className={classes.localPreviewContainer}>
            <LocalVideoPreview identity='You' />
          </div>
          <div className={classes.mobileButtonBar}>
            <Hidden mdUp>
              <ToggleAudioButton className={classes.mobileButton} disabled={disableButtons} />
              <ToggleVideoButton className={classes.mobileButton} disabled={disableButtons} />
            </Hidden>
            <SettingsMenu mobileButtonClass={classes.mobileButton} />
          </div>
        </Grid>
        <Grid item md={5} sm={12} xs={12}>
          <Grid
            container
            direction='column'
            justifyContent='space-between'
            style={{ height: '100%' }}>
            <div>
              <Hidden mdDown>
                <ToggleAudioButton className={classes.deviceButton} disabled={disableButtons} />
                <ToggleVideoButton className={classes.deviceButton} disabled={disableButtons} />
              </Hidden>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
