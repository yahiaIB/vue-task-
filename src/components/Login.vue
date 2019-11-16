<template>
    <section class="hero bg-img is-fullheight">
        <div class="hero-body">
            <div class="container">
                <div class="columns is-centered">
                    <div class="column is-5-tablet is-4-desktop is-4-widescreen">

                        <form @submit="checkForm" action="" class="box">
                            <div class="title container">
                                Login
                            </div>
                            <div class="field">
                                <label class="label">Email</label>
                                <div class="control has-icons-left">
                                    <input type="email" placeholder="eve.holt@reqres.in" v-model="loginData.email"
                                           class="input"
                                           required>
                                    <span class="icon is-small is-left">
                  <i class="fa fa-envelope"></i>
                </span>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">Password</label>
                                <div class="control has-icons-left">
                                    <input type="password" placeholder="cityslicka" v-model="loginData.password"
                                           class="input"
                                           required>
                                    <span class="icon is-small is-left">
                  <i class="fa fa-lock"></i>
                </span>
                                </div>
                            </div>
                            <div class="container">
                                <div class="field  is-centered">
                                    <button class="button is-success">
                                        Login
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                loginData: {
                    email: '',
                    password: ''
                },
            }
        },
        methods: {
            checkForm: async function (e) {
                e.preventDefault();
                let res = await this.axios.post(' https://reqres.in/api/login', this.loginData);
                if (res.status === 200) {
                    this.$store.commit('login', res.data);
                    localStorage.setItem('token', res.data.token);
                    this.$router.push('/home');
                }

            }
        }
    }

</script>

<style scoped>
    .bg-img {
        background-image: url('../assets/images/login-background.png');
        background-position: center center;
        background-repeat: no-repeat;
        background-attachment: fixed;
        background-size: cover;
        background-color: #999;
    }

    .title {
        text-align: center;
    }
</style>
