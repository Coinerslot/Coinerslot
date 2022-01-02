import React from 'react'
import clsx from 'clsx'
import { styled } from '@material-ui/styles'
import CloseIcon from '@material-ui/icons/Close'
import { AppBar, Badge } from '@material-ui/core'
import { Dialog, DialogTitle } from '@material-ui/core'
import { Menu, DialogContent } from '@material-ui/core'
import { AccountCircle, Mail, Notifications } from '@material-ui/icons'
import { useRecoilState, useSetRecoilState } from 'recoil'
import {
  currentHomeScreen,
  isAuthenticated,
  TandC,
  userAccount,
} from '../recoil'
import { IconButton, MenuItem, Toolbar, Typography } from '@material-ui/core'
import { useCustomStyles } from '../constants/styles'
import logo from '../libs/Data/img/coinerslotLogo.jpg'
import { getAuth, signOut } from 'firebase/auth'
import { updateUser } from '../config'

export default function PrimaryNavBar() {
  const classes = useCustomStyles()
  const setTandC = useSetRecoilState(TandC)
  const [user, setUser] = useRecoilState(userAccount)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [anchorE2, setAnchorE2] = React.useState(null)
  const setScreen = useSetRecoilState(currentHomeScreen)
  const [messageCount, setMessageCount] = React.useState(0)
  const [isLogin, setIsLogin] = useRecoilState(isAuthenticated)
  const [notificationCount, setNotificationCount] = React.useState(0)
  const [renderInfo, setRenderInfo] = React.useState('msg')
  const isMenuOpen = Boolean(anchorEl)
  const openDialog = Boolean(anchorE2)

  React.useEffect(() => {
    const mrCounter = () => {
      const noticeCount = user.HaveNotifications ? 1 : 0
      setNotificationCount(noticeCount)
      const msgCount = user.HaveMessage ? 1 : 0
      setMessageCount(msgCount)
    }
    mrCounter()
    return () => {}
  }, [user.HaveNotifications, user.HaveMessage])

  const BootstrapDialog = styled(Dialog)(() => ({
    '& .MuiDialogContent-root': {
      padding: '2%',
      position: 'relative',
    },
    '& .MuiDialogActions-root': {
      padding: '1%',
    },
    '& .MuiDialog-container': {
      position: 'absolute',
      top: '-30%',
      right: `${renderInfo === 'msg' ? '100px' : '50px'}`,
      minWidth: '20%',
    },
  }))

  const handleProfileMenuOpen = (event) => {
    if (isLogin) {
      return setAnchorEl(event.currentTarget)
    }
    return setScreen('Signin')
  }
  const logOut = () => {
    const auth = getAuth()
    signOut(auth)
      .then(() => {
        setIsLogin(false)
        handleMenuClose()
        setTandC(false)
        return setScreen('Home')
      })
      .catch((error) => {
        return console.error(error)
      })
  }
  const handleMenuClose = () => {
    setAnchorEl(null)
  }
  const accountMenuId = 'primary-search-account-menu'
  const accountMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      id={accountMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {isLogin && (
        <>
          <MenuItem
            onClick={() => {
              handleMenuClose()
              setScreen('Profile')
            }}
          >
            My Account
          </MenuItem>
          <MenuItem onClick={logOut}>Log Out</MenuItem>
        </>
      )}
    </Menu>
  )

  const handleClickOpen = (event) => {
    const clicked = event.currentTarget.value
    setAnchorE2(event.currentTarget)
    setRenderInfo(clicked)
    if (renderInfo === 'msg') {
      updateUser(user.Email, { HaveMessage: false })
      setUser({ ...user, HaveMessage: false })
    } else {
      updateUser(user.Email, { HaveNotifications: false })
      setUser({ ...user, HaveNotifications: false })
    }
  }

  const messageMenuId = 'primary-search-message-menu'
  const date = new Date().toLocaleString()
  const messageMenu = (
    <BootstrapDialog
      anchorEl={anchorE2}
      onClose={() => setAnchorE2(null)}
      aria-labelledby='customized-dialog-title'
      open={openDialog}
      maxWidth={'xs'}
      style={{ top: 0 }}
    >
      <>
        <DialogTitle id='dialog-title' sx={{ m: 0, p: 2 }}>
          {renderInfo === 'msg' ? 'New Messge' : 'Notifications'}
          <IconButton
            aria-label='close'
            onClick={() => setAnchorE2(null)}
            style={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Typography>{date}</Typography>
          <Typography gutterBottom>
            {renderInfo === 'msg' ? user.Message : user.Notifications}
          </Typography>
        </DialogContent>
      </>
    </BootstrapDialog>
  )

  return (
    <AppBar
      position='fixed'
      className={classes.rootContainer}
      style={{ zIndex: 100 }}
    >
      <Toolbar
        id='back-to-top-anchor'
        style={{ justifyContent: 'space-between' }}
      >
        <div
          style={{
            width: '50%',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <img src={logo} alt='Logo' className={classes.logo} />
          <Typography
            className={clsx(classes.title, classes.slideRightToLeft)}
            variant='h6'
            noWrap
          >
            {' '}
            coinerslot
          </Typography>
        </div>
        <div style={{ marginRight: '2%' }}>
          {isLogin && (
            <React.Fragment>
              <IconButton
                aria-label={`show ${messageCount} new mails`}
                aria-controls={messageMenuId}
                value='msg'
                color='inherit'
                onClick={handleClickOpen}
              >
                <Badge badgeContent={messageCount} color='secondary'>
                  <Mail />
                </Badge>
              </IconButton>
              <IconButton
                aria-label='show 17 new notifications'
                color='inherit'
                value='notice'
                onClick={handleClickOpen}
              >
                <Badge badgeContent={notificationCount} color='secondary'>
                  <Notifications />
                </Badge>
              </IconButton>
            </React.Fragment>
          )}
          <IconButton
            edge='end'
            aria-label='account of current user'
            aria-controls={accountMenuId}
            aria-haspopup='true'
            onClick={
              isLogin ? handleProfileMenuOpen : () => setScreen('Signin')
            }
            color='inherit'
          >
            <AccountCircle />
          </IconButton>
        </div>
      </Toolbar>
      {isLogin && accountMenu}
      {messageMenu}
    </AppBar>
  )
}
