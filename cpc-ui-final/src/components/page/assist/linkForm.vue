<template>
	<div class="">
		<el-container>
			<div class="form bg_white" style="width:100%;margin-top: 30px;">
				<el-form :model="form" label-width="100px" :rules="formRules" ref="form">
						<el-form-item label="广告主：" prop="adv">
							<el-select v-model="form.adv" clearable  filterable placeholder="请选择" v-bind:disabled="isEdit">
								<el-option v-for="item in advArry" :key="item.id" :label="item.name" :value="item.id"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="产品：" prop="pro">
							<el-select v-model="form.pro" clearable  filterable placeholder="请选择" v-bind:disabled="isEdit">
								<el-option v-for="item in proArry" :key="item.id" :label="item.name" :value="item.id"></el-option>
							</el-select>
						</el-form-item>
						<!--<el-form-item label="类型" prop="type">
							<el-select v-model="form.type" placeholder="请选择" v-bind:disabled="isEdit">
								    <el-option label="点击" value="CLK"></el-option>
								    <el-option label="展示" value="IMP"></el-option>
							</el-select>
						</el-form-item>-->
						<el-form-item label="点击链接" prop="clicklink">
							<el-col :xs="24" :sm="16" :md="10" :lg="6">
								<el-input placeholder="请输入点击链接" v-model="form.clicklink"></el-input>
							</el-col>
						</el-form-item>
						<el-form-item label="展示链接" prop="imprlink">
							<el-col :xs="24" :sm="16" :md="10" :lg="6">
								<el-input placeholder="请输入展示链接" v-model="form.imprlink"></el-input>
							</el-col>
						</el-form-item>
						<el-form-item label="同步方式" prop="mode">
							<el-select v-model="form.mode" placeholder="请选择">
								    <el-option label="GET" value="GET"></el-option>
								    <el-option label="POST" value="POST"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="链接标识" prop="name">
							<el-col :xs="24" :sm="16" :md="10" :lg="6">
								<el-input placeholder="请输入内容" v-model="form.name"></el-input>
							</el-col>
						</el-form-item>
						
						<el-form-item>
							<el-button type="primary" @click="onSubmit('form')">保存</el-button>
							<router-link to="/assist/assistLink" type="button" class="el-button el-button--warning">取消</router-link>
						</el-form-item>
				</el-form>
			</div>
		</el-container>
	</div>
</template>

<script>
import {mapState, mapActions}from 'vuex';
	export default {
		data(){
			return {
				//新增界面数据
				isEdit:false,
				form: {
					adv: '',
					pro: '',
					type: '',
					clicklink: '',
					imprlink: '',
					mode: '',
					name: ''
				},
				advArry:[],
				proArry:[],
				formRules: {
					adv: [
						{ required: true, message: '请选择广告主', trigger: 'change' }
					],
					pro: [
						{ required: true, message: '请选择产品', trigger: 'change' }
					],
					type: [
						{ required: true, message: '请选择类型', trigger: 'change' }
					],
					clicklink: [
						{ required: true, message: '请输入点击链接', trigger: 'blur' }
					],
					mode: [
						{ required: true, message: '请选择同步方式', trigger: 'change' }
					],
					name: [
						{ required: true, message: '请输入链接标识', trigger: 'blur' }
					]
				}
			}
		},
		methods:{
			...mapActions([,
				'getadverList',
				'assistProList',
				'getLinkDev',
				'createLink',
				'updateLink'
			]),
			//请求搜索框广告主列表
			async getAdvData(options){
	      		let advlist = await this.getadverList(options);
	      		if (advlist && advlist.length>0){
					this.advArry = advlist||[];
	      		}else{
	                this.advArry = [];
	           }
			},
			//请求搜索框产品列表
			async getProData(options){
	      		let prolist = await this.assistProList(options);
	      		if (prolist && prolist.length>0){
					this.proArry = prolist||[];
	      		}else{
	                this.proArry = [];
	           }
			},
			async checkLinkDetail(){
				let id = this.$route.query && this.$route.query.id || null;
				let tmp = this.cache ||{};
				if (id && !(this.cache && Object.keys(this.cache).length > 0)){
					//let id = this.$route.query.id;
					let linkinfo = await this.getLinkDev(id);
					if (linkinfo && linkinfo.id){
						tmp = linkinfo;
					}
				}
				console.log('init...', tmp);
				if (tmp && Object.keys(tmp).length > 0){
					//基本信息
					this.form.id = tmp.id || 0;
					this.form.adv = tmp.advertiser.id ||'';
					this.form.pro = tmp.product.id ||'';
					this.form.type = tmp.type||'';
					this.form.clicklink = tmp.clkTrackUrl ||'';
					this.form.imprlink = tmp.impTrackUrl  ||'';
					this.form.mode = tmp.requestMethod||'';
					this.form.name = tmp.name||'';
					
					this.isEdit = true;
				}
			},
			
			async checkInput(name){
				return new Promise((resolve, reject) => {
					this.$refs[name].validate((valid) => {
		          		if (valid) {
		          			console.log('resolve.');
							resolve(true);
		          		} else {
							resolve(false);
		          		}
		        	});
				}).then((success) => {
					return true;
				}, (failed)=>{
					return false;
				});
			},
			async onSubmit(name){
				let isvalid = await new Promise((resolve, reject) => {
					this.$refs[name].validate((valid) => {
		          		if (valid) {
		          			console.log('resolve.');
							resolve(true);
		          		} else {
							resolve(false);
		          		}
		        	});
				});
				
				if (isvalid){
					let sdata = {};
					if (this.cache) Object.assign(sdata, this.cache);
					sdata.id = this.form.id;
					sdata.advertiserId  = this.form.adv;
					sdata.productId  = this.form.pro;
					sdata.type  = this.form.type;
					sdata.clkTrackUrl  = this.form.clicklink;
					sdata.impTrackUrl  = this.form.imprlink;
					sdata.requestMethod = this.form.mode;
					sdata.name  = this.form.name;
	
					console.log('submit data is.', sdata);
					let result = null;
					if (sdata.id){
						result = await this.updateLink(sdata);
					}else{
						result = await this.createLink(sdata);
					}
					console.log('submit result is.', result);
					if (result&&Object.keys(result).length > 0){
				        this.$router.push({
		                    path: '/assist/assistLink'
		                });
					}else{
						console.log('submit result is. empty..');
					}
				}else{
	
				}
			}
		},
		computed:{
			...mapState({
				cache:(state) => {
					return state.assist.trackLink
				}
			})
		},
		created(){
			this.getAdvData();
			this.getProData();
			this.checkLinkDetail();
		}

	}
</script>

<style>
.el-container {
    position: relative;
    margin: 10px 30px;
    background-color: white;
    border-radius: 4px;
    min-height: 80%;
  }
</style>
