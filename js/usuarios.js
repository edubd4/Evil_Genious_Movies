let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

let tableBody = document.querySelector("#table_body");
let myModal = new bootstrap.Modal(document.getElementById("myModal"));
//let btnNuevo = document.getElementById("btn-nuevo")


///mostrar modal para carga de nuevo
const nuevoModal = function(){
  console.log("nuevo usuario");
  myModal.show();
  crearCuerpoModalNuevo();
};

//-------mostrar modal------------------
const editModal = function (usuarioId) {
    console.log(usuarioId);
    myModal.show();
   crearCuerpoModal(usuarioId);
 };

 //btnNuevo.addEventListener("click",nuevoModal);


//crear el cuerpo del modal-----------------------------------
const crearCuerpoModal = (index) => {
  //limpiar el body del modal
  document.querySelector(".modal-body").innerHTML = "";

  //crear el contenido del body del modal que seria el formulario
  let bodyModal = document.querySelector(".modal-body");
  let contenidoBody = `<form id="form-update" onSubmit="actualizarUsuario(event,${index})">
  <label>Nombre</label>
  <input id="nombre-update" class="form-control" type="text" value="${usuarios[index].nombre}" required />
  <label>Correo Electronico</label>    
  <input id="mail-update" class="form-control" type="text" value="${usuarios[index].email}"  required />
  <label>Estado</label>    
  <select id="estado-update" class="form-control" required>
    <option selected>${usuarios[index].estado}</option>
    <option value="Aprobado">Aprobado</option>
    <option value="Suspendido">Suspendido</option>      
  </select>
  <label>Rol</label>  
  <select id="rol-update" class="form-control" required>  
    <option selected>${usuarios[index].rol}</option>
    <option value="admin">admin</option>
    <option value="usuario">usuario</option>    
  </select>
  <button class="btn btn-primary mt-3 float-end">Guardar</button>
</form>`;

  //agregar al body del modal
  bodyModal.innerHTML = contenidoBody;
};

  
//Actualizar el usuario--------------------------------
const actualizarUsuario = function (e, index) {
  e.preventDefault(); //para evitar que se envie

  //tenemos que obtener todos los datos del formulario
  let nombre = document.getElementById("nombre-update").value;
  let email = document.getElementById("mail-update").value;
  let estado = document.getElementById("estado-update").value;  
  let rol= document.getElementById("rol-update").value;
  let password=usuarios[index].password;

  const newUsuario = {
    nombre,
    email,
    estado,
    rol,
    password
  };

  usuarios.splice(index, 1, newUsuario); //en la posicion index, elimina uno y lo reemplaza por nes Usuario
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  myModal.hide(); //ocultar el modal
  cargarTabla();  //cargar de nuevo la tabla, para ver reflejados los cambios
};

const borrarusuario = function(index){
  usuarios.splice(index, 1); //en la posicion index, elimina uno 
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  cargarTabla();  //cargar de nuevo la tabla, para ver reflejados los cambios
};

const cargarTabla = () => {
    tableBody.innerHTML = "";
  
    usuarios.map(function (usu, index) {
      let tr = document.createElement("tr");
      let celda = `<th scope="row">${index + 1}</th>
          <td>${usu.nombre}</td>
          <td>${usu.email}</td>
          <td>${usu.estado}</td>
          <td>${usu.rol}</td>
          <td><button class="btn btn-warning btn-sm" onclick="editModal(${index})"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
          <td><button class="btn btn-danger btn-sm" onclick="borrarusuario(${index})"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
          </td>
          `;
  
      tr.innerHTML = celda;
      tableBody.appendChild(tr);
    });
  };


  function cerrarSesion(){
    location.href='../index.html';
  }

  cargarTabla();