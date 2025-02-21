import React, { useEffect, useState } from 'react'
import './PlaceOrder.css'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'

const PlaceOrder = () => {

  const {getTotalCartAmount} = useContext(StoreContext)


  return (
    <form className='place-order'>
      <div className="place-order-left">
      <p className="title">Delivery Information</p>
      <div className="multi-fields">
        <input required name='firstName' type="text" placeholder='First Name' />
        <input required name='lastName' type="text" placeholder='Last Name' />
        </div>
        <input className='emaill' required name='email' type="email" placeholder='Email address' />
        <input className='streett' required name='street' type="text" placeholder='Street' />
        <div className="multi-fields">
        <input required name='city' type="text" placeholder='City' />
        <input required name='state'type="text" placeholder='State' />
        </div>
        <div className="multi-fields">
        <input required name='zipcode' type="text" placeholder='Zip code' />
        <input required name='country' type="text" placeholder='Country' />
        </div>
        <input className='phonee' required name='phone' type="text" placeholder='Phone' />
      </div>
      <div className="place-order-right">
      <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
          <div className="cart-total-details">
                <p>Subtotal</p>
                <p>${getTotalCartAmount()}</p>
            </div>
            <hr/>
            <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>${getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr/>
            <div className="cart-total-details">
                <b>Total</b>
                <b>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
            </div>
          </div>
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder