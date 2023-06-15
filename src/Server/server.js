const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const { json } = require('sequelize');
const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs');

const multer = require('multer');
const port = 8080;


const app = express();
app.use(express.json());



app.use(cors());

const db = mysql.createConnection({
  host: 'localhost', // MySQL sunucusunun adı
  user: 'root', // Veritabanı kullanıcı adı
  password: '', // Veritabanı parolası
  database: 'fabrika' // Veritabanı adı
});

db.connect((err) => {
  if (err) {
    console.error('Veritabanı bağlantısı başarısız oldu: ' + err.stack);
    return;
  }

  console.log('Veritabanına başarıyla bağlandı!');
});

app.post('/gonder', (req, res) => {
  const sql = "INSERT INTO personel (ad,maas,mevki,tc,telefon) VALUES (?)";
  const values = [

    req.body.ad,


    req.body.maas,
    req.body.mevki,
    req.body.tc,

    req.body.telefon


  ]
  db.query(sql, [values
  ], (err, data) => {
    if (err) {
      console.log(err)
    } else {
      console.log(res.json(data))
    }
  })


})
app.get('/al', (req, res) => {
  const arama = req.query.arama;
  const sql = `SELECT * FROM personel WHERE ad LIKE '%${arama}%'`;

  db.query(sql, (error, sonuc, fields) => {
    if (error) throw error;

    console.log(sonuc);
    res.send(sonuc);
  });
});
app.get('/al1', (req, res) => {
  const sql = ' SELECT * FROM personel';
  db.query(sql, (error, sonuc1) => {
    if (error) throw error;

    res.send(sonuc1);
  })
})

app.get('/al2', (req, res) => {
  const sql = ' SELECT * FROM personel';
  db.query(sql, (error, sonuc2) => {
    if (error) throw error;

    res.send(sonuc2);
  })
})
app.get('/mudur', (req, res) => {
  const sql = ' SELECT * FROM personel WHERE mevki="Müdür" ';
  db.query(sql, (error, sonuc) => {
    if (error) throw error;

    res.send(sonuc);
  })
})
app.get('/sef', (req, res) => {
  const sql = ' SELECT * FROM personel WHERE mevki="Şef" ';
  db.query(sql, (error, sonuc) => {
    if (error) throw error;

    res.send(sonuc);
  })
})
app.get('/memur', (req, res) => {
  const sql = ' SELECT * FROM personel WHERE mevki="Memur" ';
  db.query(sql, (error, sonuc) => {
    if (error) throw error;

    res.send(sonuc);
  })
})
app.get('/isci', (req, res) => {
  const sql = ' SELECT * FROM personel WHERE mevki="İşçi" ';
  db.query(sql, (error, sonuc) => {
    if (error) throw error;

    res.send(sonuc);
  })
})
app.post('/login', (req, res) => {
  const sql = "SELECT * FROM users WHERE kullanıcıadı = ? AND sifre = ? ";
  const values = [
    req.body.kullanıcıadı,
    req.body.sifre
  ];
  db.query(sql, values, (err, results) => {

    console.log(results)
    console.log(values)


    if (err) {
      return res.json("Hata");
    }
    else {
      if (results.length > 0) {
        if (results[0].mevki === "mühendis") {
          return res.json("mühendisgiriş")

        }
        if (results[0].mevki === "müdür") {
          return res.json("müdürgiriş")

        }
        if (results[0].mevki === "memur") {
          return res.json("memurgiriş")

        }

      }
    }
    if (results.length < 1) {
      return res.json("kayıt yok")
    }



  });
});

app.post('/loginMudur', (req, res) => {
  const sql = "SELECT * FROM users WHERE ad = ? ";
  const values = [
    req.body.ad,
  ];
  db.query(sql, values, (err, data) => {
    if (err) {
      return res.json("Hata");
    }
    if (data.length > 0) {
      return res.json("mudur");

    } else {
      return res.json("Kayıt Yok");
    }
  });
});
app.get('/al3', (req, res) => {
  const sql = ' SELECT * FROM users';
  db.query(sql, (error, sonuc2) => {
    if (error) throw error;

    res.send(sonuc2);
  })
})

