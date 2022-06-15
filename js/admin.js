
class Pelicula{
    constructor(id, nombre, categoria, descripcion,imagen,publicado){
        this.id=id
        this.nombre=nombre
        this.categoria=categoria
        this.descripcion=descripcion
        this.imagen=imagen
        this.publicado=publicado
    }
}

let user = JSON.parse(localStorage.getItem("user"))
let peliculas=JSON.parse(localStorage.getItem("peliculas")) || [];
let tableBody=document.querySelector('#table_body');
let usuario=JSON.parse(localStorage.getItem('user')) || null
let contenedor_lista=document.getElementById('menu_lista');

let myModal = new bootstrap.Modal(document.getElementById('myModal'))



const validarUsuario = () => {
    if (user.rol !== "admin") {
      console.log('no soy admin');
      
      //document.getElementById("main1").innerHTML="";
      document.getElementById("mainaux").innerHTML="";
      
  
      let div = document.createElement("div");
      div.classList = "container";
      let estructura = `<div class="row mt-5">
                          <div class="col">
                            <div class="alert alert-danger" role="alert">
                                No tiene permisos para ver esta página
                            </div>
                          <div>
                          <a href="./home.html">Volver</a>
                        </div>
                    </div>
                </div>`;
      div.innerHTML = estructura;
      document.querySelector("main").appendChild(div);
    } else {      
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
        
        cargarPelicula();
     
     }
      //cargarTabla();
    }
  };

function agregarPelicula(e) {
    e.preventDefault();
    
    let id= new Date().getTime();
    let nombre=document.getElementById('nombre').value;
    let cat=document.getElementById('cat').value;
    let desc=document.getElementById('desc').value;
    let imagen=document.getElementById('imagen').value;
    let public=document.getElementById('public').value;

    peliculas.push(new Pelicula(id,nombre,cat,desc,imagen,public));
    localStorage.setItem('peliculas',JSON.stringify(peliculas));
    document.getElementById('formulario').reset();
    document.getElementById("nombre").focus();

    cargarPelicula();
}

// Modal

const editModal=function (peliculaId) {
    myModal.show();
    CrearCuerpoModal(peliculaId);
};

const CrearCuerpoModal=(index) => {
    document.querySelector(".modal-body").innerHTML="";
    console.log(peliculas[index])
    let bodyModal=document.querySelector(".modal-body");
    let contenidoBody=`
    <form id="form-update" onSubmit="actualizarPelicula(event,${index})">
  <label>Nombre</label>
  <input id="nombre-update" class="form-control" type="text" value="${peliculas[index].nombre}" required />
  <label>Categoria</label>
  <textarea id="cat-update" class="form-control" value="${peliculas[index].categoria}" required>${peliculas[index].categoria}</textarea>
  <label>Imagen</label>
  <input
    id="imagen-update"
    class="form-control"
    type="text"
    placeholder="Ingrese una url"
    value="${peliculas[index].imagen}"
    required
  />
  <label>Descripcion</label>
  <textarea id="desc-update" class="form-control" value="${peliculas[index].descripcion}" required>${peliculas[index].descripcion}</textarea>
  <label>Publicado</label>
  <select id="pub-update" class="form-control" required>
    <option selected>${peliculas[index].publicado}</option>
    ${peliculas[index].publicado ==='si' ? '<option value="no">no</option> ': '<option value="si">si</option> '}        
    </select>

  <button class="btn btn-primary mt-3 float-end">Guardar</button>
</form>
    `
    bodyModal.innerHTML= contenidoBody;

}

const actualizarPelicula= function (e,index){
    e.preventDefault();
    let nombre=document.getElementById('nombre-update').value;
    let categoria=document.getElementById('cat-update').value;
    let imagen=document.getElementById('imagen-update').value;
    let descripcion=document.getElementById('desc-update').value;
    let publicado=document.getElementById('pub-update').value;

    const newData={
        nombre,
        categoria,
        imagen,
        descripcion,
        publicado,
    };

    peliculas.splice(index,1,newData);
    localStorage.setItem("peliculas",JSON.stringify(peliculas));
    myModal.hide();
    cargarPelicula();

}

const borrarPelicula = (peliculaId) => {
    let validar = confirm(
      `Está seguro que desea eliminar la pelicula ${peliculas[peliculaId].nombre}?`
    );
  
    if (validar) {
      peliculas.splice(peliculaId, 1);
      localStorage.setItem("peliculas", JSON.stringify(peliculas));
      alert("Pelicula Eliminada");
      cargarPelicula();
    }
  };

const cargarPelicula=()=>{
    table_body.innerHTML='';
    peliculas.map(function (peliculas,index) {
        let tr=document.createElement('tr')
        let celda=`
        <th scope="row">${index + 1}</th> 
        <td>${peliculas.nombre}</td>
        <td>${peliculas.categoria}</td>
        <td>${peliculas.publicado}</td>
        <td><button class="btn btn-warning" onclick="editModal(${index})">Editar</button></td>
        <td><button class="btn btn-danger" onclick="borrarPelicula(${index})">Eliminar</button></td>
        `

        tr.innerHTML=celda
        table_body.appendChild(tr)

    })
}

function cerrarSesion(){
  location.href='../index.html';
}

document.getElementById('formulario').addEventListener('submit',agregarPelicula);

validarUsuario();
if (user.rol === "admin") {
  cargarPelicula();
}

