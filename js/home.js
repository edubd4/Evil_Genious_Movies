let usuario=JSON.parse(localStorage.getItem('user')) || null
let contenedor_lista=document.getElementById('menu_lista')

let contenedorTarjetas=document.getElementById("tarjetas_container")

let peliculas=JSON.parse(localStorage.getItem('peliculas')) ||[]

let myModal = new bootstrap.Modal(document.getElementById("myModal"));

if( usuario){
   if (usuario.rol==='admin') {
      let item=document.createElement('li')
      let item1=document.createElement('li')   
      item.classList='nav-item'
      item1.classList='nav-item1'
      let opcion=`<a class="nav-link" aria-current="page" href="./admin.html">Adm-Peliculas</a>`
      let opcion1=`<a class="nav-link" aria-current="page" href="./usuarios.html">Adm-Usuarios</a>`   
   
      item.innerHTML=opcion ;
      contenedor_lista.appendChild(item);
   
      item1.innerHTML=opcion1 ;
      contenedor_lista.appendChild(item1);   
   
   
   }
}


//-------mostrar modal------------------
const editModal = function (peliculaId) {
   console.log(peliculaId);
   myModal.show();
  crearCuerpoModal(peliculaId);
};

//crear el cuerpo del modal-----------------------------------
const crearCuerpoModal = (index) => {
   //limpiar el body del modal
   document.querySelector(".modal-body").innerHTML = "";
 
   //crear el contenido del body del modal que seria el formulario
   let bodyModal = document.querySelector(".modal-body");
   let contenidoBody = `<form id="form-update">
   <h1>${peliculas[index].nombre}</h1>
   <img 
      src="${peliculas[index].imagen}" 
      class="card-img-top img_tarjeta" 
      alt="${peliculas[index].nombre}"
   >
   <p id="cat-update" class="form-control">${peliculas[index].descripcion}</p>
   
 </form>`;
 
   //agregar al body del modal
   bodyModal.innerHTML = contenidoBody;
 };


function cargarTarjetas() {
   contenedorTarjetas.innerHTML=" ";

   if(peliculas.length > 0){
      peliculas.map((peliculas,index)=>{
      let div=document.createElement('div')
      div.classList="col-12 col-md-4 mb-3"
      let tarjeta=`<div class="card text-white bg-dark h-100">
      <img src="${peliculas.imagen}" class="card-img-top img_tarjeta" alt="${peliculas.nombre}">
      <hr>
      <div class="card-body">
       <h5 class="card-title">${peliculas.nombre}</h5>
      
    
      </div>

      <div class="card-footer">

      <button class="btn btn-primary btn-sm" onclick="editModal(${index})">Ver Mas</button>      
      </div>
      <div>`

      div.innerHTML=tarjeta
      contenedorTarjetas.appendChild(div)

   });
   }else{
      let div=document.createElement('div')
      let alerta=`<div class="alert-warning" role="alert">No hay peliculas disponibles
      <div>`
      div.innerHTML=alerta
      contenedorTarjetas.appendChild(div)

   }
}

function cerrarSesion(){
   location.href='../index.html';
}


cargarTarjetas();

