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
import { useInteractable } from '../../../classes/TownController';
import { ConversationArea } from '../../../generated/client';
import useTownController from '../../../hooks/useTownController';

export default function NewConversationModal(): JSX.Element {
  const coveyTownController = useTownController();
  const newConversation = useInteractable('conversationArea');
  const [topic, setTopic] = useState<string>('');

  const isOpen = newConversation !== undefined;

  useEffect(() => {
    if (newConversation) {
      coveyTownController.pause();
    } else {
      coveyTownController.unPause();
    }
  }, [coveyTownController, newConversation]);

  const closeModal = useCallback(() => {
    if (newConversation) {
      coveyTownController.interactEnd(newConversation);
    }
  }, [coveyTownController, newConversation]);

  const toast = useToast();

  const createConversation = useCallback(async () => {
    if (topic && newConversation) {
      const conversationToCreate: ConversationArea = {
        topic,
        id: newConversation.name,
        occupantsByID: [],
      };
      try {
        await coveyTownController.createConversationArea(conversationToCreate);
        toast({
          title: 'Conversation Created!',
          status: 'success',
        });
        setTopic('');
        coveyTownController.unPause();
        closeModal();
      } catch (err) {
        if (err instanceof Error) {
          toast({
            title: 'Unable to create conversation',
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
  }, [topic, setTopic, coveyTownController, newConversation, closeModal, toast]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        closeModal();
        coveyTownController.unPause();
      }}>
      <ModalOverlay className='fixed inset-0 bg-gray-800 bg-opacity-80' />
      <ModalContent className='relative m-auto w-96 bg-white rounded-md shadow-lg px-10 border-2 border-gray-400 '>
        <ModalHeader className='text-lg font-medium py-4 text-center'>
          Create a conversation in {newConversation?.name}
        </ModalHeader>
        <ModalCloseButton className='absolute top-4 right-4 rounded-full p-1' />
        <form
          onSubmit={ev => {
            ev.preventDefault();
            createConversation();
          }}>
          <ModalBody pb={6} className='px-8'>
            <FormControl className='mb-4'>
              <FormLabel htmlFor='topic' className='font-medium mb-3 text-center'>
                Topic of Conversation
              </FormLabel>
              <Input
                id='topic'
                placeholder='Enter Conversation Topic'
                name='topic'
                value={topic}
                onChange={e => setTopic(e.target.value)}
                className='border-gray-300 rounded-md px-3 py-2 w-full focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none'
              />
            </FormControl>
          </ModalBody>
          <ModalFooter className='px-8 py-6 '>
            <Button
              type='submit'
              className='w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-md py-2'>
              Create Conversation
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
