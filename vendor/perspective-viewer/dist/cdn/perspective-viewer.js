// dist/cdn/perspective-viewer.js
var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var HTMLPerspectiveViewerPluginElement = class extends HTMLElement {
  constructor() {
    super();
  }
  get name() {
    return "Debug";
  }
  get select_mode() {
    return "select";
  }
  get min_config_columns() {
    return void 0;
  }
  get config_column_names() {
    return void 0;
  }
  get priority() {
    return 0;
  }
  async update(view) {
    return this.draw(view);
  }
  async draw(view) {
    this.style.backgroundColor = "#fff";
    const csv = await view.to_csv();
    const css = `margin:0;overflow:scroll;position:absolute;width:100%;height:100%`;
    this.innerHTML = `<pre style='${css}'>${csv}</pre>`;
  }
  async clear() {
    this.innerHTML = "";
  }
  async resize() {
  }
  async restyle() {
  }
  async save() {
  }
  async restore() {
  }
  async delete() {
  }
};
if (document.createElement("perspective-viewer-plugin").constructor === HTMLElement) {
  window.customElements.define(
    "perspective-viewer-plugin",
    HTMLPerspectiveViewerPluginElement
  );
}
var perspective_exports = {};
__export(perspective_exports, {
  ColumnDropDownElement: () => ColumnDropDownElement,
  CopyDropDownMenuElement: () => CopyDropDownMenuElement,
  ExportDropDownMenuElement: () => ExportDropDownMenuElement,
  FilterDropDownElement: () => FilterDropDownElement,
  FunctionDropDownElement: () => FunctionDropDownElement,
  PerspectiveDateColumnStyleElement: () => PerspectiveDateColumnStyleElement,
  PerspectiveDatetimeColumnStyleElement: () => PerspectiveDatetimeColumnStyleElement,
  PerspectiveDebugPluginElement: () => PerspectiveDebugPluginElement,
  PerspectiveNumberColumnStyleElement: () => PerspectiveNumberColumnStyleElement,
  PerspectiveStringColumnStyleElement: () => PerspectiveStringColumnStyleElement,
  PerspectiveViewerElement: () => PerspectiveViewerElement,
  default: () => perspective_default,
  defineWebComponents: () => defineWebComponents,
  getExprTKCommands: () => getExprTKCommands,
  initSync: () => initSync,
  registerPlugin: () => registerPlugin
});
var ClipboardItem = window.ClipboardItem;
var ResizeObserver = window.ResizeObserver;
function bootstrap(psp, name, clsname, statics) {
  const cls = psp[clsname];
  const proto2 = cls.prototype;
  class x2 extends HTMLElement {
    constructor() {
      super();
      this._instance = new cls(this);
    }
  }
  const names2 = Object.getOwnPropertyNames(proto2);
  for (const key of names2) {
    if ("get" in Object.getOwnPropertyDescriptor(proto2, key)) {
      Object.defineProperty(x2.prototype, key, {
        get: function() {
          return this._instance[key];
        }
      });
    } else {
      Object.defineProperty(x2.prototype, key, {
        value: function(...args) {
          return this._instance[key].call(this._instance, ...args);
        }
      });
    }
  }
  for (const key of statics) {
    Object.defineProperty(x2, key, {
      value: function(...args) {
        return psp[key].call(psp, ...args);
      }
    });
  }
  customElements.define(name, x2);
}
var wasm;
var cachedTextDecoder = new TextDecoder("utf-8", { ignoreBOM: true, fatal: true });
cachedTextDecoder.decode();
var cachedUint8Memory0 = null;
function getUint8Memory0() {
  if (cachedUint8Memory0 === null || cachedUint8Memory0.byteLength === 0) {
    cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
  }
  return cachedUint8Memory0;
}
function getStringFromWasm0(ptr, len) {
  return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}
