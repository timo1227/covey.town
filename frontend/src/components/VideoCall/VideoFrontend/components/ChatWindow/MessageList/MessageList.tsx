import React, { useEffect, useState } from 'react';
import MessageInfo from './MessageInfo/MessageInfo';
import MessageListScrollContainer from './MessageListScrollContainer/MessageListScrollContainer';
import TextMessage from './TextMessage/TextMessage';
import useVideoContext from '../../../hooks/useVideoContext/useVideoContext';
import { usePlayers } from '../../../../../../classes/TownController';
import { ChatMessage } from '../../../../../../types/CoveyTownSocket';
import useTownController from '../../../../../../hooks/useTownController';

interface MessageListProps {
  messages: ChatMessage[];
  isGlobal: boolean;
  directMessageUsername?: string | null;
}

interface DirectMessage {
  userName: string;
  tokenID: string;
  message: string;
  timestamp: string;
}

const getFormattedTime = (message?: ChatMessage) =>
  message?.dateCreated
    .toLocaleTimeString('en-us', { hour: 'numeric', minute: 'numeric' })
    .toLowerCase();

export default function MessageList({
  messages,
  isGlobal,
  directMessageUsername,
}: MessageListProps) {
  const { room } = useVideoContext();
  const localParticipant = room!.localParticipant;
  const [directMessages, setDirectMessages] = useState<DirectMessage[]>([]);
  const coveyTownController = useTownController();
  const players = usePlayers();

  useEffect(() => {
    if (isGlobal || !directMessageUsername) {
      return;
    }
    const getMessages = async () => {
      const townID = coveyTownController.townID;
      const userID = coveyTownController.userID;
      const res = await fetch(`/api/message/${directMessageUsername}/${townID}/${userID}`);
      const data = await res.json();
      if (!data.error) {
        setDirectMessages(data.dmMessages);
      }
    };
    // Call getMEssages periodically
    const interval = setInterval(() => {
      getMessages();
    }, 5000);
  }, [directMessageUsername, coveyTownController.townID, isGlobal, coveyTownController.userID]);

  return (
    <MessageListScrollContainer messages={messages}>
      {isGlobal &&
        messages.map((message, idx) => {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          const time = getFormattedTime(message)!;
          const previousTime = getFormattedTime(messages[idx - 1]);

          // Display the MessageInfo component when the author or formatted timestamp differs from the previous message
          const shouldDisplayMessageInfo =
            time !== previousTime || message.author !== messages[idx - 1]?.author;

          const isLocalParticipant = localParticipant.identity === message.author;

          const profile = players.find(p => p.id == message.author);

          return (
            <React.Fragment key={message.sid}>
              {shouldDisplayMessageInfo && (
                <MessageInfo
                  author={profile?.userName || message.author}
                  isLocalParticipant={isLocalParticipant}
                  dateCreated={time}
                />
              )}
              <TextMessage body={message.body} isLocalParticipant={isLocalParticipant} />
            </React.Fragment>
          );
        })}
      {!isGlobal &&
        directMessages &&
        directMessages.map((message, idx) => {
          return (
            <React.Fragment key={idx}>
              <MessageInfo
                author={message.userName}
                isLocalParticipant={message.userName === coveyTownController.userName}
                dateCreated={message.timestamp}
              />
              <TextMessage
                body={message.message}
                isLocalParticipant={message.userName === coveyTownController.userName}
              />
            </React.Fragment>
          );
        })}
    </MessageListScrollContainer>
  );
}
