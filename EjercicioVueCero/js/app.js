const app = new Vue({
    el: '#app',
    created(){
        axios.get(this.urlJsonPlaceHolder)
        .then(response => {

            //Obtengo la lista de usuarios que llegan por API
            this.users = response.data.map(usuario => usuario.name);

            //Hago una copia ordenada del array
            this.usersOrdenados = this.users.slice().sort();
        })
        .catch(error => console.log(error));  
    },
    data: {
        urlJsonPlaceHolder: 'https://jsonplaceholder.typicode.com/users',
        users:[],
        usersOrdenados: [],
        usersSelected: [],
        success: false,
        finish: false,
        start: false,
        i: 0,
        timeOutput: '00:00:00',
        msgOutput: ''
    },

    methods: {

        /**
         * Captura el elemento seleccionado por el usuario en la lista desordenada.
         * El juego comienza con el índice "i" en cero. A medida que el usuario acierta en la selección de nombres el índice aumenta, caso contrario se queda igual. Esto determina cuál es el elemento que  sigue en la lista ordenada.
         * @param string itemSeleccionado : Elemento clickeado por el usuario 
         * @param int index : Indice del elemento clickeado
         */
        
        SeleccionarItem(itemSeleccionado, index){          
            if(itemSeleccionado == this.usersOrdenados[this.i]){

                //Coloco el elemento seleccionado en otro array
                this.usersSelected.push(itemSeleccionado); 

                //Luego lo elimino del array desordenado
                this.users.splice(index, 1);
                
                //Para activar la clase bootstrap y mostrar el mensaje al usuario
                this.success = true;

                //Muestro mensaje y luego lo borro
                this.msgOutput = "Es correcto. ¡Continúa!";
                setTimeout(e=>{ this.msgOutput = ""}, 2000);

                //Aumento el índice
                this.i++;

            } else {
                //Caso contrario, sólo muestro mensaje al usuario
                this.msgOutput = "Es incorrecto. ¡Intenta de nuevo!"
                this.success = false;
                setTimeout(e=>{ this.msgOutput = ""}, 2000);
            }
        },

        /**
         * Se encarga de inicializar el timer
         */

        EmpezarJuego(){

            //Reinicio el interval
            clearInterval(this.t);

            //Desordeno el array
            this.users = this.DesordenarArray(this.users);

            //Inicio el timer
            let t = new Date('Jan 5, 2022 00:00:00');

            //Inicializo la cantidad de segundos que se van a ir agregando
            let i = 0;

            //String para mostrar en pantalla el tiempo transcurrido
            this.timeOutput = this.FormatoTiempo(t);

            //Inicio el interval
            this.t = setInterval(e => {
                i++;   

                //Si los segundos superan el minuto reinicio el contador
                if (i > 60) { i = 1 }; 

                //Seteo segundos
                t.setSeconds(i);        

                //Actualizo el timer que se muestra en pantalla
                this.timeOutput = this.FormatoTiempo(t);   

            }, 1000);

            //Coloco la variable en true para indicar que el juego comenzó
            this.start = true; 
        }, 

        /**
         * Se le pasa como parámetro un arreglo que contiene elementos y los desordena de manera aleatoria
         * @param array arr 
         * @returns true/false
         */

        DesordenarArray(arr){
            
            //Si el array tiene 0 o 1 elemento retorno.
            if(arr.length < 1){
                return false;
            }

            let usersDesordenados = [];
            let user = {
                index: '',
                name: ''
            };

            for (var i = 0; i < arr.length; i++) {

                //Coloco un índice aleatorio para cada elemento en el array
                user = {    
                    index : Math.floor(Math.random() * 100) + 1,
                    name : arr[i]
                };

                //Lo coloco en mi variable local
                usersDesordenados.push(user);
            }

            //Ordeno por índice
            usersDesordenados.sort((a, b) => {
                return a.index - b.index;
            });

            //Del array de objetos sólo me quedo con los nombres
            arr = [];
            for (let i = 0; i < usersDesordenados.length; i++) {
                const e = usersDesordenados[i].name;
                arr.push(e);
            }

            return arr;
        },


        /**
         * Se le pasa un objeto Date y lo formatea en HH:mm:AA para mostrar en pantalla
         * @param Object t : Objeto Date 
         * @returns string : Tiempo formateado
         */

        FormatoTiempo(t){

            if(!t instanceof Date){
                return false;
            }

            let h = t.getHours();
            let m = t.getMinutes();
            let s = t.getSeconds();
            return ("0"+h).substr(-2) + ':' + ("0"+m).substr(-2) + ':' + ("0"+s).substr(-2);
        },
    },
    watch: {
        users(val){
            if(val.length == 0){
                this.finish = true;
                clearInterval(this.t);
            }
        }
    }
});