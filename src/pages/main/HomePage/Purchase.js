import React from 'react'
import clsx from 'clsx'
import { purchaseCoins } from '../../../libs/Data'
import { makeStyles } from '@material-ui/core/styles'
import { useCustomStyles } from '../../../constants/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '90%',
    margin: '0 auto',
    padding: '1% 0 5%',
  },
  headText: {
    fontSize: 16,
    color: '#004beb',
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
      fontSize: 35,
    },
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  minherotext: {
    fontSize: 10,
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
      fontSize: 20,
    },
  },
  text: {
    fontSize: 6,
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
      fontSize: 14,
    },
  },
}))

export default function Purchase() {
  const classes = useCustomStyles()
  const classex = useStyles()
  return (
    <section className={clsx(classes.rootContainer, classex.root)}>
      <h1 className={classex.headText}>
        looking for where to buy bitcoin? check out these exchanges
      </h1>
      <div className={classex.wrapper}>
        {purchaseCoins.map((item) => (
          <div key={item.name} style={{ width: '20%' }}>
            <a href={`${item.link}`}>
              <img
                src={item.bg}
                alt={`${item.name}`}
                style={{ border: '1px solid', borderRadius: '50%' }}
                width='100%'
              />
              <p className={classex.text}>{item.name}.com</p>
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}
