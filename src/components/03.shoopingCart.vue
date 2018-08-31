<template>
    <div v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0,0,0,.5)">
  <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/cart.html">购物车</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span>
                                        放进购物车
                                    </div>
                                </li>
                                <li>
                                    <div class="progress">
                                        <span>2</span>
                                        填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span>
                                        支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->
                    <!--商品列表-->
                    <div class="cart-box">
                        <input id="jsondata" name="jsondata" type="hidden">
                        <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                            <tbody>
                                <tr>
                                    <th width="48" align="center">
                                        <a>选择</a>
                                    </th>
                                    <th align="left" colspan="2">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="104" align="center">数量</th>
                                    <th width="104" align="left">金额(元)</th>
                                    <th width="54" align="center">操作</th>
                                </tr>
                                <!-- 购物车中没有商品时显示 -->
                                <tr v-if="message.length==0">
                                    <td colspan="10">
                                        <div class="msg-tips">
                                            <div class="icon warning">
                                                <i class="iconfont icon-tip"></i>
                                            </div>
                                            <div class="info">
                                                <strong>购物车没有商品！</strong>
                                                <p>您的购物车为空，
                                                    <a href="/index.html">马上去购物</a>吧！</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <!-- 商品列表 -->
                                <tr v-for="(item, index) in message" :key="item.id">
                                    <td>
                                        <el-switch v-model="item.selected"
                                        active-color="#13ce66"
                                        inactive-color="#ff4949">
                                        </el-switch>
                                    </td>
                                    <td>
                                        <img style="width:65px" :src="item.img_url" alt="">
                                    </td>
                                    <td>
                                        {{item.title}}
                                    </td>
                                    <td>{{item.sell_price}}</td>
                                    <td> <el-input-number size="mini" :min="0" @change="numChange($event,item.id)" v-model="item.buycount"></el-input-number></td>
                                    <td>{{item.buycount*item.sell_price}}</td>
                                    <td><el-button @click="delOne(item.id)" type="danger" icon="el-icon-delete" circle></el-button></td>
                                </tr>
                                <tr>
                                    <th align="right" colspan="8">
                                        已选择商品
                                        <b class="red" id="totalQuantity">{{totalCount}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                                        <span class="red">￥</span>
                                        <b class="red" id="totalAmount">{{totalPrice}}</b>元
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--/商品列表-->
                    <!--购物车底部-->
                    <div class="cart-foot clearfix">
                        <div class="right-box">
                            <router-link to="/index">
                            <button class="button">继续购物</button>
                            </router-link>
                            <button class="submit" @click="checkAndSubmit">立即结算</button>
                        </div>
                    </div>
                    <!--购物车底部-->
                </div>
            </div>
        </div>


</div>
</template>
<script>
// 导入axios要数据
import axios from "axios";
export default {
  name: "shoopingCart",
  data: function() {
    return {
      message: [],
      loading:false
    };
  },
  // 生命周期函数
  created() {
    // 准备数据
    // console.log(this.$store.state.cartDate);
    // 暂存变量
    let cartData = this.$store.state.cartDate;
    // 定义拼接数据
    let ids = "";
    for (const key in cartData) {
      ids += key;
      ids += ",";
    }
    // 去掉最后的逗号
    ids = ids.slice(0, -1);
    // 调用接口 获取数据
    axios
      .get(`http://47.106.148.205:8899/site/comment/getshopcargoods/${ids}`)
      .then(response => {
        // console.log(response)

        // 自行拼接购买数量
        response.data.message.forEach(v => {
          // 获取 Vuex中的 id对应的值
          v.buycount = cartData[v.id];
          // 设置是否被选中
          v.selected = true;
        });
        this.message = response.data.message;
      });
  },
  //   计算属性
  computed: {
    // 总金额
    totalPrice() {
      // 被选中的n
      let totalPrice = 0;
      // 购买个数*价格
      this.message.forEach(v => {
        if (v.selected == true) {
          // 累加
          totalPrice += v.sell_price * v.buycount;
        }
      });
      return totalPrice;
    },
    // 总个数
    totalCount() {
      // 被选中的n
      let totalCount = 0;
      // 购买个数*价格
      this.message.forEach(v => {
        if (v.selected == true) {
          // 累加
          totalCount += parseInt(v.buycount);
        }
      });
      return totalCount;
    }
  },
  //   方法
  methods: {
    numChange(num, id) {
      //   console.log(num,id);
      // 调用仓库方法
      this.$store.commit("updateGoodsNum", {
        goodId: id,
        goodNum: num
      });
    },
    // 铲除数据
    delOne(id) {
      // 提交载荷
      this.$store.commit("deleteGoods", id);
      //   删除页面数据
      this.message.forEach((v, index) => {
        if (v.id == id) {
          this.message.splice(index, 1);
        }
      });
    },
    // 验证登录 跳转登录页
    checkAndSubmit(){
        // 判断是{否选择商品（是否有钱）
        if(this.totalPrice==0){
            this.$message.error("哥们，买东西才能结算")
            return;
        }
        // 如果选了东西 直接去订单页并带上id
        // id是选中商品的id
        let ids=''
        this.message.forEach(v=>{
            // 把选中的累加
            if(v.selected=true){
                ids+=v.id
                ids+=','
            }
        })
        // 去掉多余的   ，
        ids=ids.slice(0,-1)
       this.$router.push(`/order/${ids}`)

                                                // 以下这部分代码用路由守卫替换

                                                // 弹框提示loading框
                                                // this.loading= true
                                                // // 判断是否登录
                                                // axios.get("http://47.106.148.205:8899/site/account/islogin").then(response=>{
                                                //     // 关闭遮罩层
                                                //     setTimeout(()=>{
                                                //     this.loading= false;
                                                //     if(response.data.code=="nologin"){
                                                //         // 否->登录页
                                                //         this.$router.push('/login')
                                                //     }else{
                                                //         // 是->结算页
                                                //         this.$router.push('order')
                                                //     }
                                                //     },5000)
                                                    
                                                // })
    }
  }
};
</script>
<style>
</style>
