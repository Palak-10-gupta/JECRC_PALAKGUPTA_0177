// src/utils/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

// Response interceptor
api.interceptors.response.use(
  function (response) { return response; },
  function (error) {
    var msg = (error.response && error.response.data && error.response.data.message)
      ? error.response.data.message
      : error.message || 'Something went wrong';
    return Promise.reject(new Error(msg));
  }
);

// ─── Catalog APIs ────────────────────────────────────────────────────────────
export var catalogApi = {
  getAll:    function () { return api.get('/catalogs'); },
  getByType: function (type) { return api.get('/catalogs/' + type); },
  add:       function (type, data) { return api.post('/catalogs/' + type, data); },
  update:    function (type, id, data) { return api.put('/catalogs/' + type + '/' + id, data); },
  remove:    function (type, id) { return api.delete('/catalogs/' + type + '/' + id); },
};

// ─── Bill APIs ───────────────────────────────────────────────────────────────
export var billApi = {
  getAll:    function (params) { return api.get('/bills', { params: params }); },
  getById:   function (id) { return api.get('/bills/' + id); },
  create:    function (data) { return api.post('/bills', data); },
  update:    function (id, data) { return api.put('/bills/' + id, data); },
  setStatus: function (id, status) { return api.patch('/bills/' + id + '/status', { status: status }); },
  remove:    function (id) { return api.delete('/bills/' + id); },
  summary:   function (date) { return api.get('/bills/summary/daily', { params: date ? { date: date } : {} }); },
};

export default api;