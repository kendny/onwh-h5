let HOST = ''
let IMG_HOST = ''
let ENV = process.env.NODE_ENV

if (ENV == 'development') {
	// 开发环境
	HOST = 'https://whapi.51rry.com/'
	IMG_HOST = 'https://whapi.51rry.com/'
	
} else {
	// 生产环境
	HOST = 'https://whapi.51rry.com/'
	IMG_HOST = 'https://whapi.51rry.com/'
}

export default {
	HOST,
	IMG_HOST
}
