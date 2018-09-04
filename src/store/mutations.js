import {GETINFO} from './mutation-types';

export default{
    [GETINFO](state,{info}){
        state.name = info.name;
        state.identify = info.identify;
    }
}