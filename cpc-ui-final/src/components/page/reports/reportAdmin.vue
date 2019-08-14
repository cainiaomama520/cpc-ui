<template>
	<div class="report">
		<!--<el-card class="box-card">-->
			<div class="reportAdminDiv">
				<el-card>
                	<div id="reportCharts" :style="{height:height,width:width}"></div>
    			</el-card>
           	</div>
           	<el-collapse v-model="activeItem">
			  <el-collapse-item name="1">
			  	<div class="searchDiv">
				<el-form ref="form" :model="form" label-width="90px">
					<el-col >
						<el-col :span="8">
							<el-form-item label="日期：">
								<el-date-picker v-model="form.dateCheck" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd">
	    						</el-date-picker>
	    					</el-form-item>
    					</el-col>
    					<el-col :span="8">
	    					<el-form-item label="广告主：">
								<el-select v-model="form.adverId" clearable filterable multiple  placeholder="请选择">
									<el-option v-for="item in adverArry" :key="item.id" :label="item.name" :value="item.id"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="产品：">
								<el-select v-model="form.productId" clearable filterable multiple placeholder="请选择">
									<el-option v-for="item in proArry" :key="item.id" :label="item.name" :value="item.id"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-col>
					<el-col>
						<el-col :span="8">
	    					<el-form-item label="广告活动：">
								<el-select v-model="form.campaignId" clearable filterable multiple placeholder="请选择">
									<el-option v-for="item in campaignArry" :key="item.id" :label="item.name" :value="item.id"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="广告组：">
								<el-select v-model="form.adgroupId" clearable filterable multiple placeholder="请选择">
									<el-option v-for="item in adgroupArry" :key="item.id" :label="item.name" :value="item.id"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="广告创意：">
								<el-select v-model="form.creativeId" clearable filterable multiple placeholder="请选择">
									<el-option v-for="item in creativeArry" :key="item.id" :label="item.name" :value="item.id"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-col>
					<el-col>
						<el-col :span="8">
	    					<el-form-item label="媒体：">
								<el-select v-model="form.mediaId" clearable filterable multiple placeholder="请选择">
									<el-option v-for="item in mediaArry" :key="item.id" :label="item.name" :value="item.id"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="广告位：">
								<el-select v-model="form.adPos" clearable  filterable multiple  placeholder="请选择">
									<el-option v-for="item in adpositionArry" :key="item.id" :label="item.name" :value="item.id"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="监测链接：">
								<el-select v-model="form.advClkLinkTag" clearable  filterable multiple placeholder="请选择">
									<el-option v-for="item in tracklinkArry" :key="item.id" :label="item.name" :value="item.id"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-col>
					<el-col>
						<el-col :span="24">
							<el-form-item label="时间维度：">
								<el-radio-group v-model="form.dateSearchType">
								    <el-radio label='hour'>小时</el-radio>
								    <el-radio label='day'>天</el-radio>
								    <el-radio label='month'>月</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-col>
						<el-col :span="24">
							<el-form-item label="聚合维度：">
								<el-checkbox-group
									v-model="aggregateSearchType"
									:min="1">
									<el-checkbox v-for="(op, index) in Object.keys(aggregateOptions)" :label="op" :key="op">{{aggregateOptions[op]}}</el-checkbox>
								</el-checkbox-group>
							</el-form-item>
						</el-col>
					</el-col>
				</el-form>
				<el-button type="primary" icon="el-icon-search"  @click="onsubmitSearch()" style="margin-left:50px">搜索</el-button>
				<el-button type="primary" icon="el-icon-download" style="margin-left:50px" @click="downloadReport()">下载报表</el-button>
			</div>
			  </el-collapse-item>
			</el-collapse>

			<div class="reportAdminDiv">
				<el-row>
					<el-form>
						<el-form-item label="数据项：">
								<el-checkbox v-for="(col,index) in tableHeaderName" :key="index" v-if="8<index" v-model="col.value" :label='col.name'></el-checkbox>
						</el-form-item>
					</el-form>
				</el-row>
				<el-table :data="tableData" :summary-method='getSummaries' show-summary stripe style="width: 100%" height='500' v-loading="reqloading">
					<template v-for="(col ,index) in tableHeaderName" >
						<el-table-column :fixed="0==index?'left':false" v-if="col.value && col.name != '点击情况' && col.name != '广告主' && col.name != '产品' && col.name != '广告活动' && col.name != '广告组' && col.name != '广告主监测链接' && col.name != '创意/链接'" :label=col.name  :prop=col.bind :sortable=col.sort width="120">
							<template slot-scope="scope">
								<span v-if="scope.row[col.bind]===''">--</span>
								<span v-else-if="scope.row[col.bind]===0">0</span>
								<span v-else>{{scope.row[col.bind]}}</span>
							</template>
						</el-table-column>
						<el-table-column v-if="col.value && col.name == '广告主'" label='广告主'  width="120">
							<template slot-scope="scope">
								<div>
									<router-link :to="{ path: '/advpro/advDetail', query:{id:scope.row.adverId}}">{{ scope.row.adverId }}-{{ scope.row.advertiserName }}</router-link>
								</div>
							</template>
						</el-table-column>
						<el-table-column v-if="col.value && col.name == '产品'" label='产品'  width="120">
							<template slot-scope="scope">
								<div>
									<router-link :to="{ path: '/advpro/proDetail', query:{id:scope.row.productId}}">{{ scope.row.productId }}-{{ scope.row.productName }}</router-link>
								</div>
							</template>
						</el-table-column>
						<el-table-column v-if="col.value && col.name == '广告活动'" label='广告活动'  width="120">
							<template slot-scope="scope">
								<div v-if="scope.row['adPosName'] != ''">
									<router-link :to="{ path: '/campaignop/adCampaignOp', query:{campaignsId:scope.row.campaignId}}">{{ scope.row.campaignId }}-{{ scope.row.campaignName }}</router-link>
								</div>
								<div v-else>
									<router-link :to="{ path: '/campaignop/adCampaignOpMb', query:{campaignsId:scope.row.campaignId}}">{{ scope.row.campaignId }}-{{ scope.row.campaignName }}</router-link>
								</div>
							</template>
						</el-table-column>
						<el-table-column v-if="col.value && col.name == '广告组'" label='广告组'  width="120">
							<template slot-scope="scope">
								<div v-if="scope.row['adPosName'] != ''">
									<router-link :to="{ path: '/campaignop/adGroupOp', query:{adGroupId:scope.row.adgroupId}}">{{ scope.row.adgroupId }}-{{ scope.row.adGroupName }}</router-link>
								</div>
								<div v-else>
									<router-link :to="{ path: '/campaignop/adGroupOpMb', query:{adGroupId:scope.row.adgroupId}}">{{ scope.row.adgroupId }}-{{ scope.row.adGroupName }}</router-link>
								</div>
							</template>
						</el-table-column>
						<el-table-column v-if="col.value && col.name == '广告主监测链接'" label='广告主监测链接'  width="120">
							<template slot-scope="scope">
								<div>
									<router-link :to="{ path: '/assist/linkForm', query:{id:scope.row.advLinkTagId}}">{{ scope.row.advLinkTagId }}-{{ scope.row.advLinkTagName }}</router-link>
								</div>
							</template>
						</el-table-column>
						<el-table-column v-if="col.value && col.name == '创意/链接'"  label='创意/链接' width="120">
							<template slot-scope="scope">
							    {{ scope.row.creativeId }}-{{ scope.row.creativeName }}
							</template>
						</el-table-column>
						<el-table-column v-if="col.value && col.name == '点击情况'"  label='点击情况' width="120">
							<template slot-scope="scope">
							    <p>点击数：{{scope.row.clkValidCount}}</p>
							    <p>点击率：{{scope.row.ctr}}</p>
							    <p>点击成本：{{scope.row.clkCost}}</p>
							</template>
						</el-table-column>
					</template>
				</el-table>
				<div class="block">
					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageCtr.pageCurrent" :page-sizes="[10, 50, 100, 400]" :page-size="pageCtr.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageCtr.pageTatol">
					</el-pagination>
				</div>
			</div>
		<!--</el-card>-->
	</div>
