import { render, fireEvent, screen } from '@testing-library/react';
import Profile from './Profile';
import { SessionProvider } from 'next-auth/react';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

describe('Profile component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the component with initial values', () => {
    const mockSession = {
      expires: '1234567890',
      user: { name: 'John Doe', email: 'john.doe@example.com' },
    };
    const mockUseSession = jest.fn(() => ({ data: mockSession, status: 'authenticated' }));
    jest.mock('next-auth/react', () => ({ useSession: mockUseSession, signOut: jest.fn() }));

    render(
      <SessionProvider session={mockSession as any}>
        <Profile />
      </SessionProvider>,
    );

    expect(screen.getByText(/edit profile/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/name/i)).toHaveValue(mockSession.user.name);
    expect(screen.getByLabelText(/email/i)).toHaveValue(mockSession.user.email);
    expect(screen.getByLabelText(/new password/i)).toHaveValue('');
    expect(screen.getByLabelText(/confirm password/i)).toHaveValue('');
    expect(screen.getByRole('button', { name: /update/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument();
  });

  test('updates user data when form is submitted', async () => {
    const mockSession = {
      expires: '1234567890',
      user: { name: 'John Doe', email: 'john.doe@example.com' },
    };
    const mockUseSession = jest.fn(() => ({ data: mockSession, status: 'authenticated' }));
    const mockFetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ Success: 'User updated' }),
      }),
    );
    jest.mock('next-auth/react', () => ({ useSession: mockUseSession }));
    (global.fetch as any) = mockFetch;

    render(
      <SessionProvider session={mockSession as any}>
        <Profile />
      </SessionProvider>,
    );

    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Jane Doe' } });
    fireEvent.submit(screen.getByTestId('profile-form'));

    expect(mockFetch).toHaveBeenCalledWith('/api/user/john.doe@example.com', {
      method: 'PUT',
      body: JSON.stringify({
        name: 'Jane Doe',
        email: 'john.doe@example.com',
        password: '',
        passwordConfirm: '',
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(await screen.findByText(/user updated/i)).toBeInTheDocument();
  });

  test('deletes user account when delete button is clicked and confirmed', async () => {
    const mockSession = {
      expires: '1234567890',
      user: { name: 'John Doe', email: 'john.doe@example.com' },
    };
    const mockUseSession = jest.fn(() => ({ data: mockSession, status: 'authenticated' }));
    const mockFetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ Success: 'User account deleted' }),
      }),
    );
    const mockConfirm = jest.fn(() => true);
    jest.mock('next-auth/react', () => ({ useSession: mockUseSession }));
    jest.spyOn(window, 'confirm').mockImplementation(mockConfirm);
    (global.fetch as any) = mockFetch;

    render(
      <SessionProvider session={mockSession as any}>
        <Profile />
      </SessionProvider>,
    );

    fireEvent.click(screen.getByRole('button', { name: /delete/i }));

    expect(mockConfirm).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith('/api/user/john.doe@example.com', { method: 'DELETE' });
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });
});
