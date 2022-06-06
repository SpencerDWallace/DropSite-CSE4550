import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    position:'relative',
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    flex:'2',
  },
  media: {
    backgroundSize:'contain',
    paddingTop: '40%', // 16:9
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
  cardActions: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: '0',
    // marginTop: "auto",
  },

  favorite:{
    color: 'red',
  },
  productPrice:{
    marginTop: 'auto',
    '&:hover': {
      cursor:'pointer'
   },
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
    color: '#4FA',
    background: '#FFF6',
    padding: '3rem',
    border: '1px solid transparent',
    minWidth:  '100%',
    letterSpacing: '0.06rem',
    position: 'relative',
    textShadow: '3px 3px 6px #757575',
    margin: '10% auto',
    textAlign: 'center',
  }
}));
