<template lang="html">
	<div class="creatADGroup">
		<el-row>
			<el-col :span='20'>
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm" label-width="120px">
					<el-form-item label="广告组名称" prop='name'>
						<el-col :xs="24" :sm="16" :md="10" :lg="6">
							<el-input v-model="ruleForm.name" style="width:300px"></el-input>
						</el-col>
					</el-form-item>
					<el-form-item label="媒体类型:" v-if='false'>
						<el-radio-group :disabled='this.isOnlyEdit' v-model="ruleForm.mediaType">
							<el-radio label='RTB'>RTB媒体</el-radio>
							<el-radio label='MEDIA_BUY'>账户媒体</el-radio>
						</el-radio-group>
					</el-form-item>
					<div v-if="ruleForm.mediaType != 'RTB'" key="buy">
						<el-row>
							<el-col :span='12'>
								<el-form-item label="账户媒体" prop="mediaBuyResourceId">
									<el-select v-model="ruleForm.mediaBuyResourceId" :disabled='this.isOnlyEdit' filterable placeholder="请选择账户媒体" style="width:300px">
										<el-option v-for="item in mediaBuyArray" :key="item.id" :label="item.name" :value="item.id">
										</el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span='12'>
								<el-form-item label="总预算" v-if='false' prop='totalBudget'>
									<el-input v-model="ruleForm.totalBudget" style="width:120px"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span='12'>
								<el-form-item label="链接模板" prop="linkTpl">
									<el-select v-model="ruleForm.linkTpl" :disabled='this.isOnlyEdit' filterable placeholder="请选择链接模板" style="width:300px">
										<el-option v-for="item in bmLinkArray" :key="item.id" :label="item.name" :value="item.id">
										</el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span='12'>
								<el-form-item label="日预算">
									<el-input v-model="ruleForm.dayBudget" style="width:120px"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
					</div>
					<div v-if="ruleForm.mediaType == 'RTB'" key='RTB'>
						<el-form-item label="媒体选择:">
							<el-radio-group v-model="ruleForm.media">
								<el-radio label='WAX'>微博WAX</el-radio>
								<el-radio label='BILIBILI' >B站</el-radio>
								<el-radio label='BAIDU_GD' disabled>百度信息流</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="DMP来源:">
							<el-radio-group v-model="choseDMP">
								<el-radio label='WAX'>微博WAX</el-radio>
								<el-radio label='GT' disabled >GT</el-radio>
							</el-radio-group>
						</el-form-item>
						<div style="margin-left: 70px;">
							<el-form-item v-if="choseDMP == 'WAX'" label="基础定向包选择:">
								<el-select v-model="waxChoseDmp.baseChoseId" clearable @change="waxDmpChangeAction('baseChoseId')" filterable placeholder="请选择定向模板" style="width:300px">
									<el-option v-for="item in waxChoseDmp.baseDmpArray" :key="item.id" :label="item.name" :value="item.id">
									</el-option>
								</el-select>
								<template>
								  <el-radio v-model="waxChoseDmp.baseChoseIdCtr" label="1" @change="waxDmpChangeAction('baseChoseId' ,'1')">合并</el-radio>
								  <el-radio v-model="waxChoseDmp.baseChoseIdCtr" label="2" @change="waxDmpChangeAction('baseChoseId' ,'2')">交叉</el-radio>
								</template>
							</el-form-item>
							<el-form-item v-if="choseDMP == 'WAX'" label="粉丝定向包选择:">
								<el-select v-model="waxChoseDmp.fansChoseId" clearable @change="waxDmpChangeAction('fansChoseId')" filterable placeholder="请选择定向模板" style="width:300px">
									<el-option v-for="item in waxChoseDmp.fansDmpArray" :key="item.id" :label="item.name" :value="item.id">
									</el-option>
								</el-select>
								<template>
								  <el-radio v-model="waxChoseDmp.fansChoseIdCtr" label="1" @change="waxDmpChangeAction('fansChoseId','1')">合并</el-radio>
								  <el-radio v-model="waxChoseDmp.fansChoseIdCtr" label="2" @change="waxDmpChangeAction('fansChoseId','2')">交叉</el-radio>
								</template>
							</el-form-item>
							<el-form-item v-if="choseDMP == 'WAX'" label="话题定向包选择:">
								<el-select v-model="waxChoseDmp.topicsChoseId" clearable @change="waxDmpChangeAction('topicsChoseId')" filterable placeholder="请选择定向模板" style="width:300px">
									<el-option v-for="item in waxChoseDmp.topicsDmpArray" :key="item.id" :label="item.name" :value="item.id">
									</el-option>
								</el-select>
								<template>
								  <el-radio v-model="waxChoseDmp.topicsChoseIdCtr" label="1" @change="waxDmpChangeAction('topicsChoseId','1')">合并</el-radio>
								  <el-radio v-model="waxChoseDmp.topicsChoseIdCtr" label="2" @change="waxDmpChangeAction('topicsChoseId','2')">交叉</el-radio>
								</template>
							</el-form-item>
							<el-form-item v-if="choseDMP == 'WAX'" label="设备定向包选择:">
								<el-select v-model="waxChoseDmp.deviceChoseId" clearable @change="waxDmpChangeAction('deviceChoseId')" filterable placeholder="请选择定向模板" style="width:300px">
									<el-option v-for="item in waxChoseDmp.deviceDmpArray" :key="item.id" :label="item.name" :value="item.id">
									</el-option>
								</el-select>
								<template>
								  <el-radio v-model="waxChoseDmp.deviceChoseIdCtr" label="1" @change="waxDmpChangeAction('deviceChoseId','1')">合并</el-radio>
								  <el-radio v-model="waxChoseDmp.deviceChoseIdCtr" label="2" @change="waxDmpChangeAction('deviceChoseId','2')">交叉</el-radio>
								  <el-radio v-model="waxChoseDmp.deviceChoseIdCtr" label="3" @change="waxDmpChangeAction('deviceChoseId','3')">排除</el-radio>
								</template>
								<p style="font-size: 12px;">预估覆盖人群数：{{waxChoseDmp.estimatesPeoples}}</p>
							</el-form-item>
							<el-form-item v-if="choseDMP == 'GT'" label="设备定向包选择:">
<!-- 								<el-select v-model="waxChoseDmp.deviceChoseId" @change='dmpChangeAction' filterable placeholder="请选择定向模板" style="width:300px">
									<el-option v-for="item in waxChoseDmp.deviceDmpArray" :key="item.id" :label="item.name" :value="item.id">
									</el-option>
								</el-select> -->
								<el-select v-model="DmpTargetingDTO.content.packageid" filterable placeholder="请选择" style="padding-bottom: 30px;width:300px">
									<el-option v-for="item in packageArray" :key="item.id" :label="item.name" :value="item.id">
									</el-option>
								</el-select>
							</el-form-item>
						</div>
<!-- 						<el-form-item label="选择定向DMP:">
							<el-select v-model="ruleForm.dmpTargetingId" @change='dmpChangeAction' filterable placeholder="请选择定向模板" style="width:300px">
								<el-option v-for="item in targetModelArray" :key="item.id" :label="item.name" :value="item.id">
								</el-option>
							</el-select>
							<el-button style="" type="primary" @click="creatNewDMPAction()">新 建</el-button>
						</el-form-item> -->
						<!-- <div v-if='dmpCanEdit' style="border: 1px solid #409EFF;border-radius:10px;box-shadow: #3a3c40 0px 0px 10px inset;"> -->
