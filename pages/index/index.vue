<template>
	<view class="content">
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText" />
			<block slot="content">完善信息</block>
		</cu-custom>
		<!-- <view class="avatar-wrapper">
			<button open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
				<image class="avatar" :src="avatarUrl"></image>
			</button>
		</view>
		<view class="cu-form-group margin-top">
			<view class="title">昵称</view>
			<input name="input" type="nickname" class="weui-input" placeholder="请输入昵称" />
		</view>
		<button class="cu-btn bg-green lg">确定</button> -->
		<view class="cu-modal show">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-gray"></text>
					</view>
				</view>
				<view class="model-content">
					<view class="title">
						获取你的头像和昵称
					</view>
					<view class="text">
						为了更方便的让朋友们识别您的身份我们需要获取您的微信头像和昵称
					</view>
					<button class="cu-btn bg-green" @click="wxAuthorize">微信授权</button>
				</view>
			</view>
		</view>

		<!-- 	<view class="cu-modal bottom-modal" class="show">
			<view class="cu-dialog">
				<view class="cu-bar bg-white">
					<view class="action text-green">确定</view>
					<view class="action text-blue" @tap="hideModal">取消</view>
				</view>
				<view class="padding-xl">
					Modal 内容。
				</view>
			</view>
		</view> -->
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
			wxAuthorize() {},
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

	.model-content {
		padding: 0 110rpx 60rpx;
		background-color: white;

		.title {
			font-size: 34rpx;
			font-weight: bold;
		}

		.text {
			padding: 30rpx 0;
			color: grey;
		}
	}
</style>