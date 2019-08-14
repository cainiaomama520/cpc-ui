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
					<el-form>
						<el-form-item label="媒体类型:">
							<el-select v-model="mediaType" filterable placeholder="请选择媒体类型" style="width:200px">
								<el-option v-for="(item,index) in mediaTypeList" :key="item.id" :label="item.name" :value="item.id">
								</el-option>
							</el-select>
						</el-form-item>
					</el-form>
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
				<el-table :data="tableListData" style="width: 100%">
					<template v-for="(col ,ro) in tableHeaderName">
						<el-table-column v-if='col.value' :fixed="ro == 0 ? 'left':false" :label=col.name width="140" :prop='col.label' sortable>
							<template slot-scope="scope">
								<div v-if="col.label == 'advCam'">
									<router-link :to="{ path: '/campaign/adGroup', query:{campaignsId:scope.row.total.id}}">{{ scope.row.advCam }}</router-link>
								</div>
								<div v-else-if="col.label == 'advZ'">
									<router-link :to="{ path: '/advpro/advDetail', query:{id:scope.row.total.id}}">{{ scope.row.advZ }}</router-link>
								</div>
								<div v-else-if="col.label == 'product'">
									<router-link :to="{ path: '/advpro/proDetail', query:{id:scope.row.total.id}}">{{ scope.row.product }}</router-link>
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
									<span>{{ scope.row[col.label] }}</span>
								</div>
							</template>
						</el-table-column>
					</template>
					<el-table-column fixed="right" label="操作" width="200">
						<template slot-scope="scope">
							<el-button @click="lookDetailAction(scope.row)" type="text" size="small">查看</el-button>
							<el-button @click='editAction(scope.row)' type="text" size="small">编辑</el-button>
							<el-button @click='copyAction(scope.row)' type="text" size="small">复制</el-button>
							<el-button @click='deletAction(scope.row)' type="text" size="small">删除</el-button>
							<!-- <el-button @click='creatNewAction(scope.row)' type="text" size="small">新建</el-button> -->
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
	import Communication from '../../../util/communicate.js';
	export default {
		data() {
			return {
				activeName: 'campaign',
				dialogVisible: false,
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
						name: '点击情况',
						label: 'cliCondition',
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
				advertiseId: '',
				productId: '',
				campaignsId: '',
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
			this.getGTAdvertiserList().then(function(result) {
				v.advertiseList = result;
			});
			this.getGTProductList().then(function(result) {
				v.productsList = result;
			});
			this.getGTCampaignsList().then(function(result) {
				v.campaignsList = result;
			});
			this.getTableListWithParams();
		},
		watch: {
			mediaType: function(val) {
				var v = this;
				this.getGTCampaignsList().then(function(result) {
					v.campaignsId = '';
					v.campaignsList = result;
				});
			},
		},
		methods: {
			tableClickAction(){
				if ('group' == this.activeName){
					this.$router.push({
			            name: 'adGroupOp'
			        })
				}

				if('creative' == this.activeName){
					this.$router.push({
			            name: 'adCreativityOp'
			        })
				}
			},
			getTableListWithParams() {
				var v = this;
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
					'rules[3].data': v.mediaType,
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
							dic.consumeStatuse = ('总余:'+r.content[i].totalBudget||0) + '\n' + ('日余:'+((r.content[i].dayBudget||0)-(r.content[i].reportDTO.costNum||0)).toFixed(2));
							dic.activePrice = r.content[i] && r.content[i].activePrice || 0.00;
							dic.consume = r.content[i] && r.content[i].reportDTO && r.content[i].reportDTO.consume || 0.00;
							dic.totalCvs = r.content[i] && r.content[i].reportDTO && r.content[i].reportDTO.totalCvs || 0;
							dic.costNum = r.content[i] && r.content[i].reportDTO && r.content[i].reportDTO.costNum || 0.0;
							dic.cvsCost = (dic.costNum / (dic.totalCvs || 1)).toFixed(2);
							dic.profit = r.content[i] && r.content[i].reportDTO && r.content[i].reportDTO.profit || 0.0;
							dic.profitRate = r.content[i] && r.content[i].reportDTO && r.content[i].reportDTO.profitRate || 0.0;
							dic.cliCondition = '点击数：' + (r.content[i] && r.content[i].reportDTO && r.content[i].reportDTO.clkValidCount || 0) + '\n' +
								'点击率：' + (r.content[i] && r.content[i].reportDTO && r.content[i].reportDTO.ctr || 0.00) + '\n' +
								'点击成本：' + ((dic.costNum / (r.content[i] && r.content[i].reportDTO && r.content[i].reportDTO.clkValidCount || 1)).toFixed(2));
							dic.tfDate = (r.content[i] && r.content[i].beginDate || '不限') + '\n' +
								'至 ' + (r.content[i] && r.content[i].endDate || '不限');
							dic.totalBudget = r.content[i].totalBudget;
							dic.dayBudget = r.content[i].dayBudget;
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
				v.$api.delete(v.allurlsList.creatCampaigns + '/' + obj.id, '', function(r) {
					let index = v.tableListData.indexOf(val)
					v.tableListData.splice(index,1);
				})
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

				Communication.$emit('crossmsg', {
					advertiserId: this.advertiseId,
					productId: this.productId,
					campaignId: this.campaignsId,
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
