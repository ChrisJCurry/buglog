<template>
  <div class="container-fluid" v-if="state.bug">
    <div class="row">
      <div class="col-1">
        Title
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        <h1>{{ state.bug.title }}</h1>
      </div>
    </div>
    <div class="row">
      <div class="col" v-if="state.bug.creator">
        <span>Reported by: </span> <span><h3>{{ state.bug.creator.email }}</h3></span>
      </div>
      <div class="col-3">
        <div v-if="state.bug.closed" class="card-body">
          <h3>Status: <span class="text-danger">CLOSED</span></h3>
        </div>
        <div v-else class="card-body">
          <h3>Status: <span class="text-success">OPEN</span></h3>
        </div>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-10 offset-1 mx-5 mt-4 border border-dark">
        <p class="m-3">
          {{ state.bug.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
import { bugsService } from '../services/BugsService'
export default {
  name: 'BugDetails',
  setup() {
    const route = useRoute()
    const state = reactive({
      bug: computed(() => AppState.bug)
    })
    onMounted(() => {
      bugsService.getById(route.params.id)
    })
    return {
      state, route
    }
  }
}
</script>

<style scoped lang="scss">

</style>
