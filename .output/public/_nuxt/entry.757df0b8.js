function gr(e, t) {
  const n = Object.create(null),
    r = e.split(",");
  for (let s = 0; s < r.length; s++) n[r[s]] = !0;
  return t ? (s) => !!n[s.toLowerCase()] : (s) => !!n[s];
}
function En(e) {
  if (D(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n],
        s = ie(r) ? vi(r) : En(r);
      if (s) for (const o in s) t[o] = s[o];
    }
    return t;
  } else {
    if (ie(e)) return e;
    if (te(e)) return e;
  }
}
const _i = /;(?![^(]*\))/g,
  bi = /:([^]+)/,
  wi = /\/\*.*?\*\//gs;
function vi(e) {
  const t = {};
  return (
    e
      .replace(wi, "")
      .split(_i)
      .forEach((n) => {
        if (n) {
          const r = n.split(bi);
          r.length > 1 && (t[r[0].trim()] = r[1].trim());
        }
      }),
    t
  );
}
function xn(e) {
  let t = "";
  if (ie(e)) t = e;
  else if (D(e))
    for (let n = 0; n < e.length; n++) {
      const r = xn(e[n]);
      r && (t += r + " ");
    }
  else if (te(e)) for (const n in e) e[n] && (t += n + " ");
  return t.trim();
}
function Nu(e) {
  if (!e) return null;
  let { class: t, style: n } = e;
  return t && !ie(t) && (e.class = xn(t)), n && (e.style = En(n)), e;
}
const Ei =
    "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
  xi = gr(Ei);
function Ns(e) {
  return !!e || e === "";
}
const Ti = (e) =>
    ie(e)
      ? e
      : e == null
      ? ""
      : D(e) || (te(e) && (e.toString === Ws || !B(e.toString)))
      ? JSON.stringify(e, Us, 2)
      : String(e),
  Us = (e, t) =>
    t && t.__v_isRef
      ? Us(e, t.value)
      : ht(t)
      ? {
          [`Map(${t.size})`]: [...t.entries()].reduce(
            (n, [r, s]) => ((n[`${r} =>`] = s), n),
            {}
          ),
        }
      : Bs(t)
      ? { [`Set(${t.size})`]: [...t.values()] }
      : te(t) && !D(t) && !Ks(t)
      ? String(t)
      : t,
  Z = {},
  dt = [],
  Ce = () => {},
  Ci = () => !1,
  Ri = /^on[^a-z]/,
  Bt = (e) => Ri.test(e),
  mr = (e) => e.startsWith("onUpdate:"),
  de = Object.assign,
  yr = (e, t) => {
    const n = e.indexOf(t);
    n > -1 && e.splice(n, 1);
  },
  Pi = Object.prototype.hasOwnProperty,
  J = (e, t) => Pi.call(e, t),
  D = Array.isArray,
  ht = (e) => Tn(e) === "[object Map]",
  Bs = (e) => Tn(e) === "[object Set]",
  B = (e) => typeof e == "function",
  ie = (e) => typeof e == "string",
  _r = (e) => typeof e == "symbol",
  te = (e) => e !== null && typeof e == "object",
  Ds = (e) => te(e) && B(e.then) && B(e.catch),
  Ws = Object.prototype.toString,
  Tn = (e) => Ws.call(e),
  ki = (e) => Tn(e).slice(8, -1),
  Ks = (e) => Tn(e) === "[object Object]",
  br = (e) =>
    ie(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
  Ot = gr(
    ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
  ),
  Cn = (e) => {
    const t = Object.create(null);
    return (n) => t[n] || (t[n] = e(n));
  },
  Si = /-(\w)/g,
  He = Cn((e) => e.replace(Si, (t, n) => (n ? n.toUpperCase() : ""))),
  Oi = /\B([A-Z])/g,
  xt = Cn((e) => e.replace(Oi, "-$1").toLowerCase()),
  Rn = Cn((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  Fn = Cn((e) => (e ? `on${Rn(e)}` : "")),
  jt = (e, t) => !Object.is(e, t),
  Ln = (e, t) => {
    for (let n = 0; n < e.length; n++) e[n](t);
  },
  an = (e, t, n) => {
    Object.defineProperty(e, t, { configurable: !0, enumerable: !1, value: n });
  },
  Hi = (e) => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t;
  },
  Ai = (e) => {
    const t = ie(e) ? Number(e) : NaN;
    return isNaN(t) ? e : t;
  };
let Jr;
const Ii = () =>
  Jr ||
  (Jr =
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
      ? self
      : typeof window < "u"
      ? window
      : typeof global < "u"
      ? global
      : {});
let ye;
class qs {
  constructor(t = !1) {
    (this.detached = t),
      (this._active = !0),
      (this.effects = []),
      (this.cleanups = []),
      (this.parent = ye),
      !t && ye && (this.index = (ye.scopes || (ye.scopes = [])).push(this) - 1);
  }
  get active() {
    return this._active;
  }
  run(t) {
    if (this._active) {
      const n = ye;
      try {
        return (ye = this), t();
      } finally {
        ye = n;
      }
    }
  }
  on() {
    ye = this;
  }
  off() {
    ye = this.parent;
  }
  stop(t) {
    if (this._active) {
      let n, r;
      for (n = 0, r = this.effects.length; n < r; n++) this.effects[n].stop();
      for (n = 0, r = this.cleanups.length; n < r; n++) this.cleanups[n]();
      if (this.scopes)
        for (n = 0, r = this.scopes.length; n < r; n++) this.scopes[n].stop(!0);
      if (!this.detached && this.parent && !t) {
        const s = this.parent.scopes.pop();
        s &&
          s !== this &&
          ((this.parent.scopes[this.index] = s), (s.index = this.index));
      }
      (this.parent = void 0), (this._active = !1);
    }
  }
}
function Js(e) {
  return new qs(e);
}
function Mi(e, t = ye) {
  t && t.active && t.effects.push(e);
}
function zs() {
  return ye;
}
function $i(e) {
  ye && ye.cleanups.push(e);
}
const wr = (e) => {
    const t = new Set(e);
    return (t.w = 0), (t.n = 0), t;
  },
  Qs = (e) => (e.w & qe) > 0,
  Xs = (e) => (e.n & qe) > 0,
  ji = ({ deps: e }) => {
    if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= qe;
  },
  Fi = (e) => {
    const { deps: t } = e;
    if (t.length) {
      let n = 0;
      for (let r = 0; r < t.length; r++) {
        const s = t[r];
        Qs(s) && !Xs(s) ? s.delete(e) : (t[n++] = s),
          (s.w &= ~qe),
          (s.n &= ~qe);
      }
      t.length = n;
    }
  },
  fn = new WeakMap();
let St = 0,
  qe = 1;
const Xn = 30;
let Te;
const et = Symbol(""),
  Yn = Symbol("");
class vr {
  constructor(t, n = null, r) {
    (this.fn = t),
      (this.scheduler = n),
      (this.active = !0),
      (this.deps = []),
      (this.parent = void 0),
      Mi(this, r);
  }
  run() {
    if (!this.active) return this.fn();
    let t = Te,
      n = Be;
    for (; t; ) {
      if (t === this) return;
      t = t.parent;
    }
    try {
      return (
        (this.parent = Te),
        (Te = this),
        (Be = !0),
        (qe = 1 << ++St),
        St <= Xn ? ji(this) : zr(this),
        this.fn()
      );
    } finally {
      St <= Xn && Fi(this),
        (qe = 1 << --St),
        (Te = this.parent),
        (Be = n),
        (this.parent = void 0),
        this.deferStop && this.stop();
    }
  }
  stop() {
    Te === this
      ? (this.deferStop = !0)
      : this.active &&
        (zr(this), this.onStop && this.onStop(), (this.active = !1));
  }
}
function zr(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++) t[n].delete(e);
    t.length = 0;
  }
}
let Be = !0;
const Ys = [];
function Tt() {
  Ys.push(Be), (Be = !1);
}
function Ct() {
  const e = Ys.pop();
  Be = e === void 0 ? !0 : e;
}
function ge(e, t, n) {
  if (Be && Te) {
    let r = fn.get(e);
    r || fn.set(e, (r = new Map()));
    let s = r.get(n);
    s || r.set(n, (s = wr())), Vs(s);
  }
}
function Vs(e, t) {
  let n = !1;
  St <= Xn ? Xs(e) || ((e.n |= qe), (n = !Qs(e))) : (n = !e.has(Te)),
    n && (e.add(Te), Te.deps.push(e));
}
function Me(e, t, n, r, s, o) {
  const i = fn.get(e);
  if (!i) return;
  let l = [];
  if (t === "clear") l = [...i.values()];
  else if (n === "length" && D(e)) {
    const c = Number(r);
    i.forEach((a, u) => {
      (u === "length" || u >= c) && l.push(a);
    });
  } else
    switch ((n !== void 0 && l.push(i.get(n)), t)) {
      case "add":
        D(e)
          ? br(n) && l.push(i.get("length"))
          : (l.push(i.get(et)), ht(e) && l.push(i.get(Yn)));
        break;
      case "delete":
        D(e) || (l.push(i.get(et)), ht(e) && l.push(i.get(Yn)));
        break;
      case "set":
        ht(e) && l.push(i.get(et));
        break;
    }
  if (l.length === 1) l[0] && Vn(l[0]);
  else {
    const c = [];
    for (const a of l) a && c.push(...a);
    Vn(wr(c));
  }
}
function Vn(e, t) {
  const n = D(e) ? e : [...e];
  for (const r of n) r.computed && Qr(r);
  for (const r of n) r.computed || Qr(r);
}
function Qr(e, t) {
  (e !== Te || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run());
}
function Li(e, t) {
  var n;
  return (n = fn.get(e)) === null || n === void 0 ? void 0 : n.get(t);
}
const Ni = gr("__proto__,__v_isRef,__isVue"),
  Zs = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter((e) => e !== "arguments" && e !== "caller")
      .map((e) => Symbol[e])
      .filter(_r)
  ),
  Ui = Er(),
  Bi = Er(!1, !0),
  Di = Er(!0),
  Xr = Wi();
function Wi() {
  const e = {};
  return (
    ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
      e[t] = function (...n) {
        const r = z(this);
        for (let o = 0, i = this.length; o < i; o++) ge(r, "get", o + "");
        const s = r[t](...n);
        return s === -1 || s === !1 ? r[t](...n.map(z)) : s;
      };
    }),
    ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
      e[t] = function (...n) {
        Tt();
        const r = z(this)[t].apply(this, n);
        return Ct(), r;
      };
    }),
    e
  );
}
function Ki(e) {
  const t = z(this);
  return ge(t, "has", e), t.hasOwnProperty(e);
}
function Er(e = !1, t = !1) {
  return function (r, s, o) {
    if (s === "__v_isReactive") return !e;
    if (s === "__v_isReadonly") return e;
    if (s === "__v_isShallow") return t;
    if (s === "__v_raw" && o === (e ? (t ? il : ro) : t ? no : to).get(r))
      return r;
    const i = D(r);
    if (!e) {
      if (i && J(Xr, s)) return Reflect.get(Xr, s, o);
      if (s === "hasOwnProperty") return Ki;
    }
    const l = Reflect.get(r, s, o);
    return (_r(s) ? Zs.has(s) : Ni(s)) || (e || ge(r, "get", s), t)
      ? l
      : se(l)
      ? i && br(s)
        ? l
        : l.value
      : te(l)
      ? e
        ? so(l)
        : Je(l)
      : l;
  };
}
const qi = Gs(),
  Ji = Gs(!0);
function Gs(e = !1) {
  return function (n, r, s, o) {
    let i = n[r];
    if (st(i) && se(i) && !se(s)) return !1;
    if (
      !e &&
      (!un(s) && !st(s) && ((i = z(i)), (s = z(s))), !D(n) && se(i) && !se(s))
    )
      return (i.value = s), !0;
    const l = D(n) && br(r) ? Number(r) < n.length : J(n, r),
      c = Reflect.set(n, r, s, o);
    return (
      n === z(o) && (l ? jt(s, i) && Me(n, "set", r, s) : Me(n, "add", r, s)), c
    );
  };
}
function zi(e, t) {
  const n = J(e, t);
  e[t];
  const r = Reflect.deleteProperty(e, t);
  return r && n && Me(e, "delete", t, void 0), r;
}
function Qi(e, t) {
  const n = Reflect.has(e, t);
  return (!_r(t) || !Zs.has(t)) && ge(e, "has", t), n;
}
function Xi(e) {
  return ge(e, "iterate", D(e) ? "length" : et), Reflect.ownKeys(e);
}
const eo = { get: Ui, set: qi, deleteProperty: zi, has: Qi, ownKeys: Xi },
  Yi = {
    get: Di,
    set(e, t) {
      return !0;
    },
    deleteProperty(e, t) {
      return !0;
    },
  },
  Vi = de({}, eo, { get: Bi, set: Ji }),
  xr = (e) => e,
  Pn = (e) => Reflect.getPrototypeOf(e);
function zt(e, t, n = !1, r = !1) {
  e = e.__v_raw;
  const s = z(e),
    o = z(t);
  n || (t !== o && ge(s, "get", t), ge(s, "get", o));
  const { has: i } = Pn(s),
    l = r ? xr : n ? Rr : Ft;
  if (i.call(s, t)) return l(e.get(t));
  if (i.call(s, o)) return l(e.get(o));
  e !== s && e.get(t);
}
function Qt(e, t = !1) {
  const n = this.__v_raw,
    r = z(n),
    s = z(e);
  return (
    t || (e !== s && ge(r, "has", e), ge(r, "has", s)),
    e === s ? n.has(e) : n.has(e) || n.has(s)
  );
}
function Xt(e, t = !1) {
  return (
    (e = e.__v_raw), !t && ge(z(e), "iterate", et), Reflect.get(e, "size", e)
  );
}
function Yr(e) {
  e = z(e);
  const t = z(this);
  return Pn(t).has.call(t, e) || (t.add(e), Me(t, "add", e, e)), this;
}
function Vr(e, t) {
  t = z(t);
  const n = z(this),
    { has: r, get: s } = Pn(n);
  let o = r.call(n, e);
  o || ((e = z(e)), (o = r.call(n, e)));
  const i = s.call(n, e);
  return (
    n.set(e, t), o ? jt(t, i) && Me(n, "set", e, t) : Me(n, "add", e, t), this
  );
}
function Zr(e) {
  const t = z(this),
    { has: n, get: r } = Pn(t);
  let s = n.call(t, e);
  s || ((e = z(e)), (s = n.call(t, e))), r && r.call(t, e);
  const o = t.delete(e);
  return s && Me(t, "delete", e, void 0), o;
}
function Gr() {
  const e = z(this),
    t = e.size !== 0,
    n = e.clear();
  return t && Me(e, "clear", void 0, void 0), n;
}
function Yt(e, t) {
  return function (r, s) {
    const o = this,
      i = o.__v_raw,
      l = z(i),
      c = t ? xr : e ? Rr : Ft;
    return (
      !e && ge(l, "iterate", et), i.forEach((a, u) => r.call(s, c(a), c(u), o))
    );
  };
}
function Vt(e, t, n) {
  return function (...r) {
    const s = this.__v_raw,
      o = z(s),
      i = ht(o),
      l = e === "entries" || (e === Symbol.iterator && i),
      c = e === "keys" && i,
      a = s[e](...r),
      u = n ? xr : t ? Rr : Ft;
    return (
      !t && ge(o, "iterate", c ? Yn : et),
      {
        next() {
          const { value: h, done: y } = a.next();
          return y
            ? { value: h, done: y }
            : { value: l ? [u(h[0]), u(h[1])] : u(h), done: y };
        },
        [Symbol.iterator]() {
          return this;
        },
      }
    );
  };
}
function je(e) {
  return function (...t) {
    return e === "delete" ? !1 : this;
  };
}
function Zi() {
  const e = {
      get(o) {
        return zt(this, o);
      },
      get size() {
        return Xt(this);
      },
      has: Qt,
      add: Yr,
      set: Vr,
      delete: Zr,
      clear: Gr,
      forEach: Yt(!1, !1),
    },
    t = {
      get(o) {
        return zt(this, o, !1, !0);
      },
      get size() {
        return Xt(this);
      },
      has: Qt,
      add: Yr,
      set: Vr,
      delete: Zr,
      clear: Gr,
      forEach: Yt(!1, !0),
    },
    n = {
      get(o) {
        return zt(this, o, !0);
      },
      get size() {
        return Xt(this, !0);
      },
      has(o) {
        return Qt.call(this, o, !0);
      },
      add: je("add"),
      set: je("set"),
      delete: je("delete"),
      clear: je("clear"),
      forEach: Yt(!0, !1),
    },
    r = {
      get(o) {
        return zt(this, o, !0, !0);
      },
      get size() {
        return Xt(this, !0);
      },
      has(o) {
        return Qt.call(this, o, !0);
      },
      add: je("add"),
      set: je("set"),
      delete: je("delete"),
      clear: je("clear"),
      forEach: Yt(!0, !0),
    };
  return (
    ["keys", "values", "entries", Symbol.iterator].forEach((o) => {
      (e[o] = Vt(o, !1, !1)),
        (n[o] = Vt(o, !0, !1)),
        (t[o] = Vt(o, !1, !0)),
        (r[o] = Vt(o, !0, !0));
    }),
    [e, n, t, r]
  );
}
const [Gi, el, tl, nl] = Zi();
function Tr(e, t) {
  const n = t ? (e ? nl : tl) : e ? el : Gi;
  return (r, s, o) =>
    s === "__v_isReactive"
      ? !e
      : s === "__v_isReadonly"
      ? e
      : s === "__v_raw"
      ? r
      : Reflect.get(J(n, s) && s in r ? n : r, s, o);
}
const rl = { get: Tr(!1, !1) },
  sl = { get: Tr(!1, !0) },
  ol = { get: Tr(!0, !1) },
  to = new WeakMap(),
  no = new WeakMap(),
  ro = new WeakMap(),
  il = new WeakMap();
