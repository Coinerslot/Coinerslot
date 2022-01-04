import React from 'react'
import emailjs from 'emailjs-com'
import { useQuery } from 'react-query'
import { Paper } from '@material-ui/core'
import { Box, CircularProgress } from '@material-ui/core'
import { Avatar, List, ListItem } from '@material-ui/core'
import { FormControl, InputLabel } from '@material-ui/core'
import { ListItemAvatar, ListSubheader } from '@material-ui/core'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { OutlinedInput, TextField, Typography } from '@material-ui/core/'
import { Button, Card, CardActions, CardContent } from '@material-ui/core/'
import { user_id, service_id, templete_id } from '../../../config'
import { db, updateUser } from '../../../config'
import { useStyles } from './styles'

export default function Index() {
  const classes = useStyles()
  const [isOpen, setIsOpen] = React.useState(false)
  const [addFund, setAddFund] = React.useState(false)
  const [isBonus, setIsBonus] = React.useState(false)
  const [isMail, setIsMail] = React.useState(false)
  const [user, setUser] = React.useState({
    TotalAmountInvest: 0,
    DepositStatus: false,
    InvalidDeposit: false,
    selectedPercent: 0,
    Notifications: '',
    ReferalBonus: 0,
    AmountInvest: 0,
    Investplan: '',
    ReferalCode: '',
    WalletType: '',
    CreatedAt: '',
    Fullname: '',
    Username: '',
    Message: '',
    Wallet: '',
    Email: '',
    Phone: '',
  })

  const { isLoading, error, data, refetch } = useQuery(
    'registerdUser',
    async () => {
      let myArr = []
      const queryDB = await getDocs(
        query(collection(db, 'users'), where('IsBlackList', '==', false))
      )
      queryDB.docs.forEach((doc) => myArr.push(doc.data()))
      return myArr
    }
  )

  if (isLoading) {
    return (
      <div>
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <h3 style={{ textAlign: 'center', marginTop: '10%' }}>
          An error has occurred: {error.message}
        </h3>
      </div>
    )
  }

  function SendMail() {
    const classex = useStyles()
    const [message, setMessage] = React.useState({
      type: true,
      text: '',
    })
    const [values, setValues] = React.useState({
      name: 'Change this Subject text',
      email: user.Email,
      message: '',
    })

    const handleChange = (prop) => (event) => {
      setValues({ ...values, [prop]: event.target.value })
    }

    const handleSend = () => {
      const templateParams = {
        from_name: 'coinerslotSupportCenter',
        to_name: `Hi, ${user.Fullname}`,
        user_name: values.name,
        user_email: values.email,
        reply_to: 'coinerslot@gmail.com',
        message: values.message,
      }
      emailjs.send(service_id, templete_id, templateParams, user_id).then(
        () => {
          alertMessage(true, `Mail sent successfully !!!`)
          setTimeout(() => setIsMail(false), 3000)
          setValues({ name: '', email: '', message: '' })
        },
        (error) => {
          alertMessage(false, `Oops .... ${error.text}`)
          setTimeout(() => {
            setMessage({
              type: false,
              text: 'Try again later',
            })
          }, 3000)
        }
      )
    }

    const alertMessage = (type, text) => {
      setMessage({ type, text })
    }

    return (
      <Card className={classex.card}>
        <CardContent className={classex.cardContent}>
          <Typography
            className={classex.title}
            style={{ color: message.type ? 'green' : 'red' }}
            gutterBottom
          >
            {message.text}
          </Typography>
          <FormControl className={classex.textField} variant='outlined'>
            <InputLabel htmlFor='outlined-adornment-name'>Subject</InputLabel>
            <OutlinedInput
              id='outlined-adornment-name'
              type={'text'}
              value={values.name}
              onChange={handleChange('name')}
              labelWidth={70}
            />
          </FormControl>
          <FormControl className={classex.textField} variant='outlined'>
            <InputLabel htmlFor='outlined-adornment-email'>
              Send Email to
            </InputLabel>
            <OutlinedInput
              id='outlined-adornment-email'
              type={'text'}
              value={values.email}
              onChange={handleChange('email')}
              labelWidth={100}
            />
          </FormControl>
          <FormControl className={classex.textField} variant='outlined'>
            <TextField
              id='outlined-message'
              label='Message'
              multiline
              rows={4}
              value={values.message}
              placeholder="What's on your mind"
              variant='outlined'
              onChange={handleChange('message')}
            />
          </FormControl>
        </CardContent>
        <CardActions className={classex.btn}>
          <Button
            size='medium'
            color='primary'
            variant='contained'
            onClick={handleSend}
          >
            Send Mail
          </Button>
        </CardActions>
      </Card>
    )
  }

  const handleSuspend = () => {
    updateUser(user.Email, {
      IsBlackList: true,
    })
    refetch()
    setTimeout(() => setIsOpen(false), 500)
  }

  const ViewUser = () => {
    const [amount, setAmount] = React.useState(0)
    return (
      <div className={classes.userModel}>
        <span
          className={classes.closeModel}
          onClick={() => {
            setIsOpen(false)
            setIsMail(false)
          }}
        >
          X
        </span>
        {isMail ? (
          <SendMail />
        ) : (
          <div>
            {[
              { key: 'Username', value: user.Username },
              { key: 'Name', value: user.Fullname },
              { key: 'Phone', value: user.Phone },
              { key: 'Email', value: user.Email },
              { key: 'Invest Plan', value: user.Investplan },
              { key: 'Wallet Type', value: user.WalletType },
              { key: 'Wallet Address', value: user.Wallet },
              { key: 'Registered on', value: user.CreatedAt },
              {
                key: 'Referal Bonus',
                value: `$${parseInt(user.ReferalBonus).toLocaleString()}.00`,
              },
              { key: 'ReferalCode', value: user.ReferalCode },
              {
                key: 'Amount Invested',
                value: `$${parseInt(
                  user.TotalAmountInvest
                ).toLocaleString()}.00`,
              },
            ].map((prop) => (
              <p className={classes.text} key={prop.key}>
                <span className={classes.subTitle}>{prop.key}:</span>{' '}
                {prop.value}
              </p>
            ))}
            {addFund && (
              <div className={classes.inputWrap}>
                <input
                  type='number'
                  placeholder='Enter Amount'
                  style={{
                    width: '70%',
                  }}
                  onChange={(event) => setAmount(event.currentTarget.value)}
                />

                <button
                  onClick={() => {
                    setAddFund(false)
                    setTimeout(() => setIsOpen(false), 3000)
                    if (isBonus) {
                      const oldBal = parseInt(user.TotalAmountInvest)
                      const newBalance = oldBal + parseInt(amount)
                      updateUser(user.Email, {
                        ReferalBonus: amount,
                        HaveNotifications: true,
                        TotalAmountInvest: newBalance,
                        Notifications: ` Hi ${user.Fullname}, $${amount}.00 bonus have been added to your account`,
                      })
                      setTimeout(() => refetch(), 200)
                      return
                    } else {
                      const dateTime = new Date().toLocaleString()
                      const oldBal = parseInt(user.TotalAmountInvest)
                      const newBalance = oldBal + parseInt(amount)
                      updateUser(user.Email, {
                        DepositStatus: true,
                        AmountInvest: amount,
                        DepositDate: dateTime,
                        DepositVerified: true,
                        HaveNotifications: true,
                        TotalAmountInvest: newBalance,
                        TransactionId: 'Added by Admin',
                        Notifications: ` Hi ${user.Fullname}, $${amount}.00 have been creadited to your account by coinerslot`,
                      })
                      setTimeout(() => refetch(), 200)
                      return
                    }
                  }}
                >
                  Continue
                </button>
              </div>
            )}
            <div
              style={{
                display: 'flex',
                marginTop: '2%',
                justifyContent: 'space-between',
              }}
            >
              <button
                onClick={() => {
                  setAddFund(true)
                  setIsBonus(false)
                }}
              >
                Send Fund
              </button>
              <button
                onClick={() => {
                  setAddFund(true)
                  setIsBonus(true)
                }}
              >
                Send Bonus
              </button>
              <button onClick={() => setIsMail(true)}>Send Mail</button>
              <button onClick={handleSuspend}>Block User</button>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <React.Fragment>
      {isOpen && <ViewUser />}
      <List className={classes.list}>
        {data.length > 0 && (
          <ListSubheader className={classes.subheader} id='#'>
            Registered Users
          </ListSubheader>
        )}
        {data
          .sort((a, b) => new Date(a.CreatedAt) - new Date(b.CreatedAt))
          .map((list, index) => (
            <Paper key={list.Fullname + index}>
              <ListItem
                className={classes.listItem}
                button
                onClick={() => {
                  setUser(list)
                  return setIsOpen(true)
                }}
              >
                <ListItemAvatar>
                  <Avatar />
                </ListItemAvatar>
                <div>
                  <h2 className={classes.listTitle}>{list.Fullname}</h2>
                  <p className={classes.text}>
                    <span className={classes.subTitle}>Registered on: </span>
                    {list.CreatedAt}
                  </p>
                  {list.DepositStatus && !list.DepositVerified && (
                    <p>
                      <span
                        className={classes.subTitle}
                        style={{ color: 'red' }}
                      >
                        Note:{' '}
                      </span>
                      ${list.AmountInvest.toLocaleString()}.00 deposit
                    </p>
                  )}
                  {list.WithdrawStatus && !list.WithdrawApproved && (
                    <p>
                      <span
                        className={classes.subTitle}
                        style={{ color: 'red' }}
                      >
                        Note:{' '}
                      </span>
                      ${list.WithdrawAmount.toLocaleString()}.00 withdrawal request
                    </p>
                  )}
                  {list.InvalidDeposit && (
                    <p>
                      <span
                        className={classes.subTitle}
                        style={{ color: 'red' }}
                      >
                        Note:{' '}
                      </span>{' '}
                      You marked this Deposit Invalid
                    </p>
                  )}
                </div>
              </ListItem>
            </Paper>
          ))
          .reverse()}
      </List>
    </React.Fragment>
  )
}
