<template lang="html">
	<div class="adDetail">
		<div class="adDetailItem">
			<el-row>
				<el-col :span='2'>
					&emsp;
				</el-col>
				<el-col :span='3'>
					<span class="sencondSpan">广告活动详情:</span>
				</el-col>
				<el-col :span="8" style="margin-bottom: 30px;margin-top: 40px">
					<span class="thirdSpan">名称:&emsp;{{campaignsObj.name}}</span>
					<span class="thirdSpan">广告主:&emsp;{{campaignsObj.advertiser.name}}</span>
					<span class="thirdSpan">产品:&emsp;{{campaignsObj.product.name}}</span>
					<span class="thirdSpan">投放时间:&emsp;{{campaignsObj.beginDate}} 至 {{campaignsObj.endDate}}</span>
				</el-col>
				<el-col :span="8" style="margin-bottom: 30px;margin-top: 40px">
					<span class="thirdSpan">激活单价:&emsp;{{campaignsObj.activePrice}}</span>
					<span class="thirdSpan">活动总预算:&emsp;{{campaignsObj.totalBudget}}</span>
					<span class="thirdSpan">活动日预算:&emsp;{{campaignsObj.dayBudget}}</span>
				</el-col>
				<!-- <el-col :span='4'>
          &emsp;
        </el-col> -->
			</el-row>
			<el-button class="buttonC" type="primary" @click="commandC('camp')">广告活动复制</el-button>
		</div>
		<div class="adDetailItem">
			<el-row>
				<el-col :span='2'>
					&emsp;
				</el-col>
				<el-col :span='3'>
					<span class="sencondSpan">广告组详情:</span>
				</el-col>
				<div v-if="adgroupObj.mediaType != 'MEDIA_BUY'">
					<el-col :span="8" style="margin-bottom: 30px;margin-top: 40px">
						<span class="thirdSpan">媒体:&emsp;{{adgroupObj.media}}</span>
						<span class="sencondSpan">定向</span>
						<span v-if='adgroupObj.targetingDmp.content.gender.length != 0' class="thirdSpan">性别:&emsp;{{adgroupObj.targetingDmp.content.gender.toString()}}</span>
						<span class="thirdSpan">年龄:&emsp;{{adgroupObj.targetingDmp.content.age}}</span>
						<span v-if='adgroupObj.targetingDmp.content.loc.length != 0' class="thirdSpan">地域:&emsp;{{adgroupObj.targetingDmp.content.loc.toString()}}</span>
						<span class="thirdSpan">手机系统:&emsp;{{adgroupObj.targetingDmp.targetOs}}</span>
						<span class="thirdSpan">网络环境:&emsp;{{adgroupObj.targetingDmp.targetConnType}}</span>
					</el-col>
					<el-col :span="8" style="margin-bottom: 30px;margin-top: 40px">
						<span class="thirdSpan">投放时段:&emsp;{{adgroupObj.targetingTime.length == 0 ? '全时段':adgroupObj.targetingTime.toString()}}</span>
						<el-col :span='24'>
							<span class="sencondSpan">&emsp;</span>
						</el-col>
						<span class="thirdSpan">出价方式:&emsp;{{adgroupObj.bidType}}</span>
						<span class="thirdSpan">出价:&emsp;{{adgroupObj.bidPrice}}</span>
						<span class="thirdSpan">广告组总预算:&emsp;{{adgroupObj.totalBudget}} RMB</span>
						<span class="thirdSpan">广告组日预算:&emsp;{{adgroupObj.dayBudget}} RMB</span>
					</el-col>
				</div>
				<div v-else>
					<el-col :span="8" style="margin-bottom: 30px;margin-top: 40px">
						<span class="thirdSpan">媒体:&emsp;{{adgroupObj.media}}</span>
						<span class="thirdSpan">出价方式:&emsp;{{adgroupObj.bidType}}</span>
						<span class="thirdSpan">出价:&emsp;{{adgroupObj.bidPrice}}</span>
					</el-col>
					<el-col :span="8" style="margin-bottom: 30px;margin-top: 40px">
						<span class="thirdSpan">投放时段:&emsp;{{adgroupObj.targetingTime.length == 0 ? '全时段':adgroupObj.targetingTime.toString()}}</span>
						<span class="thirdSpan">广告组总预算:&emsp;{{adgroupObj.totalBudget}} RMB</span>
						<span class="thirdSpan">广告组日预算:&emsp;{{adgroupObj.dayBudget}} RMB</span>
					</el-col>
				</div>
			</el-row>
			<el-button class="buttonC" type="primary" @click="commandC('group')">广告组复制</el-button>
		</div>
		<div v-if='!isMedia' class="adDetailItem" style="margin-bottom:30px">
			<el-row>
				<el-col :span='2'>
					&emsp;
				</el-col>
				<el-col :span='3'>
					<span class="sencondSpan">广告创意详情:</span>
				</el-col>
				<el-col :span="16" style="margin-bottom: 30px;margin-top: 40px">
					<span class="thirdSpan">监测链接:&emsp;{{activeArrayWB.trackLink.name}}</span>
					<!-- <span class="thirdSpan">曝光检测链接:&emsp;{{activeArrayWB.impTrackingUrl.url}}</span> -->
					<!-- <span class="thirdSpan">链接标识:&emsp;{{activeArrayWB.impTrackingUrl.name}}</span> -->
					<!-- <span class="thirdSpan">点击检测链接:&emsp;{{activeArrayWB.clkTrackingUrl.url}}</span>
					<span class="thirdSpan">链接标识:&emsp;{{activeArrayWB.clkTrackingUrl.name}}</span> -->
					<span class="thirdSpan">终端展示:</span>
					<img class="exmpleImg" src="/static/img/u3688.png" alt="">
				</el-col>
			</el-row>
			<el-button class="buttonC" type="primary" @click="commandC()">&emsp;创意复制&emsp;</el-button>
		</div>
		<div v-if='isMedia' class="adDetailItem" style="margin-bottom:30px">
			<el-row>
				<el-col :span='2'>
					&emsp;
				</el-col>
				<el-col :span='3'>
					<span class="sencondSpan">链接详情:</span>
				</el-col>
				<el-col :span="16" style="margin-bottom: 30px;margin-top: 40px">
					<!-- <span class="thirdSpan">曝光检测链接:&emsp;https://justdoit.com/mt/impression?clidi=__CLICKID__&idfa=__IDFA__</span>
          <span class="thirdSpan">链接标识:&emsp;紫龙曝光链接001</span>
          <span class="thirdSpan">点击检测链接:&emsp;https://justdoit.com/mt/click?clidi=__CLICKID__&idfa=__IDFA__&callback=__CALLBACK__</span>
          <span class="thirdSpan">链接标识:&emsp;紫龙点击链接001</span> -->
					<!-- <span class="thirdSpan">终端展示:</span> -->
					<el-button style="margin-left:60%;margin-bottom:30px" type="primary" @click="this.$router.push({name:'adCampaign'})">&emsp;下载链接&emsp;</el-button>
					<el-table :data="activeArray" style="width: 100%" border>
						<el-table-column prop="id" label="链接ID" width='120'>
						</el-table-column>
						<el-table-column prop="name" label="链接名称" width='120'>
						</el-table-column>
						<el-table-column prop="impTrackingUrl.url" label="广告主曝光检测详情" width='120'>
						</el-table-column>
						<el-table-column prop="impTrackingUrl.name" label="曝光检测标识" width='120'>
						</el-table-column>
						<el-table-column prop="clkTrackingUrl.url" label="广告主点击检测详情" width='120'>
						</el-table-column>
						<el-table-column prop="clkTrackingUrl.name" label="点击检测标识" width='120'>
						</el-table-column>
						<el-table-column prop="content.imp" label="曝光链接" width='120'>
						</el-table-column>
						<el-table-column prop="content.clk" label="点击链接" width='120'>
						</el-table-column>
					</el-table>
				</el-col>
			</el-row>
		</div>
		<el-button style="margin-bottom:30px;margin-left: 45%;" type="primary" @click="backAction">&emsp;返回&emsp;</el-button>
	</div>

