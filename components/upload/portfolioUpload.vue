<template>
  <section id="upload">
      <h2>PORTFOLIO UPLOAD</h2>
      <article class="upload_box">
          <h2 class="hidden"></h2>
          <ul class="input_list">
              <li>
                  <label for="">프로젝트 명</label>
                  <input type="text" id="portfolio_title">
              </li>
              <li>
                <ul class="chk_list">
                    <li>
                        <label for="a">PC WEB</label>
                        <input class="chk" type="checkbox" value="PC WEB" id="a">
                    </li>
                    <li>
                        <label for="b">MOBILE WEB</label>
                        <input class="chk" type="checkbox" value="MOBILE WEB" id="b">
                    </li>
                    <li>
                        <label for="c">ANDROID APP</label>
                        <input class="chk" type="checkbox" value="ANDROID APP" id="c">
                    </li>
                    <li>
                        <label for="d">IOS APP</label>
                        <input class="chk" type="checkbox" value="IOS APP"  id="d">
                    </li>
                    <li>
                        <label for="e">RESPONSIVE</label>
                        <input class="chk" type="checkbox" value="RESPONSIVE" id="e">
                    </li>
                    <li>
                        <label for="g">NATIVE APP</label>
                        <input class="chk" type="checkbox" value="NATIVE APP" id="g">
                    </li>
                    <li>
                        <label for="f">HYBRID APP</label>
                        <input class="chk" type="checkbox" value="HYBRID APP" id="f">
                    </li>
                </ul>
              </li>
              <li>
                <label for="percent">기여도</label>
                <input maxlength="2" @input="maxLengthCheck" type="number" id="percent">%   
              </li>
              <li>
                <label for="period">기간</label>
                <input type="text" id="period"> 
              </li>
              <li>
                <label for="link">링크주소</label>
                <input type="text" id="link" value="https://"> 
              </li>
              <li class="use_box">
                <label for="use">사용 언어</label>
                <input type="text" id="use">
                <button class="btn_use" @click="useAdd">추가</button>
                <ul class="use_list">
                    <li class="use_item" v-for="i in use" :key="i">
                        {{i}} 
                        <button @click="useDelete" class="btn_delete">
                            <span></span>
                            <span></span>
                        </button>
                    </li>
                </ul>
              </li>
              <li class="img_contents">
                  <div class="img_box">
                      <img src="../../assets/img/no_image.svg" alt="이미지 없음" class="portfolio_img">
                      <button class="img_delete btn_delete" @click="imgDelete">
                          <span></span>
                          <span></span>
                      </button>
                  </div>
                  <label for="img_input">이미지 업로드</label>
                  <p class="upload_value">선택된 이미지 없음</p>
                  <input @change="imgUpload" type="file" id="img_input" class="hidden">
              </li>
          </ul>
          <button @click="upload" class="btn_upload">UPLOAD</button>
          <button class="btn_back" @click="back">
              <img src="../../assets/img/btn_back.svg" alt="뒤로가기">
          </button>
      </article>
  </section>
  <div v-if="bg=='on'" class="bg">
    <Popup @popupClose="popup='close'; alert=false; bg='off'" :popupTxt="popupTxt" />
  </div>
</template>

