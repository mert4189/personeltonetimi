import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import fabrika from '../Resimler/fabrika.jpg'

import { Stack, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { useSelector,useDispatch } from 'react-redux';
import İzin from './IzinKaydi';
import { setİd, setAd,setSayfa } from "../redux/actions/userActions";
import Anasayfa from '../Navbar'
import { get } from "jquery";

function Kayıtoluştur() {
  const [sonuc, setSonuc] = useState("");
  const [ad, setAd] = useState('');
  const [telefon, setTelefon] = useState('');
  const [mevki, setMevki] = useState('');
  const [raporsuresi, setRaporsuresi] = useState('');
  const [hastalik, setHastalik] = useState('');
  const [resim, setResim] = useState(null);
  const [durum1, setDurum1] = useState("3");
  const [id, setİd] = useState('');
  const getİd = useSelector(state => state.getİd);
  const getSayfa = useSelector(state => state.getSayfa)
  const dispatch = useDispatch();

  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/izinkaydı`;
    navigate(path);
  };

  const durumdegisitr = () => {
    setDurum1("1");
    localStorage.setItem("durum1", "1");
  };

  useEffect(() => {
    setİd(localStorage.getItem("id"));
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/duzenle3?id=${id}`)
      .then((response) => {
        setSonuc(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  useEffect(() => {
    if (sonuc[0] !== undefined) {
      setAd(sonuc[0].ad);
      setTelefon(sonuc[0].telefon);
      setMevki(sonuc[0].mevki);
    }
  }, [sonuc]);

  const sumbitForm = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("ad", ad);
    formData.append("telefon", telefon);
    formData.append("mevki", mevki);
    formData.append("raporsuresi", raporsuresi);
    formData.append("hastalik", hastalik);
    formData.append("resim", resim);

    axios
      .post('http://localhost:8080/raporgonder', formData)
      .then(res => {
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
        dispatch(setSayfa("izinler"))
      })
      .catch(err => {
        console.log(err);
      });
  };

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      setResim(file);
    }
  });

  return (
     <>
      {getSayfa === "rapor" ? (
        <>
          <Stack>
         
            <div></div>
          </Stack>
          <div>
            <form className="shadow-lg p-3 mb-5 bg-white rounded" style={{ width: "500px", height: "500px", marginLeft: "450px", borderRadius: "5px", marginTop: "70px" }}>
              <div className="container1">
                <div className="container">
                  <form onSubmit={sumbitForm} className="row g-3">
                    <div style={{ marginTop: "-80px" }} className="col-md-6">
                      <label className="form-label">Ad</label>
                      <input type="text" className="form-control" id="ad" value={ad} onChange={(e) => setAd(e.target.value)} disabled readOnly />
                    </div>

                    <div style={{ marginTop: "-80px", marginLeft: "-1px" }} className="col-md-4">
                      <label className="form-label">Mevki</label>
                      <input type="text" className="form-control" id="mevki" value={mevki} onChange={(e) => setMevki(e.target.value)} disabled readOnly />
                    </div>

                    <div style={{ marginTop: "15px", marginLeft: "" }} className="col-md-6">
                      <label className="form-label">Tel No</label>
                      <input type="text" className="form-control" id="telefon" value={telefon} onChange={(e) => setTelefon(e.target.value)} disabled readOnly />
                    </div>

                    <div style={{ marginTop: "100px", marginLeft: "-229px" }} className="col-md-6">
                      <label className="form-label"></label>
                      <div style={{ marginTop: "-20px", marginLeft: "225px" }} className="col-md-4">
                        <label className="form-label">Kaç Gün</label>
                        <input type="text" className="form-control" id="raporsuresi" value={raporsuresi} onChange={(e) => setRaporsuresi(e.target.value)} />
                      </div>
                    </div>

                    <div style={{ marginTop: "100px", marginLeft: "-229px" }} className="col-md-6">
                      <label className="form-label"></label>
                      <div style={{ marginTop: "-20px", marginLeft: "" }} className="col-md-12">
                        <label className="form-label">Hastalık</label>
                        <input type="text" className="form-control" id="hastalık" value={hastalik} onChange={(e) => setHastalik(e.target.value)} />
                      </div>
                    </div>

                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      {isDragActive ? (
                        <p>Sürükleyip bırakın</p>
                      ) : (
                        <p>Dosyayı buraya sürükleyin veya tıklayın</p>
                      )}
                      {resim && (
                        <div style={{ maxHeight: '200px', maxWidth: '100%', marginBottom: '20px' }}>
                          <p>Seçilen Resim:</p>
                          <img src={URL.createObjectURL(resim)} alt="Seçilen Resim" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                        </div>
                      )}
                    </div>

                    <div className="col-12" style={{ marginTop: '20px' }}>
  <button onClick={sumbitForm} type="submit" className="btn btn-primary">Rapor Kaydı Oluştur</button>
</div>
                  </form>
                </div>
              </div>
            </form>
          </div>
        </>
      )
    :
    (<div>
      <Anasayfa/>
    </div>)
    }
    {getSayfa === "izinler" ? (
      <div>
        <İzin/>
      </div>
    )
  :
  (<div></div>)
  }
      
     
      
      </>
  );
}

export default Kayıtoluştur;
