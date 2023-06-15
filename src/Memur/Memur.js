import { BrowserRouter as Router,Routes,Route,Link,Navigate,useNavigate,NavLink } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Box, Button1, Heading } from '@chakra-ui/react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import fabrika from "../Resimler/fabrika.jpg"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';

import axios from 'axios';

const memuransayfa = () =>{









    return(

        <>
        
        
        
        {getUser ==="memur" || getUser.mevki === "memur"  ? (
        <Navbar bg="light" variant="light" expand="md">
        <Container>
          <Navbar.Brand>Memur</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink exact activeClassName="active" to="/memuranasayfa" className="nav-link">Anasayfa</NavLink>
         
              <NavLink exact activeClassName="active" to="/memuranasayfa/izinkaydı" className="nav-link">İzinler</NavLink>
              
             
            </Nav>
            <Nav>
              <NavLink exact activeClassName="active" to="/" onClick={toastify} className="nav-link">Çıkış Yap</NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
      )
      
      :
      
      
      
  
    
      
      
      (
        <div>Yetkisiz</div>
  
  
      )
  
  
       }
      
      
      
      
      
      
      
      
      
      <div>
          <img style={{ position:"relative",width:"100vw",height:"100vh",zIndex:"-5",right:"0",bottom:"0"}} src={fabrika}></img>
          
          
          
          </div></>
      )


}

export default memuransayfa;