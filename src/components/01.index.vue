<template>
 <!-- 基础结构 从静态资源目录下 02.商品列表下 拷贝 -->
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="#/" class="router-link-active">首页</a> &gt;
                <a href="#/site/goodslist" class="router-link-exact-active router-link-active">购物商城</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="wrap-box">
                    <div class="left-220" style="margin: 0px;">
                        <div class="banner-nav">
                            <ul>
                                <!-- 循环生成li -->
                                <li v-for="item in catelist" :key="item.id">
                                    <h3>
                                        <i class="iconfont icon-arrow-right"></i>
                                        <span>{{item.title}}</span>
                                        <p>
                                            <span v-for="itemSon in item.subcates" :key="itemSon.id">
                                               {{itemSon.title}}&nbsp;
                                            </span>
                                        </p>
                                    </h3>
                                    <div class="item-box">
                                        <dl>
                                            <dt>
                                                <a href="/goods/40.html">{{item.title}}</a>
                                            </dt>
                                            <dd>
                                                <a v-for="itemSon in item.subcates" :key="itemSon.id" href="/goods/43.html">{{itemSon.title}}</a>
                                            </dd>
                                        </dl>
                                    </div>
                                </li>
                               
                            </ul>
                        </div>
                    </div>
                    <!--幻灯片-->
                    <div class="left-705">
                        <el-carousel :interval="5000" arrow="always">
                            <el-carousel-item v-for="item in slidelist" :key="item.id">
                            <img :src="item.img_url" alt="">
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                    <!--/幻灯片-->
                    <div class="left-220">
                        <ul class="side-img-list">
                            <li v-for="(item, index) in toplist" :key="item.id">
                                <div class="img-box">
                                    <label>{{index+1}}</label>
                                    <img :src="item.img_url">
                                </div>
                                <div class="txt-box">
                                    <a href="/goods/show-98.html">{{item.title}}</a>
                                    <!-- 对应下面的过滤器又叫管道符 -->
                                    <span>{{item.add_time | filterDate}}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="section" v-for="item in messagelist" :key="item.catetitle">
            <div class="main-tit">
                <h2>{{item.catetitle}}</h2>
                <p>
                    <a href="/goods/43.html" v-for="itemSon in item.level2catelist" :key="itemSon.subcateid">{{itemSon.subcatetitle}}</a>
                    <a href="/goods/40.html">更多
                        <i>+</i>
                    </a>
                </p>
            </div>
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <ul class="img-list">
                        <li v-for="itemson in item.datas" :key="itemson.artID">
                            <router-link :to="'/detail/'+itemson.artID">
                                <div class="img-box">
                                    <!-- <img :src="itemson.img_url"> -->
                                    <img v-lazy="itemson.img_url">
                                </div>
                                <div class="info">
                                    <h3>{{itemson.artTitle}}</h3>
                                    <p class="price">
                                        <b>{{itemson.sell_price}}</b>元</p>
                                    <p>
                                        <strong>库存{{itemson.stock_quantity}}</strong>
                                        <span>市场价：
                                            <s>{{itemson.market_price}}</s>
                                        </span>
                                    </p>
                                </div>
                            </router-link>
                        </li>
                    
                    </ul>
                </div>
            </div>
        </div>
    </div>
     
</template>

<script>
// 导入axios要数据
import axios from "axios";
// // 导入moment.js文档 格式化日期
// import moment from "moment";
// 组件
export default {
  name: "index",
  data: function() {
    return {
      // 用一个空数组接收数据
      catelist: [],
      slidelist: [],
      toplist: [],
      messagelist: []
    };
  },
  beforeCreate() {},
  // 生命周期函数
  // 这个函数方法要放在组建中
  // 创建完毕
  created() {
    axios
      .get("http://47.106.148.205:8899/site/goods/gettopdata/goods")
      .then(response => {
        // 获取数据去接口文档找地址 找到之后打印并截图
        //打印数据
        // console.log(response);
        this.catelist = response.data.message.catelist;
        this.slidelist = response.data.message.sliderlist;
        this.toplist = response.data.message.toplist;
      });
    axios
      .get("http://47.106.148.205:8899/site/goods/getgoodsgroup")
      .then(response => {
        // console.log(response);
        this.messagelist = response.data.message;
      });
  },

//   过滤器   去Vue找
    // filters: {
    //   // 过滤日期
    //   filterDate(val) {
    //     return moment(val).format("YYYY年MM月DD日");
    //   }
    // }
};
</script>
<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.el-carousel__container {
  height: 341px;
}
.el-carousel__item img {
  width: 100%;
  height: 100%;
}
</style>
