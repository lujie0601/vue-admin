<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li
          v-for="item in menuTab"
          :key="item.id"
          :class="{'current':item.current}"
          @click="toggleMenu(item)"
        >{{item.txt}}</li>
      </ul>
    </div>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      class="login-form"
      size="medium"
    >
      <el-form-item
        class="item-from"
        prop="username"
      >
        <label>邮箱</label>
        <el-input
          type="type"
          v-model="ruleForm.username"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        class="item-from"
        prop="password"
      >
        <label>密码</label>
        <el-input
          type="password"
          v-model="ruleForm.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <el-form-item
        class="item-from"
        v-if="menuTab[1].current"
        prop="checkPass"
      >
        <label>确认密码</label>
        <el-input
          type="password"
          v-model="ruleForm.checkPass"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <el-form-item
        class="item-from"
        prop="code"
      >
        <label>验证码</label>
        <el-row :gutter="10">
          <el-col :span="16">
            <el-input v-model.number="ruleForm.code"></el-input>
          </el-col>
          <el-col :span="8">
            <el-button type="success" @click="getSms">获取验证码</el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item class="item-from">
        <el-button
          type="danger"
          @click="submitForm('ruleForm')"
          class="block login-btn"
        >提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {
  stripscript,
  validateEmail,
  validatePass,
  validateVCode
} from "@/utils/validate.js";
import { reactive, ref, isRef, onMounted } from "@vue/composition-api";
import {GetSms} from "@/api/login.js";
export default {
  name: "login",
  setup(props, context) {
    //放置数据、生命周期、自定义函数

    var checkCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("验证码不能为空"));
      }
      setTimeout(() => {
/*         if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else { */
          if (value.toString().length != 6) {
            callback(new Error("必须6位"));
          } else {
            callback();
          }
        
      }, 1000);
    };
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (validateEmail(value)) {
        callback(new Error("请输入正确的邮箱"));
      } else {
        /***当输入第一次密码时，启动验证再次输入密码的函数
        if (this.ruleForm.password !== '') {
            this.$refs.ruleForm.validateField('password');
          } */
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value.toString().length < 6) {
        callback(new Error("两次不少于六位!"));
      } else {
        callback();
      }
    };

    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    //reactive 引用类型的值
    const menuTab = reactive([
      { txt: "登录", current: true },
      { txt: "注册", current: false }
    ]);

    const ruleForm = reactive({
      username: "",
      password: "",
      checkPass: "",
      code: ""
    });
    const rules = reactive({
      username: [{ validator: validateUsername, trigger: "blur" }],
      password: [{ validator: validatePass, trigger: "blur" }],
      checkPass: [{ validator: validatePass2, trigger: "blur" }],
      code: [{ validator: checkCode, trigger: "blur" }]
    });
    /**挂载完成之后 */
    onMounted(() => {
        console.log("onMouted()");
    });
    /**声明函数 */

    /**切换方法  登录和注册*/
    const toggleMenu = data => {
      menuTab.forEach(element => {
        element.current = false;
      });
      data.current = true;
    };

    /**提交表彰 */
    const submitForm = formName => {
      context.refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    };

    /**获取验证码 */
    const getSms=()=>{
      let requestData = {
          username: ruleForm.username
        }
        GetSms(requestData);
    };

    /**返回属性的方法 */
    return {
      menuTab,
      ruleForm,
      rules,
      toggleMenu,
      submitForm,
      getSms
    };
  }
};
</script>
<style lang="scss" scoped>
#login {
  height: 100vh;
  background-color: #344a5f;
  text-align: center;
}
.login-wrap {
  width: 330px;
  margin: auto;
}
.menu-tab {
  text-align: center;
  li {
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 14px;
    color: #fff;
    border-radius: 2px;
    cursor: pointer;
  }
  .current {
    background-color: rgba(0, 0, 0, 0.1);
  }
}
.login-form {
  width: 400px;
  //margin-top: 29px;
  margin: 29px auto 0 auto;
  label {
    text-align: left;
    display: block;
    margin-bottom: 3px;
    font-size: 14px;
    color: #fff;
  }
  .item-from {
    margin-bottom: 13px;
  }
  .block {
    display: block;
    width: 100%;
  }
  .login-btn {
    margin-top: 19px;
  }
}
</style>