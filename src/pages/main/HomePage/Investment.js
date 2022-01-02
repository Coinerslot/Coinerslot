import clsx from 'clsx'
import React from 'react'
import { Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { collection, getDocs } from 'firebase/firestore'
import { Button, Avatar, Divider } from '@material-ui/core'
import { useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil'
import { userAccount, mrWorker, profileScreen } from '../../../recoil'
import { isAuthenticated, investPlans } from '../../../recoil'
import { useCustomStyles } from '../../../constants/styles'
import UtilButton from '../../../components/UtilButton'
import { currentHomeScreen } from '../../../recoil'
import { db } from '../../../config'
import Purchase from './Purchase'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    width: '100%',
    height: 'auto',
    padding: '2% 0 5%',
    alignItems: 'center',
    borderBottom: '0.5px solid #24B7F0',
  },
  headText: {
    fontSize: 16,
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
      fontSize: 35,
    },
  },
  headTextBorder: {
    borderBottom: '2px solid #24B7F0',
    textAlign: 'center',
    margin: '0 auto',
    marginBottom: 10,
    marginTop: -5,
    width: '25%',
  },
  investWrap: {
    width: '90%',
    fontSize: 14,
    display: 'flex',
    margin: '2% auto',
    justifyContent: 'space-between',
  },

  investCard: {
    padding: 0,
    opacity: 1,
    width: '100%',
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(0.5),
    display: 'flex',
    margin: '0 1%',
    minWidth: '4rem',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      minHeight: 350,
      minWidth: 270,
      width: '20%',
    },
  },
  investHeading: {
    marginTop: 5,
    fontSize: 12,
    [theme.breakpoints.up('md')]: {
      fontSize: 25,
      marginTop: -5,
    },
  },
  avatar: {
    width: 30,
    height: 15,
    fontSize: '5pt',
    backgroundColor: '#000',
    [theme.breakpoints.up('md')]: {
      height: 35,
      width: 70,
    },
  },
  text: {
    margin: theme.spacing(0.3),
    fontSize: '5pt',
    textAlign: 'center',
  },
  investBtn: {
    marginTop: -6,
    fontSize: '7pt',
    color: '#004beb',
    [theme.breakpoints.up('md')]: {
      fontSize: '14pt',
    },
  },

  logbtnWrap: {
    width: '90%',
    display: 'flex',
    justifyContent: 'space-around',
    margin: '1rem auto',
    padding: 1,
  },

  calcWrap: {
    width: '90%',
    padding: '3% 0',
    display: 'flex',
    margin: '1rem auto',
    alignItems: 'center',
    borderRadius: '10px',
    flexDirection: 'column',
    justifyContent: 'center',
    border: '1px solid #000',
    marginTop: theme.spacing(3),
  },
  calcbtn: {
    margin: 5,
    padding: 1,
    width: 150,
    borderRadius: 5,
    backgroundColor: '#fff',
    [theme.breakpoints.up('md')]: {
      fontSize: '14pt',
      width: 260,
    },
  },
  calcPaperWrap: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
  },

  calcPaper: {
    height: 20,
    width: '20%',
    color: '#fff',
    display: 'flex',
    minWidth: '4rem',
    paddingLeft: '1%',
    alignItems: 'center',
    backgroundColor: '#000',
    border: '0.5px solid #000',
    margin: theme.spacing(0.2),
    marginTop: theme.spacing(2),
    borderRadius: theme.spacing(0.5),
    [theme.breakpoints.up('md')]: {
      borderRadius: theme.spacing(1),
      minWidth: 270,
      height: 40,
    },
  },

  calcPaperLftxt: {
    width: 50,
    fontSize: '3pt',
    [theme.breakpoints.up('md')]: {
      fontSize: '12pt',
      width: 135,
    },
  },
  calcPaperSelect: {
    width: 50,
    color: '#fff',
    height: '100%',
    fontSize: '5pt',
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
    backgroundColor: '#004beb',
    [theme.breakpoints.up('md')]: {
      borderBottomRightRadius: 5,
      borderTopRightRadius: 5,
      fontSize: '14pt',
      height: '95%',
      width: 135,
    },
  },
  calcPaperInput: {
    border: 0,
    width: 40,
    height: '87%',
    fontSize: '5pt',
    outline: 'none',
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
    [theme.breakpoints.up('md')]: {
      borderBottomRightRadius: 5,
      borderTopRightRadius: 5,
      fontSize: '14pt',
      height: '90%',
      width: 135,
    },
  },
  calcPaperRttxt: {
    width: 40,
    color: '#fff',
    height: '70%',
    fontSize: '5pt',
    paddingTop: '8%',
    textAlign: 'center',
    borderTopRightRadius: 2,
    backgroundColor: '#004beb',
    borderBottomRightRadius: 2,
    [theme.breakpoints.up('md')]: {
      borderBottomRightRadius: 5,
      borderTopRightRadius: 5,
      fontSize: '14pt',
      paddingTop: '2%',
      height: '90%',
      width: 135,
    },
  },

  divider: {
    width: '60%',
    margin: '3% 0',
    borderWidth: 5,
    backgroundColor: '#000',
  },
}))

