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
	<view class="">
		<cu-custom bgColor="bg-gradual-pink">
			<block slot="content">记账</block>
		</cu-custom>
		<form>
			<view class="cu-form-group margin-top">
				<view class="title">普通选择</view>
				<picker @change="PickerChange" :value="index" :range="picker">
					<view class="picker">
						{{index>-1?picker[index]:'禁止换行，超出容器部分会以 ... 方式截断'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">日期选择</view>
				<picker mode="date" :value="date" @change="DateChange">
					<view class="picker">
						{{date}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group align-start">
				<view class="title">文本框</view>
				<textarea maxlength="-1" :disabled="modalName!=null" @input="textareaBInput" placeholder="多行文本输入框"></textarea>
			</view>
		</form>
	</view>
</template>

<script>
	import store from "@/store";
	import apiService from "@/api/api.service.js";
	const _apiService = new apiService();
	export default {
		data() {
			return {
				index: -1,
				picker: ['支出', '收入'],
				date: '2018-12-25',
				textareaBValue: ''
			};
		},
		onLoad() {

		},
		methods: {
			PickerChange(e) {
				this.index = e.detail.value
			},
			DateChange(e) {
				this.date = e.detail.value
			},
			textareaBInput(e) {
				this.textareaBValue = e.detail.value
			}
		},
	};
</script>

<style lang="scss" scoped>

</style>