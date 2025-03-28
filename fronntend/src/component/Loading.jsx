import React from 'react';

function Loading() {
  return (
    <div className="flex m-5 w-screen justify-center items-center">
      <div className="w-12 h-12 border-4 border-[#684df4] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

export default Loading;
