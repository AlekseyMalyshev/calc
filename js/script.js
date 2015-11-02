/*
 * File script.js
 * Created by AlekseyMalyshev
 * Date created Oct 29, 2015
 */

'use strict';

(function app() {

  let documentReady = () => {
    $('td.digits').on('click', processDigit);
    $('td#ac').on('click', clearAll);
    $('td#sign').on('click', changeSign);
    $('td#percent').on('click', percent);
    $('td#divide').on('click', {fn: divide}, setOperator);
    $('td#multi').on('click', {fn: multi}, setOperator);
    $('td#minus').on('click', {fn: minus}, setOperator);
    $('td#plus').on('click', {fn: plus}, setOperator);
    $('td#execute').on('click', execute);

    clearAll();
  };

  $(documentReady);
})();

let modified = false;
let newVal = false;

let $buf = $('th#buf');
let operand1 = undefined;
let operator = undefined;
let operand2 = undefined;

let divide = (op1, op2) => {
  return op1 / op2;
}

let multi = (op1, op2) => {
  return op1 * op2;
}

let minus = (op1, op2) => {
  return op1 - op2;
}

let plus = (op1, op2) => {
  return op1 + op2;
}

let setOperator = (event) => {
  $('td.ops').removeClass('pushed');
  $(event.target).addClass('pushed');
  if (operand1 === undefined) {
    operand1 = parseFloat($buf.text());
  }
  newVal = true;
  operator = event.data.fn;
}

let setModifyed = () => {
  if (!modified) {
    modified = true;
    $('td#ac').text('C');
  }
}

let setBuffer = (val) => {
  let text = val.toString();
  $buf.text(text);
}

let clearAll = () => {
  if (modified) {
    setBuffer('0');
    $('td#ac').text('AC');
    $('td.ops').removeClass('pushed');
    operator = undefined;
    operand2 = undefined;
    modified = false;
    newVal = false;
  }
  else {
    operand1 = undefined;
  }
}

let processDigit = (event) => {
  let val = $(event.target).text();
  let buf;
  if (newVal) {
    newVal = false;
    setBuffer(buf = '0');
  }
  else {
    buf = $buf.text();
  }

  if (val === '.') {
    if (!~buf.indexOf('.')) {
      setBuffer(buf + '.');
    }
  }
  else if (buf === '0') {
    setBuffer(val);
  }
  else {
    setBuffer(buf + $(event.target).text());
  }
  setModifyed();
}

let changeSign = () => {
  newVal = true;
  let val = $buf.text();
  if (val[0] === '-') {
    setBuffer(val.substr(1));
  }
  else {
    setBuffer('-' + val);
  }
}

let percent = () => {
  let part = parseFloat($buf.text()) / 100;
  if (operand1 !== undefined) {
    part *= operand1;
  }
  setBuffer(part);
}

let execute = () => {
  if (operand1 === undefined ||
      operator === undefined) {
    return;
  }
  if (!newVal) {
    operand2 = parseFloat($buf.text());
  }
  operand1 = operator(operand1, operand2);
  setBuffer(operand1);
  $('td.ops').removeClass('pushed');
  newVal = true;
}
