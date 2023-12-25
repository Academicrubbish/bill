<!--
 * @Author: yuanchuang 1226377893@qq.com
 * @Date: 2023-12-25 12:13:42
 * @LastEditors: yuanchuang 1226377893@qq.com
 * @LastEditTime: 2023-12-25 13:52:42
 * @FilePath: \pages\index\index.vue
 * @Description: 记账页
 * 
-->

<template>
	<view class="content">

		<avatar-name-popup />

	</view>
</template>

<script>
import AvatarNamePopup from '@/component/AvatarNamePopup.vue'
import store from "@/store";
import apiService from "@/api/api.service.js";
const _apiService = new apiService();
export default {
	components: {
		AvatarNamePopup
	},
	data() {
		return {

		};
	},
	onLoad() {

	},
	methods: {

	},
};
</script>

<style lang="scss" scoped></style>