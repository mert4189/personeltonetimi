import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Navbar, Nav, NavDropdown, Container, Row, Col, Form, Button } from 'react-bootstrap';
import { BrowserRouter as Router,Routes,Route,Link,Navigate,useNavigate,NavLink,useParams } from "react-router-dom";
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { red } from '@mui/material/colors';
import EditIcon from '@mui/icons-material/Edit';
import Select from 'react-select'
import { CSSTransition } from 'react-transition-group';
import fabrika from "./Resimler/fabrika.jpg"
import Combobox from "react-widgets/Combobox";
import "react-widgets/styles.css";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setDurum } from "./redux/actions/userActions";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import './App.css'
import './index.css';
import Anasayfa from './Navbar'
import { setİd, setAd,setSayfa } from "./redux/actions/userActions";



const Personel = () =>{
 
    const [sonuc2, setSonuc2] = useState([]);
    const [durum1,setDurum1] = useState("R")
    let navigate = useNavigate(); 
    const routeChange = () =>{ 
      setDurum1("0")
      localStorage.setItem("durum1","0")
    
    }
    const getUser = useSelector(state => state.getUser);
    const getSayfa = useSelector(state => state.getSayfa);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [sonuc, setSonuc] = useState([]);
    const [arama, setArama] = useState('');
    
     
    
    const dispatch = useDispatch();
    const handleChange = (e) => {
      setArama(e.target.value);
      console.log(arama)
    }

  const handleMobileMenu = () => setShowMobileMenu(!showMobileMenu);
    
    const routeChange1 = () =>{ 
        let path = `/raporlar`; 
        navigate(path);
      }
      const routeChange2 = () =>{ 
        let path = `/personeller/şefler`; 
        navigate(path);
      }
      const routeChange3 = () =>{ 
        let path = `/personeller/memurlar`; 
        navigate(path);
      }
      const routeChange4 = () =>{ 
        let path = `/personeller/isciler`; 
        navigate(path);
      }
      const routeChange5 = (id) =>{ 
        let path = `/duzenle/${id}`; 
        navigate(path);
      }
      const onayla = (id,izinsuresi,ad) =>{
      
        
        
       
       
        axios.post('http://localhost:8080/guncelle1?id=' + id,{
        durum: "onaylandı",
       
      })
   
      .then(res =>{
        axios.post('http://localhost:8080/toplamizin?ad='+ad   ,{

        toplamizin: izinsuresi.toString(),
        izinsuresi:izinsuresi
 
  
})
window.location.reload();



        
   
         
          
       
         
         
        })
        
      .catch(err => {
        console.log(err);
      });
        
       
       
      
      
      
             
            }
            function handleResimClick(src) {
              const resimFullscreen = document.createElement('div');
              resimFullscreen.classList.add('resim-fullscreen');
            
              const img = document.createElement('img');
              img.src = src;
            
              resimFullscreen.appendChild(img);
            
              document.body.appendChild(resimFullscreen);
            
              resimFullscreen.addEventListener('click', () => {
                document.body.removeChild(resimFullscreen);
              });
            }
            
          
      
             
            
            
         
           
      
      const reddet = (id) =>{
      
        
        
       
       
  axios.post('http://localhost:8080/guncelle1?id=' + id,{
  durum: "reddedildi",
 
})
.then(res =>{


})
 
.catch(err => {
  console.log(err);
});


       
      }
      const handleDelete = (id) => {
        console.log("zxgv",id)
        axios.post(`http://localhost:8080/kayitlar/`+id)
  .then(response => {
    console.log(response.data);
   
  })
  .catch(error => {
    console.log(error);
  });

       
      
      };
   
      
    useEffect(() => {
      console.log(getUser)
        const cekData = async (event) => {
          
          try {
            const response = await axios.get(`http://localhost:8080/al31`);
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
      
      console.log(sonuc2)
      console.log(sonuc)

      return (
        <>
      
            {getSayfa === "rapor" ? (
              <>
               
               
                {sonuc2.length > 0 && (
                  <div className="tabloyapı" style={{ marginLeft: "3%", overflowX: "auto", maxHeight: "400px", background: "white" }}>
                    <div >
                    <table className="table table-bordered table-sm ">
                      
                    <thead className="thead-dark" style={{ position: "sticky", top: 0, background: "rgba(0, 0, 0, 0.05)" }}>
                          <tr>
                         
                            <th scope="col">Ad Soyad</th>
                           
                            <th scope="col">Mevki</th>
                          
                            <th scope="col">Telefon</th>
                            <th scope="col">Hastalık</th>
                            <th scope="col">Rapor Süresi</th>
                            <th scope="col">Rapor</th>

                            
                          </tr>
                        </thead>
                        <tbody>
                          {sonuc2.map((row) => (
                            <tr key={row.id}>
                              <td style={{textAlign: "center"}}>{row.ad}</td>
                            
                              <td style={{textAlign: "center"}}>{row.mevki}</td>
                           
                              <td style={{textAlign: "center"}}>{row.telefon}</td>
                              <td style={{textAlign: "center"}}>{row.hastalik}</td>
                              <td style={{textAlign: "center"}}>{row.raporsuresi}</td>
                              <img
                              src={`/resimler/${row.resim}`}
                              alt="Resim"
                             className="resim"
                             onClick={() => handleResimClick(`/resimler/${row.resim}`)}
                              /> 
                   

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
        
        </>
      );
      





    

}
export default Personel;

