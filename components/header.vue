<template>
  <header id="header">
    <h1 class="logo">
      <router-link to="/">
        <img src="../assets/img/logo.svg" alt="박수현의 포트폴리오스타그램">
      </router-link>
    </h1>
    <div class="header_profile">
      <button @click="mypageLink">
        <img v-if="data[login].myInfo.profile.img" :src="data[login].myInfo.profile.img" :alt="data[login].myInfo.profile.userName">
        <img v-else src="../assets/img/no_image.svg" alt="이미지 설정 안함">
      </button>
    </div>
    <Util :login="login"/>
  </header>  
</template>

<script>
import Util from "./util.vue"
export default {
    name:"app_header",
    data(){
      return {
        resizeBlock:false,
      }
    },
    components:{
      Util,
    },
    methods:{
      mypageLink(){
          this.$router.push(`/mypage/${this.login}`);
      }
    },
    props:{
      data:Array,
      login:Number,
    },
}
</script>

<style scoped>
#header {position: relative; display: flex; justify-content: space-between; align-items: center; width: 100%; height: 80px; margin: 0 auto 20px; padding: 0 20px; border: 1px solid #000; border-radius: 10px;}
#header .logo {flex: 1;}
#header .logo a {display: inline-block;}
#header .logo a img {width: 300px;}

#header .header_profile {display: none;}
#header .header_profile button { width: 50px; height: 50px; border: 1px solid #000; border-radius: 100%;}
#header .header_profile button img {width: 100%; height: 100%;border-radius: 100%;}

#header .util {position: relative; top: 0; right: 0; display: none; margin-left: 20px;}

@media all and (max-width:1030px){
  #header .header_profile {display: block;}
  #header .util {display: block;}
}

@media all and (max-width:560px){
  #header .logo a img {width: 250px;}
}
 
@media all and (max-width:499px){
#header  {padding: 0 10px;}
#header .logo a img {width: 45vw;}
#header .header_profile button {width: 12vw; height: 12vw;}
#header .util {margin-left: 5vw;}
}
</style>