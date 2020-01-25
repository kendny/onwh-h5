<template>
	<view class="list">
		<section class="PullScroll-Page">
			<PullScroll ref="pullScroll" :fixed="false" :back-top="true" :pullDown="pullDown" :pullUp="pullUp">
				<view class="swiper-item" v-for="(item,index) in list" :key="index" v-if="list.length > 0">
					<view class="item-top">
						<view class="top-left">
							<image class="item-avatar" :src="item.logo? item.logo:'/static/logo.png'" mode="widthFix"></image>
							<view class="left-box">
								<text class="item-name" v-text="item.company"></text>
								<text class="item-sex">{{item.createTime ? item.createTime : '2020-01-24 19:00'}} 来源：{{item.source}}</text>
							</view>
						</view>
					</view>
					<view class="item-main">
						<view class="item-more flex-between">
							<text>急需物资类型</text>
							<text class="more-main" @tap="toDetails(item.id)">更多详情</text>
						</view>
						<view class="item-content">
							<view class="item-wuzi flex-between" v-for="(child,idx) in item.details" :key="idx">
								<text>{{child.name}}</text>
								<text v-if="child.amount > 0">{{child.amount}} / {{child.unit}}</text>
								<text v-else>不限</text>
							</view>
						</view>
					</view>
					<view class="item-call flex-between">
						<text></text>
						<view class="call-btn" @tap="handleModel(index)">联系医院</view>
					</view>
				</view>
			</PullScroll>
		</section>
		<view class="right-us" @tap="handleModel(-1)">
			<!-- <image src="../../static/logo.png" mode="widthFix" class="us-img"></image> -->
			<view class="call-btns">us</view>
		</view>
		<view class="model-wrap" v-if="showModel" @tap="hideModel">
			<view class="model">
				<view class="model-item flex-between" v-for="(item,index) in callList" :key="index">
					<text class="text">{{item.name}}</text>
					<text class="call-btn" v-if="item.phone" @tap="callSomeOne(item.phone)">拨打电话</text>
					<text class="model-email" v-if="item.email" @tap="copy(item.email)">{{item.email}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import PullScroll from '../../components/s-pull-scroll/index.vue'
	import tabs from '../../components/yc_tabs/yc_tabs.vue'
	import {
		Request
	} from '../../utils/http.js'
	export default {
		components: {
			PullScroll,
			tabs
		},
		data() {
			return {
				showModel: false,
				callList: [],
				list: [],
				startNum: 1,
				current: 0,
				tabList: [{
					title: '待回答',
					hasRed: true,
					num: '99+'
				}, {
					title: '已回答',
					hasRed: false,
					num: 99
				}]
			};
		},
		methods: {
			copy(email) {
				uni.setClipboardData({
					data: email,
					success: function(res) {
						uni.showToast({
							title: '邮箱复制成功',
							icon: none,
							duration: 1500
						})
					},
					fail: function() {
						uni.showToast({
							title: '邮箱复制失败',
							icon: none,
							duration: 1500
						})
					}
				});
			},
			handleModel(index) {
				if (index == -1) {
					this.callList = [{
						name: '印凯',
						phone: '15071369696'
					}, {
						name: '邮箱',
						email: 'lp_developer@163.com'
					}]
				} else {
					this.callList = this.list[index].contacts;
				}
				this.showModel = true;
			},
			hideModel() {
				this.showModel = false;
			},
			toDetails(id) {
				uni.navigateTo({
					url: '../details/details?id=' + id
				})
			},
			tabClick(e) {
				let current = typeof e === 'object' ? e.detail.current : e;
				this.current = current;
				this.$refs.tab.tabToIndex(current);
			},
			// 打电话功能
			callSomeOne(phone) {
				uni.makePhoneCall({
					phoneNumber: phone //仅为示例
				});
			},
			//初始化下拉加载插件和数据
			refresh() {
				this.$nextTick(() => {
					this.$refs.pullScroll.refresh();
				});
			},
			pullDown(pullScroll) {
				let that = this;
				// that.list = [];
				setTimeout(() => {
					that.loadData(pullScroll, 1);
				}, 200);
			},
			pullUp(pullScroll) {
				let that = this;
				that.startNum++
				that.loadData(pullScroll, that.startNum);
			},
			loadData(pullScroll, index) {
				let that = this;
				let params = {
					pageSize: 10,
					start: index
				}
				
				that.$api.getDemandList(params)
					.then(res => {
						console.log("res:===", res)
						if (this.list.length == res.data.total) {
							// finish(boolean:是否显示finishText,默认显示)
							pullScroll.finish(this.list.length > 5);
						} else {
							pullScroll.success();
							that.list = that.list.concat(res.data.list)
						}
					}).catch(err => {
						console.log(err)
					})
				
				// Request.doInvoke('demand', 'GET', data)
				// 	.then(res => {
				// 		if (this.list.length == res.data.total) {
				// 			// finish(boolean:是否显示finishText,默认显示)
				// 			pullScroll.finish(this.list.length > 5);
				// 		} else {
				// 			pullScroll.success();
				// 			that.list = that.list.concat(res.data.list)
				// 		}
				// 	}).catch(err => {
				// 		console.log(err)
				// 	})
			}
		},
		computed: {
			swiperHeight: function() {
				if (this.waitList.length == 0) {
					return (100) + 'vh'
				} else {
					return (140 * this.waitList.length + 20) + 'px';
				}
			}
		},
		onLoad() {
			this.refresh();
		}
	};
</script>

<style lang="scss">
	.PullScroll-Page {
		height: 100vh;

		.btn {
			width: 100%;
			height: 80rpx;
			font-size: 28rpx;

			&:not(:first-child) {
				margin-top: 40rpx;
			}
		}

		.swiper-item {
			background-color: #FFFFFF;
			padding: 0 20upx;
			box-sizing: border-box;

			.item-top {
				display: flex;
				align-items: center;
				justify-content: space-between;
				height: 128upx;

				.top-right {
					background: #FF5000;
					border-radius: 4upx;
					font-family: PingFangSC-Regular;
					font-size: 24upx;
					color: #FFFFFF;
					padding: 4upx;
				}

				.top-left {
					display: flex;
					align-items: center;

					.item-avatar {
						width: 88upx;
						height: 88upx;
					}

					.left-box {
						display: flex;
						flex-direction: column;
						padding-left: 20upx;

						.item-name {
							font-family: PingFangSC-Semibold;
							font-size: 32upx;
							color: #333333;
							line-height: 44upx;
						}

						.item-sex {
							line-height: 36upx;
							font-family: PingFangSC-Semibold;
							font-size: 24upx;
							color: #999999;
						}
					}
				}
			}

			.item-main {
				margin-left: 108upx;

				.item-more {
					display: flex;
					align-items: center;
					height: 76upx;
					color: #333;
					font-size: 28upx;

					.more-main {
						color: var(--mainColor);
					}
				}

				.item-wuzi {
					border-bottom: 1upx solid #f2f2f2;
					height: 72upx;

					&:last-child {
						border: none;
					}
				}
			}

			.item-call {
				display: flex;
				align-items: center;
				height: 96upx;
				border-top: 1upx solid #ededed;
				margin-left: 108upx;
			}
		}
	}

	.model-wrap {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 10;
		background: rgba(#000000, 0.5);



		.model {
			width: 80%;
			border-radius: 5px;
			background-color: #fff;
			padding: 0 20upx;

			.model-item {
				padding: 20upx 0;
				display: flex;
				align-items: center;
				border-bottom: 1upx solid #ededed;

				&:last-child {
					border: none;
				}

				.text {
					font-family: PingFangSC-Semibold;
					font-size: 32upx;
					color: #666666;
				}

				.model-email {
					color: var(--mainColor);
					font-family: PingFangSC-Semibold;
					font-size: 32upx;
				}
			}
		}
	}

	.right-us {
		position: fixed;
		right: 0;
		bottom: 300upx;

		.us-img {
			width: 120upx;
		}

		.call-btns {
			display: flex;
			align-items: center;
			justify-content: center;
			border: 1upx solid var(--mainColor);
			background-color: #FFFFFF;
			color: var(--mainColor);
			width: 60upx;
			height: 60upx;
			border-radius: 50%;
			font-size: 28upx;
		}
	}
</style>
