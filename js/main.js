
// const bicicletas = [
//     {
//         "id": 1,
//         "nombre": "SUPERCALIBER 9.9",
//         "img": "img/SUPERCALIBER 9.9.jpg",
//         "precio": 1000,
//         "cantidad": 1,
//         "stock": 1,
//     },
//     {
//         "id": 2,
//         "nombre": "SUPERCALIBER 9.8",
//         "img": "img/SUPERCALIBER 9.8.jpg",
//         "precio": 970,
//         "cantidad": 1,
//         "stock": 6,
//     },
//     {
//         "id": 3,
//         "nombre": "SUPERCALIBER 9.7",
//         "img": "img/SUPERCALIBER 9.7.jpg",
//         "precio": 930,
//         "cantidad": 1,
//         "stock": 0,
//     },
//     {
//         "id": 4,
//         "nombre": "FUEL EX 7",
//         "img": "img/FUEL EX 7.jpg",
//         "precio": 1100,
//         "cantidad": 1,
//         "stock": 7, 
//     },
//     {
//         "id": 5,
//         "nombre": "TOP FUEL 9.9",
//         "img": "img/TOP FUEL 9.9.jpg",
//         "precio": 1180,
//         "cantidad": 1,
//         "stock": 0, 
//     },
//     {
//         "id": 6,
//         "nombre": "TOP FUEL 9.8",
//         "img": "img/TOP FUEL 9.8.jpg",
//         "precio": 1100,
//         "cantidad": 1,
//         "stock": 75, 
//     },
//     {
//         "id": 7,
//         "nombre": "TOP FUEL 9.7",
//         "img": "img/TOP FUEL 9.7.jpg",
//         "precio": 1000,
//         "cantidad": 1,
//         "stock": 4, 
//     },
//     {
//         "id": 8,
//         "nombre": "TOP FUEL 8",
//         "img": "img/TOP FUEL 8.jpg",
//         "precio": 1000,
//         "cantidad": 1,
//         "stock": 1, 
//     },
//     {
//         "id": 9,
//         "nombre": "PROCALIBER 9.8",
//         "img": "img/PROCALIBER 9.8.jpg",
//         "precio": 900,
//         "cantidad": 1,
//         "stock": 3,
//     },
//     {
//         "id": 10,
//         "nombre": "PROCALIBER 9.7",
//         "img": "img/PROCALIBER 9.7.jpg",
//         "precio": 900,
//         "cantidad": 1,
//         "stock": 2,
//     },
//     {
//         "id": 11,
//         "nombre": "PROCALIBER 9.6",
//         "img": "img/PROCALIBER 9.6.jpg",
//         "precio": 950,
//         "cantidad": 1,
//         "stock": 2,
//     },
//     {
//         "id": 12,
//         "nombre": "PROCALIBER 9.5",
//         "img": "img/PROCALIBER 9.5.jpg",
//         "precio": 850,
//         "cantidad": 1,
//         "stock": 4,
//     },
// ];

// const {id:id, nombre:nombre} = bicicletas[1]

// console.log(id);

const cargarJson = async() => {
    try {
        const response = await fetch('/json/bicicletas.json');
        const json = await response.json();

        return json;
    } catch (error) {
        console.log('hubo un error',error);
    }
    cargarJson();
}


document.addEventListener('DOMContentLoaded',() => {
    
    renderizarProductos();
    
    if (localStorage.getItem('carrito')) {
        const carrito = obtenerCarritoStorage();
        renderizarCarrito(carrito);
        calcularTotal(carrito);
    }
})


/////operador  or ///

const carrito = JSON.parse(localStorage.getItem('carrito')) || [];



async function renderizarProductos(){

    const tienda = document.getElementById('tienda');

    const bicicletas = await cargarJson();
    
    
    /// destructure//
    bicicletas.forEach(({img,nombre, precio, id}) => {

        let producto = document.createElement('div');
        producto.classList.add('col-12');
        producto.classList.add('col-md-4');
        producto.classList.add('p-3');
        producto.classList.add('d-flex');
        producto.classList.add('justify-content-center');


        producto.innerHTML = `
        <div class="hovercard">
            <div class="card">
                <img src="${img}" class="card-img-top" alt="imagen de bicicleta SUPERCALIBER 9.9">
                <div class="card-body">
                    <h3 class="card-title">${nombre}</h3>
                    <p class="text-white">$${precio}</p>
                    <button class="btn btn-secondary" id="${id}">Agregar al carrito</button>
                </div>
            </div>
        </div>`;

        tienda.appendChild(producto);

        producto.querySelector('button').addEventListener('click', () => {
            
            agregarProductoAlCarrito(id);

            
        });

    });

};
renderizarProductos();



async function agregarProductoAlCarrito(id){

    const bicicletas = await cargarJson();

    let producto = bicicletas.find(producto => producto.id === id);
    
    let productoEnCarrito = carrito.find(producto => producto.id === id);
    
       /// Spread ///
    if (productoEnCarrito) {

        productoEnCarrito.cantidad++;

        console.log(carrito);

        Swal.fire({
            title: 'Se agrego 1 unidad mas del Producto al carrito',
            icon: 'success',
            iconColor: 'green',
            confirmButtonColor: '#1a1b1b',
            })

    }
    
    else {
        carrito.push({
            ...producto,
            cantidad: 1
        });

        console.log(carrito);
        
        Swal.fire({
            title: 'El producto fue agregado al carrito',
            icon: 'success',
            iconColor: 'green',
            confirmButtonColor: '#1a1b1b',
            })

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

    Swal.fire({
        title: 'Estas eliminando 1 unidad del Producto!',
        icon: 'success',
        iconColor: 'yellow',
        confirmButtonColor: '#1a1b1b',
        })

    if(carrito[indice].cantidad === 0){

        carrito.splice(indice,1);

        Swal.fire({
            title: 'Eliminaste del carrito este producto',
            icon: 'success',
            iconColor: 'yellow',
            confirmButtonColor: '#1a1b1b',
            })
    
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

    localStorage.setItem('carrito', JSON.stringify(carrito));

}

obtenerCarritoStorage = () => {
    const carritoStorage = JSON.parse(localStorage.getItem('carrito'))
    console.log(carritoStorage);
};

obtenerCarritoStorage()




// //ternario
// let promo = false, valor = 970;

// valor > 970 ? (
//     alert("OK, tienes un service gratis"),
//     location.assign("../pages/service.html")
// ) : (
//     stop = true,
//     alert("no tenemos promo vigente")
// );

