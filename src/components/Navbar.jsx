import React from 'react'
import { FaRegEdit } from "react-icons/fa";


const Navbar = () => {
  return (
    <nav className='flex justify-between bg-purple-700 text-white py-2 '>
        <div className="logo  ">
            <span className='font-bold text-xl mx-9  flex gap-2'><FaRegEdit />
            iTasks</span>
        </div>
        <ul className="flex gap-8 mx-9 " >
            <li className='cursor-pointer hover:font-bold transition-all '> Home</li>
            <li className='cursor-pointer hover:font-bold transition-all '>Your Tasks</li>
            {/* <li className='cursor-pointer hover:font-bold transition-all '>Contact Us</li> */}
        </ul>
    </nav>
  )
}

export default Navbar