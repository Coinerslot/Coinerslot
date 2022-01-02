import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    width: '100%',
    height: 'auto',
    padding: '2% 0 5%',
    alignItems: 'center',
  },

  headText: {
    fontSize: 12,
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
      fontSize: 35,
    },
  },

  headTextBorder: {
    width: '10%',
    margin: '0 auto ',
    marginTop: -7,
    marginBottom: 10,
    borderBottom: '2px solid #24B7F0',
  },

  wrapper: {
    width: '75%',
    display: 'flex',
    padding: '0 1%',
    margin: '0 auto',
    justifyContent: 'space-around',
    [theme.breakpoints.up('md')]: {
      width: '70%',
    },
  },

  image: {
    width: '30%',
    height: 'auto',
    padding: '2% 1%',
    margin: '1% 2% ',
    border: '1px solid #000',
    [theme.breakpoints.up('md')]: {
      width: 270,
      height: 270,
    },
  },

  middleParagraph: {
    margin: 0,
    fontSize: 8,
    width: '100%',
    textAlign: 'justify',
    [theme.breakpoints.up('md')]: {
      width: '100%',
      fontSize: 18,
    },
  },
  paragraph: {
    margin: 0,
    fontSize: 8,
    width: '70%',
    textAlign: 'justify',
    [theme.breakpoints.up('md')]: {
      width: '70%',
      fontSize: 18,
    },
  },
}))