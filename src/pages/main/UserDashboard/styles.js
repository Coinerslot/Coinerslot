import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: '#333',
    marginBottom: theme.spacing(0),
  },
  sideBar: {
    width: '30%',
    padding: '1% 0',
    minHeight: '70vh',
    backgroundColor: '#333',
    [theme.breakpoints.up('md')]: {
      width: '20%',
    },
  },
  container: {
    width: '65%',
    padding: '0.5%',
    minHeight: '70vh',
    margin: '0 auto',
  },

  sideBarBtn: {
    width: '95%',
    fontSize: '4pt',
    textAlign: 'start',
    margin: theme.spacing(0.2),
  },

  wrapper: {
    color: '#fff',
    padding: ' 1% 0%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333',
  },

  detailswrap: {
    maxWidth: 500,
    width: '100%',
    padding: '2% 0%',
    margin: '0 auto',
    display: 'block',
  },

  depositWrap: {
    display: 'block',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      gap: 10,
      fontSize: '24pt',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  },

  barcode: {
    width: '100%',
    maxWidth: 500,
    height: 300,
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
  textWrap: {
    gap: '10%',
    display: 'flex',
    height: 25,
    fontSize: '8pt',
    padding: '0 2%',
    margin: '2% 0',
    justifyContent: 'space-between',
    backgroundColor: ' #333',
    [theme.breakpoints.up('md')]: {
      fontSize: '12pt',
    },
  },
  text: {
    margin: 0,
    color: '#fff',
    fontSize: '8pt',
    fontWeight: 'bolder',
    [theme.breakpoints.up('md')]: {
      fontSize: '12pt',
    },
  },
  smtext: {
    margin: 0,
    fontSize: '4pt',
    textAlign: 'center',
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
    width: '95%',
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
