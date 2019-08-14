<template>
    <div class="wrapper">
        <v-head></v-head>
        <div class="contentt">
            <transition name="move" mode="out-in"><router-view></router-view></transition>
        </div>
        <!--<vFooter></vFooter>-->
    </div>
</template>

<script>
    import vHead from './Header.vue';
    import vFooter from "./footer.vue";
    // import vSidebar from './Sidebar.vue';
    export default {
        data: function(){
            return {
                state: false
            };
        },
         methods: {
            onChange: function(val){
                this.state = val;
            }
        },
        components:{
            vHead,
            vFooter,
        }
    }
</script>

<style>
.wrapper{
    margin: auto;
    width: 100%;
    background-color: #e4e7ed;
}
.contentt{
    margin: 5px atuo;
    height: 90%;
}

</style>
