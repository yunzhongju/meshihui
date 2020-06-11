<template>
	<div class="Detail">
		<van-nav-bar
		  fixed="true"
		  title="详情"
		  left-text=""
		  right-text="..."
		  left-arrow
		  @click-left="$router.go(-1)"
		/>
		
		<div class="show-video">
<!-- 			<video width="320" height="240" controls>
			  <source :src="video" type="video/mp4">
			</video> -->
			<img :src="video" alt="">
		</div>
		
		<div class="detail-from">
			<h3>{{detail_data.title}}</h3>
			<div class="mfrom">
				<span v-if="detail_data.author.nickname!=''">by  {{detail_data.author.nickname}}</span>
				<span>收藏{{detail_data.favor_amount_new}}</span>
				<span>浏览{{detail_data.viewed_amount}}</span>
			</div>
		</div>
		
		<div class="divier">
			<van-divider />
		</div>
		
		<div class="detail-cooking">
			<div class="showlist">
				<span class="haha">
					<van-icon name="star" />
					<span>{{detail_data.rate}}星</span>
				</span>
				<span class="haha">
					<van-icon name="fire" />
					<span>{{detail_data.technology}}</span>
				</span>
				<span class="haha">
					<van-icon name="umbrella-circle" />
					<span>{{detail_data.taste}}</span>
				</span>
				<span class="haha">
					<van-icon name="underway" />
					<span>{{detail_data.cooking_time}}</span>
				</span>
			</div>
			<h2>{{detail_data.story_content}}</h2>
		</div>
		
		<div class="detail-main_ingredient">
			<h4>主料<span v-if="detail_data.amount!=''">{{detail_data.amount}}</span></h4>
			<div class="showlist">
				<div class="showlist-item" v-for="(item,index) in main_ingredient">
					<div class="divier">
						<van-divider />
					</div>
					<div class="item-info">
						<span>{{item.title}}</span>
						<span>{{item.amount}}</span>
					</div>
				</div>
			</div>
		</div>
		
		<div class="detail-main_ingredient">
			<h4>辅料</h4>
			<div class="showlist">
				<div class="showlist-item" v-for="(item,index) in secondary_ingredient">
					<div class="divier">
						<van-divider />
					</div>
					<div class="item-info">
						<span>{{item.title}}</span>
						<span>{{item.amount}}</span>
					</div>
				</div>
			</div>
		</div>
		
		<div class="cook_steps">
			<div class="cook_steps-showlist">
				<div class="cook_steps-showlist-showlist-item" v-for="(item,index) in cook_steps">
					<img :src="item.pic_urls[0].big" :height="item.pic_urls[0].height">
					<p>{{item.content}}</p>
					<div class="step-title">
						<span>{{item.title}}</span>
					</div>
				</div>
			</div>
		</div>
		
		
		<van-list
		  v-model="loading"
		  :finished="finished"
		  finished-text="没有更多了"
		  @load="onLoad"
		>
		  <div class="wenzhang_recommends">
		  	<h3>为你推荐</h3>
		  	<div class="wenzhang_recommends-showlist">
		  		<div class="wenzhang_recommends-showlist-item" v-for="(item,index) in wenzhang_recommends" 
		  														v-if="item.img_show_type==1">
		  			<div class="showitem-info" >
		  				<p>{{item.title}}</p>
		  				<img :src="item.images" alt="">
		  			</div>
		  			<div class="showitem-st">
		  				<span>
		  				<van-icon name="browsing-history" />
		  				{{item.click_num}}</span>
		  				<span>{{item.create_time}}</span>
		  			</div>
		  			<div class="divier">
		  				<van-divider />
		  			</div>
		  		</div>
		  	</div>
		  </div>
		</van-list>
		
	</div>
</template>

