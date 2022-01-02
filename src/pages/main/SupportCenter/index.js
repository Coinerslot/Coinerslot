import React from 'react'
import emailjs from 'emailjs-com'
import { FormControl, Grid, InputLabel } from '@material-ui/core'
import { Button, Card, CardActions, CardContent } from '@material-ui/core/'
import { OutlinedInput, TextField, Typography } from '@material-ui/core/'
import map from '../../../libs/Data/img/CoinerslotMap.png'
import { useStyles } from './styles'
import { user_id, service_id, templete_id } from '../../../config'

export default function SupportCenter() {
  const classex = useStyles()
  const [message, setMessage] = React.useState({
    type: true,
    text: 'coinerslotSupport, How can i help you?',
  })
  const [values, setValues] = React.useState({
    name: '',
    email: '',
    message: '',
  })

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleSend = () => {
    const templateParams = {
      from_name: values.name,
      to_name: 'From CoinerslotSupportCenter',
      user_name: values.name,
      user_email: 'coinerslot@gmail.com',
      reply_to: values.email,
      message: values.message,
    }
    emailjs.send(service_id, templete_id, templateParams, user_id).then(
      () => {
        alertMessage(true, `Message sent successfully !!!`)
        setTimeout(() => {
          setMessage({
            type: true,
            text: 'Thanks, coinerslot Cares!',
          })
        }, 3000)
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
    <section container className={classex.container}>
      <Grid container xs={12}>
        <Grid container justifyContent='space-around' spacing={1}>
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
                <InputLabel htmlFor='outlined-adornment-name'>Name</InputLabel>
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
                  Email
                </InputLabel>
                <OutlinedInput
                  id='outlined-adornment-email'
                  type={'text'}
                  value={values.email}
                  onChange={handleChange('email')}
                  labelWidth={70}
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
                Submit
              </Button>
            </CardActions>
          </Card>
          <Card className={classex.card}>
            <CardContent className={classex.cardContent}>
              <h2>coinerslot</h2>
              <img src={map} alt='map' width='100%' />
              <p>
                21 Mansell Street, London, England, E1 8AA Email :
                support@coinerslot.com Live chat support available on 24/7.
              </p>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </section>
  )
}
