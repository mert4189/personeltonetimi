const storedDurum = localStorage.getItem('durum');
const storedDurum1 = localStorage.getItem('durum1');
const storedMevki = localStorage.getItem('mevki');
const storedİd = localStorage.getItem('id');
const storedAd = localStorage.getItem('ad');
const storedSayfa = localStorage.getItem('sayfa');
const initialstate = { 


"users": {mevki: storedMevki ? JSON.parse(storedMevki) : null  } , 
 




"durum": {durum: storedDurum ? JSON.parse(storedDurum) : null  },

"durum1": {durum: storedDurum ? JSON.parse(storedDurum) : null  },
"id": {durum: storedİd ? JSON.parse(storedİd) : null  },
"ad": {durum: storedAd ? JSON.parse(storedAd) : null  },
"sayfa": {sayfa: storedSayfa ? JSON.parse(storedSayfa) : null  },




















} 





export default initialstate