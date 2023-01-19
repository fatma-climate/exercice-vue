<template>
  <q-card class="form-card">
    <q-card-section>
      <div class="text-h6 heading">{{ action }} Plat</div>
    </q-card-section>

    <q-form @submit.prevent="onSubmit">
      <q-card-section>
        <div class="row q-mb-md">
          <q-input 
            filled 
            label="Nom (Burger)" 
            class="col" 
            v-model="dishe.name"
            :rules="[
              () => $v.dishe.name.required || 'Le nom est requis',
              () => $v.dishe.name.maxLength || 'Doit contenir au maximum 20 caractères.',
            ]"/>
        </div>
  
        <div class="row q-mb-md">
          <q-input
            filled
            v-model="dishe.description"
            label="Description"
            type="textarea"
            class="col"
            :rules="[
              () => $v.dishe.description.maxLength || 'Doit contenir au maximum 135 caractères.',
            ]"/>
        </div>
  
        <div class="row q-mb-md">
          <q-input
            filled
            v-model="dishe.image"
            label="URL de l'image"
            class="col"
          />
          <q-img
            :src="dishe.image ? dishe.image : '../statics/image-placeholder.png'"
            class="q-ml-sm"
            contain
          />
        </div>
  
        <div class="q-mb-md">
          <div class="row">
            <p class="q-mb-none">Note:</p>
          </div>
          <div class="row">
            <q-rating v-model="dishe.note" size="2em" color="orange" />
          </div>
        </div>
      </q-card-section>
  
      <q-card-actions align="right">
        <q-btn label="Annuler" color="grey" v-close-popup />
        <q-btn label="Sauver" type="submit" color="primary"/>
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script>
import { 
  required,
  maxLength
} from 'vuelidate/lib/validators';

export default {
  props: {
    infos: {
      type: Object,
      default: () => {}
    },
    action: {
      type: String,
      required
    }
  },
  data() {
    return {
      dishe: this.initFormData()
    };
  },
  validations: {
    dishe: {
      name: { 
        required,
        maxLength: maxLength(20)
      },
      description: {
        maxLength: maxLength(135)
      },
    }
  },
  methods: {
    initFormData() {
      let disheObj = {
        nom: "",
        description: "",
        note: 1,
        image: ""
      }
      if (this.infos && Object.keys(this.infos).length !== 0) {
        disheObj = Object.assign(disheObj, this.infos)
      }
      return disheObj
    },
    onSubmit() {
      if (!this.$v.$invalid) {
        let message = ""
        if (this.action === 'add') {
          this.$store.dispatch('tasks/addDishe', this.dishe);
          message = 'Plat ajouté avec succès'
        } else if (this.action === 'modifier') {
          this.$store.dispatch('tasks/updateDishe', this.dishe);
          message = 'Plat mis à jour avec succès';
        }
        this.$emit('close-dialog')
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: message
        })
      }
    }
  }
};
</script>

<style>
.form-card {
  min-width: 400px;
}
.form-card .heading {
  text-transform: capitalize;
}
.form-card .q-card-section {
  width: 100%;
}
.thumbnail {
  max-width: 50px;
  max-height: 50px;
}
.form-card .q-img {
  height: 56px;
  width: 56px;
  border-radius: 10px;
}
.form-card .q-img__image {
  background-size: cover !important;
}
.form-card .q-rating__icon {
  opacity: 0.2;
}
.form-card .q-rating__icon--active {
  opacity: 1;
}
</style>
