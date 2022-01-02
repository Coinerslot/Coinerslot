import React from 'react'
import { Paper } from '@material-ui/core'
import { useStyles } from './styles'
import { FandQ } from '../../../libs/Data'


export default function FrequentlyAsked() {
  const classes = useStyles()
  return (
    <section className={classes.root}>
      <h1 style={{ textAlign: 'center' }}>FREQUENTLY ASKED QUESTION</h1>
      {FandQ.map((list) => (
        <Paper key={list.question} className={classes.paper}>
          <h3 className={classes.question}>👉 {list.question} ?</h3>
          <p className={classes.answer}>
            {list.answer !== 'true' ? (
              list.answer
            ) : (
              <>
                You can open a free PerfectMoney account{' '}
                <a href='www.perfectmoney.com'>here.</a> Or, You can open a free
                BitCoin account <a href='www.blockchain.com'> here </a>{' '}
              </>
            )}
          </p>
        </Paper>
      ))}
    </section>
  )
}
