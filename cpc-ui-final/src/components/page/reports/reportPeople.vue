<template>
	<div class="">
		<div class="searchDiv">
		   <el-form ref="form" :model="form" label-width="120px">
		   		<el-col>
			   		<el-form-item label="日期：">
						<el-date-picker v-model="form.dateCheck" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd">
						</el-date-picker>
					</el-form-item>
				</el-col>
				<el-col>
					<el-col :span="8">
						<el-form-item label="广告活动：">
							<el-select v-model="form.campaign" clearable  filterable placeholder="请选择">
								<el-option v-for="item in campaignArry" :key="item.id" :label="item.name" :value="item.id"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="媒体：">
							<el-select v-model="form.mediaInfo" clearable  filterable placeholder="请选择">
								<el-option v-for="item in mediaArry" :key="item.id" :label="item.name" :value="item.id"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="维度：">
							<el-select v-model="form.category" clearable  filterable placeholder="请选择">
								<el-option label="兴趣" value="1"></el-option>
							    <el-option label="省级地域" value="2"></el-option>
							    <el-option label="性别" value="3"></el-option>
							    <el-option label="年龄" value="4"></el-option>
							    <el-option label="系统" value="5"></el-option>
							    <el-option label="人生状态" value="6"></el-option>
							    <el-option label="用户偏好" value="7"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-col>
				<el-button type="primary" icon="el-icon-search"  @click="onsubmitSearch()" style="margin-left:50px">搜索</el-button>
		   </el-form>
		</div>
		<div class="reportPeopleDiv">
			<el-table :data="tableData" border  height="300" style="width: 100%">
				<el-table-column prop="" label="维度"></el-table-column>
				<el-table-column prop="" label="曝光数"></el-table-column>
				<el-table-column prop="" label="消耗（元）"></el-table-column>
				<el-table-column prop="" label="CPM"></el-table-column>
				<el-table-column prop="" label="互动数"></el-table-column>
				<el-table-column prop="" label="互动率"></el-table-column>
				<el-table-column prop="" label="互动成本"></el-table-column>
				<el-table-column prop="" label="点击数"></el-table-column>
				<el-table-column prop="" label="点击成本"></el-table-column>
				<el-table-column prop="" label="激活数"></el-table-column>
				<el-table-column prop="" label="激活率"></el-table-column>
				<el-table-column prop="" label="激活成本"></el-table-column>
			</el-table>
			<div class="block">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageCtr.pageCurrent" :page-sizes="[10, 50, 100, 400]" :page-size="pageCtr.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageCtr.pageTatol">
				</el-pagination>
			</div>
		</div>
		<div class="reportPeopleDiv">
			<el-radio-group v-model="chartsType">
			    <el-radio-button label="曝光">曝光</el-radio-button>
			    <el-radio-button label="点击">点击</el-radio-button>
			    <el-radio-button label="互动">互动</el-radio-button>
			    <el-radio-button label="激活">激活</el-radio-button>
			</el-radio-group>
			<el-row :gutter="20">
	            <el-col :span="12">
    				<el-card>
	                	<div id="interestCharts" :style="{height:height,width:width}"></div>
	    			</el-card>
	            </el-col>
	            <el-col :span="12">
	            	<el-card>
	                	<div id="liftStateCharts" :style="{height:height,width:width}"></div>
	                </el-card>
	            </el-col>
	         </el-row>
	         <el-row :gutter="20">
	            <el-col :span="12">
    				<el-card>
	                	<div id="preferenceCharts" :style="{height:height,width:width}"></div>
	    			</el-card>
	            </el-col>
	            <el-col :span="12">
	            	<el-card>
	                	<div id="addressCharts" :style="{height:height,width:width}"></div>
	                </el-card>
	            </el-col>
	         </el-row>
	         <el-row :gutter="20">
	            <el-col :span="12">
    				<el-card>
	                	<div id="sexCharts" :style="{height:height,width:width}"></div>
	    			</el-card>
	            </el-col>
	            <el-col :span="12">
	            	<el-card>
	                	<div id="ageCharts" :style="{height:height,width:width}"></div>
	                </el-card>
	            </el-col>
	         </el-row>
	         <el-row :gutter="20">
	            <el-col :span="12">
    				<el-card>
	                	<div id="osCharts" :style="{height:height,width:width}"></div>
	    			</el-card>
	            </el-col>
	            <el-col :span="12">
	            	<el-card>
	                	<div id="networkCharts" :style="{height:height,width:width}"></div>
	                </el-card>
	            </el-col>
	         </el-row>
        </div>
	</div>
</template>

