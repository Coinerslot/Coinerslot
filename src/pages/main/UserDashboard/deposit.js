import * as React from 'react'
import { Button, Card, CardContent, Paper } from '@material-ui/core'
import { CardActions, TextField, Typography } from '@material-ui/core'
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil'
import {investPlans, profileScreen, userAccount, mrWorker } from '../../../recoil'
import { payAddress } from '../../../libs/Data'
import { useStyles } from './styles'
import { updateUser } from '../../../config'
import BitcoinBC from '../../../libs/Data/img/BitcoinBC.jpg'

export default function StateTextFields() {
  const classes = useStyles()
  const [transId, setTransId] = React.useState('')
  const investData = useRecoilValue(investPlans)
  const setRender = useSetRecoilState(profileScreen)
  const [isCopy, setIsCopy] = React.useState(false)
  const { netPercentage, netReturn } = useRecoilValue(mrWorker)
  const [selectedValue, setSelectedValue] = useRecoilState(userAccount)
  const [barCode, setBarCode] = React.useState(BitcoinBC)
  const [barCodeName, setBarCodeName] = React.useState(selectedValue.WalletType)
  const [wallet, setWallet] = React.useState(selectedValue.Wallet)
  React.useEffect(() => {
    payAddress.map((list) => {
      switch (selectedValue.WalletType) {
        case `${list.name}`:
          setBarCode(list.barcode)
          setBarCodeName(list.name)
          return setWallet(list.address)
        default:
          return null
      }
    })
  }, [selectedValue, setWallet])

  const handleChange = (event) => {
    investData.map((list) => {
      switch (event.target.name) {
        case 'SelectedPercent':
          switch (event.target.value) {
            case `${list.percent}`:
              return setSelectedValue({
                ...selectedValue,
                Investplan: list.title,
                SelectedPercent: list.percent,
                DepositDuration: list.duration,
              })
            default:
              return null
          }
        default:
          return setSelectedValue({
            ...selectedValue,
            [event.target.name]: event.target.value,
            SelectedPercent: 10,
            DepositDuration: 3,
            Investplan: 'STARTER',
          })
      }
    })
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(wallet)
    setIsCopy(true)
    setTimeout(() => setIsCopy(false), 1000)
  }

  const handlePayment = () => {
    const dateTime = new Date().toLocaleString()
    updateUser(selectedValue.Email, {
      DepositStatus: true,
      DepositDate: dateTime,
      InvalidDeposit: false,
      DepositVerified: false,
      TransactionId: transId,
      Investplan: selectedValue.Investplan,
      AmountInvest: selectedValue.AmountInvest,
      SelectedPercent: selectedValue.SelectedPercent,
      DepositDuration: selectedValue.DepositDuration,
    })
    setRender('dashboard')
  }

  const validate = transId.trim() === '' || selectedValue.Investplan <= 0

  return (
    <Card className={classes.wrapper}>
      <CardContent>
        <div className={classes.depositWrap}>
          <Paper className={classes.detailswrap} style={{ padding: '6% 1%' }}>
            <img src={barCode} alt='barCode' className={classes.barcode} />
            <Typography
              style={{ color: '#000', textAlign: 'center' }}
              variant='subtitle1'
              gutterBottom
            >
              <span
                style={{
                  color: 'red',
                  fontWeight: 'bold',
                }}
              >
                Note:
              </span>{' '}
              This is for {barCodeName}
            </Typography>
          </Paper>
          <Paper className={classes.detailswrap} style={{ padding: '1%' }}>
            <TextField
              id='outlined-select-currency-native'
              select
              name='SelectedPercent'
              label=' Select Investment Plan'
              variant='outlined'
              onChange={handleChange}
              className={classes.textField}
              SelectProps={{
                native: true,
              }}
            >
              {investData.map((list) => (
                <option key={list.title} value={list.percent}>
                  {list.title}
                </option>
              ))}
            </TextField>

            <TextField
              id='outlined-amount'
              type='number'
              label='Enter Amount'
              variant='outlined'
              name='AmountInvest'
              placeholder='E.g $100'
              className={classes.textField}
              onChange={handleChange}
            />
            <TextField
              id='outlined-readOnly'
              label='Net Profit :'
              variant='outlined'
              value={`$ ${netPercentage}.00`}
              className={classes.textField}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              id='outlined-readOnly'
              label='Total Return :'
              variant='outlined'
              value={`$ ${netReturn}.00`}
              className={classes.textField}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              id='outlined-transaction-id'
              label='Enter your Transaction Id:'
              variant='outlined'
              name='TransactionId'
              className={classes.textField}
              onChange={(event) => setTransId(event.target.value)}
            />
            <p className={classes.smtext}>
              Copy Coinerslot {selectedValue.WalletType} wallet:
            </p>
            <p style={{ color: 'dodgerblue' }} className={classes.smtext}>
              {wallet}{' '}
              <Button
                size='medium'
                variant='outlined'
                onClick={copyToClipboard}
                style={{
                  height: 20,
                  color: '#fff',
                  fontSize: 10,
                  backgroundColor: '#000',
                  textTransform: 'capitalize',
                }}
              >
                {isCopy ? 'copied' : 'copy'}
              </Button>
            </p>
          </Paper>
        </div>
      </CardContent>
      <CardActions className={classes.btn}>
        <Button
          size='medium'
          color='Secondary'
          variant='contained'
          onClick={handlePayment}
          disabled={validate}
        >
          Continue
        </Button>
      </CardActions>
    </Card>
  )
}
