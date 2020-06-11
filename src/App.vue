<template>
	<div id="app">
		<router-view  @showevent="showevent"/>
		<div class="tabbar" v-if="isshow">
			<van-tabbar v-model="active"
					active-color="#ff5059" >
			  <van-tabbar-item icon="wap-home" replace to="/">首页</van-tabbar-item>
			  <van-tabbar-item icon="shop-collect" replace to="/foodshow">食秀</van-tabbar-item>
			  <van-tabbar-item icon="good-job" replace to="/fitness">健康</van-tabbar-item>
			  <van-tabbar-item icon="manager" replace to="/profile">我的</van-tabbar-item>
			</van-tabbar>
		</div>
	</div>
</template>

<style lang="less">
.tabbar{
	width: 100%;
}
</style>
<script>
	import Vue from 'vue';
	import {
		Tabbar,
		TabbarItem
	} from 'vant';
	Vue.use(Tabbar).use(TabbarItem);
	export default {
		name: 'App',
		components: {

		},
		data() {
			return {
				active: 0,
				isshow:true
			}
		},
		methods:{
			showevent($event){
				this.isshow=$event;
			}
		}
	}
</script>

