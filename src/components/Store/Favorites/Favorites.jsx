import React from 'react';
import { Grid } from '@material-ui/core'
import FavoriteItem from './Favorite/Favorite';
import useStyles from './styles';

const Favorites = ({ favorites, onAddToCart, onAddToFavorites }) => {
    const classes = useStyles();
    console.log(favorites);
    return(
        <>
    <h1 className={classes.title}>Favorites</h1>
    <main className={classes.content}>
        <div/>
        <Grid container justifyContent ="space-evenly" spacing={4}>
            {favorites.map((favorite) => (
                <Grid item key={favorite.id} xs={10} sm={6} md={5} lg={4} xl={3}>
                    <FavoriteItem favorite={favorite} onAddToCart={onAddToCart} onAddToFavorites={onAddToFavorites} />
                </Grid>
            ))}
        </Grid>
    </main></>
    )
}

export default Favorites;