 import Vue from "vue";
import SvgIcon from './SvgIcon'
//自定义全局组件
Vue.component('svg-icon', SvgIcon);
/**第一个参数遍历目录，第二参数是否遍历子目录，第三参数是查找.svg后缀的文件 */
const req = require.context('./svg', false, /\.svg$/); // 获取当前svg目录所有为.svg结尾的文件
 const requireAll = (requireContext) => {
    return requireContext.keys().map(requireContext);  // 解析获取的.svg文件的文件名称，并返回
}; 
console.log(requireAll(req));

requireAll(req);
 



/* import Vue from "vue";
import SvuIcon from "./SvgIcon";
Vue.component("svg-icon", SvuIcon);
const req = require.context('./svg', false, /\.svg$/); // 获取当前svg目录所有为.svg结尾的文件
const requireAll = (requireContext) => {
    return requireContext.keys().map(requireContext);  // 解析获取的.svg文件的文件名称，并返回
};
requireAll(req);


 */