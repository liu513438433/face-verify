import {GETINFO,CONFIRM,GETERROR} from './mutation-types';

export default{
    getInfo({commit},{info}){
        commit(GETINFO,{info})
    },
    confirm({commit}){
        commit(CONFIRM)
    },
    getError({commit},{error_no}){
        commit(GETERROR,{error_no})
    }
}