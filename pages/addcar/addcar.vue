<template>
	<view>
		<navUrl :url="url"></navUrl>
		<view class="content-box">
			<view class="item">
				<view class="item-title">运输渠道</view>
				<input placeholder="点击请输入" type="text" v-model="postInfo.carTeamName" />
			</view>
			
			<view class="item">
				<view class="item-title">联系人</view>
				<input placeholder="点击请输入" type="text" v-model="postInfo.name"  />
			</view>
			
			<view class="item">
				<view class="item-title">联系电话</view>
				<input placeholder="点击请输入" type="number" v-model="postInfo.phone"  />
			</view>
			
			<view class="item">
				<view class="item-title">配送范围</view>
				<input placeholder="点击请输入" type="number" v-model="postInfo.phone"  />
			</view>
			
			<view class="item">
				<view class="item-title">配送时间</view>
				<input placeholder="点击请输入" type="number" v-model="postInfo.phone"  />
			</view>
			
			<view class="note">
				<view class="note-title">备注信息</view>
				<textarea class="note-content"></textarea>
			</view>
		</view>
	</view>
</template>

<script>
	import navUrl from '../../components/nav-url.vue'
	export default {
		data() {
			return {
				url: '/pages/index/index',
				postInfo: {
					"carTeamName": "",
					"city": "",
					"createTime": 0,
					"deliveryArea": "",
					"deliveryEndTime": "",
					"deliveryStartTime": "",
					"id": 0,
					"name": "",
					"phone": "",
					"province": "",
					"remark": "",
					"status": 0,
					"updateTime": 0
				}
			}
		},
		components:{
			navUrl
		},
		methods: {
			
		}
	}
</script>

<style lang="less">
.content-box{
	display: flex;
	flex-direction: column;
	.item{
		display: flex;
		flex-direction: row;
		height: 90rpx;
		line-height: 90rpx;
		background-color: #FFFFFF;
		border-bottom: 1rpx solid #eeeeee;
		padding-left: 28rpx;
		padding-right: 28rpx;
		justify-content: space-between;
		input{
			padding-left: 28rpx;
			padding-right: 28rpx;
			height: 90rpx;
			line-height: 90rpx;
			text-align: right;
			// height: ;
		}
	}
	.item-title{
		font-family: PingFangSC-Regular;
		font-size: 26rpx;
		color: #333333;
		letter-spacing: 0;
	}
}
</style>