'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import Video, { ConnectOptions, LocalTrack, Room } from 'twilio-video';
import { Callback } from '../../../types';
import { isMobile } from '../../../utils';

if (typeof window !== 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  (window as any).TwilioVideo = Video;
}

export default function useRoom(
  localTracks: LocalTrack[],
  onError: Callback,
  options?: ConnectOptions,
) {
  const [room, setRoom] = useState<Room | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const optionsRef = useRef(options);

  useEffect(() => {
    // This allows the connect function to always access the most recent version of the options object. This allows us to
    // reliably use the connect function at any time.
    optionsRef.current = options;
  }, [options]);

  const connect = useCallback(
    (token: string) => {
      setIsConnecting(true);
      return Video.connect(token, { ...optionsRef.current, tracks: localTracks }).then(
        newRoom => {
          setRoom(newRoom);
          // VideoRoomMonitor.registerVideoRoom(newRoom); Uncomment when VideoRoomMonitor is updated
          const disconnect = () => newRoom.disconnect();

          // This app can add up to 13 'participantDisconnected' listeners to the room object, which can trigger
          // a warning from the EventEmitter object. Here we increase the max listeners to suppress the warning.
          newRoom.setMaxListeners(15);

          newRoom.once('disconnected', () => {
            // Reset the room only after all other `disconnected` listeners have been called.
            setTimeout(() => setRoom(null));
            if (typeof window !== 'undefined') {
              window.removeEventListener('beforeunload', disconnect);
            }

            if (isMobile && typeof window !== 'undefined') {
              window.removeEventListener('pagehide', disconnect);
            }
          });

          if (typeof window !== 'undefined') {
            (window as any).TwilioRoom = newRoom;
          }

          newRoom.localParticipant.videoTracks.forEach(publication =>
            // All video tracks are published with 'low' priority because the video track
            // that is displayed in the 'MainParticipant' component will have it's priority
            // set to 'high' via track.setPriority()
            publication.setPriority('low'),
          );

          setIsConnecting(false);

          // Add a listener to disconnect from the room when a user closes their browser
          if (typeof window !== 'undefined') {
            window.addEventListener('beforeunload', disconnect);
          }

          if (isMobile && typeof window !== 'undefined') {
            // Add a listener to disconnect from the room when a mobile user closes their browser
            window.addEventListener('pagehide', disconnect);
          }
        },
        error => {
          onError(error);
          setIsConnecting(false);
        },
      );
    },
    [localTracks, onError],
  );

  return { room, isConnecting, connect };
}
