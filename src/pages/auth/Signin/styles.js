import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing(4),
  },
  card: {
    marginTop: theme.spacing(4),
    width: '65%',
    padding: '2%',
    maxWidth: '150ch',
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '100%',
    margin: theme.spacing(1),
  },
  title: {
    fontSize: 14,
    textAlign: 'center',
  },
  btnWrap: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },

  btn: {
    width: '90%',
    maxWidth: 400,
    margin: theme.spacing(1),
    [theme.breakpoints.up('md')]: {},
  },
  forgotPassword: {
    color: theme.palette.secondary.main,
    borderBottom: '1px solid',
    cursor: 'pointer',
  },
  switcher: {
    cursor: 'pointer',
    color: theme.palette.secondary.main,
    fontWeight: 'bold',
  },
}))
