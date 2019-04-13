<template>
  <div class="container py-5" v-on:keyup.enter="validateForm">
    <div class="row">
      <div class="col-md-12">
        <div class="row">
          <div class="col-md-10 mx-auto">
            <div class="card border-secondary">
              <div class="card-header">
                <h3 class="mb-0 my-2">Dodawanie newsa</h3>
              </div>
              <div class="form" role="form">
                <div class="row card-body pb-0">
                  <div class="form-group col-md-12">
                    <label for="inputTitle">Tytuł <span class="required">*</span></label>
                    <input type="text" class="form-control" id="inputTitle"
                           placeholder="Popsuł się autobus, nigdzie nie pojedziecie"
                           name="inputTitle"
                           v-validate="'required'"
                           :class="{'is-invalid': errors.has('inputTitle')}"
                           v-model="news.title"
                           data-vv-as="tytuł">
                    <transition enter-active-class="animated fadeIn">
                      <span v-show="errors.has('inputTitle')"
                            class="invalid-feedback">{{ errors.first('inputTitle') }}</span>
                    </transition>
                  </div>
                </div>
                <div class="row card-body pb-0 pt-0">
                  <div class="form-group col-md-12">
                    <label for="inputBody">Treść<span class="required">*</span></label>
                    <textarea class="form-control" id="inputBody" placeholder="Treść newsa"
                              rows="8"
                              name="inputBody"
                              v-validate="'required'"
                              :class="{'is-invalid': errors.has('inputBody')}"
                              v-model="news.body"
                              data-vv-as="treść newsa">
                    </textarea>
                    <transition enter-active-class="animated fadeIn">
                      <span v-show="errors.has('inputBody')"
                            class="invalid-feedback">{{ errors.first('inputBody') }}</span>
                    </transition>
                  </div>
                </div>
                <div class="row card-body">
                  <div class="col-md-12">
                    <div class="text-center">
                      <button @click="validateForm" class="btn btn-success btn-lg">Dodaj</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      news: {
        title: '',
        date: '',
        body: ''
      }
    }
  },
  methods: {
    validateForm () {
      this.$validator.validateAll()
        .then((result) => {
          if (result) {
            this.news.date = '2013-02-08T09:30:26Z'
            this.addNews(this.news)
          }
        })
    },
    addNews (data) {
      this.$store.dispatch('addNews', data)
    }
  }
}
</script>

<style scoped>
</style>
