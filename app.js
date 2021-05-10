// const documento = document
$pag = document.querySelector(".pag");
$main = document.querySelector("main");

let linkAPI = "https://pokeapi.co/api/v2/pokemon/";

async function pokemons(url) {
	try{
		$main.innerHTML = '<p class="cargando" >Cargando...</p>';

		let respuesta = await fetch(url),
			json = await respuesta.json(),
			$mostrarPokemon = "",
			$atras,
			$adelante,
			$seleccion;

		console.log(json);

		if (!respuesta.ok) throw {status: respuesta.status, statusText: respuesta.statusText}
		
		for (var i=0; i<json.results.length; i++){
			// console.log(json.results[i]);
			try{
				let respuestaResults = await fetch(json.results[i].url),
					jsonPokemon = await respuestaResults.json();
				console.log(respuestaResults, jsonPokemon);

				$habilidadesPokemon = [];

				if (!respuestaResults.ok) throw {status: respuestaResults.status, statusText: respuestaResultsr.statusText}

				$mostrarPokemon +=  
					`<figure class="seleccionarPokemon">
						<figcaption class="nombrePokemon" ">${jsonPokemon.name}</figcaption>
					    <img src="${jsonPokemon.sprites.front_default}" href="${respuestaResults.url} alt="${jsonPokemon.name}">
					    <figcaption class=habPokemon>Habilidades:</figcaption>
						${jsonPokemon.abilities[0] ? `<figcaption>${jsonPokemon.abilities[0].ability.name}</figcaption>` : ""} 
						${jsonPokemon.abilities[1] ? `<figcaption>${jsonPokemon.abilities[1].ability.name}</figcaption>` : ""} 
						${jsonPokemon.abilities[2] ? `<figcaption>${jsonPokemon.abilities[2].ability.name}</figcaption>` : ""} 
						${jsonPokemon.abilities[3] ? `<figcaption>${jsonPokemon.abilities[3].ability.name}</figcaption>` : ""} 

					</figure>`;
			}catch (err){
				console.log(err);
				let mensaje = err.statusText || "Parece que algo salio mal :(";
				$mostrarPokemon += 
					`<figure>
						<figcaption>Error ${err.status}:${mensaje}</figcaption>
					</figure>`;			
			}
		}

		$main.innerHTML = $mostrarPokemon;
		$atras = json.previous ? `<a href="${json.previous}"> <-- Anterior pag  </a>`:"";
		$adelante = json.next ? `<a href="${json.next}">  Siguiente pag --> </a>`:"";
		$pag.innerHTML = $atras + "    " + $adelante;

		} catch (err) {
			console.log(err);
			let mensaje = err.statusText || "Parece que algo salio mal :(";
			$main.innerHTML = `<p> Error ${err.status}:${mensaje}<p>`;
	}
}


document.addEventListener("DOMContentLoaded", e => pokemons(linkAPI));

document.addEventListener("click", e => {
	if (e.target.matches(".pag a")){
		e.preventDefault();
		pokemons(e.target.getAttribute("href"));
	}
});

document.addEventListener("click", e => {
	if (e.target.matches("img a")){
		e.preventDefault();
		habilidades(e.target.getAttribute("href"));
	}
});
