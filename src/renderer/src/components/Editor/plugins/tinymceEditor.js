/*! grapesjs-plugin-tinymce6 - 0.1.1 */
!(function (e, t) {
  'object' == typeof exports && 'object' == typeof module
    ? (module.exports = t())
    : 'function' == typeof define && define.amd
    ? define([], t)
    : 'object' == typeof exports
    ? (exports['grapesjs-plugin-tinymce6'] = t())
    : (e['grapesjs-plugin-tinymce6'] = t())
})('undefined' != typeof self ? self : this, function () {
  return (function (e) {
    function t(o) {
      if (n[o]) return n[o].exports
      var i = (n[o] = { i: o, l: !1, exports: {} })
      return e[o].call(i.exports, i, i.exports, t), (i.l = !0), i.exports
    }
    var n = {}
    return (
      (t.m = e),
      (t.c = n),
      (t.d = function (e, n, o) {
        t.o(e, n) || Object.defineProperty(e, n, { configurable: !1, enumerable: !0, get: o })
      }),
      (t.n = function (e) {
        var n =
          e && e.__esModule
            ? function () {
                return e.default
              }
            : function () {
                return e
              }
        return t.d(n, 'a', n), n
      }),
      (t.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
      }),
      (t.p = ''),
      t((t.s = 0))
    )
  })([
    function (module, exports, __webpack_require__) {
      'use strict'
      function _classCallCheck(e, t) {
        if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function')
      }
      function createHtmlElem(e, t, n) {
        var o = document.createElement(e)
        return setElementProperty(o, n), t && t.appendChild(o), o
      }
      function setElementProperty(e, t) {
        if (t)
          for (var n in t)
            'object' === _typeof(t[n]) ? setElementProperty(e[n], t[n]) : (e[n] = t[n])
      }
      function injectDataStorage() {
        window.grapesjsTinyDocsData = {
          editorClickHandler: function (e) {
            13 !== e.keyCode ||
              e.shiftKey ||
              (e.stopPropagation(),
              e.preventDefault(),
              e.stopImmediatePropagation(),
              window.grapesjsTinyDocsData.editorInstance.fire('keydown', {
                keyCode: 13,
                shiftKey: !0
              }))
          }
        }
      }
      function injectEditorInstant(e, t) {
        function n(e, t, n) {
          var i = document.createElement(e)
          return o(i, n), t && t.appendChild(i), i
        }
        function o(e, t) {
          if (t) for (var n in t) 'object' === _typeof(t[n]) ? o(e[n], t[n]) : (e[n] = t[n])
        }
        var i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
          r = JSON.parse(decodeURI(t))
        ;(window.grapesjsTinyDocsData.toolbarContainer = n('div', document.body, {
          style: { position: 'absolute', top: '0px', bottom: '0px', height: 'min-content' }
        })),
          window.grapesjsTinyDocsData.toolbarContainer.addEventListener('mousedown', function (e) {
            e.stopPropagation(), e.stopImmediatePropagation()
          }),
          (window.grapesjsTinyDocsData.editedEl = document.body.querySelector(e)),
          (window.grapesjsTinyDocsData.forceBr = i),
          i &&
            window.grapesjsTinyDocsData.editedEl.addEventListener(
              'keydown',
              window.grapesjsTinyDocsData.editorClickHandler
            ),
          tinymce
            .init({
              selector: e,
              inline: !0,
              menubar: !1,
              newline_behavior: 'default',
              plugins: r.plugins,
              toolbar: r.toolbar,
              fixed_toolbar_container_target: n(
                'div',
                window.grapesjsTinyDocsData.toolbarContainer,
                {}
              ),
              init_instance_callback: function (e) {
                window.grapesjsTinyDocsData.editorInstance = e
              }
            })
            .then(function (e) {
              ;(window.grapesjsTinyDocsData.tinymceInstant = e[0]), e[0].focus()
            })
      }
      Object.defineProperty(exports, '__esModule', { value: !0 })
      var _typeof =
          'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
            ? function (e) {
                return typeof e
              }
            : function (e) {
                return e &&
                  'function' == typeof Symbol &&
                  e.constructor === Symbol &&
                  e !== Symbol.prototype
                  ? 'symbol'
                  : typeof e
              },
        _createClass = (function () {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var o = t[n]
              ;(o.enumerable = o.enumerable || !1),
                (o.configurable = !0),
                'value' in o && (o.writable = !0),
                Object.defineProperty(e, o.key, o)
            }
          }
          return function (t, n, o) {
            return n && e(t.prototype, n), o && e(t, o), t
          }
        })()
      exports.default = function (editor, options) {
        // eval(
        //   (function (e, t, n, o, i, r) {
        //     if (((i = String), !''.replace(/^/, String))) {
        //       for (; n--; ) r[n] = o[n] || n
        //       ;(o = [
        //         function (e) {
        //           return r[e]
        //         }
        //       ]),
        //         (i = function () {
        //           return '\\w+'
        //         }),
        //         (n = 1)
        //     }
        //     for (; n--; ) o[n] && (e = e.replace(new RegExp('\\b' + i(n) + '\\b', 'g'), o[n]))
        //     return e
        //   })(
        //     "0(1.2!='3.4'){5 6 7('8 9');}",
        //     0,
        //     10,
        //     'if|location|hostname|devfuture|pro|throw|new|Error|Something|wrong'.split('|'),
        //     0,
        //     {}
        //   )
        // ),
        new TinyForGrapesJs(editor, options)
        // eval(
        //   (function (e, t, n, o, i, r) {
        //     if (((i = String), !''.replace(/^/, String))) {
        //       for (; n--; ) r[n] = o[n] || n
        //       ;(o = [
        //         function (e) {
        //           return r[e]
        //         }
        //       ]),
        //         (i = function () {
        //           return '\\w+'
        //         }),
        //         (n = 1)
        //     }
        //     for (; n--; ) o[n] && (e = e.replace(new RegExp('\\b' + i(n) + '\\b', 'g'), o[n]))
        //     return e
        //   })(
        //     "0(1.2!='3.4'){5 6 7('8 9');}",
        //     0,
        //     10,
        //     'if|location|hostname|devfuture|pro|throw|new|Error|Something|wrong'.split('|'),
        //     0,
        //     {}
        //   )
        // )
      }
      var TinyForGrapesJs = (function () {
        function e(t, n) {
          _classCallCheck(this, e),
            this.injectEditorModule(n['tinymce-module']),
            (this._TinyForGrapesJsData = {
              editor: t,
              el: null,
              toolBarMObserver: new MutationObserver(this.onResize.bind(this)),
              elementObserver: new MutationObserver(this.onResize.bind(this)),
              editorOptions: n
            }),
            t.RichTextEditor.getAll()
              .map(function (e) {
                return e.name
              })
              .forEach(function (e) {
                return t.RichTextEditor.remove(e)
              }),
            t.on('frame:load:before', function (e) {
              var t = e.el,
                n = t.contentDocument
              ;(n.doctype && 'html' === n.doctype.nodeName.toLowerCase()) ||
                (n.open(), n.write('<!DOCTYPE html>'), n.close())
            }),
            t.setCustomRte({ enable: this.enable.bind(this), disable: this.disable.bind(this) })
        }
        return (
          _createClass(e, [
            {
              key: 'injectEditorModule',
              value: function (e) {
                var t = this
                setTimeout(function () {
                  var n = t.frameBody
                  n && '' !== n.innerHTML
                    ? (createHtmlElem('script', n, { src: e }),
                      createHtmlElem('script', n, {
                        innerHTML:
                          'function ' +
                          injectEditorInstant.name +
                          '(t,e,n=!1){let a=JSON.parse(decodeURI(e));function o(t,e,n){let a=document.createElement(t);return function t(e,n){if(n)for(let a in n)"object"==typeof n[a]?t(e[a],n[a]):e[a]=n[a]}(a,n),e&&e.appendChild(a),a}window.grapesjsTinyDocsData.toolbarContainer=o("div",document.body,{style:{position:"absolute",top:"0px",bottom:"0px",height:"min-content"}}),window.grapesjsTinyDocsData.toolbarContainer.addEventListener("mousedown",t=>{t.stopPropagation(),t.stopImmediatePropagation()}),window.grapesjsTinyDocsData.editedEl=document.body.querySelector(t),window.grapesjsTinyDocsData.forceBr=n,n&&window.grapesjsTinyDocsData.editedEl.addEventListener("keydown",window.grapesjsTinyDocsData.editorClickHandler),tinymce.init({selector:t,inline:!0,menubar:!1,newline_behavior:"default",plugins:a.plugins,toolbar:a.toolbar,fixed_toolbar_container_target:o("div",window.grapesjsTinyDocsData.toolbarContainer,{}),init_instance_callback:function(t){window.grapesjsTinyDocsData.editorInstance=t}}).then(t=>{window.grapesjsTinyDocsData.tinymceInstant=t[0],t[0].focus()})}'
                      }),
                      t.executeInFrame('(' + injectDataStorage.toString() + ')()'),
                      t.frameContext.addEventListener('scroll', t.onResize.bind(t)),
                      t.frameContext.addEventListener('resize', t.onResize.bind(t)))
                    : t.injectEditorModule(e)
                }, 100)
              }
            },
            {
              key: 'getElementId',
              value: function (e) {
                return (e.id =
                  '' === e.id || null === e.id || void 0 === e.id
                    ? 'tinymce_target_el_' + this.uniqId
                    : e.id)
              }
            },
            {
              key: 'enable',
              value: function (e, t) {
                this.el = e
                var n = e,
                  o = this.editorOptions,
                  i = 'false'
                if (Array.isArray(o.inline) && o.inline.includes(e.tagName.toLowerCase()))
                  (o = { toolbar: o.inline_toolbar || o.toolbar, plugins: o.plugins }), (i = 'true')
                else {
                  var r = e.innerHTML
                  ;(e.innerHTML = ''),
                    (n = createHtmlElem('div', e, { innerHTML: r, style: { outline: 'none' } })),
                    (o = { toolbar: o.toolbar, plugins: o.plugins })
                }
                return (
                  this.executeInFrame(
                    injectEditorInstant.name +
                      "('#" +
                      this.getElementId(n) +
                      '\',"' +
                      encodeURI(JSON.stringify(o)) +
                      '",' +
                      i +
                      ');'
                  ),
                  this.toolBarMObserver.observe(this.toolbarContainer.firstChild, {
                    subtree: !0,
                    childList: !0,
                    attributes: !0
                  }),
                  this.elementObserver.observe(this.el, {
                    subtree: !0,
                    childList: !0,
                    attributes: !0
                  }),
                  setTimeout(this.onResize.bind(this)),
                  this
                )
              }
            },
            {
              key: 'getContent',
              value: function () {
                return this.tinymceInstant ? this.tinymceInstant.bodyElement.innerHTML : ''
              }
            },
            {
              key: 'disable',
              value: function (e, t) {
                var n = this
                ;(this.el = null),
                  this.toolBarMObserver.disconnect(),
                  this.elementObserver.disconnect(),
                  setTimeout(function () {
                    n.executeInFrame(
                      "if (window.grapesjsTinyDocsData.tinymceInstant) {window.grapesjsTinyDocsData.tinymceInstant.destroy();window.grapesjsTinyDocsData.toolbarContainer.remove();window.grapesjsTinyDocsData.tinymceInstant=null;window.grapesjsTinyDocsData.forceBr && window.grapesjsTinyDocsData.editedEl.removeEventListener('keydown',window.grapesjsTinyDocsData.editorClickHandler);}"
                    )
                  })
              }
            },
            {
              key: 'executeInFrame',
              value: function (e) {
                createHtmlElem('script', this.frameBody, { innerHTML: e }).remove()
              }
            },
            {
              key: 'positionToolbar',
              value: function () {
                if (this.toolbarContainer.firstChild.firstChild) {
                  ;(this.toolbarContainer.style.display = ''),
                    (this.toolbarContainer.style.top = '0px'),
                    (this.toolbarContainer.style.left = '0px')
                  var e = this.editor.RichTextEditor.getToolbarEl(),
                    t = e.parentElement.querySelector('.gjs-toolbar'),
                    n = (t && t.getBoundingClientRect()) || { width: 0, height: 0, bottom: 0 },
                    o = this.toolbarContainer.getBoundingClientRect(),
                    i = this.el.getBoundingClientRect(),
                    r = void 0,
                    a = void 0,
                    s = o.width > i.width - n.width - 1
                  s
                    ? ((r = i.left - (o.width - i.width) / 2 + this.frameScrollX),
                      r + o.width > this.frameBody.offsetWidth &&
                        (r -= r + o.width - this.frameBody.offsetWidth + 5),
                      r < this.frameScrollX && (r = this.frameScrollX))
                    : (r = i.left + this.frameScrollX),
                    (this.toolbarContainer.style.left = r + 'px'),
                    (o = this.toolbarContainer.getBoundingClientRect()),
                    (a = i.top + this.frameScrollY - o.height - 1 - (s ? n.height : 0)),
                    a <= this.frameScrollY &&
                      (a =
                        i.bottom +
                        this.frameScrollY +
                        1 +
                        (s && n.bottom > i.bottom ? n.height : 0)),
                    (this.toolbarContainer.style.top = a + 'px')
                } else this.toolbarContainer.style.display = 'none'
              }
            },
            {
              key: 'onResize',
              value: function () {
                var e = this
                this.isActive &&
                  setTimeout(function () {
                    e.positionToolbar()
                  })
              }
            },
            {
              key: 'editorOptions',
              get: function () {
                return this._TinyForGrapesJsData.editorOptions
              }
            },
            {
              key: 'toolBarMObserver',
              get: function () {
                return this._TinyForGrapesJsData.toolBarMObserver
              }
            },
            {
              key: 'elementObserver',
              get: function () {
                return this._TinyForGrapesJsData.elementObserver
              }
            },
            {
              key: 'editor',
              get: function () {
                return this._TinyForGrapesJsData.editor
              }
            },
            {
              key: 'el',
              get: function () {
                return this._TinyForGrapesJsData.el
              },
              set: function (e) {
                this._TinyForGrapesJsData.el = e
              }
            },
            {
              key: 'uniqId',
              get: function () {
                return e.constructor.uniqId++
              }
            },
            {
              key: 'frameDocument',
              get: function () {
                var e = document.querySelector('iframe')
                return e && e.contentDocument
              }
            },
            {
              key: 'frameBody',
              get: function () {
                var e = this.frameDocument
                return e && e.querySelector('body')
              }
            },
            {
              key: 'frameContext',
              get: function () {
                return window.parent[0]
              }
            },
            {
              key: 'grapesjsTinyDocsData',
              get: function () {
                return this.frameContext && this.frameContext.grapesjsTinyDocsData
              },
              set: function (e) {
                this.frameContext && (this.frameContext.grapesjsTinyDocsData = e)
              }
            },
            {
              key: 'tinymceInstant',
              get: function () {
                return this.grapesjsTinyDocsData && this.grapesjsTinyDocsData.tinymceInstant
              }
            },
            {
              key: 'toolbarContainer',
              get: function () {
                return this.grapesjsTinyDocsData && this.grapesjsTinyDocsData.toolbarContainer
              }
            },
            {
              key: 'frameScrollY',
              get: function () {
                return this.frameContext ? this.frameContext.scrollY : 0
              }
            },
            {
              key: 'frameScrollX',
              get: function () {
                return this.frameContext ? this.frameContext.scrollX : 0
              }
            },
            {
              key: 'isActive',
              get: function () {
                return null !== this.el
              }
            }
          ]),
          e
        )
      })()
      TinyForGrapesJs.constructor.uniqId = 0
    }
  ])
})
