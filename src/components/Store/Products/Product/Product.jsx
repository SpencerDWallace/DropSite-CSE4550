import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@material-ui/core';
import { AddShoppingCart, Favorite } from '@material-ui/icons'
import useStyles from './styles';
import '../../../item.css'


const Product = ({ product, isLoggedIn, isFavorite, onAddToCart, onAddToFavorites }) => {
    const classes = useStyles();

    let favoriteClass = ""
    if(isFavorite)
        favoriteClass = "favorite"; 

    let fav_id = product.id + "_favorite"
    let prod_id = product.id + "_add-cart"

   function internalOnAddToFavorites(productId)
    {
        document.querySelector(`#${fav_id}`).classList.toggle('favorite');
        onAddToFavorites(productId);
    }


  return (
    < Card className={classes.root}>
        <CardMedia className={classes.media} image={product.image.url} title={product.name} onClick={()=>{window.location = `/product/?productID=${product.id}`}}/>
        <CardContent className={classes.cardContent}>
            <div className={classes.itemLink} onClick={()=>{window.location = `/product/?productID=${product.id}`}}>
                <Typography className={classes.productName} variant = "h5" gutterBottom>
                    {product.name}
                </Typography>
                <Typography variant = "h5">
                    {product.price.formatted_with_symbol}
                </Typography> 
            </div>
            <Typography className={classes.description} dangerouslySetInnerHTML = {{ __html: product.description}} pvariant="body2" color="textSecondary"/>
        </CardContent>
        <CardActions disableSpacing className={classes.cardActions}>
            <IconButton aria-label="Add to Cart" onClick={() => onAddToCart(product.id, 1)}>
                <AddShoppingCart id={prod_id}/>
            </IconButton>
            {isLoggedIn &&
                <IconButton  className={classes.favoriteButton} aria-label="Add to Favorites" onClick={() => internalOnAddToFavorites(product.id)}>
                    <Favorite id={fav_id} className={favoriteClass}/>
                </IconButton>
                }
           
        </CardActions>
    </Card>
  );
}

export default Product;
