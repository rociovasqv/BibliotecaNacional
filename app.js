
let auxiliar
id = auxiliar

// LIBROS ---------------------------------------------------------------------------------------------------------------------------------

//Declaración de variables
const titulo = document.getElementById("tit")
const autor = document.getElementById("author")

const btnAgrgL = document.getElementById("agrgL")
const btnActualL = document.getElementById("actualL")
const listadoLibros = document.getElementById("listLibros")

listarLibros()

//Validar Libros
async function validacionLibros()
{
    let bandera = false;

    try{

            if(titulo.value == "" || autor.value == "")
            {
                bandera = true,
                alert("Ingrese datos")
            }
        }
        catch(error)
        {
            console.log(error)
        }  
        return bandera;

    try{
            resp = await axios.get("http://localhost:3000/libros/");
            resp.data.forEach((element) =>
            {
            if (titulo.value == element.titulo || autor.value == element.autor)
            {
                bandera = true,
                alert("El nombre ya existe, ingrese de nuevo, por favor");
            }
            })    
        }
        catch(error)
        {
            console.log(error)
        }
}


//CRUD Libros

//CREATE - Agregar Libros

if (validacionLibros()){
    alert("Rellene los datos")
}else{
        agregarL()
    }

async function agregarL()
        {
        resp = await axios.post("http://localhost:3000/libros/",
        {
            titulo : titulo.value,
            autor : autor.value

        })
        alert("El libro fue añadido correctamente")
        }

//READ - Listar Libros
async function listarLibros()
{
    resp = await axios.get("http://localhost:3000/libros/")
    listadoLibros.innerHTML= ""
    resp.data.forEach(element =>
        {
            listadoLibros.innerHTML +=
          
            '<div class=boxLibros><br>Título:'+element.titulo+'<br> Autor/a:'+element.autor+'<br>ID:'+element.id+'<br><br><button onclick= borrarL('+element.id+')>Borrar</button><button onclick=actualL('+element.id+')">Editar</button></div>'
          
            /* OTRA OPCION:
            `<div class=boxLibros>
            <br>
            Título: ${element.titulo}
            <br> 
            Autor/a: ${element.autor}
            <br>
            ID: ${element.id}
            <br><br>
            <button onclick= borrarL(${element.id})>Borrar</button>
            <button onclick= actualL(${element.id})">Editar</button>
            </div>`*/
        })
}

//UPDATE - Mostrar Libros
async function mostrarLibros(id)
{
    btnActualL.hidden= false;
    btnAgrgL.hidden= true;
    auxiliar=id
    resp = await axios.get(" http://localhost:3000/libros/"+ id);
    titulo.value = resp.data.titulo,
    autor.value= resp.data.autor
    
    listarLibros()
}

//UPDATE - Actualizar Libros
async function actualL(){
    btnActualL.hidden= true;
    btnAgrgL.hidden= false;
   
    resp = await axios.put("http://localhost:3000/libros/" + auxiliar,{
        titulo: titulo.value,
        autor: autor.value
    })
    alert("Datos modificados correctamente")
    listarLibros()

    }

//DELETE - Borrar Libros
async function borrarL(id)
{
    try{
        if(libroNoDev(id))
        {
            alert("No se puede borrar el libro que no está disponible")
        }
        else{
            resp = await axios.delete("http://localhost:3000/libros/"+id);
            listarLibros()
            alert("Datos eliminados correctamente")
        }
    }
    catch{
        alert("Error al borrar")
    }
}

async function libroNoDev(id)
{
    let bandera = false;
        try{
                let resp = await axios.get(" http://localhost:3000/prestamos");
                resp.data.forEach(element =>
                    {
                        if(element.librosid == id && element.fechaDevolucion == "")
                        {
                            bandera = true;
                        }
                    })
            }
            catch(error)
            {
                console.log(error)
            }
            return bandera
    }

//ALUMNOS---------------------------------------------------------------------------------------------------------------------------------

//Declaración de variables
const nombre = document.getElementById("nombre")
const dni = document.getElementById("dniAlum")
const direccion = document.getElementById("direccion")

const btnagrgAlumno = document.getElementById("agrgAlum")
const btnactualAlumno = document.getElementById("actualAlum")
const listadoAlumnos = document.getElementById("mostrarAlum")

listarAlumnos()

//Validar Alumnos
async function validacionAlum()
{
    let bandera = false;
    try{
        if(nombre.value == "" || dni.value == "" || direccion.value == "")
        {
            bandera = true,
            alert("Ingrese datos")
        }
    }
    catch(error)
    {
        console.log(error)
    }
    return bandera

}

