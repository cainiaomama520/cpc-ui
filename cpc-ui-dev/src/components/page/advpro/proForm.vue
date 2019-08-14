<template>
	<div class="">
		<el-container>
			<div class="form bg_white" style="width:100%;">
				<el-col class="line" :span="24" style="margin-bottom: 10px;"><h3>产品基本信息</h3></el-col>
				<el-col class="borderLeft" :span="24"  style="margin-bottom: 20px;"></el-col>
				<el-form :model="addForm" label-width="100px" :rules="addFormRules" ref="addForm">
						<el-form-item label="名称" prop="name">
							<el-col :xs="24" :sm="16" :md="10" :lg="6">
								<el-input v-model="addForm.name" auto-complete="off"></el-input>
							</el-col>
						</el-form-item>
						<el-form-item label="产品类型" prop="type">
							<el-select v-model="addForm.type" placeholder="请选择">
								    <el-option label="APP下载" value="APP_DOWNLOAD"></el-option>
								    <el-option label="电商" value="E_COMMERCE"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="平台" prop="os">
							<el-select v-model="addForm.os" placeholder="请选择">
								    <el-option label="iOS" value="IOS"></el-option>
								    <el-option label="Android" value="ANDROID"></el-option>
								    <el-option label="All" value="ALL"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="预览链接" prop="previewUrl">
							<el-col :xs="24" :sm="16" :md="10" :lg="6">
								<el-input placeholder="请输入内容" v-model="addForm.previewUrl"></el-input>
							</el-col>
						</el-form-item>
						<el-form-item label="客户备注">
							<el-col :xs="24" :sm="16" :md="10" :lg="6">
								<el-input type="textarea" v-model="addForm.remarks"></el-input>
							</el-col>
						</el-form-item>

						<el-form-item>
							<el-button type="primary" @click="onSubmit('addForm')">保存</el-button>
							<router-link to="/advpro/proList" type="button" class="el-button el-button--warning">取消</router-link>
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
				addForm: {
					name: '',
					type: '',
					os: '',
					previewUrl: '',
					remarks: ''
				},
				addFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					],
					os: [
						{ required: true, message: '请选择平台', trigger: 'change' }
					],
					type: [
						{ required: true, message: '请选择产品类型', trigger: 'change' }
					],
					previewUrl: [
						{ required: true, message: '请输入预览链接', trigger: 'blur' }
					]
				}
			}
		},
		methods:{
			...mapActions([,
				'getProDev',
				'createProduct',
				'updateProduct'
			]),

			async checkProduetDetail(){
				let id = this.$route.query && this.$route.query.id || null;
				let tmp = this.cache ||{};
				if (id && !(this.cache && Object.keys(this.cache).length > 0)){
					//let id = this.$route.query.id;
					let proinfo = await this.getProDev(id);
					if (proinfo && proinfo.id){
						tmp = proinfo;
					}
				}
				if (tmp && Object.keys(tmp).length > 0){
					//基本信息
					this.addForm.id = tmp.id || 0;
					this.addForm.name = tmp.name||'';
					this.addForm.type = tmp.type||'';
					this.addForm.os = tmp.os||'';
					this.addForm.previewUrl = tmp.previewUrl||'';
					this.addForm.remarks = tmp.remarks||'';
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
					sdata.id = this.addForm.id;
					sdata.name = this.addForm.name;
					sdata.type = this.addForm.type;
					sdata.os = this.addForm.os;
					sdata.previewUrl = this.addForm.previewUrl;
					sdata.remarks = this.addForm.remarks;

					console.log('submit data is.', sdata);
					let result = null;
					if (sdata.id){
						result = await this.updateProduct(sdata);
					}else{
						result = await this.createProduct(sdata);
					}
					console.log('submit result is.', result);
					if (result&&Object.keys(result).length > 0){
				        this.$router.push({
		                    path: '/advpro/proDetail'
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
					return state.advpro.product
				}
			})
		},
		created(){
			this.checkProduetDetail();
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