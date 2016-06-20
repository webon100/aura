({
    /**
     * Note that this test file operates in system mode (objects are not Lockerized) so the tests delegate logic and
     * verification to the controller and helper files, which operate in user mode.
     */

    // LockerService not supported on older IE
    browsers: ["-IE8", "-IE9", "-IE10"],

    // TODO(tbliss): make these lists on SecureElement accessible here for maintainablility
    ElementPropertiesWhitelist: [
        "attributes",
        "childElementCount", "classList", "className", "id", "tagName", "innerHTML", "namespaceURI",
        "scrollHeight", "scrollLeft", "scrollTop", "scrollWidth"
    ],
    ElementProperitesBlacklist: ['firstElementChild', 'lastElementChild', 'nextElementSibling', 'previousElementSibling'],

    HTMLPropertiesWhitelist: ['accessKey', 'contentEditable', 'isContentEditable',
                              'dataset', 'dir', 'lang', 'spellcheck', 'style', 'tabIndex', 'title'],

    HTMLPropertiesBlacklist: [],

    OtherPropertiesWhitelist: ["childNodes", "children", "ownerDocument", "parentNode", "offsetParent"],

    MethodsWhitelist: ["appendChild", "replaceChild", "insertBefore", "addEventListener", "removeEventListener",
                       "dispatchEvent", "getAttribute", "setAttribute", "blur", "click", "focus", "hasAttribute",
                       "hasAttributeNS", "removeAttribute", "getAttributeNS", "setAttributeNS", "removeAttributeNS"],

    setUp: function(cmp) {
        cmp.set("v.testUtils", $A.test);
    },

    testElementProperties: {
        test: function(cmp) {
            cmp.testElementProperties(this.ElementPropertiesWhitelist, this.ElementProperitesBlacklist);
        }
    },

    testHtmlProperties: {
        test: function(cmp) {
            cmp.testHtmlProperties(this.HTMLPropertiesWhitelist, this.HTMLPropertiesBlacklist);
        }
    },

    // TODO(tbliss): Need special setup to get some of these to be available, need to revisit
    _testOtherProperties: {
        test: function(cmp) {
            cmp.getDiv();
            var element = cmp.get("v.log");
            this.OtherPropertiesWhitelist.forEach(function(name) {
                $A.test.assertTrue(name in element);
            });
        }
    },

    testExposedMethods: {
        test: function(cmp) {
            cmp.testExposedMethods(this.MethodsWhitelist);
        }
    },

    testFramesBlocked: {
        test: function(cmp) {
            cmp.testFramesBlocked();
        }
    },

    /**
     * removeEventListener() is special in SecureElement, so besides verifying it's exposed,
     * it also needs to be verified working correctly.
     */
    testRemoveEventListener: {
        test: function(cmp) {
            cmp.testRemoveEventListener(false);
        }
    },

    testRemoveEventListenerWithUseCapture: {
        test: function(cmp) {
            cmp.testRemoveEventListener(true);
        }
    },

    /**
     * The actual test code is in renderer where users can have SecureObject references.
     */
    testCallAppendChildWithOpaqueReference: {
        attributes:{"testInRenderer": "testCallAppendChildWithOpaqueReference"},
        test: function(cmp) {
            var actual = cmp.get("v.text");
            $A.test.assertStartsWith("Error: Access denied", actual);
        }
    },

    testCallRemoveChildWithOpaqueReference: {
        attributes:{"testInRenderer": "testCallRemoveChildWithOpaqueReference"},
        test: function(cmp) {
            var actual = cmp.get("v.text");
            $A.test.assertStartsWith("Error: Access denied", actual);
        }
    },

    testInnerHTMLSupportsUseTagForSvgElement: {
        test: function(cmp) {
            cmp.testInnerHTMLSupportsUseTagForSvgElement();
        }
    },

    testTextContent: {
        test: function(cmp) {
            cmp.testTextContent();
        }
    },

    testInnerText: {
        test: function(cmp) {
            cmp.testInnerText();
        }
    },

    testInnerHTMLForExistingElement: {
        test: function(cmp) {
            cmp.testInnerHTML("ExistingElement");
        }
    },

    testInnerHTMLForCreatedElement: {
        test: function(cmp) {
            cmp.testInnerHTML("CreatedElement");
        }
    },

    testAddEventListenerMultipleCalls: {
        test: function(cmp) {
            cmp.testAddEventListenerMultipleCalls();
        }
    },

    testSvgGetBBox: {
        test: function(cmp) {
            cmp.testSvgGetBBox();
        }
    },

    testScalarExpression: {
        test: function(cmp) {
            cmp.testScalarExpression();
        }
    },

    testElementCache: {
        test: function(cmp) {
            cmp.testElementCache();
        }
    }
})
