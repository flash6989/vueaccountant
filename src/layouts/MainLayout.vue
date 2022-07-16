<template>
    <div class="app-main-layout">

    <Navbar @toggleBar="isOpen = !isOpen" />

    <Sidebar :toggle="isOpen" />

    <main class="app-content" :class="{full: !isOpen}">
      <div class="app-page">
          <router-view />
      </div>
    </main>

    <div class="fixed-action-btn">
      <router-link class="btn-floating btn-large blue" to="/record" v-tooltip="'Создать новую запись'" data-position="left">
        <i class="large material-icons">add</i>
      </router-link>
    </div>
</div>
</template>

<script>
import Navbar from '@/components/app/NavbarApp.vue';
import Sidebar from '@/components/app/SidebarApp.vue';
import messages from '@/utils/messages'

export default {
  name: 'main-layout',
  components: {
    Navbar,
    Sidebar,
  },
  data() {
    return {
      isOpen: true,
    };
  },
  async mounted() {
    if(!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo')
    }
  },
  computed: {
    error() {
      return this.$store.getters.error
    },
  },
  watch: {
      error(fbError) {
        this.$error(messages[fbError] || 'Чтото пошло не так')
      }
    }
};
</script>
