import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate, NavLink } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Box, Button1, Heading } from '@chakra-ui/react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import fabrika from "../Resimler/fabrika.jpg"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector,useDispatch } from 'react-redux';
import İzinler from './IzinKaydi'
import İzinkayıt from './IzinKaydiOluştur'
import Rapor from './RaporOluştur'
import Onay from './Onaylanmıs'
import Red from './Reddedilmiş'
import Bekle from './Beklemede'
import Tum from './Tumizinler'
import { setİd, setAd, setSayfa } from "../redux/actions/userActions";

import axios from 'axios';
import { DURUM } from "../redux/actions/actiontype";

const Navbar1 = () => {
  const [sonuc2, setSonuc2] = useState([]);

  const dispatch = useDispatch();


  const getUser = useSelector(state => state.getUser)
  const getSayfa = useSelector(state => state.getSayfa)
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/`;
    navigate(path);
  }
  
  function toastify() {
    toast.info('Çıkış Yapıldı', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  }
  const yazdır = () =>{
    console.log("yazdır")
  }
  console.log(getSayfa)
  

  useEffect(() => {
    console.log(getUser.mevki)
    const cekData = async (event) => {
      try {
        const response = await axios.get(`http://localhost:8080/al2`);
        setSonuc2(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    cekData();
  }, []);
  const izinler = () =>{
    dispatch(setSayfa("izinler"));
  }
  const anasayfa = () =>{
    dispatch(setSayfa("anasayfa"))
  }
 console.log(getSayfa)
  return (

    <>


<div style={{ position: "relative", minHeight: "100vh", backgroundImage: `url(${fabrika})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center center", backgroundAttachment: "fixed" }}>
<Navbar bg="light" variant="light" expand="md">
        <Container>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Navbar.Brand style={{ marginRight: "10px" }}>Memur</Navbar.Brand>
            <button
              style={{ marginRight: "10px" }}
              onClick={izinler}
              type="button"
              className="btn btn-light"
            >
              İzinler
            </button>
            <button
              style={{ marginLeft: "780px" }}
              onClick={anasayfa}
              type="button"
              className="btn btn-light"
            >
              Anasayfa
            </button>
          
          </div>
  
          <button
            style={{ marginTop: "" }}
            onClick={routeChange}
            type="button"
            className="btn btn-light"
          >
            Çıkış Yap
          </button>
        </Container>
      </Navbar>
      {getSayfa === "izinler" ?(
        <div>
          <İzinler/>
        </div>
      )
    :
    (<div></div>)
    }
    {getSayfa === "izinkaydı" ? (
      <div>
        <İzinkayıt/>
      </div>
    )
  :
  (<div></div>)
  }
  {getSayfa === "rapor" ? (
    <div>
      <Rapor/>
    </div>
  )
:
(<div></div>)
}
    
     







</div>

    </>
  )
}
export default Navbar1;