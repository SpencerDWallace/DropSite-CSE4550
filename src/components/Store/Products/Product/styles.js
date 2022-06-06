import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    maxWidth: 'same-as-height',
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  media: {
    position:'relative',
    height: 0,
    paddingTop: '40%',
    backgroundSize:'contain',
    '&:hover': {
      cursor:'pointer'
   },
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    bottom: '0',
    minHeight:'5rem',
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  itemLink: {
    display: 'flex',
    justifyContent: 'space-between',
    '&:hover': {
      cursor:'pointer'
   },
  },
  addedFavorite:{
    color: 'red',
  },
  productName:{
    marginRight: '2rem',
    maxHeight: '2rem',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',

  },
  description:{
    display: 'flex',
    alignSelf: 'center',
    justifyContent:'center',
    maxWidth: '90%',
    '& > *':{
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    textAlign: 'center',
    margin: '0 auto',
    }
  },
  customerActions:{
    margin:'0 1rem',
  },
  spacer:{
    margin:'0 1rem',
    opacity:'0',
  },
    modifyButton:{
    alignSelf:'center',
    width:'fit-content',
    cursor:'pointer',
    background:'#335533',
    color:'white',
    border:'1px solid transparent',
    borderRadius:'4px',
    paddingRight:'1.5rem',
    paddingLeft:'1.5rem',
    margin:'1rem auto',
    boxShadow:'2px 2px 15px 2px #44444444',
    fontWeight:'600',
    '&:hover':{
      background:'#229977',
      color:'white',
      fontWeight:'600',
      boxShadow:'2px 2px 15px 2px #44444488',
    }
  },
  noQuantity:{
    position: 'absolute',
    top: '0',
    textAlign: 'center',
    width: '100%',
    background: '#CCCCCCAA',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyIontent: 'center',
  },
  noQuantityText:{
    fontWeight: '700',
    color: 'rgb(85, 168, 201)',
    background: '#FFF6',
    padding: '3rem',
    border: '1px solid transparent',
    minWidth:  '100%',
    letterSpacing: '0.06rem',
    position: 'relative',
    textShadow: '2px 2px 3px #a6a6a6',
    margin: '10% auto',
    textAlign: 'center',
  }
}));
