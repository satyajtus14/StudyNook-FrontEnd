'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@heroui/react';

const ErrorPage = ({ error, reset }) => {

    useEffect(() => {
        if (error) {
            console.error(error);
        }
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-olive-800 px-4">
            <div className="max-w-lg text-center">

                <h1 className="text-7xl font-bold text-red-500">
                    Oops!
                </h1>

                <h2 className="mt-4 text-3xl font-semibold text-white">
                    Something went wrong
                </h2>

                <p className="mt-4 text-gray-400">
                    An unexpected error occurred while loading this page.
                </p>

                <div className="mt-8 flex justify-center gap-4">

                    <Button
                        onPress={() => reset()}
                        variant="danger"
                        className="px-6 py-3 text-white rounded-xl transition"
                    >
                        Try Again
                    </Button>

                    <Link
                        href="/"
                        variant="primary"
                        className="px-4 py-2 bg-blue-600 text-white rounded-xl transition"
                    >
                        Go Home
                    </Link>

                </div>
            </div>
        </div>
    );
};

export default ErrorPage;