<template>
	<div class="currentBody">
		<div class="source">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/peoples/peoplePacket'}">人群管理</el-breadcrumb-item>
				<!--<el-breadcrumb-item>客户列表</el-breadcrumb-item>-->
				<el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<el-container>
			<!--<el-row :gutter="20" class="tac">-->
				<el-col :span="4">
					<div class="grid-content bg-purple">
						<el-menu :default-active="$route.path"  class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="#545c64"  text-color="#fff" active-text-color="#ffd04b" unique-opened router>
							<el-submenu index="1">
								<template slot="title">
									<i class="el-icon-menu"></i>
									<span>人群管理</span>
								</template>
								<el-menu-item-group>
									<el-menu-item index="/peoples/peoplePacket">人群数据包</el-menu-item>
									<el-menu-item index="/peoples/peopleDmp">DMP定向包</el-menu-item>
								</el-menu-item-group>
							</el-submenu>
							<!--<el-submenu index="2">
								<template slot="title">
									<i class="el-icon-setting"></i>
									<span>产品管理</span>
								</template>
								<el-menu-item-group>
									<el-menu-item index="/advpro/proList">产品列表</el-menu-item>
								</el-menu-item-group>
							</el-submenu>-->
						</el-menu>
					</div>
				</el-col>
				<el-col :span="20">
					<div class="grid-content1 bg-purple">
						<router-view class="view"></router-view>
					</div>
				</el-col>
			<!--</el-row>-->
		</el-container>
	</div>
</template>

<script>
	export default {

		methods: {
			handleOpen(key, keyPath) {
				// console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				//      console.log(key, keyPath);
			}
		}
	}
</script>

<style>
	.source {
		padding: 20px 10px 0px 30px;
	}
	.currentBody {
    height: 100%;
    }
  .el-container {
    position: relative;
    margin: 10px 30px;
    background-color: white;
    border-radius: 4px;
    min-height: 80%;
  }
   .el-row {
    width: 100%;
  }
  .bg-purple {
    min-height: 300px;
  }
  .grid-content {
  	background-color: #545c64;
    border-radius: 10px;
    height: 100%;
  }
  .grid-content1 {
    border-radius: 10px;
    height: 100%;
  }
  .el-row {
	    box-sizing: border-box;
	}
	.borderLeft {
	    border-top: 5px solid #355c9d;
	}
</style>