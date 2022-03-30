<template>
<Header :data="data" :login="login" />
  <main id="main">
      <section>
          <SkillList :data="data" :login="login"/>
          <PortFolio :data="data" :login="login"/>
      </section>
    <MyInfo :data="data" :login="login"/>
  </main>
</template>

<script>
import Header from "../header.vue"
import SkillList from "./skillList.vue"
import PortFolio from "./portfolio.vue"
import MyInfo from "./myInfo.vue"

export default {
    name:"index_main",

    components:{
        Header,
        SkillList,
        PortFolio,
        MyInfo,
    },
    props:{
        data:Array,
        login:Number
    },    
}
</script>

<style scoped>
#main {display: flex; -webkit-box-pack: justify; justify-content: space-between; flex-wrap: wrap; }

#main section { width: 630px;}

@media all and (max-width:1030px){
    #main section {width: 100%;}
}
</style>