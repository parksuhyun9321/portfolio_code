<template>
<Header :data="data" :login="login" />
    <section id="myPage">
        <h2 class="hidden">페이지</h2>
        <article class="contents_head">
            <h2 class="hidden">{{data[$route.params.no].myInfo.profile.userName}} 의 페이지</h2>
            <div class="img_box">
                <img @click="profileImg" v-if="this.data[this.$route.params.no].myInfo.profile.img" :src="data[$route.params.no].myInfo.profile.img" :alt="data[$route.params.no].myInfo.profile.userName + ' ' + data[$route.params.no].myInfo.profile.birthday">
                <img @click="profileImg" v-else src="../../assets/img/no_image.svg" alt="이미지없음">
            </div>
            <div class="resume">
                <h3>
                    {{data[$route.params.no].myInfo.profile.userName}} 
                    <span>({{data[$route.params.no].myInfo.profile.birthday}})</span>
                    <button v-if="login != 0" class="btn_add" @click="emitter.emit('resumeUpload','resume')">이력추가</button>
                </h3>
                <p v-for="i in data[$route.params.no].myInfo.resume" :key="i">
                    {{i.title}}
                    <span>{{i.period}}</span>
                    <button v-if="login != 0" class="btn_delete" @click="resumeDelete">
                        <span></span>
                        <span></span>
                    </button>
                </p>
                <p v-if="data[$route.params.no].myInfo.resume.length == 0">등록된 이력이 없습니다.</p>
            </div>
        </article>
        <article class="contents_main">
            <h2 class="hidden">메인 콘텐츠</h2>
            <ul class="tab_list" @click="moveTab">
                <li><button>SKILL</button></li>
                <li><button>PORTFOLIO</button></li>
            </ul>
            <div class="skill chapter">
                <h3>SKILL<button v-if="this.login != 0" class="btn_add" @click="emitter.emit('skillUpload','skill')">스킬추가</button></h3>
                <p v-if="data[$route.params.no].skill.length == 0" class="txt_none">등록된 스킬이 없습니다.</p>
                <ul class="skill_list">
                    <li v-for="(a,i) in data[$route.params.no].skill" :key="a">
                        <h2 class="hidden">{{a.alt}}</h2>
                        <button @click="skillTab" :class="{'on':i==0} " class="btn_info" :value="a.src">{{a.name}}</button>
                        <button v-if="login != 0" class="btn_delete" @click="skillDelete">
                            <span></span><span></span>
                        </button>
                    </li>
                </ul>
                <div class="skill_view" v-if="data[$route.params.no].skill.length != 0">
                    <img :src="data[$route.params.no].skill[0].src" :alt="data[$route.params.no].skill[0].alt" />
                    <p>{{data[$route.params.no].skill[0].alt}}</p>
                </div>
                
            </div>
            <div class="portfolio chapter">
                <h3>PORTFOLIO<button v-if="this.login != 0" class="btn_add" @click="$router.push('/upload/portfolio')">포트폴리오추가</button></h3>
                <ul class="portfolio_list" v-if=" portfolioState == true">
                    <li v-for="i in data[$route.params.no].portfolio" :key="i">
                        <div class="img_box">
                            <img :src="i.portfolioImg" alt="">
                        </div>
                        <dl class="info_box">
                            <dt>{{i.title}}</dt>
                            <dd>
                                <span v-for="a in i.kind" :key="a">{{a}}</span>
                            </dd>
                            <dd>기여도 : {{i.percent}}%</dd>
                            <dd>기간 : {{i.period}}</dd>
                            <dd>
                                <span v-for="a in i.use" :key="a">#{{a}}</span>
                            </dd>
                            <dd>
                                <a class="btn_link" target="_blank" :href="i.link">LINK VIEW</a>
                            </dd>
                        </dl>
                        <button v-if="login != 0" @click="portfolioDelete" class="btn_delete">
                            <span></span><span></span>
                        </button>
                    </li>
                </ul>
                <p v-else class="txt_none">등록된 포트폴리오가 없습니다.</p>
            </div>
        </article>
    </section>
    <footer id="footer">
        <p class="copy">ⓒ copyright 2022 clapPortfolio All rights reserved.</p>
    </footer>
</template>

