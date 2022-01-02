import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginTop: 60,
    marginBottom: theme.spacing(1),
  },
  sideBar: {
    width: '30%',
    padding: '1% 0',
    position: 'fixed',
    backgroundColor: '#f8f8f8',
    [theme.breakpoints.up('md')]: {
      width: '20%',
    },
  },
  container: {
    flex: 1,
    width: '65%',
    padding: '1%',
    margin: '0 auto',
    marginLeft: '30%',
    [theme.breakpoints.up('md')]: {
      marginLeft: '20%',
    },
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
      justifyContent: 'space-around',
    },
  },
  title: {
    fontSize: 14,
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
      fontSize: '24pt',
    },
  },
  subTitle: {
    fontSize: 13,
    [theme.breakpoints.up('md')]: {
      fontSize: '22pt',
    },
  },
  text: {
    fontSize: '8pt',
    [theme.breakpoints.up('md')]: {
      fontSize: '12pt',
    },
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
    width: '98%',
    height: 'auto',
    borderRadius: 2,
    backgroundColor: '#fff',
    margin: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      borderRadius: 5,
    },
  },

  btn: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
}))
