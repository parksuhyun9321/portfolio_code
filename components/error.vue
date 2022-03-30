<template>
  <dl>
      <dt>*404*</dt>
      <dd>파일을 찾을 수 없습니다.</dd>
      <dd>이 주소로 구성된 사이트에 요청된 파일이 없습니다.</dd>
      <dd>
          <router-link to="/">메인페이지로 돌아가세요.</router-link>
      </dd>
  </dl>
</template>

<script>
export default {
    name:"404_error"
}
</script>

<style scoped>
    dl {position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); display: flex; flex-direction: column; justify-content: center; align-items: center; width: 450px; height: 450px; border: 1px solid #000;}
    dl dt {display: block; margin-bottom: 50px; font-size: 5rem;}
    dl dd {line-height: 1.5;font-size: 1.8rem;}
    dl dd a {display: inline-block; margin-top: 60px; padding: 20px 30px; color: #fff; background-color:#000}

    @media all and (max-width:500px){
        dl {width: 80%;}
        dl dt {font-size: 10vw;}
        dl dd {font-size: 3vw;}
    }
</style>