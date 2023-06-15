import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './Navbar';
import KayıtOluştur from './KayıtOluştur';
import './App.css';

import Personel from './Personeller/Personeller';
import Mudur from './Personeller/Mudur';
import Sef from './Personeller/Sef';
import Memur from './Personeller/Memur';
import İsci from './Personeller/İsci';
import Login from './Giriş/Login';
import { ToastContainer } from 'react-toastify';
import MemurAnasayfa from './Memur/MemurAnsayfa';
import MühendisAnasayfa from './Mühendis/MühendisAnasayfa';
import ArızaKayıtoluştur from './Memur/ArızaKayıtoluştur';
import Duzenle from './Duzenle';
import Izin from './Memur/IzinKaydi';
import IzinKaydıOluştur from './Memur/IzinKaydiOluştur';
import IzinIstek from './İzin';
import Beklemede from './Memur/Beklemede';
import Onaylanmıs from './Memur/Onaylanmıs';
import Reddedilmis from './Memur/Reddedilmiş';
import Tumizinler from './Memur/Tumizinler';
import Rapor from './Memur/RaporOluştur';
import Raporlar from './Raporlar'

function App() { 
  return (
    <Router>
      <ToastContainer/>
      <div className='container2'>
        <Routes>
         
            
          <Route
            path="/müdüranasayfa"
            element={
              <AnimatePresence  mode='wait'>
                <motion.div key="müdüranasayfa" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <Navbar />
                </motion.div>
              </AnimatePresence>
            }
          />
          
          <Route
            path="/memuranasayfa"
            element={
              <AnimatePresence mode='wait'>
                <motion.div key="memuranasayfa" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <MemurAnasayfa />
                </motion.div>
              </AnimatePresence>
            }
          />
        
          
        
        
          
     
            
      
     
    
       
         
        
      
        
        
          <Route path="/" element={
              <AnimatePresence mode='wait'>
                <motion.div key="memuranasayfa" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <Login />
                </motion.div>
              </AnimatePresence>
            } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
