<template>
    <div id="layout">
        <LayoutHeader />
        <LayoutNav />
        <LayoutMain />
    </div>
</template>
<script>
import LayoutHeader from "./components/header"
import LayoutNav from "./components/nav"
import LayoutMain from "./components/main"
export default {
    name:"layout",
    components:{LayoutHeader,LayoutNav,LayoutMain},
    setup(){
        
    }
}
</script>
<style lang="scss" scoped>
#layout{
    background-color: rebeccapurple;
}
</style>