const express = require('express');
const app = express();

app.use(express.json()); // Middleware para manejar JSON en las solicitudes

// Base de datos simulada
let corredores = [];

// Crear una nueva carrera (POST)
app.post('/carrera', (req, res) => {
    const { numeroCorredores, distancia } = req.body;
    if (!numeroCorredores || !distancia) {
        return res.status(400).send({ mensaje: 'Número de corredores y distancia son requeridos' });
    }

    corredores = Array.from({ length: numeroCorredores }, (_, indice) => ({
        id: indice + 1,
        posicion: 0,
        velocidad: Math.random() * 10 + 5, // Velocidad aleatoria entre 5 y 15 km/h
    }));

    res.send({
        mensaje: 'Carrera iniciada',
        corredores,
        distancia,
    });
});

// Obtener el estado actual de la carrera (GET)
app.get('/carrera', (req, res) => {
    if (corredores.length === 0) {
        return res.status(404).send({ mensaje: 'No hay carrera en curso' });
    }
    res.send({ corredores });
});

// Simular el avance de los corredores (PUT)
app.put('/carrera/avance', (req, res) => {
    const { horas, distancia } = req.body;
    if (!horas || !distancia) {
        return res.status(400).send({ mensaje: 'Horas de simulación y distancia son requeridas' });
    }

    let carreraFinalizada = false;
    corredores = corredores.map(corredor => {
        corredor.posicion += corredor.velocidad * horas;
        if (corredor.posicion >= distancia) {
            carreraFinalizada = true;
        }
        return corredor;
    });

    if (carreraFinalizada) {
        const ganador = corredores.reduce((prev, actual) =>
            prev.posicion > actual.posicion ? prev : actual
        );
        return res.send({
            mensaje: 'Carrera finalizada',
            ganador,
            resultados: corredores,
        });
    }

    res.send({ mensaje: 'Progreso actualizado', corredores });
});

// Reiniciar la carrera (DELETE)
app.delete('/carrera', (req, res) => {
    corredores = [];
    res.send({ mensaje: 'Carrera reiniciada' });
});

// Iniciar el servidor
app.listen(3000, () => {
    console.log('Servidor ejecutándose en puerto:3000');
});
