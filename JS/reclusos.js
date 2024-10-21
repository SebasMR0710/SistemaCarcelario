document.addEventListener("DOMContentLoaded", function () {
    const formReclusos = document.getElementById("form-reclusos");
    const tablaReclusos = document.getElementById("tabla-reclusos").getElementsByTagName("tbody")[0];

    // Cargar reclusos desde localStorage
    let reclusos = JSON.parse(localStorage.getItem("reclusos")) || [];
    renderReclusos();

    // Función para agregar un recluso
    formReclusos.addEventListener("submit", function (e) {
        e.preventDefault();

        // Obtener los valores del formulario
        const nombre = document.getElementById("nombre").value;
        const identificacion = document.getElementById("identificacion").value;
        const delitos = document.getElementById("delitos").value;
        const condena = document.getElementById("condena").value;
        const fechaIngreso = document.getElementById("fecha-ingreso").value;

        // Crear objeto recluso
        const recluso = { nombre, identificacion, delitos, condena, fechaIngreso };

        // Agregar al array de reclusos y guardar en localStorage
        reclusos.push(recluso);
        localStorage.setItem("reclusos", JSON.stringify(reclusos));

        // Renderizar la tabla de nuevo
        renderReclusos();

        // Limpiar el formulario
        formReclusos.reset();
    });

    // Función para renderizar los reclusos en la tabla
    function renderReclusos() {
        tablaReclusos.innerHTML = ""; // Limpiar la tabla

        reclusos.forEach((recluso, index) => {
            const newRow = tablaReclusos.insertRow();

            newRow.innerHTML = `
                <td>${recluso.nombre}</td>
                <td>${recluso.identificacion}</td>
                <td>${recluso.delitos}</td>
                <td>${recluso.condena}</td>
                <td>${recluso.fechaIngreso}</td>
                <td>
                    <button class="btn btn-warning btn-sm me-2 editar" data-index="${index}">Editar</button>
                    <button class="btn btn-danger btn-sm eliminar" data-index="${index}">Eliminar</button>
                </td>
            `;
        });
    }

    // Función para eliminar un recluso
    tablaReclusos.addEventListener("click", function (e) {
        if (e.target.classList.contains("eliminar")) {
            const index = e.target.getAttribute("data-index");
            reclusos.splice(index, 1); // Eliminar el recluso del array
            localStorage.setItem("reclusos", JSON.stringify(reclusos)); // Actualizar localStorage
            renderReclusos(); // Volver a renderizar la tabla
        }
    });

    // Función para editar un recluso
    tablaReclusos.addEventListener("click", function (e) {
        if (e.target.classList.contains("editar")) {
            const index = e.target.getAttribute("data-index");
            const recluso = reclusos[index];

            // Rellenar el formulario con los datos del recluso seleccionado
            document.getElementById("nombre").value = recluso.nombre;
            document.getElementById("identificacion").value = recluso.identificacion;
            document.getElementById("delitos").value = recluso.delitos;
            document.getElementById("condena").value = recluso.condena;
            document.getElementById("fecha-ingreso").value = recluso.fechaIngreso;

            // Eliminar la fila editada
            reclusos.splice(index, 1);
            localStorage.setItem("reclusos", JSON.stringify(reclusos));
            renderReclusos(); // Volver a renderizar la tabla
        }
    });
    function addInmateToTable(inmate) {
        const tableBody = document.querySelector("#inmate-table tbody");
        const row = document.createElement("tr");
    
        // No necesitamos la clase 'table-dark' ahora
        row.innerHTML = `
            <td>${inmate.name}</td>
            <td>${inmate.id}</td>
            <td>${inmate.crime}</td>
            <td>${inmate.sentence}</td>
            <td>${inmate.entryDate}</td>
            <td>
                <button class="btn btn-warning btn-sm edit-btn">Editar</button>
                <button class="btn btn-danger btn-sm delete-btn">Eliminar</button>
            </td>
        `;
        
        tableBody.appendChild(row);
    }    
});