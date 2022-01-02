import React from 'react'
import clsx from 'clsx'
import { useQuery } from 'react-query'
import { Avatar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Box, CircularProgress } from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import { collection, getDocs, query, where } from 'firebase/firestore'
import ethereumIcon from '../../../libs/Data/img/ethIcon.png'
import bitcoinIcon from '../../../libs/Data/img/bitcoin.png'
import dodgeIcon from '../../../libs/Data/img/dodge.jpg'
import bnbIcon from '../../../libs/Data/img/bnb.png'
import { Paper } from '@material-ui/core'
import { db } from '../../../config'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    width: '100%',
    height: 'auto',
    alignItems: 'center',
  },

  flexWrap: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  
   listWrap: {
    width: '45%',
    maxHeight: 240,
    overflow: 'hidden',
    marginBottom: '2rem',
    border: `1px solid ${theme.palette.secondary.main}`,
    [theme.breakpoints.up('md')]: {
      maxHeight: 510,
      overflow: 'hidden',
    },
  },

  listHeading: {
    backgroundColor: theme.palette.secondary.main,
    color: '#fff',
    textAlign: 'center',
    margin: 0,
    padding: '5%',
    fontSize: '10pt',
    [theme.breakpoints.up('md')]: {
      fontSize: '20pt',
    },
  },
  listSubheading: {
    color: theme.palette.secondary.main,
    textAlign: 'center',
    margin: 0,
    padding: '5%',
    fontSize: '8pt',
    [theme.breakpoints.up('md')]: {
      fontSize: '16pt',
    },
  },

  set: { fontSize: '6pt', width: '30%' },
  avatarWrap: {
    display: 'flex',
    alignContent: 'center',
    gap: 10,
  },
  avatar: {
    width: 18,
    height: 18,
    [theme.breakpoints.up('md')]: {
      width: 30,
      height: 30,
    },
  },
  text: {
    fontSize: '4pt',
    [theme.breakpoints.up('md')]: {
      fontSize: '6pt',
    },
  },

  icon: {
    height: theme.spacing(2),
    width: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      width: 30,
      height: 30,
    },
  },
}))

