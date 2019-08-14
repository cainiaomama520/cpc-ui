<template>
	<div class="" >
		<el-container>
			<div class="bg_white" style="width: 100%;">
				<el-col class="line" :span="24" style="margin-bottom: 10px;margin-top: 10px;"><h3>产品基本信息</h3></el-col>
					<el-row><el-col class="borderLeft" :span="24"></el-col></el-row>
					<el-row label-width="100px">
						<el-col :xs="24" :sm="24" :md="24" :lg="24">
							<el-row class="row">
								<el-col :xs="24" :sm="24" :md="24" :lg="4"  class="label">名称:</el-col>
								<el-col :xs="24" :sm="24" :md="24" :lg="20">{{detailForm.name}}</el-col>
							</el-row>
						</el-col>
						<el-col :xs="24" :sm="24" :md="24" :lg="24">
							<el-row class="row">
								<el-col :xs="24" :sm="24" :md="24" :lg="4" class="label">产品类型:</el-col>
								<el-col :xs="24" :sm="24" :md="24" :lg="20">{{detailForm.type}}</el-col>
							</el-row>
						</el-col>
						<el-col :xs="24" :sm="24" :md="24" :lg="24">
							<el-row class="row">
								<el-col :xs="24" :sm="24" :md="24" :lg="4"  class="label">平台:</el-col>
								<el-col :xs="24" :sm="24" :md="24" :lg="20">
								{{detailForm.os}}
								</el-col>
							</el-row>
						</el-col>
						<el-col :xs="24" :sm="24" :md="24" :lg="24">
							<el-row class="row">
								<el-col :xs="24" :sm="24" :md="24" :lg="4"  class="label">预览链接:</el-col>
								<el-col :xs="24" :sm="24" :md="24" :lg="20">{{detailForm.previewUrl}}</el-col>
							</el-row>
						</el-col>
						<el-col :xs="24" :sm="24" :md="24" :lg="24">
							<el-row class="row">
								<el-col :xs="24" :sm="24" :md="24" :lg="4"  class="label">客户备注:</el-col>
								<el-col :xs="24" :sm="24" :md="24" :lg="20">{{detailForm.remarks}}</el-col>
							</el-row>
						</el-col>
					</el-row>
					<el-col class="line" :span="24" style="margin-bottom: 10px;margin-top: 10px;"><h3>微博WAX</h3></el-col>
					<el-row><el-col class="borderLeft" :span="24"></el-col></el-row>
					<el-row class="row">
						<el-col :xs="24" :sm="24" :md="24" :lg="4"  class="label">微博WAX:</el-col>
						<el-col :xs="24" :sm="24" :md="24" :lg="20">
							<el-tooltip content="如果是android应用才需要上传apk包，IOS不需要" placement="top">
								<UploadSingle v-model="upfile" label="点击上传"  style="width: 100px; float: left; margin-left:20px;"></UploadSingle>
							</el-tooltip>
							<a v-bind:href="upfile.url" target="_blank">{{upfile.name}}</a>
						</el-col>
					</el-row>
					<el-row class="row">
						<el-col :xs="24" :sm="24" :md="24" :lg="4"  class="label" style="color:#fff;">提示信息</el-col>
						<el-col :xs="24" :sm="24" :md="24" :lg="20">
							<el-tag  type="info">支持扩展名：.apk</el-tag>
						</el-col>
					</el-row>
					<el-row style="margin-left: 50px;">
					    <el-button type="primary" size="small" @click="">提交微博</el-button>
					</el-row>
					<el-col :xs="12" :sm="12" :md="12" :lg="12">
						<el-row style="margin-top: 20px;">
						    <el-button type="primary" @click="submitEdit()">编辑</el-button>
							<router-link to="/advpro/proList" type="button" class="el-button el-button--warning">取消</router-link>
						</el-row>
					</el-col>
				</div>
		</el-container>
	</div>
</template>

<script>
import {Upload, UploadSingle} from '../../common';
import {mapState, mapActions}from 'vuex';
	export default {
		components: {
	        Upload,
	        UploadSingle
	    },
		data(){
			return {
				//详情界面数据
				detailForm: {
					name: '',
					type: '',
					os: '',
					previewUrl: '',
					remarks: ''
				},
				upfile:{name:'', url:''},
				loading:true
			}
		},
		methods:{
			...mapActions([
				'getProDev'
			]),
			async submitEdit(){
				this.$router.push({
	                path: '/advpro/proForm',
	                query:{id:this.detailForm.id}
	            });
			},
			async checkProduetDetail(){
				let tmp = this.cache ||{};
				if (!(this.cache&&this.cache.id)){
					let id = this.$route.query.id;
					let proinfo = await this.getProDev(id);
					if (proinfo && proinfo.id){
						tmp = proinfo;
					}
				}
				//基本信息
				this.detailForm.id = tmp.id || 0;
				this.detailForm.name = tmp.name||'';
				this.detailForm.type = tmp.type||'';
				if(tmp.type == 'E_COMMERCE'){
					this.detailForm.type = '电商';
				}else if(tmp.type == 'APP_DOWNLOAD'){
					this.detailForm.type = 'APP下载';
				}
				this.detailForm.os = tmp.os||'';
				this.detailForm.previewUrl = tmp.previewUrl||'';
				this.detailForm.remarks = tmp.remarks||'';
			},

			handleRemove(file, fileList) {
		        console.log(file, fileList);
		    },
		      handlePreview(file) {
		        console.log(file);
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

<style >
	.el-container {
	    position: relative;
	    margin: 10px 30px;
	    background-color: white;
	    border-radius: 4px;
	    min-height: 80%;
	  }
	.row {
	    font-size: 12px;
	    line-height: 45px;
	    border-bottom: 1px dashed #eff5f7;
	}
	.row .el-col, .info .row .el-col>.item {
	    padding: 0 15px;
	    overflow: hidden;
	    text-overflow: ellipsis;
	    white-space: nowrap;
	    word-break: break-all;
	}
	.label {
	    background-color: #f8fbfc;
	    text-align: right;
	    font-weight: 500;
    }
    .el-row {
	    box-sizing: border-box;
	}
	.borderLeft {
	    border-top: 5px solid #355c9d;
	}
</style>