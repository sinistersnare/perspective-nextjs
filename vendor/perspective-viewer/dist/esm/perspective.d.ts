/* tslint:disable */
/* eslint-disable */
/**
* Register a plugin globally.
* @param {string} name
*/
export function registerPlugin(name: string): void;
/**
* Export all ExprTK commands, for use in generating documentation.
* @returns {any[]}
*/
export function getExprTKCommands(): any[];
/**
* Register this crate's Custom Elements in the browser's current session.
* This must occur before calling any public API methods on these Custom
* Elements from JavaScript, as the methods themselves won't be defined yet.
* By default, this crate does not register `PerspectiveViewerElement` (as to
* preserve backwards-compatible synchronous API).
*/
export function defineWebComponents(): void;
/**
*/
export class ColumnDropDownElement {
  free(): void;
}
/**
*/
export class CopyDropDownMenuElement {
  free(): void;
/**
* @param {HTMLElement} elem
*/
  constructor(elem: HTMLElement);
/**
* @param {HTMLElement} target
*/
  open(target: HTMLElement): void;
/**
*/
  hide(): void;
/**
* @param {number} ptr
*/
  unsafe_set_model(ptr: number): void;
/**
*/
  connected_callback(): void;
}
/**
*/
export class ExportDropDownMenuElement {
  free(): void;
/**
* @param {HTMLElement} elem
*/
  constructor(elem: HTMLElement);
/**
* @param {HTMLElement} target
*/
  open(target: HTMLElement): void;
/**
*/
  hide(): void;
/**
* @param {number} ptr
*/
  unsafe_set_model(ptr: number): void;
/**
*/
  connected_callback(): void;
}
/**
*/
export class FilterDropDownElement {
  free(): void;
}
/**
*/
export class FunctionDropDownElement {
  free(): void;
}
/**
*/
export class PerspectiveDateColumnStyleElement {
  free(): void;
/**
* @param {HTMLElement} elem
*/
  constructor(elem: HTMLElement);
/**
* Reset to a provided JSON config, to be used in place of `new()` when
* re-using this component.
*
* # Arguments
* * `config` - a `ColumnStyle` config in JSON form.
* @param {any} config
*/
  reset(config: any): void;
/**
* Dispatches to `ModalElement::open(target)`
*
* # Arguments
* `target` - the relative target to pin this `ModalElement` to.
* @param {HTMLElement} target
* @param {any} js_config
* @param {any} js_default_config
*/
  open(target: HTMLElement, js_config: any, js_default_config: any): void;
/**
* Remove this `ModalElement` from the DOM.
*/
  close(): void;
/**
*/
  destroy(): void;
/**
* DOM lifecycle method when connected.  We don't use this, as it can fire
* during innocuous events like re-parenting.
*/
  connected_callback(): void;
}
/**
*/
export class PerspectiveDatetimeColumnStyleElement {
  free(): void;
/**
* @param {HTMLElement} elem
*/
  constructor(elem: HTMLElement);
/**
* Reset to a provided JSON config, to be used in place of `new()` when
* re-using this component.
*
* # Arguments
* * `config` - a `ColumnStyle` config in JSON form.
* @param {any} config
*/
  reset(config: any): void;
/**
* Dispatches to `ModalElement::open(target)`
*
* # Arguments
* `target` - the relative target to pin this `ModalElement` to.
* @param {HTMLElement} target
* @param {any} js_config
* @param {any} js_default_config
*/
  open(target: HTMLElement, js_config: any, js_default_config: any): void;
/**
* Remove this `ModalElement` from the DOM.
*/
  close(): void;
/**
*/
  destroy(): void;
/**
* DOM lifecycle method when connected.  We don't use this, as it can fire
* during innocuous events like re-parenting.
*/
  connected_callback(): void;
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
  free(): void;
/**
* @param {HTMLElement} elem
*/
  constructor(elem: HTMLElement);
/**
* @param {any} view
* @returns {Promise<any>}
*/
  update(view: any): Promise<any>;
/**
* @param {any} view
* @returns {Promise<any>}
*/
  draw(view: any): Promise<any>;
/**
* @returns {Promise<any>}
*/
  clear(): Promise<any>;
/**
* @returns {Promise<any>}
*/
  resize(): Promise<any>;
/**
* @returns {Promise<any>}
*/
  restyle(): Promise<any>;
/**
* @returns {Promise<any>}
*/
  save(): Promise<any>;
/**
* @returns {Promise<any>}
*/
  restore(): Promise<any>;
/**
* @returns {Promise<any>}
*/
  delete(): Promise<any>;
/**
*/
  connectedCallback(): void;
/**
*/
  readonly config_column_names: any;
/**
*/
  readonly min_config_columns: any;
/**
*/
  readonly name: string;
/**
*/
  readonly select_mode: string;
}
/**
*/
export class PerspectiveNumberColumnStyleElement {
  free(): void;
/**
* @param {HTMLElement} elem
*/
  constructor(elem: HTMLElement);
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
  reset(config: object, default_config: object): void;
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
  open(target: HTMLElement, config: object, default_config: object): void;
/**
* Remove this `ModalElement` from the DOM.
*/
  close(): void;
/**
*/
  destroy(): void;
/**
* DOM lifecycle method when connected.  We don't use this, as it can fire
* during innocuous events like re-parenting.
*/
  connected_callback(): void;
}
/**
*/
export class PerspectiveStringColumnStyleElement {
  free(): void;
/**
* @param {HTMLElement} elem
*/
  constructor(elem: HTMLElement);
/**
* Reset to a provided JSON config, to be used in place of `new()` when
* re-using this component.
*
* # Arguments
* * `config` - a `ColumnStyle` config in JSON form.
* @param {any} config
*/
  reset(config: any): void;
/**
* Dispatches to `ModalElement::open(target)`
*
* # Arguments
* `target` - the relative target to pin this `ModalElement` to.
* @param {HTMLElement} target
* @param {any} js_config
* @param {any} js_default_config
*/
  open(target: HTMLElement, js_config: any, js_default_config: any): void;
/**
* Remove this `ModalElement` from the DOM.
*/
  close(): void;
/**
*/
  destroy(): void;
/**
* DOM lifecycle method when connected.  We don't use this, as it can fire
* during innocuous events like re-parenting.
*/
  connected_callback(): void;
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
  free(): void;
/**
* @param {HTMLElement} elem
*/
  constructor(elem: HTMLElement);
/**
*/
  connectedCallback(): void;
/**
* Loads a promise to a `JsPerspectiveTable` in this viewer.  Historially,
* `<perspective-viewer>` has accepted either a `Promise` or `Table` as an
* argument, so we preserve that behavior here with some loss of type
* precision.
* @param {any} table
* @returns {Promise<any>}
*/
  load(table: any): Promise<any>;
/**
* Delete the `View` and all associated state, rendering this
* `<perspective-viewer>` unusable and freeing all associated resources.
* Does not delete the supplied `Table` (as this is constructed by the
* callee).  Allowing a `<perspective-viewer>` to be garbage-collected
* without calling `delete()` will leak WASM memory.
* @returns {Promise<any>}
*/
  delete(): Promise<any>;
/**
* Get the underlying `View` for thie viewer.
* @returns {Promise<any>}
*/
  getView(): Promise<any>;
/**
* Get the underlying `Table` for this viewer.
*
* # Arguments
* - `wait_for_table` whether to wait for `load()` to be called, or fail
*   immediately if `load()` has not yet been called.
* @param {boolean | undefined} wait_for_table
* @returns {Promise<any>}
*/
  getTable(wait_for_table?: boolean): Promise<any>;
/**
* @returns {Promise<any>}
*/
  flush(): Promise<any>;
/**
* Restores this element from a full/partial `JsPerspectiveViewConfig`.
*
* # Arguments
* - `update` The config to restore to, as returned by `.save()` in either
*   "json", "string" or "arraybuffer" format.
* @param {any} update
* @returns {Promise<any>}
*/
  restore(update: any): Promise<any>;
/**
* Save this element to serialized state object, one which can be restored
* via the `.restore()` method.
*
* # Arguments
* - `format` Supports "json" (default), "arraybuffer" or "string".
* @param {string | undefined} format
* @returns {Promise<any>}
*/
  save(format?: string): Promise<any>;
/**
* Download this viewer's `View` or `Table` data as a `.csv` file.
*
* # Arguments
* - `flat` Whether to use the current `ViewConfig` to generate this data,
*   or use the default.
* @param {boolean | undefined} flat
* @returns {Promise<any>}
*/
  download(flat?: boolean): Promise<any>;
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
  copy(flat?: boolean): Promise<any>;
/**
* Reset the viewer's `ViewerConfig` to the default.
*
* # Arguments
* - `all` Whether to clear `expressions` also.
* @param {boolean | undefined} reset_expressions
* @returns {Promise<any>}
*/
  reset(reset_expressions?: boolean): Promise<any>;
/**
* Recalculate the viewer's dimensions and redraw.
* @param {boolean | undefined} force
* @returns {Promise<any>}
*/
  notifyResize(force?: boolean): Promise<any>;
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
  setAutoSize(autosize: boolean): void;
/**
* Get this viewer's edit port for the currently loaded `Table`.
* @returns {number}
*/
  getEditPort(): number;
/**
* Restyle all plugins from current document.
* @returns {Promise<any>}
*/
  restyleElement(): Promise<any>;
/**
* Set the available theme names available in the status bar UI.
* @param {any[] | undefined} themes
* @returns {Promise<any>}
*/
  resetThemes(themes?: any[]): Promise<any>;
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
  setThrottle(val?: number): void;
/**
* Toggle (or force) the config panel open/closed.
*
* # Arguments
* - `force` Force the state of the panel open or closed, or `None` to
*   toggle.
* @param {boolean | undefined} force
* @returns {Promise<any>}
*/
  toggleConfig(force?: boolean): Promise<any>;
/**
* Get an `Array` of all of the plugin custom elements registered for this
* element. This may not include plugins which called
* `registerPlugin()` after the host has rendered for the first time.
* @returns {Array<any>}
*/
  getAllPlugins(): Array<any>;
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
  getPlugin(name?: string): any;
/**
* Internal Only.
*
* Get this custom element model's raw pointer.
* @returns {number}
*/
  unsafeGetModel(): number;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_perspectivenumbercolumnstyleelement_free: (a: number) => void;
  readonly perspectivenumbercolumnstyleelement_new: (a: number) => number;
  readonly perspectivenumbercolumnstyleelement_reset: (a: number, b: number, c: number, d: number) => void;
  readonly perspectivenumbercolumnstyleelement_open: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly perspectivenumbercolumnstyleelement_close: (a: number, b: number) => void;
  readonly perspectivenumbercolumnstyleelement_destroy: (a: number, b: number) => void;
  readonly perspectivenumbercolumnstyleelement_connected_callback: (a: number) => void;
  readonly __wbg_perspectivedatecolumnstyleelement_free: (a: number) => void;
  readonly perspectivedatecolumnstyleelement_new: (a: number) => number;
  readonly perspectivedatecolumnstyleelement_reset: (a: number, b: number, c: number) => void;
  readonly perspectivedatecolumnstyleelement_open: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly perspectivedatecolumnstyleelement_close: (a: number, b: number) => void;
  readonly perspectivedatecolumnstyleelement_destroy: (a: number, b: number) => void;
  readonly perspectivedatecolumnstyleelement_connected_callback: (a: number) => void;
  readonly __wbg_perspectivestringcolumnstyleelement_free: (a: number) => void;
  readonly perspectivestringcolumnstyleelement_new: (a: number) => number;
  readonly perspectivestringcolumnstyleelement_reset: (a: number, b: number, c: number) => void;
  readonly perspectivestringcolumnstyleelement_open: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly perspectivestringcolumnstyleelement_close: (a: number, b: number) => void;
  readonly perspectivestringcolumnstyleelement_destroy: (a: number, b: number) => void;
  readonly perspectivestringcolumnstyleelement_connected_callback: (a: number) => void;
  readonly __wbg_filterdropdownelement_free: (a: number) => void;
  readonly __wbg_perspectivedebugpluginelement_free: (a: number) => void;
  readonly perspectivedebugpluginelement_new: (a: number) => number;
  readonly perspectivedebugpluginelement_name: (a: number, b: number) => void;
  readonly perspectivedebugpluginelement_select_mode: (a: number, b: number) => void;
  readonly perspectivedebugpluginelement_config_column_names: (a: number) => number;
  readonly perspectivedebugpluginelement_update: (a: number, b: number) => number;
  readonly perspectivedebugpluginelement_draw: (a: number, b: number) => number;
  readonly perspectivedebugpluginelement_clear: (a: number) => number;
  readonly perspectivedebugpluginelement_connectedCallback: (a: number) => void;
  readonly perspectivedebugpluginelement_min_config_columns: (a: number) => number;
  readonly perspectivedebugpluginelement_resize: (a: number) => number;
  readonly perspectivedebugpluginelement_restyle: (a: number) => number;
  readonly perspectivedebugpluginelement_save: (a: number) => number;
  readonly perspectivedebugpluginelement_restore: (a: number) => number;
  readonly perspectivedebugpluginelement_delete: (a: number) => number;
  readonly __wbg_exportdropdownmenuelement_free: (a: number) => void;
  readonly exportdropdownmenuelement_new: (a: number) => number;
  readonly exportdropdownmenuelement_open: (a: number, b: number) => void;
  readonly exportdropdownmenuelement_hide: (a: number, b: number) => void;
  readonly exportdropdownmenuelement_unsafe_set_model: (a: number, b: number) => void;
  readonly exportdropdownmenuelement_connected_callback: (a: number) => void;
  readonly registerPlugin: (a: number, b: number) => void;
  readonly getExprTKCommands: (a: number) => void;
  readonly defineWebComponents: () => void;
  readonly __wbg_perspectivedatetimecolumnstyleelement_free: (a: number) => void;
  readonly perspectivedatetimecolumnstyleelement_new: (a: number) => number;
  readonly perspectivedatetimecolumnstyleelement_reset: (a: number, b: number, c: number) => void;
  readonly perspectivedatetimecolumnstyleelement_open: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly perspectivedatetimecolumnstyleelement_close: (a: number, b: number) => void;
  readonly perspectivedatetimecolumnstyleelement_destroy: (a: number, b: number) => void;
  readonly perspectivedatetimecolumnstyleelement_connected_callback: (a: number) => void;
  readonly __wbg_functiondropdownelement_free: (a: number) => void;
  readonly __wbg_copydropdownmenuelement_free: (a: number) => void;
  readonly copydropdownmenuelement_new: (a: number) => number;
  readonly copydropdownmenuelement_open: (a: number, b: number) => void;
  readonly copydropdownmenuelement_hide: (a: number, b: number) => void;
  readonly copydropdownmenuelement_unsafe_set_model: (a: number, b: number) => void;
  readonly copydropdownmenuelement_connected_callback: (a: number) => void;
  readonly __wbg_columndropdownelement_free: (a: number) => void;
  readonly __wbg_perspectiveviewerelement_free: (a: number) => void;
  readonly perspectiveviewerelement_new: (a: number) => number;
  readonly perspectiveviewerelement_connectedCallback: (a: number) => void;
  readonly perspectiveviewerelement_load: (a: number, b: number) => number;
  readonly perspectiveviewerelement_delete: (a: number) => number;
  readonly perspectiveviewerelement_getView: (a: number) => number;
  readonly perspectiveviewerelement_getTable: (a: number, b: number) => number;
  readonly perspectiveviewerelement_flush: (a: number) => number;
  readonly perspectiveviewerelement_restore: (a: number, b: number) => number;
  readonly perspectiveviewerelement_save: (a: number, b: number, c: number) => number;
  readonly perspectiveviewerelement_download: (a: number, b: number) => number;
  readonly perspectiveviewerelement_copy: (a: number, b: number) => number;
  readonly perspectiveviewerelement_reset: (a: number, b: number) => number;
  readonly perspectiveviewerelement_notifyResize: (a: number, b: number) => number;
  readonly perspectiveviewerelement_setAutoSize: (a: number, b: number) => void;
  readonly perspectiveviewerelement_getEditPort: (a: number, b: number) => void;
  readonly perspectiveviewerelement_restyleElement: (a: number) => number;
  readonly perspectiveviewerelement_resetThemes: (a: number, b: number, c: number) => number;
  readonly perspectiveviewerelement_setThrottle: (a: number, b: number, c: number) => void;
  readonly perspectiveviewerelement_toggleConfig: (a: number, b: number) => number;
  readonly perspectiveviewerelement_getAllPlugins: (a: number) => number;
  readonly perspectiveviewerelement_getPlugin: (a: number, b: number, c: number, d: number) => void;
  readonly perspectiveviewerelement_unsafeGetModel: (a: number) => number;
  readonly __wbindgen_malloc: (a: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number) => number;
  readonly __wbindgen_export_2: WebAssembly.Table;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly _dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h7d554f50bbe02c16: (a: number, b: number, c: number) => void;
  readonly _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__he139df485bcf022c: (a: number, b: number, c: number) => void;
  readonly _dyn_core__ops__function__Fn__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h6401e06e95fa1aa5: (a: number, b: number, c: number) => void;
  readonly _dyn_core__ops__function__Fn__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hdd6a8f55ead23c1a: (a: number, b: number, c: number) => number;
  readonly _dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hd2028441c711ba36: (a: number, b: number) => void;
  readonly _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h5479b7899c2154e8: (a: number, b: number, c: number) => void;
  readonly _dyn_core__ops__function__FnMut___A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h184efdf9ad459500: (a: number, b: number, c: number) => void;
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly __wbindgen_free: (a: number, b: number) => void;
  readonly wasm_bindgen__convert__closures__invoke2_mut__h502b5d03c9f46e48: (a: number, b: number, c: number, d: number) => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {SyncInitInput} module
*
* @returns {InitOutput}
*/
export function initSync(module: SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function init (module_or_path: InitInput | Promise<InitInput>): Promise<InitOutput>;
