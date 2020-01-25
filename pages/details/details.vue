<template>
	<view class="detail-wrap">
		<Info :detail="details"></Info>
		<view class="detail-head">
			<tabs ref="tab" :tabData="tabList" :defaultIndex="current" @tabClick='tabClick'></tabs>
		</view>
		<swiper class="swiper" :current="current" @change="tabClick" :style="{height: '100vh'}">
			<swiper-item>
				<view class="item-wrap">
					<view class="item-wuzi flex-between" v-for="(child,idx) in details.details" :key="idx">
						<text>{{child.name}}</text>
						<text v-if="child.amount > 0">{{child.amount}} / {{child.unit}}</text>
						<text v-else>不限</text>
					</view>
				</view>
				<!-- <Info :detail="details"></Info> -->
			</swiper-item>
			<swiper-item>
				<view class="item-wrap">
					<view class="item-wuzi flex-between" v-for="(child,idx) in details.details" :key="idx">
						<text>{{child.name}}</text>
						<text>{{child.standard ? child.standard : '正常标准'}}</text>
					</view>
				</view>
				<!-- <Info :detail="details"></Info> -->
			</swiper-item>
			<swiper-item class="item-wrap">
				<view class="item-wrap">
					<swiper class="swiper" v-if="details.files.length > 0" :style="{height: '100vh'}">
						<swiper-item v-for="(item,index) in details.files" :style="{textAlign: 'center'}">
							<image :src="item" class="item-img" mode="widthFix"></image>
						</swiper-item>	
					</swiper>
					<!-- <image v-for="(item,index) in details.files" :src="item" class="item-img" mode="widthFix"></image> -->
					<view class="main-text" style="text-align: center;" v-if="details.files.length == 0">暂无内容</view>
				</view>
				<!-- <Info :detail="details"></Info> -->
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import Info from './info/info.vue'
	import tabs from '../../components/yc_tabs/yc_tabs.vue'
	import {
		Request
	} from '../../utils/http.js'
	export default {
		data() {
			return {
				details: {},
				current: 0,
				tabList: [{
					title: '需求物资清单',
					hasRed: false,
					num: '99+'
				}, {
					title: '防护物资标准',
					hasRed: false,
					num: 99
				}, {
					title: '图片信息',
					hasRed: false,
					num: 99
				}]
			}
		},
		components: {
			tabs,
			Info
		},
		methods: {
			tabClick(e) {
				let current = typeof e === 'object' ? e.detail.current : e;
				this.current = current;
				this.$refs.tab.tabToIndex(current);
			},
			loadDetail(id) {
				let that = this;
				let params = {
					'id': id
				}

				that.$api.getDemandDetail(params)
					.then(res => {
						if (res.code === '10000') {
							that.details = res.data
						}
					}).catch(err => {
						console.log(err)
					})
			}
		},
		onLoad(option) {
			this.loadDetail(option.id)
		}
	}
</script>

<style lang="less" scoped>
	.item-wrap {
		box-sizing: border-box;
		background-color: #FFFFFF;
		padding: 20upx 20upx 0;

		.item-wuzi {
			display: flex;
			align-items: center;

			border-bottom: 1upx solid #f2f2f2;
			font-family: PingFangSC-Semibold;
			font-size: 14px;
			color: #333333;
			height: 72upx;

			&:last-child {
				border: none;
			}
		}
	}

	.item-img {
		width: 80%;
		margin: 0 auto;
	}
</style>
