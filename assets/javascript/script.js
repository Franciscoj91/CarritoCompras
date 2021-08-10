$(document).ready(function () {

    let id = 3896198;


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

                




            }
        });
        id++;
    }

});