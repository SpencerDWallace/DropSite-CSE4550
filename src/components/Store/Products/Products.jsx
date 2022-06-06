import React, {useState, useEffect} from 'react';
import { Grid } from '@material-ui/core';
import Select from 'react-select';
import Product from './Product/Product';
import useStyles from './styles';

const Products = ({ products,  user, favorites, onAddToCart, onAddToFavorites }) => {
    const classes = useStyles();
    const [selectLimit, setSelectLimit] = useState([]);
    const [limit, setLimit] = useState(0);

    useEffect(() => {
        updateLimitOptions();
        setLimit('default')
    }, [products]); 

    //found the paths for the category slugs used for the sort function
    //console.log(products[0].categories[0].slug); //display the category slug for the keyboards
    //console.log(products[1].categories[0].slug); //display the category slug for the mice

    const updateLimitOptions = ()=>{
        let limitOptions = [];
        const defaultData = { 'value': 'default', "label": 'All'};
        limitOptions.push(defaultData);
        for(let i = 0; i < products.length; i++) //(let i = 0; i < products.length; i++) produces duplicates in the select dropdown menu
        {
            //console.log(products[i]);
            const data = { 'value': products[i].categories[0].slug, "label": products[i].categories[0].name};

            let notDupilicate = true;
            for(let j = 0; j < limitOptions.length; j++)
            {
                if(limitOptions[j].value === data.value)
                {
                    notDupilicate = false;
                    break;
                }
            }
            if(notDupilicate)
                limitOptions.push(data);
            //console.log(data);
        }
        setSelectLimit(limitOptions);
        //console.log(limitOptions)
    }

    const handleSelectLimit = (option) =>{
        // console.log(option.value);
        setLimit(option.value);
    }

    function ProductDisplay (){
        return(
            products.map((product) => (
                <>
                { (limit === 'default' || product.categories.filter(category => category.slug === limit).length >= 1) &&
                <Grid className={classes.productContainer} item key={product.id} xs={12} sm={6} md={6} lg={3} xl={3}>
                    <Product className={classes.product} product={product} user={user} isFavorite={(favorites.filter(favorite => favorite['id'] === product.id)).length > 0} 
                    onAddToCart={onAddToCart} onAddToFavorites={onAddToFavorites}
                    />
                </Grid>
                }
                </>
            ))
        )
    }

    return(
        <main className={classes.content}>
            {selectLimit.length > 0 &&
            <div className={classes.filter}>
                <span>Filter By</span>
                <Select defaultValue="" className={classes.select} id="category-filter" options={selectLimit} onChange={handleSelectLimit}/>  
            </div>
            }
            <div className={classes.toolbar} />
            <Grid container flexGrow = '1' justifyContent ="space-evenly" spacing={4}>
                <ProductDisplay/>
            </Grid>
        </main>
    )
}

export default Products;

