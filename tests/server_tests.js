const test = require(`tape`);
const supertest = require(`supertest`);
const router = require(`../src/router`);


test("tape is working", t => {
  t.equal(2, 2, `should return 2`);
  t.end();
});


// test(`home returns status code 200`, t => {
//   supertest(router)
//     .get("/")
//     .expect("Content-Type", /html/)
//     .end((err, res) => {
//       t.error(err);
//       t.equal(res.statusCode, 200, "Should return 200");
//       t.end();
//     });
// });
