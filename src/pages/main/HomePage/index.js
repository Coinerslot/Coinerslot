import React from 'react'
import { Link } from 'react-scroll'
import Fab from '@material-ui/core/Fab'
import { Box } from '@material-ui/core'
import { useSetRecoilState } from 'recoil'
import { makeStyles } from '@material-ui/core/styles'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'

import { useCustomStyles } from '../../../constants/styles'
import { currentHomeScreen } from '../../../recoil'
import Investment from './Investment'
import Testmony from './Testmony'
import About from './About'
import Guide from './Guide'
import News from './News'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    flexGrow: 1,
    margin: '0 3',
    [theme.breakpoints.up('md')]: {
      width: '100%',
    },
  },
  fab: {
    position: 'fixed',
    zIndex: theme.spacing(100),
    bottom: theme.spacing(5),
    right: theme.spacing(3),
  },
}))

export default function Index() {
  const classex = useCustomStyles()
  const classes = useStyles()
  const [offset, setOffset] = React.useState(false)
  const setScreen = useSetRecoilState(currentHomeScreen)

  React.useEffect(() => {
    setScreen('Home')
    window.onscroll = () => {
      if (window.pageYOffset >= 500) {
        return setOffset(true)
      } else if (window.pageYOffset <= 500) {
        return setOffset(false)
      }
    }
  }, [setScreen])
  return (
    <Box className={classex.rootContainer}>
      <About />
      <Investment />
      <Testmony />
      <Guide />
      <News />
      {offset && (
        <Link
          activeClass='active'
          to='navBar'
          spy={true}
          smooth={true}
          offset={0}
          duration={500}
          className={classes.fab}
        >
          <Fab
            color='secondary'
            aria-label='add'
            className={classes.fab}
            disableHysteresis={false}
          >
            <KeyboardArrowUpIcon />
          </Fab>
        </Link>
      )}
    </Box>
  )
}
