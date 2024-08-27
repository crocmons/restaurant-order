"use client"
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  TablePagination,
  Stack,
  Button,
} from '@mui/material'


const OrdersGrid = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('https://restaurant-order-2q76.onrender.com/orders')
        setOrders(response.data)
      } catch (err) {
        setError('Failed to fetch orders')
        console.error('Error fetching orders:', err)
      } finally {
        setLoading(false)
      }
    }
  
    fetchOrders()
  
    // Polling mechanism
    const interval = setInterval(fetchOrders, 5000) // Poll every 5 seconds
    return () => clearInterval(interval) // Cleanup on unmount
  }, [])
  
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

 

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Typography variant="h6" color="error" align="center">
        {error}
      </Typography>
    )
  }

  return (
    <TableContainer component={Paper} className="flex  flex-col justify-center items-center mx-auto">
      <Table stickyHeader aria-label="sticky table">
        <TableHead className="text-gray-400 items-center">
          <TableRow>
            <TableCell align="left" style={{ minWidth: '100px' }}>
              <h1 className="text-md font-bold">Order ID</h1>
            </TableCell>
            <TableCell align="left" style={{ minWidth: '100px' }}>
              <h1 className="text-md font-bold">Customer Name</h1>
            </TableCell>
            <TableCell align="left" style={{ minWidth: '100px' }}>
              <h1 className="text-md font-bold">Order Name</h1>
            </TableCell>
            <TableCell align="left" style={{ minWidth: '100px' }}>
              <h1 className="text-md font-bold">Quantity</h1>
            </TableCell>
            <TableCell align="left" style={{ minWidth: '100px' }}>
              <h1 className="text-md font-bold">Price</h1>
            </TableCell>
            <TableCell align="left" style={{ minWidth: '100px' }}>
              <h1 className="text-md font-bold">Order Date</h1>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((order: any) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={order.id}>
                <TableCell align="left" className="text-md text-black">{order.id}</TableCell>
                <TableCell align="left" className="text-md text-black">{order.customer_name}</TableCell>
                <TableCell align="left" className="text-md text-black">{order.category}</TableCell>
                <TableCell align="left" className="text-md text-black">{order.quantity}</TableCell>
                <TableCell align="left" className="text-md text-black">${(order.price / 100).toFixed(2)}</TableCell>
                <TableCell align="left" className="text-md text-black">{order.date_added}</TableCell>
                
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50, 100, 500]}
        component="div"
        count={orders.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  )
}

export default OrdersGrid
