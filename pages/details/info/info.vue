<template>
	<view class="info">
		<view class="info-title">
			<text class="title-item">医院信息</text>
		</view>
		<view class="info-content">
			<text class="main-text">{{detail.company}}</text>
			<text class="main-text">地址：{{detail.province + detail.city + detail.area + detail.street}}</text>
			<view class="flex-between">
				<text class="main-text">联系人：{{detail.contacts[0].name ? detail.contacts[0].name : ''}}</text>
				<text class="call-btn" @tap="callSomeOne(detail.contacts[0].phone)">联系电话</text>
			</view>
		</view>
		<view class="info-from flex-between" @tap="toOut(detail.sourceUrl)">
			<text>来源：官方微博</text>
			<text> > </text>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			detail: {
				type: Object
			}
		},
		data() {
			return {

			}
		},
		methods: {
			callSomeOne(phone) {
				uni.makePhoneCall({
					phoneNumber: phone //仅为示例
				});
			},
			toOut(url) {
				window.location.replace(url);
			}
		}
	}
</script>

<style lang="less" scoped>
	.info {
		margin-top: 20upx;
		padding: 0 20upx;
		background-color: #FFFFFF;

		.info-title {
			height: 80upx;
			border-bottom: 1upx solid #ededed;

			.title-item {
				line-height: 80upx;
				padding: 16upx 0;
				font-size: 32upx;
				border-bottom: 4upx solid var(--mainColor);
			}
		}

		.info-content {
			display: flex;
			flex-direction: column;
			padding: 30upx 0;

			.main-text {
				font-family: PingFangSC-Semibold;
				font-size: 28upx;
				color: #333333;
				line-height: 50upx;
			}
		}

		.info-from {
			display: flex;
			align-items: center;
			height: 120upx;
			border-top: 1upx solid #ededed;
			font-family: PingFangSC-Semibold;
			font-size: 12px;
			color: #999999;
		}
	}
</style>