<!-- 							<el-form-item label="定向方式:">
								<el-radio-group v-model="DmpTargetingDTO.targetingType">
									<el-radio label='WAX_COMMON'>人群兴趣定向</el-radio>
									<el-radio label='WAX_PACKET'>精准人群定向</el-radio>
									<el-radio label='WAX_TOPIC'>话题定向</el-radio>
								</el-radio-group>
							</el-form-item> -->
							<!-- <div v-if="DmpTargetingDTO.targetingType == 'WAX_COMMON'" key='targetingDmp1'>
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
								<div v-if="ruleForm.locs == 'locmakeSelf'" key='locs' style="padding-bottom:30px;margin-left:100px">
									<tree-transfer ref='loc' @listenChildAction='locationTodataAction' :from_data='locationFromData' :to_data='locationToData'></tree-transfer>
								</div>
								<el-form-item label="兴趣:">
									<el-radio-group v-model="ruleForm.interest">
										<el-radio label='intnone'>不限</el-radio>
										<el-radio label='intmakeSelf'>自定义</el-radio>
									</el-radio-group>
								</el-form-item>
								<div v-if="ruleForm.interest == 'intmakeSelf'" key='interest' style="padding-bottom:30px;margin-left:100px">
									<tree-transfer ref='int' @listenChildAction='interestTodataAction' :from_data='interestFromData' :to_data='interestToData'></tree-transfer>
								</div>
								<el-form-item label="人生状态:">
									<el-radio-group v-model="ruleForm.activeAct">
										<el-radio label='actnone'>不限</el-radio>
										<el-radio label='actmakeSelf'>自定义</el-radio>
									</el-radio-group>
								</el-form-item>
								<div v-if="ruleForm.activeAct == 'actmakeSelf'" key='activeAct' style="padding-bottom:30px;margin-left:100px">
									<tree-transfer ref='life' @listenChildAction='lifeStatuseTodataAction' :from_data='lifeStatuseFromData' :to_data='lifeStatuseToData'></tree-transfer>
								</div>
								<el-form-item label="App偏好:">
									<el-radio-group v-model="ruleForm.appLoveStr">
										<el-radio label='appnone'>不限</el-radio>
										<el-radio label='appmakeSelf'>自定义</el-radio>
									</el-radio-group>
								</el-form-item>
								<div v-if="ruleForm.appLoveStr == 'appmakeSelf'" key='appLoveStr' style="padding-bottom:30px;margin-left:100px">
									<el-transfer :titles="['源列表','目标列表']" v-model="appLoveTodata" :data="appLoveFromdata"></el-transfer>
								</div>
								<el-form-item label="粉丝包:">
									<el-autocomplete
									popper-class="my-autocomplete"
									  v-model="packetListLabel"
									  :fetch-suggestions="querySearchAsync"
									  @select="handleSelect"
									  placeholder="请输入内容"
										style="width:400px">
										<template slot-scope="{ item }">
									    <div class="name">{{ item.name }}</div>
									    <span class="addr">{{ item.followersCount }}</span>
									  </template>
								</el-autocomplete>
								</el-form-item>
								<div v-if='selectedFans.followersCount > 0' class="autocompleteDiv">
									<span class="autopSpan">共<span style="color: rgb(51, 136, 255);">{{selectedFans.uidCount}}</span>个
										<span class="autopRightSpan">总粉丝数: {{selectedFans.followersCount}}</span>
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
													<li class="scrollLi" v-for='(item,index) in selectedFans.uids'>
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
							</div> -->
<!-- 							<div v-if="DmpTargetingDTO.targetingType == 'WAX_PACKET'" key='typtargetingDmp2'>
								<el-form-item label="投放方式:">
									<el-radio-group v-model="DmpTargetingDTO.content.blackPackage">
										<el-radio label='false'>指定精准人群投放</el-radio>
										<el-radio label='true'>排除精准人群投放</el-radio>
									</el-radio-group>
								</el-form-item>
								<el-form-item label="人群包类型:">
									<el-radio-group v-model="DmpTargetingDTO.content.type">
										<el-radio label='DEVICE'>设备ID</el-radio>
										<el-radio label='PHONE'>电话号码</el-radio>
									</el-radio-group>
								</el-form-item>
								<el-select v-model="DmpTargetingDTO.content.packageid" filterable placeholder="请选择" style="padding-left: 100px;padding-bottom: 30px;width:300px">
									<el-option v-for="item in packageArray" :key="item.id" :label="item.name" :value="item.id">
									</el-option>
								</el-select>
							</div> -->
							<!-- <div v-if="DmpTargetingDTO.targetingType == 'WAX_TOPIC'" key='typtargetingDmp3'> -->
<!-- 								<el-form-item label="年龄:">
									<el-radio-group v-model="ruleForm.ageRange">
										<el-radio label='agenone'>不限</el-radio>
										<el-radio label='agemakeSelf'>自定义</el-radio>
									</el-radio-group>
								</el-form-item> -->
	<!-- 							<div v-if="ruleForm.ageRange == 'agemakeSelf'">
									<el-row>
										<el-col :span='2'>
											&emsp;
										</el-col>
										<el-col :span='10'>
											<el-slider v-model="ruleForm.ageValues" range show-stops>
											</el-slider>
										</el-col>
									</el-row>
								</div> -->
		<!-- 						<el-form-item label="性别:">
									<el-checkbox-group v-model="DmpTargetingDTO.content.gender">
										<el-checkbox label="401">男</el-checkbox>
										<el-checkbox label="402">女</el-checkbox>
									</el-checkbox-group>
								</el-form-item> -->
	<!-- 							<el-form-item label="地域:">
									<el-radio-group v-model="ruleForm.locs">
										<el-radio label='locnone'>不限</el-radio>
										<el-radio label='locmakeSelf'>自定义</el-radio>
									</el-radio-group>
								</el-form-item> -->
