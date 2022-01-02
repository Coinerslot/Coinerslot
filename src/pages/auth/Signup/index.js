import React from 'react'
import { OutlinedInput } from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility'
import { TextField, Typography } from '@material-ui/core'
import { useRecoilState, useSetRecoilState } from 'recoil'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import { IconButton, InputAdornment, Radio } from '@material-ui/core'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { CircularProgress, Checkbox, RadioGroup } from '@material-ui/core'
import { Button, Card, CardContent, CardActions } from '@material-ui/core'
import { FormControl, FormLabel, FormControlLabel } from '@material-ui/core'
import { currentHomeScreen, profileScreen, TandC } from '../../../recoil'
import { isAuthenticated, userAccount } from '../../../recoil'
import { createUser } from '../../../config'
import { payAddress } from '../../../libs/Data'
import { useStyles } from './styles'

export default function Signup() {
  const auth = getAuth()
  const classes = useStyles()
  const timer = React.useRef()
  const [loading, setLoading] = React.useState(false)
  const [success, setSuccess] = useRecoilState(TandC)
  const setUserDetails = useSetRecoilState(userAccount)
  const setIsLogin = useSetRecoilState(isAuthenticated)
  const setScreen = useSetRecoilState(currentHomeScreen)
  const [isVisible, setIsVisible] = React.useState(false)
  const setProfileScreen = useSetRecoilState(profileScreen)
  const [ShowPassword, setShowPassword] = React.useState('')
  const [radioValue, setRadioValue] = React.useState('Bitcoin')
  const [message, setMessage] = React.useState({ type: true, text: 'Sign Up' })
  const [values, setValues] = React.useState({
    Phone: '',
    Email: '',
    Wallet: '',
    Fullname: '',
    Password: '',
    Username: '',
    WalletType: '',
    ReferalCode: '',
    AmountInvest: 0,
    ReferalBonus: 0,
    SelectedPercent: 10,
    showPassword: false,
    ConfirmPassword: '',
    TotalAmountInvest: 0,
    Investplan: 'STARTER',
  })

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current)
    }
  }, [])

  const handleButtonClick = () => {
    setLoading(true)
    timer.current = window.setTimeout(() => {
      setSuccess(!success)
      setLoading(false)
    }, 2000)
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const handleRadioChange = (event) => {
    setRadioValue(event.target.value)
  }

  const handleChange = (event) => {
    const value = event.target.value
    setValues({ ...values, [event.target.name]: value })
  }

  const dateTime = new Date().toLocaleString()
  const getMessage = 'Welcome to the coinerslot,leading trading company'
  const defaultNotices = 'You have no notifications, thanks for check...'

  let handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        values.Email,
        values.Password
      ).then((userCredential) => {
        const user = userCredential.user
        const id = user.email
        const userProvider = {
          NewBalance: 0,
          DepositDate: '',
          WithdrawDate: '',
          Email: user.email,
          TransactionId: '',
          WithdrawAmount: 0,
          HaveMessage: true,
          IsBlackList:false,
          DepositDuration: 3,
          CreatedAt: dateTime,
          Phone: values.Phone,
          Message: getMessage,
          InvestStatus: false,
          TotalAmountInvest: 0,
          DepositStatus: false,
          WithdrawStatus: false,
          Wallet: values.Wallet,
          InvalidDeposit: false,
          WalletType: radioValue,
          DepositVerified: false,
          WithdrawApproved: false,
          HasNotifications: false,
          Username: values.Username,
          Fullname: values.Fullname,
          DepositDueDate: new Date(),
          Investplan: values.Investplan,
          Notifications: defaultNotices,
          ReferalCode: values.ReferalCode,
          ReferalBonus: values.ReferalBonus,
          AmountInvest: values.AmountInvest,
          SelectedPercent: values.SelectedPercent,
        }
        createUser(id, userProvider)
        setUserDetails(userProvider)
        alertMessage(true, 'Successfully Signed in')
        setIsLogin(true)
        setScreen('Profile')
        return setTimeout(() => {
          setProfileScreen('dashboard')
        }, 500)
      })
    } catch (error) {
      alertMessage(false, `${error.message}`)
      setTimeout(() => {
        alertMessage(false, `Check and Try again!`)
      }, 3000)
    }
  }

  const alertMessage = (type, text) => {
    setMessage({ type, text })
    setTimeout(() => {
      setMessage({ type: true, text: 'Sign up' })
    }, 3000)
  }

  const validate =
    values.Username.trim() === '' ||
    values.Fullname.trim() === '' ||
    values.Phone.trim() === '' ||
    values.Email.trim() === '' ||
    values.Password.trim() === '' ||
    values.ConfirmPassword.trim() === '' ||
    values.Password !== values.ConfirmPassword ||
    !success

  return (
    <Card className={classes.wrapper}>
      <CardContent>
        <Typography
          className={classes.title}
          color={message.type ? 'secondary' : 'error'}
          gutterBottom
        >
          {message.text}
        </Typography>
        <div className={classes.detailswrap}>
          <div>
            {[
              { label: 'Fullname', value: values.Fullname },
              { label: 'Username', value: values.Username },
              { label: 'Phone', value: values.Phone },
              { label: 'Email', value: values.Email },
            ].map((list) => (
              <FormControl
                key={list.label}
                className={classes.textField}
                variant='outlined'
              >
                <TextField
                  id='outlined-name'
                  label={list.label}
                  name={list.label}
                  value={list.value}
                  variant='outlined'
                  onChange={handleChange}
                />
              </FormControl>
            ))}
          </div>
          <div>
            {[
              { label: 'Password', value: values.Password },
              { label: 'ConfirmPassword', value: values.ConfirmPassword },
            ].map((list) => (
              <FormControl
                key={list.label}
                className={classes.textField}
                variant='outlined'
              >
                <OutlinedInput
                  id='outlined-name'
                  type={
                    isVisible && ShowPassword === list.label
                      ? 'text'
                      : 'password'
                  }
                  name={list.label}
                  variant='outlined'
                  placeholder={list.label}
                  label={list.label}
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={() => {
                          setShowPassword(list.label)
                          setIsVisible(!isVisible)
                        }}
                        onMouseDown={handleMouseDownPassword}
                        edge='end'
                      >
                        {isVisible && ShowPassword === list.label ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            ))}
            <FormControl
              key='ReferalCode'
              className={classes.textField}
              variant='outlined'
            >
              <TextField
                id='outlined-name'
                label='Referal Code'
                name='ReferalCode'
                variant='outlined'
                value={values.ReferalCode}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl
              key='Wallet'
              className={classes.textField}
              variant='outlined'
            >
              <TextField
                id='outlined-name'
                label='Wallet Address'
                name='Wallet'
                variant='outlined'
                value={values.Wallet}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl
              component='fieldset'
              style={{
                width: '90%',
                padding: '0 2%',
              }}
            >
              <FormLabel component='legend'>Select Wallet Type</FormLabel>
              <RadioGroup
                row
                aria-label='gender'
                name='row-radio-buttons-group'
                value={radioValue}
                onChange={handleRadioChange}
              >
                {payAddress.map((list, index) => (
                  <FormControlLabel
                    key={list.name + index}
                    value={list.name}
                    control={<Radio />}
                    label={list.name}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </div>
        </div>
      </CardContent>
      <CardActions className={classes.btnWrap}>
        <div style={{ display: 'flex' }}>
          {loading ? (
            <CircularProgress size={38} className={classes.checkProgress} />
          ) : (
            <Checkbox
              checked={success ? true : false}
              color='primary'
              onClick={handleButtonClick}
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
          )}
          <p>
            Accept{' '}
            <span
              onClick={() => setScreen('Terms & Condition')}
              style={{ color: '#004beb', cursor: 'pointer' }}
            >
              Terms and conditions
            </span>
          </p>
        </div>
        <Button
          size='medium'
          color='Secondary'
          variant='contained'
          onClick={handleSignup}
          disabled={validate}
          className={classes.btn}
        >
          Signup
        </Button>
        <p>
          Have an account?{' '}
          <span
            className={classes.switcher}
            onClick={() => setScreen('Signin')}
          >
            log In
          </span>
        </p>
      </CardActions>
    </Card>
  )
}
