<template>
    <div v-if="alert==false" class="popup">
        <h3>알림</h3>
        <div v-if="state=='idSearch'">
            <ul v-if="result.length > 0">
                <li v-for="i in result" :key="i">"{{i.id}}"</li>
            </ul>
           <p v-if="result.length > 0" class="modal_txt">{{result.length}} {{modalTxt}}</p>
           <p v-else class="modal_txt">검색된 결과가 없습니다.</p>
        </div>
        <div v-if="state=='pwSearch'">
            <ul v-if="result">
                <li>"{{result}}"</li>
            </ul>
           <p v-if="result" class="modal_txt">{{modalTxt}}</p>
           <p v-else class="modal_txt">검색된 결과가 없습니다.</p>
        </div>
        <button @click="$emit('modalClose')" class="btn_close">
            <span></span><span></span>
        </button>
    </div>  
    <div v-else class="popup">
        <h3>알림</h3>
        <p class="modal_txt">{{modalTxt}}</p>
        <button @click="$emit('modalClose')" class="btn_close">
            <span></span><span></span>
        </button>
    </div>
</template>

<script>
export default {
    name:"session_modal",
    props:{
        result:Array,
        modalTxt:String,
        state:String,
        alert:String,
    },
    mounted(){
        // console.log("결과값 : "+this.result,"얼럿여부 : "+this.alert, "스태이트 : " + this.state, "텍스트 : " + this.modalTxt)
    }
}
</script>

<style scoped>
    .popup { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); display: block; width: 350px; height: 200px; text-align: center; background-color: #fff; border: 1px solid #000; z-index: 9999;}

    .popup h3 {display: block; margin: 20px 0; font-size: 2.6rem;}

    .popup ul {line-height: 1.8; font-size: 1.6rem;}

    .modal_txt {line-height: 1.4; margin-top: 30px; font-size:2rem; word-break: keep-all;}
</style>