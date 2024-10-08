!(function (t, n) {
  'object' == typeof exports && 'undefined' != typeof module
    ? n(exports)
    : 'function' == typeof define && define.amd
    ? define(['exports'], n)
    : n(((t = t || self).racingBars = {}));
})(this, function (t) {
  function n() {
    return (n =
      Object.assign ||
      function (t) {
        for (var n = 1; n < arguments.length; n++) {
          var e = arguments[n];
          for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
        }
        return t;
      }).apply(this, arguments);
  }
  function e(t, n) {
    return t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN;
  }
  var r,
    i,
    o = (1 === (r = e).length &&
      ((i = r),
      (r = function (t, n) {
        return e(i(t), n);
      })),
    {
      left: function (t, n, e, i) {
        for (null == e && (e = 0), null == i && (i = t.length); e < i; ) {
          var o = (e + i) >>> 1;
          r(t[o], n) < 0 ? (e = o + 1) : (i = o);
        }
        return e;
      },
      right: function (t, n, e, i) {
        for (null == e && (e = 0), null == i && (i = t.length); e < i; ) {
          var o = (e + i) >>> 1;
          r(t[o], n) > 0 ? (i = o) : (e = o + 1);
        }
        return e;
      },
    }).right,
    a = Math.sqrt(50),
    u = Math.sqrt(10),
    l = Math.sqrt(2);
  function s(t, n, e) {
    var r = (n - t) / Math.max(0, e),
      i = Math.floor(Math.log(r) / Math.LN10),
      o = r / Math.pow(10, i);
    return i >= 0
      ? (o >= a ? 10 : o >= u ? 5 : o >= l ? 2 : 1) * Math.pow(10, i)
      : -Math.pow(10, -i) / (o >= a ? 10 : o >= u ? 5 : o >= l ? 2 : 1);
  }
  function c(t, n) {
    var e,
      r,
      i = t.length,
      o = -1;
    if (null == n) {
      for (; ++o < i; )
        if (null != (e = t[o]) && e >= e)
          for (r = e; ++o < i; ) null != (e = t[o]) && e > r && (r = e);
    } else for (; ++o < i; ) if (null != (e = n(t[o], o, t)) && e >= e) for (r = e; ++o < i; ) null != (e = n(t[o], o, t)) && e > r && (r = e);
    return r;
  }
  var f = Array.prototype.slice;
  function h(t) {
    return t;
  }
  function d(t) {
    return 'translate(' + (t + 0.5) + ',0)';
  }
  function p(t) {
    return 'translate(0,' + (t + 0.5) + ')';
  }
  function v(t) {
    return function (n) {
      return +t(n);
    };
  }
  function g(t) {
    var n = Math.max(0, t.bandwidth() - 1) / 2;
    return (
      t.round() && (n = Math.round(n)),
      function (e) {
        return +t(e) + n;
      }
    );
  }
  function y() {
    return !this.__axis;
  }
  function m(t, n) {
    var e = [],
      r = null,
      i = null,
      o = 6,
      a = 6,
      u = 3,
      l = 1 === t || 4 === t ? -1 : 1,
      s = 4 === t || 2 === t ? 'x' : 'y',
      c = 1 === t || 3 === t ? d : p;
    function m(f) {
      var d = null == r ? (n.ticks ? n.ticks.apply(n, e) : n.domain()) : r,
        p = null == i ? (n.tickFormat ? n.tickFormat.apply(n, e) : h) : i,
        m = Math.max(o, 0) + u,
        w = n.range(),
        _ = +w[0] + 0.5,
        x = +w[w.length - 1] + 0.5,
        b = (n.bandwidth ? g : v)(n.copy()),
        k = f.selection ? f.selection() : f,
        M = k.selectAll('.domain').data([null]),
        A = k.selectAll('.tick').data(d, n).order(),
        N = A.exit(),
        E = A.enter().append('g').attr('class', 'tick'),
        C = A.select('line'),
        S = A.select('text');
      (M = M.merge(
        M.enter().insert('path', '.tick').attr('class', 'domain').attr('stroke', 'currentColor'),
      )),
        (A = A.merge(E)),
        (C = C.merge(
          E.append('line')
            .attr('stroke', 'currentColor')
            .attr(s + '2', l * o),
        )),
        (S = S.merge(
          E.append('text')
            .attr('fill', 'currentColor')
            .attr(s, l * m)
            .attr('dy', 1 === t ? '0em' : 3 === t ? '0.71em' : '0.32em'),
        )),
        f !== k &&
          ((M = M.transition(f)),
          (A = A.transition(f)),
          (C = C.transition(f)),
          (S = S.transition(f)),
          (N = N.transition(f)
            .attr('opacity', 1e-6)
            .attr('transform', function (t) {
              return isFinite((t = b(t))) ? c(t) : this.getAttribute('transform');
            })),
          E.attr('opacity', 1e-6).attr('transform', function (t) {
            var n = this.parentNode.__axis;
            return c(n && isFinite((n = n(t))) ? n : b(t));
          })),
        N.remove(),
        M.attr(
          'd',
          4 === t || 2 == t
            ? a
              ? 'M' + l * a + ',' + _ + 'H0.5V' + x + 'H' + l * a
              : 'M0.5,' + _ + 'V' + x
            : a
            ? 'M' + _ + ',' + l * a + 'V0.5H' + x + 'V' + l * a
            : 'M' + _ + ',0.5H' + x,
        ),
        A.attr('opacity', 1).attr('transform', function (t) {
          return c(b(t));
        }),
        C.attr(s + '2', l * o),
        S.attr(s, l * m).text(p),
        k
          .filter(y)
          .attr('fill', 'none')
          .attr('font-size', 10)
          .attr('font-family', 'sans-serif')
          .attr('text-anchor', 2 === t ? 'start' : 4 === t ? 'end' : 'middle'),
        k.each(function () {
          this.__axis = b;
        });
    }
    return (
      (m.scale = function (t) {
        return arguments.length ? ((n = t), m) : n;
      }),
      (m.ticks = function () {
        return (e = f.call(arguments)), m;
      }),
      (m.tickArguments = function (t) {
        return arguments.length ? ((e = null == t ? [] : f.call(t)), m) : e.slice();
      }),
      (m.tickValues = function (t) {
        return arguments.length ? ((r = null == t ? null : f.call(t)), m) : r && r.slice();
      }),
      (m.tickFormat = function (t) {
        return arguments.length ? ((i = t), m) : i;
      }),
      (m.tickSize = function (t) {
        return arguments.length ? ((o = a = +t), m) : o;
      }),
      (m.tickSizeInner = function (t) {
        return arguments.length ? ((o = +t), m) : o;
      }),
      (m.tickSizeOuter = function (t) {
        return arguments.length ? ((a = +t), m) : a;
      }),
      (m.tickPadding = function (t) {
        return arguments.length ? ((u = +t), m) : u;
      }),
      m
    );
  }
  function w(t) {
    return m(1, t);
  }
  var _ = { value: function () {} };
  function x() {
    for (var t, n = 0, e = arguments.length, r = {}; n < e; ++n) {
      if (!(t = arguments[n] + '') || t in r || /[\s.]/.test(t))
        throw new Error('illegal type: ' + t);
      r[t] = [];
    }
    return new b(r);
  }
  function b(t) {
    this._ = t;
  }
  function k(t, n) {
    return t
      .trim()
      .split(/^|\s+/)
      .map(function (t) {
        var e = '',
          r = t.indexOf('.');
        if ((r >= 0 && ((e = t.slice(r + 1)), (t = t.slice(0, r))), t && !n.hasOwnProperty(t)))
          throw new Error('unknown type: ' + t);
        return { type: t, name: e };
      });
  }
  function M(t, n) {
    for (var e, r = 0, i = t.length; r < i; ++r) if ((e = t[r]).name === n) return e.value;
  }
  function A(t, n, e) {
    for (var r = 0, i = t.length; r < i; ++r)
      if (t[r].name === n) {
        (t[r] = _), (t = t.slice(0, r).concat(t.slice(r + 1)));
        break;
      }
    return null != e && t.push({ name: n, value: e }), t;
  }
  b.prototype = x.prototype = {
    constructor: b,
    on: function (t, n) {
      var e,
        r = this._,
        i = k(t + '', r),
        o = -1,
        a = i.length;
      if (!(arguments.length < 2)) {
        if (null != n && 'function' != typeof n) throw new Error('invalid callback: ' + n);
        for (; ++o < a; )
          if ((e = (t = i[o]).type)) r[e] = A(r[e], t.name, n);
          else if (null == n) for (e in r) r[e] = A(r[e], t.name, null);
        return this;
      }
      for (; ++o < a; ) if ((e = (t = i[o]).type) && (e = M(r[e], t.name))) return e;
    },
    copy: function () {
      var t = {},
        n = this._;
      for (var e in n) t[e] = n[e].slice();
      return new b(t);
    },
    call: function (t, n) {
      if ((e = arguments.length - 2) > 0)
        for (var e, r, i = new Array(e), o = 0; o < e; ++o) i[o] = arguments[o + 2];
      if (!this._.hasOwnProperty(t)) throw new Error('unknown type: ' + t);
      for (o = 0, e = (r = this._[t]).length; o < e; ++o) r[o].value.apply(n, i);
    },
    apply: function (t, n, e) {
      if (!this._.hasOwnProperty(t)) throw new Error('unknown type: ' + t);
      for (var r = this._[t], i = 0, o = r.length; i < o; ++i) r[i].value.apply(n, e);
    },
  };
  var N = 'http://www.w3.org/1999/xhtml',
    E = {
      svg: 'http://www.w3.org/2000/svg',
      xhtml: N,
      xlink: 'http://www.w3.org/1999/xlink',
      xml: 'http://www.w3.org/XML/1998/namespace',
      xmlns: 'http://www.w3.org/2000/xmlns/',
    };
  function C(t) {
    var n = (t += ''),
      e = n.indexOf(':');
    return (
      e >= 0 && 'xmlns' !== (n = t.slice(0, e)) && (t = t.slice(e + 1)),
      E.hasOwnProperty(n) ? { space: E[n], local: t } : t
    );
  }
  function S(t) {
    return function () {
      var n = this.ownerDocument,
        e = this.namespaceURI;
      return e === N && n.documentElement.namespaceURI === N
        ? n.createElement(t)
        : n.createElementNS(e, t);
    };
  }
  function D(t) {
    return function () {
      return this.ownerDocument.createElementNS(t.space, t.local);
    };
  }
  function j(t) {
    var n = C(t);
    return (n.local ? D : S)(n);
  }
  function T() {}
  function F(t) {
    return null == t
      ? T
      : function () {
          return this.querySelector(t);
        };
  }
  function L() {
    return [];
  }
  function O(t) {
    return null == t
      ? L
      : function () {
          return this.querySelectorAll(t);
        };
  }
  function Y(t) {
    return function () {
      return this.matches(t);
    };
  }
  function H(t) {
    return new Array(t.length);
  }
  function P(t, n) {
    (this.ownerDocument = t.ownerDocument),
      (this.namespaceURI = t.namespaceURI),
      (this._next = null),
      (this._parent = t),
      (this.__data__ = n);
  }
  function V(t, n, e, r, i, o) {
    for (var a, u = 0, l = n.length, s = o.length; u < s; ++u)
      (a = n[u]) ? ((a.__data__ = o[u]), (r[u] = a)) : (e[u] = new P(t, o[u]));
    for (; u < l; ++u) (a = n[u]) && (i[u] = a);
  }
  function R(t, n, e, r, i, o, a) {
    var u,
      l,
      s,
      c = {},
      f = n.length,
      h = o.length,
      d = new Array(f);
    for (u = 0; u < f; ++u)
      (l = n[u]) &&
        ((d[u] = s = '$' + a.call(l, l.__data__, u, n)), s in c ? (i[u] = l) : (c[s] = l));
    for (u = 0; u < h; ++u)
      (l = c[(s = '$' + a.call(t, o[u], u, o))])
        ? ((r[u] = l), (l.__data__ = o[u]), (c[s] = null))
        : (e[u] = new P(t, o[u]));
    for (u = 0; u < f; ++u) (l = n[u]) && c[d[u]] === l && (i[u] = l);
  }
  function B(t, n) {
    return t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN;
  }
  function z(t) {
    return function () {
      this.removeAttribute(t);
    };
  }
  function q(t) {
    return function () {
      this.removeAttributeNS(t.space, t.local);
    };
  }
  function I(t, n) {
    return function () {
      this.setAttribute(t, n);
    };
  }
  function W(t, n) {
    return function () {
      this.setAttributeNS(t.space, t.local, n);
    };
  }
  function X(t, n) {
    return function () {
      var e = n.apply(this, arguments);
      null == e ? this.removeAttribute(t) : this.setAttribute(t, e);
    };
  }
  function $(t, n) {
    return function () {
      var e = n.apply(this, arguments);
      null == e
        ? this.removeAttributeNS(t.space, t.local)
        : this.setAttributeNS(t.space, t.local, e);
    };
  }
  function U(t) {
    return (t.ownerDocument && t.ownerDocument.defaultView) || (t.document && t) || t.defaultView;
  }
  function Z(t) {
    return function () {
      this.style.removeProperty(t);
    };
  }
  function G(t, n, e) {
    return function () {
      this.style.setProperty(t, n, e);
    };
  }
  function J(t, n, e) {
    return function () {
      var r = n.apply(this, arguments);
      null == r ? this.style.removeProperty(t) : this.style.setProperty(t, r, e);
    };
  }
  function K(t, n) {
    return t.style.getPropertyValue(n) || U(t).getComputedStyle(t, null).getPropertyValue(n);
  }
  function Q(t) {
    return function () {
      delete this[t];
    };
  }
  function tt(t, n) {
    return function () {
      this[t] = n;
    };
  }
  function nt(t, n) {
    return function () {
      var e = n.apply(this, arguments);
      null == e ? delete this[t] : (this[t] = e);
    };
  }
  function et(t) {
    return t.trim().split(/^|\s+/);
  }
  function rt(t) {
    return t.classList || new it(t);
  }
  function it(t) {
    (this._node = t), (this._names = et(t.getAttribute('class') || ''));
  }
  function ot(t, n) {
    for (var e = rt(t), r = -1, i = n.length; ++r < i; ) e.add(n[r]);
  }
  function at(t, n) {
    for (var e = rt(t), r = -1, i = n.length; ++r < i; ) e.remove(n[r]);
  }
  function ut(t) {
    return function () {
      ot(this, t);
    };
  }
  function lt(t) {
    return function () {
      at(this, t);
    };
  }
  function st(t, n) {
    return function () {
      (n.apply(this, arguments) ? ot : at)(this, t);
    };
  }
  function ct() {
    this.textContent = '';
  }
  function ft(t) {
    return function () {
      this.textContent = t;
    };
  }
  function ht(t) {
    return function () {
      var n = t.apply(this, arguments);
      this.textContent = null == n ? '' : n;
    };
  }
  function dt() {
    this.innerHTML = '';
  }
  function pt(t) {
    return function () {
      this.innerHTML = t;
    };
  }
  function vt(t) {
    return function () {
      var n = t.apply(this, arguments);
      this.innerHTML = null == n ? '' : n;
    };
  }
  function gt() {
    this.nextSibling && this.parentNode.appendChild(this);
  }
  function yt() {
    this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
  }
  function mt() {
    return null;
  }
  function wt() {
    var t = this.parentNode;
    t && t.removeChild(this);
  }
  function _t() {
    var t = this.cloneNode(!1),
      n = this.parentNode;
    return n ? n.insertBefore(t, this.nextSibling) : t;
  }
  function xt() {
    var t = this.cloneNode(!0),
      n = this.parentNode;
    return n ? n.insertBefore(t, this.nextSibling) : t;
  }
  (P.prototype = {
    constructor: P,
    appendChild: function (t) {
      return this._parent.insertBefore(t, this._next);
    },
    insertBefore: function (t, n) {
      return this._parent.insertBefore(t, n);
    },
    querySelector: function (t) {
      return this._parent.querySelector(t);
    },
    querySelectorAll: function (t) {
      return this._parent.querySelectorAll(t);
    },
  }),
    (it.prototype = {
      add: function (t) {
        this._names.indexOf(t) < 0 &&
          (this._names.push(t), this._node.setAttribute('class', this._names.join(' ')));
      },
      remove: function (t) {
        var n = this._names.indexOf(t);
        n >= 0 &&
          (this._names.splice(n, 1), this._node.setAttribute('class', this._names.join(' ')));
      },
      contains: function (t) {
        return this._names.indexOf(t) >= 0;
      },
    });
  var bt = {};
  function kt(t, n, e) {
    return (
      (t = Mt(t, n, e)),
      function (n) {
        var e = n.relatedTarget;
        (e && (e === this || 8 & e.compareDocumentPosition(this))) || t.call(this, n);
      }
    );
  }
  function Mt(t, n, e) {
    return function (r) {
      try {
        t.call(this, this.__data__, n, e);
      } finally {
      }
    };
  }
  function At(t) {
    return t
      .trim()
      .split(/^|\s+/)
      .map(function (t) {
        var n = '',
          e = t.indexOf('.');
        return e >= 0 && ((n = t.slice(e + 1)), (t = t.slice(0, e))), { type: t, name: n };
      });
  }
  function Nt(t) {
    return function () {
      var n = this.__on;
      if (n) {
        for (var e, r = 0, i = -1, o = n.length; r < o; ++r)
          (e = n[r]),
            (t.type && e.type !== t.type) || e.name !== t.name
              ? (n[++i] = e)
              : this.removeEventListener(e.type, e.listener, e.capture);
        ++i ? (n.length = i) : delete this.__on;
      }
    };
  }
  function Et(t, n, e) {
    var r = bt.hasOwnProperty(t.type) ? kt : Mt;
    return function (i, o, a) {
      var u,
        l = this.__on,
        s = r(n, o, a);
      if (l)
        for (var c = 0, f = l.length; c < f; ++c)
          if ((u = l[c]).type === t.type && u.name === t.name)
            return (
              this.removeEventListener(u.type, u.listener, u.capture),
              this.addEventListener(u.type, (u.listener = s), (u.capture = e)),
              void (u.value = n)
            );
      this.addEventListener(t.type, s, e),
        (u = { type: t.type, name: t.name, value: n, listener: s, capture: e }),
        l ? l.push(u) : (this.__on = [u]);
    };
  }
  function Ct(t, n, e) {
    var r = U(t),
      i = r.CustomEvent;
    'function' == typeof i
      ? (i = new i(n, e))
      : ((i = r.document.createEvent('Event')),
        e
          ? (i.initEvent(n, e.bubbles, e.cancelable), (i.detail = e.detail))
          : i.initEvent(n, !1, !1)),
      t.dispatchEvent(i);
  }
  function St(t, n) {
    return function () {
      return Ct(this, t, n);
    };
  }
  function Dt(t, n) {
    return function () {
      return Ct(this, t, n.apply(this, arguments));
    };
  }
  'undefined' != typeof document &&
    ('onmouseenter' in document.documentElement ||
      (bt = { mouseenter: 'mouseover', mouseleave: 'mouseout' }));
  var jt = [null];
  function Tt(t, n) {
    (this._groups = t), (this._parents = n);
  }
  function Ft() {
    return new Tt([[document.documentElement]], jt);
  }
  function Lt(t) {
    return 'string' == typeof t
      ? new Tt([[document.querySelector(t)]], [document.documentElement])
      : new Tt([[t]], jt);
  }
  function Ot(t, n, e) {
    (t.prototype = n.prototype = e), (e.constructor = t);
  }
  function Yt(t, n) {
    var e = Object.create(t.prototype);
    for (var r in n) e[r] = n[r];
    return e;
  }
  function Ht() {}
  Tt.prototype = Ft.prototype = {
    constructor: Tt,
    select: function (t) {
      'function' != typeof t && (t = F(t));
      for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
        for (var o, a, u = n[i], l = u.length, s = (r[i] = new Array(l)), c = 0; c < l; ++c)
          (o = u[c]) &&
            (a = t.call(o, o.__data__, c, u)) &&
            ('__data__' in o && (a.__data__ = o.__data__), (s[c] = a));
      return new Tt(r, this._parents);
    },
    selectAll: function (t) {
      'function' != typeof t && (t = O(t));
      for (var n = this._groups, e = n.length, r = [], i = [], o = 0; o < e; ++o)
        for (var a, u = n[o], l = u.length, s = 0; s < l; ++s)
          (a = u[s]) && (r.push(t.call(a, a.__data__, s, u)), i.push(a));
      return new Tt(r, i);
    },
    filter: function (t) {
      'function' != typeof t && (t = Y(t));
      for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
        for (var o, a = n[i], u = a.length, l = (r[i] = []), s = 0; s < u; ++s)
          (o = a[s]) && t.call(o, o.__data__, s, a) && l.push(o);
      return new Tt(r, this._parents);
    },
    data: function (t, n) {
      if (!t)
        return (
          (p = new Array(this.size())),
          (c = -1),
          this.each(function (t) {
            p[++c] = t;
          }),
          p
        );
      var e,
        r = n ? R : V,
        i = this._parents,
        o = this._groups;
      'function' != typeof t &&
        ((e = t),
        (t = function () {
          return e;
        }));
      for (
        var a = o.length, u = new Array(a), l = new Array(a), s = new Array(a), c = 0;
        c < a;
        ++c
      ) {
        var f = i[c],
          h = o[c],
          d = h.length,
          p = t.call(f, f && f.__data__, c, i),
          v = p.length,
          g = (l[c] = new Array(v)),
          y = (u[c] = new Array(v));
        r(f, h, g, y, (s[c] = new Array(d)), p, n);
        for (var m, w, _ = 0, x = 0; _ < v; ++_)
          if ((m = g[_])) {
            for (_ >= x && (x = _ + 1); !(w = y[x]) && ++x < v; );
            m._next = w || null;
          }
      }
      return ((u = new Tt(u, i))._enter = l), (u._exit = s), u;
    },
    enter: function () {
      return new Tt(this._enter || this._groups.map(H), this._parents);
    },
    exit: function () {
      return new Tt(this._exit || this._groups.map(H), this._parents);
    },
    join: function (t, n, e) {
      var r = this.enter(),
        i = this,
        o = this.exit();
      return (
        (r = 'function' == typeof t ? t(r) : r.append(t + '')),
        null != n && (i = n(i)),
        null == e ? o.remove() : e(o),
        r && i ? r.merge(i).order() : i
      );
    },
    merge: function (t) {
      for (
        var n = this._groups,
          e = t._groups,
          r = n.length,
          i = Math.min(r, e.length),
          o = new Array(r),
          a = 0;
        a < i;
        ++a
      )
        for (var u, l = n[a], s = e[a], c = l.length, f = (o[a] = new Array(c)), h = 0; h < c; ++h)
          (u = l[h] || s[h]) && (f[h] = u);
      for (; a < r; ++a) o[a] = n[a];
      return new Tt(o, this._parents);
    },
    order: function () {
      for (var t = this._groups, n = -1, e = t.length; ++n < e; )
        for (var r, i = t[n], o = i.length - 1, a = i[o]; --o >= 0; )
          (r = i[o]) &&
            (a && 4 ^ r.compareDocumentPosition(a) && a.parentNode.insertBefore(r, a), (a = r));
      return this;
    },
    sort: function (t) {
      function n(n, e) {
        return n && e ? t(n.__data__, e.__data__) : !n - !e;
      }
      t || (t = B);
      for (var e = this._groups, r = e.length, i = new Array(r), o = 0; o < r; ++o) {
        for (var a, u = e[o], l = u.length, s = (i[o] = new Array(l)), c = 0; c < l; ++c)
          (a = u[c]) && (s[c] = a);
        s.sort(n);
      }
      return new Tt(i, this._parents).order();
    },
    call: function () {
      var t = arguments[0];
      return (arguments[0] = this), t.apply(null, arguments), this;
    },
    nodes: function () {
      var t = new Array(this.size()),
        n = -1;
      return (
        this.each(function () {
          t[++n] = this;
        }),
        t
      );
    },
    node: function () {
      for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
        for (var r = t[n], i = 0, o = r.length; i < o; ++i) {
          var a = r[i];
          if (a) return a;
        }
      return null;
    },
    size: function () {
      var t = 0;
      return (
        this.each(function () {
          ++t;
        }),
        t
      );
    },
    empty: function () {
      return !this.node();
    },
    each: function (t) {
      for (var n = this._groups, e = 0, r = n.length; e < r; ++e)
        for (var i, o = n[e], a = 0, u = o.length; a < u; ++a)
          (i = o[a]) && t.call(i, i.__data__, a, o);
      return this;
    },
    attr: function (t, n) {
      var e = C(t);
      if (arguments.length < 2) {
        var r = this.node();
        return e.local ? r.getAttributeNS(e.space, e.local) : r.getAttribute(e);
      }
      return this.each(
        (null == n
          ? e.local
            ? q
            : z
          : 'function' == typeof n
          ? e.local
            ? $
            : X
          : e.local
          ? W
          : I)(e, n),
      );
    },
    style: function (t, n, e) {
      return arguments.length > 1
        ? this.each((null == n ? Z : 'function' == typeof n ? J : G)(t, n, null == e ? '' : e))
        : K(this.node(), t);
    },
    property: function (t, n) {
      return arguments.length > 1
        ? this.each((null == n ? Q : 'function' == typeof n ? nt : tt)(t, n))
        : this.node()[t];
    },
    classed: function (t, n) {
      var e = et(t + '');
      if (arguments.length < 2) {
        for (var r = rt(this.node()), i = -1, o = e.length; ++i < o; )
          if (!r.contains(e[i])) return !1;
        return !0;
      }
      return this.each(('function' == typeof n ? st : n ? ut : lt)(e, n));
    },
    text: function (t) {
      return arguments.length
        ? this.each(null == t ? ct : ('function' == typeof t ? ht : ft)(t))
        : this.node().textContent;
    },
    html: function (t) {
      return arguments.length
        ? this.each(null == t ? dt : ('function' == typeof t ? vt : pt)(t))
        : this.node().innerHTML;
    },
    raise: function () {
      return this.each(gt);
    },
    lower: function () {
      return this.each(yt);
    },
    append: function (t) {
      var n = 'function' == typeof t ? t : j(t);
      return this.select(function () {
        return this.appendChild(n.apply(this, arguments));
      });
    },
    insert: function (t, n) {
      var e = 'function' == typeof t ? t : j(t),
        r = null == n ? mt : 'function' == typeof n ? n : F(n);
      return this.select(function () {
        return this.insertBefore(e.apply(this, arguments), r.apply(this, arguments) || null);
      });
    },
    remove: function () {
      return this.each(wt);
    },
    clone: function (t) {
      return this.select(t ? xt : _t);
    },
    datum: function (t) {
      return arguments.length ? this.property('__data__', t) : this.node().__data__;
    },
    on: function (t, n, e) {
      var r,
        i,
        o = At(t + ''),
        a = o.length;
      if (!(arguments.length < 2)) {
        for (u = n ? Et : Nt, null == e && (e = !1), r = 0; r < a; ++r) this.each(u(o[r], n, e));
        return this;
      }
      var u = this.node().__on;
      if (u)
        for (var l, s = 0, c = u.length; s < c; ++s)
          for (r = 0, l = u[s]; r < a; ++r)
            if ((i = o[r]).type === l.type && i.name === l.name) return l.value;
    },
    dispatch: function (t, n) {
      return this.each(('function' == typeof n ? Dt : St)(t, n));
    },
  };
  var Pt = '\\s*([+-]?\\d+)\\s*',
    Vt = '\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*',
    Rt = '\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*',
    Bt = /^#([0-9a-f]{3,8})$/,
    zt = new RegExp('^rgb\\(' + [Pt, Pt, Pt] + '\\)$'),
    qt = new RegExp('^rgb\\(' + [Rt, Rt, Rt] + '\\)$'),
    It = new RegExp('^rgba\\(' + [Pt, Pt, Pt, Vt] + '\\)$'),
    Wt = new RegExp('^rgba\\(' + [Rt, Rt, Rt, Vt] + '\\)$'),
    Xt = new RegExp('^hsl\\(' + [Vt, Rt, Rt] + '\\)$'),
    $t = new RegExp('^hsla\\(' + [Vt, Rt, Rt, Vt] + '\\)$'),
    Ut = {
      aliceblue: 15792383,
      antiquewhite: 16444375,
      aqua: 65535,
      aquamarine: 8388564,
      azure: 15794175,
      beige: 16119260,
      bisque: 16770244,
      black: 0,
      blanchedalmond: 16772045,
      blue: 255,
      blueviolet: 9055202,
      brown: 10824234,
      burlywood: 14596231,
      cadetblue: 6266528,
      chartreuse: 8388352,
      chocolate: 13789470,
      coral: 16744272,
      cornflowerblue: 6591981,
      cornsilk: 16775388,
      crimson: 14423100,
      cyan: 65535,
      darkblue: 139,
      darkcyan: 35723,
      darkgoldenrod: 12092939,
      darkgray: 11119017,
      darkgreen: 25600,
      darkgrey: 11119017,
      darkkhaki: 12433259,
      darkmagenta: 9109643,
      darkolivegreen: 5597999,
      darkorange: 16747520,
      darkorchid: 10040012,
      darkred: 9109504,
      darksalmon: 15308410,
      darkseagreen: 9419919,
      darkslateblue: 4734347,
      darkslategray: 3100495,
      darkslategrey: 3100495,
      darkturquoise: 52945,
      darkviolet: 9699539,
      deeppink: 16716947,
      deepskyblue: 49151,
      dimgray: 6908265,
      dimgrey: 6908265,
      dodgerblue: 2003199,
      firebrick: 11674146,
      floralwhite: 16775920,
      forestgreen: 2263842,
      fuchsia: 16711935,
      gainsboro: 14474460,
      ghostwhite: 16316671,
      gold: 16766720,
      goldenrod: 14329120,
      gray: 8421504,
      green: 32768,
      greenyellow: 11403055,
      grey: 8421504,
      honeydew: 15794160,
      hotpink: 16738740,
      indianred: 13458524,
      indigo: 4915330,
      ivory: 16777200,
      khaki: 15787660,
      lavender: 15132410,
      lavenderblush: 16773365,
      lawngreen: 8190976,
      lemonchiffon: 16775885,
      lightblue: 11393254,
      lightcoral: 15761536,
      lightcyan: 14745599,
      lightgoldenrodyellow: 16448210,
      lightgray: 13882323,
      lightgreen: 9498256,
      lightgrey: 13882323,
      lightpink: 16758465,
      lightsalmon: 16752762,
      lightseagreen: 2142890,
      lightskyblue: 8900346,
      lightslategray: 7833753,
      lightslategrey: 7833753,
      lightsteelblue: 11584734,
      lightyellow: 16777184,
      lime: 65280,
      limegreen: 3329330,
      linen: 16445670,
      magenta: 16711935,
      maroon: 8388608,
      mediumaquamarine: 6737322,
      mediumblue: 205,
      mediumorchid: 12211667,
      mediumpurple: 9662683,
      mediumseagreen: 3978097,
      mediumslateblue: 8087790,
      mediumspringgreen: 64154,
      mediumturquoise: 4772300,
      mediumvioletred: 13047173,
      midnightblue: 1644912,
      mintcream: 16121850,
      mistyrose: 16770273,
      moccasin: 16770229,
      navajowhite: 16768685,
      navy: 128,
      oldlace: 16643558,
      olive: 8421376,
      olivedrab: 7048739,
      orange: 16753920,
      orangered: 16729344,
      orchid: 14315734,
      palegoldenrod: 15657130,
      palegreen: 10025880,
      paleturquoise: 11529966,
      palevioletred: 14381203,
      papayawhip: 16773077,
      peachpuff: 16767673,
      peru: 13468991,
      pink: 16761035,
      plum: 14524637,
      powderblue: 11591910,
      purple: 8388736,
      rebeccapurple: 6697881,
      red: 16711680,
      rosybrown: 12357519,
      royalblue: 4286945,
      saddlebrown: 9127187,
      salmon: 16416882,
      sandybrown: 16032864,
      seagreen: 3050327,
      seashell: 16774638,
      sienna: 10506797,
      silver: 12632256,
      skyblue: 8900331,
      slateblue: 6970061,
      slategray: 7372944,
      slategrey: 7372944,
      snow: 16775930,
      springgreen: 65407,
      steelblue: 4620980,
      tan: 13808780,
      teal: 32896,
      thistle: 14204888,
      tomato: 16737095,
      turquoise: 4251856,
      violet: 15631086,
      wheat: 16113331,
      white: 16777215,
      whitesmoke: 16119285,
      yellow: 16776960,
      yellowgreen: 10145074,
    };
  function Zt() {
    return this.rgb().formatHex();
  }
  function Gt() {
    return this.rgb().formatRgb();
  }
  function Jt(t) {
    var n, e;
    return (
      (t = (t + '').trim().toLowerCase()),
      (n = Bt.exec(t))
        ? ((e = n[1].length),
          (n = parseInt(n[1], 16)),
          6 === e
            ? Kt(n)
            : 3 === e
            ? new en(
                ((n >> 8) & 15) | ((n >> 4) & 240),
                ((n >> 4) & 15) | (240 & n),
                ((15 & n) << 4) | (15 & n),
                1,
              )
            : 8 === e
            ? Qt((n >> 24) & 255, (n >> 16) & 255, (n >> 8) & 255, (255 & n) / 255)
            : 4 === e
            ? Qt(
                ((n >> 12) & 15) | ((n >> 8) & 240),
                ((n >> 8) & 15) | ((n >> 4) & 240),
                ((n >> 4) & 15) | (240 & n),
                (((15 & n) << 4) | (15 & n)) / 255,
              )
            : null)
        : (n = zt.exec(t))
        ? new en(n[1], n[2], n[3], 1)
        : (n = qt.exec(t))
        ? new en((255 * n[1]) / 100, (255 * n[2]) / 100, (255 * n[3]) / 100, 1)
        : (n = It.exec(t))
        ? Qt(n[1], n[2], n[3], n[4])
        : (n = Wt.exec(t))
        ? Qt((255 * n[1]) / 100, (255 * n[2]) / 100, (255 * n[3]) / 100, n[4])
        : (n = Xt.exec(t))
        ? un(n[1], n[2] / 100, n[3] / 100, 1)
        : (n = $t.exec(t))
        ? un(n[1], n[2] / 100, n[3] / 100, n[4])
        : Ut.hasOwnProperty(t)
        ? Kt(Ut[t])
        : 'transparent' === t
        ? new en(NaN, NaN, NaN, 0)
        : null
    );
  }
  function Kt(t) {
    return new en((t >> 16) & 255, (t >> 8) & 255, 255 & t, 1);
  }
  function Qt(t, n, e, r) {
    return r <= 0 && (t = n = e = NaN), new en(t, n, e, r);
  }
  function tn(t) {
    return (
      t instanceof Ht || (t = Jt(t)), t ? new en((t = t.rgb()).r, t.g, t.b, t.opacity) : new en()
    );
  }
  function nn(t, n, e, r) {
    return 1 === arguments.length ? tn(t) : new en(t, n, e, null == r ? 1 : r);
  }
  function en(t, n, e, r) {
    (this.r = +t), (this.g = +n), (this.b = +e), (this.opacity = +r);
  }
  function rn() {
    return '#' + an(this.r) + an(this.g) + an(this.b);
  }
  function on() {
    var t = this.opacity;
    return (
      (1 === (t = isNaN(t) ? 1 : Math.max(0, Math.min(1, t))) ? 'rgb(' : 'rgba(') +
      Math.max(0, Math.min(255, Math.round(this.r) || 0)) +
      ', ' +
      Math.max(0, Math.min(255, Math.round(this.g) || 0)) +
      ', ' +
      Math.max(0, Math.min(255, Math.round(this.b) || 0)) +
      (1 === t ? ')' : ', ' + t + ')')
    );
  }
  function an(t) {
    return ((t = Math.max(0, Math.min(255, Math.round(t) || 0))) < 16 ? '0' : '') + t.toString(16);
  }
  function un(t, n, e, r) {
    return (
      r <= 0 ? (t = n = e = NaN) : e <= 0 || e >= 1 ? (t = n = NaN) : n <= 0 && (t = NaN),
      new cn(t, n, e, r)
    );
  }
  function ln(t) {
    if (t instanceof cn) return new cn(t.h, t.s, t.l, t.opacity);
    if ((t instanceof Ht || (t = Jt(t)), !t)) return new cn();
    if (t instanceof cn) return t;
    var n = (t = t.rgb()).r / 255,
      e = t.g / 255,
      r = t.b / 255,
      i = Math.min(n, e, r),
      o = Math.max(n, e, r),
      a = NaN,
      u = o - i,
      l = (o + i) / 2;
    return (
      u
        ? ((a = n === o ? (e - r) / u + 6 * (e < r) : e === o ? (r - n) / u + 2 : (n - e) / u + 4),
          (u /= l < 0.5 ? o + i : 2 - o - i),
          (a *= 60))
        : (u = l > 0 && l < 1 ? 0 : a),
      new cn(a, u, l, t.opacity)
    );
  }
  function sn(t, n, e, r) {
    return 1 === arguments.length ? ln(t) : new cn(t, n, e, null == r ? 1 : r);
  }
  function cn(t, n, e, r) {
    (this.h = +t), (this.s = +n), (this.l = +e), (this.opacity = +r);
  }
  function fn(t, n, e) {
    return (
      255 *
      (t < 60 ? n + ((e - n) * t) / 60 : t < 180 ? e : t < 240 ? n + ((e - n) * (240 - t)) / 60 : n)
    );
  }
  function hn(t) {
    return function () {
      return t;
    };
  }
  function dn(t, n) {
    var e = n - t;
    return e
      ? (function (t, n) {
          return function (e) {
            return t + e * n;
          };
        })(t, e)
      : hn(isNaN(t) ? n : t);
  }
  Ot(Ht, Jt, {
    copy: function (t) {
      return Object.assign(new this.constructor(), this, t);
    },
    displayable: function () {
      return this.rgb().displayable();
    },
    hex: Zt,
    formatHex: Zt,
    formatHsl: function () {
      return ln(this).formatHsl();
    },
    formatRgb: Gt,
    toString: Gt,
  }),
    Ot(
      en,
      nn,
      Yt(Ht, {
        brighter: function (t) {
          return (
            (t = null == t ? 1 / 0.7 : Math.pow(1 / 0.7, t)),
            new en(this.r * t, this.g * t, this.b * t, this.opacity)
          );
        },
        darker: function (t) {
          return (
            (t = null == t ? 0.7 : Math.pow(0.7, t)),
            new en(this.r * t, this.g * t, this.b * t, this.opacity)
          );
        },
        rgb: function () {
          return this;
        },
        displayable: function () {
          return (
            -0.5 <= this.r &&
            this.r < 255.5 &&
            -0.5 <= this.g &&
            this.g < 255.5 &&
            -0.5 <= this.b &&
            this.b < 255.5 &&
            0 <= this.opacity &&
            this.opacity <= 1
          );
        },
        hex: rn,
        formatHex: rn,
        formatRgb: on,
        toString: on,
      }),
    ),
    Ot(
      cn,
      sn,
      Yt(Ht, {
        brighter: function (t) {
          return (
            (t = null == t ? 1 / 0.7 : Math.pow(1 / 0.7, t)),
            new cn(this.h, this.s, this.l * t, this.opacity)
          );
        },
        darker: function (t) {
          return (
            (t = null == t ? 0.7 : Math.pow(0.7, t)),
            new cn(this.h, this.s, this.l * t, this.opacity)
          );
        },
        rgb: function () {
          var t = (this.h % 360) + 360 * (this.h < 0),
            n = isNaN(t) || isNaN(this.s) ? 0 : this.s,
            e = this.l,
            r = e + (e < 0.5 ? e : 1 - e) * n,
            i = 2 * e - r;
          return new en(
            fn(t >= 240 ? t - 240 : t + 120, i, r),
            fn(t, i, r),
            fn(t < 120 ? t + 240 : t - 120, i, r),
            this.opacity,
          );
        },
        displayable: function () {
          return (
            ((0 <= this.s && this.s <= 1) || isNaN(this.s)) &&
            0 <= this.l &&
            this.l <= 1 &&
            0 <= this.opacity &&
            this.opacity <= 1
          );
        },
        formatHsl: function () {
          var t = this.opacity;
          return (
            (1 === (t = isNaN(t) ? 1 : Math.max(0, Math.min(1, t))) ? 'hsl(' : 'hsla(') +
            (this.h || 0) +
            ', ' +
            100 * (this.s || 0) +
            '%, ' +
            100 * (this.l || 0) +
            '%' +
            (1 === t ? ')' : ', ' + t + ')')
          );
        },
      }),
    );
  var pn = (function t(n) {
    var e = (function (t) {
      return 1 == (t = +t)
        ? dn
        : function (n, e) {
            return e - n
              ? (function (t, n, e) {
                  return (
                    (t = Math.pow(t, e)),
                    (n = Math.pow(n, e) - t),
                    (e = 1 / e),
                    function (r) {
                      return Math.pow(t + r * n, e);
                    }
                  );
                })(n, e, t)
              : hn(isNaN(n) ? e : n);
          };
    })(n);
    function r(t, n) {
      var r = e((t = nn(t)).r, (n = nn(n)).r),
        i = e(t.g, n.g),
        o = e(t.b, n.b),
        a = dn(t.opacity, n.opacity);
      return function (n) {
        return (t.r = r(n)), (t.g = i(n)), (t.b = o(n)), (t.opacity = a(n)), t + '';
      };
    }
    return (r.gamma = t), r;
  })(1);
  function vn(t, n) {
    n || (n = []);
    var e,
      r = t ? Math.min(n.length, t.length) : 0,
      i = n.slice();
    return function (o) {
      for (e = 0; e < r; ++e) i[e] = t[e] * (1 - o) + n[e] * o;
      return i;
    };
  }
  function gn(t, n) {
    var e,
      r = n ? n.length : 0,
      i = t ? Math.min(r, t.length) : 0,
      o = new Array(i),
      a = new Array(r);
    for (e = 0; e < i; ++e) o[e] = kn(t[e], n[e]);
    for (; e < r; ++e) a[e] = n[e];
    return function (t) {
      for (e = 0; e < i; ++e) a[e] = o[e](t);
      return a;
    };
  }
  function yn(t, n) {
    var e = new Date();
    return (
      (t = +t),
      (n = +n),
      function (r) {
        return e.setTime(t * (1 - r) + n * r), e;
      }
    );
  }
  function mn(t, n) {
    return (
      (t = +t),
      (n = +n),
      function (e) {
        return t * (1 - e) + n * e;
      }
    );
  }
  function wn(t, n) {
    var e,
      r = {},
      i = {};
    for (e in ((null !== t && 'object' == typeof t) || (t = {}),
    (null !== n && 'object' == typeof n) || (n = {}),
    n))
      e in t ? (r[e] = kn(t[e], n[e])) : (i[e] = n[e]);
    return function (t) {
      for (e in r) i[e] = r[e](t);
      return i;
    };
  }
  var _n = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
    xn = new RegExp(_n.source, 'g');
  function bn(t, n) {
    var e,
      r,
      i,
      o = (_n.lastIndex = xn.lastIndex = 0),
      a = -1,
      u = [],
      l = [];
    for (t += '', n += ''; (e = _n.exec(t)) && (r = xn.exec(n)); )
      (i = r.index) > o && ((i = n.slice(o, i)), u[a] ? (u[a] += i) : (u[++a] = i)),
        (e = e[0]) === (r = r[0])
          ? u[a]
            ? (u[a] += r)
            : (u[++a] = r)
          : ((u[++a] = null), l.push({ i: a, x: mn(e, r) })),
        (o = xn.lastIndex);
    return (
      o < n.length && ((i = n.slice(o)), u[a] ? (u[a] += i) : (u[++a] = i)),
      u.length < 2
        ? l[0]
          ? (function (t) {
              return function (n) {
                return t(n) + '';
              };
            })(l[0].x)
          : (function (t) {
              return function () {
                return t;
              };
            })(n)
        : ((n = l.length),
          function (t) {
            for (var e, r = 0; r < n; ++r) u[(e = l[r]).i] = e.x(t);
            return u.join('');
          })
    );
  }
  function kn(t, n) {
    var e,
      r,
      i = typeof n;
    return null == n || 'boolean' === i
      ? hn(n)
      : ('number' === i
          ? mn
          : 'string' === i
          ? (e = Jt(n))
            ? ((n = e), pn)
            : bn
          : n instanceof Jt
          ? pn
          : n instanceof Date
          ? yn
          : ((r = n),
            !ArrayBuffer.isView(r) || r instanceof DataView
              ? Array.isArray(n)
                ? gn
                : ('function' != typeof n.valueOf && 'function' != typeof n.toString) || isNaN(n)
                ? wn
                : mn
              : vn))(t, n);
  }
  function Mn(t, n) {
    return (
      (t = +t),
      (n = +n),
      function (e) {
        return Math.round(t * (1 - e) + n * e);
      }
    );
  }
  var An,
    Nn,
    En,
    Cn,
    Sn = 180 / Math.PI,
    Dn = { translateX: 0, translateY: 0, rotate: 0, skewX: 0, scaleX: 1, scaleY: 1 };
  function jn(t, n, e, r, i, o) {
    var a, u, l;
    return (
      (a = Math.sqrt(t * t + n * n)) && ((t /= a), (n /= a)),
      (l = t * e + n * r) && ((e -= t * l), (r -= n * l)),
      (u = Math.sqrt(e * e + r * r)) && ((e /= u), (r /= u), (l /= u)),
      t * r < n * e && ((t = -t), (n = -n), (l = -l), (a = -a)),
      {
        translateX: i,
        translateY: o,
        rotate: Math.atan2(n, t) * Sn,
        skewX: Math.atan(l) * Sn,
        scaleX: a,
        scaleY: u,
      }
    );
  }
  function Tn(t, n, e, r) {
    function i(t) {
      return t.length ? t.pop() + ' ' : '';
    }
    return function (o, a) {
      var u = [],
        l = [];
      return (
        (o = t(o)),
        (a = t(a)),
        (function (t, r, i, o, a, u) {
          if (t !== i || r !== o) {
            var l = a.push('translate(', null, n, null, e);
            u.push({ i: l - 4, x: mn(t, i) }, { i: l - 2, x: mn(r, o) });
          } else (i || o) && a.push('translate(' + i + n + o + e);
        })(o.translateX, o.translateY, a.translateX, a.translateY, u, l),
        (function (t, n, e, o) {
          t !== n
            ? (t - n > 180 ? (n += 360) : n - t > 180 && (t += 360),
              o.push({ i: e.push(i(e) + 'rotate(', null, r) - 2, x: mn(t, n) }))
            : n && e.push(i(e) + 'rotate(' + n + r);
        })(o.rotate, a.rotate, u, l),
        (function (t, n, e, o) {
          t !== n
            ? o.push({ i: e.push(i(e) + 'skewX(', null, r) - 2, x: mn(t, n) })
            : n && e.push(i(e) + 'skewX(' + n + r);
        })(o.skewX, a.skewX, u, l),
        (function (t, n, e, r, o, a) {
          if (t !== e || n !== r) {
            var u = o.push(i(o) + 'scale(', null, ',', null, ')');
            a.push({ i: u - 4, x: mn(t, e) }, { i: u - 2, x: mn(n, r) });
          } else (1 === e && 1 === r) || o.push(i(o) + 'scale(' + e + ',' + r + ')');
        })(o.scaleX, o.scaleY, a.scaleX, a.scaleY, u, l),
        (o = a = null),
        function (t) {
          for (var n, e = -1, r = l.length; ++e < r; ) u[(n = l[e]).i] = n.x(t);
          return u.join('');
        }
      );
    };
  }
  var Fn,
    Ln,
    On = Tn(
      function (t) {
        return 'none' === t
          ? Dn
          : (An ||
              ((An = document.createElement('DIV')),
              (Nn = document.documentElement),
              (En = document.defaultView)),
            (An.style.transform = t),
            (t = En.getComputedStyle(Nn.appendChild(An), null).getPropertyValue('transform')),
            Nn.removeChild(An),
            jn(+(t = t.slice(7, -1).split(','))[0], +t[1], +t[2], +t[3], +t[4], +t[5]));
      },
      'px, ',
      'px)',
      'deg)',
    ),
    Yn = Tn(
      function (t) {
        return null == t
          ? Dn
          : (Cn || (Cn = document.createElementNS('http://www.w3.org/2000/svg', 'g')),
            Cn.setAttribute('transform', t),
            (t = Cn.transform.baseVal.consolidate())
              ? jn((t = t.matrix).a, t.b, t.c, t.d, t.e, t.f)
              : Dn);
      },
      ', ',
      ')',
      ')',
    ),
    Hn = 0,
    Pn = 0,
    Vn = 0,
    Rn = 0,
    Bn = 0,
    zn = 0,
    qn = 'object' == typeof performance && performance.now ? performance : Date,
    In =
      'object' == typeof window && window.requestAnimationFrame
        ? window.requestAnimationFrame.bind(window)
        : function (t) {
            setTimeout(t, 17);
          };
  function Wn() {
    return Bn || (In(Xn), (Bn = qn.now() + zn));
  }
  function Xn() {
    Bn = 0;
  }
  function $n() {
    this._call = this._time = this._next = null;
  }
  function Un(t, n, e) {
    var r = new $n();
    return r.restart(t, n, e), r;
  }
  function Zn() {
    (Bn = (Rn = qn.now()) + zn), (Hn = Pn = 0);
    try {
      !(function () {
        Wn(), ++Hn;
        for (var t, n = Fn; n; ) (t = Bn - n._time) >= 0 && n._call.call(null, t), (n = n._next);
        --Hn;
      })();
    } finally {
      (Hn = 0),
        (function () {
          for (var t, n, e = Fn, r = Infinity; e; )
            e._call
              ? (r > e._time && (r = e._time), (t = e), (e = e._next))
              : ((n = e._next), (e._next = null), (e = t ? (t._next = n) : (Fn = n)));
          (Ln = t), Jn(r);
        })(),
        (Bn = 0);
    }
  }
  function Gn() {
    var t = qn.now(),
      n = t - Rn;
    n > 1e3 && ((zn -= n), (Rn = t));
  }
  function Jn(t) {
    Hn ||
      (Pn && (Pn = clearTimeout(Pn)),
      t - Bn > 24
        ? (t < Infinity && (Pn = setTimeout(Zn, t - qn.now() - zn)), Vn && (Vn = clearInterval(Vn)))
        : (Vn || ((Rn = qn.now()), (Vn = setInterval(Gn, 1e3))), (Hn = 1), In(Zn)));
  }
  function Kn(t, n, e) {
    var r = new $n();
    return (
      r.restart(
        function (e) {
          r.stop(), t(e + n);
        },
        (n = null == n ? 0 : +n),
        e,
      ),
      r
    );
  }
  function Qn(t, n, e) {
    var r = new $n(),
      i = n;
    return null == n
      ? (r.restart(t, n, e), r)
      : ((n = +n),
        (e = null == e ? Wn() : +e),
        r.restart(
          function o(a) {
            (a += i), r.restart(o, (i += n), e), t(a);
          },
          n,
          e,
        ),
        r);
  }
  $n.prototype = Un.prototype = {
    constructor: $n,
    restart: function (t, n, e) {
      if ('function' != typeof t) throw new TypeError('callback is not a function');
      (e = (null == e ? Wn() : +e) + (null == n ? 0 : +n)),
        this._next || Ln === this || (Ln ? (Ln._next = this) : (Fn = this), (Ln = this)),
        (this._call = t),
        (this._time = e),
        Jn();
    },
    stop: function () {
      this._call && ((this._call = null), (this._time = Infinity), Jn());
    },
  };
  var te = x('start', 'end', 'cancel', 'interrupt'),
    ne = [];
  function ee(t, n, e, r, i, o) {
    var a = t.__transition;
    if (a) {
      if (e in a) return;
    } else t.__transition = {};
    !(function (t, n, e) {
      var r,
        i = t.__transition;
      function o(l) {
        var s, c, f, h;
        if (1 !== e.state) return u();
        for (s in i)
          if ((h = i[s]).name === e.name) {
            if (3 === h.state) return Kn(o);
            4 === h.state
              ? ((h.state = 6),
                h.timer.stop(),
                h.on.call('interrupt', t, t.__data__, h.index, h.group),
                delete i[s])
              : +s < n &&
                ((h.state = 6),
                h.timer.stop(),
                h.on.call('cancel', t, t.__data__, h.index, h.group),
                delete i[s]);
          }
        if (
          (Kn(function () {
            3 === e.state && ((e.state = 4), e.timer.restart(a, e.delay, e.time), a(l));
          }),
          (e.state = 2),
          e.on.call('start', t, t.__data__, e.index, e.group),
          2 === e.state)
        ) {
          for (e.state = 3, r = new Array((f = e.tween.length)), s = 0, c = -1; s < f; ++s)
            (h = e.tween[s].value.call(t, t.__data__, e.index, e.group)) && (r[++c] = h);
          r.length = c + 1;
        }
      }
      function a(n) {
        for (
          var i =
              n < e.duration
                ? e.ease.call(null, n / e.duration)
                : (e.timer.restart(u), (e.state = 5), 1),
            o = -1,
            a = r.length;
          ++o < a;

        )
          r[o].call(t, i);
        5 === e.state && (e.on.call('end', t, t.__data__, e.index, e.group), u());
      }
      function u() {
        for (var r in ((e.state = 6), e.timer.stop(), delete i[n], i)) return;
        delete t.__transition;
      }
      (i[n] = e),
        (e.timer = Un(
          function (t) {
            (e.state = 1), e.timer.restart(o, e.delay, e.time), e.delay <= t && o(t - e.delay);
          },
          0,
          e.time,
        ));
    })(t, e, {
      name: n,
      index: r,
      group: i,
      on: te,
      tween: ne,
      time: o.time,
      delay: o.delay,
      duration: o.duration,
      ease: o.ease,
      timer: null,
      state: 0,
    });
  }
  function re(t, n) {
    var e = oe(t, n);
    if (e.state > 0) throw new Error('too late; already scheduled');
    return e;
  }
  function ie(t, n) {
    var e = oe(t, n);
    if (e.state > 3) throw new Error('too late; already running');
    return e;
  }
  function oe(t, n) {
    var e = t.__transition;
    if (!e || !(e = e[n])) throw new Error('transition not found');
    return e;
  }
  function ae(t, n) {
    var e, r;
    return function () {
      var i = ie(this, t),
        o = i.tween;
      if (o !== e)
        for (var a = 0, u = (r = e = o).length; a < u; ++a)
          if (r[a].name === n) {
            (r = r.slice()).splice(a, 1);
            break;
          }
      i.tween = r;
    };
  }
  function ue(t, n, e) {
    var r, i;
    if ('function' != typeof e) throw new Error();
    return function () {
      var o = ie(this, t),
        a = o.tween;
      if (a !== r) {
        i = (r = a).slice();
        for (var u = { name: n, value: e }, l = 0, s = i.length; l < s; ++l)
          if (i[l].name === n) {
            i[l] = u;
            break;
          }
        l === s && i.push(u);
      }
      o.tween = i;
    };
  }
  function le(t, n, e) {
    var r = t._id;
    return (
      t.each(function () {
        var t = ie(this, r);
        (t.value || (t.value = {}))[n] = e.apply(this, arguments);
      }),
      function (t) {
        return oe(t, r).value[n];
      }
    );
  }
  function se(t, n) {
    var e;
    return (
      'number' == typeof n ? mn : n instanceof Jt ? pn : (e = Jt(n)) ? ((n = e), pn) : bn
    )(t, n);
  }
  function ce(t) {
    return function () {
      this.removeAttribute(t);
    };
  }
  function fe(t) {
    return function () {
      this.removeAttributeNS(t.space, t.local);
    };
  }
  function he(t, n, e) {
    var r,
      i,
      o = e + '';
    return function () {
      var a = this.getAttribute(t);
      return a === o ? null : a === r ? i : (i = n((r = a), e));
    };
  }
  function de(t, n, e) {
    var r,
      i,
      o = e + '';
    return function () {
      var a = this.getAttributeNS(t.space, t.local);
      return a === o ? null : a === r ? i : (i = n((r = a), e));
    };
  }
  function pe(t, n, e) {
    var r, i, o;
    return function () {
      var a,
        u,
        l = e(this);
      if (null != l)
        return (a = this.getAttribute(t)) === (u = l + '')
          ? null
          : a === r && u === i
          ? o
          : ((i = u), (o = n((r = a), l)));
      this.removeAttribute(t);
    };
  }
  function ve(t, n, e) {
    var r, i, o;
    return function () {
      var a,
        u,
        l = e(this);
      if (null != l)
        return (a = this.getAttributeNS(t.space, t.local)) === (u = l + '')
          ? null
          : a === r && u === i
          ? o
          : ((i = u), (o = n((r = a), l)));
      this.removeAttributeNS(t.space, t.local);
    };
  }
  function ge(t, n) {
    return function (e) {
      this.setAttribute(t, n.call(this, e));
    };
  }
  function ye(t, n) {
    return function (e) {
      this.setAttributeNS(t.space, t.local, n.call(this, e));
    };
  }
  function me(t, n) {
    var e, r;
    function i() {
      var i = n.apply(this, arguments);
      return i !== r && (e = (r = i) && ye(t, i)), e;
    }
    return (i._value = n), i;
  }
  function we(t, n) {
    var e, r;
    function i() {
      var i = n.apply(this, arguments);
      return i !== r && (e = (r = i) && ge(t, i)), e;
    }
    return (i._value = n), i;
  }
  function _e(t, n) {
    return function () {
      re(this, t).delay = +n.apply(this, arguments);
    };
  }
  function xe(t, n) {
    return (
      (n = +n),
      function () {
        re(this, t).delay = n;
      }
    );
  }
  function be(t, n) {
    return function () {
      ie(this, t).duration = +n.apply(this, arguments);
    };
  }
  function ke(t, n) {
    return (
      (n = +n),
      function () {
        ie(this, t).duration = n;
      }
    );
  }
  function Me(t, n) {
    if ('function' != typeof n) throw new Error();
    return function () {
      ie(this, t).ease = n;
    };
  }
  function Ae(t, n, e) {
    var r,
      i,
      o = (function (t) {
        return (t + '')
          .trim()
          .split(/^|\s+/)
          .every(function (t) {
            var n = t.indexOf('.');
            return n >= 0 && (t = t.slice(0, n)), !t || 'start' === t;
          });
      })(n)
        ? re
        : ie;
    return function () {
      var a = o(this, t),
        u = a.on;
      u !== r && (i = (r = u).copy()).on(n, e), (a.on = i);
    };
  }
  var Ne = Ft.prototype.constructor;
  function Ee(t) {
    return function () {
      this.style.removeProperty(t);
    };
  }
  function Ce(t, n, e) {
    return function (r) {
      this.style.setProperty(t, n.call(this, r), e);
    };
  }
  function Se(t, n, e) {
    var r, i;
    function o() {
      var o = n.apply(this, arguments);
      return o !== i && (r = (i = o) && Ce(t, o, e)), r;
    }
    return (o._value = n), o;
  }
  function De(t) {
    return function (n) {
      this.textContent = t.call(this, n);
    };
  }
  function je(t) {
    var n, e;
    function r() {
      var r = t.apply(this, arguments);
      return r !== e && (n = (e = r) && De(r)), n;
    }
    return (r._value = t), r;
  }
  var Te = 0;
  function Fe(t, n, e, r) {
    (this._groups = t), (this._parents = n), (this._name = e), (this._id = r);
  }
  function Le() {
    return ++Te;
  }
  var Oe = Ft.prototype;
  function Ye(t) {
    return +t;
  }
  Fe.prototype = function (t) {
    return Ft().transition(t);
  }.prototype = {
    constructor: Fe,
    select: function (t) {
      var n = this._name,
        e = this._id;
      'function' != typeof t && (t = F(t));
      for (var r = this._groups, i = r.length, o = new Array(i), a = 0; a < i; ++a)
        for (var u, l, s = r[a], c = s.length, f = (o[a] = new Array(c)), h = 0; h < c; ++h)
          (u = s[h]) &&
            (l = t.call(u, u.__data__, h, s)) &&
            ('__data__' in u && (l.__data__ = u.__data__),
            (f[h] = l),
            ee(f[h], n, e, h, f, oe(u, e)));
      return new Fe(o, this._parents, n, e);
    },
    selectAll: function (t) {
      var n = this._name,
        e = this._id;
      'function' != typeof t && (t = O(t));
      for (var r = this._groups, i = r.length, o = [], a = [], u = 0; u < i; ++u)
        for (var l, s = r[u], c = s.length, f = 0; f < c; ++f)
          if ((l = s[f])) {
            for (
              var h, d = t.call(l, l.__data__, f, s), p = oe(l, e), v = 0, g = d.length;
              v < g;
              ++v
            )
              (h = d[v]) && ee(h, n, e, v, d, p);
            o.push(d), a.push(l);
          }
      return new Fe(o, a, n, e);
    },
    filter: function (t) {
      'function' != typeof t && (t = Y(t));
      for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
        for (var o, a = n[i], u = a.length, l = (r[i] = []), s = 0; s < u; ++s)
          (o = a[s]) && t.call(o, o.__data__, s, a) && l.push(o);
      return new Fe(r, this._parents, this._name, this._id);
    },
    merge: function (t) {
      if (t._id !== this._id) throw new Error();
      for (
        var n = this._groups,
          e = t._groups,
          r = n.length,
          i = Math.min(r, e.length),
          o = new Array(r),
          a = 0;
        a < i;
        ++a
      )
        for (var u, l = n[a], s = e[a], c = l.length, f = (o[a] = new Array(c)), h = 0; h < c; ++h)
          (u = l[h] || s[h]) && (f[h] = u);
      for (; a < r; ++a) o[a] = n[a];
      return new Fe(o, this._parents, this._name, this._id);
    },
    selection: function () {
      return new Ne(this._groups, this._parents);
    },
    transition: function () {
      for (
        var t = this._name, n = this._id, e = Le(), r = this._groups, i = r.length, o = 0;
        o < i;
        ++o
      )
        for (var a, u = r[o], l = u.length, s = 0; s < l; ++s)
          if ((a = u[s])) {
            var c = oe(a, n);
            ee(a, t, e, s, u, {
              time: c.time + c.delay + c.duration,
              delay: 0,
              duration: c.duration,
              ease: c.ease,
            });
          }
      return new Fe(r, this._parents, t, e);
    },
    call: Oe.call,
    nodes: Oe.nodes,
    node: Oe.node,
    size: Oe.size,
    empty: Oe.empty,
    each: Oe.each,
    on: function (t, n) {
      var e = this._id;
      return arguments.length < 2 ? oe(this.node(), e).on.on(t) : this.each(Ae(e, t, n));
    },
    attr: function (t, n) {
      var e = C(t),
        r = 'transform' === e ? Yn : se;
      return this.attrTween(
        t,
        'function' == typeof n
          ? (e.local ? ve : pe)(e, r, le(this, 'attr.' + t, n))
          : null == n
          ? (e.local ? fe : ce)(e)
          : (e.local ? de : he)(e, r, n),
      );
    },
    attrTween: function (t, n) {
      var e = 'attr.' + t;
      if (arguments.length < 2) return (e = this.tween(e)) && e._value;
      if (null == n) return this.tween(e, null);
      if ('function' != typeof n) throw new Error();
      var r = C(t);
      return this.tween(e, (r.local ? me : we)(r, n));
    },
    style: function (t, n, e) {
      var r = 'transform' == (t += '') ? On : se;
      return null == n
        ? this.styleTween(
            t,
            (function (t, n) {
              var e, r, i;
              return function () {
                var o = K(this, t),
                  a = (this.style.removeProperty(t), K(this, t));
                return o === a ? null : o === e && a === r ? i : (i = n((e = o), (r = a)));
              };
            })(t, r),
          ).on('end.style.' + t, Ee(t))
        : 'function' == typeof n
        ? this.styleTween(
            t,
            (function (t, n, e) {
              var r, i, o;
              return function () {
                var a = K(this, t),
                  u = e(this),
                  l = u + '';
                return (
                  null == u && (this.style.removeProperty(t), (l = u = K(this, t))),
                  a === l ? null : a === r && l === i ? o : ((i = l), (o = n((r = a), u)))
                );
              };
            })(t, r, le(this, 'style.' + t, n)),
          ).each(
            (function (t, n) {
              var e,
                r,
                i,
                o,
                a = 'style.' + n,
                u = 'end.' + a;
              return function () {
                var l = ie(this, t),
                  s = l.on,
                  c = null == l.value[a] ? o || (o = Ee(n)) : void 0;
                (s === e && i === c) || (r = (e = s).copy()).on(u, (i = c)), (l.on = r);
              };
            })(this._id, t),
          )
        : this.styleTween(
            t,
            (function (t, n, e) {
              var r,
                i,
                o = e + '';
              return function () {
                var a = K(this, t);
                return a === o ? null : a === r ? i : (i = n((r = a), e));
              };
            })(t, r, n),
            e,
          ).on('end.style.' + t, null);
    },
    styleTween: function (t, n, e) {
      var r = 'style.' + (t += '');
      if (arguments.length < 2) return (r = this.tween(r)) && r._value;
      if (null == n) return this.tween(r, null);
      if ('function' != typeof n) throw new Error();
      return this.tween(r, Se(t, n, null == e ? '' : e));
    },
    text: function (t) {
      return this.tween(
        'text',
        'function' == typeof t
          ? (function (t) {
              return function () {
                var n = t(this);
                this.textContent = null == n ? '' : n;
              };
            })(le(this, 'text', t))
          : (function (t) {
              return function () {
                this.textContent = t;
              };
            })(null == t ? '' : t + ''),
      );
    },
    textTween: function (t) {
      var n = 'text';
      if (arguments.length < 1) return (n = this.tween(n)) && n._value;
      if (null == t) return this.tween(n, null);
      if ('function' != typeof t) throw new Error();
      return this.tween(n, je(t));
    },
    remove: function () {
      return this.on(
        'end.remove',
        (function (t) {
          return function () {
            var n = this.parentNode;
            for (var e in this.__transition) if (+e !== t) return;
            n && n.removeChild(this);
          };
        })(this._id),
      );
    },
    tween: function (t, n) {
      var e = this._id;
      if (((t += ''), arguments.length < 2)) {
        for (var r, i = oe(this.node(), e).tween, o = 0, a = i.length; o < a; ++o)
          if ((r = i[o]).name === t) return r.value;
        return null;
      }
      return this.each((null == n ? ae : ue)(e, t, n));
    },
    delay: function (t) {
      var n = this._id;
      return arguments.length
        ? this.each(('function' == typeof t ? _e : xe)(n, t))
        : oe(this.node(), n).delay;
    },
    duration: function (t) {
      var n = this._id;
      return arguments.length
        ? this.each(('function' == typeof t ? be : ke)(n, t))
        : oe(this.node(), n).duration;
    },
    ease: function (t) {
      var n = this._id;
      return arguments.length ? this.each(Me(n, t)) : oe(this.node(), n).ease;
    },
    end: function () {
      var t,
        n,
        e = this,
        r = e._id,
        i = e.size();
      return new Promise(function (o, a) {
        var u = { value: a },
          l = {
            value: function () {
              0 == --i && o();
            },
          };
        e.each(function () {
          var e = ie(this, r),
            i = e.on;
          i !== t &&
            ((n = (t = i).copy())._.cancel.push(u), n._.interrupt.push(u), n._.end.push(l)),
            (e.on = n);
        });
      });
    },
  };
  var He = {
    time: null,
    delay: 0,
    duration: 250,
    ease: function (t) {
      return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
    },
  };
  function Pe(t, n) {
    for (var e; !(e = t.__transition) || !(e = e[n]); )
      if (!(t = t.parentNode)) return (He.time = Wn()), He;
    return e;
  }
  (Ft.prototype.interrupt = function (t) {
    return this.each(function () {
      !(function (t, n) {
        var e,
          r,
          i,
          o = t.__transition,
          a = !0;
        if (o) {
          for (i in ((n = null == n ? null : n + ''), o))
            (e = o[i]).name === n
              ? ((r = e.state > 2 && e.state < 5),
                (e.state = 6),
                e.timer.stop(),
                e.on.call(r ? 'interrupt' : 'cancel', t, t.__data__, e.index, e.group),
                delete o[i])
              : (a = !1);
          a && delete t.__transition;
        }
      })(this, t);
    });
  }),
    (Ft.prototype.transition = function (t) {
      var n, e;
      t instanceof Fe
        ? ((n = t._id), (t = t._name))
        : ((n = Le()), ((e = He).time = Wn()), (t = null == t ? null : t + ''));
      for (var r = this._groups, i = r.length, o = 0; o < i; ++o)
        for (var a, u = r[o], l = u.length, s = 0; s < l; ++s)
          (a = u[s]) && ee(a, t, n, s, u, e || Pe(a, n));
      return new Fe(r, this._parents, t, n);
    });
  var Ve = {},
    Re = {};
  function Be(t) {
    return new Function(
      'd',
      'return {' +
        t
          .map(function (t, n) {
            return JSON.stringify(t) + ': d[' + n + '] || ""';
          })
          .join(',') +
        '}',
    );
  }
  function ze(t) {
    var n = Object.create(null),
      e = [];
    return (
      t.forEach(function (t) {
        for (var r in t) r in n || e.push((n[r] = r));
      }),
      e
    );
  }
  function qe(t, n) {
    var e = t + '',
      r = e.length;
    return r < n ? new Array(n - r + 1).join(0) + e : e;
  }
  function Ie(t) {
    var n = new RegExp('["' + t + '\n\r]'),
      e = t.charCodeAt(0);
    function r(t, n) {
      var r,
        i = [],
        o = t.length,
        a = 0,
        u = 0,
        l = o <= 0,
        s = !1;
      function c() {
        if (l) return Re;
        if (s) return (s = !1), Ve;
        var n,
          r,
          i = a;
        if (34 === t.charCodeAt(i)) {
          for (; (a++ < o && 34 !== t.charCodeAt(a)) || 34 === t.charCodeAt(++a); );
          return (
            (n = a) >= o
              ? (l = !0)
              : 10 === (r = t.charCodeAt(a++))
              ? (s = !0)
              : 13 === r && ((s = !0), 10 === t.charCodeAt(a) && ++a),
            t.slice(i + 1, n - 1).replace(/""/g, '"')
          );
        }
        for (; a < o; ) {
          if (10 === (r = t.charCodeAt((n = a++)))) s = !0;
          else if (13 === r) (s = !0), 10 === t.charCodeAt(a) && ++a;
          else if (r !== e) continue;
          return t.slice(i, n);
        }
        return (l = !0), t.slice(i, o);
      }
      for (
        10 === t.charCodeAt(o - 1) && --o, 13 === t.charCodeAt(o - 1) && --o;
        (r = c()) !== Re;

      ) {
        for (var f = []; r !== Ve && r !== Re; ) f.push(r), (r = c());
        (n && null == (f = n(f, u++))) || i.push(f);
      }
      return i;
    }
    function i(n, e) {
      return n.map(function (n) {
        return e
          .map(function (t) {
            return a(n[t]);
          })
          .join(t);
      });
    }
    function o(n) {
      return n.map(a).join(t);
    }
    function a(t) {
      return null == t
        ? ''
        : t instanceof Date
        ? (function (t) {
            var n,
              e = t.getUTCHours(),
              r = t.getUTCMinutes(),
              i = t.getUTCSeconds(),
              o = t.getUTCMilliseconds();
            return isNaN(t)
              ? 'Invalid Date'
              : ((n = t.getUTCFullYear()) < 0
                  ? '-' + qe(-n, 6)
                  : n > 9999
                  ? '+' + qe(n, 6)
                  : qe(n, 4)) +
                  '-' +
                  qe(t.getUTCMonth() + 1, 2) +
                  '-' +
                  qe(t.getUTCDate(), 2) +
                  (o
                    ? 'T' + qe(e, 2) + ':' + qe(r, 2) + ':' + qe(i, 2) + '.' + qe(o, 3) + 'Z'
                    : i
                    ? 'T' + qe(e, 2) + ':' + qe(r, 2) + ':' + qe(i, 2) + 'Z'
                    : r || e
                    ? 'T' + qe(e, 2) + ':' + qe(r, 2) + 'Z'
                    : '');
          })(t)
        : n.test((t += ''))
        ? '"' + t.replace(/"/g, '""') + '"'
        : t;
    }
    return {
      parse: function (t, n) {
        var e,
          i,
          o = r(t, function (t, r) {
            if (e) return e(t, r - 1);
            (i = t),
              (e = n
                ? (function (t, n) {
                    var e = Be(t);
                    return function (r, i) {
                      return n(e(r), i, t);
                    };
                  })(t, n)
                : Be(t));
          });
        return (o.columns = i || []), o;
      },
      parseRows: r,
      format: function (n, e) {
        return null == e && (e = ze(n)), [e.map(a).join(t)].concat(i(n, e)).join('\n');
      },
      formatBody: function (t, n) {
        return null == n && (n = ze(t)), i(t, n).join('\n');
      },
      formatRows: function (t) {
        return t.map(o).join('\n');
      },
      formatRow: o,
      formatValue: a,
    };
  }
  var We = Ie(',').parse,
    Xe = Ie('\t').parse;
  function $e(t) {
    if (!t.ok) throw new Error(t.status + ' ' + t.statusText);
    return t.text();
  }
  function Ue(t, n) {
    return fetch(t, n).then($e);
  }
  function Ze(t) {
    return function (n, e, r) {
      return (
        2 === arguments.length && 'function' == typeof e && ((r = e), (e = void 0)),
        Ue(n, e).then(function (n) {
          return t(n, r);
        })
      );
    };
  }
  var Ge = Ze(We),
    Je = Ze(Xe);
  function Ke(t) {
    if (!t.ok) throw new Error(t.status + ' ' + t.statusText);
    return t.json();
  }
  function Qe(t, n) {
    return fetch(t, n).then(Ke);
  }
  var tr = function (t, n) {
    return Ue(t, n).then(function (t) {
      return new DOMParser().parseFromString(t, 'application/xml');
    });
  };
  function nr(t, n) {
    if ((e = (t = n ? t.toExponential(n - 1) : t.toExponential()).indexOf('e')) < 0) return null;
    var e,
      r = t.slice(0, e);
    return [r.length > 1 ? r[0] + r.slice(2) : r, +t.slice(e + 1)];
  }
  function er(t) {
    return (t = nr(Math.abs(t))) ? t[1] : NaN;
  }
  var rr,
    ir = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
  function or(t) {
    if (!(n = ir.exec(t))) throw new Error('invalid format: ' + t);
    var n;
    return new ar({
      fill: n[1],
      align: n[2],
      sign: n[3],
      symbol: n[4],
      zero: n[5],
      width: n[6],
      comma: n[7],
      precision: n[8] && n[8].slice(1),
      trim: n[9],
      type: n[10],
    });
  }
  function ar(t) {
    (this.fill = void 0 === t.fill ? ' ' : t.fill + ''),
      (this.align = void 0 === t.align ? '>' : t.align + ''),
      (this.sign = void 0 === t.sign ? '-' : t.sign + ''),
      (this.symbol = void 0 === t.symbol ? '' : t.symbol + ''),
      (this.zero = !!t.zero),
      (this.width = void 0 === t.width ? void 0 : +t.width),
      (this.comma = !!t.comma),
      (this.precision = void 0 === t.precision ? void 0 : +t.precision),
      (this.trim = !!t.trim),
      (this.type = void 0 === t.type ? '' : t.type + '');
  }
  function ur(t, n) {
    var e = nr(t, n);
    if (!e) return t + '';
    var r = e[0],
      i = e[1];
    return i < 0
      ? '0.' + new Array(-i).join('0') + r
      : r.length > i + 1
      ? r.slice(0, i + 1) + '.' + r.slice(i + 1)
      : r + new Array(i - r.length + 2).join('0');
  }
  (or.prototype = ar.prototype),
    (ar.prototype.toString = function () {
      return (
        this.fill +
        this.align +
        this.sign +
        this.symbol +
        (this.zero ? '0' : '') +
        (void 0 === this.width ? '' : Math.max(1, 0 | this.width)) +
        (this.comma ? ',' : '') +
        (void 0 === this.precision ? '' : '.' + Math.max(0, 0 | this.precision)) +
        (this.trim ? '~' : '') +
        this.type
      );
    });
  var lr = {
    '%': function (t, n) {
      return (100 * t).toFixed(n);
    },
    b: function (t) {
      return Math.round(t).toString(2);
    },
    c: function (t) {
      return t + '';
    },
    d: function (t) {
      return Math.round(t).toString(10);
    },
    e: function (t, n) {
      return t.toExponential(n);
    },
    f: function (t, n) {
      return t.toFixed(n);
    },
    g: function (t, n) {
      return t.toPrecision(n);
    },
    o: function (t) {
      return Math.round(t).toString(8);
    },
    p: function (t, n) {
      return ur(100 * t, n);
    },
    r: ur,
    s: function (t, n) {
      var e = nr(t, n);
      if (!e) return t + '';
      var r = e[0],
        i = e[1],
        o = i - (rr = 3 * Math.max(-8, Math.min(8, Math.floor(i / 3)))) + 1,
        a = r.length;
      return o === a
        ? r
        : o > a
        ? r + new Array(o - a + 1).join('0')
        : o > 0
        ? r.slice(0, o) + '.' + r.slice(o)
        : '0.' + new Array(1 - o).join('0') + nr(t, Math.max(0, n + o - 1))[0];
    },
    X: function (t) {
      return Math.round(t).toString(16).toUpperCase();
    },
    x: function (t) {
      return Math.round(t).toString(16);
    },
  };
  function sr(t) {
    return t;
  }
  var cr,
    fr,
    hr,
    dr = Array.prototype.map,
    pr = ['y', 'z', 'a', 'f', 'p', 'n', 'µ', 'm', '', 'k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];
  function vr(t, n) {
    switch (arguments.length) {
      case 0:
        break;
      case 1:
        this.range(t);
        break;
      default:
        this.range(n).domain(t);
    }
    return this;
  }
  (cr = (function (t) {
    var n,
      e,
      r =
        void 0 === t.grouping || void 0 === t.thousands
          ? sr
          : ((n = dr.call(t.grouping, Number)),
            (e = t.thousands + ''),
            function (t, r) {
              for (
                var i = t.length, o = [], a = 0, u = n[0], l = 0;
                i > 0 &&
                u > 0 &&
                (l + u + 1 > r && (u = Math.max(1, r - l)),
                o.push(t.substring((i -= u), i + u)),
                !((l += u + 1) > r));

              )
                u = n[(a = (a + 1) % n.length)];
              return o.reverse().join(e);
            }),
      i = void 0 === t.currency ? '' : t.currency[0] + '',
      o = void 0 === t.currency ? '' : t.currency[1] + '',
      a = void 0 === t.decimal ? '.' : t.decimal + '',
      u =
        void 0 === t.numerals
          ? sr
          : (function (t) {
              return function (n) {
                return n.replace(/[0-9]/g, function (n) {
                  return t[+n];
                });
              };
            })(dr.call(t.numerals, String)),
      l = void 0 === t.percent ? '%' : t.percent + '',
      s = void 0 === t.minus ? '-' : t.minus + '',
      c = void 0 === t.nan ? 'NaN' : t.nan + '';
    function f(t) {
      var n = (t = or(t)).fill,
        e = t.align,
        f = t.sign,
        h = t.symbol,
        d = t.zero,
        p = t.width,
        v = t.comma,
        g = t.precision,
        y = t.trim,
        m = t.type;
      'n' === m ? ((v = !0), (m = 'g')) : lr[m] || (void 0 === g && (g = 12), (y = !0), (m = 'g')),
        (d || ('0' === n && '=' === e)) && ((d = !0), (n = '0'), (e = '='));
      var w = '$' === h ? i : '#' === h && /[boxX]/.test(m) ? '0' + m.toLowerCase() : '',
        _ = '$' === h ? o : /[%p]/.test(m) ? l : '',
        x = lr[m],
        b = /[defgprs%]/.test(m);
      function k(t) {
        var i,
          o,
          l,
          h = w,
          k = _;
        if ('c' === m) (k = x(t) + k), (t = '');
        else {
          var M = (t = +t) < 0 || 1 / t < 0;
          if (
            ((t = isNaN(t) ? c : x(Math.abs(t), g)),
            y &&
              (t = (function (t) {
                t: for (var n, e = t.length, r = 1, i = -1; r < e; ++r)
                  switch (t[r]) {
                    case '.':
                      i = n = r;
                      break;
                    case '0':
                      0 === i && (i = r), (n = r);
                      break;
                    default:
                      if (!+t[r]) break t;
                      i > 0 && (i = 0);
                  }
                return i > 0 ? t.slice(0, i) + t.slice(n + 1) : t;
              })(t)),
            M && 0 == +t && '+' !== f && (M = !1),
            (h = (M ? ('(' === f ? f : s) : '-' === f || '(' === f ? '' : f) + h),
            (k = ('s' === m ? pr[8 + rr / 3] : '') + k + (M && '(' === f ? ')' : '')),
            b)
          )
            for (i = -1, o = t.length; ++i < o; )
              if (48 > (l = t.charCodeAt(i)) || l > 57) {
                (k = (46 === l ? a + t.slice(i + 1) : t.slice(i)) + k), (t = t.slice(0, i));
                break;
              }
        }
        v && !d && (t = r(t, Infinity));
        var A = h.length + t.length + k.length,
          N = A < p ? new Array(p - A + 1).join(n) : '';
        switch ((v && d && ((t = r(N + t, N.length ? p - k.length : Infinity)), (N = '')), e)) {
          case '<':
            t = h + t + k + N;
            break;
          case '=':
            t = h + N + t + k;
            break;
          case '^':
            t = N.slice(0, (A = N.length >> 1)) + h + t + k + N.slice(A);
            break;
          default:
            t = N + h + t + k;
        }
        return u(t);
      }
      return (
        (g =
          void 0 === g
            ? 6
            : /[gprs]/.test(m)
            ? Math.max(1, Math.min(21, g))
            : Math.max(0, Math.min(20, g))),
        (k.toString = function () {
          return t + '';
        }),
        k
      );
    }
    return {
      format: f,
      formatPrefix: function (t, n) {
        var e = f((((t = or(t)).type = 'f'), t)),
          r = 3 * Math.max(-8, Math.min(8, Math.floor(er(n) / 3))),
          i = Math.pow(10, -r),
          o = pr[8 + r / 3];
        return function (t) {
          return e(i * t) + o;
        };
      },
    };
  })({ decimal: '.', thousands: ',', grouping: [3], currency: ['$', ''], minus: '-' })),
    (fr = cr.format),
    (hr = cr.formatPrefix);
  var gr = Array.prototype,
    yr = gr.map,
    mr = gr.slice;
  function wr(t) {
    return +t;
  }
  var _r = [0, 1];
  function xr(t) {
    return t;
  }
  function br(t, n) {
    return (n -= t = +t)
      ? function (e) {
          return (e - t) / n;
        }
      : ((e = isNaN(n) ? NaN : 0.5),
        function () {
          return e;
        });
    var e;
  }
  function kr(t) {
    var n,
      e = t[0],
      r = t[t.length - 1];
    return (
      e > r && ((n = e), (e = r), (r = n)),
      function (t) {
        return Math.max(e, Math.min(r, t));
      }
    );
  }
  function Mr(t, n, e) {
    var r = t[0],
      i = t[1],
      o = n[0],
      a = n[1];
    return (
      i < r ? ((r = br(i, r)), (o = e(a, o))) : ((r = br(r, i)), (o = e(o, a))),
      function (t) {
        return o(r(t));
      }
    );
  }
  function Ar(t, n, e) {
    var r = Math.min(t.length, n.length) - 1,
      i = new Array(r),
      a = new Array(r),
      u = -1;
    for (t[r] < t[0] && ((t = t.slice().reverse()), (n = n.slice().reverse())); ++u < r; )
      (i[u] = br(t[u], t[u + 1])), (a[u] = e(n[u], n[u + 1]));
    return function (n) {
      var e = o(t, n, 1, r) - 1;
      return a[e](i[e](n));
    };
  }
  function Nr(t, n) {
    return n
      .domain(t.domain())
      .range(t.range())
      .interpolate(t.interpolate())
      .clamp(t.clamp())
      .unknown(t.unknown());
  }
  function Er(t, n) {
    return (function () {
      var t,
        n,
        e,
        r,
        i,
        o,
        a = _r,
        u = _r,
        l = kn,
        s = xr;
      function c() {
        return (r = Math.min(a.length, u.length) > 2 ? Ar : Mr), (i = o = null), f;
      }
      function f(n) {
        return isNaN((n = +n)) ? e : (i || (i = r(a.map(t), u, l)))(t(s(n)));
      }
      return (
        (f.invert = function (e) {
          return s(n((o || (o = r(u, a.map(t), mn)))(e)));
        }),
        (f.domain = function (t) {
          return arguments.length
            ? ((a = yr.call(t, wr)), s === xr || (s = kr(a)), c())
            : a.slice();
        }),
        (f.range = function (t) {
          return arguments.length ? ((u = mr.call(t)), c()) : u.slice();
        }),
        (f.rangeRound = function (t) {
          return (u = mr.call(t)), (l = Mn), c();
        }),
        (f.clamp = function (t) {
          return arguments.length ? ((s = t ? kr(a) : xr), f) : s !== xr;
        }),
        (f.interpolate = function (t) {
          return arguments.length ? ((l = t), c()) : l;
        }),
        (f.unknown = function (t) {
          return arguments.length ? ((e = t), f) : e;
        }),
        function (e, r) {
          return (t = e), (n = r), c();
        }
      );
    })()(t, n);
  }
  function Cr(t) {
    var n = t.domain;
    return (
      (t.ticks = function (t) {
        var e = n();
        return (function (t, n, e) {
          var r,
            i,
            o,
            a,
            u = -1;
          if (((e = +e), (t = +t) == (n = +n) && e > 0)) return [t];
          if (((r = n < t) && ((i = t), (t = n), (n = i)), 0 === (a = s(t, n, e)) || !isFinite(a)))
            return [];
          if (a > 0)
            for (
              t = Math.ceil(t / a),
                n = Math.floor(n / a),
                o = new Array((i = Math.ceil(n - t + 1)));
              ++u < i;

            )
              o[u] = (t + u) * a;
          else
            for (
              t = Math.floor(t * a),
                n = Math.ceil(n * a),
                o = new Array((i = Math.ceil(t - n + 1)));
              ++u < i;

            )
              o[u] = (t - u) / a;
          return r && o.reverse(), o;
        })(e[0], e[e.length - 1], null == t ? 10 : t);
      }),
      (t.tickFormat = function (t, e) {
        var r = n();
        return (function (t, n, e, r) {
          var i,
            o = (function (t, n, e) {
              var r = Math.abs(n - t) / Math.max(0, e),
                i = Math.pow(10, Math.floor(Math.log(r) / Math.LN10)),
                o = r / i;
              return o >= a ? (i *= 10) : o >= u ? (i *= 5) : o >= l && (i *= 2), n < t ? -i : i;
            })(t, n, e);
          switch ((r = or(null == r ? ',f' : r)).type) {
            case 's':
              var s = Math.max(Math.abs(t), Math.abs(n));
              return (
                null != r.precision ||
                  isNaN(
                    (i = (function (t, n) {
                      return Math.max(
                        0,
                        3 * Math.max(-8, Math.min(8, Math.floor(er(n) / 3))) - er(Math.abs(t)),
                      );
                    })(o, s)),
                  ) ||
                  (r.precision = i),
                hr(r, s)
              );
            case '':
            case 'e':
            case 'g':
            case 'p':
            case 'r':
              null != r.precision ||
                isNaN(
                  (i = (function (t, n) {
                    return (t = Math.abs(t)), (n = Math.abs(n) - t), Math.max(0, er(n) - er(t)) + 1;
                  })(o, Math.max(Math.abs(t), Math.abs(n)))),
                ) ||
                (r.precision = i - ('e' === r.type));
              break;
            case 'f':
            case '%':
              null != r.precision ||
                isNaN(
                  (i = (function (t) {
                    return Math.max(0, -er(Math.abs(t)));
                  })(o)),
                ) ||
                (r.precision = i - 2 * ('%' === r.type));
          }
          return fr(r);
        })(r[0], r[r.length - 1], null == t ? 10 : t, e);
      }),
      (t.nice = function (e) {
        null == e && (e = 10);
        var r,
          i = n(),
          o = 0,
          a = i.length - 1,
          u = i[o],
          l = i[a];
        return (
          l < u && ((r = u), (u = l), (l = r), (r = o), (o = a), (a = r)),
          (r = s(u, l, e)) > 0
            ? (r = s((u = Math.floor(u / r) * r), (l = Math.ceil(l / r) * r), e))
            : r < 0 && (r = s((u = Math.ceil(u * r) / r), (l = Math.floor(l * r) / r), e)),
          r > 0
            ? ((i[o] = Math.floor(u / r) * r), (i[a] = Math.ceil(l / r) * r), n(i))
            : r < 0 && ((i[o] = Math.ceil(u * r) / r), (i[a] = Math.floor(l * r) / r), n(i)),
          t
        );
      }),
      t
    );
  }
  function Sr() {
    var t = Er(xr, xr);
    return (
      (t.copy = function () {
        return Nr(t, Sr());
      }),
      vr.apply(t, arguments),
      Cr(t)
    );
  }
  function Dr(t, n) {
    for (; t.toString().length < n; ) t = '0' + t;
    return t;
  }
  function jr(t, n, e) {
    var r;
    if (e)
      if (String(e).startsWith('window')) {
        var i = +e.split('*')[1] || 1;
        r = window.innerHeight * i;
      } else r = +e;
    else r = t.getBoundingClientRect().height;
    return r > n ? r : n;
  }
  function Tr(t, n, e) {
    var r;
    if (e)
      if (String(e).startsWith('window')) {
        var i = +e.split('*')[1] || 1;
        r = window.innerWidth * i;
      } else r = +e;
    else r = t.getBoundingClientRect().width;
    return r > n ? r : n;
  }
  function Fr(t) {
    var n = new Date(t);
    if (isNaN(+n)) throw new Error('"' + t + '" is not a valid date');
    var e = n.getFullYear(),
      r = (1 + n.getMonth()).toString();
    return '' + e + (r = Dr(r, 2)) + Dr(n.getDate().toString(), 2);
  }
  function Lr(t, n) {
    var e = t.slice(0, 4),
      r = t.slice(4, 6),
      i = t.slice(6, 8),
      o = new Date(e + '-' + r + '-' + i),
      a = String(o.getDay());
    return n
      .replace(
        'MMM',
        {
          '01': 'Jan',
          '02': 'Feb',
          '03': 'Mar',
          '04': 'Apr',
          '05': 'May',
          '06': 'Jun',
          '07': 'Jul',
          '08': 'Aug',
          '09': 'Sep',
          10: 'Oct',
          11: 'Nov',
          12: 'Dec',
        }[r],
      )
      .replace('DDD', { 0: 'Sun', 1: 'Mon', 2: 'Tue', 3: 'Wed', 4: 'Thu', 5: 'Fri', 6: 'Sat' }[a])
      .replace('YYYY', e)
      .replace('MM', r)
      .replace('DD', i);
  }
  (t.d3 = {
    __proto__: null,
    axisTop: w,
    csv: Ge,
    easeLinear: Ye,
    get format() {
      return fr;
    },
    hsl: sn,
    interpolateRound: Mn,
    interval: Qn,
    json: Qe,
    max: c,
    scaleLinear: Sr,
    select: Lt,
    selectAll: function (t) {
      return 'string' == typeof t
        ? new Tt([document.querySelectorAll(t)], [document.documentElement])
        : new Tt([null == t ? [] : t], jt);
    },
    tsv: Je,
    xml: tr,
  }),
    (t.generateId = function (t, n) {
      return (
        void 0 === t && (t = 'racingbars'),
        void 0 === n && (n = 8),
        (function (t, n) {
          return (
            t +
            Array(3)
              .fill(null)
              .map(function () {
                return Math.random().toString(36).substr(2);
              })
              .join('')
              .slice(-n)
          );
        })(t, n)
      );
    }),
    (t.loadData = function (t, n) {
      switch ((void 0 === n && (n = 'json'), n)) {
        case 'json':
          return Qe(t);
        case 'csv':
          return Ge(t);
        case 'tsv':
          return Je(t);
        case 'xml':
          return tr(t);
        default:
          throw new Error('Unsupported data type: ' + n);
      }
    }),
    (t.race = function (t, e) {
      void 0 === e && (e = {});
      var r = e.dataShape || 'long',
        i = e.fillDateGaps,
        o = e.selector || '#race',
        a = e.startDate ? Fr(e.startDate) : '',
        u = e.endDate ? Fr(e.endDate) : '',
        l = e.colorSeed || '',
        s = e.disableGroupColors || !1,
        f = Number(e.tickDuration) || 500,
        h = Number(e.topN) || 10,
        d = !1 !== e.disableClickEvents,
        p = e.disableKeyboardEvents,
        v = !1 !== e.autorun,
        g = !1 !== e.injectStyles,
        y = {
          selector: o,
          title: e.title || '18 years of Top Global Brands',
          subTitle: e.subTitle || 'Brand value, $m',
          caption: e.caption || 'Source: Interbrand',
          dateCounterFormat: e.dateCounterFormat || 'YYYY',
          labelsOnBars: !1 !== e.labelsOnBars,
          labelsWidth: e.labelsWidth || 100,
          showControls: e.showControls || 'all',
          showOverlays: e.showOverlays || 'all',
          inputHeight: e.height,
          inputWidth: e.width,
          minHeight: 300,
          minWidth: 500,
          tickDuration: f,
          topN: h,
        },
        m = { loop: e.loop || !1, tickDuration: f },
        _ = document.querySelector(o);
      if (!_) throw new Error('Cannot find element with this selector: ' + o);
      g &&
        (function (t, n, e) {
          if (
            (void 0 === n && (n = 'top'),
            void 0 === e &&
              (e =
                '\n#selector text {\n  font-size: 16px;\n  font-family: Open Sans, sans-serif;\n}\n\n#selector text.title {\n  font-size: 24px;\n  font-weight: 500;\n}\n\n#selector text.subTitle {\n  font-weight: 500;\n  fill: #777777;\n}\n\n#selector text.caption {\n  font-weight: 400;\n  font-size: 24px;\n  fill: #777777;\n}\n\n#selector text.label {\n  font-weight: 600;\n}\n\n#selector text.valueLabel {\n  font-weight: 300;\n}\n\n#selector text.dateCounterText {\n  font-size: 64px;\n  font-weight: 700;\n  opacity: 0.25;\n}\n\n#selector .tick text {\n  fill: #777777;\n}\n\n#selector .xAxis .tick:nth-child(2) text {\n  text-anchor: start;\n}\n\n#selector .tick line {\n  shape-rendering: CrispEdges;\n  stroke: #dddddd;\n}\n\n#selector .tick line.origin {\n  stroke: #aaaaaa;\n}\n\n#selector path.domain {\n  display: none;\n}\n\n#selector {\n  position: relative;\n}\n\n#selector .controls {\n  /*  width and right are set dynamically in renderer.ts */\n  position: absolute;\n  top: 0;\n  display: flex;\n}\n\n#selector .controls div,\n#selector .overlay div {\n  cursor: pointer;\n  font-size: 24px;\n  font-weight: 700;\n  width: 38px;\n  height: 38px;\n  color: #ffffff;\n  background: #777777;\n  border: 1px solid black;\n  opacity: 0.5;\n  -moz-border-radius: 5px;\n  -webkit-border-radius: 5px;\n  border-radius: 5px;\n  margin: 5px;\n  text-align: center;\n}\n\n#selector .controls div:hover,\n#selector .overlay div:hover {\n  background: #aaaaaa;\n  color: black;\n}\n\n#selector .controls svg {\n  margin: 7px auto;\n}\n\n#selector .overlay {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: black;\n  opacity: 0.7;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n#selector .overlay div {\n  position: relative;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 200px;\n  height: 200px;\n  -moz-border-radius: 100px;\n  -webkit-border-radius: 100px;\n  border-radius: 100px;\n}\n#selector .overlay svg {\n  height: 50%;\n  width: 50%;\n}\n'),
            e && 'undefined' != typeof document)
          ) {
            e = e.split('#selector').join(t);
            var r = document.head || document.getElementsByTagName('head')[0],
              i = document.createElement('style');
            (i.type = 'text/css'),
              'top' === n && r.firstChild ? r.insertBefore(i, r.firstChild) : r.appendChild(i),
              i.styleSheet ? (i.styleSheet.cssText = e) : i.appendChild(document.createTextNode(e));
          }
        })(o, 'top');
      var x,
        b = (function (t, e) {
          var r, i, o, a, u, l, s, f, h, d, p, v, g;
          function y(t, n) {
            void 0 === n && (n = ''),
              t
                ? ((p.play.style.display = 'none'), (p.pause.style.display = 'unset'))
                : ((p.play.style.display = 'unset'), (p.pause.style.display = 'none')),
              'first' !== n || ('all' !== v && 'play' !== v)
                ? 'last' !== n || ('all' !== v && 'repeat' !== v)
                  ? ((p.container.style.visibility = 'unset'), (g.container.style.display = 'none'))
                  : ((p.container.style.visibility = 'hidden'),
                    (g.container.style.display = 'flex'),
                    (g.overlayPlay.style.display = 'none'),
                    (g.overlayRepeat.style.display = 'flex'))
                : ((p.container.style.visibility = 'hidden'),
                  (g.container.style.display = 'flex'),
                  (g.overlayPlay.style.display = 'flex'),
                  (g.overlayRepeat.style.display = 'none'));
          }
          return {
            renderInitalView: function (t) {
              var n = e.selector,
                m = e.title,
                _ = e.subTitle,
                x = e.caption,
                b = e.dateCounterFormat,
                k = e.labelsOnBars,
                M = e.labelsWidth,
                A = e.showControls,
                N = e.inputHeight,
                E = e.inputWidth,
                C = e.minHeight,
                S = e.minWidth,
                D = e.topN;
              v = e.showOverlays;
              var j,
                T,
                F = t.length > 0 ? t[0].date : '',
                L = document.querySelector(n);
              (h = jr(L, C, N)),
                (d = Tr(L, S, E)),
                (i = Lt(n).append('svg').attr('width', d).attr('height', h)),
                (l =
                  (h -
                    ((r = { top: 80, right: 0, bottom: 5, left: 0 + (k ? 0 : M) }).bottom +
                      r.top)) /
                  (5 * D)),
                i.append('text').attr('class', 'title').attr('y', 24).html(m),
                i.append('text').attr('class', 'subTitle').attr('y', 55).html(_),
                (o = Sr()
                  .domain([
                    0,
                    c(t, function (t) {
                      return t.value;
                    }),
                  ])
                  .range([r.left, d - r.right - 65])),
                (a = Sr()
                  .domain([D, 0])
                  .range([h - r.bottom, r.top])),
                (u = w(o)
                  .ticks(d > 500 ? 5 : 2)
                  .tickSize(-(h - r.top - r.bottom))
                  .tickFormat(function (t) {
                    return fr(',')(t);
                  })),
                i
                  .append('g')
                  .attr('class', 'axis xAxis')
                  .attr('transform', 'translate(0, ' + r.top + ')')
                  .call(u)
                  .selectAll('.tick line')
                  .classed('origin', function (t) {
                    return 0 === t;
                  }),
                i
                  .selectAll('rect.bar')
                  .data(t, function (t) {
                    return t.name;
                  })
                  .enter()
                  .append('rect')
                  .attr('class', 'bar')
                  .attr('x', o(0) + 1)
                  .attr('width', function (t) {
                    return Math.abs(o(t.value) - o(0) - 1);
                  })
                  .attr('y', function (t) {
                    return a(t.rank) + 5;
                  })
                  .attr('height', a(1) - a(0) - l)
                  .style('fill', function (t) {
                    return t.color;
                  }),
                (f = k
                  ? function (t) {
                      return o(t.value) - 8;
                    }
                  : r.left - 8),
                i
                  .selectAll('text.label')
                  .data(t, function (t) {
                    return t.name;
                  })
                  .enter()
                  .append('text')
                  .attr('class', 'label')
                  .attr('x', f)
                  .attr('y', function (t) {
                    return a(t.rank) + 5 + (a(1) - a(0)) / 2 + 1;
                  })
                  .style('text-anchor', 'end')
                  .html(function (t) {
                    return t.name;
                  }),
                i
                  .selectAll('text.valueLabel')
                  .data(t, function (t) {
                    return t.name;
                  })
                  .enter()
                  .append('text')
                  .attr('class', 'valueLabel')
                  .attr('x', function (t) {
                    return o(t.value) + 5;
                  })
                  .attr('y', function (t) {
                    return a(t.rank) + 5 + (a(1) - a(0)) / 2 + 1;
                  })
                  .text(function (t) {
                    return fr(',.0f')(t.lastValue);
                  }),
                (s = i
                  .append('text')
                  .attr('class', 'dateCounterText')
                  .attr('x', d - r.right - l)
                  .attr('y', h - 40)
                  .style('text-anchor', 'end')
                  .html(Lr(F, b))
                  .call(function (t, n) {
                    t.select(function () {
                      return this.parentNode.insertBefore(this.cloneNode(!0), this);
                    })
                      .style('fill', '#ffffff')
                      .style('stroke', '#ffffff')
                      .style('stroke-width', n)
                      .style('stroke-linejoin', 'round')
                      .style('opacity', 1);
                  }, 10)),
                i
                  .append('text')
                  .attr('class', 'caption')
                  .attr('x', d - r.right - l - 10)
                  .attr('y', h - r.bottom - l)
                  .style('text-anchor', 'end')
                  .html(x),
                (function () {
                  var t = {},
                    e = L.getBoundingClientRect().width;
                  Lt(n)
                    .append('div')
                    .classed('controls', !0)
                    .style('width', d)
                    .style('right', e - d + r.right + l + 'px')
                    .call(function (n) {
                      t.container = n.node();
                    })
                    .selectAll('div')
                    .data([
                      {
                        skipBack:
                          '<svg viewBox="0 0 32 32" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"><title/><g id="pravious"><path d="M28.46,4a3,3,0,0,0-3,.07l-15.2,9.41A3,3,0,0,0,9,15V5A3,3,0,0,0,6,2H5A3,3,0,0,0,2,5V27a3,3,0,0,0,3,3H6a3,3,0,0,0,3-3V17a3,3,0,0,0,1.22,1.53L25.42,28a3,3,0,0,0,1.58.46,3,3,0,0,0,3-3V6.59A3,3,0,0,0,28.46,4Z"/></g></svg>',
                      },
                      {
                        play: '<svg viewBox="0 0 32 32" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"><title/><g id="Play"><path d="M26.78,13.45,11.58,4A3,3,0,0,0,7,6.59V25.41a3,3,0,0,0,3,3A3,3,0,0,0,11.58,28l15.2-9.41a3,3,0,0,0,0-5.1Z"/></g></svg>',
                      },
                      {
                        pause:
                          '<svg viewBox="0 0 32 32" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"><title/><g id="pause"><rect height="28" rx="1" width="7" x="7" y="2"/><rect height="28" rx="1" width="7" x="18" y="2"/></g></svg>',
                      },
                      {
                        skipForward:
                          '<svg viewBox="0 0 32 32" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"><title/><g id="forward"><path d="M27,2H26a3,3,0,0,0-3,3V15a3,3,0,0,0-1.22-1.53L6.58,4A3,3,0,0,0,2,6.59V25.41a3,3,0,0,0,3,3A3,3,0,0,0,6.58,28l15.2-9.41A3,3,0,0,0,23,17V27a3,3,0,0,0,3,3h1a3,3,0,0,0,3-3V5A3,3,0,0,0,27,2Z"/></g></svg>',
                      },
                    ])
                    .enter()
                    .append('div')
                    .html(function (t) {
                      return Object.values(t)[0];
                    })
                    .each(function (n) {
                      var e = Object.keys(n)[0];
                      Lt(this).classed(e, !0), (t[e] = this);
                    }),
                    (p = t),
                    'play' === A &&
                      ((p.skipBack.style.visibility = 'hidden'),
                      (p.skipForward.style.visibility = 'hidden')),
                    'none' === A && Lt(n + ' .controls').style('display', 'none');
                })(),
                (j = [
                  {
                    overlayPlay:
                      '<svg viewBox="0 0 32 32" fill="currentColor" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"><title/><g id="Play"><path d="M26.78,13.45,11.58,4A3,3,0,0,0,7,6.59V25.41a3,3,0,0,0,3,3A3,3,0,0,0,11.58,28l15.2-9.41a3,3,0,0,0,0-5.1Z"/></g></svg>',
                  },
                  {
                    overlayRepeat:
                      '<svg viewBox="0 0 32 32" fill="currentColor" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"><title/><g id="reload"><path d="M18,4A12,12,0,0,0,6.05,15H3a1,1,0,0,0-.88.53,1,1,0,0,0,0,1l4,6a1,1,0,0,0,1.66,0l4-6a1,1,0,0,0,.05-1A1,1,0,0,0,11,15H8.05A10,10,0,1,1,18,26a1,1,0,0,0,0,2A12,12,0,0,0,18,4Z"/></g></svg>',
                  },
                ]),
                (T = {}),
                Lt(n)
                  .append('div')
                  .classed('overlay', !0)
                  .style('minHeight', C + 'px')
                  .style('minWidth', S + 'px')
                  .call(function (t) {
                    T.container = t.node();
                  })
                  .selectAll('div')
                  .data(j)
                  .enter()
                  .append('div')
                  .html(function (t) {
                    return Object.values(t)[0];
                  })
                  .attr('class', function (t) {
                    return Object.keys(t)[0];
                  })
                  .each(function (t) {
                    T[Object.keys(t)[0]] = this;
                  }),
                (g = T),
                y(!1, 'first');
            },
            renderFrame: function (t) {
              if (o) {
                var n = e.tickDuration,
                  r = e.topN,
                  h = e.dateCounterFormat,
                  d = t.length > 0 ? t[0].date : '';
                o.domain([
                  0,
                  c(t, function (t) {
                    return t.value;
                  }),
                ]),
                  i.select('.xAxis').transition().duration(n).ease(Ye).call(u);
                var p = i.selectAll('.bar').data(t, function (t) {
                  return t.name;
                });
                p
                  .enter()
                  .append('rect')
                  .attr('class', function (t) {
                    return 'bar ' + t.name.replace(/\s/g, '_');
                  })
                  .attr('x', o(0) + 1)
                  .attr('width', function (t) {
                    return Math.abs(o(t.value) - o(0) - 1);
                  })
                  .attr('y', function () {
                    return a(r + 1) + 5;
                  })
                  .attr('height', a(1) - a(0) - l)
                  .style('fill', function (t) {
                    return t.color;
                  })
                  .transition()
                  .duration(n)
                  .ease(Ye)
                  .attr('y', function (t) {
                    return a(t.rank) + 5;
                  }),
                  p
                    .transition()
                    .duration(n)
                    .ease(Ye)
                    .attr('width', function (t) {
                      return Math.abs(o(t.value) - o(0) - 1);
                    })
                    .attr('y', function (t) {
                      return a(t.rank) + 5;
                    }),
                  p
                    .exit()
                    .transition()
                    .duration(n)
                    .ease(Ye)
                    .attr('width', function (t) {
                      return Math.abs(o(t.value) - o(0) - 1);
                    })
                    .attr('y', function () {
                      return a(r + 1) + 5;
                    })
                    .remove();
                var v = i.selectAll('.label').data(t, function (t) {
                  return t.name;
                });
                v
                  .enter()
                  .append('text')
                  .attr('class', 'label')
                  .attr('x', f)
                  .attr('y', function () {
                    return a(r + 1) + 5 + (a(1) - a(0)) / 2;
                  })
                  .style('text-anchor', 'end')
                  .html(function (t) {
                    return t.name;
                  })
                  .transition()
                  .duration(n)
                  .ease(Ye)
                  .attr('y', function (t) {
                    return a(t.rank) + 5 + (a(1) - a(0)) / 2 + 1;
                  }),
                  v
                    .transition()
                    .duration(n)
                    .ease(Ye)
                    .attr('x', f)
                    .attr('y', function (t) {
                      return a(t.rank) + 5 + (a(1) - a(0)) / 2 + 1;
                    }),
                  v
                    .exit()
                    .transition()
                    .duration(n)
                    .ease(Ye)
                    .attr('x', f)
                    .attr('y', function () {
                      return a(r + 1) + 5;
                    })
                    .remove();
                var g = i.selectAll('.valueLabel').data(t, function (t) {
                  return t.name;
                });
                g
                  .enter()
                  .append('text')
                  .attr('class', 'valueLabel')
                  .attr('x', function (t) {
                    return o(t.value) + 5;
                  })
                  .attr('y', function () {
                    return a(r + 1) + 5;
                  })
                  .text(function (t) {
                    return fr(',.0f')(t.lastValue);
                  })
                  .transition()
                  .duration(n)
                  .ease(Ye)
                  .attr('y', function (t) {
                    return a(t.rank) + 5 + (a(1) - a(0)) / 2 + 1;
                  }),
                  g
                    .transition()
                    .duration(n)
                    .ease(Ye)
                    .attr('x', function (t) {
                      return o(t.value) + 5;
                    })
                    .attr('y', function (t) {
                      return a(t.rank) + 5 + (a(1) - a(0)) / 2 + 1;
                    })
                    .tween('text', function (t) {
                      var n = Mn(t.lastValue, t.value);
                      return function (t) {
                        this.textContent = fr(',')(n(t));
                      };
                    }),
                  g
                    .exit()
                    .transition()
                    .duration(n)
                    .ease(Ye)
                    .attr('x', function (t) {
                      return o(t.value) + 5;
                    })
                    .attr('y', function () {
                      return a(r + 1) + 5;
                    })
                    .remove(),
                  s.html(Lr(d, h));
              }
            },
            resize: function (n) {
              if (
                (!e.inputHeight && !e.inputWidth) ||
                String(e.inputHeight).startsWith('window') ||
                String(e.inputWidth).startsWith('window')
              ) {
                var r = document.querySelector(t);
                (h = jr(r, e.minHeight, e.inputHeight)), (d = Tr(r, e.minWidth, e.inputWidth));
                var i = r.style.position;
                n(), (r.style.position = i);
              }
            },
            updateControls: y,
            getRenderedHeight: function () {
              return h;
            },
            getRenderedWidth: function () {
              return d;
            },
            getControls: function () {
              return n(n({}, p), g);
            },
          };
        })(o, y),
        k = (function (t) {
          var n, e, r, i, o, a;
          function u() {
            f(!0),
              (n = Qn(function (n) {
                e.isLast() ? (a(), o ? c() : (l(), t(r, 'last'))) : e.inc();
              }, i)),
              t(r, '');
          }
          function l() {
            n && n.stop(), f(!1);
          }
          function s() {
            l(), e.setFirst(), a(), t(r, 'first');
          }
          function c() {
            e.setFirst(), a();
          }
          function f(n) {
            void 0 === n && (n = !0), (r = n);
            var i = e.isLast() ? 'last' : e.isFirst() ? 'first' : '';
            t(r, i);
          }
          return {
            tickerDateFactory: function (t, n, r, u) {
              (i = n.tickDuration), (o = n.loop), (a = u);
              var l,
                s = 0,
                c = t.length - 1,
                f = t[c];
              function h() {
                r((l = t[s]));
              }
              return (e = {
                inc: function (t) {
                  void 0 === t && (t = 1);
                  var n = s + t;
                  (s = n > c ? c : n), h();
                },
                dec: function (t) {
                  void 0 === t && (t = 1);
                  var n = s - t;
                  (s = n < 0 ? 0 : n), h();
                },
                setFirst: function () {
                  (s = 0), h();
                },
                setLast: function () {
                  (s = t.length - 1), h();
                },
                update: function () {
                  h();
                },
                getDate: function () {
                  return l;
                },
                setDate: function (n) {
                  var e = t.indexOf(n);
                  e > -1 && ((s = e), h());
                },
                isFirst: function () {
                  return l === t[0];
                },
                isLast: function () {
                  return l === f;
                },
              });
            },
            start: u,
            stop: l,
            rewind: s,
            loop: c,
            fastForward: function () {
              l(), e.setLast(), a(), t(r, 'last');
            },
            toggle: function () {
              e.isLast() ? (s(), u()) : r ? l() : u();
            },
            isRunning: function () {
              return r;
            },
          };
        })(function (t, n) {
          b.updateControls(t, n);
        }),
        M = (function (t) {
          var n = new Set();
          return (
            t.forEach(function (t) {
              n.add(t.date);
            }),
            Array.from(n).sort()
          );
        })(
          (t = (function (t, e, r, i) {
            var o;
            return (
              'wide' === e &&
                ((o = []),
                t.forEach(function (t) {
                  for (var n = 0, e = Object.entries(t); n < e.length; n++) {
                    var r = e[n];
                    o.push({ date: t.date, name: r[0], value: Number(r[1]) });
                  }
                }),
                (t = o)),
              t.map(function (t) {
                var e = n({}, t);
                return (
                  (e.value = isNaN(+e.value) ? 0 : +e.value),
                  (e.date = Fr(e.date)),
                  (e.color = (function (t, n, e) {
                    return sn(
                      360 *
                        ((r = (function (t) {
                          for (var n = '', e = 0; e < t.length; e++)
                            n += Dr(String(t.charCodeAt(e)), 3);
                          return n;
                        })((t.group && !n ? t.group : t.name) + e)),
                        (i = 1e4 * Math.sin(+r)) - Math.floor(i)),
                      0.75,
                      0.75,
                    );
                    var r, i;
                  })(e, r, i)),
                  e
                );
              })
            );
          })(
            (t = (function (t, n, e) {
              return t
                .filter(function (t) {
                  return !n || t.date >= n;
                })
                .filter(function (t) {
                  return !e || t.date <= e;
                });
            })(t, a, u)),
            r,
            s,
            l,
          )),
        );
      i &&
        (t = (function (t, e, r) {
          var i = new Date(Lr(e[0], 'YYYY-MM-DD')),
            o = new Date(Lr(e[e.length - 1], 'YYYY-MM-DD')),
            a = {
              years: function (t) {
                t.setFullYear(t.getFullYear() + 1);
              },
              months: function (t) {
                t.setMonth(t.getMonth() + 1);
              },
              days: function (t) {
                t.setDate(t.getDate() + 1);
              },
            };
          if (!a[r]) return t;
          for (var u = [], l = i; l < o; a[r](l)) u.push(Fr(l));
          return (
            u.forEach(function (e, r) {
              if (
                !(
                  t.filter(function (t) {
                    return t.date === e;
                  }).length > 0
                )
              ) {
                var i = t
                  .filter(function (t) {
                    return t.date === u[r - 1];
                  })
                  .map(function (t) {
                    return n(n({}, t), {}, { date: e });
                  });
                t.push.apply(t, i);
              }
            }),
            t
          );
        })(t, M, i));
      var A,
        N = k.tickerDateFactory(
          M,
          m,
          function (e) {
            (A = (function (t, e, r, i) {
              return t
                .filter(function (t) {
                  return t.date === e && !isNaN(t.value);
                })
                .map(function (t) {
                  if (!r[t.name]) return t;
                  var e = r[t.name].value;
                  return (
                    (r[t.name].date = t.date),
                    (r[t.name].value = t.value),
                    n(n({}, t), {}, { lastValue: e })
                  );
                })
                .sort(function (t, n) {
                  return n.value - t.value;
                })
                .slice(0, i)
                .map(function (t, e) {
                  return n(n({}, t), {}, { rank: e });
                });
            })(t, N.getDate(), x, h)),
              C(),
              _.dispatchEvent(
                new CustomEvent('dateChanged', { detail: { date: Lr(e, 'YYYY-MM-DD') } }),
              );
          },
          C,
        );
      function E() {
        (_.innerHTML = ''), b.renderInitalView(A), k.stop();
        var t = b.getControls();
        !(function (t) {
          t &&
            (t.skipBack.addEventListener('click', k.rewind),
            t.play.addEventListener('click', k.toggle),
            t.pause.addEventListener('click', k.toggle),
            t.skipForward.addEventListener('click', k.fastForward));
        })(t),
          (function (t) {
            t &&
              (t.overlayPlay.addEventListener('click', k.start),
              t.overlayRepeat.addEventListener('click', function () {
                k.rewind(), k.start();
              }));
          })(t);
      }
      function C() {
        b.renderFrame(A);
      }
      return (
        (x = {}),
        t.forEach(function (t) {
          (t.lastValue = t.value),
            (!x[t.name] || t.date < x[t.name].date) &&
              (x[t.name] = { date: t.date, value: t.value });
        }),
        N.setFirst(),
        E(),
        C(),
        k.start(),
        v || k.stop(),
        d ||
          (_.querySelector('svg').addEventListener('click', k.toggle),
          _.addEventListener('dblclick', k.fastForward)),
        p ||
          document.addEventListener('keypress', function (t) {
            switch (t.keyCode) {
              case 32:
                k.toggle();
                break;
              case 97:
                k.rewind();
                break;
              case 115:
                k.toggle();
                break;
              case 100:
                k.fastForward();
            }
          }),
        window.addEventListener('resize', function () {
          b.resize(function () {
            var t = k.isRunning();
            N.update(), E(), t && k.start();
          });
        }),
        {
          start: function () {
            k.isRunning() || k.start();
          },
          stop: function () {
            k.stop();
          },
          rewind: function () {
            k.rewind();
          },
          fastforward: function () {
            k.fastForward();
          },
          loop: function () {
            k.loop();
          },
          inc: function (t) {
            void 0 === t && (t = 1), N.inc(t);
          },
          dec: function (t) {
            void 0 === t && (t = 1), N.dec(t);
          },
          getDate: function () {
            return N.getDate();
          },
          setDate: function (t) {
            N.setDate(Fr(t));
          },
          getAllDates: function () {
            return M.map(function (t) {
              return Lr(t, 'YYYY-MM-DD');
            });
          },
          createScroller: function () {
            !(function () {
              !(function () {
                (_.style.position = 'fixed'), (_.style.top = '0');
                var t = document.createElement('div');
                (t.style.height = 10 * window.innerHeight + 'px'), document.body.appendChild(t);
              })();
              var t = document.body.clientHeight / M.length;
              window.addEventListener('scroll', function () {
                var n = Math.ceil(window.pageYOffset / t);
                n < M.length ? N.setDate(M[n]) : N.setLast();
              });
            })();
          },
        }
      );
    });
});
//# sourceMappingURL=racing-bars.umd.js.map
