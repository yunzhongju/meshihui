<template>
	<div class="Fitness">
		<div class="show-serach">
			<van-search placeholder="吃什么 来这里搜索" shape="round" class="serach-item" />
		</div>
		
		<div class="show-head">
			<h3>{{fit.title}}</h3>
			<span>{{fit.desc}}</span>
		</div>
		
		<div class="show-data">
			<div class="show-data-item" v-for="(item,index) in list">
				<van-swipe :loop="false" :width="300">
				  <van-swipe-item v-for="(each,i) in item.items">
					  <h4 :style="{background:item.color}">{{item.title}}</h4>
					  <img :src="each.img" alt="" :width="300" :height="170">
					  <div class="each-info">
						  <span>{{each.title}}</span>
						  <p>
							  <span v-for="(cls,index) in each.class">{{index+1}}.{{cls}}</span>
						  </p>
					  </div>
				  </van-swipe-item>
				</van-swipe>
			</div>
		</div>
		
		
		<div class="show-recommend">
			<b><p>近期推荐</p></b>
			<div class="show-img">
				<div v-for="(item,index) in recommends"><img :src="item.img" alt=""></div>
			</div>
		</div>
		
		
		<div class="footer">
			<span></span>
			<p>更多丰富场景敬请期待</p>
			<span></span>
		</div>
		
	</div>
</template>

<script>
	import {request} from '../network/request.js'
	export default {
		name: "Fitness",
		data() {
			return {
				fit:'',
				list:[],
				recommends:[]
				}
		},
		created() {
			this.$emit('showevent', true);
			this.get_fitness()
		},
		methods:{
			get_fitness(){
				request({
					url:'/api/scene/index?source=%E5%BE%AE%E4%BF%A1%E5%B0%8F%E7%A8%8B%E5%BA%8F&format=json&is_wx=1'
				}).then(res=>{
					this.fit=res.data.data;
					this.list=res.data.data.items
					this.recommends=res.data.data.recommend
					console.log(res.data.data.recommend)
				})
			}
		}
	}
</script>

<style>
	h3{
		margin: 0;
		font-size: 25px;
		color: #333333;
	}
	.Fitness {
		padding: 0 10px;
	}

	.show-serach {
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 2;
	}
	
	.show-head{
		margin-top: 60px;
	}
	.show-head span{
		color: gray;
		font-size: 13px;
	}
	
	.show-data{
		display: flex;
		flex-direction: column;
	}
	.show-data .show-data-item{
		position: relative;
		margin-top: 10px;
		box-shadow: 2px 3px 6px rgba(0,0,0,0.9);
		border-radius: 10px;
	}
	.show-data .show-data-item img{
		border-radius: 10px;
		
	}
	.show-data .show-data-item h4{
		position: absolute;
		top: 10px;
		left: 10px;
		z-index: 2;
		color: white;
		border-radius: 20px;
		padding: 5px;
		margin: 0;
	}
	.show-data .show-data-item .each-info{
		position: absolute;
		top: 50px;
		left: 10px;
	}
	.show-data .show-data-item .each-info span{
		color: white;
		font-size: 25px;
		padding-left: 4px;
	}
	.show-data .show-data-item .each-info p{
		display: flex;
		flex-direction: column;
	}
	.show-data .show-data-item .each-info p span{
		color: dimgray;
		font-size: 15px;
	}
	
	
	
	.show-recommend{
		border-top: 9px solid #F5F5F5;
		margin-top: 15px;
		font-size: 25px;
	}
	.show-recommend p{
		margin: 10px 0;
		color: #484848;
	}
	.show-recommend .show-img{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		
	}
	.show-recommend .show-img div{
		width: 32%;
	}
	.show-recommend  .show-img div img{
		height: 100%;
		width: 100%;
		
	}
	
	.footer{
		display: flex;
		justify-content: center;
		height: 100px;
	}
	.footer p{
		color: #F1f1f1;
		font-size: 15px;
		padding: 0 10px;
	}
	.footer span{
		border: 1px solid #F1F1F1;
		width: 20px;
		background: #F1F1F1;
		height: 0;
		margin-top: 24px;
	}
</style>
