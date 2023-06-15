import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navbar, Nav, NavDropdown, Container, Row, Col, Form, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate, NavLink, useParams } from "react-router-dom";
import Stack from '@mui/material/Stack';
import Button1 from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Select from 'react-select'
import { CSSTransition } from 'react-transition-group';
import fabrika from "../Resimler/fabrika.jpg"
import Combobox from "react-widgets/Combobox";
import "react-widgets/styles.css";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setDurum } from "../redux/actions/userActions";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { red } from '@mui/material/colors';
import EditIcon from '@mui/icons-material/Edit';
import Anasayfa from './MemurAnsayfa'
import Onay from './Onaylanmıs'
import Red from './Reddedilmiş'
import Tum from './Tumizinler'




const Personel = () => {

  const [sonuc2, setSonuc2] = useState([]);
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/memuranasayfa`;
    navigate(path);
  }
  const getUser = useSelector(state => state.getUser);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [sonuc, setSonuc] = useState([]);
  const [arama, setArama] = useState('');
  const [durum1, setDurum1] = useState("b");


  const dispatch = useDispatch();
  const handleChange = (e) => {
    setArama(e.target.value);
    console.log(arama)
  }
  const durudegistir = () => {

    setDurum1("0")
    localStorage.setItem("durum1", "0")
  }
  const onaylanmıs = () => {
    setDurum1("o")
    localStorage.setItem("durum1", "o")
  }
  const reddedildi = () => {
    setDurum1("r")
    localStorage.setItem("durum1", "r")
  }
  const tum = () => {
    setDurum1("t")
    localStorage.setItem("durum1", "t")
  }


  const handleMobileMenu = () => setShowMobileMenu(!showMobileMenu);
  useEffect(() => {
    const savedDurum = localStorage.getItem("durum1");
    if (savedDurum) {
      setDurum1(savedDurum);
    }
  }, []);




  useEffect(() => {
    console.log(getUser)
    const cekData = async (event) => {

      try {
        const response = await axios.get(`http://localhost:8080/alizin`);
        setSonuc2(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    cekData();
  }, []);
  //const handleSubmit = (event) => {
  // event.preventDefault();
  //axios.get(`http://localhost:8080/al?arama=${arama}`)
  // .then((response) => {
  // setSonuc(response.data);
  // })
  //.catch((error) => {
  //console.log(error);
  // });
  //};
  const handleDelete = (id) => {
    console.log("zxgv", id)
    axios.post(`http://localhost:8080/izinlersil/` + id)
      .then(response => {
        console.log(response.data);
        setTimeout(function () {
          window.location.reload();
        }, 100);
      })
      .catch(error => {
        console.log(error);
      });



  };
  console.log(sonuc2)
  console.log(sonuc)

  return (
    <>
    
        {durum1 === "b" ? (
          <>
            <div style={{ position: "relative", height: "100vh", backgroundImage: `url(${fabrika})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center center" }}>
            <Navbar bg="light" expand="lg" sticky="top">
  <Container>
    <Navbar.Brand href="#">Beklemede</Navbar.Brand>
    <Nav className="mr-auto">
      <NavDropdown title="İzinler" id="basic-nav-dropdown">
        <NavDropdown.Item onClick={onaylanmıs}>Onaylanmış</NavDropdown.Item>
        <NavDropdown.Item onClick={reddedildi}>Reddedilmiş</NavDropdown.Item>
        <NavDropdown.Item onClick={tum}>Tüm İzinler</NavDropdown.Item>
      </NavDropdown>
    </Nav>
    <Navbar.Toggle onClick={handleMobileMenu} />
    <Navbar.Collapse className="justify-content-end">
      <Nav>
        <Nav.Link onClick={durudegistir}>Anasayfa</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>

            {sonuc2.length > 0 && (
              <div className="tabloyapı" style={{ marginLeft: "3%", overflowX: "auto", maxHeight: "400px", background: "white" }}>
                <div >
                  <table className="table table-bordered ">
                    <thead className="thead-dark" style={{ position: "sticky", top: 0, background: "rgba(0, 0, 0, 0.05)" }}>

                      <tr>
                        <th scope="col">Ad Soyad</th>
                        <th scope="col">Mevki</th>

                        <th scope="col">Telefon</th>
                        <th scope="col">İzin Tip</th>
                        <th scope="col">Alınan İzin</th>
                        <th scope="col">Durum</th>
                        <th scope='col'>Yönet</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sonuc2.map((row) => (
                        <tr key={row.id}>
                          <td style={{ textAlign: "center" }}>{row.ad}</td>

                          <td style={{ textAlign: "center" }}>{row.mevki}</td>

                          <td style={{ textAlign: "center" }}>{row.telefon}</td>
                          <td style={{ textAlign: "center" }}>{row.izintip}</td>
                          <td style={{ textAlign: "center" }}>{row.izinsuresi}</td>

                          {
                            row.durum === "reddedildi" ? (
                              <td style={{ textAlign: "center", color: "red", fontSize: "20px" }}>{row.durum}</td>
                            ) : <td style={{ textAlign: "center", color: "green", fontSize: "20px" }}>{row.durum}</td>
                          }
                          <td style={{ textAlign: "center" }}>
                            <IconButton color='error' aria-label="delete" size="large" onClick={() => handleDelete(row.id)} className="btn btn-danger" style={{ marginLeft: "5px" }} >
                              <DeleteIcon />
                            </IconButton>

                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            </div>

          </>
        ) : (
          <div>
            <Anasayfa />
          </div>
        )}
      
 
    </>
  );








}
export default Personel;