
const bicicletas = [
    {
        "id": 1,
        "nombre": "SUPERCALIBER 9.9",
        "img": "img/SUPERCALIBER 9.9.jpg",
        "precio": 1000,
        "cantidad": 1, 
    },
    {
        "id": 2,
        "nombre": "SUPERCALIBER 9.8",
        "img": "img/SUPERCALIBER 9.8.jpg",
        "precio": 970,
        "cantidad": 1, 
    },
    {
        "id": 3,
        "nombre": "SUPERCALIBER 9.7",
        "img": "img/SUPERCALIBER 9.7.jpg",
        "precio": 930,
        "cantidad": 1, 
    },
    {
        "id": 4,
        "nombre": "FUEL EX 7",
        "img": "img/FUEL EX 7.jpg",
        "precio": 1100,
        "cantidad": 1, 
    },
    {
        "id": 5,
        "nombre": "TOP FUEL 9.9",
        "img": "img/TOP FUEL 9.9.jpg",
        "precio": 1180,
        "cantidad": 1, 
    },
    {
        "id": 6,
        "nombre": "TOP FUEL 9.8",
        "img": "img/TOP FUEL 9.8.jpg",
        "precio": 1100,
        "cantidad": 1, 
    },
    {
        "id": 7,
        "nombre": "TOP FUEL 9.7",
        "img": "img/TOP FUEL 9.7.jpg",
        "precio": 1000,
        "cantidad": 1, 
    },
    {
        "id": 8,
        "nombre": "TOP FUEL 8",
        "img": "img/TOP FUEL 8.jpg",
        "precio": 1000,
        "cantidad": 1, 
    },
    {
        "id": 9,
        "nombre": "PROCALIBER 9.8",
        "img": "img/PROCALIBER 9.8.jpg",
        "precio": 900,
        "cantidad": 1, 
    },
    {
        "id": 10,
        "nombre": "PROCALIBER 9.7",
        "img": "img/PROCALIBER 9.7.jpg",
        "precio": 900,
        "cantidad": 1, 
    },
    {
        "id": 11,
        "nombre": "PROCALIBER 9.6",
        "img": "img/PROCALIBER 9.6.jpg",
        "precio": 950,
        "cantidad": 1, 
    },
    {
        "id": 12,
        "nombre": "PROCALIBER 9.5",
        "img": "img/PROCALIBER 9.5.jpg",
        "precio": 850,
        "cantidad": 1, 
    },
];

const carrito = [];

function renderizarProductos(){

    const tienda = document.getElementById('tienda');

    bicicletas.forEach((p)=> {

        let producto = document.createElement('div');
        producto.classList.add('col-12');
        producto.classList.add('col-md-4');
        producto.classList.add('p-3');
        producto.classList.add('d-flex');
        producto.classList.add('justify-content-center');


        producto.innerHTML = `
        <div class="hovercard">
            <div class="card">
                <img src="${p.img}" class="card-img-top" alt="imagen de bicicleta SUPERCALIBER 9.9">
                <div class="card-body">
                    <h3 class="card-title">${p.nombre}</h3>
                    <p class="text-white">$${p.precio}</p>
                    <button class="btn btn-secondary" id="${p.id}">Agregar al carrito</button>
                </div>
            </div>
        </div>`;

        
        tienda.appendChild(producto);

        producto.querySelector('button').addEventListener('click', () => {

            agregarProductoAlCarrito(p.id);

        });


    });

};
renderizarProductos();


function agregarProductoAlCarrito(id){

    let producto = bicicletas.find(producto => producto.id === id);
    
    let productoEnCarrito = carrito.find(producto => producto.id === id);

    if (productoEnCarrito) {

        productoEnCarrito.cantidad++;

        console.log(carrito);

        alert('Se agrego 1 unidad mas del Producto al carrito')

    }else {
        producto.cantidad = 1;

        carrito.push(producto);

        console.log(carrito);
        
        alert('El producto fue agregado al carrito')
    };
    renderizarCarrito();
    calcularTotal();
};


function renderizarCarrito(){

    const d = document;

    let carritoHTML = d.querySelector('#carrito');

    carritoHTML.innerHTML = '';

    carrito.forEach((p, index) => {

        let producto = document.createElement('div');
        producto.classList.add('col-12');
        producto.classList.add('col-md-4');
        producto.classList.add('p-3');
        producto.classList.add('d-flex');
        producto.classList.add('justify-content-center');
        
        producto.innerHTML = `
        <div>
            <div class="card">
                <img src="${p.img}" class="card-img-top">
                <div class="card-body">
                    <h3 class="card-title">${p.nombre}</h3>
                    <p class="text-white">${p.cantidad} unidades</p>
                    <button class="btn btn-danger" id="${p.id}">Borrar del carrito</button>
                </div>
            </div>
        </div>`;

        producto.querySelector('button').addEventListener('click', ()=>{
        
            eliminarProductoDelCarrito(index)
        })

        carritoHTML.appendChild(producto);
    });
 
};



function eliminarProductoDelCarrito(indice){

    carrito[indice].cantidad--;
    alert(`Se elimino 1 unidad del producto ${carrito[indice].nombre} del carrito`);

    if(carrito[indice].cantidad === 0){

        carrito.splice(indice,1);
        alert('El producto fue eliminado del carrito');
    }

    renderizarCarrito();
    calcularTotal()
}

function calcularTotal(){

   
    let total = 0;

    carrito.forEach((p)=>{
    
        total += p.precio * p.cantidad;
    })

    console.log(total);

    const t = document.getElementById('total');

    t.innerHTML = `<p>$${total}</p>`

}