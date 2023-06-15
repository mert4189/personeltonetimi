import * as actionTypes from '../actions/actiontype';
import initialState from '../initialState';

export function getUser(state=initialState.users,action){
    switch(action.type){
        case actionTypes.USERS:
            return action.payload
        default:
            return state;
    }
}

export function getDurum(state=initialState.durum,action){
    switch(action.type){
        case actionTypes.DURUM:
            return action.payload
        default:
            return state;
    }
}
export function getDurum1(state=initialState.durum,action){
    switch(action.type){
        case actionTypes.DURUM:
            return action.payload
        default:
            return state;
    }
}
export function getİd(state=initialState.id,action){
    switch(action.type){
        case actionTypes.İD:
            return action.payload
        default:
            return state;
    }
}
export function getAd(state=initialState.ad,action){
    switch(action.type){
        case actionTypes.AD:
            return action.payload
        default:
            return state;
    }
}
export function getSayfa(state=initialState.sayfa,action){
    switch(action.type){
        case actionTypes.SAYFA:
            return action.payload
        default:
            return state;
    }
}