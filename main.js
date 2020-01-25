import Vue from 'vue'
import App from './App'

import api from '@/utils/api/api.js'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})

Vue.prototype.$api = api


app.$mount()
