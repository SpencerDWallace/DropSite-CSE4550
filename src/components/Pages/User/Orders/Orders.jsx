import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Order from './Order/Order'
import OrderById from './OrderById/OrderById'
import OrderDetails from './OrderDetails/OrderDetails';

const Orders = ({user, getOrdersWithParams, isOrderById}) => {

    const params = window.location.search;
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    let returnLink = new URLSearchParams(params).get('return');
    if(returnLink === null)
        returnLink = '';
        
    useEffect(() => {
        if(user && user.success !== undefined){

            if(isOrderById) {
                const orderReference = new URLSearchParams(params).get('ref');
                getOrdersWithParams({"query":orderReference}).then((orders)=>{setLoading(false); if(orders.meta.pagination.total === 0) return; setOrders(orders.data); })
            }
            else
                getOrdersWithParams({"query":user.email}).then((orders)=>{setLoading(false); if(orders.meta.pagination.total === 0) return; setOrders(orders.data); })
        }
        else
        setOrders([]);
    }, [user]);

    useEffect(()=>{
    }, [orders])

    function DisplayOrders(){
        return(
            <>{
            orders.map((order) => (
                <div className="order-container" key={order.id} xs={10} sm={8} md={5} lg={4} xl={3}>
                    <Order order={order} />
                </div>
            ))}
            </>
        );
    }

    function DisplayOrderById(){
        return(
            <>
            {orders.length === 1 &&
                <div className="order-container" xs={10} sm={8} md={5} lg={4} xl={3}>
                    <OrderById order={orders[0]}/>
                </div>
            }
            </>
        );
    }

    function Loading(){
        return(
            <>
            <div className='loader-container'>
                <div className='loader'/>
            </div>
            </>
        )
    }

  return (
   <>
        {isOrderById &&
        <>  
        <div id="return">
            <Link to = {`/${returnLink}`}>Return</Link>
        </div>
        <div className='order-details'>
            {orders.length > 0 &&
            <>
                <div className='orders-container orderById'>
                <h1> Order Reference: {orders[0].customer_reference}</h1>
                    <DisplayOrderById/>
                </div>
            <OrderDetails order={orders[0]}/>

            </>
            }
        </div>

        </>
        }
        {!isOrderById && 
        <><div className='orders-container'>
            <h1>Order History</h1>
            {loading &&
                <Loading/>
            }
            { !loading && user.isLoggedIn === true && orders && orders.length > 0 &&
            <DisplayOrders/>
            }
            { !loading && user.isLoggedIn === true && orders && orders.length === 0 &&
                <h5>You haven't made any orders yet, buy something!</h5>        
            }
        </div></>
        }
    </>
  );
}

export default Orders;