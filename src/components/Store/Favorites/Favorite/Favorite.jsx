import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@material-ui/core';
import { AddShoppingCart, Favorite } from '@material-ui/icons'
import { useNavigate } from 'react-router-dom';
import useStyles from './styles';

const FavoriteItem = ({ favorite, onAddToCart, onAddToFavorites }) => {
    const classes = useStyles();
    const navigate = useNavigate();
  return (
    < Card className={classes.root}>
        <CardMedia className={classes.media} image={favorite.image.url} title={favorite.name} onClick={()=>{navigate(`/product/?ref=${favorite.id}`)}}>
            { favorite.inventory.available === 0 && <div className={classes.noQuantity}>
                <h1 className={classes.noQuantityText}>
                    Out of Stock
                </h1>
            </div>}
        </CardMedia>
        <CardContent className={classes.cardContent}>
            <Typography variant="h4">{favorite.name}</Typography>
            <Typography className={classes.productPrice} variant = "h5" onClick={()=>{navigate(`/product/?ref=${favorite.id}`)}}>
                {favorite.price.formatted_with_symbol}
            </Typography> 
        </CardContent>
        <CardActions disableSpacing className={classes.cardActions}>
            {favorite.inventory.available > 0 && 
            <IconButton aria-label="Add to Cart" onClick={() => onAddToCart(favorite.id, 1)}>
                <AddShoppingCart />
            </IconButton>
            }
            <IconButton className={classes.favorite} aria-label="Add to Favorites" onClick={() => onAddToFavorites(favorite.id)}>
                <Favorite />
            </IconButton>
        </CardActions>
    </Card>
  );
}

export default FavoriteItem;
