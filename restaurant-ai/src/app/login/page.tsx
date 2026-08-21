"use client";
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login('Test User');
    router.push('/');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-card border rounded-2xl p-8 shadow-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">Login to RestaurantAI</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full border bg-background rounded-lg p-2.5"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full border bg-background rounded-lg p-2.5"
            />
          </div>
          <button type="submit" className="w-full bg-primary text-primary-foreground font-bold rounded-lg p-2.5 mt-2">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
