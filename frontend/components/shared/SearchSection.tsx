import { SearchIcon } from 'lucide-react'
import React from 'react'

const SearchSection = ({handleSearch}:any) => {
  return (
    <div className='p-10 bg-gradient-to-br from-gray-500 via-gray-700 to-gray-600 text-white flex flex-col items-center justify-center'>
        <h2 className='text-3xl font-bold'>Browse Your Menu Items</h2>
        <p>What would you like to eat today?</p>
        <div className='w-full flex justify-center'>
            <div className='flex gap-2 items-center p-2 border rounded-md bg-white my-5 w-[30%]'>
                <SearchIcon className='text-primary'/>
                <input type='text' placeholder='Search' 
                onChange={(e)=>handleSearch(e.target.value)}
                className='bg-transparent w-full outline-none text-black'/>
            </div>
        </div>
    </div>
  )
}

export default SearchSection