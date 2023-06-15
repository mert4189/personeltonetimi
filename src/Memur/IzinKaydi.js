import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navbar, Nav, NavDropdown, Container, Row, Col, Form, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate, NavLink, useParams } from "react-router-dom";

import fabrika from "../Resimler/fabrika.jpg"
import Combobox from "react-widgets/Combobox";
import "react-widgets/styles.css";
import { useSelector } from 'react-redux';
import '../'
import Anasayfa from './MemurAnsayfa'
import İzinkaydı from './IzinKaydiOluştur';
import { useDispatch } from 'react-redux';
import { setİd, setAd,setSayfa } from "../redux/actions/userActions";
import Rapor from './RaporOluştur'
import Onay from './Onaylanmıs'
import Red from './Reddedilmiş'
import Bekle from './Beklemede'
import Tum from './Tumizinler'
import { get } from 'jquery';





const Personel = () => {

  const [sonuc2, setSonuc2] = useState([]);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const getSayfa = useSelector(state => state.getSayfa);
  const getUser = useSelector(state => state.getUser);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [sonuc, setSonuc] = useState([]);
  const [arama, setArama] = useState('');

  const [secilenad, setSecilenad] = useState('');
  const [secilenid, setSecilenid] = useState('');
  const [secilen, setSecilen] = useState({ ad: '', id: '' });



  const handleChange = (e) => {
    setArama(e.target.value);
    console.log(arama)
  }

  const handleMobileMenu = () => setShowMobileMenu(!showMobileMenu);

const izinkaydı = () =>{
  dispatch(setSayfa("izinkaydı"));
}
const rapor = () =>{
  dispatch(setSayfa("rapor"))
}

  const routeChange5 = (id) => {
    let path = `/memuranasayfa/${id}`;
    navigate(path);
  }
  const routeChange6 = (id) => {
    let path = `/memuranasayfa/${id}`;
    navigate(path);
  }
  
  



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
    
        {getSayfa === "izinler" ? (
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
              <div className="tabloyapı" style={{ marginLeft: "3%", overflowX: "auto", maxHeight: "400px", background: "white", marginTop: "40px" }}>
                <div >
                  <table className="table table-bordered table-sm ">
                    <thead className="thead-dark" style={{ position: "sticky", top: 0, background: "rgba(0, 0, 0, 0.05)" }}>

                      <tr>
                        <th scope="col">Ad Soyad</th>
                        <th scope="col">TC</th>
                        <th scope="col">Mevki</th>
                        <th scope="col">Maaş</th>
                        <th scope="col">Telefon</th>
                        <th scope="col">Alınan İzin</th>
                        <th scope="col">Yönet</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sonuc.map((row) => (
                        <tr key={row.id}>
                          <td style={{ textAlign: "center" }}>{row.ad}</td>
                          <td style={{ textAlign: "center" }}>{row.tc}</td>
                          <td style={{ textAlign: "center" }}>{row.mevki}</td>
                          <td style={{ textAlign: "center" }}>{row.maas}</td>
                          <td style={{ textAlign: "center" }}>{row.telefon}</td>
                          <td style={{ textAlign: "center" }}>{row.toplamizin}</td>
                          {row.toplamizin >= 28 ? (
                            <td style={{ textAlign: "center", fontSize: "20px", color: "red" }}>İzin Sınırı Geçildi</td>
                          ) : (
                            <td style={{ textAlign: "center" }}>
                              <button onClick={() => {
                                dispatch(setİd(row.id));
                                dispatch(setAd(row.ad));
                                izinkaydı()
                               


                              }} className="btn btn-success" style={{ padding: "5px 10px", fontSize: "16px" }}>İzin Oluştur</button>
                              <button onClick={() => {
                                dispatch(setİd(row.id));
                                dispatch(setAd(row.ad));
                                rapor()
                          



                              }} className="btn btn-success" style={{ padding: "5px 10px", fontSize: "16px", marginLeft: "20px" }}>Rapor Oluştur</button>
                            </td>
                          )}
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
          </div>)
        }
        {getSayfa === "izinkaydı" ?  (
          <div>
            <İzinkaydı/>
          </div>
        )
      :
      (<div>

      </div>)
      } 
      {getSayfa === "rapor" ? (
        <div>
          <Rapor/>
        </div>
      )
    :
    (<div></div>)
    }
    









     
    </>
  );








}
export default Personel;