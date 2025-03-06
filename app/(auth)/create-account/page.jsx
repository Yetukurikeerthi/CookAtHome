'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import GlobalApi from '@/app/_Utils/GlobalApi'; 
import { toast } from 'sonner';

function CreateAccount() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onCreateAccount =  () => {
     GlobalApi.registration(username, email, password).then (resp=>{
      console.log(resp.data.user)
     console.log(resp.data.user)
     })
    }


  return (
    <div className="flex flex-col items-center p-10 bg-slate-100 border border-gray-300 rounded-lg shadow-md max-w-md mx-auto">
      <Image src="/logo.png" width={200} height={200} alt="Logo" />
      <h2 className="font-bold text-3xl mb-2">Create an Account</h2>
      <p className="text-gray-600 text-center mb-4">
        Enter your Email and Password to continue
      </p>

      <form onSubmit={onCreateAccount} className="w-full max-w-sm space-y-3">
        <Input 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
        <Input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <Input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />

        <Button 
          className="w-full bg-green-600 text-white p-2 rounded-md hover:bg-blue-700 transition"
          type="submit" 
          disabled={!username || !email || !password} // Disable button if any input is empty
        >
          Create Account
        </Button>
      </form>

      <p className="mt-4 text-sm text-gray-600">
        Already have an account? 
        <Link href="/signin" className="text-blue-600 hover:underline ml-1">
          Click here to Sign In
        </Link>
      </p>
    </div>
  );
}

export default CreateAccount;
