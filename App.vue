<template>
    <div id="info_popup">
      <h3>알림</h3>
      <p>
        프론트엔드 만 개발된 포트폴리오용 웹앱입니다.
        <span>*새로고침을 하면 가입한 데이터가 삭제 됩니다.</span> 
      </p> 
      <ul class="txt_list">
        <li>로그인</li>
        <li>회원가입</li>
        <li>아이디 찾기</li>
        <li>비밀번호 찾기</li>
        <li>프로필 이미지 변경</li>
        <li>이력 추가</li>
        <li>스킬추가</li>
        <li>카톡 공유</li>
        <li>포트폴리오 추가</li>
      </ul> 
      <ul class="btn_list">
        <li><button class="today_hide">오늘 하루 보지 않기</button></li>
        <li><button class="close">닫기</button></li>
      </ul>
  </div>
  <router-view @upload="data.push($event)" @loginNo=" login = $event" :login="login" :data="data" />
    <transition v-if="upload != 'none'" name="upload_anim">
    <div id="sub_upload" @click="uploadClose">
        <div class="inner" :class="{'on':upload != 'none'}">
          <ResumeUpload v-if="upload == 'resume'" :data="data" :login="login"/>
          <SkillUpload v-if="upload == 'skill'" :data="data" :login="login"/>
          <ProfileImgChange v-if="upload == 'profileImgChange'" :data="data" :login="login" />
        </div>
    </div>
  </transition>
  <div v-if="bg=='on'" class="bg">
    <div class="popup">
        <h3>알림</h3>
        <p class="popup_txt">{{popupTxt}}</p>
        <button @click="bg='off'" class="btn_close">
            <span></span><span></span>
        </button>
    </div>
  </div>
</template>

<script>
import "./assets/css/reset.css";

import data from "./assets/data/data"

import ResumeUpload from "./components/upload/resumeUpload.vue"
import SkillUpload from "./components/upload/skillUpload.vue"
import ProfileImgChange from "./components/upload/profileImgChange.vue"

export default {
    name: "App",
    data(){
      return {
        login:0,
        data,
        upload:"none",
        headers:true,
        popupTxt:"",
        bg:"off"
      }
    },
    components:{
      ResumeUpload,
      SkillUpload,
      ProfileImgChange,
    },
    methods:{
      uploadClose(e){
        if(e.target.id == "sub_upload"){
         e.currentTarget.children[0].classList.remove("on");
          this.upload="none"
        }
      },
      dragElement(elmnt) {
                    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
                    elmnt.onmousedown = dragMouseDown;
                    function dragMouseDown(e) {
                        e = e || window.event;
                        e.preventDefault();
                        pos3 = e.clientX;
                        pos4 = e.clientY;
                        document.onmouseup = closeDragElement;
                        document.onmousemove = elementDrag;
                    }
                    function elementDrag(e) {
                        e = e || window.event;
                        e.preventDefault();
                        pos1 = pos3 - e.clientX;
                        pos2 = pos4 - e.clientY;
                        pos3 = e.clientX;
                        pos4 = e.clientY;
                        elmnt.style.top = elmnt.offsetTop - pos2 + "px";
                        elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
                    }
                    function closeDragElement() {
                        document.onmouseup = null;
                        document.onmousemove = null;
                    }
      }
    },
    mounted(){
      let date = new Date();
      let today = date.getDate();

      if (localStorage.getItem("cookie") != today) {
        localStorage.removeItem("cookie");
      }

      if(localStorage.getItem("cookie") != null){
        document.getElementById("info_popup").remove();
      } else {
        if(document.getElementById("info_popup") != null){
          this.dragElement(document.getElementById("info_popup"));
        }
        window.addEventListener("resize",function(){
          if(document.getElementById("info_popup") != null){
            if(window.innerWidth <= 750){
              document.getElementById("info_popup").classList.add("on");
            } else {
              document.getElementById("info_popup").classList.remove("on");
            }
          }
        })
      }

      document.querySelectorAll(".btn_list button").forEach(el => {
        el.addEventListener("click",function(){
          if(el.className == "today_hide"){
            localStorage.setItem("cookie",today);
            document.getElementById("info_popup").remove();
          } else {
            document.getElementById("info_popup").remove();
          }
        });
      });

      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);

      this.emitter.on("resumeUpload",(a)=>{
          this.upload=a;
      });
      this.emitter.on("skillUpload",(b)=>{
          this.upload=b;
      });
      this.emitter.on("change",(c)=>{
          this.upload=c;
      });
      this.emitter.on("uploadNone",(d)=>{
        this.upload=d
      });
      this.emitter.on('resumeDelete',(resumeTxt)=>{
        let resumeArr = this.data[this.login].myInfo.resume;
        let no = resumeArr.findIndex(el=>el.title == resumeTxt);
        resumeArr.splice(no,1)
      });
      this.emitter.on('skillDelete',(skillTxt)=>{
        let skillArr = this.data[this.login].skill;
        let no = skillArr.findIndex(el=>el.name == skillTxt);
        skillArr.splice(no,1)
      });
      this.emitter.on('portfolioDelete',(portfolioTxt)=>{
        let portfolioArr = this.data[this.login].portfolio;
        let no = portfolioArr.findIndex(el=>el.title == portfolioTxt);
        portfolioArr.splice(no,1)
      });
      this.emitter.on("imgChange",(val)=>{
        this.bg="off";
        this.data[this.login].myInfo.profile.img=val;
        this.upload="none"
      });
      this.emitter.on("resumeError",(txt)=>{
        this.bg="on";
        this.popupTxt=txt;
      });
      this.emitter.on("skillError",(txt)=>{
        this.bg="on";
        this.popupTxt=txt;
      })
    },
};
</script>
<style scoped>
  .popup { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); display: block; width: 350px; height: 200px; text-align: center; background-color: #fff; border: 1px solid #000; z-index: 9999;}
  .popup h3 {display: block; margin: 20px 0; font-size: 2.6rem;}
  .popup ul {line-height: 1.8; font-size: 1.6rem;}
  .popup_txt {line-height: 1.4; margin-top: 30px; font-size:2rem; word-break: keep-all;}

  #info_popup { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); display: block; width: 350px; padding: 20px 0; text-align: center; background-color: #fff; border: 1px solid #000; box-shadow: 3px 3px 3px 3px rgba(0,0,0,0.6); z-index: 9999;}
  #info_popup.on {top: 50% !important; left: 50% !important;}

  #info_popup h3 {display: block; margin-bottom: 20px; font-size: 2.6rem;}
  #info_popup p {display: block; margin-bottom: 20px; font-size: 1.4rem;}
  #info_popup p span {display: block; margin-top: 10px; font-size: 1.2rem; text-decoration: underline;}

  #info_popup .txt_list {display: inline-block; text-align: left; font-size: 1.2rem;}
  #info_popup .txt_list:before {content: '*사용 기능*'; display: inline-block; font-size: 1.6rem; } 
  #info_popup .txt_list li {margin-top: 5px;}

  #info_popup .btn_list {display: flex; justify-content: flex-end; margin-top: 30px; padding-right: 10px;}
  #info_popup .btn_list li:last-child {margin-left: 10px;}
  #info_popup .btn_list li button {display: inline-block; padding: 5px 10px; font-size: 1.4rem; border: 1px solid #000;}
