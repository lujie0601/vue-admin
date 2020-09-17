import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login/index.vue"
import Layout from "../views/Layout"
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "login",
    hidden: true,
    meta: {
      name: "主页"
    }
  },
  {
    path: "/login",
    name: "Login",
    hidden: true,
    component: Login,
    meta: {
      name: "登录"
    }
  }
  ,
  {
    path: "/main",
    name: "Main",
    component: Layout,
    meta: { name: "控制台", icon: "console" },
    children: [
      {
        path: "/console",
        name: "Console",
        meta: {
          name: "首页",
        },
        component: () => import("../views/Console")
      }
    ]
  },
  {
    path: "/info",
    name: "Info",
    component: Layout,
    meta: { name: "信息管理", icon: "info" },
    children: [
      {
        path: "/infoIndex",
        name: "InfoIndex",
        meta: {
          name: "信息列表"
        },
        component: () => import("../views/Info")
      },
      {
        path: "/infoCate",
        name: "InfoCate",
        meta: {
          name: "信息分类"
        },
        component: () => import("../views/Info/category.vue")
      }
    ]
  },
  {
    path: "/user",
    name: "User",
    component: Layout,
    meta: { name: "用户管理", icon: "user" },
    children: [
      {
        path: "/userIndex",
        name: "UserIndex",
        meta: {
          name: "用户首页"
        },
        component: () => import("../views/User")
      }
    ]
  },

  //{
  // path: "/about",
  // name: "About",
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  //component: () =>
  // import(/* webpackChunkName: "about" */ "../views/About.vue")
  // }
];

const router = new VueRouter({
  routes
});

export default router;
