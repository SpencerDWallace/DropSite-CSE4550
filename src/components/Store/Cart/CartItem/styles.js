import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  itemContainer:{
    position:'relative',
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    minWidth:'min-content',
    flex:'1 0 auto',

  },
  media: {
    paddingTop: '40%',
    backgroundSize:'contain',
    '&:hover': {
      cursor:'pointer'
   },
  },
  cardContent: {
    display: 'flex',
    flexDirection:'column',
    justifyContent: 'space-between',
    flexGrow: '2',
    gap: '2rem',
  },
  cartActions: {
    display:'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem 0',
    flexWrap:'wrap',
    // marginTop: "auto",
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
    flex:'1',

  },
  addedFavorite:{
    color: 'red',
  },
  favoriteButton:{
    flex:'1',
    padding:'0',
  },
  removeButton:{
    alignSelf:'center',
    margin: '0',
    marginRight: '1rem',
    marginLeft: '1rem',
  },
  itemQuantity:{
    margin: '0',
  },
  productPrice:{
    marginTop: 'auto',
    textAlign:'center',
    '&:hover': {
      cursor:'pointer'
   },
  }

}));