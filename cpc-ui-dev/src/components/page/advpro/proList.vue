<template>
	<div class="centr">
		<!--<el-card class="box-card">-->
			<div class="searchDiv">
				<el-col :span="8">
					<el-input v-model="formInline.user"  @keyup.enter.native="onsubmitSearch()">
						<el-button slot="append" icon="el-icon-search" @click="onsubmitSearch()"></el-button>
					</el-input>
				</el-col>
				<el-button @click="createProUrl()" type="primary" icon="el-icon-plus" style="margin-left:50px">创建</el-button>
			</div>
			<div class="prolistDiv">
				<el-table :data="products" border height="350" style="width: 100%" v-loading="tableLoading">
					<el-table-column prop="id" label="ID" sortable></el-table-column>
					<el-table-column prop="name" label="名称" sortable></el-table-column>
					<el-table-column prop="type" label="产品类型">
						<template slot-scope="scope">
						    <template v-if="scope.row.type=='APP_DOWNLOAD'">APP下载</template>
						    <template v-else-if="scope.row.type=='E_COMMERCE'">电商</template>
						</template>
					</el-table-column>
					<el-table-column prop="os" label="平台"></el-table-column>
					<el-table-column prop="previewUrl" label="预览链接"></el-table-column>
					<!--<el-table-column prop="status" label="状态"></el-table-column>-->
					<el-table-column label="操作">
						<template slot-scope="scope">
							<el-button @click="lookProUrl(scope.row)" type="text" size="small">查看</el-button>
							<el-button @click="editProUrl(scope.row)" type="text" size="small">编辑</el-button>
						</template>
					</el-table-column>
				</el-table>
				<div class="block">
					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"  :page-sizes="[10, 50, 100, 400]" :page-size="pageCtr.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageCtr.pageTatol">
					</el-pagination>
				</div>
			</div>
		<!--</el-card>-->


	</div>
</template>
<script>
import {mapState, mapActions}from 'vuex';
	export default {
		data: function() {
			return {
				pageCtr: {
					pageSize: 10,
					pageTatol: 0,
					pageCurrent: 1
				},
				formInline: {
					user: ''
				},
				products: [],
				tableLoading:false
			}
		},
		methods: {
			...mapActions([
				'getProList',
				'setProCache'
			]),

			async createProUrl(){
				await this.setProCache({});
			      	this.$router.push({
	             	path: '/advpro/proForm'
	         	});
			},

			async onsubmitSearch() {

            	await this.getProData(0,10);
			},

			async handleSizeChange(val) {
				this.pageCtr.pageSize = val;
				let page=this.pageCtr.pageCurrent - 1
            	await this.getProData(page,val);
	      	},

	      	async handleCurrentChange(val) {
				this.pageCtr.pageCurrent = val;
				let page=val - 1
				let size=this.pageCtr.pageSize;
            	await this.getProData(page,size);
	      	},

	      	async getProData(page,size){
	      		this.tableLoading=true;
	      		let condition = {};
				if(this.formInline.user.length > 0){
					 condition['rules[0].field'] = 'name';
	                condition['rules[0].op'] =  'like';
	                condition['rules[0].data'] =  this.formInline.user;
	                condition['groupOp'] = 'AND';
				}
				condition['page'] = page;
	            condition['size'] = size;
	      		let prolist = await this.getProList(condition);
	      		if (prolist&&prolist.content&&prolist.content.length>0){
					this.pageCtr.pageTatol =  prolist.totalElements||0;
					this.products = prolist.content||[];
	      		}else{
	                this.pageCtr.pageTatol = 0;
	                this.products = [];
	            }
	      		this.tableLoading=false;
			},

    		async lookProUrl(pro){
	 			await this.setProCache(pro);
			    this.$router.push({
	             	path: '/advpro/proDetail',
	             	query:{id:pro.id}
	         	});
		    },
		    async editProUrl(pro){
				await this.setProCache(pro);
			    this.$router.push({
	             	path: '/advpro/proForm',
	             	query:{id:pro.id}
	         	});
		    }
		},

		created(){
			this.getProData(0,10);
		}
	}
</script>
<style>
	.row {
	    font-size: 12px;
	    line-height: 45px;
	    border-bottom: 1px dashed #eff5f7;
	}
	.searchDiv {
	  padding-top: 40px;
	  padding-left: 50px;
	  .el-select .el-input {
		   width: 100px;
		 }
	}
	.prolistDiv {
	      padding: 30px;
	      padding-top: 20px;
	}
</style>