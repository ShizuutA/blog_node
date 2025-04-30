module.exports = {
    HOST: "localhost",
    USER : "root",
    PASSWORD : "cielpass",
    DB : "Blog_Romain",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }    
}