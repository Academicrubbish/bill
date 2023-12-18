const db = uniCloud.database() //创建数据库连接

class apiService {
	getOpenid(code) {
		return uniCloud.callFunction({
			name: 'login',
			data: {
				code: code
			}
		})
	}

	async addCollection(tableName, data) {
		let res = await db.collection(tableName).add(data)
		return res.result
	}

	async getCollection(tableName, data) {
		let res = await db.collection(tableName).where(data).get()
		return res.result
	}
}

export default apiService