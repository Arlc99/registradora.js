 const productoSelect = document.getElementById('producto');
    const cantidadInput = document.getElementById('cantidad');
    const totalDiv = document.getElementById('total');
    const cajaProductos = document.getElementById('p'); 
    const cajacantidad = document.getElementById('c'); 
  
  

    let contadorCompras=0; 
    let total = 0;

    document.getElementById('agregar').addEventListener('click', () => {
      
        if(contadorCompras > 0) {
            
            
            cajaProductos.innerHTML = "PRODUCTOS";
            cajacantidad.innerHTML = "CANTIDAD"; 
            totalDiv.innerHTML = "TOTAL:" + " " + "0" ;
            contadorCompras=0;
        }
         
      
        const opcionSeleccionada = productoSelect.options[productoSelect.selectedIndex].text;
        const pre = parseFloat(productoSelect.selectedOptions[0].getAttribute('data-precio'));
        const cantidad = parseInt(cantidadInput.value);
       
        if (pre > 0 && cantidad > 0) {
            console.log("entro");
            total += pre * cantidad;
            cajaProductos.innerHTML += "<br>" + opcionSeleccionada; 
            cajacantidad.innerHTML += "<br>" + cantidad; 
         
        } else {
            Swal.fire({
                title: "Selecciona un Producto",
                showClass: {
                  popup: `
                    animate__animated
                    animate__fadeInUp
                    animate__faster
                  `
                },
                hideClass: {
                  popup: `
                    animate__animated
                    animate__fadeOutDown
                    animate__faster
                  `
                }
              });
        }
     
        
       
        productoSelect.selectedIndex = 0;
        cantidadInput.value = 1; 

       
    });
    document.getElementById('comprar').addEventListener('click', () =>{
         contadorCompras++; 
        if(total>0){
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                  confirmButton: "btn btn-success",
                  cancelButton: "btn btn-danger"
                },
                buttonsStyling: false
              });
              swalWithBootstrapButtons.fire({
                title: "confirmar Compra",
                text: "confirme si desea hacer la compra",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "confirmar",
                cancelButtonText: "cancelar",
                reverseButtons: true
              }).then((result) => {
                if (result.isConfirmed) {

                  swalWithBootstrapButtons.fire({
                    title: "compra exitosa",
                    text: "en hora buena",
                    icon: "success"
                  });
                  
                      totalDiv.innerHTML =`Total: $${total.toFixed(2)}`;
                     total = 0; 
                     
                } else if (
                  /* Read more about handling dismissals below */
                  result.dismiss === Swal.DismissReason.cancel
                ) {

                  swalWithBootstrapButtons.fire({
                    title: "compra cancelada",
                    text: "lo sentimos, te esperamos pronto",
                    icon: "error"
                  });
                  total = 0; 
                  productoSelect.selectedIndex = 0; // Reset the select
                  cantidadInput.value = 1; // Reset quantit
                  cajaProductos.innerHTML = "PRODUCTOS";
                  cajacantidad.innerHTML = "CANTIDAD"; 
                }
              });
        }else{
            Swal.fire("Agrega productos a la factura");
        }
       
      

      
       
    })

    document.getElementById('borrar').addEventListener('click', () => {
        productoSelect.selectedIndex = 0;
        cantidadInput.value = 1; 
        cajaProductos.innerHTML = "PRODUCTOS";
        cajacantidad.innerHTML = "CANTIDAD"; 
        totalDiv.innerHTML = "TOTAL:" + " " + "0" ;
        total =0 ; 
    })