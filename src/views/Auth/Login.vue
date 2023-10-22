<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useBrandsStore } from "../../stores/index";
const store = useBrandsStore();

const password = ref("Aa@321");
const username = ref("user2@issgate.com");
const rememberMe = ref(true);
const isPasswordVisible = ref(false);
const route = useRoute();
const router = useRouter();

const errors = ref("");
const userData = ref({
  username: username.value,
  password: password.value,
  rememberMe: rememberMe.value,
});

const onSubmit = () => {
  store
    .login(userData.value)
    .then((r) => {
      const accessToken = r.data.Data.Token;
      const userData = r.data.Data;

      localStorage.setItem("userData", JSON.stringify(userData));
      localStorage.setItem("accessToken", accessToken);

      // Redirect to `to` query if exist or redirect to index route
      router.replace(route.query.to ? String(route.query.to) : "/");
    })
    .catch((e) => {
      errors.value = e;
      console.log(e);
    });
};
</script>

<template>
  <div class="login">
    <h2>Login</h2>
    <form @click.prevent="onSubmit">
      <div class="mb-3">
        <input
          v-model="username"
          type="text"
          class="form-control"
          id="exampleInputEmail1"
          placeholder="User Name"
        />
      </div>
      <div class="mb-3">
        <input
          v-model="password"
          type="text"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
        />
      </div>
      <div class="mb-3 form-check">
        <input
          class="form-check-input"
          type="checkbox"
          id="checkbox"
          v-model="rememberMe"
        />
        <label for="checkbox" class="form-check-label">Remember me</label>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<style scoped>
.login {
  margin: 5rem;
}
h2 {
  margin-bottom: 3rem;
  text-align: center;
}
.form-control {
  margin: 1rem auto;
  width: 30%;
  padding: 1rem 0.75rem;
}

.form-check {
  display: block;
  min-height: 1.5rem;
  padding-left: 1.5em;
  margin-bottom: 0.125rem;
  width: 30%;
  margin: auto;
}

button {
  width: 30%;
  margin: 2rem auto;
  display: block;
  font-size: 1.2rem;
  padding: 0.7rem;
  background-color: #f4ce14;
  border-color: #f4ce14;
}

button:hover {
  background-color: #f4ce14;
  border-color: #f4ce14;
}

button:focus {
  background-color: #f4ce14;
  border-color: #f4ce14;
}
</style>
