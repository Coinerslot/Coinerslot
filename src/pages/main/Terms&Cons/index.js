import React from 'react'
import clsx from 'clsx'
import { Container, Checkbox } from '@material-ui/core'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { Button, CircularProgress } from '@material-ui/core'

import { useStyles } from './styles'
import { currentHomeScreen, TandC } from '../../../recoil'

export default function CircularIntegration() {
  const classes = useStyles()
  const timer = React.useRef()
  const [success, setSuccess] = useRecoilState(TandC)
  const [loading, setLoading] = React.useState(false)
  const setScreen = useSetRecoilState(currentHomeScreen)
  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  })

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current)
    }
  }, [])

  const handleButtonClick = () => {
    setLoading(true)
    timer.current = window.setTimeout(() => {
      setSuccess(!success)
      setLoading(false)
      setScreen('Signup')
    }, 2000)
  }

  return (
    <Container className={classes.root}>
      <h1 className={classes.heading}>Terms and Conditions</h1>
      <p className={classes.heading}>
        Please read the following rules carefully before signing in.
      </p>
      <p className={classes.text}>
        This agreement governs the relationship between coinerslot.com
        (hereinafter referred to as the the Company) and the User (hereinafter
        referred to as the User). This agreement is a public offer. By
        registering on the Website https://coinerslot.com you automatically
        agree that: - you are a legally capable person. - you are familiarized
        with the terms of the Agreement in full before using the Service. - you
        accept all the terms of the Agreement in full without any exceptions or
        restrictions on your part and you agree to abide by them or to
        discontinue using the Service. If you do not agree with the terms of
        this Agreement, you should immediately stop any use of the Service. -
        The agreement (including any of its parts) may be amended by the
        Administration without any special notice. The new edition of the
        Agreement shall enter into force on the date of its posting on the
        Website of administration or after bringing to the notice of the User in
        another convenient form, unless otherwise provided by the new edition of
        the Agreement. Concepts and definitions: The following terms and
        definitions are used in this document and in the relations of the
        Parties arising from this document or related hereto: Administration:
        the administration of the Website https://coinerslot.com authorized to
        carry out activities on behalf of the Company. Investment: funds
        transferred by the User in favor of the Company within the framework of
        an investment deposit. Day: 1 calendar day starting at 00:00:00 and
        ending at 23:59:59 in the time zone of the User. Investment deposit: a
        financial instrument to generate profit. User: a legally capable person
        who agreed to the terms of this Agreement and registered on the Website
        of the Company. Website: the Website located at https://coinerslot.com
        Agreement - this agreement with all additions and amendments.
        Transaction: cash flow in the currency available for the activity in
        favor of the Company or the User. 1. General Provisions 1.1. Use of the
        functionalities of the Service is allowed only after the User’s
        registration and authorization on the Website in accordance with the
        procedure established by the Administration. 1.2. Login and password
        chosen by the User are necessary and sufficient information for the
        User’s access to the Website. The User is not entitled to transfer
        his/her login and password to the third parties and is fully responsible
        for their safety and have independence to choose the storage method.
        1.3. The User opens the deposit by transferring funds to the Company in
        one of the available currencies. The list of available currencies is
        publicly available on the Website of the Company. 1.4. Each transaction
        is confirmed by the invoice and is governed by the law on the electronic
        analog of handwritten signature. 1.5. The User is aware that running
        business is subject to risks and is willing to accept the consequences
        of the negative external factors that may lead to financial losses. 2.
        Rights and Obligations of the Company 2.1 The company ensures safety of
        the personal data of the User. 2.2 The Company guarantees technical and
        informational support to the Users. 2.3. The Company ensures security of
        the transactions and guarantees the timely fulfillment of obligations
        for their conduct in accordance with the regulations of the Company.
        2.4. The Сompany shall not be responsible for the actions of transfer
        systems, banks, payment systems and for delays associated with their
        work. 2.5. The Company shall not be financially liable for the incorrect
        details filled in by the User when withdrawing funds. 2.6. The Company
        is not responsible for delays or failures during transaction process
        resulting from force majeure, as well as any malfunction in
        telecommunications, computer, electrical and other related systems. 2.7.
        The Company is not responsible for the improper functioning of the
        Website, if the User does not have the necessary software to use it, and
        the Company has no obligation to provide the Users with such software.
        3. Rights and Obligations of the User 3.1. The User shall be personally
        liable for maintaining confidentiality of the account data including the
        password, as well as for all activities carried out from the User’s
        account without exception. 3.2. The user shall immediately notify the
        Administration of the Website of the unauthorized use of his/her account
        or password or any other security breach. 3.3. The User agrees to the
        processing of personal information in accordance with the provisions set
        out in the legislation. 3.4. The User shall bear full financial and
        legal responsibility for the accuracy of the information provided in the
        withdrawal form. 3.5. The User independently pays taxes on profits and
        declares income received to the tax office at the place of registration
        3.6. The User undertakes to independently study and comply with all the
        rules of the Website. 3.7. The User undertakes not to use the Website
        for dissemination of the advertising information otherwise than with the
        consent of the Administration of the Website. 4. Copyright 4.1. The
        content of the Website https://coinerslot.com may not be copied,
        published, reproduced, transmitted or distributed in any way, as well as
        posted in the Internet. 4.2. The content of the Website is copyrighted,
        protected by trademark law and other laws related to intellectual
        property and by unfair competition law. 4.3. Information about the
        Company can be used by the User within the Affiliate Program with
        obligatory reference to the source of information. 5. Force Majeure 5.1.
        Force majeure implies the impossibility of carrying out transactions and
        business activities, as well as the fulfillment of all obligations in
        standard mode. 5.2. At the time of force majeure (legislative
        amendments, natural disasters, military situations, etc.) the Company
        has the right to suspend 6. Amendments and Supplements 6.1. The
        Administration of the Website has the right to amend the Website terms
        and conditions of use, as well as to amend the content of this
        Agreement. Amendments come into force upon publication of the new
        version of the Agreement on the Website. 7. Risks 7.1. The User agrees
        that the investment activity is associated with risks and understands
        that, under certain circumstances, revenues may be less than those
        declared by the Company due to circumstances beyond the control of the
        Company's management. 7.2. The work of the Company directly depends on
        the volume of incoming investments, thus, it is important to daily
        provide with the necessary amount. 7.3. The company is not liable for
        any losses caused by sharing of passwords or theft of personal data. We
        strongly recommend that you keep your information for authentication and
        access to your personal profile, email and settings as secure as
        possible. Do not disclose your personal data to third parties. 8.
        Additional Terms and Conditions 8.1. The Administration of the Website
        does not accept counter-offers from the User regarding the amendments to
        the User Agreement. 8.2. The User reviews posted on the Website are not
        confidential and may be used by the Administration of the Website
        without restrictions. 9. Settlement of Disputes 9.1. Settlement of
        disputes between the Company and the User is conducted in the form of
        negotiations through any available channel of communication.
      </p>
      <div className={classes.wrapper}>
        <Checkbox
          checked={success ? true : false}
          color='primary'
          onClick={handleButtonClick}
          inputProps={{ 'aria-label': 'secondary checkbox' }}
        />
        {loading && (
          <CircularProgress size={38} className={classes.checkProgress} />
        )}
        <Button
          variant='text'
          color='primary'
          size={'small'}
          className={clsx(buttonClassname, classes.btn)}
          disabled={loading}
          onClick={handleButtonClick}
        >
          Accept terms and conditions
        </Button>
      </div>
    </Container>
  )
}
