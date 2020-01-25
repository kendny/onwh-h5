import {
    http
} from "./http.js"
import config from '@/utils/config.js'

let host = config.HOST
export default {
	getDemandDetail: params => {
		return http.get(`demand/`, params)
	},
  
}
