import mysql2 from "mysql2"


export default async function db(query:string){
    if(process.env.DATABASE_URL){
        const connection = mysql2.createConnection(process.env.DATABASE_URL)
        const [rows] = await connection.promise().query(query)
        return rows            
    }else{
        return "Database url required"
    }
}