</template>

<script>
	export default {
		data() {
			return {
				type: '图片',
				isMedia: true,
				campaignsObj: {
					name: '',
					beginDate: '',
					endDate: '',
					activePrice: '',
					totalBudget: '',
					dayBudget: '',
					advertiser: {
						name: ''
					},
					product: {
						name: ''
					}
				},
				adgroupObj: {
					media: '',
					targetingTime: [],
					bidType: '',
					bidPrice: '',
					totalBudget: '',
					dayBudget: '',
					targetingDmp: {
						targetOs: '',
						targetConnType: '',
						content: {
							gender: [],
							age: [],
							loc: [],
						}
					}
				},
				activeArray: [],
				activeArrayWB: {
					trackLink: {
						name:''
					},
					clkTrackingUrl: {
						advertiserId: localStorage.getItem("GTadvertiserId"),
						name: '',
						url: '',
						type: 'CLK'
					},
					impTrackingUrl: {
						advertiserId: localStorage.getItem("GTadvertiserId"),
						name: '',
						url: '',
						type: 'IMP'
					}
				}
			};
		},
		mounted() {
			this.$store.commit('changeTitleName', '广告详情');
			var v = this;
			if(localStorage.getItem("GTmediaType") == null) {
				this.$router.push({
					name: 'adCampaign'
				});
			}
			if(localStorage.getItem("GTmediaType") == 'MEDIA_BUY') {
				this.isMedia = true;
				v.$api.get(v.allurlsList.adgroupDetail + '/' + localStorage.getItem("GTadGroupId"), '', function(r) {
					if(r.length > 0) {
						for(var i = 0; i < r.length; i++) {
							r[i].content = JSON.parse(r[i].content);
						}
					}
					v.activeArray = r;
				})
			} else {
				this.isMedia = false;
				v.$api.get(v.allurlsList.creatadver + '/' + localStorage.getItem("GTcreativId"), '', function(r) {
					v.activeArrayWB = r;
				})
			}
			var campaignsId = localStorage.getItem("GTcampaignId");
			if(campaignsId == null || campaignsId == undefined) {
				this.$router.push({
					name: 'creatCampaign'
				});
				return;
			}
			var v = this;
			v.$api.get(v.allurlsList.creatCampaigns + '/' + campaignsId, '', function(r) {
				v.campaignsObj = r;
			})
			v.$api.get(v.allurlsList.creatADGroupUrl + '/' + localStorage.getItem("GTadGroupId"), '', function(r) {
				console.log(r);
				r.targetingDmp.content = JSON.parse(r.targetingDmp.content);
				r.targetingDmp.content.loc = v.getTreeDataLabel(JSON.parse(r.targetingDmp.content.locLabel));
				if(r.targetingDmp.content.age.length == 0) {
					r.targetingDmp.content.age = '不限';
				} else {
					r.targetingDmp.content.age = r.targetingDmp.content.age[0] + '-' + r.targetingDmp.content.age[1];
				}
				v.adgroupObj = r;
			})
		},
		watch: {
			'adgroupObj.targetingDmp.content.gender': function(val) {
				if(val.length == 1) {
					if(val[0] == '401') {
						val[0] = '男';
					} else {
						val[0] = '女';
					}
				} else if(val.length == 2) {
					for(var i = 0; i < val.length; i++) {
						if(val[i] == '401') {
							val[i] = '男'
						} else {
							val[i] = '女';
						}
					}
				}
				// this.adgroupObj.targetingDmp.content.gender = val;
			},
			'adgroupObj.media': function(val) {
				if(val == 'WAX' || val == '微博WAX') {
					this.adgroupObj.media = '微博WAX';
				} else {
					this.adgroupObj.media = '百度信息流';
				}
			}
		},
		methods: {
			backAction() {
				this.$router.push({
					name: 'adCampaign'
				});
			},
			commandC(val) {
				if(val == 'camp') {
					var id = this.campaignsObj.id;
					this.$router.push({
						name: 'creatCampaign',
						query: {
							id: id,
							value: 'copy'
						}
					})
				} else if(val == 'group') {
					var id = this.adgroupObj.id;
					this.$router.push({
						name: 'creatADGroup',
						query: {
							id: id,
							value: 'copy'
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.adDetail {
		width: 100%;
		// margin-top: 30px;
		// margin-left: 40px;
	}

	.adDetailItem {
		// height: 100px;
		// width: 100%;
		// background-color: cyan;
		position: relative;
		margin: 0 30px;
		border: 1px solid #e4e7ed;
		border-radius: 10px;
		margin-top: 30px;
		.buttonC {
			position: absolute;
			right: 10%;
			bottom: 10%;
		}
		.firstSpan {
			display: block;
			font-size: 20px;
			margin-top: 20px;
			margin-left: 20px;
		}
		.sencondSpan {
			display: block;
			font-size: 16px;
			margin-top: 20px;
			margin-left: 40px;
		}
		.thirdSpan {
			display: block;
			font-size: 14px;
			line-height: 30px;
			margin-top: 10px;
			margin-left: 60px;
		}
		.lastSpan {
			margin-bottom: 30px
		}
		.exmpleImg {
			padding-top: 30px;
			padding-left: 20%;
		}
	}
</style>