//CRUD Alumnos

//CREATE - Agregar Alumnos

if (validacionAlum()){
    alert("Rellene los datos")
}else{
        agrgAlumno()
    }

async function agrgAlumno()
{
   await axios.post( "http://localhost:3000/alumnos/",
    {
        nombre: nombre.value,
        dni: dni.value,
        direccion: direccion.value
    }
   )
   alert("El alumno fue añadido correctamente")
}

//READ - Listar Alumnos
async function listarAlumnos()
{
    resp = await axios.get("http://localhost:3000/alumnos/")
    listadoAlumnos.innerHTML= "";
    resp.data.forEach(element =>
        {
           listadoAlumnos.innerHTML +=
            `<div class=boxAlumnos>
            <br>
            Nombre: ${element.nombre}
            <br> 
            DNI: ${element.dni}
            <br>
            Dirección: ${element.direccion}
            <br><br>
            <button onclick= borrarAlumno(${element.id})>Borrar</button>
            <button onclick=actualizarAlumno(${element.id})">Editar</button>
            </div>`
        })
}

//UPDATE - Mostrar Alumnos
async function mostrarAlumnos(id)
{
   resp = await axios.get("http://localhost:3000/alumnos/"+id)
    .then( async function(resp)
    {
        btnactualAlumno.hidden= false;
        btnagrgAlumno.hidden= true;
        auxiliar = id
        resp = await axios.get("http://localhost:3000/alumnos/" + id);
        dni.value = resp.data.dniAlum,
        nombre.value = resp.data.nombre,
        direccion.value = resp.data.direccion
    })

    listarAlumnos()
}


//UPDATE - Actualizar Alumnos
async function actualizarAlumno() 
{
    try{
            btnactualAlumno.hidden = true;
            btnagrgAlumno.hidden = false;

            await axios.put("http://localhost:3000/alumnos/" + id, 
            {
            dni: dni.value,
            nombre: nombre.value,
            direccion: direccion.value
            })
        }
        catch(error){
            console.log(error)
            alert("error")
        }
}

//DELETE - Borrar Alumnos
async function borrarAlumno(id)
{
    try{
        if(deudaAlum(id))
        {
            alert("El alumno debe deudas, no se puede borrar del sistema")
        }
        else{
            await axios.delete("http://localhost:3000/alumnos/"+id);
            alert("Datos borrados correctamente")
            listarAlumnos()
        }
    }
    catch(error){
        console.log(error)
        alert("Error al borrar")
    }
}

async function deudaAlum(id)
{
    let bandera = false;
        try{
            let resp = await axios.get(" http://localhost:3000/prestamos/");
            resp.data.forEach(element =>
                {
                    if(element.alumnosid == id && element.fechaDevolucion == "")
                    {
                        bandera = true;
                    }
                })
        }
        catch(error)
        {
            console.log(error)
        }
        return bandera
}



//PRESTAMOS Y DEVOLUCIONES---------------------------------------------------------------------------------------------------------------------

//Declaración de variables

const seleccionL = document.getElementById("libroSelec")
const seleccionID = document.getElementById("alumSelec")
const btnActualPD = document.getElementById("actualPD")

//Prestamos
const fechaE = document.getElementById("fechaEntrega")
const btnAgregarPrestamo = document.getElementById("agrgPrestamo")
const listadoPrestamo = document.getElementById("listPrestamos")

//Devoluciones
const fechaD = document.getElementById("fechaDev")
const listadoDev = document.getElementById("listDev")

listarPrestamos()
listarSelect()

//PRESTAMOS -----------------------------------------------------------------------------------------------------------------------

//VALIDAR Prestamos
async function validacionPrestamo()
{
  let bandera = false;
  try{
    if(fechaEntrega.value == "")
    {
        bandera = true;
        alert("Ingrese datos")
    }
  }
  catch(error)
  {
    console.log(error)
  }
  return bandera
}

//CRUD Prestamo

//CREATE - Agregar Prestamos
async function agrgPrestamo()
{
    try{
        resp = await axios.post("http://localhost:3000/prestamos/",
        {
            librosid: seleccionL.value,
            alumnosid: seleccionID.value,
            fechaEntrega: fechaE.value,
            fechaDevolucion: fechaD.value
        })
    }
    catch(error)
    {
        console.log(error)
    }

}

