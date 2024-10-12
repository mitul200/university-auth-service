"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const index_1 = __importDefault(require("../../../config/index"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const user_utlis_1 = require("./user.utlis");
const user_model_1 = require("./user.model");
const creatUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    // auto generate increment id
    const id = yield (0, user_utlis_1.generateUserId)();
    user.id = id;
    if (!user.password) {
        user.password = index_1.default.default_user_pass;
    }
    const createdUser = yield user_model_1.User.create(user);
    if (!creatUser) {
        throw new ApiError_1.default(400, 'Failed to create user');
    }
    return createdUser;
});
exports.UserService = {
    creatUser,
};
