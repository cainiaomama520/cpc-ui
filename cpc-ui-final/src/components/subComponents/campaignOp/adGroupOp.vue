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
									<el-option v-for="(item,index) in advertiseList" :key="item.id" :label="item.id+'-'+item.name" :value="item.id">
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
									<el-option v-for="(item,index) in productsList" :key="item.id" :label="item.id+'-'+item.name" :value="item.id">
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
									<el-option v-for="(item,index) in campaignsList" :key="item.id" :label="item.id+'-'+item.name" :value="item.id">
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
									<el-option v-for="(item,index) in adGroupList" :key="item.id" :label="item.id+'-'+item.name" :value="item.id">
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
				<el-row>
					<el-popover
					    placement="top-start"
					    title="操作"
					    width="200"
					    trigger="hover"
						<el-dropdown @command="handleBatch">
						  <el-button :disabled="0 == multipleSelection.length">操作</el-button>
						  <el-dropdown-menu slot="dropdown">
						    <el-dropdown-item command="ON">开启</el-dropdown-item>
						    <el-dropdown-item command="OFF">暂停</el-dropdown-item>
						    <el-dropdown-item command="BUDGET">调整预算</el-dropdown-item>
						    <el-dropdown-item command="PRICE">调整出价</el-dropdown-item>
						    <el-dropdown-item command="TIME">调整时段</el-dropdown-item>
						  </el-dropdown-menu>
						</el-dropdown>
					</el-popover>
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
				</el-row>
				<el-table :data="tableListData" :summary-method='getSummaries' show-summary style="width: 100%" v-loading="tableLoading" @selection-change="handleSelectionChange">
					<el-table-column
				      type="selection"
				      width="55">
				    </el-table-column>
					<template v-for="(col ,ro) in tableHeaderName">
						<el-table-column
							:prop=col.label
							v-if="col.label == 'tfStatus'"
							:label=col.name
							width="140"
							:filters="statusFilterArray"
							:filter-method="filterStatus"
							filter-placement="bottom-end"
							sortable>
							<template slot-scope="scope">
								<el-tooltip class="item" effect="dark" :content="scope.row[col.label].msg" placement="top-start">
      								<p>{{scope.row[col.label].status}}</p>
    							</el-tooltip>
      						</template>
						</el-table-column>
						<el-table-column
							v-if="col.value && col.label != 'tfStatus'"
							:fixed="ro == 0 ? 'left':false"
							:label=col.name width="140"
							:prop="ro == 0 ? 'updateDate' : col.label"
							sortable>
							<template slot-scope="scope">
								<div v-if="col.label == 'advGro'">
									<div v-if="scope.row.total.id">
										<router-link :to="{ path: '/campaignop/adCreativityOp', query:{adGroupId:scope.row.total.id}}">{{ scope.row.advGro }}</router-link>
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
								<div v-else-if="col.label == 'tfSwitch'">
									<div v-if="scope.row.tfSwitch == '创建未完成'">
										<span>{{ scope.row.tfSwitch }}</span>
									</div>
									<div v-else-if="scope.row.tfSwitch == '--'">
										<span>--</span>
									</div>
									<div v-else>
										<el-switch style="display: block;height:100%" v-model="scope.row.tfSwitch" active-color="#13ce66" inactive-color="#ff4949" active-text="开启" inactive-text="关闭" @change='statusChangeAction(scope.row)'>
										</el-switch>
									</div>
								</div>
								<div v-else-if="col.label == 'daybudget' && '--' != scope.row.daybudget">
									<el-input type='number' size="mini" v-model.number='scope.row.daybudget' @keyup.enter.native="dayBudgetAction(scope.row.total,scope.row.daybudget)" style="font-size: 12px; width: 100px;"></el-input>
								</div>
								<div v-else-if="col.label == 'price' && '--' != scope.row.price">
									{{scope.row.total.bidType}}
									<el-input type='number' size="small" v-model.number='scope.row.total.bidPrice' @keyup.enter.native="priceChangeOneAction(scope.row.total,scope.row.total.bidPrice)" style="font-size: 12px; width: 70px;" >
									</el-input>
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
		<el-dialog
			title="调整预算"
			:visible.sync="budgetChangeCtr.display"
			width="30%"
			center>
		  <el-form :model="budgetChangeCtr" >
		    <el-form-item label="日预算" label-width="80px">
		      <el-input v-model="budgetChangeCtr.value" auto-complete="off" style="width: 200px;"></el-input>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" style="text-align: center;">
		    <el-button @click="budgetChangeCtr.display = false">取 消</el-button>
		    <el-button type="primary" @click="handleBatchExt('BUDGET')">确 定</el-button>
		  </div>
		</el-dialog>
		<el-dialog
		  title="调整出价"
		  :visible.sync="priceChangeCtr.display"
		  width="30%"
		  center>
		  <el-form :model="priceChangeCtr" >
		  	<el-form-item label="出价方式" label-width="80px">
			    <el-radio-group v-model="priceChangeCtr.type">
			      <el-radio label="CPM"></el-radio>
			      <el-radio label="CPC"></el-radio>
			    </el-radio-group>
			</el-form-item>
		    <el-form-item label="出价" label-width="80px">
		      <el-input v-model="priceChangeCtr.value" auto-complete="off" style="width: 200px;"></el-input>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" style="text-align: center;">
		    <el-button @click="priceChangeCtr.display = false">取 消</el-button>
		    <el-button type="primary" @click="handleBatchExt('PRICE')">确 定</el-button>
		  </div>
		  </el-dialog>
		<el-dialog
		  title="调整时段"
		  :visible.sync="timeChangeCtr.display"
		  width="55%"
		  center>
		  <el-form :model="timeChangeCtr" >
			<el-form-item label="起止时间" prop="date">
				<el-date-picker v-model="timeChangeCtr.date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd">
				</el-date-picker>
			</el-form-item>
		    <el-form-item label="投放时段:">
				<schDatePicker
					type="week"
					:rd="timeChangeCtr.periodTime"
					:value="timeChangeCtr.times"
                    v-on:input="updateScheduleInfo"
                    v-on:show="updateScheduleType">
                </schDatePicker>
			</el-form-item>
		  </el-form>
		  <div slot="footer" style="text-align: center;">
		    <el-button @click="timeChangeCtr.display = false">取 消</el-button>
		    <el-button type="primary" @click="handleBatchExt('TIME')">确 定</el-button>
		  </div>
		</el-dialog>
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
					<span class="dialogObjSpan">起止时段:&emsp;&emsp;&emsp;{{dialogObj.times}}</span><br>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span='2'>
					&emsp;
				</el-col>
				<el-col :span="20">
					<el-row>
						<div v-if="dialogObj.mediaType != 'MEDIA_BUY' && dialogObj.dmpTargeting != undefined">
							<el-col :span='2'>
								<span style="line-height:50px;font-size:15px">定向:</span><br>
							</el-col>
							<el-col :span='10' style="margin-top: 40px">
