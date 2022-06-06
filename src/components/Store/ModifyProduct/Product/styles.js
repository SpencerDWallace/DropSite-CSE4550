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
  modifier:{
    minWidth:'100%',
    display:"flex",
    flexDirection:'row',
    gap:'1rem',
    margin:'1rem 0',
    alignItems:'center',
    justifyContent:'space-around',
   '& input': {
      background:'#EEE',
      color:'black',
      border:'1px solid transparent',
      borderRadius:'4px',
      paddingRight:'0.2rem',
      paddingLeft:'0.2rem',
      marginRight:'1rem',
      flexBasis:'60%',
      fontWeight:'600',
    },
  '& label': {
      color:'black',
      fontWeight:'600',
      marginLeft:'2rem',
      flexBasis:'30%',
      textAlign:'start',
    },
  },
  submit:{
    alignSelf:'center',
    width:'fit-content',
    display:'inline-block',
    cursor:'pointer',
    background:'white',
    color:'#269',
    border:'1px solid #269',
    borderRadius:'4px',
    paddingRight:'1.5rem',
    paddingLeft:'1.5rem',
    boxShadow:'2px 2px 15px 2px #44444444',
    fontWeight:'600',
    '&:hover':{
      background:'#269',
      color:'white',
      boxShadow:'2px 2px 15px 2px #44444488',
    }
  },
  dynamicResponse:{
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    height:'5rem'
  },
}));
