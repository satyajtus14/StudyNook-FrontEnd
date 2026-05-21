import { Spinner } from '@heroui/react';
import React from 'react';

const LoadingPage = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
                <div className="flex flex-col items-center gap-2">
                <Spinner size="xl" />
                <span className="text-xs text-muted"></span>
              </div>
              </div>
    );
};

export default LoadingPage;