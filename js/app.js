const buscaminasWrapper = {
	template: '#buscaminas-wrapper',
	props: {
		ancho: Number,
		alto: Number 
	},
	data(){
		let fila = new Array();
		let aux = 0;
		
		for (var i = 0; i < this.alto; i++) {
			let column = new Array();
			for (var j = 0; j < this.ancho; j++) {
				let randomBit = this.randomInteger(0, 1);
				column[j] = randomBit;
			}
			fila[i] = column;
		}

		console.log(fila);

		return {
			fila,
		}
	},

	methods: {
		randomInteger(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}
	}
}

const vue = new Vue({
	el: '#root',
	data: {
		options: {
			alto: 5,
			ancho: 5
		}
	},
	components: {
		buscaminasWrapper
	},
});