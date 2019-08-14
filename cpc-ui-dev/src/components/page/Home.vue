<template>
    <el-container>
    	<div class="homeDiv">
	    	<el-row :gutter="20">
	            <el-col :span="12">
    				<el-card>
	                	<div id="todayTrading" :style="{height:height,width:width}"></div>
	    			</el-card>
	            </el-col>
	            <el-col :span="12">
	            	<el-card>
	                	<div id="toadyIncome" :style="{height:height,width:width}"></div>
	                </el-card>
	            </el-col>
	         </el-row>
	         <el-row :gutter="20">
	            <el-col :span="6">
	    			<el-card>
	                	<el-col :span="24" style="padding:20px 0;">
					        <el-col :span="24">
					        	<small>本周收入</small>
					            <h2>{{ weekIncomeVal }}</h2>
					          	<p><small :class="classIcome"><i :class="'el-icon-caret-'+classIcome"></i>{{ incomeRate }}</small><small> 同比上周</small></p>
					        </el-col>
					        <el-col :span="24">
					          	<small>本周花费</small>
					            <h2>{{ weekCostVal }}</h2>
					          	<p><small :class="classCost"><i :class="'el-icon-caret-'+classCost"></i>{{ costRate }}</small><small> 同比上周</small></p>
					        </el-col>
					        <el-col :span="24" style="border: none;">
					          	<small>本周利润</small>
					            <h2>{{ weekProfitVal }}</h2>
					          	<p><small :class="classProfit"><i :class="'el-icon-caret-'+classProfit"></i>{{ profitRate }}</small><small> 同比上周</small></p>
					        </el-col>
					      </el-col>
	                </el-card>
	            </el-col>
	            <el-col :span="18">
	            	<el-card>
	                	<div id="weekConsumption" :style="{height:height,width:width}"></div>
		    		</el-card>
	            </el-col>
	         </el-row>
	    	<el-row :gutter="20">
		        <el-col :span="14">
		            <el-card>
		            	<el-col class="line" :span="24"><h3>本周Top消耗产品</h3></el-col>
		                <el-row>
		                	<el-col :span="8">
				                <div id="proOne" :style="{height:height,width:width}"></div>
				            </el-col>
				            <el-col :span="8">
				                <div id="proSec" :style="{height:height,width:width}"></div>
				            </el-col>
				            <el-col :span="8">
				                <div id="proThr" :style="{height:height,width:width}"></div>
				            </el-col>
		                </el-row>
		        	</el-card>
		        </el-col>
	            <el-col :span="10">
		        	<el-card>
		        		<el-col class="line" :span="24"><h3>本周Top消耗媒体</h3></el-col>
		                <el-table :data="tableData" border height="390" style="width: 100%">
							<el-table-column prop="mediaName" label="媒体" fixed></el-table-column>
							<el-table-column prop="impValidCount" label="曝光" ></el-table-column>
							<el-table-column prop="ecpm" label="ECPM"></el-table-column>
							<el-table-column prop="clkValidCount" label="点击"></el-table-column>
							<el-table-column prop="costNum" label="花费"></el-table-column>
							<el-table-column prop="percent" label="占比"></el-table-column>
							<el-table-column prop="profitItem" label="周环比">
								<template slot-scope="scope">
							        <small :class="scope.row.profitItem.flag">{{ scope.row.profitItem.rate }}
							        <i :class="'el-icon-caret-'+scope.row.profitItem.flag"></i></small>
							    </template>
							</el-table-column>
						</el-table>
		        	</el-card>
	            </el-col>
	       </el-row>
	    </div>
    </el-container>
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
		      default: '350px'
		    },
		    autoResize: {
		      type: Boolean,
		      default: true
		    }
		  },
        data() {
            return {
            	todayReport:[],//今日交易走势全部数据
            	todayProfit:[],//今日收益全部数据
            	weekProfit:[],//本周收益全部数据
            	weekReport:[],//一周走势全部数据
            	topProduct:[],//TOP产品 全部数据
            	topMedia:[],//TOP媒体全部数据
                todayTrading: null,
                radingX :[],//今日交易走势X轴数据
				dayrequest :[],//今日交易请求数据
				daybidden :[],//今日交易出价数据
				dayexposure :[],//今日交易曝光数据
				dayclickArry :[],//今日交易点击数据
				dayactive :[],//今日交易激活数据
                toadyIncome: null,
                dayincom:[],//今日收益情况数据
                weekConsumption: null,
                weekDate :[],//一周消耗X轴数据
				weekincome :[],//一周消耗收入数据
				weekcost :[],//一周消耗花费数据
				weekgain :[],//一周消耗利润数据
                proOne: null,
                proData0:[],
                productName0:'',
                proCost0:'',
                proX0:[],
                proSec: null,
                proData1:[],
                productName1:'',
                proCost1:'',
                proX1:[],
                proThr: null,
                proData2:[],
                productName2:'',
                proCost2:'',
                proX2:[],
                tableData:[],
                weekIncomeVal: '',
		        weekCostVal: '',
		        weekProfitVal: '',
		        incomeRate: '',
				costRate: '',
				profitRate: '',
		        classIcome:'',
		        classCost:'',
		        classProfit:''
            }
        },

        methods: {
        	...mapActions([
				'getHomeList'
			]),
			//请求搜索框广告主列表
			async getHomeData(){
				let homelist = await this.getHomeList();
				console.log(homelist)
				//今日走势
	      		if (homelist &&homelist.todayReport && homelist.todayReport.length>0){
	      			this.todayReport = homelist.todayReport || [];
	      			for(let i = 0; i < this.todayReport.length; i++){
						this.radingX.push(this.todayReport[i].time);
						this.dayrequest.push(this.todayReport[i].reqCount);
						this.daybidden.push(this.todayReport[i].respCount);
						this.dayexposure.push(this.todayReport[i].impValidCount);
						this.dayclickArry.push(this.todayReport[i].clkValidCount);
						this.dayactive.push(this.todayReport[i].totalCvs);
					}
	      		}else{
	                this.todayReport = [];
	           }
	      		//今日收益情况
	      		if (homelist &&homelist.todayProfit){
	      			this.todayProfit = homelist.todayProfit || [];
					this.dayincom.push(this.todayProfit.consume);
					this.dayincom.push(this.todayProfit.cost);
					this.dayincom.push(this.todayProfit.profit);
	      		}else{
	                this.todayProfit = [];
	           }
	      		//本周收益
	      		if (homelist &&homelist.weekProfit){
	      			this.weekProfit = homelist.weekProfit || [];
	      			this.weekIncomeVal = this.weekProfit.consume.amount;
					this.incomeRate = this.weekProfit.consume.rate;
					this.classIcome = this.weekProfit.consume.flag;
					this.weekCostVal = this.weekProfit.cost.amount;
					this.costRate = this.weekProfit.cost.rate;
					this.classCost = this.weekProfit.cost.flag;
					this.weekProfitVal = this.weekProfit.profit.amount;
					this.profitRate = this.weekProfit.profit.rate;
					this.classProfit = this.weekProfit.profit.flag;
	      		}else{
	                this.weekProfit = [];
	           }
	      		
	      		//一周走势
	      		if (homelist &&homelist.weekReport && homelist.weekReport.length>0){
	      			this.weekReport = homelist.weekReport || [];
	      			for(let n = 0; n < this.weekReport.length; n++){
						this.weekDate.push(this.weekReport[n].time);
						this.weekincome.push(this.weekReport[n].consume);
						this.weekcost.push(this.weekReport[n].costNum);
						this.weekgain.push(this.weekReport[n].profit);
					}
	      		}else{
	                this.weekReport = [];
	           }
	      		
	      		//top产品
	      		if (homelist &&homelist.topProduct && homelist.topProduct.length>0){
	      			this.topProduct = homelist.topProduct || [];
	      			let nameKey='',costKey='',proXKey='',dataKey='';
	      			for(let m = 0; m <  this.topProduct.length; m++){
	      				nameKey='productName'+m;
	      				costKey='proCost'+m;
	      				proXKey='proX'+m;
	      				dataKey='proData'+m;
	      				this[nameKey]= this.topProduct[m].productName;
	      				this[costKey]= '消耗：'+this.topProduct[m].totalConsume;
	      				for(let k = 0; k <  this.topProduct[m].report.length; k++){
	      					this[proXKey].push(this.topProduct[m].report[k].time);
	      					this[dataKey].push(this.topProduct[m].report[k].consume );
	      				}
	      			}
	      		}else{
	      			this.topProduct = [];
	      		}
	      		
	      		//top媒体
	      		if (homelist &&homelist.topMedia && homelist.topMedia.length>0){
	      			this.tableData = homelist.topMedia || [];
	      		}else{
	      			this.tableData = [];
	      		}
			},
        	
            async drawtodayTrading() {
                this.todayTrading = echarts.init(document.getElementById('todayTrading'));
                this.todayTrading.setOption({
                	title: {
                        text: '今日交易走势'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['请求', '出价', '曝光', '点击', '激活']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: this.radingX,
                        axisLabel: {
							interval:0,
			                rotate:60
						}
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name: '请求',
                            type: 'line',
                            stack: '总量',
                            data: this.dayrequest
                        },
                        {
                            name: '出价',
                            type: 'line',
                            stack: '总量',
                            data: this.daybidden
                        },
                        {
                            name: '曝光',
                            type: 'line',
                            stack: '总量',
                            data: this.dayexposure
                        },
                        {
                            name: '点击',
                            type: 'line',
                            stack: '总量',
                            data: this.dayclickArry
                        },
                        {
                            name: '激活',
                            type: 'line',
                            stack: '总量',
                            data: this.dayactive
                        }
                    ]
                });
            },
            drawtoadyIncome() {
                this.toadyIncome = echarts.init(document.getElementById('toadyIncome'));
                this.toadyIncome.setOption({
                   	title: { text: '今日收益情况' },
	                tooltip: {},
	                xAxis: {
	                    data: ["收入", "花费", "利润"]
	                },
	                yAxis: {},
	                series: [{
	                    name: '收益',
	                    type: 'bar',
	                    data: this.dayincom
	                }],
				  	label: {
				      	normal: {
				          	show: true,
				          	position: 'top',
				          	textStyle: {
				            	color: 'black'
				        	}
				      	}
				    }
	                
                });
            },
            drawweekConsumption() {
                this.weekConsumption = echarts.init(document.getElementById('weekConsumption'));
                this.weekConsumption.setOption({
                    title: {
                        text: '近一周消耗走势'
                    },
                    tooltip: {
                        trigger: 'axis',
                         axisPointer: {
				            type: 'cross',
				            label: {
				                backgroundColor: '#6a7985'
				            }
				        }
                    },
                    legend: {
                        data: ['收入', '花费', '利润']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: this.weekDate
//                      ,
//                      axisLabel: {
//							interval:0,
//			                rotate:60
//						}
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name: '收入',
                            type: 'line',
                            stack: '总量',
                            smooth: true,
//                          areaStyle: {normal: {}},
                            data: this.weekincome
                        },
                        {
                            name: '花费',
                            type: 'line',
                            stack: '总量',
                            smooth: true,
//                          areaStyle: {normal: {}},
                            data: this.weekcost
                        },
                        {
                            name: '利润',
                            type: 'line',
                            stack: '总量',
                            smooth: true,
//                          areaStyle: {normal: {}},
                            data: this.weekgain
                        }
                    ]
                });
            },
            drawproOne() {
                this.proOne = echarts.init(document.getElementById('proOne'));
                this.proOne.setOption({
                    title: {
                        text: this.productName0,
                        subtext: this.proCost0,
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    grid: {
                        left: '2%',
                        right: '3%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
				        type: 'category',
				        boundaryGap: false,
				        data: this.proX0,
                        axisLabel: {
							interval:0,
			                rotate:60
						}
				    },
				     yAxis: {
				        type: 'value',
                        axisLabel: {
							interval:0,
			                rotate:40
						}
				    },
				    series: [{
				        data: this.proData0,
				        type: 'line',
                        smooth: true,
				        areaStyle: {normal: {}}
				    }]
                });
            },
            drawproSec() {
                this.proSec = echarts.init(document.getElementById('proSec'));
                this.proSec.setOption({
                    title: {
                        text: this.productName1,
                        subtext: this.proCost1,
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    grid: {
                        left: '2%',
                        right: '3%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
				        type: 'category',
				        boundaryGap: false,
				        data: this.proX1,
                        axisLabel: {
							interval:0,
			                rotate:60
						}
				    },
				     yAxis: {
				        type: 'value',
                        axisLabel: {
							interval:0,
			                rotate:40
						}
				    },
				    series: [{
				        data: this.proData1,
				        type: 'line',
                        smooth: true,
				        areaStyle: {normal: {}}
				    }]
                });
            },
            drawproThr() {
                this.proThr = echarts.init(document.getElementById('proThr'));
                this.proThr.setOption({
                    title: {
                        text:  this.productName2,
                        subtext: this.proCost2,
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    grid: {
                        left: '2%',
                        right: '2%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
				        type: 'category',
				        boundaryGap: false,
				        data: this.proX2,
                        axisLabel: {
							interval:0,
			                rotate:60
						}
				    },
				     yAxis: {
				        type: 'value',
                        axisLabel: {
							interval:0,
			                rotate:40
						}
				    },
				    series: [{
				        data: this.proData2,
				        type: 'line',
                        smooth: true,
				        areaStyle: {normal: {}}
				    }]
                });
            },
            drawHomeCharts() {
                this.drawtodayTrading();
                this.drawtoadyIncome();
                this.drawweekConsumption();
                this.drawproOne();
                this.drawproSec();
                this.drawproThr();
            }
        },

        mounted: function () {
            this.drawHomeCharts();
        },
        updated: function () {
            this.drawHomeCharts();
        },
        watch: {
		    options: {
		    	handler(options) {
		      		this.todayTrading.setOption(this.options);
		      		this.toadyIncome.setOption(this.options);
		      		this.weekConsumption.setOption(this.options);
		      		this.proOne.setOption(this.options);
		      		this.proSec.setOption(this.options);
		      		this.proThr.setOption(this.options);
		    	},
		    	deep: true
		    }
		},
		beforeDestroy() {
		    if (this.todayTrading) {
		    	this.todayTrading = null
		    }else if (this.toadyIncome) {
		    	this.toadyIncome = null
		    }else if (this.weekConsumption) {
		    	this.weekConsumption = null
		    }else if (this.proOne) {
		    	this.proOne = null
		    }else if (this.proSec) {
		    	this.proSec = null
		    }else if (this.proThr) {
		    	this.proThr = null
		    }
		    window.removeEventListener('resize', this.__resizeHanlder)
		},
		created(){
			this.getHomeData();
		}
    }
</script>

<style>
.el-container {
    position: relative;
    margin: 30px;
    background-color: white;
    border-radius: 4px;
    min-height: 80%;
  }
  .homeDiv {
  	width:100%;
      padding: 30px;
      padding-top: 20px;
	}
	.homeDiv .el-col {
        padding: 20px 20px;
    }
	.homeDiv .el-card{
		margin-bottom: 20px;
	}
	.homeDiv h2{
		margin: 5px 0px;
	}
	.homeDiv i{
		font-size: 18px;
	}
	.homeDiv .top{
		color:#67C23A;
	}
	.homeDiv .bottom{
		color:#F56C6C;
	}
</style>