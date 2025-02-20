"use client"
import React, { useEffect } from 'react';
import Image from 'next/image';  
import { LayoutGrid, Search, ShoppingBag } from 'lucide-react'; 
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import GlobalApi from '../_Utils/GlobalApi';
function Header(){
useEffect(()=>{
  
  getCategory();
},[])

  const getCategory=()=>{GlobalApi.getCategory().then(resp=>{
    console.log("CategoryList Resp:",resp.data.data);
  })

};

  return (
    <div className='p-5 shadow-sm'>
      <div className='flex items-center justify-between p-4'>
        {/* Left Section - Logo, Category, Search */}
        <div className='flex items-center gap-8'>
          <Image
            src='/logo.png'    
            alt='Logo'         
            width={170}        
            height={120}       
          />

          {/* Category & Dropdown Menu beside each other */}
          <div className='flex items-center gap-4'> {/* Added flex container */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className='flex gap-2 items-center border rounded-full p-2 px-10 bg-slate-200 cursor-pointer'>
                  <LayoutGrid className='h-5 w-5' /> Category {/* Moved inside the button */}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuLabel>Browse Category</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Search Bar */}
          <div className='md:flex gap-3 items-center border rounded-full p-2 px-5 hidden'>
            <Search />
            <input 
              type="text" 
              placeholder='Search'
              className='outline-none bg-transparent'/>
          </div>
        </div>

        {/* Right Section - Shopping Bag & Login Button */}
        <div className='flex items-center gap-5'>
          <div className='flex items-center gap-2 text-lg cursor-pointer'>
            <ShoppingBag className='h-6 w-6' />
            <span>0</span>
          </div>
          <Button>Login</Button>
        </div>
      </div>
    </div>
  );
}
export default Header;
