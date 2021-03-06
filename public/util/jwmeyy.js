/* eslint-disable */
(function webpackUniversalModuleDefinition(root, factory) {
  if (typeof exports === 'object' && typeof module === 'object') module.exports = factory();
  else if (typeof define === 'function' && define.amd) define([], factory);
  else if (typeof exports === 'object') exports["F3"] = factory();
  else root["F3"] = factory()
})(this, function () {
  return (function (modules) {
    var installedModules = {};

    function __webpack_require__(moduleId) {
      if (installedModules[moduleId]) return installedModules[moduleId].exports;
      var module = installedModules[moduleId] = {
        exports: {},
        id: moduleId,
        loaded: false
      };
      modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
      module.loaded = true;
      return module.exports
    }
    __webpack_require__.m = modules;
    __webpack_require__.c = installedModules;
    __webpack_require__.p = "";
    return __webpack_require__(0)
  })
  ([function (module, exports, __webpack_require__) {
    'use strict';
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _camera = __webpack_require__(1);
    Object.defineProperty(exports, 'Camera', {
      enumerable: true,
      get: function get() {
        return _camera.Camera
      }
    });
    var _time = __webpack_require__(6);
    Object.defineProperty(exports, 'Time', {
      enumerable: true,
      get: function get() {
        return _time.Time
      }
    });
    Object.defineProperty(exports, 'TIME', {
      enumerable: true,
      get: function get() {
        return _time.TIME
      }
    });
    var _Vector = __webpack_require__(2);
    Object.defineProperty(exports, 'Vector3', {
      enumerable: true,
      get: function get() {
        return _Vector.Vector3
      }
    });
    var _Euler = __webpack_require__(9);
    Object.defineProperty(exports, 'Euler', {
      enumerable: true,
      get: function get() {
        return _Euler.Euler
      }
    });
    var _obj = __webpack_require__(10);
    Object.defineProperty(exports, 'Obj', {
      enumerable: true,
      get: function get() {
        return _obj.Obj
      }
    });
    var _scene = __webpack_require__(11);
    Object.defineProperty(exports, 'Scene', {
      enumerable: true,
      get: function get() {
        return _scene.Scene
      }
    });
    var _renderer = __webpack_require__(12);
    Object.defineProperty(exports, 'Renderer', {
      enumerable: true,
      get: function get() {
        return _renderer.Renderer
      }
    })
  }, function (module, exports, __webpack_require__) {
    'use strict';
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Camera = undefined;
    var _createClass = function () {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor)
        }
      }
      return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor
      }
    }();
    var _Vector = __webpack_require__(2);

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    var Camera = exports.Camera = function () {
      function Camera() {
        var p = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1200;
        var origin = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new _Vector.Vector3();
        _classCallCheck(this, Camera);
        this.p = p;
        this.origin = origin
      }
      _createClass(Camera, [{
        key: 'getScaleByZ',
        value: function getScaleByZ(z) {
          var scale = void 0;
          if (z > this.p) {
            scale = Infinity
          } else {
            scale = this.p / (-z + this.p)
          }
          return scale
        }
      }, {
        key: 'get2DCrood',
        value: function get2DCrood(v) {
          var scale = this.getScaleByZ(v.z);
          var subV = v.clone().sub(this.origin);
          var vec2D = void 0;
          subV.multiplyScalar(scale);
          vec2D = this.origin.clone().add(subV);
          vec2D.z = 0;
          return vec2D
        }
      }]);
      return Camera
    }()
  }, function (module, exports, __webpack_require__) {
    'use strict';
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Vector3 = undefined;
    var _Math2 = __webpack_require__(3);
    var _Matrix = __webpack_require__(4);
    var _Quaternion = __webpack_require__(5);

    function Vector3(x, y, z) {
      this.x = x || 0;
      this.y = y || 0;
      this.z = z || 0
    }
    Vector3.prototype = {
      constructor: Vector3,
      isVector3: true,
      set: function set(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        return this
      },
      setScalar: function setScalar(scalar) {
        this.x = scalar;
        this.y = scalar;
        this.z = scalar;
        return this
      },
      setX: function setX(x) {
        this.x = x;
        return this
      },
      setY: function setY(y) {
        this.y = y;
        return this
      },
      setZ: function setZ(z) {
        this.z = z;
        return this
      },
      setComponent: function setComponent(index, value) {
        switch (index) {
          case 0:
            this.x = value;
            break;
          case 1:
            this.y = value;
            break;
          case 2:
            this.z = value;
            break;
          default:
            throw new Error('index is out of range: ' + index);
        }
        return this
      },
      getComponent: function getComponent(index) {
        switch (index) {
          case 0:
            return this.x;
          case 1:
            return this.y;
          case 2:
            return this.z;
          default:
            throw new Error('index is out of range: ' + index);
        }
      },
      clone: function clone() {
        return new this.constructor(this.x, this.y, this.z)
      },
      copy: function copy(v) {
        this.x = v.x;
        this.y = v.y;
        this.z = v.z;
        return this
      },
      add: function add(v, w) {
        if (w !== undefined) {
          console.warn('THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead.');
          return this.addVectors(v, w)
        }
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
        return this
      },
      addScalar: function addScalar(s) {
        this.x += s;
        this.y += s;
        this.z += s;
        return this
      },
      addVectors: function addVectors(a, b) {
        this.x = a.x + b.x;
        this.y = a.y + b.y;
        this.z = a.z + b.z;
        return this
      },
      addScaledVector: function addScaledVector(v, s) {
        this.x += v.x * s;
        this.y += v.y * s;
        this.z += v.z * s;
        return this
      },
      sub: function sub(v, w) {
        if (w !== undefined) {
          console.warn('THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.');
          return this.subVectors(v, w)
        }
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
        return this
      },
      subScalar: function subScalar(s) {
        this.x -= s;
        this.y -= s;
        this.z -= s;
        return this
      },
      subVectors: function subVectors(a, b) {
        this.x = a.x - b.x;
        this.y = a.y - b.y;
        this.z = a.z - b.z;
        return this
      },
      multiply: function multiply(v, w) {
        if (w !== undefined) {
          console.warn('THREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead.');
          return this.multiplyVectors(v, w)
        }
        this.x *= v.x;
        this.y *= v.y;
        this.z *= v.z;
        return this
      },
      multiplyScalar: function multiplyScalar(scalar) {
        if (isFinite(scalar)) {
          this.x *= scalar;
          this.y *= scalar;
          this.z *= scalar
        } else {
          this.x = 0;
          this.y = 0;
          this.z = 0
        }
        return this
      },
      multiplyVectors: function multiplyVectors(a, b) {
        this.x = a.x * b.x;
        this.y = a.y * b.y;
        this.z = a.z * b.z;
        return this
      },
      applyEuler: function () {
        var quaternion;
        return function applyEuler(euler) {
          if ((euler && euler.isEuler) === false) {
            console.error('THREE.Vector3: .applyEuler() now expects an Euler rotation rather than a Vector3 and order.')
          }
          if (quaternion === undefined) quaternion = new _Quaternion.Quaternion();
          return this.applyQuaternion(quaternion.setFromEuler(euler))
        }
      }(),
      applyAxisAngle: function () {
        var quaternion;
        return function applyAxisAngle(axis, angle) {
          if (quaternion === undefined) quaternion = new _Quaternion.Quaternion();
          return this.applyQuaternion(quaternion.setFromAxisAngle(axis, angle))
        }
      }(),
      applyMatrix3: function applyMatrix3(m) {
        var x = this.x,
          y = this.y,
          z = this.z;
        var e = m.elements;
        this.x = e[0] * x + e[3] * y + e[6] * z;
        this.y = e[1] * x + e[4] * y + e[7] * z;
        this.z = e[2] * x + e[5] * y + e[8] * z;
        return this
      },
      applyMatrix4: function applyMatrix4(m) {
        var x = this.x,
          y = this.y,
          z = this.z;
        var e = m.elements;
        this.x = e[0] * x + e[4] * y + e[8] * z + e[12];
        this.y = e[1] * x + e[5] * y + e[9] * z + e[13];
        this.z = e[2] * x + e[6] * y + e[10] * z + e[14];
        var w = e[3] * x + e[7] * y + e[11] * z + e[15];
        return this.divideScalar(w)
      },
      applyQuaternion: function applyQuaternion(q) {
        var x = this.x,
          y = this.y,
          z = this.z;
        var qx = q.x,
          qy = q.y,
          qz = q.z,
          qw = q.w;
        var ix = qw * x + qy * z - qz * y;
        var iy = qw * y + qz * x - qx * z;
        var iz = qw * z + qx * y - qy * x;
        var iw = -qx * x - qy * y - qz * z;
        this.x = ix * qw + iw * -qx + iy * -qz - iz * -qy;
        this.y = iy * qw + iw * -qy + iz * -qx - ix * -qz;
        this.z = iz * qw + iw * -qz + ix * -qy - iy * -qx;
        return this
      },
      project: function () {
        var matrix;
        return function project(camera) {
          if (matrix === undefined) matrix = new _Matrix.Matrix4();
          matrix.multiplyMatrices(camera.projectionMatrix, matrix.getInverse(camera.matrixWorld));
          return this.applyMatrix4(matrix)
        }
      }(),
      unproject: function () {
        var matrix;
        return function unproject(camera) {
          if (matrix === undefined) matrix = new _Matrix.Matrix4();
          matrix.multiplyMatrices(camera.matrixWorld, matrix.getInverse(camera.projectionMatrix));
          return this.applyMatrix4(matrix)
        }
      }(),
      transformDirection: function transformDirection(m) {
        var x = this.x,
          y = this.y,
          z = this.z;
        var e = m.elements;
        this.x = e[0] * x + e[4] * y + e[8] * z;
        this.y = e[1] * x + e[5] * y + e[9] * z;
        this.z = e[2] * x + e[6] * y + e[10] * z;
        return this.normalize()
      },
      divide: function divide(v) {
        this.x /= v.x;
        this.y /= v.y;
        this.z /= v.z;
        return this
      },
      divideScalar: function divideScalar(scalar) {
        return this.multiplyScalar(1 / scalar)
      },
      min: function min(v) {
        this.x = Math.min(this.x, v.x);
        this.y = Math.min(this.y, v.y);
        this.z = Math.min(this.z, v.z);
        return this
      },
      max: function max(v) {
        this.x = Math.max(this.x, v.x);
        this.y = Math.max(this.y, v.y);
        this.z = Math.max(this.z, v.z);
        return this
      },
      clamp: function clamp(min, max) {
        this.x = Math.max(min.x, Math.min(max.x, this.x));
        this.y = Math.max(min.y, Math.min(max.y, this.y));
        this.z = Math.max(min.z, Math.min(max.z, this.z));
        return this
      },
      clampScalar: function () {
        var min, max;
        return function clampScalar(minVal, maxVal) {
          if (min === undefined) {
            min = new Vector3();
            max = new Vector3()
          }
          min.set(minVal, minVal, minVal);
          max.set(maxVal, maxVal, maxVal);
          return this.clamp(min, max)
        }
      }(),
      clampLength: function clampLength(min, max) {
        var length = this.length();
        return this.multiplyScalar(Math.max(min, Math.min(max, length)) / length)
      },
      floor: function floor() {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        this.z = Math.floor(this.z);
        return this
      },
      ceil: function ceil() {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        this.z = Math.ceil(this.z);
        return this
      },
      round: function round() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        this.z = Math.round(this.z);
        return this
      },
      roundToZero: function roundToZero() {
        this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x);
        this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y);
        this.z = this.z < 0 ? Math.ceil(this.z) : Math.floor(this.z);
        return this
      },
      negate: function negate() {
        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;
        return this
      },
      dot: function dot(v) {
        return this.x * v.x + this.y * v.y + this.z * v.z
      },
      lengthSq: function lengthSq() {
        return this.x * this.x + this.y * this.y + this.z * this.z
      },
      length: function length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
      },
      lengthManhattan: function lengthManhattan() {
        return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z)
      },
      normalize: function normalize() {
        return this.divideScalar(this.length())
      },
      setLength: function setLength(length) {
        return this.multiplyScalar(length / this.length())
      },
      lerp: function lerp(v, alpha) {
        this.x += (v.x - this.x) * alpha;
        this.y += (v.y - this.y) * alpha;
        this.z += (v.z - this.z) * alpha;
        return this
      },
      lerpVectors: function lerpVectors(v1, v2, alpha) {
        return this.subVectors(v2, v1).multiplyScalar(alpha).add(v1)
      },
      cross: function cross(v, w) {
        if (w !== undefined) {
          console.warn('THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead.');
          return this.crossVectors(v, w)
        }
        var x = this.x,
          y = this.y,
          z = this.z;
        this.x = y * v.z - z * v.y;
        this.y = z * v.x - x * v.z;
        this.z = x * v.y - y * v.x;
        return this
      },
      crossVectors: function crossVectors(a, b) {
        var ax = a.x,
          ay = a.y,
          az = a.z;
        var bx = b.x,
          by = b.y,
          bz = b.z;
        this.x = ay * bz - az * by;
        this.y = az * bx - ax * bz;
        this.z = ax * by - ay * bx;
        return this
      },
      projectOnVector: function projectOnVector(vector) {
        var scalar = vector.dot(this) / vector.lengthSq();
        return this.copy(vector).multiplyScalar(scalar)
      },
      projectOnPlane: function () {
        var v1;
        return function projectOnPlane(planeNormal) {
          if (v1 === undefined) v1 = new Vector3();
          v1.copy(this).projectOnVector(planeNormal);
          return this.sub(v1)
        }
      }(),
      reflect: function () {
        var v1;
        return function reflect(normal) {
          if (v1 === undefined) v1 = new Vector3();
          return this.sub(v1.copy(normal).multiplyScalar(2 * this.dot(normal)))
        }
      }(),
      angleTo: function angleTo(v) {
        var theta = this.dot(v) / Math.sqrt(this.lengthSq() * v.lengthSq());
        return Math.acos(_Math2._Math.clamp(theta, -1, 1))
      },
      distanceTo: function distanceTo(v) {
        return Math.sqrt(this.distanceToSquared(v))
      },
      distanceToSquared: function distanceToSquared(v) {
        var dx = this.x - v.x,
          dy = this.y - v.y,
          dz = this.z - v.z;
        return dx * dx + dy * dy + dz * dz
      },
      distanceToManhattan: function distanceToManhattan(v) {
        return Math.abs(this.x - v.x) + Math.abs(this.y - v.y) + Math.abs(this.z - v.z)
      },
      setFromSpherical: function setFromSpherical(s) {
        var sinPhiRadius = Math.sin(s.phi) * s.radius;
        this.x = sinPhiRadius * Math.sin(s.theta);
        this.y = Math.cos(s.phi) * s.radius;
        this.z = sinPhiRadius * Math.cos(s.theta);
        return this
      },
      setFromCylindrical: function setFromCylindrical(c) {
        this.x = c.radius * Math.sin(c.theta);
        this.y = c.y;
        this.z = c.radius * Math.cos(c.theta);
        return this
      },
      setFromMatrixPosition: function setFromMatrixPosition(m) {
        return this.setFromMatrixColumn(m, 3)
      },
      setFromMatrixScale: function setFromMatrixScale(m) {
        var sx = this.setFromMatrixColumn(m, 0).length();
        var sy = this.setFromMatrixColumn(m, 1).length();
        var sz = this.setFromMatrixColumn(m, 2).length();
        this.x = sx;
        this.y = sy;
        this.z = sz;
        return this
      },
      setFromMatrixColumn: function setFromMatrixColumn(m, index) {
        if (typeof m === 'number') {
          console.warn('THREE.Vector3: setFromMatrixColumn now expects ( matrix, index ).');
          var temp = m;
          m = index;
          index = temp
        }
        return this.fromArray(m.elements, index * 4)
      },
      equals: function equals(v) {
        return v.x === this.x && v.y === this.y && v.z === this.z
      },
      fromArray: function fromArray(array, offset) {
        if (offset === undefined) offset = 0;
        this.x = array[offset];
        this.y = array[offset + 1];
        this.z = array[offset + 2];
        return this
      },
      toArray: function toArray(array, offset) {
        if (array === undefined) array = [];
        if (offset === undefined) offset = 0;
        array[offset] = this.x;
        array[offset + 1] = this.y;
        array[offset + 2] = this.z;
        return array
      },
      fromBufferAttribute: function fromBufferAttribute(attribute, index, offset) {
        if (offset !== undefined) {
          console.warn('THREE.Vector3: offset has been removed from .fromBufferAttribute().')
        }
        this.x = attribute.getX(index);
        this.y = attribute.getY(index);
        this.z = attribute.getZ(index);
        return this
      }
    };
    exports.Vector3 = Vector3
  }, function (module, exports) {
    'use strict';
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _Math = {
      DEG2RAD: Math.PI / 180,
      RAD2DEG: 180 / Math.PI,
      generateUUID: function () {
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        var uuid = new Array(36);
        var rnd = 0,
          r;
        return function generateUUID() {
          for (var i = 0; i < 36; i++) {
            if (i === 8 || i === 13 || i === 18 || i === 23) {
              uuid[i] = '-'
            } else if (i === 14) {
              uuid[i] = '4'
            } else {
              if (rnd <= 0x02) rnd = 0x2000000 + Math.random() * 0x1000000 | 0;
              r = rnd & 0xf;
              rnd = rnd >> 4;
              uuid[i] = chars[i === 19 ? r & 0x3 | 0x8 : r]
            }
          }
          return uuid.join('')
        }
      }(),
      clamp: function clamp(value, min, max) {
        return Math.max(min, Math.min(max, value))
      },
      euclideanModulo: function euclideanModulo(n, m) {
        return (n % m + m) % m
      },
      mapLinear: function mapLinear(x, a1, a2, b1, b2) {
        return b1 + (x - a1) * (b2 - b1) / (a2 - a1)
      },
      lerp: function lerp(x, y, t) {
        return (1 - t) * x + t * y
      },
      smoothstep: function smoothstep(x, min, max) {
        if (x <= min) return 0;
        if (x >= max) return 1;
        x = (x - min) / (max - min);
        return x * x * (3 - 2 * x)
      },
      smootherstep: function smootherstep(x, min, max) {
        if (x <= min) return 0;
        if (x >= max) return 1;
        x = (x - min) / (max - min);
        return x * x * x * (x * (x * 6 - 15) + 10)
      },
      randInt: function randInt(low, high) {
        return low + Math.floor(Math.random() * (high - low + 1))
      },
      randFloat: function randFloat(low, high) {
        return low + Math.random() * (high - low)
      },
      randFloatSpread: function randFloatSpread(range) {
        return range * (0.5 - Math.random())
      },
      degToRad: function degToRad(degrees) {
        return degrees * _Math.DEG2RAD
      },
      radToDeg: function radToDeg(radians) {
        return radians * _Math.RAD2DEG
      },
      isPowerOfTwo: function isPowerOfTwo(value) {
        return (value & value - 1) === 0 && value !== 0
      },
      nearestPowerOfTwo: function nearestPowerOfTwo(value) {
        return Math.pow(2, Math.round(Math.log(value) / Math.LN2))
      },
      nextPowerOfTwo: function nextPowerOfTwo(value) {
        value--;
        value |= value >> 1;
        value |= value >> 2;
        value |= value >> 4;
        value |= value >> 8;
        value |= value >> 16;
        value++;
        return value
      }
    };
    exports._Math = _Math
  }, function (module, exports, __webpack_require__) {
    'use strict';
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Matrix4 = undefined;
    var _Math2 = __webpack_require__(3);
    var _Vector = __webpack_require__(2);

    function Matrix4() {
      this.elements = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
      if (arguments.length > 0) {
        console.error('THREE.Matrix4: the constructor no longer reads arguments. use .set() instead.')
      }
    }
    Matrix4.prototype = {
      constructor: Matrix4,
      isMatrix4: true,
      set: function set(n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44) {
        var te = this.elements;
        te[0] = n11;
        te[4] = n12;
        te[8] = n13;
        te[12] = n14;
        te[1] = n21;
        te[5] = n22;
        te[9] = n23;
        te[13] = n24;
        te[2] = n31;
        te[6] = n32;
        te[10] = n33;
        te[14] = n34;
        te[3] = n41;
        te[7] = n42;
        te[11] = n43;
        te[15] = n44;
        return this
      },
      identity: function identity() {
        this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        return this
      },
      clone: function clone() {
        return new Matrix4().fromArray(this.elements)
      },
      copy: function copy(m) {
        this.elements.set(m.elements);
        return this
      },
      copyPosition: function copyPosition(m) {
        var te = this.elements;
        var me = m.elements;
        te[12] = me[12];
        te[13] = me[13];
        te[14] = me[14];
        return this
      },
      extractBasis: function extractBasis(xAxis, yAxis, zAxis) {
        xAxis.setFromMatrixColumn(this, 0);
        yAxis.setFromMatrixColumn(this, 1);
        zAxis.setFromMatrixColumn(this, 2);
        return this
      },
      makeBasis: function makeBasis(xAxis, yAxis, zAxis) {
        this.set(xAxis.x, yAxis.x, zAxis.x, 0, xAxis.y, yAxis.y, zAxis.y, 0, xAxis.z, yAxis.z, zAxis.z, 0, 0, 0, 0, 1);
        return this
      },
      extractRotation: function () {
        var v1;
        return function extractRotation(m) {
          if (v1 === undefined) v1 = new _Vector.Vector3();
          var te = this.elements;
          var me = m.elements;
          var scaleX = 1 / v1.setFromMatrixColumn(m, 0).length();
          var scaleY = 1 / v1.setFromMatrixColumn(m, 1).length();
          var scaleZ = 1 / v1.setFromMatrixColumn(m, 2).length();
          te[0] = me[0] * scaleX;
          te[1] = me[1] * scaleX;
          te[2] = me[2] * scaleX;
          te[4] = me[4] * scaleY;
          te[5] = me[5] * scaleY;
          te[6] = me[6] * scaleY;
          te[8] = me[8] * scaleZ;
          te[9] = me[9] * scaleZ;
          te[10] = me[10] * scaleZ;
          return this
        }
      }(),
      makeRotationFromEuler: function makeRotationFromEuler(euler) {
        if ((euler && euler.isEuler) === false) {
          console.error('THREE.Matrix: .makeRotationFromEuler() now expects a Euler rotation rather than a Vector3 and order.')
        }
        var te = this.elements;
        var x = euler.x,
          y = euler.y,
          z = euler.z;
        var a = Math.cos(x),
          b = Math.sin(x);
        var c = Math.cos(y),
          d = Math.sin(y);
        var e = Math.cos(z),
          f = Math.sin(z);
        if (euler.order === 'XYZ') {
          var ae = a * e,
            af = a * f,
            be = b * e,
            bf = b * f;
          te[0] = c * e;
          te[4] = -c * f;
          te[8] = d;
          te[1] = af + be * d;
          te[5] = ae - bf * d;
          te[9] = -b * c;
          te[2] = bf - ae * d;
          te[6] = be + af * d;
          te[10] = a * c
        } else if (euler.order === 'YXZ') {
          var ce = c * e,
            cf = c * f,
            de = d * e,
            df = d * f;
          te[0] = ce + df * b;
          te[4] = de * b - cf;
          te[8] = a * d;
          te[1] = a * f;
          te[5] = a * e;
          te[9] = -b;
          te[2] = cf * b - de;
          te[6] = df + ce * b;
          te[10] = a * c
        } else if (euler.order === 'ZXY') {
          var ce = c * e,
            cf = c * f,
            de = d * e,
            df = d * f;
          te[0] = ce - df * b;
          te[4] = -a * f;
          te[8] = de + cf * b;
          te[1] = cf + de * b;
          te[5] = a * e;
          te[9] = df - ce * b;
          te[2] = -a * d;
          te[6] = b;
          te[10] = a * c
        } else if (euler.order === 'ZYX') {
          var ae = a * e,
            af = a * f,
            be = b * e,
            bf = b * f;
          te[0] = c * e;
          te[4] = be * d - af;
          te[8] = ae * d + bf;
          te[1] = c * f;
          te[5] = bf * d + ae;
          te[9] = af * d - be;
          te[2] = -d;
          te[6] = b * c;
          te[10] = a * c
        } else if (euler.order === 'YZX') {
          var ac = a * c,
            ad = a * d,
            bc = b * c,
            bd = b * d;
          te[0] = c * e;
          te[4] = bd - ac * f;
          te[8] = bc * f + ad;
          te[1] = f;
          te[5] = a * e;
          te[9] = -b * e;
          te[2] = -d * e;
          te[6] = ad * f + bc;
          te[10] = ac - bd * f
        } else if (euler.order === 'XZY') {
          var ac = a * c,
            ad = a * d,
            bc = b * c,
            bd = b * d;
          te[0] = c * e;
          te[4] = -f;
          te[8] = d * e;
          te[1] = ac * f + bd;
          te[5] = a * e;
          te[9] = ad * f - bc;
          te[2] = bc * f - ad;
          te[6] = b * e;
          te[10] = bd * f + ac
        }
        te[3] = 0;
        te[7] = 0;
        te[11] = 0;
        te[12] = 0;
        te[13] = 0;
        te[14] = 0;
        te[15] = 1;
        return this
      },
      makeRotationFromQuaternion: function makeRotationFromQuaternion(q) {
        var te = this.elements;
        var x = q.x,
          y = q.y,
          z = q.z,
          w = q.w;
        var x2 = x + x,
          y2 = y + y,
          z2 = z + z;
        var xx = x * x2,
          xy = x * y2,
          xz = x * z2;
        var yy = y * y2,
          yz = y * z2,
          zz = z * z2;
        var wx = w * x2,
          wy = w * y2,
          wz = w * z2;
        te[0] = 1 - (yy + zz);
        te[4] = xy - wz;
        te[8] = xz + wy;
        te[1] = xy + wz;
        te[5] = 1 - (xx + zz);
        te[9] = yz - wx;
        te[2] = xz - wy;
        te[6] = yz + wx;
        te[10] = 1 - (xx + yy);
        te[3] = 0;
        te[7] = 0;
        te[11] = 0;
        te[12] = 0;
        te[13] = 0;
        te[14] = 0;
        te[15] = 1;
        return this
      },
      lookAt: function () {
        var x, y, z;
        return function lookAt(eye, target, up) {
          if (x === undefined) {
            x = new _Vector.Vector3();
            y = new _Vector.Vector3();
            z = new _Vector.Vector3()
          }
          var te = this.elements;
          z.subVectors(eye, target).normalize();
          if (z.lengthSq() === 0) {
            z.z = 1
          }
          x.crossVectors(up, z).normalize();
          if (x.lengthSq() === 0) {
            z.z += 0.0001;
            x.crossVectors(up, z).normalize()
          }
          y.crossVectors(z, x);
          te[0] = x.x;
          te[4] = y.x;
          te[8] = z.x;
          te[1] = x.y;
          te[5] = y.y;
          te[9] = z.y;
          te[2] = x.z;
          te[6] = y.z;
          te[10] = z.z;
          return this
        }
      }(),
      multiply: function multiply(m, n) {
        if (n !== undefined) {
          console.warn('THREE.Matrix4: .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead.');
          return this.multiplyMatrices(m, n)
        }
        return this.multiplyMatrices(this, m)
      },
      premultiply: function premultiply(m) {
        return this.multiplyMatrices(m, this)
      },
      multiplyMatrices: function multiplyMatrices(a, b) {
        var ae = a.elements;
        var be = b.elements;
        var te = this.elements;
        var a11 = ae[0],
          a12 = ae[4],
          a13 = ae[8],
          a14 = ae[12];
        var a21 = ae[1],
          a22 = ae[5],
          a23 = ae[9],
          a24 = ae[13];
        var a31 = ae[2],
          a32 = ae[6],
          a33 = ae[10],
          a34 = ae[14];
        var a41 = ae[3],
          a42 = ae[7],
          a43 = ae[11],
          a44 = ae[15];
        var b11 = be[0],
          b12 = be[4],
          b13 = be[8],
          b14 = be[12];
        var b21 = be[1],
          b22 = be[5],
          b23 = be[9],
          b24 = be[13];
        var b31 = be[2],
          b32 = be[6],
          b33 = be[10],
          b34 = be[14];
        var b41 = be[3],
          b42 = be[7],
          b43 = be[11],
          b44 = be[15];
        te[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
        te[4] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
        te[8] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
        te[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;
        te[1] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
        te[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
        te[9] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
        te[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;
        te[2] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
        te[6] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
        te[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
        te[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;
        te[3] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
        te[7] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
        te[11] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
        te[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;
        return this
      },
      multiplyToArray: function multiplyToArray(a, b, r) {
        var te = this.elements;
        this.multiplyMatrices(a, b);
        r[0] = te[0];
        r[1] = te[1];
        r[2] = te[2];
        r[3] = te[3];
        r[4] = te[4];
        r[5] = te[5];
        r[6] = te[6];
        r[7] = te[7];
        r[8] = te[8];
        r[9] = te[9];
        r[10] = te[10];
        r[11] = te[11];
        r[12] = te[12];
        r[13] = te[13];
        r[14] = te[14];
        r[15] = te[15];
        return this
      },
      multiplyScalar: function multiplyScalar(s) {
        var te = this.elements;
        te[0] *= s;
        te[4] *= s;
        te[8] *= s;
        te[12] *= s;
        te[1] *= s;
        te[5] *= s;
        te[9] *= s;
        te[13] *= s;
        te[2] *= s;
        te[6] *= s;
        te[10] *= s;
        te[14] *= s;
        te[3] *= s;
        te[7] *= s;
        te[11] *= s;
        te[15] *= s;
        return this
      },
      applyToBufferAttribute: function () {
        var v1;
        return function applyToBufferAttribute(attribute) {
          if (v1 === undefined) v1 = new _Vector.Vector3();
          for (var i = 0, l = attribute.count; i < l; i++) {
            v1.x = attribute.getX(i);
            v1.y = attribute.getY(i);
            v1.z = attribute.getZ(i);
            v1.applyMatrix4(this);
            attribute.setXYZ(i, v1.x, v1.y, v1.z)
          }
          return attribute
        }
      }(),
      determinant: function determinant() {
        var te = this.elements;
        var n11 = te[0],
          n12 = te[4],
          n13 = te[8],
          n14 = te[12];
        var n21 = te[1],
          n22 = te[5],
          n23 = te[9],
          n24 = te[13];
        var n31 = te[2],
          n32 = te[6],
          n33 = te[10],
          n34 = te[14];
        var n41 = te[3],
          n42 = te[7],
          n43 = te[11],
          n44 = te[15];
        return n41 * (+n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34) + n42 * (+n11 * n23 * n34 - n11 * n24 * n33 + n14 * n21 * n33 - n13 * n21 * n34 + n13 * n24 * n31 - n14 * n23 * n31) + n43 * (+n11 * n24 * n32 - n11 * n22 * n34 - n14 * n21 * n32 + n12 * n21 * n34 + n14 * n22 * n31 - n12 * n24 * n31) + n44 * (-n13 * n22 * n31 - n11 * n23 * n32 + n11 * n22 * n33 + n13 * n21 * n32 - n12 * n21 * n33 + n12 * n23 * n31)
      },
      transpose: function transpose() {
        var te = this.elements;
        var tmp;
        tmp = te[1];
        te[1] = te[4];
        te[4] = tmp;
        tmp = te[2];
        te[2] = te[8];
        te[8] = tmp;
        tmp = te[6];
        te[6] = te[9];
        te[9] = tmp;
        tmp = te[3];
        te[3] = te[12];
        te[12] = tmp;
        tmp = te[7];
        te[7] = te[13];
        te[13] = tmp;
        tmp = te[11];
        te[11] = te[14];
        te[14] = tmp;
        return this
      },
      setPosition: function setPosition(v) {
        var te = this.elements;
        te[12] = v.x;
        te[13] = v.y;
        te[14] = v.z;
        return this
      },
      getInverse: function getInverse(m, throwOnDegenerate) {
        var te = this.elements,
          me = m.elements,
          n11 = me[0],
          n21 = me[1],
          n31 = me[2],
          n41 = me[3],
          n12 = me[4],
          n22 = me[5],
          n32 = me[6],
          n42 = me[7],
          n13 = me[8],
          n23 = me[9],
          n33 = me[10],
          n43 = me[11],
          n14 = me[12],
          n24 = me[13],
          n34 = me[14],
          n44 = me[15],
          t11 = n23 * n34 * n42 - n24 * n33 * n42 + n24 * n32 * n43 - n22 * n34 * n43 - n23 * n32 * n44 + n22 * n33 * n44,
          t12 = n14 * n33 * n42 - n13 * n34 * n42 - n14 * n32 * n43 + n12 * n34 * n43 + n13 * n32 * n44 - n12 * n33 * n44,
          t13 = n13 * n24 * n42 - n14 * n23 * n42 + n14 * n22 * n43 - n12 * n24 * n43 - n13 * n22 * n44 + n12 * n23 * n44,
          t14 = n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34;
        var det = n11 * t11 + n21 * t12 + n31 * t13 + n41 * t14;
        if (det === 0) {
          var msg = "THREE.Matrix4.getInverse(): can't invert matrix, determinant is 0";
          if (throwOnDegenerate === true) {
            throw new Error(msg);
          } else {
            console.warn(msg)
          }
          return this.identity()
        }
        var detInv = 1 / det;
        te[0] = t11 * detInv;
        te[1] = (n24 * n33 * n41 - n23 * n34 * n41 - n24 * n31 * n43 + n21 * n34 * n43 + n23 * n31 * n44 - n21 * n33 * n44) * detInv;
        te[2] = (n22 * n34 * n41 - n24 * n32 * n41 + n24 * n31 * n42 - n21 * n34 * n42 - n22 * n31 * n44 + n21 * n32 * n44) * detInv;
        te[3] = (n23 * n32 * n41 - n22 * n33 * n41 - n23 * n31 * n42 + n21 * n33 * n42 + n22 * n31 * n43 - n21 * n32 * n43) * detInv;
        te[4] = t12 * detInv;
        te[5] = (n13 * n34 * n41 - n14 * n33 * n41 + n14 * n31 * n43 - n11 * n34 * n43 - n13 * n31 * n44 + n11 * n33 * n44) * detInv;
        te[6] = (n14 * n32 * n41 - n12 * n34 * n41 - n14 * n31 * n42 + n11 * n34 * n42 + n12 * n31 * n44 - n11 * n32 * n44) * detInv;
        te[7] = (n12 * n33 * n41 - n13 * n32 * n41 + n13 * n31 * n42 - n11 * n33 * n42 - n12 * n31 * n43 + n11 * n32 * n43) * detInv;
        te[8] = t13 * detInv;
        te[9] = (n14 * n23 * n41 - n13 * n24 * n41 - n14 * n21 * n43 + n11 * n24 * n43 + n13 * n21 * n44 - n11 * n23 * n44) * detInv;
        te[10] = (n12 * n24 * n41 - n14 * n22 * n41 + n14 * n21 * n42 - n11 * n24 * n42 - n12 * n21 * n44 + n11 * n22 * n44) * detInv;
        te[11] = (n13 * n22 * n41 - n12 * n23 * n41 - n13 * n21 * n42 + n11 * n23 * n42 + n12 * n21 * n43 - n11 * n22 * n43) * detInv;
        te[12] = t14 * detInv;
        te[13] = (n13 * n24 * n31 - n14 * n23 * n31 + n14 * n21 * n33 - n11 * n24 * n33 - n13 * n21 * n34 + n11 * n23 * n34) * detInv;
        te[14] = (n14 * n22 * n31 - n12 * n24 * n31 - n14 * n21 * n32 + n11 * n24 * n32 + n12 * n21 * n34 - n11 * n22 * n34) * detInv;
        te[15] = (n12 * n23 * n31 - n13 * n22 * n31 + n13 * n21 * n32 - n11 * n23 * n32 - n12 * n21 * n33 + n11 * n22 * n33) * detInv;
        return this
      },
      scale: function scale(v) {
        var te = this.elements;
        var x = v.x,
          y = v.y,
          z = v.z;
        te[0] *= x;
        te[4] *= y;
        te[8] *= z;
        te[1] *= x;
        te[5] *= y;
        te[9] *= z;
        te[2] *= x;
        te[6] *= y;
        te[10] *= z;
        te[3] *= x;
        te[7] *= y;
        te[11] *= z;
        return this
      },
      getMaxScaleOnAxis: function getMaxScaleOnAxis() {
        var te = this.elements;
        var scaleXSq = te[0] * te[0] + te[1] * te[1] + te[2] * te[2];
        var scaleYSq = te[4] * te[4] + te[5] * te[5] + te[6] * te[6];
        var scaleZSq = te[8] * te[8] + te[9] * te[9] + te[10] * te[10];
        return Math.sqrt(Math.max(scaleXSq, scaleYSq, scaleZSq))
      },
      makeTranslation: function makeTranslation(x, y, z) {
        this.set(1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1);
        return this
      },
      makeRotationX: function makeRotationX(theta) {
        var c = Math.cos(theta),
          s = Math.sin(theta);
        this.set(1, 0, 0, 0, 0, c, -s, 0, 0, s, c, 0, 0, 0, 0, 1);
        return this
      },
      makeRotationY: function makeRotationY(theta) {
        var c = Math.cos(theta),
          s = Math.sin(theta);
        this.set(c, 0, s, 0, 0, 1, 0, 0, -s, 0, c, 0, 0, 0, 0, 1);
        return this
      },
      makeRotationZ: function makeRotationZ(theta) {
        var c = Math.cos(theta),
          s = Math.sin(theta);
        this.set(c, -s, 0, 0, s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        return this
      },
      makeRotationAxis: function makeRotationAxis(axis, angle) {
        var c = Math.cos(angle);
        var s = Math.sin(angle);
        var t = 1 - c;
        var x = axis.x,
          y = axis.y,
          z = axis.z;
        var tx = t * x,
          ty = t * y;
        this.set(tx * x + c, tx * y - s * z, tx * z + s * y, 0, tx * y + s * z, ty * y + c, ty * z - s * x, 0, tx * z - s * y, ty * z + s * x, t * z * z + c, 0, 0, 0, 0, 1);
        return this
      },
      makeScale: function makeScale(x, y, z) {
        this.set(x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1);
        return this
      },
      makeShear: function makeShear(x, y, z) {
        this.set(1, y, z, 0, x, 1, z, 0, x, y, 1, 0, 0, 0, 0, 1);
        return this
      },
      compose: function compose(position, quaternion, scale) {
        this.makeRotationFromQuaternion(quaternion);
        this.scale(scale);
        this.setPosition(position);
        return this
      },
      decompose: function () {
        var vector, matrix;
        return function decompose(position, quaternion, scale) {
          if (vector === undefined) {
            vector = new _Vector.Vector3();
            matrix = new Matrix4()
          }
          var te = this.elements;
          var sx = vector.set(te[0], te[1], te[2]).length();
          var sy = vector.set(te[4], te[5], te[6]).length();
          var sz = vector.set(te[8], te[9], te[10]).length();
          var det = this.determinant();
          if (det < 0) {
            sx = -sx
          }
          position.x = te[12];
          position.y = te[13];
          position.z = te[14];
          matrix.elements.set(this.elements);
          var invSX = 1 / sx;
          var invSY = 1 / sy;
          var invSZ = 1 / sz;
          matrix.elements[0] *= invSX;
          matrix.elements[1] *= invSX;
          matrix.elements[2] *= invSX;
          matrix.elements[4] *= invSY;
          matrix.elements[5] *= invSY;
          matrix.elements[6] *= invSY;
          matrix.elements[8] *= invSZ;
          matrix.elements[9] *= invSZ;
          matrix.elements[10] *= invSZ;
          quaternion.setFromRotationMatrix(matrix);
          scale.x = sx;
          scale.y = sy;
          scale.z = sz;
          return this
        }
      }(),
      makePerspective: function makePerspective(left, right, top, bottom, near, far) {
        if (far === undefined) {
          console.warn('THREE.Matrix4: .makePerspective() has been redefined and has a new signature. Please check the docs.')
        }
        var te = this.elements;
        var x = 2 * near / (right - left);
        var y = 2 * near / (top - bottom);
        var a = (right + left) / (right - left);
        var b = (top + bottom) / (top - bottom);
        var c = -(far + near) / (far - near);
        var d = -2 * far * near / (far - near);
        te[0] = x;
        te[4] = 0;
        te[8] = a;
        te[12] = 0;
        te[1] = 0;
        te[5] = y;
        te[9] = b;
        te[13] = 0;
        te[2] = 0;
        te[6] = 0;
        te[10] = c;
        te[14] = d;
        te[3] = 0;
        te[7] = 0;
        te[11] = -1;
        te[15] = 0;
        return this
      },
      makeOrthographic: function makeOrthographic(left, right, top, bottom, near, far) {
        var te = this.elements;
        var w = 1.0 / (right - left);
        var h = 1.0 / (top - bottom);
        var p = 1.0 / (far - near);
        var x = (right + left) * w;
        var y = (top + bottom) * h;
        var z = (far + near) * p;
        te[0] = 2 * w;
        te[4] = 0;
        te[8] = 0;
        te[12] = -x;
        te[1] = 0;
        te[5] = 2 * h;
        te[9] = 0;
        te[13] = -y;
        te[2] = 0;
        te[6] = 0;
        te[10] = -2 * p;
        te[14] = -z;
        te[3] = 0;
        te[7] = 0;
        te[11] = 0;
        te[15] = 1;
        return this
      },
      equals: function equals(matrix) {
        var te = this.elements;
        var me = matrix.elements;
        for (var i = 0; i < 16; i++) {
          if (te[i] !== me[i]) return false
        }
        return true
      },
      fromArray: function fromArray(array, offset) {
        if (offset === undefined) offset = 0;
        for (var i = 0; i < 16; i++) {
          this.elements[i] = array[i + offset]
        }
        return this
      },
      toArray: function toArray(array, offset) {
        if (array === undefined) array = [];
        if (offset === undefined) offset = 0;
        var te = this.elements;
        array[offset] = te[0];
        array[offset + 1] = te[1];
        array[offset + 2] = te[2];
        array[offset + 3] = te[3];
        array[offset + 4] = te[4];
        array[offset + 5] = te[5];
        array[offset + 6] = te[6];
        array[offset + 7] = te[7];
        array[offset + 8] = te[8];
        array[offset + 9] = te[9];
        array[offset + 10] = te[10];
        array[offset + 11] = te[11];
        array[offset + 12] = te[12];
        array[offset + 13] = te[13];
        array[offset + 14] = te[14];
        array[offset + 15] = te[15];
        return array
      }
    };
    exports.Matrix4 = Matrix4
  }, function (module, exports, __webpack_require__) {
    'use strict';
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Quaternion = undefined;
    var _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key]
          }
        }
      }
      return target
    };
    var _Vector = __webpack_require__(2);

    function Quaternion(x, y, z, w) {
      this._x = x || 0;
      this._y = y || 0;
      this._z = z || 0;
      this._w = w !== undefined ? w : 1
    }
    Quaternion.prototype = {
      constructor: Quaternion,
      get x() {
        return this._x
      },
      set x(value) {
        this._x = value;
        this.onChangeCallback()
      },
      get y() {
        return this._y
      },
      set y(value) {
        this._y = value;
        this.onChangeCallback()
      },
      get z() {
        return this._z
      },
      set z(value) {
        this._z = value;
        this.onChangeCallback()
      },
      get w() {
        return this._w
      },
      set w(value) {
        this._w = value;
        this.onChangeCallback()
      },
      set: function set(x, y, z, w) {
        this._x = x;
        this._y = y;
        this._z = z;
        this._w = w;
        this.onChangeCallback();
        return this
      },
      clone: function clone() {
        return new this.constructor(this._x, this._y, this._z, this._w)
      },
      copy: function copy(quaternion) {
        this._x = quaternion.x;
        this._y = quaternion.y;
        this._z = quaternion.z;
        this._w = quaternion.w;
        this.onChangeCallback();
        return this
      },
      setFromEuler: function setFromEuler(euler, update) {
        if ((euler && euler.isEuler) === false) {
          throw new Error('THREE.Quaternion: .setFromEuler() now expects an Euler rotation rather than a Vector3 and order.');
        }
        var c1 = Math.cos(euler._x / 2);
        var c2 = Math.cos(euler._y / 2);
        var c3 = Math.cos(euler._z / 2);
        var s1 = Math.sin(euler._x / 2);
        var s2 = Math.sin(euler._y / 2);
        var s3 = Math.sin(euler._z / 2);
        var order = euler.order;
        if (order === 'XYZ') {
          this._x = s1 * c2 * c3 + c1 * s2 * s3;
          this._y = c1 * s2 * c3 - s1 * c2 * s3;
          this._z = c1 * c2 * s3 + s1 * s2 * c3;
          this._w = c1 * c2 * c3 - s1 * s2 * s3
        } else if (order === 'YXZ') {
          this._x = s1 * c2 * c3 + c1 * s2 * s3;
          this._y = c1 * s2 * c3 - s1 * c2 * s3;
          this._z = c1 * c2 * s3 - s1 * s2 * c3;
          this._w = c1 * c2 * c3 + s1 * s2 * s3
        } else if (order === 'ZXY') {
          this._x = s1 * c2 * c3 - c1 * s2 * s3;
          this._y = c1 * s2 * c3 + s1 * c2 * s3;
          this._z = c1 * c2 * s3 + s1 * s2 * c3;
          this._w = c1 * c2 * c3 - s1 * s2 * s3
        } else if (order === 'ZYX') {
          this._x = s1 * c2 * c3 - c1 * s2 * s3;
          this._y = c1 * s2 * c3 + s1 * c2 * s3;
          this._z = c1 * c2 * s3 - s1 * s2 * c3;
          this._w = c1 * c2 * c3 + s1 * s2 * s3
        } else if (order === 'YZX') {
          this._x = s1 * c2 * c3 + c1 * s2 * s3;
          this._y = c1 * s2 * c3 + s1 * c2 * s3;
          this._z = c1 * c2 * s3 - s1 * s2 * c3;
          this._w = c1 * c2 * c3 - s1 * s2 * s3
        } else if (order === 'XZY') {
          this._x = s1 * c2 * c3 - c1 * s2 * s3;
          this._y = c1 * s2 * c3 - s1 * c2 * s3;
          this._z = c1 * c2 * s3 + s1 * s2 * c3;
          this._w = c1 * c2 * c3 + s1 * s2 * s3
        }
        if (update !== false) this.onChangeCallback();
        return this
      },
      setFromAxisAngle: function setFromAxisAngle(axis, angle) {
        var halfAngle = angle / 2,
          s = Math.sin(halfAngle);
        this._x = axis.x * s;
        this._y = axis.y * s;
        this._z = axis.z * s;
        this._w = Math.cos(halfAngle);
        this.onChangeCallback();
        return this
      },
      setFromRotationMatrix: function setFromRotationMatrix(m) {
        var te = m.elements,
          m11 = te[0],
          m12 = te[4],
          m13 = te[8],
          m21 = te[1],
          m22 = te[5],
          m23 = te[9],
          m31 = te[2],
          m32 = te[6],
          m33 = te[10],
          trace = m11 + m22 + m33,
          s;
        if (trace > 0) {
          s = 0.5 / Math.sqrt(trace + 1.0);
          this._w = 0.25 / s;
          this._x = (m32 - m23) * s;
          this._y = (m13 - m31) * s;
          this._z = (m21 - m12) * s
        } else if (m11 > m22 && m11 > m33) {
          s = 2.0 * Math.sqrt(1.0 + m11 - m22 - m33);
          this._w = (m32 - m23) / s;
          this._x = 0.25 * s;
          this._y = (m12 + m21) / s;
          this._z = (m13 + m31) / s
        } else if (m22 > m33) {
          s = 2.0 * Math.sqrt(1.0 + m22 - m11 - m33);
          this._w = (m13 - m31) / s;
          this._x = (m12 + m21) / s;
          this._y = 0.25 * s;
          this._z = (m23 + m32) / s
        } else {
          s = 2.0 * Math.sqrt(1.0 + m33 - m11 - m22);
          this._w = (m21 - m12) / s;
          this._x = (m13 + m31) / s;
          this._y = (m23 + m32) / s;
          this._z = 0.25 * s
        }
        this.onChangeCallback();
        return this
      },
      setFromUnitVectors: function () {
        var v1, r;
        var EPS = 0.000001;
        return function setFromUnitVectors(vFrom, vTo) {
          if (v1 === undefined) v1 = new _Vector.Vector3();
          r = vFrom.dot(vTo) + 1;
          if (r < EPS) {
            r = 0;
            if (Math.abs(vFrom.x) > Math.abs(vFrom.z)) {
              v1.set(-vFrom.y, vFrom.x, 0)
            } else {
              v1.set(0, -vFrom.z, vFrom.y)
            }
          } else {
            v1.crossVectors(vFrom, vTo)
          }
          this._x = v1.x;
          this._y = v1.y;
          this._z = v1.z;
          this._w = r;
          return this.normalize()
        }
      }(),
      inverse: function inverse() {
        return this.conjugate().normalize()
      },
      conjugate: function conjugate() {
        this._x *= -1;
        this._y *= -1;
        this._z *= -1;
        this.onChangeCallback();
        return this
      },
      dot: function dot(v) {
        return this._x * v._x + this._y * v._y + this._z * v._z + this._w * v._w
      },
      lengthSq: function lengthSq() {
        return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w
      },
      length: function length() {
        return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w)
      },
      normalize: function normalize() {
        var l = this.length();
        if (l === 0) {
          this._x = 0;
          this._y = 0;
          this._z = 0;
          this._w = 1
        } else {
          l = 1 / l;
          this._x = this._x * l;
          this._y = this._y * l;
          this._z = this._z * l;
          this._w = this._w * l
        }
        this.onChangeCallback();
        return this
      },
      multiply: function multiply(q, p) {
        if (p !== undefined) {
          console.warn('THREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead.');
          return this.multiplyQuaternions(q, p)
        }
        return this.multiplyQuaternions(this, q)
      },
      premultiply: function premultiply(q) {
        return this.multiplyQuaternions(q, this)
      },
      multiplyQuaternions: function multiplyQuaternions(a, b) {
        var qax = a._x,
          qay = a._y,
          qaz = a._z,
          qaw = a._w;
        var qbx = b._x,
          qby = b._y,
          qbz = b._z,
          qbw = b._w;
        this._x = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;
        this._y = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;
        this._z = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;
        this._w = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;
        this.onChangeCallback();
        return this
      },
      slerp: function slerp(qb, t) {
        if (t === 0) return this;
        if (t === 1) return this.copy(qb);
        var x = this._x,
          y = this._y,
          z = this._z,
          w = this._w;
        var cosHalfTheta = w * qb._w + x * qb._x + y * qb._y + z * qb._z;
        if (cosHalfTheta < 0) {
          this._w = -qb._w;
          this._x = -qb._x;
          this._y = -qb._y;
          this._z = -qb._z;
          cosHalfTheta = -cosHalfTheta
        } else {
          this.copy(qb)
        }
        if (cosHalfTheta >= 1.0) {
          this._w = w;
          this._x = x;
          this._y = y;
          this._z = z;
          return this
        }
        var sinHalfTheta = Math.sqrt(1.0 - cosHalfTheta * cosHalfTheta);
        if (Math.abs(sinHalfTheta) < 0.001) {
          this._w = 0.5 * (w + this._w);
          this._x = 0.5 * (x + this._x);
          this._y = 0.5 * (y + this._y);
          this._z = 0.5 * (z + this._z);
          return this
        }
        var halfTheta = Math.atan2(sinHalfTheta, cosHalfTheta);
        var ratioA = Math.sin((1 - t) * halfTheta) / sinHalfTheta,
          ratioB = Math.sin(t * halfTheta) / sinHalfTheta;
        this._w = w * ratioA + this._w * ratioB;
        this._x = x * ratioA + this._x * ratioB;
        this._y = y * ratioA + this._y * ratioB;
        this._z = z * ratioA + this._z * ratioB;
        this.onChangeCallback();
        return this
      },
      equals: function equals(quaternion) {
        return quaternion._x === this._x && quaternion._y === this._y && quaternion._z === this._z && quaternion._w === this._w
      },
      fromArray: function fromArray(array, offset) {
        if (offset === undefined) offset = 0;
        this._x = array[offset];
        this._y = array[offset + 1];
        this._z = array[offset + 2];
        this._w = array[offset + 3];
        this.onChangeCallback();
        return this
      },
      toArray: function toArray(array, offset) {
        if (array === undefined) array = [];
        if (offset === undefined) offset = 0;
        array[offset] = this._x;
        array[offset + 1] = this._y;
        array[offset + 2] = this._z;
        array[offset + 3] = this._w;
        return array
      },
      onChange: function onChange(callback) {
        this.onChangeCallback = callback;
        return this
      },
      onChangeCallback: function onChangeCallback() {}
    };
    _extends(Quaternion, {
      slerp: function slerp(qa, qb, qm, t) {
        return qm.copy(qa).slerp(qb, t)
      },
      slerpFlat: function slerpFlat(dst, dstOffset, src0, srcOffset0, src1, srcOffset1, t) {
        var x0 = src0[srcOffset0 + 0],
          y0 = src0[srcOffset0 + 1],
          z0 = src0[srcOffset0 + 2],
          w0 = src0[srcOffset0 + 3],
          x1 = src1[srcOffset1 + 0],
          y1 = src1[srcOffset1 + 1],
          z1 = src1[srcOffset1 + 2],
          w1 = src1[srcOffset1 + 3];
        if (w0 !== w1 || x0 !== x1 || y0 !== y1 || z0 !== z1) {
          var s = 1 - t,
            cos = x0 * x1 + y0 * y1 + z0 * z1 + w0 * w1,
            dir = cos >= 0 ? 1 : -1,
            sqrSin = 1 - cos * cos;
          if (sqrSin > Number.EPSILON) {
            var sin = Math.sqrt(sqrSin),
              len = Math.atan2(sin, cos * dir);
            s = Math.sin(s * len) / sin;
            t = Math.sin(t * len) / sin
          }
          var tDir = t * dir;
          x0 = x0 * s + x1 * tDir;
          y0 = y0 * s + y1 * tDir;
          z0 = z0 * s + z1 * tDir;
          w0 = w0 * s + w1 * tDir;
          if (s === 1 - t) {
            var f = 1 / Math.sqrt(x0 * x0 + y0 * y0 + z0 * z0 + w0 * w0);
            x0 *= f;
            y0 *= f;
            z0 *= f;
            w0 *= f
          }
        }
        dst[dstOffset] = x0;
        dst[dstOffset + 1] = y0;
        dst[dstOffset + 2] = z0;
        dst[dstOffset + 3] = w0
      }
    });
    exports.Quaternion = Quaternion
  }, function (module, exports, __webpack_require__) {
    'use strict';
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Time = exports.TIME = undefined;
    var _createClass = function () {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor)
        }
      }
      return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor
      }
    }();
    var _tween = __webpack_require__(7);
    var _tween2 = _interopRequireDefault(_tween);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      }
    }

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    var TIME = {
      bodys: [],
      delta: 16
    };
    var stop = false;
    var t;
    TIME.addBody = function (timeBody) {
      this.bodys.push(timeBody)
    };
    TIME.removeBody = function (timeBody) {
      var index = this.bodys.indexOf(timeBody);
      if (index !== -1) {
        this.bodys.splice(index, 1)
      }
    };
    TIME.tick = function () {
      var now = new Date().getTime();
      var last = now;
      var delta;
      return function () {
        delta = now - last;
        delta = delta > 500 ? 30 : delta < 16 ? 16 : delta;
        TIME.delta = delta;
        last = now;
        TIME.handleFrame(delta);
        if (!stop) {
          t = requestAnimationFrame(TIME.tick)
        }
      }
    }();
    TIME.start = function () {
      stop = false;
      cancelAnimationFrame(t);
      this.tick()
    };
    TIME.stop = function () {
      cancelAnimationFrame(t);
      stop = true
    };
    TIME.handleFrame = function (delta) {
      TIME.bodys.forEach(function (body) {
        if (!body.isStop) {
          body.ticks.forEach(function (tick) {
            tick.fn && tick.fn(delta)
          })
        }
      });
      _tween2.default.update()
    };
    window.TIME = TIME;
    var Time = function () {
      function Time() {
        _classCallCheck(this, Time);
        this.ticks = [];
        this.tweens = [];
        this.isStop = false;
        TIME.addBody(this)
      }
      _createClass(Time, [{
        key: 'destory',
        value: function destory() {
          TIME.removeBody(this)
        }
      }, {
        key: 'addTick',
        value: function addTick(fn) {
          var tick = {
            'fn': fn.bind(this)
          };
          tick.isStop = false;
          this.ticks.push(tick);
          return tick
        }
      }, {
        key: 'removeTick',
        value: function removeTick(tick) {
          if (!tick) {
            this.ticks = [];
            return
          }
          var index = this.ticks.indexOf(tick);
          if (index !== -1) {
            this.ticks.splice(index, 1)
          }
        }
      }, {
        key: 'addTween',
        value: function addTween(tween) {
          this.tweens.push(tween)
        }
      }, {
        key: 'removeTween',
        value: function removeTween(tween) {
          if (!tween) {
            this.tween = [];
            return
          }
          var index = this.tweens.indexOf(tween);
          if (index !== -1) {
            this.tweens.splice(index, 1)
          }
        }
      }, {
        key: 'stop',
        value: function stop() {
          this.isStop = true;
          this.tweens.forEach(function (tween) {
            tween.stop()
          })
        }
      }, {
        key: 'start',
        value: function start() {
          this.isStop = false;
          this.tweens.forEach(function (tween) {
            tween.start()
          })
        }
      }]);
      return Time
    }();
    window.Time = Time;
    for (var i = 0; i < 10000; i += 100) {
      window['TIME_' + i] = window.env === 'develop' ? 0 : i
    }
    exports.TIME = TIME;
    exports.Time = Time
  }, function (module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
    (function (process) {
      'use strict';
      var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj
      } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj
      };
      var TWEEN = TWEEN || function () {
        var _tweens = [];
        return {
          getAll: function getAll() {
            return _tweens
          },
          removeAll: function removeAll() {
            _tweens = []
          },
          add: function add(tween) {
            _tweens.push(tween)
          },
          remove: function remove(tween) {
            var i = _tweens.indexOf(tween);
            if (i !== -1) {
              _tweens.splice(i, 1)
            }
          },
          update: function update(time, preserve) {
            if (_tweens.length === 0) {
              return false
            }
            var i = 0;
            time = time !== undefined ? time : TWEEN.now();
            while (i < _tweens.length) {
              if (_tweens[i].update(time) || preserve) {
                i++
              } else {
                _tweens.splice(i, 1)
              }
            }
            return true
          }
        }
      }();
      if (typeof window === 'undefined' && typeof process !== 'undefined') {
        TWEEN.now = function () {
          var time = process.hrtime();
          return time[0] * 1000 + time[1] / 1000000
        }
      } else if (typeof window !== 'undefined' && window.performance !== undefined && window.performance.now !== undefined) {
        TWEEN.now = window.performance.now.bind(window.performance)
      } else if (Date.now !== undefined) {
        TWEEN.now = Date.now
      } else {
        TWEEN.now = function () {
          return new Date().getTime()
        }
      }
      TWEEN.Tween = function (object) {
        var _object = object;
        var _valuesStart = {};
        var _valuesEnd = {};
        var _valuesStartRepeat = {};
        var _duration = 1000;
        var _repeat = 0;
        var _repeatDelayTime;
        var _yoyo = false;
        var _isPlaying = false;
        var _reversed = false;
        var _delayTime = 0;
        var _startTime = null;
        var _easingFunction = TWEEN.Easing.Linear.None;
        var _interpolationFunction = TWEEN.Interpolation.Linear;
        var _chainedTweens = [];
        var _onStartCallback = null;
        var _onStartCallbackFired = false;
        var _onUpdateCallback = null;
        var _onCompleteCallback = null;
        var _onStopCallback = null;
        this.to = function (properties, duration) {
          _valuesEnd = properties;
          if (duration !== undefined) {
            _duration = duration
          }
          return this
        };
        this.start = function (time) {
          TWEEN.add(this);
          _isPlaying = true;
          _onStartCallbackFired = false;
          _startTime = time !== undefined ? time : TWEEN.now();
          _startTime += _delayTime;
          for (var property in _valuesEnd) {
            if (_valuesEnd[property] instanceof Array) {
              if (_valuesEnd[property].length === 0) {
                continue
              }
              _valuesEnd[property] = [_object[property]].concat(_valuesEnd[property])
            }
            if (_object[property] === undefined) {
              continue
            }
            _valuesStart[property] = _object[property];
            if (_valuesStart[property] instanceof Array === false) {
              _valuesStart[property] *= 1.0
            }
            _valuesStartRepeat[property] = _valuesStart[property] || 0
          }
          return this
        };
        this.stop = function () {
          if (!_isPlaying) {
            return this
          }
          TWEEN.remove(this);
          _isPlaying = false;
          if (_onStopCallback !== null) {
            _onStopCallback.call(_object, _object)
          }
          this.stopChainedTweens();
          return this
        };
        this.end = function () {
          this.update(_startTime + _duration);
          return this
        };
        this.stopChainedTweens = function () {
          for (var i = 0, numChainedTweens = _chainedTweens.length; i < numChainedTweens; i++) {
            _chainedTweens[i].stop()
          }
        };
        this.delay = function (amount) {
          _delayTime = amount;
          return this
        };
        this.repeat = function (times) {
          _repeat = times;
          return this
        };
        this.repeatDelay = function (amount) {
          _repeatDelayTime = amount;
          return this
        };
        this.yoyo = function (yoyo) {
          _yoyo = yoyo;
          return this
        };
        this.easing = function (easing) {
          _easingFunction = easing;
          return this
        };
        this.interpolation = function (interpolation) {
          _interpolationFunction = interpolation;
          return this
        };
        this.chain = function () {
          _chainedTweens = arguments;
          return this
        };
        this.onStart = function (callback) {
          _onStartCallback = callback;
          return this
        };
        this.onUpdate = function (callback) {
          _onUpdateCallback = callback;
          return this
        };
        this.onComplete = function (callback) {
          _onCompleteCallback = callback;
          return this
        };
        this.onStop = function (callback) {
          _onStopCallback = callback;
          return this
        };
        this.update = function (time) {
          var property;
          var elapsed;
          var value;
          if (time < _startTime) {
            return true
          }
          if (_onStartCallbackFired === false) {
            if (_onStartCallback !== null) {
              _onStartCallback.call(_object, _object)
            }
            _onStartCallbackFired = true
          }
          elapsed = (time - _startTime) / _duration;
          elapsed = elapsed > 1 ? 1 : elapsed;
          value = _easingFunction(elapsed);
          for (property in _valuesEnd) {
            if (_valuesStart[property] === undefined) {
              continue
            }
            var start = _valuesStart[property] || 0;
            var end = _valuesEnd[property];
            if (end instanceof Array) {
              _object[property] = _interpolationFunction(end, value)
            } else {
              if (typeof end === 'string') {
                if (end.charAt(0) === '+' || end.charAt(0) === '-') {
                  end = start + parseFloat(end)
                } else {
                  end = parseFloat(end)
                }
              }
              if (typeof end === 'number') {
                _object[property] = start + (end - start) * value
              }
            }
          }
          if (_onUpdateCallback !== null) {
            _onUpdateCallback.call(_object, value)
          }
          if (elapsed === 1) {
            if (_repeat > 0) {
              if (isFinite(_repeat)) {
                _repeat--
              }
              for (property in _valuesStartRepeat) {
                if (typeof _valuesEnd[property] === 'string') {
                  _valuesStartRepeat[property] = _valuesStartRepeat[property] + parseFloat(_valuesEnd[property])
                }
                if (_yoyo) {
                  var tmp = _valuesStartRepeat[property];
                  _valuesStartRepeat[property] = _valuesEnd[property];
                  _valuesEnd[property] = tmp
                }
                _valuesStart[property] = _valuesStartRepeat[property]
              }
              if (_yoyo) {
                _reversed = !_reversed
              }
              if (_repeatDelayTime !== undefined) {
                _startTime = time + _repeatDelayTime
              } else {
                _startTime = time + _delayTime
              }
              return true
            } else {
              if (_onCompleteCallback !== null) {
                _onCompleteCallback.call(_object, _object)
              }
              for (var i = 0, numChainedTweens = _chainedTweens.length; i < numChainedTweens; i++) {
                _chainedTweens[i].start(_startTime + _duration)
              }
              return false
            }
          }
          return true
        }
      };
      TWEEN.Easing = {
        Linear: {
          None: function None(k) {
            return k
          }
        },
        Quadratic: {
          In: function In(k) {
            return k * k
          },
          Out: function Out(k) {
            return k * (2 - k)
          },
          InOut: function InOut(k) {
            if ((k *= 2) < 1) {
              return 0.5 * k * k
            }
            return -0.5 * (--k * (k - 2) - 1)
          }
        },
        Cubic: {
          In: function In(k) {
            return k * k * k
          },
          Out: function Out(k) {
            return --k * k * k + 1
          },
          InOut: function InOut(k) {
            if ((k *= 2) < 1) {
              return 0.5 * k * k * k
            }
            return 0.5 * ((k -= 2) * k * k + 2)
          }
        },
        Quartic: {
          In: function In(k) {
            return k * k * k * k
          },
          Out: function Out(k) {
            return 1 - --k * k * k * k
          },
          InOut: function InOut(k) {
            if ((k *= 2) < 1) {
              return 0.5 * k * k * k * k
            }
            return -0.5 * ((k -= 2) * k * k * k - 2)
          }
        },
        Quintic: {
          In: function In(k) {
            return k * k * k * k * k
          },
          Out: function Out(k) {
            return --k * k * k * k * k + 1
          },
          InOut: function InOut(k) {
            if ((k *= 2) < 1) {
              return 0.5 * k * k * k * k * k
            }
            return 0.5 * ((k -= 2) * k * k * k * k + 2)
          }
        },
        Sinusoidal: {
          In: function In(k) {
            return 1 - Math.cos(k * Math.PI / 2)
          },
          Out: function Out(k) {
            return Math.sin(k * Math.PI / 2)
          },
          InOut: function InOut(k) {
            return 0.5 * (1 - Math.cos(Math.PI * k))
          }
        },
        Exponential: {
          In: function In(k) {
            return k === 0 ? 0 : Math.pow(1024, k - 1)
          },
          Out: function Out(k) {
            return k === 1 ? 1 : 1 - Math.pow(2, -10 * k)
          },
          InOut: function InOut(k) {
            if (k === 0) {
              return 0
            }
            if (k === 1) {
              return 1
            }
            if ((k *= 2) < 1) {
              return 0.5 * Math.pow(1024, k - 1)
            }
            return 0.5 * (-Math.pow(2, -10 * (k - 1)) + 2)
          }
        },
        Circular: {
          In: function In(k) {
            return 1 - Math.sqrt(1 - k * k)
          },
          Out: function Out(k) {
            return Math.sqrt(1 - --k * k)
          },
          InOut: function InOut(k) {
            if ((k *= 2) < 1) {
              return -0.5 * (Math.sqrt(1 - k * k) - 1)
            }
            return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1)
          }
        },
        Elastic: {
          In: function In(k) {
            if (k === 0) {
              return 0
            }
            if (k === 1) {
              return 1
            }
            return -Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI)
          },
          Out: function Out(k) {
            if (k === 0) {
              return 0
            }
            if (k === 1) {
              return 1
            }
            return Math.pow(2, -10 * k) * Math.sin((k - 0.1) * 5 * Math.PI) + 1
          },
          InOut: function InOut(k) {
            if (k === 0) {
              return 0
            }
            if (k === 1) {
              return 1
            }
            k *= 2;
            if (k < 1) {
              return -0.5 * Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI)
            }
            return 0.5 * Math.pow(2, -10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI) + 1
          }
        },
        Back: {
          In: function In(k) {
            var s = 1.70158;
            return k * k * ((s + 1) * k - s)
          },
          Out: function Out(k) {
            var s = 1.70158;
            return --k * k * ((s + 1) * k + s) + 1
          },
          InOut: function InOut(k) {
            var s = 1.70158 * 1.525;
            if ((k *= 2) < 1) {
              return 0.5 * (k * k * ((s + 1) * k - s))
            }
            return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2)
          }
        },
        Bounce: {
          In: function In(k) {
            return 1 - TWEEN.Easing.Bounce.Out(1 - k)
          },
          Out: function Out(k) {
            if (k < 1 / 2.75) {
              return 7.5625 * k * k
            } else if (k < 2 / 2.75) {
              return 7.5625 * (k -= 1.5 / 2.75) * k + 0.75
            } else if (k < 2.5 / 2.75) {
              return 7.5625 * (k -= 2.25 / 2.75) * k + 0.9375
            } else {
              return 7.5625 * (k -= 2.625 / 2.75) * k + 0.984375
            }
          },
          InOut: function InOut(k) {
            if (k < 0.5) {
              return TWEEN.Easing.Bounce.In(k * 2) * 0.5
            }
            return TWEEN.Easing.Bounce.Out(k * 2 - 1) * 0.5 + 0.5
          }
        }
      };
      TWEEN.Interpolation = {
        Linear: function Linear(v, k) {
          var m = v.length - 1;
          var f = m * k;
          var i = Math.floor(f);
          var fn = TWEEN.Interpolation.Utils.Linear;
          if (k < 0) {
            return fn(v[0], v[1], f)
          }
          if (k > 1) {
            return fn(v[m], v[m - 1], m - f)
          }
          return fn(v[i], v[i + 1 > m ? m : i + 1], f - i)
        },
        Bezier: function Bezier(v, k) {
          var b = 0;
          var n = v.length - 1;
          var pw = Math.pow;
          var bn = TWEEN.Interpolation.Utils.Bernstein;
          for (var i = 0; i <= n; i++) {
            b += pw(1 - k, n - i) * pw(k, i) * v[i] * bn(n, i)
          }
          return b
        },
        CatmullRom: function CatmullRom(v, k) {
          var m = v.length - 1;
          var f = m * k;
          var i = Math.floor(f);
          var fn = TWEEN.Interpolation.Utils.CatmullRom;
          if (v[0] === v[m]) {
            if (k < 0) {
              i = Math.floor(f = m * (1 + k))
            }
            return fn(v[(i - 1 + m) % m], v[i], v[(i + 1) % m], v[(i + 2) % m], f - i)
          } else {
            if (k < 0) {
              return v[0] - (fn(v[0], v[0], v[1], v[1], -f) - v[0])
            }
            if (k > 1) {
              return v[m] - (fn(v[m], v[m], v[m - 1], v[m - 1], f - m) - v[m])
            }
            return fn(v[i ? i - 1 : 0], v[i], v[m < i + 1 ? m : i + 1], v[m < i + 2 ? m : i + 2], f - i)
          }
        },
        Utils: {
          Linear: function Linear(p0, p1, t) {
            return (p1 - p0) * t + p0
          },
          Bernstein: function Bernstein(n, i) {
            var fc = TWEEN.Interpolation.Utils.Factorial;
            return fc(n) / fc(i) / fc(n - i)
          },
          Factorial: function () {
            var a = [1];
            return function (n) {
              var s = 1;
              if (a[n]) {
                return a[n]
              }
              for (var i = n; i > 1; i--) {
                s *= i
              }
              a[n] = s;
              return s
            }
          }(),
          CatmullRom: function CatmullRom(p0, p1, p2, p3, t) {
            var v0 = (p2 - p0) * 0.5;
            var v1 = (p3 - p1) * 0.5;
            var t2 = t * t;
            var t3 = t * t2;
            return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (-3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1
          }
        }
      };
      (function (root) {
        if (true) {
          !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
            return TWEEN
          }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
        } else if (typeof module !== 'undefined' && (typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
          module.exports = TWEEN
        } else if (root !== undefined) {
          root.TWEEN = TWEEN
        }
      })(undefined)
    }.call(exports, __webpack_require__(8)))
  }, function (module, exports) {
    'use strict';
    var process = module.exports = {};
    var cachedSetTimeout;
    var cachedClearTimeout;

    function defaultSetTimout() {
      throw new Error('setTimeout has not been defined');
    }

    function defaultClearTimeout() {
      throw new Error('clearTimeout has not been defined');
    }(function () {
      try {
        if (typeof setTimeout === 'function') {
          cachedSetTimeout = setTimeout
        } else {
          cachedSetTimeout = defaultSetTimout
        }
      } catch (e) {
        cachedSetTimeout = defaultSetTimout
      }
      try {
        if (typeof clearTimeout === 'function') {
          cachedClearTimeout = clearTimeout
        } else {
          cachedClearTimeout = defaultClearTimeout
        }
      } catch (e) {
        cachedClearTimeout = defaultClearTimeout
      }
    })();

    function runTimeout(fun) {
      if (cachedSetTimeout === setTimeout) {
        return setTimeout(fun, 0)
      }
      if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0)
      }
      try {
        return cachedSetTimeout(fun, 0)
      } catch (e) {
        try {
          return cachedSetTimeout.call(null, fun, 0)
        } catch (e) {
          return cachedSetTimeout.call(this, fun, 0)
        }
      }
    }

    function runClearTimeout(marker) {
      if (cachedClearTimeout === clearTimeout) {
        return clearTimeout(marker)
      }
      if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker)
      }
      try {
        return cachedClearTimeout(marker)
      } catch (e) {
        try {
          return cachedClearTimeout.call(null, marker)
        } catch (e) {
          return cachedClearTimeout.call(this, marker)
        }
      }
    }
    var queue = [];
    var draining = false;
    var currentQueue;
    var queueIndex = -1;

    function cleanUpNextTick() {
      if (!draining || !currentQueue) {
        return
      }
      draining = false;
      if (currentQueue.length) {
        queue = currentQueue.concat(queue)
      } else {
        queueIndex = -1
      }
      if (queue.length) {
        drainQueue()
      }
    }

    function drainQueue() {
      if (draining) {
        return
      }
      var timeout = runTimeout(cleanUpNextTick);
      draining = true;
      var len = queue.length;
      while (len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
          if (currentQueue) {
            currentQueue[queueIndex].run()
          }
        }
        queueIndex = -1;
        len = queue.length
      }
      currentQueue = null;
      draining = false;
      runClearTimeout(timeout)
    }
    process.nextTick = function (fun) {
      var args = new Array(arguments.length - 1);
      if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
          args[i - 1] = arguments[i]
        }
      }
      queue.push(new Item(fun, args));
      if (queue.length === 1 && !draining) {
        runTimeout(drainQueue)
      }
    };

    function Item(fun, array) {
      this.fun = fun;
      this.array = array
    }
    Item.prototype.run = function () {
      this.fun.apply(null, this.array)
    };
    process.title = 'browser';
    process.browser = true;
    process.env = {};
    process.argv = [];
    process.version = '';
    process.versions = {};

    function noop() {}
    process.on = noop;
    process.addListener = noop;
    process.once = noop;
    process.off = noop;
    process.removeListener = noop;
    process.removeAllListeners = noop;
    process.emit = noop;
    process.binding = function (name) {
      throw new Error('process.binding is not supported');
    };
    process.cwd = function () {
      return '/'
    };
    process.chdir = function (dir) {
      throw new Error('process.chdir is not supported');
    };
    process.umask = function () {
      return 0
    }
  }, function (module, exports, __webpack_require__) {
    'use strict';
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Euler = undefined;
    var _Quaternion = __webpack_require__(5);
    var _Vector = __webpack_require__(2);
    var _Matrix = __webpack_require__(4);
    var _Math2 = __webpack_require__(3);

    function Euler(x, y, z, order) {
      this._x = x || 0;
      this._y = y || 0;
      this._z = z || 0;
      this._order = order || Euler.DefaultOrder
    }
    Euler.RotationOrders = ['XYZ', 'YZX', 'ZXY', 'XZY', 'YXZ', 'ZYX'];
    Euler.DefaultOrder = 'XYZ';
    Euler.prototype = {
      constructor: Euler,
      isEuler: true,
      get x() {
        return this._x
      },
      set x(value) {
        this._x = value;
        this.onChangeCallback()
      },
      get y() {
        return this._y
      },
      set y(value) {
        this._y = value;
        this.onChangeCallback()
      },
      get z() {
        return this._z
      },
      set z(value) {
        this._z = value;
        this.onChangeCallback()
      },
      get order() {
        return this._order
      },
      set order(value) {
        this._order = value;
        this.onChangeCallback()
      },
      set: function set(x, y, z, order) {
        this._x = x;
        this._y = y;
        this._z = z;
        this._order = order || this._order;
        this.onChangeCallback();
        return this
      },
      clone: function clone() {
        return new this.constructor(this._x, this._y, this._z, this._order)
      },
      copy: function copy(euler) {
        this._x = euler._x;
        this._y = euler._y;
        this._z = euler._z;
        this._order = euler._order;
        this.onChangeCallback();
        return this
      },
      setFromRotationMatrix: function setFromRotationMatrix(m, order, update) {
        var clamp = _Math2._Math.clamp;
        var te = m.elements;
        var m11 = te[0],
          m12 = te[4],
          m13 = te[8];
        var m21 = te[1],
          m22 = te[5],
          m23 = te[9];
        var m31 = te[2],
          m32 = te[6],
          m33 = te[10];
        order = order || this._order;
        if (order === 'XYZ') {
          this._y = Math.asin(clamp(m13, -1, 1));
          if (Math.abs(m13) < 0.99999) {
            this._x = Math.atan2(-m23, m33);
            this._z = Math.atan2(-m12, m11)
          } else {
            this._x = Math.atan2(m32, m22);
            this._z = 0
          }
        } else if (order === 'YXZ') {
          this._x = Math.asin(-clamp(m23, -1, 1));
          if (Math.abs(m23) < 0.99999) {
            this._y = Math.atan2(m13, m33);
            this._z = Math.atan2(m21, m22)
          } else {
            this._y = Math.atan2(-m31, m11);
            this._z = 0
          }
        } else if (order === 'ZXY') {
          this._x = Math.asin(clamp(m32, -1, 1));
          if (Math.abs(m32) < 0.99999) {
            this._y = Math.atan2(-m31, m33);
            this._z = Math.atan2(-m12, m22)
          } else {
            this._y = 0;
            this._z = Math.atan2(m21, m11)
          }
        } else if (order === 'ZYX') {
          this._y = Math.asin(-clamp(m31, -1, 1));
          if (Math.abs(m31) < 0.99999) {
            this._x = Math.atan2(m32, m33);
            this._z = Math.atan2(m21, m11)
          } else {
            this._x = 0;
            this._z = Math.atan2(-m12, m22)
          }
        } else if (order === 'YZX') {
          this._z = Math.asin(clamp(m21, -1, 1));
          if (Math.abs(m21) < 0.99999) {
            this._x = Math.atan2(-m23, m22);
            this._y = Math.atan2(-m31, m11)
          } else {
            this._x = 0;
            this._y = Math.atan2(m13, m33)
          }
        } else if (order === 'XZY') {
          this._z = Math.asin(-clamp(m12, -1, 1));
          if (Math.abs(m12) < 0.99999) {
            this._x = Math.atan2(m32, m22);
            this._y = Math.atan2(m13, m11)
          } else {
            this._x = Math.atan2(-m23, m33);
            this._y = 0
          }
        } else {
          console.warn('THREE.Euler: .setFromRotationMatrix() given unsupported order: ' + order)
        }
        this._order = order;
        if (update !== false) this.onChangeCallback();
        return this
      },
      setFromQuaternion: function () {
        var matrix;
        return function setFromQuaternion(q, order, update) {
          if (matrix === undefined) matrix = new _Matrix.Matrix4();
          matrix.makeRotationFromQuaternion(q);
          return this.setFromRotationMatrix(matrix, order, update)
        }
      }(),
      setFromVector3: function setFromVector3(v, order) {
        return this.set(v.x, v.y, v.z, order || this._order)
      },
      reorder: function () {
        var q = new _Quaternion.Quaternion();
        return function reorder(newOrder) {
          q.setFromEuler(this);
          return this.setFromQuaternion(q, newOrder)
        }
      }(),
      equals: function equals(euler) {
        return euler._x === this._x && euler._y === this._y && euler._z === this._z && euler._order === this._order
      },
      fromArray: function fromArray(array) {
        this._x = array[0];
        this._y = array[1];
        this._z = array[2];
        if (array[3] !== undefined) this._order = array[3];
        this.onChangeCallback();
        return this
      },
      toArray: function toArray(array, offset) {
        if (array === undefined) array = [];
        if (offset === undefined) offset = 0;
        array[offset] = this._x;
        array[offset + 1] = this._y;
        array[offset + 2] = this._z;
        array[offset + 3] = this._order;
        return array
      },
      toVector3: function toVector3(optionalResult) {
        if (optionalResult) {
          return optionalResult.set(this._x, this._y, this._z)
        } else {
          return new _Vector.Vector3(this._x, this._y, this._z)
        }
      },
      onChange: function onChange(callback) {
        this.onChangeCallback = callback;
        return this
      },
      onChangeCallback: function onChangeCallback() {}
    };
    exports.Euler = Euler
  }, function (module, exports, __webpack_require__) {
    'use strict';
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Obj = undefined;
    var _createClass = function () {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor)
        }
      }
      return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor
      }
    }();
    var _Vector = __webpack_require__(2);
    var _Euler = __webpack_require__(9);

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    var Obj = exports.Obj = function () {
      function Obj() {
        _classCallCheck(this, Obj);
        this.parent = null;
        this.children = [];
        this.worldPosition = new _Vector.Vector3();
        this.position = new _Vector.Vector3();
        this.scale = new _Vector.Vector3(1, 1, 1);
        this.rotation = new _Euler.Euler();
        this.vertices = [];
        this.worldVertices = [];
        this.willUpdate = false;
        this.croods2D = {
          scale: 1,
          position: new _Vector.Vector3(),
          vertices: []
        }
      }
      _createClass(Obj, [{
        key: 'setPosition',
        value: function setPosition(x, y, z) {
          this.position.set(x, y, z);
          this.onChange()
        }
      }, {
        key: 'setRotation',
        value: function setRotation(x, y, z) {
          this.rotation.set(x, y, z, 'XYZ');
          this.onChange()
        }
      }, {
        key: 'setScale',
        value: function setScale(x, y, z) {
          this.scale.set(x, y, z);
          this.onChange()
        }
      }, {
        key: 'setWorldPosition',
        value: function setWorldPosition() {
          this.worldPosition.copy(this.position);
          if (this.parent) {
            this.worldPosition.multiply(this.parent.scale).applyEuler(this.parent.rotation).add(this.parent.worldPosition)
          }
          this.updateVertice();
          this.children.forEach(function (child) {
            child.setWorldPosition()
          })
        }
      }, {
        key: 'updateVertice',
        value: function updateVertice() {
          var _this = this;
          this.vertices.forEach(function (v, i) {
            if (!_this.worldVertices[i]) {
              _this.worldVertices[i] = _this.worldPosition.clone()
            }
            _this.worldVertices[i].copy(_this.worldPosition).multiply(_this.scale).applyEuler(_this.rotation).add(v)
          })
        }
      }, {
        key: 'calc2DCrood',
        value: function calc2DCrood(camera) {
          this.croods2D.scale = camera.getScaleByZ(this.worldPosition.z);
          this.croods2D.position = camera.get2DCrood(this.worldPosition);
          this.croods2D.vertices = this.worldVertices.map(function (v) {
            return camera.get2DCrood(v)
          });
          this.children.forEach(function (o) {
            o.calc2DCrood(camera)
          })
        }
      }, {
        key: 'add',
        value: function add(child) {
          child.parent = this;
          if (this.children.indexOf(child) === -1) {
            this.children.push(child);
            child.setWorldPosition()
          }
        }
      }, {
        key: 'remove',
        value: function remove(child) {
          delete child.parent;
          this.children = this.children.filter(function (o) {
            return o !== obj
          })
        }
      }, {
        key: 'onChange',
        value: function onChange() {
          this.setWorldPosition();
          return
        }
      }, {
        key: '_render',
        value: function _render(ctx, cvs) { 
          ctx.save(); 
          this.render(ctx, cvs);
          ctx.restore();
          this.children.forEach(function (o) { 
            o._render(ctx, cvs)
          })
        }
      }, {
        key: 'render',
        value: function render(ctx, cvs) { 
        }
      }]);
      return Obj
    }()
  }, function (module, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _createClass = function () {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor)
        }
      }
      return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor
      }
    }();

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    var Scene = function () {
      function Scene() {
        _classCallCheck(this, Scene);
        this.objs = []
      }
      _createClass(Scene, [{
        key: "add",
        value: function add(obj) {
          this.objs.push(obj)
        }
      }, {
        key: "remove",
        value: function remove(obj) {
          this.objs = this.objs.filter(function (o) {
            return o !== obj
          })
          
        }
      }]);
      return Scene
    }();
    exports.Scene = Scene
  }, function (module, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _createClass = function () {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor)
        }
      }
      return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor
      }
    }();

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    var Renderer = function () {
      function Renderer(ctx, cvs) {
        _classCallCheck(this, Renderer);
        this.ctx = ctx;
        this.cvs = cvs
      }
      _createClass(Renderer, [{
        key: "render",
        value: function render(scene, camera) {
          var _this = this;
          this.beforeRender(); 
          scene.objs.forEach(function (o) { 
            o.calc2DCrood(camera);
            o._render(_this.ctx, _this.cvs)
          });
          this.afterRender()
        }
      }, {
        key: "beforeRender",
        value: function beforeRender() { 
          this.ctx.clearRect(0, 0, this.cvs.width, this.cvs.height) 
        }
      }, {
        key: "afterRender",
        value: function afterRender() {}
      }]);
      return Renderer
    }();
    exports.Renderer = Renderer
  }])
});