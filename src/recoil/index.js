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
    const selectedValues = get(userAccount)
    const AmountInvest = selectedValues.AmountInvest
    const SelectedPercent = selectedValues.SelectedPercent
    const netPercentage =
      AmountInvest === '' || NaN || AmountInvest <= 0
        ? 0
        : Math.round((SelectedPercent / 100) * AmountInvest)
    const netReturn =
      AmountInvest === '' || NaN || AmountInvest <= 0
        ? 0
        : netPercentage + parseInt(AmountInvest)

    // total amount invested
    const TotalAmountInvest = selectedValues.TotalAmountInvest
    const totalpercent =
      TotalAmountInvest === '' || NaN || TotalAmountInvest <= 0
        ? 0
        : Math.floor((SelectedPercent / 100) * TotalAmountInvest)
    const totalReturn =
      TotalAmountInvest === '' || NaN || TotalAmountInvest <= 0
        ? 0
        : totalpercent + parseInt(TotalAmountInvest)
    return {
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
  ],
})
