/// <reference path="../../typings/index.d.ts" />
import * as u from 'updeep'


const obj1 = { a : 2 }
const obj2 = { b: 2 }
console.log(u(obj1)(obj2))