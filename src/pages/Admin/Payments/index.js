import React from 'react'
import { Paper } from '@material-ui/core'
import { Avatar, List, ListItem } from '@material-ui/core'
import { ListItemAvatar, ListSubheader, Typography } from '@material-ui/core'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db, updateUser } from '../../../config'
import { useStyles } from './styles'

export default function Index() {
  const classes = useStyles()
  const [isOpen, setIsOpen] = React.useState(false)
  const [refreshData, setRefreshData] = React.useState(false)
  const [currentUsers, setCurrentUsers] = React.useState([])
  const [deposits, setDeposits] = React.useState([])
  const [invalidDeposits, setInvalidDeposits] = React.useState([])
  const [user, setUser] = React.useState({
    Email: '',
    Phone: '',
    Wallet: '',
    Fullname: '',
    Username: '',
    CreatedAt: '',
    Investplan: '',
    WalletType: '',
    AmountInvest: 0,
    DepositDate: '',
    ReferalBonus: 0,
    TransactionId: '',
    DepositDueDate: '',
    DepositDuration: 0,
    SelectedPercent: 10,
    TotalAmountInvest: 0,
    DepositStatus: false,
    InvalidDeposit: false,
    DepositVerified: false,
  })

  React.useEffect(() => {
    let ignore = false
    const fetchDeposits = async () => {
      let pendingArr = []
      let allDepositsArr = []
      let invalidDepositsArr = []
      const queryPending = await getDocs(
        query(
          collection(db, 'users'),
          where('DepositStatus', '==', true),
          where('DepositVerified', '==', false)
        )
      )
      if (queryPending) {
        queryPending.docs.forEach((doc) => pendingArr.push(doc.data()))
        !ignore && setCurrentUsers(pendingArr)
      }
      const queryALLDeposits = await getDocs(
        query(collection(db, 'users'), where('DepositVerified', '==', true))
      )
      if (queryALLDeposits) {
        queryALLDeposits.docs.forEach((doc) => allDepositsArr.push(doc.data()))
        !ignore && setDeposits(allDepositsArr)
      }
      const queryInvalidDeposits = await getDocs(
        query(collection(db, 'users'), where('InvalidDeposit', '==', true))
      )
      if (queryInvalidDeposits) {
        queryInvalidDeposits.docs.forEach((doc) =>
          invalidDepositsArr.push(doc.data())
        )
        !ignore && setInvalidDeposits(invalidDepositsArr)
      }
    }
    fetchDeposits()

    if (refreshData) {
      fetchDeposits()
      setTimeout(() => {
        setRefreshData(false)
      }, 500)
    }
    return () => (ignore = true)
  }, [setCurrentUsers, refreshData])

  const confirmPayment = () => {
    let dueDate = new Date()
    dueDate.setDate(dueDate.getDate() + user.DepositDuration)
    const netInvest =
      parseInt(user.TotalAmountInvest) + parseInt(user.AmountInvest)
    updateUser(user.Email, {
      DepositVerified: true,
      DepositDueDate: dueDate,
      TotalAmountInvest: netInvest,
      Notifications:
        'Your deposit have been approved, check your dashboard to view the due date @ the top level.',
    })
    setRefreshData(true)
    setTimeout(() => setIsOpen(false), 500)
  }

  const invalidPayment = () => {
    updateUser(user.Email, {
      AmountInvest: 0,
      DepositStatus: false,
      InvalidDeposit: true,
      HaveNotifications: true,
      Notifications:
        'Your deposit have been marked invalid, check your deposit details and provide a valid details. coinerslot cares',
    })
    setRefreshData(true)
    setTimeout(() => setIsOpen(false), 500)
  }

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
            key: 'Net Investmant',
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
                backgroundColor: 'green',
                color: '#fff',
                cursor: 'pointer',
              }}
              onClick={confirmPayment}
            >
              Confirm Deposit
            </button>
            <button
              style={{ backgroundColor: 'tomato', cursor: 'pointer' }}
              onClick={invalidPayment}
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
      {currentUsers.length <= 0 && (
        <div>
          <Typography
            color='secondary'
            variant='h4'
            style={{ textAlign: 'center', marginTop: '10%' }}
          >
            No Pending Deposits Available Now
          </Typography>
        </div>
      )}
      <List className={classes.list}>
        {currentUsers.length > 0 && (
          <ListSubheader className={classes.subheader} id='#'>
            Pending Deposits
          </ListSubheader>
        )}
        {currentUsers
          .sort((a, b) => new Date(a.CreatedAt) - new Date(b.CreatedAt))
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
                    <span className={classes.subTitle}>Amount Invested:</span> $
                    {parseInt(list.AmountInvest).toLocaleString()}.00
                  </p>
                  <p className={classes.text}>
                    <span className={classes.subTitle}>Invest Date:</span>
                    {list.DepositDate}
                  </p>
                </div>
              </ListItem>
            </Paper>
          ))
          .reverse()}
      </List>
      <List className={classes.list}>
        {deposits.length > 0 && (
          <ListSubheader className={classes.subheader} id='#'>
            Deposits History
          </ListSubheader>
        )}
        {deposits
          .sort((a, b) => new Date(a.CreatedAt) - new Date(b.CreatedAt))
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
                </div>
              </ListItem>
            </Paper>
          ))
          .reverse()}
      </List>

      <List className={classes.list}>
        {invalidDeposits.map((list, index) => (
          <Paper key={list.Fullname + index}>
            {index === 0 && (
              <ListSubheader
                className={classes.subheader}
                style={{ color: 'red' }}
              >
                Invalid Deposits History
              </ListSubheader>
            )}
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
                  <span className={classes.subTitle}>Amount Invested:</span> $
                  {parseInt(list.AmountInvest).toLocaleString()}.00
                </p>
                <p className={classes.text}>
                  <span className={classes.subTitle}>Invest Date:</span>
                  {list.DepositDate}
                </p>
              </div>
            </ListItem>
          </Paper>
        ))}
      </List>
    </React.Fragment>
  )
}
