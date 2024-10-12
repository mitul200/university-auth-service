"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const user_route_1 = require("./app/modules/users/user.route");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
// parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// console.log(app.get('env'))
//application routs
app.use('/api/v1/users/', user_route_1.UserRoutes);
// Testing
app.get('/', (req, res, next) => {
    // next('baba re ba error')
    // await userService.creatUser({
    //   id: '999',
    //   password: '1234',
    //   role: 'student',
    // })
    // res.send('Working successfull!')
    throw new Error('orre baba error');
});
// global error handelar
app.use(globalErrorHandler_1.default);
exports.default = app;
// asdfaf
