const lista = JSON.parse(localStorage.getItem('lista'));

console.log(lista);

/*FORMULARIO*/

const resultado = document.getElementById('contenedor-datos');

const formulario = document.getElementById('miFormulario');

const obtenerDatos = (e) => {
  e.preventDefault();
  const nombre = document.querySelector('#nombre').value;
  const apellido = document.querySelector('#apellido').value;
  const email = document.querySelector('#inputEmail4').value;
  const direccion = document.querySelector('#inputAddress').value;
  const ciudad = document.querySelector('#inputCity').value;
  const provincia = document.querySelector('#inputState').value;
  const cp = document.querySelector('#inputZip').value;

  resultado.innerHTML = `
                        <div>
                          <h5>Datos del usuario</h5>
                          Nombre: ${nombre}
                          <br>
                          Apellido: ${apellido}
                          <br>
                          Email: ${email}
                          <br>
                          Dirección: ${direccion}
                          <br>
                          Ciudad: ${ciudad}
                          <br>
                          Provincia: ${provincia}
                          <br>
                          CP: ${cp}
                          <h5>Sus productos</h5>
                        </div>
                      `;

  lista.forEach((articulo) => {
    const elemento = document.createElement('p');
    elemento.innerText = `
                          ${articulo.producto}
                          $${articulo.precio}`;
    resultado.appendChild(elemento);
  });
};

formulario.addEventListener('submit', obtenerDatos);







 //CONTADOR DE ARTICULOS DE CARRITO
const contadorLista = () => {
  const cantidadArticulos = lista.reduce((total, articulo) => total + articulo.cantidad, 0);
  const contador = document.getElementById('contador-carrito');
  contador.className = 'contador'
  contador.innerHTML = `${cantidadArticulos}`;
}
contadorLista();




