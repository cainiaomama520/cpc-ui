<template lang="html">
 <div class="currentBody">
<el-container>
    <el-col :span="4"><div class="grid-content bg-purple">
      <el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
       unique-opened
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <template v-for='item in leftList'>
      <el-submenu :index="'first_' + item.id"  >
          <template slot="title">
            <i class=""></i>
            <span>{{item.name}}</span>
          </template>
          <template v-show='item.children.length != null&& item.children.length > 0' v-for='littleItem in item.children'>
          <el-submenu :index= "'second_' + littleItem.id" >
            <template slot="title">{{littleItem.name}}</template>
            <template v-show='littleItem.children.length != null&& littleItem.children.length > 0' v-for='miniItem in littleItem.children'>
              <el-menu-item :index="'third_' + miniItem.id">{{miniItem.name}}</el-menu-item>
            </template>
          </el-submenu>
        </template>
      </el-submenu>
    </template>
  </el-menu>
    </div></el-col>
    <el-col :span="20"><div class="grid-content1 bg-purple">
      <router-view></router-view>
    </div></el-col>
</el-container>
 </div>
</template>

<script>
import Communication from '../../util/communicate.js';
export default {
  data() {
    return {
      leftList: [],
      indexMap: new Map(),
    }
  },
  mounted() {
    let self = this;
    self.getMenuList(null);
    Communication.$on('crossmsg', (data) => {
        console.log('rcv messageccc.', new Date(), data);
        self.getMenuList(data);
    })
  },

  methods: {
    getMenuList(query){
      var self = this;

      let qstrs = [];
      for (let [i, field] of Object.keys(query||{}).entries()) {
        qstrs.push(''+field+'='+query[field]);
      }

      this.$api.get(this.allurlsList.campaignMenuList+'?'+qstrs.join('&'), '', function(r) {
          console.log('list.', r);
          self.leftList = r;
          for(let i = 0; i < r.length; i++){
            self.indexMap.set(r[i].id, i);
          }
      });
    },

   handleOpen(key, keyPath) {
        console.log('open.', key,keyPath);
        if (key.indexOf("first") >= 0) {
          console.log(key.split('first_'));
          let id = key.split('first_')[1];
          if (0 != this.indexMap.get(Number(id))){
            let [lastindex, zlastindex, zlastid] = [this.indexMap.get(Number(id)), this.indexMap.get(this.leftList[0].id),this.leftList[0].id];
            let tmp = JSON.parse(JSON.stringify(Object.assign({}, this.leftList[this.indexMap.get(Number(id))])));
            this.leftList[this.indexMap.get(Number(id))] = this.leftList[0];
            this.leftList[0] = tmp;

            this.indexMap.set(Number(id), 0);
            this.indexMap.set(zlastid, lastindex);
          }

          this.$router.push({
            name: 'adGroup',
            query: {
              id: id
            }
          })
        } else if (key.indexOf("second") >= 0) {
          this.$router.push({
            name: 'adCreativity',
            query: {
              id: key.split('second_')[1]
            }
          })
        }
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
        if (key.indexOf("first") >= 0) {
          this.$router.push({name: 'adCampaign'})
        } else if (key.indexOf("second") >= 0) {
          this.$router.push({
            name: 'adGroup',
            query: {
              id: keyPath[0].split('first_')[1]
            }
          })
        }
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
