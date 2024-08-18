"use client"
import React, { useState } from 'react'
import SearchSection from '@/components/shared/SearchSection'
import TemplateListSection from '@/components/shared/TemplateListSection'

const Dashboard = () => {
  const [userSearchInput, setUserSearchInput] = useState<string>()
  return (
    <div className=''>
      {/* search section */}
      <SearchSection handleSearch={(value:string)=>setUserSearchInput(value)}/>

      {/* Template list section */}
      <TemplateListSection searchInput={userSearchInput}/>
    </div>
  )
}

export default Dashboard