</style>

<style>
@font-face { 
    font-family: "main";
    src: url("./assets/font/BlackHanSans-Regular.ttf");
  }
  
  @font-face {
    font-family: "sub";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-10-21@1.0/Jal_Onuel.woff") format("woff");
    font-weight: normal;
    font-style: normal;
  }
  
  #app {width: 1000px; height: 100vh; height: calc(var(--vh, 1vh) * 100); margin: 0 auto; padding-top: 20px;}
  
  body { font-family: "sub"; color: #000; overflow-x: hidden;}
  
  #sub_upload {position: fixed; top: 0; left: 0; width: 100%; height: 100vh; background-color: rgba(0,0,0,0.6); z-index: 9999;}
  #sub_upload .inner {position: absolute; bottom: -50%; left: 50%; transform: translateX(-50%); width:500px; background-color: #fff; border-radius: 10px 10px 0 0; transition: all 0.5s;}
  #sub_upload .inner.on {animation: inner 0.5s forwards;}
  
  .upload_anim-enter-from {opacity: 0;}
  .upload_anim-enter-active {transition:all 0.5s ;}
  .upload_anim-enter-to {opacity: 1;}
  
  .upload_anim-leave-from {opacity: 1;}
  .upload_anim-leave-active {transition:all 0.5s ;}
  .upload_anim-leave-to {opacity: 0;}
  
  @keyframes inner {
    0% {
      bottom:-50%;
    }
    100% {
      bottom: 0;
    }
  }
  
  /* 스킬 상세 모달창 */
  .modal {position: fixed; top: 0; left: 0; width: 100%; height: 100vh; background-color: rgba(0,0,0,0.6); z-index: 9999;}
  .modal .inner {position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); display: block; width: 500px; min-height: 500px; background-color: #fff; box-shadow: 3px 3px 3px rgba(0,0,0,.6); border-radius: 10px;}
  .modal .inner .img_box {display: flex; justify-content: center; align-items: center; width: 100%; height: 350px; border-bottom: 2px solid #000;}
  .modal .inner .img_box img {width: 90%; height: 80%;}
  .modal .inner {position: relative;}
  .modal .inner p {line-height: 1.4; padding: 20px; font-size: 2.2rem; word-break: break-all;}
  .modal .inner .btn_share {position: absolute; top: 10px; right: 10px; font-size: 1.6rem; z-index: 99;}
  
  .btn_close {position: absolute; top: 15px; left: 15px; display: block; width: 30px; height: 30px;}
  .btn_close span {position: absolute; top: 50%; left: 0; transform: translateY(-50%); width: 100%; height: 2px; background-color: #000;}
  .btn_close span:nth-child(1){transform: rotate(45deg);}
  .btn_close span:nth-child(2){transform: rotate(-45deg);}

  .bg {position: fixed; top: 0; left: 0; width: 100%; height: 100vh; background-color: rgba(0,0,0,0.8); z-index: 99999;}

  @media all and (max-width:1030px){
   #app {width: 90%;}
}
@media all and (max-width:560px){
  .modal .inner {width:90%;}
   #sub_upload .inner {width: 90%;}
}

@media all and (max-width:499px){
.modal .inner p {font-size: 4vw;}
.modal .inner .img_box img {height: 70%;}

}
</style>
