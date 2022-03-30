<template>
  <section id="session">
      <h2>CLAPPORTFOLIO</h2>
    <article v-if="state=='login'" class="login_box">
      <h2 class="hidden">로그인</h2>
      <div class="input_box">
          <h3>로그인</h3>
          <ul class="input_list">
            <li>
                <label for="login_id">ID</label>
                <input type="email" id="login_id" placeholder="아이디를 입력해주세요.">
            </li>
            <li>
                <label for="login_pw">PW</label>
                <input type="password" id="login_pw" placeholder="비밀번호">
            </li>
            <li>
                <button @click="login" class="btn_login">LOGIN</button>
            </li>
          </ul>
      </div>
    </article>
    <article v-if="state=='idSearch'">
      <h2 class="hidden">아이디 찾기</h2>
      <div class="input_box">
      <h3>아이디 찾기</h3>
        <ul class="input_list">
            <li>
                <label for="search_name">NAME</label>
                <input type="text" id="search_name" placeholder="이름을 입력해주세요">
            </li>
            <li>
                <button @click="idSearch">SEARCH</button>
            </li>
        </ul>              
      </div>      
    </article>
    <article v-if="state=='pwSearch'">
      <h2 class="hidden">비밀번호 찾기</h2>
      <div class="input_box">
        <h3>비밀번호 찾기</h3>
        <ul class="input_list">
            <li>
                <label for="search_id">ID</label>
                <input type="text" id="search_id" placeholder="아이디를 입력해주세요.">
            </li>
            <li>
                <button @click="pwSearch">SEARCH</button>
            </li>
        </ul>              
      </div>          
    </article>
    <article v-if="state=='join'" class="join_box">
      <h2 class="hidden">회원가입</h2>
      <div class="input_box">
          <h3>회원가입</h3>
          <ul class="input_list">
            <li>
                <label for="join_name">NAME</label>
                <input type="email" id="join_name" placeholder="사용할 이름을 입력해주세요.">
            </li>
            <li>
                <label for="join_year">BIRTH</label>
                <ul class="select_list">
                    <li>
                        <input type="hidden" id="join_year" class="select">
                        <select @change="select" class="select_box select_year">
                            <option selected disabled>년도</option>
                        </select>
                    </li>
                    <li>
                        <input type="hidden" id="join_month" class="select">
                        <select @change="select" class="select_box select_month">
                            <option selected disabled>월</option>
                        </select>
                    </li>
                    <li>
                        <input type="hidden" id="join_day" class="select">
                        <select @change="select" class="select_box select_days">
                            <option selected disabled>일</option>
                        </select>
                    </li>
                </ul>
            </li>
            <li>
                <label for="join_id">ID</label>
                <input type="email" id="join_id" placeholder="사용할 아이디를 입력해주세요.">
            </li>
            <li>
                <label for="join_pw">PW</label>
                <input type="password" id="join_pw" placeholder=" 사용할 비밀번호 를 입력해주세요.">
            </li>
            <li>
                <label for="join_pwCheck">PW CHECK</label>
                <input type="password" id="join_pwCheck" placeholder="비밀번호를 확인해 주세요.">
            </li>
            <li>
                <label for="join_img">PROFILE IMG</label>
                <div class="img_box">
                    <img src="../../assets/img/no_image.svg" alt="이미지 없음">
                    <button @click="imgDelete" class="img_delete btn_delete">
                        <span></span>
                        <span></span>
                    </button>
                </div>
                <input @change="imgUpload" type="file" id="join_img" placeholder="사용할 아이디를 입력해주세요.">
            </li>
            <li>
                <button @click="join" class="btn_join">JOIN</button>
            </li>
          </ul>
      </div>   
    </article>
    <div class="util">
          <ul class="util_list">
              <li><button>아이디찾기</button></li>
              <li><button>비밀번호찾기</button></li>
              <li><button>회원가입</button></li>
          </ul>
    </div> 
      <button class="btn_back" @click="back">
          <img src="../../assets/img/btn_back.svg" alt="뒤로가기">
      </button>
  </section>
  <div v-show="bg=='on'" class="bg">
    <Modal @modalClose="modal='close'; alert=false; bg='off'" :state="state" :modalTxt="modalTxt" :result="result" :alert="alert" v-if="modal=='open'" />
  </div>
</template>
<script>
import Modal from "./popup.vue"

