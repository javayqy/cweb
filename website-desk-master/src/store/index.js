import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  username: window.sessionStorage.getItem("username"),
  token: window.sessionStorage.getItem("token"),
  avatarUrl: window.sessionStorage.getItem("avatarUrl"),
  role:window.sessionStorage.getItem("role"),
};

// 实时监听 state 值的变化(最新状态)
const getters = {
  getUsername(state) {
    return state.username;
  },
  getToken() {
    return state.token;
  },
  getAvatarUrl() {
    return state.avatarUrl;
  },
  getRole() {
    return state.role;
  },
};

// 改变state值
// 同步
const mutations = {
  setToken(state, newtoken) {
    //自定义改变 state 初始值的方法，这里面的参数除了 state 之外还可以再传额外的参数(变量或对象);
    state.token = newtoken;
    window.sessionStorage.setItem("token", newtoken);
  },
  setUsername(state, newUsername) {
    state.username = newUsername;
    window.sessionStorage.setItem("username", newUsername);
  },
  setAvatarUrl(state, newAvatarUrl) {
    state.avatarUrl = newAvatarUrl;
    window.sessionStorage.setItem("avatarUrl", newAvatarUrl);
  },
  setRole(state, newRole) {
    state.role = newRole;
    window.sessionStorage.setItem("role", newRole);
  }
};

// 自定义触发 mutations 里函数的方法， context 与 store 实例具有相同方法和属性
// 异步
const actions = {
  setToken(context, token) {
    context.commit("setToken", token);
  },
  setUsername(context, username) {
    context.commit("setUsername", username);
  },
  setAvatarUrl(context, avatarUrl) {
    context.commit("setAvatarUrl", avatarUrl);
  },
  setRole(context, role) {
    context.commit("setRole", role);
  }
};



const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
});

export default store;
