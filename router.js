import { createWebHashHistory , createRouter } from "vue-router";
import Main from "./components/index/index.vue";
import Session from "./components/session/session.vue"
import Mypage from "./components/myPage/myPage.vue"
import Upload from "./components/upload/portfolioUpload.vue"
import Error from "./components/error.vue"


const routes = [
  {
    path: "/",
    component: Main,
  },
  {
    path: "/session",
    component: Session,
  },
  {
    path: "/mypage/:no",
    component: Mypage,
  },
  {
    path: "/upload/portfolio",
    component: Upload,
  },   
  {
    path:"/:pathMatch(.*)*",
    component:Error
  } 
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;