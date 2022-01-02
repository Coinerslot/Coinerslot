import React from 'react'
import clsx from 'clsx'
import { useStyles } from './styles'
import { useCustomStyles } from '../../../constants/styles'
import sideImage from '../../../libs/Data/img/showcase.jpg'
import certImage from '../../../libs/Data/img/coinerslotCert.jpg'

export default function App() {
  const classes = useCustomStyles()
  const classex = useStyles()
  return (
    <section
      className={classes.rootContainer}
      style={{
        marginBottom: '5%',
      }}
    >
      <h1 className={classex.headText}>ABOUT US</h1>
      <div className={classex.headTextBorder} />
      <div className={classex.wrapper}>
        <img
          src={sideImage}
          alt='aboutus'
          className={clsx(classes.slideUpToDown, classex.image)}
        />
        <p className={clsx(classes.slideDownToUp, classex.paragraph)}>
          coinerslot is one of the leading crypto investment platform of the 21
          century who are serving the profit share policy to all investors. We
          are renowned cryptocurrency trading company incorporated on 18 January
          2018. coinerslot have a long history of serving investors from major
          native wallet to make profit on weekly basis. Binance, Blockchain,
          Coinmama and other native wallets investors are also part of this
          large community. With the help of our advanced trading systems and
          partners (Bitsgap and HAASOnline), we have been able to break barriers
          in cryptocurrency investment. Our systems make use of advanced
          automated computer programs that short and long at the best time. If
          you find yourself here, you are definitely in search of reliable and
          profitable investment. Yes, you are just at the right place! Our
          company offers trust assets management of the highest quality on the
          basis of foreign exchange and profitable trade through cryptocurrency.
        </p>
      </div>
      <div className={classex.wrapper}>
        <p className={classex.middleParagraph}>
          There is no other worldwide financial market that can guarantee an
          hourly ability to generate constant profit with the large price swings
          of bitcoin and other crypto currencies. Proposed modalities for
          strengthening cooperation will be accepted by anyone who uses
          cryptocurrency and knows about its fantastic
          prospects.www.coinerslot.com investment project is a product of
          careful preparation and fruitful work of experts in the field of
          advanced bots trading, highly profitable mining of cryptocurrencies
          and online marketing. Using modern methods of doing business and a
          personal approach to each client, we offer a unique investment model
          to people who want to use cryptocurrencies not only as a method of
          payment, but also as a reliable source of stable income. Your deposit
          is working on an ongoing basis, and makes profit every hour with the
          ability to withdraw profit.
        </p>
      </div>
      <div className={classex.wrapper}>
        <p className={classex.paragraph}>
          This proposal would be interesting not only for beginners of
          cryptocurrency operation, but also for experienced online investors.
          coinerslot uses only modern mining equipment and trades at the most
          stable markets, which minimizes the risk of financial loss to
          customers and guarantees them a stable income accrued every week. Join
          our company today and start making high profits! Our mission is to
          increase financial freedom in the world Everyone deserves access to
          financial services that can help empower them to create a better life
          for themselves and their families. If the world economy ran on a
          common set of standards that could not be manipulated by any company
          or country, the world would be a more fair and free place, and human
          progress would accelerate. Customer focus We are deeply focused on
          solving our customers' problems with technology to create profits by
          enabling them to acquire, store and actively invest crypto. We strive
          to be the easiest to use, most trusted and most secure platform. In
          every decision we make, we ask, "How does this create more value for
          our customers?".
        </p>
        <img src={certImage} alt='certificate' className={classex.image} />
      </div>
    </section>
  )
}
