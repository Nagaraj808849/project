import React, { useState, useEffect, useRef } from "react";

/**
 * Scientific Calculator - Single React file using Tailwind CSS
 * - Put this file in your components folder and import it (or render directly)
 * - Requires Tailwind CSS already configured in the project.
 *
 * Usage:
 *   <ScientificCalculator />
 */

export default function ScientificCalculator() {
  const [expr, setExpr] = useState("");           // current expression shown
  const [result, setResult] = useState("");       // last computed result
  const [degMode, setDegMode] = useState(true);   // degrees vs radians
  const [memory, setMemory] = useState(0);        // memory register
  const [history, setHistory] = useState([]);     // calculation history
  const inputRef = useRef(null);

  useEffect(() => {
    // keyboard handler
    function handleKey(e) {
      const key = e.key;
      if ((/^[0-9.+\-*/()%]$/).test(key)) {
        setExpr((s) => s + key);
        e.preventDefault();
      } else if (key === "Enter") {
        evaluate();
        e.preventDefault();
      } else if (key === "Backspace") {
        backspace();
        e.preventDefault();
      } else if (key === "^") {
        setExpr((s) => s + "^");
        e.preventDefault();
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [expr, degMode]);

  // helper: safe evaluate expression using Math functions with degree handling for trig
  const evaluate = () => {
    if (!expr.trim()) return;
    try {
      const cleaned = expr
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/−/g, "-")
        .replace(/(\d)(?=\()/g, "$1*(") // allow 2(3+4) => 2*(3+4)
        .replace(/(\))(?=\d)/g, ")*"); // allow (2+3)4 => (2+3)*4

      // create wrappers for trig depending on degMode
      const degToRad = (v) => (v * Math.PI) / 180;
      const wrap = {
        sin: (v) => Math.sin(degMode ? degToRad(v) : v),
        cos: (v) => Math.cos(degMode ? degToRad(v) : v),
        tan: (v) => Math.tan(degMode ? degToRad(v) : v),
        asin: (v) => (degMode ? (Math.asin(v) * 180) / Math.PI : Math.asin(v)),
        acos: (v) => (degMode ? (Math.acos(v) * 180) / Math.PI : Math.acos(v)),
        atan: (v) => (degMode ? (Math.atan(v) * 180) / Math.PI : Math.atan(v)),
      };

      // Build a sandboxed expression by replacing function names with wrapper calls
      let sandboxExpr = cleaned
        // functions with two args: e.g. pow(a,b) or x^y -> use pow
        .replace(/\^/g, "**") // support caret as power (JS uses **)
        // map common function names to Math equivalents
        .replace(/\bln\(/g, "Math.log(")      // natural log
        .replace(/\blog\(/g, "Math.log10(")   // base-10 log
        .replace(/\bsqrt\(/g, "Math.sqrt(")
        .replace(/\babs\(/g, "Math.abs(")
        .replace(/\bexp\(/g, "Math.exp(")
        .replace(/\be\b/g, `(${Math.E})`)     // constant e
        .replace(/\bpi\b/gi, `(${Math.PI})`); // constant pi

      // Replace trig function calls to prefixed wrapper names to call below
      sandboxExpr = sandboxExpr
        .replace(/\basin\s*\(/gi, "__asin(")
        .replace(/\bacos\s*\(/gi, "__acos(")
        .replace(/\batan\s*\(/gi, "__atan(")
        .replace(/\bsin\s*\(/gi, "__sin(")
        .replace(/\bcos\s*\(/gi, "__cos(")
        .replace(/\btan\s*\(/gi, "__tan(");

      // Validate characters: allow digits, letters, Math, operators, parentheses, ., _, * , /
      if (!/^[0-9+\-*/()., *_A-Za-z\[\]]+$/.test(sandboxExpr)) {
        throw new Error("Invalid characters in expression");
      }

      // build function with wrapper functions injected
      const fn = new Function(
        "__sin",
        "__cos",
        "__tan",
        "__asin",
        "__acos",
        "__atan",
        "Math",
        `return (${sandboxExpr});`
      );

      const value = fn(
        wrap.sin,
        wrap.cos,
        wrap.tan,
        wrap.asin,
        wrap.acos,
        wrap.atan,
        Math
      );

      const display = Number.isFinite(value)
        ? +parseFloat(value).toPrecision(12) // tidy precision
        : value;

      setResult(String(display));
      setHistory((h) => [{ expr, result: String(display) }, ...h].slice(0, 20));
    } catch (err) {
      setResult("Error");
      console.error("Calc error:", err);
    }
  };

  const press = (txt) => {
    setExpr((s) => s + txt);
    inputRef.current?.focus();
  };

  const clearAll = () => {
    setExpr("");
    setResult("");
  };

  const backspace = () => setExpr((s) => s.slice(0, -1));

  // Memory operations
  const memoryClear = () => setMemory(0);
  const memoryRecall = () => setExpr((s) => s + String(memory));
  const memoryAdd = () => {
    const val = parseFloat(result || expr || 0) || 0;
    setMemory((m) => m + val);
  };
  const memorySub = () => {
    const val = parseFloat(result || expr || 0) || 0;
    setMemory((m) => m - val);
  };

  // Quick button layout
  const rows = [
    ["MC", "MR", "M+", "M-", "Deg/Rad"],
    ["(", ")", "CE", "⌫", "÷"],
    ["7", "8", "9", "×", "sqrt("],
    ["4", "5", "6", "-", "x^y"],
    ["1", "2", "3", "+", "log("],
    ["0", ".", "±", "=", "ln("],
    ["sin(", "cos(", "tan(", "exp(", "pi"],
  ];

  // handle special buttons
  const handleButton = (b) => {
    if (b === "CE") return clearAll();
    if (b === "⌫") return backspace();
    if (b === "MC") return memoryClear();
    if (b === "MR") return memoryRecall();
    if (b === "M+") return memoryAdd();
    if (b === "M-") return memorySub();
    if (b === "Deg/Rad") return setDegMode((d) => !d);
    if (b === "×") return press("*");
    if (b === "÷") return press("/");
    if (b === "x^y") return press("^");
    if (b === "±") {
      // toggle sign of last number
      setExpr((s) => {
        if (!s) return "-";
        // find last number
        const m = s.match(/(-?\d+\.?\d*)$/);
        if (m) {
          const num = m[1];
          const replaced = s.slice(0, -num.length) + (num.startsWith("-") ? num.slice(1) : "-" + num);
          return replaced;
        } else {
          return s + "-";
        }
      });
      return;
    }
    // default: press text directly
    press(b);
    if (b === "=") evaluate();
  };

  // When user clicks "=" we want to evaluate; but "=" isn't in rows except handled by click
  const clickEquals = () => evaluate();

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-red-600 text-white px-4 py-3 flex items-center justify-between">
          <div className="font-bold text-lg">Scientific Calculator</div>
          <div className="text-sm">{degMode ? "Degrees" : "Radians"}</div>
        </div>

        {/* Display */}
        <div className="p-4 space-y-2">
          <div className="bg-gray-50 rounded-md p-3 text-right text-sm text-gray-600 break-words min-h-[44px]">
            <input
              ref={inputRef}
              value={expr}
              onChange={(e) => setExpr(e.target.value)}
              className="w-full bg-transparent outline-none text-right text-2xl font-mono"
              placeholder="Enter expression..."
            />
          </div>

          <div className="flex items-center justify-between text-sm text-gray-700">
            <div>Result:</div>
            <div className="font-semibold text-lg">{result || "—"}</div>
          </div>

          <div className="flex gap-2 items-center text-xs">
            <div className="text-gray-500">Memory:</div>
            <div className="font-mono px-2 py-1 bg-gray-100 rounded">{String(memory)}</div>
            <div className="ml-2 text-gray-500">History:</div>
            <div className="flex-1 overflow-x-auto">
              <div className="flex gap-2">
                {history.slice(0, 6).map((h, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setExpr(h.expr);
                      setResult(h.result);
                    }}
                    className="text-xs px-2 py-1 bg-gray-100 rounded"
                  >
                    {h.expr} = {h.result}
                  </button>
                ))}
                {history.length === 0 && <div className="text-xs text-gray-400">—</div>}
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="p-4 grid gap-2">
          <div className="grid grid-cols-5 gap-2">
            {/* render a few quick buttons */}
            <button onClick={() => handleButton("MC")} className="btn">
              MC
            </button>
            <button onClick={() => handleButton("MR")} className="btn">
              MR
            </button>
            <button onClick={() => handleButton("M+")} className="btn">
              M+
            </button>
            <button onClick={() => handleButton("M-")} className="btn">
              M-
            </button>
            <button
              onClick={() => handleButton("Deg/Rad")}
              className="btn bg-gray-100 hover:bg-gray-200"
            >
              {degMode ? "Deg" : "Rad"}
            </button>
          </div>

          {/* full button grid */}
          <div className="grid grid-cols-5 gap-2">
            {[
              ["(", ")", "CE", "⌫", "÷"],
              ["7", "8", "9", "×", "sqrt("],
              ["4", "5", "6", "-", "x^y"],
              ["1", "2", "3", "+", "log("],
              ["0", ".", "±", "=", "ln("],
              ["sin(", "cos(", "tan(", "exp(", "pi"],
            ].flat().map((b, idx) => {
              // style special keys
              const isOp = ["÷", "×", "-", "+", "=", "CE", "⌫", "x^y"].includes(b);
              const cls = `py-3 rounded-md text-sm font-medium ${
                b === "="
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : isOp
                  ? "bg-gray-100 hover:bg-gray-200"
                  : "bg-white hover:bg-gray-50"
              }`;
              return (
                <button
                  key={idx + b}
                  onClick={() => {
                    if (b === "=") clickEquals();
                    else handleButton(b);
                  }}
                  className={cls}
                >
                  {b}
                </button>
              );
            })}
          </div>

          {/* extra controls */}
          <div className="flex gap-2">
            <button
              onClick={() => {
                // evaluate and also append to expr as result
                evaluate();
                if (result) setExpr(String(result));
              }}
              className="flex-1 py-2 rounded-md bg-green-600 text-white"
            >
              Evaluate
            </button>
            <button
              onClick={() => {
                setHistory([]);
                setMemory(0);
                clearAll();
              }}
              className="py-2 px-4 rounded-md bg-gray-100 hover:bg-gray-200"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* small styles injected */}
      <style>{`
        .btn { padding: 0.6rem; border-radius: 0.5rem; background: #f7fafc; border: 1px solid #e5e7eb; }
        .btn:hover { background: #f1f5f9; }
      `}</style>
    </div>
  );
}
