<!--
 * @Author: yuanchuang 1226377893@qq.com
 * @Date: 2023-12-25 13:27:03
 * @LastEditors: yuanchuang 1226377893@qq.com
 * @LastEditTime: 2023-12-25 13:49:45
 * @FilePath: \component\AvatarNamePopup.vue
 * @Description: 校验用户头像昵称弹窗
 * 
-->

<template>
	<view>
		<view class="cu-modal" :class="tipModel ? 'show' : ''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-gray"></text>
					</view>
				</view>
				<view class="tip-model-content">
					<view class="title"> 获取你的头像和昵称 </view>
					<view class="text">
						为了更方便的让朋友们识别您的身份我们需要获取您的微信头像和昵称
					</view>
					<button class="cu-btn bg-green" @click="wxAuthorize">微信授权</button>
				</view>
			</view>
		</view>

		<view class="cu-modal bottom-modal" :class="btmModel ? 'show' : ''">
			<view class="cu-dialog">
				<view class="btm-model-content">
					<view class="title">
						<text>获取你的头像和昵称</text>
						<text>为了更加个性化的区别您和其它用户，请您授权您的头像和昵称</text>
					</view>

					<view class="form">
						<view class="form-item">
							<button class="cu-btn item-avatar" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
								<text>头像</text>
								<image :src="form.avatar"></image>
							</button>
						</view>
						<view class="form-item">
							<text class="item-label">昵称</text>
							<input class="item-input" v-model="form.nickName" type="nickname" placeholder="请输入昵称" />
						</view>
					</view>
					<view class="name-tip">昵称限1-32个字符，一个汉字为2个字符</view>
					<button class="cu-btn btm-btn text-green" @click="hideModal">
						拒绝
					</button>
					<button class="cu-btn btm-btn bg-green" @click="submit">
						允许
					</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import store from "@/store";
import apiService from "@/api/api.service.js";
const _apiService = new apiService();
export default {
	data() {
		return {
			openId: store.state.openId,
			form: {
				avatar: "/static/0.png",
				nickName: ""
			},
			tipModel: false,
			btmModel: false,
		};
	},
	created() {
		//判断用户是否填写头像和昵称
		this.isProfileComplete()
	},
	methods: {
		async isProfileComplete() {
			let response = await _apiService.getCollection('bill_user', {
				openId: this.openId
			})
			console.log(response);
			if (response.data[0].avatar == '' && response.data[0].nickName == '') {
				this.tipModel = true;
			}
		},
		onChooseAvatar(e) {
			const {
				avatarUrl
			} = e.detail;
			this.form.avatar = avatarUrl;
		},
		async submit() {
			await _apiService.updateCollection('bill_user', {
				openId: this.openId
			}, {
				avatar: await this.uploadAvatar(),
				nickName: this.form.nickName
			})
			this.btmModel = false;
			this.tipModel = false
		},
		async uploadAvatar() {
			let response = await _apiService.uploadAvatar(this.form.avatar);
			return response.fileID
		},
		hideModal() {
			this.tipModel = false;
			this.btmModel = false;
		},
		wxAuthorize() {
			this.btmModel = true;
		}
	},
};
</script>

<style lang="scss" scoped>
.tip-model-content {
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

.btm-model-content {
	padding: 60rpx 50rpx;
	background-color: white;

	.title {
		text {
			text-align: left;
			display: block;
		}

		text:first-child {
			font-size: 32rpx;
		}

		text:nth-child(2) {
			font-size: 20rpx;
			color: grey;
		}
	}

	.text {
		padding: 30rpx 0;
		color: grey;
	}
}

.form {
	margin-top: 40rpx;

	.form-item {
		height: 120rpx;
		display: flex;
		align-items: center;

		.item-label {
			flex: 1;
			text-align: left;
		}

		.item-input {
			flex: 2;
			text-align: right;
			padding-right: 20rpx;
		}

		.item-avatar {
			width: 100%;
			height: 100%;
			padding: 0;
			position: relative;
			background: white;

			text {
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
			}

			image {
				position: absolute;
				right: 0;
				width: 80rpx;
				height: 80rpx;
				margin: 20rpx;
				border-radius: 10rpx;
			}
		}
	}
}

.name-tip {
	text-align: left;
	font-size: 20rpx;
	color: grey;
	margin: 40rpx 0;
}

.btm-btn {
	width: 160rpx;
	height: 56rpx;
	margin: 0 10rpx 40rpx;
}
</style>