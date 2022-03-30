<template>
    <article class="portfolio">
        <h2 class="hidden">포트폴리오 목록</h2>
        <ul class="portfolio_list">
            <li v-for="i in data[login].portfolio" :key="i">
                <div class="img_box">
                    <img :src="i.portfolioImg" alt="">
                </div>
                <dl class="info_box">
                    <dt>{{i.title}}</dt>
                    <dd>
                        <span v-for="a in i.kind" :key="a">{{a}} &nbsp;</span>
                    </dd>
                    <dd>기여도 : {{i.percent}}%</dd>
                    <dd>기간 : {{i.period}}</dd>
                    <dd>
                        <span v-for="a in i.use" :key="a">#{{a}} &nbsp;</span>
                    </dd>
                    <dd>
                        <a class="btn_link" target="_blink" :href="i.link">SITE VIEW</a>
                    </dd>
                </dl>
                <button v-if="login != 0" @click="portfolioDelete" class="btn_delete">
                    <span></span><span></span>
                </button>
            </li>
        </ul>
        <p class="portfolio_none" v-if="data[login].portfolio.length == 0">등록된 포트폴리오가 없습니다.</p>
        <button v-if="login != 0" @click="portfolioAdd" class="btn_add">포트폴리오 추가</button>
    </article>
</template>

<script>
export default {
    name: "portfolio_list",
    props:{
        data:Array,
        login:Number
    },
    methods:{
        portfolioAdd(){
            this.$router.push('/upload/portfolio');
        },
        portfolioDelete(e){
            let val = e.currentTarget.previousElementSibling.children[0].textContent;
            this.emitter.emit('portfolioDelete',val) 
        },
    },
    mounted(){
        if(this.data[this.login].portfolio.length == 0){
            document.querySelector(".portfolio_list").style.border="1px solid #000";
            document.querySelector(".portfolio_list").style.borderRadius="10px"
        }
    },
};
</script>

<style scoped>
.portfolio {position: relative;height: calc(100vh - 250px);}
.portfolio_none {position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); font-size: 1.4rem;}
.portfolio_list { width: 100%; height: 100%;  margin-top: 20px; padding-bottom: 20px; overflow-y: scroll;}
.portfolio_list::-webkit-scrollbar {width: 10px; background: none; }
.portfolio_list::-webkit-scrollbar-thumb {background: #000;border-radius: 100px;}

.portfolio_list li {position: relative; border: 1px solid #000; border-radius: 10px; }
.portfolio_list li:nth-child(n+2) {margin-top: 20px;}

.portfolio_list li .img_box {position: relative; width: 100%; height: 500px; overflow: hidden; border-bottom: 1px solid #000;border-radius: 10px 10px 0 0;}
.portfolio_list li .img_box img {position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); width: 90%; height: 90%;}

.portfolio_list li .main_box { position: relative; display: block; width: 100%; height: 500px; border-bottom: 1px solid #000; }

.portfolio_list li .info_box { display: block; padding: 30px 20px; }

.portfolio_list li .info_box dt { display: block; margin-bottom: 20px; font-size: 2.6rem; font-weight: 700; word-break: keep-all;}

.portfolio_list li .info_box dd { font-size: 1.8rem; }

.portfolio_list li .info_box dd:nth-child(n+3) { margin-top: 10px; }
.portfolio_list li .info_box dd .btn_link{display: inline-block; padding: 10px 20px; border: 1px solid #000;}

.portfolio_list li .btn_delete {top: 20px; right: 20px;}

.btn_add {position: absolute; top: -7px; right: 0px; display: inline-block; background-color: #fff; font-size: 1.4rem;}

@media all and (max-width:560px){
    .portfolio_list li .img_box {height: 350px;}
    .portfolio_list li .info_box dt {font-size: 2rem;}
    .portfolio_list li .info_box dd {font-size: 1.4rem;}
    .portfolio_list li .info_box dd span {line-height: 1.5;}
}

@media all and (max-width:499px){
    .portfolio_none {font-size: 3vw;}
}
</style>
