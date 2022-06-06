import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
    
function SearchItem({product}){

    const navigate = useNavigate();

    return(
    <>
    
        <div className='searchbar-item'>
            <Link className='searchbar-item-link' to={`/product/?ref=${product.id}`} onMouseDown={()=>{navigate(`/product/?ref=${product.id}`)}}>
                <img className='searchbar-item-thumbnail' src={product.image.url} alt='product'/>
                <div classname='searchbar-item-info' style={{flex:1, overflow:'hidden',}}>
                    <h5>{product.name}</h5>
                    {product.inventory.available > 0 &&      
                    <h6 style={{marginTop:'1rem'}} >In Stock</h6>
                    }
                    {product.inventory.available <= 0 &&      
                    <h6 style={{marginTop:'1rem'}} >Out of Stock</h6>
                    }
                </div>
            </Link>
        </div>
    </>
    );
}

export default SearchItem;
