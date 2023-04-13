import type { NextApiRequest, NextApiResponse } from 'next';
import { User } from '../../types/User';

export default async function getUser(req: NextApiRequest, res: NextApiResponse<User | null>) {
  // const session = await getSession({ req });
  // if (!session) {
  //   res.status(200).send(null);
  //   return;
  // }

  // const user: User = {
  //   email: session.user?.email,
  //   userName: session.user?.name,
  // };

  const user: User = {
    email: 'ex@ex.com',
    userName: 'test',
  };

  console.log('user', user);

  res.status(200).json(user);

  return;
}
