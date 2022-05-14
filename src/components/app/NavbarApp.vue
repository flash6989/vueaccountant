<template>
  <nav class="navbar orange lighten-1">
      <div class="nav-wrapper">
        <div class="navbar-left">
          <a href="#"  @click="$emit('toggleBar')">
            <i class="material-icons black-text">dehaze</i>
          </a>
          <span class="black-text">{{date}}</span>
        </div>

        <ul class="right hide-on-small-and-down">
          <li>
            <a
                class="dropdown-trigger black-text"
                href="#"
                data-target="dropdown"
                ref="dropdown"
            >
              {{name}}
              <i class="material-icons right">arrow_drop_down</i>
            </a>

            <ul id='dropdown' class='dropdown-content'>
              <li>
                <router-link to="/profile" class="black-text">
                  <i class="material-icons">account_circle</i>Профиль
                </router-link>
              </li>
              <li class="divider" tabindex="-1"></li>
              <li>
                <a href="#" class="black-text" @click.prevent="logOut">
                  <i class="material-icons">assignment_return</i>Выйти
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
</template>
<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      date: null,
      interval: null,
      dropdown: null,
    };
  },
  methods: {
    ...mapActions(['logout']),
    async logOut() {
      await this.logout();
      this.$router.push('/login?message=logout');
    },
  },
  computed: {
    name() {
       return this.$store.getters.info.name
    }
  },
  mounted() {
    const options = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    };
    this.date = new Intl.DateTimeFormat('ru-RU', options).format(new Date());
    this.interval = setInterval(() => {
      this.date = new Intl.DateTimeFormat('ru-RU', options).format(new Date());
    }, 1000);
    this.dropdown = window.M.Dropdown.init(this.$refs.dropdown, {
      constrainWidth: true,
    });
  },
  beforeUnmount() {
    clearInterval(this.interval);
    if (this.dropdown && this.dropdown.destroy()) {
      this.dropdown.destroy();
    }
  },
};
</script>
