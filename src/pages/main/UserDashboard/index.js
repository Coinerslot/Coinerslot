import React from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { Button } from '@material-ui/core'
import { getAuth, signOut } from 'firebase/auth'
import { profileScreen, TandC } from '../../../recoil'
import { isAuthenticated, currentHomeScreen } from '../../../recoil'

import { useStyles } from './styles'
import Dashboard from './dashboard'
import Details from './details'
import EditProfile from './editProfile'
import Deposit from './deposit'
import Withdraw from './withdraw'

export default function InputAdornments() {
  const classes = useStyles()
  const setTanC = useSetRecoilState(TandC)
  const setScreen = useSetRecoilState(currentHomeScreen)
  const setLogin = useSetRecoilState(isAuthenticated)
  const [render, setRender] = useRecoilState(profileScreen)
  const [active, setActive] = React.useState('dashboard')

  React.useEffect(() => {
    switch (render) {
      case 'details':
        return setActive('details')
      case 'deposit':
        return setActive('deposit')
      case 'withdraw':
        return setActive('withdraw')
      case 'edit':
        return setActive('edit')
      default:
        return setActive('dashboard')
    }
  }, [render])

  const HandleRander = () => {
    switch (render) {
      case 'details':
        return <Details />
      case 'deposit':
        return <Deposit />
      case 'withdraw':
        return <Withdraw />
      case 'edit':
        return <EditProfile />
      default:
        return <Dashboard />
    }
  }

  const handleLogOut = () => {
    const auth = getAuth()
    signOut(auth)
      .then(() => {
        setLogin(false)
        setScreen('Home')
        setTanC(false)
        return
      })
      .catch((error) => {
        console.error(error.message)
        return
      })
  }

  return (
    <section className={classes.root}>
      <div className={classes.sideBar}>
        {[
          { title: 'Dashboard', action: 'dashboard', active: false },
          { title: 'View Profile', action: 'details', active: false },
          { title: 'Deposit Fund', action: 'deposit', active: false },
          { title: 'Withdraw Fund', action: 'withdraw', active: false },
          { title: 'Edit Profile', action: 'edit', active: false },
        ].map((list) => (
          <Button
            key={list.title}
            size='medium'
            color={active === list.action ? 'primary' : 'secondary'}
            variant='contained'
            className={classes.sideBarBtn}
            onClick={() => {
              setRender(list.action)
              setActive(list.action)
            }}
          >
            {list.title}
          </Button>
        ))}
        <Button
          size='medium'
          color='secondary'
          variant='contained'
          className={classes.sideBarBtn}
          onClick={handleLogOut}
        >
          Log Out
        </Button>
      </div>
      <div className={classes.container}>
        <HandleRander />
      </div>
    </section>
  )
}
