import HomeIcon from '@material-ui/icons/Home'
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight'
import ContactSupportIcon from '@material-ui/icons/ContactSupport'

import XLMBC from './img/XLMBC.jpg'
import USDTBC from './img/USDTBC.jpg'
import XRPBC from './img/XRPBC.jpg'
import coinbaseBg from './img/coinbase.jpg'
import BitcoinBC from './img/BitcoinBC.jpg'
import EthereumBC from './img/EthereumBC.jpg'
import DogecoinBC from './img/DogecoinBC.jpg'
import BinaceBg from './img/binance-exchange.jpg'
import CoinmamaBg from './img/coinmama-exchange.png'
import BlochainBg from './img/blockchain-exchange.png'

export const investData = [
  {
    title: 'STARTER',
    percent: 10,
    duration: 3,
    durationText: '3 days',
    min: '$100',
    max: '$999',
  },
  {
    title: 'REGULAR',
    percent: 15,
    duration: 5,
    durationText: '5 days',
    min: '$1000',
    max: '$4999',
  },
  {
    title: 'STANDARD',
    percent: 20,
    duration: 7,
    durationText: 'Weekly',
    min: '$5000',
    max: '$9999',
  },
  {
    title: 'BUSINESS',
    percent: 30,
    duration: 7,
    durationText: 'Weekly',
    min: '$10000',
    max: '∞',
  },
]

export const payAddress = [
  {
    name: 'Bitcoin',
    address: 'bc1qw3g5t834vrtfcmddq7acku0fkp6euwff9nwzcp',
    barcode: BitcoinBC,
  },
  {
    name: 'Ethereum',
    address: '0x930696C71D7e1dE989309220CE846A53aF2e396B',
    barcode: EthereumBC,
  },
  {
    name: 'USDT',
    address: '0x930696C71D7e1dE989309220CE846A53aF2e396B',
    barcode: USDTBC,
  },
  {
    name: 'XRP',
    address: 'r9Lq87AvKDzSDrbHerDJUZMiW24Cj9xvmw',
    barcode: XRPBC,
  },
  {
    name: 'Dogecoin',
    address: 'DHUk1BvgrLfPMtx76xA6bbxYBApwFAj8q2',
    barcode: DogecoinBC,
  },
  {
    name: 'XLM',
    address: 'GDMKVCADSWK5C6AFL4W3CX4MJVWQLPNRYVIMNJC3NTJFI5RBUDQZFRTH',
    barcode: XLMBC,
  },
]

export const purchaseCoins = [
  {
    name: 'Coinbase',
    bg: coinbaseBg,
    link: 'https://www.coinbase.com/',
  },
  { name: 'Coinmama', bg: CoinmamaBg, link: 'https://www.coinmama.com/' },
  { name: 'BlockChain', bg: BlochainBg, link: 'https://www.blockchain.com/' },
  { name: 'Binance', bg: BinaceBg, link: 'https://www.binance.com/' },
]

export const navs = [
  { name: 'Home', icon: <HomeIcon /> },
  { name: 'About', icon: <SubdirectoryArrowRightIcon /> },
  {
    name: 'Blog',
    icon: <SubdirectoryArrowRightIcon />,
  },
  {
    name: 'FAQ',
    icon: <SubdirectoryArrowRightIcon />,
  },
  {
    name: 'Support Center',
    icon: <ContactSupportIcon />,
  },
]

