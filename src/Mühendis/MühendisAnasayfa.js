import { BrowserRouter as Router,Routes,Route,Link,Navigate,useNavigate,NavLink } from "react-router-dom";
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Box, Button1, Heading } from '@chakra-ui/react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import fabrika from "../Resimler/fabrika.jpg"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Navbar1 = () =>{
    let navigate = useNavigate(); 
    const routeChange = () =>{ 
      let path = `/kayıtoluştur`; 
      navigate(path);
    }
    const routeChange1 = () =>{ 
        let path = `/personelsorgu`; 
        navigate(path);
      }
      const routeChange2 = () =>{ 
        let path = `/personeller`; 
        navigate(path);
      }
      function toastify(){
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

    return(
      <><Navbar bg="light" variant="light" expand="md">
      <Container>
        <Navbar.Brand>Mühendis</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink exact activeClassName="active" to="/mühendisanasayfa" className="nav-link">Anasayfa</NavLink>
            
            <NavLink exact activeClassName="active" to="/arızasorgu" className="nav-link">Arıza Sorgu</NavLink>
            <NavLink exact activeClassName="active" to="/arızalar" className="nav-link">Arızalar</NavLink>
          </Nav>
          <Nav>
            <NavLink exact activeClassName="active" to="/" onClick={toastify} className="nav-link">Çıkış Yap</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <div>
        <img style={{ position:"relative",width:"100vw",height:"100vh",zIndex:"-5",right:"0",bottom:"0"}} src={fabrika}></img>
        
        
        
        </div></>
    )
}
export default Navbar1;