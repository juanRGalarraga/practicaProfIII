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
				<buscaminas-options class="mb-2"></buscaminas-options>
				<buscaminas-wrapper :alto="10" :ancho="10"></buscaminas-wrapper>
			</div>
		</div>
		<pre>
			{{ $data }}			
		</pre>
	</div>
<script src="js/vue.js"></script>

<script type="text/x-template" id="buscaminas-wrapper">
	<div class="d-flex">
		<table>
			<tbody>
				<tr v-for="(numero, index) in fila">
					<td class="bloque pointer" v-for="i in numero">{{ i }}</td>
				</tr>
			</tbody>
		</table>
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