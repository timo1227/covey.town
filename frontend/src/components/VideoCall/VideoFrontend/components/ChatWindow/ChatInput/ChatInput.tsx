import { makeStyles } from 'tss-react/mui';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import React, { useEffect, useRef, useState } from 'react';
import TextConversation from '../../../../../../classes/TextConversation';
import useTownController from '../../../../../../hooks/useTownController';
import { isMobile } from '../../../utils';
import Snackbar from '../../Snackbar/Snackbar';

const useStyles = makeStyles()(theme => ({
  chatInputContainer: {
    borderTop: '1px solid #e4e7e9',
    padding: '1em 1.2em 1em',
    position: 'relative',
    width: '20rem',
    bottom: 0,
  },
  textArea: {
    width: '100%',
    border: '0',
    resize: 'none',
    fontSize: '14px',
    fontFamily: 'Inter',
    outline: 'none',
  },
  button: {
    'padding': '0.56em',
    'minWidth': 'auto',
    '&:disabled': {
      'background': 'none',
      '& path': {
        fill: '#d8d8d8',
      },
    },
  },
  buttonContainer: {
    margin: '1em 0 0 1em',
    display: 'flex',
  },
  fileButtonContainer: {
    position: 'relative',
    marginRight: '1em',
  },
  fileButtonLoadingSpinner: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  textAreaContainer: {
    display: 'flex',
    marginTop: '0.4em',
    padding: '0.48em 0.7em',
    border: '2px solid transparent',
  },
  isTextareaFocused: {
    borderColor: theme.palette.primary.main,
    borderRadius: '4px',
  },
}));

interface ChatInputProps {
  conversation: TextConversation;
  isChatWindowOpen: boolean;
  isGlobal: boolean;
  directMessageUsername: string | null;
}

const ALLOWED_FILE_TYPES =
  'audio/*, image/*, text/*, video/*, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document .xslx, .ppt, .pdf, .key, .svg, .csv';

export default function ChatInput({
  conversation,
  isChatWindowOpen,
  isGlobal,
  directMessageUsername,
}: ChatInputProps) {
  const { classes, cx } = useStyles();
  const [messageBody, setMessageBody] = useState('');
  const [isSendingFile, setIsSendingFile] = useState(false);
  const [fileSendError, setFileSendError] = useState<string | null>(null);
  const isValidMessage = /\S/.test(messageBody);
  const textInputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isTextareaFocused, setIsTextareaFocused] = useState(false);
  const coveyTownController = useTownController();

  useEffect(() => {
    if (isTextareaFocused) {
      coveyTownController.pause();
    } else {
      coveyTownController.unPause();
    }
  }, [isTextareaFocused, coveyTownController]);
  useEffect(() => {
    if (isChatWindowOpen) {
      // When the chat window is opened, we will focus on the text input.
      // This is so the user doesn't have to click on it to begin typing a message.
      textInputRef.current?.focus();
    }
  }, [isChatWindowOpen]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessageBody(event.target.value);
  };

  const handleSendMessage = async (message: string) => {
    if (isGlobal) {
      if (isValidMessage) {
        conversation.sendGlobalMessage(message.trim());
        setMessageBody('');
      }
    } else {
      // TODO: send message to specific user
      if (isValidMessage) {
        setMessageBody('');
        const res = await fetch(
          `/api/message/${directMessageUsername}/${coveyTownController.townID}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              tokenID: coveyTownController.userID,
              message: message.trim(),
            }),
          },
        );
        const json = await res.json();
        if (json.error) {
          console.log('error sending message to specific user', json.error);
          return;
        }
      }
    }
  };

  // ensures pressing enter + shift creates a new line, so that enter on its own only sends the message:
  const handleReturnKeyPress = (event: React.KeyboardEvent) => {
    if (!isMobile && event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage(messageBody);
    }
  };

  return (
    <div className={classes.chatInputContainer}>
      <Snackbar
        open={Boolean(fileSendError)}
        headline='Error'
        message={fileSendError || ''}
        variant='error'
        handleClose={() => setFileSendError(null)}
      />
      <div
        className={cx(classes.textAreaContainer, {
          [classes.isTextareaFocused]: isTextareaFocused,
        })}>
        {/* 
        Here we add the "isTextareaFocused" class when the user is focused on the TextareaAutosize component.
        This helps to ensure a consistent appearance across all browsers. Adding padding to the TextareaAutosize
        component does not work well in Firefox. See: https://github.com/twilio/twilio-video-app-react/issues/498
        */}
        <TextareaAutosize
          minRows={1}
          maxRows={3}
          className={classes.textArea}
          aria-label='chat input'
          placeholder='Write a message...'
          onKeyPress={handleReturnKeyPress}
          onChange={handleChange}
          value={messageBody}
          data-cy-chat-input
          ref={textInputRef}
          onFocus={() => setIsTextareaFocused(true)}
          onBlur={() => setIsTextareaFocused(false)}
        />
      </div>
    </div>
  );
}
