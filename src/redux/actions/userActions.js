import * as actionTypes from './actiontype'


export const setUser = (value) => {
  // Redux store'a mevki bilgisini kaydet
  const action = {
    type: actionTypes.USERS,
    payload: value,
  };

  // Yerel depolamaya mevki bilgisini setle
  localStorage.setItem('mevki', JSON.stringify(value));

  return action;
};
export const setDurum = (value) => {
  // Redux store'a mevki bilgisini kaydet
  const action = {
    type: actionTypes.DURUM,
    payload: value,
  };

  // Yerel depolamaya mevki bilgisini setle
  localStorage.setItem('durum', JSON.stringify(value));

  return action;
};
export const setDurum1 = (value) => {
  // Redux store'a mevki bilgisini kaydet
  const action = {
    type: actionTypes.DURUM1,
    payload: value,
  };

  // Yerel depolamaya mevki bilgisini setle
  localStorage.setItem('durum1', JSON.stringify(value));

  return action;
};
export const setİd = (value) => {
  // Redux store'a mevki bilgisini kaydet
  const action = {
    type: actionTypes.İD,
    payload: value,
  };

  // Yerel depolamaya mevki bilgisini setle
  localStorage.setItem('id', JSON.stringify(value));

  return action;
};
export const setAd = (value) => {
  // Redux store'a mevki bilgisini kaydet
  const action = {
    type: actionTypes.AD,
    payload: value,
  };

  // Yerel depolamaya mevki bilgisini setle
  localStorage.setItem('ad', JSON.stringify(value));

  return action;
};
export const setSayfa = (value) => {
  // Redux store'a mevki bilgisini kaydet
  const action = {
    type: actionTypes.SAYFA,
    payload: value,
  };

  // Yerel depolamaya mevki bilgisini setle
  localStorage.setItem('sayfa', JSON.stringify(value));

  return action;
};