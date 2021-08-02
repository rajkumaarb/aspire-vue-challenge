import axios from 'axios';

const loanStateModule = {
  namespaced: true,
  state: {
    userLoans: []
  },
  mutations: {
    setLoans(state, data) {
      state.userLoans = [...data];
    },
    updateLoan(state, data) {
      let approvedLoan = state.userLoans.findIndex(loan => loan.loanId === data.loanId);
      if (approvedLoan >= 0) {
        state.userLoans[approvedLoan].loanDue = 'Next Week';
      }
    }
  },
  actions: {
    approve(context, payload) {
      return axios.put('http://localhost:3000/api/loan', payload)
        .then(res => {
          context.commit('updateLoan', payload);
          return res;
        })
        .catch(err => {
          throw err;
        })
    },
    getLoanByUser(context, payload) {
      return axios.get(`http://localhost:3000/api/loan/${payload}`)
        .then((res) => {
          context.commit('setLoans', res.data.loans);
          return res.data.loans;
        })
        .catch(err => {
          throw err;
        });
    },
    createLoan(context, payload) {
      return axios.post('http://localhost:3000/api/loan', payload)
        .then(res => {
          context.commit('setLoans', res.data.loans);
          return res.data.loans;
        })
        .catch(err => {
          throw err;
        })
    }
  },
  getters: {
    getLoans(state) {
      return state.userLoans;
    }
  }
};

export default loanStateModule;