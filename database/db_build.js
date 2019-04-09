const fs = require('fs');
const path = require('path');
let sqlPath;
const dbConnection = require('./db_connection.js');
if(process.env.NODE_ENV === "test"){
 sqlPath = path.join(__dirname,'..','tests','test_Db_Build.sql');
}
else{
   sqlPath = path.join(__dirname, 'db_build.sql');
}
const sql = fs.readFileSync(sqlPath).toString();
// dbConnection.query(sql, (err, res) => {
//   if (err) throw err;
//   console.log('Users table created with result: ', res);
// });
const runDbBuild = cb => dbConnection.query(sql,cb);
runDbBuild((err,res)=>{
    if (err) throw err;
    console.log('successfully built the database');
})
module.exports = runDbBuild;
