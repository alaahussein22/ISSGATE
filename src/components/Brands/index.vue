<script setup>
import ViewBrand from "./view/index.vue";
import UpdateBrand from "../../views/Brands/updateBrand.vue";
import { ref } from "vue";
import { useBrandsStore } from "../../stores/index";
import { watchEffect } from "@vue/runtime-core";
const store = useBrandsStore();
const brands = ref([]);
const isShown = ref(false);
const rowPerPage = ref(10);
const currentPage = ref(1);
const totalPage = ref(1);
const totalCustomers = ref(0);
const viewData = ref({});
const deleteErr = ref({});
const updateData = ref({});
const result = ref(false);

// get Brands
const getAllBrands = () => {
  isShown.value = true;
  store
    .getAllBrands({
      per_page: rowPerPage.value,
      page: currentPage.value,
    })
    .then((response) => {
      isShown.value = false;
      brands.value = response.data.data;
      //   totalPage.value = response.data.data.meta.last_page;
      //   totalCustomers.value = response.data.data.meta.total;
    })
    .catch((error) => {
      console.error(error);
    });
};

const deleteBrand = (brand) => {
  if (confirm(" Are U Sure To Delete This Brand؟")) {
    store
      .deleteBrand(brand.id)
      .then((res) => {
        if (res) {
          getAllBrands();
          result.value = true;
        }
      })
      .catch((err) => {
        deleteErr.value = err;
        console.log(deleteErr.value);
      });
  }
};

const activeBrand = (brand) => {
  store
    .activateBrand(brand.id)
    .then((res) => {
      if (res) {
        getAllBrands();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const viewBrand = (brand) => {
  store
    .viewBrand(brand.id)
    .then((res) => {
      if (res) {
        viewData.value=res.data.data
      }
    })
    .catch((err) => {
      console.log(err);
    });};


const updateBrand = (brand) => {
  store
    .viewBrand(brand.id)
    .then((res) => {
      if (res) {
        updateData.value=res.data.data
      }
    })
    .catch((err) => {
      console.log(err);
    })
};

watchEffect(getAllBrands);
</script>

<template>
  <div>
    <div
      class="toast"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      v-if="result"
    >
      <div class="toast-header">
        <button
          type="button"
          class="ml-2 mb-1 close"
          data-dismiss="toast"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="toast-body">Brand Deleted Successfully</div>
    </div>

    <router-link to="add">
      <button class="btn add" type="button">
        <i class="fa-solid fa-plus me-2"></i>Add New Brand
      </button>
    </router-link>

    <table class="table">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Name</th>
          <th scope="col">createdAt</th>
          <th scope="col">Active</th>

          <th scope="col"></th>
        </tr>
      </thead>
      <tbody class="table" v-for="brand in brands" :key="brand.id">
        <tr>
          <th>{{ brand.id }}</th>
          <td>
            {{ brand.name }}
          </td>
          <td>{{ brand.createdAt }}</td>
          <td>{{ brand.isActive }}</td>
          <td>
            <div>
              <button
                type="button"
                class="btn btn-outline-success"
                @click="updateBrand(brand)"
                data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo"
              >
                Edit
              </button>
              <button
                type="button"
                class="btn btn-outline-warning ms-2 me-2"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
                @click="viewBrand(brand)"
              >
                View
              </button>
              <button
                type="button"
                class="btn btn-outline-danger"
                @click="deleteBrand(brand)"
              >
                Delete
              </button>
              <button
                :disabled="brand.isActive == true"
                type="button"
                class="btn btn-success ms-2"
                @click="activeBrand(brand)"
              >
                Active
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <ViewBrand :viewData="viewData" />
    <UpdateBrand :updateData="updateData" :getAllBrands="getAllBrands"/>
  </div>
</template>

<style scoped>
.table {
  margin: 1rem 10rem;
  width: 80%;
}
.table > :not(caption) > * > * {
  background-color: none;
}
.table button {
  padding: 0.3rem;
}
.add {
  background-color: #f4ce14;
  font-size: 1.3rem;
  margin: 1.5rem 0 0 86rem;
}

.add:hover,
.add:focus {
  background-color: #f4ce14;
  border-color: #f4ce14;
}
</style>
