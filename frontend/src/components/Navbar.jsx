import React from 'react';

const Navbar = () => {
  return (
    <nav className="backdrop-blur-sm bg-white/10 sticky top-0 z-50">
      <div className="mycontainer flex items-center justify-between px-4 py-4 h-20">
        <div className="logo font-bold text-2xl flex items-center gap-1">
          <span className="text-purple-400">&lt;</span>
          <span className="text-white">Safe</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Stack</span>
          <span className="text-purple-400">&gt;</span>
        </div>
        {/* <ul className="flex space-x-6 text-white">
          <li><a className="hover:font-semibold" href="#">About</a></li>
          <li><a className="hover:font-semibold" href="#">Home</a></li>
          <li><a className="hover:font-semibold" href="#">Contact Us</a></li>
        </ul> */}
         <button className="text-white bg-black rounded-full px-4 py-2 flex items-center gap-1 hover:bg-gray-800 transition  ">
          <lord-icon
            src="https://cdn.lordicon.com/jjxzcivr.json"
            trigger="hover"
            style={{ width: '32px', height: '32px' }}>
          </lord-icon>
          <span className='font-bold'>GitHub</span>
        </button>

      </div>
    </nav>
  );
};

export default Navbar;
