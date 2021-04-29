const userCard = {
    template: '#user-card',
    props: {
        photo: {
            type: String,
            default: 'imgs/empty-photo.png'
        },
        titlePhoto: {
            type: String,
            default: ''
        },
        titleCard: {
            type: String,
            default: ''
        },
        linkCard: {
            type: String,
            default: ''
        },
        linkName: {
            type: String,
            default: ''
        }
    }
}

new Vue({
    el: '#app-root',
    components: {
        userCard
    },
    data: {
        usuarios: [
            { nombre: "Ernesto", apellido: "Villalba"},
            { nombre: "Ernesto", apellido: "Villalba"},
            { nombre: "Ernesto", apellido: "Villalba"},
            { nombre: "Ernesto", apellido: "Villalba"}
        ]
    },
});

Vue.config.devtools = true;