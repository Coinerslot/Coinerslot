import React from 'react'
import { useQuery } from 'react-query'
import { useRecoilState } from 'recoil'
import { Paper } from '@material-ui/core'
import { doc, getDoc } from 'firebase/firestore'
import { Box, CircularProgress, Typography } from '@material-ui/core'
import { db } from '../../../config'
import { useStyles } from './styles'
import Timer from '../../../libs/helpers'
import { userAccount } from '../../../recoil'

export default function Details() {
  const classes = useStyles()
  const [values, setValues] = useRecoilState(userAccount)
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
          Personal Information
        </Typography>
        {values.DepositVerified && <Timer {...values} />}
      </div>
      <div className={classes.detailswrap}>
        <div>
          {[
            { title: 'Username', value: values.Username },
            { title: 'Fullname', value: values.Fullname },
            { title: 'Email', value: values.Email },
            { title: 'Phone', value: values.Phone },
            { title: 'Created on', value: values.CreatedAt },
          ].map((list) => (
            <Paper key={list.title} className={classes.textWrap}>
              <p className={classes.text}>{list.title}:</p>
              <span style={{ color: '#fff' }}>{list.value}</span>
            </Paper>
          ))}
        </div>
      </div>
    </Paper>
  )
}
