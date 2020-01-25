import {
    http
} from "./http.js"
import config from '@/utils/config.js'

let host = config.HOST
export default {
	getDemandDetail: params => {
		if(params.id){
			return http.get(`demand/`+params.id + '/')
		}
	},
	getDemandList: params => {
		return http.get(`demand/`, params)
	}
  
}
