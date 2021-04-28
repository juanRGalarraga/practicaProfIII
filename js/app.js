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

const buscaminasOptions = {
	template: '#buscaminas-options',
	data(){
		return {
			selected: '5',
			options: [
				{ text: '5 x 5', value: 5},
				{ text: '10 x 10', value: 10},
				{ text: '15 x 15', value: 15},
				{ text: '20 x 20', value: 20},
			]
		}
	}
}

const vue = new Vue({
	el: '#root',
	components: {
		buscaminasWrapper,
		buscaminasOptions
	},
});