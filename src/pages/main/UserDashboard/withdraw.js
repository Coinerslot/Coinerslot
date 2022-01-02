import React from 'react'
import { Button, CardActions } from '@material-ui/core'
import { Paper, TextField, Typography } from '@material-ui/core'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { userAccount, mrWorker, profileScreen } from '../../../recoil'
import { timeChecker } from '../../../libs/helpers'
import { updateUser } from '../../../config'
import Timer from '../../../libs/helpers'
import { useStyles } from './styles'

export default function Withdraw() {
  const classes = useStyles()
  const [values, setValues] = useRecoilState(userAccount)
  const { totalReturn } = useRecoilValue(mrWorker)
  const setRender = useSetRecoilState(profileScreen)
  const [isDone, setIsDone] = React.useState(false)
  const [amount, setAmount] = React.useState(0)

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }
  const handleAmount = (event) => {
    setAmount(event.target.value)
  }

  const handleSave = () => {
    const dateTime = new Date().toLocaleString()
    const balance = totalReturn - amount <= 0 ? 0 : totalReturn - amount
    setIsDone(true)
    if (isDone) {
      updateUser(values.Email, {
        WithdrawStatus: true,
        WithdrawDate: dateTime,
        WithdrawAmount: amount,
        NewBalance: balance,
      })
      setTimeout(() => {
        setRender('details')
        setIsDone(false)
        setAmount(0)
      }, 3000)
    }
  }

  const validate =
    values.Wallet.trim() === '' ||
    amount === undefined ||
    amount <= 0 ||
    timeChecker(values.DepositDueDate) || values.TotalAmountInvest <= 0

  return (
    <Paper
      style={{
        minHeight: 200,
        padding: '2% 0',
      }}
    >
      {isDone ? (
        <React.Fragment>
          <Typography color='secondary' variant='h4' className={classes.title}>
            Congratulations!!
          </Typography>
          <p style={{ textAlign: 'center', margin: '10% 2%' }}>
            You will be credited ${amount.toLocaleString()}.00 shortly
          </p>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <p className={classes.title}>
            Your Balance is : ${totalReturn.toLocaleString()}.00
          </p>
          <Timer {...values} />
          <div className={classes.detailswrap}>
            <TextField
              id='outlined-amount'
              type='number'
              label='Enter Amount'
              variant='outlined'
              className={classes.textField}
              onChange={handleAmount}
            />

            <TextField
              id='outlined-account'
              type='text'
              label={`Confrim Your ${values.WalletType} wallet`}
              variant='outlined'
              name='WalletType'
              defaultValue={values.Wallet}
              className={classes.textField}
              onChange={handleChange('Wallet')}
            />
          </div>
        </React.Fragment>
      )}
      <CardActions className={classes.btn}>
        <Button
          size='medium'
          disabled={validate}
          color={'secondary'}
          variant='contained'
          onClick={handleSave}
        >
          continue
        </Button>
      </CardActions>
    </Paper>
  )
}
