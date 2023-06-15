import { useState,useEffect } from "react";

import { BrowserRouter as Router,Routes,Route,Link,Navigate,useNavigate,NavLink } from "react-router-dom";
import axios from "axios";
import fabrika from '../Resimler/fabrika.jpg'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';




import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
const Kayıtoluştur = () =>{
  
  const[data,setData]=useState({
    bölüm:"",makina:"",
    açıklama:"",
    öncelik:""

    
})
const [bölüm,setBölüm]=useState("")
const getUser=useSelector(state=>state.getUser)

  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/memuranasayfa`; 
    navigate(path);
   
  
  }
  const handleChange=(e)=>{
    setData({...data,[e.target.id]:e.target.value});
    console.log(data)

}
const handleChange1=(e)=>{
    setBölüm({...bölüm,[e.target.id]:e.target.value});
    console.log(bölüm)

}
const submitForm= (e) =>{
  e.preventDefault();
   let senddata = {
     bölüm:data.bölüm,
     makina:data.makina,
     açıklama:data.açıklama,
     öncelik:data.öncelik
      
      
   }
  axios.post('http://localhost:8080/gonder1',senddata)
  .then(res =>{
    toast.success('Arıza Kaydı Oluşturuldu', {
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
  }).catch(err=>console.log("lsdknh",err))
 
  
  
  }
 


    return(
      <>

      
      <div  style={{position: "relative", height: "100vh", backgroundImage: `url(${fabrika})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center center"}}>
      
      { getUser === "memur" || getUser.mevki === "memur" ? (
      <><Stack>
              <Button style={{ display: "flex", position: 'absolute' }} sx={{ color: 'black' }} onClick={routeChange} id="button" variant="text">Anasayfa</Button>


              <div>

              </div>


            </Stack><form>
                <div class="container" style={{ marginTop: "140px" }}>
                  <div class="form-group">
                    <label for="priority" class="form-label">Arızalı Makine Bölümü:</label>
                    <select class="form-select" id="bölüm" onChange={handleChange} value={data.bölüm} required>
                      <option selected disabled value="">Bölüm</option>
                      <option value="Bant">Bant</option>
                      <option value="Saya Hazırlama">Saya Hazırlama</option>
                      <option value="Kesimhane">Kesimhane</option>

                    </select>
                  </div>
                  <div class="form-group">
                    <label for="machine" class="form-label">Arızalı Makine:</label>
                    <input class="form-control" id="makina" placeholder="Makine adı" onChange={handleChange} value={data.makina} required />
                  </div>
                  <div class="form-group">
                    <label for="description" class="form-label">Arıza Açıklaması:</label>
                    <textarea class="form-control" id="açıklama" rows="3" onChange={handleChange} value={data.açıklama} required></textarea>
                  </div>
                  <div class="form-group">
                    <label for="priority" class="form-label">Öncelik:</label>
                    <select class="form-select" id="öncelik" onChange={handleChange} value={data.öncelik} required>
                      <option selected disabled value="">Öncelik Seviyesi</option>
                      <option value="Düşük">Düşük</option>
                      <option value="Normal">Normal</option>
                      <option value="Yüksek">Yüksek</option>
                    </select>
                  </div>
                  <button onClick={submitForm} style={{ marginTop: "20px" }} type="submit" class="btn btn-primary">Kaydet</button>
                </div>
              </form></>
)
:
(
  <div>Yetkisiz

  </div>
)
}



</div>






</>




    )

}
export default Kayıtoluştur;