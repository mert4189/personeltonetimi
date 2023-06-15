import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Navbar, Nav, NavDropdown, Container, Row, Col, Form, Button } from 'react-bootstrap';
import { BrowserRouter as Router,Routes,Route,Link,Navigate,useNavigate,NavLink,useParams } from "react-router-dom";


import Select from 'react-select'
import { CSSTransition } from 'react-transition-group';
import fabrika from "../Resimler/fabrika.jpg"
import Combobox from "react-widgets/Combobox";
import "react-widgets/styles.css";
import { useSelector,useDispatch } from 'react-redux';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { red } from '@mui/material/colors';
import EditIcon from '@mui/icons-material/Edit';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import Anasayfa from '../Navbar'
import { set } from 'ol/transform';
import { setİd, setAd,setSayfa } from "../redux/actions/userActions";
import Duzenle from '../Duzenle'






const Personel = () =>{
 
    const [sonuc2, setSonuc2] = useState([]);
    let navigate = useNavigate(); 
  
    const getUser = useSelector(state => state.getUser);
    const getSayfa = useSelector(state => state.getSayfa);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [sonuc, setSonuc] = useState([]);
    const [arama, setArama] = useState('');
    const [durum1,setDurum1] = useState("2")
    const dispatch = useDispatch();
    
    const handleChange = (e) => { 
      setArama(e.target.value);
      console.log(arama)
    }
    const durumdegistir = () =>{
      setDurum1("0")
      localStorage.setItem("durum1","0")
    }
    const durumdegistir1 = () =>{
      setDurum1("İ")
      localStorage.setItem("durum1","İ")
    }
    const durumdegistir2 = () =>{
      setDurum1("ME")
      localStorage.setItem("durum1","ME")
    }
    const durumdegistir3 = () =>{
      setDurum1("MU")
      localStorage.setItem("durum1","MU")
    }
    const durumdegistir4 = () =>{
      setDurum1("S")
      localStorage.setItem("durum1","S")
    }
    const duzenle = () =>{
      dispatch(setSayfa("duzenle"))
     
    }
   
  const handleMobileMenu = () => setShowMobileMenu(!showMobileMenu);
    
   
   
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
   
     const kirmizi = red[900]
    useEffect(() => {
      console.log(getUser)
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
      const handleSubmit = (event) => {
        event.preventDefault();
        axios.get(`http://localhost:8080/al?arama=${arama}`)
          .then((response) => {
            setSonuc(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      };
      useEffect(() => {
        const savedDurum = localStorage.getItem("durum1");
        if (savedDurum) {
          setDurum1(savedDurum);
        }
      }, []);

      console.log(sonuc2)
      console.log(sonuc)

      useEffect(() => {
        
        const button = document.getElementById('izinbuton');
        if (button) {
          button.click();
        }
      }, []);

      return (
        <>
        
         
          
            {getSayfa === "personeller" ? (
              <>
               
                
                <div className="container" style={{ marginLeft: "-150px", marginTop: "20px" }}>
                  <div className="row height d-flex justify-content-center align-items-center">
                    <div className="col-md-6">
                      <div className="form">
                        <i className="fa fa-search"></i>
                        <input type="text" className="form-control form-input" placeholder="" onChange={handleChange} />
                        <button id='izinbuton' onClick={handleSubmit} style={{ marginTop: "10px" }} type="button" class="btn btn-light">Ara</button>
                      </div>
                    </div>
                  </div>
                </div>
            
                    
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
                            <th scope='col'>Toplam İzin</th>
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
                              <td style={{textAlign: "center"}}>{row.toplamizin}</td>

                              <td style={{textAlign: "center"}}>
                              <IconButton color='error' aria-label="delete" size="large"  onClick={() => handleDelete(row.id)} className="btn btn-danger"  style={{marginLeft: "5px"}} >
                              <DeleteIcon  />
                              </IconButton>
                              <IconButton color='primary' aria-label="delete" size="large"   onClick={() => {
                                dispatch(setİd(row.id));
                                dispatch(setAd(row.ad));
                                duzenle()



                              }}  className="btn btn-danger"  style={{marginLeft: "5px"}} >
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
                <Anasayfa/>
              </div>
            )}
            {getSayfa === "duzenle" ? (
              <div>
                <Duzenle/>
              </div>
            )
          :
          (<div></div>)
          }
       
        </>
      );
      





    

}
export default Personel;