CREATE DATABASE ProduseTW 'UTF-8' LC_COLLATE 'ro-RO-x-icu' LC_CTYPE 'ro_RO' TEMPLATE template 0;
CREATE USER alex WITH ENCRYPTED PASSWORD 'alex';
GRANT ALL PRIVILEGES ON DATABASE postgres TO alex;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO alex;

DROP TYPE IF EXISTS categorie;
DROP TYPE IF EXISTS mod_consumare;

CREATE TYPE categorie AS ENUM( 'Durere de cap', 'Durere de burta', 'Febra', 'Greata');
CREATE TYPE mod_consumare AS ENUM('pastile','sirop');

CREATE TABLE IF NOT EXISTS Medicamente(
   id serial PRIMARY KEY,
   nume VARCHAR(50) UNIQUE NOT NULL,
   descriere TEXT,
   imagine VARCHAR(300),
   tip_produs categorie DEFAULT 'medicament',
   modconsum mod_consumare DEFAULT 'consumare',
   pret NUMERIC(8,2) NOT NULL,
   gramaj INT NOT NULL CHECK (gramaj>0),
   data_adaugare TIMESTAMP DEFAULT current_timestamp,
   comprimate INT NOT NULL CHECK (comprimate>=0),
   prescriptie BOOLEAN NOT NULL DEFAULT FALSE
);
insert into Medicamente values(nume,descriere,imagine,tip_produs,modconsum,pret,gramaj,comprimate,prescriptie) values
  ('Norofen','Medicament pt dureri si raceala','','Durere de cap','pastile',22.99,200,20,true),
  ('Norofen sirop','Medicament pt dureri si raceala','','Durere de cap','sirop',40.50,500,1,true),
  ('Paracetamol','Medicament pt febra','','Febra','pastile',33.49,500,30,true),
  ('Emetix','Medicament pt greata','','Greata','pastile',19.79,400,15,true),
  ('Colebil','Medicament pt dureri de burta','','Durere de burta','pastile',22.99,200,20,true);
