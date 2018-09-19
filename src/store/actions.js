import {GETINFO,GETERROR} from './mutation-types';

export default{
    getInfo({commit},{info}){
        commit(GETINFO,{info})
    },
    getError({commit},{error_no}){
        commit(GETERROR,{error_no})
    }
}