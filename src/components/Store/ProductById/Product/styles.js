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
    position: 'relative',
    height: 0,
    paddingTop: '40%', // 16:9
    backgroundSize:'contain'
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    bottom: '0',
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  itemLink: {
    display: 'flex',
    justifyContent: 'center',
    margin:'2rem auto',
  },
  addedFavorite:{
    color: 'red',
  },
  productName:{
    marginRight: '2rem',
  },
  description:{
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
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
