<template>
  <q-page class="q-pa-lg">
    <div class="row q-gutter-lg">

      <dishe v-for="dishe in dishes" :key="dishe.id" :dishe="dishe" />

      <add-button @click="showFormDishe = true" />

      <q-dialog v-model="showFormDishe">
        <form-dishe action="add" @close-dialog="showFormDishe = false"/>
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      showFormDishe: false
    };
  },
  components: {
    dishe: require("components/Dishe.vue").default,
    "add-button": require("components/AddButton.vue").default,
    "form-dishe": require("components/FormDishe.vue").default
  },
  computed: {
    ...mapGetters({
      dishes: 'tasks/dishes',
    })
  },
  beforeCreate() {
    this.$store.dispatch('tasks/initialiseStore');
  }
};
</script>
