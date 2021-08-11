$(document).ready(function () {

    let id = 3896198;
    let data = [];
    const items = $("#item-card");
    const templateCards = $("#template-card").contents();
    const fragment = document.createDocumentFragment();
    
    
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
            templateCards.find("button").attr("id", data.indexOf(producto));

            const clon = templateCards.clone(true);
            items.append(clon);
        });
        
    }
    

    
/* 
    for (let i = 1; i <= 8; i++) {

        $.ajax({

            type: "GET",
            url: "http://www.omdbapi.com/?apikey=e0e85859&i=tt" + id,
            dataType: "json",
            success: function (data) {

                if (data.Response == "True") {
                    let poster = data.Poster;
                    let titulo = data.Title;
                    let plot = data.Plot;

                    $("#item-card").append(`
                    <div class="col">
                        <div class="card h-100">
                            <img src="${poster}" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">${titulo}</h5>
                                <p class="card-text">${plot}</p>
                            </div>
                            <div class="card-footer">
                            <button class="btn btn-primary">Agregar al Carrito</button>
                            </div>
                        </div>
                    </div>
                    `);
                }

                const addCarrito = e => {
                    console.log(e.target);
                }

                $("#item-card").click(function (e) {
                    addCarrito(e);
                });

                


            }
        });
        id++;
    }
*/
});