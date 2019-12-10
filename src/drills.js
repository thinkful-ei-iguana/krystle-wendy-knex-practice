require("dotenv").config();
const knex = require("knex");

const knexInstance = knex({
  client: "pg",
  connection: process.env.DB_URL
});

// const qry = knexInstance
//   .select("name", "price")
//   .from("shopping_list")
//   .where({ name: "Chili non-carne" })
//   .first()
//   .then(result => {
//     console.log(result);
//   });

function shoppingListQuery(searchTerm) {
  knexInstance
    .select("name")
    .from("shopping_list")
    .where("name", "ILIKE", `%${searchTerm}%`)
    .first()
    .then(result => {
      console.log(result);
    });
}
shoppingListQuery("chili");
