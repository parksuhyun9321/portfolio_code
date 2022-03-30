<template>
        <aside class="my_info">
            <div class="head">
                <img v-if="data[login].myInfo.profile.img" :src="data[login].myInfo.profile.img" :alt="data[login].myInfo.profile.userName">
                <img v-else src="../../assets/img/no_image.svg" alt="이미지 설정 안함">
                <h3>
                    <strong>{{data[login].myInfo.profile.userName}}</strong>
                    {{data[login].myInfo.profile.birthday}}
                </h3>
                <Util :login="login"/>    
            </div>
            <div class="resume">
                <h3>이력 <button v-if="login != 0" @click="resumeUpload" class="btn_add">이력추가</button> </h3>
                <ul v-if="data[login].myInfo.resume.length == 0" class="resume_list">
                    <li class="resume_none">등록된 이력이 없습니다.</li>
                </ul>
                <ul class="resume_list" v-else>
                    <li v-for="i in data[login].myInfo.resume" :key="i">
                        <span>{{i.title}}</span>
                        <span class="period">{{i.period}}</span>
                        <button v-if="login != 0" @click="resumeDelete" class="btn_delete">
                            <span></span>
                            <span></span>
                        </button>
                    </li>
                </ul>
            </div>
        </aside> 
</template>

<script>
import Util from "../util.vue"
export default {
    name:"my_info",
    components:{
        Util
    },
    props:{
        login:Number,
        data:Array,
    },
    methods:{
        resumeUpload(){
            this.emitter.emit('resumeUpload',"resume");
            this.utilState = "hide";
        },
        resumeDelete(e){
            this.utilState = "hide";
            let val = e.currentTarget.parentNode.children[0].textContent;
            this.emitter.emit('resumeDelete',val)
        }
    },
    mounted(){
      this.emitter.on("skillUpload",(b)=>{
          if(b=="skill"){
              this.utilState="hide"
          }
      });        
    }
}
</script>

<style scoped>
.my_info {position: relative; display: block; width: 350px; height: 310px; padding: 15px 20px 10px; border: 1px solid #000; border-radius: 10px; }

.my_info .head { display: flex; align-items: center; }

.my_info .head > img { width: 70px; height: 70px; border-radius: 100%; }

.my_info .head h3 { line-height: 1.2; margin-left: 15px; font-size: 1.2rem; }

.my_info .head h3 strong { display: block; font-size: 1.6rem; }

.my_info .resume h3 {position: relative; display: block; margin: 20px 0; font-size: 1.6rem; color: #b1b0b0; }

.my_info .resume h3 .btn_add {position: absolute; top: 0; right: 0; color: #000; font-size: 1.2rem;}

.my_info .resume .resume_list {position: relative; height: 150px; overflow-y: scroll;}
.my_info .resume .resume_list::-webkit-scrollbar {width: 3px; background: none; border-radius: 10px;}
.my_info .resume .resume_list::-webkit-scrollbar-thumb {background: #000;}
.my_info .resume .resume_list li { position: relative; display: block; width: 100%; padding-left: 10px; line-height: 1.2; font-size: 1.4rem; }

.my_info .resume .resume_list li:before { content: ''; position: absolute; top: 8px; left: 0; display: block; width: 3px; height: 3px; margin-right: 5px; background-color: #000; }

.my_info .resume .resume_list li span.period { display: block; font-size: 1.1rem; }

.my_info .resume .resume_list li:nth-child(n+2) { margin-top: 10px; }

.my_info .resume .resume_list li.resume_none {position: absolute; top: 50%; transform: translateY(-50%); padding: 0; text-align: center;}
.my_info .resume .resume_list li.resume_none:before {display: none;}

.btn_delete {position: absolute; top: 50%; right: 0px; transform: translateY(-50%); width: 15px; height: 15px; background-color: #000; border-radius: 100%;}
.btn_delete span {position: absolute; top: 50%; left: 0; transform: translateY(-50%); display: block; width: 100%; height: 2px; background-color: #fff;}
.btn_delete span:first-child {transform: rotate(45deg);}
.btn_delete span:last-child {transform: rotate(-45deg);}

  @media all and (max-width:1030px){
   .my_info {display: none;}
}
</style>