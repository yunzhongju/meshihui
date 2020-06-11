<template>
	<div class="FoodShow">
		<div class="show-data">
			<van-tabs v-model="active" swipeable :animated="true" :sticky="true" @click="onClick">
			  <van-tab v-for="(item,index) in foodshow_tabs" :name="item.topic_id">
				  <div slot="title" class="title">
					<img :src="item.topic_img" alt="">
					<span>#{{item.topic_title}}</span>
				  </div>
				  
				  <van-list
				    v-model="loading"
				    :finished="finished"
				    finished-text="没有更多了"
				    @load="onLoad"
				  >
				    <div class="show-list">
					  <div class="show-list-item" v-for="(each,index) in list">
						  <img :src="each.works.img" alt="">
						  <p>{{each.works.content}}</p>
						  <div class="user-info">
							<img :src="each.works.author.avatar_url" alt="">
							<span>{{each.works.author.nickname}}</span>
							<span>{{each.works.time}}</span>
						  </div>
					  </div>
				    </div>
				  </van-list>
			  </van-tab>
			</van-tabs>
		</div>
		
		<div class="footer" height="150"></div>
	</div>
</template>

<script>
	import {request} from '../network/request.js'
	
	export default {
		name:'FoodShow',
		data(){
			return {
				foodshow_tabs:[],
				active:0,
				list:[],
				page:1,
				id:'',
			    loading: false,
			    finished: false
			}
		},
		created() {
			this.$emit('showevent', true);
			this.get_foodshow()
		},
		methods:{
			get_foodshow(){
				request({
					url:'/api/Foodshow/foodshow_tab?format=json&type=1'
				}).then(res=>{
					this.foodshow_tabs=res.data.data.item
				})
				request({
					url:'/api/Foodshow/foodshow_index?format=json&page='+this.page+'&id=&type=1'
				}).then(res=>{
					this.list=res.data.data.items
					// console.log(res.data.data.items)
				})
			},
			onClick(id){
				this.id=id;
				console.log(id)
				var tpye_id=id;
				var page=this.page
				var newlist=[]
				request({
					url:'/api/Foodshow/foodshow_index?format=json&page='+page+'&id='+tpye_id+'&type=1'
				}).then(res=>{
					this.list=[]
					newlist=res.data.data.items
					this.list=newlist
				})
			},
			// 滚定监听
			scrollEvent(e){
				console.log(e.currentTarget.scrollTop)
			  if(e.currentTarget.scrollTop+e.currentTarget.clientHeight>=e.currentTarget.scrollHeight){
				 var page=this.page+1;
				 this.get_more(page,this.id);
			  }
			},
			
			get_more(page,id){
				request({
					url:'/api/Foodshow/foodshow_index?format=json&page='+page+'&id='+id+'&type=1'
				}).then(res=>{
					this.list=this.list.concat(res.data.data.items)
					this.page+=1
				})
			},
			onLoad(){
				this.loading = true;
				var page=this.page+1;
				this.get_more(page,this.id);
				this.loading = false;
				if(this.list.length>40){
					this.finished = true;
				}
			}
		}
	}
</script>

<style>
	.FoodShow{
		padding: 0 15px;
	}
	.show-data{
		margin-top: 10px;
	}
	.show-data .title{
		width: 50px;
		position: relative;
	}
	.show-data .title img{
		height: 40px;
		width: 100%;
		border-radius: 10px;
	}
	.show-data .title span{
		position: absolute;
		top: 10px;
		left: 3px;
		color: white;
		font-size: 8px;
	}
	
	.show-list{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		margin-top: 10px;
	}
	.show-list .show-list-item{
		width: 49%;
		box-shadow: 3px 5px 5px rgba(0,0,0,0.9);
		border-radius: 10px;
		margin-bottom: 10px;
	}
	.show-list .show-list-item img{
		width: 100%;
		border-radius: 10px;
		
	}
	.show-list .show-list-item .user-info{
		display: flex;
		color: #7d7d7d;
		font-size: 10px;
		justify-content: space-around;
		align-items: center;
	}
	.show-list .show-list-item p{
		margin: 5px 10px 0;
		color: #333333;
		font-size: 15px;
	}
	.show-list .show-list-item .user-info img{
		height: 20px;
		width: 20px;
		border-radius: 50%;
	}
</style>
