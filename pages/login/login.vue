<!--
 * @Author: yuanchuang 1226377893@qq.com
 * @Date: 2023-12-20 10:44:17
 * @LastEditors: yuanchuang 1226377893@qq.com
 * @LastEditTime: 2023-12-20 17:55:25
 * @FilePath: \bill\pages\login\login.vue
 * @Description: 登录页
-->

<template>
	<view class="login">
		<view class="animation-slide-bottom login_title">
			<image src="/static/logo.png" />
		</view>
		<view class="animation-slide-bottom login_comment">
			<text>- 小姚记账本 -</text>
		</view>
		<view class="animation-slide-bottom login_login">
			<view class="lg login_btn" @click="login">微信登录</view>
		</view>
		<view class="cu-load load-modal" v-if="loadModal">
			<image src="/static/loading.png" mode="aspectFit"></image>
			<view class="gray-text">登录中...</view>
		</view>
	</view>
</template>

<script>
	import store from '@/store'
	import apiService from '@/api/api.service.js'
	const _apiService = new apiService()
	export default {
		data() {
			return {
				wechatData: {}, //openid和session_key
				loadModal: false
			}
		},
		methods: {
			login() {
				this.loadModal = true;
				uni.login({
					provider: 'weixin', //使用微信登录
					success: async (loginRes) => {
						try {
							const res = await _apiService.getOpenid(loginRes.code);
							this.wechatData = res.result.data;
							this.checkUserExistence();
						} catch (error) {
							// 处理登录失败的逻辑
							this.toCatch()
						}
					},
					fail: (error) => {
						// 处理登录失败的逻辑
						this.toCatch()
					}
				});
			},

			async checkUserExistence() {
				try {
					const openId = this.wechatData.openid;
					store.commit('setUserOpenId', openId);
					const response = await _apiService.getCollection('bill_user', {
						openId: openId
					});

					if (response.data.length === 0) { //不存在该用户
						await _apiService.addCollection('bill_user', {
							nickName: '', //昵称
							avatar: '', //头像
							openId: openId //唯一标识
						});
					}
					this.loadModal = false;
					uni.switchTab({
						url: '/pages/index/index'
					})
				} catch (error) {
					// 处理检查用户存在性失败的逻辑
					this.toCatch()
				}
			},

			toCatch() {
				this.loadModal = false;
				uni.showToast({
					title: '登陆失败，请稍后再试',
					icon: 'none',
					position: 'center',
					duration: 2000
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