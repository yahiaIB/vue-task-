<template>
    <section class="hero bg-img is-fullheight">
        <edit-user :user='updatedUserData' v-on:userUpdatedData="updateUserData"></edit-user>
        <div class="hero-body">
            <div class="container">
                <div class="columns is-centered">
                    <div class="column is-5-tablet is-4-desktop is-7-widescreen">
                        <div class="table-container">
                            <table class="table">
                                <thead>
                                <tr>
                                    <th><abbr title="Position">Id</abbr></th>
                                    <th>Avatar</th>
                                    <th>First Name</th>
                                    <th><abbr title="Played">Last Name</abbr></th>
                                    <th><abbr title="Won">Email</abbr></th>
                                    <th><abbr title="Won">Actions</abbr></th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="user in users.data" v-bind:key='user.id'>
                                    <th>{{user.id}}</th>
                                    <th>
                                        <figure class="image is-48x48">
                                            <img class="is-rounded" v-bind:src='user.avatar'>
                                        </figure>
                                    </th>
                                    <th>{{user.first_name}}</th>
                                    <th>{{user.last_name}}</th>
                                    <th>{{user.email}}</th>
                                    <th>
                                        <div class="buttons">
                                            <button class="button is-primary" v-on:click="updateUser(user)">
                                                Edit
                                            </button>
                                            <button class="button is-danger" v-on:click="deleteUser(user)">Delete
                                            </button>
                                        </div>
                                    </th>
                                </tr>
                                </tbody>
                            </table>
                            <nav class="pagination" role="navigation" aria-label="pagination">
                                <h3><b>Pages : </b></h3>
                                <ul class="pagination-list">
                                    <li v-for="page in users.total_pages" v-bind:key="page">
                                        <a class="pagination-link is-current" aria-label="Page 1" aria-current="page"
                                           v-on:click="onChangeItems(page)">{{page}}</a>
                                    </li>

                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import EditUser from "@/components/editUser";

    export default {
        name: 'HelloWorld',
        components: {EditUser},
        data() {
            return {
                users: {},
                updatedUserData: {},
            }
        },
        props: {
            msg: String
        },
        methods: {
            getUsers: async function (pagination) {
                let res = await this.axios.get('https://reqres.in/api/users?page=' + pagination);
                if (res.status === 200) {
                    await this.$store.dispatch('users', res.data);
                    this.users = this.$store.state.users;
                }
            },
            updateUser: async function (user) {
                this.updatedUserData = JSON.parse(JSON.stringify(user));
                await this.$store.commit('activePopUp');
            },
            updateUserData: async function (value) {
                for (let i = 0; i < this.users.data.length; i++) {
                    if (this.users.data[i].id === value.id) {
                        this.users.data[i].first_name = value.first_name;
                        this.users.data[i].last_name = value.last_name;
                        await this.$store.commit('setUsers', this.users);
                        break;
                    }
                }
            },
            deleteUser: async function (userToDelete) {
                if (window.confirm(`Are you sure you want to delete ${userToDelete.first_name}`)) {
                    await this.axios.delete('https://reqres.in/api/users/' + userToDelete.id);
                    let users = [];
                    for (let i = 0; i < this.users.data.length; i++) {
                        if (this.users.data[i].id !== userToDelete.id) {
                            users.push(this.users.data[i]);
                        }
                    }
                    this.users.data = users;
                    await this.$store.commit('setUsers', this.users);
                }
            },
            onChangeItems: async function (pagination) {
                await this.getUsers(pagination);
            }
        },
        mounted: async function () {
            await this.getUsers(1);
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .bg-img {
        background-image: url('../assets/images/login-background.png');
        background-position: center center;
        background-repeat: no-repeat;
        background-attachment: fixed;
        background-size: cover;
        background-color: #999;
    }

    .table {
        border-radius: 15px;
    }

    .table-container {
        background-color: white;
        padding: 10px;
        border-radius: 15px;
    }

    .pagination {
        padding: 10px;
    }
</style>
