import React from 'react'
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
import   '../assets/css/style.scss';
import LatestProduct from '../components/LatestProduct';
import FeaturedProduct from '../components/FeaturedProduct';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Slider from '../components/Slider';
import Layout from '../components/Layout';
import ContentHome from './ContentHome';
import Product_Catalog from './Product_Catalog';
import OutFitTheDay from './OutFitTheDay';

const Home = () => {
  return (
    <>
        <Layout>
        <Slider/>
       <ContentHome/>
       <Product_Catalog/>
       <LatestProduct/>
       <OutFitTheDay/>

       <FeaturedProduct />
        </Layout>
       
        

        

         

    
    </>
    
  )
}

export default Home