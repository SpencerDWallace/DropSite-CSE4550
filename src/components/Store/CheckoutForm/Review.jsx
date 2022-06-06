import React from 'react';
import { Typography, List, ListItem, ListItemText } from '@material-ui/core';

const Review = ({ checkoutToken, total, subtotal, shipping, tax }) => {
  return ( 
    <>
            <Typography variant="h6" gutterBottom>Order summary</Typography>
            <List disablePadding>
                {checkoutToken.live.line_items.map((product) => (
                    <ListItem style={{padding: '10px 0'}} key={product.name}>
                        <ListItemText primary={product.name} secondary={`Quantity: ${product.quantity}`}/>
                        <Typography variant="body2">{product.line_total.formatted_with_symbol}</Typography>
                    </ListItem>
                ))}
                <listItem style={{padding: '10px 0'}}>
                    <ListItemText primary="Subtotal" />
                        <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
                            {subtotal}
                    </Typography>
                    <ListItemText primary="Shipping" />
                    <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
                        {shipping}
                    </Typography>
                    <ListItemText primary="Tax" />
                    <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
                        {tax}
                    </Typography>
                    <ListItemText primary="Total" style={{marginTop:'2rem'}} />
                    <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
                        {total}
                    </Typography>
                </listItem>
            </List>
      
    </>
  )
}

export default Review;
