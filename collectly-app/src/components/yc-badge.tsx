import React from 'react';

export const YCBadge = () => {
    return (
        <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 text-sm font-medium transition-all bg-gray-100 rounded-full cursor-default hover:bg-gray-200 text-gray-900">
                <div className="flex items-center justify-center w-5 h-5 bg-orange-500 rounded-sm">
                    <span className="text-[10px] font-bold text-gray-900">Y</span>
                </div>
                <span>Backed by Y Combinator (W23)</span>
            </div>
        </div>
    );
};
