import mysql2, { FieldPacket, RowDataPacket } from "mysql2"

export interface WishListSchema extends RowDataPacket{
    id: string,
    name: string,
}

export default async function db(query:string){
    if(process.env.DATABASE_URL){
        const connection = mysql2.createConnection(process.env.DATABASE_URL)
        const [rows]:[WishListSchema[],FieldPacket[]] = await connection.promise().query(query)
        return rows            
    }
}