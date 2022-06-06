import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import Product from './Product/Product';
import useStyles from './styles';




const Products = ({ commerce, products, user, favorites, onAddToCart, onAddToFavorites }) => {
    const classes = useStyles();
    const [product, setProduct] = useState({});
    const [productDisplay, setProductDisplay] = useState(<></>);
    const [title, setTitle] = useState(<></>);

    useEffect(() => {
        const params = window.location.search;
        const paramID = new URLSearchParams(params).get('ref');
        fetchProduct(paramID);
    }, [products, favorites]);
    
    if (!product) { // checking for empty url here.
        return null;
    }

    const fetchProduct = async (paramID) => {
        try{
            const filterProducts = new Promise((resolve, reject) => {
                const data = products.filter(products => products['id'] === paramID);
                (data.length > 0) ? resolve(data) : (products.length > 0) ? reject('Item Not Found') : reject('');
            });

            await filterProducts.then( (data)=>{
            setProduct(data[0]);
            setProductDisplay(<ProductDisplay product={data[0]}/>)
            setTitle(<h1 className={classes.title}>{data[0].name}</h1>)
        })

        }
        catch (error) {
            setTitle(<h1 className={classes.title}>{error}</h1>)
            console.error(error)
        }
    }

    function ProductDisplay ({product}){
        return(
                <Grid className={classes.productContainer} item key={product.id} xs={10} sm={8} md={5} lg={4} xl={3}>
                    <Product className={classes.product} product={product} user={user} isFavorite={(favorites.filter(favorite => favorite['id'] === product.id)).length > 0} onAddToCart={onAddToCart} onAddToFavorites={onAddToFavorites} />
                </Grid>
        )
    }

    return(
    <>
        {title}
        <main className={classes.content}>
            <div className={classes.toolbar} />
            <Grid container flexGrow = '1' justifyContent ="space-evenly" spacing={4}>
                {productDisplay}
            </Grid>
        </main>
    </>
    )
}

export default Products;