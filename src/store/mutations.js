import {GETINFO,CONFIRM,GETERROR} from './mutation-types';

export default{
    [GETINFO](state,{info}){
        state.name = info.name;
        state.identify = info.identify;
    },
    [CONFIRM](state){
        state.isConfirm = true;
    },
    [GETERROR](state,{error_no}){
        state.error_no = error_no;
        state.isVerify = true;
    }
}