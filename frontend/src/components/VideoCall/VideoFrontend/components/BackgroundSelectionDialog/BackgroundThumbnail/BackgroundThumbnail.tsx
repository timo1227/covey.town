import { Theme } from '@mui/material/styles';
import BlurIcon from '@mui/icons-material/BlurOnOutlined';
import NoneIcon from '@mui/icons-material/NotInterestedOutlined';
import { makeStyles } from 'tss-react/mui';
import useVideoContext from '../../../hooks/useVideoContext/useVideoContext';
import { StaticImageData } from 'next/image';
import Image from 'next/image';

export type Thumbnail = 'none' | 'blur' | 'image';

interface BackgroundThumbnailProps {
  thumbnail: Thumbnail;
  imagePath: string | StaticImageData;
  name: string;
  index?: number;
}

const useStyles = makeStyles<void, 'thumbOverlay'>()((theme: Theme) => ({
  thumbContainer: {
    margin: '5px',
    width: 'calc(50% - 10px)',
    display: 'flex',
    position: 'relative',
  },
  thumbIconContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '10px',
    border: `solid ${theme.palette.grey[400]}`,
  },
  thumbIcon: {
    height: 50,
    width: 50,
    color: `${theme.palette.grey[400]}`,
  },
  thumbImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    objectFit: 'cover',
    borderRadius: '10px',
    border: `solid ${theme.palette.grey[400]}`,
  },
  thumbOverlay: {
    position: 'absolute',
    color: 'transparent',
    padding: '20px',
    fontSize: '14px',
    fontWeight: 'bold',
    width: '100%',
    height: '100%',
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export default function BackgroundThumbnail({
  thumbnail,
  imagePath,
  name,
  index,
}: BackgroundThumbnailProps) {
  const { classes, cx } = useStyles();
  const { backgroundSettings, setBackgroundSettings } = useVideoContext();
  const isImage = thumbnail === 'image';
  const thumbnailSelected = isImage
    ? backgroundSettings.index === index && backgroundSettings.type === 'image'
    : backgroundSettings.type === thumbnail;
  const icons = {
    none: NoneIcon,
    blur: BlurIcon,
    image: null,
  };
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const ThumbnailIcon = icons[thumbnail];

  return (
    <div
      className={classes.thumbContainer}
      onClick={() =>
        setBackgroundSettings({
          type: thumbnail,
          index: index,
        })
      }>
      {ThumbnailIcon ? (
        <div className={cx(classes.thumbIconContainer, { selected: thumbnailSelected })}>
          <ThumbnailIcon className={classes.thumbIcon} />
        </div>
      ) : (
        <Image
          // className={cx(classes.thumbImage, { selected: thumbnailSelected })}
          src={imagePath}
          alt={name}
          width={300}
          height={200}
        />
      )}
      <div className={classes.thumbOverlay}>{name}</div>
    </div>
  );
}
