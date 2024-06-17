"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_util_1 = require("../utils/test_util");
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
(0, node_test_1.test)("reverse of a", () => {
    const result = (0, test_util_1.reverse)("a");
    node_assert_1.default.strictEqual(result, "a");
});
(0, node_test_1.test)("reverse of react", () => {
    const result = (0, test_util_1.reverse)("react");
    node_assert_1.default.strictEqual(result, "tcaer");
});
(0, node_test_1.test)("reverse of saippuakauppias", () => {
    const result = (0, test_util_1.reverse)("saippuakauppias");
    node_assert_1.default.strictEqual(result, "saippuakauppias");
});
