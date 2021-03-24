const express = require("express");
const createError = require("http-errors");
const app = express();
const port = 3000;

app.set("view engine", "ejs");

// Información para la página
let postresSuaves = [
    {
        id: 1,
        nombre: 'Flan',
        sabor: 'Vainilla',
        img: '/img/kobby-mendez-4rymwWECY7I-unsplash.jpg',
        cssClass: 'postre-frio',
        tipoPostre: 'suaves',

    },
    {
        id: 2,
        nombre: 'Mousse',
        sabor: 'Chocolate',
        img: '/img/pexels-ella-olsson-3026810.jpg',
        tipoPostre: 'suaves',

    },
    {
        id: 3,
        nombre: 'Pastel',
        sabor: 'Tres leches',
        img: '/img/pexels-caramelle-bakery-4699096.jpg',
        tipoPostre: 'suaves',

    },
];

let postresFrios = [
    {
        id: 1,
        nombre: 'Helado',
        sabor: 'Galleta',
        img: '/img/pexels-roman-odintsov-5060281.jpg',
        cssClass: 'postre-frio',
        tipoPostre: 'frios',

    },
    {
        id: 2,
        nombre: 'Pay',
        sabor: 'Limón',
        img: '/img/pexels-alesia-kozik-6631965.jpg',
        tipoPostre: 'frios',

    },
    {
        id: 3,
        nombre: 'Paleta helada',
        sabor: 'Frutas',
        img: '/img/pexels-jill-wellington-461189.jpg',
        tipoPostre: 'frios',

    },
];

let postresCalientes = [
    {
        id: 1,
        nombre: 'Chocolate Lava Cake',
        sabor: 'Chocolate',
        img: '/img/pexels-kristina-paukshtite-1998633.jpg',
        tipoPostre: 'calientes',

    },

    {
        id: 2,
        nombre: 'Chocolate Caliente',
        sabor: 'Chocolate',
        img: '/img/pexels-polina-tankilevitch-5419239.jpg',
        tipoPostre: 'calientes',

    },
    {
        id: 3,
        nombre: 'brownie',
        sabor: 'Chocolate',
        img: '/img/pexels-pixabay-45202.jpg',
        tipoPostre: 'calientes',

    },
];

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("pages/index", {});
});

app.get("/postres/suaves", (req, res) => {
    res.render("pages/postres/suaves", {
        postres: postresSuaves
    });
});

app.get("/postres/frios", (req, res) => {
    res.render("pages/postres/frios", {
        postres: postresFrios
    });
});

app.get("/postres/calientes", (req, res) => {
    res.render("pages/postres/calientes", {
        postres: postresCalientes
    });
});

// /postres/suaves/postre?id=1
// /postres/suaves/postre?id=2
app.get("/postres/:tipoPostre/postre", (req, res, next) => {
    // Query Params
    // ?id=1
    // req.query.id
    // for (const key in object) {
    //     if (Object.hasOwnProperty.call(object, key)) {
    //         const element = object[key];

    //     }
    // }

    let id = req.query.id;
    let tipoPostre = req.params.tipoPostre;
    let postres = [];

    switch (tipoPostre) {
        case "suaves":
            postres = postresSuaves;
            break;

        case "calientes":
            postres = postresCalientes;
            break;

        case "frios":
            postres = postresFrios;
            break;

        default:
            break;
    }

    for (let i = 0; i < postres.length; i++) {
        const postre = postres[i];

        if (postre.id.toString() === id) { //*
            //return finalizar función actual (req, res)
            return res.render("pages/postres/postre", {
                // postre: postre
                postre
            });
        }
    }

    return next();

    // TODO: Mostrar error 404

    // for (const i of postresSuaves) {
    // }
    // array.forEach(element => {

    // });
});

app.get("/search", (req, res) => {
    // query -> lo que está en el name del input
    console.log('req.query.query', req.query.query);
    let query = req.query.query;
    
    // En este arreglo vamos a guardar los resultados de la búsqueda
    let resultados = [];

    // Paso #1 buscar en el primer arreglo de postres
    // - nombre
    for (let i = 0; i < postresSuaves.length; i++) {
        const postre = postresSuaves[i];
        // Revisar si el nombre coincide con la búsqueda
        if (postre.nombre.toLowerCase() === query.toLowerCase()) {
            // Agregar postre al arreglo de resultados
            resultados.push(postre);
        }
    }

    // Paso #2 buscar en el segundo arreglo de postres
    for (let i = 0; i < postresCalientes.length; i++) {
        const postre = postresCalientes[i];
        // Revisar si el nombre coincide con la búsqueda
        if (postre.nombre.toLowerCase() === query.toLowerCase()) {
            // Agregar postre al arreglo de resultados
            resultados.push(postre);
        }
    }

    for (let i = 0; i < postresFrios.length; i++) {
        const postre = postresFrios[i];
        // Revisar si el nombre coincide con la búsqueda
        if (postre.nombre.toLowerCase() === query.toLowerCase()) {
            // Agregar postre al arreglo de resultados
            resultados.push(postre);
        }
    }

    // Paso #3 buscar en el tercer arreglo de postres
    // TODO: implementar

    // Paso #4 pasar los resultados a la vista
    console.log('resultados', resultados);
    res.render("pages/search", {
        // resultados: resultados
        resultados
    });
});



app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    let message = err.message;
    let error = err;

    res.status(err.status || 500);
    res.render("pages/error", {
        message,
        error
    });
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});