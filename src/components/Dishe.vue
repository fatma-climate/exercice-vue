<template>
  <q-card class="card">
    <q-img :src="disheImage" basic contain>
      <div class="absolute-bottom text-h6">
        {{ dishe.name }}
      </div>
    </q-img>

    <q-card-section>
      <q-rating
        :value="dishe.note"
        size="2em"
        color="orange"
        readonly
        class="q-mt-sm"
      />
    </q-card-section>

    <q-card-section v-if="dishe.description">
      {{ dishe.description }}
    </q-card-section>
    <q-card-section v-else>
      <i>Aucune description fournie</i>
    </q-card-section>

    <q-card-actions class="absolute-bottom" align="right">
      <q-btn @click="showFormDishe = true" icon="edit" color="blue" flat>Modifier</q-btn>
      <q-btn @click="deleteDishe()" icon="delete" color="red" flat>Supprimer</q-btn>
    </q-card-actions>

    <q-dialog v-model="showFormDishe">
      <form-dishe action="modifier" :infos="dishe" @close-dialog="showFormDishe = false"/>
    </q-dialog>
  </q-card>
</template>

<script>
export default {
  props: ["dishe"],
  data() {
    return {
      showFormDishe: false
    };
  },
  components: {
    "form-dishe": require("components/FormDishe.vue").default
  },
  computed: {
    disheImage() {
      return this.dishe && this.dishe.image ? this.dishe.image : '../statics/image-placeholder.png'
    }
  },
  methods: {
    deleteDishe() {
      this.$q.dialog({
        title: 'Supprimer le plat',
        message: 'Voulez-vous vraiement supprimer ce plat ?',
        cancel: 'Annuler',
        ok: 'Supprimer',
        persistent: true
      }).onOk(() => {
        if (this.dishe.id) {
          this.$store.dispatch('tasks/deleteDishe', this.dishe.id);
        }
      })
    }
  },
};
</script>

<style>
.card {
  min-height: 400px;
  max-width: 250px;
  width: 250px;
  transition: background 0.3s;
}
.card-clickable {
  cursor: pointer;
}
.card-clickable:hover {
  background: #bdbdbd !important;
}
.card .q-img {
  max-height: 180px;
}
.card .q-img__image {
  background-size: cover !important;
}
.card .q-rating__icon {
  opacity: 0.2;
}
.card .q-rating__icon--active {
  opacity: 1;
}
</style>
