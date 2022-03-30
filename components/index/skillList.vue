<template>
        <article class="skill_bar">
            <h2 class="hidden">기술목록</h2>
            <p v-if="this.data[this.login].skill.length == 0" class="skill_none">
                등록된 스킬이 없습니다.
            </p>
            <ul v-else class="skill_list">
                <li v-for="i in this.data[this.login].skill" :key="i">
                    <div class="img_box" :title="i.name"><img @click="detailModal" :src="i.src" :alt="i.alt"></div>
                    <button v-if="login != 0" :title="i.name" @click="skillDelete" class="btn_delete">
                        <span></span>
                        <span></span>
                    </button>
                </li>
            </ul>
            <button v-if="login != 0" @click="skillUpload" class="btn_add">기술 추가</button>
        </article>
</template>

<script>
export default {
    name:"skill_list",
    data(){
        return {
            skillArr:this.data[this.login].skill
        }
    },
    props:{
        data:Array,
        login:Number
    },
    methods:{
        detailModal(e){
            let i = e.currentTarget;
            let div = document.createElement("div");
            let temp = `
                <div class="inner">
                    <div class="img_box" title=${i.parentNode.title}>
                        <img src="${i.src}" alt="${i.name}"/>
                    </div>
                    <p>${i.alt}</p>
                    <button class="btn_share">카톡 공유</button>
                </div>
            `;
            div.classList.add("modal");
            div.innerHTML=temp;
            document.querySelector(".skill_bar").after(div);

            function kakao(title,description,imageUrl){
                window.Kakao.Link.sendDefault({
                    objectType: "feed",
                    content:{
                        title:"공유된 스킬",
                        description:title + " " + description,
                        imageUrl:imageUrl,
                        link:{
                            webUrl:"https://parksuhyun9321.github.io/",
                            mobileWebUrl:"https://parksuhyun9321.github.io/"
                        }
                    },
                    buttons:[
                        {
                            title:"프론트엔드 개발자 박수현의 웹앱",
                            link:{
                                webUrl:"https://parksuhyun9321.github.io/",
                                mobileWebUrl:"https://parksuhyun9321.github.io/"
                            }   
                        }
                    ]
            
                });
            }

            document.querySelector(".modal").addEventListener("click",function(e){
                if(e.target.className == "modal"){
                    document.querySelector(".modal").remove()
                } else if(e.target.className == "btn_share"){
                    kakao(i.parentNode.title,i.alt,i.alt,i.src);
                }
            });
        },
        skillDelete(){
            let val = document.querySelector(".img_box").title;
            this.emitter.emit("skillDelete",val);
        },
        skillUpload(){
            this.emitter.emit('skillUpload',"skill");
        },
    },
};
</script>

<style scoped>
.skill_bar {position: relative;height: 110px; border: 1px solid #000; border-radius: 10px; }

.skill_list { width: 100%; display: flex; align-items: center; height: 100%; padding: 0 10px; overflow-x: scroll;}
.skill_bar .skill_list::-webkit-scrollbar {height: 10px; background-color: none; border-radius: 0 0 10px 10px;}
.skill_bar .skill_list::-webkit-scrollbar-thumb {height: 10px; background: #000; border-radius: 0 0 10px 10px;} 

.skill_list li {position: relative; flex-shrink: 0; display: flex; justify-content: center; align-content: center; width: 70px; height: 70px;}
.skill_list li:nth-child(n+2) {margin-left: 20px;}

.skill_list li .img_box { width: 100%; height: 100%; border: 1px solid #000; border-radius: 100%; overflow: hidden;}

.skill_list li img {position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); width: 40px;cursor: pointer; }

.btn_add {position: absolute; top: -7px; right: 0px; display: inline-block; background-color: #fff; font-size: 1.4rem;}

.skill_bar .skill_none {position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); font-size: 1.4rem;}

.btn_delete {position: absolute; top: 0px; right: 0px; width: 15px; height: 15px; background-color: #000; border-radius: 100%;}
.btn_delete span {position: absolute; top: 50%; left: 0; transform: translateY(-50%); display: block; width: 100%; height: 2px; background-color: #fff;}
.btn_delete span:first-child {transform: rotate(45deg);}
.btn_delete span:last-child {transform: rotate(-45deg);}

@media all and (max-width:499px){
    .skill_bar .skill_none {font-size: 3vw;}
}
</style>
