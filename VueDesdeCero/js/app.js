const app = new Vue({
    el: '#app',
    created(){
        axios.get(this.urlBase)
        .then(response => {

            //Obtengo la lista de usuarios que llegan por API
            this.listadoBase = response.data.map(listado => listado.name);

            //Hago una copia ordenada del array
            this.listadoOrdenado = this.listadoBase.slice().sort();

        })
        .catch(error => console.log(error));  
    },

    data: {
        urlBase: 'https://jsonplaceholder.typicode.com/users',
        listadoBase: [],
        listadoOrdenado: [],
        listadoOrdenUsuario: [],
        timer: null,
        correcto: false,
        incorrecto: false,
        finalizar: false,
        empezar: true,
        listadoOrdenadoIndex: 0,
        tiempoPantalla: '00:00:00',
        mensajePantalla: '',
    },

    methods: {

        /**
         * Captura el elemento seleccionado por el usuario en la lista desordenada.
         * El juego comienza con el índice "i" en cero. A medida que el usuario acierta en la selección de nombres el índice aumenta, caso contrario se queda igual. Esto determina cuál es el elemento que  sigue en la lista ordenada.
         * @param string itemSeleccionado : Elemento clickeado por el usuario 
         * @param int index : Indice del elemento clickeado
         */
        
        SeleccionarItem(itemSeleccionado, indice){          
            if(itemSeleccionado == this.listadoOrdenado[this.listadoOrdenadoIndex]){

                //Coloco el elemento seleccionado en otro array
                this.listadoOrdenUsuario.push(itemSeleccionado); 

                //Luego lo elimino del array desordenado
                this.listadoBase.splice(indice, 1);
                
                //Para activar la clase bootstrap y mostrar el mensaje al usuario
                this.correcto = true;
                this.incorrecto = false;

                //Muestro mensaje y luego lo borro
                this.mensajePantalla = "Es correcto. ¡Continúa!";

                //Aumento el índice
                this.listadoOrdenadoIndex++;

            } else {
                //Caso contrario, sólo muestro mensaje al usuario
                this.correcto = false;
                this.incorrecto = true;
                
                this.mensajePantalla = "Es incorrecto. ¡Intenta de nuevo!"
            }
        },

        /**
         * Se encarga de inicializar el timer
         */

        InicializarJuego(){

            if(typeof this.timer !== "null"){ clearInterval(this.timer) }

            //Inicio el timer
            let tiempoInicio = new Date('Jan 5, 2022 00:00:00');

            //Inicializo la cantidad de segundos que se van a ir agregando
            let i = 1;

            //String para mostrar en pantalla el tiempo transcurrido
            // this.tiempoPantalla = this.FormatearTiempo(tiempoInicio);
           
            //Inicio el interval
            this.timer = setInterval(e => {
        
                //Seteo segundos
                tiempoInicio.setSeconds(i);      

                //Si los segundos superan el minuto reinicio el contador
                if (i > 60) { i = 1 }; 

                //Actualizo el timer que se muestra en pantalla

                this.tiempoPantalla = this.FormatearTiempo(tiempoInicio);   

                i++;   

            }, 1000);
        }, 


        /**
         * Se le pasa un objeto Date y lo formatea en HH:mm:AA para mostrar en pantalla
         * @param object objDate : Objeto Date 
         * @returns string : Tiempo formateado
         */

        FormatearTiempo(objDate){
            //Es un objeto Date?
            if(!objDate instanceof Date){
                return false;
            }

            //Creo el formato y lo retorno como string.
            let hora = objDate.getHours();
            let min = objDate.getMinutes();
            let seg = objDate.getSeconds();
            let tiempo = ("0"+hora).substr(-2) + ':' + ("0"+min).substr(-2) + ':' + ("0"+seg).substr(-2);
            return tiempo;
        },
    },

    computed: {

        badgeClass(){
            return {
                'badge badge-success': this.correcto && !this.incorrecto,
                'badge badge-danger' : !this.correcto && this.incorrecto
            }
        },

        desordenarArreglo(){
            
            //Si no está definido, retorno.
            if(typeof this.listadoBase == 'undefined'){ return false }

            //Si el array tiene 1 o menos elementos retorno.
            if(this.listadoBase.length < 1){ return false }

            //Uso un nuevo arreglo para la ordenación
            let listadoBaseAux = [];
            let objIndex = {
                index: '',
                nombre: ''
            };

            for (var i = 0; i < this.listadoBase.length; i++) {

                //Coloco un índice aleatorio para cada elemento en el array
                objIndex = {    
                    index : Math.floor(Math.random() * 100) + 1,
                    nombre : this.listadoBase[i]
                };

                //Lo coloco en mi variable local
                listadoBaseAux.push(objIndex);
            }

            //Ordeno por índice
            listadoBaseAux.sort((a, b) => {
                return (a.index - b.index);
            });

            //Del array de objetos sólo me quedo con los nombres

            this.listadoBase = [];

            for (let i = 0; i < listadoBaseAux.length; i++) {
                this.listadoBase.push(listadoBaseAux[i].nombre);
            }

            return this.listadoBase;
        },

    },

    //Este watch pregunta por la cantidad de elementos que tiene el listado base
    watch: {
        listadoBase(val){
            if(val.length == 0){
                
                //Finalizo el juego
                this.finalizar = true;

                //Detengo el interval
                clearInterval(this.timer);
            }
        }
    }
});

// app.config.devtools = true;