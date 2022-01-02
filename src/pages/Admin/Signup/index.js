import React from 'react'
import { useSetRecoilState } from 'recoil'
import { Button, Card, CardContent, CardActions } from '@material-ui/core'
import { FormControl, FormLabel, FormControlLabel } from '@material-ui/core'
import { IconButton, InputAdornment, InputLabel } from '@material-ui/core'
import { OutlinedInput, Radio, RadioGroup } from '@material-ui/core'
import { TextField, Typography } from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import { isAuthenticated, userAccount } from '../../../recoil'
import { currentHomeScreen, profileScreen } from '../../../recoil'
import { useStyles } from './styles'
import {payAddress} from '../../../libs/Data'

export default function EditProfile() {
  const classes = useStyles()
  const setUser = useSetRecoilState(userAccount)
  const setSignUn = useSetRecoilState(isAuthenticated)
  const setScreen = useSetRecoilState(currentHomeScreen)
  const [isVisible, setIsVisible] = React.useState(false)
  const setProfileScreen = useSetRecoilState(profileScreen)
  const [ShowPassword, setShowPassword] = React.useState('')
  const [radioValue, setRadioValue] = React.useState('Bitcoin')
  const [values, setValues] = React.useState({
    CreatedAt: new Date().toLocaleString(),
    Investplan: 'STARTER',
    ConfirmPassword: '',
    TotalAmountInvest:0,
    selectedPercent: 5,
    AmountInvest: 0,
    WalletType: '',
    Fullname: '',
    Password: '',
    Username: '',
    Wallet: '',
    Phone: '',
    Email: '',
  })

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const handleRadioChange = (event) => {
    setRadioValue(event.target.value)
    return setValues({ ...values, WalletType: event.target.value })
  }

  const handleChange = (event) => {
    const value = event.target.value
    setValues({ ...values, [event.target.name]: value })
  }

  const handleSignup = () => {
    const dateTime = new Date().toLocaleString()
    setUser({
      ...values,
      CreatedAt: dateTime,
    })
    setSignUn(true)
    setScreen('Profile')
    return setTimeout(() => {
      setProfileScreen('details')
    }, 500)
  }

  const validate =
    values.Username.trim() === '' ||
    values.Fullname.trim() === '' ||
    values.Phone.trim() === '' ||
    values.Email.trim() === '' ||
    values.Password.trim() === '' ||
    values.ConfirmPassword.trim() === '' ||
    values.Password !== values.ConfirmPassword 

  return (
    <Card className={classes.wrapper}>
      <CardContent>
        <Typography
          variant='h4'
          className={classes.title}
          color='secondary'
          gutterBottom
        >
          Sign Up
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
              { label: 'Wallet', value: values.Phone },
            ].map((list) => (
              <FormControl
                key={list.label}
                className={classes.textField}
                variant='outlined'
              >
                <InputLabel shrink htmlFor='outlined-adornment-password'>
                  {list.label}
                </InputLabel>
                <OutlinedInput
                  id='outlined-name'
                  type={
                    list.label === 'Wallet'
                      ? 'text'
                      : isVisible && ShowPassword === list.label
                      ? 'text'
                      : 'password'
                  }
                  name={list.label}
                  labelWidth={120}
                  variant='outlined'
                  onChange={handleChange}
                  endAdornment={
                    list.label === 'Wallet' ? null : (
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
                    )
                  }
                />
              </FormControl>
            ))}
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
                {payAddress.map(
                  (list,index) => (
                    <FormControlLabel
                      key={list.name + index}
                      value={list.name}
                      control={<Radio />}
                      label={list.name}
                    />
                  )
                )}
              </RadioGroup>
            </FormControl>
          </div>
        </div>
      </CardContent>
      <CardActions className={classes.btn}>
        <Button
          size='medium'
          color='Secondary'
          variant='contained'
          onClick={handleSignup}
          disabled={validate}
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
