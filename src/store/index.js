import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
      apiUrl: 'http://164.90.161.80:3000/api',
      items: [],
      currentItem: {},
      files: {
        folder: 'mdi-folder',
        folderOpen: 'mdi-folder-open',
        jpg: 'mdi-file-image',
        epub: 'mdi-file-document-outline',
        zip: 'mdi-folder-zip',
      },
    },
    getters: {
      items: state => {
        return state.items;
      },
      currentItem: state => {
        return state.currentItem;
      },
      files: state => {
        return state.files;
      },
    },
    mutations: {
      SET_ITEMS(state, items) {
        state.items = [...items];
      },
      SET_ITEM(state, { item }) {
        state.currentItem = item;
      }
    },
    actions: {
      fetchRootData({commit, state}) {
        fetch(`${state.apiUrl}/content`)
          .then(res => res.json())
          .then(json => (commit('SET_ITEMS', json.children)))
          .catch(err => console.warn(err))
      },
      fetchItem({commit, state}, { id }) {
        fetch(`${state.apiUrl}/content?dirId=${id}`)
          .then(res => res.json())
          .then(json => {
            commit('SET_ITEM', {
              item: json
            });
          })
          .catch(err => console.warn(err))
      },
    }
});