<template lang="html">
	<div class="creatADtivity">
		<el-row>
			<el-col :span='20'>
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm" label-width="120px">
					<el-row>
						<!-- <el-col :span='12'>
							<el-form-item label="广告主曝光监测">
								<el-select v-model="ruleForm.impTrackingUrl.id" filterable placeholder="请选择曝光链接" style="width:235px">
									<el-option v-for="item in ruleForm.impTrackingUrlList" :key="item.id" :label="item.name" :value="item.id">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col> -->
						<el-col :span='12'>
							<el-form-item label="广告主监测链接" prop='trackLinkId'>
								<el-select v-model="ruleForm.trackLinkId" filterable placeholder="请选择监测链接" style="width:235px">
									<el-option v-for="item in ruleForm.trackLinkArr" :key="item.id" :label="item.name" :value="item.id">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<!-- <el-form-item label="广告主曝光监测">
                <el-input v-model="ruleForm.impTrackingUrl.url" v-on:blur="changeImp()" placeholder='请输入曝光监测链接' style="width:300px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span='12'>
              <el-form-item label="设置标识">
                  <el-input v-model="ruleForm.impTrackingUrl.name" placeholder='如:紫龙曝光链接001' style="width:235px"></el-input>
              </el-form-item> -->
						<!-- </el-col> -->
					</el-row>
					<el-row>
						<!-- <el-col :span='12'>
              <el-form-item label="广告主点击检测" prop="clkTrackingUrl.url">
                <el-input v-model="ruleForm.clkTrackingUrl.url" v-on:blur="changeClk()" placeholder='请输入点击监测链接' style="width:300px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span='12'>
              <el-form-item label="设置标识" prop='clkTrackingUrl.name'>
                  <el-input v-model="ruleForm.clkTrackingUrl.name" placeholder='如:紫龙曝光链接001' style="width:235px"></el-input>
              </el-form-item>
            </el-col> -->
					</el-row>
					<el-form-item style="padding-bottom:30px;padding-left:70%">
						<el-button type="primary" @click="checkAction">链接检测</el-button>
						<!-- <el-button type="primary" @click="submitForm('ruleForm')">下一步</el-button> -->
					</el-form-item>
					<el-row v-if='!hasLink'>
						<el-col :span='12'>
							<el-form-item label="希望分配链接数" prop="linkCount">
								<el-input v-model="ruleForm.linkCount" placeholder='默认1' style="width:235px"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span='12'>
							<el-form-item label="自定义命名" prop="linkName">
								<el-input v-model="ruleForm.linkName" placeholder='uc头条' style="width:235px"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row v-if='hasLink'>
						<el-col :span='6'>
							<span style="color: #606266;font-size:14px;line-height:40px">
                当前链接个数: {{offset}}
              </span>
						</el-col>
						<el-col :span='6'>
							<span style="color: #606266;font-size:14px;line-height:40px">
                命名为: {{ruleForm.linkName}}
              </span>
						</el-col>
						<el-col :span='12'>
							<el-form-item label="希望分配链接数" prop="linkCount">
								<el-input v-model="ruleForm.linkCount" placeholder='默认1' style="width:235px"></el-input>
							</el-form-item>
						</el-col>
					</el-row>

					<el-form-item style="padding-top:50px;padding-left:60%">
						<el-button type="primary" @click="cancleAction()">取&emsp;消</el-button>
						<el-button type="primary" @click="submitForm('ruleForm')">提&emsp;交</el-button>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				hasLink: false,
				offset: -1,
				ruleForm: {
					advertiserId: localStorage.getItem("GTadvertiserId"),
					adGroupId: localStorage.getItem("GTadGroupId"),
					productId: localStorage.getItem("GTproductId"),
					campaignId: localStorage.getItem("GTcampaignId"),
					media: localStorage.getItem("GTmedia"),
					mediaType: localStorage.getItem("GTmediaType"),
					mediaBuyResourceId: localStorage.getItem("GTmediaBuyResourceId"),
					linkName: '',
					linkCount: '',
					trackLinkId: '',
					trackLinkArr: [],
					// clkTrackingUrl: {
					// 	advertiserId: localStorage.getItem("GTadvertiserId"),
					// 	name: '',
					// 	id: '',
					// 	url: '',
					// 	type: 'CLK'
					// },
					// clkTrackingUrlList: [],
					// impTrackingUrl: {
					// 	advertiserId: localStorage.getItem("GTadvertiserId"),
					// 	name: '',
					// 	id: '',
					// 	url: '',
					// 	type: 'IMP'
					// },
					// impTrackingUrlList: []
				},
				rules: {
					// 'impTrackingUrl.url':[{ required: true, message: '请输入曝光链接', trigger: 'blur' },],
					trackLinkId: [{
						required: true,
						message: '请选择监测链接',
						trigger: 'blur'
					}, ],
					linkName: [{
						required: true,
						message: '请输入自定义命名',
						trigger: 'blur'
					}, ],
					linkCount: [{
						required: true,
						message: '请输入链接个数',
						trigger: 'blur'
					}, ],
					name: [{
						required: true,
						message: '请输入标识',
						trigger: 'blur'
					}, ],
					name1: [{
						required: true,
						message: '请输入标识',
						trigger: 'blur'
					}, ],
					date: [{
						required: true,
						message: '请输入活动名称',
						trigger: 'blur'
					}, ],
				}
			};
		},
		mounted() {
			this.$store.commit('changeTitleName', '创建广告创意');
			if(this.$route.query.value == 'new') {
				this.$store.commit('changeTitleName', '新建广告创意');
			} else if(this.$route.query.value == 'edit') {
				this.$store.commit('changeTitleName', '编辑广告创意');
			} else if(this.$route.query.value == 'copy') {
				this.$store.commit('changeTitleName', '复制广告创意');
			}
			if(this.$store.state.creatCp.currentStep == 4) {
				this.$router.push({
					name: 'creatCampaign'
				});
			}
			this.ruleForm.mediaType = localStorage.getItem("GTmediaType");
			var v = this;
			if(v.$route.query.id != undefined) {
				v.$store.commit('clearState');
				if(v.$route.query.value == 'new') {
					v.$api.get(v.allurlsList.creatADGroupUrl + '/' + v.$route.query.id, '', function(r) {
						console.log(r);
						v.ruleForm.advertiserId = r.advertiser.id;
						v.ruleForm.adGroupId = v.$route.query.id;
						v.ruleForm.productId = r.product.id;
						v.ruleForm.campaignId = r.campaign.id;
						v.ruleForm.media = r.media;
						v.ruleForm.mediaType = r.mediaType;
						v.ruleForm.mediaBuyResourceId = r.mediaBuyResource.id;
						v.ruleForm.trackLinkId = r.trackLinkId;
						// v.ruleForm.clkTrackingUrl.advertiserId = r.advertiser.id;
						// v.ruleForm.impTrackingUrl.advertiserId = r.advertiser.id;
						v.getTrackingList();
					})
					return;
				}
				v.$api.get(v.allurlsList.creatadver + '/' + v.$route.query.id, '', function(r) {
					console.log(r);
					v.ruleForm.advertiserId = r.advertiserId;
					v.ruleForm.adGroupId = r.adGroupId;
					v.ruleForm.productId = r.productId;
					v.ruleForm.campaignId = r.campaignId;
					v.ruleForm.media = r.media;
					v.ruleForm.mediaType = r.mediaType;
					v.ruleForm.mediaBuyResourceId = r.mediaBuyResourceId;
					v.ruleForm.linkName = r.linkName;
					v.hasLink = true;
					v.offset = r.offset;
					v.ruleForm.trackLinkId = r.trackLinkId;
					// v.ruleForm.clkTrackingUrl.advertiserId = r.advertiserId;
					// v.ruleForm.clkTrackingUrl.id = r.clkTrackingUrl && r.clkTrackingUrl.id || '';
					// v.ruleForm.clkTrackingUrl.name = r.clkTrackingUrl && r.clkTrackingUrl.name || '';
					// v.ruleForm.clkTrackingUrl.url = r.clkTrackingUrl && r.clkTrackingUrl.url || '';
					// v.ruleForm.impTrackingUrl.advertiserId = r.advertiserId;
					// v.ruleForm.impTrackingUrl.name = r.impTrackingUrl && r.impTrackingUrl.name || '';
					// v.ruleForm.impTrackingUrl.id = r.impTrackingUrl && r.impTrackingUrl.id || '';
					// v.ruleForm.impTrackingUrl.url = r.impTrackingUrl && r.impTrackingUrl.url || '';
					v.getTrackingList();
				})
			} else {
				v.getTrackingList();
			}
		},
		methods: {
			getTrackingList() {
				var params = '?advertiserId=' + this.ruleForm.advertiserId + '&productId=' + this.ruleForm.productId;
				var v = this;
				this.$api.get(this.allurlsList.trackLinksDropdown + params, '', function(r) {
					v.ruleForm.trackLinkArr = r;
				})
			},
			checkAction() {
				var params = {
					adGroupId: this.ruleForm.adGroupId,
					trackLinkId: this.ruleForm.trackLinkId,
				}
				var v = this;
				this.$api.get(this.allurlsList.mediaCheckUrl, params, function(r) {
					console.log(r);
					if(r.index == 0) {
						v.hasLink = false;
					} else {
						v.hasLink = true;
						v.ruleForm.linkName = r.name;
					}
					v.offset = r.index;
				})
			},
			changeImp() {
				console.log(this.ruleForm.impTrackingUrl);
				var v = this;
				this.$api.post(this.allurlsList.trackLinksCheck, this.ruleForm.impTrackingUrl, function(r) {
					console.log(r);
					// if (r.message !== '') {
					v.ruleForm.impTrackingUrl = r;
					// }
				})
			},
			changeClk() {
				console.log(this.ruleForm.clkTrackingUrl);
				var v = this;
				this.$api.post(this.allurlsList.trackLinksCheck, this.ruleForm.clkTrackingUrl, function(r) {
					console.log(r);
					// if (r.message !== '') {
					v.ruleForm.clkTrackingUrl = r;
					// }
				})
			},
			cancleAction() {
				this.$router.go(-1);
			},
			submitForm(formName) {
				var v = this;
				if(v.offset == -1) {
					v.$message({
						message: '请点击链接检测按钮',
						type: 'warning'
					});
					return;
				}
				this.$refs[formName].validate((valid) => {
					if(valid) {
						v.ruleForm.offset = v.offset;
						if(v.$route.query.value == 'edit') {
							v.ruleForm.id = v.$route.query.id;
							v.$api.put(v.allurlsList.creatadver, v.ruleForm, function(r) {
								v.$router.go(-1);
							})
							return;
						} else if(v.$route.query.value == 'copy' || v.$route.query.value == 'new') {
							v.$api.post(v.allurlsList.creatadver, v.ruleForm, function(r) {
								v.$router.go(-1);
							})
							return;
						}
						v.$api.post(v.allurlsList.creatadver, v.ruleForm, function(r) {
							console.log(r);
							// v.$store.commit('changeCurrentStep', {
							// 	name: v.ruleForm.linkName,
							// 	step: 4
							// })
							v.$router.push({
								name: 'adCampaignOp'
							});
						})
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	.creatADtivity {
		width: 100%;
		margin-top: 30px;
		margin-left: 40px;
	}
</style>
