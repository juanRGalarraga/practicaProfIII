const MAX_LENGTH_USER = 8;
const CHARS_NO_ACCEPT = ["0","1","2","3","4","5","6","7","8","9"];
const app = new Vue({
    el: '#app',
    created() {
        var placeHolderBaseUrl = 'https://jsonplaceholder.typicode.com/users';
        fetch(placeHolderBaseUrl)
            .then(response => response.json())
                .then(response => this.users = response );
    },
    data: {
        tarea: '',
        tareas: [],
        numero: '',
        users: [],
        estado: 'Ingrese su nombre de usuario',
        usuario: '',
        logged: false,
        mensaje: {
            in: 'Usuario logeado',
            out: 'Usuario no logeado'
        },
        title: '',
        ancho: 40,
        alto: 40,
        baseUrl : 'https://placekitten.com',
        urlJsonPlaceHolder: 'https://jsonplaceholder.typicode.com/todos'
    },
    methods: {
        NewTarea(){
            this.tareas.push(this.tarea);
            // this.tarea = "";
        },

        CheckChar(c){
            if(CHARS_NO_ACCEPT.indexOf(c) !== -1){
                return true;
            }
        },

        getLength(){
            return this.numero.length;
        },

        setUser(){
            axios.post(this.urlJsonPlaceHolder, {
                userId: Math.floor(Math.random() * 10) + 1,
                title: this.title
            })
            .then(response => {
                console.log(response);
                this.users.unshift({name: this.title});
                this.title = "";
            })
            .catch(error => console.log(error));
        }

    },

    computed: {
        getImage(){
            return  `${this.baseUrl}/${this.ancho * 3}/${this.alto * 3}`;
        },

        returnMessage(){
            return this.logged ? this.mensaje.in : this.mensaje.out;
        },

        checkLoggin(){
            return `logged-${ this.logged ? 'in' : 'out'}`;
        }
    },

    watch: {
        usuario(newValue, oldValue){
            console.log(newValue);
            if(newValue.length > MAX_LENGTH_USER){
                this.estado = "El nombre de usuario debe ser menor a "+MAX_LENGTH_USER;
                return false;
            }
            
            if(!isNaN(newValue)){
                this.estado = " El nombre de usuario no puede contener números";
                return;
            }

            this.estado = "Usuario correcto";
        }
    }
    
});