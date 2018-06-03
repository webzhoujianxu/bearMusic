import * as types from './mutation-types';
const mutations = {
  [types.Play_Id](state,playId){
    state.playId = playId
  }
};

export default mutations
