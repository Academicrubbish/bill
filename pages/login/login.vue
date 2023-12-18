<template>
	<div>
		<button type="button" @click="login">按钮</button>
		<button type="button" @click="getOpenId">添加</button>
	</div>
</template>

<script>
	const db = uniCloud.database() //创建数据库连接
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
						let res = await uniCloud.callFunction({
							name: 'login',
							data: {
								code: loginRes.code
							}
						})
						that.wechatData = res.result.data;
						console.log('用户信息', that.wechatData);
					}
				});
			},
			getOpenId() {
				// console.log('obj', this);
				db.collection('bill_user').add({
					name: '袁创',
					openId: this.wechatData.openid
				}).then(res => {
					console.log(res);
				})
			}
		}
	}
</script>

<style>
</style>