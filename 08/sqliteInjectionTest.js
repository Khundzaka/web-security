const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    db.run("CREATE TABLE users (name TEXT)");

    const stmt = db.prepare("INSERT INTO users VALUES (?)");
    for (let i = 0; i < 10; i++) {
        stmt.run("name " + i);
    }
    stmt.finalize();

    // db.each("SELECT rowid AS id, name FROM users", (err, row) => {
    //     console.log(row.id + ": " + row.name);
    // });

    const name = "name 0' or '1' = '1";
    db.all("select * from users where name = ?", [name], (err, row) => {
        console.log({err, row})
    });
});

db.close();