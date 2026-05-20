"use client";
import { authClient } from '@/lib/auth-client';
import { Button, Card, Description, FieldError, Form, Input, Label, Separator, TextField } from '@heroui/react';
import { error } from 'better-auth/api';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-toastify';

const LoginClientPage = () => {
  
        const handleLogin = async (e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const user = Object.fromEntries(formData.entries());
            //    console.log(user);
           
           //import the auth client
          const { data, error } = await authClient.signIn.email({
            email:user.email, 
            password :user.password, 
         
            // callbackURL: "/dashboard" // A URL to redirect to after the user verifies their email (optional)
        });
       
        if(data)
            {
             redirect("/")
            }
            if(error) {
                toast.error("Invalid email or password.", "Login failed");
                console.error("Login error:", error);
            }
    
       
            }
      
            const handleGoogleSignIn = async () => {
                   const data = await authClient.signIn.social({
                    provider: "google",
                  });
                  console.log(data, "Google sign-in");
                };

    return (
       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-white to-cyan-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4">
      
      <Card className="w-full max-w-md shadow-2xl rounded-3xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-8">
        
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-slate-800 dark:text-white">
            Login Your Account
          </h1>

        </div>

        <Form onSubmit={handleLogin} className="flex flex-col gap-5">

        {/* Email */}
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
              ) {
                return "Please enter a valid email address";
              }

              return null;
            }}
          >
            <Label className="mb-1 font-medium">Email</Label>

            <Input
              placeholder="john@example.com"
              className="h-12"
            />

            <FieldError />
          </TextField>  
          

          {/* PASSWORD */}
          <TextField
            isRequired
            minLength={8}
            name="password"
            type="password"
            validate={(value) => {
              if (value.length < 8) {
                return "Password must be at least 8 characters";
              }

              if (!/[A-Z]/.test(value)) {
                return "Password must contain at least one uppercase letter";
              }

              if (!/[0-9]/.test(value)) {
                return "Password must contain at least one number";
              }

              return null;
            }}
          >
            <Label className="mb-1 font-medium">Password</Label>

            <Input
              placeholder="Enter your password"
              className="h-12"
            />

            <Description className="text-xs text-slate-500">
              Must contain 6+ characters, 1 uppercase, 1 lowercase and 1 number
            </Description>

            <FieldError />
          </TextField>

          {/* BUTTONS */}
          <div className="flex gap-3 pt-2">
            <Button
              type="submit"
              color="primary"
              className="w-full h-11 text-base font-semibold rounded-xl"
            >
              Login
            </Button>
        
          </div>
              <p className='mx-auto'>Don’t have an account? <Link href="/register" className="text-blue-500 hover:underline">Register</Link></p>
        </Form>
           <div>
                   <div className="flex justify-center items-center gap-3">
                     <Separator />
                      <div className="whitespace-nowrap font-semibold">Or</div>
                      <Separator />  
                   </div>
                   <Button
                   onClick={handleGoogleSignIn}
                     variant="outline"
                     color="secondary"
                     className="w-full h-11 mt-4 text-base border-2 font-semibold rounded-xl"
                   >
                   <FcGoogle /> Continue with Google
                   </Button>
                 </div>

      </Card>
    </div>
    );
};

export default LoginClientPage;