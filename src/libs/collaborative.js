import { getActivePinia as wr, defineStore as ye } from "pinia";
import { markRaw as yr, shallowReactive as $n, ref as ce, computed as Bn } from "vue";
const H = () => /* @__PURE__ */ new Map(), Qe = (n) => {
  const t = H();
  return n.forEach((e, s) => {
    t.set(s, e);
  }), t;
}, st = (n, t, e) => {
  let s = n.get(t);
  return s === void 0 && n.set(t, s = e()), s;
}, mr = (n, t) => {
  const e = [];
  for (const [s, r] of n)
    e.push(t(r, s));
  return e;
}, Sr = (n, t) => {
  for (const [e, s] of n)
    if (t(s, e))
      return !0;
  return !1;
}, kt = () => /* @__PURE__ */ new Set(), je = (n) => n[n.length - 1], kr = (n, t) => {
  for (let e = 0; e < t.length; e++)
    n.push(t[e]);
}, ht = Array.from, Ze = Array.isArray;
class Le {
  constructor() {
    this._observers = H();
  }
  /**
   * @param {N} name
   * @param {function} f
   */
  on(t, e) {
    st(this._observers, t, kt).add(e);
  }
  /**
   * @param {N} name
   * @param {function} f
   */
  once(t, e) {
    const s = (...r) => {
      this.off(t, s), e(...r);
    };
    this.on(t, s);
  }
  /**
   * @param {N} name
   * @param {function} f
   */
  off(t, e) {
    const s = this._observers.get(t);
    s !== void 0 && (s.delete(e), s.size === 0 && this._observers.delete(t));
  }
  /**
   * Emit a named event. All registered event listeners that listen to the
   * specified name will receive the event.
   *
   * @todo This should catch exceptions
   *
   * @param {N} name The event name.
   * @param {Array<any>} args The arguments that are applied to the event listener.
   */
  emit(t, e) {
    return ht((this._observers.get(t) || H()).values()).forEach((s) => s(...e));
  }
  destroy() {
    this._observers = H();
  }
}
const nt = Math.floor, de = Math.abs, dn = (n, t) => n < t ? n : t, Dt = (n, t) => n > t ? n : t, br = Math.pow, hs = (n) => n !== 0 ? n < 0 : 1 / n < 0, Vn = 1, jn = 2, Fe = 4, Ye = 8, Ht = 32, et = 64, V = 128, Re = 31, tn = 63, mt = 127, _r = 2147483647, us = Number.MAX_SAFE_INTEGER, Cr = Number.isInteger || ((n) => typeof n == "number" && isFinite(n) && nt(n) === n), Er = String.fromCharCode, Dr = (n) => n.toLowerCase(), Ir = /^\s*/g, Ar = (n) => n.replace(Ir, ""), Ur = /([A-Z])/g, Fn = (n, t) => Ar(n.replace(Ur, (e) => `${t}${Dr(e)}`)), Lr = (n) => {
  const t = unescape(encodeURIComponent(n)), e = t.length, s = new Uint8Array(e);
  for (let r = 0; r < e; r++)
    s[r] = /** @type {number} */
    t.codePointAt(r);
  return s;
}, Jt = (
  /** @type {TextEncoder} */
  typeof TextEncoder < "u" ? new TextEncoder() : null
), Rr = (n) => Jt.encode(n), Tr = Jt ? Rr : Lr;
let Ft = typeof TextDecoder > "u" ? null : new TextDecoder("utf-8", { fatal: !0, ignoreBOM: !0 });
Ft && Ft.decode(new Uint8Array()).length === 1 && (Ft = null);
class te {
  constructor() {
    this.cpos = 0, this.cbuf = new Uint8Array(100), this.bufs = [];
  }
}
const v = () => new te(), fn = (n) => {
  let t = n.cpos;
  for (let e = 0; e < n.bufs.length; e++)
    t += n.bufs[e].length;
  return t;
}, A = (n) => {
  const t = new Uint8Array(fn(n));
  let e = 0;
  for (let s = 0; s < n.bufs.length; s++) {
    const r = n.bufs[s];
    t.set(r, e), e += r.length;
  }
  return t.set(new Uint8Array(n.cbuf.buffer, 0, n.cpos), e), t;
}, Mr = (n, t) => {
  const e = n.cbuf.length;
  e - n.cpos < t && (n.bufs.push(new Uint8Array(n.cbuf.buffer, 0, n.cpos)), n.cbuf = new Uint8Array(Dt(e, t) * 2), n.cpos = 0);
}, T = (n, t) => {
  const e = n.cbuf.length;
  n.cpos === e && (n.bufs.push(n.cbuf), n.cbuf = new Uint8Array(e * 2), n.cpos = 0), n.cbuf[n.cpos++] = t;
}, en = T, p = (n, t) => {
  for (; t > mt; )
    T(n, V | mt & t), t = nt(t / 128);
  T(n, mt & t);
}, gn = (n, t) => {
  const e = hs(t);
  for (e && (t = -t), T(n, (t > tn ? V : 0) | (e ? et : 0) | tn & t), t = nt(t / 64); t > 0; )
    T(n, (t > mt ? V : 0) | mt & t), t = nt(t / 128);
}, nn = new Uint8Array(3e4), Or = nn.length / 3, xr = (n, t) => {
  if (t.length < Or) {
    const e = Jt.encodeInto(t, nn).written || 0;
    p(n, e);
    for (let s = 0; s < e; s++)
      T(n, nn[s]);
  } else
    U(n, Tr(t));
}, vr = (n, t) => {
  const e = unescape(encodeURIComponent(t)), s = e.length;
  p(n, s);
  for (let r = 0; r < s; r++)
    T(
      n,
      /** @type {number} */
      e.codePointAt(r)
    );
}, St = Jt && /** @type {any} */
Jt.encodeInto ? xr : vr, Te = (n, t) => {
  const e = n.cbuf.length, s = n.cpos, r = dn(e - s, t.length), i = t.length - r;
  n.cbuf.set(t.subarray(0, r), s), n.cpos += r, i > 0 && (n.bufs.push(n.cbuf), n.cbuf = new Uint8Array(Dt(e * 2, i)), n.cbuf.set(t.subarray(r)), n.cpos = i);
}, U = (n, t) => {
  p(n, t.byteLength), Te(n, t);
}, pn = (n, t) => {
  Mr(n, t);
  const e = new DataView(n.cbuf.buffer, n.cpos, t);
  return n.cpos += t, e;
}, Nr = (n, t) => pn(n, 4).setFloat32(0, t, !1), $r = (n, t) => pn(n, 8).setFloat64(0, t, !1), Br = (n, t) => (
  /** @type {any} */
  pn(n, 8).setBigInt64(0, t, !1)
), Yn = new DataView(new ArrayBuffer(4)), Vr = (n) => (Yn.setFloat32(0, n), Yn.getFloat32(0) === n), Pt = (n, t) => {
  switch (typeof t) {
    case "string":
      T(n, 119), St(n, t);
      break;
    case "number":
      Cr(t) && de(t) <= _r ? (T(n, 125), gn(n, t)) : Vr(t) ? (T(n, 124), Nr(n, t)) : (T(n, 123), $r(n, t));
      break;
    case "bigint":
      T(n, 122), Br(n, t);
      break;
    case "object":
      if (t === null)
        T(n, 126);
      else if (Ze(t)) {
        T(n, 117), p(n, t.length);
        for (let e = 0; e < t.length; e++)
          Pt(n, t[e]);
      } else if (t instanceof Uint8Array)
        T(n, 116), U(n, t);
      else {
        T(n, 118);
        const e = Object.keys(t);
        p(n, e.length);
        for (let s = 0; s < e.length; s++) {
          const r = e[s];
          St(n, r), Pt(n, t[r]);
        }
      }
      break;
    case "boolean":
      T(n, t ? 120 : 121);
      break;
    default:
      T(n, 127);
  }
};
class Kn extends te {
  /**
   * @param {function(Encoder, T):void} writer
   */
  constructor(t) {
    super(), this.w = t, this.s = null, this.count = 0;
  }
  /**
   * @param {T} v
   */
  write(t) {
    this.s === t ? this.count++ : (this.count > 0 && p(this, this.count - 1), this.count = 1, this.w(this, t), this.s = t);
  }
}
const Hn = (n) => {
  n.count > 0 && (gn(n.encoder, n.count === 1 ? n.s : -n.s), n.count > 1 && p(n.encoder, n.count - 2));
};
class fe {
  constructor() {
    this.encoder = new te(), this.s = 0, this.count = 0;
  }
  /**
   * @param {number} v
   */
  write(t) {
    this.s === t ? this.count++ : (Hn(this), this.count = 1, this.s = t);
  }
  /**
   * Flush the encoded state and transform this to a Uint8Array.
   *
   * Note that this should only be called once.
   */
  toUint8Array() {
    return Hn(this), A(this.encoder);
  }
}
const Jn = (n) => {
  if (n.count > 0) {
    const t = n.diff * 2 + (n.count === 1 ? 0 : 1);
    gn(n.encoder, t), n.count > 1 && p(n.encoder, n.count - 2);
  }
};
class Ke {
  constructor() {
    this.encoder = new te(), this.s = 0, this.count = 0, this.diff = 0;
  }
  /**
   * @param {number} v
   */
  write(t) {
    this.diff === t - this.s ? (this.s = t, this.count++) : (Jn(this), this.count = 1, this.diff = t - this.s, this.s = t);
  }
  /**
   * Flush the encoded state and transform this to a Uint8Array.
   *
   * Note that this should only be called once.
   */
  toUint8Array() {
    return Jn(this), A(this.encoder);
  }
}
class jr {
  constructor() {
    this.sarr = [], this.s = "", this.lensE = new fe();
  }
  /**
   * @param {string} string
   */
  write(t) {
    this.s += t, this.s.length > 19 && (this.sarr.push(this.s), this.s = ""), this.lensE.write(t.length);
  }
  toUint8Array() {
    const t = new te();
    return this.sarr.push(this.s), this.s = "", St(t, this.sarr.join("")), Te(t, this.lensE.toUint8Array()), A(t);
  }
}
const xt = (n) => new Error(n), W = () => {
  throw xt("Method unimplemented");
}, z = () => {
  throw xt("Unexpected case");
}, ds = xt("Unexpected end of array"), fs = xt("Integer out of Range");
class Me {
  /**
   * @param {Uint8Array} uint8Array Binary data to decode
   */
  constructor(t) {
    this.arr = t, this.pos = 0;
  }
}
const dt = (n) => new Me(n), Fr = (n) => n.pos !== n.arr.length, Yr = (n, t) => {
  const e = new Uint8Array(n.arr.buffer, n.pos + n.arr.byteOffset, t);
  return n.pos += t, e;
}, x = (n) => Yr(n, m(n)), Rt = (n) => n.arr[n.pos++], m = (n) => {
  let t = 0, e = 1;
  const s = n.arr.length;
  for (; n.pos < s; ) {
    const r = n.arr[n.pos++];
    if (t = t + (r & mt) * e, e *= 128, r < V)
      return t;
    if (t > us)
      throw fs;
  }
  throw ds;
}, wn = (n) => {
  let t = n.arr[n.pos++], e = t & tn, s = 64;
  const r = (t & et) > 0 ? -1 : 1;
  if (!(t & V))
    return r * e;
  const i = n.arr.length;
  for (; n.pos < i; ) {
    if (t = n.arr[n.pos++], e = e + (t & mt) * s, s *= 128, t < V)
      return r * e;
    if (e > us)
      throw fs;
  }
  throw ds;
}, Kr = (n) => {
  let t = m(n);
  if (t === 0)
    return "";
  {
    let e = String.fromCodePoint(Rt(n));
    if (--t < 100)
      for (; t--; )
        e += String.fromCodePoint(Rt(n));
    else
      for (; t > 0; ) {
        const s = t < 1e4 ? t : 1e4, r = n.arr.subarray(n.pos, n.pos + s);
        n.pos += s, e += String.fromCodePoint.apply(
          null,
          /** @type {any} */
          r
        ), t -= s;
      }
    return decodeURIComponent(escape(e));
  }
}, Hr = (n) => (
  /** @type any */
  Ft.decode(x(n))
), lt = Ft ? Hr : Kr, yn = (n, t) => {
  const e = new DataView(n.arr.buffer, n.arr.byteOffset + n.pos, t);
  return n.pos += t, e;
}, Jr = (n) => yn(n, 4).getFloat32(0, !1), Pr = (n) => yn(n, 8).getFloat64(0, !1), Gr = (n) => (
  /** @type {any} */
  yn(n, 8).getBigInt64(0, !1)
), Wr = [
  (n) => {
  },
  // CASE 127: undefined
  (n) => null,
  // CASE 126: null
  wn,
  // CASE 125: integer
  Jr,
  // CASE 124: float32
  Pr,
  // CASE 123: float64
  Gr,
  // CASE 122: bigint
  (n) => !1,
  // CASE 121: boolean (false)
  (n) => !0,
  // CASE 120: boolean (true)
  lt,
  // CASE 119: string
  (n) => {
    const t = m(n), e = {};
    for (let s = 0; s < t; s++) {
      const r = lt(n);
      e[r] = Gt(n);
    }
    return e;
  },
  (n) => {
    const t = m(n), e = [];
    for (let s = 0; s < t; s++)
      e.push(Gt(n));
    return e;
  },
  x
  // CASE 116: Uint8Array
], Gt = (n) => Wr[127 - Rt(n)](n);
class Pn extends Me {
  /**
   * @param {Uint8Array} uint8Array
   * @param {function(Decoder):T} reader
   */
  constructor(t, e) {
    super(t), this.reader = e, this.s = null, this.count = 0;
  }
  read() {
    return this.count === 0 && (this.s = this.reader(this), Fr(this) ? this.count = m(this) + 1 : this.count = -1), this.count--, /** @type {T} */
    this.s;
  }
}
class ge extends Me {
  /**
   * @param {Uint8Array} uint8Array
   */
  constructor(t) {
    super(t), this.s = 0, this.count = 0;
  }
  read() {
    if (this.count === 0) {
      this.s = wn(this);
      const t = hs(this.s);
      this.count = 1, t && (this.s = -this.s, this.count = m(this) + 2);
    }
    return this.count--, /** @type {number} */
    this.s;
  }
}
class He extends Me {
  /**
   * @param {Uint8Array} uint8Array
   */
  constructor(t) {
    super(t), this.s = 0, this.count = 0, this.diff = 0;
  }
  /**
   * @return {number}
   */
  read() {
    if (this.count === 0) {
      const t = wn(this), e = t & 1;
      this.diff = nt(t / 2), this.count = 1, e && (this.count = m(this) + 2);
    }
    return this.s += this.diff, this.count--, this.s;
  }
}
class zr {
  /**
   * @param {Uint8Array} uint8Array
   */
  constructor(t) {
    this.decoder = new ge(t), this.str = lt(this.decoder), this.spos = 0;
  }
  /**
   * @return {string}
   */
  read() {
    const t = this.spos + this.decoder.read(), e = this.str.slice(this.spos, t);
    return this.spos = t, e;
  }
}
const qr = crypto.getRandomValues.bind(crypto), gs = () => qr(new Uint32Array(1))[0], Xr = "10000000-1000-4000-8000" + -1e11, Qr = () => Xr.replace(
  /[018]/g,
  /** @param {number} c */
  (n) => (n ^ gs() & 15 >> n / 4).toString(16)
), ut = Date.now, Gn = (n) => (
  /** @type {Promise<T>} */
  new Promise(n)
);
Promise.all.bind(Promise);
const Wn = (n) => n === void 0 ? null : n;
class Zr {
  constructor() {
    this.map = /* @__PURE__ */ new Map();
  }
  /**
   * @param {string} key
   * @param {any} newValue
   */
  setItem(t, e) {
    this.map.set(t, e);
  }
  /**
   * @param {string} key
   */
  getItem(t) {
    return this.map.get(t);
  }
}
let ps = new Zr(), mn = !0;
try {
  typeof localStorage < "u" && localStorage && (ps = localStorage, mn = !1);
} catch {
}
const ws = ps, ti = (n) => mn || addEventListener(
  "storage",
  /** @type {any} */
  n
), ei = (n) => mn || removeEventListener(
  "storage",
  /** @type {any} */
  n
), ni = Object.keys, si = (n, t) => {
  const e = [];
  for (const s in n)
    e.push(t(n[s], s));
  return e;
}, me = (n) => ni(n).length, ri = (n, t) => {
  for (const e in n)
    if (!t(n[e], e))
      return !1;
  return !0;
}, ys = (n, t) => Object.prototype.hasOwnProperty.call(n, t), ii = (n, t) => n === t || me(n) === me(t) && ri(n, (e, s) => (e !== void 0 || ys(t, s)) && t[s] === e), Sn = (n, t, e = 0) => {
  try {
    for (; e < n.length; e++)
      n[e](...t);
  } finally {
    e < n.length && Sn(n, t, e + 1);
  }
}, oi = (n, t) => n === t, Yt = (n, t) => {
  if (n == null || t == null)
    return oi(n, t);
  if (n.constructor !== t.constructor)
    return !1;
  if (n === t)
    return !0;
  switch (n.constructor) {
    case ArrayBuffer:
      n = new Uint8Array(n), t = new Uint8Array(t);
    case Uint8Array: {
      if (n.byteLength !== t.byteLength)
        return !1;
      for (let e = 0; e < n.length; e++)
        if (n[e] !== t[e])
          return !1;
      break;
    }
    case Set: {
      if (n.size !== t.size)
        return !1;
      for (const e of n)
        if (!t.has(e))
          return !1;
      break;
    }
    case Map: {
      if (n.size !== t.size)
        return !1;
      for (const e of n.keys())
        if (!t.has(e) || !Yt(n.get(e), t.get(e)))
          return !1;
      break;
    }
    case Object:
      if (me(n) !== me(t))
        return !1;
      for (const e in n)
        if (!ys(n, e) || !Yt(n[e], t[e]))
          return !1;
      break;
    case Array:
      if (n.length !== t.length)
        return !1;
      for (let e = 0; e < n.length; e++)
        if (!Yt(n[e], t[e]))
          return !1;
      break;
    default:
      return !1;
  }
  return !0;
}, ci = (n, t) => t.includes(n), Tt = typeof process < "u" && process.release && /node|io\.js/.test(process.release.name) && Object.prototype.toString.call(typeof process < "u" ? process : 0) === "[object process]", ms = typeof window < "u" && typeof document < "u" && !Tt;
let G;
const li = () => {
  if (G === void 0)
    if (Tt) {
      G = H();
      const n = process.argv;
      let t = null;
      for (let e = 0; e < n.length; e++) {
        const s = n[e];
        s[0] === "-" ? (t !== null && G.set(t, ""), t = s) : t !== null && (G.set(t, s), t = null);
      }
      t !== null && G.set(t, "");
    } else
      typeof location == "object" ? (G = H(), (location.search || "?").slice(1).split("&").forEach((n) => {
        if (n.length !== 0) {
          const [t, e] = n.split("=");
          G.set(`--${Fn(t, "-")}`, e), G.set(`-${Fn(t, "-")}`, e);
        }
      })) : G = H();
  return G;
}, sn = (n) => li().has(n), rn = (n) => Wn(Tt ? process.env[n.toUpperCase()] : ws.getItem(n)), ai = (n) => sn("--" + n) || rn(n) !== null;
ai("production");
const zn = Tt && ci(process.env.FORCE_COLOR, ["true", "1", "2"]), hi = !sn("no-colors") && (!Tt || process.stdout.isTTY || zn) && (!Tt || sn("color") || zn || rn("COLORTERM") !== null || (rn("TERM") || "").includes("color")), Ss = (n) => new Uint8Array(n), ui = (n, t, e) => new Uint8Array(n, t, e), di = (n) => new Uint8Array(n), fi = (n) => {
  let t = "";
  for (let e = 0; e < n.byteLength; e++)
    t += Er(n[e]);
  return btoa(t);
}, gi = (n) => Buffer.from(n.buffer, n.byteOffset, n.byteLength).toString("base64"), pi = (n) => {
  const t = atob(n), e = Ss(t.length);
  for (let s = 0; s < t.length; s++)
    e[s] = t.charCodeAt(s);
  return e;
}, wi = (n) => {
  const t = Buffer.from(n, "base64");
  return ui(t.buffer, t.byteOffset, t.byteLength);
}, yi = ms ? fi : gi, mi = ms ? pi : wi, Si = (n) => {
  const t = Ss(n.byteLength);
  return t.set(n), t;
};
class ki {
  /**
   * @param {L} left
   * @param {R} right
   */
  constructor(t, e) {
    this.left = t, this.right = e;
  }
}
const tt = (n, t) => new ki(n, t);
typeof DOMParser < "u" && new DOMParser();
const bi = (n) => mr(n, (t, e) => `${e}:${t};`).join(""), rt = Symbol, ks = rt(), bs = rt(), _i = rt(), Ci = rt(), Ei = rt(), _s = rt(), Di = rt(), Cs = rt(), Ii = rt(), Ai = (n) => {
  const t = [];
  let e = 0;
  for (; e < n.length; e++) {
    const s = n[e];
    s.constructor === String || s.constructor === Number || s.constructor === Object && t.push(JSON.stringify(s));
  }
  return t;
}, Ui = {
  [ks]: tt("font-weight", "bold"),
  [bs]: tt("font-weight", "normal"),
  [_i]: tt("color", "blue"),
  [Ei]: tt("color", "green"),
  [Ci]: tt("color", "grey"),
  [_s]: tt("color", "red"),
  [Di]: tt("color", "purple"),
  [Cs]: tt("color", "orange"),
  // not well supported in chrome when debugging node with inspector - TODO: deprecate
  [Ii]: tt("color", "black")
}, Li = (n) => {
  const t = [], e = [], s = H();
  let r = [], i = 0;
  for (; i < n.length; i++) {
    const o = n[i], c = Ui[o];
    if (c !== void 0)
      s.set(c.left, c.right);
    else if (o.constructor === String || o.constructor === Number) {
      const l = bi(s);
      i > 0 || l.length > 0 ? (t.push("%c" + o), e.push(l)) : t.push(o);
    } else
      break;
  }
  for (i > 0 && (r = e, r.unshift(t.join(""))); i < n.length; i++) {
    const o = n[i];
    o instanceof Symbol || r.push(o);
  }
  return r;
}, Ri = hi ? Li : Ai, Ti = (...n) => {
  console.log(...Ri(n)), Mi.forEach((t) => t.print(n));
}, Mi = kt(), Es = (n) => ({
  /**
   * @return {IterableIterator<T>}
   */
  [Symbol.iterator]() {
    return this;
  },
  // @ts-ignore
  next: n
}), Oi = (n, t) => Es(() => {
  let e;
  do
    e = n.next();
  while (!e.done && !t(e.value));
  return e;
}), Je = (n, t) => Es(() => {
  const { done: e, value: s } = n.next();
  return { done: e, value: e ? void 0 : t(s) };
});
class kn {
  /**
   * @param {number} clock
   * @param {number} len
   */
  constructor(t, e) {
    this.clock = t, this.len = e;
  }
}
class vt {
  constructor() {
    this.clients = /* @__PURE__ */ new Map();
  }
}
const bt = (n, t, e) => t.clients.forEach((s, r) => {
  const i = (
    /** @type {Array<GC|Item>} */
    n.doc.store.clients.get(r)
  );
  for (let o = 0; o < s.length; o++) {
    const c = s[o];
    Ns(n, i, c.clock, c.len, e);
  }
}), xi = (n, t) => {
  let e = 0, s = n.length - 1;
  for (; e <= s; ) {
    const r = nt((e + s) / 2), i = n[r], o = i.clock;
    if (o <= t) {
      if (t < o + i.len)
        return r;
      e = r + 1;
    } else
      s = r - 1;
  }
  return null;
}, Oe = (n, t) => {
  const e = n.clients.get(t.client);
  return e !== void 0 && xi(e, t.clock) !== null;
}, bn = (n) => {
  n.clients.forEach((t) => {
    t.sort((r, i) => r.clock - i.clock);
    let e, s;
    for (e = 1, s = 1; e < t.length; e++) {
      const r = t[s - 1], i = t[e];
      r.clock + r.len >= i.clock ? r.len = Dt(r.len, i.clock + i.len - r.clock) : (s < e && (t[s] = i), s++);
    }
    t.length = s;
  });
}, on = (n) => {
  const t = new vt();
  for (let e = 0; e < n.length; e++)
    n[e].clients.forEach((s, r) => {
      if (!t.clients.has(r)) {
        const i = s.slice();
        for (let o = e + 1; o < n.length; o++)
          kr(i, n[o].clients.get(r) || []);
        t.clients.set(r, i);
      }
    });
  return bn(t), t;
}, Wt = (n, t, e, s) => {
  st(n.clients, t, () => (
    /** @type {Array<DeleteItem>} */
    []
  )).push(new kn(e, s));
}, vi = () => new vt(), Ni = (n) => {
  const t = vi();
  return n.clients.forEach((e, s) => {
    const r = [];
    for (let i = 0; i < e.length; i++) {
      const o = e[i];
      if (o.deleted) {
        const c = o.id.clock;
        let l = o.length;
        if (i + 1 < e.length)
          for (let a = e[i + 1]; i + 1 < e.length && a.deleted; a = e[++i + 1])
            l += a.length;
        r.push(new kn(c, l));
      }
    }
    r.length > 0 && t.clients.set(s, r);
  }), t;
}, Nt = (n, t) => {
  p(n.restEncoder, t.clients.size), ht(t.clients.entries()).sort((e, s) => s[0] - e[0]).forEach(([e, s]) => {
    n.resetDsCurVal(), p(n.restEncoder, e);
    const r = s.length;
    p(n.restEncoder, r);
    for (let i = 0; i < r; i++) {
      const o = s[i];
      n.writeDsClock(o.clock), n.writeDsLen(o.len);
    }
  });
}, _n = (n) => {
  const t = new vt(), e = m(n.restDecoder);
  for (let s = 0; s < e; s++) {
    n.resetDsCurVal();
    const r = m(n.restDecoder), i = m(n.restDecoder);
    if (i > 0) {
      const o = st(t.clients, r, () => (
        /** @type {Array<DeleteItem>} */
        []
      ));
      for (let c = 0; c < i; c++)
        o.push(new kn(n.readDsClock(), n.readDsLen()));
    }
  }
  return t;
}, qn = (n, t, e) => {
  const s = new vt(), r = m(n.restDecoder);
  for (let i = 0; i < r; i++) {
    n.resetDsCurVal();
    const o = m(n.restDecoder), c = m(n.restDecoder), l = e.clients.get(o) || [], a = L(e, o);
    for (let h = 0; h < c; h++) {
      const u = n.readDsClock(), f = u + n.readDsLen();
      if (u < a) {
        a < f && Wt(s, o, a, f - a);
        let d = q(l, u), g = l[d];
        for (!g.deleted && g.id.clock < u && (l.splice(d + 1, 0, Ie(t, g, u - g.id.clock)), d++); d < l.length && (g = l[d++], g.id.clock < f); )
          g.deleted || (f < g.id.clock + g.length && l.splice(d, 0, Ie(t, g, f - g.id.clock)), g.delete(t));
      } else
        Wt(s, o, u, f - u);
    }
  }
  if (s.clients.size > 0) {
    const i = new _t();
    return p(i.restEncoder, 0), Nt(i, s), i.toUint8Array();
  }
  return null;
}, Ds = gs;
class $t extends Le {
  /**
   * @param {DocOpts} opts configuration
   */
  constructor({ guid: t = Qr(), collectionid: e = null, gc: s = !0, gcFilter: r = () => !0, meta: i = null, autoLoad: o = !1, shouldLoad: c = !0 } = {}) {
    super(), this.gc = s, this.gcFilter = r, this.clientID = Ds(), this.guid = t, this.collectionid = e, this.share = /* @__PURE__ */ new Map(), this.store = new xs(), this._transaction = null, this._transactionCleanups = [], this.subdocs = /* @__PURE__ */ new Set(), this._item = null, this.shouldLoad = c, this.autoLoad = o, this.meta = i, this.isLoaded = !1, this.isSynced = !1, this.whenLoaded = Gn((a) => {
      this.on("load", () => {
        this.isLoaded = !0, a(this);
      });
    });
    const l = () => Gn((a) => {
      const h = (u) => {
        (u === void 0 || u === !0) && (this.off("sync", h), a());
      };
      this.on("sync", h);
    });
    this.on("sync", (a) => {
      a === !1 && this.isSynced && (this.whenSynced = l()), this.isSynced = a === void 0 || a === !0, this.isLoaded || this.emit("load", []);
    }), this.whenSynced = l();
  }
  /**
   * Notify the parent document that you request to load data into this subdocument (if it is a subdocument).
   *
   * `load()` might be used in the future to request any provider to load the most current data.
   *
   * It is safe to call `load()` multiple times.
   */
  load() {
    const t = this._item;
    t !== null && !this.shouldLoad && C(
      /** @type {any} */
      t.parent.doc,
      (e) => {
        e.subdocsLoaded.add(this);
      },
      null,
      !0
    ), this.shouldLoad = !0;
  }
  getSubdocs() {
    return this.subdocs;
  }
  getSubdocGuids() {
    return new Set(ht(this.subdocs).map((t) => t.guid));
  }
  /**
   * Changes that happen inside of a transaction are bundled. This means that
   * the observer fires _after_ the transaction is finished and that all changes
   * that happened inside of the transaction are sent as one message to the
   * other peers.
   *
   * @template T
   * @param {function(Transaction):T} f The function that should be executed as a transaction
   * @param {any} [origin] Origin of who started the transaction. Will be stored on transaction.origin
   * @return T
   *
   * @public
   */
  transact(t, e = null) {
    return C(this, t, e);
  }
  /**
   * Define a shared data type.
   *
   * Multiple calls of `y.get(name, TypeConstructor)` yield the same result
   * and do not overwrite each other. I.e.
   * `y.define(name, Y.Array) === y.define(name, Y.Array)`
   *
   * After this method is called, the type is also available on `y.share.get(name)`.
   *
   * *Best Practices:*
   * Define all types right after the Yjs instance is created and store them in a separate object.
   * Also use the typed methods `getText(name)`, `getArray(name)`, ..
   *
   * @example
   *   const y = new Y(..)
   *   const appState = {
   *     document: y.getText('document')
   *     comments: y.getArray('comments')
   *   }
   *
   * @param {string} name
   * @param {Function} TypeConstructor The constructor of the type definition. E.g. Y.Text, Y.Array, Y.Map, ...
   * @return {AbstractType<any>} The created type. Constructed with TypeConstructor
   *
   * @public
   */
  get(t, e = M) {
    const s = st(this.share, t, () => {
      const i = new e();
      return i._integrate(this, null), i;
    }), r = s.constructor;
    if (e !== M && r !== e)
      if (r === M) {
        const i = new e();
        i._map = s._map, s._map.forEach(
          /** @param {Item?} n */
          (o) => {
            for (; o !== null; o = o.left)
              o.parent = i;
          }
        ), i._start = s._start;
        for (let o = i._start; o !== null; o = o.right)
          o.parent = i;
        return i._length = s._length, this.share.set(t, i), i._integrate(this, null), i;
      } else
        throw new Error(`Type with the name ${t} has already been defined with a different constructor`);
    return s;
  }
  /**
   * @template T
   * @param {string} [name]
   * @return {YArray<T>}
   *
   * @public
   */
  getArray(t = "") {
    return this.get(t, J);
  }
  /**
   * @param {string} [name]
   * @return {YText}
   *
   * @public
   */
  getText(t = "") {
    return this.get(t, Ot);
  }
  /**
   * @template T
   * @param {string} [name]
   * @return {YMap<T>}
   *
   * @public
   */
  getMap(t = "") {
    return this.get(t, X);
  }
  /**
   * @param {string} [name]
   * @return {YXmlFragment}
   *
   * @public
   */
  getXmlFragment(t = "") {
    return this.get(t, Ct);
  }
  /**
   * Converts the entire document into a js object, recursively traversing each yjs type
   * Doesn't log types that have not been defined (using ydoc.getType(..)).
   *
   * @deprecated Do not use this method and rather call toJSON directly on the shared types.
   *
   * @return {Object<string, any>}
   */
  toJSON() {
    const t = {};
    return this.share.forEach((e, s) => {
      t[s] = e.toJSON();
    }), t;
  }
  /**
   * Emit `destroy` event and unregister all event handlers.
   */
  destroy() {
    ht(this.subdocs).forEach((e) => e.destroy());
    const t = this._item;
    if (t !== null) {
      this._item = null;
      const e = (
        /** @type {ContentDoc} */
        t.content
      );
      e.doc = new $t({ guid: this.guid, ...e.opts, shouldLoad: !1 }), e.doc._item = t, C(
        /** @type {any} */
        t.parent.doc,
        (s) => {
          const r = e.doc;
          t.deleted || s.subdocsAdded.add(r), s.subdocsRemoved.add(this);
        },
        null,
        !0
      );
    }
    this.emit("destroyed", [!0]), this.emit("destroy", [this]), super.destroy();
  }
  /**
   * @param {string} eventName
   * @param {function(...any):any} f
   */
  on(t, e) {
    super.on(t, e);
  }
  /**
   * @param {string} eventName
   * @param {function} f
   */
  off(t, e) {
    super.off(t, e);
  }
}
class Is {
  /**
   * @param {decoding.Decoder} decoder
   */
  constructor(t) {
    this.restDecoder = t;
  }
  resetDsCurVal() {
  }
  /**
   * @return {number}
   */
  readDsClock() {
    return m(this.restDecoder);
  }
  /**
   * @return {number}
   */
  readDsLen() {
    return m(this.restDecoder);
  }
}
class As extends Is {
  /**
   * @return {ID}
   */
  readLeftID() {
    return k(m(this.restDecoder), m(this.restDecoder));
  }
  /**
   * @return {ID}
   */
  readRightID() {
    return k(m(this.restDecoder), m(this.restDecoder));
  }
  /**
   * Read the next client id.
   * Use this in favor of readID whenever possible to reduce the number of objects created.
   */
  readClient() {
    return m(this.restDecoder);
  }
  /**
   * @return {number} info An unsigned 8-bit integer
   */
  readInfo() {
    return Rt(this.restDecoder);
  }
  /**
   * @return {string}
   */
  readString() {
    return lt(this.restDecoder);
  }
  /**
   * @return {boolean} isKey
   */
  readParentInfo() {
    return m(this.restDecoder) === 1;
  }
  /**
   * @return {number} info An unsigned 8-bit integer
   */
  readTypeRef() {
    return m(this.restDecoder);
  }
  /**
   * Write len of a struct - well suited for Opt RLE encoder.
   *
   * @return {number} len
   */
  readLen() {
    return m(this.restDecoder);
  }
  /**
   * @return {any}
   */
  readAny() {
    return Gt(this.restDecoder);
  }
  /**
   * @return {Uint8Array}
   */
  readBuf() {
    return Si(x(this.restDecoder));
  }
  /**
   * Legacy implementation uses JSON parse. We use any-decoding in v2.
   *
   * @return {any}
   */
  readJSON() {
    return JSON.parse(lt(this.restDecoder));
  }
  /**
   * @return {string}
   */
  readKey() {
    return lt(this.restDecoder);
  }
}
class $i {
  /**
   * @param {decoding.Decoder} decoder
   */
  constructor(t) {
    this.dsCurrVal = 0, this.restDecoder = t;
  }
  resetDsCurVal() {
    this.dsCurrVal = 0;
  }
  /**
   * @return {number}
   */
  readDsClock() {
    return this.dsCurrVal += m(this.restDecoder), this.dsCurrVal;
  }
  /**
   * @return {number}
   */
  readDsLen() {
    const t = m(this.restDecoder) + 1;
    return this.dsCurrVal += t, t;
  }
}
class Mt extends $i {
  /**
   * @param {decoding.Decoder} decoder
   */
  constructor(t) {
    super(t), this.keys = [], m(t), this.keyClockDecoder = new He(x(t)), this.clientDecoder = new ge(x(t)), this.leftClockDecoder = new He(x(t)), this.rightClockDecoder = new He(x(t)), this.infoDecoder = new Pn(x(t), Rt), this.stringDecoder = new zr(x(t)), this.parentInfoDecoder = new Pn(x(t), Rt), this.typeRefDecoder = new ge(x(t)), this.lenDecoder = new ge(x(t));
  }
  /**
   * @return {ID}
   */
  readLeftID() {
    return new Ut(this.clientDecoder.read(), this.leftClockDecoder.read());
  }
  /**
   * @return {ID}
   */
  readRightID() {
    return new Ut(this.clientDecoder.read(), this.rightClockDecoder.read());
  }
  /**
   * Read the next client id.
   * Use this in favor of readID whenever possible to reduce the number of objects created.
   */
  readClient() {
    return this.clientDecoder.read();
  }
  /**
   * @return {number} info An unsigned 8-bit integer
   */
  readInfo() {
    return (
      /** @type {number} */
      this.infoDecoder.read()
    );
  }
  /**
   * @return {string}
   */
  readString() {
    return this.stringDecoder.read();
  }
  /**
   * @return {boolean}
   */
  readParentInfo() {
    return this.parentInfoDecoder.read() === 1;
  }
  /**
   * @return {number} An unsigned 8-bit integer
   */
  readTypeRef() {
    return this.typeRefDecoder.read();
  }
  /**
   * Write len of a struct - well suited for Opt RLE encoder.
   *
   * @return {number}
   */
  readLen() {
    return this.lenDecoder.read();
  }
  /**
   * @return {any}
   */
  readAny() {
    return Gt(this.restDecoder);
  }
  /**
   * @return {Uint8Array}
   */
  readBuf() {
    return x(this.restDecoder);
  }
  /**
   * This is mainly here for legacy purposes.
   *
   * Initial we incoded objects using JSON. Now we use the much faster lib0/any-encoder. This method mainly exists for legacy purposes for the v1 encoder.
   *
   * @return {any}
   */
  readJSON() {
    return Gt(this.restDecoder);
  }
  /**
   * @return {string}
   */
  readKey() {
    const t = this.keyClockDecoder.read();
    if (t < this.keys.length)
      return this.keys[t];
    {
      const e = this.stringDecoder.read();
      return this.keys.push(e), e;
    }
  }
}
class Us {
  constructor() {
    this.restEncoder = v();
  }
  toUint8Array() {
    return A(this.restEncoder);
  }
  resetDsCurVal() {
  }
  /**
   * @param {number} clock
   */
  writeDsClock(t) {
    p(this.restEncoder, t);
  }
  /**
   * @param {number} len
   */
  writeDsLen(t) {
    p(this.restEncoder, t);
  }
}
class ee extends Us {
  /**
   * @param {ID} id
   */
  writeLeftID(t) {
    p(this.restEncoder, t.client), p(this.restEncoder, t.clock);
  }
  /**
   * @param {ID} id
   */
  writeRightID(t) {
    p(this.restEncoder, t.client), p(this.restEncoder, t.clock);
  }
  /**
   * Use writeClient and writeClock instead of writeID if possible.
   * @param {number} client
   */
  writeClient(t) {
    p(this.restEncoder, t);
  }
  /**
   * @param {number} info An unsigned 8-bit integer
   */
  writeInfo(t) {
    en(this.restEncoder, t);
  }
  /**
   * @param {string} s
   */
  writeString(t) {
    St(this.restEncoder, t);
  }
  /**
   * @param {boolean} isYKey
   */
  writeParentInfo(t) {
    p(this.restEncoder, t ? 1 : 0);
  }
  /**
   * @param {number} info An unsigned 8-bit integer
   */
  writeTypeRef(t) {
    p(this.restEncoder, t);
  }
  /**
   * Write len of a struct - well suited for Opt RLE encoder.
   *
   * @param {number} len
   */
  writeLen(t) {
    p(this.restEncoder, t);
  }
  /**
   * @param {any} any
   */
  writeAny(t) {
    Pt(this.restEncoder, t);
  }
  /**
   * @param {Uint8Array} buf
   */
  writeBuf(t) {
    U(this.restEncoder, t);
  }
  /**
   * @param {any} embed
   */
  writeJSON(t) {
    St(this.restEncoder, JSON.stringify(t));
  }
  /**
   * @param {string} key
   */
  writeKey(t) {
    St(this.restEncoder, t);
  }
}
class Ls {
  constructor() {
    this.restEncoder = v(), this.dsCurrVal = 0;
  }
  toUint8Array() {
    return A(this.restEncoder);
  }
  resetDsCurVal() {
    this.dsCurrVal = 0;
  }
  /**
   * @param {number} clock
   */
  writeDsClock(t) {
    const e = t - this.dsCurrVal;
    this.dsCurrVal = t, p(this.restEncoder, e);
  }
  /**
   * @param {number} len
   */
  writeDsLen(t) {
    t === 0 && z(), p(this.restEncoder, t - 1), this.dsCurrVal += t;
  }
}
class _t extends Ls {
  constructor() {
    super(), this.keyMap = /* @__PURE__ */ new Map(), this.keyClock = 0, this.keyClockEncoder = new Ke(), this.clientEncoder = new fe(), this.leftClockEncoder = new Ke(), this.rightClockEncoder = new Ke(), this.infoEncoder = new Kn(en), this.stringEncoder = new jr(), this.parentInfoEncoder = new Kn(en), this.typeRefEncoder = new fe(), this.lenEncoder = new fe();
  }
  toUint8Array() {
    const t = v();
    return p(t, 0), U(t, this.keyClockEncoder.toUint8Array()), U(t, this.clientEncoder.toUint8Array()), U(t, this.leftClockEncoder.toUint8Array()), U(t, this.rightClockEncoder.toUint8Array()), U(t, A(this.infoEncoder)), U(t, this.stringEncoder.toUint8Array()), U(t, A(this.parentInfoEncoder)), U(t, this.typeRefEncoder.toUint8Array()), U(t, this.lenEncoder.toUint8Array()), Te(t, A(this.restEncoder)), A(t);
  }
  /**
   * @param {ID} id
   */
  writeLeftID(t) {
    this.clientEncoder.write(t.client), this.leftClockEncoder.write(t.clock);
  }
  /**
   * @param {ID} id
   */
  writeRightID(t) {
    this.clientEncoder.write(t.client), this.rightClockEncoder.write(t.clock);
  }
  /**
   * @param {number} client
   */
  writeClient(t) {
    this.clientEncoder.write(t);
  }
  /**
   * @param {number} info An unsigned 8-bit integer
   */
  writeInfo(t) {
    this.infoEncoder.write(t);
  }
  /**
   * @param {string} s
   */
  writeString(t) {
    this.stringEncoder.write(t);
  }
  /**
   * @param {boolean} isYKey
   */
  writeParentInfo(t) {
    this.parentInfoEncoder.write(t ? 1 : 0);
  }
  /**
   * @param {number} info An unsigned 8-bit integer
   */
  writeTypeRef(t) {
    this.typeRefEncoder.write(t);
  }
  /**
   * Write len of a struct - well suited for Opt RLE encoder.
   *
   * @param {number} len
   */
  writeLen(t) {
    this.lenEncoder.write(t);
  }
  /**
   * @param {any} any
   */
  writeAny(t) {
    Pt(this.restEncoder, t);
  }
  /**
   * @param {Uint8Array} buf
   */
  writeBuf(t) {
    U(this.restEncoder, t);
  }
  /**
   * This is mainly here for legacy purposes.
   *
   * Initial we incoded objects using JSON. Now we use the much faster lib0/any-encoder. This method mainly exists for legacy purposes for the v1 encoder.
   *
   * @param {any} embed
   */
  writeJSON(t) {
    Pt(this.restEncoder, t);
  }
  /**
   * Property keys are often reused. For example, in y-prosemirror the key `bold` might
   * occur very often. For a 3d application, the key `position` might occur very often.
   *
   * We cache these keys in a Map and refer to them via a unique number.
   *
   * @param {string} key
   */
  writeKey(t) {
    const e = this.keyMap.get(t);
    e === void 0 ? (this.keyClockEncoder.write(this.keyClock++), this.stringEncoder.write(t)) : this.keyClockEncoder.write(e);
  }
}
const Bi = (n, t, e, s) => {
  s = Dt(s, t[0].id.clock);
  const r = q(t, s);
  p(n.restEncoder, t.length - r), n.writeClient(e), p(n.restEncoder, s);
  const i = t[r];
  i.write(n, s - i.id.clock);
  for (let o = r + 1; o < t.length; o++)
    t[o].write(n, 0);
}, Cn = (n, t, e) => {
  const s = /* @__PURE__ */ new Map();
  e.forEach((r, i) => {
    L(t, i) > r && s.set(i, r);
  }), xe(t).forEach((r, i) => {
    e.has(i) || s.set(i, 0);
  }), p(n.restEncoder, s.size), ht(s.entries()).sort((r, i) => i[0] - r[0]).forEach(([r, i]) => {
    Bi(n, t.clients.get(r), r, i);
  });
}, Vi = (n, t) => {
  const e = H(), s = m(n.restDecoder);
  for (let r = 0; r < s; r++) {
    const i = m(n.restDecoder), o = new Array(i), c = n.readClient();
    let l = m(n.restDecoder);
    e.set(c, { i: 0, refs: o });
    for (let a = 0; a < i; a++) {
      const h = n.readInfo();
      switch (Re & h) {
        case 0: {
          const u = n.readLen();
          o[a] = new Y(k(c, l), u), l += u;
          break;
        }
        case 10: {
          const u = m(n.restDecoder);
          o[a] = new K(k(c, l), u), l += u;
          break;
        }
        default: {
          const u = (h & (et | V)) === 0, f = new I(
            k(c, l),
            null,
            // leftd
            (h & V) === V ? n.readLeftID() : null,
            // origin
            null,
            // right
            (h & et) === et ? n.readRightID() : null,
            // right origin
            u ? n.readParentInfo() ? t.get(n.readString()) : n.readLeftID() : null,
            // parent
            u && (h & Ht) === Ht ? n.readString() : null,
            // parentSub
            nr(n, h)
            // item content
          );
          o[a] = f, l += f.length;
        }
      }
    }
  }
  return e;
}, ji = (n, t, e) => {
  const s = [];
  let r = ht(e.keys()).sort((d, g) => d - g);
  if (r.length === 0)
    return null;
  const i = () => {
    if (r.length === 0)
      return null;
    let d = (
      /** @type {{i:number,refs:Array<GC|Item>}} */
      e.get(r[r.length - 1])
    );
    for (; d.refs.length === d.i; )
      if (r.pop(), r.length > 0)
        d = /** @type {{i:number,refs:Array<GC|Item>}} */
        e.get(r[r.length - 1]);
      else
        return null;
    return d;
  };
  let o = i();
  if (o === null && s.length === 0)
    return null;
  const c = new xs(), l = /* @__PURE__ */ new Map(), a = (d, g) => {
    const w = l.get(d);
    (w == null || w > g) && l.set(d, g);
  };
  let h = (
    /** @type {any} */
    o.refs[
      /** @type {any} */
      o.i++
    ]
  );
  const u = /* @__PURE__ */ new Map(), f = () => {
    for (const d of s) {
      const g = d.id.client, w = e.get(g);
      w ? (w.i--, c.clients.set(g, w.refs.slice(w.i)), e.delete(g), w.i = 0, w.refs = []) : c.clients.set(g, [d]), r = r.filter((y) => y !== g);
    }
    s.length = 0;
  };
  for (; ; ) {
    if (h.constructor !== K) {
      const g = st(u, h.id.client, () => L(t, h.id.client)) - h.id.clock;
      if (g < 0)
        s.push(h), a(h.id.client, h.id.clock - 1), f();
      else {
        const w = h.getMissing(n, t);
        if (w !== null) {
          s.push(h);
          const y = e.get(
            /** @type {number} */
            w
          ) || { refs: [], i: 0 };
          if (y.refs.length === y.i)
            a(
              /** @type {number} */
              w,
              L(t, w)
            ), f();
          else {
            h = y.refs[y.i++];
            continue;
          }
        } else
          (g === 0 || g < h.length) && (h.integrate(n, g), u.set(h.id.client, h.id.clock + h.length));
      }
    }
    if (s.length > 0)
      h = /** @type {GC|Item} */
      s.pop();
    else if (o !== null && o.i < o.refs.length)
      h = /** @type {GC|Item} */
      o.refs[o.i++];
    else {
      if (o = i(), o === null)
        break;
      h = /** @type {GC|Item} */
      o.refs[o.i++];
    }
  }
  if (c.clients.size > 0) {
    const d = new _t();
    return Cn(d, c, /* @__PURE__ */ new Map()), p(d.restEncoder, 0), { missing: l, update: d.toUint8Array() };
  }
  return null;
}, Fi = (n, t) => Cn(n, t.doc.store, t.beforeState), Yi = (n, t, e, s = new Mt(n)) => C(t, (r) => {
  r.local = !1;
  let i = !1;
  const o = r.doc, c = o.store, l = Vi(s, o), a = ji(r, c, l), h = c.pendingStructs;
  if (h) {
    for (const [f, d] of h.missing)
      if (d < L(c, f)) {
        i = !0;
        break;
      }
    if (a) {
      for (const [f, d] of a.missing) {
        const g = h.missing.get(f);
        (g == null || g > d) && h.missing.set(f, d);
      }
      h.update = ke([h.update, a.update]);
    }
  } else
    c.pendingStructs = a;
  const u = qn(s, r, c);
  if (c.pendingDs) {
    const f = new Mt(dt(c.pendingDs));
    m(f.restDecoder);
    const d = qn(f, r, c);
    u && d ? c.pendingDs = ke([u, d]) : c.pendingDs = u || d;
  } else
    c.pendingDs = u;
  if (i) {
    const f = (
      /** @type {{update: Uint8Array}} */
      c.pendingStructs.update
    );
    c.pendingStructs = null, Rs(r.doc, f);
  }
}, e, !1), Rs = (n, t, e, s = Mt) => {
  const r = dt(t);
  Yi(r, n, e, new s(r));
}, Ki = (n, t, e) => Rs(n, t, e, As), Hi = (n, t, e = /* @__PURE__ */ new Map()) => {
  Cn(n, t.store, e), Nt(n, Ni(t.store));
}, Ji = (n, t = new Uint8Array([0]), e = new _t()) => {
  const s = Ts(t);
  Hi(e, n, s);
  const r = [e.toUint8Array()];
  if (n.store.pendingDs && r.push(n.store.pendingDs), n.store.pendingStructs && r.push(ao(n.store.pendingStructs.update, t)), r.length > 1) {
    if (e.constructor === ee)
      return co(r.map((i, o) => o === 0 ? i : uo(i)));
    if (e.constructor === _t)
      return ke(r);
  }
  return r[0];
}, Pi = (n, t) => Ji(n, t, new ee()), Gi = (n) => {
  const t = /* @__PURE__ */ new Map(), e = m(n.restDecoder);
  for (let s = 0; s < e; s++) {
    const r = m(n.restDecoder), i = m(n.restDecoder);
    t.set(r, i);
  }
  return t;
}, Ts = (n) => Gi(new Is(dt(n))), Ms = (n, t) => (p(n.restEncoder, t.size), ht(t.entries()).sort((e, s) => s[0] - e[0]).forEach(([e, s]) => {
  p(n.restEncoder, e), p(n.restEncoder, s);
}), n), Wi = (n, t) => Ms(n, xe(t.store)), zi = (n, t = new Ls()) => (n instanceof Map ? Ms(t, n) : Wi(t, n), t.toUint8Array()), qi = (n) => zi(n, new Us());
class Xi {
  constructor() {
    this.l = [];
  }
}
const Xn = () => new Xi(), Qn = (n, t) => n.l.push(t), Zn = (n, t) => {
  const e = n.l, s = e.length;
  n.l = e.filter((r) => t !== r), s === n.l.length && console.error("[yjs] Tried to remove event handler that doesn't exist.");
}, Os = (n, t, e) => Sn(n.l, [t, e]);
class Ut {
  /**
   * @param {number} client client id
   * @param {number} clock unique per client id, continuous number
   */
  constructor(t, e) {
    this.client = t, this.clock = e;
  }
}
const le = (n, t) => n === t || n !== null && t !== null && n.client === t.client && n.clock === t.clock, k = (n, t) => new Ut(n, t), Qi = (n) => {
  for (const [t, e] of n.doc.share.entries())
    if (e === n)
      return t;
  throw z();
}, Se = (n, t) => {
  for (; t !== null; ) {
    if (t.parent === n)
      return !0;
    t = /** @type {AbstractType<any>} */
    t.parent._item;
  }
  return !1;
}, jt = (n, t) => t === void 0 ? !n.deleted : t.sv.has(n.id.client) && (t.sv.get(n.id.client) || 0) > n.id.clock && !Oe(t.ds, n.id), cn = (n, t) => {
  const e = st(n.meta, cn, kt), s = n.doc.store;
  e.has(t) || (t.sv.forEach((r, i) => {
    r < L(s, i) && B(n, k(i, r));
  }), bt(n, t.ds, (r) => {
  }), e.add(t));
};
class xs {
  constructor() {
    this.clients = /* @__PURE__ */ new Map(), this.pendingStructs = null, this.pendingDs = null;
  }
}
const xe = (n) => {
  const t = /* @__PURE__ */ new Map();
  return n.clients.forEach((e, s) => {
    const r = e[e.length - 1];
    t.set(s, r.id.clock + r.length);
  }), t;
}, L = (n, t) => {
  const e = n.clients.get(t);
  if (e === void 0)
    return 0;
  const s = e[e.length - 1];
  return s.id.clock + s.length;
}, vs = (n, t) => {
  let e = n.clients.get(t.id.client);
  if (e === void 0)
    e = [], n.clients.set(t.id.client, e);
  else {
    const s = e[e.length - 1];
    if (s.id.clock + s.length !== t.id.clock)
      throw z();
  }
  e.push(t);
}, q = (n, t) => {
  let e = 0, s = n.length - 1, r = n[s], i = r.id.clock;
  if (i === t)
    return s;
  let o = nt(t / (i + r.length - 1) * s);
  for (; e <= s; ) {
    if (r = n[o], i = r.id.clock, i <= t) {
      if (t < i + r.length)
        return o;
      e = o + 1;
    } else
      s = o - 1;
    o = nt((e + s) / 2);
  }
  throw z();
}, Zi = (n, t) => {
  const e = n.clients.get(t.client);
  return e[q(e, t.clock)];
}, pe = (
  /** @type {function(StructStore,ID):Item} */
  Zi
), ln = (n, t, e) => {
  const s = q(t, e), r = t[s];
  return r.id.clock < e && r instanceof I ? (t.splice(s + 1, 0, Ie(n, r, e - r.id.clock)), s + 1) : s;
}, B = (n, t) => {
  const e = (
    /** @type {Array<Item>} */
    n.doc.store.clients.get(t.client)
  );
  return e[ln(n, e, t.clock)];
}, ts = (n, t, e) => {
  const s = t.clients.get(e.client), r = q(s, e.clock), i = s[r];
  return e.clock !== i.id.clock + i.length - 1 && i.constructor !== Y && s.splice(r + 1, 0, Ie(n, i, e.clock - i.id.clock + 1)), i;
}, to = (n, t, e) => {
  const s = (
    /** @type {Array<GC|Item>} */
    n.clients.get(t.id.client)
  );
  s[q(s, t.id.clock)] = e;
}, Ns = (n, t, e, s, r) => {
  if (s === 0)
    return;
  const i = e + s;
  let o = ln(n, t, e), c;
  do
    c = t[o++], i < c.id.clock + c.length && ln(n, t, i), r(c);
  while (o < t.length && t[o].id.clock < i);
};
class eo {
  /**
   * @param {Doc} doc
   * @param {any} origin
   * @param {boolean} local
   */
  constructor(t, e, s) {
    this.doc = t, this.deleteSet = new vt(), this.beforeState = xe(t.store), this.afterState = /* @__PURE__ */ new Map(), this.changed = /* @__PURE__ */ new Map(), this.changedParentTypes = /* @__PURE__ */ new Map(), this._mergeStructs = [], this.origin = e, this.meta = /* @__PURE__ */ new Map(), this.local = s, this.subdocsAdded = /* @__PURE__ */ new Set(), this.subdocsRemoved = /* @__PURE__ */ new Set(), this.subdocsLoaded = /* @__PURE__ */ new Set();
  }
}
const es = (n, t) => t.deleteSet.clients.size === 0 && !Sr(t.afterState, (e, s) => t.beforeState.get(s) !== e) ? !1 : (bn(t.deleteSet), Fi(n, t), Nt(n, t.deleteSet), !0), ns = (n, t, e) => {
  const s = t._item;
  (s === null || s.id.clock < (n.beforeState.get(s.id.client) || 0) && !s.deleted) && st(n.changed, t, kt).add(e);
}, we = (n, t) => {
  const e = n[t - 1], s = n[t];
  e.deleted === s.deleted && e.constructor === s.constructor && e.mergeWith(s) && (n.splice(t, 1), s instanceof I && s.parentSub !== null && /** @type {AbstractType<any>} */
  s.parent._map.get(s.parentSub) === s && s.parent._map.set(
    s.parentSub,
    /** @type {Item} */
    e
  ));
}, no = (n, t, e) => {
  for (const [s, r] of n.clients.entries()) {
    const i = (
      /** @type {Array<GC|Item>} */
      t.clients.get(s)
    );
    for (let o = r.length - 1; o >= 0; o--) {
      const c = r[o], l = c.clock + c.len;
      for (let a = q(i, c.clock), h = i[a]; a < i.length && h.id.clock < l; h = i[++a]) {
        const u = i[a];
        if (c.clock + c.len <= u.id.clock)
          break;
        u instanceof I && u.deleted && !u.keep && e(u) && u.gc(t, !1);
      }
    }
  }
}, so = (n, t) => {
  n.clients.forEach((e, s) => {
    const r = (
      /** @type {Array<GC|Item>} */
      t.clients.get(s)
    );
    for (let i = e.length - 1; i >= 0; i--) {
      const o = e[i], c = dn(r.length - 1, 1 + q(r, o.clock + o.len - 1));
      for (let l = c, a = r[l]; l > 0 && a.id.clock >= o.clock; a = r[--l])
        we(r, l);
    }
  });
}, $s = (n, t) => {
  if (t < n.length) {
    const e = n[t], s = e.doc, r = s.store, i = e.deleteSet, o = e._mergeStructs;
    try {
      bn(i), e.afterState = xe(e.doc.store), s.emit("beforeObserverCalls", [e, s]);
      const c = [];
      e.changed.forEach(
        (l, a) => c.push(() => {
          (a._item === null || !a._item.deleted) && a._callObserver(e, l);
        })
      ), c.push(() => {
        e.changedParentTypes.forEach(
          (l, a) => c.push(() => {
            (a._item === null || !a._item.deleted) && (l = l.filter(
              (h) => h.target._item === null || !h.target._item.deleted
            ), l.forEach((h) => {
              h.currentTarget = a;
            }), l.sort((h, u) => h.path.length - u.path.length), Os(a._dEH, l, e));
          })
        ), c.push(() => s.emit("afterTransaction", [e, s]));
      }), Sn(c, []);
    } finally {
      s.gc && no(i, r, s.gcFilter), so(i, r), e.afterState.forEach((h, u) => {
        const f = e.beforeState.get(u) || 0;
        if (f !== h) {
          const d = (
            /** @type {Array<GC|Item>} */
            r.clients.get(u)
          ), g = Dt(q(d, f), 1);
          for (let w = d.length - 1; w >= g; w--)
            we(d, w);
        }
      });
      for (let h = 0; h < o.length; h++) {
        const { client: u, clock: f } = o[h].id, d = (
          /** @type {Array<GC|Item>} */
          r.clients.get(u)
        ), g = q(d, f);
        g + 1 < d.length && we(d, g + 1), g > 0 && we(d, g);
      }
      if (!e.local && e.afterState.get(s.clientID) !== e.beforeState.get(s.clientID) && (Ti(Cs, ks, "[yjs] ", bs, _s, "Changed the client-id because another client seems to be using it."), s.clientID = Ds()), s.emit("afterTransactionCleanup", [e, s]), s._observers.has("update")) {
        const h = new ee();
        es(h, e) && s.emit("update", [h.toUint8Array(), e.origin, s, e]);
      }
      if (s._observers.has("updateV2")) {
        const h = new _t();
        es(h, e) && s.emit("updateV2", [h.toUint8Array(), e.origin, s, e]);
      }
      const { subdocsAdded: c, subdocsLoaded: l, subdocsRemoved: a } = e;
      (c.size > 0 || a.size > 0 || l.size > 0) && (c.forEach((h) => {
        h.clientID = s.clientID, h.collectionid == null && (h.collectionid = s.collectionid), s.subdocs.add(h);
      }), a.forEach((h) => s.subdocs.delete(h)), s.emit("subdocs", [{ loaded: l, added: c, removed: a }, s, e]), a.forEach((h) => h.destroy())), n.length <= t + 1 ? (s._transactionCleanups = [], s.emit("afterAllTransactions", [s, n])) : $s(n, t + 1);
    }
  }
}, C = (n, t, e = null, s = !0) => {
  const r = n._transactionCleanups;
  let i = !1, o = null;
  n._transaction === null && (i = !0, n._transaction = new eo(n, e, s), r.push(n._transaction), r.length === 1 && n.emit("beforeAllTransactions", [n]), n.emit("beforeTransaction", [n._transaction, n]));
  try {
    o = t(n._transaction);
  } finally {
    if (i) {
      const c = n._transaction === r[0];
      n._transaction = null, c && $s(r, 0);
    }
  }
  return o;
};
class ro {
  /**
   * @param {DeleteSet} deletions
   * @param {DeleteSet} insertions
   */
  constructor(t, e) {
    this.insertions = e, this.deletions = t, this.meta = /* @__PURE__ */ new Map();
  }
}
const ss = (n, t, e) => {
  bt(n, e.deletions, (s) => {
    s instanceof I && t.scope.some((r) => Se(r, s)) && Tn(s, !1);
  });
}, rs = (n, t, e) => {
  let s = null, r = null;
  const i = n.doc, o = n.scope;
  if (C(i, (c) => {
    for (; t.length > 0 && s === null; ) {
      const l = i.store, a = (
        /** @type {StackItem} */
        t.pop()
      ), h = /* @__PURE__ */ new Set(), u = [];
      let f = !1;
      bt(c, a.insertions, (d) => {
        if (d instanceof I) {
          if (d.redone !== null) {
            let { item: g, diff: w } = qo(l, d.id);
            w > 0 && (g = B(c, k(g.id.client, g.id.clock + w))), d = g;
          }
          !d.deleted && o.some((g) => Se(
            g,
            /** @type {Item} */
            d
          )) && u.push(d);
        }
      }), bt(c, a.deletions, (d) => {
        d instanceof I && o.some((g) => Se(g, d)) && // Never redo structs in stackItem.insertions because they were created and deleted in the same capture interval.
        !Oe(a.insertions, d.id) && h.add(d);
      }), h.forEach((d) => {
        f = er(c, d, h, a.insertions, n.ignoreRemoteMapChanges) !== null || f;
      });
      for (let d = u.length - 1; d >= 0; d--) {
        const g = u[d];
        n.deleteFilter(g) && (g.delete(c), f = !0);
      }
      s = f ? a : null;
    }
    c.changed.forEach((l, a) => {
      l.has(null) && a._searchMarker && (a._searchMarker.length = 0);
    }), r = c;
  }, n), s != null) {
    const c = r.changedParentTypes;
    n.emit("stack-item-popped", [{ stackItem: s, type: e, changedParentTypes: c }, n]);
  }
  return s;
};
class io extends Le {
  /**
   * @param {AbstractType<any>|Array<AbstractType<any>>} typeScope Accepts either a single type, or an array of types
   * @param {UndoManagerOptions} options
   */
  constructor(t, {
    captureTimeout: e = 500,
    captureTransaction: s = (l) => !0,
    deleteFilter: r = () => !0,
    trackedOrigins: i = /* @__PURE__ */ new Set([null]),
    ignoreRemoteMapChanges: o = !1,
    doc: c = (
      /** @type {Doc} */
      Ze(t) ? t[0].doc : t.doc
    )
  } = {}) {
    super(), this.scope = [], this.addToScope(t), this.deleteFilter = r, i.add(this), this.trackedOrigins = i, this.captureTransaction = s, this.undoStack = [], this.redoStack = [], this.undoing = !1, this.redoing = !1, this.doc = c, this.lastChange = 0, this.ignoreRemoteMapChanges = o, this.captureTimeout = e, this.afterTransactionHandler = (l) => {
      if (!this.captureTransaction(l) || !this.scope.some((y) => l.changedParentTypes.has(y)) || !this.trackedOrigins.has(l.origin) && (!l.origin || !this.trackedOrigins.has(l.origin.constructor)))
        return;
      const a = this.undoing, h = this.redoing, u = a ? this.redoStack : this.undoStack;
      a ? this.stopCapturing() : h || this.clear(!1, !0);
      const f = new vt();
      l.afterState.forEach((y, $) => {
        const P = l.beforeState.get($) || 0, ft = y - P;
        ft > 0 && Wt(f, $, P, ft);
      });
      const d = ut();
      let g = !1;
      if (this.lastChange > 0 && d - this.lastChange < this.captureTimeout && u.length > 0 && !a && !h) {
        const y = u[u.length - 1];
        y.deletions = on([y.deletions, l.deleteSet]), y.insertions = on([y.insertions, f]);
      } else
        u.push(new ro(l.deleteSet, f)), g = !0;
      !a && !h && (this.lastChange = d), bt(
        l,
        l.deleteSet,
        /** @param {Item|GC} item */
        (y) => {
          y instanceof I && this.scope.some(($) => Se($, y)) && Tn(y, !0);
        }
      );
      const w = [{ stackItem: u[u.length - 1], origin: l.origin, type: a ? "redo" : "undo", changedParentTypes: l.changedParentTypes }, this];
      g ? this.emit("stack-item-added", w) : this.emit("stack-item-updated", w);
    }, this.doc.on("afterTransaction", this.afterTransactionHandler), this.doc.on("destroy", () => {
      this.destroy();
    });
  }
  /**
   * @param {Array<AbstractType<any>> | AbstractType<any>} ytypes
   */
  addToScope(t) {
    t = Ze(t) ? t : [t], t.forEach((e) => {
      this.scope.every((s) => s !== e) && this.scope.push(e);
    });
  }
  /**
   * @param {any} origin
   */
  addTrackedOrigin(t) {
    this.trackedOrigins.add(t);
  }
  /**
   * @param {any} origin
   */
  removeTrackedOrigin(t) {
    this.trackedOrigins.delete(t);
  }
  clear(t = !0, e = !0) {
    (t && this.canUndo() || e && this.canRedo()) && this.doc.transact((s) => {
      t && (this.undoStack.forEach((r) => ss(s, this, r)), this.undoStack = []), e && (this.redoStack.forEach((r) => ss(s, this, r)), this.redoStack = []), this.emit("stack-cleared", [{ undoStackCleared: t, redoStackCleared: e }]);
    });
  }
  /**
   * UndoManager merges Undo-StackItem if they are created within time-gap
   * smaller than `options.captureTimeout`. Call `um.stopCapturing()` so that the next
   * StackItem won't be merged.
   *
   *
   * @example
   *     // without stopCapturing
   *     ytext.insert(0, 'a')
   *     ytext.insert(1, 'b')
   *     um.undo()
   *     ytext.toString() // => '' (note that 'ab' was removed)
   *     // with stopCapturing
   *     ytext.insert(0, 'a')
   *     um.stopCapturing()
   *     ytext.insert(0, 'b')
   *     um.undo()
   *     ytext.toString() // => 'a' (note that only 'b' was removed)
   *
   */
  stopCapturing() {
    this.lastChange = 0;
  }
  /**
   * Undo last changes on type.
   *
   * @return {StackItem?} Returns StackItem if a change was applied
   */
  undo() {
    this.undoing = !0;
    let t;
    try {
      t = rs(this, this.undoStack, "undo");
    } finally {
      this.undoing = !1;
    }
    return t;
  }
  /**
   * Redo last undo operation.
   *
   * @return {StackItem?} Returns StackItem if a change was applied
   */
  redo() {
    this.redoing = !0;
    let t;
    try {
      t = rs(this, this.redoStack, "redo");
    } finally {
      this.redoing = !1;
    }
    return t;
  }
  /**
   * Are undo steps available?
   *
   * @return {boolean} `true` if undo is possible
   */
  canUndo() {
    return this.undoStack.length > 0;
  }
  /**
   * Are redo steps available?
   *
   * @return {boolean} `true` if redo is possible
   */
  canRedo() {
    return this.redoStack.length > 0;
  }
  destroy() {
    this.trackedOrigins.delete(this), this.doc.off("afterTransaction", this.afterTransactionHandler), super.destroy();
  }
}
function* oo(n) {
  const t = m(n.restDecoder);
  for (let e = 0; e < t; e++) {
    const s = m(n.restDecoder), r = n.readClient();
    let i = m(n.restDecoder);
    for (let o = 0; o < s; o++) {
      const c = n.readInfo();
      if (c === 10) {
        const l = m(n.restDecoder);
        yield new K(k(r, i), l), i += l;
      } else if (Re & c) {
        const l = (c & (et | V)) === 0, a = new I(
          k(r, i),
          null,
          // left
          (c & V) === V ? n.readLeftID() : null,
          // origin
          null,
          // right
          (c & et) === et ? n.readRightID() : null,
          // right origin
          // @ts-ignore Force writing a string here.
          l ? n.readParentInfo() ? n.readString() : n.readLeftID() : null,
          // parent
          l && (c & Ht) === Ht ? n.readString() : null,
          // parentSub
          nr(n, c)
          // item content
        );
        yield a, i += a.length;
      } else {
        const l = n.readLen();
        yield new Y(k(r, i), l), i += l;
      }
    }
  }
}
class En {
  /**
   * @param {UpdateDecoderV1 | UpdateDecoderV2} decoder
   * @param {boolean} filterSkips
   */
  constructor(t, e) {
    this.gen = oo(t), this.curr = null, this.done = !1, this.filterSkips = e, this.next();
  }
  /**
   * @return {Item | GC | Skip |null}
   */
  next() {
    do
      this.curr = this.gen.next().value || null;
    while (this.filterSkips && this.curr !== null && this.curr.constructor === K);
    return this.curr;
  }
}
class Dn {
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   */
  constructor(t) {
    this.currClient = 0, this.startClock = 0, this.written = 0, this.encoder = t, this.clientStructs = [];
  }
}
const co = (n) => ke(n, As, ee), lo = (n, t) => {
  if (n.constructor === Y) {
    const { client: e, clock: s } = n.id;
    return new Y(k(e, s + t), n.length - t);
  } else if (n.constructor === K) {
    const { client: e, clock: s } = n.id;
    return new K(k(e, s + t), n.length - t);
  } else {
    const e = (
      /** @type {Item} */
      n
    ), { client: s, clock: r } = e.id;
    return new I(
      k(s, r + t),
      null,
      k(s, r + t - 1),
      null,
      e.rightOrigin,
      e.parent,
      e.parentSub,
      e.content.splice(t)
    );
  }
}, ke = (n, t = Mt, e = _t) => {
  if (n.length === 1)
    return n[0];
  const s = n.map((h) => new t(dt(h)));
  let r = s.map((h) => new En(h, !0)), i = null;
  const o = new e(), c = new Dn(o);
  for (; r = r.filter((f) => f.curr !== null), r.sort(
    /** @type {function(any,any):number} */
    (f, d) => {
      if (f.curr.id.client === d.curr.id.client) {
        const g = f.curr.id.clock - d.curr.id.clock;
        return g === 0 ? f.curr.constructor === d.curr.constructor ? 0 : f.curr.constructor === K ? 1 : -1 : g;
      } else
        return d.curr.id.client - f.curr.id.client;
    }
  ), r.length !== 0; ) {
    const h = r[0], u = (
      /** @type {Item | GC} */
      h.curr.id.client
    );
    if (i !== null) {
      let f = (
        /** @type {Item | GC | null} */
        h.curr
      ), d = !1;
      for (; f !== null && f.id.clock + f.length <= i.struct.id.clock + i.struct.length && f.id.client >= i.struct.id.client; )
        f = h.next(), d = !0;
      if (f === null || // current decoder is empty
      f.id.client !== u || // check whether there is another decoder that has has updates from `firstClient`
      d && f.id.clock > i.struct.id.clock + i.struct.length)
        continue;
      if (u !== i.struct.id.client)
        ot(c, i.struct, i.offset), i = { struct: f, offset: 0 }, h.next();
      else if (i.struct.id.clock + i.struct.length < f.id.clock)
        if (i.struct.constructor === K)
          i.struct.length = f.id.clock + f.length - i.struct.id.clock;
        else {
          ot(c, i.struct, i.offset);
          const g = f.id.clock - i.struct.id.clock - i.struct.length;
          i = { struct: new K(k(u, i.struct.id.clock + i.struct.length), g), offset: 0 };
        }
      else {
        const g = i.struct.id.clock + i.struct.length - f.id.clock;
        g > 0 && (i.struct.constructor === K ? i.struct.length -= g : f = lo(f, g)), i.struct.mergeWith(
          /** @type {any} */
          f
        ) || (ot(c, i.struct, i.offset), i = { struct: f, offset: 0 }, h.next());
      }
    } else
      i = { struct: (
        /** @type {Item | GC} */
        h.curr
      ), offset: 0 }, h.next();
    for (let f = h.curr; f !== null && f.id.client === u && f.id.clock === i.struct.id.clock + i.struct.length && f.constructor !== K; f = h.next())
      ot(c, i.struct, i.offset), i = { struct: f, offset: 0 };
  }
  i !== null && (ot(c, i.struct, i.offset), i = null), In(c);
  const l = s.map((h) => _n(h)), a = on(l);
  return Nt(o, a), o.toUint8Array();
}, ao = (n, t, e = Mt, s = _t) => {
  const r = Ts(t), i = new s(), o = new Dn(i), c = new e(dt(n)), l = new En(c, !1);
  for (; l.curr; ) {
    const h = l.curr, u = h.id.client, f = r.get(u) || 0;
    if (l.curr.constructor === K) {
      l.next();
      continue;
    }
    if (h.id.clock + h.length > f)
      for (ot(o, h, Dt(f - h.id.clock, 0)), l.next(); l.curr && l.curr.id.client === u; )
        ot(o, l.curr, 0), l.next();
    else
      for (; l.curr && l.curr.id.client === u && l.curr.id.clock + l.curr.length <= f; )
        l.next();
  }
  In(o);
  const a = _n(c);
  return Nt(i, a), i.toUint8Array();
}, Bs = (n) => {
  n.written > 0 && (n.clientStructs.push({ written: n.written, restEncoder: A(n.encoder.restEncoder) }), n.encoder.restEncoder = v(), n.written = 0);
}, ot = (n, t, e) => {
  n.written > 0 && n.currClient !== t.id.client && Bs(n), n.written === 0 && (n.currClient = t.id.client, n.encoder.writeClient(t.id.client), p(n.encoder.restEncoder, t.id.clock + e)), t.write(n.encoder, e), n.written++;
}, In = (n) => {
  Bs(n);
  const t = n.encoder.restEncoder;
  p(t, n.clientStructs.length);
  for (let e = 0; e < n.clientStructs.length; e++) {
    const s = n.clientStructs[e];
    p(t, s.written), Te(t, s.restEncoder);
  }
}, ho = (n, t, e) => {
  const s = new t(dt(n)), r = new En(s, !1), i = new e(), o = new Dn(i);
  for (let l = r.curr; l !== null; l = r.next())
    ot(o, l, 0);
  In(o);
  const c = _n(s);
  return Nt(i, c), i.toUint8Array();
}, uo = (n) => ho(n, Mt, ee);
class ve {
  /**
   * @param {T} target The changed type.
   * @param {Transaction} transaction
   */
  constructor(t, e) {
    this.target = t, this.currentTarget = t, this.transaction = e, this._changes = null, this._keys = null, this._delta = null;
  }
  /**
   * Computes the path from `y` to the changed type.
   *
   * @todo v14 should standardize on path: Array<{parent, index}> because that is easier to work with.
   *
   * The following property holds:
   * @example
   *   let type = y
   *   event.path.forEach(dir => {
   *     type = type.get(dir)
   *   })
   *   type === event.target // => true
   */
  get path() {
    return fo(this.currentTarget, this.target);
  }
  /**
   * Check if a struct is deleted by this event.
   *
   * In contrast to change.deleted, this method also returns true if the struct was added and then deleted.
   *
   * @param {AbstractStruct} struct
   * @return {boolean}
   */
  deletes(t) {
    return Oe(this.transaction.deleteSet, t.id);
  }
  /**
   * @type {Map<string, { action: 'add' | 'update' | 'delete', oldValue: any, newValue: any }>}
   */
  get keys() {
    if (this._keys === null) {
      const t = /* @__PURE__ */ new Map(), e = this.target;
      /** @type Set<string|null> */
      this.transaction.changed.get(e).forEach((r) => {
        if (r !== null) {
          const i = (
            /** @type {Item} */
            e._map.get(r)
          );
          let o, c;
          if (this.adds(i)) {
            let l = i.left;
            for (; l !== null && this.adds(l); )
              l = l.left;
            if (this.deletes(i))
              if (l !== null && this.deletes(l))
                o = "delete", c = je(l.content.getContent());
              else
                return;
            else
              l !== null && this.deletes(l) ? (o = "update", c = je(l.content.getContent())) : (o = "add", c = void 0);
          } else if (this.deletes(i))
            o = "delete", c = je(
              /** @type {Item} */
              i.content.getContent()
            );
          else
            return;
          t.set(r, { action: o, oldValue: c });
        }
      }), this._keys = t;
    }
    return this._keys;
  }
  /**
   * This is a computed property. Note that this can only be safely computed during the
   * event call. Computing this property after other changes happened might result in
   * unexpected behavior (incorrect computation of deltas). A safe way to collect changes
   * is to store the `changes` or the `delta` object. Avoid storing the `transaction` object.
   *
   * @type {Array<{insert?: string | Array<any> | object | AbstractType<any>, retain?: number, delete?: number, attributes?: Object<string, any>}>}
   */
  get delta() {
    return this.changes.delta;
  }
  /**
   * Check if a struct is added by this event.
   *
   * In contrast to change.deleted, this method also returns true if the struct was added and then deleted.
   *
   * @param {AbstractStruct} struct
   * @return {boolean}
   */
  adds(t) {
    return t.id.clock >= (this.transaction.beforeState.get(t.id.client) || 0);
  }
  /**
   * This is a computed property. Note that this can only be safely computed during the
   * event call. Computing this property after other changes happened might result in
   * unexpected behavior (incorrect computation of deltas). A safe way to collect changes
   * is to store the `changes` or the `delta` object. Avoid storing the `transaction` object.
   *
   * @type {{added:Set<Item>,deleted:Set<Item>,keys:Map<string,{action:'add'|'update'|'delete',oldValue:any}>,delta:Array<{insert?:Array<any>|string, delete?:number, retain?:number}>}}
   */
  get changes() {
    let t = this._changes;
    if (t === null) {
      const e = this.target, s = kt(), r = kt(), i = [];
      if (t = {
        added: s,
        deleted: r,
        delta: i,
        keys: this.keys
      }, /** @type Set<string|null> */
      this.transaction.changed.get(e).has(null)) {
        let c = null;
        const l = () => {
          c && i.push(c);
        };
        for (let a = e._start; a !== null; a = a.right)
          a.deleted ? this.deletes(a) && !this.adds(a) && ((c === null || c.delete === void 0) && (l(), c = { delete: 0 }), c.delete += a.length, r.add(a)) : this.adds(a) ? ((c === null || c.insert === void 0) && (l(), c = { insert: [] }), c.insert = c.insert.concat(a.content.getContent()), s.add(a)) : ((c === null || c.retain === void 0) && (l(), c = { retain: 0 }), c.retain += a.length);
        c !== null && c.retain === void 0 && l();
      }
      this._changes = t;
    }
    return (
      /** @type {any} */
      t
    );
  }
}
const fo = (n, t) => {
  const e = [];
  for (; t._item !== null && t !== n; ) {
    if (t._item.parentSub !== null)
      e.unshift(t._item.parentSub);
    else {
      let s = 0, r = (
        /** @type {AbstractType<any>} */
        t._item.parent._start
      );
      for (; r !== t._item && r !== null; )
        r.deleted || s++, r = r.right;
      e.unshift(s);
    }
    t = /** @type {AbstractType<any>} */
    t._item.parent;
  }
  return e;
}, Vs = 80;
let An = 0;
class go {
  /**
   * @param {Item} p
   * @param {number} index
   */
  constructor(t, e) {
    t.marker = !0, this.p = t, this.index = e, this.timestamp = An++;
  }
}
const po = (n) => {
  n.timestamp = An++;
}, js = (n, t, e) => {
  n.p.marker = !1, n.p = t, t.marker = !0, n.index = e, n.timestamp = An++;
}, wo = (n, t, e) => {
  if (n.length >= Vs) {
    const s = n.reduce((r, i) => r.timestamp < i.timestamp ? r : i);
    return js(s, t, e), s;
  } else {
    const s = new go(t, e);
    return n.push(s), s;
  }
}, Ne = (n, t) => {
  if (n._start === null || t === 0 || n._searchMarker === null)
    return null;
  const e = n._searchMarker.length === 0 ? null : n._searchMarker.reduce((i, o) => de(t - i.index) < de(t - o.index) ? i : o);
  let s = n._start, r = 0;
  for (e !== null && (s = e.p, r = e.index, po(e)); s.right !== null && r < t; ) {
    if (!s.deleted && s.countable) {
      if (t < r + s.length)
        break;
      r += s.length;
    }
    s = s.right;
  }
  for (; s.left !== null && r > t; )
    s = s.left, !s.deleted && s.countable && (r -= s.length);
  for (; s.left !== null && s.left.id.client === s.id.client && s.left.id.clock + s.left.length === s.id.clock; )
    s = s.left, !s.deleted && s.countable && (r -= s.length);
  return e !== null && de(e.index - r) < /** @type {YText|YArray<any>} */
  s.parent.length / Vs ? (js(e, s, r), e) : wo(n._searchMarker, s, r);
}, zt = (n, t, e) => {
  for (let s = n.length - 1; s >= 0; s--) {
    const r = n[s];
    if (e > 0) {
      let i = r.p;
      for (i.marker = !1; i && (i.deleted || !i.countable); )
        i = i.left, i && !i.deleted && i.countable && (r.index -= i.length);
      if (i === null || i.marker === !0) {
        n.splice(s, 1);
        continue;
      }
      r.p = i, i.marker = !0;
    }
    (t < r.index || e > 0 && t === r.index) && (r.index = Dt(t, r.index + e));
  }
}, $e = (n, t, e) => {
  const s = n, r = t.changedParentTypes;
  for (; st(r, n, () => []).push(e), n._item !== null; )
    n = /** @type {AbstractType<any>} */
    n._item.parent;
  Os(s._eH, e, t);
};
class M {
  constructor() {
    this._item = null, this._map = /* @__PURE__ */ new Map(), this._start = null, this.doc = null, this._length = 0, this._eH = Xn(), this._dEH = Xn(), this._searchMarker = null;
  }
  /**
   * @return {AbstractType<any>|null}
   */
  get parent() {
    return this._item ? (
      /** @type {AbstractType<any>} */
      this._item.parent
    ) : null;
  }
  /**
   * Integrate this type into the Yjs instance.
   *
   * * Save this struct in the os
   * * This type is sent to other client
   * * Observer functions are fired
   *
   * @param {Doc} y The Yjs instance
   * @param {Item|null} item
   */
  _integrate(t, e) {
    this.doc = t, this._item = e;
  }
  /**
   * @return {AbstractType<EventType>}
   */
  _copy() {
    throw W();
  }
  /**
   * @return {AbstractType<EventType>}
   */
  clone() {
    throw W();
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} _encoder
   */
  _write(t) {
  }
  /**
   * The first non-deleted item
   */
  get _first() {
    let t = this._start;
    for (; t !== null && t.deleted; )
      t = t.right;
    return t;
  }
  /**
   * Creates YEvent and calls all type observers.
   * Must be implemented by each type.
   *
   * @param {Transaction} transaction
   * @param {Set<null|string>} _parentSubs Keys changed on this type. `null` if list was modified.
   */
  _callObserver(t, e) {
    !t.local && this._searchMarker && (this._searchMarker.length = 0);
  }
  /**
   * Observe all events that are created on this type.
   *
   * @param {function(EventType, Transaction):void} f Observer function
   */
  observe(t) {
    Qn(this._eH, t);
  }
  /**
   * Observe all events that are created by this type and its children.
   *
   * @param {function(Array<YEvent<any>>,Transaction):void} f Observer function
   */
  observeDeep(t) {
    Qn(this._dEH, t);
  }
  /**
   * Unregister an observer function.
   *
   * @param {function(EventType,Transaction):void} f Observer function
   */
  unobserve(t) {
    Zn(this._eH, t);
  }
  /**
   * Unregister an observer function.
   *
   * @param {function(Array<YEvent<any>>,Transaction):void} f Observer function
   */
  unobserveDeep(t) {
    Zn(this._dEH, t);
  }
  /**
   * @abstract
   * @return {any}
   */
  toJSON() {
  }
}
const Fs = (n, t, e) => {
  t < 0 && (t = n._length + t), e < 0 && (e = n._length + e);
  let s = e - t;
  const r = [];
  let i = n._start;
  for (; i !== null && s > 0; ) {
    if (i.countable && !i.deleted) {
      const o = i.content.getContent();
      if (o.length <= t)
        t -= o.length;
      else {
        for (let c = t; c < o.length && s > 0; c++)
          r.push(o[c]), s--;
        t = 0;
      }
    }
    i = i.right;
  }
  return r;
}, Ys = (n) => {
  const t = [];
  let e = n._start;
  for (; e !== null; ) {
    if (e.countable && !e.deleted) {
      const s = e.content.getContent();
      for (let r = 0; r < s.length; r++)
        t.push(s[r]);
    }
    e = e.right;
  }
  return t;
}, qt = (n, t) => {
  let e = 0, s = n._start;
  for (; s !== null; ) {
    if (s.countable && !s.deleted) {
      const r = s.content.getContent();
      for (let i = 0; i < r.length; i++)
        t(r[i], e++, n);
    }
    s = s.right;
  }
}, Ks = (n, t) => {
  const e = [];
  return qt(n, (s, r) => {
    e.push(t(s, r, n));
  }), e;
}, yo = (n) => {
  let t = n._start, e = null, s = 0;
  return {
    [Symbol.iterator]() {
      return this;
    },
    next: () => {
      if (e === null) {
        for (; t !== null && t.deleted; )
          t = t.right;
        if (t === null)
          return {
            done: !0,
            value: void 0
          };
        e = t.content.getContent(), s = 0, t = t.right;
      }
      const r = e[s++];
      return e.length <= s && (e = null), {
        done: !1,
        value: r
      };
    }
  };
}, Hs = (n, t) => {
  const e = Ne(n, t);
  let s = n._start;
  for (e !== null && (s = e.p, t -= e.index); s !== null; s = s.right)
    if (!s.deleted && s.countable) {
      if (t < s.length)
        return s.content.getContent()[t];
      t -= s.length;
    }
}, be = (n, t, e, s) => {
  let r = e;
  const i = n.doc, o = i.clientID, c = i.store, l = e === null ? t._start : e.right;
  let a = [];
  const h = () => {
    a.length > 0 && (r = new I(k(o, L(c, o)), r, r && r.lastId, l, l && l.id, t, null, new Et(a)), r.integrate(n, 0), a = []);
  };
  s.forEach((u) => {
    if (u === null)
      a.push(u);
    else
      switch (u.constructor) {
        case Number:
        case Object:
        case Boolean:
        case Array:
        case String:
          a.push(u);
          break;
        default:
          switch (h(), u.constructor) {
            case Uint8Array:
            case ArrayBuffer:
              r = new I(k(o, L(c, o)), r, r && r.lastId, l, l && l.id, t, null, new ne(new Uint8Array(
                /** @type {Uint8Array} */
                u
              ))), r.integrate(n, 0);
              break;
            case $t:
              r = new I(k(o, L(c, o)), r, r && r.lastId, l, l && l.id, t, null, new se(
                /** @type {Doc} */
                u
              )), r.integrate(n, 0);
              break;
            default:
              if (u instanceof M)
                r = new I(k(o, L(c, o)), r, r && r.lastId, l, l && l.id, t, null, new it(u)), r.integrate(n, 0);
              else
                throw new Error("Unexpected content type in insert operation");
          }
      }
  }), h();
}, Js = xt("Length exceeded!"), Ps = (n, t, e, s) => {
  if (e > t._length)
    throw Js;
  if (e === 0)
    return t._searchMarker && zt(t._searchMarker, e, s.length), be(n, t, null, s);
  const r = e, i = Ne(t, e);
  let o = t._start;
  for (i !== null && (o = i.p, e -= i.index, e === 0 && (o = o.prev, e += o && o.countable && !o.deleted ? o.length : 0)); o !== null; o = o.right)
    if (!o.deleted && o.countable) {
      if (e <= o.length) {
        e < o.length && B(n, k(o.id.client, o.id.clock + e));
        break;
      }
      e -= o.length;
    }
  return t._searchMarker && zt(t._searchMarker, r, s.length), be(n, t, o, s);
}, mo = (n, t, e) => {
  let r = (t._searchMarker || []).reduce((i, o) => o.index > i.index ? o : i, { index: 0, p: t._start }).p;
  if (r)
    for (; r.right; )
      r = r.right;
  return be(n, t, r, e);
}, Gs = (n, t, e, s) => {
  if (s === 0)
    return;
  const r = e, i = s, o = Ne(t, e);
  let c = t._start;
  for (o !== null && (c = o.p, e -= o.index); c !== null && e > 0; c = c.right)
    !c.deleted && c.countable && (e < c.length && B(n, k(c.id.client, c.id.clock + e)), e -= c.length);
  for (; s > 0 && c !== null; )
    c.deleted || (s < c.length && B(n, k(c.id.client, c.id.clock + s)), c.delete(n), s -= c.length), c = c.right;
  if (s > 0)
    throw Js;
  t._searchMarker && zt(
    t._searchMarker,
    r,
    -i + s
    /* in case we remove the above exception */
  );
}, _e = (n, t, e) => {
  const s = t._map.get(e);
  s !== void 0 && s.delete(n);
}, Un = (n, t, e, s) => {
  const r = t._map.get(e) || null, i = n.doc, o = i.clientID;
  let c;
  if (s == null)
    c = new Et([s]);
  else
    switch (s.constructor) {
      case Number:
      case Object:
      case Boolean:
      case Array:
      case String:
        c = new Et([s]);
        break;
      case Uint8Array:
        c = new ne(
          /** @type {Uint8Array} */
          s
        );
        break;
      case $t:
        c = new se(
          /** @type {Doc} */
          s
        );
        break;
      default:
        if (s instanceof M)
          c = new it(s);
        else
          throw new Error("Unexpected content type");
    }
  new I(k(o, L(i.store, o)), r, r && r.lastId, null, null, t, e, c).integrate(n, 0);
}, Ln = (n, t) => {
  const e = n._map.get(t);
  return e !== void 0 && !e.deleted ? e.content.getContent()[e.length - 1] : void 0;
}, Ws = (n) => {
  const t = {};
  return n._map.forEach((e, s) => {
    e.deleted || (t[s] = e.content.getContent()[e.length - 1]);
  }), t;
}, zs = (n, t) => {
  const e = n._map.get(t);
  return e !== void 0 && !e.deleted;
}, ae = (n) => Oi(
  n.entries(),
  /** @param {any} entry */
  (t) => !t[1].deleted
);
class So extends ve {
  /**
   * @param {YArray<T>} yarray The changed type
   * @param {Transaction} transaction The transaction object
   */
  constructor(t, e) {
    super(t, e), this._transaction = e;
  }
}
class J extends M {
  constructor() {
    super(), this._prelimContent = [], this._searchMarker = [];
  }
  /**
   * Construct a new YArray containing the specified items.
   * @template {Object<string,any>|Array<any>|number|null|string|Uint8Array} T
   * @param {Array<T>} items
   * @return {YArray<T>}
   */
  static from(t) {
    const e = new J();
    return e.push(t), e;
  }
  /**
   * Integrate this type into the Yjs instance.
   *
   * * Save this struct in the os
   * * This type is sent to other client
   * * Observer functions are fired
   *
   * @param {Doc} y The Yjs instance
   * @param {Item} item
   */
  _integrate(t, e) {
    super._integrate(t, e), this.insert(
      0,
      /** @type {Array<any>} */
      this._prelimContent
    ), this._prelimContent = null;
  }
  /**
   * @return {YArray<T>}
   */
  _copy() {
    return new J();
  }
  /**
   * @return {YArray<T>}
   */
  clone() {
    const t = new J();
    return t.insert(0, this.toArray().map(
      (e) => e instanceof M ? (
        /** @type {typeof el} */
        e.clone()
      ) : e
    )), t;
  }
  get length() {
    return this._prelimContent === null ? this._length : this._prelimContent.length;
  }
  /**
   * Creates YArrayEvent and calls observers.
   *
   * @param {Transaction} transaction
   * @param {Set<null|string>} parentSubs Keys changed on this type. `null` if list was modified.
   */
  _callObserver(t, e) {
    super._callObserver(t, e), $e(this, t, new So(this, t));
  }
  /**
   * Inserts new content at an index.
   *
   * Important: This function expects an array of content. Not just a content
   * object. The reason for this "weirdness" is that inserting several elements
   * is very efficient when it is done as a single operation.
   *
   * @example
   *  // Insert character 'a' at position 0
   *  yarray.insert(0, ['a'])
   *  // Insert numbers 1, 2 at position 1
   *  yarray.insert(1, [1, 2])
   *
   * @param {number} index The index to insert content at.
   * @param {Array<T>} content The array of content
   */
  insert(t, e) {
    this.doc !== null ? C(this.doc, (s) => {
      Ps(
        s,
        this,
        t,
        /** @type {any} */
        e
      );
    }) : this._prelimContent.splice(t, 0, ...e);
  }
  /**
   * Appends content to this YArray.
   *
   * @param {Array<T>} content Array of content to append.
   *
   * @todo Use the following implementation in all types.
   */
  push(t) {
    this.doc !== null ? C(this.doc, (e) => {
      mo(
        e,
        this,
        /** @type {any} */
        t
      );
    }) : this._prelimContent.push(...t);
  }
  /**
   * Preppends content to this YArray.
   *
   * @param {Array<T>} content Array of content to preppend.
   */
  unshift(t) {
    this.insert(0, t);
  }
  /**
   * Deletes elements starting from an index.
   *
   * @param {number} index Index at which to start deleting elements
   * @param {number} length The number of elements to remove. Defaults to 1.
   */
  delete(t, e = 1) {
    this.doc !== null ? C(this.doc, (s) => {
      Gs(s, this, t, e);
    }) : this._prelimContent.splice(t, e);
  }
  /**
   * Returns the i-th element from a YArray.
   *
   * @param {number} index The index of the element to return from the YArray
   * @return {T}
   */
  get(t) {
    return Hs(this, t);
  }
  /**
   * Transforms this YArray to a JavaScript Array.
   *
   * @return {Array<T>}
   */
  toArray() {
    return Ys(this);
  }
  /**
   * Transforms this YArray to a JavaScript Array.
   *
   * @param {number} [start]
   * @param {number} [end]
   * @return {Array<T>}
   */
  slice(t = 0, e = this.length) {
    return Fs(this, t, e);
  }
  /**
   * Transforms this Shared Type to a JSON object.
   *
   * @return {Array<any>}
   */
  toJSON() {
    return this.map((t) => t instanceof M ? t.toJSON() : t);
  }
  /**
   * Returns an Array with the result of calling a provided function on every
   * element of this YArray.
   *
   * @template M
   * @param {function(T,number,YArray<T>):M} f Function that produces an element of the new Array
   * @return {Array<M>} A new array with each element being the result of the
   *                 callback function
   */
  map(t) {
    return Ks(
      this,
      /** @type {any} */
      t
    );
  }
  /**
   * Executes a provided function on once on overy element of this YArray.
   *
   * @param {function(T,number,YArray<T>):void} f A function to execute on every element of this YArray.
   */
  forEach(t) {
    qt(this, t);
  }
  /**
   * @return {IterableIterator<T>}
   */
  [Symbol.iterator]() {
    return yo(this);
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   */
  _write(t) {
    t.writeTypeRef(Yo);
  }
}
const ko = (n) => new J();
class bo extends ve {
  /**
   * @param {YMap<T>} ymap The YArray that changed.
   * @param {Transaction} transaction
   * @param {Set<any>} subs The keys that changed.
   */
  constructor(t, e, s) {
    super(t, e), this.keysChanged = s;
  }
}
class X extends M {
  /**
   *
   * @param {Iterable<readonly [string, any]>=} entries - an optional iterable to initialize the YMap
   */
  constructor(t) {
    super(), this._prelimContent = null, t === void 0 ? this._prelimContent = /* @__PURE__ */ new Map() : this._prelimContent = new Map(t);
  }
  /**
   * Integrate this type into the Yjs instance.
   *
   * * Save this struct in the os
   * * This type is sent to other client
   * * Observer functions are fired
   *
   * @param {Doc} y The Yjs instance
   * @param {Item} item
   */
  _integrate(t, e) {
    super._integrate(t, e), this._prelimContent.forEach((s, r) => {
      this.set(r, s);
    }), this._prelimContent = null;
  }
  /**
   * @return {YMap<MapType>}
   */
  _copy() {
    return new X();
  }
  /**
   * @return {YMap<MapType>}
   */
  clone() {
    const t = new X();
    return this.forEach((e, s) => {
      t.set(s, e instanceof M ? (
        /** @type {typeof value} */
        e.clone()
      ) : e);
    }), t;
  }
  /**
   * Creates YMapEvent and calls observers.
   *
   * @param {Transaction} transaction
   * @param {Set<null|string>} parentSubs Keys changed on this type. `null` if list was modified.
   */
  _callObserver(t, e) {
    $e(this, t, new bo(this, t, e));
  }
  /**
   * Transforms this Shared Type to a JSON object.
   *
   * @return {Object<string,any>}
   */
  toJSON() {
    const t = {};
    return this._map.forEach((e, s) => {
      if (!e.deleted) {
        const r = e.content.getContent()[e.length - 1];
        t[s] = r instanceof M ? r.toJSON() : r;
      }
    }), t;
  }
  /**
   * Returns the size of the YMap (count of key/value pairs)
   *
   * @return {number}
   */
  get size() {
    return [...ae(this._map)].length;
  }
  /**
   * Returns the keys for each element in the YMap Type.
   *
   * @return {IterableIterator<string>}
   */
  keys() {
    return Je(
      ae(this._map),
      /** @param {any} v */
      (t) => t[0]
    );
  }
  /**
   * Returns the values for each element in the YMap Type.
   *
   * @return {IterableIterator<any>}
   */
  values() {
    return Je(
      ae(this._map),
      /** @param {any} v */
      (t) => t[1].content.getContent()[t[1].length - 1]
    );
  }
  /**
   * Returns an Iterator of [key, value] pairs
   *
   * @return {IterableIterator<any>}
   */
  entries() {
    return Je(
      ae(this._map),
      /** @param {any} v */
      (t) => [t[0], t[1].content.getContent()[t[1].length - 1]]
    );
  }
  /**
   * Executes a provided function on once on every key-value pair.
   *
   * @param {function(MapType,string,YMap<MapType>):void} f A function to execute on every element of this YArray.
   */
  forEach(t) {
    this._map.forEach((e, s) => {
      e.deleted || t(e.content.getContent()[e.length - 1], s, this);
    });
  }
  /**
   * Returns an Iterator of [key, value] pairs
   *
   * @return {IterableIterator<any>}
   */
  [Symbol.iterator]() {
    return this.entries();
  }
  /**
   * Remove a specified element from this YMap.
   *
   * @param {string} key The key of the element to remove.
   */
  delete(t) {
    this.doc !== null ? C(this.doc, (e) => {
      _e(e, this, t);
    }) : this._prelimContent.delete(t);
  }
  /**
   * Adds or updates an element with a specified key and value.
   *
   * @param {string} key The key of the element to add to this YMap
   * @param {MapType} value The value of the element to add
   */
  set(t, e) {
    return this.doc !== null ? C(this.doc, (s) => {
      Un(
        s,
        this,
        t,
        /** @type {any} */
        e
      );
    }) : this._prelimContent.set(t, e), e;
  }
  /**
   * Returns a specified element from this YMap.
   *
   * @param {string} key
   * @return {MapType|undefined}
   */
  get(t) {
    return (
      /** @type {any} */
      Ln(this, t)
    );
  }
  /**
   * Returns a boolean indicating whether the specified key exists or not.
   *
   * @param {string} key The key to test.
   * @return {boolean}
   */
  has(t) {
    return zs(this, t);
  }
  /**
   * Removes all elements from this YMap.
   */
  clear() {
    this.doc !== null ? C(this.doc, (t) => {
      this.forEach(function(e, s, r) {
        _e(t, r, s);
      });
    }) : this._prelimContent.clear();
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   */
  _write(t) {
    t.writeTypeRef(Ko);
  }
}
const _o = (n) => new X(), ct = (n, t) => n === t || typeof n == "object" && typeof t == "object" && n && t && ii(n, t);
class an {
  /**
   * @param {Item|null} left
   * @param {Item|null} right
   * @param {number} index
   * @param {Map<string,any>} currentAttributes
   */
  constructor(t, e, s, r) {
    this.left = t, this.right = e, this.index = s, this.currentAttributes = r;
  }
  /**
   * Only call this if you know that this.right is defined
   */
  forward() {
    switch (this.right === null && z(), this.right.content.constructor) {
      case R:
        this.right.deleted || Bt(
          this.currentAttributes,
          /** @type {ContentFormat} */
          this.right.content
        );
        break;
      default:
        this.right.deleted || (this.index += this.right.length);
        break;
    }
    this.left = this.right, this.right = this.right.right;
  }
}
const is = (n, t, e) => {
  for (; t.right !== null && e > 0; ) {
    switch (t.right.content.constructor) {
      case R:
        t.right.deleted || Bt(
          t.currentAttributes,
          /** @type {ContentFormat} */
          t.right.content
        );
        break;
      default:
        t.right.deleted || (e < t.right.length && B(n, k(t.right.id.client, t.right.id.clock + e)), t.index += t.right.length, e -= t.right.length);
        break;
    }
    t.left = t.right, t.right = t.right.right;
  }
  return t;
}, he = (n, t, e) => {
  const s = /* @__PURE__ */ new Map(), r = Ne(t, e);
  if (r) {
    const i = new an(r.p.left, r.p, r.index, s);
    return is(n, i, e - r.index);
  } else {
    const i = new an(null, t._start, 0, s);
    return is(n, i, e);
  }
}, qs = (n, t, e, s) => {
  for (; e.right !== null && (e.right.deleted === !0 || e.right.content.constructor === R && ct(
    s.get(
      /** @type {ContentFormat} */
      e.right.content.key
    ),
    /** @type {ContentFormat} */
    e.right.content.value
  )); )
    e.right.deleted || s.delete(
      /** @type {ContentFormat} */
      e.right.content.key
    ), e.forward();
  const r = n.doc, i = r.clientID;
  s.forEach((o, c) => {
    const l = e.left, a = e.right, h = new I(k(i, L(r.store, i)), l, l && l.lastId, a, a && a.id, t, null, new R(c, o));
    h.integrate(n, 0), e.right = h, e.forward();
  });
}, Bt = (n, t) => {
  const { key: e, value: s } = t;
  s === null ? n.delete(e) : n.set(e, s);
}, Xs = (n, t) => {
  for (; n.right !== null; ) {
    if (!(n.right.deleted || n.right.content.constructor === R && ct(
      t[
        /** @type {ContentFormat} */
        n.right.content.key
      ] || null,
      /** @type {ContentFormat} */
      n.right.content.value
    )))
      break;
    n.forward();
  }
}, Qs = (n, t, e, s) => {
  const r = n.doc, i = r.clientID, o = /* @__PURE__ */ new Map();
  for (const c in s) {
    const l = s[c], a = e.currentAttributes.get(c) || null;
    if (!ct(a, l)) {
      o.set(c, a);
      const { left: h, right: u } = e;
      e.right = new I(k(i, L(r.store, i)), h, h && h.lastId, u, u && u.id, t, null, new R(c, l)), e.right.integrate(n, 0), e.forward();
    }
  }
  return o;
}, Pe = (n, t, e, s, r) => {
  e.currentAttributes.forEach((f, d) => {
    r[d] === void 0 && (r[d] = null);
  });
  const i = n.doc, o = i.clientID;
  Xs(e, r);
  const c = Qs(n, t, e, r), l = s.constructor === String ? new Q(
    /** @type {string} */
    s
  ) : s instanceof M ? new it(s) : new It(s);
  let { left: a, right: h, index: u } = e;
  t._searchMarker && zt(t._searchMarker, e.index, l.getLength()), h = new I(k(o, L(i.store, o)), a, a && a.lastId, h, h && h.id, t, null, l), h.integrate(n, 0), e.right = h, e.index = u, e.forward(), qs(n, t, e, c);
}, os = (n, t, e, s, r) => {
  const i = n.doc, o = i.clientID;
  Xs(e, r);
  const c = Qs(n, t, e, r);
  t:
    for (; e.right !== null && (s > 0 || c.size > 0 && (e.right.deleted || e.right.content.constructor === R)); ) {
      if (!e.right.deleted)
        switch (e.right.content.constructor) {
          case R: {
            const { key: l, value: a } = (
              /** @type {ContentFormat} */
              e.right.content
            ), h = r[l];
            if (h !== void 0) {
              if (ct(h, a))
                c.delete(l);
              else {
                if (s === 0)
                  break t;
                c.set(l, a);
              }
              e.right.delete(n);
            } else
              e.currentAttributes.set(l, a);
            break;
          }
          default:
            s < e.right.length && B(n, k(e.right.id.client, e.right.id.clock + s)), s -= e.right.length;
            break;
        }
      e.forward();
    }
  if (s > 0) {
    let l = "";
    for (; s > 0; s--)
      l += `
`;
    e.right = new I(k(o, L(i.store, o)), e.left, e.left && e.left.lastId, e.right, e.right && e.right.id, t, null, new Q(l)), e.right.integrate(n, 0), e.forward();
  }
  qs(n, t, e, c);
}, Zs = (n, t, e, s, r) => {
  let i = t;
  const o = H();
  for (; i && (!i.countable || i.deleted); ) {
    if (!i.deleted && i.content.constructor === R) {
      const a = (
        /** @type {ContentFormat} */
        i.content
      );
      o.set(a.key, a);
    }
    i = i.right;
  }
  let c = 0, l = !1;
  for (; t !== i; ) {
    if (e === t && (l = !0), !t.deleted) {
      const a = t.content;
      switch (a.constructor) {
        case R: {
          const { key: h, value: u } = (
            /** @type {ContentFormat} */
            a
          ), f = s.get(h) || null;
          (o.get(h) !== a || f === u) && (t.delete(n), c++, !l && (r.get(h) || null) === u && f !== u && (f === null ? r.delete(h) : r.set(h, f))), !l && !t.deleted && Bt(
            r,
            /** @type {ContentFormat} */
            a
          );
          break;
        }
      }
    }
    t = /** @type {Item} */
    t.right;
  }
  return c;
}, Co = (n, t) => {
  for (; t && t.right && (t.right.deleted || !t.right.countable); )
    t = t.right;
  const e = /* @__PURE__ */ new Set();
  for (; t && (t.deleted || !t.countable); ) {
    if (!t.deleted && t.content.constructor === R) {
      const s = (
        /** @type {ContentFormat} */
        t.content.key
      );
      e.has(s) ? t.delete(n) : e.add(s);
    }
    t = t.left;
  }
}, Eo = (n) => {
  let t = 0;
  return C(
    /** @type {Doc} */
    n.doc,
    (e) => {
      let s = (
        /** @type {Item} */
        n._start
      ), r = n._start, i = H();
      const o = Qe(i);
      for (; r; ) {
        if (r.deleted === !1)
          switch (r.content.constructor) {
            case R:
              Bt(
                o,
                /** @type {ContentFormat} */
                r.content
              );
              break;
            default:
              t += Zs(e, s, r, i, o), i = Qe(o), s = r;
              break;
          }
        r = r.right;
      }
    }
  ), t;
}, cs = (n, t, e) => {
  const s = e, r = Qe(t.currentAttributes), i = t.right;
  for (; e > 0 && t.right !== null; ) {
    if (t.right.deleted === !1)
      switch (t.right.content.constructor) {
        case it:
        case It:
        case Q:
          e < t.right.length && B(n, k(t.right.id.client, t.right.id.clock + e)), e -= t.right.length, t.right.delete(n);
          break;
      }
    t.forward();
  }
  i && Zs(n, i, t.right, r, t.currentAttributes);
  const o = (
    /** @type {AbstractType<any>} */
    /** @type {Item} */
    (t.left || t.right).parent
  );
  return o._searchMarker && zt(o._searchMarker, t.index, -s + e), t;
};
class Do extends ve {
  /**
   * @param {YText} ytext
   * @param {Transaction} transaction
   * @param {Set<any>} subs The keys that changed
   */
  constructor(t, e, s) {
    super(t, e), this.childListChanged = !1, this.keysChanged = /* @__PURE__ */ new Set(), s.forEach((r) => {
      r === null ? this.childListChanged = !0 : this.keysChanged.add(r);
    });
  }
  /**
   * @type {{added:Set<Item>,deleted:Set<Item>,keys:Map<string,{action:'add'|'update'|'delete',oldValue:any}>,delta:Array<{insert?:Array<any>|string, delete?:number, retain?:number}>}}
   */
  get changes() {
    if (this._changes === null) {
      const t = {
        keys: this.keys,
        delta: this.delta,
        added: /* @__PURE__ */ new Set(),
        deleted: /* @__PURE__ */ new Set()
      };
      this._changes = t;
    }
    return (
      /** @type {any} */
      this._changes
    );
  }
  /**
   * Compute the changes in the delta format.
   * A {@link https://quilljs.com/docs/delta/|Quill Delta}) that represents the changes on the document.
   *
   * @type {Array<{insert?:string|object|AbstractType<any>, delete?:number, retain?:number, attributes?: Object<string,any>}>}
   *
   * @public
   */
  get delta() {
    if (this._delta === null) {
      const t = (
        /** @type {Doc} */
        this.target.doc
      ), e = [];
      C(t, (s) => {
        const r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
        let o = this.target._start, c = null;
        const l = {};
        let a = "", h = 0, u = 0;
        const f = () => {
          if (c !== null) {
            let d;
            switch (c) {
              case "delete":
                d = { delete: u }, u = 0;
                break;
              case "insert":
                d = { insert: a }, r.size > 0 && (d.attributes = {}, r.forEach((g, w) => {
                  g !== null && (d.attributes[w] = g);
                })), a = "";
                break;
              case "retain":
                if (d = { retain: h }, Object.keys(l).length > 0) {
                  d.attributes = {};
                  for (const g in l)
                    d.attributes[g] = l[g];
                }
                h = 0;
                break;
            }
            e.push(d), c = null;
          }
        };
        for (; o !== null; ) {
          switch (o.content.constructor) {
            case it:
            case It:
              this.adds(o) ? this.deletes(o) || (f(), c = "insert", a = o.content.getContent()[0], f()) : this.deletes(o) ? (c !== "delete" && (f(), c = "delete"), u += 1) : o.deleted || (c !== "retain" && (f(), c = "retain"), h += 1);
              break;
            case Q:
              this.adds(o) ? this.deletes(o) || (c !== "insert" && (f(), c = "insert"), a += /** @type {ContentString} */
              o.content.str) : this.deletes(o) ? (c !== "delete" && (f(), c = "delete"), u += o.length) : o.deleted || (c !== "retain" && (f(), c = "retain"), h += o.length);
              break;
            case R: {
              const { key: d, value: g } = (
                /** @type {ContentFormat} */
                o.content
              );
              if (this.adds(o)) {
                if (!this.deletes(o)) {
                  const w = r.get(d) || null;
                  ct(w, g) ? g !== null && o.delete(s) : (c === "retain" && f(), ct(g, i.get(d) || null) ? delete l[d] : l[d] = g);
                }
              } else if (this.deletes(o)) {
                i.set(d, g);
                const w = r.get(d) || null;
                ct(w, g) || (c === "retain" && f(), l[d] = w);
              } else if (!o.deleted) {
                i.set(d, g);
                const w = l[d];
                w !== void 0 && (ct(w, g) ? w !== null && o.delete(s) : (c === "retain" && f(), g === null ? delete l[d] : l[d] = g));
              }
              o.deleted || (c === "insert" && f(), Bt(
                r,
                /** @type {ContentFormat} */
                o.content
              ));
              break;
            }
          }
          o = o.right;
        }
        for (f(); e.length > 0; ) {
          const d = e[e.length - 1];
          if (d.retain !== void 0 && d.attributes === void 0)
            e.pop();
          else
            break;
        }
      }), this._delta = e;
    }
    return (
      /** @type {any} */
      this._delta
    );
  }
}
class Ot extends M {
  /**
   * @param {String} [string] The initial value of the YText.
   */
  constructor(t) {
    super(), this._pending = t !== void 0 ? [() => this.insert(0, t)] : [], this._searchMarker = [];
  }
  /**
   * Number of characters of this text type.
   *
   * @type {number}
   */
  get length() {
    return this._length;
  }
  /**
   * @param {Doc} y
   * @param {Item} item
   */
  _integrate(t, e) {
    super._integrate(t, e);
    try {
      this._pending.forEach((s) => s());
    } catch (s) {
      console.error(s);
    }
    this._pending = null;
  }
  _copy() {
    return new Ot();
  }
  /**
   * @return {YText}
   */
  clone() {
    const t = new Ot();
    return t.applyDelta(this.toDelta()), t;
  }
  /**
   * Creates YTextEvent and calls observers.
   *
   * @param {Transaction} transaction
   * @param {Set<null|string>} parentSubs Keys changed on this type. `null` if list was modified.
   */
  _callObserver(t, e) {
    super._callObserver(t, e);
    const s = new Do(this, t, e), r = t.doc;
    if ($e(this, t, s), !t.local) {
      let i = !1;
      for (const [o, c] of t.afterState.entries()) {
        const l = t.beforeState.get(o) || 0;
        if (c !== l && (Ns(
          t,
          /** @type {Array<Item|GC>} */
          r.store.clients.get(o),
          l,
          c,
          (a) => {
            !a.deleted && /** @type {Item} */
            a.content.constructor === R && (i = !0);
          }
        ), i))
          break;
      }
      i || bt(t, t.deleteSet, (o) => {
        o instanceof Y || i || o.parent === this && o.content.constructor === R && (i = !0);
      }), C(r, (o) => {
        i ? Eo(this) : bt(o, o.deleteSet, (c) => {
          c instanceof Y || c.parent === this && Co(o, c);
        });
      });
    }
  }
  /**
   * Returns the unformatted string representation of this YText type.
   *
   * @public
   */
  toString() {
    let t = "", e = this._start;
    for (; e !== null; )
      !e.deleted && e.countable && e.content.constructor === Q && (t += /** @type {ContentString} */
      e.content.str), e = e.right;
    return t;
  }
  /**
   * Returns the unformatted string representation of this YText type.
   *
   * @return {string}
   * @public
   */
  toJSON() {
    return this.toString();
  }
  /**
   * Apply a {@link Delta} on this shared YText type.
   *
   * @param {any} delta The changes to apply on this element.
   * @param {object}  opts
   * @param {boolean} [opts.sanitize] Sanitize input delta. Removes ending newlines if set to true.
   *
   *
   * @public
   */
  applyDelta(t, { sanitize: e = !0 } = {}) {
    this.doc !== null ? C(this.doc, (s) => {
      const r = new an(null, this._start, 0, /* @__PURE__ */ new Map());
      for (let i = 0; i < t.length; i++) {
        const o = t[i];
        if (o.insert !== void 0) {
          const c = !e && typeof o.insert == "string" && i === t.length - 1 && r.right === null && o.insert.slice(-1) === `
` ? o.insert.slice(0, -1) : o.insert;
          (typeof c != "string" || c.length > 0) && Pe(s, this, r, c, o.attributes || {});
        } else
          o.retain !== void 0 ? os(s, this, r, o.retain, o.attributes || {}) : o.delete !== void 0 && cs(s, r, o.delete);
      }
    }) : this._pending.push(() => this.applyDelta(t));
  }
  /**
   * Returns the Delta representation of this YText type.
   *
   * @param {Snapshot} [snapshot]
   * @param {Snapshot} [prevSnapshot]
   * @param {function('removed' | 'added', ID):any} [computeYChange]
   * @return {any} The Delta representation of this type.
   *
   * @public
   */
  toDelta(t, e, s) {
    const r = [], i = /* @__PURE__ */ new Map(), o = (
      /** @type {Doc} */
      this.doc
    );
    let c = "", l = this._start;
    function a() {
      if (c.length > 0) {
        const u = {};
        let f = !1;
        i.forEach((g, w) => {
          f = !0, u[w] = g;
        });
        const d = { insert: c };
        f && (d.attributes = u), r.push(d), c = "";
      }
    }
    const h = () => {
      for (; l !== null; ) {
        if (jt(l, t) || e !== void 0 && jt(l, e))
          switch (l.content.constructor) {
            case Q: {
              const u = i.get("ychange");
              t !== void 0 && !jt(l, t) ? (u === void 0 || u.user !== l.id.client || u.type !== "removed") && (a(), i.set("ychange", s ? s("removed", l.id) : { type: "removed" })) : e !== void 0 && !jt(l, e) ? (u === void 0 || u.user !== l.id.client || u.type !== "added") && (a(), i.set("ychange", s ? s("added", l.id) : { type: "added" })) : u !== void 0 && (a(), i.delete("ychange")), c += /** @type {ContentString} */
              l.content.str;
              break;
            }
            case it:
            case It: {
              a();
              const u = {
                insert: l.content.getContent()[0]
              };
              if (i.size > 0) {
                const f = (
                  /** @type {Object<string,any>} */
                  {}
                );
                u.attributes = f, i.forEach((d, g) => {
                  f[g] = d;
                });
              }
              r.push(u);
              break;
            }
            case R:
              jt(l, t) && (a(), Bt(
                i,
                /** @type {ContentFormat} */
                l.content
              ));
              break;
          }
        l = l.right;
      }
      a();
    };
    return t || e ? C(o, (u) => {
      t && cn(u, t), e && cn(u, e), h();
    }, "cleanup") : h(), r;
  }
  /**
   * Insert text at a given index.
   *
   * @param {number} index The index at which to start inserting.
   * @param {String} text The text to insert at the specified position.
   * @param {TextAttributes} [attributes] Optionally define some formatting
   *                                    information to apply on the inserted
   *                                    Text.
   * @public
   */
  insert(t, e, s) {
    if (e.length <= 0)
      return;
    const r = this.doc;
    r !== null ? C(r, (i) => {
      const o = he(i, this, t);
      s || (s = {}, o.currentAttributes.forEach((c, l) => {
        s[l] = c;
      })), Pe(i, this, o, e, s);
    }) : this._pending.push(() => this.insert(t, e, s));
  }
  /**
   * Inserts an embed at a index.
   *
   * @param {number} index The index to insert the embed at.
   * @param {Object | AbstractType<any>} embed The Object that represents the embed.
   * @param {TextAttributes} attributes Attribute information to apply on the
   *                                    embed
   *
   * @public
   */
  insertEmbed(t, e, s = {}) {
    const r = this.doc;
    r !== null ? C(r, (i) => {
      const o = he(i, this, t);
      Pe(i, this, o, e, s);
    }) : this._pending.push(() => this.insertEmbed(t, e, s));
  }
  /**
   * Deletes text starting from an index.
   *
   * @param {number} index Index at which to start deleting.
   * @param {number} length The number of characters to remove. Defaults to 1.
   *
   * @public
   */
  delete(t, e) {
    if (e === 0)
      return;
    const s = this.doc;
    s !== null ? C(s, (r) => {
      cs(r, he(r, this, t), e);
    }) : this._pending.push(() => this.delete(t, e));
  }
  /**
   * Assigns properties to a range of text.
   *
   * @param {number} index The position where to start formatting.
   * @param {number} length The amount of characters to assign properties to.
   * @param {TextAttributes} attributes Attribute information to apply on the
   *                                    text.
   *
   * @public
   */
  format(t, e, s) {
    if (e === 0)
      return;
    const r = this.doc;
    r !== null ? C(r, (i) => {
      const o = he(i, this, t);
      o.right !== null && os(i, this, o, e, s);
    }) : this._pending.push(() => this.format(t, e, s));
  }
  /**
   * Removes an attribute.
   *
   * @note Xml-Text nodes don't have attributes. You can use this feature to assign properties to complete text-blocks.
   *
   * @param {String} attributeName The attribute name that is to be removed.
   *
   * @public
   */
  removeAttribute(t) {
    this.doc !== null ? C(this.doc, (e) => {
      _e(e, this, t);
    }) : this._pending.push(() => this.removeAttribute(t));
  }
  /**
   * Sets or updates an attribute.
   *
   * @note Xml-Text nodes don't have attributes. You can use this feature to assign properties to complete text-blocks.
   *
   * @param {String} attributeName The attribute name that is to be set.
   * @param {any} attributeValue The attribute value that is to be set.
   *
   * @public
   */
  setAttribute(t, e) {
    this.doc !== null ? C(this.doc, (s) => {
      Un(s, this, t, e);
    }) : this._pending.push(() => this.setAttribute(t, e));
  }
  /**
   * Returns an attribute value that belongs to the attribute name.
   *
   * @note Xml-Text nodes don't have attributes. You can use this feature to assign properties to complete text-blocks.
   *
   * @param {String} attributeName The attribute name that identifies the
   *                               queried value.
   * @return {any} The queried attribute value.
   *
   * @public
   */
  getAttribute(t) {
    return (
      /** @type {any} */
      Ln(this, t)
    );
  }
  /**
   * Returns all attribute name/value pairs in a JSON Object.
   *
   * @note Xml-Text nodes don't have attributes. You can use this feature to assign properties to complete text-blocks.
   *
   * @return {Object<string, any>} A JSON Object that describes the attributes.
   *
   * @public
   */
  getAttributes() {
    return Ws(this);
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   */
  _write(t) {
    t.writeTypeRef(Ho);
  }
}
const Io = (n) => new Ot();
class Ge {
  /**
   * @param {YXmlFragment | YXmlElement} root
   * @param {function(AbstractType<any>):boolean} [f]
   */
  constructor(t, e = () => !0) {
    this._filter = e, this._root = t, this._currentNode = /** @type {Item} */
    t._start, this._firstCall = !0;
  }
  [Symbol.iterator]() {
    return this;
  }
  /**
   * Get the next node.
   *
   * @return {IteratorResult<YXmlElement|YXmlText|YXmlHook>} The next node.
   *
   * @public
   */
  next() {
    let t = this._currentNode, e = t && t.content && /** @type {any} */
    t.content.type;
    if (t !== null && (!this._firstCall || t.deleted || !this._filter(e)))
      do
        if (e = /** @type {any} */
        t.content.type, !t.deleted && (e.constructor === Xt || e.constructor === Ct) && e._start !== null)
          t = e._start;
        else
          for (; t !== null; )
            if (t.right !== null) {
              t = t.right;
              break;
            } else
              t.parent === this._root ? t = null : t = /** @type {AbstractType<any>} */
              t.parent._item;
      while (t !== null && (t.deleted || !this._filter(
        /** @type {ContentType} */
        t.content.type
      )));
    return this._firstCall = !1, t === null ? { value: void 0, done: !0 } : (this._currentNode = t, { value: (
      /** @type {any} */
      t.content.type
    ), done: !1 });
  }
}
class Ct extends M {
  constructor() {
    super(), this._prelimContent = [];
  }
  /**
   * @type {YXmlElement|YXmlText|null}
   */
  get firstChild() {
    const t = this._first;
    return t ? t.content.getContent()[0] : null;
  }
  /**
   * Integrate this type into the Yjs instance.
   *
   * * Save this struct in the os
   * * This type is sent to other client
   * * Observer functions are fired
   *
   * @param {Doc} y The Yjs instance
   * @param {Item} item
   */
  _integrate(t, e) {
    super._integrate(t, e), this.insert(
      0,
      /** @type {Array<any>} */
      this._prelimContent
    ), this._prelimContent = null;
  }
  _copy() {
    return new Ct();
  }
  /**
   * @return {YXmlFragment}
   */
  clone() {
    const t = new Ct();
    return t.insert(0, this.toArray().map((e) => e instanceof M ? e.clone() : e)), t;
  }
  get length() {
    return this._prelimContent === null ? this._length : this._prelimContent.length;
  }
  /**
   * Create a subtree of childNodes.
   *
   * @example
   * const walker = elem.createTreeWalker(dom => dom.nodeName === 'div')
   * for (let node in walker) {
   *   // `node` is a div node
   *   nop(node)
   * }
   *
   * @param {function(AbstractType<any>):boolean} filter Function that is called on each child element and
   *                          returns a Boolean indicating whether the child
   *                          is to be included in the subtree.
   * @return {YXmlTreeWalker} A subtree and a position within it.
   *
   * @public
   */
  createTreeWalker(t) {
    return new Ge(this, t);
  }
  /**
   * Returns the first YXmlElement that matches the query.
   * Similar to DOM's {@link querySelector}.
   *
   * Query support:
   *   - tagname
   * TODO:
   *   - id
   *   - attribute
   *
   * @param {CSS_Selector} query The query on the children.
   * @return {YXmlElement|YXmlText|YXmlHook|null} The first element that matches the query or null.
   *
   * @public
   */
  querySelector(t) {
    t = t.toUpperCase();
    const s = new Ge(this, (r) => r.nodeName && r.nodeName.toUpperCase() === t).next();
    return s.done ? null : s.value;
  }
  /**
   * Returns all YXmlElements that match the query.
   * Similar to Dom's {@link querySelectorAll}.
   *
   * @todo Does not yet support all queries. Currently only query by tagName.
   *
   * @param {CSS_Selector} query The query on the children
   * @return {Array<YXmlElement|YXmlText|YXmlHook|null>} The elements that match this query.
   *
   * @public
   */
  querySelectorAll(t) {
    return t = t.toUpperCase(), ht(new Ge(this, (e) => e.nodeName && e.nodeName.toUpperCase() === t));
  }
  /**
   * Creates YXmlEvent and calls observers.
   *
   * @param {Transaction} transaction
   * @param {Set<null|string>} parentSubs Keys changed on this type. `null` if list was modified.
   */
  _callObserver(t, e) {
    $e(this, t, new Lo(this, e, t));
  }
  /**
   * Get the string representation of all the children of this YXmlFragment.
   *
   * @return {string} The string representation of all children.
   */
  toString() {
    return Ks(this, (t) => t.toString()).join("");
  }
  /**
   * @return {string}
   */
  toJSON() {
    return this.toString();
  }
  /**
   * Creates a Dom Element that mirrors this YXmlElement.
   *
   * @param {Document} [_document=document] The document object (you must define
   *                                        this when calling this method in
   *                                        nodejs)
   * @param {Object<string, any>} [hooks={}] Optional property to customize how hooks
   *                                             are presented in the DOM
   * @param {any} [binding] You should not set this property. This is
   *                               used if DomBinding wants to create a
   *                               association to the created DOM type.
   * @return {Node} The {@link https://developer.mozilla.org/en-US/docs/Web/API/Element|Dom Element}
   *
   * @public
   */
  toDOM(t = document, e = {}, s) {
    const r = t.createDocumentFragment();
    return s !== void 0 && s._createAssociation(r, this), qt(this, (i) => {
      r.insertBefore(i.toDOM(t, e, s), null);
    }), r;
  }
  /**
   * Inserts new content at an index.
   *
   * @example
   *  // Insert character 'a' at position 0
   *  xml.insert(0, [new Y.XmlText('text')])
   *
   * @param {number} index The index to insert content at
   * @param {Array<YXmlElement|YXmlText>} content The array of content
   */
  insert(t, e) {
    this.doc !== null ? C(this.doc, (s) => {
      Ps(s, this, t, e);
    }) : this._prelimContent.splice(t, 0, ...e);
  }
  /**
   * Inserts new content at an index.
   *
   * @example
   *  // Insert character 'a' at position 0
   *  xml.insert(0, [new Y.XmlText('text')])
   *
   * @param {null|Item|YXmlElement|YXmlText} ref The index to insert content at
   * @param {Array<YXmlElement|YXmlText>} content The array of content
   */
  insertAfter(t, e) {
    if (this.doc !== null)
      C(this.doc, (s) => {
        const r = t && t instanceof M ? t._item : t;
        be(s, this, r, e);
      });
    else {
      const s = (
        /** @type {Array<any>} */
        this._prelimContent
      ), r = t === null ? 0 : s.findIndex((i) => i === t) + 1;
      if (r === 0 && t !== null)
        throw xt("Reference item not found");
      s.splice(r, 0, ...e);
    }
  }
  /**
   * Deletes elements starting from an index.
   *
   * @param {number} index Index at which to start deleting elements
   * @param {number} [length=1] The number of elements to remove. Defaults to 1.
   */
  delete(t, e = 1) {
    this.doc !== null ? C(this.doc, (s) => {
      Gs(s, this, t, e);
    }) : this._prelimContent.splice(t, e);
  }
  /**
   * Transforms this YArray to a JavaScript Array.
   *
   * @return {Array<YXmlElement|YXmlText|YXmlHook>}
   */
  toArray() {
    return Ys(this);
  }
  /**
   * Appends content to this YArray.
   *
   * @param {Array<YXmlElement|YXmlText>} content Array of content to append.
   */
  push(t) {
    this.insert(this.length, t);
  }
  /**
   * Preppends content to this YArray.
   *
   * @param {Array<YXmlElement|YXmlText>} content Array of content to preppend.
   */
  unshift(t) {
    this.insert(0, t);
  }
  /**
   * Returns the i-th element from a YArray.
   *
   * @param {number} index The index of the element to return from the YArray
   * @return {YXmlElement|YXmlText}
   */
  get(t) {
    return Hs(this, t);
  }
  /**
   * Transforms this YArray to a JavaScript Array.
   *
   * @param {number} [start]
   * @param {number} [end]
   * @return {Array<YXmlElement|YXmlText>}
   */
  slice(t = 0, e = this.length) {
    return Fs(this, t, e);
  }
  /**
   * Executes a provided function on once on overy child element.
   *
   * @param {function(YXmlElement|YXmlText,number, typeof self):void} f A function to execute on every element of this YArray.
   */
  forEach(t) {
    qt(this, t);
  }
  /**
   * Transform the properties of this type to binary and write it to an
   * BinaryEncoder.
   *
   * This is called when this Item is sent to a remote peer.
   *
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder The encoder to write data to.
   */
  _write(t) {
    t.writeTypeRef(Po);
  }
}
const Ao = (n) => new Ct();
class Xt extends Ct {
  constructor(t = "UNDEFINED") {
    super(), this.nodeName = t, this._prelimAttrs = /* @__PURE__ */ new Map();
  }
  /**
   * @type {YXmlElement|YXmlText|null}
   */
  get nextSibling() {
    const t = this._item ? this._item.next : null;
    return t ? (
      /** @type {YXmlElement|YXmlText} */
      /** @type {ContentType} */
      t.content.type
    ) : null;
  }
  /**
   * @type {YXmlElement|YXmlText|null}
   */
  get prevSibling() {
    const t = this._item ? this._item.prev : null;
    return t ? (
      /** @type {YXmlElement|YXmlText} */
      /** @type {ContentType} */
      t.content.type
    ) : null;
  }
  /**
   * Integrate this type into the Yjs instance.
   *
   * * Save this struct in the os
   * * This type is sent to other client
   * * Observer functions are fired
   *
   * @param {Doc} y The Yjs instance
   * @param {Item} item
   */
  _integrate(t, e) {
    super._integrate(t, e), /** @type {Map<string, any>} */
    this._prelimAttrs.forEach((s, r) => {
      this.setAttribute(r, s);
    }), this._prelimAttrs = null;
  }
  /**
   * Creates an Item with the same effect as this Item (without position effect)
   *
   * @return {YXmlElement}
   */
  _copy() {
    return new Xt(this.nodeName);
  }
  /**
   * @return {YXmlElement}
   */
  clone() {
    const t = new Xt(this.nodeName), e = this.getAttributes();
    for (const s in e)
      t.setAttribute(s, e[s]);
    return t.insert(0, this.toArray().map((s) => s instanceof M ? s.clone() : s)), t;
  }
  /**
   * Returns the XML serialization of this YXmlElement.
   * The attributes are ordered by attribute-name, so you can easily use this
   * method to compare YXmlElements
   *
   * @return {string} The string representation of this type.
   *
   * @public
   */
  toString() {
    const t = this.getAttributes(), e = [], s = [];
    for (const c in t)
      s.push(c);
    s.sort();
    const r = s.length;
    for (let c = 0; c < r; c++) {
      const l = s[c];
      e.push(l + '="' + t[l] + '"');
    }
    const i = this.nodeName.toLocaleLowerCase(), o = e.length > 0 ? " " + e.join(" ") : "";
    return `<${i}${o}>${super.toString()}</${i}>`;
  }
  /**
   * Removes an attribute from this YXmlElement.
   *
   * @param {String} attributeName The attribute name that is to be removed.
   *
   * @public
   */
  removeAttribute(t) {
    this.doc !== null ? C(this.doc, (e) => {
      _e(e, this, t);
    }) : this._prelimAttrs.delete(t);
  }
  /**
   * Sets or updates an attribute.
   *
   * @param {String} attributeName The attribute name that is to be set.
   * @param {String} attributeValue The attribute value that is to be set.
   *
   * @public
   */
  setAttribute(t, e) {
    this.doc !== null ? C(this.doc, (s) => {
      Un(s, this, t, e);
    }) : this._prelimAttrs.set(t, e);
  }
  /**
   * Returns an attribute value that belongs to the attribute name.
   *
   * @param {String} attributeName The attribute name that identifies the
   *                               queried value.
   * @return {String} The queried attribute value.
   *
   * @public
   */
  getAttribute(t) {
    return (
      /** @type {any} */
      Ln(this, t)
    );
  }
  /**
   * Returns whether an attribute exists
   *
   * @param {String} attributeName The attribute name to check for existence.
   * @return {boolean} whether the attribute exists.
   *
   * @public
   */
  hasAttribute(t) {
    return (
      /** @type {any} */
      zs(this, t)
    );
  }
  /**
   * Returns all attribute name/value pairs in a JSON Object.
   *
   * @return {Object<string, any>} A JSON Object that describes the attributes.
   *
   * @public
   */
  getAttributes() {
    return Ws(this);
  }
  /**
   * Creates a Dom Element that mirrors this YXmlElement.
   *
   * @param {Document} [_document=document] The document object (you must define
   *                                        this when calling this method in
   *                                        nodejs)
   * @param {Object<string, any>} [hooks={}] Optional property to customize how hooks
   *                                             are presented in the DOM
   * @param {any} [binding] You should not set this property. This is
   *                               used if DomBinding wants to create a
   *                               association to the created DOM type.
   * @return {Node} The {@link https://developer.mozilla.org/en-US/docs/Web/API/Element|Dom Element}
   *
   * @public
   */
  toDOM(t = document, e = {}, s) {
    const r = t.createElement(this.nodeName), i = this.getAttributes();
    for (const o in i)
      r.setAttribute(o, i[o]);
    return qt(this, (o) => {
      r.appendChild(o.toDOM(t, e, s));
    }), s !== void 0 && s._createAssociation(r, this), r;
  }
  /**
   * Transform the properties of this type to binary and write it to an
   * BinaryEncoder.
   *
   * This is called when this Item is sent to a remote peer.
   *
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder The encoder to write data to.
   */
  _write(t) {
    t.writeTypeRef(Jo), t.writeKey(this.nodeName);
  }
}
const Uo = (n) => new Xt(n.readKey());
class Lo extends ve {
  /**
   * @param {YXmlElement|YXmlText|YXmlFragment} target The target on which the event is created.
   * @param {Set<string|null>} subs The set of changed attributes. `null` is included if the
   *                   child list changed.
   * @param {Transaction} transaction The transaction instance with wich the
   *                                  change was created.
   */
  constructor(t, e, s) {
    super(t, s), this.childListChanged = !1, this.attributesChanged = /* @__PURE__ */ new Set(), e.forEach((r) => {
      r === null ? this.childListChanged = !0 : this.attributesChanged.add(r);
    });
  }
}
class Ce extends X {
  /**
   * @param {string} hookName nodeName of the Dom Node.
   */
  constructor(t) {
    super(), this.hookName = t;
  }
  /**
   * Creates an Item with the same effect as this Item (without position effect)
   */
  _copy() {
    return new Ce(this.hookName);
  }
  /**
   * @return {YXmlHook}
   */
  clone() {
    const t = new Ce(this.hookName);
    return this.forEach((e, s) => {
      t.set(s, e);
    }), t;
  }
  /**
   * Creates a Dom Element that mirrors this YXmlElement.
   *
   * @param {Document} [_document=document] The document object (you must define
   *                                        this when calling this method in
   *                                        nodejs)
   * @param {Object.<string, any>} [hooks] Optional property to customize how hooks
   *                                             are presented in the DOM
   * @param {any} [binding] You should not set this property. This is
   *                               used if DomBinding wants to create a
   *                               association to the created DOM type
   * @return {Element} The {@link https://developer.mozilla.org/en-US/docs/Web/API/Element|Dom Element}
   *
   * @public
   */
  toDOM(t = document, e = {}, s) {
    const r = e[this.hookName];
    let i;
    return r !== void 0 ? i = r.createDom(this) : i = document.createElement(this.hookName), i.setAttribute("data-yjs-hook", this.hookName), s !== void 0 && s._createAssociation(i, this), i;
  }
  /**
   * Transform the properties of this type to binary and write it to an
   * BinaryEncoder.
   *
   * This is called when this Item is sent to a remote peer.
   *
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder The encoder to write data to.
   */
  _write(t) {
    t.writeTypeRef(Go), t.writeKey(this.hookName);
  }
}
const Ro = (n) => new Ce(n.readKey());
class Ee extends Ot {
  /**
   * @type {YXmlElement|YXmlText|null}
   */
  get nextSibling() {
    const t = this._item ? this._item.next : null;
    return t ? (
      /** @type {YXmlElement|YXmlText} */
      /** @type {ContentType} */
      t.content.type
    ) : null;
  }
  /**
   * @type {YXmlElement|YXmlText|null}
   */
  get prevSibling() {
    const t = this._item ? this._item.prev : null;
    return t ? (
      /** @type {YXmlElement|YXmlText} */
      /** @type {ContentType} */
      t.content.type
    ) : null;
  }
  _copy() {
    return new Ee();
  }
  /**
   * @return {YXmlText}
   */
  clone() {
    const t = new Ee();
    return t.applyDelta(this.toDelta()), t;
  }
  /**
   * Creates a Dom Element that mirrors this YXmlText.
   *
   * @param {Document} [_document=document] The document object (you must define
   *                                        this when calling this method in
   *                                        nodejs)
   * @param {Object<string, any>} [hooks] Optional property to customize how hooks
   *                                             are presented in the DOM
   * @param {any} [binding] You should not set this property. This is
   *                               used if DomBinding wants to create a
   *                               association to the created DOM type.
   * @return {Text} The {@link https://developer.mozilla.org/en-US/docs/Web/API/Element|Dom Element}
   *
   * @public
   */
  toDOM(t = document, e, s) {
    const r = t.createTextNode(this.toString());
    return s !== void 0 && s._createAssociation(r, this), r;
  }
  toString() {
    return this.toDelta().map((t) => {
      const e = [];
      for (const r in t.attributes) {
        const i = [];
        for (const o in t.attributes[r])
          i.push({ key: o, value: t.attributes[r][o] });
        i.sort((o, c) => o.key < c.key ? -1 : 1), e.push({ nodeName: r, attrs: i });
      }
      e.sort((r, i) => r.nodeName < i.nodeName ? -1 : 1);
      let s = "";
      for (let r = 0; r < e.length; r++) {
        const i = e[r];
        s += `<${i.nodeName}`;
        for (let o = 0; o < i.attrs.length; o++) {
          const c = i.attrs[o];
          s += ` ${c.key}="${c.value}"`;
        }
        s += ">";
      }
      s += t.insert;
      for (let r = e.length - 1; r >= 0; r--)
        s += `</${e[r].nodeName}>`;
      return s;
    }).join("");
  }
  /**
   * @return {string}
   */
  toJSON() {
    return this.toString();
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   */
  _write(t) {
    t.writeTypeRef(Wo);
  }
}
const To = (n) => new Ee();
class Rn {
  /**
   * @param {ID} id
   * @param {number} length
   */
  constructor(t, e) {
    this.id = t, this.length = e;
  }
  /**
   * @type {boolean}
   */
  get deleted() {
    throw W();
  }
  /**
   * Merge this struct with the item to the right.
   * This method is already assuming that `this.id.clock + this.length === this.id.clock`.
   * Also this method does *not* remove right from StructStore!
   * @param {AbstractStruct} right
   * @return {boolean} wether this merged with right
   */
  mergeWith(t) {
    return !1;
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder The encoder to write data to.
   * @param {number} offset
   * @param {number} encodingRef
   */
  write(t, e, s) {
    throw W();
  }
  /**
   * @param {Transaction} transaction
   * @param {number} offset
   */
  integrate(t, e) {
    throw W();
  }
}
const Mo = 0;
class Y extends Rn {
  get deleted() {
    return !0;
  }
  delete() {
  }
  /**
   * @param {GC} right
   * @return {boolean}
   */
  mergeWith(t) {
    return this.constructor !== t.constructor ? !1 : (this.length += t.length, !0);
  }
  /**
   * @param {Transaction} transaction
   * @param {number} offset
   */
  integrate(t, e) {
    e > 0 && (this.id.clock += e, this.length -= e), vs(t.doc.store, this);
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   * @param {number} offset
   */
  write(t, e) {
    t.writeInfo(Mo), t.writeLen(this.length - e);
  }
  /**
   * @param {Transaction} transaction
   * @param {StructStore} store
   * @return {null | number}
   */
  getMissing(t, e) {
    return null;
  }
}
class ne {
  /**
   * @param {Uint8Array} content
   */
  constructor(t) {
    this.content = t;
  }
  /**
   * @return {number}
   */
  getLength() {
    return 1;
  }
  /**
   * @return {Array<any>}
   */
  getContent() {
    return [this.content];
  }
  /**
   * @return {boolean}
   */
  isCountable() {
    return !0;
  }
  /**
   * @return {ContentBinary}
   */
  copy() {
    return new ne(this.content);
  }
  /**
   * @param {number} offset
   * @return {ContentBinary}
   */
  splice(t) {
    throw W();
  }
  /**
   * @param {ContentBinary} right
   * @return {boolean}
   */
  mergeWith(t) {
    return !1;
  }
  /**
   * @param {Transaction} transaction
   * @param {Item} item
   */
  integrate(t, e) {
  }
  /**
   * @param {Transaction} transaction
   */
  delete(t) {
  }
  /**
   * @param {StructStore} store
   */
  gc(t) {
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   * @param {number} offset
   */
  write(t, e) {
    t.writeBuf(this.content);
  }
  /**
   * @return {number}
   */
  getRef() {
    return 3;
  }
}
const Oo = (n) => new ne(n.readBuf());
class Qt {
  /**
   * @param {number} len
   */
  constructor(t) {
    this.len = t;
  }
  /**
   * @return {number}
   */
  getLength() {
    return this.len;
  }
  /**
   * @return {Array<any>}
   */
  getContent() {
    return [];
  }
  /**
   * @return {boolean}
   */
  isCountable() {
    return !1;
  }
  /**
   * @return {ContentDeleted}
   */
  copy() {
    return new Qt(this.len);
  }
  /**
   * @param {number} offset
   * @return {ContentDeleted}
   */
  splice(t) {
    const e = new Qt(this.len - t);
    return this.len = t, e;
  }
  /**
   * @param {ContentDeleted} right
   * @return {boolean}
   */
  mergeWith(t) {
    return this.len += t.len, !0;
  }
  /**
   * @param {Transaction} transaction
   * @param {Item} item
   */
  integrate(t, e) {
    Wt(t.deleteSet, e.id.client, e.id.clock, this.len), e.markDeleted();
  }
  /**
   * @param {Transaction} transaction
   */
  delete(t) {
  }
  /**
   * @param {StructStore} store
   */
  gc(t) {
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   * @param {number} offset
   */
  write(t, e) {
    t.writeLen(this.len - e);
  }
  /**
   * @return {number}
   */
  getRef() {
    return 1;
  }
}
const xo = (n) => new Qt(n.readLen()), tr = (n, t) => new $t({ guid: n, ...t, shouldLoad: t.shouldLoad || t.autoLoad || !1 });
class se {
  /**
   * @param {Doc} doc
   */
  constructor(t) {
    t._item && console.error("This document was already integrated as a sub-document. You should create a second instance instead with the same guid."), this.doc = t;
    const e = {};
    this.opts = e, t.gc || (e.gc = !1), t.autoLoad && (e.autoLoad = !0), t.meta !== null && (e.meta = t.meta);
  }
  /**
   * @return {number}
   */
  getLength() {
    return 1;
  }
  /**
   * @return {Array<any>}
   */
  getContent() {
    return [this.doc];
  }
  /**
   * @return {boolean}
   */
  isCountable() {
    return !0;
  }
  /**
   * @return {ContentDoc}
   */
  copy() {
    return new se(tr(this.doc.guid, this.opts));
  }
  /**
   * @param {number} offset
   * @return {ContentDoc}
   */
  splice(t) {
    throw W();
  }
  /**
   * @param {ContentDoc} right
   * @return {boolean}
   */
  mergeWith(t) {
    return !1;
  }
  /**
   * @param {Transaction} transaction
   * @param {Item} item
   */
  integrate(t, e) {
    this.doc._item = e, t.subdocsAdded.add(this.doc), this.doc.shouldLoad && t.subdocsLoaded.add(this.doc);
  }
  /**
   * @param {Transaction} transaction
   */
  delete(t) {
    t.subdocsAdded.has(this.doc) ? t.subdocsAdded.delete(this.doc) : t.subdocsRemoved.add(this.doc);
  }
  /**
   * @param {StructStore} store
   */
  gc(t) {
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   * @param {number} offset
   */
  write(t, e) {
    t.writeString(this.doc.guid), t.writeAny(this.opts);
  }
  /**
   * @return {number}
   */
  getRef() {
    return 9;
  }
}
const vo = (n) => new se(tr(n.readString(), n.readAny()));
class It {
  /**
   * @param {Object} embed
   */
  constructor(t) {
    this.embed = t;
  }
  /**
   * @return {number}
   */
  getLength() {
    return 1;
  }
  /**
   * @return {Array<any>}
   */
  getContent() {
    return [this.embed];
  }
  /**
   * @return {boolean}
   */
  isCountable() {
    return !0;
  }
  /**
   * @return {ContentEmbed}
   */
  copy() {
    return new It(this.embed);
  }
  /**
   * @param {number} offset
   * @return {ContentEmbed}
   */
  splice(t) {
    throw W();
  }
  /**
   * @param {ContentEmbed} right
   * @return {boolean}
   */
  mergeWith(t) {
    return !1;
  }
  /**
   * @param {Transaction} transaction
   * @param {Item} item
   */
  integrate(t, e) {
  }
  /**
   * @param {Transaction} transaction
   */
  delete(t) {
  }
  /**
   * @param {StructStore} store
   */
  gc(t) {
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   * @param {number} offset
   */
  write(t, e) {
    t.writeJSON(this.embed);
  }
  /**
   * @return {number}
   */
  getRef() {
    return 5;
  }
}
const No = (n) => new It(n.readJSON());
class R {
  /**
   * @param {string} key
   * @param {Object} value
   */
  constructor(t, e) {
    this.key = t, this.value = e;
  }
  /**
   * @return {number}
   */
  getLength() {
    return 1;
  }
  /**
   * @return {Array<any>}
   */
  getContent() {
    return [];
  }
  /**
   * @return {boolean}
   */
  isCountable() {
    return !1;
  }
  /**
   * @return {ContentFormat}
   */
  copy() {
    return new R(this.key, this.value);
  }
  /**
   * @param {number} offset
   * @return {ContentFormat}
   */
  splice(t) {
    throw W();
  }
  /**
   * @param {ContentFormat} right
   * @return {boolean}
   */
  mergeWith(t) {
    return !1;
  }
  /**
   * @param {Transaction} transaction
   * @param {Item} item
   */
  integrate(t, e) {
    e.parent._searchMarker = null;
  }
  /**
   * @param {Transaction} transaction
   */
  delete(t) {
  }
  /**
   * @param {StructStore} store
   */
  gc(t) {
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   * @param {number} offset
   */
  write(t, e) {
    t.writeKey(this.key), t.writeJSON(this.value);
  }
  /**
   * @return {number}
   */
  getRef() {
    return 6;
  }
}
const $o = (n) => new R(n.readKey(), n.readJSON());
class De {
  /**
   * @param {Array<any>} arr
   */
  constructor(t) {
    this.arr = t;
  }
  /**
   * @return {number}
   */
  getLength() {
    return this.arr.length;
  }
  /**
   * @return {Array<any>}
   */
  getContent() {
    return this.arr;
  }
  /**
   * @return {boolean}
   */
  isCountable() {
    return !0;
  }
  /**
   * @return {ContentJSON}
   */
  copy() {
    return new De(this.arr);
  }
  /**
   * @param {number} offset
   * @return {ContentJSON}
   */
  splice(t) {
    const e = new De(this.arr.slice(t));
    return this.arr = this.arr.slice(0, t), e;
  }
  /**
   * @param {ContentJSON} right
   * @return {boolean}
   */
  mergeWith(t) {
    return this.arr = this.arr.concat(t.arr), !0;
  }
  /**
   * @param {Transaction} transaction
   * @param {Item} item
   */
  integrate(t, e) {
  }
  /**
   * @param {Transaction} transaction
   */
  delete(t) {
  }
  /**
   * @param {StructStore} store
   */
  gc(t) {
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   * @param {number} offset
   */
  write(t, e) {
    const s = this.arr.length;
    t.writeLen(s - e);
    for (let r = e; r < s; r++) {
      const i = this.arr[r];
      t.writeString(i === void 0 ? "undefined" : JSON.stringify(i));
    }
  }
  /**
   * @return {number}
   */
  getRef() {
    return 2;
  }
}
const Bo = (n) => {
  const t = n.readLen(), e = [];
  for (let s = 0; s < t; s++) {
    const r = n.readString();
    r === "undefined" ? e.push(void 0) : e.push(JSON.parse(r));
  }
  return new De(e);
};
class Et {
  /**
   * @param {Array<any>} arr
   */
  constructor(t) {
    this.arr = t;
  }
  /**
   * @return {number}
   */
  getLength() {
    return this.arr.length;
  }
  /**
   * @return {Array<any>}
   */
  getContent() {
    return this.arr;
  }
  /**
   * @return {boolean}
   */
  isCountable() {
    return !0;
  }
  /**
   * @return {ContentAny}
   */
  copy() {
    return new Et(this.arr);
  }
  /**
   * @param {number} offset
   * @return {ContentAny}
   */
  splice(t) {
    const e = new Et(this.arr.slice(t));
    return this.arr = this.arr.slice(0, t), e;
  }
  /**
   * @param {ContentAny} right
   * @return {boolean}
   */
  mergeWith(t) {
    return this.arr = this.arr.concat(t.arr), !0;
  }
  /**
   * @param {Transaction} transaction
   * @param {Item} item
   */
  integrate(t, e) {
  }
  /**
   * @param {Transaction} transaction
   */
  delete(t) {
  }
  /**
   * @param {StructStore} store
   */
  gc(t) {
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   * @param {number} offset
   */
  write(t, e) {
    const s = this.arr.length;
    t.writeLen(s - e);
    for (let r = e; r < s; r++) {
      const i = this.arr[r];
      t.writeAny(i);
    }
  }
  /**
   * @return {number}
   */
  getRef() {
    return 8;
  }
}
const Vo = (n) => {
  const t = n.readLen(), e = [];
  for (let s = 0; s < t; s++)
    e.push(n.readAny());
  return new Et(e);
};
class Q {
  /**
   * @param {string} str
   */
  constructor(t) {
    this.str = t;
  }
  /**
   * @return {number}
   */
  getLength() {
    return this.str.length;
  }
  /**
   * @return {Array<any>}
   */
  getContent() {
    return this.str.split("");
  }
  /**
   * @return {boolean}
   */
  isCountable() {
    return !0;
  }
  /**
   * @return {ContentString}
   */
  copy() {
    return new Q(this.str);
  }
  /**
   * @param {number} offset
   * @return {ContentString}
   */
  splice(t) {
    const e = new Q(this.str.slice(t));
    this.str = this.str.slice(0, t);
    const s = this.str.charCodeAt(t - 1);
    return s >= 55296 && s <= 56319 && (this.str = this.str.slice(0, t - 1) + "�", e.str = "�" + e.str.slice(1)), e;
  }
  /**
   * @param {ContentString} right
   * @return {boolean}
   */
  mergeWith(t) {
    return this.str += t.str, !0;
  }
  /**
   * @param {Transaction} transaction
   * @param {Item} item
   */
  integrate(t, e) {
  }
  /**
   * @param {Transaction} transaction
   */
  delete(t) {
  }
  /**
   * @param {StructStore} store
   */
  gc(t) {
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   * @param {number} offset
   */
  write(t, e) {
    t.writeString(e === 0 ? this.str : this.str.slice(e));
  }
  /**
   * @return {number}
   */
  getRef() {
    return 4;
  }
}
const jo = (n) => new Q(n.readString()), Fo = [
  ko,
  _o,
  Io,
  Uo,
  Ao,
  Ro,
  To
], Yo = 0, Ko = 1, Ho = 2, Jo = 3, Po = 4, Go = 5, Wo = 6;
class it {
  /**
   * @param {AbstractType<any>} type
   */
  constructor(t) {
    this.type = t;
  }
  /**
   * @return {number}
   */
  getLength() {
    return 1;
  }
  /**
   * @return {Array<any>}
   */
  getContent() {
    return [this.type];
  }
  /**
   * @return {boolean}
   */
  isCountable() {
    return !0;
  }
  /**
   * @return {ContentType}
   */
  copy() {
    return new it(this.type._copy());
  }
  /**
   * @param {number} offset
   * @return {ContentType}
   */
  splice(t) {
    throw W();
  }
  /**
   * @param {ContentType} right
   * @return {boolean}
   */
  mergeWith(t) {
    return !1;
  }
  /**
   * @param {Transaction} transaction
   * @param {Item} item
   */
  integrate(t, e) {
    this.type._integrate(t.doc, e);
  }
  /**
   * @param {Transaction} transaction
   */
  delete(t) {
    let e = this.type._start;
    for (; e !== null; )
      e.deleted ? t._mergeStructs.push(e) : e.delete(t), e = e.right;
    this.type._map.forEach((s) => {
      s.deleted ? t._mergeStructs.push(s) : s.delete(t);
    }), t.changed.delete(this.type);
  }
  /**
   * @param {StructStore} store
   */
  gc(t) {
    let e = this.type._start;
    for (; e !== null; )
      e.gc(t, !0), e = e.right;
    this.type._start = null, this.type._map.forEach(
      /** @param {Item | null} item */
      (s) => {
        for (; s !== null; )
          s.gc(t, !0), s = s.left;
      }
    ), this.type._map = /* @__PURE__ */ new Map();
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   * @param {number} offset
   */
  write(t, e) {
    this.type._write(t);
  }
  /**
   * @return {number}
   */
  getRef() {
    return 7;
  }
}
const zo = (n) => new it(Fo[n.readTypeRef()](n)), qo = (n, t) => {
  let e = t, s = 0, r;
  do
    s > 0 && (e = k(e.client, e.clock + s)), r = pe(n, e), s = e.clock - r.id.clock, e = r.redone;
  while (e !== null && r instanceof I);
  return {
    item: r,
    diff: s
  };
}, Tn = (n, t) => {
  for (; n !== null && n.keep !== t; )
    n.keep = t, n = /** @type {AbstractType<any>} */
    n.parent._item;
}, Ie = (n, t, e) => {
  const { client: s, clock: r } = t.id, i = new I(
    k(s, r + e),
    t,
    k(s, r + e - 1),
    t.right,
    t.rightOrigin,
    t.parent,
    t.parentSub,
    t.content.splice(e)
  );
  return t.deleted && i.markDeleted(), t.keep && (i.keep = !0), t.redone !== null && (i.redone = k(t.redone.client, t.redone.clock + e)), t.right = i, i.right !== null && (i.right.left = i), n._mergeStructs.push(i), i.parentSub !== null && i.right === null && i.parent._map.set(i.parentSub, i), t.length = e, i;
}, er = (n, t, e, s, r) => {
  const i = n.doc, o = i.store, c = i.clientID, l = t.redone;
  if (l !== null)
    return B(n, l);
  let a = (
    /** @type {AbstractType<any>} */
    t.parent._item
  ), h = null, u;
  if (a !== null && a.deleted === !0) {
    if (a.redone === null && (!e.has(a) || er(n, a, e, s, r) === null))
      return null;
    for (; a.redone !== null; )
      a = B(n, a.redone);
  }
  const f = a === null ? (
    /** @type {AbstractType<any>} */
    t.parent
  ) : (
    /** @type {ContentType} */
    a.content.type
  );
  if (t.parentSub === null) {
    for (h = t.left, u = t; h !== null; ) {
      let y = h;
      for (; y !== null && /** @type {AbstractType<any>} */
      y.parent._item !== a; )
        y = y.redone === null ? null : B(n, y.redone);
      if (y !== null && /** @type {AbstractType<any>} */
      y.parent._item === a) {
        h = y;
        break;
      }
      h = h.left;
    }
    for (; u !== null; ) {
      let y = u;
      for (; y !== null && /** @type {AbstractType<any>} */
      y.parent._item !== a; )
        y = y.redone === null ? null : B(n, y.redone);
      if (y !== null && /** @type {AbstractType<any>} */
      y.parent._item === a) {
        u = y;
        break;
      }
      u = u.right;
    }
  } else if (u = null, t.right && !r) {
    for (h = t; h !== null && h.right !== null && Oe(s, h.right.id); )
      h = h.right;
    for (; h !== null && h.redone !== null; )
      h = B(n, h.redone);
    if (h && h.right !== null)
      return null;
  } else
    h = f._map.get(t.parentSub) || null;
  const d = L(o, c), g = k(c, d), w = new I(
    g,
    h,
    h && h.lastId,
    u,
    u && u.id,
    f,
    t.parentSub,
    t.content.copy()
  );
  return t.redone = g, Tn(w, !0), w.integrate(n, 0), w;
};
class I extends Rn {
  /**
   * @param {ID} id
   * @param {Item | null} left
   * @param {ID | null} origin
   * @param {Item | null} right
   * @param {ID | null} rightOrigin
   * @param {AbstractType<any>|ID|null} parent Is a type if integrated, is null if it is possible to copy parent from left or right, is ID before integration to search for it.
   * @param {string | null} parentSub
   * @param {AbstractContent} content
   */
  constructor(t, e, s, r, i, o, c, l) {
    super(t, l.getLength()), this.origin = s, this.left = e, this.right = r, this.rightOrigin = i, this.parent = o, this.parentSub = c, this.redone = null, this.content = l, this.info = this.content.isCountable() ? jn : 0;
  }
  /**
   * This is used to mark the item as an indexed fast-search marker
   *
   * @type {boolean}
   */
  set marker(t) {
    (this.info & Ye) > 0 !== t && (this.info ^= Ye);
  }
  get marker() {
    return (this.info & Ye) > 0;
  }
  /**
   * If true, do not garbage collect this Item.
   */
  get keep() {
    return (this.info & Vn) > 0;
  }
  set keep(t) {
    this.keep !== t && (this.info ^= Vn);
  }
  get countable() {
    return (this.info & jn) > 0;
  }
  /**
   * Whether this item was deleted or not.
   * @type {Boolean}
   */
  get deleted() {
    return (this.info & Fe) > 0;
  }
  set deleted(t) {
    this.deleted !== t && (this.info ^= Fe);
  }
  markDeleted() {
    this.info |= Fe;
  }
  /**
   * Return the creator clientID of the missing op or define missing items and return null.
   *
   * @param {Transaction} transaction
   * @param {StructStore} store
   * @return {null | number}
   */
  getMissing(t, e) {
    if (this.origin && this.origin.client !== this.id.client && this.origin.clock >= L(e, this.origin.client))
      return this.origin.client;
    if (this.rightOrigin && this.rightOrigin.client !== this.id.client && this.rightOrigin.clock >= L(e, this.rightOrigin.client))
      return this.rightOrigin.client;
    if (this.parent && this.parent.constructor === Ut && this.id.client !== this.parent.client && this.parent.clock >= L(e, this.parent.client))
      return this.parent.client;
    if (this.origin && (this.left = ts(t, e, this.origin), this.origin = this.left.lastId), this.rightOrigin && (this.right = B(t, this.rightOrigin), this.rightOrigin = this.right.id), (this.left && this.left.constructor === Y || this.right && this.right.constructor === Y) && (this.parent = null), !this.parent)
      this.left && this.left.constructor === I && (this.parent = this.left.parent, this.parentSub = this.left.parentSub), this.right && this.right.constructor === I && (this.parent = this.right.parent, this.parentSub = this.right.parentSub);
    else if (this.parent.constructor === Ut) {
      const s = pe(e, this.parent);
      s.constructor === Y ? this.parent = null : this.parent = /** @type {ContentType} */
      s.content.type;
    }
    return null;
  }
  /**
   * @param {Transaction} transaction
   * @param {number} offset
   */
  integrate(t, e) {
    if (e > 0 && (this.id.clock += e, this.left = ts(t, t.doc.store, k(this.id.client, this.id.clock - 1)), this.origin = this.left.lastId, this.content = this.content.splice(e), this.length -= e), this.parent) {
      if (!this.left && (!this.right || this.right.left !== null) || this.left && this.left.right !== this.right) {
        let s = this.left, r;
        if (s !== null)
          r = s.right;
        else if (this.parentSub !== null)
          for (r = /** @type {AbstractType<any>} */
          this.parent._map.get(this.parentSub) || null; r !== null && r.left !== null; )
            r = r.left;
        else
          r = /** @type {AbstractType<any>} */
          this.parent._start;
        const i = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Set();
        for (; r !== null && r !== this.right; ) {
          if (o.add(r), i.add(r), le(this.origin, r.origin)) {
            if (r.id.client < this.id.client)
              s = r, i.clear();
            else if (le(this.rightOrigin, r.rightOrigin))
              break;
          } else if (r.origin !== null && o.has(pe(t.doc.store, r.origin)))
            i.has(pe(t.doc.store, r.origin)) || (s = r, i.clear());
          else
            break;
          r = r.right;
        }
        this.left = s;
      }
      if (this.left !== null) {
        const s = this.left.right;
        this.right = s, this.left.right = this;
      } else {
        let s;
        if (this.parentSub !== null)
          for (s = /** @type {AbstractType<any>} */
          this.parent._map.get(this.parentSub) || null; s !== null && s.left !== null; )
            s = s.left;
        else
          s = /** @type {AbstractType<any>} */
          this.parent._start, this.parent._start = this;
        this.right = s;
      }
      this.right !== null ? this.right.left = this : this.parentSub !== null && (this.parent._map.set(this.parentSub, this), this.left !== null && this.left.delete(t)), this.parentSub === null && this.countable && !this.deleted && (this.parent._length += this.length), vs(t.doc.store, this), this.content.integrate(t, this), ns(
        t,
        /** @type {AbstractType<any>} */
        this.parent,
        this.parentSub
      ), /** @type {AbstractType<any>} */
      (this.parent._item !== null && /** @type {AbstractType<any>} */
      this.parent._item.deleted || this.parentSub !== null && this.right !== null) && this.delete(t);
    } else
      new Y(this.id, this.length).integrate(t, 0);
  }
  /**
   * Returns the next non-deleted item
   */
  get next() {
    let t = this.right;
    for (; t !== null && t.deleted; )
      t = t.right;
    return t;
  }
  /**
   * Returns the previous non-deleted item
   */
  get prev() {
    let t = this.left;
    for (; t !== null && t.deleted; )
      t = t.left;
    return t;
  }
  /**
   * Computes the last content address of this Item.
   */
  get lastId() {
    return this.length === 1 ? this.id : k(this.id.client, this.id.clock + this.length - 1);
  }
  /**
   * Try to merge two items
   *
   * @param {Item} right
   * @return {boolean}
   */
  mergeWith(t) {
    if (this.constructor === t.constructor && le(t.origin, this.lastId) && this.right === t && le(this.rightOrigin, t.rightOrigin) && this.id.client === t.id.client && this.id.clock + this.length === t.id.clock && this.deleted === t.deleted && this.redone === null && t.redone === null && this.content.constructor === t.content.constructor && this.content.mergeWith(t.content)) {
      const e = (
        /** @type {AbstractType<any>} */
        this.parent._searchMarker
      );
      return e && e.forEach((s) => {
        s.p === t && (s.p = this, !this.deleted && this.countable && (s.index -= this.length));
      }), t.keep && (this.keep = !0), this.right = t.right, this.right !== null && (this.right.left = this), this.length += t.length, !0;
    }
    return !1;
  }
  /**
   * Mark this Item as deleted.
   *
   * @param {Transaction} transaction
   */
  delete(t) {
    if (!this.deleted) {
      const e = (
        /** @type {AbstractType<any>} */
        this.parent
      );
      this.countable && this.parentSub === null && (e._length -= this.length), this.markDeleted(), Wt(t.deleteSet, this.id.client, this.id.clock, this.length), ns(t, e, this.parentSub), this.content.delete(t);
    }
  }
  /**
   * @param {StructStore} store
   * @param {boolean} parentGCd
   */
  gc(t, e) {
    if (!this.deleted)
      throw z();
    this.content.gc(t), e ? to(t, this, new Y(this.id, this.length)) : this.content = new Qt(this.length);
  }
  /**
   * Transform the properties of this type to binary and write it to an
   * BinaryEncoder.
   *
   * This is called when this Item is sent to a remote peer.
   *
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder The encoder to write data to.
   * @param {number} offset
   */
  write(t, e) {
    const s = e > 0 ? k(this.id.client, this.id.clock + e - 1) : this.origin, r = this.rightOrigin, i = this.parentSub, o = this.content.getRef() & Re | (s === null ? 0 : V) | // origin is defined
    (r === null ? 0 : et) | // right origin is defined
    (i === null ? 0 : Ht);
    if (t.writeInfo(o), s !== null && t.writeLeftID(s), r !== null && t.writeRightID(r), s === null && r === null) {
      const c = (
        /** @type {AbstractType<any>} */
        this.parent
      );
      if (c._item !== void 0) {
        const l = c._item;
        if (l === null) {
          const a = Qi(c);
          t.writeParentInfo(!0), t.writeString(a);
        } else
          t.writeParentInfo(!1), t.writeLeftID(l.id);
      } else
        c.constructor === String ? (t.writeParentInfo(!0), t.writeString(c)) : c.constructor === Ut ? (t.writeParentInfo(!1), t.writeLeftID(c)) : z();
      i !== null && t.writeString(i);
    }
    this.content.write(t, e);
  }
}
const nr = (n, t) => Xo[t & Re](n), Xo = [
  () => {
    z();
  },
  // GC is not ItemContent
  xo,
  // 1
  Bo,
  // 2
  Oo,
  // 3
  jo,
  // 4
  No,
  // 5
  $o,
  // 6
  zo,
  // 7
  Vo,
  // 8
  vo,
  // 9
  () => {
    z();
  }
  // 10 - Skip is not ItemContent
], Qo = 10;
class K extends Rn {
  get deleted() {
    return !0;
  }
  delete() {
  }
  /**
   * @param {Skip} right
   * @return {boolean}
   */
  mergeWith(t) {
    return this.constructor !== t.constructor ? !1 : (this.length += t.length, !0);
  }
  /**
   * @param {Transaction} transaction
   * @param {number} offset
   */
  integrate(t, e) {
    z();
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   * @param {number} offset
   */
  write(t, e) {
    t.writeInfo(Qo), p(t.restEncoder, this.length - e);
  }
  /**
   * @param {Transaction} transaction
   * @param {StructStore} store
   * @return {null | number}
   */
  getMissing(t, e) {
    return null;
  }
}
const sr = (
  /** @type {any} */
  typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : {}
), rr = "__ $YJS$ __";
sr[rr] === !0 && console.error("Yjs was already imported. This breaks constructor checks and will lead to issues! - https://github.com/yjs/yjs/issues/438");
sr[rr] = !0;
function Be(n) {
  return n ? typeof n == "object" : !1;
}
function Zt(n) {
  return Array.isArray(n);
}
function Zo(n) {
  return n instanceof J;
}
function tc(n) {
  return n instanceof X;
}
function ir(n) {
  if (!n)
    return;
  const t = n.$id;
  n.$dispose();
  const e = wr();
  e && Reflect.deleteProperty(e.state.value, t);
}
function D(n) {
  return `[Pinia Yjs plugin] ${n}`;
}
function ec(n) {
  console.warn(D(n));
}
function Ae(n) {
  if (Zt(n)) {
    const t = new J();
    return t.push(
      n.map(function(e) {
        return Ae(e);
      })
    ), t;
  } else if (Be(n)) {
    const t = new X();
    return Object.entries(n).forEach(function([e, s]) {
      t.set(e, Ae(s));
    }), t;
  } else
    return n;
}
function hn(n) {
  if (Zo(n)) {
    const t = new Array();
    for (const e of n)
      t.push(hn(e));
    return t;
  } else if (tc(n)) {
    const t = {};
    return n.forEach(function(e, s) {
      Reflect.set(t, s, hn(e));
    }), t;
  } else
    return n;
}
var O = /* @__PURE__ */ ((n) => (n[n.Update = 0] = "Update", n[n.Delete = 1] = "Delete", n[n.Insert = 2] = "Insert", n))(O || {});
function We(n, t, e, s) {
  let r = n;
  const o = e.length - 1;
  for (let l = 0; l < o; l++)
    r = Reflect.get(r, e[l]);
  const c = e[o];
  switch (t) {
    case O.Update: {
      r[c] = s;
      break;
    }
    case O.Delete: {
      if (Zt(r)) {
        if (!Number.isInteger(c))
          throw new Error(
            D(`Error key type. Require number, get ${typeof c}.`)
          );
        r.splice(c, 1);
      } else if (Be(r))
        Reflect.deleteProperty(r, c);
      else
        throw new Error(D("Error path."));
      break;
    }
    case O.Insert: {
      if (!Zt(r))
        throw new Error(D("Error key path."));
      r.splice(c, 0, s);
      break;
    }
    default:
      throw new Error(D("Invalid operate."));
  }
}
function nc(n, t) {
  let e = n;
  return t.forEach(function(s) {
    e = Reflect.get(e, s);
  }), e;
}
function sc(n, t, e, s) {
  let r = n;
  const o = e.length - 1;
  for (let l = 0; l < o; l++)
    r = r.get(e[l]);
  const c = e[o];
  switch (t) {
    case O.Update: {
      const l = Ae(s);
      if (r instanceof J)
        r.length > c && r.delete(c, 1), r.insert(c, [l]);
      else if (r instanceof X)
        r.set(c, l);
      else
        throw new Error(D("Type error."));
      break;
    }
    case O.Delete: {
      if (r instanceof J || r instanceof X)
        r.delete(c, 1);
      else
        throw new Error(D("Type error."));
      break;
    }
    case O.Insert: {
      const l = Ae(s);
      if (!(r instanceof J))
        throw new Error(D("Type error."));
      r.insert(c, [l]);
      break;
    }
    default:
      throw new Error(D("Invalid operate."));
  }
}
function rc(n, t) {
  let e = n;
  return t.forEach(function(s) {
    e = e.get(s);
  }), e;
}
var at = /* @__PURE__ */ ((n) => (n.$getRawObject = "_$getRawObject", n.yAddOrUpdateByKeyPath = "yAddorUpdateByKeyPath", n.yDeleteByKeyPath = "yDeleteByKeyPath", n.yInsertByKeyPath = "yInsertByKeyPath", n.yTransact = "yTransact", n))(at || {});
function Bc(n) {
  return {
    _$getRawObject() {
      return n;
    },
    yTransact: (t) => {
      t();
    },
    yAddorUpdateByKeyPath: (t, e) => {
      We(n, O.Update, t, e);
    },
    yDeleteByKeyPath: (t) => {
      We(n, O.Delete, t);
    },
    yInsertByKeyPath: (t, e) => {
      We(n, O.Insert, t, e);
    }
  };
}
function ic(n, t, e, s) {
  n.transact(function() {
    for (const r of s)
      Mn(t, e, r);
  });
}
function Mn(n, t, e) {
  const [s, r] = e;
  if (!Zt(r))
    throw new Error(D("Unhandle Operate type."));
  let i;
  switch (s) {
    case O.Update:
    case O.Insert: {
      i = nc(t, r);
      break;
    }
    case O.Delete:
      break;
    default:
      throw new Error(D("Invalid operate."));
  }
  sc(n, s, r, i);
}
function oc(n, t, e) {
  n.forEach(function(s) {
    cc(s, t, e);
  });
}
function cc(n, t, e) {
  const s = n.path || [];
  let r = t;
  if (s.forEach(function(i) {
    r = Reflect.get(r, i);
  }), Zt(r)) {
    let i = 0;
    n.changes.delta.forEach(function(o) {
      if (o.retain)
        i += o.retain;
      else if (o.insert)
        r.splice(i, 0, ...o.insert), i += o.insert.length;
      else if (o.delete)
        r.splice(i, o.delete);
      else
        throw new Error(D("Unhandle delta type."));
    });
  } else if (Be(r))
    n.changes.keys.forEach(function(i, o) {
      switch (i.action) {
        case "add":
        case "update": {
          const l = rc(e, s).get(o);
          Reflect.set(r, o, hn(l));
          break;
        }
        case "delete": {
          Reflect.deleteProperty(r, o);
          break;
        }
        default:
          throw new Error(D("Unknown yjs action."));
      }
    });
  else
    throw new Error(D(`Not support shared type: ${typeof r}.`));
}
const or = /* @__PURE__ */ new Map();
class lc {
  /**
   * @param {string} room
   */
  constructor(t) {
    this.room = t, this.onmessage = null, this._onChange = (e) => e.key === t && this.onmessage !== null && this.onmessage({ data: mi(e.newValue || "") }), ti(this._onChange);
  }
  /**
   * @param {ArrayBuffer} buf
   */
  postMessage(t) {
    ws.setItem(this.room, yi(di(t)));
  }
  close() {
    ei(this._onChange);
  }
}
const ac = typeof BroadcastChannel > "u" ? lc : BroadcastChannel, On = (n) => st(or, n, () => {
  const t = kt(), e = new ac(n);
  return e.onmessage = (s) => t.forEach((r) => r(s.data, "broadcastchannel")), {
    bc: e,
    subs: t
  };
}), hc = (n, t) => (On(n).subs.add(t), t), uc = (n, t) => {
  const e = On(n), s = e.subs.delete(t);
  return s && e.subs.size === 0 && (e.bc.close(), or.delete(n)), s;
}, At = (n, t, e = null) => {
  const s = On(n);
  s.bc.postMessage(t), s.subs.forEach((r) => r(t, e));
}, cr = 0, xn = 1, lr = 2, un = (n, t) => {
  p(n, cr);
  const e = qi(t);
  U(n, e);
}, ar = (n, t, e) => {
  p(n, xn), U(n, Pi(t, e));
}, dc = (n, t, e) => ar(t, e, x(n)), hr = (n, t, e) => {
  try {
    Ki(t, x(n), e);
  } catch (s) {
    console.error("Caught error while handling a Yjs update", s);
  }
}, fc = (n, t) => {
  p(n, lr), U(n, t);
}, gc = hr, pc = (n, t, e, s) => {
  const r = m(n);
  switch (r) {
    case cr:
      dc(n, t, e);
      break;
    case xn:
      hr(n, e, s);
      break;
    case lr:
      gc(n, e, s);
      break;
    default:
      throw new Error("Unknown message type");
  }
  return r;
}, wc = 0, yc = (n, t, e) => {
  switch (m(n)) {
    case wc:
      e(t, lt(n));
  }
}, ze = 3e4;
class mc extends Le {
  /**
   * @param {Y.Doc} doc
   */
  constructor(t) {
    super(), this.doc = t, this.clientID = t.clientID, this.states = /* @__PURE__ */ new Map(), this.meta = /* @__PURE__ */ new Map(), this._checkInterval = /** @type {any} */
    setInterval(() => {
      const e = ut();
      this.getLocalState() !== null && ze / 2 <= e - /** @type {{lastUpdated:number}} */
      this.meta.get(this.clientID).lastUpdated && this.setLocalState(this.getLocalState());
      const s = [];
      this.meta.forEach((r, i) => {
        i !== this.clientID && ze <= e - r.lastUpdated && this.states.has(i) && s.push(i);
      }), s.length > 0 && vn(this, s, "timeout");
    }, nt(ze / 10)), t.on("destroy", () => {
      this.destroy();
    }), this.setLocalState({});
  }
  destroy() {
    this.emit("destroy", [this]), this.setLocalState(null), super.destroy(), clearInterval(this._checkInterval);
  }
  /**
   * @return {Object<string,any>|null}
   */
  getLocalState() {
    return this.states.get(this.clientID) || null;
  }
  /**
   * @param {Object<string,any>|null} state
   */
  setLocalState(t) {
    const e = this.clientID, s = this.meta.get(e), r = s === void 0 ? 0 : s.clock + 1, i = this.states.get(e);
    t === null ? this.states.delete(e) : this.states.set(e, t), this.meta.set(e, {
      clock: r,
      lastUpdated: ut()
    });
    const o = [], c = [], l = [], a = [];
    t === null ? a.push(e) : i == null ? t != null && o.push(e) : (c.push(e), Yt(i, t) || l.push(e)), (o.length > 0 || l.length > 0 || a.length > 0) && this.emit("change", [{ added: o, updated: l, removed: a }, "local"]), this.emit("update", [{ added: o, updated: c, removed: a }, "local"]);
  }
  /**
   * @param {string} field
   * @param {any} value
   */
  setLocalStateField(t, e) {
    const s = this.getLocalState();
    s !== null && this.setLocalState({
      ...s,
      [t]: e
    });
  }
  /**
   * @return {Map<number,Object<string,any>>}
   */
  getStates() {
    return this.states;
  }
}
const vn = (n, t, e) => {
  const s = [];
  for (let r = 0; r < t.length; r++) {
    const i = t[r];
    if (n.states.has(i)) {
      if (n.states.delete(i), i === n.clientID) {
        const o = (
          /** @type {MetaClientState} */
          n.meta.get(i)
        );
        n.meta.set(i, {
          clock: o.clock + 1,
          lastUpdated: ut()
        });
      }
      s.push(i);
    }
  }
  s.length > 0 && (n.emit("change", [{ added: [], updated: [], removed: s }, e]), n.emit("update", [{ added: [], updated: [], removed: s }, e]));
}, Kt = (n, t, e = n.states) => {
  const s = t.length, r = v();
  p(r, s);
  for (let i = 0; i < s; i++) {
    const o = t[i], c = e.get(o) || null, l = (
      /** @type {MetaClientState} */
      n.meta.get(o).clock
    );
    p(r, o), p(r, l), St(r, JSON.stringify(c));
  }
  return A(r);
}, Sc = (n, t, e) => {
  const s = dt(t), r = ut(), i = [], o = [], c = [], l = [], a = m(s);
  for (let h = 0; h < a; h++) {
    const u = m(s);
    let f = m(s);
    const d = JSON.parse(lt(s)), g = n.meta.get(u), w = n.states.get(u), y = g === void 0 ? 0 : g.clock;
    (y < f || y === f && d === null && n.states.has(u)) && (d === null ? u === n.clientID && n.getLocalState() != null ? f++ : n.states.delete(u) : n.states.set(u, d), n.meta.set(u, {
      clock: f,
      lastUpdated: r
    }), g === void 0 && d !== null ? i.push(u) : g !== void 0 && d === null ? l.push(u) : d !== null && (Yt(d, w) || c.push(u), o.push(u)));
  }
  (i.length > 0 || c.length > 0 || l.length > 0) && n.emit("change", [{
    added: i,
    updated: c,
    removed: l
  }, e]), (i.length > 0 || o.length > 0 || l.length > 0) && n.emit("update", [{
    added: i,
    updated: o,
    removed: l
  }, e]);
}, kc = (n) => si(n, (t, e) => `${encodeURIComponent(e)}=${encodeURIComponent(t)}`).join("&"), yt = 0, ur = 3, Lt = 1, bc = 2, re = [];
re[yt] = (n, t, e, s, r) => {
  p(n, yt);
  const i = pc(
    t,
    n,
    e.doc,
    e
  );
  s && i === xn && !e.synced && (e.synced = !0);
};
re[ur] = (n, t, e, s, r) => {
  p(n, Lt), U(
    n,
    Kt(
      e.awareness,
      Array.from(e.awareness.getStates().keys())
    )
  );
};
re[Lt] = (n, t, e, s, r) => {
  Sc(
    e.awareness,
    x(t),
    e
  );
};
re[bc] = (n, t, e, s, r) => {
  yc(
    t,
    e.doc,
    (i, o) => _c(e, o)
  );
};
const ls = 3e4, _c = (n, t) => console.warn(`Permission denied to access ${n.url}.
${t}`), dr = (n, t, e) => {
  const s = dt(t), r = v(), i = m(s), o = n.messageHandlers[i];
  return /** @type {any} */ o ? o(r, s, n, e, i) : console.error("Unable to compute message"), r;
}, fr = (n) => {
  if (n.shouldConnect && n.ws === null) {
    const t = new n._WS(n.url);
    t.binaryType = "arraybuffer", n.ws = t, n.wsconnecting = !0, n.wsconnected = !1, n.synced = !1, t.onmessage = (e) => {
      n.wsLastMessageReceived = ut();
      const s = dr(n, new Uint8Array(e.data), !0);
      fn(s) > 1 && t.send(A(s));
    }, t.onerror = (e) => {
      n.emit("connection-error", [e, n]);
    }, t.onclose = (e) => {
      n.emit("connection-close", [e, n]), n.ws = null, n.wsconnecting = !1, n.wsconnected ? (n.wsconnected = !1, n.synced = !1, vn(
        n.awareness,
        Array.from(n.awareness.getStates().keys()).filter(
          (s) => s !== n.doc.clientID
        ),
        n
      ), n.emit("status", [{
        status: "disconnected"
      }])) : n.wsUnsuccessfulReconnects++, setTimeout(
        fr,
        dn(
          br(2, n.wsUnsuccessfulReconnects) * 100,
          n.maxBackoffTime
        ),
        n
      );
    }, t.onopen = () => {
      n.wsLastMessageReceived = ut(), n.wsconnecting = !1, n.wsconnected = !0, n.wsUnsuccessfulReconnects = 0, n.emit("status", [{
        status: "connected"
      }]);
      const e = v();
      if (p(e, yt), un(e, n.doc), t.send(A(e)), n.awareness.getLocalState() !== null) {
        const s = v();
        p(s, Lt), U(
          s,
          Kt(n.awareness, [
            n.doc.clientID
          ])
        ), t.send(A(s));
      }
    }, n.emit("status", [{
      status: "connecting"
    }]);
  }
}, qe = (n, t) => {
  const e = n.ws;
  n.wsconnected && e && e.readyState === e.OPEN && e.send(t), n.bcconnected && At(n.bcChannel, t, n);
};
class Cc extends Le {
  /**
   * @param {string} serverUrl
   * @param {string} roomname
   * @param {Y.Doc} doc
   * @param {object} opts
   * @param {boolean} [opts.connect]
   * @param {awarenessProtocol.Awareness} [opts.awareness]
   * @param {Object<string,string>} [opts.params]
   * @param {typeof WebSocket} [opts.WebSocketPolyfill] Optionall provide a WebSocket polyfill
   * @param {number} [opts.resyncInterval] Request server state every `resyncInterval` milliseconds
   * @param {number} [opts.maxBackoffTime] Maximum amount of time to wait before trying to reconnect (we try to reconnect using exponential backoff)
   * @param {boolean} [opts.disableBc] Disable cross-tab BroadcastChannel communication
   */
  constructor(t, e, s, {
    connect: r = !0,
    awareness: i = new mc(s),
    params: o = {},
    WebSocketPolyfill: c = WebSocket,
    resyncInterval: l = -1,
    maxBackoffTime: a = 2500,
    disableBc: h = !1
  } = {}) {
    for (super(); t[t.length - 1] === "/"; )
      t = t.slice(0, t.length - 1);
    const u = kc(o);
    this.maxBackoffTime = a, this.bcChannel = t + "/" + e, this.url = t + "/" + e + (u.length === 0 ? "" : "?" + u), this.roomname = e, this.doc = s, this._WS = c, this.awareness = i, this.wsconnected = !1, this.wsconnecting = !1, this.bcconnected = !1, this.disableBc = h, this.wsUnsuccessfulReconnects = 0, this.messageHandlers = re.slice(), this._synced = !1, this.ws = null, this.wsLastMessageReceived = 0, this.shouldConnect = r, this._resyncInterval = 0, l > 0 && (this._resyncInterval = /** @type {any} */
    setInterval(() => {
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        const f = v();
        p(f, yt), un(f, s), this.ws.send(A(f));
      }
    }, l)), this._bcSubscriber = (f, d) => {
      if (d !== this) {
        const g = dr(this, new Uint8Array(f), !1);
        fn(g) > 1 && At(this.bcChannel, A(g), this);
      }
    }, this._updateHandler = (f, d) => {
      if (d !== this) {
        const g = v();
        p(g, yt), fc(g, f), qe(this, A(g));
      }
    }, this.doc.on("update", this._updateHandler), this._awarenessUpdateHandler = ({ added: f, updated: d, removed: g }, w) => {
      const y = f.concat(d).concat(g), $ = v();
      p($, Lt), U(
        $,
        Kt(i, y)
      ), qe(this, A($));
    }, this._unloadHandler = () => {
      vn(
        this.awareness,
        [s.clientID],
        "window unload"
      );
    }, typeof window < "u" ? window.addEventListener("unload", this._unloadHandler) : typeof process < "u" && process.on("exit", this._unloadHandler), i.on("update", this._awarenessUpdateHandler), this._checkInterval = /** @type {any} */
    setInterval(() => {
      this.wsconnected && ls < ut() - this.wsLastMessageReceived && this.ws.close();
    }, ls / 10), r && this.connect();
  }
  /**
   * @type {boolean}
   */
  get synced() {
    return this._synced;
  }
  set synced(t) {
    this._synced !== t && (this._synced = t, this.emit("synced", [t]), this.emit("sync", [t]));
  }
  destroy() {
    this._resyncInterval !== 0 && clearInterval(this._resyncInterval), clearInterval(this._checkInterval), this.disconnect(), typeof window < "u" ? window.removeEventListener("unload", this._unloadHandler) : typeof process < "u" && process.off("exit", this._unloadHandler), this.awareness.off("update", this._awarenessUpdateHandler), this.doc.off("update", this._updateHandler), super.destroy();
  }
  connectBc() {
    if (this.disableBc)
      return;
    this.bcconnected || (hc(this.bcChannel, this._bcSubscriber), this.bcconnected = !0);
    const t = v();
    p(t, yt), un(t, this.doc), At(this.bcChannel, A(t), this);
    const e = v();
    p(e, yt), ar(e, this.doc), At(this.bcChannel, A(e), this);
    const s = v();
    p(s, ur), At(
      this.bcChannel,
      A(s),
      this
    );
    const r = v();
    p(r, Lt), U(
      r,
      Kt(this.awareness, [
        this.doc.clientID
      ])
    ), At(
      this.bcChannel,
      A(r),
      this
    );
  }
  disconnectBc() {
    const t = v();
    p(t, Lt), U(
      t,
      Kt(this.awareness, [
        this.doc.clientID
      ], /* @__PURE__ */ new Map())
    ), qe(this, A(t)), this.bcconnected && (uc(this.bcChannel, this._bcSubscriber), this.bcconnected = !1);
  }
  disconnect() {
    this.shouldConnect = !1, this.disconnectBc(), this.ws !== null && this.ws.close();
  }
  connect() {
    this.shouldConnect = !0, !this.wsconnected && this.ws === null && (fr(this), this.connectBc());
  }
}
var Ve = /* @__PURE__ */ ((n) => (n.Connected = "connected", n.Connecting = "connecting", n.Disconnected = "disconnected", n))(Ve || {});
const gr = "USER";
function as(n, t = 100, e) {
  let s;
  return function(...r) {
    s && clearTimeout(s);
    const i = this;
    e && !s && n.apply(i, r), s = setTimeout(() => {
      s = void 0, !e && n.apply(i, r);
    }, t);
  };
}
function Ec(n) {
  return Reflect.ownKeys(n);
}
function Dc(n, t) {
  if (!(n in t.state.value))
    throw new Error(D("Runtime error."));
}
function Ic(n) {
  if (!(at.$getRawObject in n) || typeof n[at.$getRawObject] != "function")
    throw new Error(D("Runtime error."));
}
function Ac(n, t) {
  if (!(n in t))
    throw new Error(D("Runtime error."));
}
function Uc(n) {
  if (!Be(n))
    throw new Error(D("Only Object state is support."));
}
function Lc(n, t, e, s, r, i) {
  const { $dispose: o } = n;
  n.$dispose = function() {
    r && e.unobserve(r), r = void 0, i && e.unobserveDeep(i), i = void 0, n.$yState && (n.$yState.undoManager && n.$yState.undoManager.destroy(), n.$yState.provider.awareness && n.$yState.provider.awareness.destroy(), n.$yState.provider.destroy(), t.destroy()), n.$yState = void 0, s.destroy(), o();
  };
}
function Rc(n, t) {
  let e;
  switch (n) {
    case at.yAddOrUpdateByKeyPath: {
      e = [O.Update, t[0]];
      break;
    }
    case at.yDeleteByKeyPath: {
      e = [O.Delete, t[0]];
      break;
    }
    case at.yInsertByKeyPath: {
      e = [O.Insert, t[0]];
      break;
    }
  }
  return e;
}
function Tc(n, t, e, s, r) {
  const i = t.getMap(e), o = r ? new io(i) : void 0;
  if (s) {
    const c = n.$state[e];
    C(t, () => {
      Ec(c).forEach(function(l) {
        if (typeof l == "symbol")
          throw new Error(D("Symbol key not support."));
        Mn(i, c, [O.Update, [l]]);
      });
    });
  }
  return n.$yState && (n.$yState.undoManager = o ? yr(o) : void 0), i;
}
function Mc(n, t, e, s) {
  return new Cc(t, e, n, s);
}
function Oc(n, t, e) {
  e.$yState = $n({
    isSynced: !1,
    connectStatus: Ve.Disconnected,
    provider: $n(n),
    roomname: t,
    awareness: {},
    closedSignal: 0
  });
}
function xc(n, t, e) {
  var s;
  (s = n.ws) == null || s.addEventListener("close", function(r) {
    t.$yState && (t.$yState.closedReason = r.reason, t.$yState.closedSignal = r.code);
  }), n.on("status", function(r) {
    r.status === Ve.Disconnected && ec("Disconnent from server."), t.$yState && (t.$yState.connectStatus = r.status);
  }), n.on("sync", async function(r) {
    t.$yState && (t.$yState.isSynced = r), r && e && e();
  }), n.awareness.on("change", function(r) {
    if (t.$yState) {
      const i = n.awareness.getStates(), o = {};
      for (const [c, l] of i) {
        const a = l[gr];
        a && (o[c] = a);
      }
      t.$yState.awareness = o;
    }
  });
}
function vc(n, t) {
  t && n.awareness.setLocalStateField(gr, t);
}
function Vc(n) {
  const {
    options: { yjs: t },
    store: e,
    pinia: s
  } = n;
  if (!t)
    return;
  const { websocketConfig: r, option: i } = t, { roomname: o } = r, {
    rootName: c,
    pushInitialValue: l = !1,
    awareness: a,
    useUndoManager: h = !1,
    onYSynced: u
  } = i, f = e.$id;
  Dc(f, s), Ac(c, e.$state), Ic(e);
  const d = e.$state[c];
  Uc(d);
  const g = new $t(), w = Mc(
    g,
    r.serverUrl,
    o,
    r.option
  );
  Oc(w, o, e), xc(w, e, u), vc(w, a);
  let y = !1, $ = !1;
  y = !0;
  const P = Tc(e, g, c, l, h);
  y = !1;
  const ft = async function(pt, ie) {
    y || ($ = !0, oc(pt, gt, P), $ = !1);
  };
  P.observeDeep(ft);
  const gt = e[at.$getRawObject](), Z = {
    begined: !1,
    transactionActionInfos: /* @__PURE__ */ new Set()
  };
  e.$onAction(
    async function({
      name: pt,
      store: ie,
      args: oe,
      after: Vt,
      onError: S
    }) {
      if ($)
        return;
      pt === at.yTransact && (Z.begined = !0, Vt(function(b) {
        y = !0, ic(g, P, d, Z.transactionActionInfos), Z.transactionActionInfos.clear(), Z.begined = !1, y = !1;
      }));
      const _ = Rc(pt, oe);
      if (!_)
        return;
      const E = _;
      Vt(function(b) {
        Z.begined ? Z.transactionActionInfos.add(E) : (y = !0, Mn(P, d, E), y = !1);
      });
    },
    !0
  ), Lc(e, g, P, w, void 0, ft);
}
const F = {};
function jc(n, t, e, s, r) {
  const { websocketConfig: i, option: o } = s, c = {
    ...r,
    yjs: {
      websocketConfig: i,
      option: o
    }
  };
  if (!Reflect.has(F, n)) {
    const a = ye(n, e, c)();
    Ue(a), F[n] = {
      currentUniqueId: t,
      currentStoreInstance: a
    };
  }
  const l = F[n];
  if (t !== l.currentUniqueId) {
    ir(l.currentStoreInstance);
    const a = ye(n, e, c)();
    Ue(a), l.currentStoreInstance = a, F[n].currentUniqueId = t;
  }
  return F[n].currentStoreInstance;
}
async function Fc(n, t, e, s, r) {
  return new Promise((i, o) => {
    const { websocketConfig: c, option: l, timeout: a = 5e3 } = s;
    function h() {
      var d;
      const f = F[n].currentStoreInstance;
      (d = f.$yState) != null && d.isSynced ? (l.onYSynced && l.onYSynced(), i(f)) : o({
        msg: "Store not synced.",
        store: f
      });
    }
    const u = {
      ...r,
      yjs: {
        websocketConfig: c,
        option: {
          ...l,
          onYSynced: h
        }
      }
    };
    if (Reflect.has(F, n)) {
      const f = F[n];
      if (t !== f.currentUniqueId) {
        ir(f.currentStoreInstance);
        const d = ye(n, e, u)();
        Ue(d), F[n] = {
          currentUniqueId: t,
          currentStoreInstance: d
        };
      } else
        h();
    } else {
      const f = ye(n, e, u)();
      Ue(f), F[n] = {
        currentUniqueId: t,
        currentStoreInstance: f
      };
    }
    setTimeout(() => {
      var g;
      const d = {
        msg: "Sync timeout.",
        store: (g = F[n]) == null ? void 0 : g.currentStoreInstance
      };
      o(d);
    }, a);
  });
}
function Ue(n) {
  const { $dispose: t, $id: e } = n;
  n.$dispose = () => {
    Reflect.deleteProperty(F, e), t();
  };
}
const Xe = "T", ue = 500;
function Yc(n) {
  const t = n, e = ce(!1), s = ce(Number.NaN), r = ce(0), i = ce(0), o = Bn(function() {
    return r.value, a();
  }), c = Bn(function() {
    return i.value, h();
  });
  function l(S, _) {
    t[S] = _, Vt();
  }
  function a() {
    var S, _;
    if (!e.value)
      return !1;
    for (const E in t) {
      const b = (_ = (S = t[E]) == null ? void 0 : S.$yState) == null ? void 0 : _.undoManager;
      if (!b || b.undoing)
        return !1;
      if (b.canUndo())
        return !0;
    }
    return !1;
  }
  function h() {
    var S, _;
    if (!e.value)
      return !1;
    for (const E in t) {
      const b = (_ = (S = t[E]) == null ? void 0 : S.$yState) == null ? void 0 : _.undoManager;
      if (!b || b.redoing)
        return !1;
      if (b.canRedo())
        return !0;
    }
    return !1;
  }
  function u() {
    var E, b;
    if (!a())
      return;
    const S = g("undoStack");
    if (S <= 0)
      return;
    const _ = d(S, "undoStack");
    if (_.length)
      for (const j of _) {
        const N = (b = (E = t[j.key]) == null ? void 0 : E.$yState) == null ? void 0 : b.undoManager;
        !N || !N.canUndo() || N.undo();
      }
  }
  function f() {
    var E, b;
    if (!h())
      return;
    const S = g("redoStack");
    if (S <= 0)
      return;
    const _ = d(S, "redoStack");
    if (_.length)
      for (const j of _) {
        const N = (b = (E = t[j.key]) == null ? void 0 : E.$yState) == null ? void 0 : b.undoManager;
        !N || !N.canRedo() || N.redo();
      }
  }
  function d(S, _) {
    var b, j;
    const E = [];
    if (S <= 0)
      return E;
    for (const N in t) {
      const wt = (j = (b = t[N]) == null ? void 0 : b.$yState) == null ? void 0 : j.undoManager;
      if (!wt)
        continue;
      const pr = w(wt[_]), Nn = Math.abs(S - pr);
      Nn < s.value && E.push({
        key: N,
        interval: Nn
      });
    }
    return E.sort(function(N, wt) {
      return N.interval - wt.interval;
    }), E;
  }
  function g(S) {
    var E, b;
    let _ = -1;
    for (const j in t) {
      const N = (b = (E = t[j]) == null ? void 0 : E.$yState) == null ? void 0 : b.undoManager;
      if (!N)
        return _;
      const wt = w(N[S]);
      (_ <= 0 || wt > _) && (_ = wt);
    }
    return _;
  }
  function w(S) {
    const _ = S.length;
    return _ ? S[_ - 1].meta.get(Xe) ?? -1 : -1;
  }
  function y() {
    r.value++;
  }
  function $() {
    i.value++;
  }
  const P = as(y, ue), ft = as($, ue);
  function gt(S) {
    switch (S) {
      case "undo": {
        P();
        break;
      }
      case "redo": {
        ft();
        break;
      }
      default:
        throw new Error(D("Runtime error."));
    }
  }
  function Z(S) {
    S.stackItem.meta.set(Xe, Date.now()), gt(S.type);
  }
  function pt(S) {
    S.stackItem.meta.set(Xe, Date.now()), gt(S.type);
  }
  function ie(S) {
    gt(S.type);
  }
  function oe(S) {
    S.undoStackCleared && gt("undo"), S.redoStackCleared && gt("redo");
  }
  function Vt() {
    var S, _;
    e.value = !1, s.value = Number.NaN;
    for (const E in t) {
      const b = t[E];
      if (!b) {
        e.value = !1;
        return;
      }
      if (!b.$yState || b.$yState.connectStatus !== Ve.Connected) {
        e.value = !1, console.warn(D(`'${E}' store is not yStore or connected.`));
        return;
      }
      const j = b.$yState.undoManager;
      if (!j) {
        e.value = !1, console.warn(D(`'${E}' store undo manager not enabled.`));
        return;
      }
      if (isNaN(s.value))
        s.value = j.captureTimeout;
      else if (s.value !== j.captureTimeout) {
        e.value = !1, console.warn(D("All store capture timeout must same."));
        return;
      }
    }
    if (s.value < ue) {
      e.value = !1, console.warn(D(`Capture timeout must greater than ${ue}.`));
      return;
    }
    for (const E in t) {
      const b = (_ = (S = t[E]) == null ? void 0 : S.$yState) == null ? void 0 : _.undoManager;
      if (!b)
        throw new Error(D("Runtime error."));
      b.off("stack-item-added", Z), b.off("stack-item-updated", pt), b.off("stack-item-popped", ie), b.off("stack-cleared", oe), b.clear(), b.on("stack-item-added", Z), b.on("stack-item-updated", pt), b.on("stack-item-popped", ie), b.on("stack-cleared", oe);
    }
    e.value = !0;
  }
  return Vt(), {
    enable: e,
    captureTimeout: s,
    undoEnable: o,
    redoEnable: c,
    undo: u,
    redo: f,
    updateStore: l
  };
}
export {
  at as CollaborativeStoreAction,
  Xe as UNDO_MANAGER_STACK_ITEM_META_TIME_KEY,
  Ve as YWebsocketConnectionStatus,
  Fc as defineAsyncYjsUniqueCollaborativeStore,
  jc as defineYjsUniqueCollaborativeStore,
  Vc as piniaYjsPlugin,
  ir as removeStore,
  Bc as useCollaborativeStoreActions,
  Yc as useYjsStoreUnionUndoManager
};
