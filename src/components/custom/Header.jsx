import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import Logo from '@/components/custom/_logo';
import { FcGoogle } from "react-icons/fc";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios'; 
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function Header() {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user'))); 
  const [openDialog, setOpenDialog] = useState(false); 
  const [isAuthenticated, setIsAuthenticated] = useState(!!user); 

  useEffect(() => {
    console.log("User:", user);
  }, [user]);

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log("Google Login Token Response:", tokenResponse);
      getUserProfile(tokenResponse);
    },
    onError: (errorResponse) => {
      console.error("Google Login Error Response:", errorResponse);
    },
    flow: "implicit",
  });

  const getUserProfile = async (tokenInfo) => {
    if (!tokenInfo?.access_token) {
      console.error("No access token found");
      return;
    }

    try {
      const response = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo.access_token}`,
            Accept: "application/json",
          },
        }
      );

      console.log("User Profile:", response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      setUser(response.data);
      setOpenDialog(false);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const handleLogout = () => {
    googleLogout();
    localStorage.clear();
    setUser(null);
    setIsAuthenticated(false);
    window.location.reload();
  };

  return (
    <div className='header-container shadow-md flex justify-between items-center px-10'>
      <Logo />
      
      <div className='flex items-center gap-4'>
        {isAuthenticated ? (
          <>
            <a href='/'>
              <Button variant="outline" className="rounded-full bg-white text-sky-600 border-sky-400 hover:bg-sky-200">
                Home
              </Button>
            </a>
            <Popover>
              <PopoverTrigger>
                <img src={user?.picture} className='h-12 w-12 rounded-full border-2 border-sky-300' alt="User" />
              </PopoverTrigger>
              <PopoverContent className='p-4 bg-white text-sky-600'>
                <h2 className="cursor-pointer hover:text-sky-800" onClick={handleLogout}>
                  Logout
                </h2>
              </PopoverContent>
            </Popover>
          </>
        ) : (
          <Button 
            onClick={() => setOpenDialog(true)} 
            className="bg-white text-sky-600 hover:bg-sky-200 w-full max-w-xs"
          >
            Sign-In
          </Button>
        )}
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className='p-8 bg-white text-sky-600'>
          <DialogHeader>
            <DialogTitle className='text-xl font-semibold'>Sign in with Google</DialogTitle>
          </DialogHeader>
          <DialogDescription className='text-gray-700'>
            <Logo />
            <p className='mt-2'>Sign in to the App with Google Authentication securely</p>
            <Button
              onClick={login}
              className="w-full mt-5 flex gap-4 items-center bg-sky-500 text-white hover:bg-sky-400"
            >
              Sign in with Google <FcGoogle size={24} className="ml-2" />
            </Button>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Header;
