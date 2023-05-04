import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { useViewingAreaController } from '../../../classes/TownController';
import useTownController from '../../../hooks/useTownController';
import { ViewingArea as ViewingAreaModel } from '../../../types/CoveyTownSocket';
import ViewingArea from './ViewingArea';

export default function SelectVideoModal({
  isOpen,
  close,
  viewingArea,
}: {
  isOpen: boolean;
  close: () => void;
  viewingArea: ViewingArea;
}): JSX.Element {
  const coveyTownController = useTownController();
  const viewingAreaController = useViewingAreaController(viewingArea?.name);

  const [video, setVideo] = useState<string>(viewingArea?.defaultVideoURL || '');

  useEffect(() => {
    if (isOpen) {
      coveyTownController.pause();
    } else {
      coveyTownController.unPause();
    }
  }, [coveyTownController, isOpen]);

  const closeModal = useCallback(() => {
    coveyTownController.unPause();
    close();
  }, [coveyTownController, close]);

  const toast = useToast();

  const createViewingArea = useCallback(async () => {
    if (video && viewingAreaController) {
      const request: ViewingAreaModel = {
        id: viewingAreaController.id,
        video,
        isPlaying: true,
        elapsedTimeSec: 0,
      };
      try {
        await coveyTownController.createViewingArea(request);
        toast({
          title: 'Video set!',
          status: 'success',
        });
        coveyTownController.unPause();
      } catch (err) {
        if (err instanceof Error) {
          toast({
            title: 'Unable to set video URL',
            description: err.toString(),
            status: 'error',
          });
        } else {
          console.trace(err);
          toast({
            title: 'Unexpected Error',
            status: 'error',
          });
        }
      }
    }
  }, [video, coveyTownController, viewingAreaController, toast]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        closeModal();
        coveyTownController.unPause();
      }}>
      <ModalOverlay className='fixed inset-0 bg-gray-800 bg-opacity-80' />
      <ModalContent className='relative m-auto w-96 bg-white rounded-md shadow-lg px-10 border-2 border-gray-400'>
        <ModalHeader className='p-4 text-lg font-bold text-gray-700'>
          Pick a video to watch in {viewingAreaController?.id}
        </ModalHeader>
        <ModalCloseButton className='absolute top-0 right-0 m-3 text-gray-700' />
        <form
          onSubmit={ev => {
            ev.preventDefault();
            createViewingArea();
          }}
          className='px-4 py-2'>
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel htmlFor='video' className='text-gray-700 font-semibold mb-1'>
                Video URL
              </FormLabel>
              <Input
                id='video'
                name='video'
                value={video}
                onChange={e => setVideo(e.target.value)}
                className='w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              />
            </FormControl>
          </ModalBody>
          <ModalFooter className='p-4 gap-3'>
            <Button
              onClick={createViewingArea}
              className='w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-md py-2'>
              Set video
            </Button>
            <Button
              onClick={closeModal}
              className='w-full bg-gray-500 hover:bg-gray-600 text-white font-medium rounded-md py-2'>
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
