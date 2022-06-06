import React, { useState } from 'react';
import { Card, CardMedia, CardContent, Typography } from '@material-ui/core';
import useStyles from './styles';
import '../../../item.css'


const Product = ({ product, refreshProducts, isLoggedIn, changePrice}) => {
    const classes = useStyles();
    const [price, setPrice] = useState(product.price.raw);
    const [quantity, setQuantity] = useState(product.inventory.available);
    let timeoutID;

    console.log(product);

    const errorTimeout = ()=>{
        timeoutID = setTimeout(() => {
          document.getElementById('submit').classList.remove('removed')
          document.querySelector('.form-alert').classList.add('removed');
        }, 3000)
      }
      
    const updateAlert = (msg, success)=>{
        clearTimeout(timeoutID);
        document.querySelector('.form-alert').classList.remove('removed');
        document.querySelector('.form-alert').textContent = msg;
        (success) ? document.querySelector('.form-alert').style.color = "#22AACC": document.querySelector('.form-alert').style.color = "#BB4422"
    }

    const handlePriceChange = (event)=>{
        setPrice(event.target.value);
        console.log(event.target.value)
        event.preventDefault();
    }

    const handleQuantityChange = (event)=>{
        setQuantity(event.target.value);
        console.log(event.target.value)
        event.preventDefault();
    }

    const submitChanges = async () =>{
        document.getElementById('submit').classList.add('removed');
        document.querySelector('.loader').classList.remove('removed');

        const data = { id:product.id,     
            info:{
                "product": {
                    "price": price,
                    "inventory": {
                        "available":Number(quantity),
                    } 
                }
            }
        };
        console.log(data);
        const updatedProduct= await changePrice(data)//.then(()=>{window.location.reload(false)});
        if(updatedProduct.success){
            updateAlert('Product Updated!', true);
            refreshProducts();
        }
        else
        {
            updateAlert('Update failed.', false);
            errorTimeout();
        }
        document.querySelector('.loader').classList.add('removed');

    }

  return (
    < Card className={classes.root}>
        <CardMedia className={classes.media} image={product.image.url} title={product.name} />
        <CardContent className={classes.cardContent}>
            <div className={classes.itemLink}>
                <Typography variant = "h5">
                    {product.price.formatted_with_symbol}
                </Typography> 
            </div>
            <Typography className={classes.description} dangerouslySetInnerHTML = {{ __html: product.description}} pvariant="body2" color="textSecondary"/>
        </CardContent>
        <div className={classes.modifier}>
            <label>Edit Price</label>
            <input autoComplete = "off" type="text" name="price" value={price} onChange={handlePriceChange}/>
        </div>
        <div className={classes.modifier}>
            <label>Edit Quantity</label>
            <input autoComplete = "off" type="text" name="quantity" value={quantity} onChange={handleQuantityChange}/>
        </div>
        <div className={classes.dynamicResponse}>
            <div id="submit">
                <button  className={classes.submit} type="submit" onClick={submitChanges}>Save Changes</button>
            </div>
            <div className = "loader removed"></div>
            <div className = "form-alert removed"></div>
        </div>
    </Card>
  );
}

export default Product;
