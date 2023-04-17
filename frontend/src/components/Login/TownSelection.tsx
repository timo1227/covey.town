'use client';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from '@chakra-ui/react';
import assert from 'assert';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useState, useRef } from 'react';
import TownController from '../../classes/TownController';
import { Town } from '../../generated/client';
import useLoginController from '../../hooks/useLoginController';
import useVideoContext from '../VideoCall/VideoFrontend/hooks/useVideoContext/useVideoContext';

export default function TownSelection(): JSX.Element {
  const [userName, setUserName] = useState<string>('');
  const [newTownName, setNewTownName] = useState<string>('');
  const [newTownIsPublic, setNewTownIsPublic] = useState<boolean>(true);
  const [townIDToJoin, setTownIDToJoin] = useState<string>('');
  const [currentPublicTowns, setCurrentPublicTowns] = useState<Town[]>();
  const loginController = useLoginController();
  const { setTownController, townsService } = loginController;
  const { connect: videoConnect } = useVideoContext();
  // Set Ref for username input
  const userNameInputRef = useRef<HTMLInputElement>(null);

  const toast = useToast();

  // Get logged in username from session
  const session = useSession();
  // Set the value of the userNameRef to the username from the session
  useEffect(() => {
    if (session.data?.user?.name) {
      userNameInputRef.current?.setAttribute('value', session.data.user.name);
      setUserName(session.data.user.name);
    }
  }, [session.data?.user?.name]);
  // Handle change of username input
  const handleChange = () => {
    if (userNameInputRef.current) {
      setUserName(userNameInputRef.current.value);
    }
  };

  const updateTownListings = useCallback(() => {
    townsService.listTowns().then(towns => {
      setCurrentPublicTowns(towns.sort((a, b) => b.currentOccupancy - a.currentOccupancy));
    });
  }, [setCurrentPublicTowns, townsService]);
  useEffect(() => {
    updateTownListings();
    const timer = setInterval(updateTownListings, 2000);
    return () => {
      clearInterval(timer);
    };
  }, [updateTownListings]);

  const handleJoin = useCallback(
    async (coveyRoomID: string) => {
      try {
        if (!userName || userName.length === 0) {
          toast({
            title: 'Unable to join town',
            description: 'Please select a username',
            status: 'error',
          });
          return;
        }
        if (!coveyRoomID || coveyRoomID.length === 0) {
          toast({
            title: 'Unable to join town',
            description: 'Please enter a town ID',
            status: 'error',
          });
          return;
        }
        const newController = new TownController({
          userName,
          townID: coveyRoomID,
          loginController,
        });
        await newController.connect();
        const videoToken = newController.providerVideoToken;
        assert(videoToken);
        await videoConnect(videoToken);
        setTownController(newController);
      } catch (err) {
        if (err instanceof Error) {
          toast({
            title: 'Unable to connect to Towns Service',
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
    },
    [userName, loginController, videoConnect, setTownController, toast],
  );

  const handleCreate = async () => {
    if (!userName || userName.length === 0) {
      toast({
        title: 'Unable to create town',
        description: 'Please select a username before creating a town',
        status: 'error',
      });
      return;
    }
    if (!newTownName || newTownName.length === 0) {
      toast({
        title: 'Unable to create town',
        description: 'Please enter a town name',
        status: 'error',
      });
      return;
    }
    try {
      const newTownInfo = await townsService.createTown({
        friendlyName: newTownName,
        isPubliclyListed: newTownIsPublic,
      });
      let privateMessage = <></>;
      if (!newTownIsPublic) {
        privateMessage = (
          <p>
            This town will NOT be publicly listed. To re-enter it, you will need to use this ID:{' '}
            {newTownInfo.townID}
          </p>
        );
      }
      toast({
        title: `Town ${newTownName} is ready to go!`,
        description: (
          <>
            {privateMessage}Please record these values in case you need to change the town:
            <br />
            Town ID: {newTownInfo.townID}
            <br />
            Town Editing Password: {newTownInfo.townUpdatePassword}
          </>
        ),
        status: 'success',
        isClosable: true,
        duration: null,
      });
      await handleJoin(newTownInfo.townID);
    } catch (err) {
      if (err instanceof Error) {
        toast({
          title: 'Unable to connect to Towns Service',
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
  };

  return (
    <>
      <form>
        <Stack>
          <Box p='4'>
            <Heading as='h2' size='lg' className='font-semibold'>
              Select a username
            </Heading>
            <FormControl>
              <FormLabel htmlFor='name' className='font-bold hidden'>
                Name
              </FormLabel>
              <Input
                autoFocus
                name='name'
                placeholder='Your name'
                ref={userNameInputRef}
                className='relative block w-full rounded border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2'
                onChange={handleChange}
              />
            </FormControl>
          </Box>
          <Box>
            <Heading p='4' as='h2' size='lg' className='font-semibold'>
              Create a New Town
            </Heading>
            <Flex p='4' className='items-center flex-wrap gap-5'>
              <FormLabel htmlFor='townName' className='w-full hidden'>
                New Town Name
              </FormLabel>
              <Box className='w-full'>
                <FormControl>
                  <Input
                    name='townName'
                    placeholder='New Town Name'
                    value={newTownName}
                    className='relative block w-full rounded border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2'
                    onChange={event => setNewTownName(event.target.value)}
                  />
                </FormControl>
              </Box>
              <Box className='flex items-center gap-3'>
                <FormLabel htmlFor='isPublic'>List Publicly</FormLabel>
                <input
                  id='isPublic'
                  name='isPublic'
                  data-testid='isPublic'
                  type='checkbox'
                  checked={newTownIsPublic}
                  className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600'
                  onChange={e => {
                    setNewTownIsPublic(e.target.checked);
                  }}
                />
              </Box>
              <Box>
                <Button
                  data-testid='newTownButton'
                  className='group relative flex justify-center rounded-md bg-blue-600 py-2 px-3 text-sm font-semibold text-white hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
                  onClick={handleCreate}>
                  Create
                </Button>
              </Box>
            </Flex>
          </Box>
          <Heading p='4' as='h2' size='lg' className='font-extrabold'>
            -or-
          </Heading>

          <Box>
            <Heading p='4' as='h2' size='lg' className='font-semibold'>
              Join an Existing Town
            </Heading>
            <Box>
              <Flex p='4' className='gap-4 items-center flex-wrap'>
                <FormLabel className='w-full hidden' htmlFor='townIDToJoin'>
                  Town ID
                </FormLabel>
                <FormControl className='w-[80%] '>
                  <Input
                    name='townIDToJoin'
                    placeholder='ID of town to join, or select from list'
                    value={townIDToJoin}
                    className='relative w-full block rounded border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2'
                    onChange={event => setTownIDToJoin(event.target.value)}
                  />
                </FormControl>
                <Button
                  className='group relative flex justify-center rounded-md bg-blue-600 py-2 px-3 text-sm font-semibold text-white hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
                  data-testid='joinTownByIDButton'
                  onClick={() => handleJoin(townIDToJoin)}>
                  Connect
                </Button>
              </Flex>
            </Box>

            <Heading p='4' as='h4' size='md'>
              Select a public town to join
            </Heading>
            <Box maxH='500px' overflowY='scroll'>
              <Table className='w-full'>
                <TableCaption placement='bottom'>Publicly Listed Towns</TableCaption>
                <Thead>
                  <Tr className='w-full flex justify-between px-3'>
                    <Th>Town Name</Th>
                    <Th>Town ID</Th>
                    <Th>Activity</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {currentPublicTowns?.map(town => (
                    <Tr key={town.townID}>
                      <Td role='cell'>{town.friendlyName}</Td>
                      <Td role='cell'>{town.townID}</Td>
                      <Td role='cell' className='flex flex-row gap-5 items-center'>
                        {town.currentOccupancy}/{town.maximumOccupancy}
                        <button
                          onClick={() => handleJoin(town.townID)}
                          type='button'
                          className='group relative flex justify-center rounded-md bg-blue-600 py-2 px-3 text-sm font-semibold text-white hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
                          disabled={town.currentOccupancy >= town.maximumOccupancy}>
                          Connect
                        </button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          </Box>
        </Stack>
      </form>
    </>
  );
}
