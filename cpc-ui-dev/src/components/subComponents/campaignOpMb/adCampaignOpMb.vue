<template lang="html">
	<div class="adCampaign">
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
								<el-select v-model="productId" filterable placeholder="请选择广告主" style="width:200px">
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
								<el-select v-model="campaignsId" filterable placeholder="请选择广告主" style="width:200px">
									<el-option key="" label="全部" value=""></el-option>
									<el-option v-for="(item,index) in campaignsList" :key="item.id" :label="item.name" :value="item.id">
									</el-option>
								</el-select>
							</el-form-item>
						</el-form>
					</el-col>
				</el-row>
			<el-row>
				<el-col :span="7">
				</el-col>
				<el-col :span="10">&emsp;</el-col>
				<el-col :span="3"><el-button type="primary" @click='searchAction' style="height: 40px" round>搜索</el-button></el-col>
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
					  @change="getCampaignStats"
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
								<div v-if="col.label == 'advCam'">
									<div v-if="scope.row.total.id">
										<router-link :to="{ path: '/campaignop/adGroupOpMb', query:{campaignsId:scope.row.total.id}}">{{ scope.row.advCam }}</router-link>
									</div>
									<div v-else>
										<span>{{ scope.row.advCam }}</span>
									</div>
								</div>
								<div v-else-if="col.label == 'advZ'">
									<div v-if="scope.row.total.id">
										<router-link :to="{ path: '/advpro/advDetail', query:{id:scope.row.total.id}}">{{ scope.row.advZ }}</router-link>
									</div>
									<div v-else>
										<span>{{ scope.row.advZ }}</span>
									</div>
								</div>
								<div v-else-if="col.label == 'product'">
									<div v-if="scope.row.total.id">
										<router-link :to="{ path: '/advpro/proDetail', query:{id:scope.row.total.id}}">{{ scope.row.product }}</router-link>
									</div>
									<div v-else>
										<span>{{ scope.row.product }}</span>
									</div>
								</div>
								<div v-else-if="col.label == 'tfStatus'">
									<div v-if="scope.row.tfStatus == '创建未完成'">
										<span>{{ scope.row.tfStatus }}</span>
									</div>
									<div v-else-if="scope.row.tfStatus == '--'">
										<span>{{ scope.row.tfStatus }}</span>
									</div>
									<div v-else>
										<el-switch style="display: block;height:100%" v-model="scope.row.tfStatus" active-color="#13ce66" inactive-color="#ff4949" active-text="开启" inactive-text="关闭" @change='statusChangeAction(scope.row)'>
										</el-switch>
									</div>
								</div>
								<div v-else-if="col.label == 'dayBudget'">
									<div v-if="scope.row.total.id">
										<el-input type='number' v-model='scope.row.dayBudget' @keyup.enter.native="dayBudgetAction(scope.row.total,scope.row.dayBudget)" ></el-input>
									</div>
									<div v-else>
										<span>{{ scope.row.dayBudget }}</span>
									</div>
								</div>
								<div v-else-if="col.label == 'totalBudget'">
									<div v-if="scope.row.total.id">
										<el-input type='number' v-model='scope.row.totalBudget' @keyup.enter.native="totalBudgetAction(scope.row.total,scope.row.totalBudget)" ></el-input>
									</div>
									<div v-else>
										<span>{{ scope.row.totalBudget }}</span>
									</div>
								</div>
								<div v-else>
									<span>{{ scope.row[col.label] }}</span>
								</div>
							</template>
						</el-table-column>
					</template>
					<el-table-column fixed="right" label="操作" width="200">
						<template slot-scope="scope">
							<div v-if="scope.row.total.id">
								<el-button @click="lookDetailAction(scope.row)" type="text" size="small">查看</el-button>
								<el-button @click='editAction(scope.row)' type="text" size="small">编辑</el-button>
								<el-button @click='copyAction(scope.row)' type="text" size="small">复制</el-button>
								<el-button @click='deletAction(scope.row)' type="text" size="small">删除</el-button>
								<!-- <el-button @click='creatNewAction(scope.row)' type="text" size="small">新建</el-button> -->
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
		<el-dialog title="活动详情" :visible.sync="dialogVisible" width="40%">
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
					<span class="dialogObjSpan">活动名称:&emsp;&emsp;{{dialogObj.name}}</span><br>
					<span class="dialogObjSpan">激活单价:&emsp;&emsp;{{dialogObj.activePrice}}</span><br>
					<span class="dialogObjSpan">总预算:&emsp;&emsp;&emsp;{{dialogObj.totalBudget}}</span><br>
					<span class="dialogObjSpan">日预算:&emsp;&emsp;&emsp;{{dialogObj.dayBudget}}</span><br>
					<span class="dialogObjSpan">起止时间:&emsp;&emsp;{{dialogObj.beginDate}}至{{dialogObj.endDate}}</span><br>
					<!-- <span style="line-height:50px">投放位置:&emsp;&emsp;微博-评论页,uc账户</span><br> -->
				</el-col>
				<el-col :span="10">
					<span class="dialogObjSpan">产品:&emsp;&emsp;&emsp;&emsp;{{dialogObj.product.name}}</span><br>
					<span class="dialogObjSpan">激活数:&emsp;&emsp;&emsp;{{dialogObj.reportDTO.totalCvs||0}}</span><br>
					<span class="dialogObjSpan">消耗:&emsp;&emsp;&emsp;&emsp;{{dialogObj.reportDTO.consume||0.00}}</span><br>
					<span class="dialogObjSpan">成本:&emsp;&emsp;&emsp;&emsp;{{dialogObj.currentMoney}}</span><br>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span='2'>
					&emsp;
				</el-col>
				<el-col :span="20">
					<span style="line-height:50px">激活单价</span><br>
					<el-table ref="singleTable" border :data="pages" highlight-current-row size='small' style="width: 100%">
						<el-table-column label="日期">
							<template slot-scope="scope">
								<span>{{scope.row.date}}</span>
							</template>
						</el-table-column>
						<el-table-column label="现单价（元）">
							<template slot-scope="scope">
								<span>{{scope.row.price}}</span>
							</template>
						</el-table-column>
						<el-table-column label="修改单价（元）">
							<template slot-scope="scope">
								<el-input v-model="scope.row.currentPrice" :placeholder='scope.row.price'></el-input>
							</template>
						</el-table-column>
						<el-table-column label="操作">
							<template slot-scope="scope">
								<el-button size="mini" icon="el-icon-edit" @click="moneyEdit(scope.row, pages)">修改</el-button>
							</template>
						</el-table-column>
					</el-table>
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
				activeName: 'campaign',
				dialogVisible: false,
				tableLoading: false,
				statsDate: [this.$api.dateFormat(new Date()), this.$api.dateFormat(new Date())],
				dialogObj: {
					advertiser: {},
					product: {},
					reportDTO: {}
				},
				pages: [{
					"price": "1",
					"campaignId": "",
					"date": "2017-8-8",
					"currentPrice": "",
					"id": ""
				}],
				tableHeaderName: [{
						name: '活动名称',
						label: 'advCam',
						value: true
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
						name: '曝光',
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
						name: '花费（元）',
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
					{
						name: '总预算',
						label: 'totalBudget',
						value: false
					},
					{
						name: '日预算',
						label: 'dayBudget',
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
				pageCampaignIds:[],
				pageCampaignStats: {},
				pageCampaignTodaySpend:{},
				// advertiseId: '',
				// productId: '',
				// campaignsId: '',
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
			this.getGTAdvertiserList().then(function(result) {
				v.advertiseList = result;
			});
			this.getGTProductList().then(function(result) {
				v.productsList = result;
			});
			this.getGTCampaignsList('MEDIA_BUY').then(function(result) {
				v.campaignsList = result;
			});
			this.getTableListWithParams();
		},
		watch: {
		},
		methods: {
			tableClickAction(){
				if ('group' == this.activeName){
					this.$router.push({
			            path: '/campaignop/adGroupOpMb'
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
				if (v.advertiseId != '' || v.productId != '' || v.campaignsId != '') {
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
					'rules[2].field': 'id',
					'rules[2].op': 'eq',
					'rules[2].data': v.campaignsId == '' ? -1 : parseInt(v.campaignsId),
					'rules[3].field': 'mediaType',
					'rules[3].op': 'eq',
					'rules[3].data': 'MEDIA_BUY',
					'groupOp': 'AND'
				}
				v.$api.get(v.allurlsList.creatCampaigns, params, function(r) {
					v.tableListData = [];
					v.total = r.totalElements;
					if(r.content != null && r.content.length > 0) {
						for(var i = 0; i < r.content.length; i++) {
							var dic = {};
							dic.advCam = r.content[i].id + '-' +  r.content[i].name;
							dic.advZ = r.content[i].advertiser.id + '-' + r.content[i].advertiser.name;
							dic.product = r.content[i].product.id + '-' + r.content[i].product.name;
							dic.activePrice = r.content[i] && r.content[i].activePrice || 0.00;
							dic.consume = '--';//r.content[i] && r.content[i].reportDTO && r.content[i].reportDTO.consume || 0.00;
							dic.totalCvs = '--';//r.content[i] && r.content[i].reportDTO && r.content[i].reportDTO.totalCvs || 0;
							dic.costNum = '--';//r.content[i] && r.content[i].reportDTO && r.content[i].reportDTO.costNum || 0.0;
							dic.cvsCost = '--';//(dic.costNum / (dic.totalCvs || 1)).toFixed(2);
							dic.profit = '--';//r.content[i] && r.content[i].reportDTO && r.content[i].reportDTO.profit || 0.0;
							dic.profitRate = '--';//r.content[i] && r.content[i].reportDTO && r.content[i].reportDTO.profitRate || 0.0;
							dic.cliCondition = '--';//'点击数：' + (r.content[i] && r.content[i].reportDTO && r.content[i].reportDTO.clkValidCount || 0) + '\n' +
								// '点击率：' + (r.content[i] && r.content[i].reportDTO && r.content[i].reportDTO.ctr || 0.00) + '\n' +
								// '点击成本：' + ((dic.costNum / (r.content[i] && r.content[i].reportDTO && r.content[i].reportDTO.clkValidCount || 1)).toFixed(2));
							dic.tfDate = (r.content[i] && r.content[i].beginDate || '不限') + '\n' +
								'至 ' + (r.content[i] && r.content[i].endDate || '不限');
							dic.totalBudget = r.content[i].totalBudget;
							dic.dayBudget = r.content[i].dayBudget || '0';
							var status;
							if(r.content[i].status == 'ON') {
								status = true;
							} else if(r.content[i].status == 'OFF') {
								status = false;
							} else if(r.content[i].status == 'NO_READY') {
								status = '创建未完成';
							}
							dic.tfStatus = status;
							dic.updateDate = r.content[i].updateDate;
							dic.total = r.content[i];
							dic.imp = '--';
							v.tableListData.push(dic);
							v.pageCampaignIds.push(r.content[i].id);
							v.pageCampaignStats[''+dic.total.id] = i;
						}
						v.getCampaignStats();
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
			addCampaignStatsTotals(total){
				// debugger
				console.log('total.', total);
				let dic = {};
				dic.advCam = '合计';
				dic.advZ = '--';
				dic.product = '--';
				dic.tfStatus = '--';
				dic.activePrice = '--';
				dic.consume = total.consume||'0';
				dic.imp = total.impValidCount||'0';
				dic.cliCondition = '点击数：' + (total.clkValidCount||0) + '\n' +
					'点击率：' + (total.ctr) + '\n' +
					'点击成本：' + (total.clkCost).toFixed(2);
				dic.totalCvs = total.totalCvs||'0';
				dic.costNum = total.costNum||'0';
				dic.cvsCost = ((total.costNum||0)/(total.totalCvs||1)).toFixed(2);
				dic.profit = total.profit||'0';
				dic.profitRate = total.profitRate;
				dic.tfDate = '--';
				dic.totalBudget = '--';
				dic.dayBudget = '--';

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
			getCampaignStats(){
				this.tableLoading = true;
				console.log('getCampaignStats.');
				let _this = this;
				if (_this.advertiseId != '' || _this.productId != '' || _this.campaignsId != '') {
					_this.pageSize = 9999;
				} else {
					_this.pageSize = 10;
				}
				let query = {
					filterSearch: [{name:'campaignId', value: _this.pageCampaignIds.map(String)}],//_this.pageCampaignIds.map((id)=>{return {name:'campaignId', value: ''+id}}),
					groupSearch:['campaignId'],
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
					_this.addCampaignStatsTotals(r.total||{});
					let stats = {};
					_this.tableLoading = false;
					for (let [k, stmp] of (r && r.list || []).entries()) {

						if(stats[stmp.campaignId]){
							stats[stmp.campaignId].clkValidCount += stmp.clkValidCount;
							stats[stmp.campaignId].commentCount += stmp.commentCount;
							stats[stmp.campaignId].consume += stmp.consume;
							stats[stmp.campaignId].costNum += stmp.costNum;
							stats[stmp.campaignId].followCount += stmp.followCount;
							stats[stmp.campaignId].idpCvs += stmp.idpCvs;
							stats[stmp.campaignId].impValidCount += stmp.impValidCount;
							stats[stmp.campaignId].interactionCost += stmp.interactionCost;
							stats[stmp.campaignId].interactionCount += stmp.interactionCount;
							stats[stmp.campaignId].likeCount += stmp.likeCount;
							stats[stmp.campaignId].profit += stmp.profit;
							stats[stmp.campaignId].respCount += stmp.respCount;
							stats[stmp.campaignId].totalCvs += stmp.totalCvs;
							stats[stmp.campaignId].videoClickCount += stmp.videoClickCount;
						}else{
							stats[stmp.campaignId] = {};
							stats[stmp.campaignId].clkValidCount = stmp.clkValidCount;
							stats[stmp.campaignId].commentCount = stmp.commentCount;
							stats[stmp.campaignId].consume = stmp.consume;
							stats[stmp.campaignId].costNum = stmp.costNum;
							stats[stmp.campaignId].followCount = stmp.followCount;
							stats[stmp.campaignId].idpCvs = stmp.idpCvs;
							stats[stmp.campaignId].impValidCount = stmp.impValidCount;
							stats[stmp.campaignId].interactionCost = stmp.interactionCost;
							stats[stmp.campaignId].interactionCount = stmp.interactionCount;
							stats[stmp.campaignId].likeCount = stmp.likeCount;
							stats[stmp.campaignId].profit = stmp.profit;
							stats[stmp.campaignId].respCount = stmp.respCount;
							stats[stmp.campaignId].totalCvs = stmp.totalCvs;
							stats[stmp.campaignId].videoClickCount = stmp.videoClickCount;
						}
					}
					for (let [i, campaignid] of (_this.pageCampaignIds||[]).entries()) {
						if ((_this.pageCampaignStats[''+campaignid]|| 0 == _this.pageCampaignStats[''+campaignid]) && _this.tableListData[_this.pageCampaignStats[''+campaignid]]){
							let tmp = _this.tableListData[_this.pageCampaignStats[''+campaignid]];

							tmp.imp= (stats[''+campaignid] && stats[''+campaignid].impValidCount) || '0';
							tmp.ecpm= (((stats[''+campaignid] && stats[''+campaignid].costNum || 0.00)/(stats[''+campaignid] && stats[''+campaignid].impValidCount || 1))*1000).toFixed(2);
							tmp.cliCondition= '点击数：' + (stats[''+campaignid] && stats[''+campaignid].clkValidCount || 0) + '\n' +
									'点击率：' + (tmp.imp/(stats[''+campaignid] && stats[''+campaignid].clkValidCount||1)).toFixed(2) + '\n' +
									'点击成本：' + (((stats[''+campaignid] && stats[''+campaignid].costNum || 0.00) / (stats[''+campaignid] && stats[''+campaignid].clkValidCount || 1)).toFixed(2));
							tmp.consume= stats[''+campaignid] && stats[''+campaignid].consume || '0.00';
							tmp.totalCvs= stats[''+campaignid] && stats[''+campaignid].totalCvs || '0';
							tmp.costNum= stats[''+campaignid] && stats[''+campaignid].costNum || '0';
							tmp.cvsCost= ((stats[''+campaignid] && stats[''+campaignid].costNum || 0) / (Number(tmp.totalCvs)||1)).toFixed(2);
							tmp.profit= stats[''+campaignid] && stats[''+campaignid].profit || '0.00';
							tmp.profitRate= (Number(tmp.profit)/(Number(tmp.costNum)||1)*100).toFixed(2)+'%';


							_this.tableListData[_this.pageCampaignStats[''+campaignid]] = tmp;
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
			lookDetailAction(val) {
				this.dialogVisible = true;
				this.dialogObj = val.total;
				this.dialogObj.currentMoney = (this.dialogObj.reportDTO.costNum / (this.dialogObj.reportDTO.totalCvs || 1)).toFixed(2);
				var params = {
					page: 0,
					size: 1000,
					'rules[0].field': 'campaign.id',
					'rules[0].op': 'eq',
					'rules[0].data': this.dialogObj.id,
					'groupOp': 'AND'
				}
				var v = this;
				this.$api.get(this.allurlsList.activePriceHistories, params, function(r) {
					v.pages = r.content;
				})
			},
			editAction(val) {
				var id = val.total.id;
				this.$router.push({
					name: 'creatCampaign',
					query: {
						id: id,
						value: 'edit'
					}
				})
			},
			copyAction(val) {
				var id = val.total.id;
				this.$router.push({
					name: 'creatCampaign',
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
					v.$api.delete(v.allurlsList.creatCampaigns + '/' + obj.id, '', function(r) {
						let index = v.tableListData.indexOf(val);
						if(index <= v.tableListData.length-2){
							for(let i=index; i < v.tableListData.length-1; i++){
								v.tableListData[i] = v.tableListData[i+1];
							}
						}

						v.tableListData.splice(v.tableListData.length-1,1);
						delete v.pageCampaignStats[''+obj.id];
						v.$message({
	            type: 'success',
	            message: '删除成功!'
	          });
					})
        }).catch(() => {
        });
			},
			creatNewAction(val) {
				var id = val.total.id;
				this.$router.push({
					name: 'creatCampaign',
					query: {
						id: id,
						value: 'new'
					}
				})
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
				this.$api.put(this.allurlsList.campaignsStatus + params, '', function(r) {
					console.log(r);
				})
			},
			// 修改单价
			moneyEdit(val) {
				console.log(val.currentPrice);
				if(val.currentPrice != undefined) {
					val.price = val.currentPrice;
					var v = this;
					this.$api.put(this.allurlsList.activePriceHistories, val, function(r) {
						v.$message({
							message: '修改成功',
							type: 'success'
						});
					})
				}
			},
			dayBudgetAction(val,dayBudget) {
				var params = {
					dayBudget: dayBudget,
					id: val.id
				}
				var v = this;
				v.$api.put(v.allurlsList.creatCampaigns, params, function(r) {
					v.$message({
						message: '修改日预算成功',
						type: 'success'
					});
				})
			},
			totalBudgetAction(val, totalBudget) {
				var params = {
					totalBudget: totalBudget,
					id: val.id
				}
				var v = this;
				v.$api.put(v.allurlsList.creatCampaigns, params, function(r) {
					v.$message({
						message: '修改总预算成功',
						type: 'success'
					});
				})
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.adCampaign {
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
