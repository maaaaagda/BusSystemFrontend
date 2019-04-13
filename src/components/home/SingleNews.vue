<template>
  <div class="container px-0">
    <div class="card mb-3">
      <div class="card-body">
        <h5 class="card-title"> {{this.title}} </h5>
        <p class="card-text card-height"> {{this.newsBody}}</p>
        <p class="card-text"><small class="text-muted"> {{this.newsDateTime}}</small></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'newsBody', 'newsDateTime']
}
</script>

<style>
  .card-height {
    min-height: 100px;
  }
</style>
