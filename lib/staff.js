var fs = require('fs');
var uuid = require('node-uuid');

// db path
var db_path = '../data/db.json';

// edit an existing staff member
var edit = function(data, callback) {

  // validate
  var missing = validate(data);

  // if we have anything missing, return an error
  if (missing.length) {
    return callback("Please complete all fields", null);
  }

  // load the DB
  var db = require(db_path);

  // find a matching staff member
  var index = findById(db, data.id);

  // handle no match
  if (index === null) {
    return callback("Staff member not found", null);
  }

  // update the staff object
  var person    = db[index];
  person.name   = data.name;
  person.role   = data.role;
  person.phone  = data.phone;

  db[index]     = person;

  // save back to the db
  fs.writeFile("./data/db.json", JSON.stringify(db, null, 2), function writeToDB(err, data) {

    if (err) {
      return callback("Unable to update database", null);
    }

    return callback(null, data);

  });

}

// add a new staff member
var add = function(data, callback) {

  // validate
  var missing = validate(data);

  // if we have anything missing, return an error
  if (missing.length) {
    return callback("Please complete the "+missing.join(", ")+" fields", null);
  }

  // otherwise we're good

  // load the DB
  var db = require(db_path);

  // generate a new ID for this guy
  data.id = uuid.v1();

  // push into the DB
  db.push(data);

  // save back to the db
  fs.writeFile("./data/db.json", JSON.stringify(db, null, 2), function writeToDB(err, data) {

    if (err) {
      return callback("Unable to update database", null);
    }

    return callback(null, data);

  });

}

// returns array index of staff member
var findById = function(db, id) {

  // loop over each entry in the DB
  for (var i in db) {

    // compare to the supplied id, return the index if matches
    if (db[i].id === id) {
      return i;
    }

  }

  // nothing found
  return null;

}

// validate all fields are supplied
var validate = function(data) {

  // validate
  var required = ["name", "phone", "role"];
  var missing = [];
  for (var r in required) {

    var field = required[r];

    if (!data[field]) {
      missing.push(field);
    }

  }

  return missing;

}

module.exports = {
  edit: edit,
  add: add
}