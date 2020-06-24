// importar a dependência do sqlite3
const sqlite3 = require("sqlite3").verbose()

// criar o objeto que irá fazer operações no banco de dados
const db = new sqlite3.Database("./src/database/database.db ")

// utilizar o objeto de bando de dados para as nossas operações
db.serialize(() => {
    // criar uma tabela com comandos SQL
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            adress TEXT,
            adress2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `)
        // Inserir dados na tabela
    const query = `
            INSERT INTO places (
                image,
                name,
                adress,
                adress2,
                state,
                city,
                items
            ) VALUES (?,?,?,?,?,?,?);
    `
    const values = [
        "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1101&q=80",
        "Colectoria",
        "Guilherme Gembella, Jardim América",
        "Número 260",
        "Santa Catarina",
        "Rio do Sul",
        "Residuos Eletrônicos, Lâmpadas"
    ]

    function afterInsertData(err) {
        if (err) {
            return console.log(err)
        }

        console.log("Cadastrado com sucesso!")
        console.log(this)
    }

    // db.run(query, values, afterInsertData)
    // Conaultar os dados da tabela  
    db.all(`SELECT name FROM places`, function(err, rows) {
            if (err) {
                return console.log(err);
            }

            console.log("Aqui estão os seus registros")
            console.log(rows);
        })
        // Deletar um dado da tabela
})