import React from 'react'
import { useRecoilValue } from 'recoil'
import About from '../pages/main/About'
import FrequentlyAsked from '../pages/main/FAQs/indexs'
import ForgotPassword from '../pages/auth/ForgotPassword'
import HomePage from '../pages/main/HomePage'
import News from '../pages/main/Blog'
import Profile from '../pages/main/UserDashboard'
import Signin from '../pages/auth/Signin'
import Signup from '../pages/auth/Signup'
import SupportCenter from '../pages/main/SupportCenter'
import TermsCons from '../pages/main/Terms&Cons'
import { currentHomeScreen } from '../recoil'

export default function RootContainer() {
  const clickedNav = useRecoilValue(currentHomeScreen)
  switch (clickedNav) {
    case 'About':
      return <About />
    case 'Terms & Condition':
      return <TermsCons />
    case 'Blog':
      return <News />
    case 'FAQ':
      return <FrequentlyAsked />
    case 'Support Center':
      return <SupportCenter />
    case 'Signin':
      return <Signin />
    case 'Signup':
      return <Signup />
    case 'ForgotPassword':
      return <ForgotPassword />
    case 'Profile':
      return <Profile />
    default:
      return <HomePage />
  }
}
