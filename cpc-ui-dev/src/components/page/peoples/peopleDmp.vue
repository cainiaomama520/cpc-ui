<template>
	<div class="centr peopleDmp">
		<div class="searchDiv">
		<!--<el-card>-->
			<el-form ref="form" :model="form" label-width="130px">
				<el-row>
					<el-col>
						<el-col :span="8">
							<el-form-item label="DMP定向名称：">
								<el-select v-model="form.dmpName" clearable  filterable placeholder="请选择">
									<el-option v-for="item in nameArry" :key="item.id" :label="item.name" :value="item.id"></el-option>
									</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="DMP来源：">
								<el-select v-model="form.dmpSource" clearable  filterable placeholder="请选择">
										<el-option v-for="item in sourceArry" :key="item.id" :label="item.name" :value="item.id"></el-option>
									</el-select>
							</el-form-item>
						</el-col>
					</el-col>
					<el-col>
						<el-col :span="8">
							<el-form-item label="适用媒体：">
								<el-select v-model="form.mediaId" clearable  filterable placeholder="请选择">
										<el-option v-for="item in mediaArry" :key="item.id" :label="item.name" :value="item.id"></el-option>
									</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="状态：">
								<el-select v-model="form.status" clearable  filterable placeholder="请选择">
										<el-option v-for="item in statusArry" :key="item.id" :label="item.name" :value="item.id"></el-option>
									</el-select>
							</el-form-item>
						</el-col>
					</el-col>
				</el-row>
				<el-row>
					<el-button type="primary" icon="el-icon-search"  @click="onsubmitSearch()" style="margin-left:50px;float:left">查询</el-button>
					<div style="float: right;">
						<el-button type="primary" icon="el-icon-edit"  @click="handleDmpCreate('base')" style="margin-left:30px;">创建基础定向包</el-button>
						<el-button type="primary" icon="el-icon-edit"  @click="handleDmpCreate('device')" style="margin-left:30px">创建设备定向包</el-button>
						<el-button type="primary" icon="el-icon-edit"  @click="handleDmpCreate('topics')" style="margin-left:30px">创建话题定向包</el-button>
						<el-button type="primary" icon="el-icon-edit"  @click="handleDmpCreate('fans')"  style="margin-left:30px">创建粉丝定向包</el-button>
					</div>
				</el-row>
		    </el-form>
		<!--</el-card>-->
		</div>
		<el-dialog
		  title="粉丝定向包创建"
		  :visible.sync="fansDmpCreate.display"
		  width="50%"
		  center>
		  <el-form :model="fansDmpCreate" >
		  	<el-form-item label="定向包名：" label-width="85px">
		      	<el-input v-model="fansDmpCreate.name" auto-complete="off" style="width: 200px;"></el-input>
		    </el-form-item>
		  	<el-form-item label="粉丝包:">
				<el-autocomplete
					popper-class="my-autocomplete"
				  	v-model="fansDmpCreate.packetListLabel"
				  	:fetch-suggestions="querySearchAsync"
				  	@select="handleSelect"
				  	placeholder="请输入内容"
					style="width:400px;margin-left: 25px">
					<template slot-scope="{ item }">
				    	<div class="name">{{ item.name }}</div>
				    	<span class="addr">{{ item.followersCount }}</span>
				  	</template>
				</el-autocomplete>
				<el-button @click="fansCreate.display = true">新建</el-button>
			</el-form-item>
			<div v-if='fansDmpCreate.selectedFans.followersCount > 0' class="autocompleteDiv">
				<span class="autopSpan">共<span style="color: rgb(51, 136, 255);">{{fansDmpCreate.selectedFans.uidCount}}</span>个
					<span class="autopRightSpan">总粉丝数: {{fansDmpCreate.selectedFans.followersCount}}</span>
				</span>
				<div class="autoContentDiv">
					<div class="contentHeaderDiv">
						<span class="headerDivBigSpan">
							<span>微博账号名称</span>
							<span style="float:right">粉丝数</span>
						</span>
					</div>
					<div class="scrollDiv">
						<el-scrollbar>
							<ul class="scrollUl">
								<li class="scrollLi" v-for='(item,index) in fansDmpCreate.selectedFans.uids'>
									<p class="bigP">
										<span>{{index+1}} . {{item.screenName}}</span>
										<span style="float:right">{{item.followersCount}}</span>
									</p>
								</li>
							</ul>
						</el-scrollbar>
					</div>
				</div>
			</div>
		  </el-form>
		  <div slot="footer" style="text-align: center;">
		    <el-button @click="fansDmpCreate.display = false">取 消</el-button>
		    <el-button type="primary" @click="handleDmpCreateExt('fans')">确 定</el-button>
		  </div>
		</el-dialog>
		<el-dialog
		  title="粉丝包创建"
		  :visible.sync="fansCreate.display"
		  width="50%"
		  center>
		  <el-form :model="fansCreate" >
			<el-form-item label="粉丝包名：" label-width="85px">
		      <el-input v-model="fansCreate.name" auto-complete="off" style="width: 200px;"></el-input>
		    </el-form-item>
		    <el-form-item label="帐号搜索：">
		    	<el-select
		    		v-model="fansCreate.fans"
		    		multiple
		    		placeholder="请添加帐号，最多50个"
		    		filterable
		    		default-first-option
		    		remote
		    		:remote-method="searchFansMethod"
		    		:loading="fansCreate.fansloading"
		    		:multiple-limit="fansCreate.maxFansNum">
					<el-option
						v-for="(item,index) in fansCreate.searchFansSelect"
						:key="item.uid"
						:label="item.screenName"
						:value="item.uid">
						<div>
							<p>{{++index}}.#{{item.screenName}} #
								粉丝数 {{item.followersCount}} #
							</p>
						</div>
					</el-option>
				</el-select>
			</el-form-item>
		  </el-form>
		  <div slot="footer" style="text-align: center;">
		    <el-button @click="fansCreate.display = false">取 消</el-button>
		    <el-button type="primary" @click="handleNewFans()">确 定</el-button>
		  </div>
		</el-dialog>
		<el-dialog
		  title="设备定向包创建"
		  :visible.sync="deviceDmpCreate.display"
		  width="40%"
		  center>
		  <el-form :model="deviceDmpCreate" >
		  	<el-form-item label="定向包名：" label-width="85px">
		      	<el-input v-model="deviceDmpCreate.name" auto-complete="off" style="width: 200px;"></el-input>
		    </el-form-item>
		  	<el-form-item label="设备包选择:">
		  		<el-select v-model="deviceDmpCreate.packageid" filterable placeholder="请选择" style="">
					<el-option v-for="item in deviceDmpCreate.packageArray" :key="item.id" :label="item.name" :value="item.id"></el-option>
				</el-select>
			</el-form-item>
		  </el-form>
		  <div slot="footer" style="text-align: center;">
		    <el-button @click="deviceDmpCreate.display = false">取 消</el-button>
		    <el-button type="primary" @click="handleDmpCreateExt('device')">确 定</el-button>
		  </div>
		</el-dialog>
		<el-dialog
		  title="话题定向包创建"
		  :visible.sync="topicsCreate.display"
		  width="30%"
		  center>
		  <el-form :model="topicsCreate" >
		    <el-form-item label="话题包名：" label-width="85px">
		      <el-input v-model="topicsCreate.name" auto-complete="off" style="width: 200px;"></el-input>
		    </el-form-item>
			<el-form-item label="话题搜索：">
				<el-select
					v-model="topicsCreate.topic"
					placeholder="请选择话题，最多100个"
					multiple
					filterable
					default-first-option
					remote
					:remote-method="searchTopicMethod"
					:loading="topicsCreate.topicloading"
					:multiple-limit="topicsCreate.maxTopicNum">
					<el-option
						v-for="(item,index) in topicsCreate.searchTopicSelect"
						:key="item.title"
						:label="item.title"
						:value="item.title">
						<div>
							<p>{{++index}}.#{{item.title}} #
							实际参与人数{{item.attendance}} #
							预估覆盖人群数{{item.coverage}}</p>
						</div>
					</el-option>
				</el-select>
			</el-form-item>
		  </el-form>
		  <div slot="footer" style="text-align: center;">
		    <el-button @click="topicsCreate.display = false">取 消</el-button>
		    <el-button type="primary" @click="handleDmpCreateExt('topic')">确 定</el-button>
		  </div>
		</el-dialog>
		<el-dialog
		  title="基础定向包创建"
		  :visible.sync="baseCreate.display"
		  width="50%"
		  center>
			<!-- 人群兴趣定向 -->
			<div v-if="DmpTargetingDTO.targetingType == 'WAX_COMMON'" key='targetingDmp1' style="margin-left:50px">
				<el-form>
					<el-form-item label="模板名称：">
			      <el-input v-model="DmpTargetingDTO.name" auto-complete="off" style="width: 200px;"></el-input>
			    </el-form-item>
					<el-form-item label="年龄:">
						<el-radio-group v-model="ruleForm.ageRange">
							<el-radio label='agenone'>不限</el-radio>
							<el-radio label='agemakeSelf'>自定义</el-radio>
						</el-radio-group>
					</el-form-item>
					<div v-if="ruleForm.ageRange == 'agemakeSelf'">
						<el-row>
							<el-col :span='2'>
								&emsp;
							</el-col>
							<el-col :span='10'>
								<el-slider v-model="ruleForm.ageValues" range show-stops>
								</el-slider>
							</el-col>
						</el-row>
					</div>
					<el-form-item label="性别:">
						<el-checkbox-group v-model="DmpTargetingDTO.content.gender">
							<el-checkbox label="401">男</el-checkbox>
							<el-checkbox label="402">女</el-checkbox>
						</el-checkbox-group>
					</el-form-item>
					<el-form-item label="地域:">
						<el-radio-group v-model="ruleForm.locs">
							<el-radio label='locnone'>不限</el-radio>
							<el-radio label='locmakeSelf'>自定义</el-radio>
						</el-radio-group>
					</el-form-item>
					<div v-if="ruleForm.locs == 'locmakeSelf'" key='locs' style="padding-bottom:30px;margin-left:50px">
						<tree-transfer ref='loc' @listenChildAction='locationTodataAction' :from_data='locationFromData' :to_data='locationToData'></tree-transfer>
					</div>
					<el-form-item label="兴趣:">
						<el-radio-group v-model="ruleForm.interest">
							<el-radio label='intnone'>不限</el-radio>
							<el-radio label='intmakeSelf'>自定义</el-radio>
						</el-radio-group>
					</el-form-item>
					<div v-if="ruleForm.interest == 'intmakeSelf'" key='interest' style="padding-bottom:30px;margin-left:50px">
						<tree-transfer ref='int' @listenChildAction='interestTodataAction' :from_data='interestFromData' :to_data='interestToData'></tree-transfer>
					</div>
					<el-form-item label="人生状态:">
						<el-radio-group v-model="ruleForm.activeAct">
							<el-radio label='actnone'>不限</el-radio>
							<el-radio label='actmakeSelf'>自定义</el-radio>
						</el-radio-group>
					</el-form-item>
					<div v-if="ruleForm.activeAct == 'actmakeSelf'" key='activeAct' style="padding-bottom:30px;margin-left:50px">
						<tree-transfer ref='life' @listenChildAction='lifeStatuseTodataAction' :from_data='lifeStatuseFromData' :to_data='lifeStatuseToData'></tree-transfer>
					</div>
					<el-form-item label="App偏好:">
						<el-radio-group v-model="ruleForm.appLoveStr">
							<el-radio label='appnone'>不限</el-radio>
							<el-radio label='appmakeSelf'>自定义</el-radio>
						</el-radio-group>
					</el-form-item>
					<div v-if="ruleForm.appLoveStr == 'appmakeSelf'" key='appLoveStr' style="padding-bottom:30px;margin-left:50px">
						<el-transfer :titles="['源列表','目标列表']" v-model="appLoveTodata" :data="appLoveFromdata"></el-transfer>
					</div>
				</el-form>
			</div>

		  <div slot="footer" style="text-align: center;">
		    <el-button @click="baseCreate.display = false">取 消</el-button>
		    <el-button type="primary" @click="handleDmpCreateExt('base')">确 定</el-button>
		  </div>
		</el-dialog>

		<div class="dmpDiv">
        	<el-table :data="tableData" border height="350" style="width: 100%"   v-loading="tableLoading">
				<el-table-column prop="name" label="定向包名称"></el-table-column>
				<el-table-column prop="id" label="定向ID"></el-table-column>
				<el-table-column prop="dmpType" label="DMP来源">
					<template slot-scope="scope">
					    <template v-if="scope.row.dmpType=='WAX'">微博</template>
					    <template v-else-if="scope.row.dmpType=='BAIDU_GD'">百度</template>
					</template>
				</el-table-column>
				<el-table-column prop="media" label="适用媒体">
					<template slot-scope="scope">
					    <span v-if="scope.row.media=='WAX'">微博</span>
					    <span v-else-if="scope.row.media=='BAIDU_GD'">百度</span>
					    <span v-else>微博，百度</span>
					</template>
				</el-table-column>
				<el-table-column prop="coverage" label="覆盖用户数"></el-table-column>
				<el-table-column prop="status" label="状态">
					<template slot-scope="scope">
						<el-button @click="lookDetailAction(scope.row)" type="text">查看</el-button>
					    <template v-if="scope.row.status=='INIT'">初始化</template>
					    <template v-else-if="scope.row.status=='FAILED'">失败</template>
					    <template v-else-if="scope.row.status=='PENDING'">审核中</template>
					    <template v-else-if="scope.row.status=='SUCCESS'">成功</template>
					    <template v-else-if="scope.row.status=='OFF'">关闭</template>
					    <template v-else-if="scope.row.status=='ON'">开启</template>
					</template>
				</el-table-column>
				<!--<el-table-column label="操作">
					<template scope="scope">
						<el-button @click="pauseDmp(scope.row.id)" type="text" size="small">暂停</el-button>
						<el-button @click="" type="text" size="small">编辑</el-button>
					</template>
				</el-table-column>-->
			</el-table>
			<div class="block">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"  :page-sizes="[10, 50, 100, 400]" :page-size="pageCtr.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageCtr.pageTatol">
				</el-pagination>
			</div>
		</div>
		<el-dialog title="定向详情" :visible.sync="dialogVisible" width="50%">
			<el-row>
				<el-col :span='2'>
					&emsp;
				</el-col>
				<el-col :span="20">
					<!-- <el-row v-if="dialogObj.targetingType == 'WAX_COMMON'"> -->
								<el-col :span='12' v-if='dialogObj.gender&&dialogObj.gender.length !=0'>
									<span class="dialogObjSpan">性别:&emsp;&emsp;&emsp;{{dialogObj.gender.toString()}}</span><br>
								</el-col>
								<el-col :span='12'>
									<span class="dialogObjSpan" v-if='dialogObj.ageRange'>年龄:&emsp;&emsp;&emsp;{{dialogObj.ageRange}}</span><br>
								</el-col>
								<el-col :span='24' v-if="dialogObj.packetList">
									<span class="dialogObjSpan">粉丝包:&emsp;&emsp;&emsp;{{dialogObj.packetList}}</span><br>
									<span style="font-size:12px" v-if="dialogObj.uids!=undefined && dialogObj.uids.length > 0" class="dialogObjSpan">粉丝账号:&emsp;&emsp;&emsp;{{dialogObj.uids.toString()}}</span><br>
								</el-col>
								<el-col :span='24' v-if="dialogObj.topic&&dialogObj.topic.length!=0">
									<span class="dialogObjSpan">话题:&emsp;&emsp;&emsp;{{dialogObj.topic.toString()}}</span><br>
								</el-col>
								<el-col :span='24' v-if='dialogObj.loc&&dialogObj.loc.length!=0'>
									<span class="dialogObjSpan">地域:&emsp;&emsp;&emsp;{{dialogObj.locLabel}}</span><br>
								</el-col>
								<el-col :span='24' v-if='dialogObj.interest&&dialogObj.interest.length!=0'>
									<span class="dialogObjSpan">兴趣:&emsp;&emsp;&emsp;{{dialogObj.interestLabel}}</span><br>
								</el-col>
								<el-col :span='24' v-if='dialogObj.life_status&&dialogObj.life_status.length!=0'>
									<span class="dialogObjSpan">行为属性:&emsp;{{dialogObj.lifeStatusLabel}}</span><br>
								</el-col>
					<!-- </el-row> -->
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
	import Cookie from '../../../util/cookies';
	import {mapState, mapActions}from 'vuex';
	import treeTransfer from "../../common/transfer-extend"
	export default {
		components: {
			treeTransfer
		}, // 注册
		data() {
			return {
				deviceDmpCreate:{
					display: false,
					name:'',
					packageid:'',
					packageArray: [],
				},
				fansDmpCreate:{
					display: false,
					packetListLabel: '', // 存储选中粉丝
					selectedFans:{}, // 选中的粉丝包
					fansloading: false,
					maxFansNum: 50,
					fans: [],
					searchFansSelect: []
				},
				fansCreate:{
					display: false,
					fansloading: false,
					maxFansNum: 50,
					fans: [],
					searchFansSelect: [],
					searchTopicSelectHistory: [],
				},
				baseCreate:{
					display: false,
				},
				topicsCreate:{
					display: false,
					topicloading: false,
					maxTopicNum: 100,
					topic: [],
					searchTopicSelect: []
				},
				pageCtr: {
					pageSize: 10,
					pageTatol: 0,
					pageCurrent: 1
				},
				form:{
					dmpName : '',
					dmpSource : '',
					mediaId : '',
					status : ''
				},
				nameArry:[],
				sourceArry:[{"id":"WAX","name":"微博"}],
				mediaArry :[],
				statusArry:[
					{"id":"INIT","name":"初始化"},
					{"id":"FAILED","name":"失败"},
					{"id":"PENDING","name":"审核中"},
					{"id":"SUCCESS","name":"成功"},
					{"id":"OFF","name":"关闭"},
					{"id":"ON","name":"开启"}
				],
				tableData:[],
				tableLoading:false,
				dialogObj: {
					targetingType: '',
					ageRange: '',
					gender:'',
					loc:[],
					locLabel: [],
					interest:[],
					interestLabel: [],
					life_status:[],
					lifeStatusLabel: [],
					app: [],
					topic: [],
					packetList: '',
					uids: []
				},
				dialogVisible: false,
				DmpTargetingDTO: {
					targetingType:'WAX_COMMON',// 定向类型 = ['WAX_COMMON', 'WAX_PACKET', 'WAX_TOPIC', 'WAX_BLOG'],
					dmpType:'WAX',// dmp类型 = ['WAX'],
					name: '',// 模板名称
					content: {
						gender: [],
						app: [], // app偏好
						life_status: [], // 人生状态
						ageRange: [], // 年龄
						loc: [], // 地域
						interest: [], // 兴趣
					}
				},
				ruleForm: {
					ageRange: 'agenone', // 存储年龄
					ageValues: [], // 年龄数组
					locs: 'locnone', // 存储地域
					locsValues: [], // 存储数组
					interest: 'intnone', // 存储兴趣
					interestValues: [], // 存储兴趣数组
					activeAct: 'actnone', // 存储行为属性
					appLoveStr: 'appnone', // 存储App偏好
				},
				// 地域
				locationFromData: [],
				locationToData: [],
				locationCurrentData: [],
				// 兴趣
				interestFromData: [],
				interestToData: [],
				interesCurrentData: [],
				// 人生状态
				lifeStatuseFromData: [],
				lifeStatuseToData: [],
				lifesCurrentData: [],
				// app偏好
				appLoveTodata: [],
				appLoveFromdata: [],
			}
		},
		mounted() {
			this.getBaseData();
		},
		methods: {
			getBaseData() {
				var v = this;
				// 地域
				this.$api.get(this.allurlsList.regionsLinkage, '', function(r) {
					v.locationFromData = v.haveNoNullArray(r);
				})
				// 兴趣
				this.$api.get(this.allurlsList.interestsLinkage, '', function(r) {
					// console.log('------',r);
					v.interestFromData = v.haveNoNullArray(r);
				})
				// 人生状态
				this.$api.get(this.allurlsList.lifeStatuseLinkage, '', function(r) {
					console.log('------', r);
					v.lifeStatuseFromData = v.haveNoNullArray(r);
				})
				// dmpsome字段
				this.$api.get(this.allurlsList.dmpDictData, '', function(r) {
					console.log('------', r);
					v.appLoveFromdata = v.elTranData(r.appType);
					v.ruleForm.ageValues = r.ageRange;
				})
			},
			locationTodataAction(val) {
				this.locationToData = val;
				this.locationCurrentData = [];
				this.locationCurrentData = this.getTreeDataValue(val);
				console.log(this.locationCurrentData);
			},
			interestTodataAction(val) {
				this.interestToData = val;
				this.interesCurrentData = [];
				this.interesCurrentData = this.getTreeDataValue(val);
				console.log(this.interesCurrentData);
			},
			lifeStatuseTodataAction(val) {
				this.lifeStatuseToData = val;
				this.lifesCurrentData = [];
				this.lifesCurrentData = this.getTreeDataValue(val);
				console.log(this.lifesCurrentData);
			},
			...mapActions([
				'getMediaList_dmp',
				'getDmpDropdown',
				'getPeopleDmpList',
				'fansLogin',
				'getFansInfo'
			]),
			async adbrightLogin(){
				let login = await this.fansLogin({});
				console.log('fans login.', login);
			},
			async searchFansMethod(query){
				await this.adbrightLogin({});
				if(query.length > 0){
					console.log('query fans', query);
					let fans = await this.getFansInfo({key: query});
					if(fans.data && fans.data.records){
						this.fansCreate.searchFansSelect = fans.data.records;
						this.fansCreate.searchTopicSelectHistory = this.fansCreate.searchTopicSelectHistory.concat(fans.data.records);
					}
					console.log('query fans result.', fans);
				}
			},
			handleNewFans(){
				if(this.fansCreate.name.length > 0 && this.fansCreate.fans.length > 0){
					let fCount = 0;
					let fanstmp = {};
					this.fansCreate.searchTopicSelectHistory.map((item)=>{
						fanstmp[item.uid] = item;
					});

					let uids = this.fansCreate.fans.map((item)=>{
						fCount += fanstmp[item].followersCount;
						return fanstmp[item];
					});

					let fansdata = {
						followersCount: fCount,
						name: this.fansCreate.name,
						uidCount: this.fansCreate.fans.length,
						uids: uids
					}
					let _this = this;
					_this.$api.post(_this.allurlsList.waxFansCreate, fansdata, function(r) {
						console.log('create fans callback.', r);
						if (r != '') {
							_this.fansDmpCreate.selectedFans = r;
							_this.fansDmpCreate.packetListLabel = r.name;
						}
					});
				}else{
					this.$message({
						message: '请输入粉丝包名称，以及选择帐号',
						type: 'warning'
					});
				}
				//reate fans packege
				console.log('select fans.', this.fansCreate.fans);
				//set to dmp package

				this.fansCreate.display = false;
			},
			// 粉丝包
			querySearchAsync(queryString, callback) {
				var v = this;
				v.$api.get(v.allurlsList.waxFansList + '?name=' + queryString, '', function(r) {
					console.log(r);
					if (r.length > 0) {
						for (var i = 0; i < r.length; i++) {
							r[i].value = r[i].name;
						}
					}
					callback(r);
				})
			},
			handleSelect(item) {
				this.fansDmpCreate.selectedFans = item;
				// this.DmpTargetingDTO.content.packetList[0] = (item.id).toString();
			},
			searchTopicMethod(query) { /*搜索话题自定义方法*/
				let _this = this;
				_this.$api.get(_this.allurlsList.TopicList + '?keyword=' + query, '', function(r) {
					if (r != '') {
						_this.topicsCreate.searchTopicSelect = r.topic;
					}
				});
			},
			handleDmpCreate(ty){
				let _this = this;
				if('base' == ty) {
					this.baseCreate.display = true;
					this.DmpTargetingDTO.name = '';
					this.DmpTargetingDTO.content.gender = [];
					this.DmpTargetingDTO.content.app = [];
					this.DmpTargetingDTO.content.life_status = [];
					this.DmpTargetingDTO.content.ageRange = [];
					this.DmpTargetingDTO.content.loc = [];
					this.DmpTargetingDTO.content.interest = [];
					this.ruleForm.ageRange = 'agenone';
					this.ruleForm.ageValues = [];
					this.ruleForm.locs = 'locnone';
					this.ruleForm.locsValues = [];
					this.ruleForm.interest = 'intnone';
					this.ruleForm.interestValues = [];
					this.ruleForm.activeAct = 'actnone';
					this.ruleForm.appLoveStr = 'appnone';

					// 地域
					this.locationFromData = [];
					this.locationToData = [];
					this.locationCurrentData = [];
					// 兴趣
					this.interestFromData = [];
					this.interestToData = [];
					this.interesCurrentData = [];
					// 人生状态
					this.lifeStatuseFromData = [];
					this.lifeStatuseToData = [];
					this.lifesCurrentData = [];
					// app偏好
					this.appLoveTodata = [];
					this.appLoveFromdata = [];
					this.getBaseData();
				}
				if('topics' == ty) {
					this.topicsCreate.display = true;
					this.topicsCreate.topic = [];
					this.topicsCreate.searchTopicSelect = [];
					this.topicsCreate.name = '';
				}
				if('fans' == ty) {
					this.fansDmpCreate.display = true;
					this.fansDmpCreate.packetListLabel = '';
					this.fansDmpCreate.selectedFans = {};
					this.fansDmpCreate.fansloading = false;
					this.fansDmpCreate.fans = [];
					this.fansDmpCreate.searchFansSelect = [];
					this.fansCreate.fans = [];
					this.fansCreate.searchFansSelect = [];
				}
				if('device' == ty){
					this.deviceDmpCreate.display = true;
					this.deviceDmpCreate.name = '';
					this.deviceDmpCreate.packageid = '';
					this.deviceDmpCreate.packageArray = [];
					this.$api.get(this.allurlsList.crowPackLinkage, {
						type: 'DEVICE'
					}, function(r) {
						_this.deviceDmpCreate.packageArray = r;
					});
				}
			},
			handleDmpCreateExt(ty){
				let _this = this;
				this.topicsCreate.display = false;
				this.fansCreate.display = false;

				if('topic' == ty ){
					if(this.topicsCreate.topic.length > 0 && this.topicsCreate.name.length > 0){
						let dmpctx = {
							topic: this.topicsCreate.topic,
							topicLabel: JSON.stringify(this.topicsCreate.searchTopicSelect),
						}
						let dmp = {
							name: '话题-'+this.topicsCreate.name,
							dmpType: 'WAX',
							targetingType: 'WAX_TOPIC',
							content: JSON.stringify(dmpctx)
						}
						_this.$api.post(_this.allurlsList.dmpTargetings, dmp, function(r) {
							console.log(r);
							_this.onsubmitSearch();
						});
					}else{
						this.$message({
							message: '请输入话题包名称，选择话题',
							type: 'warning'
						});
					}
				}
				if('fans' == ty){
					if(this.fansDmpCreate.name.length > 0 && this.fansDmpCreate.selectedFans.id){
						let dmpctx = {
							packetList: [this.fansDmpCreate.selectedFans.id],
						}
						let dmp = {
							name: '粉丝-'+this.fansDmpCreate.name,
							dmpType: 'WAX',
							targetingType: 'WAX_COMMON',
							content: JSON.stringify(dmpctx)
						}
						console.log('create dmp.', dmp);
						_this.$api.post(_this.allurlsList.dmpTargetings, dmp, function(r) {
							console.log(r);
							_this.onsubmitSearch();
						});
						this.fansDmpCreate.display = false;
					}else{
						this.$message({
							message: '请输入粉丝定向名称，选择粉丝包',
							type: 'warning'
						});
						this.fansDmpCreate.display = false;
					}
				}
				if('device' == ty){
					if(this.deviceDmpCreate.name.length > 0 && this.deviceDmpCreate.packageid){
						let dmpctx = {
							packageid: this.deviceDmpCreate.packageid,
							type: 'DEVICE',
							blackPackage: false
						}
						let dmp = {
							name: '设备-'+this.deviceDmpCreate.name,
							dmpType: 'WAX',
							targetingType: 'WAX_PACKET',
							content: JSON.stringify(dmpctx)
						}
						console.log('create dmp.', dmp);
						_this.$api.post(_this.allurlsList.dmpTargetings, dmp, function(r) {
							console.log(r);
							_this.onsubmitSearch();
						});
						this.deviceDmpCreate.display = false;
					}else{
						this.$message({
							message: '请输入设备定向名称，选择设备包',
							type: 'warning'
						});
						this.deviceDmpCreate.display = false;
					}
				}
				if('base' == ty){
						var v = this;
						if(v.ruleForm.ageRange == 'agenone') {
							v.DmpTargetingDTO.content.ageRange = [];
						} else {
							v.DmpTargetingDTO.content.ageRange = v.ruleForm.ageValues;
						}
						if(v.ruleForm.locs == 'locnone') {
							v.DmpTargetingDTO.content.loc = [];
						} else {
							v.DmpTargetingDTO.content.loc = v.locationCurrentData;
						}
						if(v.ruleForm.interest == 'intnone') {
							v.DmpTargetingDTO.content.interest = [];
						} else {
							v.DmpTargetingDTO.content.interest = v.interesCurrentData;
						}
						if(v.ruleForm.activeAct == 'actnone') {
							v.DmpTargetingDTO.content.life_status = [];
						} else {
							v.DmpTargetingDTO.content.life_status = v.lifesCurrentData;
						}
						if(v.ruleForm.appLoveStr == 'appnone') {
							v.DmpTargetingDTO.content.app = [];
						} else {
							v.DmpTargetingDTO.content.app = v.appLoveTodata;
						}
						// WARNING: 上线修改
						delete v.DmpTargetingDTO.content.app;
						v.DmpTargetingDTO.content.lifeStatusLabel = JSON.stringify(v.lifeStatuseToData);
						v.DmpTargetingDTO.content.interestLabel = JSON.stringify(v.interestToData);
						v.DmpTargetingDTO.content.locLabel = JSON.stringify(v.locationToData);
						// debugger
						if (this.DmpTargetingDTO.name == '') {
							this.$message({
					          message: '请填写模板名称',
					          type: 'warning'
					        });
							return ;
						}
						this.DmpTargetingDTO.name = '基础-' + this.DmpTargetingDTO.name;
						v.$api.post(v.allurlsList.dmpTargetings, v.DmpTargetingDTO, function(r) {
							console.log(r);
							v.baseCreate.display = false;
							v.onsubmitSearch();
							v.$message({
					          	message: '保存成功',
					          	type: 'success'
					        });
						})
				}
			},

			lookDetailAction(val) {
				this.dialogVisible = true;
				this.dialogObj = JSON.parse(val.content);
				console.log(this.dialogObj);
				if (this.dialogObj.ageRange) {
					if (this.dialogObj.ageRange.length == 0) {
						this.dialogObj.ageRange = '不限';
					} else {
						this.dialogObj.ageRange = this.dialogObj.ageRange.toString();
					}
				}
				if (this.dialogObj.loc) {
					if (this.dialogObj.loc.length == 0) {
						this.dialogObj.locLabel = '不限';
					} else {
						this.dialogObj.locLabel = this.getTreeDataLabel(JSON.parse(this.dialogObj.locLabel)).toString();
					}
				}
				if (this.dialogObj.interest) {
					if (this.dialogObj.interest.length == 0) {
						this.dialogObj.interestLabel = '不限';
					} else {
						this.dialogObj.interestLabel = this.getTreeDataLabel(JSON.parse(this.dialogObj.interestLabel)).toString();
					}
				}
				if (this.dialogObj.life_status) {
					if (this.dialogObj.life_status.length == 0) {
						this.dialogObj.lifeStatusLabel = '不限';
					} else {
						this.dialogObj.lifeStatusLabel = this.getTreeDataLabel(JSON.parse(this.dialogObj.lifeStatusLabel)).toString();
					}
				}
				var v = this;
				if (this.dialogObj.packetList != undefined && this.dialogObj.packetList.length > 0) {
					v.$api.get(v.allurlsList.getFans + '/' + this.dialogObj.packetList[0], '', function(r) {
						v.dialogObj.packetList = r.name;
						v.dialogObj.uids = [];
						if (r.uids!=undefined && r.uids.length > 0) {
							for (var i = 0; i < r.uids.length; i++) {
								v.dialogObj.uids.push(r.uids[i].screenName);
							}
						}
					})
				}
			},
			//请求搜索框媒体列表
			async getMediaData(options){
	      		let mediaList = await this.getMediaList_dmp(options);
	      		if (mediaList && mediaList.length>0){
					this.mediaArry = mediaList||[];
	      		}else{
	                this.mediaArry = [];
	           }
			},
			//请求搜索框dmp定向包列表
			async getDmpdrop(options){
	      		let dmpdropList = await this.getDmpDropdown(options);
	      		if (dmpdropList && dmpdropList.length>0){
					this.nameArry = dmpdropList||[];
	      		}else{
	                this.nameArry = [];
	           }
			},
			async onsubmitSearch(){
	            await this.getPeopleDmpData(0,10);
	        },
	        async getPeopleDmpData(page,size){
	        	this.tableLoading=true;
	        	let condition = {
	                    'rules[0].field':'id',
	                    'rules[0].op': 'eq',
	                    'rules[0].data': this.form.dmpName,
	                    'rules[1].field':'dmpType ',
	                    'rules[1].op': 'eq',
	                    'rules[1].data': this.form.dmpSource,
	                    'rules[2].field':'media',
	                    'rules[2].op': 'eq',
	                    'rules[2].data': this.form.mediaId,
	                    'rules[3].field':'status',
	                    'rules[3].op': 'eq',
	                    'rules[3].data': this.form.status,
	                    'groupOp': 'AND',
	                    'page': page,
	  					'size': size
	            }
				if(this.form.dmpName == '' && this.form.dmpSource == '' && this.form.mediaId == '' && this.form.status == ''){
					condition = {
						'page': page,
	  					'size': size
					}
				}
	      		let dmplist = await this.getPeopleDmpList(condition);
	      		if (dmplist&&dmplist.content&&dmplist.content.length>0){
					this.pageCtr.pageTatol =  dmplist.totalElements||0;
					this.tableData = dmplist.content||[];
	      		}else{
	                this.pageCtr.pageTatol = 0;
	                this.tableData = [];
	            }
	      		this.tableLoading=false;
			},
	        async handleSizeChange(val) {
	        	this.pageCtr.pageSize = val;
	        	let page=this.pageCtr.pageCurrent - 1;
	            await this.getPeopleDmpData(page,val);

	      	},
	      	async handleCurrentChange(val) {
	      		this.pageCtr.pageCurrent = val;
				let page=val - 1
				let size=this.pageCtr.pageSize;
	            await this.getPeopleDmpData(page,size);
	        	console.log('当前页: ${val}');
	      	},
	      	async pauseDmp(id) {

	      	}
	    },
			watch: {
				'dialogObj.gender': function(val) {
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
				// 年龄
				'ruleForm.ageRange': function(val) {
					if(val == 'agenone') {
						this.DmpTargetingDTO.content.ageRange = '';
					} else {
						this.DmpTargetingDTO.content.ageRange = this.ruleForm.ageValues;
					}
				},
				// 地域
				'ruleForm.locs': function(val) {
					if(val == 'locnone') {
						this.DmpTargetingDTO.content.loc = '';
					} else {
						this.DmpTargetingDTO.content.loc = this.locationCurrentData;
					}
				},
				// 兴趣
				'ruleForm.interest': function(val) {
					if(val == 'intnone') {
						this.DmpTargetingDTO.content.interest = '';
					} else {
						this.DmpTargetingDTO.content.interest = this.interesCurrentData;
					}
				},
				// 人生状态
				'ruleForm.activeAct': function(val) {
					if(val == 'actnone') {
						this.DmpTargetingDTO.content.interest = '';
					} else {
						this.DmpTargetingDTO.content.life_status = this.lifesCurrentData;
					}
				},
				// app偏好
				'ruleForm.appLoveStr': function(val) {
					if(val == 'appnone') {
						this.DmpTargetingDTO.content.app = '';
					} else {
						this.DmpTargetingDTO.content.app = this.ruleForm.appLoveTodata || '';
					}
				},
			},
	    created(){
			this.getMediaData();
			this.getDmpdrop();
			this.getPeopleDmpData(0,10)
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.el-dialog__wrapper {
		position: absolute;
	}
	.peopleDmp .searchDiv {
	  padding: 30px;
	    padding-top: 20px;
	    .el-select .el-input {
		   width: 100px;
		}
	}
	.dmpDiv {
	    padding: 30px;
	    padding-top: 0px;
	}
	.borderLeft {
	    border-top: 5px solid #355c9d;
	}
	.row {
	    font-size: 14px;
	    line-height: 45px;
	    border-bottom: 1px dashed #eff5f7;
	}
	.row .el-col, .info .row .el-col>.item {
	    padding: 0 15px;
	    /*overflow: hidden;
	    text-overflow: ellipsis;
	    white-space: nowrap;
	    word-break: break-all;*/
	}
	.label {
	    background-color: #f8fbfc;
	    text-align: right;
	    font-weight: 500;
    }
    .el-row {
	    box-sizing: border-box;
	}
	.dialogObjSpan {
		line-height: 30px;
		font-size: 13px;
	}
	.autocompleteDiv {
		margin-top: -10px;
		width: 400px;
		margin-left: 100px;
		margin-bottom: 20px;
		.autopSpan {
			font-size: 12px;
	    line-height: 25px;
			.autopRightSpan {
				float: right;
			}
		}
		.autoContentDiv {
			border-radius: 2px;
	    border: 1px solid #ddd;
	    background: #f8f8f8;
	    list-style: none;
	    overflow: hidden;
			.contentHeaderDiv {
				// height: 35px;
		    // line-height: 35px;
		    margin: 0;
		    padding: 10px 12px;
				.headerDivBigSpan {
					display: block;
					margin: 0;
			    font-size: 12px;
			    width: 100%;
			    padding-right: 25px;
			    color: #999;
			    text-align: justify;
			    word-break: break-all;
			    white-space: normal;
					line-height: 16px;
				}
			}
			.el-scrollbar .el-scrollbar__wrap {
				max-height: 200px;
			}
			.scrollDiv {
				overflow: hidden;
		    position: relative;
				.scrollUl {
					color: #666;
			    list-style: none;
			    margin: 0;
			    padding: 0;
					position: relative;
					.scrollLi {
						font-size: 12px;
				    line-height: 1;
				    padding: 10px 35px 10px 8px;
				    position: relative;
				    text-align: justify;
						padding: 10px 11px 10px 8px!important;
						.bigP {
							display: block;
							font-size: 13px;
					    line-height: 16px;
					    margin: 0;
					    word-break: break-all;
						}
					}
				}
			}
		}

	}
</style>
