var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/ts/migrate.ts
var migrate_exports = {};
__export(migrate_exports, {
  convert: () => convert
});
module.exports = __toCommonJS(migrate_exports);
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
    ].filter((x) => !!x),
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
//# sourceMappingURL=migrate.js.map
