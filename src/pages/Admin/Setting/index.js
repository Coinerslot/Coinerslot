import clsx from 'clsx'
import React from 'react'
import { useQuery } from 'react-query'
import { updateInvestPlans } from '../../../config'
import { makeStyles } from '@material-ui/core/styles'
import { Button, InputLabel } from '@material-ui/core'
import { collection, getDocs } from 'firebase/firestore'
import { Box, CircularProgress } from '@material-ui/core'
import { FormControl, OutlinedInput, Paper } from '@material-ui/core'
import { useCustomStyles } from '../../../constants/styles'
import { db } from '../../../config'

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
  payAddressWrap: {
    margin: 0,
    width: '90%',
  },
  payAddress: {
    margin: '2%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
      gap: '2%',
      width: '90%',
      margin: '2% 0',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
    },
  },
  investWrap: {
    margin: '0 0 5%',
    width: '90%',
    display: 'block',
    [theme.breakpoints.up('md')]: {
      width: '90%',
      display: 'flex',
      justifyContent: 'space-between',
    },
  },

  investCard: {
    padding: 0,
    opacity: 1,
    width: '100%',
    display: 'flex',
    margin: '0 1%',
    minWidth: '4rem',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundSize: 'cover',
    justifyContent: 'center',
    backgroundRepeat: 'no-repeat',
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(0.5),
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      minHeight: 350,
      minWidth: 240,
      width: '20%',
    },
  },

  text: {
    margin: theme.spacing(0.3),
    fontSize: '5pt',
    textAlign: 'center',
  },

  investBtn: {
    fontSize: '7pt',
    color: '#004beb',
    [theme.breakpoints.up('md')]: {
      fontSize: '14pt',
    },
  },
  textField: {
    margin: '2% 0%',
  },
  logbtnWrap: {
    width: '90%',
    display: 'flex',
    justifyContent: 'space-around',
    margin: '1rem auto',
    padding: 1,
  },

  divider: {
    width: '60%',
    margin: '3% 0',
    borderWidth: 5,
    backgroundColor: '#000',
  },
  modal: {
    top: '30%',
    left: '40%',
    zIndex: 100,
    padding: '1%',
    width: '65%',
    minWidth: 260,
    maxWidth: 320,
    borderRadius: '2%',
    position: 'fixed',
    backgroundColor: '#cacaca',
    [theme.breakpoints.up('md')]: {
      minWidth: 400,
      maxWidth: 500,
    },
  },
}))

