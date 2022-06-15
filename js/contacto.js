let usuario=JSON.parse(localStorage.getItem('user')) || null

let contenedor_lista=document.getElementById('menu_lista')

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

function cerrarSesion(){
   location.href='../index.html';
}