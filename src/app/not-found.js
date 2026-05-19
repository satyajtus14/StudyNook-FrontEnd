import { Button } from '@heroui/react';
import Link from 'next/link';
import React from 'react';

const NotFound = () => {
    return (
        <div className='h-[80vh] flex justify-center items-center flex-col space-y-5 bg-olive-600'>
            <h2 className='font-bold text-5xl text-white'>This page is not Found</h2>

            <Link href={"/"}>
            <Button variant='primary'> Back to Home</Button>
            </Link>
        </div>
    );
};

export default NotFound;