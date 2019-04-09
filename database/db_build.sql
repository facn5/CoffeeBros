BEGIN;
DROP TABLE IF EXISTS places, review ,address,pictures;

CREATE TABLE IF NOT EXISTS address (
  id SERIAL PRIMARY KEY,
  city VARCHAR(60) NOT NULL,
  street TEXT NOT NULL,
  googlemap TEXT NOT NULL
  );

  INSERT INTO address (city,street,googlemap) VALUES
  ('Nazareth','Kekar Ha'' Ma''ain','<div class="mapouter"><div class="gmap_canvas"><iframe width="600" height="500" id="gmap_canvas" src="https://maps.google.com/maps?q=tishren%20israel&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe><a  href="https://www.emojilib.com">emojilib.com</a></div><style>.mapouter{position:relative;text-align:right;height:500px;width:600px;}.gmap_canvas{overflow:hidden;background:none!important;height:500px;width:600px;}</style></div>'),
  ('Haifa','HaSolel Bonneh','<div class="mapouter"><div class="gmap_canvas"><iframe width="600" height="500" id="gmap_canvas" src="https://maps.google.com/maps?q=Giraffe%20haifa&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe><a href="https://www.emojilib.com">emojilib.com</a></div><style>.mapouter{position:relative;text-align:right;height:500px;width:600px;}.gmap_canvas {overflow:hidden;background:none!important;height:500px;width:600px;}</style></div>'),
  ('Haifa','Sderot Ben Gurion 38','<div class="mapouter"><div class="gmap_canvas"><iframe width="600" height="500" id="gmap_canvas" src="https://maps.google.com/maps?q=fattoush%20haifa&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe><a href="https://www.emojilib.com">emojilib.com</a></div><style>.mapouter{position:relative;text-align:right;height:500px;width:600px;}.gmap_canvas {overflow:hidden;background:none!important;height:500px;width:600px;}</style></div>'),
  ('Golan','Merom Golan','<div class="mapouter"><div class="gmap_canvas"><iframe width="600" height="500" id="gmap_canvas" src="https://maps.google.com/maps?q=coffee%20annan&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe><a href="https://www.emojilib.com">emojilib.com</a></div><style>.mapouter{position:relative;text-align:right;height:500px;width:600px;}.gmap_canvas {overflow:hidden;background:none!important;height:500px;width:600px;}</style></div>'),
  ('Acre','Talmi St','<div class="mapouter"><div class="gmap_canvas"><iframe width="600" height="500" id="gmap_canvas" src="https://maps.google.com/maps?q=El%20marsa%20acre&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe><a href="https://www.emojilib.com">emojilib.com</a></div><style>.mapouter{position:relative;text-align:right;height:500px;width:600px;}.gmap_canvas {overflow:hidden;background:none!important;height:500px;width:600px;}</style></div>'),
  ('Haifa','HaBankim St 8','<div class="mapouter"><div class="gmap_canvas"><iframe width="600" height="500" id="gmap_canvas" src="https://maps.google.com/maps?q=shtrodel%20haifa&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe><a href="https://www.emojilib.com">emojilib.com</a></div><style>.mapouter{position:relative;text-align:right;height:500px;width:600px;}.gmap_canvas {overflow:hidden;background:none!important;height:500px;width:600px;}</style></div>');

CREATE TABLE IF NOT EXISTS places (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  rating INTEGER NOT NULL,
  address_ID INTEGER REFERENCES address(id) ON UPDATE CASCADE,
  google_mapID INTEGER REFERENCES address(id) ON UPDATE CASCADE);

INSERT INTO places (name,rating,address_id,google_mapid) VALUES
('Tishreen',3,1,1),
('Giraffe',4,2,2),
('Fattoush',4,3,3),
('Coffee Annan',4,4,4),
('El Marsa',3,5,5),
('Shtroudl',4,6,6);

CREATE TABLE IF NOT EXISTS review (
  id SERIAL PRIMARY KEY,
  place_id INTEGER REFERENCES places(id) ON UPDATE CASCADE,
  comment TEXT NOT NULL,
  rating INTEGER NOT NULL
);

INSERT INTO review (place_id,comment,rating) VALUES
(1,'A very great',3),
(1,'Expensive place but good quality',3),
(1,'Calm place and good food',5),
(1,'Amazingggg',5),
(1,'Food wasn''t goood',2),
(2,'A very great',3),
(2,'Expensive place but good quality',3),
(2,'Calm place and good food',5),
(3,'Amazingggg',5),
(2,'Food wasn''t goood',2),
(3,'A very great',3),
(4,'Calm place and good place to have your coffee but its far',4),
(4,'family friendly place',5),
(4,'Food wasn''t goood',2),
(4,'A very great',3),
(5,'A very great',3),
(5, 'best place for small parties',4),
(5,'Amazingggg',5),
(5,'Food wasn''t goood',2),
(5,'A very great',3);



CREATE TABLE IF NOT EXISTS pictures (
  id SERIAL PRIMARY KEY,
  place_id INTEGER REFERENCES places(id) ON UPDATE CASCADE,
  pictureURL TEXT NOT NULL
  );

INSERT INTO pictures (place_id,pictureURL) VALUES
(1,'fattoush.jpg'),
(2,'fattoush.jpg'),
(3,'fattoush.jpg'),
(4,'fattoush.jpg'),
(5,'fattoush.jpg');


COMMIT;
