'use strict'
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)

	const appid = 'wx9426c3603dccdf05'
	const secret = '593b51525def3c57deb6e2d3034624ed'
	const apiUrl = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&js_code=' +
		event.code + '&grant_type=authorization_code'
	const res = await uniCloud.httpclient.request(apiUrl, {
		method: 'GET',
		data: {},
		contentType: 'json', // 指定以application/json发送data内的数据
		dataType: 'json' // 指定返回值为json格式，自动进行parse
	})

	//返回数据给客户端
	return res
}