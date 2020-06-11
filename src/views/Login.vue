<template>
	<div class="Login">
		<van-nav-bar
		  title="登录"
		  left-text="返回"
		  left-arrow
		  @click-left="$router.go(-1)"
		/>
		
		
		<div class="login-car">
			<van-form @submit="onSubmit">
				<van-field v-model="user.username" name="username" label="用户名" placeholder="用户名" :rules="[{ required: true, message: '请填写用户名' }]" />
				<van-field v-model="user.password" type="password" name="pwd" label="密码" placeholder="密码" :rules="[{ required: true, message: '请填写密码' }]" />
				<div style="margin: 16px;">
					<van-button round block type="info" native-type="submit">
						登录
					</van-button>
				</div>
			</van-form>
		</div>
		
		
		<div class="register" @click="$router.replace('/register')">
			<span >注册</span>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue';
	import store from '../state.js'
	import {
		Form,
		Field,
		Button,
		NavBar 
	} from 'vant';

	Vue.use(Form).use(Field).use(Button).use(NavBar);


	import {
		request
	} from '../network/request.js'
	export default {
		name: 'Login',
		data() {
			return {
				user: {
					username: '',
					password: ''
				}
			}
		},
		created() {
			this.$emit('showevent', false);

		},
		methods: {
			onSubmit(values) {
				console.log('submit', values);
				request({
					url: 'http://127.0.0.1:5000/login',
					method: 'POST',
					data:`username=${values.username}&password=${values.pwd}`
				}).then(res=>{
					if(res.data.staute==1){
						store.setuser(res.data.token)
						if(this.$route.query.redirect){
							this.$router.replace(this.$route.query.redirect)
						}else{
							this.$router.replace('/')
						}
					}else{
						alert('用户名或密码错误')
					}
				}).catch(err=>{
					console.log(err)
				})
			},
			
			onClickLeft() {
			  
			},
		}
	}
</script>

<style>
	.Login{
		height: 569px;
		background:url(../assets/lbg.jpg) repeat 50%;
	}
	.login-car{
		margin-top: 150px;
	}
	.register{
		display: flex;
		text-align: center;
		box-sizing: border-box;
		justify-content: center;
		color: white;
		background: #1989fa;
		height: 43px;
		border-radius: 40px;
		align-items: center;
		padding: 0 20px;
		width: 90%;
		position: absolute;
		top: 350px;
		left: 17px;
		font-size: 14px;
	}
</style>