export default function Investment() {
  const classex = useStyles()
  const classes = useCustomStyles()
  const isLogin = useRecoilValue(isAuthenticated)
  const setScreen = useSetRecoilState(currentHomeScreen)
  const setProfileScreen = useSetRecoilState(profileScreen)
  const { netPercentage, netReturn } = useRecoilValue(mrWorker)
  const [investData, setInvestmentData] = useRecoilState(investPlans)
  const [selectedValue, setSelectedValue] = useRecoilState(userAccount)

  React.useEffect(() => {
    let ignore = false
    const fetchdata = async () => {
      let alldataArr = []
      const queryBlackList = await getDocs(collection(db, 'investPlans'))
      if (queryBlackList) {
        queryBlackList.docs.forEach((doc) => alldataArr.push(doc.data()))
        !ignore && setInvestmentData(alldataArr)
      }
    }
    fetchdata()
    return () => (ignore = true)
  }, [setInvestmentData])

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
          })
      }
    })
  }

  const handleInvest = () => {
    if (isLogin) {
      setScreen('Profile')
      return setTimeout(() => setProfileScreen('deposit'), 200)
    }
    setScreen('Signup')
  }

  return (
    <section className={clsx(classex.root, classes.bgStyles)}>
      <h1 className={classex.headText}>OUR INVESTMENT PLANS</h1>
      <div className={classex.headTextBorder} />
      <div className={classex.investWrap}>
        {investData.map((list, index) => (
          <Paper key={list.title + index} className={classex.investCard}>
            <h3 className={clsx(classes.slideUpToDown, classex.investHeading)}>
              {list.title}
            </h3>
            <Avatar className={clsx(classes.slideRightToLeft, classex.avatar)}>
              {list.percent}%
            </Avatar>
            <Divider className={classex.divider} />
            <p className={classex.text}>{list.durationText} </p>
            <p className={classex.text}>Min: {list.min} </p>
            <p className={classex.text}>Max: {list.max} </p>
            <p className={classex.text}>Instant withdrawal</p>
            <Divider className={classex.divider} />
            <Button
              size='small'
              color='primary'
              variant='text'
              onClick={handleInvest}
              className={clsx(classes.slideDownToUp, classex.investBtn)}
            >
              INVEST NOW
            </Button>
          </Paper>
        ))}
      </div>

      {!isLogin && (
        <div className={classex.logbtnWrap}>
          <UtilButton text='LOG IN' onClick={() => setScreen('Signin')} />
          <UtilButton
            text='OPEN AN ACCOUNT'
            color='primary'
            onClick={() => setScreen('Signup')}
          />
        </div>
      )}

      <div className={classex.calcWrap}>
        <Button size='small' variant='contained' className={classex.calcbtn}>
          PROFIT CALCULATOR
        </Button>

        <div className={classex.calcPaperWrap}>
          <Paper className={classex.calcPaper}>
            <p className={classex.calcPaperLftxt}>Select Plan :</p>

            <select
              name='SelectedPercent'
              onChange={handleChange}
              className={classex.calcPaperSelect}
            >
              {investData.map((list) => (
                <option key={list.title} value={list.percent}>
                  {list.title}
                </option>
              ))}
            </select>
          </Paper>

          <Paper className={classex.calcPaper}>
            <p className={classex.calcPaperLftxt}>Deposit Amount: </p>
            <input
              className={classex.calcPaperInput}
              type='number'
              name='AmountInvest'
              placeholder='e.g $100'
              onChange={handleChange}
            />
          </Paper>

          <Paper className={classex.calcPaper}>
            <p className={classex.calcPaperLftxt}>Net Profit :</p>
            <p className={classex.calcPaperRttxt}>${netPercentage}.00</p>
          </Paper>

          <Paper className={classex.calcPaper}>
            <p className={classex.calcPaperLftxt}>Total Return :</p>
            <p className={classex.calcPaperRttxt}>${netReturn}.00</p>
          </Paper>
        </div>
      </div>

      <Purchase />
    </section>
  )
}