<script>
	import Vue from 'vue';
	import { NavBar,Icon,Divider} from 'vant';
	Vue.use(NavBar).use(Icon).use(Divider);
	
	
	import {
		request
	} from '../network/request.js'
	export default {
		name: 'Detail',
		data() {
			return {
				page: 1,
				detail_data: '',
				video: '',
				main_ingredient: [],
				secondary_ingredient: [],
				cook_steps: [],
				wenzhang_recommends: [],
				loading: false,
			    finished: false
			}
		},
		created() {
			// console.log(this.$route.params.id)
			this.get_detail_data()
			this.$emit('showevent', false)
		},
		methods: {
			get_detail_data() {
				var id = this.$route.params.id;
				request({
					url: `/api/recipe/detail?source=%E5%BE%AE%E4%BF%A1%E5%B0%8F%E7%A8%8B%E5%BA%8F&format=json&id=${id}&uid=14480040&token=321597f5c8403534487fbfad855cc232`
				}).then(res => {
					this.video = res.data.data.recipe_long_img
					this.main_ingredient = res.data.data.main_ingredient
					this.secondary_ingredient = res.data.data.secondary_ingredient
					this.cook_steps = res.data.data.cook_steps
					this.detail_data = res.data.data
					console.log(res.data)
				})

				request({
					url: `/bpi/weixin/wenzhang_recommend.php?format=json&page=${this.page}`
				}).then(res => {
					this.wenzhang_recommends = res.data.data.items
				})
			},
			onLoad(){
				var page=this.page+1;
				this.loading = true;
				request({
					url: `/bpi/weixin/wenzhang_recommend.php?format=json&page=${page}`
				}).then(res=>{
					this.wenzhang_recommends=this.wenzhang_recommends.concat(res.data.data.items)
					this.loading=false;
				})
				if(this.wenzhang_recommends.length>30){
					this.finished=true;
				}
			}
		}
	}
</script>

<style >
	.divier{
		margin: 10px 20px;
	}
	.detail-from h3{
		margin-left: 20px;
		margin-bottom: 10px;
	}
	.detail-from .mfrom{
		display: flex;
	}
	.detail-from .mfrom span{
		margin-left: 20px;
		color: #6d6d6d;
	}
	
	.detail-cooking{
		margin: 5px 20px;
	}
	.detail-cooking .showlist{
		display: flex;
	}
	.detail-cooking h2{
		color: #999999;
		margin-top: 10px;
	}
	.detail-cooking .haha{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		color: #6d6d6d;
	}
	.detail-cooking .haha span{
		margin-top: 5px;
	}
	
	.detail-main_ingredient{
		margin: 10px 20px;
		display: flex;
		flex-direction: column;
	}
	.detail-main_ingredient h4{
		margin-bottom: 0;
	}
	.detail-main_ingredient h4 span{
		color: #999999;
		font-size: 12px;
		margin-left: 5px;
	}
	.detail-main_ingredient .showlist{
		display: flex;
		flex-direction: column;
	}
	.detail-main_ingredient .showlist .showlist-item{
		display: flex;
		flex-direction: column;
		width: 100%;
	}
	.detail-main_ingredient .showlist .showlist-item .divier{
		margin: 0 20px;
	}
	.detail-main_ingredient .showlist .showlist-item .item-info{
		display: flex;
		justify-content: space-between;
	}
	.cook_steps{
		/* margin: 0 20px; */
		width: 100%;
	}
	.cook_steps .cook_steps-showlist{
		display: flex;
		flex-direction: column;
	}
	.cook_steps .cook_steps-showlist .cook_steps-showlist-showlist-item{
		display: flex;
		flex-direction: column;
		position: relative;
	}
	.cook_steps .cook_steps-showlist .cook_steps-showlist-showlist-item p{
		margin-left: 20px;
		color: #797979;
		font-size: 20px;
	}
	.cook_steps .cook_steps-showlist .cook_steps-showlist-showlist-item .step-title{
		position: absolute;
		z-index: 10;
		width: 30%;
		height: 30px;
		top: 15px;
		left: -20px;
		background-color: white;
		border-radius: 40px;
		text-align: center;
		line-height: 30px;
		opacity: 0.8;
	}
	
	.wenzhang_recommends{
		margin: 10px 20px;
	}
	.wenzhang_recommends .wenzhang_recommends-showlist{
		display: flex;
		flex-direction: column;
	}
	.wenzhang_recommends .wenzhang_recommends-showlist .wenzhang_recommends-showlist-item{
		display: flex;
		flex-direction: column;
	}
	.wenzhang_recommends .wenzhang_recommends-showlist .wenzhang_recommends-showlist-item .showitem-info{
		display: flex;
		justify-content: space-between;
		font-size: 15px;
		color: #575757;
	}
	.wenzhang_recommends .wenzhang_recommends-showlist .wenzhang_recommends-showlist-item .showitem-info img{
		height: 100px;
		width: 120px;
		margin-left: 6px;
	}
	.wenzhang_recommends .wenzhang_recommends-showlist .wenzhang_recommends-showlist-item .showitem-st{
		display: flex;
		color: #9d9d9d;
		font-size: 10px;
	}
	.wenzhang_recommends .wenzhang_recommends-showlist .wenzhang_recommends-showlist-item .showitem-st span{
		margin-right: 10px;
	}
</style>
