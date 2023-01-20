export default {
  namespaced: true,
  state: {
    dishes: [
      {
        id: 1,
        image: "https://i.imgur.com/0umadnY.jpg",
        name: "Burger",
        description:
          "Un hamburger est un sandwich composé d'une ou plusieurs tranches de viande hachée, généralement du bœuf, placées dans un petit pain ou une brioche.",
        note: 4
      },
      {
        id: 2,
        image: "https://i.imgur.com/b9zDbyb.jpg",
        name: "Pizza",
        description:
          "La pizza est un plat savoureux d'origine italienne, consistant en une base généralement ronde et aplatie de pâte levée à base de blé.",
        note: 5
      },
      {
        id: 3,
        image: "https://i.imgur.com/RbKjUjB.jpg",
        name: "Petits choux",
        description:
          "Le chou de Bruxelles est une variété de chou, plante herbacée de la famille des Brassicaceae. C’est vraiement pas bon...",
        note: 1
      },
      {
        id: 4,
        image: "https://i.imgur.com/xAuhNVg.jpg",
        name: "BBQ Ribs",
        description:
          "Les BBQ ribs ou barbecue ribs sont des grands classiques très appréciés partout dans le monde.",
        note: 5
      }
    ]
  },
  getters: {
    dishes: state => state.dishes
  },
  actions: {
    initialiseStore({commit}) {
      commit('INITIALISE_STORE');
    },
    addDishe({ commit, state }, dishe) {
      let id = 1
      if (state.dishes.length) {
        id = Math.max(...state.dishes.map(dishe => dishe.id)) + 1
      }
      dishe.id = id
      commit('ADD_DISHE', dishe);
    },
    deleteDishe({ commit }, disheId) {
      commit('DELETE_DISHE', disheId);
    },
    updateDishe({ commit }, dishe) {
      commit('UPDATE_DISHE', dishe);
    }
  },
  mutations: {
    INITIALISE_STORE(state) {
      const localStorageDishes = JSON.parse(localStorage.getItem('dishes'))
      if (localStorageDishes && localStorageDishes.length) {
        state.dishes = localStorageDishes
      }
    },
    ADD_DISHE (state, dishe) {
      state.dishes.push(dishe)
    },
    DELETE_DISHE (state, disheId) {
      state.dishes = state.dishes.filter((dishe) => dishe.id !== disheId)
    },
    UPDATE_DISHE (state, dishe) {
      const index = state.dishes.findIndex((item) => item.id === dishe.id);
      if (index !== -1) {
        Object.assign(state.dishes[index], dishe)
      }
    }
  },
};