app.post('/gonder1', (req, res) => {
  const sql = "INSERT INTO arızakaydı  (bölüm,makina,açıklama,öncelik) VALUES (?)";
  const values = [

    req.body.bölüm,


    req.body.makina,
    req.body.açıklama,
    req.body.öncelik,



  ]
  console.log(values)
  db.query(sql, [values
  ], (err, data) => {
    if (err) {
      console.log(err)
    } else {
      console.log(res.json(data))
    }
  })


})
app.get('/duzenle', (req, res) => {
  const id = req.query.id;

  const sql = `SELECT * FROM personel WHERE id = ?`;
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.json(result);
    console.log(result);
    console.log(id);
  });
});
app.post('/guncelle', function (req, res) {
  const id = req.query.id;
  const values = [
    req.body.ad,
    req.body.maas,
    req.body.mevki,
    req.body.tc,
    req.body.telefon,
    id
  ];
  const sql = "UPDATE personel SET ad=?, maas=?, mevki=?, tc=?, telefon=? WHERE id=?";
  console.log(values)
  db.query(sql, values, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Bir hata oluştu.");
    } else {
      console.log(data);
      res.status(200).json({ message: "Kayıt başarıyla güncellendi." });
    }
  });
});
app.post('/kayitlar/:id', function (req, res) {
  const id = req.params.id;
  console.log("pofgh", id)
  const sql = "DELETE FROM personel WHERE id = ?";
  db.query(sql, id, function (error, results, fields) {
    if (error) {
      console.log(error);
      res.status(500).send("Silme işlemi başarısız oldu.");
    } else {
      console.log("Kayıt silindi: ", id);
      res.status(200).send("Kayıt başarıyla silindi.");
    }
  });
});

app.get('/alusers', (req, res) => {
  const sql = ' SELECT * FROM users';
  db.query(sql, (error, sonuc2) => {
    if (error) throw error;

    res.send(sonuc2);
  })
})

app.post('/izingonder', (req, res) => {
  const sql = "INSERT INTO izin (ad,mevki,telefon,izintip,izinsuresi,aciklama) VALUES (?)";
  const values = [

    req.body.ad,



    req.body.mevki,


    req.body.telefon,
    req.body.izintip,
    req.body.izinsuresi,
    req.body.aciklama


  ]
  db.query(sql, [values
  ], (err, data) => {
    if (err) {
      console.log(err)
    } else {
      console.log(res.json(data))
    }
  })


})

app.get('/alizin', (req, res) => {
  const sql = ' SELECT * FROM izin WHERE durum="beklemede"';
  db.query(sql, (error, sonuc) => {
    if (error) throw error;

    res.send(sonuc);
  })
})
app.post('/guncelle1', function (req, res) {

  const id = req.query.id;
  const durum = req.body.durum;

  const sql = "UPDATE izin SET durum=? WHERE id=?";
  const values = [durum, id];


  db.query(sql, values, (err, data) => {
    if (err) {
      console.log(err);

      res.status(500).send("Bir hata oluştu.");
    } else {

      console.log("sopıgj", id, durum, values);

      res.status(200).json({ message: "Kayıt başarıyla güncellendi." });
    }
  });
});

app.post('/izingonder1', (req, res) => {
  const sql = "INSERT INTO izinbitmis (ad,mevki,telefon,izintip,izinsuresi,aciklama,durum) VALUES (?)";
  const values = [

    req.body.ad,
    req.body.mevki,
    req.body.telefon,
    req.body.izintip,
    req.body.izinsuresi,

    req.body.aciklama,
    req.body.durum


  ]
  db.query(sql, [values
  ], (err, data) => {
    if (err) {
      console.log(err)
    } else {

    }
  })


})
app.post('/izinlersil/:id', function (req, res) {
  const id = req.params.id;
  console.log("pofgh", id)
  const sql = "DELETE FROM izin WHERE id = ?";
  db.query(sql, id, function (error, results, fields) {
    if (error) {
      console.log(error);
      res.status(500).send("Silme işlemi başarısız oldu.");
    } else {
      console.log("Kayıt silindi: ", id);
      res.status(200).send("Kayıt başarıyla silindi.");
    }
  });
});

