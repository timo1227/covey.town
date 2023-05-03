'use client';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface User {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export default function Profile() {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      // Send user to login page if not logged in
      router.push('/Login');
    },
  });
  const [userData, setUserData] = useState<User>({
    name: session?.user?.name ?? '',
    email: session?.user?.email ?? '',
    password: '',
    passwordConfirm: '',
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.name && session?.user?.email) {
      setUserData({ ...userData, name: session.user.name, email: session.user.email });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, session]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData(prevUserData => ({ ...prevUserData, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const res = await fetch(`/api/user/${userData.email}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await res.json();

    if (result.error) {
      console.log(result.error);
      setError(result.error);
    }
  };

  const handleDelete = async () => {
    // Propt user to confirm deletion
    if (!confirm('Are you sure you want to delete your account?')) {
      return;
    }
    const res = await fetch(`/api/user/${userData.email}`, {
      method: 'DELETE',
    });
    const result = await res.json();

    if (result.error) {
      console.log(result.error);
      return;
    }
    signOut();
    router.push('/Login');
  };

  return (
    <main className='flex justify-center items-center w-full h-screen'>
      {error && (
        <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative'>
          <strong className='font-bold'>Error!</strong>
          <span className='block sm:inline'> {error}</span>
          <span className='absolute top-0 bottom-0 right-0 px-4 py-3'>
            <svg
              className='fill-current h-6 w-6 text-red-500'
              role='button'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              onClick={() => setError('')}>
              <title>Close</title>
              <path
                fillRule='evenodd'
                d='M14.348 5.652a.5.5 0 010 .707L10.707 10l3.641 3.641a.5.5 0 11-.707.707L10 10.707l-3.641 3.641a.5.5 0 01-.707-.707L9.293 10 5.652 6.359a.5.5 0 01.707-.707L10 9.293l3.641-3.641a.5.5 0 01.707 0z'
                clipRule='evenodd'
              />
            </svg>
          </span>
        </div>
      )}
      <form onSubmit={handleSubmit} className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
        <div className='mb-4'>
          <label htmlFor='name' className='block text-gray-700 font-bold mb-2'>
            Name
          </label>
          <input
            id='name'
            name='name'
            type='text'
            value={userData.name}
            onChange={handleChange}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='email' className='block text-gray-700 font-bold mb-2'>
            Email
          </label>
          <input
            id='email'
            name='email'
            type='email'
            value={userData.email}
            onChange={handleChange}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='password' className='block text-gray-700 font-bold mb-2'>
            Password
          </label>
          <input
            id='password'
            name='password'
            type='password'
            onChange={handleChange}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='passwordConfirm' className='block text-gray-700 font-bold mb-2'>
            Confirm Password
          </label>
          <input
            id='passwordConfirm'
            name='passwordConfirm'
            type='password'
            onChange={handleChange}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          />
        </div>
        <div className='flex items-center justify-between'>
          <button
            type='submit'
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
            Update
          </button>
          <button
            type='button'
            onClick={handleDelete}
            className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
            Delete Account
          </button>
        </div>
      </form>
    </main>
  );
}
