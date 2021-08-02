<template>
  <div class="header">
    <img
      src="../assets/Aspire Logo.svg"
      alt="aspire-logo"
      class="img-height"
      @click="homePage"
    />
    <my-button
      class="avatar"
      :dispname="buttonName"
      @clickedbutton="toggleButton"
      v-if="loginButton"
    />
  </div>
</template>
<script>
import MyButton from "./MyButton.vue";
export default {
  name: "Header",
  components: {
    MyButton,
  },
  data() {
    return {
      buttonName: "Login",
      loginButton: true,
    };
  },
  methods: {
    homePage() {
      this.$router.push({ path: "/" });
    },
    toggleButton() {
      this.loginButton = false;
    },
  },
};
</script>
<style scoped>
.header {
  background-color: #0c365a;
  height: 50px;
  padding: 15px;
}

.header .img-height {
  height: 20px;
  float: left;
  cursor: pointer;
}

.header .avatar {
  float: right;
  margin-top: -5px;
}
</style>
