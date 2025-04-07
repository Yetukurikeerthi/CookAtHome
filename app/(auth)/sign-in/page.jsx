'use client'; // Ensures this is a client component

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // ✅ Import useRouter
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import GlobalApi from '@/app/_Utils/GlobalApi'; 
import { toast } from 'sonner';
import Image from 'next/image';
import Link from 'next/link';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Track loading state
  const router = useRouter(); // ✅ Initialize useRouter for navigation

  // Check if the user is already logged in when the component mounts
  useEffect(() => {
    const user = sessionStorage.getItem('user');
    const jwt = sessionStorage.getItem('jwt');
    if (user && jwt) {
      router.push('/'); // If already logged in, redirect to home or dashboard
    }
  }, [router]); // Run only once on component mount

  const onSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // The GlobalApi.login function sends { identifier, password }
      const resp = await GlobalApi.login(email, password);
      if (resp) {
        console.log(resp.user);
        console.log(resp.jwt);
        sessionStorage.setItem('user', JSON.stringify(resp.user));
        sessionStorage.setItem('jwt', resp.jwt);
        toast.success('Logged in successfully!');
        
        // Redirect to home page or dashboard
        router.push('/');
      }
    } catch (error) {
      console.error('Login failed:', error);
      toast.error(
        error?.response?.data?.error?.message ||
        'Failed to log in. Please check your credentials and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center my-20 p-10 bg-slate-200 border border-gray-300 rounded-lg shadow-md max-w-md mx-auto">
      <Image src="/logo.png" width={200} height={200} alt="Logo" />
      <h2 className="font-bold text-3xl mb-2">Sign In to Account</h2>
      <p className="text-gray-600 text-center mb-4">
        Enter your Email and Password to continue
      </p>

      <form onSubmit={onSignIn} className="w-full max-w-sm space-y-3">
        <Input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required
        />
        <Input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required
        />

        <Button 
          className="w-full bg-green-600 text-white p-2 rounded-md hover:bg-green-700 transition disabled:opacity-50"
          type="submit" 
          disabled={!email || !password || loading} 
        >
          {loading ? (
            <div className="flex justify-center items-center">
              <svg
                className="animate-spin h-5 w-5 mr-3 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeDasharray="31.4 31.4" />
              </svg>
              Logging in...
            </div>
          ) : (
            'Sign In'
          )}
        </Button>
      </form>

      <p className="mt-4 text-sm text-gray-600">
        Don't have an account? 
        <Link href="/create-account" className="text-blue-600 hover:underline ml-1">
          Click here to create a new account
        </Link>
      </p>
    </div>
  );
}

export default SignIn;
