import express from "express";
import { authController } from "../controller/AuthController";
import { ClientController } from "../controller/ClientsController";
import { UsersController } from "../controller/UsersController";
import { Auth } from "../middlewares/Auth";
import { UsersValidation } from "../validations";
import { ClientsValidation } from "../validations/client";
import { login } from "../validations/login/login";

const routes = express.Router();

routes.get('/users', Auth, UsersController.getUsers);
routes.get('/users/:id', Auth, UsersController.getUsersById);
routes.post('/users', UsersValidation.create, UsersController.createUser);
routes.put('/users/:id', Auth, UsersController.updateUser);
routes.delete('/users/:id', UsersValidation.destroy, UsersController.deleteUser);

routes.get('/clients', ClientController.getClients);
routes.get('/clients/:id', Auth, ClientController.getClientsById);
routes.post('/clients', Auth, ClientsValidation.createClient, ClientsValidation.createClient, ClientController.createClient);
routes.put('/clients/:id', Auth, ClientsValidation.updateClient, ClientController.updateClient);
routes.delete('/clients/:id', Auth, ClientsValidation.destroyClient, ClientController.deleteClient);

routes.post('/login', login, authController.login);



export default routes;