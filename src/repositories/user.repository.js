import User from "../models/User.model.js"


const TABLE = {
    NAME: "users",
    COLUMNS: {
        ID: "_id",
        NAME: "name",
        PASSWORD: "password",
        EMAIL: "email",
        ACTIVE: 'active',
        VERIFIED_EMAIL: 'verified_email',
        CREATED_AT: 'created_at',
        MODIFIED_AT: 'modified_at'
    }
}
class UserRepository {

    static async create(name, email, password) {
        try {
            return await User.insertOne({
                name: name,
                email: email,
                password: password
            })
        }
        catch (error) {
            console.error('[SERVER ERROR]: no se pudo crear el usuario', error)
            throw error
        }
    }

    //MYSQL
    /* static async create(name, email, password){
        try{

            /* 
            Quiero ejecutar esta query
            INSERT INTO users 
            (name, email, password) 
            VALUES
            ("pepe", "pepe@gmail.com", "pepe_123")

            let sql = `
                INSERT INTO ${TABLE.NAME} 
                (${TABLE.COLUMNS.NAME}, ${TABLE.COLUMNS.EMAIL}, ${TABLE.COLUMNS.PASSWORD}) 
                VALUES
                (?, ?, ?)
            `
            const [result] = await pool.query(sql, [name, email, password])
            const id_creado = result.insertId
            return await UserRepository.getById(id_creado)
        }
        catch (error) {
            console.error('[SERVER ERROR]: no se pudo crear el usuario', error)
            throw error
        }
    } */

    //MONGO DB
    static async getAll() {
        try{
            const users = await User.find(
                {
                    active: true
                }
            )
            return users
        }
        catch(error){
            console.error('[SERVER ERROR]: no se pudo obtener la lista de usuarios', error)
            throw error
        }
    }

    //MYSQL
    /* static async getAll() {
        try{
            let sql = `
                SELECT * FROM ${TABLE.NAME}
            `
            const [result] = await pool.query(sql)
            return result
        }
        catch(error){
            console.error('[SERVER ERROR]: no se pudo obtener la lista de usuarios', error)
            throw error
        }
    } */


    //MONGO DB
    static async getById(user_id) {
        try{    
            const user_found = await User.findById(user_id)
            return user_found
        }
        catch(error){
            console.error('[SERVER ERROR]: no se pudo obtener el usuario con id ' + user_id, error)
            throw error
        }
    }

    //MYSQL
    /* static async getById(user_id) {
        try{
            let sql = `
                SELECT * FROM ${TABLE.NAME}
                WHERE ${TABLE.COLUMNS.ID} = ?
            `
            const [result] = await pool.query(sql, [user_id])
            return result[0]
        }
        catch(error){
            console.error('[SERVER ERROR]: no se pudo obtener el usuario con id ' + user_id, error)
            throw error
        }
    } */




    //MONGO DB
    static async getByEmail (email){
        const user_found = await User.findOne({
            email: email, 
            active: true
        })
        return user_found
    }

    //MYSQL 
    /* static async getByEmail (email){
        try{
            let sql = `
                SELECT * FROM ${TABLE.NAME}
                WHERE ${TABLE.COLUMNS.EMAIL} = ?
            `
            const [result] = await pool.query(sql, [email])
            return result[0]
        }
        catch(error){
            console.error('[SERVER ERROR]: no se pudo obtener el usuario con email ' + email, error)
            throw error
        }
    } */






    //MONGO DB
    static async deleteById (user_id){
        const response = await User.findByIdAndDelete(user_id)
        return response
    }

    //MYSQL
    /* static async deleteById (user_id){
        try{
            let sql = `
                DELETE FROM ${TABLE.NAME}
                WHERE ${TABLE.COLUMNS.ID} = ?
            `
            const [result] = await pool.query(sql, [user_id])
            if(result.affectedRows > 0){
                return true
            }
            else{
                return false
            }
        }

        catch(error){
            console.error('[SERVER ERROR]: no se pudo eliminar el usuario con id ' + user_id, error)
            throw error
        }
    } */






        //MONGO DB
    static async updateById (user_id, update_user){
        console.log(user_id, update_user)
        await User.findByIdAndUpdate(
            user_id,
            update_user
        )
    }


    //MYSQL
/*   static async updateById(user_id, update_user){
        try{
            const update_fields = Object.keys(update_user)
            const update_values = Object.values(update_user)

            const setSQLQuery = update_fields.map(
                (field)=> `${field} = ?`
            ).join(', ')

            let sql=`
                UPDATE ${TABLE.NAME}
                SET ${setSQLQuery}
                WHERE ${TABLE.COLUMNS.ID} = ? AND ${TABLE.COLUMNS.ACTIVE} = 1
            `
            
            pool.query(sql, [...update_values, user_id])
        }
        catch(error){
            console.error('[SERVER ERROR]: no se pudo actualizar el usuario con id ' + user_id, error)
            throw error
        }
    } */
}


export default UserRepository

