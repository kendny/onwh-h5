<template>
	<view class="tab-box" id="tab-box" v-if="tabList.length > 0">
		<view class="horizontal">
			<scroll-view :scroll-x="true" style="white-space: nowrap; display: flex;" scroll-with-animation :scroll-left="slider.scrollLeft">
				<view class="item-box">
					<block v-for="(item, index) in tabList" :key="index">
						<view class="item" :class="{ active: activeIndex === index }" :id="'tab_'+index" @click="tabClick(index)">
							{{ item.title }}
							<view class="red-box" v-show="item.hasRed" v-text="item.num"></view>
						</view>
					</block>
				</view>
			</scroll-view>
			<view class="underline" :style="'transform:translateX(' + slider.left + 'px);width:' + slider.width + 'px'"></view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'liuyuno-tabs',
		props: {
			tabData: {
				type: Array,
				default: () => []
			},
			defaultIndex: {
				type: Number,
				default: 0
			},
			underLinePadding: {
				type: Number,
				default: 10
			},
		},
		data() {
			return {
				tabList: [],
				tabListSlider: [],
				box: {
					left: 0,
					right: 0,
					top: 0,
					width: 0,
					height: 0,
					bottom: 0,
				},
				slider: {
					left: 0,
					width: 0,
					scrollLeft: 0
				},
				activeIndex: 0
			};
		},
		watch: {
			tabData(value) {
				this.tabList = value;
				setTimeout(() => {
					this.updateTabWidth();
				}, 0);
			},
		},
		mounted() {
			this.tabList = this.tabData;
			this.activeIndex = this.defaultIndex;

			setTimeout(() => {
				const query = uni.createSelectorQuery().in(this);
				query.select('.tab-box').boundingClientRect((res) => {
					this.box = res;
					this.updateTabWidth();
				}).exec();
			}, 0);
		},
		methods: {
			tabClick(index) {
				this.activeIndex = index;
				this.tabToIndex(index);
				this.$emit('tabClick', index);
			},
			tabToIndex(index) {
				this.activeIndex = index;
				let _slider = this.tabListSlider[index];
				this.slider = {
					left: _slider.left + this.underLinePadding,
					width: _slider.width - this.underLinePadding * 2,
					scrollLeft: _slider.scrollLeft,
				}
			},

			updateTabWidth(index = 0) {
				let data = this.tabList;
				if (data.length == 0) return false;
				const query = uni.createSelectorQuery().in(this);
				query.select('#tab_' + index).boundingClientRect((res) => {
					let _prev_slider = this.tabListSlider[index - 1];
					if(!res){
						return
					}
					this.tabListSlider[index] = {
						left: res.left - this.box.left,
						width: res.width,
						scrollLeft: res.left - this.box.left - (_prev_slider ? _prev_slider.width : 0),
					}
					
					if (this.activeIndex == index) {
						this.tabToIndex(this.activeIndex);
					}
					index++;
					if (data.length > index) {
						this.updateTabWidth(index);
					}
				}).exec();
			}
		}
	}
</script>

<style lang="less">
	.tab-box {
		width: 100%;
		color: rgba(0, 0, 0, 0.8);
		display: flex;
		background: #fff;
		font-size: 28upx;
		box-shadow: 0 1px 5px rgba(0, 0, 0, 0.06);
		position: relative;
		z-index: 10;
		overflow: hidden;

		// .active {
		// 	color: var(--mainColor) !important;
			
		// }

		.horizontal {
			width: 100%;

			.item-box {
				display: flex;
				align-items: center;
				justify-content: space-around;

				.item {
					position: relative;
					display: inline-block;
					text-align: center;
					padding: 0 30upx;
					height: 80upx;
					line-height: 80upx;
					font-family: PingFangSC-Semibold;
					font-size: 32upx;
					color: #666;

					.red-box {
						position: absolute;
						right: -10px;
						top: 8px;
						background-color: #F23030;
						border-radius: 17upx;
						padding: 4upx 12upx;
						font-family: PingFangSC-Regular;
						font-size: 24upx;
						color: #FFFFFF;
						text-align: center;
						line-height: 32upx;
					}
				}
			}


			.underline {
				height: 4upx;
				background-color: #80ADED;
				border-radius: 3px;
				transition: .8s;
			}
		}
	}
</style>
