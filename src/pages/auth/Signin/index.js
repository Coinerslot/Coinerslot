import React from 'react'
import { getAuth } from 'firebase/auth'
import { useSetRecoilState } from 'recoil'
import { Button, Card } from '@material-ui/core'
import { doc, getDoc } from 'firebase/firestore'
import Typography from '@material-ui/core/Typography'
import { CardActions, CardContent } from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import { Container, FormControl, IconButton } from '@material-ui/core'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { InputLabel, InputAdornment, OutlinedInput } from '@material-ui/core'

import { useStyles } from './styles'
import { db } from '../../../config'
import { currentHomeScreen } from '../../../recoil'
import { isAuthenticated, userAccount } from '../../../recoil'

export default function Signin() {
  const auth = getAuth()
  const classes = useStyles()
  const setIsLogin = useSetRecoilState(isAuthenticated)
  const setUserDetails = useSetRecoilState(userAccount)
  const setScreen = useSetRecoilState(currentHomeScreen)
  const [message, setMessage] = React.useState({
    type: true,
    text: 'Please login',
  })
  const [values, setValues] = React.useState({
    email: '',
    password: '',
    showPassword: false,
  })

  React.useEffect(() => {
    setScreen('Signin')
  }, [setScreen])

  const handleSignin = async () => {
    try {
      await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      ).then(async (userCredential) => {
        const userId = userCredential.user.email
        const docSnap = await getDoc(doc(db, 'users', userId))
        if (docSnap.exists()) {
          if (docSnap.data().IsBlackList) {
            alertMessage(false, 'Account Suspended!')
            setIsLogin(false)
            return 
          } else {
            setUserDetails(docSnap.data())
          }
        }
        alertMessage(true, 'Successfully Logged in')
        setIsLogin(true)
        return setTimeout(() => {
          setScreen('Home')
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
      setMessage({ type: true, text: 'Please login' })
    }, 3000)
  }

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const validate = values.email.trim() === '' || values.password.trim() === ''

  return (
    <div>
      <Container maxWidth='sm' className={classes.container}>
        <Card className={classes.card}>
          <CardContent>
            <Typography
              className={classes.title}
              color={message.type ? 'secondary' : 'error'}
              gutterBottom
            >
              {message.text}
            </Typography>
            <FormControl className={classes.textField} variant='outlined'>
              <InputLabel htmlFor='outlined-adornment-email'>Email</InputLabel>
              <OutlinedInput
                id='outlined-adornment-email'
                type={'text'}
                value={values.email}
                onChange={handleChange('email')}
                labelWidth={70}
              />
            </FormControl>
            <FormControl className={classes.textField} variant='outlined'>
              <InputLabel htmlFor='outlined-adornment-password'>
                Password
              </InputLabel>
              <OutlinedInput
                id='outlined-adornment-password'
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge='end'
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={70}
              />
            </FormControl>
          </CardContent>

          <CardActions className={classes.btnWrap}>
            <p
              className={classes.forgotPassword}
              onClick={() => setScreen('ForgotPassword')}
            >
              Forgot passward
            </p>
            <Button
              size='medium'
              color='primary'
              variant='contained'
              onClick={handleSignin}
              disabled={validate}
              className={classes.btn}
            >
              Log in
            </Button>

            <p>
              Don't have an account?{' '}
              <span
                className={classes.switcher}
                onClick={() => setScreen('Signup')}
              >
                Sign up
              </span>
            </p>
          </CardActions>
        </Card>
      </Container>
    </div>
  )
}