export default function CustomizedTables() {
  const news = rawData
  const classex = useStyles()
  const { isLoading, error, data } = useQuery('news', async () => {
    let allNewsArr = []
    const queryAllNews = await getDocs(
      query(collection(db, 'users'), where('DepositVerified', '==', true))
    )
    queryAllNews.docs.forEach((doc) => allNewsArr.push(doc.data()))
    return allNewsArr.concat(news)
  })

  if (isLoading) {
    return (
      <section className={classex.root}>
        <h1 style={{ color: '#fff', textAlign: 'center' }}>Blogs</h1>
        <div className={classex.flexWrap}>
          {[{ title: 'LATEST DEPOSITS' }, { title: 'LATEST WITHDRAWALS' }].map(
            (table) => (
              <div
                key={table.title}
                className={classex.listWrap}
                aria-label='list'
              >
                <h1 className={classex.listHeading}>{table.title}</h1>
                <div className={classex.flexWrap}>
                  <h3 className={clsx(classex.set, classex.listSubheading)}>
                    Name
                  </h3>
                  <h3 className={clsx(classex.set, classex.listSubheading)}>
                    Amount
                  </h3>
                  <h3 className={clsx(classex.set, classex.listSubheading)}>
                    Currency
                  </h3>
                </div>
                <div>
                  <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                  </Box>
                </div>
              </div>
            )
          )}
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className={classex.root}>
        <h1 style={{ color: '#fff', textAlign: 'center' }}>Blogs</h1>
        <div className={classex.flexWrap}>
          {[
            { title: 'LATEST DEPOSITS', condition: false },
            { title: 'LATEST WITHDRAWALS', condition: true },
          ].map((table) => (
            <div
              key={table.title}
              className={classex.listWrap}
              aria-label='list'
            >
              <h1 className={classex.listHeading}>{table.title}</h1>
              <div className={classex.flexWrap}>
                <h3 className={clsx(classex.set, classex.listSubheading)}>
                  Name
                </h3>
                <h3 className={clsx(classex.set, classex.listSubheading)}>
                  Amount
                </h3>
                <h3 className={clsx(classex.set, classex.listSubheading)}>
                  Currency
                </h3>
              </div>
              {news
                .filter((item) => item.WithdrawApproved === table.condition)
                .map((list, index) => (
                  <Paper
                    key={list.Username + list.AmountInvest}
                    className={classex.flexWrap}
                    style={{ backgroundColor: index % 2 ? '#fff' : '#f8f8f8' }}
                  >
                    <div className={clsx(classex.set, classex.avatarWrap)}>
                      <AccountCircleIcon className={classex.avatar} />
                      <span className={clsx(classex.set, classex.text)}>
                        {list.Username}
                      </span>
                    </div>
                    <p className={clsx(classex.set, classex.text)}>
                      ${' '}
                      { list.AmountInvest.toLocaleString()}
                      .00
                    </p>
                    <Avatar
                      alt={'icon'}
                      src={`${
                        list.WalletType === 'Bitcoin'
                          ? bitcoinIcon
                          : list.WalletType === 'Ethereum'
                          ? ethereumIcon
                          : list.WalletType === 'Dogecoin'
                          ? dodgeIcon
                          : bnbIcon
                      }`}
                      className={classex.avatar}
                    />
                  </Paper>
                ))}
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className={classex.root}>
      <h1 style={{ color: '#fff', textAlign: 'center' }}>Blogs</h1>
      <div className={classex.flexWrap}>
        {[
          { title: 'LATEST DEPOSITS', condition: false },
          { title: 'LATEST WITHDRAWALS', condition: true },
        ].map((table) => (
          <div key={table.title} className={classex.listWrap} aria-label='list'>
            <h1 className={classex.listHeading}>{table.title}</h1>
            <div className={classex.flexWrap}>
              <h3 className={clsx(classex.set, classex.listSubheading)}>
                Name
              </h3>
              <h3 className={clsx(classex.set, classex.listSubheading)}>
                Amount
              </h3>
              <h3 className={clsx(classex.set, classex.listSubheading)}>
                Currency
              </h3>
            </div>
            {data
              .filter((item) => item.WithdrawApproved === table.condition)
              .map((list, index) => (
                <Paper
                  key={list.Username + list.AmountInvest}
                  className={classex.flexWrap}
                  style={{
                    backgroundColor: index % 2 ? '#fff' : '#f8f8f8',
                  }}
                >
                  <div className={clsx(classex.set, classex.avatarWrap)}>
                    <AccountCircleIcon className={classex.avatar} />
                    <span className={clsx(classex.set, classex.text)}>
                      {list.Username}
                    </span>
                  </div>
                  <p className={clsx(classex.set, classex.text)}>
                    ${' '}
                    {list.WithdrawApproved
                      ? list.WithdrawAmount.toLocaleString()
                      : list.AmountInvest.toLocaleString()}
                    .00
                  </p>
                  <Avatar
                    alt={'icon'}
                    src={`${
                      list.WalletType === 'Bitcoin'
                        ? bitcoinIcon
                        : list.WalletType === 'Ethereum'
                        ? ethereumIcon
                        : list.WalletType === 'Dogecoin'
                        ? dodgeIcon
                        : bnbIcon
                    }`}
                    className={classex.avatar}
                  />
                </Paper>
              ))}
          </div>
        ))}
      </div>
    </section>
  )
}

const rawData = [
  {
    Username: 'Larsen',
    AmountInvest: 18000,
    WithdrawAmount: 5000,
    DepositVerified: true,
    WithdrawApproved: false,
    WalletType: 'Bitcoin',
  },
  {
    Username: 'Brooklyn',
    AmountInvest: 240,
    WithdrawAmount: 100,
    DepositVerified: true,
    WithdrawApproved: false,
    WalletType: 'Dogecoin',
  },
  {
    Username: 'Turner',
    AmountInvest: 100,
    WithdrawAmount: 100,
    DepositVerified: true,
    WithdrawApproved: false,
    WalletType: 'Ethereum',
  },
  {
    Username: 'Savannah',
    AmountInvest: 1000,
    WithdrawAmount: 500,
    DepositVerified: true,
    WithdrawApproved: false,
    WalletType: 'USDT',
  },
  {
    Username: 'Christian876',
    AmountInvest: 3430,
    WithdrawAmount: 1200,
    DepositVerified: true,
    WithdrawApproved: false,
    WalletType: 'Bitcoin',
  },
  {
    Username: 'Samantha',
    AmountInvest: 6050,
    WithdrawAmount: 4500,
    DepositVerified: true,
    WithdrawApproved: false,
    WalletType: 'Dogecoin',
  },
  {
    Username: 'Laurence',
    AmountInvest: 6000,
    WithdrawAmount: 1400,
    DepositVerified: true,
    WithdrawApproved: false,
    WalletType: 'Bitcoin',
  },
  {
    Username: 'LIM',
    AmountInvest: 50000,
    WithdrawAmount: 800,
    DepositVerified: true,
    WithdrawApproved: false,
    WalletType: 'Dogecoin',
  },
  {
    Username: 'Fayez5550',
    AmountInvest: 580,
    WithdrawAmount: 580,
    DepositVerified: true,
    WithdrawApproved: false,
    WalletType: 'Ethereum',
  },
  {
    Username: 'Christophergtd',
    AmountInvest: 350,
    WithdrawAmount: 200,
    DepositVerified: true,
    WithdrawApproved: true,
    WalletType: 'Ethereum',
  },
  {
    Username: 'Ganefer45',
    AmountInvest: 15000,
    WithdrawAmount: 1500,
    DepositVerified: true,
    WithdrawApproved: true,
    WalletType: 'USDT',
  },
  {
    Username: 'kiemtrieudo',
    AmountInvest: 1670,
    WithdrawAmount: 1000,
    DepositVerified: true,
    WithdrawApproved: true,
    WalletType: 'Bitcoin',
  },
  {
    Username: 'Andrew879',
    AmountInvest: 15010,
    WithdrawAmount: 15800,
    DepositVerified: true,
    WithdrawApproved: true,
    WalletType: 'Dogecoin',
  },
  {
    Username: 'Abdullah',
    AmountInvest: 25000,
    WithdrawAmount: 2600,
    DepositVerified: true,
    WithdrawApproved: true,
    WalletType: 'Ethereum',
  },
  {
    Username: 'Andrew889',
    AmountInvest: 500,
    WithdrawAmount: 500,
    DepositVerified: true,
    WithdrawApproved: true,
    WalletType: 'USDT',
  },
  {
    Username: 'Natalie897',
    AmountInvest: 2015,
    WithdrawAmount: 1000,
    DepositVerified: true,
    WithdrawApproved: true,
    WalletType: 'Bitcoin',
  },
  {
    Username: 'Aubrey',
    AmountInvest: 6750,
    WithdrawAmount: 5800,
    DepositVerified: true,
    WithdrawApproved: true,
    WalletType: 'Dogecoin',
  },
  {
    Username: 'Jason',
    AmountInvest: 1230,
    WithdrawAmount: 1000,
    DepositVerified: true,
    WithdrawApproved: true,
    WalletType: 'Ethereum',
  },
  {
    Username: 'LIM',
    AmountInvest: 7560,
    WithdrawAmount: 4800,
    DepositVerified: true,
    WithdrawApproved: true,
    WalletType: 'Dogecoin',
  },
]
