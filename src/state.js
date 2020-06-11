import Vue from 'vue';
import Cookies from 'js-cookie';

const store = new Vue();

store.getuser = function() {
	return Cookies.get('user')
}

store.setuser = function(val) {
	Cookies.set("user", val)
}
export default store;
