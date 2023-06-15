import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate, NavLink } from "react-router-dom";
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Box, Button1, Heading } from '@chakra-ui/react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import fabrika from "./Resimler/fabrika.jpg"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector,useDispatch } from 'react-redux';
import { useState, useEffect } from "react";
import İzin from './İzin'
import Raporlar from './Raporlar'
import Kayıt from './KayıtOluştur'
import Personel from "./Personeller/Personeller";
import İsci from './Personeller/İsci'
import Memur from './Personeller/Memur'
import Mudur from './Personeller/Mudur'
import Sef from './Personeller/Sef'
import Duzenle from './Duzenle'
import { setİd, setAd, setSayfa } from "./redux/actions/userActions";





const Navbar1 = () => {
  const [durum1, setDurum1] = useState("0")
  const getUser = useSelector(state => state.getUser);
  const getSayfa = useSelector(state => state.getSayfa)
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const durumdegistir = () => {
    dispatch(setSayfa("kayıt oluştur"))
    
  }
  const durumdegistir1 = () => {
    dispatch(setSayfa("personeller"))
  }
  const durumdegistir2 = () => {
 dispatch(setSayfa("izinler"))
  }
  const durumdegistir3 = () => {
    dispatch(setSayfa("ansayfa"))
     }
     const durumdegistir4 = () => {
      dispatch(setSayfa("rapor"))
       }
  


  useEffect(() => {
    const savedDurum = localStorage.getItem("durum1");
    if (savedDurum) {
      setDurum1(savedDurum);
    }
  }, []);
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
  console.log(getUser)
  return (
    <>
     
        <div style={{ position: "relative", minHeight: "100vh", backgroundImage: `url(${fabrika})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center center", backgroundAttachment: "fixed" }}>
          <Navbar bg="light" variant="light" expand="md">
            <Container>
              <Navbar.Brand>Personel Yönetimi</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  

                   {getSayfa === "izinler"?(
                  <NavLink exact activeClassName="active" onClick={durumdegistir4} className="nav-link">Raporlar</NavLink>
                   )
                  :
                  (<div></div>)
                  }
                  <NavLink onClick={durumdegistir} exact activeClassName="active" className="nav-link">Kayıt Oluştur</NavLink>
                  <NavLink onClick={durumdegistir1} exact activeClassName="active" className="nav-link">Personeller</NavLink>
                  <NavLink onClick={durumdegistir2} exact activeClassName="active" className="nav-link">İzin İstekleri</NavLink>

                </Nav>
                <Nav>
                  <NavLink exact activeClassName="active" onClick={durumdegistir3}  className="nav-link">Anasayfa</NavLink>
                  <NavLink exact activeClassName="active" to="/" onClick={toastify} className="nav-link">Çıkış Yap</NavLink>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <div>
          </div>
     

        {getSayfa === "kayıt oluştur" ? (
          <div>
            <Kayıt/>
          </div>
        )
      :
      (<div></div>)
      }
      {getSayfa === "personeller" ?(
        <div>
          <Personel/>
        </div>
      )
    :
    (<div></div>)
    }
    {getSayfa === "duzenle" ? (
      <div>
        <Duzenle/>
      </div>

    )
  :
  (<div></div>)
  }
  {getSayfa === "izinler" ?(
    <div>
      <İzin/>
    </div>

  )
:
(<div></div>)
}
{getSayfa === "rapor" ? (
  <div>
    <Raporlar/>
  </div>
)
:
(<div></div>)
}
   
   </div>
     
    </>
  );

}
export default Navbar1;