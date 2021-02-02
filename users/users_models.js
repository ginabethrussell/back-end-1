const db = require("../data/dbconfig");
const uuid = require("uuid");

//-----------------------------------------------------------------------------
/*  finds users by their user id  */
//-----------------------------------------------------------------------------
function findById(id) {
  return db("users")
  .select("id", "username")
  .where({ id })
  .first();
}

//-----------------------------------------------------------------------------
/*  inserts user into the database with a generated uuid  */
//-----------------------------------------------------------------------------
async function addUser(user) {
  const id = uuid.v4();
  await db("users")
  .insert({ ...user, id });
  return findById(id);
}

//-----------------------------------------------------------------------------
/*  pulls all user accounts from database  */
//-----------------------------------------------------------------------------
function allUsers() {
  return db("users");
}

//-----------------------------------------------------------------------------
/*  finds users filtered by requested data  */
//-----------------------------------------------------------------------------
function findUser(filter) {
  return db("users")
  .select("id", "username", "password", "role")
  .where(filter);
}

//-----------------------------------------------------------------------------
/*  updates the users account information  */
//-----------------------------------------------------------------------------
function updateUser(changes,  id) {
  return db("users")
  .update(changes)
  .where({ id });
}

//-----------------------------------------------------------------------------
/*  removes user from database  */
//-----------------------------------------------------------------------------
function removeUser(id){
  return db('users')
  .where('id', id)
  .del()
  .then(response => (!response ? null : response))
}

//-----------------------------------------------------------------------------
/*  Exporting all modules  */
//-----------------------------------------------------------------------------
module.exports = {
  findById,
  addUser,
  allUsers,
  findUser,
  updateUser,
  removeUser
};