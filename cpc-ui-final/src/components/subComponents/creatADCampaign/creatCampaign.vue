<template lang="html">
	<div class="creatCampaign">
		<el-row>
			<el-col :span='20'>
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm" label-width="120px">
					<el-form-item label="广告主" prop="advertiserId">
						<el-col :xs="24" :sm="16" :md="10" :lg="6">
							<el-select v-model="ruleForm.advertiserId" filterable placeholder="请选择" style="width:300px">
								<el-option v-for="item in advertisers" :key="item.id" :label="item.name" :value="item.id">
								</el-option>
							</el-select>
						</el-col>
						<el-button type="primary" @click="submitForm('ruleForm')" style="margin-left: 120px">创建广告主</el-button>
					</el-form-item>
					<el-form-item label="产品" prop="productId">
						<el-col :xs="24" :sm="16" :md="10" :lg="6">
							<el-select v-model="ruleForm.productId" filterable placeholder="请选择" style="width:300px">
								<el-option v-for="item in products" :key="item.id" :label="item.name" :value="item.id">
								</el-option>
							</el-select>
						</el-col>
						<el-button type="primary" @click="submitForm('ruleForm')" style="margin-left: 120px">创建产品</el-button>
					</el-form-item>
					<el-form-item label="名称" prop="name">
						<el-col :xs="24" :sm="16" :md="10" :lg="6">
							<el-input v-model.trim="ruleForm.name" style="width:235px"></el-input>
						</el-col>
					</el-form-item>
					<el-form-item label="激活单价" prop="activePrice">
						<el-col :xs="24" :sm="16" :md="10" :lg="6">
							<el-input v-model.trim="ruleForm.activePrice" style="width:235px"></el-input>
						</el-col>
					</el-form-item>
					<el-form-item label="总预算" prop="totalBudget">
						<el-col :xs="24" :sm="16" :md="10" :lg="6">
							<el-input v-model.trim="ruleForm.totalBudget" style="width:235px"></el-input>
						</el-col>
					</el-form-item>
					<el-form-item label="日预算">
						<el-col :xs="24" :sm="16" :md="10" :lg="6">
							<el-input v-model.trim="ruleForm.dayBudget" style="width:235px"></el-input>
						</el-col>
					</el-form-item>
					<el-form-item label="起止时间" prop="date">
						<el-col :xs="24" :sm="16" :md="10" :lg="6">
							<el-date-picker v-model="ruleForm.date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd">
							</el-date-picker>
						</el-col>
					</el-form-item>
					<el-form-item label="媒体类型:">
						<el-radio-group v-model="ruleForm.mediaType">
							<el-radio label='RTB'>RTB媒体</el-radio>
							<el-radio label='MEDIA_BUY'>账户媒体</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item style="padding-top:50px" v-if='!isEditBool'>
						<el-button type="primary" @click="this.$router.go(-1)">取&emsp;消</el-button>
						<el-button type="primary" @click="submitForm('ruleForm')">下一步</el-button>
					</el-form-item>
					<el-form-item style="padding-top:50px" v-if='isEditBool'>
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
				isEditBool: false,
				advertisers: [],
				products: [],
				ruleForm: {
					advertiserId: '', //广告主
					productId: '', // 产品
					name: '', // 名称
					activePrice: '', //激活单价
					totalBudget: '', // 总预算
					dayBudget: '', // 日预算
					date: [],
					beginDate: '', // 开始时间
					endDate: '', // 结束时间
					mediaType: 'RTB' // 媒体类型
				},
				rules: {
					advertiserId: [{
						required: true,
						message: '请选择广告主',
						trigger: 'blur'
					}, ],
					productId: [{
						required: true,
						message: '请选择产品',
						trigger: 'blur'
					}, ],
					name: [{
						required: true,
						message: '请输入名称',
						trigger: 'blur'
					}, ],
					date: [{
						required: true,
						message: '请选择起止时间',
						trigger: 'blur'
					}, ],
					activePrice: [{
						required: true,
						message: '请填写激活单价',
						trigger: 'blur'
					}, ],
					totalBudget: [{
						required: true,
						message: '请填写总预算',
						trigger: 'blur'
					}, ],
				}
			};
		},
		mounted() {
			console.log(this.$route.query.id);
			this.$store.commit('changeTitleName', '创建广告活动');
			var v = this;
			// 清除state值
			this.$store.commit('clearState');
			if(this.$route.query.id != undefined) {
				v.isEditBool = true;
				if(this.$route.query.value == 'edit' || this.$route.query.value == 'copy') {
					if(this.$route.query.value == 'edit') {
						this.$store.commit('changeTitleName', '编辑广告活动');
					} else if(this.$route.query.value == 'copy') {
						this.$store.commit('changeTitleName', '复制广告活动');
					}
					v.$api.get(v.allurlsList.creatCampaigns + '/' + this.$route.query.id, '', function(r) {
						v.ruleForm.advertiserId = r.advertiserId;
						v.ruleForm.productId = r.productId;
						v.ruleForm.name = r.name;
						if(v.$route.query.value == 'copy') {
							v.ruleForm.name += '(复制)';
						}
						v.ruleForm.activePrice = r.activePrice;
						v.ruleForm.totalBudget = r.totalBudget;
						v.ruleForm.dayBudget = r.dayBudget;
						v.ruleForm.date = [r.beginDate, r.endDate];
					})
				} else if(this.$route.query.value == 'new') {
					console.log('新建');
					this.$store.commit('changeTitleName', '新建广告活动');
				}
			}
			this.getGTAdvertiserList().then(function(result) {
				v.advertisers = result;
			});
			this.getGTProductList().then(function(result) {
				v.products = result;
			});

		},
		watch: {
			'ruleForm.date': function(val) {
				console.log(val);
				this.ruleForm.beginDate = val[0];
				this.ruleForm.endDate = val[1];
			}
		},
		methods: {
			submitForm(formName) {
				var v = this;
				this.$refs[formName].validate((valid) => {
					if(valid) {
						// delete v.ruleForm.date;
						if(v.$route.query.value == 'edit') {
							v.ruleForm.id = v.$route.query.id;
							v.$api.put(v.allurlsList.creatCampaigns, v.ruleForm, function(r) {
								v.$router.go(-1);
							})
							return;
						} else if(v.$route.query.value == 'copy' || v.$route.query.value == 'new') {
							v.$api.post(v.allurlsList.creatCampaigns, v.ruleForm, function(r) {
								v.$router.go(-1);
							})
							return;
						}
						v.$api.post(v.allurlsList.creatCampaigns, v.ruleForm, function(r) {
							v.$store.commit('changeCurrentStep', {
								name: r.name,
								step: 2
							})
							localStorage.setItem("GTadvertiserId", r.advertiserId);
							localStorage.setItem("GTproductId", r.productId);
							localStorage.setItem("GTcampaignId", r.id);
							localStorage.setItem("GTmediaType", v.ruleForm.mediaType);
							v.$router.push({
								name: 'creatADGroup'
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
	.creatCampaign {
		width: 100%;
		margin-top: 30px;
		margin-left: 40px;
	}
</style>
