<template>
  <ul class="resume_upload_list">
    <li>
      <label for="title">*이력 제목</label>
      <input type="text" id="title">
    </li>
    <li>
      <label for="title">*기간</label>
      <input type="text" id="resume_period">
    </li>
    <li>
        <button @click="resumeUp" class="btn_upload">등록</button>
    </li>
  </ul>
  <div v-if="bg=='on'" class="bg">
    <Popup @popupClose="popup='close'; alert=false; bg='off'" :popupTxt="popupTxt" />
  </div>
</template>

<script>
export default {
    name:"resume_upload",
    props:{
        data:Array,
        login:Number
    },
    methods:{
        resumeUp(){
            let data = this.data[this.login].myInfo.resume;
            let title = document.getElementById("title").value;
            let resume_period = document.getElementById("resume_period").value;
            if(!title || !resume_period){
                this.emitter.emit("resumeError","모든 항목을 입력해주세요.");
            } else {
                let obj= {};
                obj.title = title;
                obj.period = resume_period;
                data.push(obj);
                this.emitter.emit("uploadNone","none")
            }        
        } 
            
     
    },
};
</script>

<style scoped>
.resume_upload_list { width: 80%; margin: 0 auto; text-align: center; }

.resume_upload_list li {position: relative; display: flex; justify-content: space-around; align-items: center; margin: 30px 0; font-size: 2rem;}
.resume_upload_list li label {width: 90px; text-align: left;}
.resume_upload_list li:last-child{margin: 0 0 20px;}
.resume_upload_list li input {width: 230px; border: 1px solid #000;}
.resume_upload_list li .btn_upload {margin: 0;}

select, input {border: none;outline: none;font-size: 1.8rem;}

</style>