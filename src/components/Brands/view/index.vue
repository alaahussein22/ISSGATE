<script setup>
const props = defineProps({
  viewData: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div
    class="modal fade"
    id="staticBackdrop"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">
            Brand Details
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <!-- <img :src="props.viewData.image" v-if="props.viewData.image" /> -->
          <img src="../../../assets/photo.jpg" v-if="props.viewData.image" />

          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <strong>ID:</strong> {{ props.viewData.id }}
            </li>
            <li class="list-group-item">
              <strong>Name:</strong> {{ props.viewData.name }}
            </li>
            <li class="list-group-item">
              <strong>createdAt:</strong> {{ props.viewData.createdAt }}
            </li>
            <li class="list-group-item">
              <strong>isActive:</strong> {{ props.viewData.isActive }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-header {
  background-color: #f4ce14;
}
img {
  border-radius: 50%;
  height: auto;
  justify-content: center;
  margin: 1rem 7rem;
  width: 50%;
}
</style>
