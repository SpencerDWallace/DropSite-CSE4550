import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  title: {
    margin: '3rem 1rem',
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
    marginBottom:'3%',
  },
  root: {
    flexGrow: 1,
  },
  product: {
    flexGrow: '2',
  },
  productContainer: {
    [theme.breakpoints.down('sm')]: {
      minWidth: '90vw',
   },
  },

}));
