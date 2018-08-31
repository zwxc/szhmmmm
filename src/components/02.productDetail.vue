<template>
   <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <div class="pic-box">
                                <ProductZoomer  v-if="images.normal_size.length!=0" :base-images="images" :base-zoomer-options="zoomerOptions"></ProductZoomer>
                            </div>
                            <div class="goods-spec">
                                <h1>{{goodsinfo.title}}</h1>
                                <p class="subtitle">{{goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <!-- 使用element ui的 计数器替换 -->
                                               <el-input-number v-model="num1" @change="handleChange" :min="0" :max="goodsinfo.stock_quantity" size="mini" label="描述文字"></el-input-number>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                                                <button @click="cartAdd" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <Affix>
                                <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                    <ul>
                                        <li>
                                            <a href="javascript:;" @click="show=false" :class="{selected:!show}">商品介绍</a>
                                        </li>
                                        <li>
                                            <a href="javascript:;" @click="show=true" :class="{selected:show}">商品评论</a>
                                        </li>
                                    </ul>
                                </div>
                            </Affix>
                            
                            <div class="tab-content entry" v-show="!show" v-html="goodsinfo.content">
                                
                            </div>
                            <div class="tab-content" v-show="show">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm"
                                        class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea id="txtContent" v-model.trim="commentInfo" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input id="btnSubmit" name="submit" type="submit" value="提交评论" @click="submitCommit" class="submit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p v-show="comments.length==0" style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="item in comments" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.reply_time | filterDate}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>
                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                         <Page :total="totalCount" show-sizer show-elevator placement="top" :page-size-opts="[10, 20, 30, 40]"
                                         @on-change="pageChange" @on-page-size-change="pageSizeChange"
                                         />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="item in hotgoodslist" :key="item.id">
                                        <div class="img-box">
                                            <!-- <a href="#/site/goodsinfo/90" class=""> -->
                                            <router-link :to="'/detail/'+item.id">
                                                <img :src="item.img_url">
                                            <!-- </a> -->
                                            </router-link>
                                        </div>
                                        <div class="txt-box">
                                            <!-- <a href="#/site/goodsinfo/90" class="">{{item.title}}</a> -->
                                            <router-link :to="'/detail'+item.id">{{item.title}}</router-link>
                                            <span>{{item.add_time | filterDate}}</span>
                                        </div>
                                    </li>
                                   
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 返回顶部 -->
        <BackTop></BackTop>
        <!-- 加入购物车图片  -->
        <img v-if="imglist.length!=0" class="moveImg" :src="imglist[0].original_path" alt="">
    </div>
  
</template>
<script>
// 引入axios
import axios from "axios";
import $ from "jquery";

export default {
  name: "detail",
  data: function() {
    return {
      productId: undefined,
      goodsinfo: {},
      hotgoodslist: [],
      imglist: [],
      num1: 0,
      show: false,
      //   放大镜
      zoomerOptions: {
        zoomFactor: 3,
        pane: "container-round",
        hoverDelay: 300,
        namespace: "zoomer",
        move_by_click: false,
        scroll_items: 7,
        choosed_thumb_border_color: "#dd2c00"
      },
      images: {
        normal_size: []
      },
      //   页码
      pageNum: 1,
      // 页容量
      pageSize: 10,
      //   评论数据
      comments: [],
      // 总调数
      totalCount: 0,
      // 评论内容    双向数据绑定
      commentInfo: ""
    };
  },
  methods: {
    handleChange() {
      //   console.log("百所山");
    },
    // 获取评论数据的方法
    getComments() {
      axios
        .get(
          `http://47.106.148.205:8899/site/comment/getbypage/goods/${
            this.productId
          }?pageIndex=${this.pageNum}&pageSize=${this.pageSize}`
        )
        .then(response => {
          // console.log(response);
          this.comments = response.data.message;
          this.totalCount = response.data.totalcount;
        });
    },
    // 抽取的方法
    getproductDetail() {
      // 保存id
      this.productId = this.$route.params.id;
      axios
        .get(
          `http://47.106.148.205:8899/site/goods/getgoodsinfo/${this.productId}`
        )
        .then(response => {
          // console.log(response);
          this.goodsinfo = response.data.message.goodsinfo;
          this.hotgoodslist = response.data.message.hotgoodslist;
          this.imglist = response.data.message.imglist;

          //处理放大镜数据
          let temArr = [];
          // 循环处理数据
          this.imglist.forEach(v => {
            temArr.push({
              id: v.id,
              url: v.original_path
            });
          });
          // 临时数组
          this.images.normal_size = temArr;
        });
    },
    // 页码改变
    pageChange(page) {
      //   console.log(page);
      this.pageNum = page;
      //   页码改变   重新获取数据
      this.getComments();
    },
    // 页容量改变
    pageSizeChange(size) {
      //   console.log(size);
      this.pageSize = size;
      //   如果当前页1 重新获取数据
      if ((this.pageNum = 1)) {
        this.getComments();
      }
    },
    // 发表评论
    submitCommit() {
      if (this.commentInfo == "") {
        this.$Message.error("哥们，写点东西吧");
        return;
      }
      // 掉接口
      axios
        .post(
          `http://47.106.148.205:8899/site/validate/comment/post/goods/${
            this.productId
          }`,
          {
            commenttxt: this.commentInfo
          }
        )
        .then(response => {
          // 提示用户成功
          this.$Message.success(response.data.message);
          // 局部刷新
          this.getComments();
          //  清空评论
          this.commentInfo = "";
          // console.log(response)
        });
    },
    // 加入购物车逻辑
    cartAdd() {
      //   为0提示
      if (this.num1 == 0) {
        this.$Message.error("哥们,买点呗,不买怎么加入购物车呀 (づ￣ 3￣)づ");
        return;
      }
      // 获取（加入购物车）位置
      let cartOffset = $(".add").offset();
      //  获取购物车位置
      let targetOffset = $(".icon-cart").offset();
      $(".moveImg")
        .stop()
        .show()
        .addClass("move")
        .css(cartOffset)  
        .animate(targetOffset, 1000, function() {
          $(this)
            .hide()
            .removeClass("move");
        }),
        // 测试  增加数据
        // this.$route.commit("increment",68);
        // 直接修改购物车商品数据
        this.$store.commit("addGoods", {
          goodId: this.productId,
          goodNum: this.num1
        });
    }
  },
  // 生命周期函数
  created() {
    //   调用获取数据的函数
    this.getproductDetail();
    // 获取评论
    this.getComments();
  },
  //   观察数据的改变
  watch: {
    $route(val, oldVal) {
      //   console.log("val");
      //    console.log("oldVal");
      //    console.log("哈哈哈");
      //   数组长度为0    直接销毁
      this.images.normal_size = [];
      // 重新吊接口 取数据
      //   回调函数调用   重新赋值再次生成
      this.getproductDetail();
    }
  }
};
</script>
<style lang="less">
.tab-content img {
  width: 100%;
  display: block;
}
/* iview的回到顶部 */
.top {
  padding: 10px;
  background: rgba(0, 153, 229, 0.7);
  color: #fff;
  text-align: center;
  border-radius: 2px;
}
/* 放大镜相关样式 */
.pic-box {
  width: 395px;
  .control-box .thumb-list {
    display: flex;
    justify-content: center;
    img {
      width: 80px;
      height: 80px;
      margin: 2px;
    }
  }
  .control {
    //   text-align:center;
    display: flex;
    // 主轴
    justify-content: center;
    // 纵轴 副轴 侧轴
    align-items: center;
  }
}
// 移动图片的样式
.moveImg {
  position: absolute;
  width: 50px;
  //   display: none;
  // top:0;
  // left:0;
}
.moveImg.move {
  transition: transform 1s, opacity 1s;
  opacity: 0.5;
  transform: scale(0.2) rotate(7200deg);
}
</style>
