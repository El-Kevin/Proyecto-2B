const Track = require ('../models/trackModel');

const controller = {

    newRoute: async function(req, res) {
        try {
          const { id_user, name_route, begin_route, end_route, route_date} = req.body;
          
          // Crear la nueva ruta
          const newRoute = await Track.create({
            ID_USER: id_user,
            NAME_ROUTE: name_route,
            BEGIN_ROUTE: begin_route,
            END_ROUTE: end_route,
            DATE_ROUTE: route_date
          });
          
          // Enviar respuesta con la ruta creada
          return res.status(200).send({
            message: 'Ruta creada exitosamente',
            route: newRoute // Aquí se muestra la ruta creada
          });
        } catch (error) {
          // Manejo de errores
          console.error("Error al crear la ruta:", error);
          return res.status(500).send({ error: 'Error al crear la ruta' });
        }
      },

    getAllRoutes: async (req, res) => {
        try {
            const routes = await Track.findAll();
            res.status(200).send({ routes: routes });
        } catch (error) {
            console.error('Error al obtener las rutas:', error);
            res.status(500).send({ error: 'Error interno del servidor' });
        }
    },

    deleteRoute: async (req, res) => {
        const routeId = req.params.id;

        try {
            const deletedRoute = await Track.destroy({
                where: { ID_ROUTE: routeId }
            });

            if (deletedRoute === 1) {
                res.status(200).send({ message: 'Ruta eliminada exitosamente' });
            } else {
                res.status(404).send({ error: 'Ruta no encontrada' });
            }
        } catch (error) {
            console.error('Error al eliminar la ruta:', error);
            res.status(500).send({ error: 'Error interno del servidor' });
        }
    },

    updateRoute: async (req, res) => {
        const routeId = req.params.id;
        const updatedData = req.body;

        if (!routeId) {
            return res.status(400).send({ error: 'Se debe proporcionar un ID de ruta para actualizar.' });
        }

        try {
            const [updatedCount, updatedRoutes] = await Track.update(updatedData, {
                where: { ID_ROUTE: routeId },
                returning: true, // Devuelve los registros actualizados
            });

            if (updatedCount > 0) {
                res.status(200).send({ updatedRoutes });
            } else {
                res.status(404).send({ error: 'Ruta no encontrada' });
            }
        } catch (error) {
            console.error('Error al actualizar la ruta:', error);
            res.status(500).send({ error: 'Error interno del servidor' });
        }
    }
}

module.exports = controller;