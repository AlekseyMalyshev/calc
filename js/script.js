/*
 * File script.js
 * Created by AlekseyMalyshev
 * Date created Oct 29, 2015
 */

(function app() {
  'use strict';

  let mem = 0;
  let $mem = $('td#5');

  let resetBuf = false;
  let buf = 0;
  let sep = 0;
  let $buf = $('th#buf');

  let stack = [];
  let stackCp = [];

  let prevNum = () => {
    for (let i = stack.length - 1; i >= 0; --i) {
      let res = parseInt(stack[i]);
      if (!isNaN(res)) {
        return res;
      }
    }
    return 1;
  }

  let clearBuf = () => {
    buf = 0;
    sep = 0;
    $buf.text(buf);
  }

  let clearOpButtons = () => {
    $('td#9').removeClass('pushed');
    $('td#19').removeClass('pushed');
    $('td#29').removeClass('pushed');
    $('td#39').removeClass('pushed');
  }

  let processOp = (op, $btn) => {
    if (stack.length > 0 &&
        !!~'/*-+'.indexOf(stack[stack.length - 1])) {
      stack.pop();
    }
    else {
      stack.push(buf);
    }
    stack.push(op);
    buf = 0;
    sep = 0;
    clearOpButtons();
    if ($btn !== undefined) {
      $btn.addClass('pushed');
    }
  }

  let processStack = (op2) => {
    let top = stackCp.pop();
    switch (top) {
      case '/':
        return processStack() / op2;
      case '*':
        return processStack() * op2;
      case '-':
        return processStack() - op2;
      case '+':
        return processStack() + op2;
      default:
        return top;
    }
  }

  let processResult = () => {
    clearOpButtons();
    if (!resetBuf) {
      stack.push(buf);
    }
    stackCp = stack.map((v) => { return v; });
    buf = processStack(stackCp.pop());
    stack[0] = buf;
    sep = 0;
    resetBuf = true;
    $buf.text(buf);
  }

  let processNum = (num) => {
    if (resetBuf) {
      resetBuf = false;
      stack = [];
      buf = 0;
    }
    if (buf === 0 && !sep) {
      buf = num;
    }
    else {
      if (sep != 0) {
        buf += num * sep;
        sep /= 10;
      }
      else {
        buf *= 10;
        buf += num;
      }
    }
    $buf.text(buf);
    $('td#6').text('C');
  }

  let processKey = ($btn) => {
    switch (parseInt($btn.attr('id'))) {
      case 6:
        clearBuf();
        stack = [];
        $btn.text('AC');
        break;
      case 7:
        buf *= -1;
        $buf.text(buf);
        break;
      case 8:
        buf *= prevNum();
        buf /= 100;
        $buf.text(buf);
        break;
      case 9:
        processOp('/', $btn);
        break;
      case 16:
        processNum(7);
        break;
      case 17:
        processNum(8);
        break;
      case 18:
        processNum(9);
        break;
      case 19:
        processOp('*', $btn);
        break;
      case 26:
        processNum(4);
        break;
      case 27:
        processNum(5);
        break;
      case 28:
        processNum(6);
        break;
      case 29:
        processOp('-', $btn);
        break;
      case 36:
        processNum(1);
        break;
      case 37:
        processNum(2);
        break;
      case 38:
        processNum(3);
        break;
      case 39:
        processOp('+', $btn);
        break;
      case 46:
        processNum(0);
        break;

      case 48:
        sep = 0.1;
        $buf.text($buf.text() + '.');
        break;
      case 49:
        processResult();
        break;
    }
  }

  let documentReady = () => {
    $('.box').on('click', (event) => {
      processKey($(event.target));
    });
  };

  $(documentReady);
})();

