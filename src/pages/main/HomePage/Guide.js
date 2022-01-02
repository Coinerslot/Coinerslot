import React from 'react'
import clsx from 'clsx'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { makeStyles } from '@material-ui/core'
import { useCustomStyles } from '../../../constants/styles'
import ButtonBase from '@material-ui/core/ButtonBase'
import {
  currentHomeScreen,
  isAuthenticated,
  profileScreen,
} from '../../../recoil'
import icon1 from '../../../libs/Data/img/r1.png'
import icon2 from '../../../libs/Data/img/r2.png'
import icon3 from '../../../libs/Data/img/r3.png'
import icon4 from '../../../libs/Data/img/r4.png'

const data = [
  {
    title: 'Open An',
    title1: 'Account',
    link: 'Signup',
    icon: icon1,
    hline: (
      <div style={{ backgroundColor: '#004beb', width: '30%', height: 2 }} />
    ),
  },
  {
    title: 'Log In',
    title1: 'Your Account',
    link: 'Signin',
    icon: icon2,
    hline: (
      <div style={{ backgroundColor: '#004beb', width: '30%', height: 2 }} />
    ),
  },
  {
    title: 'Make A',
    title1: 'Deposit',
    link: 'Profile',
    icon: icon3,
    userScreen: 'deposit',
    hline: (
      <div style={{ backgroundColor: '#004beb', width: '30%', height: 2 }} />
    ),
  },
  {
    title: 'Withdraw',
    title1: 'Your Profit',
    link: 'Profile',
    userScreen: 'withdraw',
    icon: icon4,
  },
]

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: 'auto',
    padding: '2% 0 5%',
    alignItems: 'center',
    borderBottom: '0.5px solid #004beb',
  },
  headText: {
    fontSize: 16,
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
      fontSize: 35,
    },
  },
  headTextBorder: {
    width: '10%',
    margin: '0 auto',
    marginTop: -5,
    borderBottom: '2px solid #004beb',
  },

  avatarWrap: {
    width: '90%',
    display: 'flex',
    marginTop: '5%',
    margin: 'auto',
    paddingLeft: '5%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  circleBorder: {
    margin: 0,
    width: '80%',
    color: '#004beb',
    borderRadius: '50%',
    border: '2px solid #004beb',
    [theme.breakpoints.up('md')]: {
      width: '70%',
      minHeight: '12rem',
    },
  },

  innerCircle: {
    color: '#fff',
    width: '100%',
    height: '100%',
    minHeight: '5rem',
    borderRadius: '50%',
    position: 'relative',
    flexDirection: 'column',
    backgroundColor: '#004beb',
    [theme.breakpoints.up('md')]: {
      width: '100%',
      minHeight: '12rem',
    },

    '&:hover': {
      color: '#004beb',
      backgroundColor: '#33e',
      '& $title': {
        color: '#fff',
      },
    },
  },
  icon: {
    width: '30%',
    height: '20%',
    margin: '3% auto 10',
    [theme.breakpoints.up('md')]: {
      width: '30%',
      height: '20%',
      margin: '0 auto ',
    },
  },
  title: {
    display: 'flex',
    height: '20%',
    fontSize: '8pt',
    margin: '0 auto',
    marginTop: 10,
    textAlign: 'center',
    flexDirection: 'column',
    padding: `${theme.spacing(1)}px ${theme.spacing(1)}px ${theme.spacing(
      1
    )}px`,
    [theme.breakpoints.up('md')]: {
      width: '60%',
      margin: '0 auto',
      marginTop: '10%',
    },
  },
  bottomtext: {
    textAlign: 'center',
    fontSize: '10pt',
    padding: `${theme.spacing(1)}px ${theme.spacing(1)}px ${theme.spacing(
      1
    )}px`,
    [theme.breakpoints.up('md')]: {
      width: '60%',
      margin: '0 auto',
      marginTop: '2%',
      fontSize: '14pt',
    },
  },
}))

export default function Guide() {
  const classex = useStyles()
  const classes = useCustomStyles()
  const setScreen = useSetRecoilState(currentHomeScreen)
  const setProfile = useSetRecoilState(profileScreen)
  const isLogin = useRecoilValue(isAuthenticated)

  const handleClick = (link, userScreen) => {
    if (isLogin && link === 'Profile') {
      setScreen(link)
      return setTimeout(() => setProfile(userScreen), 100)
    } else if (link !== 'Profile') {
      setScreen(link)
    }
  }

  return (
    <section className={clsx(classex.root, classes.bgStyles)}>
      <h1 className={classex.headText}>HOW IT WORKS</h1>
      <div className={classex.headTextBorder} />

      <div className={classex.avatarWrap}>
        {data.map((item) => (
          <div
            key={item.title}
            style={{
              width: '25%',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <div className={classex.circleBorder}>
              <ButtonBase
                focusRipple
                key={item.title}
                className={classex.innerCircle}
                onClick={() => handleClick(item.link, item.userScreen)}
              >
                <img src={`${item.icon}`} alt='icon' className={classex.icon} />
                <h3 component='span' color='inherit' className={classex.title}>
                  {item.title}
                  <br />
                  {item.title1}
                </h3>
              </ButtonBase>
            </div>
            {item.hline}
          </div>
        ))}
      </div>
      <p className={classex.bottomtext}>It's simple, easy and reliable!</p>
    </section>
  )
}
