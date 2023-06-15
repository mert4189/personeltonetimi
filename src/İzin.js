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
import { setDurum,setSayfa } from "./redux/actions/userActions";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Anasayfa from './Navbar'



const Personel = () =>{
 
    const [sonuc2, setSonuc2] = useState([]);
    const [durum1,setDurum1] = useState("3")
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
  dispatch(setSayfa("raporlar"))
        
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
      
      console.log(sonuc2)
      console.log(sonuc)

      return (
        <>
       
            {getSayfa === "izinler" ? (
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
                            <th scope="col">İzin Tip</th>
                            <th scope="col">İzin Süresi</th>

                            <th scope='col'>Yönet</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sonuc2.map((row) => (
                            <tr key={row.id}>
                              <td style={{textAlign: "center"}}>{row.ad}</td>
                            
                              <td style={{textAlign: "center"}}>{row.mevki}</td>
                           
                              <td style={{textAlign: "center"}}>{row.telefon}</td>
                              <td style={{textAlign: "center"}}>{row.izintip}</td>
                              <td style={{textAlign: "center"}}>{row.izinsuresi}</td>

                              <td style={{textAlign: "center"}}>
                              <IconButton color='error' aria-label="delete" size="large" onClick={() => onayla(row.id,row.izinsuresi,row.ad)} className="btn btn-danger"  style={{marginLeft: "5px"}} >
                              <CheckIcon  />
                              </IconButton>
                              <IconButton color='primary' aria-label="delete" size="large"  onClick={() => reddet(row.id)} className="btn btn-danger"  style={{marginLeft: "5px"}} >
                              <CloseIcon/>
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
         
        </>
      );
      





    

}
export default Personel;

