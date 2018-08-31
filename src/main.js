// 导入Vue
import Vue from 'vue'
// 导入 路由
import VueRouter from 'vue-router'
// 0. 如果使用模块化机制编程，导入Vue和VueRouter，要调用 Vue.use(VueRouter)
Vue.use(VueRouter);

// 导入APP根组件  （最外面的组件）
import App from './App.vue'

// 导入首页单文件组件
import Index from './components/01.index.vue'

// 引入商品详情组件
import Detail from "./components/02.productDetail.vue"
// 导入购物车页面
import shoopingCart from "./components/03.shoopingCart.vue"
// 导入登录 页面
import Login from "./components/04.login.vue"
// 导入写订单 页面
import writeorder from "./components/05.writeorder.vue"
// lazy
import VueLazyload from 'vue-lazyload'
// 用包
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'dist/error.png',
  // loading: './assets/img/loading.gif',
  // 生成绝对路径
  // loading: path.join(__dirname,'./assets/img/loading.gif'),
  // 图片也要当做模块导入
  loading: require('./assets/img/loading.gif'),
  attempt: 1
})

// 导入element
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 把ElementUI注册到Vue
Vue.use(ElementUI);

// 引入iView回到顶部
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);

// 导入moment.js文档
import moment from "moment";

// 导入放大镜
import ProductZoomer from 'vue-product-zoomer';
Vue.use(ProductZoomer)

// 引入axios
import axios from "axios";

// 让ajax携带cookie
axios.defaults.withCredentials = true

// 过滤器   去01.index.Vue抽取  // 过滤日期
Vue.filter('filterDate', function (val) {
  return moment(val).format("YYYY年MM月DD日");
})

// 整合Vuex 统一进行 数据管理
import Vuex from 'vuex';
Vue.use(Vuex)
// 实例化一个仓库 用来保存数据
const store = new Vuex.Store({
  // 这里就是我们的数据
  state: {
    // count: 998
    cartDate: JSON.parse(window.localStorage.getItem('goodkey')) || {},
    // 是否登录
    isLogin: false,
    // 来时地址
    frompath: ''
  },
  // 这个是暴露的修改方法
  mutations: {
    // 每次触发 数字 +1
    // increment (state,n) {
    //   state.count+=n
    // }
    // 增加购物车数据获取到 id 以及数量
    // 传入的数据是一个对象 格式{goodId:商品id,goodNum:数量}
    addGoods(state, goodInfo) {
      // console.log(goodInfo);
      // 保存数据[]只有用中括号对象取值 才可以 传入变量 用.语法是固定的属性名
      if (state.cartDate[goodInfo.goodId] == undefined) {
        // 传过来的id 不存在 新增这个id作为属性
        // 直接增加这个属性即可
        // state.cartDate[goodInfo.goodId] = goodInfo.goodNum;
        // 为了要让Vue检测到数据的改变同步修改页面显示 需要调用Vue.set方法
        Vue.set(state.cartDate, goodInfo.goodId, goodInfo.goodNum);
      } else {
        // 传过来的id 已经存在 累加
        state.cartDate[goodInfo.goodId] += goodInfo.goodNum;
      }
    },
    // 额外增加一个修改的方法
    updateGoodsNum(state, goodInfo) {
      state.cartDate[goodInfo.goodId] = goodInfo.goodNum
    },
    // 额外增加一个删除的方法
    deleteGoods(state, goodId) {
      delete state.cartDate[goodId]
    },
    // 切换登录状态
    changeLoginStatus(state, isLogin) {
      state.isLogin = isLogin
    },
    // 增加一个保存来时地址的方法
    saveFromPath(state,frompath){
      state.frompath = frompath;
    }
  },
  // getters vuex的计算属性
  getters: {
    goodsCount: state => {
      // 临时num
      let num = 0;
      //  循环数据对象
      for (const key in state.cartDate) {
        // console.log(key);
        num += state.cartDate[key]
      }
      // 累加总数
      // 返回总数
      return num;
    }
  },
  // 
})


// 浏览器页面关闭时保存到localStorage中
window.onbeforeunload = function () {
  window.localStorage.setItem('goodkey', JSON.stringify(store.state.cartDate))
}



// 定义路由规则
let routes = [{
  // 首页规则
  path: '/',
  // 根目录默认 访问首页
  component: Index
  // 直接注册index组件
  // redirect: '/index',
  // 重定向
},
// 默认首页
{
  path: '/index',
  // index访问index
  component: Index
},
// 详情页规则
{
  path: '/detail/:id',
  component: Detail
},
{
  path: '/cart',
  component: shoopingCart
},
{
  path: '/login',
  component: Login
},
{
  path: '/order/:ids',
  component: writeorder
},
]


// 实例化路由对象
let router = new VueRouter({
  routes: routes
})
// 增加导航守卫（路由守卫）
router.beforeEach((to, from, next) => {
  // 进来就存 来时地址
  // console.log(from)
  // 提交载荷/保存数据
store.commit('saveFromPath',from.path)
  // 如果访问的是order页面 判断登录
  if (to.path.indexOf('/order/') != -1) {
    // 调用接口
    axios.get('http://47.106.148.205:8899/site/account/islogin').then(response => {
      // console.log(response);
      // 登录了  继续访问
      if (response.data.code != 'nologin') {
        // 不管
        next()
      } else {
        // 否则去登陆页登陆
        next('/login')
      }
    })
  } else {
    next()
  }
})



// 挂载到Vue示例上
Vue.config.productionTip = false
// 实例化Vue对象
new Vue({
  render: h => h(App),
  // 路由对象
  router,
  // 仓库对象
  store,
  // 最高级别组件
  beforeCreate() {
    axios.get("http://47.106.148.205:8899//site/account/islogin").then(response => {
      // console.log(response);
      if (response.data.code == 'logined') {
        store.state.isLogin = true;
      } else {
        
      }
    })
  },
}).$mount('#app')
