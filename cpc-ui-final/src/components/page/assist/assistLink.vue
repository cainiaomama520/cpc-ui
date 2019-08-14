<template>
	<div class="centr link">
		<div class="searchDiv">
		<!--<el-card>-->
			<el-form ref="form" :model="form" label-width="130px">
				<el-col>
					<el-col :span="8">
						<el-form-item label="广告主：">
							<el-select v-model="form.adv" clearable  filterable placeholder="请选择">
								<el-option v-for="item in adverArry" :key="item.id" :label="item.name" :value="item.id"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="产品：">
							<el-select v-model="form.pro" clearable  filterable placeholder="请选择">
								<el-option v-for="item in proArry" :key="item.id" :label="item.name" :value="item.id"></el-option>
								</el-select>
						</el-form-item>
					</el-col>
				</el-col>
				<el-col>
					<el-col :span="8">
						<el-form-item label="链接标识：">
							<el-select v-model="form.link" clearable  filterable placeholder="请选择">
									<el-option v-for="item in linkArry" :key="item" :label="item" :value="item"></el-option>
								</el-select>
						</el-form-item>
					</el-col>
				</el-col>
				<el-button type="primary" icon="el-icon-search"  @click="onsubmitSearch()" style="margin-left:50px">查询</el-button>
				<el-button @click="createLink()" type="primary" icon="el-icon-plus" style="margin-left:50px">创建</el-button>
				<el-button @click="multiCreateLink()" type="primary"  style="margin-left:50px">批量创建</el-button>
		    </el-form>
		<!--</el-card>-->
		</div>
		<div class="linkDiv">
        	<el-table :data="tableData" border  style="width: 100%"   v-loading="tableLoading">
				<el-table-column prop="advertiser.name" label="广告主">
					<!--<template slot-scope="scope">
					    <span v-if="scope.row.advertiser">{{scope.row.advertiser.name}}</span>
					</template>-->
				</el-table-column>
				<el-table-column prop="product.name" label="产品"></el-table-column>
				<!--<el-table-column prop="type" label="链接类型">
					<template slot-scope="scope">
					    <template v-if="scope.row.type=='CLK'">点击</template>
					    <template v-else-if="scope.row.type=='IMP'">展示</template>
					</template>
				</el-table-column>
				<el-table-column prop="url" label="链接"></el-table-column>-->
				<el-table-column prop="name" label="链接标识"></el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button @click="editLinkUrl(scope.row)" type="text" size="small">编辑</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="block">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"  :page-sizes="[10, 50, 100, 400]" :page-size="pageCtr.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageCtr.pageTatol">
				</el-pagination>
			</div>
		</div>
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
				form:{
					adv : '',
					pro : '',
					link : ''
				},
				adverArry:[],
				proArry:[],
				linkArry:[],
				tableData:[],
				tableLoading:true
			}
		},
		methods: {
			...mapActions([
				'getadverList',
				'assistProList',
				'getTracklinkList',
				'getAssistlinkList',
				'setLinkCache'
			]),
			//请求搜索框广告主列表
			async getAdvData(options){
	      		let advlist = await this.getadverList(options);
	      		if (advlist && advlist.length>0){
					this.adverArry = advlist||[];
	      		}else{
	                this.adverArry = [];
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
				//请求搜索框链接标识列表
			async getTracklinkData(options){
	      		let tracklinklist = await this.getTracklinkList(options);
	      		let array=[];
	      		if (tracklinklist &&tracklinklist.content && tracklinklist.content.length>0){
					for(let i = 0; i < tracklinklist.content.length; i++){
	      				array.push(tracklinklist.content[i].name);
	      			}
	      			this.linkArry = this.handle(array);//数组去重
	      		}else{
	                this.linkArry = [];
	           }
			},
			async onsubmitSearch(){
	            await this.getAssistlinkData(0,10);
	        },
	        async getAssistlinkData(page,size){
	        	this.tableLoading=true;
	        	let condition = {
	                    'rules[0].field':'advertiser.id',
	                    'rules[0].op': 'eq',
	                    'rules[0].data': this.form.adv,
	                    'rules[1].field':'name',
	                    'rules[1].op': 'eq',
	                    'rules[1].data': this.form.link,
	                    'rules[2].field':'product.id',
	                    'rules[2].op': 'eq',
	                    'rules[2].data': this.form.pro,
	                    'groupOp': 'AND',
	                    'page': page,
	  					'size': size
	            }
				if(this.form.adv == '' && this.form.link == '' && this.form.pro == ''){
					condition = {
						'page': page,
	  					'size': size
					}
				}
	      		let linklist = await this.getAssistlinkList(condition);
	      		if (linklist&&linklist.content&&linklist.content.length>0){
					this.pageCtr.pageTatol =  linklist.totalElements||0;
					this.tableData = linklist.content||[];
	      		}else{
	                this.pageCtr.pageTatol = 0;
	                this.tableData = [];
	            }
	      		this.tableLoading=false;
			},
	        async handleSizeChange(val) {
	        	this.pageCtr.pageSize = val;
	        	let page=this.pageCtr.pageCurrent - 1
	            await this.getAssistlinkData(page,val);
	      	},
	      	async handleCurrentChange(val) {
	      		this.pageCtr.pageCurrent = val;
				let page=val - 1
				let size=this.pageCtr.pageSize;
	            await this.getAssistlinkData(page,size);
	        	console.log('当前页: ${val}');
	      	},
	      	async createLink(){
	      		await this.setLinkCache({});
			      	this.$router.push({
	             	path: '/assist/linkForm'
	         	});
	      	},
	      	async multiCreateLink(){
	      		await this.setLinkCache({});
			      	this.$router.push({
	             	path: '/assist/multiLinkForm'
	         	});
	      	},
	      	async editLinkUrl(trackLink){
				await this.setLinkCache(trackLink);

			    this.$router.push({
	             	path: '/assist/linkForm',
	             	query:{id:trackLink.id}
	         	});
		    },
			handle:function(item) {
				for (var i = 0; i < item.length; i++) {
					for (var n = i + 1; n < item.length; n++) {
						if (item[n] == item[i]) {
							item.splice(n, 1);
							n--;
						}
					}
				}
				return item;
			}
	    },
	    created(){
			this.getAdvData();
			this.getProData();
			this.getTracklinkData();
			this.getAssistlinkData(0,10);
		}
	}
</script>

<style>
	.link .searchDiv {
	  padding: 30px;
	    padding-top: 20px;
	    .el-select .el-input {
		   width: 100px;
		}
	}
	.linkDiv {
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
</style>