</template>
<script>
import echarts from 'echarts'
import {mapState, mapActions}from 'vuex';
	export default {
		data() {
			return {
				activeItem: "1",
				reqloading: false,
		 		aggregateOptions: {'advertiser':'广告主', 'product':'产品', 'campaign':'广告活动', 'group':'广告组', 'creative':'广告创意', 'media':'媒体', 'adpos':'广告位', 'advlink':'广告主监测链接'},
		 		aggregateSearchType: ['advertiser', 'product', 'campaign', 'group', 'creative', 'media', 'adpos', 'advlink'],
				pageCtr: {
					pageSize: 10,
					pageTatol: 0,
					pageCurrent: 1
				},
				form: {
					dateCheck : [this.dateFormat(new Date()),this.dateFormat(new Date())],//日期格式转化
					adverId : [],
					productId : [],
					campaignId:[],
					adgroupId:[],
					creativeId:[],
					mediaId:[],
					adPos:[],
					advClkLinkTag:[],
					dateSearchType:'day'
				},
				adverArry: [],
		        proArry:[],
		        campaignArry:[],
		        adgroupArry:[],
		        creativeArry:[],
		        mediaArry:[],
		        adpositionArry:[],
		        tracklinkArry:[],
				reportCharts:null,
				xDate:[],//x轴时间数组
				request:[],//请求数组
				bidden:[],//出价数组
				exposure:[],//曝光数组
				clickArry:[],//点击数组
				active:[],//激活数组
				tableData: [],
				chartData: [],//存放charts所有数据
				tableHeaderName: [
			        {name: '时间', value: true, bind:'time',sort:false},
			        {name: '广告主', value: false, bind:'advertiserName',sort:false},
			        {name: '产品', value: false, bind:'productName',sort:false},
			        {name: '广告活动', value: false, bind:'campaignName',sort:false},
			        {name: '广告组', value: false, bind:'adGroupName',sort:false},
			        {name: '媒体', value: false,bind:'mediaName',sort:false},
			        {name: '创意/链接', value: false, bind:'creativeName',sort:false},
			        {name: '广告位', value: false, bind:'adPosName',sort:false},
			        {name: '监测链接', value: false, bind:'advLinkTagName',sort:false},
			        {name: '计费方式', value: true, bind:'chargeMode',sort:false},
			        {name: '激活单价（元）', value: true, bind:'activePrice',sort:true},
			        {name: '请求出价数', value: true, bind:'reqCount',sort:true},
			        {name: '出价数', value: false, bind:'respCount',sort:true},
			        {name: '曝光数', value: true, bind:'impValidCount',sort:true},
			        {name: '点击情况', value: true,sort:false},
			        {name: '激活数', value: true, bind:'totalCvs',sort:true},
			        {name: '消耗（元）', value: true, bind:'consume',sort:true},
			        {name: '花费', value: true, bind:'costNum',sort:true},
			        {name: '利润', value: true, bind:'profit',sort:true},
			        {name: '利润率', value: true, bind:'profitRate',sort:false}
			    ],
			    reqSum:'',
			    respSum:'',
			    impValidSum:'',
			    cvsSum:'',//激活数总计
			    conSum:'',//消耗总计
			    costSum:'',//花费总计
			    profitSum:'',//利润总计
			    clickSum:'',//点击总计
			    ctrSum:''//点击率总计
			}
		},
		props: {
		    width: {
		      type: String,
		      default: '100%'
		    },
		    height: {
		      type: String,
		      default: '350px'
		    },
		    autoResize: {
		      type: Boolean,
		      default: true
		    }
		},
		methods: {
			...mapActions([
				'getAdverList',
				'getProductList',
				'getCampaignList',
				'getAdgroupList',
				'getCreativeList',
				'getMediaList',
				'getAdpositionList',
				'tracklinkList',
				'getReportAdminList',
				'exportReportAdminList'
			]),
			//请求搜索框广告主列表
			async getAdvData(options){
	      		let advlist = await this.getAdverList(options);
	      		if (advlist && advlist.length>0){
					this.adverArry = advlist||[];
	      		}else{
	                this.adverArry = [];
	           }
	      		console.log
			},
				//请求搜索框产品列表
			async getProData(options){
	      		let prolist = await this.getProductList(options);
	      		if (prolist && prolist.length>0){
					this.proArry = prolist||[];
	      		}else{
	                this.proArry = [];
	           }
			},
			//请求搜索框广告活动列表
			async getCampaignData(options){
	      		let campaignlist = await this.getCampaignList(options);
	      		if (campaignlist && campaignlist.length>0){
					this.campaignArry = campaignlist||[];
	      		}else{
	                this.campaignArry = [];
	           }
			},
			//请求搜索框广告组列表
			async getAdgroupData(options){
	      		let adgrouplist = await this.getAdgroupList(options);
	      		if (adgrouplist && adgrouplist.length>0){
					this.adgroupArry = adgrouplist||[];
	      		}else{
	                this.adgroupArry = [];
	           }
			},
			//请求搜索框广告创意列表
			async getCreativeData(options){
	      		let creativelist = await this.getCreativeList(options);
	      		if (creativelist && creativelist.length>0){
					this.creativeArry = creativelist||[];
	      		}else{
	                this.creativeArry = [];
	           }
			},
			//请求搜索框媒体列表
			async getMediaData(options){
	      		let mediaList = await this.getMediaList(options);
	      		if (mediaList && mediaList.length>0){
					this.mediaArry = mediaList||[];
	      		}else{
	                this.mediaArry = [];
	           }
			},
			//请求搜索框广告位列表
			async getAdpositionData(options){
	      		let adpositionList = await this.getAdpositionList(options);
	      		if (adpositionList && adpositionList.length>0){
					this.adpositionArry = adpositionList||[];
	      		}else{
	                this.adpositionArry = [];
	           }
			},
			//请求搜索框链接标识列表
			async getTracklinkData(options){
	      		let tracklinklist = await this.tracklinkList(options);
	      		if (tracklinklist &&tracklinklist.content && tracklinklist.content.length>0){
	      			this.tracklinkArry = tracklinklist.content||[];
	      		}else{
	                this.tracklinkArry = [];
	           }
			},
			async onsubmitSearch(){
				this.activeItem = "2";				
				let flag=false;
	            await this.getAdminReportData(flag);
	        },
	        async getAdminReportData(flag){
	        	this.reqloading = true;
				let cdn = {
					'filterSearch':[
						{
							'name':'adverId',
							'value':this.form.adverId.map(String)
						},
						{
							'name':'productId',
							'value':this.form.productId.map(String)
						},
						{
							'name':'campaignId',
							'value':this.form.campaignId.map(String)
						},
						{
							'name':'adgroupId',
							'value':this.form.adgroupId.map(String)
						},
						{
							'name':'creativeId',
							'value':this.form.creativeId.map(String)
						},
						{
							'name':'mediaId',
							'value':this.form.mediaId.map(String)
						},
						{
							'name':'adPos',
							'value':this.form.adPos.map(String)
						},
						{
							'name':'advLinkTagId',
							'value':this.form.advClkLinkTag.map(String)
						}
					],
					// 'groupSearch':groupSearchData,
					'timeSearch':{
						'beginTime':this.form.dateCheck[0],
						'endTime':this.form.dateCheck[1],
						'timeUnit':this.form.dateSearchType
					},
					'page': this.pageCtr.pageCurrent - 1,
  					'limit': this.pageCtr.pageSize,
  					'order':'asc',
  					'sidx':'dateTime'
				};
				console.log(cdn)

				cdn.groupSearch = [];
				for (let i = 1; i <= 8; i++) {
					this.tableHeaderName[i].value = false;
				}
				for (let i = 0; i < (this.aggregateSearchType||[]).length; i++){
					switch (this.aggregateSearchType[i]){
						case 'advertiser':
							this.tableHeaderName[1].value = true;
							cdn.groupSearch.push('adverId');
							break;
						case 'product':
							this.tableHeaderName[2].value = true;
							cdn.groupSearch.push('productId');
							break;
						case 'campaign':
							this.tableHeaderName[3].value = true;
							cdn.groupSearch.push('campaignId');
							break;
						case 'group':
							this.tableHeaderName[4].value = true;
							cdn.groupSearch.push('adgroupId');
							break;
						case 'creative':
							this.tableHeaderName[6].value = true;
							cdn.groupSearch.push('creativeId');
							break;
						case 'media':
							this.tableHeaderName[5].value = true;
							cdn.groupSearch.push('mediaId');
							break;
						case 'adpos':
							this.tableHeaderName[7].value = true;
							cdn.groupSearch.push('adPos');
							break;
						case 'advlink':
							this.tableHeaderName[8].value = true;
							cdn.groupSearch.push('advLinkTagId');
							break;
					}
				}
	      		//表格搜索请求函数
	      		let adminlist = await this.getReportAdminList(cdn);
	      		if (adminlist&&adminlist.list&&adminlist.list.length>0){
					this.pageCtr.pageTatol =  adminlist.totalCount||0;
					this.tableData = adminlist.list||[];
					console.log(this.tableData)
					this.reqSum = adminlist.total.reqCount||0;
					this.respSum = adminlist.total.respCount||0;
					this.impValidSum = adminlist.total.impValidCount||0;
					this.cvsSum = adminlist.total.totalCvs ||0;
					this.conSum = adminlist.total.consume ||0;
					this.costSum = adminlist.total.costNum ||0;
					this.profitSum = adminlist.total.profit ||0;
					this.clickSum = adminlist.total.clkValidCount ||0;
					this.ctrSum = adminlist.total.ctr ||0;
	      		}else{
	                this.pageCtr.pageTatol = 0;
	                this.tableData = [];
	            };
				//echarts表搜索条件
				if(!flag){
					this.chartData = [];
	                this.xDate = [];
					this.request = [];
					this.bidden = [];
					this.exposure = [];
					this.clickArry = [];
					this.active = [];
					let chartOption = JSON.parse(JSON.stringify(cdn));//这样改变chartOption的属性值不会影响options的属性值
					
					chartOption.groupSearch = [];
					chartOption.limit=10000;
					chartOption.page=0;
					if(this.DatePoor(this.form.dateCheck[1],this.form.dateCheck[0])){
						chartOption.timeSearch.timeUnit='day';
					}else{
						chartOption.timeSearch.timeUnit='hour';
					}
					
		      		let adminChart = await this.getReportAdminList(chartOption);
		      		if (adminChart && adminChart.list && adminChart.list.length > 0){
		      			this.chartData = adminChart.list||[];
		      			for(let i = 0; i <this.chartData.length; i++){
							this.xDate.push(this.chartData[i].time);
							this.request.push(this.chartData[i].reqCount);
							this.bidden.push(this.chartData[i].respCount);
							this.exposure.push(this.chartData[i].impValidCount);
							this.clickArry.push(this.chartData[i].clkValidCount);
							this.active.push(this.chartData[i].totalCvs);
						};
		      		}else{
		                this.xDate = [];
						this.request = [];
						this.bidden = [];
						this.exposure = [];
						this.clickArry = [];
						this.active = [];
						this.chartData = [];
		      		};
		      		this.setEcharsOptions();
		      	}
				this.reqloading = false;
			},
			async handleSizeChange(val) {//改变分页显示条数时触发的函数
				let flag=true;
				this.pageCtr.pageSize = val;
	            await this.getAdminReportData(flag);
	      	},
	      	async handleCurrentChange(val) {//更改页数时触发的函数
				let flag=true;
				this.pageCtr.pageCurrent = val;
	            await this.getAdminReportData(flag);
	      	},
	      	//下载报表
	      	async downloadReport(){
				let cdn = {
					'filterSearch':[
						{
							'name':'adverId',
							'value':this.form.adverId.map(String)
						},
						{
							'name':'productId',
							'value':this.form.productId.map(String)
						},
						{
							'name':'campaignId',
							'value':this.form.campaignId.map(String)
						},
						{
							'name':'adgroupId',
							'value':this.form.adgroupId.map(String)
						},
						{
							'name':'creativeId',
							'value':this.form.creativeId.map(String)
						},
						{
							'name':'mediaId',
							'value':this.form.mediaId.map(String)
						},
						{
							'name':'adPos',
							'value':this.form.adPos.map(String)
						},
						{
							'name':'advLinkTagId',
							'value':this.form.advClkLinkTag.map(String)
						}
					],
//					'groupSearch':groupSearchData,
					'timeSearch':{
						'beginTime':this.form.dateCheck[0],
						'endTime':this.form.dateCheck[1],
						'timeUnit':this.form.dateSearchType
					}
				};

				cdn.groupSearch = [];
				for (let i = 1; i <= 8; i++) {
					this.tableHeaderName[i].value = false;
				}
				for (let i = 0; i < (this.aggregateSearchType||[]).length; i++){
					switch (this.aggregateSearchType[i]){
						case 'advertiser':
							this.tableHeaderName[1].value = true;
							cdn.groupSearch.push('adverId');
							break;
						case 'product':
							this.tableHeaderName[2].value = true;
							cdn.groupSearch.push('productId');
							break;
						case 'campaign':
							this.tableHeaderName[3].value = true;
							cdn.groupSearch.push('campaignId');
							break;
						case 'group':
							this.tableHeaderName[4].value = true;
							cdn.groupSearch.push('adgroupId');
							break;
						case 'creative':
							this.tableHeaderName[6].value = true;
							cdn.groupSearch.push('creativeId');
							break;
						case 'media':
							this.tableHeaderName[5].value = true;
							cdn.groupSearch.push('mediaId');
							break;
						case 'adpos':
							this.tableHeaderName[7].value = true;
							cdn.groupSearch.push('adPos');
							break;
						case 'advlink':
							this.tableHeaderName[8].value = true;
							cdn.groupSearch.push('advLinkTagId');
							break;
					}
				}

				let _this = this;
				this.$api.exportstats('/api/report/exportExcel', cdn , {responseType: 'arraybuffer'},function(r) {
					console.log('rrrr', r.headers);
					_this.downAdminReportData(r);
				});
	      	},
	      	//将文件流转化为excel文件下载
	      	async downAdminReportData(response){
	      		var type = response.headers['content-type'] != undefined ? response.headers['content-type'] : response.headers['content-type'];
		        var filename = "";
		        var disposition = response.headers['Content-Disposition'] != undefined ? response.headers['Content-Disposition'] : response.headers['content-disposition'];
		        if (disposition && disposition.indexOf('attachment') !== -1) {
		          var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
		          var matches = filenameRegex.exec(disposition);
		          if (matches != null && matches[1])
		            filename = matches[1].replace(/['"]/g, '');
		        }
		        var blob = typeof File === 'function' ? new File([response.data], filename, {type: 'type'}) : new Blob([response.data], {type: type});
		        var URL = window.URL || window.webkitURL;
		        var downloadUrl = URL.createObjectURL(blob);
		        var a = document.createElement("a");
		        // safari doesn't support this yet
		        if (typeof a.download === 'undefined') {
		          window.location = downloadUrl;
		        } else {
		          a.href = downloadUrl;
		          a.download = filename;
		          document.body.appendChild(a);
		          a.click();
		        }
	      	},
	      	async setEcharsOptions(){
				this.reportCharts.setOption({
                	title: {
                        text: '汇总趋势'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['请求', '出价', '曝光', '点击', '激活']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: this.xDate,
                        axisLabel: {
							interval:0,
			                rotate:60
						}
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name: '请求',
                            type: 'line',
                            stack: '总量',
                            data: this.request
                        },
                        {
                            name: '出价',
                            type: 'line',
                            stack: '总量',
                            data: this.bidden
                        },
                        {
                            name: '曝光',
                            type: 'line',
                            stack: '总量',
                            data: this.exposure
                        },
                        {
                            name: '点击',
                            type: 'line',
                            stack: '总量',
                            data: this.clickArry
                        },
                        {
                            name: '激活',
                            type: 'line',
                            stack: '总量',
                            data: this.active
                        }
                    ]
                });
	      	},
	      	async drawreportCharts() {
                this.reportCharts = echarts.init(document.getElementById('reportCharts'));
                this.reportCharts.setOption({
                	title: {
                        text: '汇总趋势'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['请求', '出价', '曝光', '点击', '激活']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: this.xDate
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name: '请求',
                            type: 'line',
                            stack: '总量',
                            data: this.request
                        },
                        {
                            name: '出价',
                            type: 'line',
                            stack: '总量',
                            data: this.bidden
                        },
                        {
                            name: '曝光',
                            type: 'line',
                            stack: '总量',
                            data: this.exposure
                        },
                        {
                            name: '点击',
                            type: 'line',
                            stack: '总量',
                            data: this.clickArry
                        },
                        {
                            name: '激活',
                            type: 'line',
                            stack: '总量',
                            data: this.active
                        }
                    ]
                });
           },
            drawReport() {
                this.drawreportCharts();
            },
            //日期格式化函数
            dateFormat:function(time) {
			    var date=new Date(time);
			    var year=date.getFullYear();
			    /* 在日期格式中，月份是从0开始的，因此要加0
			     * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
			     * */
			    var month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
			    var day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
			    var hours=date.getHours()<10 ? "0"+date.getHours() : date.getHours();
			    var minutes=date.getMinutes()<10 ? "0"+date.getMinutes() : date.getMinutes();
			    var seconds=date.getSeconds()<10 ? "0"+date.getSeconds() : date.getSeconds();
			    // 拼接
		    	return year+"-"+month+"-"+day;
			},
			//数组去重
			handle:function(item) {
				for (var i = 0; i < item.length; i++) {
					for (var n = i + 1; n < item.length; n++) {
						if (item[n] == item[i]) {
							item.splice(n, 1);
							n--;
						}
					}
				}
				return item;
			},
			//删除数组中指定值元素
			removeByValue:function(arr, val) {
				for (var i = 0; i < arr.length; i++) {
					if (arr[i] == val) {
						arr.splice(i, 1);
						break;
					}
				}
			},
			//比对日期大小
			DatePoor:function (date1, date2) {
				var d1 = new Date(date1.replace(/-/g, "/"));
				var d2 = new Date(date2.replace(/-/g, "/"));
				if (d1 > d2) {
					return true;
				}
				if (d1 <= d2) {
					return false;
				}
			},
			getSummaries:function(param){
				const {columns,data} = param;
				const sums=[];
				let values=[];
				columns.forEach((columns,index) => {
					if (index === 0) {
			            sums[index] = '总计';
			            return;
			        }
					if(columns.property === 'reqCount'){
						values=this.reqSum
					}else if(columns.property === 'respCount'){
						values=this.respSum
					}else if(columns.property === 'impValidCount'){
						values=this.impValidSum
					}else if(columns.property === 'totalCvs'){
						values=this.cvsSum
					}else if(columns.property === 'consume'){
						values=this.conSum
					}else if(columns.property === 'costNum'){
						values=this.costSum
					}else if(columns.property === 'profit'){
						values=this.profitSum
					}else if(columns.label === '点击情况'){
						values='点击数：'+this.clickSum+'；'+'点击率：'+this.ctrSum
					}
					if(columns.property === 'reqCount' || columns.property === 'respCount' || columns.property === 'impValidCount' || columns.property === 'totalCvs' || columns.property === 'consume' || columns.property === 'costNum'  || columns.property === 'profit'  || columns.label === '点击情况'){
						sums[index] = values;

					}else {
			            sums[index] = '--';
			        }
				});
				return sums;
			}
		},
		mounted: function () {
            this.drawReport();
        },
        updated: function () {
            this.drawReport();
        },
		beforeDestroy() {
		    if (!this.reportCharts) {
		      return
		    }
		    window.removeEventListener('resize', this.__resizeHanlder)
		    this.reportCharts.dispose()
		    this.reportCharts = null
		},
		created(){
			this.getAdvData();
			this.getProData();
			this.getCampaignData();
			this.getAdgroupData();
			this.getCreativeData();
			this.getMediaData();
			this.getAdpositionData();
			this.getTracklinkData();
		}
	}
</script>

<style>
.searchDiv {
  padding-top: 40px;
  padding-left: 50px;
  .el-select .el-input {
	   width: 100px;
	 }
}
.reportAdminDiv {
      padding: 30px;
      padding-top: 20px;
}
.reportAdminDiv .el-row{
	margin: 10px 0px;
}
</style>