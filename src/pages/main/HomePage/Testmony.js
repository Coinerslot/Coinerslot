import React from 'react'
import clsx from 'clsx'
import { Divider } from '@material-ui/core'
import bgImage from '../../../libs/Data/img/whyUs.png'
import checked from '../../../libs/Data/img/checked.png'
import { makeStyles } from '@material-ui/core/styles'
import sideImage from '../../../libs/Data/img/noteMan.png'
import { useCustomStyles } from '../../../constants/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    width: '100%',
    height: 'auto',
    backgroundImage: `url(${bgImage})`,
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
    marginTop: -8,
    width: '20%',
    margin: '0 auto',
    borderBottom: '1px solid #24B7F0',
    [theme.breakpoints.up('md')]: {
      width: '15%',
    },
  },
  textWrap: {
    display: 'flex',
    padding: '5%',
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
  text: {
    margin: 0,
    width: '70%',
    fontSize: '8pt',
    textAlign: 'justify',
    [theme.breakpoints.up('md')]: {
      fontSize: 14,
    },
  },
  textListWrap: {
    margin: '1px 0',
    width: '90%',
    display: 'flex',
    alignItems: 'center',
    fontSize: '7pt',
    [theme.breakpoints.up('md')]: {
      fontSize: 18,
      margin: 2,
    },
  },
  textListIcon: {
    width: 10,
    height: 10,
    [theme.breakpoints.up('md')]: {
      width: 20,
      height: 20,
    },
  },
  textList: {
    margin: 0,
    [theme.breakpoints.up('md')]: {
      margin: 2,
    },
  },
  paperWrap: {
    width: '90%',
    display: 'flex',
    borderRadius: 5,
    padding: '3% 0',
    margin: '0 auto',
    alignItems: 'center',
    border: '1px solid #22C2FF',
    backgroundColor: '#cacaca',
    marginTop: theme.spacing(3),
    justifyContent: 'space-around',
  },
  paper: {
    display: 'flex',
    fontSize: '3pt',
    fontWeight: 'bold',
    height: 20,
    width: 'auto',
    alignItems: 'center',
    borderRadius: theme.spacing(0.5),
    [theme.breakpoints.up('md')]: {
      borderRadius: theme.spacing(1),
      paddingLeft: 0,
      height: 40,
      fontSize: '3pt',
    },
  },
  paperIcon: {
    margin: 0,
    height: 10,
    width: '12%',
    color: '#22C2FF',
    [theme.breakpoints.up('md')]: {
      height: 40,
    },
  },
  paperText: {
    margin: 0,
    height: 10,
    width: '90%',
    paddingTop: '8%',
    [theme.breakpoints.up('md')]: {
      paddingTop: '3%',
      height: 30,
    },
  },
}))

export default function Testmony() {
  const classes = useCustomStyles()
  const classex = useStyles()

  return (
    <section className={clsx(classex.root, classes.bgStyles)}>
      <h1 className={classex.headText}>WHY CHOOSE US !</h1>
      <Divider className={classex.headTextBorder} />
      <div className={classex.textWrap}>
        <div>
          <p className={classex.text}>
            With a large investor community, we can assure you the best profit
            earning opportunity. So grab the chance and ensure your equal share
            from us. Because we want to grow with your development in this
            trading industry. So make it happen now!
          </p>
          {[
            'Easy Investment & Withdrawals System',
            'Legal & UK Registered Compnay',
            'Storng DDoS Protection Server',
            'Professional Management Team',
            'Comodo Green Bar EV-SSL Security',
            'UK Office Hours Online Support',
            '24/7 Hours Telegram Support',
          ].map((item) => (
            <div key={item} className={classex.textListWrap}>
              <img
                src={`${checked}`}
                alt='checked'
                className={classex.textListIcon}
              />
              <h5 className={classex.textList}>{item}</h5>
            </div>
          ))}
        </div>
        <img
          src={`${sideImage}`}
          alt='sideImade'
          className={classex.sideImage}
        />
      </div>
    </section>
  )
}