<!-- 								<div v-if="ruleForm.locs == 'locmakeSelf'" key='locs' style="padding-bottom:30px;margin-left:100px">
									<tree-transfer ref='loc' @listenChildAction='locationTodataAction' :from_data='locationFromData' :to_data='locationToData'></tree-transfer>
								</div> -->
		<!-- 						<el-form-item class="form-group" prop="topic" label="指定话题：" key="topic">
									<el-col :xs="24" :sm="16" :md="10" :lg="6">
										<el-select v-model="ruleForm.topic" placeholder="请选择话题，最多100个" multiple filterable default-first-option remote :remote-method="searchTopicMethod" :loading="topicloading" :multiple-limit="maxTopicNum">
											<el-option class="searchSelect" v-for="(item,index) in searchTopicSelect" :key="item.title" :label="item.title" :value="item.title">
												<div>
													<p>{{++index}}.#{{item.title}}#</p>
													<p>实际参与人数{{item.attendance}}</p>
													<p>预估覆盖人群数{{item.coverage}}</p>
												</div>
											</el-option>
										</el-select>
									</el-col>
									<el-tooltip class="item" effect="dark" content="若选定的话题未被检索到，则可能是<br/>该话题不存在或已过期或已被禁止" placement="right">
										<i class="el-icon-warning" style="font-size:16px"></i>
									</el-tooltip>
									<el-col :span="24" v-if="ruleForm.topic.length>0">
										<el-col :span="24">已选择：<span class="color-blue"> {{ruleForm.topic.length}} </span>个
										</el-col>
										<el-col :xs="24" :sm="16" :md="10" :lg="6">
											<div class="selectTopic border">
												<div v-for="item in selectTopicList">
													<i class="el-icon-close" @click="removeTopic(item.title)"></i>
													<p>#{{item.title}}#</p>
													<p>实际参与人数{{item.attendance}}</p>
													<p>预估覆盖人群数{{item.coverage}}</p>
												</div>
											</div>
											<div class="topic_footer">
												<el-button type="text" @click="clearTopic">清除所有</el-button>
											</div>
											<div class="border">实际参与人数：{{selectTopicAttendanceNum}}</div>
											<div class="border">预估覆盖人数：{{selectTopicCoverageNum}}</div>
										</el-col>
									</el-col>
								</el-form-item> -->
							<!-- </div> -->

			<!-- 				<el-form-item label='' v-if='dmpIsNewCreat' label-width="50px">
								<el-input v-model="DmpTargetingDTO.name" style="width:300px" placeholder='输入模板名称以保存'></el-input>
								<el-button style="" type="primary" @click="dmpSaveAction()">保 存</el-button>
							</el-form-item> -->
						<!-- </div> -->

						<el-form-item label="手机系统:">
							<el-radio-group v-model="ruleForm.mexTargeting.targetOs">
								<el-radio label='ALL'>不限</el-radio>
								<el-radio label='IOS'>iOS</el-radio>
								<el-radio label='ANDROID'>安卓</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="手机品牌:">
							<el-radio-group v-model="ruleForm.iphoneType">
								<el-radio label='iphnone'>不限</el-radio>
								<el-radio label='iphmakeSelf'>自定义</el-radio>
							</el-radio-group>
						</el-form-item>
						<div v-if="ruleForm.iphoneType == 'iphmakeSelf'" key='iphoneType' style="padding-bottom:30px;margin-left:100px">
							<el-transfer :titles="['源列表','目标列表']" v-model="phoneTypeToData" :data="phoneTypeFromData"></el-transfer>
						</div>
						<el-form-item label="网络环境:">
							<el-radio-group v-model="ruleForm.mexTargeting.targetConnType">
								<el-radio label='ALL'>不限</el-radio>
								<el-radio label='WIFI'>wifi</el-radio>
								<el-radio label='CELL_2G'>2G</el-radio>
								<el-radio label='CELL_3G'>3G</el-radio>
								<el-radio label='CELL_4G'>4G</el-radio>
							</el-radio-group>
						</el-form-item>

						<el-form-item label="起止时间" prop="date">
							<el-date-picker v-model="ruleForm.date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd">
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
						<el-form-item label="消耗模式:">
							<el-radio-group v-model="ruleForm.throwSpeedType">
								<el-radio label='CONSTANT'>均匀消耗</el-radio>
								<el-radio label='ACCELERATE'>加速消耗</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="出价方式:">
							<el-radio-group v-model="ruleForm.bidType">
								<el-radio label='CPM'>CPM</el-radio>
								<el-radio label='CPC'>CPC</el-radio>
								<el-radio label='PDB'>PDB</el-radio>
								<el-radio label='OCPC'>OCPC</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="出价" prop="bidPrice">
							<el-input v-model="ruleForm.bidPrice" style="width:150px"></el-input>
						</el-form-item>
						<el-form-item label="总预算" v-if='false' prop="totalBudget">
							<el-input v-model="ruleForm.totalBudget" style="width:150px"></el-input>
						</el-form-item>
						<el-form-item label="日预算">
							<el-input v-model="ruleForm.dayBudget" style="width:150px"></el-input>
						</el-form-item>
					</div>

					<el-form-item style="padding-top:50px" v-if='!isEditBool || isNewCreat'>
						<el-button type="primary" @click="backAction()">取&emsp;消</el-button>
						<el-button type="primary" @click="submitForm('ruleForm')">下一步</el-button>
					</el-form-item>
					<el-form-item style="padding-top:50px" v-if='isEditBool && !isNewCreat'>
						<el-button type="primary" @click="backAction()">取&emsp;消</el-button>
						<el-button type="primary" @click="submitForm('ruleForm')">提&emsp;交</el-button>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import schDatePicker from "../../common/schedule.vue";
	import treeTransfer from "../../common/transfer-extend"
	// import treeTransfer from 'el-tree-transfer'
	export default {
		components: {
			treeTransfer,
			schDatePicker
		}, // 注册
		data() {
			return {
				timeChangeCtr:{
					periodTime: 'all',
					times: [],
				},
				waxChoseDmp:{
					baseInfomation:{},
					baseDmpArray: [],
					deviceDmpArray: [],
					topicsDmpArray: [],
					fansDmpArray: [],
					baseChoseId: '',
					baseChoseIdCtr: '2',
					deviceChoseId: '',
					deviceChoseIdCtr: '2',
					topicsChoseId: '',
					topicsChoseIdCtr: '2',
					fansChoseId: '',
					fansChoseIdCtr: '2',
					estimatesPeoples: 0
				},
				radio2: 3,
				isOnlyEdit: false,
				isEditBool: false,
				isNewCreat: false,
				canWatch: false,
				targetModel: '',
				targetModelArray: [
					// {name:'UC定向',id:1},
					// {name:'微博定向',id:2},
					// {name:'微博Banner定向',id:3},
				],
				choseDMP: 'WAX',
				dmpIsNewCreat: false,
				dmpCanEdit: false,
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
				// dmp some字段
				dmpsomeParams: {},
				// app偏好
				appLoveTodata: [],
				appLoveFromdata: [],
				// 手机品牌
				phoneTypeFromData: [],
				phoneTypeToData: [],
				// 人群包数组
				packageArray: [],
				// 账户媒体列表
				mediaBuyArray: [],
				// 模板链接
				bmLinkArray: [],
				// 话题
				searchTopicSelect: [],
				/*话题搜索*/
				topicloading: false,
				selectTopicList: [],//选择的话题列表
				/*话题最多选择数*/
				maxTopicNum: 100,
				selectTopicAttendanceNum: 0, /*实际参与人数*/
        		selectTopicCoverageNum: 0, /*预估覆盖人数*/
				packetListLabel: '', // 存储选中粉丝
				selectedFans:{}, // 选中的粉丝包
				fromData: [
					// {'id':'1','pid':0,'label':'华南','children':[
					// 	{
					// 		'id':'1-1','pid':'1','label':'海南','children':[
					// 			{'id':'1-1-1','pid':'1-1','label':'三亚','children':[]}
					// 		]
					// 	}
					// ]}
				], // 穿梭框 - 源数据 - 树形
				allTimes: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
				advertiserId: localStorage.getItem("GTadvertiserId"),
				campaignId: localStorage.getItem("GTcampaignId"),
				productId: localStorage.getItem("GTproductId"),
				DmpTargetingDTO: {
					targetingType:'WAX_COMMON',// 定向类型 = ['WAX_COMMON', 'WAX_PACKET', 'WAX_TOPIC', 'WAX_BLOG'],
					dmpType:'WAX',// dmp类型 = ['WAX'],
					name: '',// 话题名称
					content: {
						blackPackage: 'false',
						gender: [],
						app_category_list: [], // app偏好
						life_status: [], // 人生状态
						packageid: '', // 人群包id
						type: 'DEVICE',
						ageRange: [], // 年龄
						loc: [], // 地域
						interest: [], // 兴趣
						topic: '', /*指定话题*/
						topicLabel: '',
						packetList: [], //粉丝包
					}
				},
				ruleForm: {
					date: '', //时间
					beginDate: '', // 开始时间
					endDate: '', // 结束时间
					name: '', // 广告组名称
					mediaType: 'RTB', //媒体类型 = ['RTB', 'MEDIA_BUY'],
					media: 'WAX', //媒体 = ['NONE', 'WAX', 'BAIDU_GD'],
					mediaBuyResourceId: '', // 账户媒体
					totalBudget: '', // 总预算
					dayBudget: '', //日预算
					dmpTargetingId: '', //定向ID
					linkTpl: '', //链接模板
					ageRange: 'agenone', // 存储年龄
					ageValues: [], // 年龄数组
					locs: 'locnone', // 存储地域
					locsValues: [], // 存储数组
					interest: 'intnone', // 存储兴趣
					interestValues: [], // 存储兴趣数组
					activeAct: 'actnone', // 存储行为属性
					appLoveStr: 'appnone', // 存储App偏好
					iphoneType: 'iphnone', // 存储行为属性
					periodTime: 'pernone', // 投放时段
					targetingTime: [], //存储选择时间
					throwSpeedType: 'CONSTANT', // 消耗模式（均匀消耗，加速消耗）
					mexTargeting: {
						targetOs: 'ALL', //操作系统 = ['IOS', 'ANDROID', 'ALL'],
						brand: [], // 手机品牌
						targetConnType: 'ALL', //网络类型 = ['All', 'WIFI', 'CELL_2G', 'CELL_3G', 'CELL_4G'],
					},
					topic: [], /*指定话题*/
					bidType: 'CPM', // 出价方式 = ['CPM', 'CPC', 'PDB', 'OCPC'],
					bidPrice: '', // 出价
					totalBudget: '', // 总预算
					targetingDmp: {
						// targetingType: 'COMMON', // 定向类型 = ['COMMON', 'PACKET', 'TOPIC', 'BLOG'],
						// type: '1', // 定向类型(1,2)
						// targetOs: 'ALL', //操作系统 = ['IOS', 'ANDROID', 'ALL'],
						// brand: [], // 手机品牌
						// targetConnType: 'ALL', //网络类型 = ['All', 'WIFI', 'CELL_2G', 'CELL_3G', 'CELL_4G'],
						// content: {
						// 	blackPackage: 'false',
						// 	gender: [],
						// 	app: [], // app偏好
						// 	life_status: [], // 人生状态
						// 	packageid: '', // 人群包id
						// 	type: 'DEVICE',
						// 	age: [], // 年龄
						// 	loc: [], // 地域
						// 	interest: [], // 兴趣
						// }
					}
				},
				rules: {
					topic: [{
						required: true,
						message: '请填写指定话题',
						trigger: 'blur'
					}],
					name: [{
						required: true,
						message: '请输入活动名称',
						trigger: 'blur'
					}],
					mediaBuyResourceId: [{
						required: true,
						message: '请输入账户媒体名称查询',
						trigger: 'blur'
					}],
					// totalBudget: [{
					// 	required: true,
					// 	message: '请输入总预算',
					// 	trigger: 'blur'
					// }, ],
					linkTpl: [{
						required: true,
						message: '请输入链接模板',
						trigger: 'blur'
					}, ],
					date: [{
						required: true,
						message: '请选择时间',
						trigger: 'blur'
					}, ],
					bidPrice: [{
						required: true,
						message: '请填写出价',
						trigger: 'blur'
					}, ],
					// totalBudget: [{
					// 	required: true,
					// 	message: '请填总预算',
					// 	trigger: 'blur'
					// }, ],
				},
			};
		},
		mounted() {
			var v = this;
			this.$store.commit('changeTitleName', '创建广告组');
			if(this.$route.query.value == 'new') {
				this.isNewCreat = true;
				this.$store.commit('changeTitleName', '新建广告组');
			} else if(this.$route.query.value == 'edit') {
				this.isOnlyEdit = true;
				this.$store.commit('changeTitleName', '编辑广告组');
			} else if(this.$route.query.value == 'copy') {
				this.$store.commit('changeTitleName', '复制广告组');
			}
			this.ruleForm.mediaType = localStorage.getItem("GTmediaType");
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
				v.phoneTypeFromData = v.elTranData(JSON.parse(r.brand['ALL']));
				v.dmpsomeParams = r;
				v.dmpsomeParams['ALL'] = v.elTranData(JSON.parse(r.brand['ALL']));
				v.dmpsomeParams['ANDROID'] = v.elTranData(JSON.parse(r.brand['ANDROID']));
				v.dmpsomeParams['IOS'] = v.elTranData(JSON.parse(r.brand['IOS']));
			})
			// 人群包类型
			this.$api.get(this.allurlsList.crowPackLinkage, {
				type: this.DmpTargetingDTO.content.type
			}, function(r) {
				console.log('------', r);
				v.packageArray = r;
			})
			// DMP定向列表
			v.$api.get(v.allurlsList.dmpTargetings+'?size=999', '', function(r) {
				debugger
				for (var i = 0; i < r.content.length; i++) {
					r.content[i].content = JSON.parse(r.content[i].content);
				}
				console.log(r);
				v.targetModelArray = r.content;
				v.waxChoseDmp.baseDmpArray = v.targetModelArray.filter((item)=>{
					v.waxChoseDmp.baseInfomation[item.id] = item;
					return -1 != item.name.indexOf('基础-');
				});
				v.waxChoseDmp.deviceDmpArray = v.targetModelArray.filter((item)=>{return -1 != item.name.indexOf('设备-')});
				v.waxChoseDmp.topicsDmpArray = v.targetModelArray.filter((item)=>{return -1 != item.name.indexOf('话题-')});
				v.waxChoseDmp.fansDmpArray = v.targetModelArray.filter((item)=>{return -1 != item.name.indexOf('粉丝-')});
			})
			// 账户媒体列表
			this.$api.get(this.allurlsList.mediaBuyDropdown, '', function(r) {
				console.log('------', r);
				v.mediaBuyArray = r;
				if(v.$route.query.id != undefined) {
					v.$store.commit('clearState');
					console.log(v.$route.query.id);
					v.isEditBool = true;
					if(v.$route.query.value == 'new') {
						new Promise(function(resolve, reject) {
							v.$api.get(v.allurlsList.creatCampaigns + '/' + v.$route.query.id, '', function(r) {
								v.advertiserId = r.advertiser.id;
								v.campaignId = r.id;
								v.productId = r.product.id;
								v.ruleForm.mediaType = r.mediaType;
								if(r.mediaBuyResource != null) {
									v.ruleForm.mediaBuyResourceId = r.mediaBuyResource.id;
								}
								resolve(r);
							})
						}).then(function(result) {
							v.canWatch = true;
						});
						return;
					}
					new Promise(function(resolve, reject) {
						v.$api.get(v.allurlsList.creatADGroupUrl + '/' + v.$route.query.id, '', function(r) {
							console.log('-----', r);
							// v.ruleForm = r;
							v.ruleForm.name = r.name;
							if(v.$route.query.value == 'copy') {
								v.ruleForm.name += '(复制)';
							}
							v.ruleForm.mediaType = r.mediaType;
							v.ruleForm.media = r.media;
							v.ruleForm.totalBudget = r.totalBudget;
							v.ruleForm.dayBudget = r.dayBudget;
							v.ruleForm.linkTpl = r.linkTpl;
							v.ruleForm.bidType = r.bidType;
							v.ruleForm.bidPrice = r.bidPrice;
							v.ruleForm.mexTargeting = r.mexTargeting;
							v.ruleForm.throwSpeedType = r.throwSpeedType;
							v.ruleForm.targetingTime = r.targetingTime;
							v.timeChangeCtr.times = (r.targetingTime||[]).map((item)=>{return item.split('-')[0]+item.split('-')[1]});
							if(v.timeChangeCtr.times.length > 0){
								v.timeChangeCtr.periodTime = 'select';
							}else{
								v.timeChangeCtr.periodTime = 'all';
							}
							if (r.dmpTargeting != null) {
								if(r.dmpTargeting.commonRuleId) v.waxChoseDmp.baseChoseId = r.dmpTargeting.commonRuleId;
								if(r.dmpTargeting.packetRuleId) v.waxChoseDmp.deviceChoseId = r.dmpTargeting.packetRuleId;
								if(r.dmpTargeting.topicRuleId) v.waxChoseDmp.topicsChoseId = r.dmpTargeting.topicRuleId;
								if(r.dmpTargeting.fansRuleId) v.waxChoseDmp.fansChoseId = r.dmpTargeting.fansRuleId;
								var	arr = [r.dmpTargeting.commonRuleLogic,
									r.dmpTargeting.fansRuleLogic,
									r.dmpTargeting.topicRuleLogic,
									r.dmpTargeting.packetRuleLogic
								];
								var formArray = []
								for (var i = 0; i < arr.length; i++) {
									if (arr[i] == 'OR') {
										formArray[i] = '1';
									} else if (arr[i] == 'AND') {
										formArray[i] = '2';
									} else if (arr[i] == 'EXCLUDE') {
										formArray[i] = '3';
									} else {
										formArray[i] = '2';
									}
								}
								v.waxChoseDmp.baseChoseIdCtr = formArray[0];
								v.waxChoseDmp.fansChoseIdCtr = formArray[1];
								v.waxChoseDmp.topicsChoseIdCtr = formArray[2];
								v.waxChoseDmp.deviceChoseIdCtr = formArray[3];

								// v.ruleForm.dmpTargetingId = r.dmpTargeting.id;
								// v.dmpChangeAction(r.dmpTargeting.id);
								// r.dmpTargeting.content = JSON.parse(r.dmpTargeting.content);
								// v.ruleForm.topic = r.dmpTargeting.content.topic;
								// var obj = r.dmpTargeting.content;
								// if (obj.packetList != undefined && obj.packetList.length > 0) {
								// 	v.$api.get(v.allurlsList.getFans + '/' + obj.packetList[0], '', function(r) {
								// 		v.packetListLabel = r.name;
								// 		v.selectedFans = r;
								// 	})
								// }
								// v.DmpTargetingDTO = r.dmpTargeting;
								// if (obj.topicLabel != undefined) {
								// 	v.selectTopicList=JSON.parse(obj.topicLabel);
	       //          for(var i=0; i<v.selectTopicList.length; i++){
	       //              v.selectTopicAttendanceNum+=parseInt(v.selectTopicList[i].attendance);
	       //              v.selectTopicCoverageNum+=parseInt(v.selectTopicList[i].coverage);
	       //          }
								// }
							}
							if(r.mexTargeting== null||r.mexTargeting.brand==null&&r.mexTargeting.brand.length == 0) {
								v.ruleForm.iphoneType = 'iphnone';
							} else {
								v.ruleForm.iphoneType = 'iphmakeSelf';
								var arr = [];
								for(var i = 0; i < r.mexTargeting.brand.length; i++) {
									arr[i] = parseInt(r.mexTargeting.brand[i])
								}
								v.phoneTypeToData = arr;
							}
							if(r.beginDate != null && r.endDate != null) {
								v.ruleForm.beginDate = r.beginDate;
								v.ruleForm.endDate = r.endDate;
								v.ruleForm.date = [r.beginDate, r.endDate];
							}
							// if(r.targetingTime.length == 0) {
							// 	v.ruleForm.periodTime = 'pernone';
							// } else {
							// 	v.ruleForm.periodTime = 'permakeSelf';
							// 	v.targetingTime = r.targetingTime;
							// }

							v.advertiserId = r.advertiser.id;
							v.campaignId = r.campaign.id;
							v.productId = r.product.id;
							if(r.mediaBuyResource != null) {
								v.ruleForm.mediaBuyResourceId = r.mediaBuyResource.id;
							}
							resolve(r);
						})
					}).then(function(result) {
						if(v.ruleForm.mediaBuyResourceId != '') {
							v.$api.get(v.allurlsList.mediaResource, {
								id: v.ruleForm.mediaBuyResourceId
							}, function(r) {
								v.bmLinkArray = r;
							});
						}
						v.canWatch = true;
					});
				} else {
					v.canWatch = true;
				}
			})
		},
		watch: {
			'ruleForm.media': function(val){
				console.log('val.', val);
				if('BILIBILI' == val){
					this.choseDMP = 'GT';
				}
			},
			'ruleForm.mediaBuyResourceId': function(val) {
				if(!this.canWatch || val == '') {
					return;
				}
				// 账户媒体列表
				var v = this;
				this.$api.get(this.allurlsList.mediaResource, {
					id: val
				}, function(r) {
					console.log('------', r);
					v.bmLinkArray = r;
				})
			},
			'ruleForm.date': function(val) {
				if(!this.canWatch) {
					return;
				}
				console.log(val);
				this.ruleForm.beginDate = val[0];
				this.ruleForm.endDate = val[1];
			},
			'DmpTargetingDTO.content.type': function(val) {
				if(!this.canWatch) {
					return;
				}
				console.log('+++++', val);
				this.DmpTargetingDTO.content.packageid = '';
				var v = this;
				this.$api.get(this.allurlsList.crowPackLinkage, {
					type: val
				}, function(r) {
					v.packageArray = r;
				})
			},
			'ruleForm.mexTargeting.targetOs': function(val) {
				if(!this.canWatch) {
					return;
				}
				console.log(val);
				this.phoneTypeToData = [];
				this.phoneTypeFromData = this.dmpsomeParams[val];
			},
			'ruleForm.mediaType': function(val) {
				if(!this.canWatch) {
					return;
				}
				this.locationToData = [];
				this.locationCurrentData = [];
				this.interestToData = [];
				this.interesCurrentData = [];
				this.lifeStatuseToData = [];
				this.lifesCurrentData = [];
				this.appLoveTodata = [];
				this.phoneTypeToData = [];
				this.resourceInit(this.adGroupMedia);

			},
			'ruleForm.targetingDmp.type': function(val) {
				if(!this.canWatch) {
					return;
				}
				this.locationToData = [];
				this.locationCurrentData = [];
				this.interestToData = [];
				this.interesCurrentData = [];
				this.lifeStatuseToData = [];
				this.lifesCurrentData = [];
				this.appLoveTodata = [];
				this.phoneTypeToData = [];
				this.resourceInit(this.adGroupType);
			},
			// // 年龄
			// 'ruleForm.ageRange': function(val) {
			// 	if(!this.canWatch) {
			// 		return;
			// 	}
			// 	if(val == 'agenone') {
			// 		this.DmpTargetingDTO.content.ageRange = '';
			// 	} else {
			// 		this.DmpTargetingDTO.content.ageRange = this.ruleForm.ageValues;
			// 	}
			// },
			// // 地域
			// 'ruleForm.locs': function(val) {
			// 	if(!this.canWatch) {
			// 		return;
			// 	}
			// 	if(val == 'locnone') {
			// 		this.DmpTargetingDTO.content.loc = '';
			// 	} else {
			// 		this.DmpTargetingDTO.content.loc = this.locationCurrentData;
			// 	}
			// },
			// // 兴趣
			// 'ruleForm.interest': function(val) {
			// 	if(!this.canWatch) {
			// 		return;
			// 	}
			// 	if(val == 'intnone') {
			// 		this.DmpTargetingDTO.content.interest = '';
			// 	} else {
			// 		this.DmpTargetingDTO.content.interest = this.interesCurrentData;
			// 	}
			// },
			// // 人生状态
			// 'ruleForm.activeAct': function(val) {
			// 	if(!this.canWatch) {
			// 		return;
			// 	}
			// 	if(val == 'actnone') {
			// 		this.DmpTargetingDTO.content.interest = '';
			// 	} else {
			// 		this.DmpTargetingDTO.content.life_status = this.lifesCurrentData;
			// 	}
			// },
			// // app偏好
			// 'ruleForm.appLoveStr': function(val) {
			// 	if(!this.canWatch) {
			// 		return;
			// 	}
			// 	if(val == 'appnone') {
			// 		this.DmpTargetingDTO.content.app_category_list = '';
			// 	} else {
			// 		this.DmpTargetingDTO.content.app_category_list = this.ruleForm.appLoveTodata || '';
			// 	}
			// },
			// 手机品牌
			'ruleForm.iphoneType': function(val) {
				if(!this.canWatch) {
					return;
				}
				if(val == 'iphnone') {
					this.ruleForm.mexTargeting.brand = '';
				} else {
					this.ruleForm.mexTargeting.brand = this.ruleForm.phoneTypeToData || '';
				}
			},
			// 'DmpTargetingDTO.targetingType': function(val) {
			// 	if(!this.canWatch) {
			// 		return;
			// 	}
			// 	let obj = JSON.parse(JSON.stringify(this.dmpTargeting));
			// 	this.DmpTargetingDTO = Object.assign({},this.DmpTargetingDTO, obj);
			// 	this.locationToData = [];
			// 	this.locationCurrentData = [];
			// 	this.interestToData = [];
			// 	this.interesCurrentData = [];
			// 	this.lifeStatuseToData = [];
			// 	this.lifesCurrentData = [];
			// 	this.appLoveTodata = [];
			// 	this.phoneTypeToData = [];
			// 	this.selectTopicList = [];
			// 	this.ruleForm.topic = [];

			// 	this.ruleForm.ageRange = 'agenone';
			// 	this.ruleForm.locs = 'locnone';
			// 	this.ruleForm.activeAct = 'actnone';
			// 	this.ruleForm.interest = 'intnone';
			// 	this.ruleForm.appLoveStr = 'appnone';
			// },
			// 'ruleForm.topic': function(val, oval) {
			// 	if(!this.canWatch) {
			// 		return;
			// 	}
			// 	if (val == undefined) {
			// 		return ;
			// 	}
			// 	if(val.length > oval.length) { /*添加元素*/
			// 		for(var i = 0; i < this.searchTopicSelect.length; i++) {
			// 			if(this.searchTopicSelect[i].title == val[val.length - 1]) {
			// 				this.selectTopicList.push(this.searchTopicSelect[i]);
			// 				this.selectTopicAttendanceNum += parseInt(this.searchTopicSelect[i].attendance);
			// 				this.selectTopicCoverageNum += parseInt(this.searchTopicSelect[i].coverage);
			// 				break;
			// 			}
			// 		}
			// 	} else { /*删除元素*/
			// 		for(var i = 0; i < this.selectTopicList.length; i++) {
			// 			if(val.indexOf(this.selectTopicList[i].title) == -1) {
			// 				this.selectTopicAttendanceNum += parseInt(this.selectTopicList[i].attendance);
			// 				this.selectTopicCoverageNum += parseInt(this.selectTopicList[i].coverage);
			// 				this.selectTopicList.splice(i, 1);
			// 			}
			// 		}
			// 	}
			// }
		},
		methods: {
			updateScheduleType(t){
                this.timeChangeCtr.periodTime = t;
            },

			updateScheduleInfo(i){
                this.timeChangeCtr.times = i || [];
            },

			creatNewDMPAction() {
				this.dmpIsNewCreat = true;
				this.dmpCanEdit = true;
			},
			removeArrayItem(currentArr, valueArray) {
				for (var i = 0; i < currentArr.length; i++) {
					var str = currentArr[i];
					if (this.waxChoseDmp[str] == '') {
						valueArray.splice(i,1);
						currentArr.splice(i,1);
						this.removeArrayItem(currentArr, valueArray);
						return;
					}
				}
			},
			waxDmpChangeAction(idname, operate){
				this.waxChoseDmp.estimatesPeoples = 0;
				var baseEstimatesPeoples = 0,fansEstimatesPeoples = 0,topicEstimatesPeoples = 0,deviceEstimatesPeoples = 0;
				if (this.waxChoseDmp.baseChoseId) {
					baseEstimatesPeoples = this.waxChoseDmp.baseInfomation[this.waxChoseDmp.baseChoseId].coverage || 0;
				}
				if (this.waxChoseDmp.fansChoseId) {
					fansEstimatesPeoples = this.waxChoseDmp.baseInfomation[this.waxChoseDmp.fansChoseId].coverage || 0;
				}
				if (this.waxChoseDmp.topicsChoseId) {
					topicEstimatesPeoples = this.waxChoseDmp.baseInfomation[this.waxChoseDmp.topicsChoseId].coverage || 0;
				}
				if (this.waxChoseDmp.deviceChoseId) {
					deviceEstimatesPeoples = this.waxChoseDmp.baseInfomation[this.waxChoseDmp.deviceChoseId].coverage || 0;
				}
				var arr = [],valueArray = [];
				if('3' == this.waxChoseDmp.deviceChoseIdCtr){
					arr = [this.waxChoseDmp.baseChoseIdCtr,
						this.waxChoseDmp.fansChoseIdCtr,
						this.waxChoseDmp.topicsChoseIdCtr
					];
					valueArray = [baseEstimatesPeoples,fansEstimatesPeoples,topicEstimatesPeoples];
					var currentArr = ['baseChoseId','fansChoseId','topicsChoseId'];
					this.removeArrayItem(currentArr, valueArray)
				} else {
					arr = [this.waxChoseDmp.baseChoseIdCtr,
						this.waxChoseDmp.fansChoseIdCtr,
						this.waxChoseDmp.topicsChoseIdCtr,
						this.waxChoseDmp.deviceChoseIdCtr
					];
					valueArray = [baseEstimatesPeoples,fansEstimatesPeoples,topicEstimatesPeoples,deviceEstimatesPeoples];
					var currentArr = ['baseChoseId','fansChoseId','topicsChoseId','deviceChoseId'];
					this.removeArrayItem(currentArr, valueArray)
				}
				arr.sort();
				if (arr[arr.length-1] == '1') {
					for (var i = 0; i < valueArray.length; i++) {
					 this.waxChoseDmp.estimatesPeoples +=	valueArray[i];
					}
				} else if (arr[arr.length-1] == '2') {
					for (var i = 0; i < valueArray.length; i++) {
						for (var j = 0; j < valueArray.length - 1 - i; j++) {
							var temp = 0;
							if (valueArray[j] > valueArray[j+1]) {
								temp = valueArray[j];
								valueArray[j] = valueArray[j+1];
								valueArray[j+1] = temp;
							}
						}
					}
					this.waxChoseDmp.estimatesPeoples = valueArray[0];
				}
				// if(!operate){
				// 	this.waxChoseDmp.estimatesPeoples += this.waxChoseDmp.baseInfomation[''+this.waxChoseDmp[idname]].coverage || 0;
				// }else{
				// 	if('1' == operate){
				// 		this.waxChoseDmp.estimatesPeoples += this.waxChoseDmp.baseInfomation[''+this.waxChoseDmp[idname]].coverage || 0;
				// 	}
				// 	if('2' == operate){
				// 		let nownum = (this.waxChoseDmp.baseInfomation[''+this.waxChoseDmp[idname]].coverage || 0);
				// 		this.waxChoseDmp.estimatesPeoples = this.waxChoseDmp.estimatesPeoples > nownum ? nownum:(this.waxChoseDmp.estimatesPeoples);
				// 	}
				// 	if('3' == operate){
				// 		let nownum = (this.waxChoseDmp.baseInfomation[''+this.waxChoseDmp[idname]].coverage || 0);
				// 		this.waxChoseDmp.estimatesPeoples = this.waxChoseDmp.estimatesPeoples>nownum?(this.waxChoseDmp.estimatesPeoples-nownum) : 0;
				// 	}
				// }
			},

			dmpChangeAction(val) {
				// console.log('val', val, this.waxChoseDmp.baseInfomation);
				// let operate =
				// this.dmpIsNewCreat = false;
				// var v = this;
				// v.$api.get(v.allurlsList.dmpTargetings+'/'+val, '', function(r) {
				// 	v.dmpCanEdit = true;
				// 	v.DmpTargetingDTO.targetingType = r.targetingType;
				// 	v.DmpTargetingDTO.dmpType = r.dmpType;
				// 	v.DmpTargetingDTO.name = r.name;
				// 	v.DmpTargetingDTO.content = JSON.parse(r.content);
				// 	var obj = v.DmpTargetingDTO.content;
				// 	console.log(obj);
				// 	if (obj.packetList != undefined && obj.packetList.length > 0) {
				// 		v.$api.get(v.allurlsList.getFans + '/' + obj.packetList[0], '', function(r) {
				// 			v.packetListLabel = r.name;
				// 			v.selectedFans = r;
				// 		})
				// 	}
				// 	if(obj.ageRange.length == 0) {
				// 		v.ruleForm.ageRange = 'agenone';
				// 	} else {
				// 		v.ruleForm.ageRange = 'agemakeSelf';
				// 		v.ruleForm.ageValues = obj.ageRange;
				// 	}
				// 	if(obj.loc == undefined || obj.loc.length == 0) {
				// 		v.ruleForm.locs = 'locnone';
				// 	} else {
				// 		v.ruleForm.locs = 'locmakeSelf';
				// 		v.locationToData = JSON.parse(obj.locLabel);
				// 		v.$nextTick(() => {
				// 			v.$refs.loc.deletInitData();
				// 		});
				// 		v.locationCurrentData = v.getTreeDataValue(v.locationToData);
				// 	}
				// 	if(obj.interest == undefined || obj.interest.length == 0) {
				// 		v.ruleForm.interest = 'intnone';
				// 	} else {
				// 		v.ruleForm.interest = 'intmakeSelf';
				// 		v.interestToData = JSON.parse(obj.interestLabel);
				// 		v.$nextTick(() => {
				// 			v.$refs.int.deletInitData();
				// 		});
				// 		v.interesCurrentData = v.getTreeDataValue(v.interestToData);
				// 	}
				// 	if(obj.life_status == undefined || obj.life_status.length == 0) {
				// 		v.ruleForm.activeAct = 'actnone';
				// 	} else {
				// 		v.ruleForm.activeAct = 'actmakeSelf';
				// 		v.lifeStatuseToData = JSON.parse(obj.lifeStatusLabel);
				// 		v.$nextTick(() => {
				// 			v.$refs.life.deletInitData();
				// 		});
				// 		v.lifesCurrentData = v.getTreeDataValue(v.lifeStatuseToData);
				// 	}
				// 	if(obj.app == undefined || obj.app.length == 0) {
				// 		v.ruleForm.appLoveStr = 'appnone';
				// 	} else {
				// 		v.ruleForm.appLoveStr = 'appmakeSelf';
				// 		v.appLoveTodata = obj.app;
				// 	}
				// })
			},
			dmpSaveAction() {
				// var v = this;
				// if(v.ruleForm.ageRange == 'agenone') {
				// 	v.DmpTargetingDTO.content.ageRange = [];
				// } else {
				// 	v.DmpTargetingDTO.content.ageRange = v.ruleForm.ageValues;
				// }
				// if(v.ruleForm.locs == 'locnone') {
				// 	v.DmpTargetingDTO.content.loc = [];
				// } else {
				// 	v.DmpTargetingDTO.content.loc = v.locationCurrentData;
				// }
				// if(v.ruleForm.interest == 'intnone') {
				// 	v.DmpTargetingDTO.content.interest = [];
				// } else {
				// 	v.DmpTargetingDTO.content.interest = v.interesCurrentData;
				// }
				// if(v.ruleForm.activeAct == 'actnone') {
				// 	v.DmpTargetingDTO.content.life_status = [];
				// } else {
				// 	v.DmpTargetingDTO.content.life_status = v.lifesCurrentData;
				// }
				// if(v.ruleForm.appLoveStr == 'appnone') {
				// 	v.DmpTargetingDTO.content.app_category_list = [];
				// } else {
				// 	v.DmpTargetingDTO.content.app_category_list = v.appLoveTodata;
				// }
				// v.DmpTargetingDTO.content.topic = v.ruleForm.topic;
				// v.DmpTargetingDTO.content.lifeStatusLabel = JSON.stringify(v.lifeStatuseToData);
				// v.DmpTargetingDTO.content.interestLabel = JSON.stringify(v.interestToData);
				// v.DmpTargetingDTO.content.locLabel = JSON.stringify(v.locationToData);
				// v.DmpTargetingDTO.content.topicLabel = JSON.stringify(v.selectTopicList);
				// console.log(this.DmpTargetingDTO);
				// if (v.DmpTargetingDTO.targetingType == 'WAX_PACKET' && v.DmpTargetingDTO.content.packageid == '') {
				// 	this.$message({
	   //        message: '请选择人群包',
	   //        type: 'warning'
	   //      });
				// 	return ;
				// }
				// if (this.DmpTargetingDTO.name == '') {
				// 	this.$message({
	   //        message: '请填写模板名称',
	   //        type: 'warning'
	   //      });
				// 	return ;
				// }
				// v.$api.post(v.allurlsList.dmpTargetings, v.DmpTargetingDTO, function(r) {
				// 	console.log(r);
				// 	v.ruleForm.dmpTargetingId = parseInt(r.id);
				// 	v.dmpIsNewCreat = false;
				// 	v.$message({
	   //        message: '保存成功',
	   //        type: 'success'
	   //      });
				// 	v.$api.get(v.allurlsList.dmpTargetings, '', function(r) {
				// 		for (var i = 0; i < r.content.length; i++) {
				// 			r.content[i].content = JSON.parse(r.content[i].content);
				// 		}
				// 		console.log(r);
				// 		v.targetModelArray = r.content;
				// 	})
				// })
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
			// 监听穿梭框组件添加
			add(data) {
				console.log(data)
			},
			// 监听穿梭框组件移除
			remove(data) {
				console.log(data)
			},
			// 广告位数据重置
			resourceInit(obj) {
				this.ruleForm = Object.assign({}, this.ruleForm, obj);
			},
			// 定向数据
			searchTopicMethod(query) { /*搜索话题自定义方法*/
				var v = this;
				v.$api.get(v.allurlsList.TopicList + '?keyword=' + query, '', function(r) {
					if (r != '') {
						v.searchTopicSelect = r.topic;
					}
				})
			},
			clearTopic: function () {
			// 	this.ruleForm.topic = [];
			// },
			// removeTopic(title) {
   //       var index = this.ruleForm.topic.indexOf(title);
   //       this.ruleForm.topic.splice(index, 1);
			// },
			// // 粉丝包
			// querySearchAsync(queryString, callback) {
			// 	var v = this;
			// 	v.$api.get(v.allurlsList.waxFansList + '?name=' + queryString, '', function(r) {
			// 		console.log(r);
			// 		if (r.length > 0) {
			// 			for (var i = 0; i < r.length; i++) {
			// 				r[i].value = r[i].name;
			// 			}
			// 		}
			// 		callback(r);
			// 	})
			},
			handleSelect(item) {
				this.selectedFans = item;
				this.DmpTargetingDTO.content.packetList[0] = (item.id).toString();
		    console.log(item);
		    //do something
			},
			submitForm(formName) {
				var v = this;
				this.$refs[formName].validate((valid) => {
					if(valid) {
						// if (v.ruleForm.mediaType == 'RTB' && v.ruleForm.media == 'WAX') {
						// 	if (v.ruleForm.dmpTargetingId == '') {
						// 		v.$message({
				    //       message: '请选择定向DMP',
				    //       type: 'warning'
				    //     });
						// 		return ;
						// 	}
						// }
						if(v.ruleForm.iphoneType == 'iphnone') {
							v.ruleForm.mexTargeting.brand = [];
						} else {
							v.ruleForm.mexTargeting.brand = v.phoneTypeToData;
						}
						// delete v.ruleForm.date;
						v.ruleForm.advertiserId = v.advertiserId;
						v.ruleForm.campaignId = v.campaignId;
						v.ruleForm.productId = v.productId;
						if(v.timeChangeCtr.times.length > 0){
							v.ruleForm.targetingTime = v.timeChangeCtr.times.map((item)=>{return item.slice(0,1) + '-' + item.slice(1)});
						}else{
							v.ruleForm.targetingTime = [];
						}
						v.ruleForm.dmpTargeting = {};
						if(v.waxChoseDmp.baseInfomation[v.waxChoseDmp.baseChoseId]) v.ruleForm.dmpTargeting.commonRuleId = v.waxChoseDmp.baseInfomation[v.waxChoseDmp.baseChoseId].id;
						if(v.waxChoseDmp.baseInfomation[v.waxChoseDmp.deviceChoseId]) v.ruleForm.dmpTargeting.packetRuleId = v.waxChoseDmp.baseInfomation[v.waxChoseDmp.deviceChoseId].id;
						if(v.waxChoseDmp.baseInfomation[v.waxChoseDmp.topicsChoseId]) v.ruleForm.dmpTargeting.topicRuleId = v.waxChoseDmp.baseInfomation[v.waxChoseDmp.topicsChoseId].id;
						if(v.waxChoseDmp.baseInfomation[v.waxChoseDmp.fansChoseId]) v.ruleForm.dmpTargeting.fansRuleId = v.waxChoseDmp.baseInfomation[v.waxChoseDmp.fansChoseId].id;
						var	arr = [this.waxChoseDmp.baseChoseIdCtr,
							this.waxChoseDmp.fansChoseIdCtr,
							this.waxChoseDmp.topicsChoseIdCtr,
							this.waxChoseDmp.deviceChoseIdCtr
						];
						var formArray = []
						for (var i = 0; i < arr.length; i++) {
							if (arr[i] == '1') {
								formArray[i] = 'OR';
							} else if (arr[i] == '2') {
								formArray[i] = 'AND';
							} else if (arr[i] == '3') {
								formArray[i] = 'EXCLUDE';
							}
						}
						v.ruleForm.dmpTargeting.commonRuleLogic = formArray[0];
						v.ruleForm.dmpTargeting.fansRuleLogic = formArray[1];
						v.ruleForm.dmpTargeting.topicRuleLogic = formArray[2];
						v.ruleForm.dmpTargeting.packetRuleLogic = formArray[3];
						if(v.$route.query.value == 'edit') {
							v.ruleForm.id = v.$route.query.id;
							v.$api.put(v.allurlsList.creatADGroupUrl, v.ruleForm, function(r) {
								v.$router.go(-1);
							});
							return;
						} else if(v.$route.query.value == 'copy') {
							v.$api.post(v.allurlsList.creatADGroupUrl, v.ruleForm, function(r) {
								v.$router.go(-1);
							});
							return;
						}
						console.log('v.ruleForm.', v.ruleForm);
						v.$api.post(v.allurlsList.creatADGroupUrl, v.ruleForm, function(r) {
							if (v.$route.query.value != 'new') {
								v.$store.commit('changeCurrentStep', {
									name: r.name,
									step: 3
								});
							}
							localStorage.setItem("GTadvertiserId", r.advertiserId);
							localStorage.setItem("GTproductId", r.productId);
							localStorage.setItem("GTcampaignId", r.campaignId);
							localStorage.setItem("GTadGroupId", r.id);
							localStorage.setItem("GTmediaBuyResourceId", r.mediaBuyResourceId);
							localStorage.setItem("GTmedia", v.ruleForm.media);
							localStorage.setItem("GTmediaType", v.ruleForm.mediaType);
							if(v.ruleForm.mediaType == 'MEDIA_BUY') {
								v.$router.push({
									name: 'creatMTADtivity'
								});
							} else if(v.ruleForm.media == 'WAX') {
								v.$router.push({
									name: 'creatWBADtivity'
								});
							} else if(v.ruleForm.media == 'BAIDU_GD') {
								v.$router.push({
									name: 'creatBDADtivity'
								});
							}else if(v.ruleForm.media == 'BILIBILI') {
								v.$router.push({
									name: 'creatBILItivity'
								});
							}
						})
					} else {
						console.log('error submit!!');
						return false;
					}
				});

			},
			backAction() {
				this.$router.go(-1);
			}
		}
	}
