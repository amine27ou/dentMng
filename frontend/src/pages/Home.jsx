import React from 'react'
import Header from '../components/Header'
import AboutUs from '../components/AboutUs'
import Steps from '../components/Steps'
import Appointment from '../components/Appointment'
import Services from '../components/Services'
import Reviews from '../components/Reviews'

export default function Home() {
  return (
    <>
    <div className='flex flex-col items-center justify-center p-10 gap-10 '>
        <Header/>
        <AboutUs/>
        <Steps/>
        <Appointment/>
        <Services/>
        <Reviews/>
    </div>
    </>
  )
}