<script>
import Header from "../header.vue"
export default {
    name: "myPage",
    data(){
        return {
            skillState:"",
            portfolioState:"",
            resumeState:"",
        }
    },
    components:{
        Header
    },
    props: {
        data: Array,
        login:Number,
    },
    methods:{
        smoothScroll(a) {
            const targetPosition = a;
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            const duration = 750;
            let start = null;

            window.requestAnimationFrame(step);

            function step(timestamp) {
                if (!start) start = timestamp;
                const progress = timestamp - start;
                window.scrollTo(0, easeInOutCubic(progress, startPosition, distance, duration));
                if (progress < duration) window.requestAnimationFrame(step);
            }
            function easeInOutCubic(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return (c / 2) * t * t * t + b;
            t -= 2;
            return (c / 2) * (t * t * t + 2) + b;
            }
        },
        skillTab(e){
                document.querySelector(".skill_view img").src = e.currentTarget.value;
                document.querySelector(".skill_view p").textContent = e.currentTarget.previousElementSibling.textContent;
                document.querySelectorAll(".skill_list li button").forEach(el=> {
                    el.classList.remove("on")
                });
                e.currentTarget.classList.add("on");

        },
        skillDelete(){
            let val = document.querySelector(".img_box").title;
            this.emitter.emit("skillDelete",val);
        },
        resumeDelete(e){
            let val = e.currentTarget.parentNode.children[0].textContent;
            this.emitter.emit('resumeDelete',val)
        },
        portfolioDelete(e){
            let val = e.currentTarget.previousElementSibling.children[0].textContent;
            this.emitter.emit('portfolioDelete',val) 
        },
        moveTab(e){
            if(e.target.tagName == "BUTTON"){
                if(e.target.textContent == "SKILL"){
                    this.smoothScroll(document.querySelector(".chapter.skill").getBoundingClientRect().top);
                } else {
                    this.smoothScroll(document.querySelector(".chapter.portfolio").getBoundingClientRect().top);
                }
            }
        },
    },
    created(){
        if(this.data[this.$route.params.no].skill.length > 0){
            this.skillState=true;
        } else {
            this.skillState=false;
        }

        if(this.data[this.$route.params.no].portfolio.length > 0){
            this.portfolioState=true;
        } else {
            this.portfolioState=false;
        }
    },
};
</script>

<style>
#myPage {width: 1000px; margin: 0 auto;}
#myPage .contents_head {display: flex; justify-content: space-around; align-items: center; width: 100%; margin: 20px 0; }
#myPage .contents_head .resume h3 {position: relative; display: block; margin-bottom: 30px; font-size: 2.6rem;}
#myPage .contents_head .resume h3 span {font-size: 1.4rem;}
#myPage .contents_head .resume h3 .btn_add {position: absolute;top: -20px;right: -40px;color: #000;font-size: 1.4rem;font-family: 'sub'}
#myPage .contents_head .resume h3 .btn_add:after {content: '+'; position: absolute; top: -14px; right: -10px; font-size: 2rem;}
#myPage .contents_head .resume p {position: relative; padding-left: 10px; font-size: 1.8rem;}
#myPage .contents_head .resume p:nth-child(n+2) {margin-top: 10px;}
#myPage .contents_head .resume p:before {content: ''; position: absolute; top: 50%; left: 0; transform: translateY(-50%); display: block; width: 4px; height: 4px; background-color: #000;}
#myPage .contents_head .resume p > span {font-size: 1.2rem;}
#myPage .contents_head .resume p .btn_delete {top: 50%; right: -25px; transform: translateY(-50%);}
#myPage .contents_head .img_box img {width: 200px;  border-radius: 100%;}
#myPage .contents_head .btn_back {position: absolute; top: 15px; left: 15px;}
#myPage .contents_head .btn_back img{ width: 35px;}
#myPage .contents_main {width: 100%;}

#myPage .contents_main .tab_list {display: flex; justify-content: center; margin: 50px 0; font-size: 2.2rem; border-top: 1px solid #000;}
#myPage .contents_main .tab_list li:nth-child(n+2) {position: relative; margin-left: 50px;}
#myPage .contents_main .tab_list li:nth-child(n+2):before{content: ''; position: absolute; top: 50%; left: -25px; transform: translateY(-50%); display: block; width: 2px; height: 20px; background-color: #000;}
#myPage .contents_main .tab_list li button {display: block; padding: 10px 5px;}

#myPage .chapter > h3 {position: relative; color: #fff;font-size: 5rem;font-family: "main";text-shadow: -1px 0 #000, 0 1px #000, 1px 0 #000, 0 -1px #000;}
#myPage .chapter > h3 .btn_add {position: absolute; top: -20px; right: 0; color: #000; font-size: 1.4rem; font-family: 'sub';}
#myPage .chapter > h3 .btn_add:after {content: '+'; position: absolute; top: -14px; right: -10px; font-size: 2rem;}

