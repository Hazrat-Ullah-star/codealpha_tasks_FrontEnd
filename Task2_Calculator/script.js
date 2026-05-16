/**
 * Calculator – Script
 * Handles all logic, keyboard support, real-time display, and animations.
 */

'use strict';

// ─── DOM References ────────────────────────────────────────────────────────────
const expressionEl    = document.getElementById('expression');
const resultEl        = document.getElementById('result');
const keyboardHintEl  = document.getElementById('keyboard-hint');
const shortcutsToggle = document.getElementById('shortcuts-toggle');
const shortcutsPanel  = document.getElementById('shortcuts-panel');
const btnClear        = document.getElementById('btn-clear');

// ─── State ─────────────────────────────────────────────────────────────────────
let currentValue   = '0';   // what's on the main display
let expression     = '';    // the small top expression string
let operator       = null;  // active operator: + − × ÷
let prevValue      = null;  // stored operand before operator
let waitingForNext = false; // next digit press starts a fresh number
let justCalculated = false; // track if we just pressed =
let activeOpBtn    = null;  // currently highlighted operator button

// ─── Operator Button Map ────────────────────────────────────────────────────────
const operatorBtnMap = {
  '+': document.getElementById('btn-add'),
  '−': document.getElementById('btn-subtract'),
  '×': document.getElementById('btn-multiply'),
  '÷': document.getElementById('btn-divide'),
};

// ─── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Format a number for display – limit decimal places & use SI notation for huge numbers.
 */
function formatDisplay(num) {
  if (!isFinite(num)) return 'Error';
  const n = parseFloat(num);

  // Very large or very small → exponential
  if (Math.abs(n) >= 1e12 || (Math.abs(n) < 1e-6 && n !== 0)) {
    return n.toExponential(4);
  }

  // Trim floating-point noise (e.g. 0.1 + 0.2 = 0.30000000000000004)
  const str = parseFloat(n.toPrecision(12)).toString();
  return str;
}

/**
 * Update the result element and handle font-size shrinking.
 */
function setResult(text) {
  resultEl.textContent = text;
  resultEl.classList.remove('shrink', 'xshrink', 'error');

  if (text === 'Error' || text === 'Infinity' || text === '-Infinity') {
    resultEl.classList.add('error');
    return;
  }

  const len = text.length;
  if (len > 14) resultEl.classList.add('xshrink');
  else if (len > 9) resultEl.classList.add('shrink');
}

/**
 * Trigger the pop animation on the result.
 */
function popResult() {
  resultEl.classList.remove('pop');
  // Force reflow so the animation can re-trigger
  void resultEl.offsetWidth;
  resultEl.classList.add('pop');
}

/**
 * Highlight or unhighlight the operator button.
 */
function setActiveOperator(btn) {
  if (activeOpBtn) activeOpBtn.classList.remove('active-op');
  activeOpBtn = btn || null;
  if (activeOpBtn) activeOpBtn.classList.add('active-op');
}

/**
 * Trigger press animation on a button element.
 */
function animateButton(btn) {
  if (!btn) return;
  btn.classList.remove('pressed');
  void btn.offsetWidth;
  btn.classList.add('pressed');
  setTimeout(() => btn.classList.remove('pressed'), 200);
}

// ─── Core Logic ────────────────────────────────────────────────────────────────

function calculate(a, op, b) {
  const numA = parseFloat(a);
  const numB = parseFloat(b);
  switch (op) {
    case '+': return numA + numB;
    case '−': return numA - numB;
    case '×': return numA * numB;
    case '÷':
      if (numB === 0) return 'Error';
      return numA / numB;
    default:  return numB;
  }
}

function handleNumber(digit) {
  if (justCalculated) {
    // Start fresh after = press
    currentValue   = digit === '.' ? '0.' : digit;
    expression     = '';
    justCalculated = false;
    waitingForNext = false;
    setActiveOperator(null);
  } else if (waitingForNext) {
    currentValue   = digit === '.' ? '0.' : digit;
    waitingForNext = false;
  } else {
    if (digit === '.' && currentValue.includes('.')) return;
    if (currentValue === '0' && digit !== '.') {
      currentValue = digit;
    } else {
      if (currentValue.length >= 15) return; // cap length
      currentValue += digit;
    }
  }
  setResult(currentValue);
  updateExpression();
}

function handleOperator(op) {
  justCalculated = false;

  if (prevValue !== null && !waitingForNext) {
    // Chain calculation
    const res = calculate(prevValue, operator, currentValue);
    if (res === 'Error') { handleError(); return; }
    prevValue    = formatDisplay(res);
    currentValue = prevValue;
    setResult(currentValue);
    popResult();
  } else {
    prevValue = currentValue;
  }

  operator       = op;
  waitingForNext = true;
  expression     = `${prevValue} ${op}`;
  expressionEl.textContent = expression;

  setActiveOperator(operatorBtnMap[op] || null);
}

function handleEquals() {
  if (prevValue === null || operator === null) {
    popResult();
    return;
  }

  const exprText = `${prevValue} ${operator} ${currentValue} =`;
  const res = calculate(prevValue, operator, currentValue);

  if (res === 'Error') { handleError(); return; }

  const formatted = formatDisplay(res);
  expression     = exprText;
  currentValue   = formatted;
  prevValue      = null;
  operator       = null;
  waitingForNext = false;
  justCalculated = true;

  expressionEl.textContent = expression;
  setResult(currentValue);
  popResult();
  setActiveOperator(null);
}

function handleClear() {
  currentValue   = '0';
  expression     = '';
  operator       = null;
  prevValue      = null;
  waitingForNext = false;
  justCalculated = false;

  expressionEl.textContent = '';
  setResult('0');
  setActiveOperator(null);
}

