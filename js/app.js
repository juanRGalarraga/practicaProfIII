const vue = new Vue({
	el: '#root',
	created (){
		fetch(this.url)
		.then(response => response.json())
		.then(response => this.users = response.results.map(usuario => usuario.name));
	},
	data: {
		check: false,
		url : 'https://randomuser.me/api/?results=23',
		cant: 30,
		check_userlist: false,
		users: [],
	},
	computed:{
		completeName(){
            return this.users.map(usuario => `${usuario.first} ${usuario.last}`);
		}
	},
	filters: {
		ToUpperCase(data){
			return data.toUpperCase();
		}
	}

});