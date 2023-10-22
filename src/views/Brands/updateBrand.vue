<script setup>
const props = defineProps({
  getAllBrands: {
    type: Function,
    required: true,
  },
});
import { ref } from "vue";
import { useBrandsStore } from "../../stores/index";
import { watchEffect } from "@vue/runtime-core";
const store = useBrandsStore();
const newBrands = ref([]);
const Image = ref("");
const langId = ref("");
const value = ref("");
const img = ref("");
const languages = ref([]);
const NameByLang = ref([
  {
    langId: langId.value,
    value: value.value,
  },
]);

const uploadImg = (e) => {
  img.value = e.target.files[0].name;
  console.log(img.value);
};

// get Languages
const getLanguages = () => {
  store
    .getLanguages()
    .then((response) => {
      languages.value = response.data.data;
    })
    .catch((error) => {
      console.error(error);
    });
};

const onSubmit = () => {
  store
    .addBrand({
      NameByLang: NameByLang.value,
      Image: img.value,
    })
    .then((response) => { 
      newBrands.value = response;
      props.getAllBrands();
    })
    .catch((error) => {
      console.error(error);
    });
};

watchEffect(getLanguages);
</script>

<template>
  <div class="add-body">
    <div class="offcanvas-header">
      <h2 class="offcanvas-title" id="offcanvasRightLabel">Add New Brand</h2>
    </div>
    <div class="mb-3">
      <label for="formFile" class="form-label">Image</label>
      <input
        class="form-control"
        type="file"
        id="formFile"
        @change="uploadImg"
      />
    </div>
    <form @click.prevent="onSubmit" class="mt-5">
      <div class="offcanvas-body">
        <div class="mb-3">
          <h5 class="mb-4 mt-1">Languages</h5>

          <div v-for="(item, index) in NameByLang" :key="index" class="d-flex">
            <div class="mb-3">
              <select
                class="form-select"
                aria-label="Default select example"
                v-model="item.langId"
                :for="`data[${index}]langId`"
              >
                <option
                  v-for="lang in languages"
                  :key="lang.id"
                  :value="lang.id"
                >
                  {{ lang.name }}
                </option>
              </select>
            </div>

            <div class="mb-3 ms-2 me-2">
              <input
                v-model="item.value"
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="value"
                :for="`data[${index}]value`"
              />
            </div>

            <div class="mb-3">
              <button
                class="btn btn-primary"
                size="x-small"
                @click="NameByLang.push({})"
              >
                <i class="fa-solid fa-plus" size="22"></i>
              </button>

              <button
                class="btn btn-danger ms-2"
                size="x-small"
                @click="NameByLang.splice(index, 1)"
              >
                <i class="fa-solid fa-trash" size="22"></i>
              </button>
            </div>
          </div>
        </div>

        <button class="btn add" type="submit">Add</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.add-body {
  width: 36rem;
  margin: 3rem auto;
}

.offcanvas-header {
  text-align: center;
  display: unset;
  margin: 1rem 0;
}

.add {
  width: 100%;
  padding: 0.5rem;
  margin: 1rem 0;
  background-color: #f4ce14;
  font-size: 1.3rem;
}
</style>