</script>

<style lang="scss">
	.creatADGroup {
		width: 100%;
		margin-top: 30px;
		margin-left: 40px;
		.el-tree {
			color: #606266 !important;
			background-color: #fff !important;
			background-color: red;
		}
		.transfer-left {
			width: 200px !important;
		}
	}

	.my-autocomplete {
  li {
    line-height: normal;
    padding: 7px;

    .name {
      text-overflow: ellipsis;
      overflow: hidden;
			float: left;
    }
    .addr {
    	display: inline-block;
			position: absolute;
			right: 10px;
      font-size: 12px;
      color: #b4b4b4;
    }

    .highlighted .addr {
      color: #ddd;
    }
  }
}
	.autocompleteDiv {
		margin-top: -10px;
		width: 400px;
		margin-left: 120px;
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
	.position-father {
		position: relative;
		margin-right: 10px;
	}

	.m-l-5 {
		margin-left: 5px;
	}

	.inline-block {
		display: inline-block;
	}

	.fa {
		display: inline-block;
		font: normal normal normal 14px/1 FontAwesome;
		font-size: inherit;
		text-rendering: auto;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	.tip-icon {
		color: #d2d2d2;
		font-size: 16px;
		width: 20px;
		margin-top: 8px;
		text-align: center;
		line-height: 20px;
		background-color: #ebebeb;
		-webkit-border-radius: 100%;
		-moz-border-radius: 100%;
		border-radius: 100%;
		cursor: pointer;
	}

	.tipInfo {
		display: none;
		position: absolute;
		top: 0px;
		left: 40px;
		-webkit-border-radius: 5px;
		-moz-border-radius: 5px;
		border-radius: 5px;
		padding: 15px;
		-moz-box-shadow: 0px 0px 5px #888;
		box-shadow: 0px 0px 5px #888;
		background-color: #fff;
		z-index: 100;
		color: #333 !important;
		white-space: nowrap;
	}
	.searchSelect{
    height:auto;
    line-height:normal;
    margin-bottom:10px;
}
.searchSelect p{
    line-height:15px;
    color:#666;

}
.el-select-dropdown.is-multiple .searchSelect.selected::after{
    top:50%;
}
	.selectTopic{
    max-height:300px;
    overflow-y: auto;
    position: relative;
}
 .topic_footer{
     border:1px solid #ddd;
     border-top:none;
     margin-top:-10px;
     padding:2px 10px;
     text-align: right;
     background-color: #f8f8f8;
     margin-bottom:10px;
}
.color-blue{
    color:#409EFF;
}
	.border{
    border:1px solid #ddd;
    margin-bottom:10px;
    background-color: #f8f8f8;
}
.selectTopic>div{
    margin-bottom:15px;
    position: relative;
    cursor: pointer;
    padding:5px 10px;
}
.selectTopic>div i{
    position: absolute;
    right:10px;
    top:40%;
    font-size:12px;
    font-weight: bold;
}
.selectTopic>div:hover{
    background-color: #f5f5f5;
}
.selectTopic>div:hover i{
    color:#409EFF;
}
.selectTopic p{
    margin-bottom:0px;
    line-height:25px;
    color: #666;
}
	.el-checkbox-button--mini .el-checkbox-button__inner {
		padding: 7px 10px;
	}
</style>
