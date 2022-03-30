<template>
    <div class="popup">
        <h3>알림</h3>
        <p class="modal_txt">{{popupTxt}}</p>
        <button @click="$emit('popupClose')" class="btn_close">
            <span></span><span></span>
        </button>
    </div>
</template>

<script>
export default {
    name:"upload_modal",
    props:{
        popupTxt:String
    },
}
</script>

<style scoped>
    .popup { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); display: block; width: 350px; height: 200px; text-align: center; background-color: #fff; border: 1px solid #000; z-index: 9999;}

    .popup h3 {display: block; margin: 20px 0; font-size: 2.6rem;}

    .popup ul {line-height: 1.8; font-size: 1.6rem;}

    .modal_txt {line-height: 1.4; margin-top: 30px; font-size:2rem; word-break: keep-all;}
</style>