/******************************************************************************
 *
 * Copyright (c) 2018, the Perspective Authors.
 *
 * This file is part of the Perspective library, distributed under the terms
 * of the Apache License 2.0.  The full license can be found in the LICENSE
 * file.
 *
 */
import type { IPerspectiveViewerElement } from "./viewer";
import type { HTMLPerspectiveViewerPluginElement } from "./plugin";
import type React from "react";
type ReactPerspectiveViewerAttributes<T> = React.HTMLAttributes<T>;
type JsxPerspectiveViewerElement = {
    class?: string;
} & React.DetailedHTMLProps<ReactPerspectiveViewerAttributes<HTMLPerspectiveViewerElement>, HTMLPerspectiveViewerElement>;
declare global {
    namespace JSX {
        interface IntrinsicElements {
            "perspective-viewer": JsxPerspectiveViewerElement;
        }
    }
}
declare global {
    interface Document {
        createElement(tagName: "perspective-viewer", options?: ElementCreationOptions): HTMLPerspectiveViewerElement;
        createElement(tagName: "perspective-viewer-plugin", options?: ElementCreationOptions): HTMLPerspectiveViewerPluginElement;
        querySelector<E extends Element = Element>(selectors: string): E | null;
        querySelector(selectors: "perspective-viewer"): HTMLPerspectiveViewerElement | null;
    }
    interface CustomElementRegistry {
        get(tagName: "perspective-viewer"): typeof HTMLPerspectiveViewerElement;
        get(tagName: "perspective-viewer-plugin"): typeof HTMLPerspectiveViewerPluginElement;
    }
}
/**
 * @noInheritDoc
 */
export interface HTMLPerspectiveViewerElement extends IPerspectiveViewerElement {
}
export declare class HTMLPerspectiveViewerElement extends HTMLElement implements IPerspectiveViewerElement {
    /**
     * Register a new plugin via its custom element name.  This method is called
     * automatically as a side effect of importing a plugin module, so this
     * method should only typically be called by plugin authors.
     *
     * @category Plugin
     * @param name The `name` of the custom element to register, as supplied
     * to the `customElements.define(name)` method.
     * @example
     * ```javascript
     * customElements.get("perspective-viewer").registerPlugin("my-plugin");
     * ```
     */
    static registerPlugin(name: string): Promise<void>;
    /**
     * Get metadata for ExprTK's supported commands.
     *
     * @category Internal
     * @returns An array of JSON descriptors for ExprTK commands
     */
    static getExprtkCommands(): Promise<Array<Record<string, string>>>;
}
export {};
