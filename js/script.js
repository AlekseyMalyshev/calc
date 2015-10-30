/*
 * File script.js
 * Created by AlekseyMalyshev
 * Date created Oct 29, 2015
 */

(function app() {
  'use strict';

  let mem = 0;
  let $mem = $('td#5');

  let buf = 0;
  let sep = 0;
  let $buf = $('th#buf');

  let stack = [];

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

  let setBufText = (num) => {
    $buf.text(num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  }

  let processOp = (op, $btn) => {
    stack.push(buf);
    stack.push(op);
    buf = 0;
    sep = 0;
    $('td#9').removeClass('pushed');
    $('td#19').removeClass('pushed');
    $('td#29').removeClass('pushed');
    $('td#39').removeClass('pushed');
    if ($btn !== undefined) {
      $btn.addClass('pushed');
    }
  }

  let processStack = (op2) => {
    let top = stack.pop();
    switch (top) {
      case '/':
        return processStack() / op2;
      case '*':
        return processStack() * op2;
      case '-':
        return processStack() - op2;
      case '+':
        return processStack() + op2;
      case '=':
        buf = processStack(stack.pop());
        sep = 0;
        $buf.text(buf);
        break;
      default:
        return top;
    }
  }

  let processNum = (num) => {
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
      case 0:
        break;
      case 1:
        break;
      case 2:
        mem = 0;
        $mem.removeClass('pushed');
        break;
      case 3:
        mem += buf;
        $mem.addClass('pushed');
        break;
      case 4:
        mem -= buf;
        $mem.addClass('pushed');
        break;
      case 5:
        buf = mem;
        $buf.text(buf);
        break;
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
      case 10:
        break;
      case 11:
        break;
      case 12:
        break;
      case 13:
        break;
      case 14:
        break;
      case 15:
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
      case 20:
        break;
      case 21:
        break;
      case 22:
        break;
      case 23:
        break;
      case 24:
        break;
      case 25:
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
      case 30:
        break;
      case 31:
        break;
      case 32:
        break;
      case 33:
        break;
      case 34:
        break;
      case 35:
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
      case 40:
        break;
      case 41:
        break;
      case 42:
        break;
      case 43:
        break;
      case 44:
        break;
      case 45:
        break;
      case 46:
        processNum(0);
        break;

      case 48:
        sep = 0.1;
        $buf.text($buf.text() + '.');
        break;
      case 49:
        processOp('=');
        processStack();
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

