import React,{ ReactNode } from 'react'
import Header from './header/Header'
import Footer from './footer/Footer'


interface LayoutProps {
    children: ReactNode;
  }
const Layout = ({ children }: LayoutProps) => {
  return (
    <>
    <Header/>
    {children}
    <Footer/>
    </>
  )
}

export default Layout