<template>
	<div class="">
		<!--详情界面-->
		 <el-container>
			<div class="bg_white" v-loading="loading">
				<el-col class="line" :span="24" style="margin-bottom: 10px;margin-top: 10px;"><h3>客户基本信息</h3></el-col>
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
							<el-col :xs="24" :sm="24" :md="24" :lg="4" class="label">联系人:</el-col>
							<el-col :xs="24" :sm="24" :md="24" :lg="20">{{detailForm.contacts}}</el-col>
						</el-row>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24">
						<el-row class="row">
							<el-col :xs="24" :sm="24" :md="24" :lg="4"  class="label">联系电话:</el-col>
							<el-col :xs="24" :sm="24" :md="24" :lg="20">
							{{detailForm.phone}}
							</el-col>
						</el-row>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24">
						<el-row class="row">
							<el-col :xs="24" :sm="24" :md="24" :lg="4"  class="label">行业分类:</el-col>
							<el-col :xs="24" :sm="24" :md="24" :lg="20">{{detailForm.industryLevel1}} {{detailForm.industryLevel2}}</el-col>
						</el-row>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24">
						<el-row class="row" v-for="uids in detailForm.waxUid" :key="uids">
							<el-col :xs="24" :sm="24" :md="24" :lg="4"  class="label">微博uid:</el-col>
							<el-col :xs="24" :sm="24" :md="24" :lg="20">
								{{uids.uid}}
								<a v-bind:href="uids.url" target="_blank" style="margin-left: 10px;">
									<!--<img style="width:50px; height:50px;" v-bind:src="uids.url" />-->（资质：{{uids.name}}）
								</a>
							</el-col>

						</el-row>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24">
						<el-row class="row">
							<el-col :xs="24" :sm="24" :md="24" :lg="4"  class="label">公司网址:</el-col>
							<el-col :xs="24" :sm="24" :md="24" :lg="20">{{detailForm.website}}</el-col>
						</el-row>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24">
						<el-row class="row">
							<el-col :xs="24" :sm="24" :md="24" :lg="4"  class="label">公司地址:</el-col>
							<el-col :xs="24" :sm="24" :md="24" :lg="20">{{detailForm.address}}</el-col>
						</el-row>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24">
						<el-row class="row">
							<el-col :xs="24" :sm="24" :md="24" :lg="4"  class="label">客户备注:</el-col>
							<el-col :xs="24" :sm="24" :md="24" :lg="20">{{detailForm.remarks}}</el-col>
						</el-row>
					</el-col>
				</el-row>
				<el-col class="line" :span="24" style="margin-bottom: 20px;margin-top: 10px;"><h3>资质信息</h3></el-col>
				<el-row><el-col class="borderLeft" :span="24"></el-col></el-row>
				<el-row label-width="100px" class="licenseList">
					<el-col :xs="24" :sm="24" :md="24" :lg="24" v-for="license in licenseFiles" :key="license">
						<el-row class="row">
							<el-col :xs="12" :sm="12" :md="12" :lg="10" class="label">{{license.name}}:</el-col>
							<el-col :xs="12" :sm="12" :md="12" :lg="3" v-for="info in license.urls" :key="info">
								<a v-bind:href="info.url" target="_blank"><!--{{info.name}}-->
                    				<img style="width:60px; height:60px;" v-bind:src="info.url" />
                    			</a>
							</el-col>
						</el-row>
					</el-col>
				</el-row>
				<el-col class="line" :span="24" style="margin-bottom: 20px;margin-top: 10px;"><h3>投放审核</h3></el-col>
				<el-row><el-col class="borderLeft" :span="24"></el-col></el-row>
				<el-table :data="detailForm.checkStatus" border style="width: 100%">
					<el-table-column prop="media" label="媒体" sortable>
						<template slot-scope="scope">
				    		<span v-if="scope.row.media=='WAX'">微博</span>
					    	<span v-else-if="scope.row.media=='BAIDU_GD'">百度</span>
						</template>
					</el-table-column>
					<el-table-column prop="msg" label="审核资质描述" ></el-table-column>
					<el-table-column prop="checkStatus" label="状态">
						<template slot-scope="scope">
				    		<span v-if="scope.row.checkStatus=='pass'">审核成功</span>
					    	<span v-else-if="scope.row.checkStatus=='init'">未送审</span>
					    	<span v-else-if="scope.row.checkStatus=='pending'">审核中</span>
					    	<span v-else="scope.row.checkStatus=='failed'">审核失败</span>
						</template>
					</el-table-column>
					<el-table-column label="操作">
						<template slot-scope="scope">
							<el-button type="text" size="small" @click="submitAudit(scope.row)">推送审核</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-col :xs="12" :sm="12" :md="12" :lg="12">
					<el-row style="margin-top: 20px;">
					    <el-button type="primary" @click="submitEdit()">编辑</el-button>
						<router-link to="/advpro/advList" type="button" class="el-button el-button--warning">取消</router-link>
					</el-row>
				</el-col>
			</div>
		</el-container>
	</div>
