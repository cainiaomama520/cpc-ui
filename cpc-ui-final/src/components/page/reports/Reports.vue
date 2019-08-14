<template>
	<div class="currentBody">
		<div class="source">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/reports/reportAdmin'}">数据报表</el-breadcrumb-item>
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
									<span>数据管理</span>
								</template>
								<el-menu-item-group>
									<el-menu-item index="/reports/reportAdmin">运营</el-menu-item>
								</el-menu-item-group>
							</el-submenu>
							<el-submenu v-if="-1 == roles.indexOf('ROLE_OPTIMIZE')" index="2">
								<template slot="title">
									<i class="el-icon-setting"></i>
									<span>受众分析</span>
								</template>
								<el-menu-item-group>
									<el-menu-item index="/reports/reportPeople">受众分析</el-menu-item>
								</el-menu-item-group>
							</el-submenu>
						</el-menu>
					</div>
				</el-col>
				<el-col :span="20">
					<div class="grid-content1 bg-purple">
						<router-view></router-view>
					</div>
				</el-col>
			<!--</el-row>-->
		</el-container>
	</div>
</template>

<script>
    import Cookie from '../../../util/cookies';
	export default {
        data() {
            return {
                roles:[]
            }
        },

		methods: {
			handleOpen(key, keyPath) {},
			handleClose(key, keyPath) {}
		},

        beforeMount () {
            let login = Cookie.getCookie('paopao') || null;
            if (!login){
                this.$router.push('/login');
            }else{
                let loginfo = JSON.parse(login);
                this.roles = loginfo.authorities;
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