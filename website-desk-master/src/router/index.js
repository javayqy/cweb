import Vue from "vue";
import VueRouter from "vue-router";
import Guide from "../views/Guide.vue";
import Home from "../views/Home.vue";
import layout from "@/layout";

Vue.use(VueRouter);

const routes = [
  // {
  //   path: "/login",
  //   name: "登陆",
  //   meta:{
  //     title:'登陆'
  //   },
  //   component: () => import("@/views/login/index.vue"),
  // },
  {
    path: "/",
    name: "主页",
    meta: {
      title: "登陆",
    },
    children: [
      {
        path: "/login",
        name: "登陆",
        meta: {
          title: "登陆",
        },
        component: () => import("@/views/login/index.vue"),
      },
    ],
    component: Home,
  },
  {
    path: "/404",
    name: "404",
    meta: {
      title: "页面不存在",
    },
    component: () => import("@/views/404.vue"),
  },
  {
    path: "/",
    name: "白板",
    component: layout,
    children: [
      {
        path: "course",
        name: "Course",
        meta: {
          title: "课程中心",
        },
        component: () => import("@/views/course/index.vue"),
      },
      {
        path: "dashboard/:id",
        name: "Dashboard",
        meta: {
          title: "视频播放",
        },
        component: () => import("@/views/dashboard/index.vue"),
      },
      {
        path: "resource",
        name: "Resource",
        meta: {
          title: "资源管理",
        },
        component: () => import("@/views/resource/index.vue"),
      },
      {
        path: "profile",
        name: "Profile",
        meta: {
          title: "个人页面",
        },
        component: () => import("@/views/profile/index.vue"),
      },
      {
        path: "courseManager",
        name: "CourseManager",
        meta: {
          title: "课程管理",
        },
        component: () => import("@/views/courseManager/index.vue"),
      },
      {
        path: "userManager",
        name: "UserManager",
        meta: {
          title: "用户管理",
        },
        component: () => import("@/views/userManager/index.vue"),
      },
      {
        path: "chapterManager/:id",
        name: "ChapterManager",
        meta: {
          title: "章节管理",
        },
        component: () => import("@/views/chapterManager/index.vue"),
      },
      {
        path: "/about",
        name: "About",

        component: () => import("../views/About.vue"),
      },
      {
        path: "/guide",
        name: "Guide",
        component: Guide,
        children: [
          {
            path: "/",
            name: "G1",
            component: () => import("../guide/g1.vue"),
          },
          {
            path: "/g1",
            name: "G1",
            component: () => import("../guide/g1.vue"),
          },
        ],
      },
      {
        path: "/class",
        name: "Class",

        component: () => import("../views/Class.vue"),
      },
      {
        path: "/video",
        name: "Video",
        component: () => import("../views/Video.vue"),
      },
      // {
      //   path:'/loginmain',
      //   name:'LoginMain',
      //   component: () => import( '../login/index.vue')
      // },
    ],
  },
  { path: "*", redirect: "/404", hidden: true },
];

const router = new VueRouter({
  routes,
});

export default router;
