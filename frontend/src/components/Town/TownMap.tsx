'use client';
import { useEffect, useState } from 'react';
import useTownController from '../../hooks/useTownController';
import SocialSidebar from '../SocialSidebar/SocialSidebar';
import NewConversationModal from './interactables/NewCoversationModal';

export default function TownMap(): JSX.Element {
  const coveyTownController = useTownController();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function initPhaser() {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const Phaser = await import('phaser');
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const TownGameScene = (await import('./TownGameScene')).default;

      const config = {
        type: Phaser.AUTO,
        backgroundColor: '#000000',
        parent: 'map-container',
        render: { pixelArt: true, powerPreference: 'high-performance' },
        scale: {
          expandParent: false,
          mode: Phaser.Scale.ScaleModes.HEIGHT_CONTROLS_WIDTH,
          autoRound: true,
        },
        width: 800,
        height: 600,
        fps: { target: 30 },
        physics: {
          default: 'arcade',
          arcade: {
            gravity: { y: 0 }, // Top down game, so no gravity
          },
        },
      };

      const game = new Phaser.Game(config);
      const newGameScene = new TownGameScene(coveyTownController);
      game.scene.add('coveyBoard', newGameScene, true);
      const pauseListener = newGameScene.pause.bind(newGameScene);
      const unPauseListener = newGameScene.resume.bind(newGameScene);
      coveyTownController.addListener('pause', pauseListener);
      coveyTownController.addListener('unPause', unPauseListener);
      return () => {
        coveyTownController.removeListener('pause', pauseListener);
        coveyTownController.removeListener('unPause', unPauseListener);
        game.destroy(true);
      };
    }
    initPhaser();

    // Wait for the 2000ms delay to ensure the map container is rendered
    setTimeout(() => setLoading(false), 2000);
  }, []);

  if (loading) {
    return (
      <>
        <div
          id='app-container'
          className='flex flex-nowrap hidden justify-center pt-20 min-h-[100vh]'>
          <NewConversationModal />
          <div id='map-container' />
          <div id='social-container' className='flex flex-col bg-white'>
            <SocialSidebar />
          </div>
        </div>
        <div className='min-h-screen w-full bg-white absolute z-50 flex justify-center items-center'>
          <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900' />
        </div>
      </>

    );
  } else {
    return (
      <div
        id='app-container'
        className='flex flex-nowrap item-center justify-center pt-20 min-h-[100vh]'>
        <NewConversationModal />
        <div id='map-container' />
        <div id='social-container' className='flex flex-col bg-white'>
          <SocialSidebar />
        </div>
      </div>
    );
  }
}
