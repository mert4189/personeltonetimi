import { combineReducers } from "redux";
import {getUser,getDurum,getDurum1,getİd,getAd,getSayfa} from "../redux/reducers/userReducers";


const reducers=combineReducers({
    getUser,
    getDurum,
    getDurum1,
    getİd,
    getAd,
    getSayfa
})


export default reducers;