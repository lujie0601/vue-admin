
<template>
    <div style="background-color:red;">
        被替换页面repalce up
        <router-view /> <!-- 被path替换的位置 -->
        被替换页面repalce down
    </div>
</template>
<script>
export default {
    name:"repalce",
}
</script>
<style scoped>

</style>