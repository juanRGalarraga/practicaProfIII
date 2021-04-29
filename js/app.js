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
	data(){
		let fila = new Array();
		
		for (var i = 0; i < this.alto; i++) {
			let column = new Array();
			// let column = {};
			for (var j = 0; j < this.ancho; j++) {
				let randomBit = this.RandomInteger(0, 1);
				// column[j] = randomBit;
				column[j] = {
					x: j,
					y: i,
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

		ClickearBloque(value, indexFila, indexColumna){
			console.log("Fila: "+indexFila);
			console.log("Columna: "+indexColumna);
			// if(value == 1){
				
			// }
		}
	},

	computed: {
		getCantidadBombas(){
			for(const element of this.fila){
				for(const prop in element){
					console.log(`${prop} :  ${element[prop]}`);
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