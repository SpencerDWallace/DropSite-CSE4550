import React from 'react';
import '../../orders.css'
import { Link } from 'react-router-dom';


const LineItem = ({ lineItem }) => {
return(
    <>
        <tr role="row">
            <td role="cell" id="product-reference">
                <Link to = {`/product?ref=${lineItem.product_id}`}>{lineItem.product_name}</Link>
            </td>
            <td role="cell">{lineItem.quantity.total}</td>
        </tr>

    </>
)
}

export default LineItem;