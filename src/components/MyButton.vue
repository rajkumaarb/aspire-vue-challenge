<template>
  <a-button class="button" @click="btnClick">{{ dispname }}</a-button>
</template>
<script>
export default {
  name: "MyButton",
  props: ["dispname"],
  methods: {
    btnClick() {
      this.$emit("clickedbutton");
      this.$router.push({
        path: "/login",
      });
    },
  },
};
</script>
<style scoped>
.button {
  background-color: #01d767;
  color: #ffffff;
  border-color: #01d767;
}

.button:hover,
.button:visited {
  background-color: #01d767;
  color: #ffffff;
  border-color: #01d767;
}
</style>