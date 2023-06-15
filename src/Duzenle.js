import { useState,useEffect } from "react";

import { BrowserRouter as Router,Routes,Route,Link,Navigate,useNavigate,NavLink, useParams } from "react-router-dom";
import axios from "axios";
import fabrika from './Resimler/fabrika.jpg'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector,useDispatch } from 'react-redux';
import { setİd, setAd,setSayfa } from "./redux/actions/userActions";



import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Row } from "react-bootstrap";
import { makeStyles } from "@mui/material";
import Personel from "./Personeller/Personeller";
import { get } from "jquery";
function Kayıtoluştur (){

  const [sonuc,setSonuc]=useState("")
  const [ad, setAd] = useState('');
  const [tc, setTc] = useState('');
  const [maas, setMaas] = useState('');
  const [telefon, setTelefon] = useState('');
  const [mevki, setMevki] = useState('');
  const [durum1,setDurum1] = useState("D")
  const [id,setİd] = useState()
  const dispatch = useDispatch();

 
  
  const getİd = useSelector(state => state.getİd)
  const getSayfa = useSelector(state => state.getSayfa)

  useEffect(() => {
    setİd(localStorage.getItem("id"))
  
   
  }, [setİd]);
 
 
  
  console.log(getİd)
 
  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    dispatch(setSayfa("personeller"))
   
   
   
  
  }
 
  useEffect(() => {
    axios.get(`http://localhost:8080/duzenle?id=${id}`)
      .then((response) => {
        setSonuc(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);
  
  useEffect(() => {
    if(sonuc[0] === undefined){
      console.log("yok")
    }else{
      setAd(sonuc[0].ad)
      setTc(sonuc[0].tc)
      setMaas(sonuc[0].maas)
      setTelefon(sonuc[0].telefon)
      setMevki(sonuc[0].mevki)
    }
  }, [sonuc]);
  
  //const handleChange=(e)=>{
   // setData({...data,[e.target.id]:e.target.value});
    //console.log(data)

//}
console.log(getSayfa)
console.log(ad)
const sumbitForm= (e) =>{
  e.preventDefault();
  axios.post('http://localhost:8080/guncelle?id=' + id,{
  ad: ad,
  maas: maas,
  mevki: mevki,
  tc: tc,
  telefon: telefon
})
.then(res =>{
  toast.success('Kayıt Güncellendi', {
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
.catch(err => {
  console.log(err);
});


  
 
 
  
  
  }
  
 

console.log(id)
console.log(sonuc)





  return (
   <>
     {getSayfa === "duzenle" ? (
      <><Stack>
          <Button style={{ display: "flex", position: 'absolute' }} sx={{ color: 'black' }} onClick={routeChange} id="button" variant="text">Anasayfa</Button>
          <div></div>
        </Stack><div>
            <form class="shadow-lg p-3 mb-5 bg-white rounded" style={{ width: "500px", height: "500px", marginLeft: "450px", borderRadius: "5px", marginTop: "70px" }}>
              <div className="container1">
                <div className="container">
                  <form onSubmit={sumbitForm} className="row g-3">
                    <div style={{ marginTop: "-80px" }} className="col-md-6">
                      <label className="form-label">Ad</label>
                      <input type="text" className="form-control" id="ad" value={ad} onChange={(e) => setAd(e.target.value)} />

                    </div>
                    <div style={{ marginTop: "-80px" }} className="col-md-6">
                      <label className="form-label">TC</label>
                      <input type="text" className="form-control" id="tc" value={tc} onChange={(e) => setTc(e.target.value)} />
                    </div>
                    <div style={{ marginTop: "65px" }} className="col-md-4">
                      <label className="form-label">Maaş</label>
                      <input type="text" className="form-control" id="maas" value={maas} onChange={(e) => setMaas(e.target.value)} />
                    </div>
                    <div style={{ marginTop: "180px", marginLeft: "-155px" }} className="col-md-4">
                      <label className="form-label">Mevki</label>
                      <select id="mevki" className="form-select" value={mevki} onChange={(e) => setMevki(e.target.value)}>
                        <option selected>Mevki Seçin</option>
                        <option>Şef</option>
                        <option>Müdür</option>
                        <option>Memur</option>
                        <option>İşçi</option>
                      </select>
                    </div>
                    <div style={{ marginTop: "65px" }} className="col-md-8">
                      <label className="form-label">Tel No</label>
                      <input type="text" className="form-control" id="telefon" value={telefon} onChange={(e) => setTelefon(e.target.value)} />
                    </div>
                    <div className="col-12">
                      <button onClick={sumbitForm} type="submit" className="btn btn-primary">Güncelle</button>
                    </div>
                  </form>
                </div>
              </div>
            </form>
          </div></>
      )
    :
    (<div>
      <Personel/>
    </div>)
    } 
    </>
  );
  
  

}
export default Kayıtoluştur;