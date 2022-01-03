import { atom, selector } from 'recoil'

export const currentHomeScreen = atom({
  key: 'currentHomeScreen',
  default: 'Home',
})

export const isAuthenticated = atom({
  key: 'isAuthenticated',
  default: false,
})

export const isAdmin = atom({
  key: 'isAdmin',
  default: false,
})

export const profileScreen = atom({
  key: 'profileScreen',
  default: 'dashboard',
})

export const adminScreen = atom({
  key: 'adminScreen',
  default: 'all',
})

export const TandC = atom({
  key: 'TandC',
  default: false,
})

export const userAccount = atom({
  key: 'userAccount',
  default: {
    Email: '',
    Phone: '',
    Wallet: '',
    Message: '',
    Username: '',
    Fullname: '',
    CreatedAt: '',
    NewBalance: 0,
    WalletType: '',
    Investplan: '',
    ReferalCode: '',
    ReferalBonus: 0,
    AmountInvest: 0,
    DepositDate: '',
    WithdrawDate: '',
    IsBlackList: false,
    TransactionId: '',
    Notifications: '',
    HaveMessage: true,
    WithdrawAmount: 0,
    DepositDuration: 3,
    SelectedPercent: 10,
    InvestStatus: false,
    DepositStatus: false,
    TotalAmountInvest: 0,
    InvalidDeposit: false,
    WithdrawStatus: false,
    DepositVerified: false,
    WithdrawApproved: false,
    HaveNotifications: false,
    DepositDueDate: new Date(),
  },
})

export const mrWorker = selector({
  key: 'mrWorker',
  get: ({ get }) => {
    let currentPlan = 'STARTER'
    let planDuration = 3
    let planPercent = 10
    const selectedValues = get(userAccount)
    const investValues = get(investPlans)
    const AmountInvest = selectedValues.AmountInvest
    const SelectedPercent = () => {
      if (AmountInvest < 100) {
        return 0
      } else if (
        AmountInvest >= investValues[0].min &&
        AmountInvest <= investValues[0].max
      ) {
        currentPlan = investValues[0].title
        planDuration = investValues[0].duration
        planPercent = investValues[0].percent
        return investValues[0].percent
      } else if (
        AmountInvest >= investValues[1].min &&
        AmountInvest <= investValues[1].max
      ) {
        currentPlan = investValues[1].title
        planDuration = investValues[1].duration
        planPercent = investValues[1].percent
        return investValues[1].percent
      } else if (
        AmountInvest >= investValues[2].min &&
        AmountInvest <= investValues[2].max
      ) {
        currentPlan = investValues[2].title
        planDuration = investValues[2].duration
        planPercent = investValues[2].percent
        return investValues[2].percent
      } else if (
        AmountInvest >= investValues[3].min 
      ) {
        currentPlan = investValues[3].title
        planDuration = investValues[3].duration
        planPercent = investValues[3].percent
        return investValues[3].percent
      }
    }
    const netPercentage =
      AmountInvest === '' || NaN || AmountInvest <= 0
        ? 0
        : Math.round((SelectedPercent() / 100) * AmountInvest)
    const netReturn =
      AmountInvest === '' || NaN || AmountInvest <= 0
        ? 0
        : netPercentage + parseInt(AmountInvest)

    // total amount invested
    const TotalAmountInvest = selectedValues.TotalAmountInvest
    const totalpercent =
      TotalAmountInvest === '' || NaN || TotalAmountInvest <= 0
        ? 0
        : Math.floor((SelectedPercent() / 100) * TotalAmountInvest)
    const totalReturn =
      TotalAmountInvest === '' || NaN || TotalAmountInvest <= 0
        ? 0
        : totalpercent + parseInt(TotalAmountInvest)
    return {
      currentPlan,
      planPercent,
      planDuration,
      netPercentage,
      netReturn,
      totalpercent,
      totalReturn,
    }
  },
})

export const investPlans = atom({
  key: 'investPlans',
  default: [
    {
      title: 'STARTER',
      percent: 10,
      duration: 3,
      durationText: '3 days',
      min: 100,
      max: 999,
    },
    {
      title: 'REGULAR',
      percent: 15,
      duration: 5,
      durationText: '5 days',
      min: 1000,
      max: 4999,
    },
    {
      title: 'STANDARD',
      percent: 20,
      duration: 7,
      durationText: 'Weekly',
      min: 5000,
      max: 9999,
    },
    {
      title: 'BUSINESS',
      percent: 30,
      duration: 7,
      durationText: 'Weekly',
      min: 10000,
      max: '∞',
    },
  ],
})