#myPage .skill {position: relative; min-height: 500px;}
#myPage .skill .skill_list { display: flex; justify-content: center; flex-wrap: wrap; line-height: 3.5; font-size: 2rem; }
#myPage .skill .skill_list li {position: relative;}
#myPage .skill .skill_list li:nth-child(n + 2) { margin-left: 20px; }
#myPage .skill .skill_list li .btn_info { display: inline-block; padding: 10px 20px; background-color: #fff; box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.6); border-radius: 100px; }
#myPage .skill .skill_list li .btn_info.on { background-color: #000; color: #fff; }
#myPage .skill .skill_list li .btn_delete {top: 8px;}
#myPage .skill .skill_view { position: relative; display: flex; justify-content: space-around; align-items: center; width: 100%; height: 400px; margin: 70px auto 0; font-size: 3rem; }
#myPage .skill .skill_view img { position: relative; width: 250px; }
#myPage .skill .skill_view p { position: relative; width: 400px; line-height: 1.4; word-break: keep-all;}

#myPage .portfolio {position: relative; min-height: 350px;}
#myPage .portfolio_list {height: 100%;}
#myPage .portfolio_list li {position: relative; display: flex; align-items: center;}
#myPage .portfolio_list li:nth-child(even) {flex-direction: row-reverse;}
#myPage .portfolio_list li:nth-child(odd) .info_box {margin-left: 40px;}
#myPage .portfolio_list li:nth-child(even) .info_box {margin-right: 40px;}
#myPage .portfolio_list li:nth-child(n+2){margin-top: 50px;}
#myPage .portfolio_list li .img_box img {width: 500px;}
#myPage .portfolio_list li .info_box dt {line-height: 1.4; font-size: 2.6rem;font-weight: 700; word-break: keep-all;}
#myPage .portfolio_list li .info_box dd {font-size: 2rem;}
#myPage .portfolio_list li .info_box dd:nth-child(n+2){margin-top: 20px;}
#myPage .portfolio_list li .info_box dd span{line-height: 1.4; margin-right: 15px;}
#myPage .portfolio_list li .info_box dd .btn_link{display: inline-block; padding: 10px 20px; border: 2px solid #000;}


#myPage .txt_none {position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); font-size: 3rem;}

#footer {position: relative; display: flex; justify-content: center; align-items: center; width:100%; height: 80px; margin-top:150px; font-size: 2rem; border: 1px solid #000; border-bottom: none; border-radius: 10px;}

#mypage .btn_delete {background-color: #000 !important;}
@media all and (max-width:1030px){
    #myPage {width: 90%;}
    #myPage .contents_head .img_box img {width:150px}
    #myPage .contents_head .resume h3 {font-size:2rem;}
    #myPage .contents_head .resume p {font-size: 1.4rem;}


    #myPage .chapter > h3 {margin-bottom: 20px; font-size:4rem; }

    #myPage .skill {min-height: 600px;}
    #myPage .skill .skill_list {font-size:1.4rem}

    #myPage .skill .skill_view {display: block; height: 200px; text-align: center; font-size: 2rem;}
    #myPage .skill .skill_view p {width:auto; margin-top: 20px;}
    #myPage .skill .skill_view img {width: 150px;}

    #myPage .portfolio_list li {flex-direction: column; justify-content: center; text-align: center; }
    
    #myPage .portfolio_list li:nth-child(n+2){margin-top: 45px;}
    #myPage .portfolio_list li:nth-child(odd) .info_box {margin: 0;}
    #myPage .portfolio_list li:nth-child(even) {flex-direction: column;}
    #myPage .portfolio_list li:nth-child(even) .info_box {margin: 0;}

    #myPage .portfolio_list li .info_box {margin-top: 20px !important;}
    #myPage .portfolio_list li .info_box dd:nth-child(n+2) {margin-top: 10px;}
    #myPage .portfolio_list li .info_box dd span{line-height: 1.5;}

    #myPage .txt_none {font-size:1.8rem}
}

@media all and (max-width:700px){
    #myPage .contents_head {flex-direction: column;}
    #myPage .contents_head .resume {margin-top: 25px; text-align: center;}
    #myPage .contents_head .resume p:before {display: none;}
    #myPage .contents_head .resume p > span {display: block; margin-top: 5px;}

    #myPage .txt_none {font-size:1.4rem}
    #footer {font-size: 1.6rem;}
}

@media all and (max-width:560px){
    #myPage .portfolio_list li .img_box img {width:90%}
    #myPage .portfolio_list li .info_box dt {font-size: 2rem;}
    #myPage .portfolio_list li .info_box dd {font-size: 1.4rem;}

    #footer {font-size: 1.4rem;}
}

@media all and (max-width:499px){
    #myPage .txt_none {font-size:3vw}
    #footer {font-size: 3vw;}
}
</style>
