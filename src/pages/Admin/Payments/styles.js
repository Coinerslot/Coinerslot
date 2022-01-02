import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginBottom: theme.spacing(1),
  },
  userModel: {
    position: 'fixed',
    top: '30%',
    left: '30%',
    zIndex: 100,
    padding: '2%',
    minWidth: 260,
    borderRadius: '2%',
    backgroundColor: '#cacaca',
    [theme.breakpoints.up('md')]: {
      minWidth: 400,
    },
  },
  closeModel: {
    left: 240,
    color: 'red',
    cursor: 'pointer',
    fontWeight: 'bold',
    position: 'relative',
    [theme.breakpoints.up('md')]: {
      left: 380,
    },
  },

  list: {
    maxWidth: 900,
    margin: '0 auto',
    color: theme.palette.secondary.main,
    marginBottom: theme.spacing(2),
  },
  listItem: {
    margin: '0 auto',
    marginBottom: theme.spacing(1),
  },

  listTitle: {
    margin: 0,
    fontSize: '16pt',
    [theme.breakpoints.up('md')]: {
      fontSize: '18pt',
    },
  },

  subTitle: {
    margin: 0,
    fontSize: '8pt',
    fontWeight: 'bold',
    [theme.breakpoints.up('md')]: {
      fontSize: '12pt',
    },
  },
  text: {
    margin: '1px',
    padding: 0,
    fontSize: '8pt',
    [theme.breakpoints.up('md')]: {
      fontSize: '12pt',
    },
  },
  inputWrap: {
    width: '100%',
    margin: '0 auto',
    marginTop: '2%',
    alignItems: 'center',
    [theme.breakpoints.up('md')]: {
      width: '60%',
    },
  },
  btn: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  comment: {
    width: '100%',
    margin: '3% 2%',
  },
}))
