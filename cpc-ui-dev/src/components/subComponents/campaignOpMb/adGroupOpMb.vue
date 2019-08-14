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
				<el-date-picker
					  @change="getGroupStats"
					  style="float: right;"
				      v-model="statsDate"
				      type="daterange"
				      range-separator="至"
				      start-placeholder="开始日期"
				      end-placeholder="结束日期"
				      value-format="yyyy-MM-dd">
				</el-date-picker>
				<el-table :data="tableListData" :summary-method='getSummaries' show-summary style="width: 100%" v-loading="tableLoading">
					<template v-for="(col ,ro) in tableHeaderName">
						<el-table-column v-if='col.value' :fixed="ro == 0 ? 'left':false" :label=col.name width="140" :prop="ro == 0 ? 'updateDate' : col.label" sortable>
							<template slot-scope="scope">
								<div v-if="col.label == 'advGro'">
									<div v-if="scope.row.total.id">
										<router-link :to="{ path: '/campaignop/adCreativityOpMb', query:{adGroupId:scope.row.total.id}}">{{ scope.row.advGro }}</router-link>
									</div>
									<div v-else>
										<p>{{scope.row.advGro}}</p>
									</div>
								</div>
								<div v-else-if="col.label == 'advZ'">
									<div v-if="scope.row.total.id">
										<router-link :to="{ path: '/advpro/advDetail', query:{id:scope.row.advZ.id}}">{{ scope.row.advZ.id + '-' + scope.row.advZ.name }}</router-link>
									</div>
									<div v-else>
										<p>--</p>
									</div>
								</div>
								<div v-else-if="col.label == 'product'">
									<div v-if="scope.row.total.id">
										<router-link :to="{ path: '/advpro/proDetail', query:{id:scope.row.product.id}}">{{ scope.row.product.id + '-' + scope.row.product.name }}</router-link>
									</div>
									<div v-else>
										<p>--</p>
									</div>
								</div>
								<div v-else-if="col.label == 'tfStatus'">
									<div v-if="scope.row.tfStatus == '创建未完成'">
										<span>{{ scope.row.tfStatus }}</span>
									</div>
									<div v-else-if="scope.row.tfStatus == '--'">
										<span>--</span>
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
							<div v-if="scope.row.total.id">
								<el-button v-if="scope.row.total.adverCheckStatus !=''" @click="adversongshenAction(scope.row)" type="text" size="small">广告主送审</el-button>
								<el-button @click="lookDetailAction(scope.row)" type="text" size="small">查看</el-button>
								<el-button @click='editAction(scope.row)' type="text" size="small">编辑</el-button>
								<el-button @click='copyAction(scope.row)' type="text" size="small">复制</el-button>
								<el-button @click='deletAction(scope.row)' type="text" size="small">删除</el-button>
							</div>
							<div v-else>
								<p>--</p>
							</div>
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
	export default {
		data() {
			return {
				activeName: 'group',
				dialogVisible: false,
				tableLoading: false,
				statsDate: [this.$api.dateFormat(new Date()), this.$api.dateFormat(new Date())],
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
						name: '曝光数',
						label: 'imp',
						value: false
					},
					{
						name: '点击情况',
						label: 'cliCondition',
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
				// advertiseId: '',
				// productId: '',
				// campaignsId: '',
				adGroupId: '',
				pageGroupIds:[],
				pageGroupStats: {},
				pageGroupTodaySpend:{},
				mediaId: '',
				totalDic: {}
			}
		},
		computed: {
			advertiseId: {
		    get () {
		      return this.$store.state.creatCp.MBYListAdvertiseId
		    },
		    set (val) {
		      this.$store.commit('setMBYListAdvertiseId', val)
		    }
			},
			productId: {
		    get () {
		      return this.$store.state.creatCp.MBYListProductId
		    },
		    set (val) {
		      this.$store.commit('setMBYListProductId', val)
		    }
			},
			campaignsId: {
		    get () {
		      return this.$store.state.creatCp.MBYListCampaignsId
		    },
		    set (val) {
		      this.$store.commit('setMBYListCampaignsId', val)
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
			this.getGTCampaignsList('MEDIA_BUY').then(function(result) {
				v.campaignsList = result;
				if(v.$route.query.id != undefined) {
					v.campaignsId = parseInt(v.$route.query.id);
				}
				v.getTableListWithParams();
			});
			this.getGTAdGroupList('MEDIA_BUY').then(function(result) {
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
			            path: '/campaignop/adCampaignOpMb'

			        })
				}

				if('creative' == this.activeName){
					this.$router.push({
			            path: '/campaignop/adCreativityOpMb'

			        })
				}
			},
			getTableListWithParams() {
				this.tableLoading = true;
				var v = this;
				if (v.advertiseId != '' || v.productId != '' || v.campaignsId != '' || v.adGroupId != '' || v.mediaId != '') {
					v.pageSize = 9999;
				} else {
					v.pageSize = 10;
				}
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
					'rules[5].data': 'MEDIA_BUY',
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
							dic.media = r.content[i].mediaBuyResource.id + '-' + r.content[i].mediaBuyResource.name;;
							dic.activePrice = r.content[i] && r.content[i].campaign && r.content[i].campaign.activePrice || 0.00;
							dic.consume = '--';//r.content[i] && r.content[i].reportDTO && r.content[i].reportDTO.consume || 0.00;
							dic.totalCvs = '--';//r.content[i] && r.content[i].reportDTO && r.content[i].reportDTO.totalCvs || 0;
							dic.costNum = '--';//r.content[i] && r.content[i].reportDTO && r.content[i].reportDTO.costNum || 0.0;
							dic.cvsCost = '--';//(dic.costNum / (dic.totalCvs || 1)).toFixed(2);
							dic.profit = '--';//r.content[i] && r.content[i].reportDTO && r.content[i].reportDTO.profit || 0.0;
							dic.profitRate = '--';//r.content[i] && r.content[i].reportDTO && r.content[i].reportDTO.profitRate || 0.0;
							dic.imp = '--';//r.content[i] && r.content[i].reportDTO && r.content[i].reportDTO.impValidCount || 0;
							dic.cliCondition = '--';//'点击数：' + (r.content[i] && r.content[i].reportDTO && r.content[i].reportDTO.clkValidCount || 0) + '\n' +
								// '点击率：' + (r.content[i] && r.content[i].reportDTO && r.content[i].reportDTO.ctr || 0.00) + '\n' +
								// '点击成本：' + ((dic.costNum / (r.content[i] && r.content[i].reportDTO && r.content[i].reportDTO.clkValidCount || 1)).toFixed(2));
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
							dic.total = r.content[i];
							dic.updateDate = r.content[i].updateDate;
							v.tableListData.push(dic);
							v.pageGroupStats[''+dic.total.id] = i;
							v.pageGroupIds.push(r.content[i].id);
						}

						v.getGroupStats();
					}else{
						v.tableLoading = false;
					}
				})
			},
			getSummaries:function(param) {
				const {columns,data} = param;
				const sums=[];
				let values=[];
				// debugger
				columns.forEach((columns,index) => {
					if (index === 0) {
									sums[index] = '总计';
									return;
							}
					sums[index] = this.totalDic[columns.property]
				});
				return sums;
			},
			addGroupStatsTotal(total){
				let dic = {};
				dic.advGro = '合计';
				dic.advCam = '--';
				dic.advZ = '--';
				dic.product = '--';
				dic.media = '--';
				dic.tfStatus = '--';
				dic.activePrice = '--';
				dic.consume = total.consume||'0';
				dic.imp = total.impValidCount || '0';
				dic.cliCondition = '点击数：' + (total.clkValidCount||0) + '\n' +
					'点击率：' + (total.ctr) + '\n' +
					'点击成本：' + (total.clkCost).toFixed(2);
				dic.totalCvs = total.totalCvs||'0';
				dic.costNum = total.costNum||'0';
				dic.cvsCost = ((total.costNum||0)/(total.totalCvs||1)).toFixed(2);
				dic.profit = total.profit||'0';
				dic.profitRate = total.profitRate;
				dic.tfDate = '--';
				dic.total = {};
				this.totalDic = dic;
				// if (this.tableListData.length == 0) {
				// 	return ;
				// }
				// let totaltmp = this.tableListData[this.tableListData.length-1];
				// if(totaltmp.total.id){
				// 	this.tableListData.push(dic);
				// }else{
				// 	this.tableListData[this.tableListData.length-1] = dic;
				// }
			},
			getGroupStats(){
				this.tableLoading = true;
				console.log('getGroupStats.');
				let _this = this;
				if (_this.advertiseId != '' || _this.productId != '' || _this.campaignsId != '' || _this.adGroupId != '' || _this.mediaId != '') {
					_this.pageSize = 9999;
				} else {
					_this.pageSize = 10;
				}
				let query = {
					filterSearch: [{name:'adgroupId', value: _this.pageGroupIds.map(String)}],//_this.pageGroupIds.map((id)=>{return {name:'adgroupId', value: ''+id}}),
					groupSearch:['adgroupId'],
					'timeSearch':{
						'beginTime':_this.statsDate[0],
						'endTime':_this.statsDate[1],
						'timeUnit':'day'
					},
					'page': 0,
  					'limit': _this.pageSize,
  					'order':'asc',
  					'sidx':'dateTime'
				};

				_this.$api.post(_this.allurlsList.statsUnits, query, function(r) {
					_this.addGroupStatsTotal(r.total||{});
					let stats = {};
					_this.tableLoading = false;
					for (let [k, stmp] of (r && r.list || []).entries()) {
						if(stats[stmp.adgroupId]){
							stats[stmp.adgroupId].clkValidCount += stmp.clkValidCount;
							stats[stmp.adgroupId].commentCount += stmp.commentCount;
							stats[stmp.adgroupId].consume += stmp.consume;
							stats[stmp.adgroupId].costNum += stmp.costNum;
							stats[stmp.adgroupId].followCount += stmp.followCount;
							stats[stmp.adgroupId].idpCvs += stmp.idpCvs;
							stats[stmp.adgroupId].impValidCount += stmp.impValidCount;
							stats[stmp.adgroupId].interactionCost += stmp.interactionCost;
							stats[stmp.adgroupId].interactionCount += stmp.interactionCount;
							stats[stmp.adgroupId].likeCount += stmp.likeCount;
							stats[stmp.adgroupId].profit += stmp.profit;
							stats[stmp.adgroupId].respCount += stmp.respCount;
							stats[stmp.adgroupId].totalCvs += stmp.totalCvs;
							stats[stmp.adgroupId].videoClickCount += stmp.videoClickCount;
							stats[stmp.adgroupId].repostCount += stmp.repostCount;
						}else{
							stats[stmp.adgroupId] = {};
							stats[stmp.adgroupId].clkValidCount = stmp.clkValidCount;
							stats[stmp.adgroupId].commentCount = stmp.commentCount;
							stats[stmp.adgroupId].consume = stmp.consume;
							stats[stmp.adgroupId].costNum = stmp.costNum;
							stats[stmp.adgroupId].followCount = stmp.followCount;
							stats[stmp.adgroupId].idpCvs = stmp.idpCvs;
							stats[stmp.adgroupId].impValidCount = stmp.impValidCount;
							stats[stmp.adgroupId].interactionCost = stmp.interactionCost;
							stats[stmp.adgroupId].interactionCount = stmp.interactionCount;
							stats[stmp.adgroupId].likeCount = stmp.likeCount;
							stats[stmp.adgroupId].profit = stmp.profit;
							stats[stmp.adgroupId].respCount = stmp.respCount;
							stats[stmp.adgroupId].totalCvs = stmp.totalCvs;
							stats[stmp.adgroupId].videoClickCount = stmp.videoClickCount;
							stats[stmp.adgroupId].repostCount = stmp.repostCount;
						}
					}

					for (let [i, adgroupId] of (_this.pageGroupIds||[]).entries()) {
						if ((_this.pageGroupStats[''+adgroupId]|| 0 == _this.pageGroupStats[''+adgroupId]) && _this.tableListData[_this.pageGroupStats[''+adgroupId]]){
							let tmp = _this.tableListData[_this.pageGroupStats[''+adgroupId]];

							tmp.imp= (stats[''+adgroupId] && stats[''+adgroupId].impValidCount) || '0';
							tmp.ecpm= (((stats[''+adgroupId] && stats[''+adgroupId].costNum || 0.00)/(stats[''+adgroupId] && stats[''+adgroupId].impValidCount || 1))*1000).toFixed(2);
							tmp.cliCondition= '点击数：' + (stats[''+adgroupId] && stats[''+adgroupId].clkValidCount || 0) + '\n' +
									'点击率：' + (tmp.imp/(stats[''+adgroupId] && stats[''+adgroupId].clkValidCount||1)).toFixed(2) + '\n' +
									'点击成本：' + (((stats[''+adgroupId] && stats[''+adgroupId].costNum || 0.00) / (stats[''+adgroupId] && stats[''+adgroupId].clkValidCount || 1)).toFixed(2));
							tmp.consume= stats[''+adgroupId] && stats[''+adgroupId].consume || '0.00';
							tmp.totalCvs= stats[''+adgroupId] && stats[''+adgroupId].totalCvs || '0';
							tmp.costNum= stats[''+adgroupId] && stats[''+adgroupId].costNum || '0';
							tmp.cvsCost= ((stats[''+adgroupId] && stats[''+adgroupId].costNum || 0) / (Number(tmp.totalCvs)||1)).toFixed(2);
							tmp.profit= stats[''+adgroupId] && stats[''+adgroupId].profit || '0.00';
							tmp.profitRate= ((Number(tmp.profit))/(Number(tmp.costNum)||1)).toFixed(2);

							tmp.daybudget = tmp.total.dayBudget;

							_this.tableListData[_this.pageGroupStats[''+adgroupId]] = tmp;
						}
					}
				});
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
				this.$confirm('小姐姐真的需要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
					v.$api.delete(v.allurlsList.creatADGroupUrl + '/' + obj.id, '', function(r) {
						let index = v.tableListData.indexOf(val);
						if(index <= v.tableListData.length-2){
							for(let i=index; i < v.tableListData.length-1; i++){
								v.tableListData[i] = v.tableListData[i+1];
							}
						}

						v.tableListData.splice(v.tableListData.length-1,1);
						delete v.pageGroupStats[''+obj.id];
						v.$message({
	            type: 'success',
	            message: '删除成功!'
	          });
					})
        }).catch(() => {
        });
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
