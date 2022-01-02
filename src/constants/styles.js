import { makeStyles } from '@material-ui/core/styles'

export const useCustomStyles = makeStyles((theme) => ({
  rootContainer: {
    flexGrow: 1,
    maxWidth: '100%',
    margin: 0,
    padding: 0,
  },

  menuButton: {
    display: 'flex',
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  NavBtnWrap: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      margin: theme.spacing(0, '15%', 1),
      height: 70,
    },
  },
  NavLink: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      minWidth: 130,
    },
  },

  bgStyles: {
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    background: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo: {
    width: '20%',
    height: 20,
    maxHeight: '10rem',
    marginTop: '1%',
    marginRight: '3%',
    display: 'block',
    [theme.breakpoints.up('md')]: {
      height: 40,
    },
  },

  investCard: {
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    background: 'cover',
    width: '20%',
    minWidth: 270,
    minHeight: 353,
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    opacity: 0.8,
    margin: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  title: {
    justifySelf: 'start',
    display: 'block',
  },
  text: {
    padding: theme.spacing(1),
  },

  list: {
    marginBottom: theme.spacing(2),
  },
  subheader: {
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    top: 'auto',
    bottom: 0,
    maxHeight: 200,
    padding: '2%',
  },

  perCent_Avartar: {
    width: 60,
    height: 60,
    fontSize: 25,
    color: '#000',
    fontWeight: 'bold',
    border: '2px solid #fff',
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
  },

  // animations
  spinLogo: {
    animation: `$spinLogo infinite 10s linear`,
  },
  slideUpToDown: {
    animation: `$slideUpToDown 3000ms ${theme.transitions.easing.easeInOut}`,
  },

  slideDownToUp: {
    animation: `$slideDownToUp 3000ms ${theme.transitions.easing.easeInOut}`,
  },

  slideRightToLeft: {
    animation: `$slideRightToLeft 3000ms ${theme.transitions.easing.easeInOut}`,
  },
  slideLeftToRight: {
    animation: `$slideLeftToRight 3000ms ${theme.transitions.easing.easeInOut}`,
  },
  zoomOut: {
    animation: `$zoomOut 3000ms ${theme.transitions.easing.easeInOut}`,
  },
  zoomIn: {
    animation: `$zoomIn 3000ms ${theme.transitions.easing.easeInOut}`,
  },

  '@keyframes slideUpToDown': {
    '0%': {
      opacity: 0,
      transform: 'translateY(-200%)',
    },
    '100%': {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },

  '@keyframes slideDownToUp': {
    '0%': {
      opacity: 0,
      transform: 'translateY(200%)',
    },
    '100%': {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },

  '@keyframes slideRightToLeft': {
    '0%': {
      opacity: 0,
      transform: 'translateX(200%)',
    },
    '100%': {
      opacity: 1,
      transform: 'translateX(0)',
    },
  },

  '@keyframes slideLeftToRight': {
    '0%': {
      opacity: 0,
      transform: 'translateX(-200%)',
    },
    '100%': {
      opacity: 1,
      transform: 'translateX(0)',
    },
  },

  '@keyframes zoomOut': {
    '0%': {
      opacity: 0,
      width: '0%',
      height: '0%',
    },
    '100%': {
      opacity: 1,
      width: 50,
      height: 50,
    },
  },

  '@keyframes zoomIn': {
    '0%': {
      opacity: 1,
      width: 50,
      height: 50,
    },
    '100%': {
      opacity: 0,
      width: '0%',
      height: '0%',
    },
  },

  '@keyframes spinLogo': {
    '0%': {
      transform: 'rotate(0deg)',
    },
    '100%': {
      transform: 'rotate(360deg)',
    },
  },
}))
