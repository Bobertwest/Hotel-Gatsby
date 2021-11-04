/* exports.createPages = async ({ actions }) => {
  const { createPage } = actions
  createPage({
    path: "/using-dsg",
    component: require.resolve("./src/templates/using-dsg.js"),
    context: {},
    defer: true,
  })
}
 */


exports.createPages = async({ actions, graphql, reporter }) => {
    const resultado = await graphql(`
    query{
      allDatoCmsHabitacion{
        nodes{
          slug
        }
      }
    }
  `)
    if (resultado.error) {
        reporter.panic('No hubo resultados ', resultado.error)
    }

    const habitaciones = resultado.data.allDatoCmsHabitacion.nodes;

    habitaciones.forEach(habitacion => {
        actions.createPage({
            path: habitacion.slug,
            component: require.resolve('./src/components/habitaciones.jsx'),
            context: {
                slug: habitacion.slug
            }
        })
    });

}