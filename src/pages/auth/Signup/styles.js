import { green } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginBottom: theme.spacing(1),
  },
  sideBar: {
    width: '30%',
    padding: '1% 0',
    backgroundColor: '#f8f8f8',
    [theme.breakpoints.up('md')]: {
      width: '20%',
    },
  },
  container: {
    width: '65%',
    padding: '1%',
    margin: '0 auto',
  },
  sideBarBtn: {
    width: '95%',
    textAlign: 'start',
    margin: theme.spacing(0.2),
    fontSize: '4pt !important',
  },
  wrapper: {
    padding: ' 1% 3%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailswrap: {
    display: 'block',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      gap: 20,
      justifyContent: 'center',
    },
  },
  text: {
    textAlign: 'center',
  },
  card: {
    width: '65%',
    padding: '2%',
    maxWidth: '150ch',
    marginTop: theme.spacing(4),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '90%',
    height: 'auto',
    borderRadius: 2,
    backgroundColor: '#fff',
    margin: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      borderRadius: 5,
    },
  },
  title: {
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
      fontSize: 28,
    },
  },
  btnWrap: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  btn: {
    width: '100%',
    maxWidth: 400,
    margin: theme.spacing(1),
    [theme.breakpoints.up('md')]: {},
  },
  switcher: {
    cursor: 'pointer',
    color: theme.palette.secondary.main,
    fontWeight: 'bold',
  },
  checkProgress: {
    color: green[500],
    marginRight: 5,
  },
}))
