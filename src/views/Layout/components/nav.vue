<template>
  <div id="nav-wrap">
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      text-color="#fff"
      background-color="#344a5f"
      router
    >
      <template  v-for="(item,index) in routes">
        <el-submenu 
          v-if="!(item.hidden)"
          :key="item.id"
          :index="index+''"
        >
          <template slot="title">
            <i :class="item.meta.icon"></i>
            <span slot="title">{{item.meta.name}}</span>
          </template>

          <el-menu-item
            v-for="subItem in item.children"
            :key="subItem.id"
            :index="subItem.path"
          >{{subItem.meta.name}}</el-menu-item>

        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>
<script>
import { ref, reactive, isRef, toRefs, onMounted } from "@vue/composition-api";
export default {
  name: "navMenu",
  setup(props, { refs, root }) {
    console.log(root.$router.options.routes);

    const routes = reactive(root.$router.options.routes);//打印总路由信息

    const isCollapse = ref(false);
    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath);
    };
    const handleClose = (key, keyPath) => {
      console.log(key, keyPath);
    };
    return {
      isCollapse,
      handleOpen,
      handleClose,
      routes
    };
  }
};
</script>
<style lang="scss" scoped>
@import "../../../styles/config.scss";
#nav-wrap {
  position: fixed;
  top: 0px;
  left: 0px;
  width: $navMenuWidth;
  height: 100vh;
  background-color: #344a5f;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
  background-color: #344a5f;
}
</style>