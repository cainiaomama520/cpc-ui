<template>
	<div class="centr peoples">
		<div class="searchDiv">
			<el-row label-width="100px">
        			<el-col :xs="24" :sm="24" :md="24" :lg="24">
						<el-row class="row">
							<el-col :xs="24" :sm="24" :md="24" :lg="4"  class="label">人群包类型：</el-col>
							<el-col :xs="24" :sm="24" :md="24" :lg="20">
								<el-radio-group v-model="packageType" size="medium">
									<el-radio-button label="">全部</el-radio-button>
									<el-radio-button label="DEVICE">设备ID</el-radio-button>
									<el-radio-button label="PHONE">电话号码</el-radio-button>
								</el-radio-group>
							</el-col>
						</el-row>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24">
						<el-row class="row">
							<el-col :xs="24" :sm="24" :md="24" :lg="4"  class="label">人群包来源：</el-col>
							<el-col :xs="24" :sm="24" :md="24" :lg="20">
								<el-radio-group v-model="source" size="medium">
									<el-radio-button label="">全部</el-radio-button>
									<el-radio-button label="UPLOAD">自主上传</el-radio-button>
								</el-radio-group>
							</el-col>
						</el-row>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24">
						<el-row class="row">
							<el-col :xs="24" :sm="24" :md="24" :lg="4"  class="label">人群包状态：</el-col>
							<el-col :xs="24" :sm="24" :md="24" :lg="20">
								<el-radio-group v-model="status" size="medium">
									<el-radio-button label="">全部</el-radio-button>
									<el-radio-button label="SUCCESS">审核通过</el-radio-button>
									<el-radio-button label="PENDING">正在审核</el-radio-button>
									<el-radio-button label="FAILED">审核失败</el-radio-button>
								</el-radio-group>
							</el-col>
						</el-row>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24">
						<el-row class="row">
							<el-col :xs="24" :sm="24" :md="24" :lg="4"  class="label">适用媒体：</el-col>
							<el-col :xs="24" :sm="24" :md="24" :lg="20">
								<el-radio-group v-model="media" size="medium">
									<el-radio-button label="">全部</el-radio-button>
									<el-radio-button label="WAX">微博</el-radio-button>
									<el-radio-button label="BAIDU_GD">百度</el-radio-button>
								</el-radio-group>
							</el-col>
						</el-row>
					</el-col>
        		</el-row>
        		<el-row style="margin-top: 20px">
        			<el-button type="primary" icon="el-icon-search"  @click="onsubmitSearch()" style="margin-left:50px">查询</el-button>
        			<el-button type="primary" icon="el-icon-upload" @click="dialogFormVisible = true" style="margin-left:50px">上传</el-button>
        			<el-button type="text" @click="dialogVisible = true">上传说明？</el-button>
        		</el-row>
		</div>
		<div class="peoplesDiv">
			<el-table :data="tableData" border height="350" style="width: 100%"   v-loading="tableLoading">
				<el-table-column prop="id" label="人群包ID"></el-table-column>
				<el-table-column prop="name" label="人群包名称"></el-table-column>
				<el-table-column prop="media" label="适用媒体">
					<template slot-scope="scope">
					    <span v-if="scope.row.media=='WAX'">微博</span>
					    <span v-else-if="scope.row.media=='BAIDU_GD'">百度</span>
					    <span v-else-if="scope.row.media=='WAX,BAIDU_GD'">微博，百度</span>
					</template>
				</el-table-column>
				<el-table-column prop="content" label="覆盖用户数">
					<template slot-scope="scope">
						<template v-if="scope.row.content && scope.row.content.length !=0">
							<template v-for="(item ,index) in scope.row.content">
						    	<p v-if="item.dmpType=='WAX'" style="white-space: nowrap;">
						    		微博：
						    		<span>{{item.coverage}}</span>
						    	</p>
						    	<p v-else-if="item.dmpType=='BAIDU_GD'" style="white-space: nowrap;">
						    		百度：
						    		<span>{{item.coverage}}</span>
						    	</p>
						    </template>
						</template>
						<template v-else>0</template>
					</template>
				</el-table-column>
				<el-table-column prop="packageType" label="类型">
					<template slot-scope="scope">
					    <span v-if="scope.row.packageType=='DEVICE'">设备ID</span>
					    <span v-else-if="scope.row.packageType=='PHONE'">电话号码</span>
					</template>
				</el-table-column>
				<el-table-column prop="source" label="来源">
					<template slot-scope="scope">
					    <span v-if="scope.row.source=='UPLOAD'">自主上传</span>
					</template>
				</el-table-column>
				<el-table-column prop="content" label="状态">
					<template slot-scope="scope">
						<template v-if="scope.row.content && scope.row.content.length !=0">
							<template  v-for="(item ,index) in scope.row.content">
						    	<p v-if="item.dmpType=='WAX'" style="white-space: nowrap;">
						    		微博：
						    		<span v-if="item.packageStatus=='SUCCESS'">审核通过</span>
								    <span v-else-if="item.packageStatus=='PENDING'">正在审核</span>
								    <span v-else-if="item.packageStatus=='FAILED'">审核失败</span>
						    	</p>
						    	<p v-else-if="item.dmpType=='BAIDU_GD'" style="white-space: nowrap;">
						    		百度：
						    		<span v-if="item.packageStatus=='SUCCESS'">审核通过</span>
								    <span v-else-if="item.packageStatus=='PENDING'">正在审核</span>
								    <span v-else-if="item.packageStatus=='FAILED'">审核失败</span>
						    	</p>
						    </template>
						</template>
						<template v-else>请联系管理员！</template>
					</template>
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button @click="deletePacketData(scope.row.id)" type="text" size="small">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="block">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageCtr.pageCurrent" :page-sizes="[10, 50, 100, 400]" :page-size="pageCtr.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageCtr.pageTatol">
				</el-pagination>
			</div>
		</div>
		<!--上传文件弹出框-->
		<el-dialog title="人群包上传" :visible.sync="dialogFormVisible">
			<el-form :model="form" :rules="rules" ref="form" label-width="120px">
				<el-form-item label="人群包名称：" prop="packageName">
					<el-col :xs="24" :sm="16" :md="10" :lg="9">
						<el-input v-model="form.packageName" auto-complete="off"></el-input>
					</el-col>
				</el-form-item>
				<el-form-item label="人群包类型：" prop="packageTypeSelect">
					<el-select v-model="form.packageTypeSelect" placeholder="请选择">
						<el-option label="设备ID" value="DEVICE"></el-option>
						<el-option label="电话号码" value="PHONE"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="人群包来源：" prop="sourceSelect">
					<el-select v-model="form.sourceSelect" placeholder="请选择">
						<el-option label="自主上传" value="UPLOAD"></el-option>
						<!--<el-option label="区域二" value="beijing"></el-option>-->
					</el-select>
				</el-form-item>
				<el-form-item label="适用媒体：" prop="mediaSelect">
					<el-select v-model="form.mediaSelect" multiple placeholder="请选择">
						<el-option label="微博" value="WAX"></el-option>
						<el-option label="百度" value="BAIDU_GD"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="选择文件：" prop="upfile">
					<UploadSingle v-model="form.upfile" label="点击上传" style="width: 100px; float: left; margin-left:20px;"></UploadSingle>
					<a v-bind:href="form.upfile.url" target="_blank">{{form.upfile.name}}</a>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="submitForm('form')">确 定</el-button>
			</div>
		</el-dialog>
		<!--上传说明弹出框-->
		<el-dialog title="人群包上传说明" :visible.sync="dialogVisible">
			<p>人群包上传，现支持设备码（IOS为IDFA，android为imei或者androidid）和电话号码的上传；</p>
			<p>上传文件为txt格式；</p>
			<p>文件内容格式为每行为一个设备码或者电话号码；</p>
			<p>上传成功后系统会针对该文件进行审核，审核状态系统自动更新。</p>
			<span slot="footer" class="dialog-footer">
		    <el-button type="primary" @click="dialogVisible = false">返 回</el-button>
		  </span>
		</el-dialog>
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
		data() {
			return {
				pageCtr: {
					pageSize: 10,
					pageTatol: 0,
					pageCurrent: 1
				},
				packageType:'',
				source:'',
				status:'',
				media:'',
				tableData:[],
				tableLoading:true,
				dialogFormVisible:false,
				dialogVisible: false,
				form:{
					packageName:'',
					packageTypeSelect:'',
					sourceSelect:'',
					mediaSelect:'',
					upfile:{name:'', url:''}
				},
				rules: {
					packageName: [
						{ required: true, message: '请输入名称', trigger: 'blur' }
					],
					packageTypeSelect: [
						{ required: true, message: '请选择人群包', trigger: 'change' }
					],
					mediaSelect: [
						{ required: true, message: '请选择媒体', trigger: 'change' }
					]
				}
			}
		},
		methods: {
			...mapActions([
				'setMessage',
				'getPeoplePacketList',
				'createPacket',
				'deletePacket'
			]),
			async checkInput(form){
				return new Promise((resolve, reject) => {
					this.$refs[form].validate((valid) => {
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
			async submitForm(form) {
	            let isvalid = await new Promise((resolve, reject) => {
	                this.$refs[form].validate((valid) => {
	                    if (valid) {
	                        console.log('resolve.');
	                        resolve(true);
	                    } else {
	                        resolve(false);
	                    }
	                });
	            });

	            if(isvalid){
	                let sdata = {};
	                sdata['name'] = this.form.packageName;
                    sdata['packageType'] = this.form.packageTypeSelect;
                    sdata['source'] = this.form.sourceSelect;
                    sdata['status'] = this.form.statusSelect;
                    sdata['media'] = this.form.mediaSelect.join(",");
                    sdata['url'] = this.form.upfile.url;

                    let result = await this.createPacket(sdata);
                    if(result&&Object.keys(result).length > 0){
                        console.log("create success.", result);
                        this.setMessage({
                            type: 'info',
                            message: '上传数据包成功'
                        });
                        this.dialogFormVisible = false;
                        this.form = {
							packageType:'',
							source:'',
							media:'',
							upfile:{name:'', url:''}
						};
                         let page=this.pageCtr.pageCurrent - 1
		                let size=this.pageCtr.pageSize;
		                await this.getPeoplePacketData(page,size,['id,desc']);
                    }else{
                        this.form = {
							packageType:'',
							source:'',
							media:'',
							upfile:{name:'', url:''}
						};//恢复form初始状态
                        this.setMessage({
                            type: 'error',
                            message: '上传数据包失败'
                        });
                    }
	            }
			},
			async deletePacketData(id){
				let r=confirm('确认要删除吗？')
				if(r){
					console.log(id)
	                await this.deletePacket(id);
	                this.setMessage({
	                    type: 'info',
	                    message: '删除数据包成功'
	                });
	                let page=this.pageCtr.pageCurrent - 1
	                let size=this.pageCtr.pageSize;
	                await this.getPeoplePacketData(page,size,['id,desc']);
				}
			},
			async onsubmitSearch(){

	            await this.getPeoplePacketData(0,10,['id,desc']);
	        },
	        async getPeoplePacketData(page,size,sort){
	        	this.tableLoading=true;
	        	let condition = {
	            	'rules[0].field':'packageType',
                    'rules[0].op': 'eq',
                    'rules[0].data': this.packageType,
                    'rules[1].field':'source',
                    'rules[1].op': 'eq',
                    'rules[1].data': this.source,
                    'rules[2].field':'status',
                    'rules[2].op': 'eq',
                    'rules[2].data': this.status,
                    'rules[3].field':'media',
                    'rules[3].op': 'like',
                    'rules[3].data': this.media,
                    'groupOp': 'AND',
                    'page': page,
  					'size': size,
  					'sort': sort
	            }
				if(this.packageType == '' && this.source == '' && this.status == '' && this.media == '' ){
	        		condition = {
	        			'page': page,
  						'size': size,
  						'sort': sort
	        		};
				}
	      		let packetlist = await this.getPeoplePacketList(condition);
	      		if (packetlist&&packetlist.content&&packetlist.content.length>0){
					this.pageCtr.pageTatol =  packetlist.totalElements||0;
					this.tableData = packetlist.content||[];
					console.log(this.tableData)
					
	      		}else{
	                this.pageCtr.pageTatol = 0;
	                this.tableData = [];
	            }
	      		this.tableLoading=false;
			},
	        async handleSizeChange(val) {
	        	let page=this.pageCtr.pageCurrent - 1;
	        	this.pageCtr.pageSize = val;
	            await this.getPeoplePacketData(page,val,['id,desc']);
	      	},
	      	async handleCurrentChange(val) {
	      		this.pageCtr.pageCurrent = val;
				let page=val - 1
				let size=this.pageCtr.pageSize;
	            await this.getPeoplePacketData(page,size,['id,desc']);
	      	}
	    },
	    computed:{
			...mapState({
				cache:(state) => {
					return state.peoples.peoplePacket
				},
			})
		},
	    created(){
			this.getPeoplePacketData(0,10,['id,desc']);
		}
	}
</script>

<style>
	.peoples .searchDiv {
	  padding: 30px;
	    padding-top: 20px;
	    .el-select .el-input {
		   width: 100px;
		}
	}
	.peoplesDiv {
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