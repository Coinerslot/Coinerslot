import clsx from 'clsx'
import React from 'react'
import { makeStyles } from '@material-ui/core'
import { alpha } from '@material-ui/core/styles'
import { useRecoilState, useRecoilValue } from 'recoil'
import { AppBar, Avatar, Button } from '@material-ui/core'
import { ButtonGroup, Box, Toolbar, Typography } from '@material-ui/core'
import { currentHomeScreen, isAuthenticated } from '../recoil'
import bgImage from '../libs/Data/img/coinerslotHero.jpg'
import { useCustomStyles } from '../constants/styles'
import UtilButton from './UtilButton'
import { navs } from '../libs/Data'

const useStyles = makeStyles((theme) => ({
  herotext: {
    fontSize: '25%',
    fontWeight: 'bolder',
    fontFamily: 'roboto',
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
      width: '100%',
      fontSize: '20pt',
    },
  },
  minherotext: {
    marginTop: 20,
    fontSize: '25%',
    fontWeight: 'bolder',
    fontFamily: 'roboto',
    [theme.breakpoints.up('md')]: {
      width: '100%',
      Bottom: -10,
      fontSize: '25pt',
    },
  },

  NavBtnWrap: {
    height: 40,
    width: '100%',
    [theme.breakpoints.up('md')]: {
      height: 60,
      width: '100%',
    },
  },

  NavLink: {
    fontSize: '4pt',
    minWidth: '20%',
    [theme.breakpoints.up('md')]: {
      minWidth: '20%',
    },
  },
}))

export default function PrimaryNavBar() {
  const classes = useCustomStyles()
  const classex = useStyles()
  const [screen, setScreen] = useRecoilState(currentHomeScreen)
  const isLogin = useRecoilValue(isAuthenticated)
  const [active, setActive] = React.useState('Home')

  React.useEffect(() => {
    switch (screen) {
      case 'About':
        return setActive('About')
      case 'Blog':
        return setActive('Blog')
      case 'FAQ':
        return setActive('FAQ')
      case 'Support Center':
        return setActive('Support Center')
      default:
        return setActive('Home')
    }
  }, [screen])

  const SecondaryNavTitle = () => {
    return (
      <div
        style={{
          width: '100% ',
          color: '#fff',
          padding: '3% 0 1%',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
          backgroundColor: alpha('#000', 0.75),
          height: screen === 'Home' ? 300 : 120,
        }}
      >
        <Typography className={clsx(classes.slideUpToDown)} variant='h3' noWrap>
          {screen === 'Home' ? (
            <p className={classex.herotext}>
              GENERATE 50% ROI WEEKLY AND BECOME
              <br /> ONE OF OUR <br />
              AFFILIATE THROUGH REFERAL
            </p>
          ) : (
            <p className={clsx(classex.minherotext, classes.slideUpToDown)}>
              LEADING CRYPTO INVESTMENT PLATFORM!
            </p>
          )}
        </Typography>
        {screen === 'Home' && (
          <Box
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Avatar
              className={clsx(classes.perCent_Avartar, classes.zoomOut)}
              style={{ color: '#000' }}
            >
              10<span style={{ fontSize: 18, marginBottom: '10%' }}>%</span>
            </Avatar>
            <p className={classes.slideRightToLeft}>Secure Investment!</p>
            {!isLogin && (
              <div style={{ display: 'flex', gap: '20px' }}>
                <UtilButton text='LOGIN' onClick={() => setScreen('Signin')} />
                <UtilButton text='SIGNUP' onClick={() => setScreen('Signup')} />
              </div>
            )}
          </Box>
        )}
      </div>
    )
  }

  return screen === 'admin' ? null : (
    <AppBar
      color='secondary'
      position='static'
      id='navBar'
      className={classes.rootContainer}
    >
      <div
        className={classes.bgStyles}
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <SecondaryNavTitle />
      </div>
      <Toolbar>
        <ButtonGroup
          aria-label='outlined primary button group'
          className={classex.NavBtnWrap}
        >
          {navs.map((nav) => (
            <Button
              variant='contained'
              color={active === nav.name ? 'primary' : 'secondary'}
              key={nav.name}
              onClick={(event) => {
                event.preventDefault()
                setActive(nav.name)
                return setScreen(nav.name)
              }}
              className={classex.NavLink}
            >
              {nav.name}
            </Button>
          ))}
        </ButtonGroup>
      </Toolbar>
    </AppBar>
  )
}
