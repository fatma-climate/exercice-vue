import Vue from "vue";
import Vuex from "vuex";
import tasks from '../store/modules/tasks';

Vue.use(Vuex);

export default function(/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      tasks
    },
    strict: process.env.DEV
  });

  Store.subscribe( (mutation, state) => {
    localStorage.setItem('dishes', JSON.stringify(state.tasks.dishes));
  });
  
  return Store;
}
