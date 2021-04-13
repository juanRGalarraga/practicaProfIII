const app = new Vue({

    el: '#app',

    created()
    {

        axios.get(this.urlBase)
        .then(response => {

            //Obtengo la lista de usuarios que llegan por API
            this.listadoBase = response.data.map(listado => listado.name);

            //Hago una copia ordenada del array
            this.listadoOrdenado = this.listadoBase.slice().sort();

        })
        .catch(error => console.log(error));  

    },

    data: 
    {

        //Url a la API
        urlBase: 'https://jsonplaceholder.typicode.com/users',

        //Listado inicial que pasa a desordenarse     
        listadoBase: [],

        //Copia ordenada del listado inicial
        listadoOrdenado: [],

        //Listado ordenado por el usuario
        listadoOrdenUsuario: [],

        //Donde se guarda el interval que ejecuta el timer
        timer: null,

        //Para mostrar mensajes cuando el usuario acierta
        correcto: false,

        //La inversa del anterior
        incorrecto: false,

        //Para indicar que el juego finalizó
        finalizar: false,

        //Para indicar que el juego empezó
        empezar: false,

        //Indice que pregunta si el elemento que clickea el usuario es el siguiente en la lista de ordenados
        listadoOrdenadoIndex: 0,

        //Timer para mostrar al usuario
        tiempoPantalla: '00:00:00',

        //Mensaje para mostrar al usuario cuando clickea un elemento
        mensajePantalla: '',

    },

    methods: 
    {

        /**
         * Captura el elemento seleccionado por el usuario en la lista desordenada y pregunta si es el siguiente en la lista ordenada.
         * @param string itemSeleccionado : Elemento clickeado por el usuario 
         * @param int indice : Indice del elemento clickeado
         */
        
        SeleccionarItem(itemSeleccionado, indice)
        {          
            if(itemSeleccionado == this.listadoOrdenado[this.listadoOrdenadoIndex])
            {

                //Coloco el elemento seleccionado en otro array
                this.listadoOrdenUsuario.push(itemSeleccionado); 

                //Luego lo elimino del array desordenado
                this.listadoBase.splice(indice, 1);
                
                //Para activar la clase bootstrap y mostrar el mensaje al usuario
                this.correcto = true;
                this.incorrecto = false;

                //Muestro mensaje 
                this.mensajePantalla = "Es correcto. ¡Continúa!";

                //Aumento el índice
                this.listadoOrdenadoIndex++;

            } 
            else 
            {
                //Caso contrario, sólo muestro mensaje al usuario
                this.correcto = false;
                this.incorrecto = true;
                
                this.mensajePantalla = "Es incorrecto. ¡Intenta de nuevo!"
            }
        },

        /**
         * Se encarga de inicializar el timer
         */

        InicializarJuego()
        {

            if(typeof this.timer !== "null"){ clearInterval(this.timer) }

            //Inicializo el objeto date en cero
            let tiempoInicio = new Date('Jan 5, 2022 00:00:00');

            //Inicializo la cantidad de segundos que se van a ir agregando
            let i = 1;
           
            //Inicio el timer
            this.timer = setInterval(e => {
        
                //Seteo segundos
                tiempoInicio.setSeconds(i++);      

                //Si los segundos superan el minuto reinicio el contador
                if (i > 60) { i = 1 }

                //Actualizo el timer que se muestra en pantalla

                this.tiempoPantalla = this.FormatearTiempo(tiempoInicio);   

            }, 1000);

            this.empezar = true;
        }, 


        /**
         * Se le pasa un objeto Date y lo formatea en HH:mm:AA para mostrar en pantalla
         * @param object objDate : Objeto Date 
         * @returns string : Tiempo formateado
         */

        FormatearTiempo(objDate)
        {
            //Es un objeto Date?
            if(!objDate instanceof Date)
            {
                return false;
            }

            //Creo el formato y lo retorno como string.
            let hora = objDate.getHours();
            let min = objDate.getMinutes();
            let seg = objDate.getSeconds();
            let tiempo = ("0"+hora).substr(-2) + ':' + ("0"+min).substr(-2) + ':' + ("0"+seg).substr(-2);
            return tiempo;
        },

        DetenerJuego()
        {

            //Finalizo el juego
            this.finalizar = true;

            //Detengo el interval
            clearInterval(this.timer);
        }
    },

    computed: 
    {
        
        badgeClass()
        {
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

            for (var i = 0; i < this.listadoBase.length; i++) 
            {

                //Coloco un índice aleatorio para cada elemento en el array
                objIndex = 
                {    
                    index : Math.floor(Math.random() * 100) + 1,
                    nombre : this.listadoBase[i]
                };

                //Lo coloco en mi variable local
                listadoBaseAux.push(objIndex);
            }

            //Ordeno por índice
            listadoBaseAux.sort((a, b) => 
            {
                return (a.index - b.index);
            });

            //Del array de objetos sólo me quedo con los nombres

            this.listadoBase = [];

            for (let i = 0; i < listadoBaseAux.length; i++) 
            {
                this.listadoBase.push(listadoBaseAux[i].nombre);
            }

            return this.listadoBase;
        },

    },

    //Este watch pregunta por la cantidad de elementos que tiene el listado base

    watch: 
    {
        listadoBase(val)
        {
            if(val.length == 0)
            {
               this.DetenerJuego();
            }
        }
    }
});

// app.config.devtools = true;