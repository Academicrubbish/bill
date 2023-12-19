<template>
	<view class="login">
		<view class="animation-slide-bottom login_title">
			<image src="../../static/logo.png" />
		</view>
		<view class="animation-slide-bottom login_comment">
			<text>- 小姚记账本 -</text>
		</view>
		<view class="animation-slide-bottom login_login">
			<!-- <view class="cu-bar btn-group"> -->
			<view class="lg login_btn">微信登录</view>
			<!-- </view> -->
			<!-- <view class="text-center text-grey margin-top" @tap="browse"><text style="text-decoration: underline">先看看</text> -->
		</view>
	</view>
	<!-- <div>
		<button type="button" @click="login">按钮</button>
		<button type="button" @click="getOpenId">添加</button>
	</div> -->
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

<style lang="scss" scoped>
	.login {
		height: 100%;

		.login_title {
			text-align: center;
			animation-delay: 0.2s;
			margin-top: 300rpx;

			image {
				width: 150rpx;
				height: 150rpx;
				border-radius: 15rpx;
			}
		}

		.login_comment {
			text-align: center;
			margin-top: 40rpx;
			font-size: 34rpx;
			animation-delay: 0.3s;
		}

		.login_login {
			width: 100%;
			animation-delay: 0.4s;
			position: absolute;
			bottom: 230rpx;

			.login_btn {
				background-color: #07cc77;
				color: white;
				text-align: center;
				line-height: 80rpx;
				width: 85%;
				margin: auto;
				border-radius: 10rpx;
			}
		}
	}
</style>