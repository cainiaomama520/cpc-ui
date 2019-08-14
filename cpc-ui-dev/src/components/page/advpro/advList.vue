<template>
	<div class="centr">
		<!--<el-card class="box-card">-->
            <div class="searchDiv">
                <el-col :span="8">
                    <el-input v-model="formInline.user" @keyup.enter.native="onsubmitSearch()">
                        <el-button slot="append" icon="el-icon-search" @click="onsubmitSearch()"></el-button>
                    </el-input>
                </el-col>
                <el-button @click="createAdverUrl()" type="primary" icon="el-icon-plus" style="margin-left:50px">创建</el-button>
            </div>
			<div class="advlistDiv">
				<el-table :data="advertisers" border height="350" style="width: 100%"   v-loading="tableLoading">
					<el-table-column prop="id" label="ID" sortable></el-table-column>
					<el-table-column prop="name" label="名称" sortable></el-table-column>
					<el-table-column prop="contacts" label="联系人"></el-table-column>
					<el-table-column prop="phone" label="联系电话"></el-table-column>
					<el-table-column prop="checkStatus" label="审核状态">
						<template slot-scope="scope">
							<template v-for="(item ,index) in scope.row.checkStatus">
						    	<p v-if="item.media=='WAX'" style="white-space: nowrap;">
						    		微博:
						    		<span v-if="item.checkStatus=='pass'">审核成功</span>
							    	<span v-else-if="item.checkStatus=='init'">未送审</span>
							    	<span v-else-if="item.checkStatus=='pending'">审核中</span>
							    	<span v-else="item.checkStatus=='failed'">审核失败</span>
						    	</p>
						    	<p v-else-if="item.media=='BAIDU_GD'" style="white-space: nowrap;">
						    		百度:
						    		<span v-if="item.checkStatus=='pass'">审核成功</span>
							    	<span v-else-if="item.checkStatus=='init'">未送审</span>
							    	<span v-else-if="item.checkStatus=='pending'">审核中</span>
							    	<span v-else="item.checkStatus=='failed'">审核失败</span>
						    	</p>
						    </template>
						</template>
					</el-table-column>
					<el-table-column label="操作">
						<template slot-scope="scope">
							<el-button @click="lookAdverUrl(scope.row)" type="text" size="small">查看</el-button>
							<el-button @click="editAdverUrl(scope.row)" type="text" size="small">编辑</el-button>
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
	data() {
		return {
			pageCtr: {
				pageSize: 10,
				pageTatol: 0,
				pageCurrent: 1
			},

			formInline: {
				user: ''
			},

			advertisers: [],
			tableLoading:false
		}
	},
	methods: {
		...mapActions([
			'getAdvCategoryList',
			'getAdvList',
			'setAdvCache'
		]),

        async createAdverUrl() {
            await this.setAdvCache({});
            this.$router.push({
                path: '/advpro/advForm'
            });
        },

        async onsubmitSearch(){
            console.log('this.', this.formInline.user);
            await this.getAdvData(0,10);
        },
		async handleSizeChange(val) {
			this.pageCtr.pageSize = val;
			let page=this.pageCtr.pageCurrent - 1
            await this.getAdvData(page,val);
      	},
      	async handleCurrentChange(val) {
			this.pageCtr.pageCurrent = val;
			let page=val - 1
			let size=this.pageCtr.pageSize;
            await this.getAdvData(page,size);

        	console.log('当前页: ${val}', val);
      	},

		async getAdvData(page,size){
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
      		let advlist = await this.getAdvList(condition);
      		if (advlist&&advlist.content&&advlist.content.length>0){
				this.pageCtr.pageTatol =  advlist.totalElements||0;
				this.advertisers = advlist.content||[];
      		}else{
                this.pageCtr.pageTatol = 0;
                this.advertisers = [];
            }
      		this.tableLoading=false;
		},

		async lookAdverUrl(adv) {
            console.log('check cache.', adv);
			await this.setAdvCache(adv);
			this.$router.push({
                path: '/advpro/advDetail',
                query:{id:adv.id}
            });
	    },

	    async editAdverUrl(adv) {
	    	await this.setAdvCache(adv);
            console.log('edit cache.', adv);
			this.$router.push({
                path: '/advpro/advForm',
                query:{id:adv.id}
            });
	    }
	},

	created(){
		this.getAdvCategoryList();
		this.getAdvData(0,10);
	}
}
</script>

<style >
.searchDiv {
  padding-top: 40px;
  padding-left: 50px;
  .el-select .el-input {
	   width: 100px;
	 }
}
.advlistDiv {
      padding: 30px;
      padding-top: 20px;
}
</style>
