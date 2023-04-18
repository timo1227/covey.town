import {
  GaussianBlurBackgroundProcessor,
  ImageFit,
  isSupported,
  Pipeline,
  VirtualBackgroundProcessor,
} from '@twilio/video-processors';
import { StaticImageData } from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { LocalVideoTrack, Room } from 'twilio-video';
import { SELECTED_BACKGROUND_SETTINGS_KEY } from '../../../constants';
import Abstract from '../../../images/Abstract.jpg';
import BohoHome from '../../../images/BohoHome.jpg';
import Bookshelf from '../../../images/Bookshelf.jpg';
import CoffeeShop from '../../../images/CoffeeShop.jpg';
import Contemporary from '../../../images/Contemporary.jpg';
import CozyHome from '../../../images/CozyHome.jpg';
import Desert from '../../../images/Desert.jpg';
import Fishing from '../../../images/Fishing.jpg';
import Flower from '../../../images/Flower.jpg';
import Kitchen from '../../../images/Kitchen.jpg';
import ModernHome from '../../../images/ModernHome.jpg';
import Nature from '../../../images/Nature.jpg';
import Ocean from '../../../images/Ocean.jpg';
import Patio from '../../../images/Patio.jpg';
import Plant from '../../../images/Plant.jpg';
import SanFrancisco from '../../../images/SanFrancisco.jpg';
import AbstractThumb from '../../../images/thumb/Abstract.jpg';
import BohoHomeThumb from '../../../images/thumb/BohoHome.jpg';
import BookshelfThumb from '../../../images/thumb/Bookshelf.jpg';
import CoffeeShopThumb from '../../../images/thumb/CoffeeShop.jpg';
import ContemporaryThumb from '../../../images/thumb/Contemporary.jpg';
import CozyHomeThumb from '../../../images/thumb/CozyHome.jpg';
import DesertThumb from '../../../images/thumb/Desert.jpg';
import FishingThumb from '../../../images/thumb/Fishing.jpg';
import FlowerThumb from '../../../images/thumb/Flower.jpg';
import KitchenThumb from '../../../images/thumb/Kitchen.jpg';
import ModernHomeThumb from '../../../images/thumb/ModernHome.jpg';
import NatureThumb from '../../../images/thumb/Nature.jpg';
import OceanThumb from '../../../images/thumb/Ocean.jpg';
import PatioThumb from '../../../images/thumb/Patio.jpg';
import PlantThumb from '../../../images/thumb/Plant.jpg';
import SanFranciscoThumb from '../../../images/thumb/SanFrancisco.jpg';
import { Thumbnail } from '../../BackgroundSelectionDialog/BackgroundThumbnail/BackgroundThumbnail';
import { ppid } from 'process';

export interface BackgroundSettings {
  type: Thumbnail;
  index?: number;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const imageNames: string[] = [
  'Abstract',
  'Boho Home',
  'Bookshelf',
  'Coffee Shop',
  'Contemporary',
  'Cozy Home',
  'Desert',
  'Fishing',
  'Flower',
  'Kitchen',
  'Modern Home',
  'Nature',
  'Ocean',
  'Patio',
  'Plant',
  'San Francisco',
];

// eslint-disable-next-line @typescript-eslint/naming-convention
const images = [
  AbstractThumb.src,
  BohoHomeThumb.src,
  BookshelfThumb.src,
  CoffeeShopThumb.src,
  ContemporaryThumb.src,
  CozyHomeThumb.src,
  DesertThumb.src,
  FishingThumb.src,
  FlowerThumb.src,
  KitchenThumb.src,
  ModernHomeThumb.src,
  NatureThumb.src,
  OceanThumb.src,
  PatioThumb.src,
  PlantThumb.src,
  SanFranciscoThumb.src,
];

// eslint-disable-next-line @typescript-eslint/naming-convention
const rawImagePaths = [
  Abstract.src,
  BohoHome.src,
  Bookshelf.src,
  CoffeeShop.src,
  Contemporary.src,
  CozyHome.src,
  Desert.src,
  Fishing.src,
  Flower.src,
  Kitchen.src,
  ModernHome.src,
  Nature.src,
  Ocean.src,
  Patio.src,
  Plant.src,
  SanFrancisco.src,
];

const imageElements = new Map();

interface ImagePath {
  src: string | StaticImageData;
}

const getImage = (index: number): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    if (imageElements.has(index)) {
      return resolve(imageElements.get(index));
    }
    const img = new Image();
    img.onload = () => {
      imageElements.set(index, img);
      resolve(img);
    };
    img.onerror = reject;
    (img as ImagePath).src = rawImagePaths[index];
  });
};

