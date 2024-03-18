import React from 'react'
import Logo from '../../public/Logo.png'
import Profile from './Profile'
import { Link } from 'react-router-dom'

function NavBar() {

    return (
        <nav class="bg-gray-100 fixed w-full z-20 top-0 start-0 border-b">
            <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="" class="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src={Logo} alt="logo" className='w-[130px]' />

                </a>
                <Link to={'/'}>
                    <a className='text-gray-700'>Home</a>
                </Link>
                
                <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <Profile />
                    {/* <button type="button" class="text-white font-bold  bg-blue-600 hover:bg-blue-700  px-5 py-2 rounded-md">Sign in</button> */}

                </div>

            </div>
        </nav>

    )
}

export default NavBar