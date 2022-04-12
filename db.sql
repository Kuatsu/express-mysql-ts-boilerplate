CREATE DATABASE boilerplate;
USE boilerplate;

CREATE TABLE IF NOT EXISTS users (
  id CHAR(36) NOT NULL,
  provider_id TEXT NOT NULL,
  provider_type VARCHAR(255) NOT NULL,
  first_name TEXT NOT NULL,
  created_on DATETIME NOT NULL DEFAULT NOW(),
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS local_auth (
  id CHAR(36) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password CHAR(60) NOT NULL,
  created_on DATETIME NOT NULL DEFAULT NOW(),
  PRIMARY KEY (id)
);
