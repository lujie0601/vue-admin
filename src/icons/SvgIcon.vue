<template>
  <svg
    :class="svgClass"
    aria-hidden="true"
  >
    <use :xlink:href="iconName"></use>
  </svg>
</template>
<script>
import {
  reactive,
  ref,
  isRef,
  onMounted,
  computed
} from "@vue/composition-api"; //vue3.0引用生命周期和属性的定义
export default {
  name: "svgIcon",
  props: ["iconClass", "className"],
  setup(props, { refs, root }) {
    const iconName = computed(() => `#icon-${props.iconClass}`);
    const svgClass = computed(() => {
      if (props.className) {
        return `svg-icon ${props.className}`;
      } else {
        return `svg-icon`;
      }
    });
    return {
      iconName,
      svgClass
    };
  }
};
</script>
<style lang="scss" scoped>
.svg-icon {
    width: 1.1em;
    height: 1.1em;
    fill:currentColor;
}
</style>