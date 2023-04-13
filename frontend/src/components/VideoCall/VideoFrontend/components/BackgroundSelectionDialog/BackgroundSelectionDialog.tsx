import BackgroundSelectionHeader from './BackgroundSelectionHeader/BackgroundSelectionHeader';
import BackgroundThumbnail from './BackgroundThumbnail/BackgroundThumbnail';
import Drawer from '@mui/material/Drawer';
import { backgroundConfig } from '../VideoProvider/useBackgroundSettings/useBackgroundSettings';
import useVideoContext from '../../hooks/useVideoContext/useVideoContext';

function BackgroundSelectionDialog() {
  const { isBackgroundSelectionOpen, setIsBackgroundSelectionOpen } = useVideoContext();

  const imageNames = backgroundConfig.imageNames;
  const images = backgroundConfig.images;

  return (
    <Drawer
      variant='persistent'
      anchor='right'
      open={isBackgroundSelectionOpen}
      transitionDuration={0}>
      <BackgroundSelectionHeader onClose={() => setIsBackgroundSelectionOpen(false)} />
      <div>
        <BackgroundThumbnail thumbnail={'none'} name={'None'} imagePath={''} />
        <BackgroundThumbnail thumbnail={'blur'} name={'Blur'} imagePath={''} />
        {images.map((image, index) => (
          <BackgroundThumbnail
            thumbnail={'image'}
            name={imageNames[index]}
            index={index}
            imagePath={image}
            key={imageNames[index]}
          />
        ))}
      </div>
    </Drawer>
  );
}

export default BackgroundSelectionDialog;
