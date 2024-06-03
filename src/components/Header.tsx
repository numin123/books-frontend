'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material'
import api from '../services/api';

const Header = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    router.push('/');
    window.location.reload();
  };

  useEffect(() => {
    // Check if localStorage is available (client-side)
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    }
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await api.post('/auth/login', { email, password });

      if (!response.data.token) {
        throw new Error('Invalid email or password');
      }

      localStorage.setItem('token', response.data.token);
      setIsLoggedIn(true);
      setShowModal(false);
      router.push('/');
      window.location.reload();
    } catch (error) {
      console.error('Login failed:', error);
      setError('Invalid email or password');
    }
  };

  return (
    <header className="bg-gray-800 text-white py-4 px-8 flex justify-between items-center">
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link href="/">
              Home
            </Link>
          </li>
          <li>
            <Link href="/books/new">
              New Book
            </Link>
          </li>
        </ul>
      </nav>
      <nav>
        <ul className="flex space-x-4">
          {!isLoggedIn && (
            <>
              <li>
                <button onClick={() => setShowModal(true)}>Login</button>
              </li>
              <li>
                <Link href="/signup">
                  Sign Up
                </Link>
              </li>
            </>
          )}
          {isLoggedIn && (
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
      <Dialog open={showModal} onClose={() => setShowModal(false)}>
        <DialogTitle>Sign in to your account</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="dense"
              id="password"
              label="Password"
              type="password"
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowModal(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>Sign in</Button>
        </DialogActions>
      </Dialog>
    </header>
  );
};

export default Header;
