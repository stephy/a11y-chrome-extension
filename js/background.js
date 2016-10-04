var roleSettings,
    ariaSettings,
    tabindexSettings;

YUI().use(
    "attribute",
    "node",
    "cookie",
    "json-parse",
    "json-stringify", function(Y) {

    // Setup a custom class with attribute support
    function RoleSettings(cfg) {
    	var attrs = Y.Cookie.get("accessibilityExtensionRoleSettings");

      // Setup attribute configuration
      if (!attrs) {
      	var attrs = {
          "ymuis-alert" : { value: false },
          "ymuis-alertdialog" : { value: false },
          "ymuis-application" : { value: false },
          "ymuis-article" : { value: false },
          "ymuis-banner" : { value: false },
          "ymuis-button" : { value: false },
          "ymuis-checkbox" : { value: false },
          "ymuis-columnheader" : { value: false },
          "ymuis-combobox" : { value: false },
          "ymuis-command" : { value: false },
          "ymuis-complementary" : { value: false },
          "ymuis-composite" : { value: false },
          "ymuis-contentinfo" : { value: false },
          "ymuis-definition" : { value: false },
          "ymuis-dialog" : { value: false },
          "ymuis-directory" : { value: false },
          "ymuis-document" : { value: false },
          "ymuis-form" : { value: false },
          "ymuis-grid" : { value: false },
          "ymuis-gridcell" : { value: false },
          "ymuis-group" : { value: false },
          "ymuis-heading" : { value: false },
          "ymuis-img" : { value: false },
          "ymuis-input" : { value: false },
          "ymuis-landmark" : { value: false },
          "ymuis-link" : { value: false },
          "ymuis-list" : { value: false },
          "ymuis-listbox" : { value: false },
          "ymuis-listitem" : { value: false },
          "ymuis-log" : { value: false },
          "ymuis-main" : { value: false },
          "ymuis-marquee" : { value: false },
          "ymuis-math" : { value: false },
          "ymuis-menu" : { value: false },
          "ymuis-menubar" : { value: false },
          "ymuis-menuitem" : { value: false },
          "ymuis-menuitemcheckbox" : { value: false },
          "ymuis-menuitemradio" : { value: false },
          "ymuis-navigation" : { value: false },
          "ymuis-note" : { value: false },
          "ymuis-option" : { value: false },
          "ymuis-presentation" : { value: false },
          "ymuis-progressbar" : { value: false },
          "ymuis-radio" : { value: false },
          "ymuis-radiogroup" : { value: false },
          "ymuis-range" : { value: false },
          "ymuis-region" : { value: false },
          "ymuis-roletype" : { value: false },
          "ymuis-row" : { value: false },
          "ymuis-rowgroup" : { value: false },
          "ymuis-rowheader" : { value: false },
          "ymuis-scrollbar" : { value: false },
          "ymuis-search" : { value: false },
          "ymuis-section" : { value: false },
          "ymuis-sectionhead" : { value: false },
          "ymuis-select" : { value: false },
          "ymuis-separator" : { value: false },
          "ymuis-slider" : { value: false },
          "ymuis-spinbutton" : { value: false },
          "ymuis-status" : { value: false },
          "ymuis-structure" : { value: false },
          "ymuis-tab" : { value: false },
          "ymuis-tablist" : { value: false },
          "ymuis-tabpanel" : { value: false },
          "ymuis-textbox" : { value: false },
          "ymuis-timer" : { value: false },
          "ymuis-toolbar" : { value: false },
          "ymuis-tooltip" : { value: false },
          "ymuis-tree" : { value: false },
          "ymuis-treegrid" : { value: false },
          "ymuis-treeitem" : { value: false },
          "ymuis-widget" : { value: false },
          "ymuis-window" : { value: false }
        };

        Y.Cookie.set("accessibilityExtensionRoleSettings", Y.JSON.stringify(attrs));
        
    	} else {
    		attrs = Y.JSON.parse(attrs);
    	}

      this.addAttrs(attrs, cfg);
    }

    Y.augment(RoleSettings, Y.Attribute);

    roleSettings = new RoleSettings();

    for (key in roleSettings.getAttrs()) {
    	roleSettings.after(key + "Change", function(event) {
    		var newAttrs = roleSettings.getAttrs();

    		for (newKey in newAttrs) {
    			newAttrs[newKey] = {value: newAttrs[newKey]};
    		}
    		Y.Cookie.set("accessibilityExtensionRoleSettings", Y.JSON.stringify(newAttrs));
		});
    };

    function AriaSettings(cfg) {
        var attrs = Y.Cookie.get("accessibilityExtensionAriaSettings");

        // Setup attribute configuration
        if (!attrs) {
            var attrs = {
              "ymuis-aria-activedescendant" : { value: false },
              "ymuis-aria-atomic" : { value: false },
              "ymuis-aria-autocomplete" : { value: false },
              "ymuis-aria-busy" : { value: false },
              "ymuis-aria-checked" : { value: false },
              "ymuis-aria-controlsowns" : { value: false },
              "ymuis-aria-describedby" : { value: false },
              "ymuis-aria-disabled" : { value: false },
              "ymuis-aria-dropeffect" : { value: false },
              "ymuis-aria-expanded" : { value: false },
              "ymuis-aria-flowto" : { value: false },
              "ymuis-aria-grabbed" : { value: false },
              "ymuis-aria-haspopup" : { value: false },
              "ymuis-aria-hidden" : { value: false },
              "ymuis-aria-invalid" : { value: false },
              "ymuis-aria-label" : { value: false },
              "ymuis-aria-labelledby" : { value: false },
              "ymuis-aria-level" : { value: false },
              "ymuis-aria-live" : { value: false },
              "ymuis-aria-multiline" : { value: false },
              "ymuis-aria-multiselectable" : { value: false },
              "ymuis-aria-orientation" : { value: false },
              "ymuis-aria-owns" : { value: false },
              "ymuis-aria-posinset" : { value: false },
              "ymuis-aria-pressed" : { value: false },
              "ymuis-aria-readonly" : { value: false },
              "ymuis-aria-relevant" : { value: false },
              "ymuis-aria-required" : { value: false },
              "ymuis-aria-selected" : { value: false },
              "ymuis-aria-setsize" : { value: false },
              "ymuis-aria-sort" : { value: false },
              "ymuis-aria-valuemax" : { value: false },
              "ymuis-aria-valuemin" : { value: false },
              "ymuis-aria-valuenow" : { value: false },
              "ymuis-aria-valuetext" : { value: false }
            };
            Y.Cookie.set("accessibilityExtensionAriaSettings", Y.JSON.stringify(attrs));
        } else {
            attrs = Y.JSON.parse(attrs);
        }

        this.addAttrs(attrs, cfg);
    }

    Y.augment(AriaSettings, Y.Attribute);

    ariaSettings = new AriaSettings();

    for (key in ariaSettings.getAttrs()) {
        ariaSettings.after(key + "Change", function(event) {
            var newAttrs = ariaSettings.getAttrs();

            for (newKey in newAttrs) {
                newAttrs[newKey] = {
                  value: newAttrs[newKey]
                };
            }
            Y.Cookie.set("accessibilityExtensionAriaSettings", Y.JSON.stringify(newAttrs));
        });
    };

    function TabindexSettings(cfg) {
        var attrs = Y.Cookie.get("accessibilityExtensionTabindexSettings");

        // Setup attribute configuration
        if (!attrs) {
            var attrs = {
                "ymuis-0" : { value: false },
                "ymuis--1" : { value: false }
            };
            Y.Cookie.set("accessibilityExtensionTabindexSettings", Y.JSON.stringify(attrs));
        } else {
            attrs = Y.JSON.parse(attrs);
        }

        this.addAttrs(attrs, cfg);
    }

    Y.augment(TabindexSettings, Y.Attribute);

    tabindexSettings = new TabindexSettings();

    for (key in tabindexSettings.getAttrs()) {
        tabindexSettings.after(key + "Change", function(event) {
            var newAttrs = tabindexSettings.getAttrs();

            for (newKey in newAttrs) {
                newAttrs[newKey] = {value: newAttrs[newKey]};
            }
            Y.Cookie.set("accessibilityExtensionTabindexSettings", Y.JSON.stringify(newAttrs));
        });
    };

});
