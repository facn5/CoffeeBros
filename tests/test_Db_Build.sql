BEGIN;
DROP TABLE IF EXISTS places CASCADE;
DROP TABLE IF EXISTS review CASCADE;
DROP TABLE IF EXISTS address CASCADE;
DROP TABLE IF EXISTS pictures CASCADE;

CREATE TABLE IF NOT EXISTS address (
  id SERIAL PRIMARY KEY,
  city VARCHAR(60) NOT NULL,
  street TEXT NOT NULL,
  googlemap TEXT NOT NULL
  );

  INSERT INTO address (city,street,googlemap) VALUES
  ('Nazareth','Kekar Ha'' Ma''ain','<div class="mapouter"><div class="gmap_canvas"><iframe width="600" height="500" id="gmap_canvas" src="https://maps.google.com/maps?q=tishren%20israel&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe><a  href="https://www.emojilib.com">emojilib.com</a></div><style>.mapouter{position:relative;text-align:right;height:500px;width:600px;}.gmap_canvas{overflow:hidden;background:none!important;height:500px;width:600px;}</style></div>'),
  ('Nazareth','Kekar Ha'' Ma''ain','<div class="mapouter"><div class="gmap_canvas"><iframe width="600" height="500" id="gmap_canvas" src="https://maps.google.com/maps?q=tishren%20israel&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe><a  href="https://www.emojilib.com">emojilib.com</a></div><style>.mapouter{position:relative;text-align:right;height:500px;width:600px;}.gmap_canvas{overflow:hidden;background:none!important;height:500px;width:600px;}</style></div>');
CREATE TABLE IF NOT EXISTS places (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  rating INTEGER NOT NULL,
  address_ID INTEGER REFERENCES address(id) ON UPDATE CASCADE,
  google_mapID INTEGER REFERENCES address(id) ON UPDATE CASCADE);

INSERT INTO places (name,rating,address_id,google_mapid) VALUES
('Tishreen',3,1,1),
('Giraffe',4,2,2);

CREATE TABLE IF NOT EXISTS review (
  id SERIAL PRIMARY KEY,
  place_id INTEGER REFERENCES places(id) ON UPDATE CASCADE,
  comment TEXT NOT NULL,
  rating INTEGER NOT NULL
);

INSERT INTO review (place_id,comment,rating) VALUES
(1,'A very great',3),
(2,'Expensive place but good quality',3);



CREATE TABLE IF NOT EXISTS pictures (
  id SERIAL PRIMARY KEY,
  place_id INTEGER REFERENCES places(id) ON UPDATE CASCADE,
  pictureURL TEXT NOT NULL
  );

INSERT INTO pictures (place_id,pictureURL) VALUES
(1,'fattoush.jpg'),
(2,'fattoush.jpg');


COMMIT;
