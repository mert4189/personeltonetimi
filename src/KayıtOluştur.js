import { useState,useEffect } from "react";

import { BrowserRouter as Router,Routes,Route,Link,Navigate,useNavigate,NavLink } from "react-router-dom";
import axios from "axios";
import fabrika from './Resimler/fabrika.jpg'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setİd, setAd, setSayfa } from "./redux/actions/userActions";



import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {useDispatch, useSelector} from "react-redux"
import Anasayfa from './Navbar'

const Kayıtoluştur = () =>{
  const [durum1,setDurum1] = useState("1")
  const getUser=useSelector(state=>state.getUser)  
  const getSayfa=useSelector(state=>state.getSayfa)  
  const dispatch = useDispatch()

  const[data,setData]=useState({
    ad:"",
    soyad:"",
    maas:"",
    mevki:"",
    tc:"",
   telefon:"",
   kullanıcıadı:"",
   sifre:""

    
})

  let navigate = useNavigate(); 
  const durumdegistir = () =>{ 
  dispatch(setSayfa("anasayfa"))
  
  }
  const handleChange=(e)=>{
    setData({...data,[e.target.id]:e.target.value});
    console.log(data)

}

const sumbitForm= (e) =>{
  e.preventDefault();
  let senddata = {
      ad:data.ad,
      tc:data.tc,
    
     
      maas:data.maas,
      mevki:data.mevki,
      telefon:data.telefon,
      kullanıcıadı:data.kullanıcıadı,
      sifre:data.sifre
      
      
      
  }
  axios.post('http://localhost:8080/gonder',senddata)
  .then(res =>{
    toast.success('Kayıt Oluşturuldu', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
    
 
   
    setTimeout(function(){
      window.location.reload();
   }, 2000);
  })
  axios.post('http://localhost:8080/gonder2',senddata)
  .then(res =>{
   
 
   
   
  })
 
  
  
  }
 console.log(data.ad)


  return (
   <>
      { getSayfa === "kayıt oluştur" ? (
      <><Stack>
       
          <div></div>
        </Stack><div>
            <form class="shadow-lg p-3 mb-5 bg-white rounded" style={{ width: "500px", height: "500px", marginLeft: "450px", borderRadius: "5px", marginTop: "70px" }}>
              <div className="container1">
                <div className="container">
                  <form onSubmit={sumbitForm} className="row g-3">
                    <div style={{ marginTop: "-80px" }} className="col-md-6">
                      <label className="form-label">Ad</label>
                      <input type="text" className="form-control" id="ad" onChange={handleChange} value={data.ad} />
                    </div>
                    <div style={{ marginTop: "-80px" }} className="col-md-6">
                      <label className="form-label">TC</label>
                      <input type="text" className="form-control" id="tc" onChange={handleChange} value={data.tc} />
                    </div>
                    <div style={{ marginTop: "65px" }} className="col-md-4">
                      <label className="form-label">Maaş</label>
                      <input type="text" className="form-control" id="maas" onChange={handleChange} value={data.maas} />
                    </div>
                    <div style={{ marginTop: "180px", marginLeft: "-155px" }} className="col-md-4">
                      <label className="form-label">Mevki</label>
                      <select id="mevki" className="form-select" onChange={handleChange} value={data.mevki}>
                        <option selected>Mevki Seçin</option>
                        <option>Şef</option>
                        <option>Müdür</option>
                        <option>Memur</option>
                        <option>İşçi</option>
                      </select>
                    </div>
                    <div style={{ marginTop: "65px" }} className="col-md-8">
                      <label className="form-label">Tel No</label>
                      <input type="text" className="form-control" id="telefon" onChange={handleChange} value={data.telefon} />
                    </div>
                    <div style={{ marginTop: "-70px" , marginLeft:"150px" }} className="col-md-4">
                      <label className="form-label">Kullanıcı Adı</label>
                      <input type="text" className="form-control" id="kullanıcıadı"  onChange={handleChange} value={data.kullanıcıadı} />
                    </div>
                    <div style={{ marginTop: "-70px" , marginLeft:"300px" }} className="col-md-4">
                      <label className="form-label">Sifre</label>
                      <input type="text" className="form-control" id="sifre"  onChange={handleChange} value={data.sifre} />
                    </div>
                    <div className="col-12">
                      <button onClick={sumbitForm} type="submit" className="btn btn-primary">Kaydet</button>
                    </div>
                  </form>
                </div>
              </div>
            </form>
          </div></>
      )
      :
      (
        <div>
          <Anasayfa/>
        </div>
      )
      }
  </>
  );
  
  

}
export default Kayıtoluştur;