export const backgroundConfig = {
  imageNames,
  images,
};

// eslint-disable-next-line @typescript-eslint/naming-convention
const virtualBackgroundAssets = '/virtualbackground';
let blurProcessor: GaussianBlurBackgroundProcessor;
let virtualBackgroundProcessor: VirtualBackgroundProcessor;

export default function useBackgroundSettings(
  videoTrack: LocalVideoTrack | undefined,
  room?: Room | null,
) {
  const [backgroundSettings, setBackgroundSettings] = useState<BackgroundSettings>(() => {
    const localStorageSettings =
      typeof window !== 'undefined' &&
      window.localStorage.getItem(SELECTED_BACKGROUND_SETTINGS_KEY);
    return localStorageSettings ? JSON.parse(localStorageSettings) : { type: 'none', index: 0 };
  });

  const removeProcessor = useCallback(() => {
    if (videoTrack && videoTrack.processor) {
      videoTrack.removeProcessor(videoTrack.processor);
    }
  }, [videoTrack]);

  const addProcessor = useCallback(
    (processor: GaussianBlurBackgroundProcessor | VirtualBackgroundProcessor) => {
      if (!videoTrack || videoTrack.processor === processor) {
        return;
      }
      removeProcessor();
      videoTrack.addProcessor(processor);
    },
    [videoTrack, removeProcessor],
  );

  useEffect(() => {
    if (!isSupported) {
      return;
    }
    // make sure localParticipant has joined room before applying video processors
    // this ensures that the video processors are not applied on the LocalVideoPreview
    const handleProcessorChange = async () => {
      if (!blurProcessor) {
        blurProcessor = new GaussianBlurBackgroundProcessor({
          assetsPath: virtualBackgroundAssets,
          pipeline: Pipeline.Canvas2D,
          maskBlurRadius: 3,
          blurFilterRadius: 10,
        });
        await blurProcessor.loadModel();
      }
      if (!virtualBackgroundProcessor) {
        virtualBackgroundProcessor = new VirtualBackgroundProcessor({
          assetsPath: virtualBackgroundAssets,
          backgroundImage: await getImage(0),
          fitType: ImageFit.Cover,
          pipeline: Pipeline.Canvas2D,
          maskBlurRadius: 5,
        });
        await virtualBackgroundProcessor.loadModel();
      }
      if (!room?.localParticipant) {
        return;
      }

      if (backgroundSettings.type === 'blur') {
        addProcessor(blurProcessor);
      } else if (
        backgroundSettings.type === 'image' &&
        typeof backgroundSettings.index === 'number'
      ) {
        virtualBackgroundProcessor.backgroundImage = await getImage(backgroundSettings.index);
        addProcessor(virtualBackgroundProcessor);
      } else {
        removeProcessor();
      }
    };
    handleProcessorChange();
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(
        SELECTED_BACKGROUND_SETTINGS_KEY,
        JSON.stringify(backgroundSettings),
      );
    }
  }, [backgroundSettings, videoTrack, room, addProcessor, removeProcessor]);

  return [backgroundSettings, setBackgroundSettings] as const;
}
