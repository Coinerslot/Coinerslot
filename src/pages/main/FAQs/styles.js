import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    fontSize: 6,
    width: '100%',
    height: 'auto',
    padding: '2% 0 5%',
    alignItems: 'center',
    backgroundColor: '#cacaca',
    [theme.breakpoints.up('md')]: {
      fontSize: 14,
    },
  },
  paper: {
    margin: 'auto',
    alignSelf: 'center',
    maxWidth: '90%',
  },
  question: {
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(0),
    // minHeight: 60,
    marginBottom: 0,
    // color: '#fff',
    borderTopRightRadius: 'inherit',
    borderTopLeftRadius: 'inherit',
    color: theme.palette.secondary.main,
  },
  answer: {
    padding: theme.spacing(2),
    margin: 0,
  },
}))