function handleBackspace() {
  if (justCalculated || waitingForNext) return;

  if (currentValue.length <= 1 || (currentValue.length === 2 && currentValue.startsWith('-'))) {
    currentValue = '0';
  } else {
    currentValue = currentValue.slice(0, -1);
  }
  setResult(currentValue);

  // Animate the AC button briefly red
  btnClear.classList.add('btn-backspace-flash');
  setTimeout(() => btnClear.classList.remove('btn-backspace-flash'), 250);
}

function handlePercent() {
  const val = parseFloat(currentValue);
  if (isNaN(val)) return;

  if (prevValue !== null && operator !== null) {
    // e.g. 200 + 10% → 200 + 20
    currentValue = formatDisplay((parseFloat(prevValue) * val) / 100);
  } else {
    currentValue = formatDisplay(val / 100);
  }
  setResult(currentValue);
  popResult();
  updateExpression();
}

function handleSign() {
  if (currentValue === '0') return;
  if (currentValue.startsWith('-')) {
    currentValue = currentValue.slice(1);
  } else {
    currentValue = '-' + currentValue;
  }
  setResult(currentValue);
  updateExpression();
}

function handleError() {
  setResult('Error');
  resultEl.classList.add('error');
  expression     = '';
  expressionEl.textContent = '';
  prevValue      = null;
  operator       = null;
  waitingForNext = false;
  justCalculated = false;
  setActiveOperator(null);
  // Auto-clear after 1.5s
  setTimeout(handleClear, 1500);
}

function updateExpression() {
  if (operator) {
    expressionEl.textContent = `${prevValue} ${operator} ${currentValue}`;
  }
}

// ─── Button Click Handlers ──────────────────────────────────────────────────────

document.querySelectorAll('.btn-number').forEach(btn => {
  btn.addEventListener('click', () => {
    handleNumber(btn.id === 'btn-decimal' ? '.' : btn.textContent.trim());
    animateButton(btn);
  });
});

document.querySelectorAll('.btn-operator').forEach(btn => {
  btn.addEventListener('click', () => {
    const opMap = {
      'btn-add':      '+',
      'btn-subtract': '−',
      'btn-multiply': '×',
      'btn-divide':   '÷',
    };
    handleOperator(opMap[btn.id]);
    animateButton(btn);
  });
});

document.getElementById('btn-equals').addEventListener('click', (e) => {
  handleEquals();
  animateButton(e.currentTarget);
});

document.getElementById('btn-clear').addEventListener('click', (e) => {
  handleClear();
  animateButton(e.currentTarget);
});

document.getElementById('btn-percent').addEventListener('click', (e) => {
  handlePercent();
  animateButton(e.currentTarget);
});

document.getElementById('btn-sign').addEventListener('click', (e) => {
  handleSign();
  animateButton(e.currentTarget);
});

// ─── Keyboard Support ───────────────────────────────────────────────────────────

const keyMap = {
  '0': () => handleNumber('0'),
  '1': () => handleNumber('1'),
  '2': () => handleNumber('2'),
  '3': () => handleNumber('3'),
  '4': () => handleNumber('4'),
  '5': () => handleNumber('5'),
  '6': () => handleNumber('6'),
  '7': () => handleNumber('7'),
  '8': () => handleNumber('8'),
  '9': () => handleNumber('9'),
  '.': () => handleNumber('.'),
  ',': () => handleNumber('.'),
  '+': () => handleOperator('+'),
  '-': () => handleOperator('−'),
  '*': () => handleOperator('×'),
  '/': () => { /* handled below to prevent browser shortcut */ },
  'Enter': handleEquals,
  '=':     handleEquals,
  'Escape': handleClear,
  'Backspace': handleBackspace,
  'Delete':    handleClear,
  '%':  handlePercent,
};

// Map keyboard key → button id for visual animation
const keyBtnMap = {
  '0': 'btn-0', '1': 'btn-1', '2': 'btn-2', '3': 'btn-3',
  '4': 'btn-4', '5': 'btn-5', '6': 'btn-6', '7': 'btn-7',
  '8': 'btn-8', '9': 'btn-9', '.': 'btn-decimal', ',': 'btn-decimal',
  '+': 'btn-add',      '-': 'btn-subtract',
  '*': 'btn-multiply', '/': 'btn-divide',
  'Enter': 'btn-equals', '=': 'btn-equals',
  'Escape': 'btn-clear', 'Delete': 'btn-clear',
  'Backspace': 'btn-clear',
  '%': 'btn-percent',
};

document.addEventListener('keydown', (e) => {
  const key = e.key;

  // Prevent browser shortcuts for / and others
  if (key === '/' || key === 'Enter') e.preventDefault();

  // Highlight keyboard hint
  keyboardHintEl.classList.add('active');
  clearTimeout(window._kbHintTimeout);
  window._kbHintTimeout = setTimeout(() => {
    keyboardHintEl.classList.remove('active');
  }, 1200);

  if (key === '/') {
    handleOperator('÷');
    animateButton(document.getElementById('btn-divide'));
    return;
  }

  if (keyMap[key]) {
    keyMap[key]();
    const btnId = keyBtnMap[key];
    if (btnId) animateButton(document.getElementById(btnId));
  }
});

// ─── Shortcuts Panel Toggle ─────────────────────────────────────────────────────
shortcutsToggle.addEventListener('click', () => {
  shortcutsPanel.classList.toggle('visible');
  shortcutsToggle.textContent = shortcutsPanel.classList.contains('visible')
    ? '✕ Close'
    : '⌨ Shortcuts';
});

// ─── Initial State ──────────────────────────────────────────────────────────────
setResult('0');
