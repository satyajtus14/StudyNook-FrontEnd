"use client";

import { authClient } from "@/lib/auth-client";
  import { toast } from 'react-toastify';
import {
  Button,
  Card,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  Separator,
  TextField,
} from "@heroui/react";
import Link from "next/link";
import { redirect } from "next/navigation";

import React from "react";
import { FcGoogle } from "react-icons/fc";
// import { FcGoogle } from "react-icons/fc";

const RegisterClientPage = () => {
const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries());
        //    console.log(user);
       
       //import the auth client
      const { data, error } = await authClient.signUp.email({
        email:user.email, 
        password :user.password, 
        name :user.name,
        image: user.image 

        
        // callbackURL: "/dashboard" // A URL to redirect to after the user verifies their email (optional)
    });
   
    if(data)
        {
        
          toast.success("Signup successful! Please login your account.", "Signup successful");
          redirect("/login");
        }
        if(error) {
            console.error("Signup error:", error);
            toast.error("Signup failed. Please try again.", "Signup failed");
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
            Create Account
          </h1>

          <p className="text-slate-500 dark:text-slate-400 mt-2">
            Join StudyNook and explore the world
          </p>
        </div>

        <Form onSubmit={handleSubmit} className="flex flex-col gap-5">

        {/* Name */}
          <TextField
            isRequired
            name="name"
            type="text"
            validate={(value) => {
              if (value.length < 2) {
                return "Name must be at least 2 characters";
              }
              return null;
            }}
          >
            <Label className="mb-1 font-medium">Name</Label>
            <Input
              placeholder="John Doe"
              className="h-12"
            />
            <FieldError />
          </TextField>



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
          
        {/* Image URL */}
          <TextField
            name="image"
            type="text"
            validate={(value) => {
              if (!value.startsWith("http")) {
                return "Please enter a valid image URL";
              }
              return null;
            }}
          >
            <Label className="mb-1 font-medium">Image URL</Label>
            <Input
              placeholder="https://example.com/image.jpg"
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
              Must contain 6+ characters, 1 uppercase letter, 1 lowercase letter, and 1 number.
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
              Register
            </Button>

          </div>
        </Form>

        <p className="text-center text-sm text-slate-600 mt-3">
          Already have an account?{" "}
          <Link href="/login">
          <span className="text-cyan-600 font-semibold cursor-pointer hover:underline">
            Login
          </span>
          </Link>
        </p>
        <div>
          <div className="flex justify-center items-center gap-3">
            <Separator />
             <div className="whitespace-nowrap font-semibold">Or</div>
             <Separator />  
          </div>
          <Button onClick={handleGoogleSignIn}
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

export default RegisterClientPage;