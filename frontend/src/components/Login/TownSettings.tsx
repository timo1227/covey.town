import { useCallback, useState } from 'react';

import {
  // Button,
  // Checkbox,
  // FormControl,
  // FormLabel,
  // Input,
  // Modal,
  // ModalBody,
  // ModalCloseButton,
  // ModalContent,
  // ModalFooter,
  // ModalHeader,
  // ModalOverlay,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
// import MenuItem from '@mui/material/MenuItem';
// import Typography from '@mui/material/Typography';
import useTownController from '../../hooks/useTownController';

function TownSettings(): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const coveyTownController = useTownController();
  const [friendlyName, setFriendlyName] = useState<string>(coveyTownController.friendlyName);
  const [isPubliclyListed, setIsPubliclyListed] = useState<boolean>(
    coveyTownController.townIsPubliclyListed,
  );
  const [roomUpdatePassword, setRoomUpdatePassword] = useState<string>('');

  const openSettings = useCallback(() => {
    onOpen();
    coveyTownController.pause();
  }, [onOpen, coveyTownController]);

  const closeSettings = useCallback(() => {
    onClose();
    coveyTownController.unPause();
  }, [onClose, coveyTownController]);

  const toast = useToast();
  const processUpdates = async (action: string) => {
    if (action === 'delete') {
      try {
        await coveyTownController.deleteTown(roomUpdatePassword);
        toast({
          title: 'Town deleted',
          status: 'success',
        });
        closeSettings();
      } catch (err) {
        if (err instanceof Error) {
          toast({
            title: 'Unable to delete town',
            description: err.toString(),
            status: 'error',
          });
        } else {
          console.trace(err);
          toast({
            title: 'Unexpected error, see browser console for details.',
            status: 'error',
          });
        }
      }
    } else {
      try {
        await coveyTownController.updateTown(roomUpdatePassword, {
          isPubliclyListed,
          friendlyName,
        });
        toast({
          title: 'Town updated',
          description: 'To see the updated town, please exit and re-join this town',
          status: 'success',
        });
        closeSettings();
      } catch (err) {
        if (err instanceof Error) {
          toast({
            title: 'Unable to update town',
            description: err.toString(),
            status: 'error',
          });
        } else {
          console.trace(err);
          toast({
            title: 'Unexpected error, see browser console for details.',
            status: 'error',
          });
        }
      }
    }
  };
  // TODO: Add validation to the form
  // Validate form ensure that the user has entered a friendly name and a password before allowing them to submit

  return (
    <>
      <button
        data-testid='openMenuButton'
        onClick={openSettings}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
        <span className='text-base'>Town Settings</span>
      </button>
      {isOpen && (
        <div className='fixed z-10 inset-0 overflow-y-auto'>
          <div className='flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
            <div className='fixed inset-0 transition-opacity'>
              <div className='absolute inset-0 bg-gray-500 opacity-75'></div>
            </div>
            <div className='fixed inset-0 flex items-center justify-center' aria-hidden='true'>
              <div className='relative bg-white w-full max-w-lg mx-auto rounded-lg'>
                <div className='p-6'>
                  <h2 className='text-lg font-bold mb-4'>
                    Edit town {coveyTownController.friendlyName} ({coveyTownController.townID})
                  </h2>
                  <form
                    onSubmit={ev => {
                      ev.preventDefault();
                      processUpdates('edit');
                    }}>
                    <div className='mb-4'>
                      <label className='block text-gray-700 font-bold mb-2' htmlFor='friendlyName'>
                        Friendly Name
                      </label>
                      <input
                        id='friendlyName'
                        type='text'
                        placeholder='Friendly Name'
                        name='friendlyName'
                        value={friendlyName}
                        onChange={ev => setFriendlyName(ev.target.value)}
                        className='border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full'
                      />
                    </div>
                    <div className='mb-4'>
                      <div className='flex items-center'>
                        <input
                          id='isPubliclyListed'
                          type='checkbox'
                          name='isPubliclyListed'
                          checked={isPubliclyListed}
                          onChange={e => setIsPubliclyListed(e.target.checked)}
                          className='mr-2 leading-tight'
                        />
                        <label className='block text-gray-700 font-bold' htmlFor='isPubliclyListed'>
                          Publicly Listed
                        </label>
                      </div>
                    </div>
                    <div className='mb-4'>
                      <label
                        className='block text-gray-700 font-bold mb-2'
                        htmlFor='updatePassword'>
                        Town Update Password
                      </label>
                      <input
                        id='updatePassword'
                        data-testid='updatePassword'
                        type='password'
                        placeholder='Password'
                        name='password'
                        value={roomUpdatePassword}
                        onChange={e => setRoomUpdatePassword(e.target.value)}
                        className='border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full'
                      />
                    </div>
                    <div className='flex justify-end'>
                      <button
                        data-testid='deletebutton'
                        type='button'
                        value='delete'
                        name='action1'
                        onClick={() => processUpdates('delete')}
                        className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-3'>
                        Delete
                      </button>
                      <button
                        data-testid='updatebutton'
                        type='button'
                        value='update'
                        name='action2'
                        onClick={() => processUpdates('edit')}
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-3'>
                        Update
                      </button>
                      <button
                        data-testid='cancelbutton'
                        type='button'
                        value='cancel'
                        name='action3'
                        onClick={closeSettings}
                        className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'>
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TownSettings;
