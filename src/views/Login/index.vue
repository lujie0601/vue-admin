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
        <label for="username">邮箱</label>
        <el-input
          id="username"
          type="type"
          v-model="ruleForm.username"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        class="item-from"
        prop="password"
      >
        <label for="password">密码</label>
        <el-input
          id="password"
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
            <el-button
              type="success"
              @click="getSms"
              :disabled="btnCodeStatus.disable"
            >{{btnCodeStatus.text}}</el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item class="item-from">
        <el-button
          type="danger"
          :disabled="btnLoginStatus"
          @click="submitForm('ruleForm')"
          class="block login-btn"
        >{{menuTab[0].current?menuTab[0].txt:menuTab[1].txt}}</el-button>
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
import { reactive, ref, isRef, onMounted } from "@vue/composition-api"; //vue3.0引用生命周期和属性的定义
import { GetSms, Register, Login } from "@/api/login.js";
import sha1 from "js-sha1";
export default {
  name: "login",
  setup(props, { refs, root }) {
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
      { txt: "登录", current: true, module: "login" },
      { txt: "注册", current: false, module: "register" }
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
    /**定义获取验证码btn状态和文本 */
    const btnCodeStatus = reactive({
      disable: false,
      text: "获取验证码"
    });
    /**定义登录按钮状态 */
    const btnLoginStatus = ref(true);
    /**挂载完成之后 */
    onMounted(() => {
      console.log("onMouted()");
    });
    /**声明函数 */

    /************************************************promise鏈式調用實例 ************************************************************
     *
     */
    const promise1 = status => {
      return new Promise((resolve, reject) => {
        if (status) {
          console.log("成功調用promise1 返回true");
          resolve(true);
        } else {
          reject(false);
        }
      });
    };
    const promise2 = status => {
      return new Promise((resolve, reject) => {
        if (status) {
          console.log("成功調用promise2 返回true");
          resolve(true);
        } else {
          reject(false);
        }
      });
    };

    const promise3 = status => {
      return new Promise((resolve, reject) => {
        if (status) {
          console.log("成功調用promise3 返回promise3");
          resolve("promise3");
        } else {
          reject(false);
        }
      });
    };

    const promiseTest = status => {
      promise1(true)
        .then(response => {
          return promise2(response);
        })
        .then(response => {
          return promise3(response);
        })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    };

    /************************************************promise鏈式調用實例END************************************************************/
    /*****************************切换方法  登录和注册***********************************************
     *
     */
    const toggleMenu = data => {
      menuTab.forEach(element => {
        element.current = false;
      });
      data.current = true;
      refs.ruleForm.resetFields();
    };

    /**提交表单************************************************************************************
     *
     */
    const submitForm = formName => {
      refs[formName].validate(valid => {
        if (valid) {
          let requestData = {
            username: ruleForm.username,
            password: ruleForm.password,
            code: ruleForm.code,
            module: menuTab[0].current ? menuTab[0].module : menuTab[1].module
          };
          if (!menuTab[0].current) {
            userRegister(requestData);
          } else {
            //userLogin(requestData);
            //alert(sha1(ruleForm.password));
            root.$router.push({name:"Console"});
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    };

    /******************************************************************************
     *验证码按钮倒计时 */
    const countDown = () => {
      let count = 60;
      /**声明循环函数counter */
      let counter = setInterval(() => {
        /**修改获取验证码btn状态和文本 禁止再次获取*/
        btnCodeStatus.text = `剩余${--count}秒`;
        if (count < 50) {
          /**停止函数 */
          clearInterval(counter);
          btnCodeStatus.disable = false;
          btnCodeStatus.text = "再次获取码";
        }
      }, 1000);
    };

    /****************************************************************************************************************
     * 获取验证码
     *
     */
    const getSms = () => {
      if (ruleForm.username === "") {
        root.$message({
          message: "邮箱不能为空",
          type: "warning"
        });
        return false;
      } else if (validateEmail(ruleForm.username)) {
        root.$message({
          message: "请输入正确的格式！",
          type: "warning"
        });
        return false;
      }
      /**改变验证码状态 */
      btnCodeStatus.text = "正在发送中";
      btnCodeStatus.disable = true;

      setTimeout(() => {
        /**延迟5秒请求 */

        GetSms({
          username: ruleForm.username,
          module: menuTab[0].current ? menuTab[0].module : menuTab[1].module
        }) /**请求验证 */
          .then(response => {
            root.$message({
              message: response.data.message,
              type: "success"
            });

            countDown(); /**验证码按钮倒计时 */
            btnLoginStatus.value = false; /**修改获取验证码btn状态和文本 激活按钮*/
          })
          .catch(error => {
            console.log(error);
          });
      }, 1000);
    };
    /*****************************************************************************************************
     *注册用户
     * const registerUser=function(data){}
     */
    const userRegister = data => {
      Register(data)
        .then(response => {
          root.$message({
            message: response.data.message,
            type: "success"
          });
          toggleMenu(menuTab[0]); //加载到登录页面
        })
        .catch(error => {
          console.log(error);
        });
    };

    /***********************************************************************************************************
     * 用户登录
     */
    const userLogin = data => {
      Login(data)
        .then(response => {
          root.$message({
            message: response.data.message,
            type: "success"
          });
        })
        .catch(error => {
          console.log(error);
        });
    };

    /**********************************************************************************************************
     * 返回属性和方法
     */
    return {
      menuTab,
      ruleForm,
      rules,
      toggleMenu,
      submitForm,
      getSms,
      btnCodeStatus,
      btnLoginStatus,
      promiseTest
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