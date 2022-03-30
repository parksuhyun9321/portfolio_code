<template>
  <ul class="skill_upload_list">
    <li class="img_contents">
      <div class="img_box">
        <img class="upload_img" src="../../assets/img/no_image.svg" alt="이미지 없음" />
        <button @click="imgDelete" class="img_delete btn_delete">
          <span></span>
          <span></span>
        </button>
      </div>
      <label for="files">업로드</label>
      <input type="text" class="upload_value" value="선택된 이미지 없음" readonly>
      <input @change="imgUpload" type="file" id="files" class="hidden" />
    </li>
    <li>
      <label for="name">*이름</label>
      <input type="text" id="name" />
    </li>
    <li>
      <label for="alt">*내용</label>
      <input type="text" id="alt" />
    </li>
    <li>
      <button @click="skillUpload" class="btn_upload">추가</button>
    </li>
  </ul>
</template>

<script>
export default {
  name: "skill_upload",
  props: {
    data: Array,
    login: Number,
  },
  methods:{
    imgUpload(e){
      let i = URL.createObjectURL(e.target.files[0]);
      document.querySelector(".upload_img").src=i;
      document.querySelector(".upload_value").value=i;
      document.querySelector(".skill_upload_list .btn_delete").style.display="block";
    },
    imgDelete(e){
      e.currentTarget.style.display="none";
      document.querySelector(".upload_img").src=require("../../assets/img/no_image.svg");
      document.querySelector(".upload_value").value="선택된 이미지 없음";
    },
    skillUpload(){
      let data = this.data[this.login].skill;
      let name = document.getElementById("name").value;
      let src =  document.querySelector(".upload_img").src;
      let alt = document.getElementById("alt").value;
      let obj = {};
      if(!name || !alt){
        this.emitter.emit("skillError","모든 항목을 입력해주세요.");
        return false;
      }
      obj.name = name;
      obj.alt = alt;
      obj.src = src;
      data.push(obj);
      this.emitter.emit("uploadNone","none");
    }
  }
};
</script>

<style scoped>
.skill_upload_list { width: 80%; margin: 0 auto; text-align: center; }

.skill_upload_list li {position: relative; display: flex; justify-content: space-around; align-items: center; margin: 30px 0; font-size: 2rem;}
.skill_upload_list li:last-child{margin: 0 0 20px;}
.skill_upload_list li input {width: 250px; border: 1px solid #000;}
.skill_upload_list li .btn_upload {margin: 0;}

.skill_upload_list li.img_contents {display: flex; justify-content: center; flex-wrap: wrap;width: 100%;}
.skill_upload_list li.img_contents .img_box {position: relative;}
.skill_upload_list li.img_contents .upload_value {display: block; width: 250px; margin-left: 20px; font-size: 1.2rem; border: none; white-space: nowrap;  text-overflow: ellipsis; overflow: hidden;}

.skill_upload_list li.img_contents .img_box .btn_delete {position: absolute; top: -5px; right: -5px; display: none; width: 15px; height: 15px; background-color: #000; border-radius: 100%;}
.skill_upload_list li.img_contents .img_box .btn_delete span {position: absolute; top: 50%; left: 0; transform: translateY(-50%); display: block; width: 100%; height: 2px; background-color: #fff;}
.skill_upload_list li.img_contents .img_box .btn_delete span:first-child {transform: rotate(45deg);}
.skill_upload_list li.img_contents .img_box .btn_delete span:last-child {transform: rotate(-45deg);}

@media all and (max-width:499px){
  .skill_upload_list li input {width: 50vw;}
}
</style>