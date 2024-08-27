"use client"
import Image from 'next/image'
import React from 'react'
import { navLinks } from '@/constants'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const SideNav = () => {
  const pathname = usePathname();
  return (
    <div className='h-screen relative p-5 shadow-sm border bg-gradient-br-to from-gray-500 via-gray-700 to-gray-600'>
        <h1 className='text-xl p-2 font-medium'>Order Management System</h1>  
    

        <div className='mt-10'>
          {navLinks.map((nav)=>{
          const isActive = nav.route === pathname
          console.log(nav.label)
          return (
              <li className={` hover:text-orange-500 rounded-lg cursor-pointer list-none ${isActive ?  'text-orange-500' : 'text-gray-500'}`} key={nav.label}>

                <Link className='flex gap-4 mb-2 p-3' href={nav.route}>
                <nav.icon className='h-6 w-6'/>
                <h2 className='font-semibold text-[16px] '>{nav.label}</h2>
                </Link>
              </li>
          )})}
        </div>
        
    </div>
  )
}

export default SideNav