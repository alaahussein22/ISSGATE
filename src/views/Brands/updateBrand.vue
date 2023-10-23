<script setup>
const props = defineProps({
  updateData: {
    type: Object,
    required: true,
  },
  getAllBrands: {
    type: Function,
    required: true,
  },
});

const brandData = computed(() => {
  return props.updateData;
});
import { watchEffect } from "@vue/runtime-core";

import { computed, ref } from "vue";
import { useBrandsStore } from "../../stores/index";
const store = useBrandsStore();

const languages = ref([]);
const img = ref(null);

const uploadImg = (e) => {
  if(e.target.files[0]){
    img.value = e.target.files[0];

  }else{
    img.value=brandData.image
  }
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

watchEffect(getLanguages);

const onSubmit = () => {
  if(!img){
    img.value=brandData.image
  }
  store
    .updateBrand(brandData.value.id, {
      Image: img.value,
      NameByLang: brandData.value.nameByLang,
    })
    .then((res) => {
      if (res) {
        data.value = res.data.data;
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
</script>

<template>
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Update Brand</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <img :src="brandData.image" />
          <div class="mb-3">
            <label for="formFile" class="form-label">Image</label>
            <input
              class="form-control"
              type="file"
              id="formFile"
              @change="uploadImg"
              accept="image/png, image/jpeg, image/bmp"
            />
          </div>

          <form @submit.prevent="onSubmit" class="mt-5">
            <div class="mb-3">
              <h5 class="mb-4 mt-1">Languages</h5>

              <div
                v-for="(item, index) in brandData.nameByLang"
                :key="index"
                class="d-flex"
              >
                <div class="mb-3">
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    v-model="item.langId"
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
                  />
                </div>
              </div>
            </div>

            <button class="btn add me-1" type="submit">Save</button>
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-content {
  width: 40rem;
}

.modal-header,
.add {
  background-color: #f4ce14;
}
img {
  border-radius: 50%;
  height: auto;
  justify-content: center;
  margin: 1rem 7rem;
}
</style>
