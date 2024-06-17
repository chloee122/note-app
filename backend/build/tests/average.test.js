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
const test_util_1 = require("../utils/test_util");
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
(0, node_test_1.describe)("average", () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, node_test_1.test)("of one value is the value itself", () => {
        node_assert_1.default.strictEqual((0, test_util_1.average)([1]), 1);
    });
    yield (0, node_test_1.test)("of many values is calculated right", () => {
        node_assert_1.default.strictEqual((0, test_util_1.average)([1, 2, 3, 4, 5, 6]), 3.5);
    });
    yield (0, node_test_1.test)("of empty array is zero", () => {
        node_assert_1.default.strictEqual((0, test_util_1.average)([]), 0);
    });
}));
