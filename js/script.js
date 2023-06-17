// Función para agregar un vehículo
function agregarVehiculo(event) {
    event.preventDefault();

    let vehiculo = {};
    vehiculo.tipo = document.getElementById("tipoVehiculo").value;
    vehiculo.numeroPlaca = document.getElementById("numeroPlaca").value.trim();
    vehiculo.horaEntrada = new Date();

    if (vehiculo.numeroPlaca !== "") {
        let vehiculos = JSON.parse(localStorage.getItem("vehiculos")) || [];
        vehiculos.push(vehiculo);
        localStorage.setItem("vehiculos", JSON.stringify(vehiculos));

        mostrarVehiculosRegistrados();
        document.getElementById("vehiculoForm").reset();
    }
}

// Función para mostrar los vehículos registrados
function mostrarVehiculosRegistrados() {
    let vehiculos = JSON.parse(localStorage.getItem("vehiculos")) || [];

    let tablaVehiculos = document.getElementById("tablaVehiculos");
    tablaVehiculos.innerHTML = "";

    if (vehiculos.length === 0) {
        tablaVehiculos.innerHTML = "<tr><td colspan='7'>No hay vehículos registrados.</td></tr>";
    } else {
        vehiculos.forEach(function (vehiculo, index) {
            let tiempoEstacionado = Math.abs(new Date() - new Date(vehiculo.horaEntrada));
            let minutosEstacionados = Math.ceil(tiempoEstacionado / (1000 * 60));

            let valorMinuto;
            switch (vehiculo.tipo) {
                case "CARRO":
                    valorMinuto = 95;
                    break;
                case "MOTO":
                    valorMinuto = 49;
                    break;
                case "BICI":
                    valorMinuto = 10;
                    break;
                default:
                    valorMinuto = 0;
                    break;
            }

            let valorAPagar = valorMinuto * minutosEstacionados;

            let row = document.createElement("tr");
            row.innerHTML = `
          <td>${index + 1}</td>
          <td>${vehiculo.tipo}</td>
          <td>${vehiculo.numeroPlaca}</td>
          <td>${vehiculo.horaEntrada}</td>
          <td>${minutosEstacionados}</td>
          <td>$${valorAPagar.toFixed(2)}</td>
          <td><button class="btn btn-danger btn-sm" onclick="limpiarVehiculo(${index})">Limpiar</button></td>
        `;

            tablaVehiculos.appendChild(row);
        });
    }
}

// Función para limpiar un vehículo del registro
function limpiarVehiculo(index) {
    let vehiculos = JSON.parse(localStorage.getItem("vehiculos")) || [];

    if (index >= 0 && index < vehiculos.length) {
        vehiculos.splice(index, 1);
        localStorage.setItem("vehiculos", JSON.stringify(vehiculos));

        mostrarVehiculosRegistrados();
    }
}

// Asociar el evento submit del formulario a la función agregarVehiculo
document.getElementById("vehiculoForm").addEventListener("submit", agregarVehiculo);

// Mostrar los vehículos registrados al cargar la página
mostrarVehiculosRegistrados();

// Función para actualizar el reloj en tiempo real
function actualizarReloj() {
    let relojElement = document.getElementById("reloj");

    setInterval(() => {
        let fechaHora = new Date();
        let hora = fechaHora.getHours().toString().padStart(2, "0");
        let minutos = fechaHora.getMinutes().toString().padStart(2, "0");
        let segundos = fechaHora.getSeconds().toString().padStart(2, "0");

        relojElement.textContent = `${hora}:${minutos}:${segundos}`;
    }, 1000);
}

// Llamar a la función para actualizar el reloj al cargar la página
actualizarReloj();