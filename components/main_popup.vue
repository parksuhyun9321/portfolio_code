<template>
    <div class="popup">
        <h3>알림</h3>
        <p class="popup_txt">{{popupTxt}}</p>
        <button @click="$emit('popupClose')" class="btn_close">
            <span></span><span></span>
        </button>
    </div>
</template>

<script>
export default {
    name:"session_modal",
    props:{
        
    },
}
</script>

<style scoped>

</style>