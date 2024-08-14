const articulosDisponibles = [];

try {
  fetch('./db/data.json')
    .then(response => response.json())
    .then(data => {
      data.forEach((item) => {
        articulosDisponibles.push(item);
      });

      const lista = [];
      let recomendados = document.getElementById('disponibles');

      function añadirProductosDisponibles() {
        articulosDisponibles.forEach((articulo) => {
          let contenedor = document.createElement('div');
          contenedor.className = 'cards';
          contenedor.innerHTML = `
            <div class="card">
              <img src="${articulo.img}" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">${articulo.producto}</h5>
                <p class="card-text">$${articulo.precio}</p>
                <button class='añadir' id=${(articulo.id)}>+</button>
              </div>
            `;
          recomendados.appendChild(contenedor);
        });

        añadirProductos();
      }

      añadirProductosDisponibles();

      function añadirProductos() {
        añadirBoton = document.querySelectorAll('.añadir');
        añadirBoton.forEach(button => {
          button.onclick = (e) => {
            const articuloId = e.currentTarget.id;
            const articuloSeleccionado = articulosDisponibles.find(articulo => articulo.id == articuloId);

            const indiceArticulo = lista.findIndex(articulo => articulo.id == articuloId);

            if (indiceArticulo !== -1) {
              lista[indiceArticulo].cantidad++;
            } else {
              lista.push({ ...articuloSeleccionado, cantidad: 1 });
            }

            contadorLista();
            console.log(lista);
            localStorage.setItem("lista", JSON.stringify(lista));

            //ALERT
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Articulo agregado!",
              showConfirmButton: false,
              timer: 800
            });
          }
        });
      }

      //CONTADOR DE ARTICULOS DE CARRITO
      const contadorLista = () => {
        const cantidadArticulos = lista.reduce((total, articulo) => total + articulo.cantidad, 0);
        const contador = document.getElementById('contador-carrito');
        contador.className = 'contador'
        contador.textContent = `${cantidadArticulos}`;
      }
      contadorLista();
    })
    .catch(error => {
      console.error('Error al fetch:', error);
    })
    .finally(() => {
      console.log('Fetch finalizado');
    });
} catch (error) {
  console.error('Error en el try:', error);
}