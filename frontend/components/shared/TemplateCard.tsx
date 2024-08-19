"use client"
import React, { useState } from 'react'
import { TEMPLATE } from './TemplateListSection'
import Image from 'next/image'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'

const TemplateCard = (item: TEMPLATE) => {

  const [customerName, setCustomerName] = useState('')
  const [orderName, setOrderName] = useState('')
  const [quantity, setQuantity] = useState(0)
  const [dateAdded, setDateAdded] = useState('')
  const [loading, setLoading] = useState(false)  
  const [error, setError] = useState<string | null>(null)

  const validateForm = () => {
    if (!customerName || !orderName || !quantity || !dateAdded) {
      setError('All fields are required.')
      return false
    }
    setError(null)
    return true
  }

  const handleClick = async () => {
    if (!validateForm()) return;

    setLoading(true)
    const orderData = {
      customer_name: customerName,
      quantity: quantity,
      category: orderName,
      date_added: dateAdded
    }

    try {
      const response = await fetch('https://restaurant-order-2q76.onrender.com/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      })

      if (response.ok) {
        console.log('Order added successfully!')
        window.location.href = '/orders'
      } else {
        console.error('Failed to add the order.')
      }
    } catch (error) {
      console.error('Error:', error)
    }finally {
      setLoading(false)  
    }
  }

  return (
    <div className='p-4 rounded-lg shadow-lg flex flex-col cursor-pointer gap-5 hover:scale-105 transition-all'>
      <Image
        src={item.icon}
        alt={item.name}
        width={350}
        height={340}
        className='object-contain'
      />
      <h2 className='font-medium text-lg'>{item.name}</h2>
      <p className='text-gray-500 line-clamp-3'>{item.desc}</p>
      
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className='bg-orange-500 cursor-pointer font-medium text-white hover:bg-blue-500 hover:text-white'>
            Order Now
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[440px]">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>
              Provide your order details below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="customer_name" className="text-right">
                Customer
              </Label>
              <Input
                id="customer_name"
                placeholder="Your Name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="order_name" className="text-right">
                Order Name
              </Label>
              <Input
                id="order_name"
                type="text"
                placeholder="Enter Order Name"
                value={orderName}
                onChange={(e) => setOrderName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantity" className="text-right">
                Quantity
              </Label>
              <Input
                id="quantity"
                type="number"
                placeholder="Enter Quantity"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date_added" className="text-right">
                Order Date
              </Label>
              <Input
                id="date_added"
                type="date"
                placeholder="Enter Order Date"
                value={dateAdded}
                onChange={(e) => setDateAdded(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
            {error && <p className="text-red-500 text-center">{error}</p>}
          <DialogFooter>
          <Button type="submit" onClick={handleClick} disabled={loading}>
              {loading ? 'Placing Order...' : 'Place Order'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default TemplateCard