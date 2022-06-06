import React from 'react';
import { Typography, Button, Card, CardContent, CardMedia, IconButton } from '@material-ui/core';
import { Favorite } from '@material-ui/icons'
import useStyles from './styles';
import { useNavigate } from 'react-router-dom';

const CartItem = ({ item, user, isFavorite, onUpdateCartQty, onRemoveFromCart, onAddToFavorites, maxQuantity }) => {
    const classes = useStyles();
    const navigate = useNavigate();
    console.log(item);
    let favoriteClass = ""
    if(isFavorite)
        favoriteClass = "favorite"; 
    
    let fav_id = item.product_id + "_favorite"
    let form_alert_id = item.product_id + "_form-alert"
    console.log(maxQuantity)
    function internalOnAddToFavorites(productId)
    {
        document.querySelector(`#${fav_id}`).classList.toggle('favorite');
        onAddToFavorites(productId);
    }

    let timeoutID;

    const messageTimeout = ()=>{
        timeoutID = setTimeout(() => {
            document.querySelector(`#${form_alert_id}`).classList.add('hidden');
        }, 3000)
      }

    const AlertUser = () =>{
        clearTimeout(timeoutID);
        document.querySelector(`#${form_alert_id}`).style.display = 'block'
        document.querySelector(`#${form_alert_id}`).innerHTML = 'Maximum quantity added'
        document.querySelector(`#${form_alert_id}`).classList.remove('hidden');
        document.querySelector(`#${form_alert_id}`).style.color = 'maroon';
        messageTimeout();
    }

  return (
    <Card className={classes.itemContainer}>
        <CardMedia image={item.image.url} alt={item.name} className={classes.media} onClick={()=>{navigate(`/product/?ref=${item.product_id}`)}}/>
        <CardContent className={classes.cardContent}>
            <Typography  variant="h4"> {item.name}</Typography>
            <Typography className={classes.productPrice} variant="h5" onClick={()=>{navigate(`/product/?ref=${item.product_id}`)}}> {item.line_total.formatted_with_symbol} </Typography>    
        </CardContent>
        <div className={classes.cartActions}>
            <div className={classes.buttons}>
                <Button type="button" size="small" onClick={() => onUpdateCartQty(item.id, item.quantity - 1)}>-</Button>
                <Typography className={classes.itemQuantity}>  {item.quantity}</Typography>
                <Button type="button" size="small" onClick={() => { if(item.quantity + 1 > maxQuantity) {AlertUser(); return;} onUpdateCartQty(item.id, item.quantity + 1) }}>+</Button>    
            </div>
                <Button  className={classes.removeButton} variant="contained" type="button" color="secondary" onClick={() => onRemoveFromCart(item.id)}>Remove</Button> 
                    {user.isLoggedIn &&
                    <div className={classes.favoriteButton}>  
                        <IconButton aria-label="Add to Favorites" onClick={() => internalOnAddToFavorites(item.product_id)}>
                            <Favorite id={fav_id} className={favoriteClass}/>
                        </IconButton>
                    </div>
                    }
        </div> 
        <div className="form-alert hidden" id={form_alert_id}/>
            
    </Card>
  )
}  

export default CartItem;
