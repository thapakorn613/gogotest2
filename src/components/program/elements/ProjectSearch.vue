<template>
  <div>
    <div v-if="projects" class="cards-container">
      <vuestic-card stripe="success" v-for="record in projects" :key="record.id">
        <!-- ===================== View Project Details ===================== -->
        <project-view :record="record" 
        />
  
      </vuestic-card>
    </div>
    <button v-if="!paging.end" @click="loadMore()">Load</button>
  </div>
</template>

<script>
  import ProjectView from './ProjectView'
  import fb from 'services/firebaseConfig'
  
  export default {
    name: 'project-search',
    components: {
      ProjectView
    },
    props: [],
    data () {
      return {
        projects: [],
        paging: {
          per_page: 10,
          end: false,
          loading: false
        },
        ref: {
          projects: null,
          projectsNext: null
        }
      }
    },
    created () {
      /* Set common Firestore reference */
      this.ref.projects = fb.projectsCollection.orderBy('updatedAt', 'desc')
  
      /* Load first page */
      const firstPage = this.ref.projects.limit(this.paging.per_page)
      this.handleProjects(firstPage)
    },
    methods: {
      loadMore () {
        if (this.paging.end) {
          return
        }
  
        this.paging.loading = true
        this.handleProjects(this.ref.projectsNext).then((documentSnapshots) => {
          this.paging.loading = false
  
          if (documentSnapshots.empty) {
            /* If there is no more questions to load, set paging.end to true */
            this.paging.end = true
          }
        })
      },
      handleProjects (ref) {
        /*
        Fetch questions of given reference
        */
        return new Promise((resolve, reject) => {
          ref.get().then((documentSnapshots) => {
            /* If documentSnapshots is empty, then we have loaded all of pages */
            if (documentSnapshots.empty) {
              this.paging.end = true
              resolve(documentSnapshots)
            }
  
            documentSnapshots.forEach((doc) => {
              let questionData = doc.data()
              questionData.id = doc.id
              this.projects.push(questionData)
            })
  
            /* Build reference for next page */
            const lastVisible = documentSnapshots.docs[documentSnapshots.size - 1]
  
            if (!lastVisible) {
              return
            }
  
            this.ref.projectsNext = this.ref.projects
              .startAfter(lastVisible)
              .limit(this.paging.per_page)
  
            resolve(documentSnapshots)
          })
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
$singleGutter: #{(19/16)}rem;
.vuestic-modal .modal-content {
  border-radius: 12px;
}
.cards-container {
  display: flex;
  flex-wrap: wrap;
  margin: -$singleGutter;
  align-items: flex-start;
}
</style>
