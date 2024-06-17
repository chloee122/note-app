"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.average = exports.reverse = void 0;
const reverse = (string) => {
    return string.split("").reverse().join("");
};
exports.reverse = reverse;
const average = (array) => {
    const reducer = (sum, item) => {
        return sum + item;
    };
    return array.length === 0 ? 0 : array.reduce(reducer, 0) / array.length;
};
exports.average = average;