function ll(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function cl(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : ll(ki(e));
}
function Je(e) {
  return st(e) ? e : Cr(e, !1, eo, rl, to);
}
function al(e) {
  return Cr(e, !1, Vi, sl, no);
}
function so(e) {
  return Cr(e, !0, Yi, ol, ro);
}
function Cr(e, t, n, r, s) {
  if (!te(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
  const o = s.get(e);
  if (o) return o;
  const i = cl(e);
  if (i === 0) return e;
  const l = new Proxy(e, i === 2 ? r : n);
  return s.set(e, l), l;
}
function De(e) {
  return st(e) ? De(e.__v_raw) : !!(e && e.__v_isReactive);
}
function st(e) {
  return !!(e && e.__v_isReadonly);
}
function un(e) {
  return !!(e && e.__v_isShallow);
}
function oo(e) {
  return De(e) || st(e);
}
function z(e) {
  const t = e && e.__v_raw;
  return t ? z(t) : e;
}
function yt(e) {
  return an(e, "__v_skip", !0), e;
}
const Ft = (e) => (te(e) ? Je(e) : e),
  Rr = (e) => (te(e) ? so(e) : e);
function io(e) {
  Be && Te && ((e = z(e)), Vs(e.dep || (e.dep = wr())));
}
function lo(e, t) {
  e = z(e);
  const n = e.dep;
  n && Vn(n);
}
function se(e) {
  return !!(e && e.__v_isRef === !0);
}
function We(e) {
  return fl(e, !1);
}
function fl(e, t) {
  return se(e) ? e : new ul(e, t);
}
class ul {
  constructor(t, n) {
    (this.__v_isShallow = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this._rawValue = n ? t : z(t)),
      (this._value = n ? t : Ft(t));
  }
  get value() {
    return io(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || un(t) || st(t);
    (t = n ? t : z(t)),
      jt(t, this._rawValue) &&
        ((this._rawValue = t), (this._value = n ? t : Ft(t)), lo(this));
  }
}
function pe(e) {
  return se(e) ? e.value : e;
}
const dl = {
  get: (e, t, n) => pe(Reflect.get(e, t, n)),
  set: (e, t, n, r) => {
    const s = e[t];
    return se(s) && !se(n) ? ((s.value = n), !0) : Reflect.set(e, t, n, r);
  },
};
function co(e) {
  return De(e) ? e : new Proxy(e, dl);
}
function hl(e) {
  const t = D(e) ? new Array(e.length) : {};
  for (const n in e) t[n] = Pr(e, n);
  return t;
}
class pl {
  constructor(t, n, r) {
    (this._object = t),
      (this._key = n),
      (this._defaultValue = r),
      (this.__v_isRef = !0);
  }
  get value() {
    const t = this._object[this._key];
    return t === void 0 ? this._defaultValue : t;
  }
  set value(t) {
    this._object[this._key] = t;
  }
  get dep() {
    return Li(z(this._object), this._key);
  }
}
function Pr(e, t, n) {
  const r = e[t];
  return se(r) ? r : new pl(e, t, n);
}
var ao;
class gl {
  constructor(t, n, r, s) {
    (this._setter = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this[ao] = !1),
      (this._dirty = !0),
      (this.effect = new vr(t, () => {
        this._dirty || ((this._dirty = !0), lo(this));
      })),
      (this.effect.computed = this),
      (this.effect.active = this._cacheable = !s),
      (this.__v_isReadonly = r);
  }
  get value() {
    const t = z(this);
    return (
      io(t),
      (t._dirty || !t._cacheable) &&
        ((t._dirty = !1), (t._value = t.effect.run())),
      t._value
    );
  }
  set value(t) {
    this._setter(t);
  }
}
ao = "__v_isReadonly";
function ml(e, t, n = !1) {
  let r, s;
  const o = B(e);
  return (
    o ? ((r = e), (s = Ce)) : ((r = e.get), (s = e.set)),
    new gl(r, s, o || !s, n)
  );
}
function Ke(e, t, n, r) {
  let s;
  try {
    s = r ? e(...r) : e();
  } catch (o) {
    Rt(o, t, n);
  }
  return s;
}
function Re(e, t, n, r) {
  if (B(e)) {
    const o = Ke(e, t, n, r);
    return (
      o &&
        Ds(o) &&
        o.catch((i) => {
          Rt(i, t, n);
        }),
      o
    );
  }
  const s = [];
  for (let o = 0; o < e.length; o++) s.push(Re(e[o], t, n, r));
  return s;
}
function Rt(e, t, n, r = !0) {
  const s = t ? t.vnode : null;
  if (t) {
    let o = t.parent;
    const i = t.proxy,
      l = n;
    for (; o; ) {
      const a = o.ec;
      if (a) {
        for (let u = 0; u < a.length; u++) if (a[u](e, i, l) === !1) return;
      }
      o = o.parent;
    }
    const c = t.appContext.config.errorHandler;
    if (c) {
      Ke(c, null, 10, [e, i, l]);
      return;
    }
  }
  yl(e, n, s, r);
}
function yl(e, t, n, r = !0) {
  console.error(e);
}
let Lt = !1,
  Zn = !1;
const ce = [];
let Oe = 0;
const pt = [];
let Ie = null,
  Ze = 0;
const fo = Promise.resolve();
let kr = null;
function kn(e) {
  const t = kr || fo;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function _l(e) {
  let t = Oe + 1,
    n = ce.length;
  for (; t < n; ) {
    const r = (t + n) >>> 1;
    Nt(ce[r]) < e ? (t = r + 1) : (n = r);
  }
  return t;
}
function Sn(e) {
  (!ce.length || !ce.includes(e, Lt && e.allowRecurse ? Oe + 1 : Oe)) &&
    (e.id == null ? ce.push(e) : ce.splice(_l(e.id), 0, e), uo());
}
function uo() {
  !Lt && !Zn && ((Zn = !0), (kr = fo.then(po)));
}
function bl(e) {
  const t = ce.indexOf(e);
  t > Oe && ce.splice(t, 1);
}
function ho(e) {
  D(e)
    ? pt.push(...e)
    : (!Ie || !Ie.includes(e, e.allowRecurse ? Ze + 1 : Ze)) && pt.push(e),
    uo();
}
function es(e, t = Lt ? Oe + 1 : 0) {
  for (; t < ce.length; t++) {
    const n = ce[t];
    n && n.pre && (ce.splice(t, 1), t--, n());
  }
}
function dn(e) {
  if (pt.length) {
    const t = [...new Set(pt)];
    if (((pt.length = 0), Ie)) {
      Ie.push(...t);
      return;
    }
    for (Ie = t, Ie.sort((n, r) => Nt(n) - Nt(r)), Ze = 0; Ze < Ie.length; Ze++)
      Ie[Ze]();
    (Ie = null), (Ze = 0);
  }
}
const Nt = (e) => (e.id == null ? 1 / 0 : e.id),
  wl = (e, t) => {
    const n = Nt(e) - Nt(t);
    if (n === 0) {
      if (e.pre && !t.pre) return -1;
      if (t.pre && !e.pre) return 1;
    }
    return n;
  };
function po(e) {
  (Zn = !1), (Lt = !0), ce.sort(wl);
  const t = Ce;
  try {
    for (Oe = 0; Oe < ce.length; Oe++) {
      const n = ce[Oe];
      n && n.active !== !1 && Ke(n, null, 14);
    }
  } finally {
    (Oe = 0),
      (ce.length = 0),
      dn(),
      (Lt = !1),
      (kr = null),
      (ce.length || pt.length) && po();
  }
}
function vl(e, t, ...n) {
  if (e.isUnmounted) return;
  const r = e.vnode.props || Z;
  let s = n;
  const o = t.startsWith("update:"),
    i = o && t.slice(7);
  if (i && i in r) {
    const u = `${i === "modelValue" ? "model" : i}Modifiers`,
      { number: h, trim: y } = r[u] || Z;
    y && (s = n.map((x) => (ie(x) ? x.trim() : x))), h && (s = n.map(Hi));
  }
  let l,
    c = r[(l = Fn(t))] || r[(l = Fn(He(t)))];
  !c && o && (c = r[(l = Fn(xt(t)))]), c && Re(c, e, 6, s);
  const a = r[l + "Once"];
  if (a) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[l]) return;
    (e.emitted[l] = !0), Re(a, e, 6, s);
  }
}
function go(e, t, n = !1) {
  const r = t.emitsCache,
    s = r.get(e);
  if (s !== void 0) return s;
  const o = e.emits;
  let i = {},
    l = !1;
  if (!B(e)) {
    const c = (a) => {
      const u = go(a, t, !0);
      u && ((l = !0), de(i, u));
    };
    !n && t.mixins.length && t.mixins.forEach(c),
      e.extends && c(e.extends),
      e.mixins && e.mixins.forEach(c);
  }
  return !o && !l
    ? (te(e) && r.set(e, null), null)
    : (D(o) ? o.forEach((c) => (i[c] = null)) : de(i, o),
      te(e) && r.set(e, i),
      i);
}
function On(e, t) {
  return !e || !Bt(t)
    ? !1
    : ((t = t.slice(2).replace(/Once$/, "")),
      J(e, t[0].toLowerCase() + t.slice(1)) || J(e, xt(t)) || J(e, t));
}
let we = null,
  Hn = null;
function hn(e) {
  const t = we;
  return (we = e), (Hn = (e && e.type.__scopeId) || null), t;
}
function Uu(e) {
  Hn = e;
}
function Bu() {
  Hn = null;
}
function mo(e, t = we, n) {
  if (!t || e._n) return e;
  const r = (...s) => {
    r._d && fs(-1);
    const o = hn(t);
    let i;
    try {
      i = e(...s);
    } finally {
      hn(o), r._d && fs(1);
    }
    return i;
  };
  return (r._n = !0), (r._c = !0), (r._d = !0), r;
}
function Nn(e) {
  const {
    type: t,
    vnode: n,
    proxy: r,
    withProxy: s,
    props: o,
    propsOptions: [i],
    slots: l,
    attrs: c,
    emit: a,
    render: u,
    renderCache: h,
    data: y,
    setupState: x,
    ctx: g,
    inheritAttrs: T,
  } = e;
  let N, _;
  const p = hn(e);
  try {
    if (n.shapeFlag & 4) {
      const j = s || r;
      (N = be(u.call(j, j, h, o, x, y, g))), (_ = c);
    } else {
      const j = t;
      (N = be(
        j.length > 1 ? j(o, { attrs: c, slots: l, emit: a }) : j(o, null)
      )),
        (_ = t.props ? c : xl(c));
    }
  } catch (j) {
    (It.length = 0), Rt(j, e, 1), (N = le(ze));
  }
  let v = N;
  if (_ && T !== !1) {
    const j = Object.keys(_),
      { shapeFlag: A } = v;
    j.length && A & 7 && (i && j.some(mr) && (_ = Tl(_, i)), (v = wt(v, _)));
  }
  return (
    n.dirs && ((v = wt(v)), (v.dirs = v.dirs ? v.dirs.concat(n.dirs) : n.dirs)),
    n.transition && (v.transition = n.transition),
    (N = v),
    hn(p),
    N
  );
}
function El(e) {
  let t;
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    if (mn(r)) {
      if (r.type !== ze || r.children === "v-if") {
        if (t) return;
        t = r;
      }
    } else return;
  }
  return t;
}
const xl = (e) => {
    let t;
    for (const n in e)
      (n === "class" || n === "style" || Bt(n)) && ((t || (t = {}))[n] = e[n]);
    return t;
  },
  Tl = (e, t) => {
    const n = {};
    for (const r in e) (!mr(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
    return n;
  };
function Cl(e, t, n) {
  const { props: r, children: s, component: o } = e,
    { props: i, children: l, patchFlag: c } = t,
    a = o.emitsOptions;
  if (t.dirs || t.transition) return !0;
  if (n && c >= 0) {
    if (c & 1024) return !0;
    if (c & 16) return r ? ts(r, i, a) : !!i;
    if (c & 8) {
      const u = t.dynamicProps;
      for (let h = 0; h < u.length; h++) {
        const y = u[h];
        if (i[y] !== r[y] && !On(a, y)) return !0;
      }
    }
  } else
    return (s || l) && (!l || !l.$stable)
      ? !0
      : r === i
      ? !1
      : r
      ? i
        ? ts(r, i, a)
        : !0
      : !!i;
  return !1;
}
function ts(e, t, n) {
  const r = Object.keys(t);
  if (r.length !== Object.keys(e).length) return !0;
  for (let s = 0; s < r.length; s++) {
    const o = r[s];
    if (t[o] !== e[o] && !On(n, o)) return !0;
  }
  return !1;
}
function Sr({ vnode: e, parent: t }, n) {
  for (; t && t.subTree === e; ) ((e = t.vnode).el = n), (t = t.parent);
}
const Rl = (e) => e.__isSuspense,
  Pl = {
    name: "Suspense",
    __isSuspense: !0,
    process(e, t, n, r, s, o, i, l, c, a) {
      e == null ? Sl(t, n, r, s, o, i, l, c, a) : Ol(e, t, n, r, s, i, l, c, a);
    },
    hydrate: Hl,
    create: Or,
    normalize: Al,
  },
  kl = Pl;
function Ut(e, t) {
  const n = e.props && e.props[t];
  B(n) && n();
}
function Sl(e, t, n, r, s, o, i, l, c) {
  const {
      p: a,
      o: { createElement: u },
    } = c,
    h = u("div"),
    y = (e.suspense = Or(e, s, r, t, h, n, o, i, l, c));
  a(null, (y.pendingBranch = e.ssContent), h, null, r, y, o, i),
    y.deps > 0
      ? (Ut(e, "onPending"),
        Ut(e, "onFallback"),
        a(null, e.ssFallback, t, n, r, null, o, i),
        gt(y, e.ssFallback))
      : y.resolve();
}
function Ol(e, t, n, r, s, o, i, l, { p: c, um: a, o: { createElement: u } }) {
  const h = (t.suspense = e.suspense);
  (h.vnode = t), (t.el = e.el);
  const y = t.ssContent,
    x = t.ssFallback,
    { activeBranch: g, pendingBranch: T, isInFallback: N, isHydrating: _ } = h;
  if (T)
    (h.pendingBranch = y),
      Ue(y, T)
        ? (c(T, y, h.hiddenContainer, null, s, h, o, i, l),
          h.deps <= 0
            ? h.resolve()
            : N && (c(g, x, n, r, s, null, o, i, l), gt(h, x)))
        : (h.pendingId++,
          _ ? ((h.isHydrating = !1), (h.activeBranch = T)) : a(T, s, h),
          (h.deps = 0),
          (h.effects.length = 0),
          (h.hiddenContainer = u("div")),
          N
            ? (c(null, y, h.hiddenContainer, null, s, h, o, i, l),
              h.deps <= 0
                ? h.resolve()
                : (c(g, x, n, r, s, null, o, i, l), gt(h, x)))
            : g && Ue(y, g)
            ? (c(g, y, n, r, s, h, o, i, l), h.resolve(!0))
            : (c(null, y, h.hiddenContainer, null, s, h, o, i, l),
              h.deps <= 0 && h.resolve()));
  else if (g && Ue(y, g)) c(g, y, n, r, s, h, o, i, l), gt(h, y);
  else if (
    (Ut(t, "onPending"),
    (h.pendingBranch = y),
    h.pendingId++,
    c(null, y, h.hiddenContainer, null, s, h, o, i, l),
    h.deps <= 0)
  )
    h.resolve();
  else {
    const { timeout: p, pendingId: v } = h;
    p > 0
      ? setTimeout(() => {
          h.pendingId === v && h.fallback(x);
        }, p)
      : p === 0 && h.fallback(x);
  }
}
function Or(e, t, n, r, s, o, i, l, c, a, u = !1) {
  const {
      p: h,
      m: y,
      um: x,
      n: g,
      o: { parentNode: T, remove: N },
    } = a,
    _ = e.props ? Ai(e.props.timeout) : void 0,
    p = {
      vnode: e,
      parent: t,
      parentComponent: n,
      isSVG: i,
      container: r,
      hiddenContainer: s,
      anchor: o,
      deps: 0,
      pendingId: 0,
      timeout: typeof _ == "number" ? _ : -1,
      activeBranch: null,
      pendingBranch: null,
      isInFallback: !0,
      isHydrating: u,
      isUnmounted: !1,
      effects: [],
      resolve(v = !1) {
        const {
          vnode: j,
          activeBranch: A,
          pendingBranch: F,
          pendingId: O,
          effects: C,
          parentComponent: L,
          container: W,
        } = p;
        if (p.isHydrating) p.isHydrating = !1;
        else if (!v) {
          const G = A && F.transition && F.transition.mode === "out-in";
          G &&
            (A.transition.afterLeave = () => {
              O === p.pendingId && y(F, W, I, 0);
            });
          let { anchor: I } = p;
          A && ((I = g(A)), x(A, L, p, !0)), G || y(F, W, I, 0);
        }
        gt(p, F), (p.pendingBranch = null), (p.isInFallback = !1);
        let K = p.parent,
          fe = !1;
        for (; K; ) {
          if (K.pendingBranch) {
            K.effects.push(...C), (fe = !0);
            break;
          }
          K = K.parent;
        }
        fe || ho(C), (p.effects = []), Ut(j, "onResolve");
      },
      fallback(v) {
        if (!p.pendingBranch) return;
        const {
          vnode: j,
          activeBranch: A,
          parentComponent: F,
          container: O,
          isSVG: C,
        } = p;
        Ut(j, "onFallback");
        const L = g(A),
          W = () => {
            p.isInFallback && (h(null, v, O, L, F, null, C, l, c), gt(p, v));
          },
          K = v.transition && v.transition.mode === "out-in";
        K && (A.transition.afterLeave = W),
          (p.isInFallback = !0),
          x(A, F, null, !0),
          K || W();
      },
      move(v, j, A) {
        p.activeBranch && y(p.activeBranch, v, j, A), (p.container = v);
      },
      next() {
        return p.activeBranch && g(p.activeBranch);
      },
      registerDep(v, j) {
        const A = !!p.pendingBranch;
        A && p.deps++;
        const F = v.vnode.el;
        v.asyncDep
          .catch((O) => {
            Rt(O, v, 0);
          })
          .then((O) => {
            if (v.isUnmounted || p.isUnmounted || p.pendingId !== v.suspenseId)
              return;
            v.asyncResolved = !0;
            const { vnode: C } = v;
            rr(v, O, !1), F && (C.el = F);
            const L = !F && v.subTree.el;
            j(v, C, T(F || v.subTree.el), F ? null : g(v.subTree), p, i, c),
              L && N(L),
              Sr(v, C.el),
              A && --p.deps === 0 && p.resolve();
          });
      },
      unmount(v, j) {
        (p.isUnmounted = !0),
          p.activeBranch && x(p.activeBranch, n, v, j),
          p.pendingBranch && x(p.pendingBranch, n, v, j);
      },
    };
  return p;
}
function Hl(e, t, n, r, s, o, i, l, c) {
  const a = (t.suspense = Or(
      t,
      r,
      n,
      e.parentNode,
      document.createElement("div"),
      null,
      s,
      o,
      i,
      l,
      !0
    )),
    u = c(e, (a.pendingBranch = t.ssContent), n, a, o, i);
  return a.deps === 0 && a.resolve(), u;
}
function Al(e) {
  const { shapeFlag: t, children: n } = e,
    r = t & 32;
  (e.ssContent = ns(r ? n.default : n)),
    (e.ssFallback = r ? ns(n.fallback) : le(ze));
}
function ns(e) {
  let t;
  if (B(e)) {
    const n = bt && e._c;
    n && ((e._d = !1), ft()), (e = e()), n && ((e._d = !0), (t = ve), jo());
  }
  return (
    D(e) && (e = El(e)),
    (e = be(e)),
    t && !e.dynamicChildren && (e.dynamicChildren = t.filter((n) => n !== e)),
    e
  );
}
function yo(e, t) {
  t && t.pendingBranch
    ? D(e)
      ? t.effects.push(...e)
      : t.effects.push(e)
    : ho(e);
}
function gt(e, t) {
  e.activeBranch = t;
  const { vnode: n, parentComponent: r } = e,
    s = (n.el = t.el);
  r && r.subTree === n && ((r.vnode.el = s), Sr(r, s));
}
function _o(e, t) {
  if (re) {
    let n = re.provides;
    const r = re.parent && re.parent.provides;
    r === n && (n = re.provides = Object.create(r)), (n[e] = t);
  }
}
function tt(e, t, n = !1) {
  const r = re || we;
  if (r) {
    const s =
      r.parent == null
        ? r.vnode.appContext && r.vnode.appContext.provides
        : r.parent.provides;
    if (s && e in s) return s[e];
    if (arguments.length > 1) return n && B(t) ? t.call(r.proxy) : t;
  }
}
function Il(e, t) {
  return Hr(e, null, t);
}
const Zt = {};
function mt(e, t, n) {
  return Hr(e, t, n);
}
function Hr(
  e,
  t,
  { immediate: n, deep: r, flush: s, onTrack: o, onTrigger: i } = Z
) {
  const l = zs() === (re == null ? void 0 : re.scope) ? re : null;
  let c,
    a = !1,
    u = !1;
  if (
    (se(e)
      ? ((c = () => e.value), (a = un(e)))
      : De(e)
      ? ((c = () => e), (r = !0))
      : D(e)
      ? ((u = !0),
        (a = e.some((v) => De(v) || un(v))),
        (c = () =>
          e.map((v) => {
            if (se(v)) return v.value;
            if (De(v)) return at(v);
            if (B(v)) return Ke(v, l, 2);
          })))
      : B(e)
      ? t
        ? (c = () => Ke(e, l, 2))
        : (c = () => {
            if (!(l && l.isUnmounted)) return h && h(), Re(e, l, 3, [y]);
          })
      : (c = Ce),
    t && r)
  ) {
    const v = c;
    c = () => at(v());
  }
  let h,
    y = (v) => {
      h = _.onStop = () => {
        Ke(v, l, 4);
      };
    },
    x;
  if (Et)
    if (
      ((y = Ce),
      t ? n && Re(t, l, 3, [c(), u ? [] : void 0, y]) : c(),
      s === "sync")
    ) {
      const v = Rc();
      x = v.__watcherHandles || (v.__watcherHandles = []);
    } else return Ce;
  let g = u ? new Array(e.length).fill(Zt) : Zt;
  const T = () => {
    if (_.active)
      if (t) {
        const v = _.run();
        (r || a || (u ? v.some((j, A) => jt(j, g[A])) : jt(v, g))) &&
          (h && h(),
          Re(t, l, 3, [v, g === Zt ? void 0 : u && g[0] === Zt ? [] : g, y]),
          (g = v));
      } else _.run();
  };
  T.allowRecurse = !!t;
  let N;
  s === "sync"
    ? (N = T)
    : s === "post"
    ? (N = () => he(T, l && l.suspense))
    : ((T.pre = !0), l && (T.id = l.uid), (N = () => Sn(T)));
  const _ = new vr(c, N);
  t
    ? n
      ? T()
      : (g = _.run())
    : s === "post"
    ? he(_.run.bind(_), l && l.suspense)
    : _.run();
  const p = () => {
    _.stop(), l && l.scope && yr(l.scope.effects, _);
  };
  return x && x.push(p), p;
}
function Ml(e, t, n) {
  const r = this.proxy,
    s = ie(e) ? (e.includes(".") ? bo(r, e) : () => r[e]) : e.bind(r, r);
  let o;
  B(t) ? (o = t) : ((o = t.handler), (n = t));
  const i = re;
  vt(this);
  const l = Hr(s, o.bind(r), n);
  return i ? vt(i) : rt(), l;
}
function bo(e, t) {
  const n = t.split(".");
  return () => {
    let r = e;
    for (let s = 0; s < n.length && r; s++) r = r[n[s]];
    return r;
  };
}
function at(e, t) {
  if (!te(e) || e.__v_skip || ((t = t || new Set()), t.has(e))) return e;
  if ((t.add(e), se(e))) at(e.value, t);
  else if (D(e)) for (let n = 0; n < e.length; n++) at(e[n], t);
  else if (Bs(e) || ht(e))
    e.forEach((n) => {
      at(n, t);
    });
  else if (Ks(e)) for (const n in e) at(e[n], t);
  return e;
}
function $l(e) {
  return B(e) ? { setup: e, name: e.name } : e;
}
const Ht = (e) => !!e.type.__asyncLoader;
function jl(e) {
  B(e) && (e = { loader: e });
  const {
    loader: t,
    loadingComponent: n,
    errorComponent: r,
    delay: s = 200,
    timeout: o,
    suspensible: i = !0,
    onError: l,
  } = e;
  let c = null,
    a,
    u = 0;
  const h = () => (u++, (c = null), y()),
    y = () => {
      let x;
      return (
        c ||
        (x = c =
          t()
            .catch((g) => {
              if (((g = g instanceof Error ? g : new Error(String(g))), l))
                return new Promise((T, N) => {
                  l(
                    g,
                    () => T(h()),
                    () => N(g),
                    u + 1
                  );
                });
              throw g;
            })
            .then((g) =>
              x !== c && c
                ? c
                : (g &&
                    (g.__esModule || g[Symbol.toStringTag] === "Module") &&
                    (g = g.default),
                  (a = g),
                  g)
            ))
      );
    };
  return $l({
    name: "AsyncComponentWrapper",
    __asyncLoader: y,
    get __asyncResolved() {
      return a;
    },
    setup() {
      const x = re;
      if (a) return () => Un(a, x);
      const g = (p) => {
        (c = null), Rt(p, x, 13, !r);
      };
      if ((i && x.suspense) || Et)
        return y()
          .then((p) => () => Un(p, x))
          .catch((p) => (g(p), () => (r ? le(r, { error: p }) : null)));
      const T = We(!1),
        N = We(),
        _ = We(!!s);
      return (
        s &&
          setTimeout(() => {
            _.value = !1;
          }, s),
        o != null &&
          setTimeout(() => {
            if (!T.value && !N.value) {
              const p = new Error(`Async component timed out after ${o}ms.`);
              g(p), (N.value = p);
            }
          }, o),
        y()
          .then(() => {
            (T.value = !0),
              x.parent && Ar(x.parent.vnode) && Sn(x.parent.update);
          })
          .catch((p) => {
            g(p), (N.value = p);
          }),
        () => {
          if (T.value && a) return Un(a, x);
          if (N.value && r) return le(r, { error: N.value });
          if (n && !_.value) return le(n);
        }
      );
    },
  });
}
function Un(e, t) {
  const { ref: n, props: r, children: s, ce: o } = t.vnode,
    i = le(e, r, s);
  return (i.ref = n), (i.ce = o), delete t.vnode.ce, i;
}
const Ar = (e) => e.type.__isKeepAlive;
function wo(e, t) {
  Eo(e, "a", t);
}
function vo(e, t) {
  Eo(e, "da", t);
}
function Eo(e, t, n = re) {
  const r =
    e.__wdc ||
    (e.__wdc = () => {
      let s = n;
      for (; s; ) {
        if (s.isDeactivated) return;
        s = s.parent;
      }
      return e();
    });
  if ((An(t, r, n), n)) {
    let s = n.parent;
    for (; s && s.parent; )
      Ar(s.parent.vnode) && Fl(r, t, n, s), (s = s.parent);
  }
}
function Fl(e, t, n, r) {
  const s = An(t, e, r, !0);
  To(() => {
    yr(r[t], s);
  }, n);
}
function An(e, t, n = re, r = !1) {
  if (n) {
    const s = n[e] || (n[e] = []),
      o =
        t.__weh ||
        (t.__weh = (...i) => {
          if (n.isUnmounted) return;
          Tt(), vt(n);
          const l = Re(t, n, e, i);
          return rt(), Ct(), l;
        });
    return r ? s.unshift(o) : s.push(o), o;
  }
}
const $e =
    (e) =>
    (t, n = re) =>
      (!Et || e === "sp") && An(e, (...r) => t(...r), n),
  Ll = $e("bm"),
  Nl = $e("m"),
  Ul = $e("bu"),
  Bl = $e("u"),
  xo = $e("bum"),
  To = $e("um"),
  Dl = $e("sp"),
  Wl = $e("rtg"),
  Kl = $e("rtc");
function Co(e, t = re) {
  An("ec", e, t);
}
function Se(e, t, n, r) {
  const s = e.dirs,
    o = t && t.dirs;
  for (let i = 0; i < s.length; i++) {
    const l = s[i];
    o && (l.oldValue = o[i].value);
    let c = l.dir[r];
    c && (Tt(), Re(c, n, 8, [e.el, l, e, t]), Ct());
  }
}
const Ro = "components";
function Du(e, t) {
  return Jl(Ro, e, !0, t) || e;
}
const ql = Symbol();
function Jl(e, t, n = !0, r = !1) {
  const s = we || re;
  if (s) {
    const o = s.type;
    if (e === Ro) {
      const l = Ec(o, !1);
      if (l && (l === t || l === He(t) || l === Rn(He(t)))) return o;
    }
    const i = rs(s[e] || o[e], t) || rs(s.appContext[e], t);
    return !i && r ? o : i;
  }
}
function rs(e, t) {
  return e && (e[t] || e[He(t)] || e[Rn(He(t))]);
}
const Gn = (e) => (e ? (Uo(e) ? jr(e) || e.proxy : Gn(e.parent)) : null),
  At = de(Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => Gn(e.parent),
    $root: (e) => Gn(e.root),
    $emit: (e) => e.emit,
    $options: (e) => Ir(e),
    $forceUpdate: (e) => e.f || (e.f = () => Sn(e.update)),
    $nextTick: (e) => e.n || (e.n = kn.bind(e.proxy)),
    $watch: (e) => Ml.bind(e),
  }),
  Bn = (e, t) => e !== Z && !e.__isScriptSetup && J(e, t),
  zl = {
    get({ _: e }, t) {
      const {
        ctx: n,
        setupState: r,
        data: s,
        props: o,
        accessCache: i,
        type: l,
        appContext: c,
      } = e;
      let a;
      if (t[0] !== "$") {
        const x = i[t];
        if (x !== void 0)
          switch (x) {
            case 1:
              return r[t];
            case 2:
              return s[t];
            case 4:
              return n[t];
            case 3:
              return o[t];
          }
        else {
          if (Bn(r, t)) return (i[t] = 1), r[t];
          if (s !== Z && J(s, t)) return (i[t] = 2), s[t];
          if ((a = e.propsOptions[0]) && J(a, t)) return (i[t] = 3), o[t];
          if (n !== Z && J(n, t)) return (i[t] = 4), n[t];
          er && (i[t] = 0);
        }
      }
      const u = At[t];
      let h, y;
      if (u) return t === "$attrs" && ge(e, "get", t), u(e);
      if ((h = l.__cssModules) && (h = h[t])) return h;
      if (n !== Z && J(n, t)) return (i[t] = 4), n[t];
      if (((y = c.config.globalProperties), J(y, t))) return y[t];
    },
    set({ _: e }, t, n) {
      const { data: r, setupState: s, ctx: o } = e;
      return Bn(s, t)
        ? ((s[t] = n), !0)
        : r !== Z && J(r, t)
        ? ((r[t] = n), !0)
        : J(e.props, t) || (t[0] === "$" && t.slice(1) in e)
        ? !1
        : ((o[t] = n), !0);
    },
    has(
      {
        _: {
          data: e,
          setupState: t,
          accessCache: n,
          ctx: r,
          appContext: s,
          propsOptions: o,
        },
      },
      i
    ) {
      let l;
      return (
        !!n[i] ||
        (e !== Z && J(e, i)) ||
        Bn(t, i) ||
        ((l = o[0]) && J(l, i)) ||
        J(r, i) ||
        J(At, i) ||
        J(s.config.globalProperties, i)
      );
    },
    defineProperty(e, t, n) {
      return (
        n.get != null
          ? (e._.accessCache[t] = 0)
          : J(n, "value") && this.set(e, t, n.value, null),
        Reflect.defineProperty(e, t, n)
      );
    },
  };
let er = !0;
function Ql(e) {
  const t = Ir(e),
    n = e.proxy,
    r = e.ctx;
  (er = !1), t.beforeCreate && ss(t.beforeCreate, e, "bc");
  const {
    data: s,
    computed: o,
    methods: i,
    watch: l,
    provide: c,
    inject: a,
    created: u,
    beforeMount: h,
    mounted: y,
    beforeUpdate: x,
    updated: g,
    activated: T,
    deactivated: N,
    beforeDestroy: _,
    beforeUnmount: p,
    destroyed: v,
    unmounted: j,
    render: A,
    renderTracked: F,
    renderTriggered: O,
    errorCaptured: C,
    serverPrefetch: L,
    expose: W,
    inheritAttrs: K,
    components: fe,
    directives: G,
    filters: I,
  } = t;
  if ((a && Xl(a, r, null, e.appContext.config.unwrapInjectedRef), i))
    for (const ne in i) {
      const X = i[ne];
      B(X) && (r[ne] = X.bind(n));
    }
  if (s) {
    const ne = s.call(n, n);
    te(ne) && (e.data = Je(ne));
  }
  if (((er = !0), o))
    for (const ne in o) {
      const X = o[ne],
        Qe = B(X) ? X.bind(n, n) : B(X.get) ? X.get.bind(n, n) : Ce,
        qt = !B(X) && B(X.set) ? X.set.bind(n) : Ce,
        Xe = Do({ get: Qe, set: qt });
      Object.defineProperty(r, ne, {
        enumerable: !0,
        configurable: !0,
        get: () => Xe.value,
        set: (Pe) => (Xe.value = Pe),
      });
    }
  if (l) for (const ne in l) Po(l[ne], r, n, ne);
  if (c) {
    const ne = B(c) ? c.call(n) : c;
    Reflect.ownKeys(ne).forEach((X) => {
      _o(X, ne[X]);
    });
  }
  u && ss(u, e, "c");
  function V(ne, X) {
    D(X) ? X.forEach((Qe) => ne(Qe.bind(n))) : X && ne(X.bind(n));
  }
  if (
    (V(Ll, h),
    V(Nl, y),
    V(Ul, x),
    V(Bl, g),
    V(wo, T),
    V(vo, N),
    V(Co, C),
    V(Kl, F),
    V(Wl, O),
    V(xo, p),
    V(To, j),
    V(Dl, L),
    D(W))
  )
    if (W.length) {
      const ne = e.exposed || (e.exposed = {});
      W.forEach((X) => {
        Object.defineProperty(ne, X, {
          get: () => n[X],
          set: (Qe) => (n[X] = Qe),
        });
      });
    } else e.exposed || (e.exposed = {});
  A && e.render === Ce && (e.render = A),
    K != null && (e.inheritAttrs = K),
    fe && (e.components = fe),
    G && (e.directives = G);
}
function Xl(e, t, n = Ce, r = !1) {
  D(e) && (e = tr(e));
  for (const s in e) {
    const o = e[s];
    let i;
    te(o)
      ? "default" in o
        ? (i = tt(o.from || s, o.default, !0))
        : (i = tt(o.from || s))
      : (i = tt(o)),
      se(i) && r
        ? Object.defineProperty(t, s, {
            enumerable: !0,
            configurable: !0,
            get: () => i.value,
            set: (l) => (i.value = l),
          })
        : (t[s] = i);
  }
}
function ss(e, t, n) {
  Re(D(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function Po(e, t, n, r) {
  const s = r.includes(".") ? bo(n, r) : () => n[r];
  if (ie(e)) {
    const o = t[e];
    B(o) && mt(s, o);
  } else if (B(e)) mt(s, e.bind(n));
  else if (te(e))
    if (D(e)) e.forEach((o) => Po(o, t, n, r));
    else {
      const o = B(e.handler) ? e.handler.bind(n) : t[e.handler];
      B(o) && mt(s, o, e);
    }
}
function Ir(e) {
  const t = e.type,
    { mixins: n, extends: r } = t,
    {
      mixins: s,
      optionsCache: o,
      config: { optionMergeStrategies: i },
    } = e.appContext,
    l = o.get(t);
  let c;
  return (
    l
      ? (c = l)
      : !s.length && !n && !r
      ? (c = t)
      : ((c = {}), s.length && s.forEach((a) => pn(c, a, i, !0)), pn(c, t, i)),
    te(t) && o.set(t, c),
    c
  );
}
function pn(e, t, n, r = !1) {
  const { mixins: s, extends: o } = t;
  o && pn(e, o, n, !0), s && s.forEach((i) => pn(e, i, n, !0));
  for (const i in t)
    if (!(r && i === "expose")) {
      const l = Yl[i] || (n && n[i]);
      e[i] = l ? l(e[i], t[i]) : t[i];
    }
  return e;
}
const Yl = {
  data: os,
  props: Ve,
  emits: Ve,
  methods: Ve,
  computed: Ve,
  beforeCreate: ue,
  created: ue,
  beforeMount: ue,
  mounted: ue,
  beforeUpdate: ue,
  updated: ue,
  beforeDestroy: ue,
  beforeUnmount: ue,
  destroyed: ue,
  unmounted: ue,
  activated: ue,
  deactivated: ue,
  errorCaptured: ue,
  serverPrefetch: ue,
  components: Ve,
  directives: Ve,
  watch: Zl,
  provide: os,
  inject: Vl,
};
function os(e, t) {
  return t
    ? e
      ? function () {
          return de(
            B(e) ? e.call(this, this) : e,
            B(t) ? t.call(this, this) : t
          );
        }
      : t
    : e;
}
function Vl(e, t) {
  return Ve(tr(e), tr(t));
}
function tr(e) {
  if (D(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
    return t;
  }
  return e;
}
function ue(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Ve(e, t) {
  return e ? de(de(Object.create(null), e), t) : t;
}
function Zl(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = de(Object.create(null), e);
  for (const r in t) n[r] = ue(e[r], t[r]);
  return n;
}
function Gl(e, t, n, r = !1) {
  const s = {},
    o = {};
  an(o, In, 1), (e.propsDefaults = Object.create(null)), ko(e, t, s, o);
  for (const i in e.propsOptions[0]) i in s || (s[i] = void 0);
  n ? (e.props = r ? s : al(s)) : e.type.props ? (e.props = s) : (e.props = o),
    (e.attrs = o);
}
function ec(e, t, n, r) {
  const {
      props: s,
      attrs: o,
      vnode: { patchFlag: i },
    } = e,
    l = z(s),
    [c] = e.propsOptions;
  let a = !1;
  if ((r || i > 0) && !(i & 16)) {
    if (i & 8) {
      const u = e.vnode.dynamicProps;
      for (let h = 0; h < u.length; h++) {
        let y = u[h];
        if (On(e.emitsOptions, y)) continue;
        const x = t[y];
        if (c)
          if (J(o, y)) x !== o[y] && ((o[y] = x), (a = !0));
          else {
            const g = He(y);
            s[g] = nr(c, l, g, x, e, !1);
          }
        else x !== o[y] && ((o[y] = x), (a = !0));
      }
    }
  } else {
    ko(e, t, s, o) && (a = !0);
    let u;
    for (const h in l)
      (!t || (!J(t, h) && ((u = xt(h)) === h || !J(t, u)))) &&
        (c
          ? n &&
            (n[h] !== void 0 || n[u] !== void 0) &&
            (s[h] = nr(c, l, h, void 0, e, !0))
          : delete s[h]);
    if (o !== l) for (const h in o) (!t || !J(t, h)) && (delete o[h], (a = !0));
  }
  a && Me(e, "set", "$attrs");
}
function ko(e, t, n, r) {
  const [s, o] = e.propsOptions;
  let i = !1,
    l;
  if (t)
    for (let c in t) {
      if (Ot(c)) continue;
      const a = t[c];
      let u;
      s && J(s, (u = He(c)))
        ? !o || !o.includes(u)
          ? (n[u] = a)
          : ((l || (l = {}))[u] = a)
        : On(e.emitsOptions, c) ||
          ((!(c in r) || a !== r[c]) && ((r[c] = a), (i = !0)));
    }
  if (o) {
    const c = z(n),
      a = l || Z;
    for (let u = 0; u < o.length; u++) {
      const h = o[u];
      n[h] = nr(s, c, h, a[h], e, !J(a, h));
    }
  }
  return i;
}
function nr(e, t, n, r, s, o) {
  const i = e[n];
  if (i != null) {
    const l = J(i, "default");
    if (l && r === void 0) {
      const c = i.default;
      if (i.type !== Function && B(c)) {
        const { propsDefaults: a } = s;
        n in a ? (r = a[n]) : (vt(s), (r = a[n] = c.call(null, t)), rt());
      } else r = c;
    }
    i[0] &&
      (o && !l ? (r = !1) : i[1] && (r === "" || r === xt(n)) && (r = !0));
  }
  return r;
}
function So(e, t, n = !1) {
  const r = t.propsCache,
    s = r.get(e);
  if (s) return s;
  const o = e.props,
    i = {},
    l = [];
  let c = !1;
  if (!B(e)) {
    const u = (h) => {
      c = !0;
      const [y, x] = So(h, t, !0);
      de(i, y), x && l.push(...x);
    };
    !n && t.mixins.length && t.mixins.forEach(u),
      e.extends && u(e.extends),
      e.mixins && e.mixins.forEach(u);
  }
  if (!o && !c) return te(e) && r.set(e, dt), dt;
  if (D(o))
    for (let u = 0; u < o.length; u++) {
      const h = He(o[u]);
      is(h) && (i[h] = Z);
    }
  else if (o)
    for (const u in o) {
      const h = He(u);
      if (is(h)) {
        const y = o[u],
          x = (i[h] = D(y) || B(y) ? { type: y } : Object.assign({}, y));
        if (x) {
          const g = as(Boolean, x.type),
            T = as(String, x.type);
          (x[0] = g > -1),
            (x[1] = T < 0 || g < T),
            (g > -1 || J(x, "default")) && l.push(h);
        }
      }
    }
  const a = [i, l];
  return te(e) && r.set(e, a), a;
}
function is(e) {
  return e[0] !== "$";
}
function ls(e) {
  const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
  return t ? t[2] : e === null ? "null" : "";
}
function cs(e, t) {
  return ls(e) === ls(t);
}
function as(e, t) {
  return D(t) ? t.findIndex((n) => cs(n, e)) : B(t) && cs(t, e) ? 0 : -1;
}
const Oo = (e) => e[0] === "_" || e === "$stable",
  Mr = (e) => (D(e) ? e.map(be) : [be(e)]),
  tc = (e, t, n) => {
    if (t._n) return t;
    const r = mo((...s) => Mr(t(...s)), n);
    return (r._c = !1), r;
  },
  Ho = (e, t, n) => {
    const r = e._ctx;
    for (const s in e) {
      if (Oo(s)) continue;
      const o = e[s];
      if (B(o)) t[s] = tc(s, o, r);
      else if (o != null) {
        const i = Mr(o);
        t[s] = () => i;
      }
    }
  },
  Ao = (e, t) => {
    const n = Mr(t);
    e.slots.default = () => n;
  },
  nc = (e, t) => {
    if (e.vnode.shapeFlag & 32) {
      const n = t._;
      n ? ((e.slots = z(t)), an(t, "_", n)) : Ho(t, (e.slots = {}));
    } else (e.slots = {}), t && Ao(e, t);
    an(e.slots, In, 1);
  },
  rc = (e, t, n) => {
    const { vnode: r, slots: s } = e;
    let o = !0,
      i = Z;
    if (r.shapeFlag & 32) {
      const l = t._;
      l
        ? n && l === 1
          ? (o = !1)
          : (de(s, t), !n && l === 1 && delete s._)
        : ((o = !t.$stable), Ho(t, s)),
        (i = t);
    } else t && (Ao(e, t), (i = { default: 1 }));
    if (o) for (const l in s) !Oo(l) && !(l in i) && delete s[l];
  };
function Io() {
  return {
    app: null,
    config: {
      isNativeTag: Ci,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {},
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap(),
  };
}
let sc = 0;
function oc(e, t) {
  return function (r, s = null) {
    B(r) || (r = Object.assign({}, r)), s != null && !te(s) && (s = null);
    const o = Io(),
      i = new Set();
    let l = !1;
    const c = (o.app = {
      _uid: sc++,
      _component: r,
      _props: s,
      _container: null,
      _context: o,
      _instance: null,
      version: Wo,
      get config() {
        return o.config;
      },
      set config(a) {},
      use(a, ...u) {
        return (
          i.has(a) ||
            (a && B(a.install)
              ? (i.add(a), a.install(c, ...u))
              : B(a) && (i.add(a), a(c, ...u))),
          c
        );
      },
      mixin(a) {
        return o.mixins.includes(a) || o.mixins.push(a), c;
      },
      component(a, u) {
        return u ? ((o.components[a] = u), c) : o.components[a];
      },
      directive(a, u) {
        return u ? ((o.directives[a] = u), c) : o.directives[a];
      },
      mount(a, u, h) {
        if (!l) {
          const y = le(r, s);
          return (
            (y.appContext = o),
            u && t ? t(y, a) : e(y, a, h),
            (l = !0),
            (c._container = a),
            (a.__vue_app__ = c),
            jr(y.component) || y.component.proxy
          );
        }
      },
      unmount() {
        l && (e(null, c._container), delete c._container.__vue_app__);
      },
      provide(a, u) {
        return (o.provides[a] = u), c;
      },
    });
    return c;
  };
}
function gn(e, t, n, r, s = !1) {
  if (D(e)) {
    e.forEach((y, x) => gn(y, t && (D(t) ? t[x] : t), n, r, s));
    return;
  }
  if (Ht(r) && !s) return;
  const o = r.shapeFlag & 4 ? jr(r.component) || r.component.proxy : r.el,
    i = s ? null : o,
    { i: l, r: c } = e,
    a = t && t.r,
    u = l.refs === Z ? (l.refs = {}) : l.refs,
    h = l.setupState;
  if (
    (a != null &&
      a !== c &&
      (ie(a)
        ? ((u[a] = null), J(h, a) && (h[a] = null))
        : se(a) && (a.value = null)),
    B(c))
  )
    Ke(c, l, 12, [i, u]);
  else {
    const y = ie(c),
      x = se(c);
    if (y || x) {
      const g = () => {
        if (e.f) {
          const T = y ? (J(h, c) ? h[c] : u[c]) : c.value;
          s
            ? D(T) && yr(T, o)
            : D(T)
            ? T.includes(o) || T.push(o)
            : y
            ? ((u[c] = [o]), J(h, c) && (h[c] = u[c]))
            : ((c.value = [o]), e.k && (u[e.k] = c.value));
        } else
          y
            ? ((u[c] = i), J(h, c) && (h[c] = i))
            : x && ((c.value = i), e.k && (u[e.k] = i));
      };
      i ? ((g.id = -1), he(g, n)) : g();
    }
  }
}
let Fe = !1;
const Gt = (e) => /svg/.test(e.namespaceURI) && e.tagName !== "foreignObject",
  en = (e) => e.nodeType === 8;
function ic(e) {
  const {
      mt: t,
      p: n,
      o: {
        patchProp: r,
        createText: s,
        nextSibling: o,
        parentNode: i,
        remove: l,
        insert: c,
        createComment: a,
      },
    } = e,
    u = (_, p) => {
      if (!p.hasChildNodes()) {
        n(null, _, p), dn(), (p._vnode = _);
        return;
      }
      (Fe = !1),
        h(p.firstChild, _, null, null, null),
        dn(),
        (p._vnode = _),
        Fe && console.error("Hydration completed but contains mismatches.");
    },
    h = (_, p, v, j, A, F = !1) => {
      const O = en(_) && _.data === "[",
        C = () => T(_, p, v, j, A, O),
        { type: L, ref: W, shapeFlag: K, patchFlag: fe } = p;
      let G = _.nodeType;
      (p.el = _), fe === -2 && ((F = !1), (p.dynamicChildren = null));
      let I = null;
      switch (L) {
        case _t:
          G !== 3
            ? p.children === ""
              ? (c((p.el = s("")), i(_), _), (I = _))
              : (I = C())
            : (_.data !== p.children && ((Fe = !0), (_.data = p.children)),
              (I = o(_)));
          break;
        case ze:
          G !== 8 || O ? (I = C()) : (I = o(_));
          break;
        case ln:
          if ((O && ((_ = o(_)), (G = _.nodeType)), G === 1 || G === 3)) {
            I = _;
            const ee = !p.children.length;
            for (let V = 0; V < p.staticCount; V++)
              ee && (p.children += I.nodeType === 1 ? I.outerHTML : I.data),
                V === p.staticCount - 1 && (p.anchor = I),
                (I = o(I));
            return O ? o(I) : I;
          } else C();
          break;
        case xe:
          O ? (I = g(_, p, v, j, A, F)) : (I = C());
          break;
        default:
          if (K & 1)
            G !== 1 || p.type.toLowerCase() !== _.tagName.toLowerCase()
              ? (I = C())
              : (I = y(_, p, v, j, A, F));
          else if (K & 6) {
            p.slotScopeIds = A;
            const ee = i(_);
            if (
              (t(p, ee, null, v, j, Gt(ee), F),
              (I = O ? N(_) : o(_)),
              I && en(I) && I.data === "teleport end" && (I = o(I)),
              Ht(p))
            ) {
              let V;
              O
                ? ((V = le(xe)),
                  (V.anchor = I ? I.previousSibling : ee.lastChild))
                : (V = _.nodeType === 3 ? No("") : le("div")),
                (V.el = _),
                (p.component.subTree = V);
            }
          } else
            K & 64
              ? G !== 8
                ? (I = C())
                : (I = p.type.hydrate(_, p, v, j, A, F, e, x))
              : K & 128 &&
                (I = p.type.hydrate(_, p, v, j, Gt(i(_)), A, F, e, h));
      }
      return W != null && gn(W, null, j, p), I;
    },
    y = (_, p, v, j, A, F) => {
      F = F || !!p.dynamicChildren;
      const { type: O, props: C, patchFlag: L, shapeFlag: W, dirs: K } = p,
        fe = (O === "input" && K) || O === "option";
      if (fe || L !== -1) {
        if ((K && Se(p, null, v, "created"), C))
          if (fe || !F || L & 48)
            for (const I in C)
              ((fe && I.endsWith("value")) || (Bt(I) && !Ot(I))) &&
                r(_, I, null, C[I], !1, void 0, v);
          else C.onClick && r(_, "onClick", null, C.onClick, !1, void 0, v);
        let G;
        if (
          ((G = C && C.onVnodeBeforeMount) && _e(G, v, p),
          K && Se(p, null, v, "beforeMount"),
          ((G = C && C.onVnodeMounted) || K) &&
            yo(() => {
              G && _e(G, v, p), K && Se(p, null, v, "mounted");
            }, j),
          W & 16 && !(C && (C.innerHTML || C.textContent)))
        ) {
          let I = x(_.firstChild, p, _, v, j, A, F);
          for (; I; ) {
            Fe = !0;
            const ee = I;
            (I = I.nextSibling), l(ee);
          }
        } else
          W & 8 &&
            _.textContent !== p.children &&
            ((Fe = !0), (_.textContent = p.children));
      }
      return _.nextSibling;
    },
    x = (_, p, v, j, A, F, O) => {
      O = O || !!p.dynamicChildren;
      const C = p.children,
        L = C.length;
      for (let W = 0; W < L; W++) {
        const K = O ? C[W] : (C[W] = be(C[W]));
        if (_) _ = h(_, K, j, A, F, O);
        else {
          if (K.type === _t && !K.children) continue;
          (Fe = !0), n(null, K, v, null, j, A, Gt(v), F);
        }
      }
      return _;
    },
    g = (_, p, v, j, A, F) => {
      const { slotScopeIds: O } = p;
      O && (A = A ? A.concat(O) : O);
      const C = i(_),
        L = x(o(_), p, C, v, j, A, F);
      return L && en(L) && L.data === "]"
        ? o((p.anchor = L))
        : ((Fe = !0), c((p.anchor = a("]")), C, L), L);
    },
    T = (_, p, v, j, A, F) => {
      if (((Fe = !0), (p.el = null), F)) {
        const L = N(_);
        for (;;) {
          const W = o(_);
          if (W && W !== L) l(W);
          else break;
        }
      }
      const O = o(_),
        C = i(_);
      return l(_), n(null, p, C, O, v, j, Gt(C), A), O;
    },
    N = (_) => {
      let p = 0;
      for (; _; )
        if (
          ((_ = o(_)), _ && en(_) && (_.data === "[" && p++, _.data === "]"))
        ) {
          if (p === 0) return o(_);
          p--;
        }
      return _;
    };
  return [u, h];
}
const he = yo;
function lc(e) {
  return Mo(e);
}
function cc(e) {
  return Mo(e, ic);
}
function Mo(e, t) {
  const n = Ii();
  n.__VUE__ = !0;
  const {
      insert: r,
      remove: s,
      patchProp: o,
      createElement: i,
      createText: l,
      createComment: c,
      setText: a,
      setElementText: u,
      parentNode: h,
      nextSibling: y,
      setScopeId: x = Ce,
      insertStaticContent: g,
    } = e,
    T = (
      f,
      d,
      m,
      w = null,
      b = null,
      P = null,
      S = !1,
      R = null,
      k = !!d.dynamicChildren
    ) => {
      if (f === d) return;
      f && !Ue(f, d) && ((w = Jt(f)), Pe(f, b, P, !0), (f = null)),
        d.patchFlag === -2 && ((k = !1), (d.dynamicChildren = null));
      const { type: E, ref: M, shapeFlag: H } = d;
      switch (E) {
        case _t:
          N(f, d, m, w);
          break;
        case ze:
          _(f, d, m, w);
          break;
        case ln:
          f == null && p(d, m, w, S);
          break;
        case xe:
          fe(f, d, m, w, b, P, S, R, k);
          break;
        default:
          H & 1
            ? A(f, d, m, w, b, P, S, R, k)
            : H & 6
            ? G(f, d, m, w, b, P, S, R, k)
            : (H & 64 || H & 128) && E.process(f, d, m, w, b, P, S, R, k, it);
      }
      M != null && b && gn(M, f && f.ref, P, d || f, !d);
    },
    N = (f, d, m, w) => {
      if (f == null) r((d.el = l(d.children)), m, w);
      else {
        const b = (d.el = f.el);
        d.children !== f.children && a(b, d.children);
      }
    },
    _ = (f, d, m, w) => {
      f == null ? r((d.el = c(d.children || "")), m, w) : (d.el = f.el);
    },
    p = (f, d, m, w) => {
      [f.el, f.anchor] = g(f.children, d, m, w, f.el, f.anchor);
    },
    v = ({ el: f, anchor: d }, m, w) => {
      let b;
      for (; f && f !== d; ) (b = y(f)), r(f, m, w), (f = b);
      r(d, m, w);
    },
    j = ({ el: f, anchor: d }) => {
      let m;
      for (; f && f !== d; ) (m = y(f)), s(f), (f = m);
      s(d);
    },
    A = (f, d, m, w, b, P, S, R, k) => {
      (S = S || d.type === "svg"),
        f == null ? F(d, m, w, b, P, S, R, k) : L(f, d, b, P, S, R, k);
    },
    F = (f, d, m, w, b, P, S, R) => {
      let k, E;
      const { type: M, props: H, shapeFlag: $, transition: U, dirs: q } = f;
      if (
        ((k = f.el = i(f.type, P, H && H.is, H)),
        $ & 8
          ? u(k, f.children)
          : $ & 16 &&
            C(f.children, k, null, w, b, P && M !== "foreignObject", S, R),
        q && Se(f, null, w, "created"),
        O(k, f, f.scopeId, S, w),
        H)
      ) {
        for (const Q in H)
          Q !== "value" &&
            !Ot(Q) &&
            o(k, Q, null, H[Q], P, f.children, w, b, Ae);
        "value" in H && o(k, "value", null, H.value),
          (E = H.onVnodeBeforeMount) && _e(E, w, f);
      }
      q && Se(f, null, w, "beforeMount");
      const Y = (!b || (b && !b.pendingBranch)) && U && !U.persisted;
      Y && U.beforeEnter(k),
        r(k, d, m),
        ((E = H && H.onVnodeMounted) || Y || q) &&
          he(() => {
            E && _e(E, w, f), Y && U.enter(k), q && Se(f, null, w, "mounted");
          }, b);
    },
    O = (f, d, m, w, b) => {
      if ((m && x(f, m), w)) for (let P = 0; P < w.length; P++) x(f, w[P]);
      if (b) {
        let P = b.subTree;
        if (d === P) {
          const S = b.vnode;
          O(f, S, S.scopeId, S.slotScopeIds, b.parent);
        }
      }
    },
    C = (f, d, m, w, b, P, S, R, k = 0) => {
      for (let E = k; E < f.length; E++) {
        const M = (f[E] = R ? Ne(f[E]) : be(f[E]));
        T(null, M, d, m, w, b, P, S, R);
      }
    },
    L = (f, d, m, w, b, P, S) => {
      const R = (d.el = f.el);
      let { patchFlag: k, dynamicChildren: E, dirs: M } = d;
      k |= f.patchFlag & 16;
      const H = f.props || Z,
        $ = d.props || Z;
      let U;
      m && Ye(m, !1),
        (U = $.onVnodeBeforeUpdate) && _e(U, m, d, f),
        M && Se(d, f, m, "beforeUpdate"),
        m && Ye(m, !0);
      const q = b && d.type !== "foreignObject";
      if (
        (E
          ? W(f.dynamicChildren, E, R, m, w, q, P)
          : S || X(f, d, R, null, m, w, q, P, !1),
        k > 0)
      ) {
        if (k & 16) K(R, d, H, $, m, w, b);
        else if (
          (k & 2 && H.class !== $.class && o(R, "class", null, $.class, b),
          k & 4 && o(R, "style", H.style, $.style, b),
          k & 8)
        ) {
          const Y = d.dynamicProps;
          for (let Q = 0; Q < Y.length; Q++) {
            const oe = Y[Q],
              Ee = H[oe],
              lt = $[oe];
            (lt !== Ee || oe === "value") &&
              o(R, oe, Ee, lt, b, f.children, m, w, Ae);
          }
        }
        k & 1 && f.children !== d.children && u(R, d.children);
      } else !S && E == null && K(R, d, H, $, m, w, b);
      ((U = $.onVnodeUpdated) || M) &&
        he(() => {
          U && _e(U, m, d, f), M && Se(d, f, m, "updated");
        }, w);
    },
    W = (f, d, m, w, b, P, S) => {
      for (let R = 0; R < d.length; R++) {
        const k = f[R],
          E = d[R],
          M =
            k.el && (k.type === xe || !Ue(k, E) || k.shapeFlag & 70)
              ? h(k.el)
              : m;
        T(k, E, M, null, w, b, P, S, !0);
      }
    },
    K = (f, d, m, w, b, P, S) => {
      if (m !== w) {
        if (m !== Z)
          for (const R in m)
            !Ot(R) && !(R in w) && o(f, R, m[R], null, S, d.children, b, P, Ae);
        for (const R in w) {
          if (Ot(R)) continue;
          const k = w[R],
            E = m[R];
          k !== E && R !== "value" && o(f, R, E, k, S, d.children, b, P, Ae);
        }
        "value" in w && o(f, "value", m.value, w.value);
      }
    },
    fe = (f, d, m, w, b, P, S, R, k) => {
      const E = (d.el = f ? f.el : l("")),
        M = (d.anchor = f ? f.anchor : l(""));
      let { patchFlag: H, dynamicChildren: $, slotScopeIds: U } = d;
      U && (R = R ? R.concat(U) : U),
        f == null
          ? (r(E, m, w), r(M, m, w), C(d.children, m, M, b, P, S, R, k))
          : H > 0 && H & 64 && $ && f.dynamicChildren
          ? (W(f.dynamicChildren, $, m, b, P, S, R),
            (d.key != null || (b && d === b.subTree)) && $o(f, d, !0))
          : X(f, d, m, M, b, P, S, R, k);
    },
    G = (f, d, m, w, b, P, S, R, k) => {
      (d.slotScopeIds = R),
        f == null
          ? d.shapeFlag & 512
            ? b.ctx.activate(d, m, w, S, k)
            : I(d, m, w, b, P, S, k)
          : ee(f, d, k);
    },
    I = (f, d, m, w, b, P, S) => {
      const R = (f.component = yc(f, w, b));
      if ((Ar(f) && (R.ctx.renderer = it), _c(R), R.asyncDep)) {
        if ((b && b.registerDep(R, V), !f.el)) {
          const k = (R.subTree = le(ze));
          _(null, k, d, m);
        }
        return;
      }
      V(R, f, d, m, b, P, S);
    },
    ee = (f, d, m) => {
      const w = (d.component = f.component);
      if (Cl(f, d, m))
        if (w.asyncDep && !w.asyncResolved) {
          ne(w, d, m);
          return;
        } else (w.next = d), bl(w.update), w.update();
      else (d.el = f.el), (w.vnode = d);
    },
    V = (f, d, m, w, b, P, S) => {
      const R = () => {
          if (f.isMounted) {
            let { next: M, bu: H, u: $, parent: U, vnode: q } = f,
              Y = M,
              Q;
            Ye(f, !1),
              M ? ((M.el = q.el), ne(f, M, S)) : (M = q),
              H && Ln(H),
              (Q = M.props && M.props.onVnodeBeforeUpdate) && _e(Q, U, M, q),
              Ye(f, !0);
            const oe = Nn(f),
              Ee = f.subTree;
            (f.subTree = oe),
              T(Ee, oe, h(Ee.el), Jt(Ee), f, b, P),
              (M.el = oe.el),
              Y === null && Sr(f, oe.el),
              $ && he($, b),
              (Q = M.props && M.props.onVnodeUpdated) &&
                he(() => _e(Q, U, M, q), b);
          } else {
            let M;
            const { el: H, props: $ } = d,
              { bm: U, m: q, parent: Y } = f,
              Q = Ht(d);
            if (
              (Ye(f, !1),
              U && Ln(U),
              !Q && (M = $ && $.onVnodeBeforeMount) && _e(M, Y, d),
              Ye(f, !0),
              H && jn)
            ) {
              const oe = () => {
                (f.subTree = Nn(f)), jn(H, f.subTree, f, b, null);
              };
              Q
                ? d.type.__asyncLoader().then(() => !f.isUnmounted && oe())
                : oe();
            } else {
              const oe = (f.subTree = Nn(f));
              T(null, oe, m, w, f, b, P), (d.el = oe.el);
            }
            if ((q && he(q, b), !Q && (M = $ && $.onVnodeMounted))) {
              const oe = d;
              he(() => _e(M, Y, oe), b);
            }
            (d.shapeFlag & 256 ||
              (Y && Ht(Y.vnode) && Y.vnode.shapeFlag & 256)) &&
              f.a &&
              he(f.a, b),
              (f.isMounted = !0),
              (d = m = w = null);
          }
        },
        k = (f.effect = new vr(R, () => Sn(E), f.scope)),
        E = (f.update = () => k.run());
      (E.id = f.uid), Ye(f, !0), E();
    },
    ne = (f, d, m) => {
      d.component = f;
      const w = f.vnode.props;
      (f.vnode = d),
        (f.next = null),
        ec(f, d.props, w, m),
        rc(f, d.children, m),
        Tt(),
        es(),
        Ct();
    },
    X = (f, d, m, w, b, P, S, R, k = !1) => {
      const E = f && f.children,
        M = f ? f.shapeFlag : 0,
        H = d.children,
        { patchFlag: $, shapeFlag: U } = d;
      if ($ > 0) {
        if ($ & 128) {
          qt(E, H, m, w, b, P, S, R, k);
          return;
        } else if ($ & 256) {
          Qe(E, H, m, w, b, P, S, R, k);
          return;
        }
      }
      U & 8
        ? (M & 16 && Ae(E, b, P), H !== E && u(m, H))
        : M & 16
        ? U & 16
          ? qt(E, H, m, w, b, P, S, R, k)
          : Ae(E, b, P, !0)
        : (M & 8 && u(m, ""), U & 16 && C(H, m, w, b, P, S, R, k));
    },
    Qe = (f, d, m, w, b, P, S, R, k) => {
      (f = f || dt), (d = d || dt);
      const E = f.length,
        M = d.length,
        H = Math.min(E, M);
      let $;
      for ($ = 0; $ < H; $++) {
        const U = (d[$] = k ? Ne(d[$]) : be(d[$]));
        T(f[$], U, m, null, b, P, S, R, k);
      }
      E > M ? Ae(f, b, P, !0, !1, H) : C(d, m, w, b, P, S, R, k, H);
    },
    qt = (f, d, m, w, b, P, S, R, k) => {
      let E = 0;
      const M = d.length;
      let H = f.length - 1,
        $ = M - 1;
      for (; E <= H && E <= $; ) {
        const U = f[E],
          q = (d[E] = k ? Ne(d[E]) : be(d[E]));
        if (Ue(U, q)) T(U, q, m, null, b, P, S, R, k);
        else break;
        E++;
      }
      for (; E <= H && E <= $; ) {
        const U = f[H],
          q = (d[$] = k ? Ne(d[$]) : be(d[$]));
        if (Ue(U, q)) T(U, q, m, null, b, P, S, R, k);
        else break;
        H--, $--;
      }
      if (E > H) {
        if (E <= $) {
          const U = $ + 1,
            q = U < M ? d[U].el : w;
          for (; E <= $; )
            T(null, (d[E] = k ? Ne(d[E]) : be(d[E])), m, q, b, P, S, R, k), E++;
        }
      } else if (E > $) for (; E <= H; ) Pe(f[E], b, P, !0), E++;
      else {
        const U = E,
          q = E,
          Y = new Map();
        for (E = q; E <= $; E++) {
          const me = (d[E] = k ? Ne(d[E]) : be(d[E]));
          me.key != null && Y.set(me.key, E);
        }
        let Q,
          oe = 0;
        const Ee = $ - q + 1;
        let lt = !1,
          Wr = 0;
        const Pt = new Array(Ee);
        for (E = 0; E < Ee; E++) Pt[E] = 0;
        for (E = U; E <= H; E++) {
          const me = f[E];
          if (oe >= Ee) {
            Pe(me, b, P, !0);
            continue;
          }
          let ke;
          if (me.key != null) ke = Y.get(me.key);
          else
            for (Q = q; Q <= $; Q++)
              if (Pt[Q - q] === 0 && Ue(me, d[Q])) {
                ke = Q;
                break;
              }
          ke === void 0
            ? Pe(me, b, P, !0)
            : ((Pt[ke - q] = E + 1),
              ke >= Wr ? (Wr = ke) : (lt = !0),
              T(me, d[ke], m, null, b, P, S, R, k),
              oe++);
        }
        const Kr = lt ? ac(Pt) : dt;
        for (Q = Kr.length - 1, E = Ee - 1; E >= 0; E--) {
          const me = q + E,
            ke = d[me],
            qr = me + 1 < M ? d[me + 1].el : w;
          Pt[E] === 0
            ? T(null, ke, m, qr, b, P, S, R, k)
            : lt && (Q < 0 || E !== Kr[Q] ? Xe(ke, m, qr, 2) : Q--);
        }
      }
    },
    Xe = (f, d, m, w, b = null) => {
      const { el: P, type: S, transition: R, children: k, shapeFlag: E } = f;
      if (E & 6) {
        Xe(f.component.subTree, d, m, w);
        return;
      }
      if (E & 128) {
        f.suspense.move(d, m, w);
        return;
      }
      if (E & 64) {
        S.move(f, d, m, it);
        return;
      }
      if (S === xe) {
        r(P, d, m);
        for (let H = 0; H < k.length; H++) Xe(k[H], d, m, w);
        r(f.anchor, d, m);
        return;
      }
      if (S === ln) {
        v(f, d, m);
        return;
      }
      if (w !== 2 && E & 1 && R)
        if (w === 0) R.beforeEnter(P), r(P, d, m), he(() => R.enter(P), b);
        else {
          const { leave: H, delayLeave: $, afterLeave: U } = R,
            q = () => r(P, d, m),
            Y = () => {
              H(P, () => {
                q(), U && U();
              });
            };
          $ ? $(P, q, Y) : Y();
        }
      else r(P, d, m);
    },
    Pe = (f, d, m, w = !1, b = !1) => {
      const {
        type: P,
        props: S,
        ref: R,
        children: k,
        dynamicChildren: E,
        shapeFlag: M,
        patchFlag: H,
        dirs: $,
      } = f;
      if ((R != null && gn(R, null, m, f, !0), M & 256)) {
        d.ctx.deactivate(f);
        return;
      }
      const U = M & 1 && $,
        q = !Ht(f);
      let Y;
      if ((q && (Y = S && S.onVnodeBeforeUnmount) && _e(Y, d, f), M & 6))
        yi(f.component, m, w);
      else {
        if (M & 128) {
          f.suspense.unmount(m, w);
          return;
        }
        U && Se(f, null, d, "beforeUnmount"),
          M & 64
            ? f.type.remove(f, d, m, b, it, w)
            : E && (P !== xe || (H > 0 && H & 64))
            ? Ae(E, d, m, !1, !0)
            : ((P === xe && H & 384) || (!b && M & 16)) && Ae(k, d, m),
          w && Br(f);
      }
      ((q && (Y = S && S.onVnodeUnmounted)) || U) &&
        he(() => {
          Y && _e(Y, d, f), U && Se(f, null, d, "unmounted");
        }, m);
    },
    Br = (f) => {
      const { type: d, el: m, anchor: w, transition: b } = f;
      if (d === xe) {
        mi(m, w);
        return;
      }
      if (d === ln) {
        j(f);
        return;
      }
      const P = () => {
        s(m), b && !b.persisted && b.afterLeave && b.afterLeave();
      };
      if (f.shapeFlag & 1 && b && !b.persisted) {
        const { leave: S, delayLeave: R } = b,
          k = () => S(m, P);
        R ? R(f.el, P, k) : k();
      } else P();
    },
    mi = (f, d) => {
      let m;
      for (; f !== d; ) (m = y(f)), s(f), (f = m);
      s(d);
    },
    yi = (f, d, m) => {
      const { bum: w, scope: b, update: P, subTree: S, um: R } = f;
      w && Ln(w),
        b.stop(),
        P && ((P.active = !1), Pe(S, f, d, m)),
        R && he(R, d),
        he(() => {
          f.isUnmounted = !0;
        }, d),
        d &&
          d.pendingBranch &&
          !d.isUnmounted &&
          f.asyncDep &&
          !f.asyncResolved &&
          f.suspenseId === d.pendingId &&
          (d.deps--, d.deps === 0 && d.resolve());
    },
    Ae = (f, d, m, w = !1, b = !1, P = 0) => {
      for (let S = P; S < f.length; S++) Pe(f[S], d, m, w, b);
    },
    Jt = (f) =>
      f.shapeFlag & 6
        ? Jt(f.component.subTree)
        : f.shapeFlag & 128
        ? f.suspense.next()
        : y(f.anchor || f.el),
    Dr = (f, d, m) => {
      f == null
        ? d._vnode && Pe(d._vnode, null, null, !0)
        : T(d._vnode || null, f, d, null, null, null, m),
        es(),
        dn(),
        (d._vnode = f);
    },
    it = {
      p: T,
      um: Pe,
      m: Xe,
      r: Br,
      mt: I,
      mc: C,
      pc: X,
      pbc: W,
      n: Jt,
      o: e,
    };
  let $n, jn;
  return (
    t && ([$n, jn] = t(it)), { render: Dr, hydrate: $n, createApp: oc(Dr, $n) }
  );
}
function Ye({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function $o(e, t, n = !1) {
  const r = e.children,
    s = t.children;
  if (D(r) && D(s))
    for (let o = 0; o < r.length; o++) {
      const i = r[o];
      let l = s[o];
      l.shapeFlag & 1 &&
        !l.dynamicChildren &&
        ((l.patchFlag <= 0 || l.patchFlag === 32) &&
          ((l = s[o] = Ne(s[o])), (l.el = i.el)),
        n || $o(i, l)),
        l.type === _t && (l.el = i.el);
    }
}
function ac(e) {
  const t = e.slice(),
    n = [0];
  let r, s, o, i, l;
  const c = e.length;
  for (r = 0; r < c; r++) {
    const a = e[r];
    if (a !== 0) {
      if (((s = n[n.length - 1]), e[s] < a)) {
        (t[r] = s), n.push(r);
        continue;
      }
      for (o = 0, i = n.length - 1; o < i; )
        (l = (o + i) >> 1), e[n[l]] < a ? (o = l + 1) : (i = l);
      a < e[n[o]] && (o > 0 && (t[r] = n[o - 1]), (n[o] = r));
    }
  }
  for (o = n.length, i = n[o - 1]; o-- > 0; ) (n[o] = i), (i = t[i]);
  return n;
}
const fc = (e) => e.__isTeleport,
  xe = Symbol(void 0),
  _t = Symbol(void 0),
  ze = Symbol(void 0),
  ln = Symbol(void 0),
  It = [];
let ve = null;
function ft(e = !1) {
  It.push((ve = e ? null : []));
}
function jo() {
  It.pop(), (ve = It[It.length - 1] || null);
}
let bt = 1;
function fs(e) {
  bt += e;
}
function Fo(e) {
  return (
    (e.dynamicChildren = bt > 0 ? ve || dt : null),
    jo(),
    bt > 0 && ve && ve.push(e),
    e
  );
}
function uc(e, t, n, r, s, o) {
  return Fo(nt(e, t, n, r, s, o, !0));
}
function tn(e, t, n, r, s) {
  return Fo(le(e, t, n, r, s, !0));
}
function mn(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Ue(e, t) {
  return e.type === t.type && e.key === t.key;
}
const In = "__vInternal",
  Lo = ({ key: e }) => e ?? null,
  cn = ({ ref: e, ref_key: t, ref_for: n }) =>
    e != null
      ? ie(e) || se(e) || B(e)
        ? { i: we, r: e, k: t, f: !!n }
        : e
      : null;
function nt(
  e,
  t = null,
  n = null,
  r = 0,
  s = null,
  o = e === xe ? 0 : 1,
  i = !1,
  l = !1
) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Lo(t),
    ref: t && cn(t),
    scopeId: Hn,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: o,
    patchFlag: r,
    dynamicProps: s,
    dynamicChildren: null,
    appContext: null,
    ctx: we,
  };
  return (
    l
      ? ($r(c, n), o & 128 && e.normalize(c))
      : n && (c.shapeFlag |= ie(n) ? 8 : 16),
    bt > 0 &&
      !i &&
      ve &&
      (c.patchFlag > 0 || o & 6) &&
      c.patchFlag !== 32 &&
      ve.push(c),
    c
  );
}
const le = dc;
function dc(e, t = null, n = null, r = 0, s = null, o = !1) {
  if (((!e || e === ql) && (e = ze), mn(e))) {
    const l = wt(e, t, !0);
    return (
      n && $r(l, n),
      bt > 0 &&
        !o &&
        ve &&
        (l.shapeFlag & 6 ? (ve[ve.indexOf(e)] = l) : ve.push(l)),
      (l.patchFlag |= -2),
      l
    );
  }
  if ((xc(e) && (e = e.__vccOpts), t)) {
    t = hc(t);
    let { class: l, style: c } = t;
    l && !ie(l) && (t.class = xn(l)),
      te(c) && (oo(c) && !D(c) && (c = de({}, c)), (t.style = En(c)));
  }
  const i = ie(e) ? 1 : Rl(e) ? 128 : fc(e) ? 64 : te(e) ? 4 : B(e) ? 2 : 0;
  return nt(e, t, n, r, s, i, o, !0);
}
function hc(e) {
  return e ? (oo(e) || In in e ? de({}, e) : e) : null;
}
function wt(e, t, n = !1) {
  const { props: r, ref: s, patchFlag: o, children: i } = e,
    l = t ? pc(r || {}, t) : r;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: l,
    key: l && Lo(l),
    ref:
      t && t.ref ? (n && s ? (D(s) ? s.concat(cn(t)) : [s, cn(t)]) : cn(t)) : s,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: i,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== xe ? (o === -1 ? 16 : o | 16) : o,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && wt(e.ssContent),
    ssFallback: e.ssFallback && wt(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce,
  };
}
function No(e = " ", t = 0) {
  return le(_t, null, e, t);
}
function be(e) {
  return e == null || typeof e == "boolean"
    ? le(ze)
    : D(e)
    ? le(xe, null, e.slice())
    : typeof e == "object"
    ? Ne(e)
    : le(_t, null, String(e));
}
function Ne(e) {
  return (e.el === null && e.patchFlag !== -1) || e.memo ? e : wt(e);
}
function $r(e, t) {
  let n = 0;
  const { shapeFlag: r } = e;
  if (t == null) t = null;
  else if (D(t)) n = 16;
  else if (typeof t == "object")
    if (r & 65) {
      const s = t.default;
      s && (s._c && (s._d = !1), $r(e, s()), s._c && (s._d = !0));
      return;
    } else {
      n = 32;
      const s = t._;
      !s && !(In in t)
        ? (t._ctx = we)
        : s === 3 &&
          we &&
          (we.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)));
    }
  else
    B(t)
      ? ((t = { default: t, _ctx: we }), (n = 32))
      : ((t = String(t)), r & 64 ? ((n = 16), (t = [No(t)])) : (n = 8));
  (e.children = t), (e.shapeFlag |= n);
}
function pc(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    for (const s in r)
      if (s === "class")
        t.class !== r.class && (t.class = xn([t.class, r.class]));
      else if (s === "style") t.style = En([t.style, r.style]);
      else if (Bt(s)) {
        const o = t[s],
          i = r[s];
        i &&
          o !== i &&
          !(D(o) && o.includes(i)) &&
          (t[s] = o ? [].concat(o, i) : i);
      } else s !== "" && (t[s] = r[s]);
  }
  return t;
}
function _e(e, t, n, r = null) {
  Re(e, t, 7, [n, r]);
}
const gc = Io();
let mc = 0;
function yc(e, t, n) {
  const r = e.type,
    s = (t ? t.appContext : e.appContext) || gc,
    o = {
      uid: mc++,
      vnode: e,
      type: r,
      parent: t,
      appContext: s,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      scope: new qs(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: t ? t.provides : Object.create(s.provides),
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: So(r, s),
      emitsOptions: go(r, s),
      emit: null,
      emitted: null,
      propsDefaults: Z,
      inheritAttrs: r.inheritAttrs,
      ctx: Z,
      data: Z,
      props: Z,
      attrs: Z,
      slots: Z,
      refs: Z,
      setupState: Z,
      setupContext: null,
      suspense: n,
      suspenseId: n ? n.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null,
    };
  return (
    (o.ctx = { _: o }),
    (o.root = t ? t.root : o),
    (o.emit = vl.bind(null, o)),
    e.ce && e.ce(o),
    o
  );
}
let re = null;
const Dt = () => re || we,
  vt = (e) => {
    (re = e), e.scope.on();
  },
  rt = () => {
    re && re.scope.off(), (re = null);
  };
function Uo(e) {
  return e.vnode.shapeFlag & 4;
}
let Et = !1;
function _c(e, t = !1) {
  Et = t;
  const { props: n, children: r } = e.vnode,
    s = Uo(e);
  Gl(e, n, s, t), nc(e, r);
  const o = s ? bc(e, t) : void 0;
  return (Et = !1), o;
}
function bc(e, t) {
  const n = e.type;
  (e.accessCache = Object.create(null)), (e.proxy = yt(new Proxy(e.ctx, zl)));
  const { setup: r } = n;
  if (r) {
    const s = (e.setupContext = r.length > 1 ? vc(e) : null);
    vt(e), Tt();
    const o = Ke(r, e, 0, [e.props, s]);
    if ((Ct(), rt(), Ds(o))) {
      if ((o.then(rt, rt), t))
        return o
          .then((i) => {
            rr(e, i, t);
          })
          .catch((i) => {
            Rt(i, e, 0);
          });
      e.asyncDep = o;
    } else rr(e, o, t);
  } else Bo(e, t);
}
function rr(e, t, n) {
  B(t)
    ? e.type.__ssrInlineRender
      ? (e.ssrRender = t)
      : (e.render = t)
    : te(t) && (e.setupState = co(t)),
    Bo(e, n);
}
let us;
function Bo(e, t, n) {
  const r = e.type;
  if (!e.render) {
    if (!t && us && !r.render) {
      const s = r.template || Ir(e).template;
      if (s) {
        const { isCustomElement: o, compilerOptions: i } = e.appContext.config,
          { delimiters: l, compilerOptions: c } = r,
          a = de(de({ isCustomElement: o, delimiters: l }, i), c);
        r.render = us(s, a);
      }
    }
    e.render = r.render || Ce;
  }
  vt(e), Tt(), Ql(e), Ct(), rt();
}
function wc(e) {
  return new Proxy(e.attrs, {
    get(t, n) {
      return ge(e, "get", "$attrs"), t[n];
    },
  });
}
function vc(e) {
  const t = (r) => {
    e.exposed = r || {};
  };
  let n;
  return {
    get attrs() {
      return n || (n = wc(e));
    },
    slots: e.slots,
    emit: e.emit,
    expose: t,
  };
}
function jr(e) {
  if (e.exposed)
    return (
      e.exposeProxy ||
      (e.exposeProxy = new Proxy(co(yt(e.exposed)), {
        get(t, n) {
          if (n in t) return t[n];
          if (n in At) return At[n](e);
        },
        has(t, n) {
          return n in t || n in At;
        },
      }))
    );
}
function Ec(e, t = !0) {
  return B(e) ? e.displayName || e.name : e.name || (t && e.__name);
}
function xc(e) {
  return B(e) && "__vccOpts" in e;
}
const Do = (e, t) => ml(e, t, Et);
function Tc(e, t, n) {
  const r = arguments.length;
  return r === 2
    ? te(t) && !D(t)
      ? mn(t)
        ? le(e, null, [t])
        : le(e, t)
      : le(e, null, t)
    : (r > 3
        ? (n = Array.prototype.slice.call(arguments, 2))
        : r === 3 && mn(n) && (n = [n]),
      le(e, t, n));
}
const Cc = Symbol(""),
  Rc = () => tt(Cc),
  Wo = "3.2.47",
  Pc = "http://www.w3.org/2000/svg",
  Ge = typeof document < "u" ? document : null,
  ds = Ge && Ge.createElement("template"),
  kc = {
    insert: (e, t, n) => {
      t.insertBefore(e, n || null);
    },
    remove: (e) => {
      const t = e.parentNode;
      t && t.removeChild(e);
    },
    createElement: (e, t, n, r) => {
      const s = t
        ? Ge.createElementNS(Pc, e)
        : Ge.createElement(e, n ? { is: n } : void 0);
      return (
        e === "select" &&
          r &&
          r.multiple != null &&
          s.setAttribute("multiple", r.multiple),
        s
      );
    },
    createText: (e) => Ge.createTextNode(e),
    createComment: (e) => Ge.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t;
    },
    setElementText: (e, t) => {
      e.textContent = t;
    },
    parentNode: (e) => e.parentNode,
    nextSibling: (e) => e.nextSibling,
    querySelector: (e) => Ge.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, "");
    },
    insertStaticContent(e, t, n, r, s, o) {
      const i = n ? n.previousSibling : t.lastChild;
      if (s && (s === o || s.nextSibling))
        for (
          ;
          t.insertBefore(s.cloneNode(!0), n),
            !(s === o || !(s = s.nextSibling));

        );
      else {
        ds.innerHTML = r ? `<svg>${e}</svg>` : e;
        const l = ds.content;
        if (r) {
          const c = l.firstChild;
          for (; c.firstChild; ) l.appendChild(c.firstChild);
          l.removeChild(c);
        }
        t.insertBefore(l, n);
      }
      return [
        i ? i.nextSibling : t.firstChild,
        n ? n.previousSibling : t.lastChild,
      ];
    },
  };
function Sc(e, t, n) {
  const r = e._vtc;
  r && (t = (t ? [t, ...r] : [...r]).join(" ")),
    t == null
      ? e.removeAttribute("class")
      : n
      ? e.setAttribute("class", t)
      : (e.className = t);
}
function Oc(e, t, n) {
  const r = e.style,
    s = ie(n);
  if (n && !s) {
    if (t && !ie(t)) for (const o in t) n[o] == null && sr(r, o, "");
    for (const o in n) sr(r, o, n[o]);
  } else {
    const o = r.display;
    s ? t !== n && (r.cssText = n) : t && e.removeAttribute("style"),
      "_vod" in e && (r.display = o);
  }
}
const hs = /\s*!important$/;
function sr(e, t, n) {
  if (D(n)) n.forEach((r) => sr(e, t, r));
  else if ((n == null && (n = ""), t.startsWith("--"))) e.setProperty(t, n);
  else {
    const r = Hc(e, t);
    hs.test(n)
      ? e.setProperty(xt(r), n.replace(hs, ""), "important")
      : (e[r] = n);
  }
}
const ps = ["Webkit", "Moz", "ms"],
  Dn = {};
function Hc(e, t) {
  const n = Dn[t];
  if (n) return n;
  let r = He(t);
  if (r !== "filter" && r in e) return (Dn[t] = r);
  r = Rn(r);
  for (let s = 0; s < ps.length; s++) {
    const o = ps[s] + r;
    if (o in e) return (Dn[t] = o);
  }
  return t;
}
const gs = "http://www.w3.org/1999/xlink";
function Ac(e, t, n, r, s) {
  if (r && t.startsWith("xlink:"))
    n == null
      ? e.removeAttributeNS(gs, t.slice(6, t.length))
      : e.setAttributeNS(gs, t, n);
  else {
    const o = xi(t);
    n == null || (o && !Ns(n))
      ? e.removeAttribute(t)
      : e.setAttribute(t, o ? "" : n);
  }
}
function Ic(e, t, n, r, s, o, i) {
  if (t === "innerHTML" || t === "textContent") {
    r && i(r, s, o), (e[t] = n ?? "");
    return;
  }
  if (t === "value" && e.tagName !== "PROGRESS" && !e.tagName.includes("-")) {
    e._value = n;
    const c = n ?? "";
    (e.value !== c || e.tagName === "OPTION") && (e.value = c),
      n == null && e.removeAttribute(t);
    return;
  }
  let l = !1;
  if (n === "" || n == null) {
    const c = typeof e[t];
    c === "boolean"
      ? (n = Ns(n))
      : n == null && c === "string"
      ? ((n = ""), (l = !0))
      : c === "number" && ((n = 0), (l = !0));
  }
  try {
    e[t] = n;
  } catch {}
  l && e.removeAttribute(t);
}
function Mc(e, t, n, r) {
  e.addEventListener(t, n, r);
}
function $c(e, t, n, r) {
  e.removeEventListener(t, n, r);
}
function jc(e, t, n, r, s = null) {
  const o = e._vei || (e._vei = {}),
    i = o[t];
  if (r && i) i.value = r;
  else {
    const [l, c] = Fc(t);
    if (r) {
      const a = (o[t] = Uc(r, s));
      Mc(e, l, a, c);
    } else i && ($c(e, l, i, c), (o[t] = void 0));
  }
}
const ms = /(?:Once|Passive|Capture)$/;
function Fc(e) {
  let t;
  if (ms.test(e)) {
    t = {};
    let r;
    for (; (r = e.match(ms)); )
      (e = e.slice(0, e.length - r[0].length)), (t[r[0].toLowerCase()] = !0);
  }
  return [e[2] === ":" ? e.slice(3) : xt(e.slice(2)), t];
}
let Wn = 0;
const Lc = Promise.resolve(),
  Nc = () => Wn || (Lc.then(() => (Wn = 0)), (Wn = Date.now()));
function Uc(e, t) {
  const n = (r) => {
    if (!r._vts) r._vts = Date.now();
    else if (r._vts <= n.attached) return;
    Re(Bc(r, n.value), t, 5, [r]);
  };
  return (n.value = e), (n.attached = Nc()), n;
}
function Bc(e, t) {
  if (D(t)) {
    const n = e.stopImmediatePropagation;
    return (
      (e.stopImmediatePropagation = () => {
        n.call(e), (e._stopped = !0);
      }),
      t.map((r) => (s) => !s._stopped && r && r(s))
    );
  } else return t;
}
const ys = /^on[a-z]/,
  Dc = (e, t, n, r, s = !1, o, i, l, c) => {
    t === "class"
      ? Sc(e, r, s)
      : t === "style"
      ? Oc(e, n, r)
      : Bt(t)
      ? mr(t) || jc(e, t, n, r, i)
      : (
          t[0] === "."
            ? ((t = t.slice(1)), !0)
            : t[0] === "^"
            ? ((t = t.slice(1)), !1)
            : Wc(e, t, r, s)
        )
      ? Ic(e, t, r, o, i, l, c)
      : (t === "true-value"
          ? (e._trueValue = r)
          : t === "false-value" && (e._falseValue = r),
        Ac(e, t, r, s));
  };
function Wc(e, t, n, r) {
  return r
    ? !!(
        t === "innerHTML" ||
        t === "textContent" ||
        (t in e && ys.test(t) && B(n))
      )
    : t === "spellcheck" ||
      t === "draggable" ||
      t === "translate" ||
      t === "form" ||
      (t === "list" && e.tagName === "INPUT") ||
      (t === "type" && e.tagName === "TEXTAREA") ||
      (ys.test(t) && ie(n))
    ? !1
    : t in e;
}
const Ko = de({ patchProp: Dc }, kc);
let Mt,
  _s = !1;
function Kc() {
  return Mt || (Mt = lc(Ko));
}
function qc() {
  return (Mt = _s ? Mt : cc(Ko)), (_s = !0), Mt;
}
const Jc = (...e) => {
    const t = Kc().createApp(...e),
      { mount: n } = t;
    return (
      (t.mount = (r) => {
        const s = qo(r);
        if (!s) return;
        const o = t._component;
        !B(o) && !o.render && !o.template && (o.template = s.innerHTML),
          (s.innerHTML = "");
        const i = n(s, !1, s instanceof SVGElement);
        return (
          s instanceof Element &&
            (s.removeAttribute("v-cloak"), s.setAttribute("data-v-app", "")),
          i
        );
      }),
      t
    );
  },
  zc = (...e) => {
    const t = qc().createApp(...e),
      { mount: n } = t;
    return (
      (t.mount = (r) => {
        const s = qo(r);
        if (s) return n(s, !0, s instanceof SVGElement);
      }),
      t
    );
  };
function qo(e) {
  return ie(e) ? document.querySelector(e) : e;
}
const Qc =
    /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/,
  Xc =
    /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/,
  Yc = /^\s*["[{]|^\s*-?\d[\d.]{0,14}\s*$/;
function Vc(e, t) {
  if (
    e !== "__proto__" &&
    !(e === "constructor" && t && typeof t == "object" && "prototype" in t)
  )
    return t;
}
function Jo(e, t = {}) {
  if (typeof e != "string") return e;
  const n = e.toLowerCase().trim();
  if (n === "true") return !0;
  if (n === "false") return !1;
  if (n === "null") return null;
  if (n === "nan") return Number.NaN;
  if (n === "infinity") return Number.POSITIVE_INFINITY;
  if (n !== "undefined") {
    if (!Yc.test(e)) {
      if (t.strict) throw new SyntaxError("Invalid JSON");
      return e;
    }
    try {
      return Qc.test(e) || Xc.test(e) ? JSON.parse(e, Vc) : JSON.parse(e);
    } catch (r) {
      if (t.strict) throw r;
      return e;
    }
  }
}
const Zc = /#/g,
  Gc = /&/g,
  ea = /=/g,
  zo = /\+/g,
  ta = /%5e/gi,
  na = /%60/gi,
  ra = /%7c/gi,
  sa = /%20/gi;
function oa(e) {
  return encodeURI("" + e).replace(ra, "|");
}
function or(e) {
  return oa(typeof e == "string" ? e : JSON.stringify(e))
    .replace(zo, "%2B")
    .replace(sa, "+")
    .replace(Zc, "%23")
    .replace(Gc, "%26")
    .replace(na, "`")
    .replace(ta, "^");
}
function Kn(e) {
  return or(e).replace(ea, "%3D");
}
function yn(e = "") {
  try {
    return decodeURIComponent("" + e);
  } catch {
    return "" + e;
  }
}
function ia(e) {
  return yn(e.replace(zo, " "));
}
function Qo(e = "") {
  const t = {};
  e[0] === "?" && (e = e.slice(1));
  for (const n of e.split("&")) {
    const r = n.match(/([^=]+)=?(.*)/) || [];
    if (r.length < 2) continue;
    const s = yn(r[1]);
    if (s === "__proto__" || s === "constructor") continue;
    const o = ia(r[2] || "");
    typeof t[s] < "u"
      ? Array.isArray(t[s])
        ? t[s].push(o)
        : (t[s] = [t[s], o])
      : (t[s] = o);
  }
  return t;
}
function la(e, t) {
  return (
    (typeof t == "number" || typeof t == "boolean") && (t = String(t)),
    t
      ? Array.isArray(t)
        ? t.map((n) => `${Kn(e)}=${or(n)}`).join("&")
        : `${Kn(e)}=${or(t)}`
      : Kn(e)
  );
}
function Xo(e) {
  return Object.keys(e)
    .filter((t) => e[t] !== void 0)
    .map((t) => la(t, e[t]))
    .join("&");
}
const ca = /^\w{2,}:([/\\]{1,2})/,
  aa = /^\w{2,}:([/\\]{2})?/,
  fa = /^([/\\]\s*){2,}[^/\\]/;
function Fr(e, t = {}) {
  return (
    typeof t == "boolean" && (t = { acceptRelative: t }),
    t.strict ? ca.test(e) : aa.test(e) || (t.acceptRelative ? fa.test(e) : !1)
  );
}
const ua = /\/$|\/\?/;
function ir(e = "", t = !1) {
  return t ? ua.test(e) : e.endsWith("/");
}
function Yo(e = "", t = !1) {
  if (!t) return (ir(e) ? e.slice(0, -1) : e) || "/";
  if (!ir(e, !0)) return e || "/";
  const [n, ...r] = e.split("?");
  return (n.slice(0, -1) || "/") + (r.length > 0 ? `?${r.join("?")}` : "");
}
function lr(e = "", t = !1) {
  if (!t) return e.endsWith("/") ? e : e + "/";
  if (ir(e, !0)) return e || "/";
  const [n, ...r] = e.split("?");
  return n + "/" + (r.length > 0 ? `?${r.join("?")}` : "");
}
function Vo(e = "") {
  return e.startsWith("/");
}
function da(e = "") {
  return (Vo(e) ? e.slice(1) : e) || "/";
}
function bs(e = "") {
  return Vo(e) ? e : "/" + e;
}
function ha(e, t) {
  if (Zo(t) || Fr(e)) return e;
  const n = Yo(t);
  return e.startsWith(n) ? e : Wt(n, e);
}
function pa(e, t) {
  if (Zo(t)) return e;
  const n = Yo(t);
  if (!e.startsWith(n)) return e;
  const r = e.slice(n.length);
  return r[0] === "/" ? r : "/" + r;
}
function ga(e, t) {
  const n = Mn(e),
    r = { ...Qo(n.search), ...t };
  return (n.search = Xo(r)), Go(n);
}
function Zo(e) {
  return !e || e === "/";
}
function ma(e) {
  return e && e !== "/";
}
function Wt(e, ...t) {
  let n = e || "";
  for (const r of t.filter((s) => ma(s))) n = n ? lr(n) + da(r) : r;
  return n;
}
function ya(e, t, n = {}) {
  return (
    n.trailingSlash || ((e = lr(e)), (t = lr(t))),
    n.leadingSlash || ((e = bs(e)), (t = bs(t))),
    n.encoding || ((e = yn(e)), (t = yn(t))),
    e === t
  );
}
function Mn(e = "", t) {
  if (!Fr(e, { acceptRelative: !0 })) return t ? Mn(t + e) : ws(e);
  const [n = "", r, s = ""] = (
      e.replace(/\\/g, "/").match(/([^/:]+:)?\/\/([^/@]+@)?(.*)/) || []
    ).splice(1),
    [o = "", i = ""] = (s.match(/([^#/?]*)(.*)?/) || []).splice(1),
    { pathname: l, search: c, hash: a } = ws(i.replace(/\/(?=[A-Za-z]:)/, ""));
  return {
    protocol: n,
    auth: r ? r.slice(0, Math.max(0, r.length - 1)) : "",
    host: o,
    pathname: l,
    search: c,
    hash: a,
  };
}
function ws(e = "") {
  const [t = "", n = "", r = ""] = (
    e.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []
  ).splice(1);
  return { pathname: t, search: n, hash: r };
}
function Go(e) {
  const t =
    e.pathname +
    (e.search ? (e.search.startsWith("?") ? "" : "?") + e.search : "") +
    e.hash;
  return e.protocol
    ? e.protocol + "//" + (e.auth ? e.auth + "@" : "") + e.host + t
    : t;
}
class _a extends Error {
  constructor() {
    super(...arguments), (this.name = "FetchError");
  }
}
function ba(e, t, n) {
  let r = "";
  t && (r = t.message),
    e && n
      ? (r = `${r} (${n.status} ${n.statusText} (${e.toString()}))`)
      : e && (r = `${r} (${e.toString()})`);
  const s = new _a(r);
  return (
    Object.defineProperty(s, "request", {
      get() {
        return e;
      },
    }),
    Object.defineProperty(s, "response", {
      get() {
        return n;
      },
    }),
    Object.defineProperty(s, "data", {
      get() {
        return n && n._data;
      },
    }),
    Object.defineProperty(s, "status", {
      get() {
        return n && n.status;
      },
    }),
    Object.defineProperty(s, "statusText", {
      get() {
        return n && n.statusText;
      },
    }),
    Object.defineProperty(s, "statusCode", {
      get() {
        return n && n.status;
      },
    }),
    Object.defineProperty(s, "statusMessage", {
      get() {
        return n && n.statusText;
      },
    }),
    s
  );
}
const wa = new Set(Object.freeze(["PATCH", "POST", "PUT", "DELETE"]));
function vs(e = "GET") {
  return wa.has(e.toUpperCase());
}
function va(e) {
  if (e === void 0) return !1;
  const t = typeof e;
  return t === "string" || t === "number" || t === "boolean" || t === null
    ? !0
    : t !== "object"
    ? !1
    : Array.isArray(e)
    ? !0
    : (e.constructor && e.constructor.name === "Object") ||
      typeof e.toJSON == "function";
}
const Ea = new Set([
    "image/svg",
    "application/xml",
    "application/xhtml",
    "application/html",
  ]),
  xa = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function Ta(e = "") {
  if (!e) return "json";
  const t = e.split(";").shift() || "";
  return xa.test(t)
    ? "json"
    : Ea.has(t) || t.startsWith("text/")
    ? "text"
    : "blob";
}
const Ca = new Set([408, 409, 425, 429, 500, 502, 503, 504]);
function ei(e) {
  const { fetch: t, Headers: n } = e;
  function r(i) {
    const l = (i.error && i.error.name === "AbortError") || !1;
    if (i.options.retry !== !1 && !l) {
      let a;
      typeof i.options.retry == "number"
        ? (a = i.options.retry)
        : (a = vs(i.options.method) ? 0 : 1);
      const u = (i.response && i.response.status) || 500;
      if (a > 0 && Ca.has(u))
        return s(i.request, { ...i.options, retry: a - 1 });
    }
    const c = ba(i.request, i.error, i.response);
    throw (Error.captureStackTrace && Error.captureStackTrace(c, s), c);
  }
  const s = async function (l, c = {}) {
      const a = {
        request: l,
        options: { ...e.defaults, ...c },
        response: void 0,
        error: void 0,
      };
      a.options.onRequest && (await a.options.onRequest(a)),
        typeof a.request == "string" &&
          (a.options.baseURL && (a.request = ha(a.request, a.options.baseURL)),
          (a.options.query || a.options.params) &&
            (a.request = ga(a.request, {
              ...a.options.params,
              ...a.options.query,
            })),
          a.options.body &&
            vs(a.options.method) &&
            va(a.options.body) &&
            ((a.options.body =
              typeof a.options.body == "string"
                ? a.options.body
                : JSON.stringify(a.options.body)),
            (a.options.headers = new n(a.options.headers)),
            a.options.headers.has("content-type") ||
              a.options.headers.set("content-type", "application/json"),
            a.options.headers.has("accept") ||
              a.options.headers.set("accept", "application/json"))),
        (a.response = await t(a.request, a.options).catch(
          async (h) => (
            (a.error = h),
            a.options.onRequestError && (await a.options.onRequestError(a)),
            r(a)
          )
        ));
      const u =
        (a.options.parseResponse ? "json" : a.options.responseType) ||
        Ta(a.response.headers.get("content-type") || "");
      if (u === "json") {
        const h = await a.response.text(),
          y = a.options.parseResponse || Jo;
        a.response._data = y(h);
      } else
        u === "stream"
          ? (a.response._data = a.response.body)
          : (a.response._data = await a.response[u]());
      return (
        a.options.onResponse && (await a.options.onResponse(a)),
        a.response.status >= 400 && a.response.status < 600
          ? (a.options.onResponseError && (await a.options.onResponseError(a)),
            r(a))
          : a.response
      );
    },
    o = function (l, c) {
      return s(l, c).then((a) => a._data);
    };
  return (
    (o.raw = s),
    (o.native = t),
    (o.create = (i = {}) => ei({ ...e, defaults: { ...e.defaults, ...i } })),
    o
  );
}
const ti = (function () {
    if (typeof globalThis < "u") return globalThis;
    if (typeof self < "u") return self;
    if (typeof window < "u") return window;
    if (typeof global < "u") return global;
    throw new Error("unable to locate global object");
  })(),
  Ra =
    ti.fetch ||
    (() =>
      Promise.reject(new Error("[ofetch] global.fetch is not supported!"))),
  Pa = ti.Headers,
  ka = ei({ fetch: Ra, Headers: Pa }),
  Sa = ka,
  Oa = () => {
    var e;
    return (
      ((e = window == null ? void 0 : window.__NUXT__) == null
        ? void 0
        : e.config) || {}
    );
  },
  _n = Oa().app,
  Ha = () => _n.baseURL,
  Aa = () => _n.buildAssetsDir,
  Ia = (...e) => Wt(ni(), Aa(), ...e),
  ni = (...e) => {
    const t = _n.cdnURL || _n.baseURL;
    return e.length ? Wt(t, ...e) : t;
  };
(globalThis.__buildAssetsURL = Ia), (globalThis.__publicAssetsURL = ni);
function cr(e, t = {}, n) {
  for (const r in e) {
    const s = e[r],
      o = n ? `${n}:${r}` : r;
    typeof s == "object" && s !== null
      ? cr(s, t, o)
      : typeof s == "function" && (t[o] = s);
  }
  return t;
}
const Ma = { run: (e) => e() },
  $a = () => Ma,
  ri = typeof console.createTask < "u" ? console.createTask : $a;
function ja(e, t) {
  const n = t.shift(),
    r = ri(n);
  return e.reduce(
    (s, o) => s.then(() => r.run(() => o(...t))),
    Promise.resolve()
  );
}
function Fa(e, t) {
  const n = t.shift(),
    r = ri(n);
  return Promise.all(e.map((s) => r.run(() => s(...t))));
}
function qn(e, t) {
  for (const n of [...e]) n(t);
}
class La {
  constructor() {
    (this._hooks = {}),
      (this._before = void 0),
      (this._after = void 0),
      (this._deprecatedMessages = void 0),
      (this._deprecatedHooks = {}),
      (this.hook = this.hook.bind(this)),
      (this.callHook = this.callHook.bind(this)),
      (this.callHookWith = this.callHookWith.bind(this));
  }
  hook(t, n, r = {}) {
    if (!t || typeof n != "function") return () => {};
    const s = t;
    let o;
    for (; this._deprecatedHooks[t]; )
      (o = this._deprecatedHooks[t]), (t = o.to);
    if (o && !r.allowDeprecated) {
      let i = o.message;
      i ||
        (i =
          `${s} hook has been deprecated` +
          (o.to ? `, please use ${o.to}` : "")),
        this._deprecatedMessages || (this._deprecatedMessages = new Set()),
        this._deprecatedMessages.has(i) ||
          (console.warn(i), this._deprecatedMessages.add(i));
    }
    if (!n.name)
      try {
        Object.defineProperty(n, "name", {
          get: () => "_" + t.replace(/\W+/g, "_") + "_hook_cb",
          configurable: !0,
        });
      } catch {}
    return (
      (this._hooks[t] = this._hooks[t] || []),
      this._hooks[t].push(n),
      () => {
        n && (this.removeHook(t, n), (n = void 0));
      }
    );
  }
  hookOnce(t, n) {
    let r,
      s = (...o) => (
        typeof r == "function" && r(), (r = void 0), (s = void 0), n(...o)
      );
    return (r = this.hook(t, s)), r;
  }
  removeHook(t, n) {
    if (this._hooks[t]) {
      const r = this._hooks[t].indexOf(n);
      r !== -1 && this._hooks[t].splice(r, 1),
        this._hooks[t].length === 0 && delete this._hooks[t];
    }
  }
  deprecateHook(t, n) {
    this._deprecatedHooks[t] = typeof n == "string" ? { to: n } : n;
    const r = this._hooks[t] || [];
    delete this._hooks[t];
    for (const s of r) this.hook(t, s);
  }
  deprecateHooks(t) {
    Object.assign(this._deprecatedHooks, t);
    for (const n in t) this.deprecateHook(n, t[n]);
  }
  addHooks(t) {
    const n = cr(t),
      r = Object.keys(n).map((s) => this.hook(s, n[s]));
    return () => {
      for (const s of r.splice(0, r.length)) s();
    };
  }
  removeHooks(t) {
    const n = cr(t);
    for (const r in n) this.removeHook(r, n[r]);
  }
  removeAllHooks() {
    for (const t in this._hooks) delete this._hooks[t];
  }
  callHook(t, ...n) {
    return n.unshift(t), this.callHookWith(ja, t, ...n);
  }
  callHookParallel(t, ...n) {
    return n.unshift(t), this.callHookWith(Fa, t, ...n);
  }
  callHookWith(t, n, ...r) {
    const s =
      this._before || this._after ? { name: n, args: r, context: {} } : void 0;
    this._before && qn(this._before, s);
    const o = t(n in this._hooks ? [...this._hooks[n]] : [], r);
    return o instanceof Promise
      ? o.finally(() => {
          this._after && s && qn(this._after, s);
        })
      : (this._after && s && qn(this._after, s), o);
  }
  beforeEach(t) {
    return (
      (this._before = this._before || []),
      this._before.push(t),
      () => {
        if (this._before !== void 0) {
          const n = this._before.indexOf(t);
          n !== -1 && this._before.splice(n, 1);
        }
      }
    );
  }
  afterEach(t) {
    return (
      (this._after = this._after || []),
      this._after.push(t),
      () => {
        if (this._after !== void 0) {
          const n = this._after.indexOf(t);
          n !== -1 && this._after.splice(n, 1);
        }
      }
    );
  }
}
function si() {
  return new La();
}
function Na() {
  let e,
    t = !1;
  const n = (r) => {
    if (e && e !== r) throw new Error("Context conflict");
  };
  return {
    use: () => {
      if (e === void 0) throw new Error("Context is not available");
      return e;
    },
    tryUse: () => e,
    set: (r, s) => {
      s || n(r), (e = r), (t = !0);
    },
    unset: () => {
      (e = void 0), (t = !1);
    },
    call: (r, s) => {
      n(r), (e = r);
      try {
        return s();
      } finally {
        t || (e = void 0);
      }
    },
    async callAsync(r, s) {
      e = r;
      const o = () => {
          e = r;
        },
        i = () => (e === r ? o : void 0);
      Ts.add(i);
      try {
        const l = s();
        return t || (e = void 0), await l;
      } finally {
        Ts.delete(i);
      }
    },
  };
}
function Ua() {
  const e = {};
  return {
    get(t) {
      return e[t] || (e[t] = Na()), e[t], e[t];
    },
  };
}
const bn =
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
      ? self
      : typeof global < "u"
      ? global
      : typeof window < "u"
      ? window
      : {},
  Es = "__unctx__",
  Ba = bn[Es] || (bn[Es] = Ua()),
  Da = (e) => Ba.get(e),
  xs = "__unctx_async_handlers__",
  Ts = bn[xs] || (bn[xs] = new Set()),
  oi = Da("nuxt-app"),
  Wa = "__nuxt_plugin";
function Ka(e) {
  let t = 0;
  const n = {
    provide: void 0,
    globalName: "nuxt",
    versions: {
      get nuxt() {
        return "3.3.3";
      },
      get vue() {
        return n.vueApp.version;
      },
    },
    payload: Je({ data: {}, state: {}, _errors: {}, ...window.__NUXT__ }),
    static: { data: {} },
    isHydrating: !0,
    deferHydration() {
      if (!n.isHydrating) return () => {};
      t++;
      let o = !1;
      return () => {
        if (!o && ((o = !0), t--, t === 0))
          return (n.isHydrating = !1), n.callHook("app:suspense:resolve");
      };
    },
    _asyncDataPromises: {},
    _asyncData: {},
    ...e,
  };
  (n.hooks = si()),
    (n.hook = n.hooks.hook),
    (n.callHook = n.hooks.callHook),
    (n.provide = (o, i) => {
      const l = "$" + o;
      nn(n, l, i), nn(n.vueApp.config.globalProperties, l, i);
    }),
    nn(n.vueApp, "$nuxt", n),
    nn(n.vueApp.config.globalProperties, "$nuxt", n);
  {
    window.addEventListener("nuxt.preloadError", (i) => {
      n.callHook("app:chunkError", { error: i.payload });
    });
    const o = n.hook("app:error", (...i) => {
      console.error("[nuxt] error caught during app initialization", ...i);
    });
    n.hook("app:mounted", o);
  }
  const r = Je(n.payload.config),
    s = new Proxy(r, {
      get(o, i) {
        return i === "public" ? o.public : o[i] ?? o.public[i];
      },
      set(o, i, l) {
        return i === "public" || i === "app"
          ? !1
          : ((o[i] = l), (o.public[i] = l), !0);
      },
    });
  return n.provide("config", s), n;
}
async function qa(e, t) {
  if (typeof t != "function") return;
  const { provide: n } = (await ut(e, t, [e])) || {};
  if (n && typeof n == "object") for (const r in n) e.provide(r, n[r]);
}
async function Ja(e, t) {
  for (const n of t) await qa(e, n);
}
function za(e) {
  return e
    .map((n) =>
      typeof n != "function" ? null : n.length > 1 ? (r) => n(r, r.provide) : n
    )
    .filter(Boolean);
}
function ot(e) {
  return (e[Wa] = !0), e;
}
function ut(e, t, n) {
  const r = () => (n ? t(...n) : t());
  return oi.set(e), r();
}
function ae() {
  const e = oi.tryUse();
  if (!e) {
    const t = Dt();
    if (!t) throw new Error("nuxt instance unavailable");
    return t.appContext.app.$nuxt;
  }
  return e;
}
function wn() {
  return ae().$config;
}
function nn(e, t, n) {
  Object.defineProperty(e, t, { get: () => n });
}
const Qa = !1;
/*!
 * pinia v2.0.34
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */ let ii;
const Kt = (e) => (ii = e),
  li = Symbol();
function ar(e) {
  return (
    e &&
    typeof e == "object" &&
    Object.prototype.toString.call(e) === "[object Object]" &&
    typeof e.toJSON != "function"
  );
}
var $t;
(function (e) {
  (e.direct = "direct"),
    (e.patchObject = "patch object"),
    (e.patchFunction = "patch function");
})($t || ($t = {}));
function Xa() {
  const e = Js(!0),
    t = e.run(() => We({}));
  let n = [],
    r = [];
  const s = yt({
    install(o) {
      Kt(s),
        (s._a = o),
        o.provide(li, s),
        (o.config.globalProperties.$pinia = s),
        r.forEach((i) => n.push(i)),
        (r = []);
    },
    use(o) {
      return !this._a && !Qa ? r.push(o) : n.push(o), this;
    },
    _p: n,
    _a: null,
    _e: e,
    _s: new Map(),
    state: t,
  });
  return s;
}
const ci = () => {};
function Cs(e, t, n, r = ci) {
  e.push(t);
  const s = () => {
    const o = e.indexOf(t);
    o > -1 && (e.splice(o, 1), r());
  };
  return !n && zs() && $i(s), s;
}
function ct(e, ...t) {
  e.slice().forEach((n) => {
    n(...t);
  });
}
function fr(e, t) {
  e instanceof Map && t instanceof Map && t.forEach((n, r) => e.set(r, n)),
    e instanceof Set && t instanceof Set && t.forEach(e.add, e);
  for (const n in t) {
    if (!t.hasOwnProperty(n)) continue;
    const r = t[n],
      s = e[n];
    ar(s) && ar(r) && e.hasOwnProperty(n) && !se(r) && !De(r)
      ? (e[n] = fr(s, r))
      : (e[n] = r);
  }
  return e;
}
const Ya = Symbol();
function Va(e) {
  return !ar(e) || !e.hasOwnProperty(Ya);
}
const { assign: Le } = Object;
function Za(e) {
  return !!(se(e) && e.effect);
}
function Ga(e, t, n, r) {
  const { state: s, actions: o, getters: i } = t,
    l = n.state.value[e];
  let c;
  function a() {
    l || (n.state.value[e] = s ? s() : {});
    const u = hl(n.state.value[e]);
    return Le(
      u,
      o,
      Object.keys(i || {}).reduce(
        (h, y) => (
          (h[y] = yt(
            Do(() => {
              Kt(n);
              const x = n._s.get(e);
              return i[y].call(x, x);
            })
          )),
          h
        ),
        {}
      )
    );
  }
  return (c = ai(e, a, t, n, r, !0)), c;
}
function ai(e, t, n = {}, r, s, o) {
  let i;
  const l = Le({ actions: {} }, n),
    c = { deep: !0 };
  let a,
    u,
    h = yt([]),
    y = yt([]),
    x;
  const g = r.state.value[e];
  !o && !g && (r.state.value[e] = {}), We({});
  let T;
  function N(O) {
    let C;
    (a = u = !1),
      typeof O == "function"
        ? (O(r.state.value[e]),
          (C = { type: $t.patchFunction, storeId: e, events: x }))
        : (fr(r.state.value[e], O),
          (C = { type: $t.patchObject, payload: O, storeId: e, events: x }));
    const L = (T = Symbol());
    kn().then(() => {
      T === L && (a = !0);
    }),
      (u = !0),
      ct(h, C, r.state.value[e]);
  }
  const _ = o
    ? function () {
        const { state: C } = n,
          L = C ? C() : {};
        this.$patch((W) => {
          Le(W, L);
        });
      }
    : ci;
  function p() {
    i.stop(), (h = []), (y = []), r._s.delete(e);
  }
  function v(O, C) {
    return function () {
      Kt(r);
      const L = Array.from(arguments),
        W = [],
        K = [];
      function fe(ee) {
        W.push(ee);
      }
      function G(ee) {
        K.push(ee);
      }
      ct(y, { args: L, name: O, store: A, after: fe, onError: G });
      let I;
      try {
        I = C.apply(this && this.$id === e ? this : A, L);
      } catch (ee) {
        throw (ct(K, ee), ee);
      }
      return I instanceof Promise
        ? I.then((ee) => (ct(W, ee), ee)).catch(
            (ee) => (ct(K, ee), Promise.reject(ee))
          )
        : (ct(W, I), I);
    };
  }
  const j = {
      _p: r,
      $id: e,
      $onAction: Cs.bind(null, y),
      $patch: N,
      $reset: _,
      $subscribe(O, C = {}) {
        const L = Cs(h, O, C.detached, () => W()),
          W = i.run(() =>
            mt(
              () => r.state.value[e],
              (K) => {
                (C.flush === "sync" ? u : a) &&
                  O({ storeId: e, type: $t.direct, events: x }, K);
              },
              Le({}, c, C)
            )
          );
        return L;
      },
      $dispose: p,
    },
    A = Je(j);
  r._s.set(e, A);
  const F = r._e.run(() => ((i = Js()), i.run(() => t())));
  for (const O in F) {
    const C = F[O];
    if ((se(C) && !Za(C)) || De(C))
      o ||
        (g && Va(C) && (se(C) ? (C.value = g[O]) : fr(C, g[O])),
        (r.state.value[e][O] = C));
    else if (typeof C == "function") {
      const L = v(O, C);
      (F[O] = L), (l.actions[O] = C);
    }
  }
  return (
    Le(A, F),
    Le(z(A), F),
    Object.defineProperty(A, "$state", {
      get: () => r.state.value[e],
      set: (O) => {
        N((C) => {
          Le(C, O);
        });
      },
    }),
    r._p.forEach((O) => {
      Le(
        A,
        i.run(() => O({ store: A, app: r._a, pinia: r, options: l }))
      );
    }),
    g && o && n.hydrate && n.hydrate(A.$state, g),
    (a = !0),
    (u = !0),
    A
  );
}
function ef(e, t, n) {
  let r, s;
  const o = typeof t == "function";
  typeof e == "string" ? ((r = e), (s = o ? n : t)) : ((s = e), (r = e.id));
  function i(l, c) {
    const a = Dt();
    return (
      (l = l || (a && tt(li, null))),
      l && Kt(l),
      (l = ii),
      l._s.has(r) || (o ? ai(r, t, s, l) : Ga(r, s, l)),
      l._s.get(r)
    );
  }
  return (i.$id = r), i;
}
function tf(e) {
  return Array.isArray(e) ? e : [e];
}
const fi = ["title", "script", "style", "noscript"],
  nf = ["base", "meta", "link", "style", "script", "noscript"],
  rf = [
    "title",
    "titleTemplate",
    "templateParams",
    "base",
    "htmlAttrs",
    "bodyAttrs",
    "meta",
    "link",
    "style",
    "script",
    "noscript",
  ],
  sf = [
    "base",
    "title",
    "titleTemplate",
    "bodyAttrs",
    "htmlAttrs",
    "templateParams",
  ],
  of = [
    "tagPosition",
    "tagPriority",
    "tagDuplicateStrategy",
    "innerHTML",
    "textContent",
  ];
function ui(e) {
  let t = 9;
  for (let n = 0; n < e.length; ) t = Math.imul(t ^ e.charCodeAt(n++), 9 ** 9);
  return ((t ^ (t >>> 9)) + 65536).toString(16).substring(1, 8).toLowerCase();
}
function ur(e) {
  return ui(
    `${e.tag}:${e.textContent || e.innerHTML || ""}:${Object.entries(e.props)
      .map(([t, n]) => `${t}:${String(n)}`)
      .join(",")}`
  );
}
function lf(e) {
  let t = 9;
  for (const n of e)
    for (let r = 0; r < n.length; )
      t = Math.imul(t ^ n.charCodeAt(r++), 9 ** 9);
  return ((t ^ (t >>> 9)) + 65536).toString(16).substring(1, 8).toLowerCase();
}
function di(e, t) {
  const { props: n, tag: r } = e;
  if (sf.includes(r)) return r;
  if (r === "link" && n.rel === "canonical") return "canonical";
  if (n.charset) return "charset";
  const s = ["id"];
  r === "meta" && s.push("name", "property", "http-equiv");
  for (const o of s)
    if (typeof n[o] < "u") {
      const i = String(n[o]);
      return t && !t(i) ? !1 : `${r}:${o}:${i}`;
    }
  return !1;
}
const Rs = (e, t) =>
    e == null ? t || null : typeof e == "function" ? e(t) : e,
  rn = (e, t = !1, n) => {
    const { tag: r, $el: s } = e;
    s &&
      (Object.entries(r.props).forEach(([o, i]) => {
        i = String(i);
        const l = `attr:${o}`;
        if (o === "class") {
          if (!i) return;
          for (const c of i.split(" ")) {
            const a = `${l}:${c}`;
            n && n(e, a, () => s.classList.remove(c)),
              s.classList.contains(c) || s.classList.add(c);
          }
          return;
        }
        n && !o.startsWith("data-h-") && n(e, l, () => s.removeAttribute(o)),
          (t || s.getAttribute(o) !== i) && s.setAttribute(o, i);
      }),
      fi.includes(r.tag) &&
        (r.textContent && r.textContent !== s.textContent
          ? (s.textContent = r.textContent)
          : r.innerHTML &&
            r.innerHTML !== s.innerHTML &&
            (s.innerHTML = r.innerHTML)));
  };
let kt = !1;
async function cf(e, t = {}) {
  var y, x;
  const n = { shouldRender: !0 };
  if ((await e.hooks.callHook("dom:beforeRender", n), !n.shouldRender)) return;
  const r = t.document || e.resolvedOptions.document || window.document,
    s = (await e.resolveTags()).map(l);
  if (
    e.resolvedOptions.experimentalHashHydration &&
    ((kt = kt || e._hash || !1), kt)
  ) {
    const g = lf(s.map((T) => T.tag._h));
    if (kt === g) return;
    kt = g;
  }
  const o = e._popSideEffectQueue();
  e.headEntries()
    .map((g) => g._sde)
    .forEach((g) => {
      Object.entries(g).forEach(([T, N]) => {
        o[T] = N;
      });
    });
  const i = (g, T, N) => {
    (T = `${g.renderId}:${T}`), g.entry && (g.entry._sde[T] = N), delete o[T];
  };
  function l(g) {
    const T = e.headEntries().find((_) => _._i === g._e),
      N = {
        renderId: !g.key && g._d ? g._d : ur(g),
        $el: null,
        shouldRender: !0,
        tag: g,
        entry: T,
        markSideEffect: (_, p) => i(N, _, p),
      };
    return N;
  }
  const c = [],
    a = { body: [], head: [] },
    u = (g) => {
      (e._elMap[g.renderId] = g.$el),
        c.push(g),
        i(g, "el", () => {
          var T;
          (T = g.$el) == null || T.remove(), delete e._elMap[g.renderId];
        });
    };
  for (const g of s) {
    if ((await e.hooks.callHook("dom:beforeRenderTag", g), !g.shouldRender))
      continue;
    const { tag: T } = g;
    if (T.tag === "title") {
      (r.title = T.textContent || ""), c.push(g);
      continue;
    }
    if (T.tag === "htmlAttrs" || T.tag === "bodyAttrs") {
      (g.$el = r[T.tag === "htmlAttrs" ? "documentElement" : "body"]),
        rn(g, !1, i),
        c.push(g);
      continue;
    }
    if (
      ((g.$el = e._elMap[g.renderId]),
      !g.$el &&
        T.key &&
        (g.$el = r.querySelector(
          `${
            (y = T.tagPosition) != null && y.startsWith("body")
              ? "body"
              : "head"
          } > ${T.tag}[data-h-${T._h}]`
        )),
      g.$el)
    ) {
      g.tag._d && rn(g), u(g);
      continue;
    }
    a[
      (x = T.tagPosition) != null && x.startsWith("body") ? "body" : "head"
    ].push(g);
  }
  const h = { bodyClose: void 0, bodyOpen: void 0, head: void 0 };
  Object.entries(a).forEach(([g, T]) => {
    var _;
    if (!T.length) return;
    const N = (_ = r == null ? void 0 : r[g]) == null ? void 0 : _.children;
    if (N) {
      for (const p of [...N].reverse()) {
        const v = p.tagName.toLowerCase();
        if (!nf.includes(v)) continue;
        const j = p
            .getAttributeNames()
            .reduce((C, L) => ({ ...C, [L]: p.getAttribute(L) }), {}),
          A = { tag: v, props: j };
        p.innerHTML && (A.innerHTML = p.innerHTML);
        const F = ur(A);
        let O = T.findIndex((C) => (C == null ? void 0 : C.renderId) === F);
        if (O === -1) {
          const C = di(A);
          O = T.findIndex(
            (L) => (L == null ? void 0 : L.tag._d) && L.tag._d === C
          );
        }
        if (O !== -1) {
          const C = T[O];
          (C.$el = p), rn(C), u(C), delete T[O];
        }
      }
      T.forEach((p) => {
        const v = p.tag.tagPosition || "head";
        (h[v] = h[v] || r.createDocumentFragment()),
          p.$el || ((p.$el = r.createElement(p.tag.tag)), rn(p, !0)),
          h[v].appendChild(p.$el),
          u(p);
      });
    }
  }),
    h.head && r.head.appendChild(h.head),
    h.bodyOpen && r.body.insertBefore(h.bodyOpen, r.body.firstChild),
    h.bodyClose && r.body.appendChild(h.bodyClose);
  for (const g of c) await e.hooks.callHook("dom:renderTag", g);
  Object.values(o).forEach((g) => g());
}
let Jn = null;
async function af(e, t = {}) {
  function n() {
    return (Jn = null), cf(e, t);
  }
  const r = t.delayFn || ((s) => setTimeout(s, 10));
  return (Jn = Jn || new Promise((s) => r(() => s(n()))));
}
const ff = (e) => ({
  hooks: {
    "entries:updated": function (t) {
      if (typeof (e == null ? void 0 : e.document) > "u" && typeof window > "u")
        return;
      let n = e == null ? void 0 : e.delayFn;
      !n && typeof requestAnimationFrame < "u" && (n = requestAnimationFrame),
        af(t, {
          document: (e == null ? void 0 : e.document) || window.document,
          delayFn: n,
        });
    },
  },
});
function uf(e) {
  var t;
  return (
    ((t =
      e == null ? void 0 : e.head.querySelector('meta[name="unhead:ssr"]')) ==
    null
      ? void 0
      : t.getAttribute("content")) || !1
  );
}
const Ps = { critical: 2, high: 9, low: 12, base: -1, title: 1, meta: 10 };
function ks(e) {
  if (typeof e.tagPriority == "number") return e.tagPriority;
  if (e.tag === "meta") {
    if (e.props.charset) return -2;
    if (e.props["http-equiv"] === "content-security-policy") return 0;
  }
  const t = e.tagPriority || e.tag;
  return t in Ps ? Ps[t] : 10;
}
const df = [
  { prefix: "before:", offset: -1 },
  { prefix: "after:", offset: 1 },
];
function hf() {
  return {
    hooks: {
      "tags:resolve": (e) => {
        const t = (n) => {
          var r;
          return (r = e.tags.find((s) => s._d === n)) == null ? void 0 : r._p;
        };
        for (const { prefix: n, offset: r } of df)
          for (const s of e.tags.filter(
            (o) =>
              typeof o.tagPriority == "string" && o.tagPriority.startsWith(n)
          )) {
            const o = t(s.tagPriority.replace(n, ""));
            typeof o < "u" && (s._p = o + r);
          }
        e.tags.sort((n, r) => n._p - r._p).sort((n, r) => ks(n) - ks(r));
      },
    },
  };
}
const pf = () => ({
    hooks: {
      "tags:resolve": (e) => {
        const { tags: t } = e;
        let n = t.findIndex((s) => s.tag === "titleTemplate");
        const r = t.findIndex((s) => s.tag === "title");
        if (r !== -1 && n !== -1) {
          const s = Rs(t[n].textContent, t[r].textContent);
          s !== null ? (t[r].textContent = s || t[r].textContent) : delete t[r];
        } else if (n !== -1) {
          const s = Rs(t[n].textContent);
          s !== null &&
            ((t[n].textContent = s), (t[n].tag = "title"), (n = -1));
        }
        n !== -1 && delete t[n], (e.tags = t.filter(Boolean));
      },
    },
  }),
  gf = () => ({
    hooks: {
      "tag:normalise": function ({ tag: e }) {
        typeof e.props.body < "u" &&
          ((e.tagPosition = "bodyClose"), delete e.props.body);
      },
    },
  }),
  mf = ["link", "style", "script", "noscript"],
  yf = () => ({
    hooks: {
      "tag:normalise": ({ tag: e, resolvedOptions: t }) => {
        t.experimentalHashHydration === !0 && (e._h = ur(e)),
          e.key &&
            mf.includes(e.tag) &&
            ((e._h = ui(e.key)), (e.props[`data-h-${e._h}`] = ""));
      },
    },
  }),
  Ss = ["script", "link", "bodyAttrs"],
  _f = () => {
    const e = (t, n) => {
      const r = {},
        s = {};
      Object.entries(n.props).forEach(([i, l]) => {
        i.startsWith("on") && typeof l == "function" ? (s[i] = l) : (r[i] = l);
      });
      let o;
      return (
        t === "dom" &&
          n.tag === "script" &&
          typeof r.src == "string" &&
          typeof s.onload < "u" &&
          ((o = r.src), delete r.src),
        { props: r, eventHandlers: s, delayedSrc: o }
      );
    };
    return {
      hooks: {
        "ssr:render": function (t) {
          t.tags = t.tags.map(
            (n) => (
              !Ss.includes(n.tag) ||
                !Object.entries(n.props).find(
                  ([r, s]) => r.startsWith("on") && typeof s == "function"
                ) ||
                (n.props = e("ssr", n).props),
              n
            )
          );
        },
        "dom:beforeRenderTag": function (t) {
          if (
            !Ss.includes(t.tag.tag) ||
            !Object.entries(t.tag.props).find(
              ([o, i]) => o.startsWith("on") && typeof i == "function"
            )
          )
            return;
          const { props: n, eventHandlers: r, delayedSrc: s } = e("dom", t.tag);
          Object.keys(r).length &&
            ((t.tag.props = n),
            (t.tag._eventHandlers = r),
            (t.tag._delayedSrc = s));
        },
        "dom:renderTag": function (t) {
          const n = t.$el;
          if (!t.tag._eventHandlers || !n) return;
          const r =
            t.tag.tag === "bodyAttrs" && typeof window < "u" ? window : n;
          Object.entries(t.tag._eventHandlers).forEach(([s, o]) => {
            const i = `${t.tag._d || t.tag._p}:${s}`,
              l = s.slice(2).toLowerCase(),
              c = `data-h-${l}`;
            if ((t.markSideEffect(i, () => {}), n.hasAttribute(c))) return;
            const a = o;
            n.setAttribute(c, ""),
              r.addEventListener(l, a),
              t.entry &&
                (t.entry._sde[i] = () => {
                  r.removeEventListener(l, a), n.removeAttribute(c);
                });
          }),
            t.tag._delayedSrc && n.setAttribute("src", t.tag._delayedSrc);
        },
      },
    };
  },
  bf = ["templateParams", "htmlAttrs", "bodyAttrs"],
  wf = () => ({
    hooks: {
      "tag:normalise": function ({ tag: e }) {
        ["hid", "vmid", "key"].forEach((n) => {
          e.props[n] && ((e.key = e.props[n]), delete e.props[n]);
        });
        const t = e.key ? `${e.tag}:${e.key}` : di(e);
        t && (e._d = t);
      },
      "tags:resolve": function (e) {
        const t = {};
        e.tags.forEach((r) => {
          const s = r._d || r._p,
            o = t[s];
          if (o) {
            let i = r == null ? void 0 : r.tagDuplicateStrategy;
            if ((!i && bf.includes(r.tag) && (i = "merge"), i === "merge")) {
              const c = o.props;
              ["class", "style"].forEach((a) => {
                r.props[a] &&
                  c[a] &&
                  (a === "style" && !c[a].endsWith(";") && (c[a] += ";"),
                  (r.props[a] = `${c[a]} ${r.props[a]}`));
              }),
                (t[s].props = { ...c, ...r.props });
              return;
            } else if (r._e === o._e) {
              (o._duped = o._duped || []),
                (r._d = `${o._d}:${o._duped.length + 1}`),
                o._duped.push(r);
              return;
            }
            const l = Object.keys(r.props).length;
            if (
              (l === 0 || (l === 1 && typeof r.props["data-h-key"] < "u")) &&
              !r.innerHTML &&
              !r.textContent
            ) {
              delete t[s];
              return;
            }
          }
          t[s] = r;
        });
        const n = [];
        Object.values(t).forEach((r) => {
          const s = r._duped;
          delete r._duped, n.push(r), s && n.push(...s);
        }),
          (e.tags = n);
      },
    },
  });
function sn(e, t) {
  function n(o) {
    if (["s", "pageTitle"].includes(o)) return t.pageTitle;
    let i;
    return (
      o.includes(".")
        ? (i = o.split(".").reduce((l, c) => (l && l[c]) || void 0, t))
        : (i = t[o]),
      typeof i < "u" ? i || "" : !1
    );
  }
  let r = e;
  try {
    r = decodeURI(e);
  } catch {}
  return (
    (r.match(/%(\w+\.+\w+)|%(\w+)/g) || [])
      .sort()
      .reverse()
      .forEach((o) => {
        const i = n(o.slice(1));
        typeof i == "string" &&
          (e = e.replaceAll(new RegExp(`\\${o}(\\W|$)`, "g"), `${i}$1`).trim());
      }),
    t.separator &&
      (e.endsWith(t.separator) && (e = e.slice(0, -t.separator.length).trim()),
      e.startsWith(t.separator) && (e = e.slice(t.separator.length).trim()),
      (e = e.replace(
        new RegExp(`\\${t.separator}\\s*\\${t.separator}`, "g"),
        t.separator
      ))),
    e
  );
}
function vf() {
  return {
    hooks: {
      "tags:resolve": (e) => {
        var o;
        const { tags: t } = e,
          n =
            (o = t.find((i) => i.tag === "title")) == null
              ? void 0
              : o.textContent,
          r = t.findIndex((i) => i.tag === "templateParams"),
          s = r !== -1 ? t[r].props : {};
        s.pageTitle = s.pageTitle || n || "";
        for (const i of t)
          if (
            ["titleTemplate", "title"].includes(i.tag) &&
            typeof i.textContent == "string"
          )
            i.textContent = sn(i.textContent, s);
          else if (i.tag === "meta" && typeof i.props.content == "string")
            i.props.content = sn(i.props.content, s);
          else if (i.tag === "link" && typeof i.props.href == "string")
            i.props.href = sn(i.props.href, s);
          else if (
            i.tag === "script" &&
            ["application/json", "application/ld+json"].includes(
              i.props.type
            ) &&
            typeof i.innerHTML == "string"
          )
            try {
              i.innerHTML = JSON.stringify(JSON.parse(i.innerHTML), (l, c) =>
                typeof c == "string" ? sn(c, s) : c
              );
            } catch {}
        e.tags = t.filter((i) => i.tag !== "templateParams");
      },
    },
  };
}
const Ef = typeof window < "u";
let hi;
const xf = (e) => (hi = e),
  Tf = () => hi;
async function Cf(e, t) {
  const n = { tag: e, props: {} };
  return e === "templateParams"
    ? ((n.props = t), n)
    : ["title", "titleTemplate"].includes(e)
    ? ((n.textContent = t instanceof Promise ? await t : t), n)
    : typeof t == "string"
    ? ["script", "noscript", "style"].includes(e)
      ? (e === "script" && (/^(https?:)?\/\//.test(t) || t.startsWith("/"))
          ? (n.props.src = t)
          : (n.innerHTML = t),
        n)
      : !1
    : ((n.props = await Pf(e, { ...t })),
      n.props.children && (n.props.innerHTML = n.props.children),
      delete n.props.children,
      Object.keys(n.props)
        .filter((r) => of.includes(r))
        .forEach((r) => {
          (!["innerHTML", "textContent"].includes(r) || fi.includes(n.tag)) &&
            (n[r] = n.props[r]),
            delete n.props[r];
        }),
      ["innerHTML", "textContent"].forEach((r) => {
        if (
          n.tag === "script" &&
          typeof n[r] == "string" &&
          ["application/ld+json", "application/json"].includes(n.props.type)
        )
          try {
            n[r] = JSON.parse(n[r]);
          } catch {
            n[r] = "";
          }
        typeof n[r] == "object" && (n[r] = JSON.stringify(n[r]));
      }),
      n.props.class && (n.props.class = Rf(n.props.class)),
      n.props.content && Array.isArray(n.props.content)
        ? n.props.content.map((r) => ({
            ...n,
            props: { ...n.props, content: r },
          }))
        : n);
}
function Rf(e) {
  return (
    typeof e == "object" &&
      !Array.isArray(e) &&
      (e = Object.keys(e).filter((t) => e[t])),
    (Array.isArray(e) ? e.join(" ") : e)
      .split(" ")
      .filter((t) => t.trim())
      .filter(Boolean)
      .join(" ")
  );
}
async function Pf(e, t) {
  for (const n of Object.keys(t)) {
    const r = n.startsWith("data-");
    t[n] instanceof Promise && (t[n] = await t[n]),
      String(t[n]) === "true"
        ? (t[n] = r ? "true" : "")
        : String(t[n]) === "false" && (r ? (t[n] = "false") : delete t[n]);
  }
  return t;
}
const kf = 10;
async function Sf(e) {
  const t = [];
  return (
    Object.entries(e.resolvedInput)
      .filter(([n, r]) => typeof r < "u" && rf.includes(n))
      .forEach(([n, r]) => {
        const s = tf(r);
        t.push(...s.map((o) => Cf(n, o)).flat());
      }),
    (await Promise.all(t))
      .flat()
      .filter(Boolean)
      .map((n, r) => ((n._e = e._i), (n._p = (e._i << kf) + r), n))
  );
}
const Of = () => [wf(), hf(), vf(), pf(), yf(), _f(), gf()],
  Hf = (e = {}) => [
    ff({
      document: e == null ? void 0 : e.document,
      delayFn: e == null ? void 0 : e.domDelayFn,
    }),
  ];
function Af(e = {}) {
  const t = If({
    ...e,
    plugins: [...Hf(e), ...((e == null ? void 0 : e.plugins) || [])],
  });
  return (
    e.experimentalHashHydration &&
      t.resolvedOptions.document &&
      (t._hash = uf(t.resolvedOptions.document)),
    xf(t),
    t
  );
}
function If(e = {}) {
  let t = [],
    n = {},
    r = 0;
  const s = si();
  e != null && e.hooks && s.addHooks(e.hooks),
    (e.plugins = [...Of(), ...((e == null ? void 0 : e.plugins) || [])]),
    e.plugins.forEach((l) => l.hooks && s.addHooks(l.hooks)),
    (e.document = e.document || (Ef ? document : void 0));
  const o = () => s.callHook("entries:updated", i),
    i = {
      resolvedOptions: e,
      headEntries() {
        return t;
      },
      get hooks() {
        return s;
      },
      use(l) {
        l.hooks && s.addHooks(l.hooks);
      },
      push(l, c) {
        const a = { _i: r++, input: l, _sde: {} };
        return (
          c != null && c.mode && (a._m = c == null ? void 0 : c.mode),
          c != null && c.transform && (a._t = c == null ? void 0 : c.transform),
          t.push(a),
          o(),
          {
            dispose() {
              t = t.filter((u) =>
                u._i !== a._i
                  ? !0
                  : ((n = { ...n, ...(u._sde || {}) }), (u._sde = {}), o(), !1)
              );
            },
            patch(u) {
              t = t.map(
                (h) => (h._i === a._i && ((a.input = h.input = u), o()), h)
              );
            },
          }
        );
      },
      async resolveTags() {
        const l = { tags: [], entries: [...t] };
        await s.callHook("entries:resolve", l);
        for (const c of l.entries) {
          const a = c._t || ((u) => u);
          if (
            ((c.resolvedInput = a(c.resolvedInput || c.input)), c.resolvedInput)
          )
            for (const u of await Sf(c)) {
              const h = {
                tag: u,
                entry: c,
                resolvedOptions: i.resolvedOptions,
              };
              await s.callHook("tag:normalise", h), l.tags.push(h.tag);
            }
        }
        return await s.callHook("tags:resolve", l), l.tags;
      },
      _popSideEffectQueue() {
        const l = { ...n };
        return (n = {}), l;
      },
      _elMap: {},
    };
  return i.hooks.callHook("init", i), i;
}
function Mf(e) {
  return typeof e == "function" ? e() : pe(e);
}
function vn(e, t = "") {
  if (e instanceof Promise) return e;
  const n = Mf(e);
  return !e || !n
    ? n
    : Array.isArray(n)
    ? n.map((r) => vn(r, t))
    : typeof n == "object"
    ? Object.fromEntries(
        Object.entries(n).map(([r, s]) =>
          r === "titleTemplate" || r.startsWith("on")
            ? [r, pe(s)]
            : [r, vn(s, r)]
        )
      )
    : n;
}
const $f = Wo.startsWith("3"),
  jf = typeof window < "u",
  pi = "usehead";
function Lr() {
  return (Dt() && tt(pi)) || Tf();
}
function Ff(e) {
  return {
    install(n) {
      $f &&
        ((n.config.globalProperties.$unhead = e),
        (n.config.globalProperties.$head = e),
        n.provide(pi, e));
    },
  }.install;
}
function Lf(e = {}) {
  const t = Af({
    ...e,
    domDelayFn: (n) => setTimeout(() => kn(() => n()), 10),
    plugins: [Nf(), ...((e == null ? void 0 : e.plugins) || [])],
  });
  return (t.install = Ff(t)), t;
}
const Nf = () => ({
  hooks: {
    "entries:resolve": function (e) {
      for (const t of e.entries) t.resolvedInput = vn(t.input);
    },
  },
});
function Uf(e, t = {}) {
  const n = Lr(),
    r = We(!1),
    s = We({});
  Il(() => {
    s.value = r.value ? {} : vn(e);
  });
  const o = n.push(s.value, t);
  return (
    mt(s, (l) => {
      o.patch(l);
    }),
    Dt() &&
      (xo(() => {
        o.dispose();
      }),
      vo(() => {
        r.value = !0;
      }),
      wo(() => {
        r.value = !1;
      })),
    o
  );
}
function Bf(e, t = {}) {
  return Lr().push(e, t);
}
function Df(e, t = {}) {
  var r;
  const n = Lr();
  if (n) {
    const s = jf || !!((r = n.resolvedOptions) != null && r.document);
    return (t.mode === "server" && s) || (t.mode === "client" && !s)
      ? void 0
      : s
      ? Uf(e, t)
      : Bf(e, t);
  }
}
const Wf = decodeURIComponent,
  Kf = encodeURIComponent,
  qf = /; */,
  on = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
function Jf(e, t) {
  if (typeof e != "string")
    throw new TypeError("argument str must be a string");
  let n = {},
    r = t || {},
    s = e.split(qf),
    o = r.decode || Wf;
  for (let i = 0; i < s.length; i++) {
    let l = s[i],
      c = l.indexOf("=");
    if (c < 0) continue;
    let a = l.substr(0, c).trim(),
      u = l.substr(++c, l.length).trim();
    u[0] == '"' && (u = u.slice(1, -1)), n[a] == null && (n[a] = zf(u, o));
  }
  return n;
}
function Os(e, t, n) {
  let r = n || {},
    s = r.encode || Kf;
  if (typeof s != "function") throw new TypeError("option encode is invalid");
  if (!on.test(e)) throw new TypeError("argument name is invalid");
  let o = s(t);
  if (o && !on.test(o)) throw new TypeError("argument val is invalid");
  let i = e + "=" + o;
  if (r.maxAge != null) {
    let l = r.maxAge - 0;
    if (isNaN(l) || !isFinite(l))
      throw new TypeError("option maxAge is invalid");
    i += "; Max-Age=" + Math.floor(l);
  }
  if (r.domain) {
    if (!on.test(r.domain)) throw new TypeError("option domain is invalid");
    i += "; Domain=" + r.domain;
  }
  if (r.path) {
    if (!on.test(r.path)) throw new TypeError("option path is invalid");
    i += "; Path=" + r.path;
  }
  if (r.expires) {
    if (typeof r.expires.toUTCString != "function")
      throw new TypeError("option expires is invalid");
    i += "; Expires=" + r.expires.toUTCString();
  }
  if (
    (r.httpOnly && (i += "; HttpOnly"),
    r.secure && (i += "; Secure"),
    r.sameSite)
  )
    switch (
      typeof r.sameSite == "string" ? r.sameSite.toLowerCase() : r.sameSite
    ) {
      case !0:
        i += "; SameSite=Strict";
        break;
      case "lax":
        i += "; SameSite=Lax";
        break;
      case "strict":
        i += "; SameSite=Strict";
        break;
      case "none":
        i += "; SameSite=None";
        break;
      default:
        throw new TypeError("option sameSite is invalid");
    }
  return i;
}
function zf(e, t) {
  try {
    return t(e);
  } catch {
    return e;
  }
}
class dr extends Error {
  constructor() {
    super(...arguments),
      (this.statusCode = 500),
      (this.fatal = !1),
      (this.unhandled = !1),
      (this.statusMessage = void 0);
  }
  toJSON() {
    const t = { message: this.message, statusCode: hr(this.statusCode, 500) };
    return (
      this.statusMessage && (t.statusMessage = gi(this.statusMessage)),
      this.data !== void 0 && (t.data = this.data),
      t
    );
  }
}
dr.__h3_error__ = !0;
function Qf(e) {
  if (typeof e == "string") return new dr(e);
  if (Xf(e)) return e;
  const t = new dr(
    e.message ?? e.statusMessage,
    e.cause ? { cause: e.cause } : void 0
  );
  if ("stack" in e)
    try {
      Object.defineProperty(t, "stack", {
        get() {
          return e.stack;
        },
      });
    } catch {
      try {
        t.stack = e.stack;
      } catch {}
    }
  if (
    (e.data && (t.data = e.data),
    e.statusCode
      ? (t.statusCode = hr(e.statusCode, t.statusCode))
      : e.status && (t.statusCode = hr(e.status, t.statusCode)),
    e.statusMessage
      ? (t.statusMessage = e.statusMessage)
      : e.statusText && (t.statusMessage = e.statusText),
    t.statusMessage)
  ) {
    const n = t.statusMessage;
    gi(t.statusMessage) !== n &&
      console.warn(
        "[h3] Please prefer using `message` for longer error messages instead of `statusMessage`. In the future `statusMessage` will be sanitized by default."
      );
  }
  return (
    e.fatal !== void 0 && (t.fatal = e.fatal),
    e.unhandled !== void 0 && (t.unhandled = e.unhandled),
    t
  );
}
function Xf(e) {
  var t;
  return (
    ((t = e == null ? void 0 : e.constructor) == null
      ? void 0
      : t.__h3_error__) === !0
  );
}
const Yf = /[^\u0009\u0020-\u007E]/g;
function gi(e = "") {
  return e.replace(Yf, "");
}
function hr(e, t = 200) {
  return !e ||
    (typeof e == "string" && (e = Number.parseInt(e, 10)), e < 100 || e > 999)
    ? t
    : e;
}
function Vf(...e) {
  const t = typeof e[e.length - 1] == "string" ? e.pop() : void 0;
  typeof e[0] != "string" && e.unshift(t);
  const [n, r] = e;
  if (!n || typeof n != "string")
    throw new TypeError("[nuxt] [useState] key must be a string: " + n);
  if (r !== void 0 && typeof r != "function")
    throw new Error("[nuxt] [useState] init must be a function: " + r);
  const s = "$s" + n,
    o = ae(),
    i = Pr(o.payload.state, s);
  if (i.value === void 0 && r) {
    const l = r();
    if (se(l)) return (o.payload.state[s] = l), l;
    i.value = l;
  }
  return i;
}
function Zf(e = ae()) {
  var t;
  return (t = e.ssrContext) == null ? void 0 : t.event;
}
const Nr = () => {
    var e;
    return (e = ae()) == null ? void 0 : e.$router;
  },
  Gf = () => (Dt() ? tt("_route", ae()._route) : ae()._route),
  eu = () => {
    try {
      if (ae()._processingMiddleware) return !0;
    } catch {
      return !0;
    }
    return !1;
  },
  tu = (e, t) => {
    e || (e = "/");
    const n = typeof e == "string" ? e : e.path || "/",
      r = (t == null ? void 0 : t.external) || Fr(n, { acceptRelative: !0 });
    if (r && !(t != null && t.external))
      throw new Error(
        "Navigating to external URL is not allowed by default. Use `navigateTo (url, { external: true })`."
      );
    if (r && Mn(n).protocol === "script:")
      throw new Error("Cannot navigate to an URL with script protocol.");
    if (!r && eu()) return e;
    const s = Nr();
    return r
      ? (t != null && t.replace ? location.replace(n) : (location.href = n),
        Promise.resolve())
      : t != null && t.replace
      ? s.replace(e)
      : s.push(e);
  },
  Ur = () => Pr(ae().payload, "error"),
  nu = (e) => {
    const t = ou(e);
    try {
      ae().callHook("app:error", t);
      const r = Ur();
      r.value = r.value || t;
    } catch {
      throw t;
    }
    return t;
  },
  ru = async (e = {}) => {
    const t = ae(),
      n = Ur();
    t.callHook("app:error:cleared", e),
      e.redirect && (await Nr().replace(e.redirect)),
      (n.value = null);
  },
  su = (e) => !!(e && typeof e == "object" && "__nuxt_error" in e),
  ou = (e) => {
    const t = Qf(e);
    return (t.__nuxt_error = !0), t;
  },
  iu = {
    path: "/",
    watch: !0,
    decode: (e) => Jo(decodeURIComponent(e)),
    encode: (e) =>
      encodeURIComponent(typeof e == "string" ? e : JSON.stringify(e)),
  };
function Hs(e, t) {
  var o;
  const n = { ...iu, ...t },
    r = lu(n) || {},
    s = We(r[e] ?? ((o = n.default) == null ? void 0 : o.call(n)));
  {
    const i = () => {
      au(e, s.value, n);
    };
    n.watch ? mt(s, i, { deep: n.watch !== "shallow" }) : i();
  }
  return s;
}
function lu(e = {}) {
  return Jf(document.cookie, e);
}
function cu(e, t, n = {}) {
  return t == null ? Os(e, t, { ...n, maxAge: -1 }) : Os(e, t, n);
}
function au(e, t, n = {}) {
  document.cookie = cu(e, t, n);
}
const fu = "modulepreload",
  uu = function (e, t) {
    return e.startsWith(".") ? new URL(e, t).href : e;
  },
  As = {},
  du = function (t, n, r) {
    if (!n || n.length === 0) return t();
    const s = document.getElementsByTagName("link");
    return Promise.all(
      n.map((o) => {
        if (((o = uu(o, r)), o in As)) return;
        As[o] = !0;
        const i = o.endsWith(".css"),
          l = i ? '[rel="stylesheet"]' : "";
        if (!!r)
          for (let u = s.length - 1; u >= 0; u--) {
            const h = s[u];
            if (h.href === o && (!i || h.rel === "stylesheet")) return;
          }
        else if (document.querySelector(`link[href="${o}"]${l}`)) return;
        const a = document.createElement("link");
        if (
          ((a.rel = i ? "stylesheet" : fu),
          i || ((a.as = "script"), (a.crossOrigin = "")),
          (a.href = o),
          document.head.appendChild(a),
          i)
        )
          return new Promise((u, h) => {
            a.addEventListener("load", u),
              a.addEventListener("error", () =>
                h(new Error(`Unable to preload CSS for ${o}`))
              );
          });
      })
    ).then(() => t());
  },
  hu = (...e) =>
    du(...e).catch((t) => {
      const n = new Event("nuxt.preloadError");
      throw ((n.payload = t), window.dispatchEvent(n), t);
    });
function pu(e = {}) {
  const t = e.path || window.location.pathname;
  let n = {};
  try {
    n = JSON.parse(sessionStorage.getItem("nuxt:reload") || "{}");
  } catch {}
  if (
    e.force ||
    (n == null ? void 0 : n.path) !== t ||
    (n == null ? void 0 : n.expires) < Date.now()
  ) {
    try {
      sessionStorage.setItem(
        "nuxt:reload",
        JSON.stringify({ path: t, expires: Date.now() + (e.ttl ?? 1e4) })
      );
    } catch {}
    if (e.persistState)
      try {
        sessionStorage.setItem(
          "nuxt:reload:state",
          JSON.stringify({ state: ae().payload.state })
        );
      } catch {}
    window.location.pathname !== t
      ? (window.location.href = t)
      : window.location.reload();
  }
}
const gu = ot((e) => {
    const t = Xa();
    return (
      e.vueApp.use(t),
      Kt(t),
      e.payload && e.payload.pinia && (t.state.value = e.payload.pinia),
      { provide: { pinia: t } }
    );
  }),
  zn = {},
  mu = ot((e) => {
    for (const t in zn)
      e.vueApp.component(t, zn[t]), e.vueApp.component("Lazy" + t, zn[t]);
  }),
  yu = {
    meta: [
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { charset: "utf-8" },
    ],
    link: [],
    style: [],
    script: [],
    noscript: [],
  },
  _u = "__nuxt",
  bu = ot((e) => {
    const n = Lf();
    n.push(yu), e.vueApp.use(n);
    {
      let r = !0;
      const s = () => {
        (r = !1), n.hooks.callHook("entries:updated", n);
      };
      n.hooks.hook("dom:beforeRender", (o) => {
        o.shouldRender = !r;
      }),
        e.hooks.hook("page:start", () => {
          r = !0;
        }),
        e.hooks.hook("page:finish", s),
        e.hooks.hook("app:suspense:resolve", s);
    }
  });
function wu(e) {
  const t = e;
  return (
    (t.headTags = e.resolveTags),
    (t.addEntry = e.push),
    (t.addHeadObjs = e.push),
    (t.addReactiveEntry = (n, r) => {
      const s = Df(n, r);
      return typeof s < "u" ? s.dispose : () => {};
    }),
    (t.removeHeadObjs = () => {}),
    (t.updateDOM = () => {
      e.hooks.callHook("entries:updated", e);
    }),
    (t.unhead = e),
    t
  );
}
const vu = ot((e) => {
    wu(e.vueApp._context.provides.usehead);
  }),
  Eu = [];
function Qn(e) {
  typeof e == "object" &&
    (e = Go({
      pathname: e.path || "",
      search: Xo(e.query || {}),
      hash: e.hash || "",
    }));
  const t = Mn(e.toString());
  return {
    path: t.pathname,
    fullPath: e,
    query: Qo(t.search),
    hash: t.hash,
    params: {},
    name: void 0,
    matched: [],
    redirectedFrom: void 0,
    meta: {},
    href: e,
  };
}
const xu = ot((e) => {
    const t =
        pa(window.location.pathname, wn().app.baseURL) +
        window.location.search +
        window.location.hash,
      n = [],
      r = {
        "navigate:before": [],
        "resolve:before": [],
        "navigate:after": [],
        error: [],
      },
      s = (u, h) => (r[u].push(h), () => r[u].splice(r[u].indexOf(h), 1)),
      o = wn().app.baseURL,
      i = Je(Qn(t));
    async function l(u, h) {
      try {
        const y = Qn(u);
        for (const x of r["navigate:before"]) {
          const g = await x(y, i);
          if (g === !1 || g instanceof Error) return;
          if (g) return l(g, !0);
        }
        for (const x of r["resolve:before"]) await x(y, i);
        Object.assign(i, y),
          window.history[h ? "replaceState" : "pushState"](
            {},
            "",
            Wt(o, y.fullPath)
          ),
          e.isHydrating || (await ut(e, ru));
        for (const x of r["navigate:after"]) await x(y, i);
      } catch (y) {
        for (const x of r.error) await x(y);
      }
    }
    const c = {
      currentRoute: i,
      isReady: () => Promise.resolve(),
      options: {},
      install: () => Promise.resolve(),
      push: (u) => l(u, !1),
      replace: (u) => l(u, !0),
      back: () => window.history.go(-1),
      go: (u) => window.history.go(u),
      forward: () => window.history.go(1),
      beforeResolve: (u) => s("resolve:before", u),
      beforeEach: (u) => s("navigate:before", u),
      afterEach: (u) => s("navigate:after", u),
      onError: (u) => s("error", u),
      resolve: Qn,
      addRoute: (u, h) => {
        n.push(h);
      },
      getRoutes: () => n,
      hasRoute: (u) => n.some((h) => h.name === u),
      removeRoute: (u) => {
        const h = n.findIndex((y) => y.name === u);
        h !== -1 && n.splice(h, 1);
      },
    };
    e.vueApp.component("RouterLink", {
      functional: !0,
      props: {
        to: String,
        custom: Boolean,
        replace: Boolean,
        activeClass: String,
        exactActiveClass: String,
        ariaCurrentValue: String,
      },
      setup: (u, { slots: h }) => {
        const y = () => l(u.to, u.replace);
        return () => {
          var g;
          const x = c.resolve(u.to);
          return u.custom
            ? (g = h.default) == null
              ? void 0
              : g.call(h, { href: u.to, navigate: y, route: x })
            : Tc(
                "a",
                { href: u.to, onClick: (T) => (T.preventDefault(), y()) },
                h
              );
        };
      },
    }),
      window.addEventListener("popstate", (u) => {
        const h = u.target.location;
        c.replace(h.href.replace(h.origin, ""));
      }),
      (e._route = i),
      (e._middleware = e._middleware || { global: [], named: {} });
    const a = Vf("_layout");
    return (
      e.hooks.hookOnce("app:created", async () => {
        if (
          (c.beforeEach(async (u, h) => {
            (u.meta = Je(u.meta || {})),
              e.isHydrating &&
                a.value &&
                !st(u.meta.layout) &&
                (u.meta.layout = a.value),
              (e._processingMiddleware = !0);
            const y = new Set([...Eu, ...e._middleware.global]);
            for (const x of y) {
              const g = await ut(e, x, [u, h]);
              if (g || g === !1) return g;
            }
          }),
          c.afterEach(() => {
            delete e._processingMiddleware;
          }),
          await c.replace(t),
          !ya(i.fullPath, t))
        ) {
          const u = await ut(e, Zf),
            h = {
              redirectCode:
                (u.node.res.statusCode !== 200 && u.node.res.statusCode) || 302,
            };
          await ut(e, tu, [i.fullPath, h]);
        }
      }),
      { provide: { route: i, router: c } }
    );
  }),
  Tu = ot((e) => {
    const t = Nr(),
      n = wn(),
      r = new Set();
    t.beforeEach(() => {
      r.clear();
    }),
      e.hook("app:chunkError", ({ error: s }) => {
        r.add(s);
      }),
      t.onError((s, o) => {
        if (r.has(s)) {
          const l =
            "href" in o && o.href.startsWith("#")
              ? n.app.baseURL + o.href
              : Wt(n.app.baseURL, o.fullPath);
          pu({ path: l, persistState: !0 });
        }
      });
  }),
  Is = (e) => ({
    getItem: (t) =>
      Hs(t, { ...e, encode: encodeURIComponent, decode: decodeURIComponent })
        .value,
    setItem: (t, n) => {
      Hs(t, {
        ...e,
        encode: encodeURIComponent,
        decode: decodeURIComponent,
      }).value = n;
    },
  }),
  Cu = () => ({
    getItem: (e) => (ae().ssrContext ? null : localStorage.getItem(e)),
    setItem: (e, t) => {
      ae().ssrContext || localStorage.setItem(e, t);
    },
  }),
  Ru = () => ({
    getItem: (e) => (ae().ssrContext ? null : sessionStorage.getItem(e)),
    setItem: (e, t) => {
      ae().ssrContext || sessionStorage.setItem(e, t);
    },
  }),
  pr = {
    localStorage: Cu(),
    sessionStorage: Ru(),
    cookies: Is(),
    cookiesWithOptions: Is,
  };
function Pu(e) {
  return typeof e == "object" && e !== null;
}
function Ms(e, t) {
  return (
    (e = Pu(e) ? e : Object.create(null)),
    new Proxy(e, {
      get(n, r, s) {
        return r === "key"
          ? Reflect.get(n, r, s)
          : Reflect.get(n, r, s) || Reflect.get(t, r, s);
      },
    })
  );
}
function ku(e, t) {
  return t.reduce((n, r) => (n == null ? void 0 : n[r]), e);
}
function Su(e, t, n) {
  return (
    (t
      .slice(0, -1)
      .reduce(
        (r, s) => (/^(__proto__)$/.test(s) ? {} : (r[s] = r[s] || {})),
        e
      )[t[t.length - 1]] = n),
    e
  );
}
function Ou(e, t) {
  return t.reduce((n, r) => {
    const s = r.split(".");
    return Su(n, s, ku(e, s));
  }, {});
}
function $s(e, { storage: t, serializer: n, key: r, debug: s }) {
  try {
    const o = t == null ? void 0 : t.getItem(r);
    o && e.$patch(n == null ? void 0 : n.deserialize(o));
  } catch (o) {
    s && console.error(o);
  }
}
function js(e, { storage: t, serializer: n, key: r, paths: s, debug: o }) {
  try {
    const i = Array.isArray(s) ? Ou(e, s) : e;
    t.setItem(r, n.serialize(i));
  } catch (i) {
    o && console.error(i);
  }
}
function Hu(e = {}) {
  return (t) => {
    const { auto: n = !1 } = e,
      {
        options: { persist: r = n },
        store: s,
      } = t;
    if (!r) return;
    const o = (Array.isArray(r) ? r.map((i) => Ms(i, e)) : [Ms(r, e)]).map(
      ({
        storage: i = localStorage,
        beforeRestore: l = null,
        afterRestore: c = null,
        serializer: a = { serialize: JSON.stringify, deserialize: JSON.parse },
        key: u = s.$id,
        paths: h = null,
        debug: y = !1,
      }) => {
        var x;
        return {
          storage: i,
          beforeRestore: l,
          afterRestore: c,
          serializer: a,
          key: ((x = e.key) != null ? x : (g) => g)(u),
          paths: h,
          debug: y,
        };
      }
    );
    (s.$persist = () => {
      o.forEach((i) => {
        js(s.$state, i);
      });
    }),
      (s.$hydrate = ({ runHooks: i = !0 } = {}) => {
        o.forEach((l) => {
          const { beforeRestore: c, afterRestore: a } = l;
          i && (c == null || c(t)), $s(s, l), i && (a == null || a(t));
        });
      }),
      o.forEach((i) => {
        const { beforeRestore: l, afterRestore: c } = i;
        l == null || l(t),
          $s(s, i),
          c == null || c(t),
          s.$subscribe(
            (a, u) => {
              js(u, i);
            },
            { detached: !0 }
          );
      });
  };
}
const Au = ot((e) => {
    const {
      cookieOptions: t,
      debug: n,
      storage: r,
    } = wn().public.persistedState;
    e.$pinia.use(
      Hu({
        storage: r === "cookies" ? pr.cookiesWithOptions(t) : pr[r],
        debug: n,
      })
    );
  }),
  Iu = [gu, mu, bu, vu, xu, Tu, Au],
  Mu = ef("counter", {
    state: () => ({ count: 0, name: "counter" }),
    getters: { doubleCount: (e) => e.count * 2 },
    actions: {
      increment() {
        this.count++;
      },
      decrement() {
        this.count--;
      },
    },
    persist: { storage: pr.localStorage },
  }),
  $u = nt("br", null, null, -1),
  ju = nt("br", null, null, -1),
  Fu = {
    __name: "app",
    setup(e) {
      const t = Mu();
      return (n, r) => (
        ft(),
        uc("div", null, [
          nt(
            "button",
            { onClick: r[0] || (r[0] = (s) => pe(t).decrement()) },
            "---"
          ),
          $u,
          nt("p", null, Ti(pe(t).count), 1),
          ju,
          nt(
            "button",
            { onClick: r[1] || (r[1] = (s) => pe(t).increment()) },
            "+++"
          ),
        ])
      );
    },
  },
  Fs = {
    __name: "nuxt-root",
    setup(e) {
      const t = jl(() =>
          hu(
            () => import("./error-component.9122bbb1.js"),
            [],
            import.meta.url
          ).then((l) => l.default || l)
        ),
        n = () => null,
        r = ae(),
        s = r.deferHydration();
      _o("_route", Gf()),
        r.hooks.callHookWith((l) => l.map((c) => c()), "vue:setup");
      const o = Ur();
      Co((l, c, a) => {
        if (
          (r.hooks
            .callHook("vue:error", l, c, a)
            .catch((u) => console.error("[nuxt] Error in `vue:error` hook", u)),
          su(l) && (l.fatal || l.unhandled))
        )
          return ut(r, nu, [l]), !1;
      });
      const { islandContext: i } = !1;
      return (l, c) => (
        ft(),
        tn(
          kl,
          { onResolve: pe(s) },
          {
            default: mo(() => [
              pe(o)
                ? (ft(),
                  tn(pe(t), { key: 0, error: pe(o) }, null, 8, ["error"]))
                : pe(i)
                ? (ft(),
                  tn(pe(n), { key: 1, context: pe(i) }, null, 8, ["context"]))
                : (ft(), tn(pe(Fu), { key: 2 })),
            ]),
            _: 1,
          },
          8,
          ["onResolve"]
        )
      );
    },
  };
globalThis.$fetch || (globalThis.$fetch = Sa.create({ baseURL: Ha() }));
let Ls;
const Lu = za(Iu);
(Ls = async function () {
  var s;
  const n = !!((s = window.__NUXT__) != null && s.serverRendered)
      ? zc(Fs)
      : Jc(Fs),
    r = Ka({ vueApp: n });
  try {
    await Ja(r, Lu);
  } catch (o) {
    await r.callHook("app:error", o), (r.payload.error = r.payload.error || o);
  }
  try {
    await r.hooks.callHook("app:created", n),
      await r.hooks.callHook("app:beforeMount", n),
      n.mount("#" + _u),
      await r.hooks.callHook("app:mounted", n),
      await kn();
  } catch (o) {
    await r.callHook("app:error", o), (r.payload.error = r.payload.error || o);
  }
}),
  Ls().catch((e) => {
    console.error("Error while mounting app:", e);
  });
export {
  mo as A,
  No as B,
  Uu as C,
  Bu as D,
  hu as _,
  ae as a,
  Nr as b,
  tn as c,
  jl as d,
  $l as e,
  Do as f,
  hc as g,
  Fr as h,
  Nl as i,
  xo as j,
  Tc as k,
  Du as l,
  Qo as m,
  Nu as n,
  ft as o,
  Mn as p,
  Yo as q,
  We as r,
  tu as s,
  Df as t,
  pe as u,
  uc as v,
  lr as w,
  nt as x,
  Ti as y,
  le as z,
};
