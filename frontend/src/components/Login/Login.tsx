import React from 'react';
import PreJoinScreens from '../VideoCall/VideoFrontend/components/PreJoinScreens/PreJoinScreens';

export default function Login(): JSX.Element {
  const hadnleButtonClicked = () => {
    console.log('button clicked');
  };

  return (
    <>
      <PreJoinScreens onConnectButtonClick={hadnleButtonClicked} />
    </>
  );
}
