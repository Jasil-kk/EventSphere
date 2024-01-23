import React from 'react'
import { Header } from '../components/Header/Header'
import { Footer } from '../components/Footer/Footer'
import { SingleViewCard } from '../components/SingleViewCard/SingleViewCard'

export const SingleView = () => {
  return (
    <div>
        <Header/>
        <SingleViewCard/>
        <Footer/>
    </div>
  )
}
