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
  const [success, setSuccess] = useState<string | null>(null);

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
    const res = await fetch(`/api/user/${session?.user?.email}`, {
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
    setSuccess(result.Success);
    // Wait 2 seconds before redirecting to login page
    setTimeout(() => {
      signOut();
      router.push('/Login');
    }, 2000);
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
    <main className='flex flex-col items-center w-full h-screen justify-center'>
      <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
        Edit Profile
      </h2>
      {error && (
        <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 pr-16 rounded relative'>
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
      {success && (
        <div className='bg-green-100 border border-green-400 text-green-700 px-4 py-3 pr-16 rounded relative'>
          <strong className='font-bold'>Success</strong>
          <span className='block sm:inline'> {success}</span>
          <span className='absolute top-0 bottom-0 right-0 px-4 py-3'>
            <svg
              className='fill-current h-6 w-6 text-green-500'
              role='button'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              onClick={() => setSuccess('')}>
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
      <form
        onSubmit={handleSubmit}
        className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 min-w-[35%]'
        id='profile-form'
        data-testid='profile-form'>
        <div className='mb-5 lg:mb-10'>
          <label htmlFor='name' className='block text-gray-700 font-bold mb-2'>
            User Name
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
        <div className='mb-5 lg:mb-10'>
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
        <div className='relative'>
          <div className='absolute inset-0 flex items-center'>
            <div className='w-full border-t border-gray-300' />
          </div>
          <div className='relative flex justify-center text-sm'>
            <span className='px-2 bg-white text-gray-500'>Change Password</span>
          </div>
        </div>
        <div className='mb-5 lg:mb-10'>
          <label htmlFor='password' className='block text-gray-700 font-bold mb-2'>
            New Password
          </label>
          <input
            id='password'
            name='password'
            type='password'
            autoComplete='new-password'
            onChange={handleChange}
            placeholder='Leave blank to keep the same'
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          />
        </div>
        <div className='mb-5 lg:mb-10'>
          <label htmlFor='passwordConfirm' className='block text-gray-700 font-bold mb-2'>
            Confirm Password
          </label>
          <input
            id='passwordConfirm'
            name='passwordConfirm'
            type='password'
            autoComplete='new-password'
            onChange={handleChange}
            placeholder='Leave blank to keep the same'
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          />
        </div>
        <div className='flex gap-5 items-center justify-between'>
          <div className='flex gap-5 items-center min-w-[50%]'>
            <button
              type='submit'
              className='group relative rounded-sm border-2 border-indigo-400 bg-white py-2 px-3 text-sm font-semibold min-w-[50%] text-indigo-500 hover:bg-indigo-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'>
              Cancel
            </button>
            <button
              type='submit'
              name='update'
              className='group relative rounded-sm bg-indigo-600 py-2 px-3 text-sm font-semibold min-w-[50%] text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
              Update
            </button>
          </div>
          <button
            type='button'
            name='delete'
            onClick={handleDelete}
            className='group relative rounded-sm bg-white py-2 px-3 text-sm font-semibold text-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600'>
            Delete Account
          </button>
        </div>
      </form>
    </main>
  );
}
