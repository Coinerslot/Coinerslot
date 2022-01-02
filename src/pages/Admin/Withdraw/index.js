import React from 'react'
import { Paper } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import { Avatar, List, ListItem } from '@material-ui/core'
import { ListItemAvatar, ListSubheader } from '@material-ui/core'
import { collection, getDocs, query, where } from 'firebase/firestore'

import { useStyles } from './styles'
import { db, updateUser } from '../../../config'
import Timer from '../../../libs/helpers'

export default function Index() {
  const classes = useStyles()
  const [isOpen, setIsOpen] = React.useState(false)
  const [data, setdata] = React.useState([])
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
    WithdrawDate: '',
    WithdrawAmount: 0,
    TransactionId: '',
    DepositDueDate: '',
    DepositDuration: 0,
    SelectedPercent: 10,
    TotalAmountInvest: 0,
    DepositStatus: false,
    WithdrawStatus: false,
    DepositVerified: false,
    WithdrawApproved: false,
  })

  React.useEffect(() => {
    let ignore = false
    const fetchdata = async () => {
      let alldataArr = []
      const queryALLdata = await getDocs(
        query(collection(db, 'users'), where('WithdrawStatus', '==', true))
      )
      if (queryALLdata) {
        queryALLdata.docs.forEach((doc) => alldataArr.push(doc.data()))
        !ignore && setdata(alldataArr)
      }
    }
    fetchdata()
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
            key: 'Referal Bonus',
            value: `$${user.ReferalBonus.toLocaleString()}.00`,
          },
          {
            key: 'Net Investment',
            value: `$${user.TotalAmountInvest.toLocaleString()}.00`,
          },
          {
            key: 'Withdraw Amount',
            value: `$${user.WithdrawAmount.toLocaleString()}.00`,
          },
          { key: 'Transaction Id', value: user.TransactionId },
          { key: 'Wallet Address', value: user.Wallet },
          { key: 'Deposit Date', value: user.DepositDate },
          { key: 'Registered on', value: user.CreatedAt },
        ].map((prop) => (
          <p className={classes.text} key={prop.key}>
            <span className={classes.subTitle}>{prop.key}:</span> {prop.value}
          </p>
        ))}

        {user.WithdrawStatus && (
          <div
            style={{
              display: 'flex',
              marginTop: '2%',
              justifyContent: 'space-between',
            }}
          >
            <button
              style={{
                backgroundColor: 'green',
                color: '#fff',
                cursor: 'pointer',
              }}
              onClick={() => {
                updateUser(user.Email, {
                  WithdrawApproved: true,
                  HaveNotifications: true,
                  Notifications: `Your withdrawal request have been approved`,
                })
                setTimeout(() => setIsOpen(false), 500)
              }}
            >
              Approve Withdraw
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
      {data.length <= 0 && (
        <div>
          <Typography
            color='secondary'
            variant='h4'
            style={{ textAlign: 'center', marginTop: '10%' }}
          >
            No Withdrawal Request Available now
          </Typography>
        </div>
      )}

      <List className={classes.list}>
        {data.length > 0 && (
          <ListSubheader className={classes.subheader} id='#'>
            Withdrawal Request
          </ListSubheader>
        )}
        {data
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
                    <span className={classes.subTitle}>Amount Requested:</span>{' '}
                    ${parseInt(list.WithdrawAmount).toLocaleString()}.00
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
