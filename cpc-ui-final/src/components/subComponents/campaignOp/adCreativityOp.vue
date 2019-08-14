<template lang="html">
	<div class="adCreativity">
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
								<el-select v-model="advertiseId" filterable placeholder="" style="width:200px">
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
								<el-select v-model="productId" filterable placeholder="" style="width:200px">
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
								<el-select v-model="campaignsId" filterable placeholder="" style="width:200px">
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
								<el-select v-model="adGroupId" filterable placeholder="" style="width:200px">
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
								<el-select v-model="mediaId" filterable placeholder="" style="width:200px">
									<el-option key="" label="全部" value=""></el-option>
									<el-option v-for="(item,index) in mediaList" :key="item.id" :label="item.name" :value="item.id">
									</el-option>
								</el-select>
							</el-form-item>
						</el-form>
					</el-col>
					<el-col :span="7">
						<el-form>
							<el-form-item label="广告位:">
								<el-select v-model="RTBId" filterable placeholder="" style="width:200px">
									<el-option key="" label="全部" value=""></el-option>
									<el-option v-for="(item,index) in RTBList" :key="item.id" :label="item.id+'-'+item.name" :value="item.id">
									</el-option>
								</el-select>
							</el-form-item>
						</el-form>
					</el-col>
				</el-row>
			<el-row>
				<el-col :span="7">
				</el-col>
				<el-col :span="10">
					&emsp;
				</el-col>
				<el-col :span="6">
					<el-button :span="12" type="primary" @click='searchAction' style="height: 40px" round>搜索</el-button>
					<el-button :span="12" type="primary" @click='creatNewAction' style="height: 40px" round>新建</el-button>
				</el-col>
			</el-row>
				<el-row>
					<el-col :span='24'>
						<el-form>
							<el-form-item label="数据项:">
								<el-checkbox v-for="(col,index) in tableHeaderName"  :key="index" @change="handleCheckedCitiesChange(index)" v-model="col.value" :label='col.name'></el-checkbox>
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
						  </el-dropdown-menu>
						</el-dropdown>
					</el-popover>
					<el-date-picker
					  @change="getCreativeStats"
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
					<el-table-column type="expand" fixed="left">
						<template slot-scope="props">
							<el-form label-position="left"  inline class="demo-table-expand" style="width:450px;float:left; margin-top:1px;margin-left:250px">
	      						<el-form-item label="广告主：">
											<router-link :to="{ path: '/advpro/advDetail', query:{id:props.row.advZ.id}}">{{ props.row.advZ.name }}</router-link>
	      						</el-form-item>
	      						<el-form-item label="产品：" >
											<router-link :to="{ path: '/advpro/proDetail', query:{id:props.row.product.id}}">{{ props.row.product.name }}</router-link>
	      						</el-form-item>
	      						<el-form-item label="广告活动：" >
	        						<span>{{ props.row.advCam }}</span>
	      						</el-form-item>
	      						<el-form-item label="广告组：" >
	        						<span>{{ props.row.advGro }}</span>
	      						</el-form-item>
										<el-form-item label="博文链接：" >
											<a :href='props.row.total.weiboUrl' target="_blank">博文链接</a>
	      						</el-form-item>
    						</el-form>
							<div style="width:246px;margin-left: 650px" >
								<div v-if="props.row.imgObj.name == ''">
									<span> -- </span>
								</div>
								<div v-else-if="props.row.imgObj.name == '微博 顶部banner'">
									<div class="bannerImgDiv" >
										<img class="img2" :src='props.row.imgObj.urls[0].url' alt="">
									</div>
								</div>
								<div v-else-if="props.row.imgObj.name == '微博 品牌大card' ||props.row.imgObj.name == '微博 普通博文' || props.row.imgObj.name == '微博 九宫格样式' || props.row.imgObj.name == '微博 品牌视频card'">
									<div class="bigCardImgDiv" >
										<div class="contentDiv">
											<div class="contentHeader">
											</div>
											<div class="midden">
												{{props.row.imgObj.content.text}}
											</div>
											<div v-if="props.row.imgObj.name == '微博 品牌视频card'" class="videoP">
												<video width="100%" height="129px" :src="props.row.imgObj.videoPath" controls :poster="props.row.imgObj.urls[0].url">

												</video>
											</div>
											<div v-else-if="props.row.imgObj.name != '微博 品牌视频card' && props.row.imgObj.name != '微博 九宫格样式' && props.row.imgObj.urls.length > 0">
												<img class="bigCardImg" :src="props.row.imgObj.urls[0].url" alt="">
											</div>
											<div v-if="props.row.imgObj.name == '微博 九宫格样式'">
													<img class="nineImg" v-for='(imgItem,index) in props.row.imgObj.urls' :src="imgItem.url" alt="">
											</div>
											<div v-if="props.row.imgObj.name == '微博 品牌大card' || props.row.imgObj.name == '微博 品牌视频card'" class="cardMessageDiv">
												<div class="carMLeftDiv">
													<div class="carMLeftTop">
														{{props.row.imgObj.content.cardTitle}}
													</div>
													<div class="carMLeftBottom">
														{{props.row.imgObj.content.cardDesc}}
													</div>
												</div>
												<div class="carMRightDiv">
													<a target='_BLANK' :href="props.row.imgObj.content.landingpageUrl"><el-button type="primary" round size="mini" icon="el-icon-download"></el-button></a>
												</div>
											</div>
											<div class="contentFooter"></div>
										</div>
									</div>
								</div>
								<div v-else>
									<span> -- </span>
								</div>
							</div>
						</template>
					</el-table-column>
					<template v-for="(col ,ro) in tableHeaderName">
						<el-table-column
							:prop=col.label
							v-if="col.label == 'shStatus'"
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
							v-if="col.value && col.label != 'shStatus'"
							:label='col.name'
							:fixed="0 == ro ? true:false"
							width="140"
							:prop="ro == 0 ? 'updateDate' : col.label"
							sortable>
							<template slot-scope="scope">
								<div v-if="col.label == 'advZ'">
									<div v-if="scope.row.total.id">
										<router-link :to="{ path: '/advpro/advDetail', query:{id:scope.row.advZ.id}}">{{ scope.row.advZ.id+'-'+scope.row.advZ.name }}</router-link>
									</div>
									<div v-else>
										<p>--</p>
									</div>
								</div>
								<div v-else-if="col.label == 'product'">
									<div v-if="scope.row.total.id">
										<router-link :to="{ path: '/advpro/proDetail', query:{id:scope.row.product.id}}">{{ scope.row.product.id+'-'+scope.row.product.name }}</router-link>
									</div>
									<div v-else>
										<p>--</p>
									</div>
								</div>
								<div v-else-if="col.label == 'tfSwitch'">
									<div v-if="'--' != scope.row.tfSwitch">
										<el-switch style="display: block;height:100%;margin-top:10px" v-model="scope.row.tfSwitch" active-color="#13ce66" inactive-color="#ff4949" active-text="开启" inactive-text="关闭" @change='statusChangeAction(scope.row)'>
										</el-switch>
									</div>
									<div v-else>
										<p>--</p>
									</div>
								</div>
								<div v-else>
									<span>{{ scope.row[col.label] }}</span>
								</div>
							</template>
						</el-table-column>
					</template>
					<el-table-column  fixed="right" label="操作" width="200">
						<template slot-scope="scope">
							<div v-if="scope.row.total.id">
								<el-button v-if="scope.row.total.adverCheckStatus !='' && scope.row.total.mediaType == 'RTB' && scope.row.total.media != 'BILIBILI'" @click="adversongshenAction(scope.row)" type="text" size="small">广告主送审</el-button>
								<el-button v-if="scope.row.total.mediaType == 'RTB' && scope.row.total.media != 'BILIBILI'" @click="songshenAction(scope.row)" type="text" size="small">创意送审</el-button>
								<!-- <el-button @click="lookDetailAction(scope.row)" type="text" size="small">查看</el-button> -->
								<el-button v-if="scope.row.total.mediaType == 'RTB'" @click="editAction(scope.row)" type="text" size="small">编辑</el-button>
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
			<el-dialog title="创意详情" :visible.sync="zhdialogVisible" width="40%">
				<!-- <span>这是一段信息</span> -->
				<el-row>
					<div class="" v-if="dialogObj.impTrackingUrl!=''">
						<el-col :span='2'>
							&emsp;
						</el-col>
						<el-col :span='22'>
							<el-col :span='6'>
								<span class="dialogObjSpan">广告主曝光检测链接:</span><br>
							</el-col>
							<el-col :span='18'>
								<span class="dialogObjSpan">{{dialogObj.impTrackingUrl.url}}</span><br>
							</el-col>
						</el-col>
						<el-col :span='2'>
							&emsp;
						</el-col>
						<el-col :span='22'>
							<el-col :span='6'>
								<span class="dialogObjSpan">链接标识:</span><br>
							</el-col>
							<el-col :span='16'>
								<span style="line-height:40px;word-break: break-all">{{dialogObj.impTrackingUrl.name}}</span><br>
							</el-col>
						</el-col>
					</div>
					<div class="" v-if="dialogObj.clkTrackingUrl!=''">
						<el-col :span='2'>
							&emsp;
						</el-col>
						<el-col :span='22'>
							<el-col :span='6'>
								<span class="dialogObjSpan">广告主点击检测链接:</span><br>
							</el-col>
							<el-col :span='16'>
								<div class="dialogObjSpan" style="word-break: break-all">{{dialogObj.clkTrackingUrl.url}}</div><br>
							</el-col>
						</el-col>
						<el-col :span='2'>
							&emsp;
						</el-col>
						<el-col :span='22'>
							<el-col :span='6'>
								<span class="dialogObjSpan">链接标识:</span><br>
							</el-col>
							<el-col :span='16'>
								<span class="dialogObjSpan">{{dialogObj.clkTrackingUrl.name}}</span><br>
							</el-col>
						</el-col>
					</div>
					<el-col :span='2'>
						&emsp;
					</el-col>
					<el-col :span='22'>
						<el-col :span='24'>
							<span class="dialogObjSpan">分配链接ID:&emsp;{{dialogObj.id}}</span><br>
						</el-col>
						<el-col :span='24'>
							<span class="dialogObjSpan">分配链接名称:&emsp;{{dialogObj.name}}</span><br>
						</el-col>
					</el-col>
					<el-col :span='2'>
						&emsp;
					</el-col>
					<el-col :span='21'>
						<span class="dialogObjSpan" style=" word-break: break-all">曝光:&emsp;{{dialogObj.content.imp || 0}}</span><br>
						<span class="dialogObjSpan" style=" word-break: break-all">点击:&emsp;{{dialogObj.content.clk || 0}}</span><br>
					</el-col>
				</el-row>
				<span slot="footer" class="dialog-footer">
					<!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
					<el-button type="primary" @click="zhdialogVisible = false">返 回</el-button>
				</span>
			</el-dialog>
			<el-dialog title="创意详情" :visible.sync="wbdialogVisible" width="50%">
				<!-- <span>这是一段信息</span> -->
				<el-row>
					<el-col :span='2'>
						&emsp;
					</el-col>
					<el-col :span='20' style="border:1px solid #e4e7ed;border-radius:5px;">
						<el-col :span='14'>
							<el-col :span='24'>
								<span style="line-height:45px;font-size:15px;margin-left:20px">{{dialogObj.rtbResource.name}}</span>
							</el-col>
							<el-col :span='2'>
								&emsp;
							</el-col>
							<el-col :span='22'>
								<el-col :span='6'>
									<span class="dialogObjSpan">监测链接:</span>
								</el-col>
								<el-col :span='18'>
									<span class="dialogObjSpan" style="word-break: break-all">{{dialogObj.trackLink.name}}</span>
								</el-col>
							</el-col>
							<!-- <el-col :span='2'>
								&emsp;
							</el-col>
							<el-col :span='22'>
								<el-col :span='6'>
									<span class="dialogObjSpan">广告主点击链接:</span>
								</el-col>
								<el-col :span='18'>
									<span class="dialogObjSpan" style="word-break: break-all">{{dialogObj.clkTrackingUrl.url}}</span>
								</el-col>
							</el-col> -->
							<el-col :span='2'>
								&emsp;
							</el-col>
							<el-col :span='22'>
								<span class="dialogObjSpan">曝光:&emsp;{{dialogObj.reportDTO.impValidCount || 0}}</span>
							</el-col>
							<el-col :span='2'>
								&emsp;
							</el-col>
							<el-col :span='22'>
								<span class="dialogObjSpan">点击:&emsp;{{dialogObj.reportDTO.clkValidCount || 0}}</span>
							</el-col>
							<el-col :span='2'>
								&emsp;
							</el-col>
							<el-col :span='22'>
								<span class="dialogObjSpan">激活:&emsp;{{dialogObj.reportDTO.totalCvs || 0}}</span>
							</el-col>
							<el-row>
								<el-col :span='2' style="border-top:1px solid #e4e7ed">
									&emsp;
								</el-col>
								<el-col :span='22' style="border-top:1px solid #e4e7ed">
									<span style="color:red;font-size:40px;display:block;float:left">·</span>
									<span style="line-height:50px;display:block">{{dialogObj.status}}</span>
								</el-col>
							</el-row>
						</el-col>
						<el-col :span='10'>
							<img class="exmpleImg" src="/static/img/u3688.png" alt="">
						</el-col>
					</el-col>
				</el-row>
				<span slot="footer" class="dialog-footer">
					<!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
					<el-button type="primary" @click="wbdialogVisible = false">返 回</el-button>
				</span>
			</el-dialog>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				activeName: 'creative',
				tableLoading: false,
				statsDate: [this.$api.dateFormat(new Date()), this.$api.dateFormat(new Date())],
				multipleSelection: [],
				zhdialogVisible: false,
				wbdialogVisible: false,
				activeArray: [],
				isMediaBuy: false,
				nativeCreatives: [],
				dialogObj: {
					trackLink: {
						name:''
					},
					adGroup: {
						name: ''
					},
					rtbResource: {
						name: ''
					},
					advertiser: {
						name: ''
					},
					campaign: {
						name: ''
					},
					reportDTO: {

					},
					clkTrackingUrl: {
						url: '',
						name: ''
					},
					impTrackingUrl: {
						url: '',
						name: ''
					},
					product: {},
					content: {},
					media: ''
				},
				tableHeaderName: [{
						name: '创意/链接名称',
						label: 'crAlName',
						value: true
					},
					{
						name: '广告活动',
						label: 'advCam',
						value: false
					},
					{
						name: '广告组',
						label: 'advGro',
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
						name: '广告位',
						label: 'advW',
						value: true
					},
					{
						name: '投放开关',
						label: 'tfSwitch',
						value: true
					},
					{
						name: '投放状态',
						label: 'shStatus',
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
						value: false
					},
					{
						name: '利润（元）',
						label: 'profit',
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
						value: true
					},
					{
						name: '互动详情',
						label: 'hdDetail',
						value: true
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
				RTBList: [],
				// advertiseId: '',
				// productId: '',
				// campaignsId: '',
				adGroupId: '',
				pageCreativeIds:[],
				pageCreativeStats: {},
				campaignStatusIds: [],
				groupStatusIds: [],
				campaignStats: {},
				groupStats: {},
				statusFilterArray:[{ text: '广告主未审核', value: '广告主未审核' },
					{ text: '广告主审核中', value: '广告主审核中' },
					{ text: '广告主审核失败', value: '广告主审核失败' },
					{ text: '创意未审核', value: '创意未审核' },
					{ text: '创意审核中', value: '创意审核中' },
					{ text: '创意审核失败', value: '创意审核失败' },
					{ text: '关闭', value: '关闭' },
					{ text: '广告组关闭', value: '广告组关闭' },
					{ text: '组投放未开始', value: '组投放未开始' },
					{ text: '组投放已结束', value: '组投放已结束' },
					{ text: '组投放时段不符', value: '组投放时段不符' },
					{ text: '组日预算不足', value: '组日预算不足' },
					{ text: '组日预算超出', value: '组日预算超出' },
					{ text: '活动关闭', value: '活动关闭' },
					{ text: '活动投放未开始', value: '活动投放未开始' },
					{ text: '活动投放已结束', value: '活动投放已结束' },
					{ text: '活动日预算不足', value: '活动日预算不足' },
					{ text: '活动超出日预算', value: '活动超出日预算' },
					{ text: '正常', value: '正常' }],
				mediaId: '',
				RTBId: '',
				totalDic: {}
			}
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
			});
			this.getGTAdGroupList('RTB').then(function(result) {
				v.adGroupList = result;
				if(v.$route.query.id != undefined) {
					v.adGroupId = parseInt(v.$route.query.id);
				}
				v.getTableListWithParams();
			});
			this.getGTMediaList().then(function(result) {
				v.mediaList = result;
			});
			this.getGTRTBList().then(function(result) {
				v.RTBList = result;
			});
		},
		methods: {
			tableClickAction(){
				if ('campaign' == this.activeName){
					this.$router.push({
			            path: '/campaignop/adCampaignOp'
			        })
				}

				if('group' == this.activeName){
					this.$router.push({
			            path: '/campaignop/adGroupOp'
			        })
				}
			},
			currentGroupIsMedaiBuyAction() {
				var v = this;
				if(v.adGroupId == '') {
					v.isMediaBuy = false;
				} else {
					var params = {
						page: v.currentPage - 1,
						size: v.pageSize,
						'rules[0].field': 'id',
						'rules[0].op': 'eq',
						'rules[0].data': v.adGroupId,
						'groupOp': 'AND'
					}
					v.$api.get(v.allurlsList.creatADGroupUrl, params, function(r) {
						let obj = r.content[0];
						if(obj.mediaType == "MEDIA_BUY") {
							v.isMediaBuy = true;
						} else {
							v.isMediaBuy = false;
						}
					})
				}
			},
			getTableListWithParams() {
				var v = this;
				v.currentGroupIsMedaiBuyAction();
				if (v.advertiseId != '' || v.productId != '' || v.campaignsId != '' || v.adGroupId != '' || v.mediaId != '' || v.RTBId != '') {
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
					'rules[3].field': 'adGroup.id',
					'rules[3].op': 'eq',
					'rules[3].data': v.adGroupId == '' ? -1 : parseInt(v.adGroupId),
					'rules[4].field': 'media',
					'rules[4].op': 'eq',
					'rules[4].data': v.mediaId,
					'rules[5].field': 'rtbResource.id',
					'rules[5].op': 'eq',
					'rules[5].data': v.RTBId == '' ? -1 : parseInt(v.RTBId),
					'rules[6].field': 'mediaType',
					'rules[6].op': 'eq',
					'rules[6].data': 'RTB',
					'groupOp': 'AND'
				}
				v.$api.get(v.allurlsList.creatadver, params, function(r) {
					v.tableListData = [];
					v.total = r.totalElements;
					if(r.content != null && r.content.length > 0) {
						v.nativeCreatives = r.content;
						for(var i = 0; i < r.content.length; i++) {
							var dic = {};
							dic.crAlName = r.content[i].id + '-' + r.content[i].name;
							dic.advCam = r.content[i].campaign.id + '-' + r.content[i].campaign.name;
							dic.advGro = r.content[i].adGroup.id + '-' + r.content[i].adGroup.name;
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
							if(r.content[i].rtbResource != null) {
								dic.advW = r.content[i].rtbResource.name;
								dic.hdCondition = '--';//'互动量：' + (r.content[i] && r.content[i].reportDTO && r.content[i].reportDTO.interactionCount || 0) + '\n' +
									// '互动率：' + (r.content[i] && r.content[i].reportDTO && r.content[i].reportDTO.interactionRate || 0.0) + '\n' +
									// '互动率：' + (r.content[i] && r.content[i].reportDTO && r.content[i].reportDTO.interactionCost || 0);
								dic.hdDetail = '--';//'关注：' + (r.content[i] && r.content[i].reportDTO && r.content[i].reportDTO.followCount || 0) + '\n' +
									// '转发：' + (r.content[i] && r.content[i].reportDTO && r.content[i].reportDTO.repostCount || 0) + '\n' +
									// '点赞：' + (r.content[i] && r.content[i].reportDTO && r.content[i].reportDTO.likeCount || 0) + '\n' +
									// '视频播放：' + (r.content[i] && r.content[i].reportDTO && r.content[i].reportDTO.videoClickCount || 0);
								// dic.tfDate = (r.content[i] && r.content[i].beginDate || '不限') + '\n' +
									// '至 ' + (r.content[i] && r.content[i].endDate || '不限');
							} else {
								dic.advW = '--';
								dic.hdCondition = '--';
								dic.hdDetail = '--';
								// dic.tfDate = '--';
								v.tableHeaderName[6].value = false;
								v.tableHeaderName[16].value = false;
								v.tableHeaderName[17].value = false;
								v.tableHeaderName[18].value = false;
								// v.tableHeaderName[7].value = false;
							}
							dic.respCount = '--';
							dic.imp = '--';
							dic.ecpm = '--';
							dic.consume = '--';//r.content[i] && r.content[i].reportDTO && r.content[i].reportDTO.consume || 0.00;
							dic.totalCvs = '--';//r.content[i] && r.content[i].reportDTO && r.content[i].reportDTO.totalCvs || 0;
							dic.cvr = '--';
							dic.costNum = '--';//r.content[i] && r.content[i].reportDTO && r.content[i].reportDTO.costNum || 0.0;
							dic.cvsCost = '--';//(dic.totalCvs / (dic.consume || 1)).toFixed(2);
							dic.profit = '--';//r.content[i] && r.content[i].reportDTO && r.content[i].reportDTO.profit || 0.0;
							dic.impValidCount = '--';//r.content[i] && r.content[i].reportDTO && r.content[i].reportDTO.impValidCount || 0;
							dic.cliCondition = '--';//'点击数：' + (r.content[i] && r.content[i].reportDTO && r.content[i].reportDTO.clkValidCount || 0) + '\n' +

							if(r.content[i].status == 'ON') {
								dic.tfSwitch = true;
							} else if(r.content[i].status == 'OFF') {
								dic.tfSwitch = false;
							}
							dic.shStatus = '--';//status;
							var imgObj={name:'',urls:'',content:{}};
							if (dic.advW != '--' && JSON.parse(r.content[i].content).picObjUrls) {
								imgObj.name = dic.advW;
								imgObj.urls = JSON.parse(r.content[i].content).picObjUrls;
								if (JSON.parse(r.content[i].content).videoPath.length > 0) {
									imgObj.videoPath = JSON.parse(r.content[i].content).videoPath[0].url;
								}
								imgObj.content = JSON.parse(r.content[i].content);
								dic.imgObj = imgObj;
							} else {
								dic.imgObj = imgObj;
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
							dic.updateDate = r.content[i].updateDate;
							v.tableListData.push(dic);
							v.pageCreativeIds.push(dic.total.id);
							v.pageCreativeStats[dic.total.id] = i;
							if(-1 == v.campaignStatusIds.indexOf(r.content[i].campaign.id)) v.campaignStatusIds.push(r.content[i].campaign.id);
							if(-1 == v.groupStatusIds.indexOf(r.content[i].adGroup.id)) v.groupStatusIds.push(r.content[i].adGroup.id);
						}
					}else{
						v.tableLoading = true;
					}
					v.getCampaignStats();
				});
			},

			filterStatus(value, row){
				return row.shStatus.status === value;
			},

			getCampaignStats(){
				let _this = this;
				if (_this.advertiseId != '' || _this.productId != '' || _this.campaignsId != '' || _this.adGroupId != '' || _this.mediaId != '' || _this.RTBId != '') {
					_this.pageSize = 9999;
				} else {
					_this.pageSize = 10;
				}
				let query = {
					filterSearch: [{name:'campaignId', value: _this.campaignStatusIds.map(String)}] ,//_this.campaignStatusIds.map((id)=>{return {name:'campaignId', value: ''+id}}),
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
					for (let [k, stmp] of (r && r.list || []).entries()) {
						if(_this.campaignStats[stmp.campaignId]){
							// let camstats = _this.campaignStats[stmp.campaignId];
							// camstats.dayspend += Number(stmp.costNum);
						}else{
							_this.campaignStats[stmp.campaignId] = {dayspend:Number(stmp.costNum)};
						}
					};

					_this.getGroupStats();
				});
			},

			getGroupStats(){
				let _this = this;
				let query = {
					filterSearch: [{name:'adgroupId', value: _this.groupStatusIds.map(String)}],//_this.groupStatusIds.map((id)=>{return {name:'adgroupId', value: ''+id}}),
					groupSearch:['adgroupId'],
					'timeSearch':{
						'beginTime': this.$api.dateFormat(new Date()),
						'endTime': this.$api.dateFormat(new Date()),
						'timeUnit':'day'
					},
					'page': 0,
  					'limit': 1000,
  					'order':'asc',
  					'sidx':'dateTime'
				};
				_this.$api.post(_this.allurlsList.statsUnits, query, function(r) {
					let stats = {};
					for (let [k, stmp] of (r && r.list || []).entries()) {
						if(_this.groupStats[stmp.adgroupId]){
							// let camstats = _this.groupStats[stmp.adgroupId];
							// camstats.dayspend += Number(stmp.costNum);
						}else{
							_this.groupStats[stmp.adgroupId] = {dayspend:Number(stmp.costNum)};
						}
					}
					console.log('campaign spend.', _this.campaignStats);
					console.log('group spend.', _this.groupStats);
					_this.getCreativeStats();
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
			addCreativeStatsTotal(total){
				let dic = {};
				dic.crAlName = '合计';
				dic.advCam = '--';
				dic.advGro = '--';
				dic.advZ = '--';
				dic.product = '--';
				dic.media = '--';
				dic.advW = '--';
				dic.hdCondition = '--';
				dic.hdDetail = '--';

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
				dic.respCount = total.respCount || '0';
				dic.imp = total.impValidCount || '0';
				dic.ecpm = (total.costNum/(total.impValidCount||1)*1000).toFixed(2);
				dic.tfSwitch = '--';
				// dic.shStatus = {status:'--', msg:'--'};
				dic.shStatus = '--';
				dic.imgObj={name:'',urls:'',content:{}};
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

			getCreativeStats(){
				this.tableLoading = true;
				console.log('getCreativeStats.');
				let _this = this;
				let query = {
					filterSearch: [{name:'creativeId', value: _this.pageCreativeIds.map(String)}],//_this.pageCreativeIds.map((id)=>{return {name:'creativeId', value: ''+id}}),
					groupSearch:['creativeId'],
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
					_this.addCreativeStatsTotal(r.total||{});
					let stats = {};
					_this.tableLoading = false;
					for (let [k, stmp] of (r && r.list || []).entries()) {
						if(stats[stmp.creativeId]){
							stats[stmp.creativeId].clkValidCount += stmp.clkValidCount;
							stats[stmp.creativeId].commentCount += stmp.commentCount;
							stats[stmp.creativeId].consume += stmp.consume;
							stats[stmp.creativeId].costNum += stmp.costNum;
							stats[stmp.creativeId].followCount += stmp.followCount;
							stats[stmp.creativeId].idpCvs += stmp.idpCvs;
							stats[stmp.creativeId].impValidCount += stmp.impValidCount;
							stats[stmp.creativeId].interactionCost += stmp.interactionCost;
							stats[stmp.creativeId].interactionCount += stmp.interactionCount;
							stats[stmp.creativeId].likeCount += stmp.likeCount;
							stats[stmp.creativeId].profit += stmp.profit;
							stats[stmp.creativeId].respCount += stmp.respCount;
							stats[stmp.creativeId].totalCvs += stmp.totalCvs;
							stats[stmp.creativeId].videoClickCount += stmp.videoClickCount;
							stats[stmp.creativeId].repostCount += stmp.repostCount;
						}else{
							stats[stmp.creativeId] = {};
							stats[stmp.creativeId].clkValidCount = stmp.clkValidCount;
							stats[stmp.creativeId].commentCount = stmp.commentCount;
							stats[stmp.creativeId].consume = stmp.consume;
							stats[stmp.creativeId].costNum = stmp.costNum;
							stats[stmp.creativeId].followCount = stmp.followCount;
							stats[stmp.creativeId].idpCvs = stmp.idpCvs;
							stats[stmp.creativeId].impValidCount = stmp.impValidCount;
							stats[stmp.creativeId].interactionCost = stmp.interactionCost;
							stats[stmp.creativeId].interactionCount = stmp.interactionCount;
							stats[stmp.creativeId].likeCount = stmp.likeCount;
							stats[stmp.creativeId].profit = stmp.profit;
							stats[stmp.creativeId].respCount = stmp.respCount;
							stats[stmp.creativeId].totalCvs = stmp.totalCvs;
							stats[stmp.creativeId].videoClickCount = stmp.videoClickCount;
							stats[stmp.creativeId].repostCount = stmp.repostCount;
						}
					}

					for (let [i, creativeId] of (_this.pageCreativeIds||[]).entries()) {
						if ((_this.pageCreativeStats[''+creativeId]|| 0 == _this.pageCreativeStats[''+creativeId]) && _this.tableListData[_this.pageCreativeStats[''+creativeId]]){
							let tmp = _this.tableListData[_this.pageCreativeStats[''+creativeId]];
							tmp.respCount= (stats[''+creativeId] && stats[''+creativeId].respCount) || '0';
							tmp.imp= (stats[''+creativeId] && stats[''+creativeId].impValidCount) || '0';
							tmp.ecpm= (((stats[''+creativeId] && stats[''+creativeId].costNum || 0.00)/(stats[''+creativeId] && stats[''+creativeId].impValidCount || 1))*1000).toFixed(2);
							let click = stats[''+creativeId] && stats[''+creativeId].clkValidCount||0;
							tmp.cliCondition= '点击数：' + (stats[''+creativeId] && stats[''+creativeId].clkValidCount || 0) + '\n' +
									'点击率：' + (click/(Number(tmp.imp)||1)*100).toFixed(2)+'%' + '\n' +
									'点击成本：' + (((stats[''+creativeId] && stats[''+creativeId].costNum || 0.00) / (stats[''+creativeId] && stats[''+creativeId].clkValidCount || 1)).toFixed(2));
							tmp.consume= stats[''+creativeId] && stats[''+creativeId].consume || '0.00';
							tmp.totalCvs= stats[''+creativeId] && stats[''+creativeId].totalCvs || '0';
							if ((stats[''+creativeId] && stats[''+creativeId].clkValidCount || 0) != 0) {
								tmp.cvr = ((tmp.totalCvs/(stats[''+creativeId] && stats[''+creativeId].clkValidCount))*100).toFixed(2)+'%';
							} else {
								tmp.cvr = '0.00%';
							}
							tmp.costNum= stats[''+creativeId] && stats[''+creativeId].costNum || '0';
							tmp.cvsCost= ((stats[''+creativeId] && stats[''+creativeId].costNum || 0) / (Number(tmp.totalCvs)||1)).toFixed(2);
							if(0 == (stats[''+creativeId] && stats[''+creativeId].costNum||0)) tmp.cvsCost = '0.00';
							if(0 < (stats[''+creativeId] && stats[''+creativeId].costNum||0) && 0 == (stats[''+creativeId] && stats[''+creativeId].totalCvs||0)) tmp.cvsCost = '∞∞';
							tmp.profit= stats[''+creativeId] && stats[''+creativeId].profit || '0.00';
							tmp.profitRate= ((Number(tmp.profit))/(Number(tmp.costNum)||1)*100).toFixed(2)+'%';

							let impCount = stats[''+creativeId] && stats[''+creativeId].impValidCount||0;
							tmp.hdCondition = '互动量：' + (stats[''+creativeId] && stats[''+creativeId].interactionCount || 0) + '\n' +
									'互动率：' + ((stats[''+creativeId] && stats[''+creativeId].interactionCount || 1)/impCount*100).toFixed(2)+'%' + '\n' +
									'互动成本：' + ((stats[''+creativeId] && stats[''+creativeId].costNum||0)/(stats[''+creativeId] && stats[''+creativeId].interactionCount || 1)).toFixed(2);
							tmp.hdDetail = '关注：' + (stats[''+creativeId] && stats[''+creativeId].followCount || 0) + '\n' +
									'转发：' + (stats[''+creativeId] && stats[''+creativeId].repostCount || 0) + '\n' +
									'点赞：' + (stats[''+creativeId] && stats[''+creativeId].likeCount || 0) + '\n' +
									'视频播放：' + (stats[''+creativeId] && stats[''+creativeId].videoClickCount || 0);

							//check adv audit status
							_this.tableListData[_this.pageCreativeStats[''+creativeId]] = tmp;
							_this.calcCreativeStatus(creativeId);
						}
					}
				});
			},

			calcCreativeStatus(creativeid){
				let tmp = this.tableListData[this.pageCreativeStats[''+creativeid]];
				let statustmp = {};
				if(!tmp.total.id){
					return;
				}
				for(let [i, status] of (tmp.total.advertiser.checkStatus||[]).entries()){
					console.log('status.media.', status);
					if(tmp.media != 'B站' && status.media == 'WAX'){
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
							statustmp.status = '广告主审核失败'
							statustmp.msg =  status.msg || '未知原因';
							break;
						}
					}
				}

				if(!statustmp.status && tmp.media != 'B站'){
					if(tmp.total.checkStatus.checkStatus == 'init'){
						statustmp.status = '创意未审核';
						statustmp.msg = '创意未审核';
					}
					if(tmp.total.checkStatus.checkStatus == 'pending'){
						statustmp.status = '创意审核中';
						statustmp.msg = '创意审核中';
					}
					if(tmp.total.checkStatus.checkStatus == "failed"){
						statustmp.status = '创意审核失败';
						statustmp.msg = tmp.total.checkStatus.msg || '未知原因';
					}
				}
				if(!statustmp.status){
					if(tmp.total.status == 'OFF'){
						statustmp.status = '关闭';
						statustmp.msg = '广告创意关闭';
					}
				}

				//check group
				if(!statustmp.status){
					let groupinfo = tmp.total.adGroup;
					let groupsts = this.groupStats[''+groupinfo.id]||null;

					if(groupinfo.status == 'OFF'){
						statustmp.status = '广告组组关闭';
						statustmp.msg = '所属广告组关闭';
					}else{
						let datenow = this.$api.dateFormat(new Date());
						if(groupinfo.beginDate.length > 0 && datenow < groupinfo.beginDate){
							statustmp.status = '组投放未开始';
							statustmp.msg = '当前：'+datenow+ ' 开启时间为：' + groupinfo.beginDate;
						}
						if((!statustmp.status) && groupinfo.endDate.length > 0 && datenow > groupinfo.endDate){
							statustmp.status = '组投放已结束';
							statustmp.msg = '当前：'+datenow+ ' 结束时间为：' + groupinfo.endDate;
						}
						if((!statustmp.status) && groupinfo.targetingTime.length > 0){
							let now = new Date();
							let hour = now.getHours();
							let ts = '' + now.getDay() + '-' + (hour<10?('0'+hour):hour);
							if(-1 == groupinfo.targetingTime.indexOf(ts)){
								statustmp.status = '组投放时段不符';
								statustmp.msg = ' 当前时段为：' + ts;
							}
						}
						if((!statustmp.status) && groupsts){
							let leftBudget = Number(groupinfo.dayBudget) - (groupsts.dayspend||0);
							if(0 < leftBudget && leftBudget < 10.00){
								statustmp.status = '组日预算不足';
								statustmp.msg = '预警，预算不足：' + leftBudget.toFixed(1);
							}else if (leftBudget <= 0){
								statustmp.status = '组日预算超出';
								statustmp.msg = '预算剩余：' + leftBudget.toFixed(1);
							}
						}
					}
				}

				//check campaign
				if(!statustmp.status){
					let campaigninfo = tmp.total.campaign;
					let campaignsts = this.campaignStats[''+campaigninfo.id]||null;
					if(campaigninfo.status == 'OFF'){
						statustmp.status = '活动关闭';
						statustmp.msg = '所属广告活动关闭';
					}else{
						let datenow = this.$api.dateFormat(new Date());
						if(campaigninfo.beginDate.length > 0 && datenow < campaigninfo.beginDate){
							statustmp.status = '活动投放未开始';
							statustmp.msg = '当前：'+datenow+ ' 开启时间为：' + campaigninfo.beginDate;
						}
						if((!statustmp.status) && campaigninfo.endDate.length > 0 && datenow > campaigninfo.endDate){
							statustmp.status = '活动投放已结束';
							statustmp.msg = '当前：'+datenow+ ' 结束时间为：' + campaigninfo.endDate;
						}

						if((!statustmp.status)){
							let leftBudget = campaigninfo.dayBudget - (campaignsts&&campaignsts.dayspend||0);
							if(0 < leftBudget && leftBudget < 10){
								statustmp.status = '活动日预算不足';
								statustmp.msg = '活动日预算剩余：'+ leftBudget.toFixed(2);
							}else if(0 >= leftBudget){
								statustmp.status = '活动超出日预算';
								statustmp.msg = '活动日预算剩余：'+ leftBudget.toFixed(2);
							}
						}
					}
				}

				if(!statustmp.status){
					statustmp.status = '正常';
					statustmp.msg = '正常';
				}

				tmp.shStatus = statustmp;

				this.tableListData[this.pageCreativeStats[''+creativeid]] = tmp;
			},

			handleSelectionChange(val){
				this.multipleSelection = val;
			},

			handleBatch(val){
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
				this.$api.put(this.allurlsList.batchCreative, update, function(r) {
					(r||[]).map((item)=>{
						if ((_this.pageCreativeStats[''+item.id]|| 0 == _this.pageCreativeStats[''+item.id]) && _this.tableListData[_this.pageCreativeStats[''+item.id]]){
							let tmp = _this.tableListData[_this.pageCreativeStats[''+item.id]];
							tmp.total.status = val;
							tmp.tfSwitch = 'ON' == val ? true:false;
							_this.tableListData[_this.pageCreativeStats[''+item.id]] = tmp;
							_this.calcCreativeStatus(item.id);
						}
					});
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
			// 状态按钮切换状态
			statusChangeAction(val) {
				let id = val.total.id;
				let status = val.total.status;
				if(status == 'ON') {
					status = 'OFF'
				} else {
					status = 'ON'
				}
				let _this = this;
				let params = '?id=' + id + '&status=' + status;
				this.$api.put(this.allurlsList.creativesStatus + params, '', function(r) {
					console.log(r);
					let statustmp = {};
					let tmp = _this.tableListData[_this.pageCreativeStats[''+id]];
					tmp.total.status = status;
					_this.tableListData[_this.pageCreativeStats[''+id]] = tmp;
					_this.calcCreativeStatus(id);
				});
			},
			// table表单操作事件
			lookDetailAction(val) {
				var obj = val.total;
				if(obj.mediaType == "MEDIA_BUY") {
					this.zhdialogVisible = true;
					// var v = this;
					// v.$api.get(v.allurlsList.adgroupDetail + '/' + obj.adGroupId, '', function(r) {
					// 	if(r.length > 0) {
					// 		for(var i = 0; i < r.length; i++) {
					// 			r[i].content = JSON.parse(r[i].content);
					// 		}
					// 	}
					// 	debugger
					// 	v.activeArray = r;
					// })
				} else {
					this.wbdialogVisible = true;
				}
				console.log('oooooo',val.total);
				this.dialogObj = val.total;
				if(this.dialogObj.impTrackingUrl == null) {
					this.dialogObj.impTrackingUrl = '';
				}
				if(this.dialogObj.clkTrackingUrl == null) {
					this.dialogObj.clkTrackingUrl = '';
				}
			},
			editAction(val) {
				var obj = val.total;
				if(obj.mediaType == 'MEDIA_BUY') {
					this.$router.push({
						name: 'creatMTADtivity',
						query: {
							id: obj.id,
							value: 'edit'
						}
					})
					console.log('账户媒体');
				} else if(obj.mediaType == "RTB") {
					if(obj.media == 'WAX') {
						console.log('WAX');
						this.$router.push({
							name: 'creatWBADtivity',
							query: {
								id: obj.id,
								value: 'edit'
							}
						})
					} else if(obj.media == 'BILIBILI'){
						this.$router.push({
							name: 'creatBILItivity',
							query: {
								id: obj.id,
								value: 'edit'
							}
						});
					}
				}
			},
			copyAction(val) {
				var obj = val.total;
				if(obj.mediaType == 'MEDIA_BUY') {
					this.$router.push({
						name: 'creatMTADtivity',
						query: {
							id: obj.id,
							value: 'copy'
						}
					})
					console.log('账户媒体');
				} else if(obj.mediaType == "RTB") {
					if(obj.media == 'WAX') {
						console.log('WAX');
						this.$router.push({
							name: 'creatWBADtivity',
							query: {
								id: obj.id,
								value: 'copy'
							}
						})
					} else if(obj.media == 'BILIBILI') {
						this.$router.push({
							name: 'creatBILItivity',
							query: {
								id: obj.id,
								value: 'copy'
							}
						})
						console.log('BAIDU_GD');
					}
				}
			},
			deletAction(val) {
				var v = this;
				var obj = val.total;
				this.$confirm('小姐姐真的需要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
					v.$api.delete(v.allurlsList.creatadver + '/' + obj.id, '', function(r) {
						let index = v.tableListData.indexOf(val);
						if(index <= v.tableListData.length-2){
							for(let i=index; i < v.tableListData.length-1; i++){
								v.tableListData[i] = v.tableListData[i+1];
							}
						}

						v.tableListData.splice(v.tableListData.length-1,1);
						delete v.pageCreativeStats[''+obj.id];
						v.$message({
	            type: 'success',
	            message: '删除成功!'
	          });
					})
        }).catch(() => {
        });
			},
			creatNewAction(val) {
				// var obj = val.value[val.value.length - 1];
				if(this.adGroupId == '') {
					this.$message({
						message: '请选择广告组',
						type: 'warning'
					});
					return;
				}
				var v = this;
				v.$api.get(v.allurlsList.creatADGroupUrl + '/' + this.adGroupId, '', function(r) {
					if(r.mediaType == 'MEDIA_BUY') {
						v.$router.push({
							name: 'creatMTADtivity',
							query: {
								id: r.id,
								value: 'new'
							}
						})
						console.log('账户媒体');
					} else if(r.mediaType == "RTB") {
						if(r.media == 'WAX') {
							console.log('WAX');
							v.$router.push({
								name: 'creatWBADtivity',
								query: {
									id: r.id,
									value: 'new'
								}
							})
						} else if(r.media == 'BILIBILI'){
							v.$router.push({
								name: 'creatBILItivity',
								query: {
									id: r.id,
									value: 'new'
								}
							})
							console.log('BAIDU_GD');
						}
					}
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
			songshenAction(val) {
				if(val.total.mediaType == 'RTB') {
					var id = val.total.id;
					var v = this;
					this.$api.post(this.allurlsList.creativeAudit + '?id=' + id, '', function(r) {
						new Promise(function(resolve, reject) {
							v.$message({
								message: '送审成功',
								type: 'success'
							})
							resolve('')
						}).then(function(val) {
							v.getTableListWithParams();
						});
					})
				} else {
					this.$message({
						message: '账户媒体不能送审',
						type: 'warning'
					});
				}

			},
			handleCheckedCitiesChange(index) {
				console.log(index);
			},
			searchAction() {
				this.currentPage = 1;
				this.getTableListWithParams();
			}
		},
		watch: {
			'$route': function(to, from) {
				console.log('-------1');
				if(this.$route.query.id != undefined) {
					this.adGroupId = parseInt(this.$route.query.id);
				}
				this.getTableListWithParams();
			},
			dialogObj: function(val) {
				if(val.mediaType == 'MEDIA_BUY') {
					val.media = '账号媒体';
				} else {
					if(val.media == 'WAX' || val.media == '微博') {
						val.media = '微博';
					} else if(val.media == 'BAIDU_GD') {
						val.media = '百度信息流';
					}
				}
				if(val.rtbResource == null) {
					val.rtbResource = {
						'url': ''
					};
				}
				console.log('}}}}}',val.content);
				// val.content = JSON.parse(val.content);
			},
		}
	}
</script>

<style lang="scss" scoped="scoped">
.demo-table-expand {
    font-size: 0;
	text-align: left;
	width: 50%;
  }
  .demo-table-expand label {
    width: 90px;
		color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 100%;
  }
	.adCreativity {
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
	.bannerImgDiv {
		position: relative;
		width: 100%;
		height: 436px;
		background-image: url('/static/img/img_bg_weibo_banner.png') ;
		background-size:cover;
		.img1 {
			position: absolute;
			left: 0;
			width: 100%;
			height: 100%;
		}
		.img2 {
			position: absolute;
			width: 100%;
			height: 23%;
			top: 46%;
			left: 0;
		}
	}
	.bigCardImgDiv {
		position: relative;
		width: 100%;
		height: 436px;
		// 框架
	 background-image:url("data:image/png;base64,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");
		background-size:cover;
		.contentDiv {
			position: absolute;
			width: 100%;
			top: 13%;
			height: 78%;
			// background-color: cyan;
			overflow: auto;
			.contentHeader{
				position: relative;
				margin-left: 3%;
				width: 94%;
				height: 8.2%;
				// 微博头
			 background-image:url("data:image/png;base64,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");
				background-size:cover;
			}
			.midden {
				position: relative;
				text-align: left;
				margin-left: 6%;
				margin-top: 10px;
				width: 88%;
				font-size: 12px;
				line-height: 14px;
				overflow: hidden;
				word-break: break-all;
				word-wrap: break-word;
			}
			.bigCardImg {
				position: relative;
				margin-left: 3%;
				width: 94%;
				background-size:cover;
				padding-top: 5px;
			}
			.videoP {
				position: relative;
				margin-left: 3%;
				width: 94%;
				background-size:cover;
				padding-top: 5px;
			}
			.nineImg {
				width: 20%;
		    padding: 3px 6%;
		    height: 40px;
			}
			.cardMessageDiv {
				position: relative;
				margin-left: 6%;
				width: 92%;
				min-height: 35px;
				.carMLeftDiv {
					position: relative;
					width: 70%;
					float: left;
					.carMLeftTop {
						font-size: 12px;
						text-align: left;
						overflow: hidden;
						white-space: nowrap;
						text-overflow:ellipsis;
					}
					.carMLeftBottom {
						font-size: 12px;
						text-align: left;
						color: #858c92;
						overflow: hidden;
						white-space: nowrap;
						text-overflow:ellipsis;
					}
				}
				.carMRightDiv {
					position: relative;
					margin-left: 70%;
					width: 30%;
				}
			}
			.contentFooter {
				position: relative;
				margin-left: 3%;
				width: 94%;
				height: 7%;
				// 底部
			 background-image:url("data:image/png;base64,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");
				background-size:cover;
			}
		}
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
		.exmpleImg {
			width: 80%;
			padding-top: 30px;
			padding-left: 20%;
		}
	}
</style>
