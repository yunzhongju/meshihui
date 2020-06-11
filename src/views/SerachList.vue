<template>
	<div class="SerachList">
		<van-nav-bar :title="kw" 
					 left-text="" 
					 left-arrow 
					 @click-left="$router.go(-1)" />


		<div class="show-tabs">
			<van-tabs @click="onClick" sticky>
			  <van-tab v-for="(item,index) in tabs" 
						:name="item.keys"
						:title="item.title">
			    <div class="top_results" v-if="top_results!=''">
			    	<div>
			    		<h4>{{top_results.title}}</h4>
			    		<span>{{top_results.heat_word}}</span>
			    	</div>
			    	<img :src="top_results.image" alt="">
			    </div>
			    
			    <div class="show-serach-data">
			    	<van-list v-model="loading"
			    			:finished="finished" 
			    			finished-text="没有更多了" 
			    			@load="onLoad">
			    		<ul>
			    			<li v-for="(item,index) in list" :key="index">
			    				<img :src="item.img" alt="">
			    				<div>
			    					<h3>{{item.title}}</h3>
			    					<p>
			    						<span><img :src="item.author.avatar_url" alt="">{{item.author.nickname}}</span>
			    						<span><van-icon name="like" />{{item.favor_amount}}</span>
			    						<span><van-icon name="browsing-history" />{{item.viewed_amount}}</span>
			    					</p>
			    				</div>
			    			</li>
			    		</ul>
			    	</van-list>
			    </div>
			  </van-tab>
			</van-tabs>
		</div>

		
	</div>
</template>

<script>
	import Vue from 'vue';
	import {
		NavBar,
		List,
		Icon,
		Tab, 
		Tabs 
	} from 'vant';

	Vue.use(NavBar).use(List).use(Icon).use(Tab).use(Tabs);
	import {
		request
	} from '../network/request.js'
	export default {
		name: 'SerachList',
		data() {
			return {
				kw: this.$route.query.kw,
				tabs: [],
				list: [],
				page: 1,
				top_results: '',
			    loading: false,
			    finished: false,
				keys:'-hot'
			}
		},
		created() {
			this.$emit('showevent', false)
			var kw = this.$route.query.kw;
			var page = this.page;
			var keys=this.keys;
			request({
				url: `/api/Searchabout/condition?format=json`
			}).then(res => {
				this.tabs = res.data.data
			})
			request({
				url: `/api/search/recipe?format=json&page=${page}&keyword=${kw}&order=${keys}`
			}).then(res => {
				this.list = res.data.data.items;
				if(res.data.data.top_results){
					this.top_results = res.data.data.top_results
				}	
			})
		},
		methods:{
			onLoad(){
				this.loading=true;
				var kw = this.kw;
				var page = this.page+1;
				var keys=this.keys;
				request({
					url:`/api/search/recipe?format=json&page=${page}&keyword=${kw}&order=${keys}`
				}).then(res=>{
					this.list=this.list.concat(res.data.data.items);
					this.loading=false;
					this.page+=1;
				})
			},
			onClick(name) {
			      var kw = this.$route.query.kw;
			      var page = this.page;
			      var keys=name;
				  request({
				  	url:`/api/search/recipe?format=json&page=${page}&keyword=${kw}&order=-hot `
				  }).then(res=>{
					  this.list=[];
				  	this.list=res.data.data.items;
				  })
			    }
		}
	}
</script>

<style>
	.show-tabs{
		/* margin-top: 50px; */
	}
	.top_results {
		display: flex;
		margin: 10px 20px;
		border: 1px solid gainsboro;
		border-radius: 10px;
		justify-content: space-between;
		align-items: center;
		box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.9);
		
	}

	.top_results h4 {
		margin: 10px 0;
	}

	.top_results img {
		height: 80px;
		width: 80px;
		border-radius: 7px;
		margin-right: 10px;
	}

	.top_results div {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.top_results div span {
		border: 1px solid gainsboro;
		background-color: #8ad63a;
		color: white;
		border-radius: 20px;
		padding: 5px 20px;
		margin-left: 10px;
		margin-bottom: 10px;
	}
	.show-serach-data{
		margin: 10px 20px;
	}
	.show-serach-data ul{
		display: flex;
		flex-direction: column;
	}
	.show-serach-data ul li{
		display: flex;
		margin-bottom: 10px;
	}
	.show-serach-data ul li img{
		height: 100px;
		width: 100px;
		border-radius: 7px;
		margin-right: 5px;
	}
	.show-serach-data ul li div{
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.show-serach-data ul li div p {
		display: flex;
		color: #a0a0a0;
		font-size: 10px;
		align-items: center;
		justify-content: center;
	}
	.show-serach-data ul li div p span{
		margin-right: 10px;
	}
	.show-serach-data ul li div img{
		height: 15px;
		width: 15px;
		border-radius: 50%;
	}
</style>
