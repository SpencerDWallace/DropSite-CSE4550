import { makeStyles } from '@material-ui/core/styles';
// import { Autorenew } from '@material-ui/icons';

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  title: {
    margin: '3rem auto',
  },
  optionButton: {
    minWidth: '100%',
    marginBottom: '0.2rem',
    color:'white',
    background: '#f50057',
    padding:'0.6rem 0.1rem',
    border:'none',
    borderRadius:'4px',
    fontFamily:'"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight:'500',
    letterSpacing: '0.02857em',
    textTransform:'uppercase',
    fontSize:'0.9375rem',
    '&:hover': {
      background: "#d40046",
      boxShadow: "2px 2px 5px 2px #44444444",
   },
  },
  checkoutButton: {
    marginBottom: '0.2rem',
    minWidth: '150px',
    color:'white',
    background: '#3f51b5',
    padding:'0.6rem 0.1rem',
    border:'none',
    borderRadius:'4px',
    fontFamily:'"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight:'500',
    letterSpacing: '0.02857em',
    textTransform:'uppercase',
    fontSize:'0.9375rem',
    '&:hover': {
      background: "#1c2F93",
      boxShadow: "2px 2px 5px 2px #44444444",
   },
  },
  link: {
    textDecoration: 'none',
  },
  cardDetails: {
    position:'relative',
    display: 'flex',
    marginTop: '3.5rem',
    width: '100%',
    justifyContent: 'space-between',
    paddingBlockEnd:'2rem',
    alignItems:'center',
    gap:'1rem',
  },
  mainContainer:{
    background:'#FAFAFA',
    minWidth:'100%',
    margin: "0",
    padding:'24px',
    marginBottom:'3%',
    // minWidth:'min-content'
  },
  cartOptions:{
    display:'flex',
    flexDirection:'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginRight:'1rem',
    gap:'.5rem',
    minWidth:'max-content',
  },
  product: {
    flexGrow: '2',
    [theme.breakpoints.only('sm')]: {
      minWidth:'80%',
    },
  },
  subtotal:{
    textAlign: 'start',
    marginLeft:'2rem',
  },

  
}));