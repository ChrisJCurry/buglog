<template>
  <div class="container-fluid py-2 py-md-0">
    <div class="row">
      <div class="card card-decoration col-10 offset-1 offset-md-0 col-md-12">
        <div class="row text-center">
          <div class="col-12 col-md-6 border-right border-sm-bottom align-text-md-center">
            <div class="d-md-none">
              <h3><span class="border-sm-bottom">Issue</span></h3>
            </div>
            <router-link :to="{name: 'BugDetails', params: {id: bug.id}}">
              <div class="card-body">
                <div class="card-title">
                  <h4>{{ bug.title }}</h4>
                </div>
              </div>
            </router-link>
          </div>
          <div class="col-12 col-md-4 border-sm-bottom border-right align-text-md-center">
            <div class="d-md-none">
              <h3><span class="border-sm-bottom">Reported By</span></h3>
            </div>
            <div v-if="bug.creator" class="card-body">
              <div>
                <h5>{{ bug.creator.name }}</h5>
                <img :src="bug.creator.picture" alt="Creator" />
              </div>
            </div>
          </div>
          <div class="col-12 col-md-2 border-right align-text-md-center">
            <div class="d-md-none">
              <h3><span class="border-sm-bottom">Status</span></h3>
            </div>
            <div v-if="bug">
              <div v-if="bug.closed" class="card-body">
                <h3><span class="text-danger">CLOSED</span></h3>
              </div>
              <div v-else class="card-body">
                <h3><span class="text-success">OPEN</span></h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { bugsService } from '../services/BugsService'

export default {
  name: 'Bug',
  props: {
    bug: {
      type: Object, required: true
    }
  },
  setup(props) {
    const state = reactive({
      bugs: computed(() => AppState.bugs),
      user: computed(() => AppState.user)
    })
    return {
      state,
      getDate(id) {
        bugsService.getDate(id)
      }
    }
  }
}
</script>

<style scoped>
  .align-text-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media(max-width:767px) {
    .border-sm-bottom {
      border-bottom: 1px solid black;
    }

    .card-decoration {
      filter: drop-shadow(5px 3px 6px #000);
    }
  }

  @media(min-width: 768px) {
    .align-text-md-center {
      display: flex;
    align-items: center;
    justify-content: center;
    }
  }

</style>
