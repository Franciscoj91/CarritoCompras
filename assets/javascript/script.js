$(document).ready(function () {

    let id = 3896198;
    let data = [];
    let carrito = {};
    let clon1;
    let clon2;
    const items = $("#item-card");
    const itemsTabla = $("#tabla-body");
    const footer = $("#tabla-footer");
    const templateCards = $("#template-card").contents();
    const templateCarrito = $("#template-carrito").contents();
    const templateFooter = $("#template-footer").contents();
    
    
    
    $("#item-card").click(e => { 
        addCarrito(e);
        
    });
    
    const fetchData = async () => {

        try {
            for (let i=0; i < 8;i++) {
                let response = await fetch('http://www.omdbapi.com/?apikey=e0e85859&i=tt' + id);
                data[i] = await response.json();
                id++;
            }
            //console.log(data);
            dibujarCards(data);
        } catch (error) {
            console.log(error);
        }
    }
     
    fetchData();

    const dibujarCards = data => {
        data.forEach(producto => {
            templateCards.find("h5").html(producto.Title);
            templateCards.find("p").html(producto.Plot);
            templateCards.find("img").attr("src", producto.Poster);
            templateCards.find("button").attr("id", data.indexOf(producto) + 1);

            clon1 = templateCards.clone(true);
            items.append(clon1);
        });
        
    }

    const addCarrito = e => {
        let target = $(e.target);
        //console.log(target.hasClass("btn-primary"));
        if(target.hasClass("btn-primary")) {
            
            
            setCarrito(target.parent("div"));
        }
        e.stopPropagation()
    }

    const setCarrito = objeto => {
        //console.log(objeto);
        const producto = {
            id: objeto.find(".btn-primary").attr("id"),
            title: objeto.find("h5").text(),
            cantidad: 1
        }

        if(carrito.hasOwnProperty(producto.id)) {
            producto.cantidad = carrito[producto.id].cantidad + 1;
        }

        carrito[producto.id] = {...producto};
        dibujarCarrito();
    }

    const dibujarCarrito = () => {
        
        itemsTabla.html("");
        Object.values(carrito).forEach(item => {
            templateCarrito.find("th").html(item.id);
            templateCarrito.find("td:eq(0)").html(item.title);
            templateCarrito.find("td:eq(1)").html(item.cantidad);

            clon2 = templateCarrito.clone(true);
            itemsTabla.append(clon2);
        }); 
    }

    


    

});