</template>

<script>
import {mapState, mapActions}from 'vuex';

export default {
	data(){
		return {
			advCategory: {},
			detailForm: {
				id: 0,
				name: '',
				contacts: '',
				phone: 0,
				industryLevel1: '',
				industryLevel2: '',
				website: '',
				address: '',
				waxUid: [],
				fileContent:{},
				checkStatus: []
			},
			licenseFiles: [],
			loading:true
		}
	},

	methods:{
		...mapActions([
			'getAdvDev',
			'getAdvCategoryList',
			'pushAdvertiserAudit'
		]),

		async submitEdit(){
			this.$router.push({
                path: '/advpro/advForm',
                query:{id:this.detailForm.id}
            });
		},

		async submitAudit(medias){
			console.log('push audit.', medias, this.detailForm.id);
			let result = await this.pushAdvertiserAudit({id: this.detailForm.id, media: medias.media})
			console.log('result.', result);
		},

		async checkCategoryAndCacheState(){
			this.advCategory = this.category;
			if (!this.category || (this.category.length == 0)){
				let ctmp = await this.getAdvCategoryList();
				this.advCategory = ctmp;
			}
			let tmp = this.cache ||{};
			if (!(this.cache&&this.cache.id)){
				let id = this.$route.query.id;
				let advinfo = await this.getAdvDev(id);
				if (advinfo && advinfo.id){
					tmp = advinfo;
				}
			}

			//基本信息
			this.detailForm.id = tmp.id || 0;
			this.detailForm.name = tmp.name||'';
			this.detailForm.contacts = tmp.contacts||'';
			this.detailForm.phone = tmp.phone||'';
			this.detailForm.website = tmp.website||'';
			this.detailForm.address = tmp.address|| '';
			this.detailForm.waxUid = tmp.waxUid|| [];
			this.detailForm.checkStatus = tmp.checkStatus||[];

			//分类
			for (let i = 0; i < this.advCategory.length; i++) {
				if (this.advCategory[i].id == Number(tmp.industryLevel1||1)){
					this.detailForm.industryLevel1 = this.advCategory[i].name;
					for (let [k, subcate] of (this.advCategory[i].children||[]).entries()) {
						if (subcate.id == Number(tmp.industryLevel2||0)){
							this.detailForm.industryLevel2 = subcate.name;
							break;
						}
					}
					break;
				}
			}

			//资质文件
			for (let [i, fkey] of Object.keys(tmp.fileContent).entries()) {
				this.licenseFiles.push({
					name: tmp.fileContent[fkey].ft || '',
					urls: tmp.fileContent[fkey].urls || []
				});
			}

				this.loading=false;
		},
	},

	computed:{
		...mapState({
			cache:(state) => {
				return state.advpro.advertiser
			},
			category:(state) => {
				return state.advpro.advcategory
			}
		})
	},

	mounted() {

	},

    created(){
		this.checkCategoryAndCacheState();
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
	    line-height: 40px;
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
    .licenseList .label{
    	text-align: left;
    }
    .el-row {
	    box-sizing: border-box;
	}
	.borderLeft {
	    border-top: 5px solid #355c9d;
	}
</style>