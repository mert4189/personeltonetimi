import { BrowserRouter as Router,Routes,Route,Link,Navigate,useNavigate,NavLink } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import Fabrika from '../Resimler/fabrika.jpg'
import { useDispatch } from 'react-redux';
import axios from "axios";
import { Row } from "react-bootstrap";
import { setUser } from "../redux/actions/userActions";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setİd, setAd, setSayfa } from "../redux/actions/userActions";


const Login = () =>{
               
    
    const [kullanıcıadı,setKullanıcıadı] = useState('')
    const [sonuc2, setSonuc2] = useState([]);
    const [sifre,setSifre] = useState('')
  
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
      const cekData = async (event) => {
        
        try {
          const response = await axios.get(`http://localhost:8080/alusers`);
          setSonuc2(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      cekData();
    }, []);

    function handleSumbit(event){
        event.preventDefault();
        axios.post('http://localhost:8080/login',{kullanıcıadı,sifre})
        .then(res => {
          
          
          if ( res.data === "mühendisgiriş"){
            console.log("giriş mühendis")
            dispatch(setUser("mühendis"));
            navigate("/mühendisanasayfa")
            toast.success('Giriş Başarılı', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
          }
          if ( res.data === "müdürgiriş"){
            console.log("giriş müdür")
            dispatch(setUser("müdür"));
            navigate("/müdüranasayfa")
            toast.success('Giriş Başarılı', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });

          }
          if ( res.data === "memurgiriş"){
            console.log("giriş memur")
            dispatch(setUser("memur"));
            navigate("/memuranasayfa")
            toast.success('Giriş Başarılı', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
          }
          if ( res.data === "kayıt yok"){
            console.log("kayıt yok")
            toast.error('Giriş Başarısız', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
          }
      
         
        })
       
        
        
        
       
    
      }
      useEffect(() => {
       dispatch(setSayfa("anasayfa"))
      
      }, []);
      
      



    return (
        <><div style={{ position: "relative", height: "100vh", backgroundImage: `url(${Fabrika})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center center", filter: "blur(10px)" }}>
        </div><div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "30%" }}>
            
                <form onSubmit={handleSumbit}>
                    <h3>Giriş Yap</h3>
                    <div className="mb-3">
                        <label>Kullanıcı Adı</label>
                        <input
                            type=""
                            className="form-control"
                            id="kullanıcıadı"
                            onChange={e => setKullanıcıadı(e.target.value)}/>
                    </div>  
                    <div className="mb-3">
                        <label>Şifre</label>
                        <input
                            type="password"
                            className="form-control"
                            id="sifre"
                            onChange={e => setSifre(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <div className="custom-control custom-checkbox">
                        </div>
                    </div>
                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary">
                           Giriş Yap
                        </button>
                    </div>
                </form>
            </div></>
       

      )

}
export default Login;
