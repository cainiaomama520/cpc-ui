<template lang="html">
 <div class="creatADCreativity">
<el-container>
    <el-col :span="4"><div class="grid-content bg-purple">
  <el-tree style="padding-top:10px" :data="this.$store.state.creatCp.leftArray" :props="defaultProps" @node-click="handleNodeClick" ref="treeTwo" :filter-node-method="filterNode"></el-tree>
    </div></el-col>
    <el-col :span="20"><div class="grid-content1 bg-purple">
      <span class="pageTitleSpan">{{this.$store.state.creatCp.titleName}}</span>
      <router-view></router-view>
    </div></el-col>
    <div class="leftSteps">
      <el-steps :active='this.$store.state.creatCp.currentStep' direction="vertical" finish-status="finish">
  <el-step title="广告活动"></el-step>
  <el-step title="广告组"></el-step>
  <el-step title="广告创意"></el-step>
  <el-step title="创建完成"></el-step>
</el-steps>
    </div>
</el-container>
 </div>
</template>

<script>
import Vue from 'vue';
export default {
  data() {
    return {
      data: [{
          label: '广告活动',
          children: [{
            label: '广告组',
            children: [{
              label: '广告创意'
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
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
  computed: {
			treeCurrentName() {
				return this.$store.state.creatCp.currentName;
			}
		},
  watch: {
    treeCurrentName: function(val) {
      // 侧边栏选择
      var v = this;
      Vue.nextTick(function() {
        v.$refs.treeTwo.filter(val);
      });
    }
  },
  methods: {
   handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      // tree控件点击事件
      handleNodeClick(data) {
        console.log(data);
      },
      // tree控件筛选
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      }
  }
}
</script>

<style lang="scss" scoped>
  .creatADCreativity {
    height: 100%;
    .el-tree {
      color: #fff ;
      background-color: #545c64 ;
    }
  }
  .el-container {
    position: relative;
    margin: 30px;
    background-color: white;
    border-radius: 4px;
    min-height: 80%;
    .pageTitleSpan {
			display: inline-block;
			font-size: 20px;
			padding: 20px;
		}
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
  .leftSteps {
    position: fixed;
    right: 50px;
    height: 50%;
    top: 25%;
  }
</style>
