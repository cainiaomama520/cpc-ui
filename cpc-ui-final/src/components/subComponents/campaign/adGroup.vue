<template lang="html">
	<div class="adGroup">
		<div class="mediaMidden">
			<el-tabs v-model="activeName" @tab-click="tableClickAction" style="margin-left: 50px;">
			    <el-tab-pane label="广告活动" name="campaign"></el-tab-pane>
			    <el-tab-pane label="广告组" name="group"></el-tab-pane>
			    <el-tab-pane label="广告创意" name="creative"></el-tab-pane>
	  		</el-tabs>
			<div class="container">
				<el-row>
					<el-col :span="7">
						<el-form>
							<el-form-item label="广告主:">
								<el-select v-model="advertiseId" filterable placeholder="请选择广告主" style="width:200px">
									<el-option key="" label="全部" value=""></el-option>
									<el-option v-for="(item,index) in advertiseList" :key="item.id" :label="item.name" :value="item.id">
									</el-option>
								</el-select>
							</el-form-item>
						</el-form>
					</el-col>
					<el-col :span="7">
						<el-form>
							<el-form-item label="产品:">
								<el-select v-model="productId" filterable placeholder="请选择产品" style="width:200px">
									<el-option key="" label="全部" value=""></el-option>
									<el-option v-for="(item,index) in productsList" :key="item.id" :label="item.name" :value="item.id">
									</el-option>
								</el-select>
							</el-form-item>
						</el-form>
					</el-col>
					<el-col :span="7">
						<el-form>
							<el-form-item label="活动:">
								<el-select v-model="campaignsId" filterable placeholder="请选择活动" style="width:200px">
									<el-option key="" label="全部" value=""></el-option>
									<el-option v-for="(item,index) in campaignsList" :key="item.id" :label="item.name" :value="item.id">
									</el-option>
								</el-select>
							</el-form-item>
						</el-form>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form>
							<el-form-item label="广告组名称:">
								<el-select v-model="adGroupId" filterable placeholder="请选择广告组" style="width:200px">
									<el-option key="" label="全部" value=""></el-option>
									<el-option v-for="(item,index) in adGroupList" :key="item.id" :label="item.name" :value="item.id">
									</el-option>
								</el-select>
							</el-form-item>
						</el-form>
					</el-col>
					<el-col :span="7">
						<el-form>
							<el-form-item label="媒体:">
								<el-select v-model="mediaId" filterable placeholder="请选择媒体" style="width:200px">
									<el-option key="" label="全部" value=""></el-option>
									<el-option v-for="(item,index) in mediaList" :key="item.id" :label="item.name" :value="item.id">
									</el-option>
								</el-select>
							</el-form-item>
						</el-form>
					</el-col>
					<el-col :span="7">
						<el-form>
							<el-form-item label="媒体类型:">
								<el-select v-model="mediaType" filterable placeholder="请选择媒体类型" style="width:200px">
									<el-option v-for="(item,index) in mediaTypeList" :key="item.id" :label="item.name" :value="item.id">
									</el-option>
								</el-select>
							</el-form-item>
						</el-form>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="17">&emsp;</el-col>
					<el-button :span="3" type="primary" @click='searchAction' style="height: 40px" round>搜索</el-button>
					<el-button :span="3" type="primary" @click='creatNewAction' style="height: 40px" round>新建</el-button>
				</el-row>
				<el-row>
					<el-col :span='24'>
						<el-form>
							<el-form-item label="数据项:">
								<el-checkbox v-for="(col,index) in tableHeaderName" :key="index" @change="handleCheckedCitiesChange(index)" v-model="col.value" :label='col.name'></el-checkbox>
							</el-form-item>
						</el-form>
					</el-col>
				</el-row>
			</div>
			<div class="itemDiv">
				<el-table :data="tableListData" style="width: 100%">
					<template v-for="(col ,ro) in tableHeaderName">
						<el-table-column v-if='col.value' :fixed="ro == 0 ? 'left':false" :label=col.name width="140" :prop='col.label' sortable>
							<template slot-scope="scope">
								<div v-if="col.label == 'advGro'">
									<router-link :to="{ path: '/campaign/adCreativity', query:{adGroupId:scope.row.total.id}}">{{ scope.row.advGro }}</router-link>
								</div>
								<div v-else-if="col.label == 'advZ'">
									<router-link :to="{ path: '/advpro/advDetail', query:{id:scope.row.advZ.id}}">{{ scope.row.advZ.id + '-' + scope.row.advZ.name }}</router-link>
								</div>
								<div v-else-if="col.label == 'product'">
									<router-link :to="{ path: '/advpro/proDetail', query:{id:scope.row.product.id}}">{{ scope.row.product.id + '-' + scope.row.product.name }}</router-link>
								</div>
								<div v-else-if="col.label == 'tfStatus'">
									<div v-if="scope.row.tfStatus == '创建未完成'">
										<span>{{ scope.row.tfStatus }}</span>
									</div>
									<div v-else>
										<el-switch style="display: block;height:100%" v-model="scope.row.tfStatus" active-color="#13ce66" inactive-color="#ff4949" active-text="开启" inactive-text="关闭" @change='statusChangeAction(scope.row)'>
										</el-switch>
									</div>
								</div>
								<div v-else>
									<span>{{ scope.row[col.label]}}</span>
								</div>
							</template>
						</el-table-column>
					</template>
					<el-table-column fixed="right" label="操作" width="200">
						<template slot-scope="scope">
							<el-button v-if="scope.row.total.adverCheckStatus !=''" @click="adversongshenAction(scope.row)" type="text" size="small">广告主送审</el-button>
							<el-button @click="lookDetailAction(scope.row)" type="text" size="small">查看</el-button>
							<el-button @click='editAction(scope.row)' type="text" size="small">编辑</el-button>
							<el-button @click='copyAction(scope.row)' type="text" size="small">复制</el-button>
							<el-button @click='deletAction(scope.row)' type="text" size="small">删除</el-button>
							<!-- 							<el-button @click='creatNewAction(scope.row)' type="text" size="small">新建</el-button>
 -->
						</template>
					</el-table-column>
				</el-table>
				<div class="block">
					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size='pageSize' layout="total, sizes, prev, pager, next, jumper" :total="total">
					</el-pagination>
				</div>
			</div>
		</div>
		<el-dialog title="广告组详情" :visible.sync="dialogVisible" width="50%">
			<!-- <span>这是一段信息</span> -->
			<el-row>
				<el-col :span='2'>
					&emsp;
				</el-col>
				<!-- <el-col :span='3'>
					<span class="sencondSpan">广告组详情:</span>
				</el-col> -->
				<el-col :span="10">
					<span class="dialogObjSpan">广告主:&emsp;&emsp;&emsp;{{dialogObj.advertiser.name}}</span><br>
					<span class="dialogObjSpan">活动名称:&emsp;&emsp;{{dialogObj.campaign.name}}</span><br>
					<span class="dialogObjSpan">媒体:&emsp;&emsp;&emsp;&emsp;{{dialogObj.media}}</span><br>
					<span class="dialogObjSpan">总预算:&emsp;&emsp;&emsp;{{dialogObj.totalBudget}}</span><br>
					<span class="dialogObjSpan">日预算:&emsp;&emsp;&emsp;{{dialogObj.dayBudget}}</span><br>
				</el-col>
				<el-col :span="10">
					<span class="dialogObjSpan">产品:&emsp;&emsp;&emsp;&emsp;&emsp;{{dialogObj.product.name}}</span><br>
					<span class="dialogObjSpan">广告组名称:&emsp;&emsp;{{dialogObj.name}}</span><br>
					<span class="dialogObjSpan">投放媒体:&emsp;&emsp;&emsp;投放媒体</span><br>
					<span class="dialogObjSpan">起止时间:&emsp;&emsp;&emsp;{{dialogObj.beginDate}}至{{dialogObj.endDate}}</span><br>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span='2'>
					&emsp;
				</el-col>
				<el-col :span="20">
					<el-row>
						<div v-if="dialogObj.mediaType == 'MEDIA_BUY'">
							<el-col :span='12'>
								<span class="dialogObjSpan">曝光:&emsp;&emsp;&emsp;{{dialogObj.reportDTO.impValidCount||0}}</span><br>
							</el-col>
							<el-col :span='12'>
								<span class="dialogObjSpan">点击:&emsp;&emsp;&emsp;{{dialogObj.reportDTO.clkValidCount||0}}</span><br>
							</el-col>
							<el-col :span='12'>
								<span class="dialogObjSpan">激活数:&emsp;&emsp;{{dialogObj.reportDTO.totalCvs||0}}</span><br>
							</el-col>
							<el-col :span='12'>
								<span class="dialogObjSpan">消耗:&emsp;&emsp;&emsp;{{dialogObj.reportDTO.consume||0.0}}</span><br>
							</el-col>
							<el-col :span='12'>
								<span class="dialogObjSpan">成本:&emsp;&emsp;&emsp;{{dialogObj.reportDTO.costNum/(dialogObj.reportDTO.totalCvs||1).toFixed(2)}}</span><br>
							</el-col>
						</div>
						<div v-if="dialogObj.mediaType != 'MEDIA_BUY' && dialogObj.dmpTargeting != undefined">
							<el-col :span='2'>
								<span style="line-height:50px;font-size:15px">定向:</span><br>
							</el-col>
							<el-col :span='10' style="margin-top: 40px">
								<el-col :span='24' v-if='dialogObj.dmpTargeting.content.gender.length !=0'>
									<span class="dialogObjSpan">性别:&emsp;&emsp;&emsp;{{dialogObj.dmpTargeting.content.gender.toString()}}</span><br>
								</el-col>
								<el-col :span='24'>
									<span class="dialogObjSpan">年龄:&emsp;&emsp;&emsp;{{dialogObj.dmpTargeting.content.ageRange}}</span><br>
								</el-col>
								<el-col :span='24' v-if='dialogObj.dmpTargeting.content.loc.length!=0'>
									<span class="dialogObjSpan">地域:&emsp;&emsp;&emsp;{{dialogObj.dmpTargeting.content.loc}}</span><br>
								</el-col>
								<el-col :span='24' v-if='dialogObj.mexTargeting != undefined'>
									<span class="dialogObjSpan">手机系统:&emsp;{{dialogObj.mexTargeting.targetOs}}</span><br>
								</el-col>
								<el-col :span='24' v-if='dialogObj.mexTargeting != undefined'>
									<span class="dialogObjSpan">网络环境:&emsp;{{dialogObj.mexTargeting.targetConnType}}</span><br>
								</el-col>
								<el-col :span='24' v-if='dialogObj.dmpTargeting.content.interest.length!=0'>
									<span class="dialogObjSpan">兴趣:&emsp;&emsp;&emsp;{{dialogObj.dmpTargeting.content.interest}}</span><br>
								</el-col>
								<el-col :span='24' v-if='dialogObj.dmpTargeting.content.life_status.length!=0'>
									<span class="dialogObjSpan">行为属性:&emsp;{{dialogObj.dmpTargeting.content.life_status}}</span><br>
								</el-col>
							</el-col>
							<el-col :span='2'>
								&emsp;
							</el-col>
							<el-col :span='10' style="margin-top: 40px">
								<el-col :span='12'>
									<span class="dialogObjSpan">曝光:&emsp;&emsp;&emsp;{{dialogObj.reportDTO.impValidCount||0}}</span><br>
								</el-col>
								<el-col :span='12'>
									<span class="dialogObjSpan">点击:&emsp;&emsp;&emsp;{{dialogObj.reportDTO.clkValidCount||0}}</span><br>
								</el-col>
								<el-col :span='24'>
									<span class="dialogObjSpan">激活数:&emsp;&emsp;{{dialogObj.reportDTO.totalCvs||0}}</span><br>
								</el-col>
								<el-col :span='24'>
									<span class="dialogObjSpan">消耗:&emsp;&emsp;&emsp;{{dialogObj.reportDTO.consume||0.0}}</span><br>
								</el-col>
								<el-col :span='24'>
									<span class="dialogObjSpan">成本:&emsp;&emsp;&emsp;{{dialogObj.reportDTO.costNum/(dialogObj.reportDTO.totalCvs||1).toFixed(2)}}</span><br>
								</el-col>
							</el-col>
						</div>
					</el-row>
				</el-col>
			</el-row>
			<span slot="footer" class="dialog-footer">
				<!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
				<el-button type="primary" @click="dialogVisible = false">返 回</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import Communication from '../../../util/communicate.js';
	export default {
		data() {
			return {
				activeName: 'group',
				dialogVisible: false,
				dialogObj: {
					advertiser: {},
					campaign: {},
					product: {},
					reportDTO: {},
					dmpTargeting:{
						content: {
							gender: [],
							loc: [],
							interest: [],
							life_status: []
						}
					},
					targetingDmp: {
						content: {
							gender: [],
							loc: [],
							interest: [],
							life_status: []
						}
					}
				},
				tableHeaderName: [{
						name: '广告组名称',
						label: 'advGro',
						value: true
					},
					{
						name: '广告活动',
						label: 'advCam',
						value: false
					},
					{
						name: '广告主',
						label: 'advZ',
						value: false
					},
					{
						name: '产品',
						label: 'product',
						value: false
					},
					{
						name: '媒体',
						label: 'media',
						value: true
					},
					{
						name: '消耗状态',
						label: 'consumeStatuse',
						value: true
					},
					{
						name: '投放状态',
						label: 'tfStatus',
						value: true
					},
					{
						name: '激活单价（元）',
						label: 'activePrice',
						value: false
					},
					{
						name: '消耗（元）',
						label: 'consume',
						value: true
					},
					{
						name: '激活数',
						label: 'totalCvs',
						value: true
					},
					{
						name: '花费',
						label: 'costNum',
						value: true
					},
					{
						name: '激活成本（元）',
						label: 'cvsCost',
						value: true
					},
					{
						name: '利润（元）',
						label: 'profit',
						value: true
					},
					{
						name: '利润率',
						label: 'profitRate',
						value: true
					},
					{
						name: '曝光数',
						label: 'impValidCount',
						value: true
					},
					{
						name: '点击情况',
						label: 'cliCondition',
						value: true
					},
					{
						name: '互动情况',
						label: 'hdCondition',
						value: false
					},
					{
						name: '投放时间',
						label: 'tfDate',
						value: false
					},
				],
				currentPage: 1,
				pageSize: 10,
				total: 0,
				tableListData: [],
				advertiseList: [],
				productsList: [],
				campaignsList: [],
				adGroupList: [],
				mediaList: [],
				advertiseId: '',
				productId: '',
				campaignsId: '',
				adGroupId: '',
				mediaId: '',
				mediaTypeList: [
					{
						id: 'RTB',
						name: 'RTB媒体'
					},
					{
						id: 'MEDIA_BUY',
						name: '账户媒体'
					}
				]
			}
		},
		computed: {
		  mediaType: {
		    get () {
		      return this.$store.state.creatCp.advCreativeMediaType
		    },
		    set (val) {
		      this.$store.commit('setAdvCreativeMediaType', val)
		    }
		  }
		},
		mounted() {
			var v = this;
			if (this.$route.query.campaignsId != undefined) {
				this.campaignsId = parseInt(this.$route.query.campaignsId);
			}
			if (this.$route.query.adGroupId != undefined) {
				this.adGroupId = parseInt(this.$route.query.adGroupId);
			}
			this.getGTAdvertiserList().then(function(result) {
				v.advertiseList = result;
			});
			this.getGTProductList().then(function(result) {
				v.productsList = result;
			});
			this.getGTCampaignsList().then(function(result) {
				v.campaignsList = result;
				if(v.$route.query.id != undefined) {
					v.campaignsId = parseInt(v.$route.query.id);
				}
				v.getTableListWithParams();
			});
			this.getGTAdGroupList().then(function(result) {
				v.adGroupList = result;
			});
			this.getGTMediaList().then(function(result) {
				v.mediaList = result;
			});
		},
		methods: {
			tableClickAction(){
				if ('campaign' == this.activeName){
					this.$router.push({
			            name: 'adCampaign'
			        })
				}

				if('creative' == this.activeName){
					this.$router.push({
			            name: 'adCreativity'
			        })
				}
			},
			getTableListWithParams() {
				var v = this;
				// adGroupId: '',
				// mediaId: '',
				var params = {
					page: v.currentPage - 1,
					size: v.pageSize,
					'rules[0].field': 'advertiser.id',
					'rules[0].op': 'eq',
					'rules[0].data': v.advertiseId == '' ? -1 : parseInt(v.advertiseId),
					'rules[1].field': 'product.id',
					'rules[1].op': 'eq',
					'rules[1].data': v.productId == '' ? -1 : parseInt(v.productId),
					'rules[2].field': 'campaign.id',
					'rules[2].op': 'eq',
					'rules[2].data': v.campaignsId == '' ? -1 : parseInt(v.campaignsId),
					'rules[3].field': 'id',
					'rules[3].op': 'eq',
					'rules[3].data': v.adGroupId == '' ? -1 : parseInt(v.adGroupId),
					'rules[4].field': 'media',
					'rules[4].op': 'eq',
					'rules[4].data': v.mediaId,
					'rules[5].field': 'mediaType',
					'rules[5].op': 'eq',
					'rules[5].data': v.mediaType,
					'groupOp': 'AND'
				}
				v.$api.get(v.allurlsList.creatADGroupUrl, params, function(r) {
					v.tableListData = [];
					v.total = r.totalElements;
					if(r.content != null && r.content.length > 0) {
						for(var i = 0; i < r.content.length; i++) {
							var dic = {};
							dic.advGro = r.content[i].id + '-' + r.content[i].name;
							dic.advCam = r.content[i].campaign.id + '-' + r.content[i].campaign.name;
							dic.advZ = r.content[i].advertiser;
							dic.product = r.content[i].product;
							var media = '';
							if(r.content[i].mediaType == 'MEDIA_BUY') {
								media = r.content[i].mediaBuyResource.id + '-' + r.content[i].mediaBuyResource.name;
							} else {
								if(r.content[i].media == 'WAX') {
									media = '微博';
								} else if(r.content[i].media == 'BAIDU_GD') {
									media = '百度信息流';
								}
							}
							dic.media = media;
							dic.consumeStatuse = ('总余:'+(r.content[i].totalBudget||0)) + '\n' + ('日余:'+((r.content[i].dayBudget||0)-(r.content[i].reportDTO.costNum||0)).toFixed(2));
							dic.activePrice = r.content[i] && r.content[i].campaign && r.content[i].campaign.activePrice || 0.00;
							dic.consume = r.content[i] && r.content[i].reportDTO && r.content[i].reportDTO.consume || 0.00;
							dic.totalCvs = r.content[i] && r.content[i].reportDTO && r.content[i].reportDTO.totalCvs || 0;
							dic.costNum = r.content[i] && r.content[i].reportDTO && r.content[i].reportDTO.costNum || 0.0;
							dic.cvsCost = (dic.costNum / (dic.totalCvs || 1)).toFixed(2);
							dic.profit = r.content[i] && r.content[i].reportDTO && r.content[i].reportDTO.profit || 0.0;
							dic.profitRate = r.content[i] && r.content[i].reportDTO && r.content[i].reportDTO.profitRate || 0.0;
							dic.impValidCount = r.content[i] && r.content[i].reportDTO && r.content[i].reportDTO.impValidCount || 0;
							dic.cliCondition = '点击数：' + (r.content[i] && r.content[i].reportDTO && r.content[i].reportDTO.clkValidCount || 0) + '\n' +
								'点击率：' + (r.content[i] && r.content[i].reportDTO && r.content[i].reportDTO.ctr || 0.00) + '\n' +
								'点击成本：' + ((dic.costNum / (r.content[i] && r.content[i].reportDTO && r.content[i].reportDTO.clkValidCount || 1)).toFixed(2));
							dic.hdCondition = '互动量：' + (r.content[i] && r.content[i].reportDTO && r.content[i].reportDTO.interactionCount || 0) + '\n' +
								'互动率：' + (r.content[i] && r.content[i].reportDTO && r.content[i].reportDTO.interactionRate || 0.0) + '\n' +
								'互动率：' + (r.content[i] && r.content[i].reportDTO && r.content[i].reportDTO.interactionCost || 0);
							dic.tfDate = (r.content[i] && r.content[i].beginDate || '不限') + '\n' +
								'至 ' + (r.content[i] && r.content[i].endDate || '不限');
							var status;
							if(r.content[i].status == 'ON') {
								status = true;
							} else if(r.content[i].status == 'OFF') {
								status = false;
							} else if(r.content[i].status == 'NO_READY') {
								status = '创建未完成';
							}
							dic.tfStatus = status;
							if (r.content[i].dmpTargeting != null) {
								r.content[i].dmpTargeting.content = JSON.parse(r.content[i].dmpTargeting.content)
							}
							dic.total = r.content[i];
							var adverCheckStatus = '';
							if(r.content[i].advertiser.checkStatus.length > 0) {
								for(var j = 0; j < r.content[i].advertiser.checkStatus.length; j++) {
									var item = r.content[i].advertiser.checkStatus[j];
									if(item.media == r.content[i].media) {
										if(item.checkStatus != 'pass' && item.checkStatus != 'pending') {
											adverCheckStatus = item.checkStatus;
										}
									}
								}
							}
							dic.total.adverCheckStatus = adverCheckStatus;
							v.tableListData.push(dic);
						}
					}
					console.log('------', r);
				})
			},
			handleSizeChange(val) {
				this.pageSize = val;
				this.getTableListWithParams()
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				this.currentPage = val;
				this.getTableListWithParams()
				console.log(`当前页: ${val}`);
			},
			// table表单操作事件
			handleClick(val) {
				console.log(val);
			},
			handleCheckedCitiesChange(index) {
				console.log(index);
			},
			searchAction() {
				this.currentPage = 1;
				this.getTableListWithParams();
				console.log('eeeeemit', new Date());
				Communication.$emit('crossmsg', {
					advertiserId: this.advertiseId,
					productId: this.productId,
					campaignId: this.campaignsId,
					adGroupId: this.adGroupId,
				});
			},
			// 状态按钮切换状态
			statusChangeAction(val) {
				let id = val.total.id;
				let status = val.total.status;
				if(status == 'ON') {
					status = 'OFF'
				} else {
					status = 'ON'
				}
				let params = '?id=' + id + '&status=' + status;
				this.$api.put(this.allurlsList.adGroupsStatus + params, '', function(r) {
					console.log(r);
				})
			},
			adversongshenAction(val) {
				var obj = val.total;
				console.log(obj.adverCheckStatus);
				var str = '?id=' + obj.advertiser.id + '&media=' + obj.media;
				var v = this;
				this.$api.get(this.allurlsList.advertisersAudit + str, '', function(r) {
					console.log(r);
					v.$message({
						message: '送审成功',
						type: 'success'
					});
				})
			},
			lookDetailAction(val) {
				this.dialogVisible = true;
				this.dialogObj = val.total;
				if(val.media == 'WAX') {
					val.media = '微博';
				} else if(val.media == 'BAIDU_GD') {
					val.media = '百度信息流';
				} else {
					val.media = '';
				}
				if (this.dialogObj.dmpTargeting == null) {
					return ;
				}
				// this.dialogObj.dmpTargeting.content = JSON.parse(this.dialogObj.dmpTargeting.content);
				if(this.dialogObj.dmpTargeting.content.ageRange == undefined || this.dialogObj.dmpTargeting.content.ageRange.length == 0) {
					this.dialogObj.dmpTargeting.content.ageRange = '不限';
				} else {
					this.dialogObj.dmpTargeting.content.ageRange = this.dialogObj.dmpTargeting.content.ageRange[0] + '-' + this.dialogObj.dmpTargeting.content.ageRange[1];
				}
				this.dialogObj.dmpTargeting.content.loc = this.getTreeDataLabel(JSON.parse(this.dialogObj.dmpTargeting.content.locLabel));
				this.dialogObj.dmpTargeting.content.interest = this.getTreeDataLabel(JSON.parse(this.dialogObj.dmpTargeting.content.interestLabel));
				this.dialogObj.dmpTargeting.content.life_status = this.getTreeDataLabel(JSON.parse(this.dialogObj.dmpTargeting.content.lifeStatusLabel));
				console.log(val.total);
			},
			editAction(val) {
				var id = val.total.id;
				this.$router.push({
					name: 'creatADGroup',
					query: {
						id: id,
						value: 'edit'
					}
				})
			},
			copyAction(val) {
				var id = val.total.id;
				this.$router.push({
					name: 'creatADGroup',
					query: {
						id: id,
						value: 'copy'
					}
				})
			},
			deletAction(val) {
				var v = this;
				var obj = val.total;
				v.$api.delete(v.allurlsList.creatADGroupUrl + '/' + obj.id, '', function(r) {
					let index = v.tableListData.indexOf(val)
					v.tableListData.splice(index,1);
				})
			},
			creatNewAction(val) {
				console.log(this.campaignsId);
				if(this.campaignsId == '') {
					this.$message({
						message: '请选择活动',
						type: 'warning'
					});
					return;
				}
				this.$router.push({
					name: 'creatADGroup',
					query: {
						id: this.campaignsId,
						value: 'new'
					}
				})
			},
		},
		watch: {
			mediaType: function(val) {
				var v = this;
				this.getGTCampaignsList().then(function(result) {
					v.campaignsId = '';
					v.campaignsList = result;
				});
				this.getGTAdGroupList().then(function(result) {
					v.adGroupId = '';
					v.adGroupList = result;
				});
			},
			'$route': function(to, from) {
				if(this.$route.query.id != undefined) {
					this.campaignsId = parseInt(this.$route.query.id);
				}
				this.getTableListWithParams();
			},
			dialogObj: function(val) {
				if(val.media == 'WAX' || val.media == '微博') {
					val.media = '微博';
				} else if(val.media == 'BAIDU_GD') {
					val.media = '百度信息流';
				} else {
					val.media = '';
				}
				// val.targetingDmp.content = val.targetingDmp.content;
			},
			'dialogObj.dmpTargeting.content.gender': function(val) {
				if (val == undefined) {
					return ;
				}
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
			},
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.adGroup {
		// position: absolute;
		height: 100%;
	}

	.el-table {
		font-size: 12px;
	}
	.el-table .cell {
		white-space: pre-line;
		line-height: 15px;
	}
	.dialogObjSpan {
		line-height: 30px;
		font-size: 13px;
	}
	.mediaMidden {
		// width: 100%;
		height: 100%;
		.pageTitleSpan {
			display: inline-block;
			font-size: 20px;
			padding: 20px;
		}
		.container {
			margin-top: 30px;
			margin-left: 40px;
		}
		.itemDiv {
			padding: 30px;
			padding-top: 20px;
			// background-color: red;
			.heroPagintion {
				margin-top: 30px;
			}
		}
	}
</style>
