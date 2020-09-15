<template>
  <div id="main-wrap">
    <router-view />
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
@import "../../../styles/config.scss";
#main-wrap {
  position: fixed;
  top: 75px;
  left: $navMenuWidth;
  margin: $mainMarginWidth;
  width: calc(100vw - #{$navMenuWidth} - #{$mainMarginWidth}* 2);
  height: 100vh;
  background-color:#fff;
}
</style>