import React from 'react'
import { useSetRecoilState, useRecoilState } from 'recoil'
import { Button, CardContent } from '@material-ui/core'
import { Card, CardActions, Paper } from '@material-ui/core'
import { Radio, RadioGroup, TextField } from '@material-ui/core'
import { FormLabel, FormControl, FormControlLabel } from '@material-ui/core'
import { useStyles } from './styles'
import { updateUser } from '../../../config'
import { payAddress } from '../../../libs/Data'
import { userAccount, profileScreen } from '../../../recoil'

export default function EditProfile() {
  const classes = useStyles()
  const [values, setValues] = useRecoilState(userAccount)
  const setScreen = useSetRecoilState(profileScreen)
  const [radioValue, setRadioValue] = React.useState(values.WalletType)

  const handleChange = (event) => {
    const value = event.target.value
    setValues({ ...values, [event.target.name]: value })
  }
  const handleRadioChange = (event) => {
    setRadioValue(event.target.value)
    return setValues({ ...values, WalletType: event.target.value })
  }

  const handleSave = () => {
    updateUser(values.Email, values)
    return setTimeout(() => setScreen('details'), 500)
  }

  const validate =
    values.Username.trim() === '' ||
    values.Fullname.trim() === '' ||
    values.Phone.trim() === '' ||
    values.Email.trim() === ''

  return (
    <Card className={classes.wrapper}>
      <CardContent>
        <Paper className={classes.detailswrap}>
          <div>
            {[
              { label: 'Fullname', value: values.Fullname },
              { label: 'Username', value: values.Username },
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
              { label: 'Phone', value: values.Phone },
              { label: 'Wallet', value: values.Wallet },
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
            <FormControl
              component='fieldset'
              style={{
                width: '90%',
                padding: '0 2%',
                marginLeft: 10,
              }}
            >
              <FormLabel component='legend'>Change Wallet Type</FormLabel>
              <RadioGroup
                row
                aria-label='gender'
                name='row-radio-buttons-group'
                value={radioValue}
                onChange={handleRadioChange}
              >
                {payAddress.map((list, index) => (
                  <FormControlLabel
                    ket={list + index}
                    value={list.name}
                    control={<Radio />}
                    label={list.name}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </div>
        </Paper>
      </CardContent>
      <CardActions className={classes.btn}>
        <Button
          size='medium'
          color='Secondary'
          variant='contained'
          onClick={handleSave}
          disabled={validate}
        >
          save changes
        </Button>
      </CardActions>
    </Card>
  )
}
