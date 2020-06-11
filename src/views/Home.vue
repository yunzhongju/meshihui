<template>
	<div class="home">

		<div class="show-serach" @click="$router.replace('/serach')">
			<van-search placeholder="搜索百万免费菜谱" 
						shape="round" 
						v-model="value"
						class="serach-item" />
		</div>

		<div class="line"></div>

		<i>
			<p class="recommend">{{recommend_info}}</p>
		</i>

		<div class="videolist">
			<van-swipe :loop="false" :width="250" :height="370" :show-indicators='false'>
				<van-swipe-item v-for="(item,index) in video_info" @click="onClick(item.id)">
					<div class="showimage"><img :src="item.video.img" alt=""></div>
					<div class="userinfo">
						<h3>{{item.title}}</h3>
						<div class="userinfo-item">
							<img :src="item.author.avatar_url" alt="">
							<span>{{item.author.nickname}}</span>
						</div>
					</div>
				</van-swipe-item>
			</van-swipe>
		</div>

		<div class="label">
			<div class="label-item" v-for="(item,index) in tags">
				<img :src="item.img">
			</div>
		</div>

		<van-tabs v-model="active" animated swipeable>
			<van-tab v-for="(item,index) in sancan" :title="item.title">
				<div class="showsc">
					<div class="showsc-item" v-for="(each,index) in item.items" @click="onClick(each.id)">
						<img :src="each.img" alt="">
						<span class="title"><b>{{each.title}}</b></span>
						<span>{{each.desc}}</span>
					</div>
				</div>
			</van-tab>
		</van-tabs>

		<div class="banner">
			<van-swipe :autoplay="3000" :height="130">
				<van-swipe-item v-for="(item, index) in banner" :key="index">
					<img v-lazy="item.img" />
				</van-swipe-item>
			</van-swipe>
		</div>

		<div class="edit">
			<b>
				<h2>精选</h2>
			</b>
		</div>

		<div class="recommends">
			<div class="showlist">
				<div class="showlist-item" v-for="(item,index) in recommends">
					<div  v-if="item.type==1"
						  @click="onClick(item.recipe.id)">
						<img :src="item.recipe.img">
						<div class="showlist-item-info">
							<h3>{{item.recipe.title}}</h3>
							<div>
								<van-icon name="browsing-history" />
								<span>{{item.recipe.viewed_amount}}</span>
							</div>
						</div>
					</div>
					<div  v-else-if="item.type==5"
						  @click="onClick(item.caidan.id)">
						<img :src="item.caidan.img">
						<div class="showlist-item-info">
							<h3>{{item.caidan.title}}</h3>
							<div>
								<van-icon name="browsing-history" />
								<span>{{item.caidan.viewed_amount}}</span>
							</div>
						</div>
					</div>
					<div  v-else-if="item.type==7"
						  @click="onClick(item.video_recipe.id)">
						<img :src="item.video_recipe.img">
						<div class="showlist-item-info">
							<h3>{{item.video_recipe.title}}</h3>
							<div>
								<van-icon name="browsing-history" />
								<span>{{item.video_recipe.viewed_amount}}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="more" @click="onLoad">
			<span>点击加载更多...</span>
		</div>
	</div>
</template>

