require("dotenv").config();
const knex = require("knex");

const knexInstance = knex({
  client: "pg",
  connection: process.env.DB_URL
});

function shoppingListQuery(searchTerm) {
  knexInstance
    .select("name")
    .from("shopping_list")
    .where("name", "ILIKE", `%${searchTerm}%`)
    .first();
  // .then(result => {
  //   console.log(result);
  // });
}
shoppingListQuery("chili");

function paginateItems(pageNumber) {
  const itemsPerPage = 6;
  const offset = itemsPerPage * (pageNumber - 1);
  knexInstance
    .select("name", "price")
    .from("shopping_list")
    .limit(itemsPerPage)
    .offset(offset);
  // .then(result => {
  //   console.log(result);
  // });
}

paginateItems(2);

function queryDaysAgo(daysAgo) {
  knexInstance
    .select("name", "date_added")
    .from("shopping_list")
    .where(
      "date_added",
      ">",
      knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo)
    );
  // .then(result => {
  //   console.log(result);
  // });
}

queryDaysAgo(2);

function costPerCategory() {
  knexInstance
    .select("category")
    .from("shopping_list")
    .sum("price as total")
    .groupBy("category")
    .then(result => {
      console.log(result);
    });
}

costPerCategory();
