import React from 'react'
import { useSetRecoilState } from 'recoil'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { currentHomeScreen } from '../../../recoil'
import Button from '@material-ui/core/Button'
import { Container } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import { useStyles } from './styles'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'

export default function ForgotPassword() {
  const auth = getAuth()
  const classes = useStyles()
  const setScreen = useSetRecoilState(currentHomeScreen)
  const [mailSent, setMailSent] = React.useState(false)
  const [email, setEmail] = React.useState('')
  const [message, setMessage] = React.useState({ type: '', text: '' })

  let login = async () => {
    try {
      await sendPasswordResetEmail(auth, email).then(() => {
        setMessage({
          type: true,
          text: `Password reset email sent to ${email}`,
        })
        setMailSent(true)
        return setTimeout(() => {
          setScreen('Signin')
          setMailSent(false)
        }, 5000)
      })
    } catch (error) {
      setMessage({ type: false, text: error.message })
    }
  }

  const validate = email.trim() === ''

  return (
    <div>
      <Container maxWidth='sm' className={classes.container}>
        <Card className={classes.card}>
          <CardContent>
            <Typography
              className={classes.title}
              variant={mailSent ? 'h5' : 'body1'}
              color='secondary'
              gutterBottom
            >
              {mailSent ? 'Check your Inbox' : 'Forgot Password'}
            </Typography>

            {mailSent ? (
              <Typography
                className={classes.title}
                color={message.type ? 'primary' : 'error'}
                gutterBottom
              >
                {message.text}
              </Typography>
            ) : (
              <FormControl className={classes.textField} variant='outlined'>
                <InputLabel htmlFor='outlined-adornment-username'>
                  Email
                </InputLabel>
                <OutlinedInput
                  id='outlined-adornment-username'
                  type={'text'}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  labelWidth={70}
                />
              </FormControl>
            )}
          </CardContent>

          {!mailSent && (
            <CardActions className={classes.btn}>
              <Button
                size='medium'
                color='primary'
                variant='contained'
                onClick={login}
                disabled={validate}
              >
                Submit
              </Button>

              <p>
                Want to login?{' '}
                <span
                  className={classes.switcher}
                  onClick={() => setScreen('Signin')}
                >
                  Cancel
                </span>
              </p>
            </CardActions>
          )}
        </Card>
      </Container>
    </div>
  )
}
