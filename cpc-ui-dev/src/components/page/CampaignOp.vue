<template lang="html">
 <div class="currentBody">
        <el-container>
                <el-col :span="4">
                    <div class="grid-content bg-purple">
                        <el-menu :default-active="$route.path"  class="el-menu-vertical-demo" background-color="#545c64"  text-color="#fff" active-text-color="#ffd04b" unique-opened router>
                            <el-submenu index="1">
                                <template slot="title">
                                    <i class="el-icon-menu"></i>
                                    <span>活动管理</span>
                                </template>
                                <el-menu-item-group>
                                    <el-menu-item index="/campaignop/adCampaignOp">RTB活动</el-menu-item>
                                    <el-menu-item index="/campaignop/adCampaignOpMb">账户活动</el-menu-item>
                                </el-menu-item-group>
                            </el-submenu>
                        </el-menu>
                    </div>
                </el-col>
                <el-col :span="20">
                    <div class="grid-content1 bg-purple">
                        <router-view class="view"></router-view>
                    </div>
                </el-col>
        </el-container>
    </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  mounted() {},

  methods: {},
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
