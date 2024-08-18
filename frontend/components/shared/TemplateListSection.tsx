import {OrderData} from '@/constants'
import React, { useEffect, useState } from 'react'
import TemplateCard from './TemplateCard';

export interface TEMPLATE{
    name: string;
    desc: string;
    category: string;
    icon: string;
    
}


const TemplateListSection = ({searchInput}:any) => {

    const [templateList, setTemplateList] = useState(OrderData)

    useEffect(()=>{
        if(searchInput){
            const filterData = OrderData.filter(item=>item.name.toLowerCase().includes(searchInput.toLowerCase()))
            setTemplateList(filterData)
        }else{
            setTemplateList(OrderData)
        }
    },[searchInput])
  return (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-10'>
        {templateList.map((item:TEMPLATE, index)=>(
            <TemplateCard  {...item} key={index}/>
        ))}
    </div>
  )
}

export default TemplateListSection