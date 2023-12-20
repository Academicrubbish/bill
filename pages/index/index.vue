<template>
	<view class="content">
		<button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
			<view class="cu-avatar radius" :style="{backgroundImage:'url('+avatarUrl+')'}"></view>
		</button>
		<input type="nickname" class="weui-input" placeholder="请输入昵称" />
		<button @click="uploadAvatar">按钮</button>
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

<style>
	.aa {
		transform: translate(-50%, -50%);
	}
</style>