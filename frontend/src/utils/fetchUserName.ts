import { User } from '../types/User';

const fetcher = async () => {
  const res = await fetch('api/getUser');
  const data = await res.json();

  const userName: User = data.userName;

  return userName;
};

export default fetcher;
