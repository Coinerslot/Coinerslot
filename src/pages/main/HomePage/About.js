import clsx from 'clsx'
import React from 'react'
import { useSetRecoilState } from 'recoil'
import { makeStyles } from '@material-ui/styles'
import { currentHomeScreen } from '../../../recoil'
import sideImage from '../../../libs/Data/img/sideImage.jpeg'
import { useCustomStyles } from '../../../constants/styles'
import UtilButton from '../../../components/UtilButton'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    width: '100%',
    height: 'auto',
    padding: '2% 0 5%',
    alignItems: 'center',
    borderBottom: '0.5px solid #24B7F0',
  },
  wrapper: {
    width: '90%',
    padding: '3%',
    fontSize: '6pt',
    textAlign: 'justify',
    [theme.breakpoints.up('md')]: {
      width: '90%',
      fontSize: 14,
    },
  },
  headText: {
    fontSize: 16,
    [theme.breakpoints.up('md')]: {
      fontSize: 35,
    },
  },
  headTextBorder: {
    width: '20%',
    margin: '0 1%',
    marginTop: -5,
    borderBottom: '2px solid #24B7F0',
  },
  sideImage: {
    width: '25%',
    height: '50%',
    margin: 0,
    fontSize: '8pt',
    textAlign: 'justify',
    [theme.breakpoints.up('md')]: {
      fontSize: 14,
      width: '30%',
      height: '20%',
    },
  },
  btn: {
    width: '50%',
    height: 20,
    color: '#fff',
    textAlign: 'center',
    fontSize: '6pt',
    padding: `${theme.spacing(1)}px ${theme.spacing(1)}px ${theme.spacing(
      1
    )}px`,
    [theme.breakpoints.up('md')]: {
      width: '40%',
      height: 40,
      margin: '0 auto',
      marginTop: '2%',
    },
  },
}))
export default function About() {
  const classes = useCustomStyles()
  const classex = useStyles()
  const setScreen = useSetRecoilState(currentHomeScreen)
  return (
    <section className={clsx(classex.root, classes.bgStyles)}>
      <div className={classex.wrapper}>
        <h1 className={classex.headText}>ABOUT COINERSLOT</h1>
        <div className={classex.headTextBorder} />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <p style={{ width: '50%' }}>
            coinerslot is one of the leading crypto investment platform of the
            21 century who are serving the profit share policy to all investors.
            We are renowned cryptocurrency trading company incorporated on 18
            January 2018. coinerslot have a long history of serving investors
            from major native wallet to make profit on weekly basis. Binance,
            Blockchain, Coinmama and other native wallets investors are also
            part of this large community. With the help of our advanced trading
            systems and partners (Bitsgap and HAASOnline), we have been able to
            break barriers in cryptocurrency investment. Our systems make use of
            advanced automated computer programs that short and long at the best
            time. If you find yourself here, you are definitely in search of
            reliable and profitable investment. Yes, you are just at the right
            place! Our company offers trust assets management of the highest
            quality on the basis of foreign exchange and profitable trade
            through cryptocurrency.
          </p>
          <img
            src={`${sideImage}`}
            alt='sideImade'
            className={classex.sideImage}
          />
        </div>
        <UtilButton
          text='READ MORE ABOUT US'
          onClick={() => setScreen('About')}
        />
      </div>
    </section>
  )
}