<script>
	import {
		request
	} from '../network/request.js'
	import Vue from 'vue'
	import {
		Search,
		Icon,
		Tab,
		Tabs,
		Swipe,
		SwipeItem,
		Lazyload,
		List
	} from 'vant';
	Vue.use(Search)
		.use(Icon)
		.use(Tab)
		.use(Tabs)
		.use(Swipe)
		.use(SwipeItem)
		.use(Lazyload)
		.use(List);
	// @ is an alias to /src
	import HelloWorld from '@/components/HelloWorld.vue'
	export default {
		name: 'Home',
		components: {
			HelloWorld
		},
		data() {
			return {
				page: 1,
				value:'',
				loading: false,
				finished: false,
				active: 0,
				recommend_info: '',
				video_info: [],
				tags: [],
				sancan: [],
				banner: [],
				recommends: []
			}
		},
		created() {
			this.$emit('showevent', true);
			this.get_home_recommend()
		},
		methods: {
			get_home_recommend() {
				request({
					url: '/api/index/home_recommend_6_9_1?format=json'
				}).then(res => {
					this.recommend_info = res.data.data[0].recommend_info.recommend_text
					this.video_info = res.data.data[1].video_info
					this.tags = res.data.data[2].channel
					this.sancan = res.data.data[3].sancan
					this.banner = res.data.data[4].zhuanti
				})
				request({
					url: '/api/index/home_feeds_applet?format=json&page=' + this.page
				}).then(res => {
					this.$forceUpdate()
					this.recommends = res.data.data.items
					// console.log(this.recommends)
				})
			},
			onLoad() {
				var page = this.page += 1;
				var newarry = [];
				this.loading = true;
				request({
					url: '/api/index/home_feeds_applet?format=json&page=' + page
				}).then(res => {
					newarry = res.data.data.items;
					this.recommends = this.recommends.concat(newarry);
					this.loading = false;
				})
				if(this.recommends.length>30){
					this.finished=true;
				}
			},

			onClick(event) {
				var id = event;
				this.$router.push(`/detail/${id}`)
			},
		}
	}
</script>
<style lang="less">
	.show-serach {
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 2;
	}

	.more {
		height: 100px;
		text-align: center;
		color: gray;
	}

	.more span {
		line-height: 50px;
	}

	.showlist {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.showlist .showlist-item {
		width: 48%;
		margin-bottom: 10px;
		position: relative;
	}

	.showlist .showlist-item img {
		width: 100%;
		height: 250px;
		box-shadow: 3px 5px 9px rgba(0, 0, 0, 0.9);
		border-radius: 7px;
	}

	.showlist .showlist-item .showlist-item-info {
		position: absolute;
		bottom: 10px;
		left: 10px;
		color: white;
	}

	.showlist .showlist-item .showlist-item-info h3 {
		margin-bottom: 10px;
		color: white;
	}

	.showlist .showlist-item .showlist-item-info div {
		display: flex;
		align-items: center;
	}

	.showlist .showlist-item .showlist-item-info div span {
		margin-left: 10px;
		font-size: 10px;
	}

	.edit {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.line {
		border: 0.5px solid gainsboro;
		margin-top: 60px;
	}

	.recommend {
		margin: 10px 0;
		color: #ff5059;
		font-size: 14px;
	}

	.videolist {
		position: relative;
	}

	.videolist .userinfo {
		position: absolute;
		bottom: 30px;
		left: 25px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		color: white;
	}

	.videolist .userinfo h3 {
		margin-bottom: 10px;
		font-size: 25px;
		color: white;
	}

	.videolist .userinfo .userinfo-item {
		display: flex;
		align-items: center;
	}

	.videolist .userinfo img {
		width: 30px;
		height: 30px;
		border-radius: 50%;
		margin-right: 15px;
	}

	.videolist .showimage {
		padding: 0 10px;

	}

	.videolist img {
		height: 100%;
		width: 100%;
		border-radius: 10px;
		box-shadow: 3px 5px 9px rgba(0, 0, 0, 0.9)
	}

	.home {
		padding: 0 10px;
	}

	.label {
		display: flex;
		justify-content: space-around;
		color: red;
	}

	.label .label-item {
		width: 113px;
		height: 100px;
	}

	.label .label-item .showtxt {}

	.label .label-item img {
		width: 100%;
		height: 100%;
	}

	.showsc {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}

	.showsc .showsc-item {
		display: flex;
		flex-direction: column;
		margin-left: 2px;
		justify-content: left;
		width: 140px;
		height: 250px;

	}

	.showsc .showsc-item img {
		width: 100%;
		height: 200px;
		border-radius: 10px;
		box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.9)
	}

	.showsc .showsc-item span {
		margin-top: 5px;
		padding-right: 3px;
		color: #F2DEDE;
		font-size: 10px;
	}

	.showsc .showsc-item .title {
		color: #333333;
		font-size: 15px;
	}

	.banner {
		margin-top: 5px;
	}

	.banner img {
		width: 100%;
		height: 100%;
		border-radius: 10px;
	}
</style>