app.get('/alizin1', (req, res) => {
  const sql = ' SELECT * FROM izin WHERE durum="onaylandı"';
  db.query(sql, (error, sonuc) => {
    if (error) throw error;

    res.send(sonuc);
  })
})

app.get('/alizin2', (req, res) => {
  const sql = ' SELECT * FROM izin WHERE durum="reddedildi"';
  db.query(sql, (error, sonuc) => {
    if (error) throw error;

    res.send(sonuc);
  })
})
app.get('/alizin3', (req, res) => {
  const sql = ' SELECT * FROM izin';
  db.query(sql, (error, sonuc) => {
    if (error) throw error;

    res.send(sonuc);
  })
})
app.get('/alizin4', (req, res) => {
  const ad = req.query.ad;

  const sql = `SELECT * FROM izin WHERE  ad = ?`;
  db.query(sql, [ad], (err, result) => {
    if (err) throw err;
    res.json(result);
    console.log(result);
    console.log(ad);
  });
});
app.post('/toplamizin', function (req, res) {
  const ad = req.query.ad;
  const values = [
    req.body.toplamizin,

    ad
  ];
  const sql = "UPDATE personel SET toplamizin = toplamizin + ?  WHERE ad = ?";
  console.log(values)

  db.query(sql, values, (err, data) => {
    if (err) {
      console.log(err);

      res.status(500).send("Bir hata oluştu.");
    } else {
      console.log(data);
      res.status(200).json({ message: "Kayıt başarıyla güncellendi." });
      console.log(values.toplamizin)
    }
  });
});
app.get('/al41  ', (req, res) => {
  const ad = req.query.ad1;

  const sql = `SELECT * FROM personel WHERE  ad = ?`;
  db.query(sql, [ad], (err, result) => {
    if (err) throw err;
    res.json(result);
    console.log(result);
    console.log(ad);
  });
});
app.post('/izinlersil/:id', function (req, res) {
  const id = req.params.id;
  console.log("pofgh", id)
  const sql = "DELETE FROM izin WHERE id = ?";
  db.query(sql, id, function (error, results, fields) {
    if (error) {
      console.log(error);
      res.status(500).send("Silme işlemi başarısız oldu.");
    } else {
      console.log("Kayıt silindi: ", id);
      res.status(200).send("Kayıt başarıyla silindi.");
    }
  });
});
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../resim'); // Resimlerin kaydedileceği klasör
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
  }
});


const upload = multer({ storage: storage });

app.post('/raporgonder', upload.single('resim'), (req, res) => {
  // Form verilerine erişim
  const ad = req.body.ad;
  const telefon = req.body.telefon;
  const mevki = req.body.mevki;
  const raporsuresi = req.body.raporsuresi;
  const hastalik = req.body.hastalik;

  // Dosya bilgilerine erişim
  const resim = req.file;

  // Veritabanına kaydetme
  const sql = 'INSERT INTO rapor (ad, telefon, mevki, raporsuresi, hastalik, resim) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [ad, telefon, mevki, raporsuresi, hastalik, resim.filename];

  db.query(sql, values, (error, results) => {
    if (error) {
      console.log('Rapor kaydetme hatası:', error);
      res.status(500).json({ message: 'Rapor kaydedilirken bir hata oluştu' });
    } else {
      res.status(200).json({ message: 'Rapor kaydedildi' });
    }
  });
});
app.get('/al31', (req, res) => {
  const sql = ' SELECT * FROM rapor';
  db.query(sql, (error, sonuc2) => {
    if (error) throw error;

    res.send(sonuc2);
  })
})
app.get('/duzenle3', (req, res) => {
  const id = req.query.id;

  const sql = `SELECT * FROM personel WHERE id = ?`;
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.json(result);
    console.log(result);
    console.log(id);
  });
});
app.post('/gonder2', (req, res) => {
  const sql = "INSERT INTO users (kullanıcıadı,sifre,mevki) VALUES (?)";
  const values = [

    req.body.kullanıcıadı,


    req.body.sifre,
    req.body.mevki,



  ]
  db.query(sql, [values
  ], (err, data) => {
    if (err) {
      console.log(err)
    } else {
      console.log(res.json(data))
    }
  })


})





















app.listen(port, () => console.log(`Server listening on port ${port}`));
