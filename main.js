
  document.addEventListener('DOMContentLoaded', function () {
    const listaCarrito = document.getElementById('lista-carrito');
    const totalCarrito = document.getElementById('total');
    const botonBorrarCarrito = document.getElementById('borrar-carrito');

    const productosComprados = [];

    const botonesCompra = document.querySelectorAll('.buttons');
    botonesCompra.forEach(function (boton) {
      boton.addEventListener('click', function (evento) {
        agregarAlCarrito(evento, boton);
      });
    });

    botonBorrarCarrito.addEventListener('click', borrarCarrito);

    function agregarAlCarrito(evento, boton) {
      const card = boton.parentElement;
      const titulo = card.querySelector('.Title').textContent;
      const precio = parseFloat(card.querySelector('.prize').textContent.replace('$', ''));
      const cantidad = parseInt(card.querySelector('#numbers').value) || 1;

      const subtotal = precio * cantidad;

      // Almacenar información en el objeto productosComprados
      productosComprados.push({
        titulo: titulo,
        precio: precio,
        cantidad: cantidad,
        subtotal: subtotal
      });

      // Crear un nuevo elemento li para mostrar el producto en el carrito
      const nuevoItem = document.createElement('li');
      nuevoItem.textContent = `${titulo} x${cantidad} - $${subtotal.toFixed(2)}`;
      listaCarrito.appendChild(nuevoItem);

      actualizarTotal();
    }

    function borrarCarrito() {
      listaCarrito.innerHTML = '';
      productosComprados.length = 0; // Limpiar el array al borrar el carrito
      actualizarTotal();
    }

    function actualizarTotal() {
      let total = 0;
      const itemsCarrito = listaCarrito.children;

      for (let i = 0; i < itemsCarrito.length; i++) {
        const subtotalTexto = itemsCarrito[i].textContent.split('$')[1];
        const subtotal = parseFloat(subtotalTexto);
        total += subtotal;
      }

      totalCarrito.textContent = `Total: $${total.toFixed(2)}`;
    }
  });


