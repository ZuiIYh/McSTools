<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
onMounted(() => {
  router.go(-1); 
});
</script>
<template>
  <div class="loading-spinner"></div>
</template>