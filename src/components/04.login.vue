<template>
    <div>
  <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/login.html">会员登录</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit">
                        <a class="selected" href="javascript:;">账户登录</a>
                        <i>|</i>
                        <a href="/register.html">免费注册</a>
                    </div>

                    <div id="loginform" name="loginform" class="login-box">
                        <el-input v-model.trim="name" placeholder="用户名/手机/邮箱"></el-input>
                        <br>
                        <br>
                        <el-input v-model.trim="password" type="password" placeholder="输入登录密码"></el-input>
                         <br>
                        <br>
                        <div class="btn-box">
                            <input id="btnSubmit" name="btnSubmit" type="submit" @click="login" value="立即登录">
                        </div>
                    </div>
                </div>
            </div>
        </div>
</div>
</template>
<script>
// 导入axios要数据
import axios from "axios";
export default {
    name:"login",
    data:function(){
        return{
            name:'admin',
            password:'123'
        }
    },
    methods:{
        // 登录
        login(){
            // 设置进度条的颜色
            this.$Loading.config({
                color: '#5cb85c',
                failedColor: '#f0ad4e',
                height: 30
            });
            // 显示进度条
            this.$Loading.start();
            axios.post('http://47.106.148.205:8899/site/account/login',{
                user_name:this.name,
                password:this.password
            }).then(response=>{
                // console.log(response)
                if(response.data.status==0){
                    // 提交载荷/保存数据
                    this.$store.commit('changeLoginStatus',true);
                    // 跳转回来时页面
                    this.$router.push(this.$store.state.fromPath)
                }
                // 关闭进度条
                this.$Loading.finish()
            }).catch(response=>{
                this.$Loading.error();
            })
        }
    }
}

</script>
<style>
</style>
