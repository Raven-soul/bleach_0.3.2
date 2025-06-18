import dbCrud from '../../src/lib/ControllerDB/db_connection'
import { getAllUsers } from '../../src/lib/ControllerDB/crud';

export const getAllUsersHandler = async (req, res) => {
    const users = getAllUsers();
    res.status(200).json(users);
};