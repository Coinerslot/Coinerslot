import React from 'react'
import { AppBar, Toolbar } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import logo from '../libs/Data/img/coinerslotLogo2.jpg'
import { useRecoilState } from 'recoil'
import { currentHomeScreen } from '../recoil'
import { useCustomStyles } from '../constants/styles'
import UtilButton from './UtilButton'

const useStyles = makeStyles((theme) => ({
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '0 5%',
    maxHeight: 90,
  },

  logoWrap: {
    gap: '2%',
    display: 'flex',
    marginTop: '1%',
    alignItems: 'center',
  },
  supportWrap: {
    gap: '1%',
    display: 'flex',
    minWidth: '50%',
    alignItems: 'center',
  },

  footerlogo: {
    width: '40%',
    height: 60,
    margin: 0,
    display: 'block',
    [theme.breakpoints.up('md')]: {
      width: '40%',
      height: 50,
    },
  },
  headtext: {
    fontSize: 8,
    margin: 0,
    paddingBottom: '1%',
    borderBottom: '1px solid #fff',
  },
  text: {
    fontSize: 6,
    [theme.breakpoints.up('md')]: {
      fontSize: 5,
    },
  },
}))
export default function BottomAppBar() {
  const classes = useStyles()
  const root = useCustomStyles()
  const [screen, setScreen] = useRecoilState(currentHomeScreen)

  return screen === 'admin' || screen === 'Profile' ? null : (
    <AppBar
      position='static'
      className={root.rootContainer}
      style={{ zIndex: 100 }}
    >
      <Toolbar className={classes.footer}>
        <div className={classes.logoWrap}>
          <img src={logo} alt='Logo' className={classes.footerlogo} />
          <p className={classes.text}>
            21 Mansell Street,
            <br />
            London, England
          </p>
        </div>

        <div className={classes.supportWrap}>
          <div>
            <h6 className={classes.headtext}>Have Any Questions?</h6>
            <p className={classes.text}>
              Contact us our Live chat support <br />
              It,s available on a regular basis 24/7.
            </p>
          </div>
          <UtilButton
            text='Support Area'
            onClick={() => setScreen('Support Center')}
          />
        </div>
      </Toolbar>
    </AppBar>
  )
}