export const FandQ = [
  {
    question: `What is coinerslot YOUR FINANCIAL HAPPINESS PARTNER`,
    answer: `coinerslot YOUR FINANCIAL HAPPINESS PARTNER is an Assets Management
        platform where you can invest and earn profits. We manage the assets of
        our clients by providing a very high stable daily income. We invest in
        stock and commodities market,foreign exchange market, Forex Trade and
        crypto trading and gold trading.`,
  },
  {
    question: 'What i need to become an investor',
    answer: `To become an Investor of this Company you need to
        open an account. Registering is completely free and will take only a few
        minutes. After this you can officially become a member and will be able
        to execute your investment strategies. Please note that by agreeing to
        the Terms and Conditions of Use during the registration you
        automatically confirm that you are of legal age in your country of
        residence and that by using our platform you don't violate any laws of
        your country of residence.`,
  },
  {
    question: `Is this registered company`,
    answer: `Yes. coinerslot YOUR FINANCIAL HAPPINESS PARTNER is a legal
        investment company incorporated and headquartered in England.`,
  },
  {
    question: ` I wish to
        invest with coinerslot YOUR FINANCIAL HAPPINESS PARTNER but I don't have
        an any ecurrency account. What should I do`,
    answer: 'true',
  },
  {
    question: `How do I open my coinerslot YOUR
        FINANCIAL HAPPINESS PARTNER Account`,
    answer: `It's quite easy and
        convenient. Follow this link, fill in the registration form and then
        press "Register".`,
  },
  {
    question: ` Which e-currencies do you accept`,
    answer: `Currently
        we accept Perfect Money,Ethereum,Bitcoin Cash and Bitcoin . If new
        payment methods are added , it will be announced via news & email.
        e-currencies.`,
  },
  {
    question: ` How can I withdraw funds`,
    answer: `Login to your account
        using your username and password and check the Withdraw section.`,
  },
  {
    question: ` Are
        there any fees when making deposits or withdrawals`,
    answer: `Our system
        does not charge any fees on deposits and withdrawals. The only fees you
        can get depend on your wallet or payment system. In order to send
        Bitcoin you must pay a Blockchain network fee, also some exchanges and
        exchange offices charge different fees.`,
  },
  {
    question: ` How long does it take for my
        deposit to be added to my account`,
    answer: `Your account will be
        updated as fast, as you deposit.Funds will be deposited immediately. But
        if you are using Bitcoin, the accrual may take some time as per rule, it
        takes from 3 to 6 Bitcoin network confirmations.`,
  },
  {
    question: ` How can I change my
        e-mail address or password`,
    answer: `Log into your coinerslot YOUR
        FINANCIAL HAPPINESS PARTNER account and click on the "Account
        Information". You can change your e-mail address and password there.`,
  },
  {
    question: ` What if I can't log into my account because I forgot my password`,
    answer: `click forgot password link, type your username or e-mail and
        you'll receive your account information.`,
  },
  {
    question: ` Does a daily profit paid
        directly to my currency account`,
    answer: `No, profits are gathered on
        your coinerslot YOUR FINANCIAL HAPPINESS PARTNER account and you can
        withdraw them anytime.`,
  },
  {
    question: ` What is the minimum and maximum deposit amount`,
    answer: `The minimum investment amount is $20.00 USD and maximum limit
        is $50000.00 USD. It actually depends on our investment packages. `,
  },
  {
    question: `How do you calculate the interest on my account`,
    answer: `Depending on each
        plan. Interest on your coinerslot YOUR FINANCIAL HAPPINESS PARTNER
        account is acquired Daily, Weekly, Bi-Weekly, Monthly and Yearly and
        credited to your available balance at the end of each day.`,
  },
  {
    question: ` Can I do a direct deposit from my account balance`,
    answer: ` Yes! To make a
        deposit from your coinerslot YOUR FINANCIAL HAPPINESS PARTNER account
        balance. Simply login into your members account and click on Make
        Deposit ans select the Deposit from Account Balance Radio button.`,
  },
  {
    question: ` Can I make an additional deposit to coinerslot YOUR FINANCIAL HAPPINESS PARTNER account once it has been opened`,
    answer: `Yes, you can but all transactions are handled separately. `,
  },
  {
    question: `After I make a withdrawal request, when will the funds be available on my ecurrency account`,
    answer: `Funds are usually available within 12 business hours.`,
  },
  {
    question: ` How can I change my password`,
    answer: `You can change your password directly from your members area by editing it in your personal profile. `,
  },
  {
    question: `Can I lose money`,
    answer: `There is a risk involved with investing in all high yield investment programs. However, there are a few simple ways that can help you to reduce the risk of losing more than you can afford to. First, align your investments with your financial goals, in other words, keep the money you may need for the short-term out of more aggressive investments, reserving those investment funds for the money you intend to raise over the long-term. It's very important for you to know that we are real traders and that we invest members' funds on major investments.`,
  },
  {
    question: ` How can I check my account balances`,
    answer: `You can access the account information 24 hours, seven days a week over the Internet. `,
  },
  {
    question: `Can I open several accounts in your program`,
    answer: `No. If we find that one member has more that one account, the entire funds will be frozen.`,
  },
  {
    question: ` Do you have an affiliate program`,
    answer: `You will get upto 5% referral commission if your down lines make a deposit.`,
  },
  {
    question: ` Can I receive a referral commission without making a deposit`,
    answer: `Yes. You can get a referral commission without making a personal deposit.`,
  },
  {
    question: ` How can I get Representative status in order to increase my referral rewards`,
    answer: `Yes 15%. First, you need to make at least $2000 deposit. Then you will need to contact us in order to get an increased affiliate status for your account.`,
  },
  {
    question: ` How many times can a user make deposits into their account`,
    answer: `A user can make deposits in his or her account as and when they want. There is no limitation on the number of deposits that a user can make into their account. `,
  },
  {
    question: `How can I make a spend`,
    answer: `To make a spend you must first become a member of coinerslot YOUR FINANCIAL HAPPINESS PARTNER. Once you are signed up, you can make your first spend. All spends must be made through the Member Area. You can login using the member username and password you received when signup.`,
  },
  {
    question: ` Who manages the funds`,
    answer: `These funds are managed by a team of coinerslot YOUR FINANCIAL HAPPINESS PARTNER investment experts.`,
  },
]