<script>
	import echarts from 'echarts'
	import {mapState, mapActions}from 'vuex';
	export default {
		props: {
		    width: {
		      type: String,
		      default: '100%'
		    },
		    height: {
		      type: String,
		      default: '200px'
		    },
		    autoResize: {
		      type: Boolean,
		      default: true
		    }
		  },
		data(){
			return{
				pageCtr: {
					pageSize: 10,
					pageTatol: 0,
					pageCurrent: 1
				},				
				form: {
					dateCheck : '',
					campaign:'',
					mediaInfo:'',
					category:''
				},
		        campaignArry:[],
		        mediaArry:[],
		        tableData: [],
		        chartsType:'曝光',
		        interestCharts: null,
		        interestX:[],//用户兴趣X轴
		        interestY:[],//用户兴趣Y轴
                liftStateCharts: null,//人生状态X轴
                lifeStateX:[],//人生状态Y轴
                lifeStateY:[],
                preferenceCharts: null,
                preferenceX:[],//用户偏好X轴
                preferenceY:[],//用户偏好Y轴
                addressCharts: null,
                addressX:[],
                addressY:[],
                sexCharts: null,
                sexArray:[
			                {value:335, name:'男'},
			                {value:310, name:'女'},
			                {value:234, name:'其他'}
				        ],
                ageCharts: null,
                ageArray:[
			                {value:335, name:'18岁'},
			                {value:310, name:'30岁'},
			                {value:234, name:'50岁'}
			            ],
                osCharts: null,
                osArray:[
			                {value:335, name:'iOS'},
			                {value:110, name:'Symbian'},
			                {value:310, name:'Android'}
			            ],
                networkCharts: null,
                networkArray: [
			                {value:335, name:'联通'},
			                {value:110, name:'移动'},
			                {value:310, name:'歌华'},
			                {value:210, name:'电信'}
			            ]
			}
		},
		methods:{
			...mapActions([
				'getCampaignList',
				'getMediaList',
				'getReportPeopleList'
			]),
			//请求搜索框广告活动列表
			async getCampaignData(options){
	      		let campaignlist = await this.getCampaignList(options);
	      		if (campaignlist && campaignlist.length>0){
					this.campaignArry = campaignlist||[];
	      		}else{
	                this.campaignArry = [];
	           }
			},
			//请求搜索框媒体列表
			async getMediaData(options){
	      		let mediaList = await this.getMediaList(options);
	      		if (mediaList && mediaList.length>0){
					this.mediaArry = mediaList||[];
	      		}else{
	                this.mediaArry = [];
	           }
			},
			async onsubmitSearch(){
				let cdn = {
					'filterSearch':[
						{
							'name':'campaignId',
							'value':this.form.campaign.toString()
						},
						{
							'name':'mediaId',
							'value':this.form.mediaInfo.toString()
						},
						{
							'name':'productId',
							'value':this.form.pro.toString()
						}
					],
					'timeSearch':{
						'beginTime':this.form.dateCheck[0],
						'endTime':this.form.dateCheck[1],
						'timeUnit':this.form.dateSearchType
					},
					'page': 0,
  					'limit': this.pageCtr.pageSize
				};
				console.log(cdn)
	            let condition = {
	            	condition: encodeURIComponent(JSON.stringify(cdn))
	            }
	
	            await this.getPeopleReportData(condition);
	        },
	        async getPeopleReportData(options){
	      		let peoplelist = await this.getReportPeopleList(options);
	      		if (peoplelist&&peoplelist.content&&peoplelist.content.length>0){
					this.pageCtr.pageTatol =  peoplelist.totalElements||0;
					this.tableData = peoplelist.content||[];
	      		}else{
	                this.pageCtr.pageTatol = 0;
	                this.tableData = [];
	            }
	      		this.tableLoading=false;
			},
			async handleSizeChange(val) {
				let condition = {
	                    // condition: encodeURIComponent(JSON.stringify(cdn)),
	                    'rules[0].field':'name',
	                    'rules[0].op': 'like',
	                    'rules[0].data': this.form.user,
	                    'groupOp': 'OR',
	                    'page': 0,
  						'size': val
	            }
	            await this.getPeopleReportData(condition);
				this.pageCtr.pageSize = val;
		        console.log('每页 ${val} 条');
	      	},
	      	async handleCurrentChange(val) {
	      		let condition = {
	                    // condition: encodeURIComponent(JSON.stringify(cdn)),
	                    'rules[0].field':'name',
	                    'rules[0].op': 'like',
	                    'rules[0].data': this.form.user,
	                    'groupOp': 'OR',
	                    'page':  Number(val)-1,
  						'size': this.pageCtr.pageSize
	            }
	            await this.getPeopleReportData(condition);
	        	console.log('当前页: ${val}');
	      	},
	      	async drawInterestCharts() {
                this.interestCharts = echarts.init(document.getElementById('interestCharts'));
                this.interestCharts.setOption({
                   	title: { text: '用户兴趣Top10' },
	                tooltip: {},
	                xAxis: {
	                    data: this.interestX
	                },
	                yAxis: {},
	                series: [{
	                    name: '用户兴趣',
	                    type: 'bar',
	                    data: this.interestY
	                }],
	                 itemStyle:{
                        normal:{
                            color:'#0abbf1'
                        }
                   },
				  	label: {
				      	normal: {
				          	show: true,
				          	position: 'top',
				          	textStyle: {
				            	color: 'blank'
				        	}
				      	}
				    }
	                
                });
            },
            drawLiftStateCharts() {
                this.liftStateCharts = echarts.init(document.getElementById('liftStateCharts'));
                this.liftStateCharts.setOption({
                   	title: { text: '人生状态Top10' },
	                tooltip: {},
	                xAxis: {
	                    data: this.lifeStateX
	                },
	                yAxis: {},
	                series: [{
	                    name: '人生状态',
	                    type: 'bar',
	                    data: this.lifeStateY
	                }],
	                 itemStyle:{
                        normal:{
                            color:'#0abbf1'
                        }
                   },
				  	label: {
				      	normal: {
				          	show: true,
				          	position: 'top',
				          	textStyle: {
				            	color: 'blue'
				        	}
				      	}
				    }
	                
                });
            },
            drawPreferenceCharts() {
                this.preferenceCharts = echarts.init(document.getElementById('preferenceCharts'));
                this.preferenceCharts.setOption({
                   	title: { text: '用户偏好Top10' },
	                tooltip: {},
	                xAxis: {
	                    data: this.preferenceX
	                },
	                yAxis: {},
	                series: [{
	                    name: '用户偏好',
	                    type: 'bar',
	                    data: this.preferenceY
	                }],
	                 itemStyle:{
                        normal:{
                            color:'#0abbf1'
                        }
                   },
				  	label: {
				      	normal: {
				          	show: true,
				          	position: 'top',
				          	textStyle: {
				            	color: 'blue'
				        	}
				      	}
				    }
	                
                });
            },
            drawAddressCharts() {
                this.addressCharts = echarts.init(document.getElementById('addressCharts'));
                this.addressCharts.setOption({
                   	title: { text: '地域Top10' },
	                tooltip: {},
	                xAxis: {
	                    data: this.addressX
	                },
	                yAxis: {},
	                series: [{
	                    name: '地域',
	                    type: 'bar',
	                    data: this.addressY
	                }],
	                 itemStyle:{
                        normal:{
                            color:'#0abbf1'
                        }
                   },
				  	label: {
				      	normal: {
				          	show: true,
				          	position: 'top',
				          	textStyle: {
				            	color: 'blue'
				        	}
				      	}
				    }
	                
                });
            },
            drawSexCharts() {
                this.sexCharts = echarts.init(document.getElementById('sexCharts'));
                this.sexCharts.setOption({
                   	title : {
				        text: '性别比例',
				        x:'center'
				    },
				    tooltip : {
				        trigger: 'item',
				        formatter: "{a} <br/>{b} : {c} ({d}%)"
				    },
//				    legend: {
//				        orient: 'vertical',
//				        left: 'left',
//				        data: ['男','女','其他']
//				    },
				    series : [
				        {
				            name: '',
				            type: 'pie',
				            radius : '55%',
				            center: ['50%', '60%'],
				            data:this.sexArray,
				            itemStyle: {
				            	normal: {
				            		label:{
					            		show:true,
					            		formatter:'{b} : {d}%'
					            	}
				            	},
				                emphasis: {
				                    shadowBlur: 10,
				                    shadowOffsetX: 0,
				                    shadowColor: 'rgba(0, 0, 0, 0.5)'
				                }
				            }
				        }
				    ]
                });
            },
            drawAgeCharts() {
                this.ageCharts = echarts.init(document.getElementById('ageCharts'));
                this.ageCharts.setOption({
                   	title : {
				        text: '年龄比例',
				        x:'center'
				    },
				    tooltip : {
				        trigger: 'item',
				        formatter: "{a} <br/>{b} : {c} ({d}%)"
				    },
//				    legend: {
//				        orient: 'vertical',
//				        left: 'left',
//				        data: ['18岁','30岁','50岁']
//				    },
				    series : [
				        {
				            name: '',
				            type: 'pie',
				            radius : '55%',
				            center: ['50%', '60%'],
				            data: this.ageArray,
				            itemStyle: {
				            	normal: {
				            		label:{
					            		show:true,
					            		formatter:'{b} : {d}%'
					            	}
				            	},
				                emphasis: {
				                    shadowBlur: 10,
				                    shadowOffsetX: 0,
				                    shadowColor: 'rgba(0, 0, 0, 0.5)'
				                }
				            }
				        }
				    ]
                });
            },
            drawOsCharts() {
                this.osCharts = echarts.init(document.getElementById('osCharts'));
                this.osCharts.setOption({
                   	title : {
				        text: '系统比例',
				        x:'center'
				    },
				    tooltip : {
				        trigger: 'item',
				        formatter: "{a} <br/>{b} : {c} ({d}%)"
				    },
//				    legend: {
//				        orient: 'vertical',
//				        left: 'left',
//				        data: ['iOS','Symbian','Android']
//				    },
				    series : [
				        {
				            name: '',
				            type: 'pie',
				            radius : '55%',
				            center: ['50%', '60%'],
				            data: this.osArray,
				            itemStyle: {
				            	normal: {
				            		label:{
					            		show:true,
					            		formatter:'{b} : {d}%'
					            	}
				            	},
				                emphasis: {
				                    shadowBlur: 10,
				                    shadowOffsetX: 0,
				                    shadowColor: 'rgba(0, 0, 0, 0.5)'
				                }
				            }
				        }
				    ]
                });
            },
            drawNetworkCharts() {
                this.networkCharts = echarts.init(document.getElementById('networkCharts'));
                this.networkCharts.setOption({
                   	title : {
				        text: '网络比例',
				        x:'center'
				    },
				    tooltip : {
				        trigger: 'item',
				        formatter: "{a} <br/>{b} : {c} ({d}%)"
				    },
//				    legend: {
//				        orient: 'vertical',
//				        left: 'left',
//				        data: ['联通','移动','歌华','电信']
//				    },
				    series : [
				        {
				            name: '',
				            type: 'pie',
				            radius : '55%',
				            center: ['50%', '60%'],
				            data: this.networkArray,
				            itemStyle: {
				            	normal: {
				            		label:{
					            		show:true,
					            		formatter:'{b} : {d}%'
					            	}
				            	},
				                emphasis: {
				                    shadowBlur: 10,
				                    shadowOffsetX: 0,
				                    shadowColor: 'rgba(0, 0, 0, 0.5)'
				                }
				            }
				        }
				    ]
                });
            },
            drawPeopleCharts() {
                this.drawInterestCharts();
                this.drawLiftStateCharts();
                this.drawPreferenceCharts();
                this.drawAddressCharts();
                this.drawSexCharts();
                this.drawAgeCharts();
                this.drawOsCharts();
                this.drawNetworkCharts();
            }
		},
        mounted: function () {
            this.drawPeopleCharts();
        },
        updated: function () {
            this.drawPeopleCharts();
        },
        watch: {
		    options: {
		    	handler(options) {
		      		this.interestCharts.setOption(this.options);
		      		this.liftStateCharts.setOption(this.options);
		      		this.preferenceCharts.setOption(this.options);
		      		this.addressCharts.setOption(this.options);
		      		this.sexCharts.setOption(this.options);
		      		this.ageCharts.setOption(this.options);
		      		this.osCharts.setOption(this.options);
		      		this.networkCharts.setOption(this.options);
		    	},
		    	deep: true
		    },
		},
		beforeDestroy() {
		    if (this.interestCharts) {
		    	this.interestCharts = null
		    }else if (this.liftStateCharts) {
		    	this.liftStateCharts = null
		    }else if (this.preferenceCharts) {
		    	this.preferenceCharts = null
		    }else if (this.addressCharts) {
		    	this.addressCharts = null
		    }else if (this.sexCharts) {
		    	this.sexCharts = null
		    }else if (this.ageCharts) {
		    	this.ageCharts = null
		    }else if (this.osCharts) {
		    	this.osCharts = null
		    }else if (this.networkCharts) {
		    	this.networkCharts = null
		    }
		    window.removeEventListener('resize', this.__resizeHanlder)
		},
		created(){
			this.getCampaignData();
			this.getMediaData();
		}
	}
</script>

<style>
.searchDiv {
  padding-top: 40px;
  padding-left: 50px;
  .el-select .el-input {
	   width: 100px;
	 }
}
.reportPeopleDiv {
      padding: 30px;
      padding-top: 20px;
}
.reportPeopleDiv .el-row{
	margin: 10px 0px;
}
</style>