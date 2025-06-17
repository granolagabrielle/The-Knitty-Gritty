CREATE TABLE "users" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "admin" BOOLEAN DEFAULT FALSE
);

CREATE TABLE "yarn_weights" (
	"id" SERIAL PRIMARY KEY,
	"weight" VARCHAR (100)
);

CREATE TABLE "yarn_fibers" (
	"id" SERIAL PRIMARY KEY,
	"fiber" VARCHAR (100)
);

CREATE TABLE "pattern_difficulties" (
	"id" SERIAL PRIMARY KEY,
	"level" VARCHAR
);

CREATE TABLE "pattern_types" (
	"id" SERIAL PRIMARY KEY,
	"type" VARCHAR (100)
);

CREATE TABLE "pattern_designers" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (100)
);

CREATE TABLE "yarn_brands" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR
);

CREATE TABLE "yarn_inventory" (
	"id" SERIAL PRIMARY KEY,
	"brand" INT REFERENCES "yarn_brands" ("id"),
	"title" VARCHAR,
	"fiber" INT REFERENCES "yarn_fibers" ("id"),
	"weight" INT REFERENCES "yarn_weights" ("id"),
  	"skeins" INT,
	"skein_grams" INT,
  "total_grams" INT,
	"dye_lot" VARCHAR (100),
	"user_id" INT REFERENCES "users" ("id"),
  "isFavorite" BOOLEAN DEFAULT FALSE,
  "isDeleted" BOOLEAN DEFAULT FALSE
  "purchase_location" VARCHAR
);

CREATE TABLE "pattern_inventory" (
	"id" SERIAL PRIMARY KEY,
	"title" VARCHAR (100),
	"pattern_designer" INT REFERENCES "pattern_designers" ("id"),
	"pattern_type" INT REFERENCES "pattern_types" ("id"),
	"difficulty_level" INT REFERENCES "pattern_difficulties" ("id"),
	"yarn_weight" INT REFERENCES "yarn_weights" ("id"),
	"user_id" INT REFERENCES "users" ("id"),
  "isFavorite" BOOLEAN DEFAULT FALSE,
  "isDeleted" BOOLEAN DEFAULT FALSE
);

CREATE TABLE "project_tracking" (
	"id" SERIAL PRIMARY KEY,
	"pattern_id" INT REFERENCES "pattern_inventory" ("id"),
	"date_started" date,
"est_grams_needed" INT,
"grams_knit" INT,
"needle_size" INT,
	"yarn_id" INT REFERENCES "yarn_inventory" ("id"),
	"user_id" INT REFERENCES "users" ("id"),
  "isFavorite" BOOLEAN DEFAULT FALSE,
  "isDeleted" BOOLEAN DEFAULT FALSE
);

CREATE TABLE "project_notes" (
"id" SERIAL PRIMARY KEY,
"project_id" INT REFERENCES "project_tracking" ("id"),
"notes" VARCHAR
);

CREATE TABLE "images" (
  "id" SERIAL PRIMARY KEY,
  "yarn_id" INT REFERENCES "yarn_inventory" ("id"),
  "pattern_id" INT REFERENCES "pattern_inventory" ("id"),
  "project_id" INT REFERENCES "project_tracking" ("id"),
	"url" VARCHAR
);

-- Seed Data

INSERT INTO "pattern_designers" ("name") VALUES ('My Favorite Things Knitwear'), ('Caidree'), ('Ozetta'), ('Ullen Knitwear'), ('New Wave Knitting');

INSERT INTO "pattern_difficulties" ("level") VALUES ('Beginner'), ('Intermediate'), ('Advanced');

INSERT INTO "yarn_fibers" ("fiber") VALUES ('Cotton'), ('Wool'), ('Linen'), ('Alpaca');

INSERT INTO "pattern_types" ("type") VALUES ('Clothing'), ('Accessories'), ('Home Goods');

INSERT INTO "users" ("id", "username", "password", "admin") VALUES (1, 'gabrielle', 'pass', TRUE);

INSERT INTO "yarn_brands" ("name") VALUES ('Cascade Yarns'), ('Woolstok'), ('Isager'), ('Knitting For Olive');

INSERT INTO "yarn_weights" ("weight") VALUES ('Lace'), ('Sock'), ('Sport'), ('Double Knit'), ('Worsted'), ('Bulky');

INSERT INTO "yarn_inventory" ("brand", "title", "skeins", "fiber", "weight", "skein_grams", "dye_lot", "user_id") VALUES (1, 'test title', 1, 1, 1, 50, 'blue', 1);

INSERT INTO "pattern_inventory" ("title", "pattern_designer", "pattern_type", "difficulty_level", "yarn_weight", "user_id") VALUES ('Sophie Scarf', 1, 1, 1, 1, 1);

INSERT INTO "project_tracking" ("pattern_id", "date_started", "est_grams_needed", "grams_knit", "needle_size", "yarn_id", "user_id") VALUES (1, '01-01-2024', 250, 50, 4, 1, 1);

INSERT INTO "project_notes" ("project_id", "notes") VALUES (1, 'test notes');