//READ - Listar Prestamos
async function listarPrestamos()
{
    try{
        let resp = await axios.get("http://localhost:3000/prestamos/");
        listadoPrestamo.innerHTML = "";
        listadoDev.innerHTML = "";

        resp.data.forEach(element =>
            {
                listadoPrestamo.innerHTML += 
                    "<fieldset><br><br> ID del libro:" + element.librosid +
                    "<br><br>"+
                    "ID del alumno:"+ element.alumnosid +
                    "<br><br>"+
                    "Fecha de entrega:"+ element.fechaEntrega + 
                    "<br><br>"+
                    "Fecha de devolución: "+ element.fechaDevolucion + 
                    "<br><br>"+
                    "<button onclick= 'devolverL(" + element.id +")'>Devolver</button>" +
                    "<br><br>"+
                    "<button onclick= 'actualizarPD(" + element.id +")'>Editar</button>"+
                    "<br><br></fieldset>"

                    listadoDev.innerHTML += 
                    "<fieldset><br><br>ID del libro: " + element.librosid +
                    "<br><br>"+
                    "ID del alumno: "+ element.alumnosid +
                    "<br><br>"+
                    "Fecha de devolución: "+ element.fechaDevolucion + 
                    "<br><br>"+
                    "<button onclick= 'borrarDev(" + element.id +")'>Borrar</button><br><br></fieldset>"
                })

    }
    catch(error)
    {
        console.log(error);
    }
       //Otra opción
           /* `<div class=boxPrestamos>
            <br>
            Libro: ${element.titulo}
            <br>
            ID del libro: ${element.librosid}
            <br>
            Alumno: ${element.nombre}
            <br> 
            ID de Alumno: ${element.alumnosid}
            <br> 
            DNI: ${element.dni}
            <br>
            Fecha de entrega: ${element.fechaEntrega}
            <br><br>
            <button onclick= devolverL(${element.id})>Devolver</button>
            </div>`*/

}   

//Listar Libros y Alumnos
async function listarSelect()
{
    try{
        let respL = await axios.get("http://localhost:3000/libros/");
        seleccionL.innerHTML += "";
        respL.data.forEach((element) =>
        {
            seleccionL.innerHTML += '<option value="' + element.id + '" id="">' + element.titulo + '</option>'
    });
        let respA = await axios.get("http://localhost:3000/alumnos/");
        seleccionID.innerHTML += "";
        respA.data.forEach((element)=>
        {
            seleccionID.innerHTML+= '<option value="' + element.id + '" id="">' + element.nombre + '</option>'
        })    
    }
    catch(error)
    {
        console.log(error);
    }
}

//UPDATE - Mostrar Prestamos
async function mostrarPrestamos(id)
{   
   btnActualPD.hidden= false;
   btnAgregarPrestamo.hidden= true;
   auxiliar=id

   resp = await axios.get(" http://localhost:3000/prestamos/"+ id);
   librosid.value = resp.data.seleccionL,
   alumnosid.value= resp.data.seleccionID,
   fechaEntrega.value = resp.data.fechaE,
   fechaDevolucion.value = resp.data.fechaD

   listarPrestamos()
   listarSelect()
}

//UPDATE - Actualizar Prestamos y Devoluciones
async function actualizarPD()
{
    try{
        btnActualPD.hidden = true;
        btnAgregarDev.hidden = false;
        btnAgregarPrestamo.hidden = false;

        resp = await axios.put("http://localhost:3000/prestamos/" + id,
        {
            librosid: seleccionL.value,
            alumnosid: seleccionID.value,
            fechaEntrega: fechaE.value,
            fechaDevolucion: fechaD.value

        })
    }
    catch(error)
    {
        console.log(error)
    }
}


//DELETE - Borrar Prestamos
async function devolverL(id)
{
    try{
        if(await libroNoDev())
        {
            alert("No se puede borrar. El libro no está disponible")
        }
        else
        {
            await axios.delete("http://localhost:3000/prestamos/" + id)
            listarPrestamos()
            listarSelect()
        }
    }
    catch(error)
    {
        console.log(error)
    }
}

async function borrarDev(id)
{
    await axios.delete("http://localhost:3000/prestamos/" + id);
    listarPrestamos()
    listarSelect()
}

//DEVOLUCIONES --------------------------------------------------------------------------------------------------------------------

//VALIDAR Devolucion
async function validacionDev()
{
  let bandera = false;
  try{
    if(fechaDevolucion.value == "")
    {
        bandera = true;
        alert("Ingrese datos")
    }
  }
  catch(error)
  {
    console.log(error)
  }
  return bandera
}