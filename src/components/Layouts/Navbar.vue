<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const user = ref("");
const router = useRouter();

user.value = localStorage.getItem("userData");

const Logout =()=>{
  localStorage.removeItem("accessToken");
  router.push({ path: 'login' })
}
</script>

<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
      <router-link class="navbar-brand"  to="brands">ISSGATE</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link active" aria-current="page" to="/"
              >Home</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link active" aria-current="page" to="brands"
              >Brands</router-link
            >
          </li>
      
        </ul>
        <form class="d-flex" role="search" v-if="!user">
          <router-link to="login">
            <button class="btn" type="submit">Login</button>
          </router-link>
        </form>

        <form class="d-flex" role="search" v-if="user">
          <router-link to="login">
            <button class="btn" type="submit" @click="Logout">Logout</button>
          </router-link>
        </form>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  background-color: #f5f7f8;
  padding: 0.7rem;
}

.navbar-brand {
  color: #f4ce14;
  font-weight: 500;
}

.navbar-brand:hover {
  color: #f4ce14;
}

ul {
  margin: 0 4rem;
}
.nav-link:hover {
  background-color: unset;
}

.nav-item {
  font-size: 1.3rem;
  margin: 0 0.7rem;
}

button {
  background-color: #f4ce14;
  width: 7rem;
  font-size: 1.3rem;
}
</style>
