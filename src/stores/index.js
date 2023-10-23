import axios from 'axios'
import {
  defineStore
} from 'pinia'

const baseURL = 'https://interview.intelligent-systems-solutions.com'
const token = localStorage.getItem("accessToken");

export const useBrandsStore = defineStore('BrandsStore', {

  actions: {
    login(params) {
      return axios.post(`${baseURL}/api/Auth/Authenticate`, params, )
    },

    getAllBrands(params) {
      return axios.get(`${baseURL}/api/Brand`, {
        headers: {
          Authorization: `Bearer ${token}`,
          token: token,
        },
        params,
      })
    },

    // 👉 viewBrand
    viewBrand(id) {
      return new Promise((resolve, reject) => {
        axios.get(`${baseURL}/api/Brand/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            token: token,
          },
        }).then(response => resolve(response)).catch(error => reject(error))
      })
    },

    // 👉 addBrand
    addBrand(brandData) {
      return axios.post(`${baseURL}/api/Brand`,
        brandData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          },
        })
    },


    updateBrand(id, params) {
      return new Promise((resolve, reject) => {
        axios.put(`${baseURL}/api/Brand/${id}`,params, {
              headers: {
                Authorization: `Bearer ${token}`,
                token: token,
              },
            },
            ).then(response => resolve(response))
          .catch(error => reject(error))
      })
    },

    deleteBrand(id, params) {
      return new Promise((resolve, reject) => {
        axios.delete(`${baseURL}/api/Brand/Remove/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              token: token,
            },
          }, params).then(response => resolve(response))
          .catch(error => reject(error))
      })
    },

    activateBrand(id, params) {
      return new Promise((resolve, reject) => {
        axios.post(`${baseURL}/api/Brand/Activation/${id}`, params, {
            headers: {
              Authorization: `Bearer ${token}`,
              token: token,
            },

          }).then(response => resolve(response))
          .catch(error => reject(error))
      })
    },

    getLanguages(params) {
      return axios.get(`${baseURL}/api/Languages`, {
        headers: {
          Authorization: `Bearer ${token}`,
          token: token,
        },
        params,
      })
    },
  },

})
