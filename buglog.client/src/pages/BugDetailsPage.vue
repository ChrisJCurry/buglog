<template>
  <div class="container-fluid" v-if="state.bug">
    <div class="row">
      <div class="col-1 pl-5">
        Title
      </div>
    </div>
    <div class="row">
      <div class="col-12 pl-5">
        <h1>{{ state.bug.title }}</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-sm-7 pl-5" v-if="state.bug.creator">
        <span>Reported by: </span> <span><h3>{{ state.bug.creator.email }}</h3></span>
      </div>
      <div class="col-12 col-sm-3 offset-sm-1 pl-4">
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
    <div v-if="state.bug">
      <div v-if="state.bug.creator">
        <div class="row my-3" v-if="state.bug.creator.email === state.user.email">
          <div class="col col-md-4 offset-md-6 text-right" v-if="!state.bug.closed">
            <button type="button" class="btn btn-danger" @click="close">
              Close Bug
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onBeforeMount, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
import { bugsService } from '../services/BugsService'
export default {
  name: 'BugDetails',
  setup() {
    const route = useRoute()
    const state = reactive({
      bug: computed(() => AppState.bug),
      user: computed(() => AppState.user)
    })
    onMounted(() => {
      bugsService.getById(route.params.id)
    })
    onBeforeMount(() => {
      AppState.bug = {}
    })
    return {
      state,
      route,
      async close() {
        bugsService.delete(state.bug._id)
      }
    }
  }
}
</script>

<style scoped lang="scss">

</style>
