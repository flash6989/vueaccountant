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
      <router-link class="btn-floating btn-large blue" to="/record">
        <i class="large material-icons">add</i>
      </router-link>
    </div>
</div>
</template>

<script>
import Navbar from '@/components/app/NavbarApp.vue';
import Sidebar from '@/components/app/SidebarApp.vue';

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
      console.log(this.$store, 'this.$store.getters.info')
      await this.$store.dispatch('fetchInfo')
    }
  },
};
</script>
