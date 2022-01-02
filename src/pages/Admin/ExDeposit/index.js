import React from 'react'
import { Paper } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import { Avatar, List, ListItem } from '@material-ui/core'
import { ListItemAvatar, ListSubheader } from '@material-ui/core'
import { collection, getDocs, query, where } from 'firebase/firestore'

import { useStyles } from './styles'
import Timer from '../../../libs/helpers'
import { db, updateUser } from '../../../config'

export default function Index() {
  const classes = useStyles()
  const [isOpen, setIsOpen] = React.useState(false)
  const [deposits, setDeposits] = React.useState([])
  const [user, setUser] = React.useState({
    Email: '',
    Phone: '',
    Wallet: '',
    Fullname: '',
    Username: '',
    CreatedAt: '',
    Investplan: '',
    WalletType: '',
    DepositDate: '',
    ReferalBonus: 0,
    TransactionId: '',
    DepositDueDate: '',
    SelectedPercent: 10,
    TotalAmountInvest: 0,
    DepositStatus: false,
    DepositVerified: false,
  })

  React.useEffect(() => {
    let ignore = false
    const fetchDeposits = async () => {
      let allDepositsArr = []
      const queryALLDeposits = await getDocs(
        query(collection(db, 'users'), where('DepositVerified', '==', true))
      )
      if (queryALLDeposits) {
        queryALLDeposits.docs.forEach((doc) => allDepositsArr.push(doc.data()))
        !ignore && setDeposits(allDepositsArr)
      }
    }
    fetchDeposits()
    return () => (ignore = true)
  }, [])

  const ViewUser = () => {
    return (
      <div className={classes.userModel}>
        <span className={classes.closeModel} onClick={() => setIsOpen(false)}>
          X
        </span>
        {[
          { key: 'Invest Plan', value: user.Investplan },
          { key: 'Wallet Type', value: user.WalletType },
          {
            key: 'Net Investment',
            value: `$${parseInt(user.TotalAmountInvest).toLocaleString()}.00`,
          },
          { key: 'Transaction Id', value: user.TransactionId },
          { key: 'Wallet Address', value: user.Wallet },
          { key: 'Deposit Date', value: user.DepositDate },
          {
            key: 'Referal Bonus',
            value: `$${parseInt(user.ReferalBonus).toLocaleString()}.00`,
          },
          { key: 'Registered on', value: user.CreatedAt },
        ].map((prop) => (
          <p className={classes.text} key={prop.key}>
            <span className={classes.subTitle}>{prop.key}:</span> {prop.value}
          </p>
        ))}

        {!user.DepositVerified && (
          <div
            style={{
              display: 'flex',
              marginTop: '2%',
              justifyContent: 'space-between',
            }}
          >
            <button
              style={{
                color: '#fff',
                cursor: 'pointer',
                backgroundColor: 'green',
              }}
              onClick={() => {
                updateUser(user.Email, {
                  DepositVerified: true,
                })
                setTimeout(() => setIsOpen(false), 500)
              }}
            >
              Confirm Deposit
            </button>
            <button
              style={{ backgroundColor: 'tomato', cursor: 'pointer' }}
              onClick={() => setIsOpen(false)}
            >
              Marked Invalid
            </button>
          </div>
        )}
      </div>
    )
  }

  return (
    <React.Fragment>
      {isOpen && <ViewUser />}
      {deposits.length <= 0 && (
        <div>
          <Typography
            color='secondary'
            variant='h4'
            style={{ textAlign: 'center', marginTop: '10%' }}
          >
            No Expiring Deposits Available now
          </Typography>
        </div>
      )}

      <List className={classes.list}>
        {deposits.length > 0 && (
          <ListSubheader className={classes.subheader} id='#'>
            Expiring Deposits
          </ListSubheader>
        )}
        {deposits
          .sort((a, b) => new Date(a.DepositDate) - new Date(b.DepositDate))
          .map((list, index) => (
            <Paper key={list.Fullname + index}>
              <ListItem
                className={classes.listItem}
                button
                onClick={() => {
                  setUser(list)
                  setIsOpen(true)
                }}
              >
                <ListItemAvatar>
                  <Avatar />
                </ListItemAvatar>
                <div>
                  <h2 className={classes.listTitle}>{list.Fullname}</h2>
                  <p className={classes.text}>
                    <span className={classes.subTitle}>Net Investment:</span> $
                    {parseInt(list.TotalAmountInvest).toLocaleString()}.00
                  </p>
                  <p className={classes.text}>
                    <span className={classes.subTitle}>Invest Date:</span>
                    {list.DepositDate}
                  </p>
                  <Timer {...list} />
                </div>
              </ListItem>
            </Paper>
          ))
          .reverse()}
      </List>
    </React.Fragment>
  )
}
