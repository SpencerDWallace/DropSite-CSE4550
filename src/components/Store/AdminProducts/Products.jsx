import React, {useState, useEffect} from 'react';
import { Grid } from '@material-ui/core';
import Select from 'react-select';
import Product from './Product/Product';
import useStyles from './styles';

const Products = ({ products,  user, favorites, onAddToCart, onAddToFavorites }) => {
    const classes = useStyles();

    const [adminOptions, setAdminOptions] = useState(<></>);
    const [adminView, setAdminView] = useState(false);
    const [customerView, setCustomerView] = useState(false);
    const [guestView, setGuestView] = useState(false);

    const [selectLimit, setSelectLimit] = useState([]);
    const [limit, setLimit] = useState("default");

    useEffect(() => {
        updateLimitOptions();
        setLimit('default')
    }, [products]); 

    useEffect(() => {
        checkUser();
    }, [user]);

    const checkUser = ()=>{
        if(!user.isLoggedIn)
        {
            setAdminView(false);
            setCustomerView(false);
            setGuestView(true);
            setAdminOptions(<></>);
        }
        else{
            if(user.role >= 2){
                setAdminView(true);
                setCustomerView(false);
                setGuestView(false);
                setAdminOptions(<AdminOptions/>);
            }
            else{
                setAdminView(false);
                setCustomerView(true);
                setGuestView(false);
                setAdminOptions(<></>);
            }
        }
    }

    const CustomerView = ()=>{
        setGuestView(false);
        document.getElementById('guest-view-checkbox').checked = false;
        setAdminView(customerView);
        setCustomerView((prev) => !prev);
    }

    const GuestView = ()=>{
        setCustomerView(false);
        document.getElementById('customer-view-checkbox').checked = false;
        setAdminView(guestView);
        setGuestView((prev) => !prev);
    }

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
        // console.log(limitOptions)
    }

    const handleSelectLimit = (option) =>{
        // console.log(option.value);
        setLimit(option.value);
    }

    function AdminOptions(){
        return(
                <div className={classes.adminOptions}>

                    <div className={classes.adminOption}>
                        <label className={classes.adminOptionLabel}>Customer View</label>
                        <label className="switch">
                            <input id="customer-view-checkbox" type="checkbox"/>
                            <span className="slider round" onClick={CustomerView}></span>
                        </label>
                    </div>
                    <div className={classes.adminOption}>
                        <label className={classes.adminOptionLabel}>Guest View</label>
                        <label className="switch" >
                            <input id="guest-view-checkbox"  type="checkbox"/>
                            <span className="slider round" onClick={GuestView}></span>
                        </label>
                    </div>

                </div>
        );
    }

    function ProductDisplay (){
        return(
            products.map((product) => (
                <>
                { (limit === 'default' || product.categories.filter(category => category.slug === limit).length >= 1) &&
                <Grid className={classes.productContainer} item key={product.id} xs={12} sm={6} md={6} lg={3} xl={3}>
                    <Product className={classes.product} product={product} user={user} isFavorite={(favorites.filter(favorite => favorite['id'] === product.id)).length > 0} 
                    onAddToCart={onAddToCart} onAddToFavorites={onAddToFavorites} adminView={adminView} guestView={guestView} customerView={customerView} 
                    />
                </Grid>
                }
                </>
            ))
        )
    }

    return(
        <main className={classes.content}>
            {adminOptions}
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


    // let adminView = false; const setAdminView = (newState)=>{adminView = newState};
    // let customerView = false; const setCustomerView = (newState)=>{customerView = newState};
    // let guestView = false; const setGuestView = (newState)=>{guestView = newState};

    // const setupView = ()=>{
    //     console.log("Admin view is: " + adminView + " | Customer view is: " + customerView + " | Guest view is: " + guestView);
    //     if(guestView){
    //         console.log('guest view!');
    //         document.querySelectorAll('#adminView').forEach(function(item) {item.classList.add("removed");});
    //         document.querySelectorAll('#customerView').forEach(function(item) {item.classList.add("removed");});
    //         document.querySelectorAll('#guestView').forEach(function(item) {item.classList.remove("removed");});
    //     }
    //     else if(customerView){
    //         console.log('customer view!');
    //         document.querySelectorAll('#adminView').forEach(function(item) {item.classList.add("removed");});
    //         document.querySelectorAll('#customerView').forEach(function(item) {item.classList.remove("removed");});
    //         document.querySelectorAll('#guestView').forEach(function(item) {item.classList.remove("removed");});
    //     }
    //     else if(adminView)
    //     {
    //         console.log('admin view!');
    //         document.querySelectorAll('#adminView').forEach(function(item) {item.classList.remove("removed");});
    //         document.querySelectorAll('#customerView').forEach(function(item) {item.classList.add("removed");});
    //         document.querySelectorAll('#guestView').forEach(function(item) {item.classList.add("removed");});
    //     }
    // }