<script>
import Popup from "./popup.vue"
export default {
    name:"upload_page",
    data(){
        return {
            kind:[],
            use:[],
            bg:"off",
            popupTxt:""
        }
    },
    props:{
        data:Array,
        login:Number
    },
    components:{
        Popup,
    },
    methods:{
        maxLengthCheck(e) {
            if (e.target.value.length > e.target.maxLength) {
                e.target.value = e.target.value.slice(0, e.target.maxLength);
            }
        },
        useAdd(){
            if(document.getElementById("use").value == ""){
                alert("입력안함");
                return false;
            }
            this.use.push(document.getElementById("use").value);
            document.getElementById("use").focus();
            document.getElementById("use").value="";
        },
        useDelete(e){
            // let arr = this.use;
            let val = e.currentTarget.parentNode.textContent.trim();
            for(let i=0;this.use.length;i++){
                if(this.use[i] === val){
                    this.use.splice(i,1);
                    i--;
                    break;
                }
            }
            
        },
        imgUpload(e){
            let i = URL.createObjectURL(e.target.files[0]);
            document.querySelector(".portfolio_img").src=i;
            document.querySelector(".upload_value").textContent=i;
            document.querySelector(".portfolio_img").alt="";
            document.querySelector(".img_contents .img_box .btn_delete").style.display="block";
        },
        imgDelete(){
            document.querySelector(".portfolio_img").src=require("../../assets/img/no_image.svg");
            document.querySelector(".portfolio_img").alt="이미지 없음";
            document.querySelector(".upload_value").textContent="선택된 이미지 없음";
            document.querySelector(".img_contents .img_box .btn_delete").style.display="none";
        },
        upload(){
            let data = this.data[this.login];
            let obj = {};

            obj.portfolioImg = document.querySelector(".portfolio_img").src;
            obj.title = document.getElementById("portfolio_title").value;
            obj.kind = this.kind;
            obj.percent = document.getElementById("percent").value;
            obj.period = document.getElementById("period").value;
            obj.use = this.use;
            obj.link = document.getElementById("link").value;

            if(!document.getElementById("portfolio_title").value || this.kind.length == 0 || !document.getElementById("percent").value || !document.getElementById("period").value || document.getElementById("link").value == "https://" || document.querySelectorAll(".chk").forEach(el=>{console.log(el.checked == false)})){
                this.bg="on";
                this.popupTxt="모든 항목을 작성, 체크 해주세요"
                return false;
            }

            data.portfolio.push(obj);
            this.$router.go(-1);
        },
        back(){
            this.$router.go(-1);
        }
    },
    mounted(){
        document.getElementById("portfolio_title").value="";
        document.querySelectorAll(".chk").forEach(el=>{
            el.checked=false;
            el.previousElementSibling.classList.remove("on");
        });
        let arr_kind = this.kind;
        document.querySelectorAll(".chk").forEach(el=>{
            el.addEventListener("change",function(){
                if(this.checked == true){
                    this.previousElementSibling.classList.add("on");
                    arr_kind.push(this.value + " ")
                } else {
                    for(let i=0;i < arr_kind.length;i++){
                        if(arr_kind[i] === this.value){
                            arr_kind.splice(i,1);
                            i--;
                        }
                    }
                    this.previousElementSibling.classList.remove("on");
                }
            });
        });
    },
}
</script>

<style>
#upload {position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); width: 450px;  }
#upload h2 {display: block; margin-bottom: 20px; text-align: center; font-size: 3rem; font-weight: 700;}

.upload_box {position: relative; display: block; width: 100%; height:420px; padding: 20px 0; text-align: center; border: 1px solid #000; overflow-y: scroll;}
.upload_box::-webkit-scrollbar {display: none;}

#upload .input_list {width: 90%; margin: 0 auto; text-align: left;}
.input_list > li {width:100%; font-size: 1.8rem;}
.input_list > li:nth-child(n+2) {margin-top: 20px;}
.input_list > li > label {display: block; margin-bottom: 10px;}
.input_list li input[type=text],input[type=number] {display: block; padding: 5px; font-size: 1.6rem; border: 1px solid #000;}
input[type=number] {display: inline-block; width: 50px;}
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

.chk_list {display: flex; flex-wrap: wrap; }
.chk_list li {display: flex; align-items: center; width:33.33%; line-height: 2; font-size: 1.4rem;}
.chk_list li label.on {color: rgb(16, 165, 235);}

.use_box {display: flex; flex-wrap: wrap;}
.use_box label {width: 100%;}
.use_box .btn_use {display: inline-block; margin-left: 10px; padding: 0 15px; border: 1px solid #000;}
.use_box .use_list {display: flex; flex-wrap: wrap; width: 100%; margin-top: 10px;}
.use_box .use_list .use_item {position: relative; width: auto; margin: 5px; padding: 10px 20px; border: 1px solid #000; border-radius: 100px; }

.img_contents .img_box {position: relative; width: 100%; height: 200px; border: 1px solid #000;}
#upload .img_contents .img_box .btn_delete {display: none;}
.img_contents .img_box img {width: 100%; height: 100%;}

.img_contents label {display: inline-block !important; margin: 10px 0; padding: 5px 10px; border: 1px solid #000;}
.img_contents .upload_value {width: 100%; font-size: 1rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;}

.btn_upload {display: inline-block; margin-top: 20px; padding: 10px 30px; color: #fff; font-size: 2rem; background-color: #000;}

#upload .btn_back {position: absolute; top: 15px; right: 15px;}
#upload .btn_back img{ width: 35px;}

.btn_delete {position: absolute; top: 0px; right: 0px; transform: translateY(-50%); width: 15px; height: 15px; background-color: #000; border-radius: 100%;}
.btn_delete span {position: absolute; top: 50%; left: 0; transform: translateY(-50%); display: block; width: 100%; height: 2px; background-color: #fff;}
.btn_delete span:first-child {transform: rotate(45deg);}
.btn_delete span:last-child {transform: rotate(-45deg);}

@media all and (max-width:499px){
    #upload {width: 90%;}
    #upload .chk_list li {font-size: 2.8vw;}
}
</style>