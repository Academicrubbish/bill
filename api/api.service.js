const db = uniCloud.database() //创建数据库连接
import {
	getRandomString
} from '@/utils/utils.js'

class apiService {
	//获取openid
	getOpenid(code) {
		return uniCloud.callFunction({
			name: 'login',
			data: {
				code: code
			}
		})
	}
	//上传头像至云存储空间
	uploadAvatar(avatarUrl) {
		return uniCloud.uploadFile({
			cloudPath: 'cloudstorage/avatar/' + getRandomString() + '.png', // 上传至云端的路径
			filePath: avatarUrl, // 小程序头像临时文件路径
			cloudPathAsRealPath: true,
			fileType: 'image',
		})
	}
	//云数据库新增
	async addCollection(tableName, data) {
		let res = await db.collection(tableName).add(data)
		return res.result
	}
	//云数据库查询
	async getCollection(tableName, queryform) {
		let res = await db.collection(tableName).where(queryform).get()
		return res.result
	}
	//云数据库修改
	async updateCollection(tableName, queryform, data) {
		let res = await db.collection(tableName).where(queryform).update(data)
		return res.result
	}
}

export default apiService