<template>
	<div>
		<button type="button" @click="login">按钮</button>
		<button type="button" @click="getOpenId">添加</button>
	</div>
</template>

<script>
	const db = uniCloud.database() //创建数据库连接
	import apiService from '@/api/api.service.js'
	const _apiService = new apiService()
	export default {
		data() {
			return {
				wechatData: {}, //openid和session_key
			}
		},
		methods: {
			login() {
				let that = this
				uni.login({
					provider: 'weixin', //使用微信登录
					success: async function(loginRes) {
						let res = await _apiService.getOpenid(loginRes.code)
						that.wechatData = res.result.data;
						console.log('用户信息', that.wechatData);
					}
				});
			},
			getOpenId() {
				// console.log('obj', this);
				_apiService.addCollection('bill_user', {
					name: '袁创',
					openId: this.wechatData.openid
				}).then(res => {
					console.log('add', res);
					_apiService.getCollection('bill_user', {
						_id: res.id
					}).then(cres => {
						console.log('get', cres);
					})
				})
			}
		}
	}
</script>

<style>
</style>