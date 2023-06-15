import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Navbar, Nav, NavDropdown, Container, Row, Col, Form, Button } from 'react-bootstrap';
import { BrowserRouter as Router,Routes,Route,Link,Navigate,useNavigate,NavLink,useHistory } from "react-router-dom";


import Select from 'react-select'
import { CSSTransition } from 'react-transition-group';
import fabrika from '../Resimler/fabrika.jpg'
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { red } from '@mui/material/colors';
import EditIcon from '@mui/icons-material/Edit';
import Personel from './Personeller'
import { setİd, setAd } from "../redux/actions/userActions";
import { useSelector,useDispatch } from 'react-redux';
const Sef = () =>{
    const [sonuc, setSonuc] = useState([]);
    const [durum1,setDurum1] = useState("MU")
    let navigate = useNavigate(); 
    const dispatch = useDispatch();
    const routeChange = () =>{ 
      setDurum1("0")
      localStorage.setItem("durum1","0")
      
    }
    const duzenle = () =>{
      setDurum1("D")
      localStorage.setItem("durum1","D")
    }
    useEffect(() => {
        const cekData = async (event) => {
          
          try {
            const response = await axios.get(`http://localhost:8080/mudur`);
            setSonuc(response.data);
          } catch (error) {
            console.log(error);
          }
        };
        cekData();
      }, []);
      console.log(sonuc)
      const [showMobileMenu, setShowMobileMenu] = useState(false);
      const routeChange5 = (id) =>{ 
        let path = `/duzenle/${id}`; 
        navigate(path);
      }
      const handleDelete = (id) => {
        console.log("zxgv",id)
        axios.post(`http://localhost:8080/kayitlar/`+id)
  .then(response => {
    console.log(response.data);
    setTimeout(function(){
      window.location.reload();
   }, 100);
  })
  .catch(error => {
    console.log(error);
  });

       
      
      };

      const handleMobileMenu = () => setShowMobileMenu(!showMobileMenu);

      return (
        <>
        
          <div  style={{position: "relative", height: "100vh", backgroundImage: `url(${fabrika})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center center"}}>
          
            {durum1 === "MU" ? (
              <>
                <Navbar bg="light" expand="lg" sticky="top">
                  <Container>
                    <Navbar.Brand href="#">Personeller</Navbar.Brand>
                    <Navbar.Toggle onClick={handleMobileMenu} />
                    <Navbar.Collapse className="justify-content-end">
                      <Nav className="me-auto">
                        <Nav.Link  onClick={routeChange}  href="#">Personeller</Nav.Link>
                        
                      
                      </Nav>
                    </Navbar.Collapse>
                  </Container>
                </Navbar>
                
             
                    
                {sonuc.length > 0 && (
                  <div id='tablo' className="tabloyapı" style={{ marginLeft: "3%", overflowX: "auto", maxHeight: "400px", background: "white" }}>
                    <div >
                
                    <table className="table table-bordered table-sm ">
                      
                    <thead className="thead-dark" style={{ position: "sticky", top: 0, background: "rgba(0, 0, 0, 0.05)" }}>
                          <tr>
                         
                            <th scope="col">Ad Soyad</th>
                            <th scope="col">TC</th>
                            <th scope="col">Mevki</th>
                            <th scope="col">Maaş</th>
                            <th scope="col">Telefon</th>
                            <th scope='col'>Yönet</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sonuc.map((row) => (
                            <tr key={row.id}>
                              <td style={{textAlign: "center"}}>{row.ad}</td>
                              <td style={{textAlign: "center"}}>{row.tc}</td>
                              <td style={{textAlign: "center"}}>{row.mevki}</td>
                              <td style={{textAlign: "center"}}>{row.maas}</td>
                              <td style={{textAlign: "center"}}>{row.telefon}</td>
                              <td style={{textAlign: "center"}}>
                              <IconButton color='error' aria-label="delete" size="large"  onClick={() => handleDelete(row.id)} className="btn btn-danger"  style={{marginLeft: "5px"}} >
                              <DeleteIcon  />
                              </IconButton>
                              <IconButton color='primary' aria-label="delete" size="large"   onClick={() => {
                                dispatch(setİd(row.id));
                                dispatch(setAd(row.ad));
                                duzenle()



                              }}    className="btn btn-danger"  style={{marginLeft: "5px"}} >
                              <EditIcon/>
                              </IconButton>
                               
                               
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div>
              <Personel/>
              </div>
            )}
          </div>
        </>
      );
      


}
export default Sef;