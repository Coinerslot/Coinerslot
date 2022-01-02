import React from 'react'
import { useQuery } from 'react-query'
import { Paper } from '@material-ui/core'
import { doc, getDoc } from 'firebase/firestore'
import { useRecoilState, useRecoilValue } from 'recoil'
import { Box, CircularProgress, Typography } from '@material-ui/core'
import { userAccount, mrWorker } from '../../../recoil'
import { db } from '../../../config'
import { useStyles } from './styles'
import Timer from '../../../libs/helpers'

export default function Details() {
  const classes = useStyles()
  const [values, setValues] = useRecoilState(userAccount)
  const { totalpercent, totalReturn } = useRecoilValue(mrWorker)
  const { isLoading, error } = useQuery('registerdUser', async () => {
    const docSnap = await getDoc(doc(db, 'users', values.Email))
    if (docSnap.exists()) {
      setValues(docSnap.data())
    }
  })

  if (isLoading) {
    return (
      <Paper className={classes.wrapper}>
        <Box>
          <CircularProgress />
        </Box>
      </Paper>
    )
  }

  if (error) {
    return (
      <Paper className={classes.wrapper}>
        <h3 style={{ textAlign: 'center', marginTop: '10%' }}>
          An error has occurred: {error.message}
        </h3>
      </Paper>
    )
  }

  return (
    <Paper className={classes.wrapper}>
      <div>
        <Typography variant='h4' color='secondary' className={classes.title}>
          Payment Information
        </Typography>
        {values.DepositVerified && <Timer {...values} />}
      </div>
      <div className={classes.detailswrap}>
        <div>
          <Paper className={classes.textWrap}>
            <p className={classes.text}>Invested Amount:</p>
            <div style={{ display: 'flex' }}>
              <span style={{ color: '#fff' }}>
                {values.AmountInvest > 1 &&
                  ` $${values.AmountInvest.toLocaleString()}.00 `}
              </span>
              <span
                style={{
                  color: values.InvalidDeposit
                    ? 'red'
                    : values.DepositVerified
                    ? 'cyan'
                    : 'red',
                  marginLeft: values.DepositVerified ? 3 : 2,
                }}
              >
                {values.InvalidDeposit
                  ? ' Invalid deposit'
                  : values.DepositVerified
                  ? '✔'
                  : values.AmountInvest > 1
                  ? 'Pending'
                  : ' No deposit made'}
              </span>
            </div>
          </Paper>
          <Paper className={classes.textWrap}>
            <p className={classes.text}>Net Investment:</p>
            <span style={{ color: '#fff' }}>
              ${values.TotalAmountInvest.toLocaleString()}.00
            </span>
          </Paper>
          {[
            { title: 'Net Profit', value: totalpercent },
            {
              title: values.DepositVerified ? 'Net Balance' : 'Pending Balance',
              value: values.WithdrawApproved ? values.NewBalance : totalReturn,
            },
          ].map((list) => (
            <Paper className={classes.textWrap}>
              <p className={classes.text}>{list.title}:</p>
              <span style={{ color: '#fff' }}>
                {`$${list.value.toLocaleString()}.00`}
              </span>
            </Paper>
          ))}

          <Paper className={classes.textWrap}>
            <p className={classes.text}>Withdraw Requst:</p>
            <div style={{ display: 'flex' }}>
              <span style={{ color: '#fff' }}>
                {values.WithdrawAmount > 1 &&
                  ` $${values.WithdrawAmount.toLocaleString()}.00 `}
              </span>
              <span
                style={{
                  color: values.WithdrawApproved ? 'cyan' : 'red',
                  marginLeft: values.WithdrawApproved ? 3 : 0,
                }}
              >
                {values.WithdrawApproved
                  ? '✔'
                  : values.WithdrawAmount > 1
                  ? 'Pending'
                  : ' No Request made'}
              </span>
            </div>
          </Paper>
          <Paper className={classes.textWrap}>
            <p className={classes.text}>Referal bonus:</p>
            <span style={{ color: '#fff' }}>
              ${values.ReferalBonus.toLocaleString()}.00
            </span>
          </Paper>
          <Paper className={classes.textWrap}>
            <p className={classes.text}>{values.WalletType} Wallet:</p>
            <span
              style={{ color: values.Wallet.trim() === '' ? 'red' : '#fff' }}
            >
              {values.Wallet.trim() === ''
                ? 'No Wallet Address Provided'
                : values.Wallet}
            </span>
          </Paper>
        </div>
      </div>
    </Paper>
  )
}
