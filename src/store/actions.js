import {GETINFO} from './mutation-types';

export default{
    getInfo({commit},{info}){
        commit(GETINFO,{info})
    }
}