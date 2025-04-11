<script setup lang="ts">
const props = defineProps({
  lastUpdated: {
    type: Date,
    required: true,
  },
});
</script>

<template>
  <div class="last-updated">
    Last updated on
    {{
      lastUpdated.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      })
    }}
    {{ lastUpdated.toLocaleTimeString('en-US', { timeStyle: 'short', hour12: false }) }}
  </div>
</template>

<style scoped>
.last-updated {
  position: sticky;
  inset-block-end: 0;
  padding: 0 0.5rem;
  background: #37c;
  color: #fff;
  text-align: right;
}
</style>
