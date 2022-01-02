import { makeStyles } from '@material-ui/core/styles'
import { green } from '@material-ui/core/colors'

export const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    fontSize: 8,
    width: '100%',
    height: 'auto',
    padding: '2% 0 5%',
    alignItems: 'center',
    [theme.breakpoints.up('md')]: {
      fontSize: 14,
    },
  },
  heading: {
    textAlign: 'center',
  },
  text: {
    textAlign: 'justify',
    maxWidth: '80%',
    alignSelf: 'center',
    margin: 'auto',
  },
  wrapper: {
    display: 'flex',
    position: 'relative',
    marginBottom: theme.spacing(5),
    width: '80%',
    margin: '2% auto',
    justifyContent: 'start',
  },
  checkProgress: {
    color: green[500],
    position: 'absolute',
    top: 3,
    left: 2,
    zIndex: 1,
  },
  buttonSuccess: {
    color: green[500],
    '&:hover': {
      color: green[700],
    },
  },
  btn: {
    fontSize: 8,
    [theme.breakpoints.up('md')]: {
      fontSize: 14,
    },
  },
}))
