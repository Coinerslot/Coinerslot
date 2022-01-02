import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  container: {
    margin: 0,
    fontSize: 8,
    width: '100%',
    height: 'auto',
    padding: '2% 0 5%',
    alignItems: 'center',
    backgroundColor: '#cacaca',
    [theme.breakpoints.up('md')]: {
      fontSize: 14,
    },
  },
  card: {
    width: '65%',
    padding: '2%',
    maxWidth: 500,
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(4),
  },
  cardContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '90%',
    margin: theme.spacing(1),
  },
  title: {
    fontSize: 14,
    textAlign: 'center',
  },
  btn: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
}))
