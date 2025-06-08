import dbCrud from '../ControllerDB/db_connection'
import { getAllUsers } from './../ControllerDB/crud';

export const getAllUsersHandler = async (req, res) => {
    const users = getAllUsers();
    res.status(200).json(users);
};