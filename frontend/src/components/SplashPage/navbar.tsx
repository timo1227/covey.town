import React from 'react';
import { NavLink } from 'react-router-dom';
import { CustomLinkProps, HasJoinedTown } from './types';

export default function NavBar({ hasJoinedTown: hasJoinedTown }: HasJoinedTown) {
  function CustomLink({ to, children, path, className, ...props }: CustomLinkProps) {
    return (
      <li className={path == to ? 'active' : ''}>
        <NavLink className={`font-bold ${className}`} to={to} {...props}>
          {children}
        </NavLink>
      </li>
    );
  }
  return (
    <nav
      className={
        hasJoinedTown
          ? 'hidden'
          : 'sticky top-0 h-20 flex items-center w-full text-l px-10 justify-between bg-white border border-b-gray-300 z-50'
      }>
      <ul className='flex flex-nowrap justify-start gap-10 font-bold'>
        <h1 className='text-2xl font-bold'>Covey</h1>
      </ul>
      <ul className='flex justify-end gap-10 items-center px-10'>
        <CustomLink className='text-xl' to='/Home' path={location.pathname}>
          Home
        </CustomLink>
        <CustomLink className='text-xl' to='/Town' path={location.pathname}>
          Town
        </CustomLink>
        <button className='rounded-xl bg-gray-300 text-indigo-600 py-1 px-5 text-center font-bold shadow-2xl hover:bg-slate-400 hover:text-white'>
          <CustomLink to='./Login' path={location.pathname}>
            Log In
          </CustomLink>
        </button>
        <button className=' flex rounded-xl bg-blue-600 text-white py-1 px-5 text-center font-bold items-center shadow-2xl hover:bg-slate-400 hover:text-black'>
          <CustomLink to='./SignUp' path={location.pathname}>
            Sign Up
          </CustomLink>
        </button>
      </ul>
    </nav>
  );
}
