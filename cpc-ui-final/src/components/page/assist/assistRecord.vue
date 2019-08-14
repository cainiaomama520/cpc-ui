<template>
	<div class="centr record">
		<div class="searchDiv">
		<!--<el-card>-->
			<el-form ref="form" :model="form" label-width="140px"  :rules="rules">
				<el-col>
					<el-col :span="8">
						<el-form-item label="广告创意/链接ID：" prop="idSearch">
							<el-input placeholder="请输入ID" v-model="form.idSearch" clearable></el-input>
						</el-form-item>
					</el-col>
				</el-col>
				<el-col>
					<el-col :span="8">
						<el-form-item label="IDFA：" prop="idfaSearch">
							<el-input placeholder="请输入IDFA" v-model="form.idfaSearch"  clearable></el-input>
						</el-form-item>
					</el-col>
				</el-col>
				<el-button type="primary" icon="el-icon-search" @click="onsubmitSearch('form')" style="margin-left:50px">查询</el-button>
		    </el-form>
		<!--</el-card>-->
		</div>
		<div class="recordDiv" v-for="log in datas">
        	<el-card>
        		<el-col class="line" :span="24" style="margin-bottom: 10px;margin-top: 10px;"><h4>链接原型</h4></el-col>
        		<el-row><el-col class="borderLeft" :span="24"></el-col></el-row>
        		<el-row label-width="100px">
        			<el-col :xs="24" :sm="24" :md="24" :lg="24">
							<el-row class="row">
								<el-col :xs="24" :sm="24" :md="24" :lg="4"  class="label">链接原型:</el-col>
								<el-col :xs="24" :sm="24" :md="24" :lg="20" style="word-wrap:break-word;">{{log.link_source}}</el-col>
							</el-row>
						</el-col>
        		</el-row>
        		<el-col class="line" :span="24" style="margin-bottom: 10px;margin-top: 10px;"><h4>上报状态</h4></el-col>
        		<el-row><el-col class="borderLeft" :span="24"></el-col></el-row>
        		<el-row label-width="100px">
        			<el-col :xs="24" :sm="24" :md="24" :lg="24">
						<el-row class="row">
							<el-col :xs="24" :sm="24" :md="24" :lg="4"  class="label">上报链接:</el-col>
							<el-col :xs="24" :sm="24" :md="24" :lg="20" style="word-wrap:break-word;">{{log.click_link}}</el-col>
						</el-row>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12">
						<el-row class="row">
							<el-col :xs="24" :sm="12" :md="12" :lg="8"  class="label">上报时间:</el-col>
							<el-col :xs="24" :sm="12" :md="12" :lg="16">{{log.click_time}}</el-col>
						</el-row>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12">
						<el-row class="row">
							<el-col :xs="24" :sm="12" :md="12" :lg="8"  class="label">上报IP:</el-col>
							<el-col :xs="24" :sm="12" :md="12" :lg="16">{{log.click_ip}}</el-col>
						</el-row>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24">
						<el-row class="row">
							<el-col :xs="24" :sm="24" :md="24" :lg="4"  class="label">上报User-Agent:</el-col>
							<el-col :xs="24" :sm="24" :md="24" :lg="20" style="word-wrap:break-word;">{{log.click_Ua}}</el-col>
						</el-row>
					</el-col>
        		</el-row>
        		<el-col class="line" :span="24" style="margin-bottom: 10px;margin-top: 10px;"><h4>上报广告主</h4></el-col>
        		<el-row><el-col class="borderLeft" :span="24"></el-col></el-row>
        		<el-row label-width="100px">
        			<el-col :xs="24" :sm="24" :md="24" :lg="24">
						<el-row class="row">
							<el-col :xs="24" :sm="24" :md="24" :lg="4"  class="label">上报时间:</el-col>
							<el-col :xs="24" :sm="24" :md="24" :lg="20">{{log.report_adv_time}}</el-col>
						</el-row>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24">
						<el-row class="row">
							<el-col :xs="24" :sm="24" :md="24" :lg="4"  class="label">上报链接:</el-col>
							<el-col :xs="24" :sm="24" :md="24" :lg="20" style="word-wrap:break-word;">{{log.report_adv_Link}}</el-col>
						</el-row>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24">
						<el-row class="row">
							<el-col :xs="24" :sm="24" :md="24" :lg="4"  class="label">返回HTTP Code:</el-col>
							<el-col :xs="24" :sm="24" :md="24" :lg="20">{{log.report_adv_rescode}}</el-col>
						</el-row>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24">
						<el-row class="row">
							<el-col :xs="24" :sm="24" :md="24" :lg="4"  class="label">返回HTTP Content:</el-col>
							<el-col :xs="24" :sm="24" :md="24" :lg="20" style="word-wrap:break-word;">{{log.report_adv_rescnt}}</el-col>
						</el-row>
					</el-col>
        		</el-row>
        		<el-col class="line" :span="24" style="margin-bottom: 10px;margin-top: 10px;"><h4>激活状态</h4></el-col>
        		<el-row><el-col class="borderLeft" :span="24"></el-col></el-row>
        		<el-row label-width="100px">
        			<el-col :xs="24" :sm="24" :md="24" :lg="24">
						<el-row class="row">
							<el-col :xs="24" :sm="24" :md="24" :lg="4"  class="label">回调链接:</el-col>
							<el-col :xs="24" :sm="24" :md="24" :lg="20" style="word-wrap:break-word;">{{log.active_cblink}}</el-col>
						</el-row>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24">
						<el-row class="row">
							<el-col :xs="24" :sm="24" :md="24" :lg="4"  class="label">回调时间:</el-col>
							<el-col :xs="24" :sm="24" :md="24" :lg="20">{{log.active_cbtime}}</el-col>
						</el-row>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24">
						<el-row class="row">
							<el-col :xs="24" :sm="24" :md="24" :lg="4"  class="label">回调下游链接:</el-col>
							<el-col :xs="24" :sm="24" :md="24" :lg="20" style="word-wrap:break-word;">{{log.active_cbchannel}}</el-col>
						</el-row>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24">
						<el-row class="row">
							<el-col :xs="24" :sm="24" :md="24" :lg="4"  class="label">返回HTTP Code:</el-col>
							<el-col :xs="24" :sm="24" :md="24" :lg="20">{{log.active_cbchcode}}</el-col>
						</el-row>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24">
						<el-row class="row">
							<el-col :xs="24" :sm="24" :md="24" :lg="4"  class="label">返回HTTP Content:</el-col>
							<el-col :xs="24" :sm="24" :md="24" :lg="20"  style="word-wrap:break-word;">{{log.active_cbchcnt}}</el-col>
						</el-row>
					</el-col>
        		</el-row>
        	</el-card>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				form:{
					idSearch:'',
					idfaSearch:''
				},
				datas: [],
				name:'',
				date:'',
				ipaddress:'',
				httpCode:'',
				httpContent:'',
				rules: {
					idSearch: [
						{ required: true, message: '请输入广告创意/链接ID', trigger: 'blur' }
					],
					idfaSearch: [
						{ required: true, message: '请输入IDFA', trigger: 'blur' }
					]
				}
			}
		},
		methods: {
			onsubmitSearch(form){
				this.$refs[form].validate((valid) => {
			         if (valid) {
			            let _this = this;
						this.$api.logsnative('http://callback.gdtrafficad.com/flog?creativeid='+(this.form.idSearch||'')+'&idfa='+(this.form.idfaSearch||''), {} , {},function(r) {
							if(r.data){
								_this.datas = r.data;
							}
						});
			        } else {
			            return false;
			        }
		        });

			}
		}
	}
</script>

<style>
	.record .searchDiv {
	  padding: 30px;
	    padding-top: 20px;
	    .el-select .el-input {
		   width: 100px;
		}
	}
	.recordDiv {
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