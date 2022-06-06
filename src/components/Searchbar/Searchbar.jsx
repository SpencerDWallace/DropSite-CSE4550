import React, { useState, useEffect } from 'react';
import SearchItem from './SearchItem';

function Searchbar({products}){

    const [userQuery, setUserQuery] = useState("");
    const [searchItems, setSearchItems] = useState(<></>);
    const [isActive, setIsActive] = useState(false);
    const [matchingProducts, setMatchingProducts] = useState([]);

    useEffect(()=>{
        setSearchItems(<SearchProducts/>)
    },[isActive])

    useEffect(()=>{
        CheckSearchItems();
    },[userQuery])

    useEffect(()=>{
        setSearchItems(<SearchProducts/>)
    },[matchingProducts])

    const handleUserQuery = (event)=>{
        setUserQuery(event.target.value);
        event.preventDefault();
    }

    const containsAll = (ar1, ar2) => {
        ar2.every(ar2Item => ar1.includes(ar2Item))
    }
                
    const sameMembers = (ar1, ar2) => {
        containsAll(ar1, ar2) && containsAll(ar2, ar1);
    }

    const CheckSearchItems = ()=>{
        const matching = products.filter(product => (product.categories[0].slug.toLowerCase().includes(userQuery.toLowerCase()) || product.name.toLowerCase().includes(userQuery.toLowerCase())) );
        if(!sameMembers(matching, matchingProducts))
            setMatchingProducts(matching);
    }

    function SearchProducts()
    {
        return(
            <>
                {isActive &&
                matchingProducts.map((product) => (
                    <>
                    {userQuery !== "" &&
                    <SearchItem product={product}/>
                    }
                    </>
                ))
                }
            </>
        )
    }

    const searchbarFocused = ()=>{
        setIsActive(true);
    }

    const searchbarNotFocused = ()=>{
        setIsActive(false);
    }

    return(
    <>
        <div className = "searchbar-container" tabIndex={0} >
            <div onFocus={searchbarFocused} style={{minWidth:'80%', maxWidth:'80%'}}>
            <input class="searchbar" type="text" name="userQuery" value={userQuery} onChange={handleUserQuery}   onBlur={searchbarNotFocused} placeholder="Search Products.."/>
            {searchItems}
            </div>
        </div>
    </>
    );
}

export default Searchbar;