export default function Index() {
  const classex = useStyles()
  const classes = useCustomStyles()
  const [isOpen, setIsOpen] = React.useState(false)
  const [response, setResponse] = React.useState({ state: true, message: '' })
  const { isLoading, error, data, refetch } = useQuery(
    'registerdUser',
    async () => {
      let investArr = []
      let walletArr = []
      const queryInvestDB = await getDocs(collection(db, 'investPlans'))
      const queryWalletDB = await getDocs(collection(db, 'walletAddress'))
      queryInvestDB.docs.forEach((doc) => investArr.push(doc.data()))
      queryWalletDB.docs.forEach((doc) => walletArr.push(doc.data()))
      setWallets(walletArr)
      return investArr
    }
  )
  const [wallets, setWallets] = React.useState([
    {
      name: 'Bitcoin',
      address: 'bc1qw3g5t834vrtfcmddq7acku0fkp6euwff9nwzcp',
    },
    {
      name: 'Ethereum',
      address: '0x930696C71D7e1dE989309220CE846A53aF2e396B',
    },
    {
      name: 'USDT',
      address: '0x930696C71D7e1dE989309220CE846A53aF2e396B',
    },
    {
      name: 'XRP',
      address: 'r9Lq87AvKDzSDrbHerDJUZMiW24Cj9xvmw',
    },
    {
      name: 'Dogecoin',
      address: 'DHUk1BvgrLfPMtx76xA6bbxYBApwFAj8q2',
    },
    {
      name: 'XLM',
      address: 'GDMKVCADSWK5C6AFL4W3CX4MJVWQLPNRYVIMNJC3NTJFI5RBUDQZFRTH',
    },
  ])

  const [values, setValues] = React.useState({
    min0: data[0]?.min,
    min1: data[1]?.min,
    min2: data[2]?.min,
    min3: data[3]?.min,
    max0: data[0]?.max,
    max1: data[1]?.max,
    max2: data[2]?.max,
    max3: data[3]?.max,
    name0: wallets[0]?.name,
    name1: wallets[1]?.name,
    name2: wallets[2]?.name,
    name3: wallets[3]?.name,
    name4: wallets[4]?.name,
    name5: wallets[5]?.name,
    title0: data[0]?.title,
    title1: data[1]?.title,
    title2: data[2]?.title,
    title3: data[3]?.title,
    percent0: data[0]?.percent,
    percent1: data[1]?.percent,
    percent2: data[2]?.percent,
    percent3: data[3]?.percent,
    address0: wallets[0]?.address,
    address1: wallets[1]?.address,
    address2: wallets[2]?.address,
    address3: wallets[3]?.address,
    address4: wallets[4]?.address,
    address5: wallets[5]?.address,
    duration0: data[0]?.duration,
    duration1: data[1]?.duration,
    duration2: data[2]?.duration,
    duration3: data[3]?.duration,
    durationText0: data[0]?.durationText,
    durationText1: data[1]?.durationText,
    durationText2: data[2]?.durationText,
    durationText3: data[3]?.durationText,
  })

  if (isLoading) {
    return (
      <div>
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <h3 style={{ textAlign: 'center', marginTop: '10%' }}>
          An error has occurred: {error.message}
        </h3>
      </div>
    )
  }

  const handleChange = (event) => {
    const value = event.target.value
    setValues({ ...values, [event.target.name]: value })
  }

  const alertMessage = () => {
    refetch()
    setIsOpen(true)
    setTimeout(() => {
      setIsOpen(false)
    }, 3000)
  }

  const handleSaveChanges = () => {
    updateInvestPlans('plan0', {
      title: values.title0,
      percent: values.percent0,
      duration: values.duration0,
      durationText: values.durationText0,
      min: values.min0,
      max: values.max0,
    })

    updateInvestPlans('plan1', {
      title: values.title1,
      percent: values.percent1,
      duration: values.duration1,
      durationText: values.durationText1,
      min: values.min1,
      max: values.max1,
    })
    updateInvestPlans('plan2', {
      title: values.title2,
      percent: values.percent2,
      duration: values.duration2,
      durationText: values.durationText2,
      min: values.min2,
      max: values.max2,
    })
    updateInvestPlans('plan3', {
      title: values.title3,
      percent: values.percent3,
      duration: values.duration3,
      durationText: values.durationText3,
      min: values.min3,
      max: values.max3,
    }).then((res) => {
      setResponse({ state: res.state, message: res.message })
      alertMessage()
    })
  }

  const Modal = () => {
    return (
      <div className={classex.modal}>
        <h1 style={{ textAlign: 'center', color: response.state }}>
          {response.message}
        </h1>
      </div>
    )
  }

  return (
    <div style={{ justifyContent: 'center' }}>
      {isOpen && <Modal />}
      <h1
        className={classes.text}
        style={{ textAlign: 'center', marginTop: '1%' }}
      >
        Payment Wallets
      </h1>
      <div className={classex.payAddresstWrap}>
        <div>
          {[
            {
              name: values.name0,
              address: values.address0,
            },
            {
              name: values.name1,
              address: values.address1,
            },
            {
              name: values.name2,
              address: values.address2,
            },
            {
              name: values.name3,
              address: values.address3,
            },
            {
              name: values.name4,
              address: values.address4,
            },
            {
              name: values.name5,
              address: values.address5,
            },
          ].map((list, index) => (
            <div className={classex.payAddress}>
              <React.Fragment>
                <FormControl style={{ width: '30%' }} variant='outlined'>
                  <InputLabel htmlFor='outlined-adornment-wallet-Name'>
                    Title
                  </InputLabel>
                  <OutlinedInput
                    type={'text'}
                    value={list.name}
                    name={`name${index}`}
                    onChange={handleChange}
                    id='outlined-adornment-wallet-Name'
                    labelWidth={30}
                  />
                </FormControl>
                <FormControl style={{ width: '70%' }} variant='outlined'>
                  <InputLabel htmlFor='outlined-adornment-address'>
                    Wallet Address
                  </InputLabel>
                  <OutlinedInput
                    type={'text'}
                    labelWidth={100}
                    value={list.address}
                    onChange={handleChange}
                    name={`address${index}`}
                    id='outlined-adornment-address'
                  />
                </FormControl>
              </React.Fragment>
            </div>
          ))}
        </div>
      </div>
      <Button
        size='small'
        color='primary'
        variant='outlined'
        style={{ width: '40%', margin: '3% 30% 5%' }}
        onClick={handleSaveChanges}  
        className={clsx(classes.slideDownToUp, classex.investBtn)}
      >
        Save Wallet Changes
      </Button>
      <h1
        className={classes.text}
        style={{ textAlign: 'center', marginTop: '1%' }}
      >
        Investment Plans
      </h1>
      <div className={classex.investWrap}>
        {[
          {
            title: values.title0,
            percent: values.percent0,
            duration: values.duration0,
            durationText: values.durationText0,
            min: values.min0,
            max: values.max0,
          },
          {
            title: values.title1,
            percent: values.percent1,
            duration: values.duration1,
            durationText: values.durationText1,
            min: values.min1,
            max: values.max1,
          },
          {
            title: values.title2,
            percent: values.percent2,
            duration: values.duration2,
            durationText: values.durationText2,
            min: values.min2,
            max: values.max2,
          },
          {
            title: values.title3,
            percent: values.percent3,
            duration: values.duration3,
            durationText: values.durationText3,
            min: values.min3,
            max: values.max3,
          },
        ].map((list, index) => (
          <Paper key={list.title + index} className={classex.investCard}>
            {[
              {
                name: `${index}`,
                value: list.title,
                disabled: true,
                label: 'Title',
              },
              {
                name: `percent${index}`,
                value: list.percent,
                disabled: false,
                label: 'Percentage',
              },
              {
                name: `duration${index}`,
                label: 'Duration Value',
                value: list.duration,
                disabled: false,
              },
              {
                name: `durationText${index}`,
                label: 'Duration Label',
                value: list.durationText,
                disabled: false,
              },
              {
                name: `min${index}`,
                label: 'Min Amount',
                value: list.min,
                disabled: false,
              },
              {
                name: `max${index}`,
                label: 'Max Amount',
                value: list.max,
                disabled: false,
              },
            ].map((plan) => (
              <FormControl className={classex.textField} variant='outlined'>
                <InputLabel htmlFor='outlined-adornment-plana'>
                  {plan.label}
                </InputLabel>
                <OutlinedInput
                  id='outlined-adornment-plans'
                  type={'text'}
                  name={plan.name}
                  value={plan.value}
                  disabled={plan.disabled}
                  labelWidth={plan.label.length * 7.8}
                  onChange={handleChange}
                />
              </FormControl>
            ))}
          </Paper>
        ))}
      </div>
      <Button
        size='small'
        color='primary'
        variant='outlined'
        style={{ width: '60%', margin: '0 20% 5%' }}
        onClick={handleSaveChanges}
        className={clsx(classes.slideDownToUp, classex.investBtn)}
      >
        SAVE CHANGES
      </Button>
    </div>
  )
}
