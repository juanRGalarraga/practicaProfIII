<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="css/style.css">
	<title>Document</title>
</head>
<body>
	<div id="root">
		<div class="container">
			<div class="row mt-2">
				<buscaminas-wrapper :alto="10" :ancho="10"></buscaminas-wrapper>
			</div>
		</div>
		<pre>
			{{ $data }}
		</pre>
	</div>
<script src="js/vue.js"></script>

<script type="text/x-template" id="buscaminas-wrapper">
	<div>
		<buscaminas-options></buscaminas-options>
		<div class="d-flex">
			<table>
				<tbody>
					<tr v-for="(numero, indexFila) in fila">
						<td class="bloque pointer" v-for="(i, indexColumna) in numero" 
						  @click="ClickearBloque(i, indexFila, indexColumna)" :class="ColorBloque(i)">{{ "Bomba: " + i.bomba + " " + "Alrededor: " +  i.valores }}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</script>

<script type="text/x-template" id="buscaminas-options">
	<div class="form-inline col-3">
		<label>Tamaño</label>
		<select v-model="selected" class="form-control">
			<option v-for="option in options" :value="option.value">
				{{ option.text }}
			</option>
		</select>
	</div>
</script>

<script src="js/app.js"></script>
</body>
</html>