var heap = new Array(128).fill(void 0);
heap.push(void 0, null, true, false);
var heap_next = heap.length;
function addHeapObject(obj) {
  if (heap_next === heap.length)
    heap.push(heap.length + 1);
  const idx = heap_next;
  heap_next = heap[idx];
  heap[idx] = obj;
  return idx;
}
function getObject(idx) {
  return heap[idx];
}
function dropObject(idx) {
  if (idx < 132)
    return;
  heap[idx] = heap_next;
  heap_next = idx;
}
function takeObject(idx) {
  const ret = getObject(idx);
  dropObject(idx);
  return ret;
}
var WASM_VECTOR_LEN = 0;
var cachedTextEncoder = new TextEncoder("utf-8");
var encodeString = typeof cachedTextEncoder.encodeInto === "function" ? function(arg, view) {
  return cachedTextEncoder.encodeInto(arg, view);
} : function(arg, view) {
  const buf = cachedTextEncoder.encode(arg);
  view.set(buf);
  return {
    read: arg.length,
    written: buf.length
  };
};
function passStringToWasm0(arg, malloc, realloc) {
  if (realloc === void 0) {
    const buf = cachedTextEncoder.encode(arg);
    const ptr2 = malloc(buf.length);
    getUint8Memory0().subarray(ptr2, ptr2 + buf.length).set(buf);
    WASM_VECTOR_LEN = buf.length;
    return ptr2;
  }
  let len = arg.length;
  let ptr = malloc(len);
  const mem = getUint8Memory0();
  let offset = 0;
  for (; offset < len; offset++) {
    const code = arg.charCodeAt(offset);
    if (code > 127)
      break;
    mem[ptr + offset] = code;
  }
  if (offset !== len) {
    if (offset !== 0) {
      arg = arg.slice(offset);
    }
    ptr = realloc(ptr, len, len = offset + arg.length * 3);
    const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
    const ret = encodeString(arg, view);
    offset += ret.written;
  }
  WASM_VECTOR_LEN = offset;
  return ptr;
}
function isLikeNone(x2) {
  return x2 === void 0 || x2 === null;
}
var cachedInt32Memory0 = null;
function getInt32Memory0() {
  if (cachedInt32Memory0 === null || cachedInt32Memory0.byteLength === 0) {
    cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);
  }
  return cachedInt32Memory0;
}
var cachedFloat64Memory0 = null;
function getFloat64Memory0() {
  if (cachedFloat64Memory0 === null || cachedFloat64Memory0.byteLength === 0) {
    cachedFloat64Memory0 = new Float64Array(wasm.memory.buffer);
  }
  return cachedFloat64Memory0;
}
var cachedBigInt64Memory0 = null;
function getBigInt64Memory0() {
  if (cachedBigInt64Memory0 === null || cachedBigInt64Memory0.byteLength === 0) {
    cachedBigInt64Memory0 = new BigInt64Array(wasm.memory.buffer);
  }
  return cachedBigInt64Memory0;
}
function debugString(val) {
  const type = typeof val;
  if (type == "number" || type == "boolean" || val == null) {
    return `${val}`;
  }
  if (type == "string") {
    return `"${val}"`;
  }
  if (type == "symbol") {
    const description = val.description;
    if (description == null) {
      return "Symbol";
    } else {
      return `Symbol(${description})`;
    }
  }
  if (type == "function") {
    const name = val.name;
    if (typeof name == "string" && name.length > 0) {
      return `Function(${name})`;
    } else {
      return "Function";
    }
  }
  if (Array.isArray(val)) {
    const length = val.length;
    let debug = "[";
    if (length > 0) {
      debug += debugString(val[0]);
    }
    for (let i2 = 1; i2 < length; i2++) {
      debug += ", " + debugString(val[i2]);
    }
    debug += "]";
    return debug;
  }
  const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
  let className;
  if (builtInMatches.length > 1) {
    className = builtInMatches[1];
  } else {
    return toString.call(val);
  }
  if (className == "Object") {
    try {
      return "Object(" + JSON.stringify(val) + ")";
    } catch (_) {
      return "Object";
    }
  }
  if (val instanceof Error) {
    return `${val.name}: ${val.message}
${val.stack}`;
  }
  return className;
}
function makeMutClosure(arg0, arg1, dtor, f) {
  const state = { a: arg0, b: arg1, cnt: 1, dtor };
  const real = (...args) => {
    state.cnt++;
    const a = state.a;
    state.a = 0;
    try {
      return f(a, state.b, ...args);
    } finally {
      if (--state.cnt === 0) {
        wasm.__wbindgen_export_2.get(state.dtor)(a, state.b);
      } else {
        state.a = a;
      }
    }
  };
  real.original = state;
  return real;
}
function __wbg_adapter_50(arg0, arg1) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    wasm._dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h7d554f50bbe02c16(retptr, arg0, arg1);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    if (r1) {
      throw takeObject(r0);
    }
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function __wbg_adapter_53(arg0, arg1, arg2) {
  wasm._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__he139df485bcf022c(arg0, arg1, addHeapObject(arg2));
}
function makeClosure(arg0, arg1, dtor, f) {
  const state = { a: arg0, b: arg1, cnt: 1, dtor };
  const real = (...args) => {
    state.cnt++;
    try {
      return f(state.a, state.b, ...args);
    } finally {
      if (--state.cnt === 0) {
        wasm.__wbindgen_export_2.get(state.dtor)(state.a, state.b);
        state.a = 0;
      }
    }
  };
  real.original = state;
  return real;
}
function __wbg_adapter_56(arg0, arg1, arg2) {
  wasm._dyn_core__ops__function__Fn__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h6401e06e95fa1aa5(arg0, arg1, addHeapObject(arg2));
}
function __wbg_adapter_61(arg0, arg1, arg2) {
  const ret = wasm._dyn_core__ops__function__Fn__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hdd6a8f55ead23c1a(arg0, arg1, addHeapObject(arg2));
  return takeObject(ret);
}
function __wbg_adapter_66(arg0, arg1) {
  wasm._dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hd2028441c711ba36(arg0, arg1);
}
function __wbg_adapter_69(arg0, arg1, arg2) {
  wasm._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h5479b7899c2154e8(arg0, arg1, addHeapObject(arg2));
}
var stack_pointer = 128;
function addBorrowedObject(obj) {
  if (stack_pointer == 1)
    throw new Error("out of js stack");
  heap[--stack_pointer] = obj;
  return stack_pointer;
}
function __wbg_adapter_72(arg0, arg1, arg2) {
  try {
    wasm._dyn_core__ops__function__FnMut___A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h184efdf9ad459500(arg0, arg1, addBorrowedObject(arg2));
  } finally {
    heap[stack_pointer++] = void 0;
  }
}
function handleError(f, args) {
  try {
    return f.apply(this, args);
  } catch (e) {
    wasm.__wbindgen_exn_store(addHeapObject(e));
  }
}
function registerPlugin(name) {
  const ptr0 = passStringToWasm0(name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
  const len0 = WASM_VECTOR_LEN;
  wasm.registerPlugin(ptr0, len0);
}
var cachedUint32Memory0 = null;
function getUint32Memory0() {
  if (cachedUint32Memory0 === null || cachedUint32Memory0.byteLength === 0) {
    cachedUint32Memory0 = new Uint32Array(wasm.memory.buffer);
  }
  return cachedUint32Memory0;
}
function getArrayJsValueFromWasm0(ptr, len) {
  const mem = getUint32Memory0();
  const slice = mem.subarray(ptr / 4, ptr / 4 + len);
  const result = [];
  for (let i2 = 0; i2 < slice.length; i2++) {
    result.push(takeObject(slice[i2]));
  }
  return result;
}
function getExprTKCommands() {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    wasm.getExprTKCommands(retptr);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var r2 = getInt32Memory0()[retptr / 4 + 2];
    var r3 = getInt32Memory0()[retptr / 4 + 3];
    if (r3) {
      throw takeObject(r2);
    }
    var v0 = getArrayJsValueFromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 4);
    return v0;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function defineWebComponents() {
  wasm.defineWebComponents();
}
function passArrayJsValueToWasm0(array, malloc) {
  const ptr = malloc(array.length * 4);
  const mem = getUint32Memory0();
  for (let i2 = 0; i2 < array.length; i2++) {
    mem[ptr / 4 + i2] = addHeapObject(array[i2]);
  }
  WASM_VECTOR_LEN = array.length;
  return ptr;
}
function __wbg_adapter_632(arg0, arg1, arg2, arg3) {
  wasm.wasm_bindgen__convert__closures__invoke2_mut__h502b5d03c9f46e48(arg0, arg1, addHeapObject(arg2), addHeapObject(arg3));
}
var ColumnDropDownElement = class {
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_columndropdownelement_free(ptr);
  }
};
var CopyDropDownMenuElement = class {
  static __wrap(ptr) {
    const obj = Object.create(CopyDropDownMenuElement.prototype);
    obj.ptr = ptr;
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_copydropdownmenuelement_free(ptr);
  }
  constructor(elem) {
    const ret = wasm.copydropdownmenuelement_new(addHeapObject(elem));
    return CopyDropDownMenuElement.__wrap(ret);
  }
  open(target) {
    wasm.copydropdownmenuelement_open(this.ptr, addHeapObject(target));
  }
  hide() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.copydropdownmenuelement_hide(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      if (r1) {
        throw takeObject(r0);
      }
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  unsafe_set_model(ptr) {
    wasm.copydropdownmenuelement_unsafe_set_model(this.ptr, ptr);
  }
  connected_callback() {
    wasm.copydropdownmenuelement_connected_callback(this.ptr);
  }
};
var ExportDropDownMenuElement = class {
  static __wrap(ptr) {
    const obj = Object.create(ExportDropDownMenuElement.prototype);
    obj.ptr = ptr;
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_exportdropdownmenuelement_free(ptr);
  }
  constructor(elem) {
    const ret = wasm.exportdropdownmenuelement_new(addHeapObject(elem));
    return ExportDropDownMenuElement.__wrap(ret);
  }
  open(target) {
    wasm.exportdropdownmenuelement_open(this.ptr, addHeapObject(target));
  }
  hide() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.exportdropdownmenuelement_hide(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      if (r1) {
        throw takeObject(r0);
      }
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  unsafe_set_model(ptr) {
    wasm.exportdropdownmenuelement_unsafe_set_model(this.ptr, ptr);
  }
  connected_callback() {
    wasm.exportdropdownmenuelement_connected_callback(this.ptr);
  }
};
var FilterDropDownElement = class {
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_filterdropdownelement_free(ptr);
  }
};
var FunctionDropDownElement = class {
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_functiondropdownelement_free(ptr);
  }
};
var PerspectiveDateColumnStyleElement = class {
  static __wrap(ptr) {
    const obj = Object.create(PerspectiveDateColumnStyleElement.prototype);
    obj.ptr = ptr;
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_perspectivedatecolumnstyleelement_free(ptr);
  }
  constructor(elem) {
    const ret = wasm.perspectivedatecolumnstyleelement_new(addHeapObject(elem));
    return PerspectiveDateColumnStyleElement.__wrap(ret);
  }
  reset(config) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.perspectivedatecolumnstyleelement_reset(retptr, this.ptr, addHeapObject(config));
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      if (r1) {
        throw takeObject(r0);
      }
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  open(target, js_config, js_default_config) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.perspectivedatecolumnstyleelement_open(retptr, this.ptr, addHeapObject(target), addHeapObject(js_config), addHeapObject(js_default_config));
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      if (r1) {
        throw takeObject(r0);
      }
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  close() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.perspectivedatecolumnstyleelement_close(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      if (r1) {
        throw takeObject(r0);
      }
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  destroy() {
    try {
      const ptr = this.__destroy_into_raw();
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.perspectivedatecolumnstyleelement_destroy(retptr, ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      if (r1) {
        throw takeObject(r0);
      }
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  connected_callback() {
    wasm.perspectivedatecolumnstyleelement_connected_callback(this.ptr);
  }
};
var PerspectiveDatetimeColumnStyleElement = class {
  static __wrap(ptr) {
    const obj = Object.create(PerspectiveDatetimeColumnStyleElement.prototype);
    obj.ptr = ptr;
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_perspectivedatetimecolumnstyleelement_free(ptr);
  }
  constructor(elem) {
    const ret = wasm.perspectivedatetimecolumnstyleelement_new(addHeapObject(elem));
    return PerspectiveDatetimeColumnStyleElement.__wrap(ret);
  }
  reset(config) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.perspectivedatetimecolumnstyleelement_reset(retptr, this.ptr, addHeapObject(config));
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      if (r1) {
        throw takeObject(r0);
      }
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  open(target, js_config, js_default_config) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.perspectivedatetimecolumnstyleelement_open(retptr, this.ptr, addHeapObject(target), addHeapObject(js_config), addHeapObject(js_default_config));
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      if (r1) {
        throw takeObject(r0);
      }
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  close() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.perspectivedatetimecolumnstyleelement_close(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      if (r1) {
        throw takeObject(r0);
      }
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  destroy() {
    try {
      const ptr = this.__destroy_into_raw();
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.perspectivedatetimecolumnstyleelement_destroy(retptr, ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      if (r1) {
        throw takeObject(r0);
      }
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  connected_callback() {
    wasm.perspectivedatetimecolumnstyleelement_connected_callback(this.ptr);
  }
};
var PerspectiveDebugPluginElement = class {
  static __wrap(ptr) {
    const obj = Object.create(PerspectiveDebugPluginElement.prototype);
    obj.ptr = ptr;
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_perspectivedebugpluginelement_free(ptr);
  }
  constructor(elem) {
    const ret = wasm.perspectivedebugpluginelement_new(addHeapObject(elem));
    return PerspectiveDebugPluginElement.__wrap(ret);
  }
  get name() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.perspectivedebugpluginelement_name(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_free(r0, r1);
    }
  }
  get select_mode() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.perspectivedebugpluginelement_select_mode(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_free(r0, r1);
    }
  }
  get min_config_columns() {
    const ret = wasm.perspectivedebugpluginelement_config_column_names(this.ptr);
    return takeObject(ret);
  }
  get config_column_names() {
    const ret = wasm.perspectivedebugpluginelement_config_column_names(this.ptr);
    return takeObject(ret);
  }
  update(view) {
    const ret = wasm.perspectivedebugpluginelement_update(this.ptr, addHeapObject(view));
    return takeObject(ret);
  }
  draw(view) {
    const ret = wasm.perspectivedebugpluginelement_draw(this.ptr, addHeapObject(view));
    return takeObject(ret);
  }
  clear() {
    const ret = wasm.perspectivedebugpluginelement_clear(this.ptr);
    return takeObject(ret);
  }
  resize() {
    const ret = wasm.perspectivedebugpluginelement_clear(this.ptr);
    return takeObject(ret);
  }
  restyle() {
    const ret = wasm.perspectivedebugpluginelement_clear(this.ptr);
    return takeObject(ret);
  }
  save() {
    const ret = wasm.perspectivedebugpluginelement_clear(this.ptr);
    return takeObject(ret);
  }
  restore() {
    const ret = wasm.perspectivedebugpluginelement_clear(this.ptr);
    return takeObject(ret);
  }
  delete() {
    const ret = wasm.perspectivedebugpluginelement_clear(this.ptr);
    return takeObject(ret);
  }
  connectedCallback() {
    wasm.perspectivedebugpluginelement_connectedCallback(this.ptr);
  }
};
var PerspectiveNumberColumnStyleElement = class {
  static __wrap(ptr) {
    const obj = Object.create(PerspectiveNumberColumnStyleElement.prototype);
    obj.ptr = ptr;
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_perspectivenumbercolumnstyleelement_free(ptr);
  }
  constructor(elem) {
    const ret = wasm.perspectivenumbercolumnstyleelement_new(addHeapObject(elem));
    return PerspectiveNumberColumnStyleElement.__wrap(ret);
  }
  reset(config, default_config) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.perspectivenumbercolumnstyleelement_reset(retptr, this.ptr, addHeapObject(config), addHeapObject(default_config));
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      if (r1) {
        throw takeObject(r0);
      }
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  open(target, config, default_config) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.perspectivenumbercolumnstyleelement_open(retptr, this.ptr, addHeapObject(target), addHeapObject(config), addHeapObject(default_config));
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      if (r1) {
        throw takeObject(r0);
      }
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  close() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.perspectivenumbercolumnstyleelement_close(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      if (r1) {
        throw takeObject(r0);
      }
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  destroy() {
    try {
      const ptr = this.__destroy_into_raw();
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.perspectivenumbercolumnstyleelement_destroy(retptr, ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      if (r1) {
        throw takeObject(r0);
      }
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  connected_callback() {
    wasm.perspectivenumbercolumnstyleelement_connected_callback(this.ptr);
  }
};
var PerspectiveStringColumnStyleElement = class {
  static __wrap(ptr) {
    const obj = Object.create(PerspectiveStringColumnStyleElement.prototype);
    obj.ptr = ptr;
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_perspectivestringcolumnstyleelement_free(ptr);
  }
  constructor(elem) {
    const ret = wasm.perspectivestringcolumnstyleelement_new(addHeapObject(elem));
    return PerspectiveStringColumnStyleElement.__wrap(ret);
  }
  reset(config) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.perspectivestringcolumnstyleelement_reset(retptr, this.ptr, addHeapObject(config));
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      if (r1) {
        throw takeObject(r0);
      }
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  open(target, js_config, js_default_config) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.perspectivestringcolumnstyleelement_open(retptr, this.ptr, addHeapObject(target), addHeapObject(js_config), addHeapObject(js_default_config));
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      if (r1) {
        throw takeObject(r0);
      }
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  close() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.perspectivestringcolumnstyleelement_close(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      if (r1) {
        throw takeObject(r0);
      }
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  destroy() {
    try {
      const ptr = this.__destroy_into_raw();
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.perspectivestringcolumnstyleelement_destroy(retptr, ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      if (r1) {
        throw takeObject(r0);
      }
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  connected_callback() {
    wasm.perspectivestringcolumnstyleelement_connected_callback(this.ptr);
  }
};
var PerspectiveViewerElement = class {
  static __wrap(ptr) {
    const obj = Object.create(PerspectiveViewerElement.prototype);
    obj.ptr = ptr;
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_perspectiveviewerelement_free(ptr);
  }
  constructor(elem) {
    const ret = wasm.perspectiveviewerelement_new(addHeapObject(elem));
    return PerspectiveViewerElement.__wrap(ret);
  }
  connectedCallback() {
    wasm.perspectiveviewerelement_connectedCallback(this.ptr);
  }
  load(table) {
    const ret = wasm.perspectiveviewerelement_load(this.ptr, addHeapObject(table));
    return takeObject(ret);
  }
  delete() {
    const ret = wasm.perspectiveviewerelement_delete(this.ptr);
    return takeObject(ret);
  }
  getView() {
    const ret = wasm.perspectiveviewerelement_getView(this.ptr);
    return takeObject(ret);
  }
  getTable(wait_for_table) {
    const ret = wasm.perspectiveviewerelement_getTable(this.ptr, isLikeNone(wait_for_table) ? 16777215 : wait_for_table ? 1 : 0);
    return takeObject(ret);
  }
  flush() {
    const ret = wasm.perspectiveviewerelement_flush(this.ptr);
    return takeObject(ret);
  }
  restore(update) {
    const ret = wasm.perspectiveviewerelement_restore(this.ptr, addHeapObject(update));
    return takeObject(ret);
  }
  save(format) {
    var ptr0 = isLikeNone(format) ? 0 : passStringToWasm0(format, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    const ret = wasm.perspectiveviewerelement_save(this.ptr, ptr0, len0);
    return takeObject(ret);
  }
  download(flat) {
    const ret = wasm.perspectiveviewerelement_download(this.ptr, isLikeNone(flat) ? 16777215 : flat ? 1 : 0);
    return takeObject(ret);
  }
  copy(flat) {
    const ret = wasm.perspectiveviewerelement_copy(this.ptr, isLikeNone(flat) ? 16777215 : flat ? 1 : 0);
    return takeObject(ret);
  }
  reset(reset_expressions) {
    const ret = wasm.perspectiveviewerelement_reset(this.ptr, isLikeNone(reset_expressions) ? 16777215 : reset_expressions ? 1 : 0);
    return takeObject(ret);
  }
  notifyResize(force) {
    const ret = wasm.perspectiveviewerelement_notifyResize(this.ptr, isLikeNone(force) ? 16777215 : force ? 1 : 0);
    return takeObject(ret);
  }
  setAutoSize(autosize) {
    wasm.perspectiveviewerelement_setAutoSize(this.ptr, autosize);
  }
  getEditPort() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.perspectiveviewerelement_getEditPort(retptr, this.ptr);
      var r0 = getFloat64Memory0()[retptr / 8 + 0];
      var r2 = getInt32Memory0()[retptr / 4 + 2];
      var r3 = getInt32Memory0()[retptr / 4 + 3];
      if (r3) {
        throw takeObject(r2);
      }
      return r0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  restyleElement() {
    const ret = wasm.perspectiveviewerelement_restyleElement(this.ptr);
    return takeObject(ret);
  }
  resetThemes(themes) {
    var ptr0 = isLikeNone(themes) ? 0 : passArrayJsValueToWasm0(themes, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    const ret = wasm.perspectiveviewerelement_resetThemes(this.ptr, ptr0, len0);
    return takeObject(ret);
  }
  setThrottle(val) {
    wasm.perspectiveviewerelement_setThrottle(this.ptr, !isLikeNone(val), isLikeNone(val) ? 0 : val);
  }
  toggleConfig(force) {
    const ret = wasm.perspectiveviewerelement_toggleConfig(this.ptr, isLikeNone(force) ? 16777215 : force ? 1 : 0);
    return takeObject(ret);
  }
  getAllPlugins() {
    const ret = wasm.perspectiveviewerelement_getAllPlugins(this.ptr);
    return takeObject(ret);
  }
  getPlugin(name) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      var ptr0 = isLikeNone(name) ? 0 : passStringToWasm0(name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
      var len0 = WASM_VECTOR_LEN;
      wasm.perspectiveviewerelement_getPlugin(retptr, this.ptr, ptr0, len0);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var r2 = getInt32Memory0()[retptr / 4 + 2];
      if (r2) {
        throw takeObject(r1);
      }
      return takeObject(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  unsafeGetModel() {
    const ret = wasm.perspectiveviewerelement_unsafeGetModel(this.ptr);
    return ret;
  }
};
async function load(module, imports) {
  if (typeof Response === "function" && module instanceof Response) {
    if (typeof WebAssembly.instantiateStreaming === "function") {
      try {
        return await WebAssembly.instantiateStreaming(module, imports);
      } catch (e) {
        if (module.headers.get("Content-Type") != "application/wasm") {
          console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);
        } else {
          throw e;
        }
      }
    }
    const bytes = await module.arrayBuffer();
    return await WebAssembly.instantiate(bytes, imports);
  } else {
    const instance = await WebAssembly.instantiate(module, imports);
    if (instance instanceof WebAssembly.Instance) {
      return { instance, module };
    } else {
      return instance;
    }
  }
}
function getImports() {
  const imports = {};
  imports.wbg = {};
  imports.wbg.__wbindgen_string_new = function(arg0, arg1) {
    const ret = getStringFromWasm0(arg0, arg1);
    return addHeapObject(ret);
  };
  imports.wbg.__wbindgen_object_drop_ref = function(arg0) {
    takeObject(arg0);
  };
  imports.wbg.__wbindgen_object_clone_ref = function(arg0) {
    const ret = getObject(arg0);
    return addHeapObject(ret);
  };
  imports.wbg.__wbindgen_string_get = function(arg0, arg1) {
    const obj = getObject(arg1);
    const ret = typeof obj === "string" ? obj : void 0;
    var ptr0 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
  };
  imports.wbg.__wbg_supportedValuesOf_a328fc2631fad203 = function(arg0) {
    const ret = Intl.supportedValuesOf(getObject(arg0));
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_configcolumnnames_cf08dfe9aff5332a = function(arg0) {
    const ret = getObject(arg0).config_column_names;
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
  };
  imports.wbg.__wbg_minconfigcolumns_2dac6c38f0854ef9 = function(arg0, arg1) {
    const ret = getObject(arg1).min_config_columns;
    getInt32Memory0()[arg0 / 4 + 1] = isLikeNone(ret) ? 0 : ret;
    getInt32Memory0()[arg0 / 4 + 0] = !isLikeNone(ret);
  };
  imports.wbg.__wbg_selectmode_99a5594a38532d63 = function(arg0) {
    const ret = getObject(arg0).select_mode;
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_maxcolumns_d345006997533433 = function(arg0, arg1) {
    const ret = getObject(arg1).max_columns;
    getInt32Memory0()[arg0 / 4 + 1] = isLikeNone(ret) ? 0 : ret;
    getInt32Memory0()[arg0 / 4 + 0] = !isLikeNone(ret);
  };
  imports.wbg.__wbg_maxcells_3aaa4539a9154c59 = function(arg0, arg1) {
    const ret = getObject(arg1).max_cells;
    getInt32Memory0()[arg0 / 4 + 1] = isLikeNone(ret) ? 0 : ret;
    getInt32Memory0()[arg0 / 4 + 0] = !isLikeNone(ret);
  };
  imports.wbg.__wbg_renderwarning_77ed1e263ecc0a33 = function(arg0) {
    const ret = getObject(arg0).render_warning;
    return isLikeNone(ret) ? 16777215 : ret ? 1 : 0;
  };
  imports.wbg.__wbg_name_68584a8328f643d0 = function(arg0, arg1) {
    const ret = getObject(arg1).name;
    const ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
  };
  imports.wbg.__wbg_category_ab66950602dc6989 = function(arg0, arg1) {
    const ret = getObject(arg1).category;
    var ptr0 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
  };
  imports.wbg.__wbg_setrenderwarning_30f3eab707547f53 = function(arg0, arg1) {
    getObject(arg0).render_warning = arg1 !== 0;
  };
  imports.wbg.__wbg_priority_a45a6317320fbb3d = function(arg0, arg1) {
    const ret = getObject(arg1).priority;
    getInt32Memory0()[arg0 / 4 + 1] = isLikeNone(ret) ? 0 : ret;
    getInt32Memory0()[arg0 / 4 + 0] = !isLikeNone(ret);
  };
  imports.wbg.__wbg_save_3df57bece02aed68 = function(arg0) {
    const ret = getObject(arg0).save();
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_restore_836a8488a172084b = function(arg0, arg1) {
    getObject(arg0).restore(getObject(arg1));
  };
  imports.wbg.__wbg_delete_f3a0144d8caa554c = function(arg0) {
    getObject(arg0).delete();
  };
  imports.wbg.__wbg_onupdate_d636d18f81348d95 = function(arg0, arg1) {
    getObject(arg0).on_update(getObject(arg1));
  };
  imports.wbg.__wbindgen_is_string = function(arg0) {
    const ret = typeof getObject(arg0) === "string";
    return ret;
  };
  imports.wbg.__wbg_restyle_89672ccbfb79accf = function() {
    return handleError(function(arg0, arg1) {
      const ret = getObject(arg0).restyle(getObject(arg1));
      return addHeapObject(ret);
    }, arguments);
  };
  imports.wbg.__wbg_view_d88ed8178a181aad = function() {
    return handleError(function(arg0, arg1) {
      const ret = getObject(arg0).view(getObject(arg1));
      return addHeapObject(ret);
    }, arguments);
  };
  imports.wbg.__wbg_toarrow_8f3cf35104005c11 = function() {
    return handleError(function(arg0) {
      const ret = getObject(arg0).to_arrow();
      return addHeapObject(ret);
    }, arguments);
  };
  imports.wbg.__wbindgen_number_get = function(arg0, arg1) {
    const obj = getObject(arg1);
    const ret = typeof obj === "number" ? obj : void 0;
    getFloat64Memory0()[arg0 / 8 + 1] = isLikeNone(ret) ? 0 : ret;
    getInt32Memory0()[arg0 / 4 + 0] = !isLikeNone(ret);
  };
  imports.wbg.__wbg_schema_b5719c95cee8fbd3 = function() {
    return handleError(function(arg0) {
      const ret = getObject(arg0).schema();
      return addHeapObject(ret);
    }, arguments);
  };
  imports.wbg.__wbg_dimensions_b16db283b3aba9df = function() {
    return handleError(function(arg0) {
      const ret = getObject(arg0).dimensions();
      return addHeapObject(ret);
    }, arguments);
  };
  imports.wbg.__wbg_numviewcolumns_66ccecfebbd22767 = function(arg0) {
    const ret = getObject(arg0).num_view_columns;
    return ret;
  };
  imports.wbg.__wbg_numviewrows_3672db750e6bf4d6 = function(arg0) {
    const ret = getObject(arg0).num_view_rows;
    return ret;
  };
  imports.wbg.__wbg_update_d5edcebeeabd11b4 = function() {
    return handleError(function(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
      const ret = getObject(arg0).update(getObject(arg1), arg2 === 0 ? void 0 : arg3 >>> 0, arg4 === 0 ? void 0 : arg5 >>> 0, arg6 !== 0);
      return addHeapObject(ret);
    }, arguments);
  };
  imports.wbg.__wbg_draw_92cd7836ddc08277 = function() {
    return handleError(function(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
      const ret = getObject(arg0).draw(getObject(arg1), arg2 === 0 ? void 0 : arg3 >>> 0, arg4 === 0 ? void 0 : arg5 >>> 0, arg6 !== 0);
      return addHeapObject(ret);
    }, arguments);
  };
  imports.wbg.__wbg_validateexpressions_a9f43d032690287e = function() {
    return handleError(function(arg0, arg1) {
      const ret = getObject(arg0).validate_expressions(takeObject(arg1));
      return addHeapObject(ret);
    }, arguments);
  };
  imports.wbg.__wbg_new_b2ec8e4c3e017d16 = function(arg0) {
    const ret = new ClipboardItem(getObject(arg0));
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_static_accessor_PSP_c229b68938fda519 = function() {
    const ret = perspective_exports;
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_errors_ca591765688977cf = function(arg0) {
    const ret = getObject(arg0).errors;
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_expressionalias_202aef2a8fe75623 = function(arg0) {
    const ret = getObject(arg0).expression_alias;
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_expressionschema_add81980841f80aa = function(arg0) {
    const ret = getObject(arg0).expression_schema;
    return addHeapObject(ret);
  };
  imports.wbg.__wbindgen_boolean_get = function(arg0) {
    const v = getObject(arg0);
    const ret = typeof v === "boolean" ? v ? 1 : 0 : 2;
    return ret;
  };
  imports.wbg.__wbg_resize_4787d375666d9670 = function() {
    return handleError(function(arg0) {
      const ret = getObject(arg0).resize();
      return addHeapObject(ret);
    }, arguments);
  };
  imports.wbg.__wbg_size_8f623f9ad387581f = function() {
    return handleError(function(arg0) {
      const ret = getObject(arg0).size();
      return addHeapObject(ret);
    }, arguments);
  };
  imports.wbg.__wbg_columns_11d6f8b445120ba1 = function() {
    return handleError(function(arg0) {
      const ret = getObject(arg0).columns();
      return addHeapObject(ret);
    }, arguments);
  };
  imports.wbg.__wbg_schema_b32121c8df6e6c67 = function() {
    return handleError(function(arg0) {
      const ret = getObject(arg0).schema();
      return addHeapObject(ret);
    }, arguments);
  };
  imports.wbg.__wbg_makeport_330a6a67b7619779 = function() {
    return handleError(function(arg0) {
      const ret = getObject(arg0).make_port();
      return addHeapObject(ret);
    }, arguments);
  };
  imports.wbg.__wbg_numtablerows_b9b9379c9fddc077 = function(arg0) {
    const ret = getObject(arg0).num_table_rows;
    return ret;
  };
  imports.wbg.__wbg_numtablecolumns_844e3a23d6f798b8 = function(arg0) {
    const ret = getObject(arg0).num_table_columns;
    return ret;
  };
  imports.wbg.__wbg_tocolumns_300cdbc2ed579617 = function() {
    return handleError(function(arg0) {
      const ret = getObject(arg0).to_columns();
      return addHeapObject(ret);
    }, arguments);
  };
  imports.wbg.__wbg_delete_93fe9aa39acbf53b = function() {
    return handleError(function(arg0) {
      const ret = getObject(arg0).delete();
      return addHeapObject(ret);
    }, arguments);
  };
  imports.wbg.__wbg_tocsv_9f1059bb4ffe12ca = function() {
    return handleError(function(arg0, arg1) {
      const ret = getObject(arg0).to_csv(takeObject(arg1));
      return addHeapObject(ret);
    }, arguments);
  };
  imports.wbg.__wbindgen_error_new = function(arg0, arg1) {
    const ret = new Error(getStringFromWasm0(arg0, arg1));
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_new_47555325e554153c = function(arg0) {
    const ret = new ResizeObserver(getObject(arg0));
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_observe_2e3b357bffae5b05 = function(arg0, arg1) {
    getObject(arg0).observe(getObject(arg1));
  };
  imports.wbg.__wbg_unobserve_2616e5eb8507511d = function(arg0, arg1) {
    getObject(arg0).unobserve(getObject(arg1));
  };
  imports.wbg.__wbg_contentRect_b0f60856ecf53479 = function(arg0) {
    const ret = getObject(arg0).contentRect;
    return addHeapObject(ret);
  };
  imports.wbg.__wbindgen_is_null = function(arg0) {
    const ret = getObject(arg0) === null;
    return ret;
  };
  imports.wbg.__wbg_removeupdate_4cbe8b5f1512d86c = function(arg0, arg1) {
    getObject(arg0).remove_update(getObject(arg1));
  };
  imports.wbg.__wbg_bootstrap_ddf711df15858a92 = function(arg0, arg1, arg2, arg3, arg4, arg5) {
    const ret = bootstrap(getObject(arg0), getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4), takeObject(arg5));
    return addHeapObject(ret);
  };
  imports.wbg.__wbindgen_cb_drop = function(arg0) {
    const obj = takeObject(arg0).original;
    if (obj.cnt-- == 1) {
      obj.a = 0;
      return true;
    }
    const ret = false;
    return ret;
  };
  imports.wbg.__wbindgen_number_new = function(arg0) {
    const ret = arg0;
    return addHeapObject(ret);
  };
  imports.wbg.__wbindgen_is_undefined = function(arg0) {
    const ret = getObject(arg0) === void 0;
    return ret;
  };
  imports.wbg.__wbindgen_in = function(arg0, arg1) {
    const ret = getObject(arg0) in getObject(arg1);
    return ret;
  };
  imports.wbg.__wbindgen_is_bigint = function(arg0) {
    const ret = typeof getObject(arg0) === "bigint";
    return ret;
  };
  imports.wbg.__wbindgen_bigint_from_i64 = function(arg0) {
    const ret = arg0;
    return addHeapObject(ret);
  };
  imports.wbg.__wbindgen_jsval_eq = function(arg0, arg1) {
    const ret = getObject(arg0) === getObject(arg1);
    return ret;
  };
  imports.wbg.__wbindgen_is_object = function(arg0) {
    const val = getObject(arg0);
    const ret = typeof val === "object" && val !== null;
    return ret;
  };
  imports.wbg.__wbindgen_bigint_from_u64 = function(arg0) {
    const ret = BigInt.asUintN(64, arg0);
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_subtreeid_e348577f7ef777e3 = function(arg0, arg1) {
    const ret = getObject(arg1).__yew_subtree_id;
    getInt32Memory0()[arg0 / 4 + 1] = isLikeNone(ret) ? 0 : ret;
    getInt32Memory0()[arg0 / 4 + 0] = !isLikeNone(ret);
  };
  imports.wbg.__wbg_setsubtreeid_d32e6327eef1f7fc = function(arg0, arg1) {
    getObject(arg0).__yew_subtree_id = arg1 >>> 0;
  };
  imports.wbg.__wbg_cachekey_b61393159c57fd7b = function(arg0, arg1) {
    const ret = getObject(arg1).__yew_subtree_cache_key;
    getInt32Memory0()[arg0 / 4 + 1] = isLikeNone(ret) ? 0 : ret;
    getInt32Memory0()[arg0 / 4 + 0] = !isLikeNone(ret);
  };
  imports.wbg.__wbg_setcachekey_80183b7cfc421143 = function(arg0, arg1) {
    getObject(arg0).__yew_subtree_cache_key = arg1 >>> 0;
  };
  imports.wbg.__wbg_listenerid_12315eee21527820 = function(arg0, arg1) {
    const ret = getObject(arg1).__yew_listener_id;
    getInt32Memory0()[arg0 / 4 + 1] = isLikeNone(ret) ? 0 : ret;
    getInt32Memory0()[arg0 / 4 + 0] = !isLikeNone(ret);
  };
  imports.wbg.__wbg_setlistenerid_3183aae8fa5840fb = function(arg0, arg1) {
    getObject(arg0).__yew_listener_id = arg1 >>> 0;
  };
  imports.wbg.__wbg_new_abda76e883ba8a5f = function() {
    const ret = new Error();
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_stack_658279fe44541cf6 = function(arg0, arg1) {
    const ret = getObject(arg1).stack;
    const ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
  };
  imports.wbg.__wbg_error_f851667af71bcfc6 = function(arg0, arg1) {
    try {
      console.error(getStringFromWasm0(arg0, arg1));
    } finally {
      wasm.__wbindgen_free(arg0, arg1);
    }
  };
  imports.wbg.__wbindgen_jsval_loose_eq = function(arg0, arg1) {
    const ret = getObject(arg0) == getObject(arg1);
    return ret;
  };
  imports.wbg.__wbg_getwithrefkey_15c62c2b8546208d = function(arg0, arg1) {
    const ret = getObject(arg0)[getObject(arg1)];
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_set_20cbc34131e76824 = function(arg0, arg1, arg2) {
    getObject(arg0)[takeObject(arg1)] = takeObject(arg2);
  };
  imports.wbg.__wbg_String_91fba7ded13ba54c = function(arg0, arg1) {
    const ret = String(getObject(arg1));
    const ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
  };
  imports.wbg.__wbg_error_c0a7dc7e3b138aad = function(arg0, arg1) {
    var v0 = getArrayJsValueFromWasm0(arg0, arg1).slice();
    wasm.__wbindgen_free(arg0, arg1 * 4);
    console.error(...v0);
  };
  imports.wbg.__wbg_instanceof_Window_acc97ff9f5d2c7b4 = function(arg0) {
    let result;
    try {
      result = getObject(arg0) instanceof Window;
    } catch {
      result = false;
    }
    const ret = result;
    return ret;
  };
  imports.wbg.__wbg_document_3ead31dbcad65886 = function(arg0) {
    const ret = getObject(arg0).document;
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
  };
  imports.wbg.__wbg_navigator_d1dcf282b97e2495 = function(arg0) {
    const ret = getObject(arg0).navigator;
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_innerWidth_ffa584f74d721fce = function() {
    return handleError(function(arg0) {
      const ret = getObject(arg0).innerWidth;
      return addHeapObject(ret);
    }, arguments);
  };
  imports.wbg.__wbg_innerHeight_f4804c803fcf02b0 = function() {
    return handleError(function(arg0) {
      const ret = getObject(arg0).innerHeight;
      return addHeapObject(ret);
    }, arguments);
  };
  imports.wbg.__wbg_performance_de9825f9a8678574 = function(arg0) {
    const ret = getObject(arg0).performance;
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
  };
  imports.wbg.__wbg_getComputedStyle_9d689205a00d4ac6 = function() {
    return handleError(function(arg0, arg1) {
      const ret = getObject(arg0).getComputedStyle(getObject(arg1));
      return isLikeNone(ret) ? 0 : addHeapObject(ret);
    }, arguments);
  };
  imports.wbg.__wbg_requestAnimationFrame_4181656476a7d86c = function() {
    return handleError(function(arg0, arg1) {
      const ret = getObject(arg0).requestAnimationFrame(getObject(arg1));
      return ret;
    }, arguments);
  };
  imports.wbg.__wbg_setTimeout_d6fcf0d9067b8e64 = function() {
    return handleError(function(arg0, arg1, arg2) {
      const ret = getObject(arg0).setTimeout(getObject(arg1), arg2);
      return ret;
    }, arguments);
  };
  imports.wbg.__wbg_readyState_d8d7acda9cf45bb1 = function(arg0, arg1) {
    const ret = getObject(arg1).readyState;
    const ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
  };
  imports.wbg.__wbg_body_3cb4b4042b9a632b = function(arg0) {
    const ret = getObject(arg0).body;
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
  };
  imports.wbg.__wbg_activeElement_832e9d448ca74309 = function(arg0) {
    const ret = getObject(arg0).activeElement;
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
  };
  imports.wbg.__wbg_styleSheets_4c75951913bdea3c = function(arg0) {
    const ret = getObject(arg0).styleSheets;
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_fonts_1d04fb4c680677a5 = function(arg0) {
    const ret = getObject(arg0).fonts;
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_createElement_976dbb84fe1661b5 = function() {
    return handleError(function(arg0, arg1, arg2) {
      const ret = getObject(arg0).createElement(getStringFromWasm0(arg1, arg2));
      return addHeapObject(ret);
    }, arguments);
  };
  imports.wbg.__wbg_createElementNS_1561aca8ee3693c0 = function() {
    return handleError(function(arg0, arg1, arg2, arg3, arg4) {
      const ret = getObject(arg0).createElementNS(arg1 === 0 ? void 0 : getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
      return addHeapObject(ret);
    }, arguments);
  };
  imports.wbg.__wbg_createTextNode_300f845fab76642f = function(arg0, arg1, arg2) {
    const ret = getObject(arg0).createTextNode(getStringFromWasm0(arg1, arg2));
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_length_01b9a7602c8f3b92 = function(arg0) {
    const ret = getObject(arg0).length;
    return ret;
  };
  imports.wbg.__wbg_item_83fc3c9843b5b55c = function(arg0, arg1) {
    const ret = getObject(arg0).item(arg1 >>> 0);
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
  };
  imports.wbg.__wbg_cssRules_854cc83d669b5359 = function() {
    return handleError(function(arg0) {
      const ret = getObject(arg0).cssRules;
      return addHeapObject(ret);
    }, arguments);
  };
  imports.wbg.__wbg_keyCode_72faed4278f77f2c = function(arg0) {
    const ret = getObject(arg0).keyCode;
    return ret;
  };
  imports.wbg.__wbg_shiftKey_908ae224b8722a41 = function(arg0) {
    const ret = getObject(arg0).shiftKey;
    return ret;
  };
  imports.wbg.__wbg_isConnected_c2256d1e3bdf0c41 = function(arg0) {
    const ret = getObject(arg0).isConnected;
    return ret;
  };
  imports.wbg.__wbg_parentNode_e397bbbe28be7b28 = function(arg0) {
    const ret = getObject(arg0).parentNode;
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
  };
  imports.wbg.__wbg_parentElement_0cffb3ceb0f107bd = function(arg0) {
    const ret = getObject(arg0).parentElement;
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
  };
  imports.wbg.__wbg_lastChild_a2f5ed739809bb31 = function(arg0) {
    const ret = getObject(arg0).lastChild;
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
  };
  imports.wbg.__wbg_nextSibling_62338ec2a05607b4 = function(arg0) {
    const ret = getObject(arg0).nextSibling;
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
  };
  imports.wbg.__wbg_setnodeValue_4077cafeefd0725e = function(arg0, arg1, arg2) {
    getObject(arg0).nodeValue = arg1 === 0 ? void 0 : getStringFromWasm0(arg1, arg2);
  };
  imports.wbg.__wbg_textContent_77bd294928962f93 = function(arg0, arg1) {
    const ret = getObject(arg1).textContent;
    var ptr0 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
  };
  imports.wbg.__wbg_settextContent_538ceb17614272d8 = function(arg0, arg1, arg2) {
    getObject(arg0).textContent = arg1 === 0 ? void 0 : getStringFromWasm0(arg1, arg2);
  };
  imports.wbg.__wbg_appendChild_e513ef0e5098dfdd = function() {
    return handleError(function(arg0, arg1) {
      const ret = getObject(arg0).appendChild(getObject(arg1));
      return addHeapObject(ret);
    }, arguments);
  };
  imports.wbg.__wbg_cloneNode_27fa6913b5172820 = function() {
    return handleError(function(arg0, arg1) {
      const ret = getObject(arg0).cloneNode(arg1 !== 0);
      return addHeapObject(ret);
    }, arguments);
  };
  imports.wbg.__wbg_contains_e35a6bed906082fb = function(arg0, arg1) {
    const ret = getObject(arg0).contains(getObject(arg1));
    return ret;
  };
  imports.wbg.__wbg_getRootNode_1ec3ce813f3b619c = function(arg0) {
    const ret = getObject(arg0).getRootNode();
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_insertBefore_9f2d2defb9471006 = function() {
    return handleError(function(arg0, arg1, arg2) {
      const ret = getObject(arg0).insertBefore(getObject(arg1), getObject(arg2));
      return addHeapObject(ret);
    }, arguments);
  };
  imports.wbg.__wbg_removeChild_6751e9ca5d9aaf00 = function() {
    return handleError(function(arg0, arg1) {
      const ret = getObject(arg0).removeChild(getObject(arg1));
      return addHeapObject(ret);
    }, arguments);
  };
  imports.wbg.__wbg_length_026b786c7cebe4f1 = function(arg0) {
    const ret = getObject(arg0).length;
    return ret;
  };
  imports.wbg.__wbg_item_2dde9f1bb6be5544 = function(arg0, arg1) {
    const ret = getObject(arg0).item(arg1 >>> 0);
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
  };
  imports.wbg.__wbg_width_3ca95ccb4ba994e2 = function(arg0) {
    const ret = getObject(arg0).width;
    return ret;
  };
  imports.wbg.__wbg_height_52d1d8c8ada7c55d = function(arg0) {
    const ret = getObject(arg0).height;
    return ret;
  };
  imports.wbg.__wbg_width_470981a9ec24a32e = function(arg0) {
    const ret = getObject(arg0).width;
    return ret;
  };
  imports.wbg.__wbg_height_f4174d843edb0906 = function(arg0) {
    const ret = getObject(arg0).height;
    return ret;
  };
  imports.wbg.__wbg_top_af8250f1ed584537 = function(arg0) {
    const ret = getObject(arg0).top;
    return ret;
  };
  imports.wbg.__wbg_left_e700000a247fe781 = function(arg0) {
    const ret = getObject(arg0).left;
    return ret;
  };
  imports.wbg.__wbg_which_16f59d07cee1a753 = function(arg0) {
    const ret = getObject(arg0).which;
    return ret;
  };
  imports.wbg.__wbg_instanceof_CssStyleRule_c541984a3485ca68 = function(arg0) {
    let result;
    try {
      result = getObject(arg0) instanceof CSSStyleRule;
    } catch {
      result = false;
    }
    const ret = result;
    return ret;
  };
  imports.wbg.__wbg_selectorText_82d2610a92edaa5e = function(arg0, arg1) {
    const ret = getObject(arg1).selectorText;
    const ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
  };
  imports.wbg.__wbg_style_cf013b9d95e0ab9e = function(arg0) {
    const ret = getObject(arg0).style;
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_addEventListener_cbe4c6f619b032f3 = function() {
    return handleError(function(arg0, arg1, arg2, arg3) {
      getObject(arg0).addEventListener(getStringFromWasm0(arg1, arg2), getObject(arg3));
    }, arguments);
  };
  imports.wbg.__wbg_addEventListener_1fc744729ac6dc27 = function() {
    return handleError(function(arg0, arg1, arg2, arg3, arg4) {
      getObject(arg0).addEventListener(getStringFromWasm0(arg1, arg2), getObject(arg3), getObject(arg4));
    }, arguments);
  };
  imports.wbg.__wbg_dispatchEvent_9c61816a838ce0ce = function() {
    return handleError(function(arg0, arg1) {
      const ret = getObject(arg0).dispatchEvent(getObject(arg1));
      return ret;
    }, arguments);
  };
  imports.wbg.__wbg_removeEventListener_dd20475efce70084 = function() {
    return handleError(function(arg0, arg1, arg2, arg3) {
      getObject(arg0).removeEventListener(getStringFromWasm0(arg1, arg2), getObject(arg3));
    }, arguments);
  };
  imports.wbg.__wbg_length_cd5bf94cfb3798c6 = function(arg0) {
    const ret = getObject(arg0).length;
    return ret;
  };
  imports.wbg.__wbg_getPropertyValue_e1afcfe3e0dda270 = function() {
    return handleError(function(arg0, arg1, arg2, arg3) {
      const ret = getObject(arg1).getPropertyValue(getStringFromWasm0(arg2, arg3));
      const ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
      const len0 = WASM_VECTOR_LEN;
      getInt32Memory0()[arg0 / 4 + 1] = len0;
      getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    }, arguments);
  };
  imports.wbg.__wbg_item_fb51ec5c6f84e7e8 = function(arg0, arg1, arg2) {
    const ret = getObject(arg1).item(arg2 >>> 0);
    const ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
  };
  imports.wbg.__wbg_setProperty_e489dfd8c0a6bffc = function() {
    return handleError(function(arg0, arg1, arg2, arg3, arg4) {
      getObject(arg0).setProperty(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
    }, arguments);
  };
  imports.wbg.__wbg_instanceof_ShadowRoot_76b32ccdae10a710 = function(arg0) {
    let result;
    try {
      result = getObject(arg0) instanceof ShadowRoot;
    } catch {
      result = false;
    }
    const ret = result;
    return ret;
  };
  imports.wbg.__wbg_host_57eec05a2624bc1b = function(arg0) {
    const ret = getObject(arg0).host;
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_selectedIndex_006e7532179f4366 = function(arg0) {
    const ret = getObject(arg0).selectedIndex;
    return ret;
  };
  imports.wbg.__wbg_setvalue_511e4a973ca603a8 = function(arg0, arg1, arg2) {
    getObject(arg0).value = getStringFromWasm0(arg1, arg2);
  };
  imports.wbg.__wbg_clientX_e39206f946859108 = function(arg0) {
    const ret = getObject(arg0).clientX;
    return ret;
  };
  imports.wbg.__wbg_clientY_e376bb2d8f470c88 = function(arg0) {
    const ret = getObject(arg0).clientY;
    return ret;
  };
  imports.wbg.__wbg_offsetX_8891849b36542d53 = function(arg0) {
    const ret = getObject(arg0).offsetX;
    return ret;
  };
  imports.wbg.__wbg_offsetY_1f52082687af467b = function(arg0) {
    const ret = getObject(arg0).offsetY;
    return ret;
  };
  imports.wbg.__wbg_shiftKey_81014521a7612e6a = function(arg0) {
    const ret = getObject(arg0).shiftKey;
    return ret;
  };
  imports.wbg.__wbg_relatedTarget_e7a22a26498fa39d = function(arg0) {
    const ret = getObject(arg0).relatedTarget;
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
  };
  imports.wbg.__wbg_instanceof_Element_33bd126d58f2021b = function(arg0) {
    let result;
    try {
      result = getObject(arg0) instanceof Element;
    } catch {
      result = false;
    }
    const ret = result;
    return ret;
  };
  imports.wbg.__wbg_namespaceURI_e19c7be2c60e5b5c = function(arg0, arg1) {
    const ret = getObject(arg1).namespaceURI;
    var ptr0 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
  };
  imports.wbg.__wbg_tagName_50571f9480ac166a = function(arg0, arg1) {
    const ret = getObject(arg1).tagName;
    const ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
  };
  imports.wbg.__wbg_classList_8a97f5e2e1bc3fa9 = function(arg0) {
    const ret = getObject(arg0).classList;
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_scrollTop_e9a97925f8b862b4 = function(arg0) {
    const ret = getObject(arg0).scrollTop;
    return ret;
  };
  imports.wbg.__wbg_scrollLeft_fccd2eab5376d5e9 = function(arg0) {
    const ret = getObject(arg0).scrollLeft;
    return ret;
  };
  imports.wbg.__wbg_setscrollLeft_058057e59ebab6e0 = function(arg0, arg1) {
    getObject(arg0).scrollLeft = arg1;
  };
  imports.wbg.__wbg_clientWidth_999b9163952471ee = function(arg0) {
    const ret = getObject(arg0).clientWidth;
    return ret;
  };
  imports.wbg.__wbg_clientHeight_1fc8bff4acf145b1 = function(arg0) {
    const ret = getObject(arg0).clientHeight;
    return ret;
  };
  imports.wbg.__wbg_setinnerHTML_32081d8a164e6dc4 = function(arg0, arg1, arg2) {
    getObject(arg0).innerHTML = getStringFromWasm0(arg1, arg2);
  };
  imports.wbg.__wbg_outerHTML_bf662bdff92e5910 = function(arg0, arg1) {
    const ret = getObject(arg1).outerHTML;
    const ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
  };
  imports.wbg.__wbg_children_67776b4810f38b6a = function(arg0) {
    const ret = getObject(arg0).children;
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_attachShadow_6679406270042c29 = function() {
    return handleError(function(arg0, arg1) {
      const ret = getObject(arg0).attachShadow(getObject(arg1));
      return addHeapObject(ret);
    }, arguments);
  };
  imports.wbg.__wbg_getAttribute_3a1f0fb396184372 = function(arg0, arg1, arg2, arg3) {
    const ret = getObject(arg1).getAttribute(getStringFromWasm0(arg2, arg3));
    var ptr0 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
  };
  imports.wbg.__wbg_getBoundingClientRect_06acb6ac1c23e409 = function(arg0) {
    const ret = getObject(arg0).getBoundingClientRect();
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_hasAttribute_a9fb6bc740fe4146 = function(arg0, arg1, arg2) {
    const ret = getObject(arg0).hasAttribute(getStringFromWasm0(arg1, arg2));
    return ret;
  };
  imports.wbg.__wbg_matches_392e935e2ce3b2f8 = function() {
    return handleError(function(arg0, arg1, arg2) {
      const ret = getObject(arg0).matches(getStringFromWasm0(arg1, arg2));
      return ret;
    }, arguments);
  };
  imports.wbg.__wbg_releasePointerCapture_45283df79b1542f3 = function() {
    return handleError(function(arg0, arg1) {
      getObject(arg0).releasePointerCapture(arg1);
    }, arguments);
  };
  imports.wbg.__wbg_removeAttribute_beaed7727852af78 = function() {
    return handleError(function(arg0, arg1, arg2) {
      getObject(arg0).removeAttribute(getStringFromWasm0(arg1, arg2));
    }, arguments);
  };
  imports.wbg.__wbg_setAttribute_d8436c14a59ab1af = function() {
    return handleError(function(arg0, arg1, arg2, arg3, arg4) {
      getObject(arg0).setAttribute(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
    }, arguments);
  };
  imports.wbg.__wbg_setPointerCapture_7cc6c6e831d5dae0 = function() {
    return handleError(function(arg0, arg1) {
      getObject(arg0).setPointerCapture(arg1);
    }, arguments);
  };
  imports.wbg.__wbg_toggleAttribute_ae95fde458610a9c = function() {
    return handleError(function(arg0, arg1, arg2, arg3) {
      const ret = getObject(arg0).toggleAttribute(getStringFromWasm0(arg1, arg2), arg3 !== 0);
      return ret;
    }, arguments);
  };
  imports.wbg.__wbg_add_476f166f6469caf2 = function() {
    return handleError(function(arg0, arg1) {
      getObject(arg0).add(...getObject(arg1));
    }, arguments);
  };
  imports.wbg.__wbg_add_89a4f3b0846cf0aa = function() {
    return handleError(function(arg0, arg1, arg2) {
      getObject(arg0).add(getStringFromWasm0(arg1, arg2));
    }, arguments);
  };
  imports.wbg.__wbg_remove_d1e9c7442aff6eac = function() {
    return handleError(function(arg0, arg1) {
      getObject(arg0).remove(...getObject(arg1));
    }, arguments);
  };
  imports.wbg.__wbg_remove_1a26eb5d822902ed = function() {
    return handleError(function(arg0, arg1, arg2) {
      getObject(arg0).remove(getStringFromWasm0(arg1, arg2));
    }, arguments);
  };
  imports.wbg.__wbg_toggle_98fc718f1f361e81 = function() {
    return handleError(function(arg0, arg1, arg2) {
      const ret = getObject(arg0).toggle(getStringFromWasm0(arg1, arg2));
      return ret;
    }, arguments);
  };
  imports.wbg.__wbg_instanceof_FontFace_5d117907c456abee = function(arg0) {
    let result;
    try {
      result = getObject(arg0) instanceof FontFace;
    } catch {
      result = false;
    }
    const ret = result;
    return ret;
  };
  imports.wbg.__wbg_family_42c509521128281a = function(arg0, arg1) {
    const ret = getObject(arg1).family;
    const ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
  };
  imports.wbg.__wbg_weight_f8819f77448d73cf = function(arg0, arg1) {
    const ret = getObject(arg1).weight;
    const ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
  };
  imports.wbg.__wbg_loaded_923fa6f5cc2d1ef3 = function() {
    return handleError(function(arg0) {
      const ret = getObject(arg0).loaded;
      return addHeapObject(ret);
    }, arguments);
  };
  imports.wbg.__wbg_item_37cbb972da31ad43 = function(arg0, arg1) {
    const ret = getObject(arg0).item(arg1 >>> 0);
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
  };
  imports.wbg.__wbg_getwithindex_5571ba24207565a4 = function(arg0, arg1) {
    const ret = getObject(arg0)[arg1 >>> 0];
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
  };
  imports.wbg.__wbg_createObjectURL_8e3f999d8bc1855f = function() {
    return handleError(function(arg0, arg1) {
      const ret = URL.createObjectURL(getObject(arg1));
      const ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
      const len0 = WASM_VECTOR_LEN;
      getInt32Memory0()[arg0 / 4 + 1] = len0;
      getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    }, arguments);
  };
  imports.wbg.__wbg_dataTransfer_52971d8875475cec = function(arg0) {
    const ret = getObject(arg0).dataTransfer;
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
  };
  imports.wbg.__wbg_values_007d212e9a93f562 = function(arg0) {
    const ret = getObject(arg0).values();
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_next_447cf1b072ae69ff = function() {
    return handleError(function(arg0) {
      const ret = getObject(arg0).next();
      return addHeapObject(ret);
    }, arguments);
  };
  imports.wbg.__wbg_value_ccb32485ee1b3928 = function(arg0, arg1) {
    const ret = getObject(arg1).value;
    const ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
  };
  imports.wbg.__wbg_setvalue_df64bc6794c098f2 = function(arg0, arg1, arg2) {
    getObject(arg0).value = getStringFromWasm0(arg1, arg2);
  };
  imports.wbg.__wbg_setselectionStart_87a1777e51e06ed4 = function() {
    return handleError(function(arg0, arg1, arg2) {
      getObject(arg0).selectionStart = arg1 === 0 ? void 0 : arg2 >>> 0;
    }, arguments);
  };
  imports.wbg.__wbg_selectionEnd_f88c311ef9851368 = function() {
    return handleError(function(arg0, arg1) {
      const ret = getObject(arg1).selectionEnd;
      getInt32Memory0()[arg0 / 4 + 1] = isLikeNone(ret) ? 0 : ret;
      getInt32Memory0()[arg0 / 4 + 0] = !isLikeNone(ret);
    }, arguments);
  };
  imports.wbg.__wbg_setselectionEnd_e639d81bc8c38f56 = function() {
    return handleError(function(arg0, arg1, arg2) {
      getObject(arg0).selectionEnd = arg1 === 0 ? void 0 : arg2 >>> 0;
    }, arguments);
  };
  imports.wbg.__wbg_pointerId_18be034781db46f3 = function(arg0) {
    const ret = getObject(arg0).pointerId;
    return ret;
  };
  imports.wbg.__wbg_scrollTop_779068ee3be0f2d0 = function(arg0) {
    const ret = getObject(arg0).scrollTop;
    return ret;
  };
  imports.wbg.__wbg_setscrollTop_80e548104e4ea213 = function(arg0, arg1) {
    getObject(arg0).scrollTop = arg1;
  };
  imports.wbg.__wbg_dataset_236dd69c02c8bb59 = function(arg0) {
    const ret = getObject(arg0).dataset;
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_style_e9380748cee29f13 = function(arg0) {
    const ret = getObject(arg0).style;
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_offsetParent_1620d2946bd2551a = function(arg0) {
    const ret = getObject(arg0).offsetParent;
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
  };
  imports.wbg.__wbg_offsetWidth_8906f5432e06a269 = function(arg0) {
    const ret = getObject(arg0).offsetWidth;
    return ret;
  };
  imports.wbg.__wbg_offsetHeight_3099b53c020bbd40 = function(arg0) {
    const ret = getObject(arg0).offsetHeight;
    return ret;
  };
  imports.wbg.__wbg_blur_48356fc7ce64e8db = function() {
    return handleError(function(arg0) {
      getObject(arg0).blur();
    }, arguments);
  };
  imports.wbg.__wbg_click_dc312915ae093463 = function(arg0) {
    getObject(arg0).click();
  };
  imports.wbg.__wbg_focus_adfe4cc61e2c09bc = function() {
    return handleError(function(arg0) {
      getObject(arg0).focus();
    }, arguments);
  };
  imports.wbg.__wbg_debug_64711eb2fc6980ef = function(arg0, arg1, arg2, arg3) {
    console.debug(getObject(arg0), getObject(arg1), getObject(arg2), getObject(arg3));
  };
  imports.wbg.__wbg_error_ef9a0be47931175f = function(arg0) {
    console.error(getObject(arg0));
  };
  imports.wbg.__wbg_error_7fc7eaeed853a7db = function(arg0, arg1, arg2) {
    console.error(getObject(arg0), getObject(arg1), getObject(arg2));
  };
  imports.wbg.__wbg_error_00c5d571f754f629 = function(arg0, arg1, arg2, arg3) {
    console.error(getObject(arg0), getObject(arg1), getObject(arg2), getObject(arg3));
  };
  imports.wbg.__wbg_info_d60a960a4e955dc2 = function(arg0, arg1, arg2, arg3) {
    console.info(getObject(arg0), getObject(arg1), getObject(arg2), getObject(arg3));
  };
  imports.wbg.__wbg_trace_b9e3f907b53cbb20 = function(arg0, arg1, arg2, arg3) {
    console.trace(getObject(arg0), getObject(arg1), getObject(arg2), getObject(arg3));
  };
  imports.wbg.__wbg_warn_58110c4a199df084 = function(arg0) {
    console.warn(getObject(arg0));
  };
  imports.wbg.__wbg_warn_be542501a57387a5 = function(arg0, arg1, arg2, arg3) {
    console.warn(getObject(arg0), getObject(arg1), getObject(arg2), getObject(arg3));
  };
  imports.wbg.__wbg_checked_f0b666100ef39e44 = function(arg0) {
    const ret = getObject(arg0).checked;
    return ret;
  };
  imports.wbg.__wbg_setchecked_f1e1f3e62cdca8e7 = function(arg0, arg1) {
    getObject(arg0).checked = arg1 !== 0;
  };
  imports.wbg.__wbg_value_b2a620d34c663701 = function(arg0, arg1) {
    const ret = getObject(arg1).value;
    const ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
  };
  imports.wbg.__wbg_setvalue_e5b519cca37d82a7 = function(arg0, arg1, arg2) {
    getObject(arg0).value = getStringFromWasm0(arg1, arg2);
  };
  imports.wbg.__wbg_clipboard_7f9a0c2ee555ca31 = function(arg0) {
    const ret = getObject(arg0).clipboard;
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
  };
  imports.wbg.__wbg_startTime_e6229db01a2ab73d = function(arg0) {
    const ret = getObject(arg0).startTime;
    return ret;
  };
  imports.wbg.__wbg_newwithu8arraysequence_f863246af83e1785 = function() {
    return handleError(function(arg0) {
      const ret = new Blob(getObject(arg0));
      return addHeapObject(ret);
    }, arguments);
  };
  imports.wbg.__wbg_newwithstrsequenceandoptions_4f45d51a76d0e731 = function() {
    return handleError(function(arg0, arg1) {
      const ret = new Blob(getObject(arg0), getObject(arg1));
      return addHeapObject(ret);
    }, arguments);
  };
  imports.wbg.__wbg_write_6ab17e2f46d9af07 = function(arg0, arg1) {
    const ret = getObject(arg0).write(getObject(arg1));
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_new_fc739aa39a85df5e = function() {
    return handleError(function(arg0, arg1) {
      const ret = new CustomEvent(getStringFromWasm0(arg0, arg1));
      return addHeapObject(ret);
    }, arguments);
  };
  imports.wbg.__wbg_newwitheventinitdict_cfe41e76471dadcc = function() {
    return handleError(function(arg0, arg1, arg2) {
      const ret = new CustomEvent(getStringFromWasm0(arg0, arg1), getObject(arg2));
      return addHeapObject(ret);
    }, arguments);
  };
  imports.wbg.__wbg_get_fc5705c1298c5dc3 = function(arg0, arg1, arg2, arg3) {
    const ret = getObject(arg1)[getStringFromWasm0(arg2, arg3)];
    var ptr0 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
  };
  imports.wbg.__wbg_set_45d8640eed33057c = function() {
    return handleError(function(arg0, arg1, arg2, arg3, arg4) {
      getObject(arg0)[getStringFromWasm0(arg1, arg2)] = getStringFromWasm0(arg3, arg4);
    }, arguments);
  };
  imports.wbg.__wbg_delete_71c6d72669c7a7bf = function(arg0, arg1, arg2) {
    delete getObject(arg0)[getStringFromWasm0(arg1, arg2)];
  };
  imports.wbg.__wbg_setdropEffect_ef988aabbd6fd5d3 = function(arg0, arg1, arg2) {
    getObject(arg0).dropEffect = getStringFromWasm0(arg1, arg2);
  };
  imports.wbg.__wbg_setData_0547a743d5659015 = function() {
    return handleError(function(arg0, arg1, arg2, arg3, arg4) {
      getObject(arg0).setData(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
    }, arguments);
  };
  imports.wbg.__wbg_setDragImage_478cf090a4d1b5a8 = function(arg0, arg1, arg2, arg3) {
    getObject(arg0).setDragImage(getObject(arg1), arg2, arg3);
  };
  imports.wbg.__wbg_target_bf704b7db7ad1387 = function(arg0) {
    const ret = getObject(arg0).target;
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
  };
  imports.wbg.__wbg_bubbles_03eed164b4feeaf1 = function(arg0) {
    const ret = getObject(arg0).bubbles;
    return ret;
  };
  imports.wbg.__wbg_cancelBubble_8c0bdf21c08f1717 = function(arg0) {
    const ret = getObject(arg0).cancelBubble;
    return ret;
  };
  imports.wbg.__wbg_composedPath_160ed014dc4d787f = function(arg0) {
    const ret = getObject(arg0).composedPath();
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_preventDefault_3209279b490de583 = function(arg0) {
    getObject(arg0).preventDefault();
  };
  imports.wbg.__wbg_stopPropagation_eca3af16f2d02a91 = function(arg0) {
    getObject(arg0).stopPropagation();
  };
  imports.wbg.__wbg_getEntriesByName_6d78e3ddac803675 = function(arg0, arg1, arg2, arg3, arg4) {
    const ret = getObject(arg0).getEntriesByName(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_mark_20c20929a35a9058 = function() {
    return handleError(function(arg0, arg1, arg2) {
      getObject(arg0).mark(getStringFromWasm0(arg1, arg2));
    }, arguments);
  };
  imports.wbg.__wbg_measure_add43b4627609d3b = function() {
    return handleError(function(arg0, arg1, arg2, arg3, arg4) {
      getObject(arg0).measure(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
    }, arguments);
  };
  imports.wbg.__wbg_now_8172cd917e5eda6b = function(arg0) {
    const ret = getObject(arg0).now();
    return ret;
  };
  imports.wbg.__wbg_get_57245cc7d7c7619d = function(arg0, arg1) {
    const ret = getObject(arg0)[arg1 >>> 0];
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_length_6e3bbe7c8bd4dbd8 = function(arg0) {
    const ret = getObject(arg0).length;
    return ret;
  };
  imports.wbg.__wbg_new_1d9a920c6bfc44a8 = function() {
    const ret = new Array();
    return addHeapObject(ret);
  };
  imports.wbg.__wbindgen_is_function = function(arg0) {
    const ret = typeof getObject(arg0) === "function";
    return ret;
  };
  imports.wbg.__wbg_newnoargs_b5b063fc6c2f0376 = function(arg0, arg1) {
    const ret = new Function(getStringFromWasm0(arg0, arg1));
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_new_268f7b7dd3430798 = function() {
    const ret = /* @__PURE__ */ new Map();
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_next_579e583d33566a86 = function(arg0) {
    const ret = getObject(arg0).next;
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_next_aaef7c8aa5e212ac = function() {
    return handleError(function(arg0) {
      const ret = getObject(arg0).next();
      return addHeapObject(ret);
    }, arguments);
  };
  imports.wbg.__wbg_done_1b73b0672e15f234 = function(arg0) {
    const ret = getObject(arg0).done;
    return ret;
  };
  imports.wbg.__wbg_value_1ccc36bc03462d71 = function(arg0) {
    const ret = getObject(arg0).value;
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_iterator_6f9d4f28845f426c = function() {
    const ret = Symbol.iterator;
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_get_765201544a2b6869 = function() {
    return handleError(function(arg0, arg1) {
      const ret = Reflect.get(getObject(arg0), getObject(arg1));
      return addHeapObject(ret);
    }, arguments);
  };
  imports.wbg.__wbg_call_97ae9d8645dc388b = function() {
    return handleError(function(arg0, arg1) {
      const ret = getObject(arg0).call(getObject(arg1));
      return addHeapObject(ret);
    }, arguments);
  };
  imports.wbg.__wbg_new_0b9bfdd97583284e = function() {
    const ret = new Object();
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_self_6d479506f72c6a71 = function() {
    return handleError(function() {
      const ret = self.self;
      return addHeapObject(ret);
    }, arguments);
  };
  imports.wbg.__wbg_window_f2557cc78490aceb = function() {
    return handleError(function() {
      const ret = window.window;
      return addHeapObject(ret);
    }, arguments);
  };
  imports.wbg.__wbg_globalThis_7f206bda628d5286 = function() {
    return handleError(function() {
      const ret = globalThis.globalThis;
      return addHeapObject(ret);
    }, arguments);
  };
  imports.wbg.__wbg_global_ba75c50d1cf384f4 = function() {
    return handleError(function() {
      const ret = global.global;
      return addHeapObject(ret);
    }, arguments);
  };
  imports.wbg.__wbg_at_6063dd3cb77a913d = function(arg0, arg1) {
    const ret = getObject(arg0).at(arg1);
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_set_a68214f35c417fa9 = function(arg0, arg1, arg2) {
    getObject(arg0)[arg1 >>> 0] = takeObject(arg2);
  };
  imports.wbg.__wbg_from_7ce3cb27cb258569 = function(arg0) {
    const ret = Array.from(getObject(arg0));
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_isArray_27c46c67f498e15d = function(arg0) {
    const ret = Array.isArray(getObject(arg0));
    return ret;
  };
  imports.wbg.__wbg_push_740e4b286702d964 = function(arg0, arg1) {
    const ret = getObject(arg0).push(getObject(arg1));
    return ret;
  };
  imports.wbg.__wbg_instanceof_ArrayBuffer_e5e48f4762c5610b = function(arg0) {
    let result;
    try {
      result = getObject(arg0) instanceof ArrayBuffer;
    } catch {
      result = false;
    }
    const ret = result;
    return ret;
  };
  imports.wbg.__wbg_slice_27c1b5dece69af8a = function(arg0, arg1, arg2) {
    const ret = getObject(arg0).slice(arg1 >>> 0, arg2 >>> 0);
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_instanceof_Error_56b496a10a56de66 = function(arg0) {
    let result;
    try {
      result = getObject(arg0) instanceof Error;
    } catch {
      result = false;
    }
    const ret = result;
    return ret;
  };
  imports.wbg.__wbg_message_fe2af63ccc8985bc = function(arg0) {
    const ret = getObject(arg0).message;
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_call_168da88779e35f61 = function() {
    return handleError(function(arg0, arg1, arg2) {
      const ret = getObject(arg0).call(getObject(arg1), getObject(arg2));
      return addHeapObject(ret);
    }, arguments);
  };
  imports.wbg.__wbg_set_933729cf5b66ac11 = function(arg0, arg1, arg2) {
    const ret = getObject(arg0).set(getObject(arg1), getObject(arg2));
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_isSafeInteger_dfa0593e8d7ac35a = function(arg0) {
    const ret = Number.isSafeInteger(getObject(arg0));
    return ret;
  };
  imports.wbg.__wbg_getTimezoneOffset_89bd4275e1ca8341 = function(arg0) {
    const ret = getObject(arg0).getTimezoneOffset();
    return ret;
  };
  imports.wbg.__wbg_new_c8631234f931e1c4 = function(arg0) {
    const ret = new Date(getObject(arg0));
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_entries_65a76a413fc91037 = function(arg0) {
    const ret = Object.entries(getObject(arg0));
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_is_40a66842732708e7 = function(arg0, arg1) {
    const ret = Object.is(getObject(arg0), getObject(arg1));
    return ret;
  };
  imports.wbg.__wbg_keys_0702294afaeb6044 = function(arg0) {
    const ret = Object.keys(getObject(arg0));
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_instanceof_Promise_8f075b2904633ce9 = function(arg0) {
    let result;
    try {
      result = getObject(arg0) instanceof Promise;
    } catch {
      result = false;
    }
    const ret = result;
    return ret;
  };
  imports.wbg.__wbg_new_9962f939219f1820 = function(arg0, arg1) {
    try {
      var state0 = { a: arg0, b: arg1 };
      var cb0 = (arg02, arg12) => {
        const a = state0.a;
        state0.a = 0;
        try {
          return __wbg_adapter_632(a, state0.b, arg02, arg12);
        } finally {
          state0.a = a;
        }
      };
      const ret = new Promise(cb0);
      return addHeapObject(ret);
    } finally {
      state0.a = state0.b = 0;
    }
  };
  imports.wbg.__wbg_resolve_99fe17964f31ffc0 = function(arg0) {
    const ret = Promise.resolve(getObject(arg0));
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_then_11f7a54d67b4bfad = function(arg0, arg1) {
    const ret = getObject(arg0).then(getObject(arg1));
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_then_cedad20fbbd9418a = function(arg0, arg1, arg2) {
    const ret = getObject(arg0).then(getObject(arg1), getObject(arg2));
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_buffer_3f3d764d4747d564 = function(arg0) {
    const ret = getObject(arg0).buffer;
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_newwithbyteoffsetandlength_d9aa266703cb98be = function(arg0, arg1, arg2) {
    const ret = new Uint8Array(getObject(arg0), arg1 >>> 0, arg2 >>> 0);
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_new_8c3f0052272a457a = function(arg0) {
    const ret = new Uint8Array(getObject(arg0));
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_set_83db9690f9353e79 = function(arg0, arg1, arg2) {
    getObject(arg0).set(getObject(arg1), arg2 >>> 0);
  };
  imports.wbg.__wbg_length_9e1ae1900cb0fbd5 = function(arg0) {
    const ret = getObject(arg0).length;
    return ret;
  };
  imports.wbg.__wbg_instanceof_Uint8Array_971eeda69eb75003 = function(arg0) {
    let result;
    try {
      result = getObject(arg0) instanceof Uint8Array;
    } catch {
      result = false;
    }
    const ret = result;
    return ret;
  };
  imports.wbg.__wbg_buffer_21310ea17257b0b4 = function(arg0) {
    const ret = getObject(arg0).buffer;
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_byteLength_87a0436a74adc26c = function(arg0) {
    const ret = getObject(arg0).byteLength;
    return ret;
  };
  imports.wbg.__wbg_byteOffset_4477d54710af6f9b = function(arg0) {
    const ret = getObject(arg0).byteOffset;
    return ret;
  };
  imports.wbg.__wbg_stringify_d6471d300ded9b68 = function() {
    return handleError(function(arg0) {
      const ret = JSON.stringify(getObject(arg0));
      return addHeapObject(ret);
    }, arguments);
  };
  imports.wbg.__wbg_has_8359f114ce042f5a = function() {
    return handleError(function(arg0, arg1) {
      const ret = Reflect.has(getObject(arg0), getObject(arg1));
      return ret;
    }, arguments);
  };
  imports.wbg.__wbg_set_bf3f89b92d5a34bf = function() {
    return handleError(function(arg0, arg1, arg2) {
      const ret = Reflect.set(getObject(arg0), getObject(arg1), getObject(arg2));
      return ret;
    }, arguments);
  };
  imports.wbg.__wbg_new_303d960d276348b1 = function(arg0, arg1) {
    const ret = new Intl.DateTimeFormat(getObject(arg0), getObject(arg1));
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_resolvedOptions_26c2a9c2873e7d80 = function(arg0) {
    const ret = getObject(arg0).resolvedOptions();
    return addHeapObject(ret);
  };
  imports.wbg.__wbindgen_bigint_get_as_i64 = function(arg0, arg1) {
    const v = getObject(arg1);
    const ret = typeof v === "bigint" ? v : void 0;
    getBigInt64Memory0()[arg0 / 8 + 1] = isLikeNone(ret) ? BigInt(0) : ret;
    getInt32Memory0()[arg0 / 4 + 0] = !isLikeNone(ret);
  };
  imports.wbg.__wbindgen_debug_string = function(arg0, arg1) {
    const ret = debugString(getObject(arg1));
    const ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
  };
  imports.wbg.__wbindgen_throw = function(arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
  };
  imports.wbg.__wbindgen_memory = function() {
    const ret = wasm.memory;
    return addHeapObject(ret);
  };
  imports.wbg.__wbindgen_closure_wrapper4567 = function(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 24, __wbg_adapter_50);
    return addHeapObject(ret);
  };
  imports.wbg.__wbindgen_closure_wrapper4568 = function(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 31, __wbg_adapter_53);
    return addHeapObject(ret);
  };
  imports.wbg.__wbindgen_closure_wrapper4570 = function(arg0, arg1, arg2) {
    const ret = makeClosure(arg0, arg1, 29, __wbg_adapter_56);
    return addHeapObject(ret);
  };
  imports.wbg.__wbindgen_closure_wrapper4573 = function(arg0, arg1, arg2) {
    const ret = makeClosure(arg0, arg1, 28, __wbg_adapter_56);
    return addHeapObject(ret);
  };
  imports.wbg.__wbindgen_closure_wrapper4575 = function(arg0, arg1, arg2) {
    const ret = makeClosure(arg0, arg1, 26, __wbg_adapter_61);
    return addHeapObject(ret);
  };
  imports.wbg.__wbindgen_closure_wrapper4577 = function(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 32, __wbg_adapter_53);
    return addHeapObject(ret);
  };
  imports.wbg.__wbindgen_closure_wrapper8019 = function(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 2681, __wbg_adapter_66);
    return addHeapObject(ret);
  };
  imports.wbg.__wbindgen_closure_wrapper8083 = function(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 2698, __wbg_adapter_69);
    return addHeapObject(ret);
  };
  imports.wbg.__wbindgen_closure_wrapper8118 = function(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 2702, __wbg_adapter_72);
    return addHeapObject(ret);
  };
  return imports;
}
function initMemory(imports, maybe_memory) {
}
function finalizeInit(instance, module) {
  wasm = instance.exports;
  init.__wbindgen_wasm_module = module;
  cachedBigInt64Memory0 = null;
  cachedFloat64Memory0 = null;
  cachedInt32Memory0 = null;
  cachedUint32Memory0 = null;
  cachedUint8Memory0 = null;
  return wasm;
}
function initSync(module) {
  const imports = getImports();
  initMemory(imports);
  if (!(module instanceof WebAssembly.Module)) {
    module = new WebAssembly.Module(module);
  }
  const instance = new WebAssembly.Instance(module, imports);
  return finalizeInit(instance, module);
}
async function init(input) {
  const imports = getImports();
  if (typeof input === "string" || typeof Request === "function" && input instanceof Request || typeof URL === "function" && input instanceof URL) {
    input = fetch(input);
  }
  initMemory(imports);
  const { instance, module } = await load(await input, imports);
  return finalizeInit(instance, module);
}
var perspective_default = init;
function convert(old, { warn = true, replace_defaults = false } = {}) {
  if (typeof old === "object" && !(old instanceof ArrayBuffer)) {
    const copy = JSON.parse(JSON.stringify(old));
    if ("viewers" in copy && "detail" in copy) {
      return migrate_workspace(copy, { warn, replace_defaults });
    } else {
      return migrate_viewer(copy, false, { warn, replace_defaults });
    }
  } else {
    return old;
  }
}
function migrate_workspace(old, options) {
  for (const key in old.viewers) {
    old.viewers[key] = migrate_viewer(old.viewers[key], true, options);
    if (!("master" in old.viewers[key])) {
      old.viewers[key].master = false;
      if (options.warn) {
        console.warn(
          `Deprecated perspective missing attribute "master" set to default`
        );
      }
    }
    if (!("linked" in old.viewers[key])) {
      old.viewers[key].linked = false;
      if (options.warn) {
        console.warn(
          `Deprecated perspective missing attribute "linked" set to default`
        );
      }
    }
  }
  return old;
}
function migrate_viewer(old, omit_attributes, options) {
  return chain(
    old,
    [
      migrate_group_by,
      migrate_split_by,
      migrate_filters,
      migrate_expressions,
      options.replace_defaults ? migrate_nulls : false,
      migrate_plugins,
      migrate_plugin_config,
      migrate_title,
      migrate_name_title_workspace,
      omit_attributes ? migrate_attributes_workspace : migrate_attributes_viewer
    ].filter((x2) => !!x2),
    options
  );
}
function chain(old, args, options) {
  for (const arg of args) {
    old = arg(old, options);
  }
  return old;
}
function migrate_nulls(old, options) {
  for (const key of ["group_by", "split_by", "filter", "sort"]) {
    if (old[key] === null) {
      old[key] = [];
      if (options.warn) {
        console.warn(
          `Deprecated perspective missing attribute "${key}" set to default"`
        );
      }
    }
    if ("aggregates" in old && old.aggregates === null) {
      old.aggregates = {};
      if (options.warn) {
        console.warn(
          `Deprecated perspective missing attribute "aggregates" set to default"`
        );
      }
    }
  }
  return old;
}
function _migrate_field_aliases(original, aliases) {
  return function(old, options) {
    let count = 0;
    for (const pivot of aliases) {
      if (pivot in old) {
        if (count++ > 0) {
          throw new Error(`Duplicate "${original}" fields`);
        }
        old[original] = old[pivot];
        if (pivot !== original) {
          delete old[pivot];
          if (options.warn) {
            console.warn(
              `Deprecated perspective attribute "${pivot}" renamed "${original}"`
            );
          }
        }
      }
    }
    return old;
  };
}
var migrate_group_by = _migrate_field_aliases("group_by", [
  "group_by",
  "row_pivots",
  "row-pivot",
  "row-pivots",
  "row_pivot"
]);
var migrate_split_by = _migrate_field_aliases("split_by", [
  "split_by",
  "column_pivots",
  "column-pivot",
  "column-pivots",
  "column_pivot",
  "col_pivots",
  "col-pivot",
  "col-pivots",
  "col_pivot"
]);
var migrate_filters = _migrate_field_aliases("filter", ["filter", "filters"]);
function _migrate_expression(regex1, rep, expression, old, options) {
  if (regex1.test(expression)) {
    const replaced = expression.replace(regex1, rep);
    if (options.warn) {
      console.warn(
        `Deprecated perspective "expression" attribute value "${expression}" updated to "${replaced}"`
      );
    }
    for (const key of ["group_by", "split_by"]) {
      if (key in old) {
        for (const idx in old[key]) {
          const pivot = old[key][idx];
          if (pivot === expression.replace(/"/g, "")) {
            old[key][idx] = replaced;
            if (options.warn) {
              console.warn(
                `Deprecated perspective expression in "${key}" attribute "${expression}" replaced with "${replaced}"`
              );
            }
          }
        }
      }
    }
    for (const filter of old.filter || []) {
      if (filter[0] === expression.replace(/"/g, "")) {
        filter[0] = replaced;
        if (options.warn) {
          console.warn(
            `Deprecated perspective expression in "filter" attribute "${expression}" replaced with "${replaced}"`
          );
        }
      }
    }
    for (const sort of old.sort || []) {
      if (sort[0] === expression.replace(/"/g, "")) {
        sort[0] = replaced;
        if (options.warn) {
          console.warn(
            `Deprecated perspective expression in "sort" attribute "${expression}" replaced with "${replaced}"`
          );
        }
      }
    }
    return replaced;
  } else {
    return expression;
  }
}
function migrate_title(old) {
  if (old["title"] === void 0) {
    old.title = null;
  }
  return old;
}
function migrate_expressions(old, options) {
  if (old["computed-columns"]) {
    if ("expressions" in old) {
      throw new Error(`Duplicate "expressions" and "computed-columns`);
    }
    old.expressions = old["computed-columns"];
    delete old["computed-columns"];
    if (options.warn) {
      console.warn(
        `Deprecated perspective attribute "computed-columns" renamed "expressions"`
      );
    }
    const REPLACEMENTS = [
      [/^year_bucket\("(.+?)"\)/, `bucket("$1", 'y')`],
      [/^month_bucket\("(.+?)"\)/, `bucket("$1", 'M')`],
      [/^day_bucket\("(.+?)"\)/, `bucket("$1", 'd')`],
      [/^hour_bucket\("(.+?)"\)/, `bucket("$1", 'h')`],
      [/^minute_bucket\("(.+?)"\)/, `bucket("$1", 'm')`],
      [/^second_bucket\("(.+?)"\)/, `bucket("$1", 's')`]
    ];
    for (const idx in old.expressions) {
      let expression = old.expressions[idx];
      for (const [a, b] of REPLACEMENTS) {
        expression = _migrate_expression(
          a,
          b,
          expression,
          old,
          options
        );
      }
      old.expressions[idx] = expression;
    }
  }
  return old;
}
function migrate_plugins(old, options) {
  const ALIASES = {
    datagrid: "Datagrid",
    Datagrid: "Datagrid",
    d3_y_area: "Y Area",
    "Y Area": "Y Area",
    d3_y_line: "Y Line",
    "Y Line": "Y Line",
    d3_xy_line: "X/Y Line",
    "X/Y Line": "X/Y Line",
    d3_y_scatter: "Y Scatter",
    "Y Scatter": "Y Scatter",
    d3_xy_scatter: "X/Y Scatter",
    "X/Y Scatter": "X/Y Scatter",
    d3_x_bar: "X Bar",
    "X Bar": "X Bar",
    d3_y_bar: "Y Bar",
    "Y Bar": "Y Bar",
    d3_heatmap: "Heatmap",
    Heatmap: "Heatmap",
    d3_treemap: "Treemap",
    Treemap: "Treemap",
    d3_sunburst: "Sunburst",
    Sunburst: "Sunburst"
  };
  if ("plugin" in old && old.plugin !== ALIASES[old.plugin]) {
    old.plugin = ALIASES[old.plugin];
    if (options.warn) {
      console.warn(
        `Deprecated perspective "plugin" attribute value "${old.plugin}" updated to "${ALIASES[old.plugin]}"`
      );
    }
  }
  return old;
}
function migrate_plugin_config(old, options) {
  if (old.plugin === "Datagrid" && !!old.plugin_config) {
    if (!old.plugin_config.columns) {
      if (options.warn) {
        console.warn(
          `Deprecated perspective attribute "plugin_config" moved to "plugin_config.columns"`
        );
      }
      const columns = {};
      for (const name of Object.keys(old.plugin_config)) {
        const column = old.plugin_config[name];
        delete old.plugin_config[name];
        if (typeof column.color_mode === "string") {
          if (column.color_mode === "foreground") {
            column.number_fg_mode = "color";
          } else if (column.color_mode === "bar") {
            column.number_fg_mode = "bar";
          } else if (column.color_mode === "background") {
            column.number_bg_mode = "color";
          } else if (column.color_mode === "gradient") {
            column.number_bg_mode = "gradient";
          } else {
            console.warn(`Unknown color_mode ${column.color_mode}`);
          }
          delete column["color_mode"];
          if (options.warn) {
            console.warn(
              `Deprecated perspective attribute "color_mode" renamed "number_bg_mode"`
            );
          }
        }
        columns[name] = column;
      }
      old.plugin_config.columns = columns;
      if (options.replace_defaults) {
        old.plugin_config.editable = false;
        old.plugin_config.scroll_lock = true;
      }
    }
    for (const name of Object.keys(old.plugin_config.columns)) {
      const column = old.plugin_config.columns[name];
      if (typeof column.number_color_mode === "string") {
        if (column.number_color_mode === "foreground") {
          column.number_fg_mode = "color";
        } else if (column.number_color_mode === "bar") {
          column.number_fg_mode = "bar";
        } else if (column.number_color_mode === "background") {
          column.number_bg_mode = "color";
        } else if (column.number_color_mode === "gradient") {
          column.number_bg_mode = "gradient";
        }
        delete column["number_color_mode"];
        if (options.warn) {
          console.warn(
            `Deprecated perspective attribute "number_color_mode" renamed "number_bg_mode"`
          );
        }
      }
      if (column.gradient !== void 0) {
        if (column.number_bg_mode === "gradient") {
          column.bg_gradient = column.gradient;
        } else if (column.number_fg_mode === "bar") {
          column.fg_gradient = column.gradient;
        }
        delete column["gradient"];
        if (options.warn) {
          console.warn(
            `Deprecated perspective attribute "gradient" renamed "bg_gradient"`
          );
        }
      }
      if (column.pos_color !== void 0) {
        if (column.number_bg_mode !== void 0) {
          column.pos_bg_color = column.pos_color;
        } else if (column.number_fg_mode !== void 0) {
          column.pos_fg_color = column.pos_color;
        }
        delete column["pos_color"];
        if (options.warn) {
          console.warn(
            `Deprecated perspective attribute "pos_color" renamed "pos_bg_color"`
          );
        }
      }
      if (column.neg_color !== void 0) {
        if (column.number_bg_mode !== void 0) {
          column.neg_bg_color = column.neg_color;
        } else if (column.number_fg_mode !== void 0) {
          column.neg_fg_color = column.neg_color;
        }
        delete column["neg_color"];
        if (options.warn) {
          console.warn(
            `Deprecated perspective attribute "neg_color" renamed "neg_bg_color"`
          );
        }
      }
    }
  }
  return old;
}
function migrate_attributes_viewer(old, options) {
  const ATTRIBUTES = [
    "editable",
    "selectable",
    "name",
    "table",
    "master",
    "linked"
  ];
  for (const attr of ATTRIBUTES) {
    if (attr in old) {
      delete old[attr];
      if (options.warn) {
        console.warn(
          `Deprecated perspective attribute "${attr}" removed`
        );
      }
    }
  }
  return old;
}
function migrate_attributes_workspace(old, options) {
  const ATTRIBUTES = [
    "editable",
    "selectable",
    "name",
    "table",
    "master",
    "linked"
  ];
  for (const attr of ATTRIBUTES) {
    if (attr in old && old[attr] === null) {
      delete old[attr];
      if (options.warn) {
        console.warn(
          `Deprecated perspective attribute "${attr}" removed`
        );
      }
    }
  }
  return old;
}
function migrate_name_title_workspace(old, options) {
  if ("name" in old) {
    if ("title" in old && old.title !== void 0) {
      old.title = old["name"];
      if (options.warn) {
        console.warn(`"name" conflicts with "title"`);
      }
    }
    delete old["name"];
    if (options.warn) {
      console.warn(`"name" unified with "title"`);
    }
  }
  return old;
}
var u8 = Uint8Array;
var u16 = Uint16Array;
var u32 = Uint32Array;
var fleb = new u8([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0, 0]);
var fdeb = new u8([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 0, 0]);
var clim = new u8([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
var freb = function(eb, start) {
  var b = new u16(31);
  for (var i2 = 0; i2 < 31; ++i2) {
    b[i2] = start += 1 << eb[i2 - 1];
  }
  var r = new u32(b[30]);
  for (var i2 = 1; i2 < 30; ++i2) {
    for (var j = b[i2]; j < b[i2 + 1]; ++j) {
      r[j] = j - b[i2] << 5 | i2;
    }
  }
  return [b, r];
};
var _a = freb(fleb, 2);
var fl = _a[0];
var revfl = _a[1];
fl[28] = 258, revfl[258] = 28;
var _b = freb(fdeb, 0);
var fd = _b[0];
var revfd = _b[1];
var rev = new u16(32768);
for (i = 0; i < 32768; ++i) {
  x = (i & 43690) >>> 1 | (i & 21845) << 1;
  x = (x & 52428) >>> 2 | (x & 13107) << 2;
  x = (x & 61680) >>> 4 | (x & 3855) << 4;
  rev[i] = ((x & 65280) >>> 8 | (x & 255) << 8) >>> 1;
}
var x;
var i;
var hMap = function(cd, mb, r) {
  var s = cd.length;
  var i2 = 0;
  var l = new u16(mb);
  for (; i2 < s; ++i2) {
    if (cd[i2])
      ++l[cd[i2] - 1];
  }
  var le = new u16(mb);
  for (i2 = 0; i2 < mb; ++i2) {
    le[i2] = le[i2 - 1] + l[i2 - 1] << 1;
  }
  var co;
  if (r) {
    co = new u16(1 << mb);
    var rvb = 15 - mb;
    for (i2 = 0; i2 < s; ++i2) {
      if (cd[i2]) {
        var sv = i2 << 4 | cd[i2];
        var r_1 = mb - cd[i2];
        var v = le[cd[i2] - 1]++ << r_1;
        for (var m = v | (1 << r_1) - 1; v <= m; ++v) {
          co[rev[v] >>> rvb] = sv;
        }
      }
    }
  } else {
    co = new u16(s);
    for (i2 = 0; i2 < s; ++i2) {
      if (cd[i2]) {
        co[i2] = rev[le[cd[i2] - 1]++] >>> 15 - cd[i2];
      }
    }
  }
  return co;
};
var flt = new u8(288);
for (i = 0; i < 144; ++i)
  flt[i] = 8;
var i;
for (i = 144; i < 256; ++i)
  flt[i] = 9;
var i;
for (i = 256; i < 280; ++i)
  flt[i] = 7;
var i;
for (i = 280; i < 288; ++i)
  flt[i] = 8;
var i;
var fdt = new u8(32);
for (i = 0; i < 32; ++i)
  fdt[i] = 5;
var i;
var flrm = /* @__PURE__ */ hMap(flt, 9, 1);
var fdrm = /* @__PURE__ */ hMap(fdt, 5, 1);
var max = function(a) {
  var m = a[0];
  for (var i2 = 1; i2 < a.length; ++i2) {
    if (a[i2] > m)
      m = a[i2];
  }
  return m;
};
var bits = function(d, p, m) {
  var o = p / 8 | 0;
  return (d[o] | d[o + 1] << 8) >> (p & 7) & m;
};
var bits16 = function(d, p) {
  var o = p / 8 | 0;
  return (d[o] | d[o + 1] << 8 | d[o + 2] << 16) >> (p & 7);
};
var shft = function(p) {
  return (p + 7) / 8 | 0;
};
var slc = function(v, s, e) {
  if (s == null || s < 0)
    s = 0;
  if (e == null || e > v.length)
    e = v.length;
  var n = new (v.BYTES_PER_ELEMENT == 2 ? u16 : v.BYTES_PER_ELEMENT == 4 ? u32 : u8)(e - s);
  n.set(v.subarray(s, e));
  return n;
};
var ec = [
  "unexpected EOF",
  "invalid block type",
  "invalid length/literal",
  "invalid distance",
  "stream finished",
  "no stream handler",
  ,
  "no callback",
  "invalid UTF-8 data",
  "extra field too long",
  "date not in range 1980-2099",
  "filename too long",
  "stream finishing",
  "invalid zip data"
];
var err = function(ind, msg, nt) {
  var e = new Error(msg || ec[ind]);
  e.code = ind;
  if (Error.captureStackTrace)
    Error.captureStackTrace(e, err);
  if (!nt)
    throw e;
  return e;
};
var inflt = function(dat, buf, st) {
  var sl = dat.length;
  if (!sl || st && st.f && !st.l)
    return buf || new u8(0);
  var noBuf = !buf || st;
  var noSt = !st || st.i;
  if (!st)
    st = {};
  if (!buf)
    buf = new u8(sl * 3);
  var cbuf = function(l2) {
    var bl = buf.length;
    if (l2 > bl) {
      var nbuf = new u8(Math.max(bl * 2, l2));
      nbuf.set(buf);
      buf = nbuf;
    }
  };
  var final = st.f || 0, pos = st.p || 0, bt = st.b || 0, lm = st.l, dm = st.d, lbt = st.m, dbt = st.n;
  var tbts = sl * 8;
  do {
    if (!lm) {
      final = bits(dat, pos, 1);
      var type = bits(dat, pos + 1, 3);
      pos += 3;
      if (!type) {
        var s = shft(pos) + 4, l = dat[s - 4] | dat[s - 3] << 8, t = s + l;
        if (t > sl) {
          if (noSt)
            err(0);
          break;
        }
        if (noBuf)
          cbuf(bt + l);
        buf.set(dat.subarray(s, t), bt);
        st.b = bt += l, st.p = pos = t * 8, st.f = final;
        continue;
      } else if (type == 1)
        lm = flrm, dm = fdrm, lbt = 9, dbt = 5;
      else if (type == 2) {
        var hLit = bits(dat, pos, 31) + 257, hcLen = bits(dat, pos + 10, 15) + 4;
        var tl = hLit + bits(dat, pos + 5, 31) + 1;
        pos += 14;
        var ldt = new u8(tl);
        var clt = new u8(19);
        for (var i2 = 0; i2 < hcLen; ++i2) {
          clt[clim[i2]] = bits(dat, pos + i2 * 3, 7);
        }
        pos += hcLen * 3;
        var clb = max(clt), clbmsk = (1 << clb) - 1;
        var clm = hMap(clt, clb, 1);
        for (var i2 = 0; i2 < tl; ) {
          var r = clm[bits(dat, pos, clbmsk)];
          pos += r & 15;
          var s = r >>> 4;
          if (s < 16) {
            ldt[i2++] = s;
          } else {
            var c = 0, n = 0;
            if (s == 16)
              n = 3 + bits(dat, pos, 3), pos += 2, c = ldt[i2 - 1];
            else if (s == 17)
              n = 3 + bits(dat, pos, 7), pos += 3;
            else if (s == 18)
              n = 11 + bits(dat, pos, 127), pos += 7;
            while (n--)
              ldt[i2++] = c;
          }
        }
        var lt = ldt.subarray(0, hLit), dt = ldt.subarray(hLit);
        lbt = max(lt);
        dbt = max(dt);
        lm = hMap(lt, lbt, 1);
        dm = hMap(dt, dbt, 1);
      } else
        err(1);
      if (pos > tbts) {
        if (noSt)
          err(0);
        break;
      }
    }
    if (noBuf)
      cbuf(bt + 131072);
    var lms = (1 << lbt) - 1, dms = (1 << dbt) - 1;
    var lpos = pos;
    for (; ; lpos = pos) {
      var c = lm[bits16(dat, pos) & lms], sym = c >>> 4;
      pos += c & 15;
      if (pos > tbts) {
        if (noSt)
          err(0);
        break;
      }
      if (!c)
        err(2);
      if (sym < 256)
        buf[bt++] = sym;
      else if (sym == 256) {
        lpos = pos, lm = null;
        break;
      } else {
        var add = sym - 254;
        if (sym > 264) {
          var i2 = sym - 257, b = fleb[i2];
          add = bits(dat, pos, (1 << b) - 1) + fl[i2];
          pos += b;
        }
        var d = dm[bits16(dat, pos) & dms], dsym = d >>> 4;
        if (!d)
          err(3);
        pos += d & 15;
        var dt = fd[dsym];
        if (dsym > 3) {
          var b = fdeb[dsym];
          dt += bits16(dat, pos) & (1 << b) - 1, pos += b;
        }
        if (pos > tbts) {
          if (noSt)
            err(0);
          break;
        }
        if (noBuf)
          cbuf(bt + 131072);
        var end = bt + add;
        for (; bt < end; bt += 4) {
          buf[bt] = buf[bt - dt];
          buf[bt + 1] = buf[bt + 1 - dt];
          buf[bt + 2] = buf[bt + 2 - dt];
          buf[bt + 3] = buf[bt + 3 - dt];
        }
        bt = end;
      }
    }
    st.l = lm, st.p = lpos, st.b = bt, st.f = final;
    if (lm)
      final = 1, st.m = lbt, st.d = dm, st.n = dbt;
  } while (!final);
  return bt == buf.length ? buf : slc(buf, 0, bt);
};
var et = /* @__PURE__ */ new u8(0);
var gzs = function(d) {
  if (d[0] != 31 || d[1] != 139 || d[2] != 8)
    err(6, "invalid gzip data");
  var flg = d[3];
  var st = 10;
  if (flg & 4)
    st += d[10] | (d[11] << 8) + 2;
  for (var zs = (flg >> 3 & 1) + (flg >> 4 & 1); zs > 0; zs -= !d[st++])
    ;
  return st + (flg & 2);
};
var Inflate = /* @__PURE__ */ function() {
  function Inflate2(cb) {
    this.s = {};
    this.p = new u8(0);
    this.ondata = cb;
  }
  Inflate2.prototype.e = function(c) {
    if (!this.ondata)
      err(5);
    if (this.d)
      err(4);
    var l = this.p.length;
    var n = new u8(l + c.length);
    n.set(this.p), n.set(c, l), this.p = n;
  };
  Inflate2.prototype.c = function(final) {
    this.d = this.s.i = final || false;
    var bts = this.s.b;
    var dt = inflt(this.p, this.o, this.s);
    this.ondata(slc(dt, bts, this.s.b), this.d);
    this.o = slc(dt, this.s.b - 32768), this.s.b = this.o.length;
    this.p = slc(this.p, this.s.p / 8 | 0), this.s.p &= 7;
  };
  Inflate2.prototype.push = function(chunk, final) {
    this.e(chunk), this.c(final);
  };
  return Inflate2;
}();
var Gunzip = /* @__PURE__ */ function() {
  function Gunzip2(cb) {
    this.v = 1;
    Inflate.call(this, cb);
  }
  Gunzip2.prototype.push = function(chunk, final) {
    Inflate.prototype.e.call(this, chunk);
    if (this.v) {
      var s = this.p.length > 3 ? gzs(this.p) : 4;
      if (s >= this.p.length && !final)
        return;
      this.p = this.p.subarray(s), this.v = 0;
    }
    if (final) {
      if (this.p.length < 8)
        err(6, "invalid gzip data");
      this.p = this.p.subarray(0, -8);
    }
    Inflate.prototype.c.call(this, final);
  };
  return Gunzip2;
}();
var Unzlib = /* @__PURE__ */ function() {
  function Unzlib2(cb) {
    this.v = 1;
    Inflate.call(this, cb);
  }
  Unzlib2.prototype.push = function(chunk, final) {
    Inflate.prototype.e.call(this, chunk);
    if (this.v) {
      if (this.p.length < 2 && !final)
        return;
      this.p = this.p.subarray(2), this.v = 0;
    }
    if (final) {
      if (this.p.length < 4)
        err(6, "invalid zlib data");
      this.p = this.p.subarray(0, -4);
    }
    Inflate.prototype.c.call(this, final);
  };
  return Unzlib2;
}();
var Decompress = /* @__PURE__ */ function() {
  function Decompress2(cb) {
    this.G = Gunzip;
    this.I = Inflate;
    this.Z = Unzlib;
    this.ondata = cb;
  }
  Decompress2.prototype.push = function(chunk, final) {
    if (!this.ondata)
      err(5);
    if (!this.s) {
      if (this.p && this.p.length) {
        var n = new u8(this.p.length + chunk.length);
        n.set(this.p), n.set(chunk, this.p.length);
      } else
        this.p = chunk;
      if (this.p.length > 2) {
        var _this_1 = this;
        var cb = function() {
          _this_1.ondata.apply(_this_1, arguments);
        };
        this.s = this.p[0] == 31 && this.p[1] == 139 && this.p[2] == 8 ? new this.G(cb) : (this.p[0] & 15) != 8 || this.p[0] >> 4 > 7 || (this.p[0] << 8 | this.p[1]) % 31 ? new this.I(cb) : new this.Z(cb);
        this.s.push(this.p, final);
        this.p = null;
      }
    } else
      this.s.push(chunk, final);
  };
  return Decompress2;
}();
var td = typeof TextDecoder != "undefined" && /* @__PURE__ */ new TextDecoder();
var tds = 0;
try {
  td.decode(et, { stream: true });
  tds = 1;
} catch (e) {
}
var perspective_bg_default = "./perspective_bg.wasm";
async function get_wasm() {
  return new URL(perspective_bg_default, import.meta.url);
}
var perspective_bg_default2 = get_wasm();
window.addEventListener("unhandledrejection", (event) => {
  if (event.reason?.message === "View method cancelled") {
    event.preventDefault();
  }
});
function is_gzip(buffer) {
  return new Uint32Array(buffer.slice(0, 4))[0] == 559903;
}
async function load_wasm() {
  const compressed = await perspective_bg_default2;
  let parts = [];
  let length = 0;
  const decompressor = new Decompress((chunk) => {
    if (chunk) {
      length += chunk.byteLength;
      parts.push(chunk);
    }
  });
  if (compressed instanceof URL || typeof compressed === "string") {
    const resp = await fetch(compressed.toString());
    const reader = resp.body?.getReader();
    let state = 0;
    if (reader !== void 0) {
      while (true) {
        const { value, done } = await reader.read();
        if (done || value === void 0)
          break;
        if (state === 0 && is_gzip(value?.buffer) || state === 1) {
          state = 1;
          decompressor.push(value, done);
        } else {
          state = 2;
          length += value.byteLength;
          parts.push(value);
        }
      }
    }
  } else if (compressed instanceof Uint8Array) {
    if (is_gzip(compressed.buffer)) {
      decompressor.push(compressed, true);
    } else {
      length = compressed.byteLength;
      parts = [compressed];
    }
  } else {
    const array = new Uint8Array(compressed);
    if (is_gzip(compressed)) {
      decompressor.push(array, true);
    } else {
      length = array.byteLength;
      parts = [array];
    }
  }
  let offset = 0;
  const buffer = new Uint8Array(length);
  for (const part of parts) {
    buffer.set(part, offset);
    offset += part.byteLength;
  }
  await perspective_default(buffer);
  defineWebComponents();
  return perspective_exports;
}
var WASM_MODULE = load_wasm();
var HTMLPerspectiveViewerElement = class extends HTMLElement {
  constructor() {
    super();
    this.__load_wasm();
  }
  async __load_wasm() {
    await WASM_MODULE;
    if (this._instance === void 0) {
      this._instance = new PerspectiveViewerElement(this);
    }
  }
};
var proto = PerspectiveViewerElement.prototype;
var names = Object.getOwnPropertyNames(proto);
for (const key of names) {
  Object.defineProperty(HTMLPerspectiveViewerElement.prototype, key, {
    value: async function(...args) {
      await this.__load_wasm();
      return await this._instance[key].call(this._instance, ...args);
    }
  });
}
for (const key of ["registerPlugin", "getExprTKCommands"]) {
  Object.defineProperty(HTMLPerspectiveViewerElement, key, {
    value: async function(...args) {
      const mod = await WASM_MODULE;
      return mod[key].call(mod, ...args);
    }
  });
}
customElements.define("perspective-viewer", HTMLPerspectiveViewerElement);
var perspective_viewer_default = {};
export {
  HTMLPerspectiveViewerPluginElement,
  convert,
  perspective_viewer_default as default
};
//# sourceMappingURL=perspective-viewer.js.map
