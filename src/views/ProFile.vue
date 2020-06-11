<template>
	<div class="ProFile">
		<!-- <p @click="desorty">注销</p> -->
		<div class="userinfo">
			<div class="setinfo">
				<span><van-icon name="setting-o" size="40"/></span>
				<b><i><span  @click="desorty">注销</span></i></b>
			</div>
			<div class="showhead">
				<img src="../assets/lbg.jpg" alt="">
				<p>隔着玻璃看世界</p>
			</div>
			<div class="showlist">
				<div class="list-item">
					<span>0</span>
					<p>浏览</p>
				</div>
				<div class="list-item">
					<span>0</span>
					<p>粉丝</p>
				</div>
				<div class="list-item">
					<span>0</span>
					<p>关注</p>
				</div>
				<div class="list-item">
					<span>0</span>
					<p>作品</p>
				</div>
			</div>
		</div>
		
		<div class="showline">
			<span></span>
		</div>
		
		
		<div class="showtabs">
			<div class="tab">
				<van-icon name="send-gift-o" size="30"/> 
				<p>收藏</p>
			</div>
			<div class="tab">
				<van-icon name="send-gift-o" size="30"/> 
				<p>发布</p>
			</div>
			<div class="tab">
				<van-icon name="send-gift-o" size="30"/> 
				<p>草稿</p>
			</div>
			<div class="tab">
				<van-icon name="send-gift-o" size="30"/> 
				<p>菜篮</p>
			</div>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue';
	import { Icon } from 'vant';
	Vue.use(Icon);
	import store from '../state.js'
	export default{
		name:'ProFile',
		methods:{
			desorty(){
				store.setuser('');
				this.$router.replace('/login')
			}
		},
		created() {
			this.$emit('showevent', true);
		}
	}
</script>

<style>
	p{margin: 5px 0;}
	.userinfo{
		display: flex;
		flex-direction: column;
	}
	.userinfo .setinfo{
		display: flex;
		justify-content: flex-end;
		margin-top: 10px;
		align-items: center;
	}
	.userinfo .setinfo span{
		margin-right: 10px;
		font-size: 20px;
	}
	
	.userinfo .showhead{
		display: flex;
		font-size: 25px;
		align-items: center;
	}
	.userinfo .showlist{
		display: flex;
		justify-content: space-between;
		padding: 0px 20px;
		margin-top: 10px;
		color: #696969;
		text-align: center;
	}
	.userinfo img{
		height: 80px;
		width: 80px;
		border-radius: 50%;
		margin-left:20px;
		margin-right: 10px;
	}
	.showline{
		display: flex;
		justify-content: center;
		margin-top: 5px;
	}
	.showline span{
		width: 90%;
		border: 1px solid #F5F5F5;
	}
	
	.showtabs{
		display: flex;
		justify-content: space-between;
		padding: 0 20px;
		color: #696969;
	}
	.showtabs .tab{
		margin-top: 5px;
		text-align: center;
	}
	.showtabs .tab p{
		margin: 0;
	}
</style>
