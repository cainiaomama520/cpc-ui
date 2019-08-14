<template lang="html">
 <div class="currentBody">
<el-container>
    <el-col :span="4"><div class="grid-content bg-purple">
      <el-menu router :default-active="$route.path" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
  	<el-submenu index="1">
  		<template slot="title">
  		    <i class="el-icon-menu"></i>
  		    <span>RTB资源</span>
  		</template>
  		<el-menu-item-group>
  		    <el-menu-item index="/media/hero">Hero资源</el-menu-item>
        </el-menu-item-group>
  	</el-submenu>
  	<el-submenu index="2">
  	        <template slot="title">
  		    <i class="el-icon-tickets"></i>
  		    <span>MediaBuy资源</span>
  		</template>
  		<el-menu-item-group>
  		    <el-menu-item index="/media/mediaBuy">资源列表</el-menu-item>
  		</el-menu-item-group>
          </el-submenu>
  </el-menu>
    </div></el-col>
    <el-col :span="20"><div class="grid-content1 bg-purple">
      <router-view></router-view>
    </div></el-col>
</el-container>
 </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  mounted() {
    var params = {
      password: 'admin',
      username: 'admin'
    }
    // this.$api.post('/api/authenticate', params, function(r) {
    //   debugger
		// })
  },
  methods: {
   handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
  }
}
</script>

<style lang="scss" scoped>
  .currentBody {
    height: 100%;
  }
  .el-container {
    position: relative;
    margin: 30px;
    background-color: white;
    border-radius: 4px;
    min-height: 80%;
  }
   .el-row {
    width: 100%;
  }
  .bg-purple {
    /*border-radius: 4px;*/
    min-height: 300px;
  }
  .grid-content {
  	background-color: #545c64;
    border-radius: 10px;
    height: 100%;
  }
  .grid-content1 {
  	// background-color: yellow;
    border-radius: 10px;
    height: 100%;
    // width: 100%;
    // height: 100%;
    // .mediaMidden {
    //   margin: 20px;
    //   // width: 100%;
    //   // height: 100%;
    //   // background-color: red;
    //   .searchDiv {
    //     margin-top: 40px;
    //     margin-left: 50px;
    //     position: relative;
    //     float: left;
    //   }
    // }
  }

</style>
