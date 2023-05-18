import { psp } from './snippets/perspective-d04a7af518f5ab0d/inline0.js';
import { ClipboardItem } from './snippets/perspective-d04a7af518f5ab0d/inline1.js';
import { ResizeObserver } from './snippets/perspective-d04a7af518f5ab0d/inline2.js';
import { bootstrap } from './snippets/perspective-d04a7af518f5ab0d/inline3.js';

let wasm;

const cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachedUint8Memory0 = null;

function getUint8Memory0() {
    if (cachedUint8Memory0 === null || cachedUint8Memory0.byteLength === 0) {
        cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

const heap = new Array(128).fill(undefined);

heap.push(undefined, null, true, false);

let heap_next = heap.length;

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

function getObject(idx) { return heap[idx]; }

function dropObject(idx) {
    if (idx < 132) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

let WASM_VECTOR_LEN = 0;

const cachedTextEncoder = new TextEncoder('utf-8');

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length);
        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len);

    const mem = getUint8Memory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
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

function isLikeNone(x) {
    return x === undefined || x === null;
}

let cachedInt32Memory0 = null;

function getInt32Memory0() {
    if (cachedInt32Memory0 === null || cachedInt32Memory0.byteLength === 0) {
        cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachedInt32Memory0;
}

let cachedFloat64Memory0 = null;

function getFloat64Memory0() {
    if (cachedFloat64Memory0 === null || cachedFloat64Memory0.byteLength === 0) {
        cachedFloat64Memory0 = new Float64Array(wasm.memory.buffer);
    }
    return cachedFloat64Memory0;
}

let cachedBigInt64Memory0 = null;

function getBigInt64Memory0() {
    if (cachedBigInt64Memory0 === null || cachedBigInt64Memory0.byteLength === 0) {
        cachedBigInt64Memory0 = new BigInt64Array(wasm.memory.buffer);
    }
    return cachedBigInt64Memory0;
}

function debugString(val) {
    // primitive types
    const type = typeof val;
    if (type == 'number' || type == 'boolean' || val == null) {
        return  `${val}`;
    }
    if (type == 'string') {
        return `"${val}"`;
    }
    if (type == 'symbol') {
        const description = val.description;
        if (description == null) {
            return 'Symbol';
        } else {
            return `Symbol(${description})`;
        }
    }
    if (type == 'function') {
        const name = val.name;
        if (typeof name == 'string' && name.length > 0) {
            return `Function(${name})`;
        } else {
            return 'Function';
        }
    }
    // objects
    if (Array.isArray(val)) {
        const length = val.length;
        let debug = '[';
        if (length > 0) {
            debug += debugString(val[0]);
        }
        for(let i = 1; i < length; i++) {
            debug += ', ' + debugString(val[i]);
        }
        debug += ']';
        return debug;
    }
    // Test for built-in
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches.length > 1) {
        className = builtInMatches[1];
    } else {
        // Failed to match the standard '[object ClassName]'
        return toString.call(val);
    }
    if (className == 'Object') {
        // we're a user defined class or Object
        // JSON.stringify avoids problems with cycles, and is generally much
        // easier than looping through ownProperties of `val`.
        try {
            return 'Object(' + JSON.stringify(val) + ')';
        } catch (_) {
            return 'Object';
        }
    }
    // errors
    if (val instanceof Error) {
        return `${val.name}: ${val.message}\n${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}

function makeMutClosure(arg0, arg1, dtor, f) {
    const state = { a: arg0, b: arg1, cnt: 1, dtor };
    const real = (...args) => {
        // First up with a closure we increment the internal reference
        // count. This ensures that the Rust closure environment won't
        // be deallocated while we're invoking it.
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
        // First up with a closure we increment the internal reference
        // count. This ensures that the Rust closure environment won't
        // be deallocated while we're invoking it.
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

let stack_pointer = 128;

function addBorrowedObject(obj) {
    if (stack_pointer == 1) throw new Error('out of js stack');
    heap[--stack_pointer] = obj;
    return stack_pointer;
}
function __wbg_adapter_72(arg0, arg1, arg2) {
    try {
        wasm._dyn_core__ops__function__FnMut___A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h184efdf9ad459500(arg0, arg1, addBorrowedObject(arg2));
    } finally {
        heap[stack_pointer++] = undefined;
    }
}

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        wasm.__wbindgen_exn_store(addHeapObject(e));
    }
}
/**
* Register a plugin globally.
* @param {string} name
*/
export function registerPlugin(name) {
    const ptr0 = passStringToWasm0(name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    wasm.registerPlugin(ptr0, len0);
}

let cachedUint32Memory0 = null;

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
    for (let i = 0; i < slice.length; i++) {
        result.push(takeObject(slice[i]));
    }
    return result;
}
/**
* Export all ExprTK commands, for use in generating documentation.
* @returns {any[]}
*/
export function getExprTKCommands() {
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

/**
* Register this crate's Custom Elements in the browser's current session.
* This must occur before calling any public API methods on these Custom
* Elements from JavaScript, as the methods themselves won't be defined yet.
* By default, this crate does not register `PerspectiveViewerElement` (as to
* preserve backwards-compatible synchronous API).
*/
export function defineWebComponents() {
    wasm.defineWebComponents();
}

function passArrayJsValueToWasm0(array, malloc) {
    const ptr = malloc(array.length * 4);
    const mem = getUint32Memory0();
    for (let i = 0; i < array.length; i++) {
        mem[ptr / 4 + i] = addHeapObject(array[i]);
    }
    WASM_VECTOR_LEN = array.length;
    return ptr;
}
function __wbg_adapter_632(arg0, arg1, arg2, arg3) {
    wasm.wasm_bindgen__convert__closures__invoke2_mut__h502b5d03c9f46e48(arg0, arg1, addHeapObject(arg2), addHeapObject(arg3));
}

/**
*/
export class ColumnDropDownElement {

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_columndropdownelement_free(ptr);
    }
}
/**
*/
export class CopyDropDownMenuElement {

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
    /**
    * @param {HTMLElement} elem
    */
    constructor(elem) {
        const ret = wasm.copydropdownmenuelement_new(addHeapObject(elem));
        return CopyDropDownMenuElement.__wrap(ret);
    }
    /**
    * @param {HTMLElement} target
    */
    open(target) {
        wasm.copydropdownmenuelement_open(this.ptr, addHeapObject(target));
    }
    /**
    */
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
    /**
    * @param {number} ptr
    */
    unsafe_set_model(ptr) {
        wasm.copydropdownmenuelement_unsafe_set_model(this.ptr, ptr);
    }
    /**
    */
    connected_callback() {
        wasm.copydropdownmenuelement_connected_callback(this.ptr);
    }
}
/**
*/
export class ExportDropDownMenuElement {

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
    /**
    * @param {HTMLElement} elem
    */
    constructor(elem) {
        const ret = wasm.exportdropdownmenuelement_new(addHeapObject(elem));
        return ExportDropDownMenuElement.__wrap(ret);
    }
    /**
    * @param {HTMLElement} target
    */
    open(target) {
        wasm.exportdropdownmenuelement_open(this.ptr, addHeapObject(target));
    }
    /**
    */
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
    /**
    * @param {number} ptr
    */
    unsafe_set_model(ptr) {
        wasm.exportdropdownmenuelement_unsafe_set_model(this.ptr, ptr);
    }
    /**
    */
    connected_callback() {
        wasm.exportdropdownmenuelement_connected_callback(this.ptr);
    }
}
/**
*/
export class FilterDropDownElement {

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_filterdropdownelement_free(ptr);
    }
}
/**
*/
export class FunctionDropDownElement {

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_functiondropdownelement_free(ptr);
    }
}
/**
*/
export class PerspectiveDateColumnStyleElement {

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
    /**
    * @param {HTMLElement} elem
    */
    constructor(elem) {
        const ret = wasm.perspectivedatecolumnstyleelement_new(addHeapObject(elem));
        return PerspectiveDateColumnStyleElement.__wrap(ret);
    }
    /**
    * Reset to a provided JSON config, to be used in place of `new()` when
    * re-using this component.
    *
    * # Arguments
    * * `config` - a `ColumnStyle` config in JSON form.
    * @param {any} config
    */
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
    /**
    * Dispatches to `ModalElement::open(target)`
    *
    * # Arguments
    * `target` - the relative target to pin this `ModalElement` to.
    * @param {HTMLElement} target
    * @param {any} js_config
    * @param {any} js_default_config
    */
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
    /**
    * Remove this `ModalElement` from the DOM.
    */
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
    /**
    */
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
    /**
    * DOM lifecycle method when connected.  We don't use this, as it can fire
    * during innocuous events like re-parenting.
    */
    connected_callback() {
        wasm.perspectivedatecolumnstyleelement_connected_callback(this.ptr);
    }
}
/**
*/
export class PerspectiveDatetimeColumnStyleElement {

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
    /**
    * @param {HTMLElement} elem
    */
    constructor(elem) {
        const ret = wasm.perspectivedatetimecolumnstyleelement_new(addHeapObject(elem));
        return PerspectiveDatetimeColumnStyleElement.__wrap(ret);
    }
    /**
    * Reset to a provided JSON config, to be used in place of `new()` when
    * re-using this component.
    *
    * # Arguments
    * * `config` - a `ColumnStyle` config in JSON form.
    * @param {any} config
    */
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
    /**
    * Dispatches to `ModalElement::open(target)`
    *
    * # Arguments
    * `target` - the relative target to pin this `ModalElement` to.
    * @param {HTMLElement} target
    * @param {any} js_config
    * @param {any} js_default_config
    */
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
    /**
    * Remove this `ModalElement` from the DOM.
    */
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
    /**
    */
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
    /**
    * DOM lifecycle method when connected.  We don't use this, as it can fire
    * during innocuous events like re-parenting.
    */
    connected_callback() {
        wasm.perspectivedatetimecolumnstyleelement_connected_callback(this.ptr);
    }
}
/**
* The `<perspective-viewer-plugin>` element, the default perspective plugin
* which is registered and activated automcatically when a
* `<perspective-viewer>` is loaded without plugins.  While you will not
* typically instantiate this class directly, it is simple enough to function
* as a good "default" plugin implementation which can be extended to create
* custom plugins.
*
* # Example
* ```javascript
* class MyPlugin extends customElements.get("perspective-viewer-plugin") {
*    // Custom plugin overrides
* }
* ```
*/
export class PerspectiveDebugPluginElement {

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
    /**
    * @param {HTMLElement} elem
    */
    constructor(elem) {
        const ret = wasm.perspectivedebugpluginelement_new(addHeapObject(elem));
        return PerspectiveDebugPluginElement.__wrap(ret);
    }
    /**
    * @returns {string}
    */
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
    /**
    * @returns {string}
    */
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
    /**
    * @returns {any}
    */
    get min_config_columns() {
        const ret = wasm.perspectivedebugpluginelement_config_column_names(this.ptr);
        return takeObject(ret);
    }
    /**
    * @returns {any}
    */
    get config_column_names() {
        const ret = wasm.perspectivedebugpluginelement_config_column_names(this.ptr);
        return takeObject(ret);
    }
    /**
    * @param {any} view
    * @returns {Promise<any>}
    */
    update(view) {
        const ret = wasm.perspectivedebugpluginelement_update(this.ptr, addHeapObject(view));
        return takeObject(ret);
    }
    /**
    * @param {any} view
    * @returns {Promise<any>}
    */
    draw(view) {
        const ret = wasm.perspectivedebugpluginelement_draw(this.ptr, addHeapObject(view));
        return takeObject(ret);
    }
    /**
    * @returns {Promise<any>}
    */
    clear() {
        const ret = wasm.perspectivedebugpluginelement_clear(this.ptr);
        return takeObject(ret);
    }
    /**
    * @returns {Promise<any>}
    */
    resize() {
        const ret = wasm.perspectivedebugpluginelement_clear(this.ptr);
        return takeObject(ret);
    }
    /**
    * @returns {Promise<any>}
    */
    restyle() {
        const ret = wasm.perspectivedebugpluginelement_clear(this.ptr);
        return takeObject(ret);
    }
    /**
    * @returns {Promise<any>}
    */
    save() {
        const ret = wasm.perspectivedebugpluginelement_clear(this.ptr);
        return takeObject(ret);
    }
    /**
    * @returns {Promise<any>}
    */
    restore() {
        const ret = wasm.perspectivedebugpluginelement_clear(this.ptr);
        return takeObject(ret);
    }
    /**
    * @returns {Promise<any>}
    */
    delete() {
        const ret = wasm.perspectivedebugpluginelement_clear(this.ptr);
        return takeObject(ret);
    }
    /**
    */
    connectedCallback() {
        wasm.perspectivedebugpluginelement_connectedCallback(this.ptr);
    }
}
/**
*/
export class PerspectiveNumberColumnStyleElement {

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
    /**
    * @param {HTMLElement} elem
    */
    constructor(elem) {
        const ret = wasm.perspectivenumbercolumnstyleelement_new(addHeapObject(elem));
        return PerspectiveNumberColumnStyleElement.__wrap(ret);
    }
    /**
    * Reset to a provided JSON config, to be used in place of `new()` when
    * re-using this component.
    *
    * # Arguments
    * * `config` - a `ColumnStyle` config in JSON form.
    * * `default_config` - the default `ColumnStyle` config for this column
    *   type, in JSON form.
    * @param {object} config
    * @param {object} default_config
    */
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
    /**
    * Dispatches to `ModalElement::open(target)` after lazy initializing the
    * `ModelElement` custom element handle.
    *
    * # Arguments
    * `target` - the relative target to pin this `ModalElement` to.
    * @param {HTMLElement} target
    * @param {object} config
    * @param {object} default_config
    */
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
    /**
    * Remove this `ModalElement` from the DOM.
    */
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
    /**
    */
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
    /**
    * DOM lifecycle method when connected.  We don't use this, as it can fire
    * during innocuous events like re-parenting.
    */
    connected_callback() {
        wasm.perspectivenumbercolumnstyleelement_connected_callback(this.ptr);
    }
}
/**
*/
export class PerspectiveStringColumnStyleElement {

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
    /**
    * @param {HTMLElement} elem
    */
    constructor(elem) {
        const ret = wasm.perspectivestringcolumnstyleelement_new(addHeapObject(elem));
        return PerspectiveStringColumnStyleElement.__wrap(ret);
    }
    /**
    * Reset to a provided JSON config, to be used in place of `new()` when
    * re-using this component.
    *
    * # Arguments
    * * `config` - a `ColumnStyle` config in JSON form.
    * @param {any} config
    */
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
    /**
    * Dispatches to `ModalElement::open(target)`
    *
    * # Arguments
    * `target` - the relative target to pin this `ModalElement` to.
    * @param {HTMLElement} target
    * @param {any} js_config
    * @param {any} js_default_config
    */
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
    /**
    * Remove this `ModalElement` from the DOM.
    */
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
    /**
    */
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
    /**
    * DOM lifecycle method when connected.  We don't use this, as it can fire
    * during innocuous events like re-parenting.
    */
    connected_callback() {
        wasm.perspectivestringcolumnstyleelement_connected_callback(this.ptr);
    }
}
/**
* A `customElements` class which encapsulates both the `<perspective-viewer>`
* public API, as well as the Rust component state.
*
*     ┌───────────────────────────────────────────┐
*     │ Custom Element                            │
*     │┌──────────────┐┌─────────────────────────┐│
*     ││ yew::app     ││ Model                   ││
*     ││┌────────────┐││┌─────────┐┌────────────┐││
*     │││ Components ││││ Session ││ Renderer   │││
*     ││└────────────┘│││┌───────┐││┌──────────┐│││
*     │└──────────────┘│││ Table ││││ Plugin   ││││
*     │┌──────────────┐││└───────┘││└──────────┘│││
*     ││ HtmlElement  │││┌───────┐│└────────────┘││
*     │└──────────────┘│││ View  ││┌────────────┐││
*     │                ││└───────┘││ DragDrop   │││
*     │                │└─────────┘└────────────┘││
*     │                │┌──────────────┐┌───────┐││
*     │                ││ CustomEvents ││ Theme │││
*     │                │└──────────────┘└───────┘││
*     │                └─────────────────────────┘│
*     └───────────────────────────────────────────┘
*/
export class PerspectiveViewerElement {

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
    /**
    * @param {HTMLElement} elem
    */
    constructor(elem) {
        const ret = wasm.perspectiveviewerelement_new(addHeapObject(elem));
        return PerspectiveViewerElement.__wrap(ret);
    }
    /**
    */
    connectedCallback() {
        wasm.perspectiveviewerelement_connectedCallback(this.ptr);
    }
    /**
    * Loads a promise to a `JsPerspectiveTable` in this viewer.  Historially,
    * `<perspective-viewer>` has accepted either a `Promise` or `Table` as an
    * argument, so we preserve that behavior here with some loss of type
    * precision.
    * @param {any} table
    * @returns {Promise<any>}
    */
    load(table) {
        const ret = wasm.perspectiveviewerelement_load(this.ptr, addHeapObject(table));
        return takeObject(ret);
    }
    /**
    * Delete the `View` and all associated state, rendering this
    * `<perspective-viewer>` unusable and freeing all associated resources.
    * Does not delete the supplied `Table` (as this is constructed by the
    * callee).  Allowing a `<perspective-viewer>` to be garbage-collected
    * without calling `delete()` will leak WASM memory.
    * @returns {Promise<any>}
    */
    delete() {
        const ret = wasm.perspectiveviewerelement_delete(this.ptr);
        return takeObject(ret);
    }
    /**
    * Get the underlying `View` for thie viewer.
    * @returns {Promise<any>}
    */
    getView() {
        const ret = wasm.perspectiveviewerelement_getView(this.ptr);
        return takeObject(ret);
    }
    /**
    * Get the underlying `Table` for this viewer.
    *
    * # Arguments
    * - `wait_for_table` whether to wait for `load()` to be called, or fail
    *   immediately if `load()` has not yet been called.
    * @param {boolean | undefined} wait_for_table
    * @returns {Promise<any>}
    */
    getTable(wait_for_table) {
        const ret = wasm.perspectiveviewerelement_getTable(this.ptr, isLikeNone(wait_for_table) ? 0xFFFFFF : wait_for_table ? 1 : 0);
        return takeObject(ret);
    }
    /**
    * @returns {Promise<any>}
    */
    flush() {
        const ret = wasm.perspectiveviewerelement_flush(this.ptr);
        return takeObject(ret);
    }
    /**
    * Restores this element from a full/partial `JsPerspectiveViewConfig`.
    *
    * # Arguments
    * - `update` The config to restore to, as returned by `.save()` in either
    *   "json", "string" or "arraybuffer" format.
    * @param {any} update
    * @returns {Promise<any>}
    */
    restore(update) {
        const ret = wasm.perspectiveviewerelement_restore(this.ptr, addHeapObject(update));
        return takeObject(ret);
    }
    /**
    * Save this element to serialized state object, one which can be restored
    * via the `.restore()` method.
    *
    * # Arguments
    * - `format` Supports "json" (default), "arraybuffer" or "string".
    * @param {string | undefined} format
    * @returns {Promise<any>}
    */
    save(format) {
        var ptr0 = isLikeNone(format) ? 0 : passStringToWasm0(format, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        const ret = wasm.perspectiveviewerelement_save(this.ptr, ptr0, len0);
        return takeObject(ret);
    }
    /**
    * Download this viewer's `View` or `Table` data as a `.csv` file.
    *
    * # Arguments
    * - `flat` Whether to use the current `ViewConfig` to generate this data,
    *   or use the default.
    * @param {boolean | undefined} flat
    * @returns {Promise<any>}
    */
    download(flat) {
        const ret = wasm.perspectiveviewerelement_download(this.ptr, isLikeNone(flat) ? 0xFFFFFF : flat ? 1 : 0);
        return takeObject(ret);
    }
    /**
    * Copy this viewer's `View` or `Table` data as CSV to the system
    * clipboard.
    *
    * # Arguments
    * - `flat` Whether to use the current `ViewConfig` to generate this data,
    *   or use the default.
    * @param {boolean | undefined} flat
    * @returns {Promise<any>}
    */
    copy(flat) {
        const ret = wasm.perspectiveviewerelement_copy(this.ptr, isLikeNone(flat) ? 0xFFFFFF : flat ? 1 : 0);
        return takeObject(ret);
    }
    /**
    * Reset the viewer's `ViewerConfig` to the default.
    *
    * # Arguments
    * - `all` Whether to clear `expressions` also.
    * @param {boolean | undefined} reset_expressions
    * @returns {Promise<any>}
    */
    reset(reset_expressions) {
        const ret = wasm.perspectiveviewerelement_reset(this.ptr, isLikeNone(reset_expressions) ? 0xFFFFFF : reset_expressions ? 1 : 0);
        return takeObject(ret);
    }
    /**
    * Recalculate the viewer's dimensions and redraw.
    * @param {boolean | undefined} force
    * @returns {Promise<any>}
    */
    notifyResize(force) {
        const ret = wasm.perspectiveviewerelement_notifyResize(this.ptr, isLikeNone(force) ? 0xFFFFFF : force ? 1 : 0);
        return takeObject(ret);
    }
    /**
    * Sets the auto-size behavior of this component.  When `true`, this
    * `<perspective-viewer>` will register a `ResizeObserver` on itself and
    * call `resize()` whenever its own dimensions change.
    *
    * # Arguments
    * - `autosize` Whether to register a `ResizeObserver` on this element or
    *   not.
    * @param {boolean} autosize
    */
    setAutoSize(autosize) {
        wasm.perspectiveviewerelement_setAutoSize(this.ptr, autosize);
    }
    /**
    * Get this viewer's edit port for the currently loaded `Table`.
    * @returns {number}
    */
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
    /**
    * Restyle all plugins from current document.
    * @returns {Promise<any>}
    */
    restyleElement() {
        const ret = wasm.perspectiveviewerelement_restyleElement(this.ptr);
        return takeObject(ret);
    }
    /**
    * Set the available theme names available in the status bar UI.
    * @param {any[] | undefined} themes
    * @returns {Promise<any>}
    */
    resetThemes(themes) {
        var ptr0 = isLikeNone(themes) ? 0 : passArrayJsValueToWasm0(themes, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        const ret = wasm.perspectiveviewerelement_resetThemes(this.ptr, ptr0, len0);
        return takeObject(ret);
    }
    /**
    * Determines the render throttling behavior. Can be an integer, for
    * millisecond window to throttle render event; or, if `None`, adaptive
    * throttling will be calculated from the measured render time of the
    * last 5 frames.
    *
    * # Examples
    * // Only draws at most 1 frame/sec.
    * viewer.js_set_throttle(Some(1000_f64));
    *
    * # Arguments
    * - `throttle` The throttle rate - milliseconds (f64), or `None` for
    *   adaptive throttling.
    * @param {number | undefined} val
    */
    setThrottle(val) {
        wasm.perspectiveviewerelement_setThrottle(this.ptr, !isLikeNone(val), isLikeNone(val) ? 0 : val);
    }
    /**
    * Toggle (or force) the config panel open/closed.
    *
    * # Arguments
    * - `force` Force the state of the panel open or closed, or `None` to
    *   toggle.
    * @param {boolean | undefined} force
    * @returns {Promise<any>}
    */
    toggleConfig(force) {
        const ret = wasm.perspectiveviewerelement_toggleConfig(this.ptr, isLikeNone(force) ? 0xFFFFFF : force ? 1 : 0);
        return takeObject(ret);
    }
    /**
    * Get an `Array` of all of the plugin custom elements registered for this
    * element. This may not include plugins which called
    * `registerPlugin()` after the host has rendered for the first time.
    * @returns {Array<any>}
    */
    getAllPlugins() {
        const ret = wasm.perspectiveviewerelement_getAllPlugins(this.ptr);
        return takeObject(ret);
    }
    /**
    * Gets a plugin Custom Element with the `name` field, or get the active
    * plugin if no `name` is provided.
    *
    * # Arguments
    * - `name` The `name` property of a perspective plugin Custom Element, or
    *   `None` for the active plugin's Custom Element.
    * @param {string | undefined} name
    * @returns {any}
    */
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
    /**
    * Internal Only.
    *
    * Get this custom element model's raw pointer.
    * @returns {number}
    */
    unsafeGetModel() {
        const ret = wasm.perspectiveviewerelement_unsafeGetModel(this.ptr);
        return ret;
    }
}

async function load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);

            } catch (e) {
                if (module.headers.get('Content-Type') != 'application/wasm') {
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
        const ret = typeof(obj) === 'string' ? obj : undefined;
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
        return isLikeNone(ret) ? 0xFFFFFF : ret ? 1 : 0;
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
        const ret = typeof(getObject(arg0)) === 'string';
        return ret;
    };
    imports.wbg.__wbg_restyle_89672ccbfb79accf = function() { return handleError(function (arg0, arg1) {
        const ret = getObject(arg0).restyle(getObject(arg1));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_view_d88ed8178a181aad = function() { return handleError(function (arg0, arg1) {
        const ret = getObject(arg0).view(getObject(arg1));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_toarrow_8f3cf35104005c11 = function() { return handleError(function (arg0) {
        const ret = getObject(arg0).to_arrow();
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbindgen_number_get = function(arg0, arg1) {
        const obj = getObject(arg1);
        const ret = typeof(obj) === 'number' ? obj : undefined;
        getFloat64Memory0()[arg0 / 8 + 1] = isLikeNone(ret) ? 0 : ret;
        getInt32Memory0()[arg0 / 4 + 0] = !isLikeNone(ret);
    };
    imports.wbg.__wbg_schema_b5719c95cee8fbd3 = function() { return handleError(function (arg0) {
        const ret = getObject(arg0).schema();
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_dimensions_b16db283b3aba9df = function() { return handleError(function (arg0) {
        const ret = getObject(arg0).dimensions();
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_numviewcolumns_66ccecfebbd22767 = function(arg0) {
        const ret = getObject(arg0).num_view_columns;
        return ret;
    };
    imports.wbg.__wbg_numviewrows_3672db750e6bf4d6 = function(arg0) {
        const ret = getObject(arg0).num_view_rows;
        return ret;
    };
    imports.wbg.__wbg_update_d5edcebeeabd11b4 = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
        const ret = getObject(arg0).update(getObject(arg1), arg2 === 0 ? undefined : arg3 >>> 0, arg4 === 0 ? undefined : arg5 >>> 0, arg6 !== 0);
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_draw_92cd7836ddc08277 = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
        const ret = getObject(arg0).draw(getObject(arg1), arg2 === 0 ? undefined : arg3 >>> 0, arg4 === 0 ? undefined : arg5 >>> 0, arg6 !== 0);
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_validateexpressions_a9f43d032690287e = function() { return handleError(function (arg0, arg1) {
        const ret = getObject(arg0).validate_expressions(takeObject(arg1));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_new_b2ec8e4c3e017d16 = function(arg0) {
        const ret = new ClipboardItem(getObject(arg0));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_static_accessor_PSP_c229b68938fda519 = function() {
        const ret = psp;
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
        const ret = typeof(v) === 'boolean' ? (v ? 1 : 0) : 2;
        return ret;
    };
    imports.wbg.__wbg_resize_4787d375666d9670 = function() { return handleError(function (arg0) {
        const ret = getObject(arg0).resize();
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_size_8f623f9ad387581f = function() { return handleError(function (arg0) {
        const ret = getObject(arg0).size();
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_columns_11d6f8b445120ba1 = function() { return handleError(function (arg0) {
        const ret = getObject(arg0).columns();
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_schema_b32121c8df6e6c67 = function() { return handleError(function (arg0) {
        const ret = getObject(arg0).schema();
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_makeport_330a6a67b7619779 = function() { return handleError(function (arg0) {
        const ret = getObject(arg0).make_port();
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_numtablerows_b9b9379c9fddc077 = function(arg0) {
        const ret = getObject(arg0).num_table_rows;
        return ret;
    };
    imports.wbg.__wbg_numtablecolumns_844e3a23d6f798b8 = function(arg0) {
        const ret = getObject(arg0).num_table_columns;
        return ret;
    };
    imports.wbg.__wbg_tocolumns_300cdbc2ed579617 = function() { return handleError(function (arg0) {
        const ret = getObject(arg0).to_columns();
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_delete_93fe9aa39acbf53b = function() { return handleError(function (arg0) {
        const ret = getObject(arg0).delete();
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_tocsv_9f1059bb4ffe12ca = function() { return handleError(function (arg0, arg1) {
        const ret = getObject(arg0).to_csv(takeObject(arg1));
        return addHeapObject(ret);
    }, arguments) };
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
        const ret = getObject(arg0) === undefined;
        return ret;
    };
    imports.wbg.__wbindgen_in = function(arg0, arg1) {
        const ret = getObject(arg0) in getObject(arg1);
        return ret;
    };
    imports.wbg.__wbindgen_is_bigint = function(arg0) {
        const ret = typeof(getObject(arg0)) === 'bigint';
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
        const ret = typeof(val) === 'object' && val !== null;
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
    imports.wbg.__wbg_innerWidth_ffa584f74d721fce = function() { return handleError(function (arg0) {
        const ret = getObject(arg0).innerWidth;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_innerHeight_f4804c803fcf02b0 = function() { return handleError(function (arg0) {
        const ret = getObject(arg0).innerHeight;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_performance_de9825f9a8678574 = function(arg0) {
        const ret = getObject(arg0).performance;
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    };
    imports.wbg.__wbg_getComputedStyle_9d689205a00d4ac6 = function() { return handleError(function (arg0, arg1) {
        const ret = getObject(arg0).getComputedStyle(getObject(arg1));
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_requestAnimationFrame_4181656476a7d86c = function() { return handleError(function (arg0, arg1) {
        const ret = getObject(arg0).requestAnimationFrame(getObject(arg1));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_setTimeout_d6fcf0d9067b8e64 = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = getObject(arg0).setTimeout(getObject(arg1), arg2);
        return ret;
    }, arguments) };
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
    imports.wbg.__wbg_createElement_976dbb84fe1661b5 = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = getObject(arg0).createElement(getStringFromWasm0(arg1, arg2));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_createElementNS_1561aca8ee3693c0 = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
        const ret = getObject(arg0).createElementNS(arg1 === 0 ? undefined : getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
        return addHeapObject(ret);
    }, arguments) };
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
    imports.wbg.__wbg_cssRules_854cc83d669b5359 = function() { return handleError(function (arg0) {
        const ret = getObject(arg0).cssRules;
        return addHeapObject(ret);
    }, arguments) };
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
        getObject(arg0).nodeValue = arg1 === 0 ? undefined : getStringFromWasm0(arg1, arg2);
    };
    imports.wbg.__wbg_textContent_77bd294928962f93 = function(arg0, arg1) {
        const ret = getObject(arg1).textContent;
        var ptr0 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbg_settextContent_538ceb17614272d8 = function(arg0, arg1, arg2) {
        getObject(arg0).textContent = arg1 === 0 ? undefined : getStringFromWasm0(arg1, arg2);
    };
    imports.wbg.__wbg_appendChild_e513ef0e5098dfdd = function() { return handleError(function (arg0, arg1) {
        const ret = getObject(arg0).appendChild(getObject(arg1));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_cloneNode_27fa6913b5172820 = function() { return handleError(function (arg0, arg1) {
        const ret = getObject(arg0).cloneNode(arg1 !== 0);
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_contains_e35a6bed906082fb = function(arg0, arg1) {
        const ret = getObject(arg0).contains(getObject(arg1));
        return ret;
    };
    imports.wbg.__wbg_getRootNode_1ec3ce813f3b619c = function(arg0) {
        const ret = getObject(arg0).getRootNode();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_insertBefore_9f2d2defb9471006 = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = getObject(arg0).insertBefore(getObject(arg1), getObject(arg2));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_removeChild_6751e9ca5d9aaf00 = function() { return handleError(function (arg0, arg1) {
        const ret = getObject(arg0).removeChild(getObject(arg1));
        return addHeapObject(ret);
    }, arguments) };
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
    imports.wbg.__wbg_addEventListener_cbe4c6f619b032f3 = function() { return handleError(function (arg0, arg1, arg2, arg3) {
        getObject(arg0).addEventListener(getStringFromWasm0(arg1, arg2), getObject(arg3));
    }, arguments) };
    imports.wbg.__wbg_addEventListener_1fc744729ac6dc27 = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
        getObject(arg0).addEventListener(getStringFromWasm0(arg1, arg2), getObject(arg3), getObject(arg4));
    }, arguments) };
    imports.wbg.__wbg_dispatchEvent_9c61816a838ce0ce = function() { return handleError(function (arg0, arg1) {
        const ret = getObject(arg0).dispatchEvent(getObject(arg1));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_removeEventListener_dd20475efce70084 = function() { return handleError(function (arg0, arg1, arg2, arg3) {
        getObject(arg0).removeEventListener(getStringFromWasm0(arg1, arg2), getObject(arg3));
    }, arguments) };
    imports.wbg.__wbg_length_cd5bf94cfb3798c6 = function(arg0) {
        const ret = getObject(arg0).length;
        return ret;
    };
    imports.wbg.__wbg_getPropertyValue_e1afcfe3e0dda270 = function() { return handleError(function (arg0, arg1, arg2, arg3) {
        const ret = getObject(arg1).getPropertyValue(getStringFromWasm0(arg2, arg3));
        const ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    }, arguments) };
    imports.wbg.__wbg_item_fb51ec5c6f84e7e8 = function(arg0, arg1, arg2) {
        const ret = getObject(arg1).item(arg2 >>> 0);
        const ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbg_setProperty_e489dfd8c0a6bffc = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
        getObject(arg0).setProperty(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
    }, arguments) };
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
    imports.wbg.__wbg_attachShadow_6679406270042c29 = function() { return handleError(function (arg0, arg1) {
        const ret = getObject(arg0).attachShadow(getObject(arg1));
        return addHeapObject(ret);
    }, arguments) };
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
    imports.wbg.__wbg_matches_392e935e2ce3b2f8 = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = getObject(arg0).matches(getStringFromWasm0(arg1, arg2));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_releasePointerCapture_45283df79b1542f3 = function() { return handleError(function (arg0, arg1) {
        getObject(arg0).releasePointerCapture(arg1);
    }, arguments) };
    imports.wbg.__wbg_removeAttribute_beaed7727852af78 = function() { return handleError(function (arg0, arg1, arg2) {
        getObject(arg0).removeAttribute(getStringFromWasm0(arg1, arg2));
    }, arguments) };
    imports.wbg.__wbg_setAttribute_d8436c14a59ab1af = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
        getObject(arg0).setAttribute(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
    }, arguments) };
    imports.wbg.__wbg_setPointerCapture_7cc6c6e831d5dae0 = function() { return handleError(function (arg0, arg1) {
        getObject(arg0).setPointerCapture(arg1);
    }, arguments) };
    imports.wbg.__wbg_toggleAttribute_ae95fde458610a9c = function() { return handleError(function (arg0, arg1, arg2, arg3) {
        const ret = getObject(arg0).toggleAttribute(getStringFromWasm0(arg1, arg2), arg3 !== 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_add_476f166f6469caf2 = function() { return handleError(function (arg0, arg1) {
        getObject(arg0).add(...getObject(arg1));
    }, arguments) };
    imports.wbg.__wbg_add_89a4f3b0846cf0aa = function() { return handleError(function (arg0, arg1, arg2) {
        getObject(arg0).add(getStringFromWasm0(arg1, arg2));
    }, arguments) };
    imports.wbg.__wbg_remove_d1e9c7442aff6eac = function() { return handleError(function (arg0, arg1) {
        getObject(arg0).remove(...getObject(arg1));
    }, arguments) };
    imports.wbg.__wbg_remove_1a26eb5d822902ed = function() { return handleError(function (arg0, arg1, arg2) {
        getObject(arg0).remove(getStringFromWasm0(arg1, arg2));
    }, arguments) };
    imports.wbg.__wbg_toggle_98fc718f1f361e81 = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = getObject(arg0).toggle(getStringFromWasm0(arg1, arg2));
        return ret;
    }, arguments) };
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
    imports.wbg.__wbg_loaded_923fa6f5cc2d1ef3 = function() { return handleError(function (arg0) {
        const ret = getObject(arg0).loaded;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_item_37cbb972da31ad43 = function(arg0, arg1) {
        const ret = getObject(arg0).item(arg1 >>> 0);
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    };
    imports.wbg.__wbg_getwithindex_5571ba24207565a4 = function(arg0, arg1) {
        const ret = getObject(arg0)[arg1 >>> 0];
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    };
    imports.wbg.__wbg_createObjectURL_8e3f999d8bc1855f = function() { return handleError(function (arg0, arg1) {
        const ret = URL.createObjectURL(getObject(arg1));
        const ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    }, arguments) };
    imports.wbg.__wbg_dataTransfer_52971d8875475cec = function(arg0) {
        const ret = getObject(arg0).dataTransfer;
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    };
    imports.wbg.__wbg_values_007d212e9a93f562 = function(arg0) {
        const ret = getObject(arg0).values();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_next_447cf1b072ae69ff = function() { return handleError(function (arg0) {
        const ret = getObject(arg0).next();
        return addHeapObject(ret);
    }, arguments) };
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
    imports.wbg.__wbg_setselectionStart_87a1777e51e06ed4 = function() { return handleError(function (arg0, arg1, arg2) {
        getObject(arg0).selectionStart = arg1 === 0 ? undefined : arg2 >>> 0;
    }, arguments) };
    imports.wbg.__wbg_selectionEnd_f88c311ef9851368 = function() { return handleError(function (arg0, arg1) {
        const ret = getObject(arg1).selectionEnd;
        getInt32Memory0()[arg0 / 4 + 1] = isLikeNone(ret) ? 0 : ret;
        getInt32Memory0()[arg0 / 4 + 0] = !isLikeNone(ret);
    }, arguments) };
    imports.wbg.__wbg_setselectionEnd_e639d81bc8c38f56 = function() { return handleError(function (arg0, arg1, arg2) {
        getObject(arg0).selectionEnd = arg1 === 0 ? undefined : arg2 >>> 0;
    }, arguments) };
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
    imports.wbg.__wbg_blur_48356fc7ce64e8db = function() { return handleError(function (arg0) {
        getObject(arg0).blur();
    }, arguments) };
    imports.wbg.__wbg_click_dc312915ae093463 = function(arg0) {
        getObject(arg0).click();
    };
    imports.wbg.__wbg_focus_adfe4cc61e2c09bc = function() { return handleError(function (arg0) {
        getObject(arg0).focus();
    }, arguments) };
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
    imports.wbg.__wbg_newwithu8arraysequence_f863246af83e1785 = function() { return handleError(function (arg0) {
        const ret = new Blob(getObject(arg0));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_newwithstrsequenceandoptions_4f45d51a76d0e731 = function() { return handleError(function (arg0, arg1) {
        const ret = new Blob(getObject(arg0), getObject(arg1));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_write_6ab17e2f46d9af07 = function(arg0, arg1) {
        const ret = getObject(arg0).write(getObject(arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_new_fc739aa39a85df5e = function() { return handleError(function (arg0, arg1) {
        const ret = new CustomEvent(getStringFromWasm0(arg0, arg1));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_newwitheventinitdict_cfe41e76471dadcc = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = new CustomEvent(getStringFromWasm0(arg0, arg1), getObject(arg2));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_get_fc5705c1298c5dc3 = function(arg0, arg1, arg2, arg3) {
        const ret = getObject(arg1)[getStringFromWasm0(arg2, arg3)];
        var ptr0 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbg_set_45d8640eed33057c = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
        getObject(arg0)[getStringFromWasm0(arg1, arg2)] = getStringFromWasm0(arg3, arg4);
    }, arguments) };
    imports.wbg.__wbg_delete_71c6d72669c7a7bf = function(arg0, arg1, arg2) {
        delete getObject(arg0)[getStringFromWasm0(arg1, arg2)];
    };
    imports.wbg.__wbg_setdropEffect_ef988aabbd6fd5d3 = function(arg0, arg1, arg2) {
        getObject(arg0).dropEffect = getStringFromWasm0(arg1, arg2);
    };
    imports.wbg.__wbg_setData_0547a743d5659015 = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
        getObject(arg0).setData(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
    }, arguments) };
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
    imports.wbg.__wbg_mark_20c20929a35a9058 = function() { return handleError(function (arg0, arg1, arg2) {
        getObject(arg0).mark(getStringFromWasm0(arg1, arg2));
    }, arguments) };
    imports.wbg.__wbg_measure_add43b4627609d3b = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
        getObject(arg0).measure(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
    }, arguments) };
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
        const ret = typeof(getObject(arg0)) === 'function';
        return ret;
    };
    imports.wbg.__wbg_newnoargs_b5b063fc6c2f0376 = function(arg0, arg1) {
        const ret = new Function(getStringFromWasm0(arg0, arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_new_268f7b7dd3430798 = function() {
        const ret = new Map();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_next_579e583d33566a86 = function(arg0) {
        const ret = getObject(arg0).next;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_next_aaef7c8aa5e212ac = function() { return handleError(function (arg0) {
        const ret = getObject(arg0).next();
        return addHeapObject(ret);
    }, arguments) };
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
    imports.wbg.__wbg_get_765201544a2b6869 = function() { return handleError(function (arg0, arg1) {
        const ret = Reflect.get(getObject(arg0), getObject(arg1));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_call_97ae9d8645dc388b = function() { return handleError(function (arg0, arg1) {
        const ret = getObject(arg0).call(getObject(arg1));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_new_0b9bfdd97583284e = function() {
        const ret = new Object();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_self_6d479506f72c6a71 = function() { return handleError(function () {
        const ret = self.self;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_window_f2557cc78490aceb = function() { return handleError(function () {
        const ret = window.window;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_globalThis_7f206bda628d5286 = function() { return handleError(function () {
        const ret = globalThis.globalThis;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_global_ba75c50d1cf384f4 = function() { return handleError(function () {
        const ret = global.global;
        return addHeapObject(ret);
    }, arguments) };
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
    imports.wbg.__wbg_call_168da88779e35f61 = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = getObject(arg0).call(getObject(arg1), getObject(arg2));
        return addHeapObject(ret);
    }, arguments) };
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
            var state0 = {a: arg0, b: arg1};
            var cb0 = (arg0, arg1) => {
                const a = state0.a;
                state0.a = 0;
                try {
                    return __wbg_adapter_632(a, state0.b, arg0, arg1);
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
    imports.wbg.__wbg_stringify_d6471d300ded9b68 = function() { return handleError(function (arg0) {
        const ret = JSON.stringify(getObject(arg0));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_has_8359f114ce042f5a = function() { return handleError(function (arg0, arg1) {
        const ret = Reflect.has(getObject(arg0), getObject(arg1));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_set_bf3f89b92d5a34bf = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = Reflect.set(getObject(arg0), getObject(arg1), getObject(arg2));
        return ret;
    }, arguments) };
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
        const ret = typeof(v) === 'bigint' ? v : undefined;
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

    if (typeof input === 'string' || (typeof Request === 'function' && input instanceof Request) || (typeof URL === 'function' && input instanceof URL)) {
        input = fetch(input);
    }

    initMemory(imports);

    const { instance, module } = await load(await input, imports);

    return finalizeInit(instance, module);
}

export { initSync }
export default init;
