// init-mongo.js

// Cambiar a la base de datos que deseas utilizar
// db = db.getSiblingDB('mydatabase');
db = db.getSiblingDB('course_manager');

// Crear las colecciones
/* db.createCollection('users');
db.createCollection("posts");
db.createCollection("comments"); */

db.createCollection('courses');
db.createCollection("classes");
db.createCollection("subjects");
