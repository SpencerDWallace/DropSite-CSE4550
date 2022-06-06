import React from 'react';
import '../orders.css'


const OrderDetails = ({ order }) => {
return(
    <>
            <div className='more-details details'>
                <div className='billing-details details'>
                    <h1>Billing Details</h1>
                    <div className='labeled-info'>
                        <label>Payment Status: </label>
                        <h5>{order.status_payment}</h5>
                    </div>
                    <h5>{order.shipping.name}</h5>
                    <h5>{order.shipping.street}</h5>
                    <h5>{order.shipping.town_city} {order.shipping.county_state} {order.shipping.postal_zip_code}</h5>
                    <h5>{order.shipping.country}</h5>
                </div>
                <div className='ship-details details'>
                    <h1>Shipping Details</h1>
                    <div className='labeled-info'>
                        <label>Fulfillment Status:</label>
                        <h5>{order.status_fulfillment.replace(/_/g, ' ')}</h5>
                    </div>
                    <h5>{order.shipping.name}</h5>
                    <h5>{order.shipping.street}</h5>
                    <h5>{order.shipping.town_city} {order.shipping.county_state} {order.shipping.postal_zip_code}</h5>
                    <h5>{order.shipping.country}</h5>
                </div>
            </div>
    </>
)
}

export default OrderDetails;