export default {
    name:"login_index",
    data(){
        return {
            state:"login",
            modal:"close",
            result:[],
            modalTxt:"",
            bg:"off",
            alert:false,
        }
    },
    methods:{
        select(e){
            e.currentTarget.previousElementSibling.value=e.target.value;
        },
        fillZero(txt) {
            let str = String(txt);
            if (str.length < 2) {
                str = "0" + str;
            }
            return str;
        },
        util(e){
            //article login : login_box join : join_box
            if(e.target.textContent == "아이디찾기"){
                this.state="idSearch";
            } else if(e.target.textContent == "비밀번호찾기"){
                this.state="pwSearch";
            } else if(e.target.textContent == "회원가입"){
                this.state="join";
                setTimeout(() => {
                    if(this.state == "join"){
                        let date = new Date();
                        let min_year = date.getFullYear()-20;
                        for(let i=0; i<50;i++){
                            let option = document.createElement("option");
                            option.setAttribute("value", min_year - i)
                            option.textContent=min_year - i;
                            document.querySelector(".select_year").append(option)
                        }
                        for(let i=0;i<12;i++){
                            let option = document.createElement("option");
                            option.setAttribute("value",this.fillZero(i+1))
                            option.textContent=this.fillZero(i+1);
                            document.querySelector(".select_month").append(option)
                        }

                        for(let i=0;i<31;i++){
                            let option = document.createElement("option");
                            option.setAttribute("value",this.fillZero(i+1))
                            option.textContent=this.fillZero(i+1);
                            document.querySelector(".select_days").append(option)
                        }   
                    }    
                    document.getElementById("join_id").value = '';
                    document.getElementById("join_pw").value = '';
                    document.getElementById("join_pwCheck").value = '';
                    document.querySelector(".img_box img").src = require("../../assets/img/no_image.svg");               
                },0);
            }
        },
        login(){ // 로그인 함수
            let input_id = document.getElementById("login_id").value;
            let input_pw = new String(document.getElementById("login_pw").value);
            
            let user = this.data.find(el => el.id == input_id && el.pw == input_pw);
            if(user){
                this.$emit("loginNo",user.no-1);
                this.$router.push(`/`);// 메인페이지로 이동
                this.emitter.emit('headerBlock')
            }else {
                this.modal="open";
                this.bg="on";
                this.alert=true;
                this.modalTxt = "아이디 또는 비밀번호를 확인해주세요.";
            }
        },
        idSearch(){
            let input_name = document.getElementById("search_name").value;
            let user = this.data.filter(el => el.myInfo.profile.userName == input_name);
            this.modal="open";
            this.bg="on";
            if(input_name){
                if(user){
                    this.result = user;
                    this.modalTxt = "개의 아이디 를 찾았습니다.";
                    
                } else {
                    this.result="";
                }
            } else {
                this.alert=true;
                this.modalTxt = "이름을 입력해주세요.";
            }
        },
        pwSearch(){
            let input_id = document.getElementById("search_id").value;
            let user = this.data.find(el => el.id == input_id);
            this.modal="open";
            this.bg="on";
            if(input_id){
                if(user){
                    this.result = user.pw;
                    this.modalTxt = "해당 비밀번호로 로그인을 해주세요.";
                    
                } else {
                    this.result="";
                } 
            } else {
                this.alert=true;
                this.modalTxt = "아이디를 입력해주세요.";
                this.bg="on";   
            }     
        },    
        imgUpload(e){
            let i = URL.createObjectURL(e.target.files[0]);
            document.querySelector(".img_box img").src=i;
            document.querySelector(".img_box .btn_delete").style.display="block";
        },
        imgDelete(e){
            document.querySelector(".img_box img").src=require("../../assets/img/no_image.svg");
            document.querySelector(".img_box img").alt="이미지 없음";
            document.getElementById("join_img").value='';
            e.currentTarget.style.display="none";
        },
        pwCheck(){

        },
        join(){
            let join_name = document.getElementById("join_name").value;
            let join_year = document.getElementById("join_year").value;
            let join_month = document.getElementById("join_month").value;
            let join_day = document.getElementById("join_day").value;
            let join_id = document.getElementById("join_id").value;
            let join_pw = document.getElementById("join_pw").value;
            let join_pwCheck = document.getElementById("join_pwCheck").value;
            let pw_error_check = /([a-zA-Z]+[!,@,#,$,%,^,&,*,?,_,~]+).*|([!,@,#,$,%,^,&,*,?,_,~]+[a-zA-Z]+).*|([0-9]+[a-zA-Z]+).*|([a-zA-Z]+[0-9]+).*|([!,@,#,$,%,^,&,*,?,_,~]+[0-9]+).*|([0-9]+[!,@,#,$,%,^,&,*,?,_,~]+).*/;
            let id_error_check = /^[a-z]+[a-z0-9]{5,19}$/g;
            let join_img = document.querySelector(".img_box img").src;
            let id_repetition_chk = this.data.find(el => el.id == join_id);
            this.modal="open";
            this.bg="on";
            this.alert=true;
            if(join_name == "" || join_year == "" || join_month == "" || join_day == "" || join_id == "" || join_pw == "" || join_pwCheck == "" || join_pw != join_pwCheck || join_pw.search(pw_error_check) || id_repetition_chk != undefined || join_id.search(id_error_check)){
                if(!join_name){
                    this.modalTxt = "이름을 입력 해주세요.";
                } else if(join_year == "" || join_month == "" || join_day == ""){
                    this.modalTxt = "생년월일을 선택 해주세요.";
                } else if(join_id == ""){
                    this.modalTxt = "아이디를 입력 해주세요.";
                } else if(join_pw == ""){
                    this.modalTxt = "비밀번호를 입력 해주세요.";
                } else if (join_pwCheck == "" || join_pw != join_pwCheck){
                    this.modalTxt = "비밀번호를 확인 해주세요.";
                } else if (join_pw.search(pw_error_check)){
                    this.modalTxt = "비밀번호는 영문,특수문자,숫자를 혼합 해주세요.";
                } else if (id_repetition_chk != undefined){
                    this.modalTxt = "사용중인 아이디 입니다.";
                } else if (join_id.search(id_error_check)){
                    this.modalTxt = "아이디는 영문으로 시작, 숫자를 포함해 6자에서 20자로 해주세요.";
                }
                return false;
            } else {
                    let temp = "회원가입이 완료 되었습니다.";
                    let obj = {
                        no:this.data.length+1,
                        id:join_id,
                        pw:join_pw,
                        myInfo:{
                            profile:{
                                userName:join_name,
                                birthday:`${join_year}.${this.fillZero(join_month)}.${this.fillZero(join_day)} ${new Date().getFullYear() - join_year + 1}세`,
                                img:join_img
                            }, 
                            resume:[]
                        },
                        skill:[],
                        portfolio:[]
                    };
                    this.$emit("upload",obj);
                    this.modalTxt = temp;
                    this.state="login";
                    document.getElementById("join_id").value = '';
                    document.getElementById("join_pw").value = '';
                    document.getElementById("join_pwCheck").value = '';
                    document.querySelector(".img_box img").src = require("../../assets/img/no_image.svg");
                }
        },
        back(){
            if(this.state == "login"){
                this.$router.go(-1);
                this.emitter.emit("headerBlock");
            } else {
                this.state = "login"
            }
        },
    },
    components:{
      Modal,
    },
    props:{
        data:Array
    },
    mounted(){
        document.querySelectorAll(".util_list button").forEach(el=>{
            el.addEventListener("click",this.util)
        });
    }
}
</script>

<style scoped>
    #session {position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); display: flex; flex-direction: column; justify-content: center; align-items: center; width: 450px; padding: 20px 0; border: 1px solid #000;}

    #session > h2 {position: absolute; top: -50px; left: 50%; transform: translateX(-50%); font-size: 3rem; font-weight: 700;}

    article {position: relative; }
    article {width: 100%;}
    article.join_box .input_box .input_list {height: 420px; overflow-y: scroll;}
    article.join_box .input_box .input_list::-webkit-scrollbar-thumb {background-color: #000;}
    article.join_box .input_box .input_list::-webkit-scrollbar {width: 5px; background: none;}

    article.join_box .input_box .input_list > li:nth-child(-n+5) label:after {content: '*';}
    
    .input_box {width: 100%;}
    .input_box h3{display: block; text-align: center; font-size: 2.8rem; font-weight: 700;}

    .input_list { margin: 30px 0 50px;}
    .input_list > li {width: 70%; margin: 0 auto;}
    .input_list > li:nth-child(n+2) {margin-top:25px;}
    .input_list > li label {display: inline-block; margin-bottom: 5px; font-size: 1.8rem;}
    .input_list > li input {display: block; width: 100%; padding: 10px; border: 1px solid #000;}
    .input_list > li .img_box {position: relative; display: block; width: 80px; height: 80px; margin: 5px 0; border: 1px solid #000;}
    .input_list > li .img_box {border: 1px solid #000;}
    .input_list > li .img_box img {width: 100%; height: 100%;}

    .input_list > li > button {width: 100%; margin-top: 30px; padding: 20px; text-align: center; font-size: 1.8rem; color: #fff; background-color: #000;}

    .select_list {display: flex; justify-content: space-between;}
    .select_list li {position: relative; width: 30%;}
    .select_list li select {width: 100%; padding: 10px 0; outline: none;}

    .util_list {display: flex; justify-content: center;}
    .util_list li:nth-child(n+2) {position: relative; margin-left: 30px;}
    .util_list li:nth-child(n+2):before {content: ''; position: absolute; top: 48%; left: -15px; transform: translateY(-50%);  display: block; width: 2px; height: 15px; background-color: #000;}

    .util_list li button {display: block; font-size: 1.4rem;}

    .btn_back {position: absolute; top: 15px; left: 15px;}
    .btn_back img{ width: 35px;}

    .bg {position: fixed; top: 0; left: 0; width: 100%; height: 100vh; background-color: rgba(0,0,0,0.8); z-index: 6;}

    .btn_delete {position: absolute; top: -5px; right: -5px; display: none; width: 15px; height: 15px; background-color: #000; border-radius: 100%;}
    .btn_delete span {position: absolute; top: 50%; left: 0; transform: translateY(-50%); display: block; width: 100%; height: 2px; background-color: #fff;}
    .btn_delete span:first-child {transform: rotate(45deg);}
    .btn_delete span:last-child {transform: rotate(-45deg);}   

    @media all and (max-width:499px){
        #session {width:90%;}
        #session > h2 {font-size: 8vw;}
        article.join_box .input_box .input_list {height: 50vh;}
        #session .util_list li button {font-size: 1.2rem;}

        .select_list {justify-content: space-around;}
    }
</style>