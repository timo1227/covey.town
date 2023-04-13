import React from 'react';
import Avatar from '@mui/material/Avatar';
import Person from '@mui/icons-material/Person';
import { StateContextType } from '../../../../state';

export function getInitials(name: string) {
  return name
    .split(' ')
    .map(text => text[0])
    .join('')
    .toUpperCase();
}

export default function UserAvatar({ user }: { user: StateContextType['user'] }) {
  const displayName = user?.displayName;
  const photoURL = user?.photoURL;

  return photoURL ? (
    <Avatar src={photoURL} />
  ) : (
    <Avatar>{displayName ? getInitials(displayName) : <Person />}</Avatar>
  );
}
