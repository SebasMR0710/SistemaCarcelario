// Obtener las actividades almacenadas en localStorage
document.addEventListener('DOMContentLoaded', () => {
    cargarActividades();
});

// Manejar el formulario de actividades
document.getElementById('formActividades').addEventListener('submit', function (e) {
    e.preventDefault(); // Evitar el envío del formulario

    // Obtener valores de los campos
    const tipoActividad = document.getElementById('tipoActividad').value;
    const descripcionActividad = document.getElementById('descripcionActividad').value;
    const cantidad = document.getElementById('cantidad').value;

    // Validaciones
    if (!tipoActividad || !descripcionActividad || !cantidad) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    // Crear objeto actividad
    const actividad = {
        tipo: tipoActividad,
        descripcion: descripcionActividad,
        cantidad: cantidad
    };

    // Agregar la actividad a la tabla
    agregarActividadATabla(actividad);

    // Guardar la actividad en localStorage
    guardarActividad(actividad);

    // Limpiar formulario
    document.getElementById('formActividades').reset();
});

// Función para agregar la actividad a la tabla
function agregarActividadATabla(actividad) {
    const tabla = document.getElementById('tablaActividades');
    const nuevaFila = document.createElement('tr');

    nuevaFila.innerHTML = `
        <td>${actividad.tipo}</td>
        <td>${actividad.descripcion}</td>
        <td>${actividad.cantidad}</td>
        <td><button class="btn btn-danger btn-sm" onclick="eliminarActividad(this)">Eliminar</button></td>
    `;

    tabla.appendChild(nuevaFila);
}

// Función para guardar actividades en localStorage
function guardarActividad(actividad) {
    let actividades = JSON.parse(localStorage.getItem('actividades')) || [];
    actividades.push(actividad);
    localStorage.setItem('actividades', JSON.stringify(actividades));
}

// Función para cargar actividades desde localStorage al recargar la página
function cargarActividades() {
    const actividades = JSON.parse(localStorage.getItem('actividades')) || [];
    actividades.forEach(actividad => agregarActividadATabla(actividad));
}

// Función para eliminar actividades
function eliminarActividad(boton) {
    // Eliminar fila de la tabla
    const fila = boton.parentNode.parentNode;
    const descripcion = fila.children[1].textContent; // Obtener la descripción como identificador
    fila.remove();

    // Eliminar actividad de localStorage
    let actividades = JSON.parse(localStorage.getItem('actividades')) || [];
    actividades = actividades.filter(actividad => actividad.descripcion !== descripcion);
    localStorage.setItem('actividades', JSON.stringify(actividades));
}

// Función para generar reporte
function generarReporte() {
    const actividades = JSON.parse(localStorage.getItem('actividades')) || [];
    if (actividades.length === 0) {
        alert("No hay actividades registradas.");
        return;
    }

    let reporte = '<h4>Reporte Diario de Actividades</h4>';
    actividades.forEach((actividad, index) => {
        reporte += `
            <p><strong>Actividad ${index + 1}:</strong></p>
            <p><strong>Tipo:</strong> ${actividad.tipo}</p>
            <p><strong>Descripción:</strong> ${actividad.descripcion}</p>
            <p><strong>Cantidad:</strong> ${actividad.cantidad}</p>
            <hr>
        `;
    });

    // Mostrar reporte en el modal
    document.getElementById('reporteContenido').innerHTML = reporte;
    const reporteModal = new bootstrap.Modal(document.getElementById('reporteModal'));
    reporteModal.show();
}