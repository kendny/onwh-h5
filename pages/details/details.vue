<template>
    <view class="detail-wrap">
        <Info :detail="details"></Info>
        <view class="detail-head">
            <tabs ref="tab" :tabData="tabList" :defaultIndex="current" @tabClick='tabClick'></tabs>
        </view>
        <swiper class="swiper" :current="current" @change="tabClick" :style="{height: '60vh'}">
            <!-- 需求物资清单 -->
            <swiper-item>
                <view class="item-wrap">
                    <view class="item-wuzi flex-between" v-for="(child,idx) in details.details" :key="idx">
                        <text>{{child.name}}</text>
                        <text v-if="child.amount > 0">{{child.amount}} / {{child.unit}}</text>
                        <text v-else>不限</text>
                    </view>
                </view>
            </swiper-item>
            <!-- 防护物资标准 -->
            <swiper-item>
                <view class="item-wrap">
                    <view class="item-wuzi flex-between" v-for="(child,idx) in details.details" :key="idx">
                        <text>{{child.name}}</text>
                        <text>{{child.standard ? child.standard : '正常标准'}}</text>
                    </view>
                </view>
            </swiper-item>
            <!-- 物资运输方式 -->
            <swiper-item class="item-wraps">
                <!-- <swiper class="swiper" v-if="details.files && details.files.length > 0" :style="{height: '100vh'}">
						<swiper-item v-for="(item,index) in details.files" :style="{textAlign: 'center'}">
							<image :src="item" class="item-img" mode="widthFix"></image>
						</swiper-item>	
					</swiper> -->
                <swiper v-if="files.length > 0" :style="{height: '600upx'}">
                    <swiper-item v-for="(item,index) in files">
                        <view class="item-box">
                            <text class="title">{{item.Hospital}}</text>
                            <view class="btns-box">
                                <view>
                                    <button type="default" class="btn-address" size="mini">{{item.company1}}</button>
                                    <button type="default" class="btn-address" size="mini">{{item.company2}}</button>
                                </view>
                                <view>
                                    <button type="default" class="copy" size="mini" @tap="copyAddress(item.address)">复制快递地址</button>
                                </view>
                            </view>
                            <view class="text-address">快递地址：</view>
                            <text class="text-address">{{item.address}}</text>
                            <view class="touch-info">
                                <text>收件人：{{item.person}}</text>
                                <text>电话：{{item.phone}}</text>
                            </view>
                        </view>
                        <view class="item-box">
                            <view class="btns-box">
                                <text class="title">{{item.type}}</text>
                                <view>
                                    <button type="default" class="call-phone" size="mini" @tap="callSomeOne(item.phone)">点击拨打电话</button>
                                </view>
                            </view>
                            <view class="touch-info">
                                <text>收件人：{{item.person}}</text>
                                <text>电话：{{item.phone}}</text>
                            </view>
                        </view>
                    </swiper-item>
                </swiper>
                <view class="main-text" style="text-align: center;" v-else>暂无内容</view>
            </swiper-item>
        </swiper>
    </view>
</template>

<script>
    import Info from './info/info.vue'
    import tabs from '../../components/yc_tabs/yc_tabs.vue'
    import Clipboard from '@/utils/common/clipboard.min.js'
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
                    title: '物资运输方式',
                    hasRed: false,
                    num: 99
                }],
                files: [{
                    // 接口文档暂无数据，因此使用静态模拟数据
                    Hospital: '接受第三方物流直接快递到医院',
                    company1: '京东快递',
                    company2: '顺丰快递',
                    address: '湖北省武汉市洪山区高新大道5号同济医院',
                    person: '王老师',
                    phone: '13200001234',
                    type: '物资到潜江可派车接应'
                }]
            }
        },
        components: {
            tabs,
            Info
        },
        methods: {
            /* 
             * 点击复制
             * 入参：需要复制的内容
             * type: String
             */
            copyAddress(address) {
                let clipboard = new Clipboard('.copy', {
                    text: function() {
                        return address;
                    }
                });
                clipboard.on('success', function(e) { //复制成功执行的回调，可选
                    uni.showToast({
                        title: '地址复制成功',
                        icon: 'none',
                        duration: 1500
                    })
                });
                clipboard.on('error', function(e) { //复制失败执行的回调，可选
                    console.log(e);
                    uni.showToast({
                        title: '地址复制失败',
                        icon: 'none',
                        duration: 1500
                    })
                });
            },
            // 打电话功能
            callSomeOne(phone) {
            	uni.makePhoneCall({
            		phoneNumber: phone //仅为示例
            	});
            },
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
    .detail-wrap {
        background-color: #EDEDED;
        .detail-head {
            border-bottom: 1px solid #C0C0C0;
        }
    }
    .item-wraps {
        box-sizing: border-box;
        background-color: #FFFFFF;
        padding: 20upx 20upx;
    }
    .item-wrap {
        box-sizing: border-box;
        background-color: #FFFFFF;
        padding: 0 20upx;
    }
    .swiper{
        background-color: #FFFFFF;
    }

    .item-wuzi {
        display: flex;
        align-items: center;
        border-bottom: 1upx solid #f2f2f2;
        font-family:  PingFangSC-Semibold;
        font-size: 24upx;
        color: #333333;
        height: 72upx;

        &:last-child {
            border: none;
        }
    }

    .item-box {
        width: 100%;
        font-family: PingFangSC-Semibold;
        background-color: #DEEBFF;
        border-radius: 4upx;
        padding: 20upx 20upx;
        color: #333333;
        margin-bottom: 20upx;
        .title {
            margin-bottom: 7upx;
            display: block;
            font-family: PingFangSC-Semibold;
            font-size: 32upx;
        }

        .btns-box {
            display: flex;
            justify-content: space-between;
            font-size: 28upx;

            view {
                display: flex;
                align-items: center;
            }

            .btn-address {
                padding: 0 12upx;
                background-color: #A1C6FF;
                margin-right: 20upx;
                height: 36upx;
                line-height: 36upx;
                border-radius: 2upx;
                color: #333333;
            }

            .copy {
                background: #FFFFFF;
                border: 1px solid #80ADED;
                border-radius: 50upx;
                color: #80ADED;
            }
        }

        .text-address {
            font-size: 28upx;
        }

        .touch-info {
            font-size: 28upx;
            padding-top: 10upx;

            text {
                margin-right: 84upx;
            }
        }
        .call-phone{
            background: #FFFFFF;
            border: 1px solid #80ADED;
            border-radius: 50upx;
            color: #80ADED;
        }
    }

    .item-img {
        width: 80%;
        margin: 0 auto;
    }
</style>
