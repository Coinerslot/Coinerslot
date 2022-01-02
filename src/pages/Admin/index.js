import React from 'react'
import { Button } from '@material-ui/core'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { isAuthenticated, currentHomeScreen } from '../../recoil'
import { adminScreen } from '../../recoil'
import { useStyles } from './styles'
import ExDeposit from './ExDeposit'
import Blacklist from './Blacklist'
import Payments from './Payments'
import Withdraw from './Withdraw'
import Setting from './Setting'
import Updates from './Blog'
import Users from './Users'

export default function InputAdornments() {
  const classes = useStyles()
  const setScreen = useSetRecoilState(currentHomeScreen)
  const setLogin = useSetRecoilState(isAuthenticated)
  const [render, setRender] = useRecoilState(adminScreen)
  const [active, setActive] = React.useState('all')

  React.useEffect(() => {
    setScreen('admin')
    render === 'all' && setActive('all')
  }, [render, setScreen])

  const HandleRander = () => {
    switch (render) {
      case 'blacklist':
        return <Blacklist />
      case 'pDeposit':
        return <Payments />
      case 'withdraw':
        return <Withdraw />
      case 'exDeposit':
        return <ExDeposit />
      case 'updates':
        return <Updates />
      case 'setting':
        return <Setting />
      default:
        return <Users />
    }
  }

  return (
    <section className={classes.root}>
      <div className={classes.sideBar}>
        {[
          { title: 'Registered Users', action: 'all', active: false },
          { title: 'Pending Deposits', action: 'pDeposit', active: false },
          { title: 'Withdraw Requests', action: 'withdraw', active: false },
          { title: 'Expiring Deposits', action: 'exDeposit', active: false },
          { title: 'Blogs View/Add ', action: 'updates', active: false },
          { title: 'Accounts Blacklist', action: 'blacklist', active: false },
          { title: 'Settings', action: 'setting', active: false },
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
          href='/'
          onClick={() => {
            setScreen('home')
            return setLogin(false)
          }}
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
