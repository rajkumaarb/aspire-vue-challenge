<template>
  <div class="login">
    <a-card>
      <a-form
        id="components-form-demo-normal-login"
        :form="myForm"
        class="login-form"
        @submit="handleSubmit"
      >
        <a-form-item>
          <a-input
            v-decorator="[
              'userName',
              {
                rules: [
                  { required: true, message: 'Enter your email address!' },
                ],
              },
            ]"
            placeholder="E-mail Id"
          >
            <a-icon
              slot="prefix"
              type="user"
              style="color: rgba(0, 0, 0, 0.25)"
            />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            v-decorator="[
              'password',
              {
                rules: [{ required: true, message: 'Enter your Password!' }],
              },
            ]"
            type="password"
            placeholder="Password"
          >
            <a-icon
              slot="prefix"
              type="lock"
              style="color: rgba(0, 0, 0, 0.25)"
            />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-checkbox
            v-decorator="[
              'remember',
              {
                valuePropName: 'checked',
                initialValue: true,
              },
            ]"
          >
            Remember me
          </a-checkbox>
          <a class="login-form-forgot" @click="homePage"> Forgot password </a>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit" class="login-form-button">
            Log in
          </a-button>
          Or
          <a @click="signUp"> register now! </a>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>
<script>
export default {
  name: "Login",
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.myForm.validateFields((err, values) => {
        if (!err) {
          this.$store
            .dispatch("login", {
              email: values.userName,
              password: values.password,
            })
            .then(() => {
              this.$router.push({ path: "/landingpage" });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    },
    signUp() {
      this.$router.push({ path: "/signup" });
    },
    homePage() {
      this.$router.push({ path: "/" });
    },
  },
  beforeCreate() {
    this.myForm = this.$form.createForm(this, { name: "login_form" });
  },
};
</script>
<style scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: inherit;
}

.ant-card {
  width: 40vw;
}

#components-form-demo-normal-login .login-form-forgot {
  float: right;
}

#components-form-demo-normal-login .login-form-button {
  width: 100%;
  background-color: #01d767;
  border-color: #01d767;
  color: #ffffff;
}
</style>