<!-- 								<el-col :span='24' v-if='dialogObj.dmpTargeting.content.gender.length !=0'>
									<span class="dialogObjSpan">性别:&emsp;&emsp;&emsp;{{dialogObj.dmpTargeting.content.gender.toString()}}</span><br>
								</el-col>
								<el-col :span='24'>
									<span class="dialogObjSpan">年龄:&emsp;&emsp;&emsp;{{dialogObj.dmpTargeting.content.ageRange}}</span><br>
								</el-col>
								<el-col :span='24' v-if='dialogObj.dmpTargeting.content.loc.length!=0'>
									<span class="dialogObjSpan">地域:&emsp;&emsp;&emsp;{{dialogObj.dmpTargeting.content.loc}}</span><br>
								</el-col>
 -->								<el-col :span='24' v-if='dialogObj.mexTargeting != undefined'>
									<span class="dialogObjSpan">手机系统:&emsp;{{dialogObj.mexTargeting.targetOs}}</span><br>
								</el-col>
								<el-col :span='24' v-if='dialogObj.mexTargeting != undefined'>
									<span class="dialogObjSpan">网络环境:&emsp;{{dialogObj.mexTargeting.targetConnType}}</span><br>
								</el-col>
<!-- 								<el-col :span='24' v-if='dialogObj.dmpTargeting.content.interest.length!=0'>
									<span class="dialogObjSpan">兴趣:&emsp;&emsp;&emsp;{{dialogObj.dmpTargeting.content.interest}}</span><br>
								</el-col>
								<el-col :span='24' v-if='dialogObj.dmpTargeting.content.life_status.length!=0'>
									<span class="dialogObjSpan">行为属性:&emsp;{{dialogObj.dmpTargeting.content.life_status}}</span><br>
								</el-col>
 -->							</el-col>
							<el-col :span='2'>
								&emsp;
							</el-col>
							<el-col :span='10' style="margin-top: 40px">
							</el-col>
						</div>
					</el-row>
				</el-col>
			</el-row>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="dialogVisible = false">返 回</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import schDatePicker from "../../common/schedule.vue";
	export default {
		data() {
			return {
				activeName: 'group',
				tableLoading: false,
				statsDate: [this.$api.dateFormat(new Date()), this.$api.dateFormat(new Date())],
				multipleSelection: [],
				budgetChangeCtr: {
					display: false,
					value: 0
				},
				priceChangeCtr: {
					display: false,
					type: 'CPM',
					value: 0
				},
				timeChangeCtr: {
					allTimes: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
					periodTime: 'all',
					display: false,
					date:'',
					times: []
				},
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
						name: '投放开关',
						label: 'tfSwitch',
						value: true
					},
					{
						name: '投放状态',
						label: 'tfStatus',
						value: true
					},
					{
						name: '日预算',
						label: 'daybudget',
						value: true
					},
					{
						name: '出价',
						label: 'price',
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
						name: '转化率',
						label: 'cvr',
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
						name: '出价数',
						label: 'respCount',
						value: true
					},
					{
						name: '曝光数',
						label: 'imp',
						value: true
					},
					{
						name: 'ECPM',
						label: 'ecpm',
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
						name: '互动详情',
						label: 'hdDetail',
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
				// advertiseId: '',
				// productId: '',
				// campaignsId: '',
				adGroupId: '',
				pageGroupIds:[],
				pageGroupStats: {},
				pageGroupTodaySpend:{},
				campaignSpendIds: [],
				campaignSpend: {},
				statusFilterArray: [{ text: '创建未完成', value: '创建未完成' },
					{ text: '广告主未审核', value: '广告主未审核' },
					{ text: '广告主审核中', value: '广告主审核中' },
					{ text: '广告主审核失败', value: '广告主审核失败' },
					{ text: '关闭', value: '关闭' },
					{ text: '投放未开始', value: '投放未开始' },
					{ text: '投放已结束', value: '投放已结束' },
					{ text: '投放时段不符', value: '投放时段不符' },
					{ text: '日预算超出', value: '日预算超出' },
					{ text: '广告活动关闭', value: '广告活动关闭' },
					{ text: '活动投放未开始', value: '活动投放未开始' },
					{ text: '活动投放已结束', value: '活动投放已结束' },
					{ text: '活动日预算不足', value: '活动日预算不足' },
					{ text: '超出活动日预算', value: '超出活动日预算' },
					{ text: '正常', value: '正常' }],
				mediaId: '',
				totalDic: {}
			}
		},
		components:{
			schDatePicker
		},
		computed: {
			advertiseId: {
		    get () {
		      return this.$store.state.creatCp.RTBListAdvertiseId
		    },
		    set (val) {
		      this.$store.commit('setRTBListAdvertiseId', val)
		    }
			},
			productId: {
		    get () {
		      return this.$store.state.creatCp.RTBListProductId
		    },
		    set (val) {
		      this.$store.commit('setRTBListProductId', val)
		    }
			},
			campaignsId: {
		    get () {
		      return this.$store.state.creatCp.RTBListCampaignsId
		    },
		    set (val) {
		      this.$store.commit('setRTBListCampaignsId', val)
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
			this.getGTCampaignsList('RTB').then(function(result) {
				v.campaignsList = result;
				if(v.$route.query.id != undefined) {
					v.campaignsId = parseInt(v.$route.query.id);
				}
				v.getTableListWithParams();
			});
			this.getGTAdGroupList('RTB').then(function(result) {
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
			            path: '/campaignop/adCampaignOp'
			        })
				}

				if('creative' == this.activeName){
					this.$router.push({
						path: '/campaignop/adCreativityOp'
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
					'rules[5].data': 'RTB',
					'groupOp': 'AND'
				}
				v.$api.get(v.allurlsList.creatADGroupUrl, params, function(r) {
					v.tableListData = [];
					v.pageGroupIds = [];
					v.total = r.totalElements;
					if(r.content != null && r.content.length > 0) {
						for(var i = 0; i < r.content.length; i++) {
							var dic = {};
							v.pageGroupIds.push(r.content[i].id);
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
								}else if(r.content[i].media == 'BILIBILI') {
									media = 'B站';
								}
							}
							dic.media = media;
							dic.activePrice = r.content[i] && r.content[i].campaign && r.content[i].campaign.activePrice || 0.00;
							dic.consume = '--';//r.content[i] && r.content[i].reportDTO && r.content[i].reportDTO.consume || 0.00;
							dic.totalCvs = '--';//r.content[i] && r.content[i].reportDTO && r.content[i].reportDTO.totalCvs || 0;
							dic.cvr = '--';
							dic.costNum = '--';//r.content[i] && r.content[i].reportDTO && r.content[i].reportDTO.costNum || 0.0;
							dic.cvsCost = '--';//(dic.costNum / (dic.totalCvs || 1)).toFixed(2);
							dic.profit = '--';//r.content[i] && r.content[i].reportDTO && r.content[i].reportDTO.profit || 0.0;
							dic.profitRate = '--';//r.content[i] && r.content[i].reportDTO && r.content[i].reportDTO.profitRate || 0.0;
							dic.respCount = '--';
							dic.imp = '--';//r.content[i] && r.content[i].reportDTO && r.content[i].reportDTO.impValidCount || 0;
							dic.cliCondition = '--';//'点击数：' + (r.content[i] && r.content[i].reportDTO && r.content[i].reportDTO.clkValidCount || 0) + '\n' +
								// '点击率：' + (r.content[i] && r.content[i].reportDTO && r.content[i].reportDTO.ctr || 0.00) + '\n' +
								// '点击成本：' + ((dic.costNum / (r.content[i] && r.content[i].reportDTO && r.content[i].reportDTO.clkValidCount || 1)).toFixed(2));
							dic.hdCondition = '--';//'互动量：' + (r.content[i] && r.content[i].reportDTO && r.content[i].reportDTO.interactionCount || 0) + '\n' +
								// '互动率：' + (r.content[i] && r.content[i].reportDTO && r.content[i].reportDTO.interactionRate || 0.0) + '\n' +
								// '互动率：' + (r.content[i] && r.content[i].reportDTO && r.content[i].reportDTO.interactionCost || 0);
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
							dic.tfSwitch = status;
							if (r.content[i].dmpTargeting != null) {
								// r.content[i].dmpTargeting.content = JSON.parse(r.content[i].dmpTargeting.content)
							}
							dic.ecpm = '--';
							dic.total = r.content[i];
							dic.daybudget = '--';//dic.total.dayBudget;
							dic.price = '--';//dic.total.bidType + ' : ' + dic.total.bidPrice;
							dic.hdDetail = '--';
							dic.tfStatus = '--';

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
							dic.updateDate = r.content[i].updateDate;
							console.log('-----',dic.updateDate);
							v.tableListData.push(dic);
							v.pageGroupStats[''+dic.total.id] = i;
							if(-1 == v.campaignSpendIds.indexOf(r.content[i].campaign.id)){
								v.campaignSpendIds.push(r.content[i].campaign.id);
							};
						}
						v.getCampaignStats();
					}else{
						v.tableLoading = false;
					}
				})
			},

			filterStatus(value, row){
				return row.tfStatus.status === value;
			},

			getCampaignStats(){
				let _this = this;
				if (_this.advertiseId != '' || _this.productId != '' || _this.campaignsId != '' || _this.adGroupId != '' || _this.mediaId != '') {
					_this.pageSize = 9999;
				} else {
					_this.pageSize = 10;
				}
				let query = {
					filterSearch: [{name:'campaignId', value: _this.campaignSpendIds.map(String)}],//_this.campaignSpendIds.map((id)=>{return {name:'campaignId', value: ''+id}}),
					groupSearch:['campaignId'],
					'timeSearch':{
						'beginTime': this.$api.dateFormat(new Date()),
						'endTime': this.$api.dateFormat(new Date()),
						'timeUnit':'day'
					},
					'page': 0,
  					'limit': _this.pageSize,
  					'order':'asc',
  					'sidx':'dateTime'
				};
				_this.$api.post(_this.allurlsList.statsUnits, query, function(r) {
					let stats = {};
					console.log('campaign stats.', r);
					for (let [k, stmp] of (r && r.list || []).entries()) {
						if(_this.campaignSpend[stmp.campaignId]){
							// let camstats = _this.campaignSpend[stmp.campaignId];
							// camstats.dayspend += Number(stmp.costNum);
						}else{
							_this.campaignSpend[stmp.campaignId] = {dayspend:Number(stmp.costNum)};
						}
					};

					_this.getGroupStats();
				});
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
				dic.activePrice = '--';

				dic.consume = total.consume||'0';
				dic.totalCvs = total.totalCvs||'0';
				if ((total.clkValidCount||0) != 0) {
					dic.cvr = ((total.totalCvs/total.clkValidCount)*100).toFixed(2)+'%';
				} else {
					dic.cvr = '0.00%';
				}
				dic.costNum = total.costNum||'0';
				dic.cvsCost = ((total.costNum||0)/(total.totalCvs||1)).toFixed(2);
				if(0 == total.costNum) dic.cvsCost = '0.00';
				if(0 < total.costNum && 0 == total.totalCvs) dic.cvsCost = '∞∞';
				dic.profit = total.profit||'0';
				dic.profitRate = total.profitRate;
				dic.cliCondition = '点击数：' + (total.clkValidCount||0) + '\n' +
					'点击率：' + (total.ctr) + '\n' +
					'点击成本：' + (total.clkCost).toFixed(2);
				dic.hdCondition = '--';//'互动量：' + (r.content[i] && r.content[i].reportDTO && r.content[i].reportDTO.interactionCount || 0) + '\n' +
					// '互动率：' + (r.content[i] && r.content[i].reportDTO && r.content[i].reportDTO.interactionRate || 0.0) + '\n' +
					// '互动率：' + (r.content[i] && r.content[i].reportDTO && r.content[i].reportDTO.interactionCost || 0);
				dic.tfDate = '--';
				dic.tfSwitch = '--';
				dic.respCount = total.respCount || '0';
				dic.imp = total.impValidCount || '0';
				dic.ecpm = (total.costNum/(total.impValidCount||1)*1000).toFixed(2);
				dic.total = {};
				dic.daybudget = '--';
				dic.price = '--';
				dic.hdDetail = '--';
				dic.tfStatus = '--';
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
				let query = {
					filterSearch: {name:'adgroupId', value: _this.pageGroupIds.map(String)},//_this.pageGroupIds.map((id)=>{return {name:'adgroupId', value: ''+id}}),
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
					console.log('rrrrrrrr', r);
					for (let [k, stmp] of (r && r.list || []).entries()) {
						if(!_this.pageGroupTodaySpend[stmp.adgroupId] && _this.$api.dateFormat(new Date())==stmp.dateTime){
							_this.pageGroupTodaySpend[stmp.adgroupId] = stmp.costNum;
						}

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
							tmp.respCount= (stats[''+adgroupId] && stats[''+adgroupId].respCount) || '0';
							tmp.imp= (stats[''+adgroupId] && stats[''+adgroupId].impValidCount) || '0';
							tmp.ecpm= (((stats[''+adgroupId] && stats[''+adgroupId].costNum || 0.00)/(stats[''+adgroupId] && stats[''+adgroupId].impValidCount || 1))*1000).toFixed(2);
							let click = stats[''+adgroupId] && stats[''+adgroupId].clkValidCount||0;
							tmp.cliCondition= '点击数：' + (stats[''+adgroupId] && stats[''+adgroupId].clkValidCount || 0) + '\n' +
									'点击率：' + ((click)/(Number(tmp.imp)||1)*100).toFixed(2)+'%' + '\n' +
									'点击成本：' + (((stats[''+adgroupId] && stats[''+adgroupId].costNum || 0.00) / (stats[''+adgroupId] && stats[''+adgroupId].clkValidCount || 1)).toFixed(2));
							tmp.consume= stats[''+adgroupId] && stats[''+adgroupId].consume || '0.00';
							tmp.totalCvs= stats[''+adgroupId] && stats[''+adgroupId].totalCvs || '0';
							if ((stats[''+adgroupId] && stats[''+adgroupId].clkValidCount || 0) != 0) {
								tmp.cvr = ((tmp.totalCvs/(stats[''+adgroupId] && stats[''+adgroupId].clkValidCount))*100).toFixed(2)+'%';
							} else {
								tmp.cvr = '0.00%';
							}
							tmp.costNum= stats[''+adgroupId] && stats[''+adgroupId].costNum || '0';
							tmp.cvsCost= ((stats[''+adgroupId] && stats[''+adgroupId].costNum || 0) / (Number(tmp.totalCvs)||1)).toFixed(2);
							if(0 == (stats[''+adgroupId] && stats[''+adgroupId].costNum||0)) tmp.cvsCost = '0.00';
							if(0 < (stats[''+adgroupId] && stats[''+adgroupId].costNum||0) && 0 == (stats[''+adgroupId] && stats[''+adgroupId].totalCvs||0)) tmp.cvsCost = '∞∞';
							tmp.profit= stats[''+adgroupId] && stats[''+adgroupId].profit || '0.00';
							tmp.profitRate= ((Number(tmp.profit))/(Number(tmp.costNum)||1)*100).toFixed(2)+'%';
							let impcount = stats[''+adgroupId] && stats[''+adgroupId].impValidCount||0;
							tmp.hdCondition = '互动量：' + (stats[''+adgroupId] && stats[''+adgroupId].interactionCount || 0) + '\n' +
									'互动率：' + ((impcount)/(stats[''+adgroupId] && stats[''+adgroupId].interactionCount || 1)*100).toFixed(2)+'%' + '\n' +
									'互动成本：' + ((stats[''+adgroupId] && stats[''+adgroupId].costNum||0)/(stats[''+adgroupId] && stats[''+adgroupId].interactionCount || 1)).toFixed(2);
							tmp.hdDetail = '关注：' + (stats[''+adgroupId] && stats[''+adgroupId].followCount || 0) + '\n' +
									'转发：' + (stats[''+adgroupId] && stats[''+adgroupId].repostCount || 0) + '\n' +
									'点赞：' + (stats[''+adgroupId] && stats[''+adgroupId].likeCount || 0) + '\n' +
									'视频播放：' + (stats[''+adgroupId] && stats[''+adgroupId].videoClickCount || 0);

							tmp.daybudget = tmp.total.dayBudget;
							tmp.price = tmp.total.bidType + ' : ' + tmp.total.bidPrice;
							_this.tableListData[_this.pageGroupStats[''+adgroupId]] = tmp;
							_this.calcGroupStatus(adgroupId);
						}
					}
				});
			},

			calcGroupStatus(groupid){
				let tmp = this.tableListData[this.pageGroupStats[''+groupid]];
				let statustmp = {};
				if(!tmp.total.id){
					return;
				}
				for(let [i, status] of (tmp.total.advertiser.checkStatus||[]).entries()){
					console.log('status.media.', status.media, status.checkStatus);
					if(tmp.meida == 'B站' && status.media == 'WAX'){
						if(status.checkStatus == 'init'){
							statustmp.status = '广告主未审核';
							statustmp.msg = '广告主未审核';
							break;
						}
						if(status.checkStatus == 'pending'){
							statustmp.status = '广告主审核中';
							statustmp.msg = '广告主审核中';
							break;
						}
						if(status.checkStatus == "failed"){
							statustmp.status = '广告主审核失败';
							statustmp.msg = status.msg || '未知原因';
							break;
						}
					}
				}
				if(!statustmp.status){
					if(tmp.total.status == 'NO_READY'){
						statustmp.status = '未创建完成';
						statustmp.msg = '未创建完成';
					}
					if(tmp.total.status == 'OFF'){
						statustmp.status = '关闭';
						statustmp.msg = '广告组关闭';
					}
				}
				if(!statustmp.status){
					let datenow = this.$api.dateFormat(new Date());
					if(tmp.total.beginDate.length > 0 && datenow < tmp.total.beginDate){
						statustmp.status = '投放未开始';
						statustmp.msg = '当前：'+datenow+ ' 开启时间为：' + tmp.total.beginDate;
					}
					if((!statustmp.status) && tmp.total.endDate.length > 0 && datenow > tmp.total.endDate){
						statustmp.status = '投放已结束';
						statustmp.msg = '当前：'+datenow+ ' 结束时间为：' + tmp.total.endDate;
					}
					if((!statustmp.status) && tmp.total.targetingTime.length > 0){
						let now = new Date();
						let hour = now.getHours();
						let ts = '' + now.getDay() + '-' + (hour<10?('0'+hour):hour);
						if(-1 == tmp.total.targetingTime.indexOf(ts)){
							statustmp.status = '投放时段不符';
							statustmp.msg = ' 当前时段为：' + ts;
						}
					}
				}

				if(!statustmp.status){
					let leftBudget = Number(tmp.total.dayBudget) - (this.pageGroupTodaySpend[groupid]||0);
					if(0 < leftBudget && leftBudget < 10.00){
						statustmp.status = '日预算不足';
						statustmp.msg = '预警，预算不足：' + leftBudget.toFixed(1);
					}else if (leftBudget <= 0){
						statustmp.status = '日预算超出';
						statustmp.msg = '预算剩余：' + leftBudget.toFixed(1);
					}
				}

				if((!statustmp.status)&&tmp.total.campaign && tmp.total.campaign.status == 'OFF'){
					statustmp.status = '广告活动关闭';
					statustmp.msg = '广告活动关闭';
				}
				if(!statustmp.status){
					let datenow = this.$api.dateFormat(new Date());
					if(tmp.total.campaign.beginDate.length > 0 && datenow < tmp.total.campaign.beginDate){
						statustmp.status = '活动投放未开始';
						statustmp.msg = '当前：'+datenow+ ' 开启时间为：' + tmp.total.campaign.beginDate;
					}
					if((!statustmp.status) && tmp.total.campaign.endDate.length > 0 && datenow > tmp.total.campaign.endDate){
						statustmp.status = '活动投放已结束';
						statustmp.msg = '当前：'+datenow+ ' 结束时间为：' + tmp.total.campaign.endDate;
					}
				}

				if(!statustmp.status && this.campaignSpend[''+tmp.total.campaign.id]){
					let leftBudget = tmp.total.campaign.dayBudget - (this.campaignSpend[''+tmp.total.campaign.id]||0);
					if(0 < leftBudget && leftBudget < 10){
						statustmp.status = '活动日预算不足';
						statustmp.msg = '活动日预算剩余：'+ leftBudget.toFixed(2);
					}else if(0 >= leftBudget){
						statustmp.status = '超出活动日预算';
						statustmp.msg = '活动日预算剩余：'+ leftBudget.toFixed(2);
					}
				}

				if(!statustmp.status){
					statustmp.status = '正常';
					statustmp.msg = '可进行投放';
				}

				tmp.tfStatus = statustmp;
				this.tableListData[this.pageGroupStats[''+groupid]] = tmp;
			},

			handleSelectionChange(val){
				this.multipleSelection = val;
			},

			updateScheduleType(t){
                this.timeChangeCtr.periodTime = t;
            },

			updateScheduleInfo(i){
                this.timeChangeCtr.times = i || [];
            },

			handleBatch(val){
				if('ON' == val || 'OFF' == val){
					//filter NO_READY
					let upsource = this.multipleSelection.filter((item)=>{
						if(val == item.total.status){
							return false;
						}
						if('NO_READY' == item.total.status){
							return false;
						}
						return true;
					});

					let update = upsource.map((item)=>{
						let detail = item.total;
						let history = JSON.parse(JSON.stringify(detail));
						detail.historyList = [history];
						detail.status = val;
						return detail;
					});

					let _this = this;
					this.$api.put(this.allurlsList.batchGroup, update, function(r) {
						(r||[]).map((item)=>{
							if ((_this.pageGroupStats[''+item.id]|| 0 == _this.pageGroupStats[''+item.id]) && _this.tableListData[_this.pageGroupStats[''+item.id]]){
								let tmp = _this.tableListData[_this.pageGroupStats[''+item.id]];
								tmp.tfSwitch = 'ON' == item.status ? true : false;
								tmp.total.status = status;
								_this.tableListData[_this.pageGroupStats[''+item.id]] = tmp;
								_this.calcGroupStatus(item.id);
							}
						});
					});
				}
				if('PRICE' == val) {
					this.priceChangeCtr.display = true;
					this.priceChangeCtr.value = 0;
				}
				if('BUDGET' == val) {
					this.budgetChangeCtr.display = true;
					this.budgetChangeCtr.value = 0;
				}
				if('TIME' == val) {
					this.timeChangeCtr.display = true;
					this.timeChangeCtr.date = '';
					this.timeChangeCtr.times = [];
				}
			},

			handleBatchExt(ty){
				this.priceChangeCtr.display = false;
				this.budgetChangeCtr.display = false;
				this.timeChangeCtr.display = false;

				let update = null;
				if('PRICE' == ty && 0 < Number(this.priceChangeCtr.value)){
					console.log('this.priceChangeCtr',this.priceChangeCtr);
					update = this.multipleSelection.map((item)=>{
						let detail = item.total;
						let history = JSON.parse(JSON.stringify(detail));
						detail.historyList = [history];
						detail.bidType = this.priceChangeCtr.type;
						detail.bidPrice = Number(this.priceChangeCtr.value);
						return detail;
					});
				}
				if('BUDGET' == ty && 0 < Number(this.budgetChangeCtr.value)){
					console.log('this.budgetChangeCtr',this.budgetChangeCtr);
					update = this.multipleSelection.map((item)=>{
						let detail = item.total;
						let history = JSON.parse(JSON.stringify(detail));
						detail.historyList = [history];
						detail.dayBudget = Number(this.budgetChangeCtr.value)
						return detail;
					});
				}
				if('TIME' == ty){
					this.timeChangeCtr.times = this.timeChangeCtr.times.map((item)=>{
						return item.slice(0,1) + '-' + item.slice(1);
					});
					if(this.timeChangeCtr.times.length > 0 || this.timeChangeCtr.date.length > 0){
						update = this.multipleSelection.map((item)=>{
							let detail = item.total;
							let history = JSON.parse(JSON.stringify(detail));
							detail.historyList = [history];
							if(this.timeChangeCtr.date.length > 0){
								detail.beginDate = this.timeChangeCtr.date[0];
								detail.endDate = this.timeChangeCtr.date[1];
							}
							if(this.timeChangeCtr.times.length > 0){
								detail.targetingTime = this.timeChangeCtr.times;
							}
							return detail;
						});
					}
					console.log('this.timeChangeCtr',this.timeChangeCtr);
					this.$api.put(this.allurlsList.batchGroup, update, function(r) {
						(r||[]).map((item)=>{
							if ((_this.pageGroupStats[''+item.id]|| 0 == _this.pageGroupStats[''+item.id]) && _this.tableListData[_this.pageGroupStats[''+item.id]]){
								let tmp = _this.tableListData[_this.pageGroupStats[''+item.id]];
								tmp.beginDate = item.beginDate;
								tmp.endDate = item.endDate;
								tmp.targetingTime = item.targetingTime;
								_this.tableListData[_this.pageGroupStats[''+item.id]] = tmp;
								_this.calcGroupStatus(item.id);
							}
						});
					});
				}
				console.log('batch update.', update);
				if(update){
					let _this = this;
					this.$api.put(this.allurlsList.batchGroup, update, function(r) {
						(r||[]).map((item)=>{
							if ((_this.pageGroupStats[''+item.id]|| 0 == _this.pageGroupStats[''+item.id]) && _this.tableListData[_this.pageGroupStats[''+item.id]]){
								let tmp = _this.tableListData[_this.pageGroupStats[''+item.id]];
								tmp.daybudget = item.dayBudget;
								tmp.price = item.bidType + ' : ' + item.bidPrice;
								_this.tableListData[_this.pageGroupStats[''+item.id]] = tmp;
								_this.calcGroupStatus(item.id);
							}
						});
					});
				}
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
				let _this = this;
				this.$api.put(this.allurlsList.adGroupsStatus + params, '', function(r) {
					console.log(r);
					let tmp = _this.tableListData[_this.pageGroupStats[''+id]];
					tmp.total.status = status;
					_this.tableListData[_this.pageGroupStats[''+id]] = tmp;
					_this.calcGroupStatus(id);
				});
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
				// if(this.dialogObj.dmpTargeting.content.ageRange == undefined || this.dialogObj.dmpTargeting.content.ageRange.length == 0) {
				// 	this.dialogObj.dmpTargeting.content.ageRange = '不限';
				// } else {
				// 	this.dialogObj.dmpTargeting.content.ageRange = this.dialogObj.dmpTargeting.content.ageRange[0] + '-' + this.dialogObj.dmpTargeting.content.ageRange[1];
				// }
				if(this.dialogObj.targetingTime.length > 0){
					this.dialogObj.times = this.dialogObj.targetingTime.join(',')
				}else{
					this.dialogObj.times = '全时段';
				}
				// this.dialogObj.dmpTargeting.content.loc = this.getTreeDataLabel(JSON.parse(this.dialogObj.dmpTargeting.content.locLabel));
				// this.dialogObj.dmpTargeting.content.interest = this.getTreeDataLabel(JSON.parse(this.dialogObj.dmpTargeting.content.interestLabel));
				// this.dialogObj.dmpTargeting.content.life_status = this.getTreeDataLabel(JSON.parse(this.dialogObj.dmpTargeting.content.lifeStatusLabel));
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
					v.tableListData.splice(index,1);
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
			dayBudgetAction(val,dayBudget) {
				var params = {
					dayBudget: dayBudget,
					id: val.id
				}
				var v = this;
				v.$api.put(v.allurlsList.creatADGroupUrl, params, function(r) {
					v.$message({
						message: '修改日预算成功',
						type: 'success'
					});
					let tmp = _this.tableListData[_this.pageGroupStats[''+val.id]];
					tmp.total.dayBudget = dayBudget;
					_this.tableListData[_this.pageGroupStats[''+val.id]] = tmp;
					_this.calcGroupStatus(val.id);
				})
			},
			priceChangeOneAction(val,price){
				var params = {
					bidPrice: price,
					id: val.id
				}
				var v = this;
				v.$api.put(v.allurlsList.creatADGroupUrl, params, function(r) {
					v.$message({
						message: '修改出价成功',
						type: 'success'
					});
				});
			}
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
			// 'dialogObj.dmpTargeting.content.gender': function(val) {
			// 	if (val == undefined) {
			// 		return ;
			// 	}
			// 	if(val.length == 1) {
			// 		if(val[0] == '401') {
			// 			val[0] = '男';
			// 		} else {
			// 			val[0] = '女';
			// 		}
			// 	} else if(val.length == 2) {
			// 		for(var i = 0; i < val.length; i++) {
			// 			if(val[i] == '401') {
			// 				val[i] = '男'
			// 			} else {
			// 				val[i] = '女';
			// 			}
			// 		}
			// 	}
			// },
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.adGroup {
		// position: absolute;
		height: 100%;
	}
	.el-row {
	    margin-bottom: 10px;
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
