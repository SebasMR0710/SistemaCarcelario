// JavaScript para manejar las visitas
document.addEventListener("DOMContentLoaded", function () {
    const formVisitas = document.getElementById('form-visitas');
    const tablaVisitas = document.getElementById('tabla-visitas').getElementsByTagName('tbody')[0];
    const selectReclusos = document.getElementById('nombre-recluso'); // Select del recluso

    // Cargar reclusos desde localStorage para llenar el menú desplegable
    const reclusos = JSON.parse(localStorage.getItem("reclusos")) || [];
    const visitas = JSON.parse(localStorage.getItem("visitas")) || []; // Cargar visitas desde localStorage

    // Llenar el menú desplegable con los nombres de los reclusos
    reclusos.forEach(function (recluso) {
        const option = document.createElement('option');
        option.value = recluso.nombre;
        option.textContent = recluso.nombre;
        selectReclusos.appendChild(option);
    });

    // Renderizar visitas desde localStorage al cargar la página
    renderVisitas();

    // Manejar el envío del formulario de visitas
    formVisitas.addEventListener('submit', function (e) {
        e.preventDefault();

        // Obtener los valores del formulario
        const nombreVisitante = document.getElementById('nombre-visitante').value;
        const nombreRecluso = selectReclusos.value; // Usar el valor seleccionado del menú desplegable
        const fechaVisita = document.getElementById('fecha-visita').value;

        // Validación rápida
        if (nombreVisitante.trim() === '' || nombreRecluso.trim() === '' || fechaVisita.trim() === '') {
            alert('Por favor, completa todos los campos.');
            return;
        }

        // Crear el objeto visita
        const visita = {
            nombreVisitante,
            nombreRecluso,
            fechaVisita
        };

        // Agregar la visita al array de visitas y guardar en localStorage
        visitas.push(visita);
        localStorage.setItem('visitas', JSON.stringify(visitas));

        // Renderizar la tabla de nuevo
        renderVisitas();

        // Limpiar el formulario después de agregar
        formVisitas.reset();
    });

    // Función para renderizar visitas en la tabla
    function renderVisitas() {
        tablaVisitas.innerHTML = ""; // Limpiar la tabla

        visitas.forEach(function (visita, index) {
            const nuevaFila = tablaVisitas.insertRow();
            nuevaFila.innerHTML = `
                <td>${visita.nombreVisitante}</td>
                <td>${visita.nombreRecluso}</td>
                <td>${visita.fechaVisita}</td>
                <td><button class="btn btn-danger btn-sm eliminar" data-index="${index}">Eliminar</button></td>
            `;

            // Manejar la eliminación de filas
            nuevaFila.querySelector('.eliminar').addEventListener('click', function () {
                eliminarVisita(index);
            });
        });
    }

    // Función para eliminar una visita
    function eliminarVisita(index) {
        visitas.splice(index, 1); // Eliminar la visita del array
        localStorage.setItem('visitas', JSON.stringify(visitas)); // Actualizar localStorage
        renderVisitas(); // Volver a renderizar la tabla
    }
});