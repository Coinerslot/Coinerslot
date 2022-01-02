import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    fontSize: 8,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#cacaca',
    [theme.breakpoints.up('md')]: {
      fontSize: 14,
    },
  },
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    margin: '5%',
    [theme.breakpoints.up('md')]: {
      margin: '2%',
    },
  },
  list: {
    maxWidth: 900,
    margin: '0 auto',
    color: theme.palette.secondary.main,
    marginBottom: theme.spacing(2),
  },
  subheader: {
    color: theme.palette.secondary.main,
    backgroundColor: theme.palette.background.paper,
  },
  commentWrap: {
    position: 'fixed',
    bottom: '12%',
    right: '7%',
    zIndex: 100,
    margin: '5%',
    [theme.breakpoints.up('md')]: {
      margin: '2%',
    },
  },
  comment: {
    width: '100%',
    margin: '3% 2%',
  },
  fab: {
    position: 'fixed',
    bottom: '5%',
    right: '1%',
    zIndex: 100,
    margin: '5%',
    [theme.breakpoints.up('md')]: {
      margin: '2%',
      right: '5%',
    },
  },
}))
