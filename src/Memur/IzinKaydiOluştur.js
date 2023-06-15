import { useState,useEffect } from "react";

import { BrowserRouter as Router,Routes,Route,Link,Navigate,useNavigate,NavLink, useParams } from "react-router-dom";
import axios from "axios";
import fabrika from '../Resimler/fabrika.jpg'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Row } from "react-bootstrap";
import { makeStyles } from "@mui/material";
import { useSelector,useDispatch } from 'react-redux';
import İzinler from './IzinKaydi'
import { setİd, setAd,setSayfa } from "../redux/actions/userActions";

function Kayıtoluştur (){
  

   
  const [sonuc,setSonuc]=useState("")
  const [ad, setAd] = useState('');
  const [ad1, setAd1] = useState('');
  const [izintip, setIzintip] = useState('');
  const [izinsuresi, setIzinsuresi] = useState('');
  const [izinsuresi1, setIzinsuresi1] = useState('');
  const [toplamizin, setToplamizin] = useState('');
  const [durum1,setDurum1] = useState("2")
  const [id,setİd] = useState()
  
  const [aciklama, setAciklama] = useState('');
 
  const [telefon, setTelefon] = useState('');
  const [mevki, setMevki] = useState('');
  const [sonuc2, setSonuc2] = useState([]);
  const [sonuc1, setSonuc1] = useState([]);
  const getİd = useSelector(state => state.getİd)
  const getAd = useSelector(state => state.getAd)
  const getSayfa = useSelector(state => state.getSayfa)
  const dispatch = useDispatch();

  useEffect(() => {
    setİd(localStorage.getItem("id"))
    setAd1(localStorage.getItem("ad"))
   
  }, [setİd]);
  
  
 
  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/memuranasayfa`; 
    navigate(path);
   
  
  }
  console.log(getİd,getAd)

  useEffect(() => {
    console.log(sonuc)
    axios.get(`http://localhost:8080/duzenle?id=${id}`)
      .then((response) => {
        setSonuc(response.data);
        
        
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);
  
  useEffect(() => {
    if (sonuc[0] === undefined) {
    
      return;
    }
   
    setAd(sonuc[0].ad);
    setTelefon(sonuc[0].telefon);
    setMevki(sonuc[0].mevki);
  }, [sonuc]);
  
  
  //const handleChange=(e)=>{
   // setData({...data,[e.target.id]:e.target.value});
    //console.log(data)

//}
console.log(sonuc1,getAd)

useEffect(() => {

  
   
   
    const cekData = async (event) => {
    
      try {
        const response = await axios.post(`http://localhost:8080/al41/`+getAd)
        setSonuc1(response.data);
        console.log(response)
      } catch (error) {
        console.log(error);
      }
    };
    cekData();
  }, [getAd]);
 
const sumbitForm= (e) =>{

  e.preventDefault();
  let izintop = parseInt(izinsuresi) + sonuc[0].toplamizin
  
 
 
 

 

  
 
  axios.post('http://localhost:8080/izingonder'   ,{
  ad: ad,

  mevki: mevki,
 
  telefon: telefon,
  izintip:izintip,
  izinsuresi:izinsuresi,
  toplamizin:toplamizin,
  aciklama:aciklama
  
})
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
  
  setDurum1("1")
  localStorage.setItem("durum1","1")
  dispatch(setSayfa("izinler"))
  
})
.catch(err => {
  console.log(err);
});


 

 


  
  }
  const durumdegisitr1 = () =>{
    setDurum1("1")
    localStorage.setItem("durum1","1")
  }
  
  useEffect(() => {
   
      const cekData = async (event) => {
        
        try {
          const response = await axios.get(`http://localhost:8080/alizin4?ad=${ad}`);
          setSonuc2(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      cekData();
    }, [ad]);
    
    useEffect(() => {
      const savedDurum = localStorage.getItem("durum1");
      if (savedDurum) {
        setDurum1(savedDurum);
     

      }
    }, []);
  
    console.log(getSayfa)
 
    return (
      <>
     
        { getSayfa === "izinkaydı" ? (
          <div>
          
            <div>
              <form class="shadow-lg p-3 mb-5 bg-white rounded" style={{ width: "500px", height: "500px", marginLeft: "450px", borderRadius: "5px", marginTop: "70px" }}>
                <div className="container1">
                  <div className="container">
                    <form onSubmit={sumbitForm} className="row g-3">
                      <div style={{ marginTop: "-80px" }} className="col-md-6">
                        <label className="form-label">Ad</label>
                        <input type="text" className="form-control" id="ad" value={ad} onChange={(e) => setAd(e.target.value)} disabled readonly />
                      </div>
                      <div style={{ marginTop: "-80px", marginLeft: "-1px" }} className="col-md-4">
                        <label className="form-label">Mevki</label>
                        <input type="text" className="form-control" id="mevki" value={mevki} onChange={(e) => setMevki(e.target.value)} disabled readonly />
                      </div>
                      <div style={{ marginTop: "15px" }} className="col-md-6">
                        <label className="form-label">Tel No</label>
                        <input type="text" className="form-control" id="telefon" value={telefon} onChange={(e) => setTelefon(e.target.value)} disabled readonly />
                      </div>
                      <div style={{ marginTop: "100px", marginLeft: "-229px" }} className="col-md-6">
                        <label className="form-label"></label>
                        <select id="izintip" className="form-select" onChange={(e) => setIzintip(e.target.value)} value={izintip}>
                          <option selected>İzin Tipi</option>
                          <option>Yıllık İzin</option>
                          <option>Ölüm İzni</option>
                          <option>Evlenme izni</option>
                          <option>Hafta Tatili İzni</option>
                        </select>
                      </div>
                      <div style={{ marginTop: "100px", marginLeft: "-1px" }} className="col-md-6">
                        <label className="form-label"></label>
                        {izintip === "Yıllık İzin" && (
                          <select id="izinsuresi" className="form-select" onChange={(e) => setIzinsuresi(e.target.value)} value={izinsuresi}>
                            <option selected>Kaç Gün</option>
                            {Array.from({ length: 28 }, (_, index) => (
                              <option key={index + 1}>{index + 1}</option>
                            ))}
                          </select>
                        )}
                        {izintip === "Ölüm İzni" && (
                          <select id="izinsuresi" className="form-select" onChange={(e) => setIzinsuresi(e.target.value)} value={izinsuresi}>
                            <option selected>Kaç Gün</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                          </select>
                        )}
                        {izintip === "Evlenme izni" && (
                          <select id="izinsuresi" className="form-select" onChange={(e) => setIzinsuresi(e.target.value)} value={izinsuresi}>
                            <option selected>Kaç Gün</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                          </select>
                        )}
                        {izintip === "Hafta Tatili İzni" && (
                          <select id="izinsuresi" className="form-select" onChange={(e) => setIzinsuresi(e.target.value)} value={izinsuresi}>
                            <option selected>Kaç Gün</option>
                            <option>7</option>
                          </select>
                        )}
                      </div>
                      <div class="form-group">
                        <label for="description" class="form-label">İzin Açıklama</label>
                        <textarea class="form-control" id="izinaciklama" rows="3" onChange={(e) => setAciklama(e.target.value)} value={aciklama}></textarea>
                      </div>
                      <div className="col-12">
                        <button onClick={sumbitForm} type="submit" className="btn btn-primary">İzin Kaydı Oluştur</button>
                      </div>
                    </form>
                  </div>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div>
            <İzinler/>
          </div>
        )}
       
    
      </>
    );
    
  

}
export default Kayıtoluştur;