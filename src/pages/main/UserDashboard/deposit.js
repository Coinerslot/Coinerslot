import * as React from 'react'
import { useRecoilValue, useRecoilState } from 'recoil'
import { Button, Card, CardContent, Paper } from '@material-ui/core'
import { CardActions, TextField, Typography } from '@material-ui/core'
import BitcoinBC from '../../../libs/Data/img/BitcoinBC.jpg'
import { userAccount, mrWorker } from '../../../recoil'
import { payAddress } from '../../../libs/Data'
import { updateUser } from '../../../config'
import { useStyles } from './styles'

export default function StateTextFields() {
  const classes = useStyles()
  const [transId, setTransId] = React.useState('')
  const [isCopy, setIsCopy] = React.useState(false)
  const [isPaid, setIsPaid] = React.useState(false)
  const [isBarcode, setIsBarcode] = React.useState(false)
  const { currentPlan, planDuration, planPercent, netPercentage, netReturn } =
    useRecoilValue(mrWorker)
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

  const handleChange = (event) =>
    setSelectedValue({
      ...selectedValue,
      [event.target.name]: event.target.value,
      SelectedPercent: planPercent,
      DepositDuration: planDuration,
      Investplan: currentPlan,
    })

  const copyToClipboard = () => {
    navigator.clipboard.writeText(wallet)
    setIsCopy(true)
    setTimeout(() => setIsCopy(false), 1000)
  }

  const handlePayment = () => {
    if (isPaid) {
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
      setTransId('')
      setIsPaid(false)
      setIsBarcode(false)
      setSelectedValue({
        ...selectedValue,
        AmountInvest: 0,
      })
      return
    } else if (isBarcode) {
      setIsPaid(true)
    }
    setIsBarcode(true)
  }

  const validate = isPaid
    ? transId.trim() === ''
    : selectedValue.AmountInvest <= 99

  return (
    <Card className={classes.wrapper}>
      <CardContent>
        <div className={classes.depositWrap}>
          {isPaid ? (
            <Paper className={classes.detailswrap} style={{ padding: '6% 1%' }}>
              <TextField
                id='outlined-transaction-id'
                label='Enter your Transaction Id:'
                variant='outlined'
                name='TransactionId'
                className={classes.textField}
                onChange={(event) => setTransId(event.target.value)}
              />
            </Paper>
          ) : isBarcode ? (
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
          ) : (
            <Paper className={classes.detailswrap} style={{ padding: '1%' }}>
              <TextField
                id='outlined-readOnly'
                label='Investment plan :'
                variant='outlined'
                value={`${currentPlan}`}
                className={classes.textField}
                InputProps={{
                  readOnly: true,
                }}
              />

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
            </Paper>
          )}
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
          {isPaid ? 'Done' : 'Continue'}
        </Button>
      </CardActions>
    </Card>
  )
}
