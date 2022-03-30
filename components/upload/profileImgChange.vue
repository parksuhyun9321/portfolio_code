<template>
  <ul class="profile_change_list">
      <li class="img_contents">
          <div class="img_box">
              <img class="change_img" :src="data[login].myInfo.profile.img" alt="">
              <button @click="img_delete" class="btn_delete">
                  <span></span>
                  <span></span>
              </button>
          </div>
          <label class="btn_img" for="img_change">이미지 변경</label>
          <input @change="img_change" type="file" id="img_change" class="hidden">
      </li>
       <li>
          <button @click="change_upload" class="btn_upload">등록</button>
      </li>
  </ul>
</template>

<script>
export default {
    name:"profile_img_change",
    props:{
        data:Array,
        login:Number
    },
    methods:{
        img_change(e){
            let i = URL.createObjectURL(e.target.files[0]);
            document.querySelector(".profile_change_list .img_box .change_img").src=i;
            document.querySelector(".profile_change_list .img_box .change_img").alt=i;
            document.querySelector(".profile_change_list .img_box .btn_delete").style.display="block";
        },
        img_delete(){
            document.querySelector(".profile_change_list .img_box .change_img").src=this.data[this.login].myInfo.profile.img;
            document.querySelector(".profile_change_list .img_box .btn_delete").style.display="none";
        },
        change_upload(){
            this.emitter.emit("imgChange",document.querySelector(".change_img").src)
        }
    }
}
</script>

<style scoped>
.profile_change_list {width: 80%; margin: 0 auto; padding: 20px 0; text-align: center;}
.profile_change_list .btn_img {display: inline-block; padding: 10px 20px; 
font-size: 1.4rem;}
.profile_change_list .btn_delete {display: none;}
</style>