let carritoStorage = localStorage.getItem('lista')
carritoStorage = JSON.parse(carritoStorage)
let contenedorCarrito = document.getElementById('añadidos')


// MANEJO DE ERRORES

try {
  const carritoStorage = JSON.parse(localStorage.getItem('lista'));
} catch (error) {
  console.error('Error al parsear el carrito:', error);
} finally {
  console.log('Carrito cargado');
}



function armarCarrito (items) {
  contenedorCarrito.innerHTML = ''; 
  items.forEach(articulo => {
    const card = document.createElement("div")
    card.className = 'cards-lista'
    card.innerHTML = `
                      <h3>${articulo.producto}</h3>
                      <p>$${articulo.precio}</p> 
                      <p>Cantidad: ${articulo.cantidad}</p>
                      <p><button class='eliminar' id=${(articulo.id)}>X</button></p>
                      `
    contenedorCarrito.appendChild(card)
  });
  



  const botonesEliminar = document.querySelectorAll('.eliminar');
  botonesEliminar.forEach(button => {
    button.onclick = (e) => {
      const articuloId = e.currentTarget.id
      const indiceArticulo = carritoStorage.findIndex(articulo => ((articulo.id)) == articuloId)


      if (indiceArticulo !== -1) {
        carritoStorage.splice(indiceArticulo, 1)
        contadorLista();
        console.log(carritoStorage)
        localStorage.setItem("carritoStorage", JSON.stringify(carritoStorage))

        

      
        armarCarrito(carritoStorage)
        totalCarrito(carritoStorage)

       
      }
    }
  });
}

armarCarrito(carritoStorage)

//TOTAL
const totalCarrito = (items) => {
  const totalesCarrito = items.reduce((total,articulo) => total + (articulo.precio * articulo.cantidad), 0);
  let tarjeta = document.createElement('h2')
  tarjeta.innerHTML =   `<div class="total-carrito"> 
                          <hr>
                        <h3>TOTAL</h3> 
                        <p>$${totalesCarrito}</p> </div>`

  contenedorCarrito.appendChild(tarjeta)
}

totalCarrito(carritoStorage)


//VACIAR LISTA
const botonVaciar = document.getElementById('vaciar')
botonVaciar.addEventListener('click', vaciarCarrito)

function vaciarCarrito() {
  carritoStorage = []
  localStorage.setItem("carritoStorage", JSON.stringify(carritoStorage))
  contenedorCarrito.innerHTML = ''
  totalCarrito(carritoStorage)
  contadorLista()
}



 //CONTADOR DE ARTICULOS DE CARRITO
 const contadorLista = () => {
  const cantidadArticulos = carritoStorage.reduce((total, articulo) => total + articulo.cantidad, 0);
  const contador = document.getElementById('contador-carrito');
  contador.className = 'contador'
  contador.textContent = `${cantidadArticulos}`;
}
contadorLista();

console.log(carritoStorage)





