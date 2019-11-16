<template>
    <div class="modal" v-bind:class="this.$store.state.is_Active">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Update User</p>
                <button class="delete" aria-label="close" v-on:click="$store.commit('deActivePopUp')"></button>
            </header>
            <form @submit="updateUser" action="">
                <section class="modal-card-body">
                    <div class="field">
                        <label class="label">First Name</label>
                        <div class="control has-icons-left">
                            <input type="text" placeholder="eve.holt@reqres.in" v-model="user.first_name"
                                   class="input"
                                   required>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Last Name</label>
                        <div class="control has-icons-left">
                            <input type="text" placeholder="cityslicka" v-model="user.last_name"
                                   class="input"
                                   required>
                        </div>
                    </div>
                </section>
                <footer class="modal-card-foot">
                    <button class="button is-success" type="submit">Save changes</button>
                    <button class="button" v-on:click="$store.commit('deActivePopUp')" type="button">Cancel</button>
                </footer>
            </form>

        </div>
    </div>
</template>

<script>
    export default {
        name: "editUser",
        props: {
            user: Object,
            updateUsersList: Object
        },
        methods: {
            updateUser: async function (e) {
                e.preventDefault();
                let res = await this.axios.put('https://reqres.in/api/users/' + this.user.id, this.user);
                if (res.status === 200) {
                    await this.$emit('userUpdatedData', this.user);
                    await this.$store.commit('deActivePopUp');
                }
            }
        }
    }
</script>

<style scoped>

</style>
