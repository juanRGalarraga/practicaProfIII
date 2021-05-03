const buscaminasOptions = {
	template: '#buscaminas-options',
	data(){
		return {
			selected: 5,
			options: [
				{ text: '5 x 5',   value: 5  },
				{ text: '10 x 10', value: 10 },
				{ text: '15 x 15', value: 15 },
				{ text: '20 x 20', value: 20 },
			]
		}
	}
}

const buscaminasWrapper = {
	template: '#buscaminas-wrapper',
	components: {
		buscaminasOptions
	},
	props: {
		ancho: Number,
		alto: Number 
	},
	created(){
		this.getCantidadBombas;
	},
	data(){
		let fila = new Array();
		
		for (var i = 0; i < this.alto; i++) {
			let column = new Array();
			// let column = {};
			for (var j = 0; j < this.ancho; j++) {
				let randomBit = this.RandomInteger(0, 1);
				// column[j] = randomBit;
				column[j] = {
					clickeado: false,
					bomba: randomBit,
					valores: 0
				}
			}
			fila.push(column);
		}
		return {
			fila,
		}
	},

	methods: {
		RandomInteger(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		},

		ClickearBloque(value, filaIndex, columnaIndex){
			let finish = false,
				i, j;

			if(!value.clickeado){
				value.clickeado = true;
			}

			if(value.bomba == 0){
				j = columnaIndex+1;
				i = filaIndex;
				if(j < this.fila[i].length){
					while(!finish || j < this.fila[i].length){
						if(!this.fila[i][j].clickeado){
							if(this.fila[i][j].bomba == 1){
								finish = true;
							} else {
								this.fila[i][j].clickeado = true;
							}
						}
						j++;
					}
				}
	
				j = columnaIndex-1;
				i = filaIndex;
				if(j < this.fila[i].length){
					while(!finish || j >= 0){
						if(!this.fila[i][j].clickeado){
							if(this.fila[i][j].bomba == 1){
								finish = true;
							} else {
								this.fila[i][j].clickeado = true;
							}
						}
						j--;
					}
				}
			}

		},

		ColorBloque(i){
			return { 
				'bloqueRojo' : i.clickeado && i.bomba == 1, 
				'bloqueVerde' : i.clickeado && i.bomba == 0  
			}
		}
	},

	computed: {
		getCantidadBombas(){
			for (let i = 0; i < this.fila.length; i++) {
				for (let j = 0; j < this.fila[i].length; j++) {

					//El elemento actual no tiene una bomba
					if(this.fila[i][j].bomba == 0){

						//Estoy en la segunda columna?
						if(j > 0){
							//Pregunto por la columna anterior
							if(this.fila[i][j-1].bomba == 1){

								//Si tiene una bomba sumo un valor al elemento actual
								this.fila[i][j].valores++;
							}
						}

						//Si la columna actual es la anteúltima
						if(j < (this.fila[i].length-1)){
							//Pregunto si la columa que procede al actual elemento tiene una bomba
							if(this.fila[i][j+1].bomba == 1){
								//Si es así, sumo un valor al elemento actual
								this.fila[i][j].valores++;
							}
						}
						

						//Pregunto si estoy en la segunda fila
						if(i > 0){
							//Pregunto por el elemento que está arriba del actual
							if(this.fila[i-1][j].bomba == 1){
								this.fila[i][j].valores++;
							}
							if(j > 0){
								//Pregunto por el elemento de la esquina superior izquierda
								if(this.fila[i-1][j-1].bomba == 1){
									this.fila[i][j].valores++;
								}
							}

							if(j < (this.fila[i].length-1)){
								//Pregunto por el elemento de la esquina superior derecha
								if(this.fila[i-1][j+1].bomba == 1){
									this.fila[i][j].valores++;
								}
							}
						}

						//Pregunto si no estoy en la última fila
						if(i < (this.fila.length - 1)){

							//Pregunto por la fila que procede a la actual
							if(this.fila[i+1][j].bomba == 1){
								this.fila[i][j].valores++;
							}

							//Pregunto por el elemento de la esquina inferior izquierda
							if(j > 0){
								if(this.fila[i+1][j-1].bomba == 1){
									this.fila[i][j].valores++;
								}
							}

							if(j < (this.fila[i].length-1)){
								//Pregunto por la esquina inferior derecha
								if(this.fila[i+1][j+1].bomba == 1){
									this.fila[i][j].valores++;
								}
							}
						}
					}
				}				
			}
		}
	}
}

const vue = new Vue({
	el: '#root',
	components: {
		buscaminasWrapper,
	},
});