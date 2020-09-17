
<template>
  <div>
    index页面
    <router-link :to="'at'">a模板</router-link>
    <router-link :to="'bt'">b模板</router-link>
    <router-link :to="'ct'">c模板</router-link>
    <router-link :to="'dt'">d模板</router-link>
    <ReplaceTemplate />
  </div>
</template>
<script>
import ReplaceTemplate from "./replace" //替换模板
export default {
  name: "indexTest",
  components: {
    ReplaceTemplate
  },
  setup(props,{refs,root}) {}

/**路由 */
/*   const router= {
    path: "/test",
    name: "Test",
    component: () => import("@/views/RouterTest"),
    children: [
      {
        path: "/at",
        name: "At",
        component: () => import("../views/RouterTest/aview")
      },
      {
        path: "/bt",
        name: "Bt",
        component: () => import("../views/RouterTest/bview")
      },
      {
        path: "/ct",
        name: "Ct",
        component: () => import("../views/RouterTest/cview")
      },
      {
        path: "/dt",
        name: "Dt",
        component: () => import("../views/RouterTest/dview")
      }
    ]
  }; */

};
</script>
<style scoped>
</style>