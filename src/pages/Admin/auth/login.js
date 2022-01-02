import React from 'react'
import { useHistory } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormControl from '@material-ui/core/FormControl'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import { useSetRecoilState } from 'recoil'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { isAdmin, currentHomeScreen } from '../../../recoil'
import { Card, Container } from '@material-ui/core'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { useStyles } from './styles'
import { chigbo } from '../../../config'

export default function Signin() {
  const classes = useStyles()
  const auth = getAuth()
  let history = useHistory()
  const setScreen = useSetRecoilState(currentHomeScreen)
  const setLogin = useSetRecoilState(isAdmin)
  const [message, setMessage] = React.useState({
    type: true,
    text: 'Please login',
  })
  const [values, setValues] = React.useState({
    email: '',
    password: '',
  })

  React.useEffect(() => {
    setScreen('Login')
  }, [setScreen])

  let login = async () => {
    if (values.email !== chigbo()) {
      history.push('/')
      return
    }
    try {
      await signInWithEmailAndPassword(auth, chigbo(), values.password).then(
        () => {
          alertMessage(true, 'Successfully Logged in')
          setLogin(true)
          setTimeout(() => history.push('/Admin'), 500)
        }
      )
    } catch (error) {
      alertMessage(false, `${error.message}`)
      setTimeout(() => {
        alertMessage(false, `Check and Try again!`)
      }, 3000)
    }
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

  const alertMessage = (type, text) => {
    setMessage({ type, text })
    setTimeout(() => {
      setMessage({ type: true, text: 'Please login' })
    }, 3000)
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
              <InputLabel htmlFor='userEmail'>UserEmail</InputLabel>
              <OutlinedInput
                id='UserEmail'
                type={'text'}
                value={values.username}
                onChange={handleChange('email')}
                labelWidth={70}
              />
            </FormControl>
            <FormControl className={classes.textField} variant='outlined'>
              <InputLabel htmlFor='password'>Password</InputLabel>
              <OutlinedInput
                id='password'
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

          <CardActions className={classes.btn}>
            <Button
              size='medium'
              color='primary'
              variant='contained'
              onClick={login}
              disabled={validate}
            >
              Log in
            </Button>
          </CardActions>
        </Card>
      </Container>
    </div>
  )
}
