<template>
    <div class="util">
        <button @click="util" class="btn_util">
            <img v-if="utilState == 'hide'" src="../assets/img/setting.svg" alt="유틸 메뉴 열기"/>
            <img v-else src="../assets/img/setting_close.svg" alt="유틸 메뉴 닫기"/>
        </button>
        <ul v-if="utilState == 'show'" class="util_list">
            <li>
                <button @click="mypageLink">
                    마이페이지
                </button>
            </li>
            <li><button v-if="login != 0" @click="profileImgChange" >프로필 사진 변경</button></li>
            <li><button @click="loginLink">계정변경</button></li>
        </ul>
    </div>
</template>

<script>
export default {
    name:"utilMenu",
    data(){
        return {
            utilState:"hide"
        }
    },
    props:{
        login:Number
    },
    methods:{
        util(){
            if(this.utilState == "hide"){
                this.utilState = "show"
            } else {
                this.utilState = "hide"
            }
        },
        loginLink(){
            this.$router.push('/session');
            this.emitter.emit("headerNone");
        },
        mypageLink(){
            this.$router.push(`/mypage/${this.login}`);
            this.utilState="hide"
        },
        profileImgChange(){
            this.emitter.emit('change',"profileImgChange");
            this.utilState = "hide";
        },
    },
};
</script>

<style scoped>
.util {position: absolute; top: 15px; right: 20px;}
.util .util_list {position: absolute; top: 20px; right: 15px; display: block; width: 150px; padding: 20px 0 20px 14px; background: #fff; border: 1px solid #000; z-index: 999;}
.util .util_list li button,.util .util_list li label {display: inline-block; font-size: 1.6rem; word-break: keep-all;}
.util .util_list li:nth-child(n+2) {margin-top: 10px;}
.btn_util img {width: 20px;}

@media all and (max-width:499px){
    .btn_util img {width: 10vw;}
}
</style>
