<template>
	<view class="content">
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText" />
			<block slot="content">完善信息</block>
		</cu-custom>
		<view class="avatar-wrapper">
			<button open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
				<image class="avatar" :src="avatarUrl"></image>
			</button>
		</view>
		<view class="cu-form-group margin-top">
			<view class="title">昵称</view>
			<input name="input" type="nickname" class="weui-input" placeholder="请输入昵称" />
		</view>
		<button class="cu-btn bg-green lg">确定</button>
		<!-- <button @click="uploadAvatar">确定</button> -->
	</view>
</template>

<script>
	import store from '@/store'
	import apiService from '@/api/api.service.js'
	const _apiService = new apiService()
	export default {
		data() {
			return {
				avatarUrl: "/static/0.png",
			}
		},
		onLoad() {
			console.log(store.state);
		},
		methods: {
			aaa() {
				console.log(this.avatarUrl);
			},
			onChooseAvatar(e) {
				const {
					avatarUrl
				} = e.detail
				this.avatarUrl = avatarUrl
			},
			async uploadAvatar() {
				let response = await _apiService.uploadAvatar(this.avatarUrl);
				console.log('111', response);
			},
		}
	}
</script>

<style lang="scss" scoped>
	.avatar-wrapper {
		height: 400rpx;
		position: relative;

		button {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			border: none !important;
			width: 120rpx;
			height: 120rpx;
			padding: 0;
		}

		.avatar {
			width: 100%;
			height: 100%;
		}
	}

	.cu-btn {
		width: 90%;
		margin: 60rpx 5% 0;
	}
</style>