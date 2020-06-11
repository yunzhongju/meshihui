<template>
	
	<div class="Serach">
		
		<van-nav-bar title="搜索"
					 left-text="" 
					 left-arrow 
					 @click-left="$router.go(-1)" />
		
		<form action="/">
		  <van-search
		    v-model="value"
		    show-action
		    placeholder="请输入搜索关键词"
		    @search="onSearch"
		    @cancel="onCancel"
			@input="onInput"
			input-align="center"
		  />
		</form>
		
		<div class="serach-list">
			<ul>
				<li v-for="(item,index) in serach_data"><van-icon name="search" />{{item.t}}</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import {request} from '../network/request.js'
	import Vue from 'vue';
	import { Search ,Icon,NavBar} from 'vant';
	
	Vue.use(Search).use(Icon).use(NavBar);
	
	export default{
		name:'Serach',
		data(){
			return {
				value:'',
				serach_data:[]
			}
		},
		created() {
			this.serach_data=[];
			this.$emit('showevent', false)
		},
		methods:{
			onSearch(val) {
				this.$router.replace(`/serachlist?kw=${val}`)
			},
			onCancel() {
			  this.serach_data=[]
			},
			get_data(kw){
				var data=[];
				request({
					url:`/api/Searchabout/associate?format=json&keywords=${kw}`
				}).then(res=>{
					data=res.data.data
					this.serach_data=data
				})
			},
			onInput(val){
				console.log(val)
				var kw=val;
				this.get_data(kw)
				console.log(this.serach_data)
			}
		}
	}
</script>

<style>
	.serach-list{
		margin: 10px 20px;
	}
	.serach-list ul li{
		margin-bottom: 10px;
		border-bottom: 1px solid gainsboro;
		padding-bottom: 5px;
	}
</style>
