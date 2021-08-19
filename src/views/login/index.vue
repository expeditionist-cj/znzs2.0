<template>
  <div class="login">
    <div class="bg-login"></div>
    <div class="top-logo">
      <div class="logo">
        <img
          src="../../assets/images/logo.png"
          alt=""
        >
        <span class="logo-title">环保运营智慧服务平台</span>
      </div>

    </div>
    <div class="login-content">
      <div class="logo-text">
        <div class="top">
          <div>
            唤醒沉睡数据
          </div>
          <div>释放数据价值</div>
          <div class="small">Waken Data Release Future
          </div>
        </div>
        <div class="bottom">
          Copyright ©智慧思特大数据有限公司
        </div>
      </div>
      <el-form
        ref="loginForm"
        class="login-form"
        status-icon
        :rules="loginRules"
        :model="loginForm"
        label-width="0"
      >
        <div class="title">
          - Welcome -
        </div>
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            auto-complete="off"
            placeholder="请输入用户名"
            name="loginName"
            @keyup.enter="handleLogin"
          >
            <template #prefix>
              <i class="el-icon-user"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            name="password"
            :type="passwordType"
            auto-complete="off"
            placeholder="请输入密码"
            @keyup.enter="handleLogin"
          >
            <template #suffix>
              <i
                class="el-icon-view el-input__icon"
                @click="showPassword"
              ></i>
            </template>
            <template #prefix>
              <i class="el-icon-lock"></i>
            </template>
          </el-input>
        </el-form-item>
        <!-- <div
          class="checked"
          prop="checked"
        >
          <el-checkbox v-model="loginForm.checked">记住密码</el-checkbox>
        </div> -->
        <el-form-item>
          <el-button
            type="success"
            class="login-submit"
            @click.prevent="handleLogin"
          >登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div
      class="controls"
      style="display:none;"
    >
      <div class="functions btn-group"></div>
      <div class="rotate btn-group">
        <div
          class="btn rotatex"
          data-rotate="x"
        >rotatex</div>
        <div
          class="btn rotatey"
          data-rotate="y"
        >rotatey</div>
        <div
          class="btn rotatez"
          data-rotate="z"
        >rotatez</div>
      </div>
    </div>
    <canvas
      ref="canvas"
      width="2560"
      height="500"
      style="min-width: 1000px; width: 150%; position: fixed; left: 50%; top: 76%; transform: translate(-50%, -50%);z-index: 1;"
    ></canvas>
  </div>
</template>
<script>

export default {
  data () {
    return {
      // showBtn: false,
      loginForm: {
        username: 'admin', // 默认登录时的用户名和密码
        password: '123456',
        code: '',
        redomStr: ''
      },
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码长度最少为6位', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 4, max: 4, message: '验证码长度为4位', trigger: 'blur' }
        ]
      },
      passwordType: 'password'
    }
  },
  mounted () {
    var _createClass = (function () { function defineProperties (target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }());

    function _classCallCheck (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _possibleConstructorReturn (self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === 'object' || typeof call === 'function') ? call : self; }
    // eslint-disable-next-line
    function _inherits (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    var Point = (function (_F3$Obj) {
      _inherits(Point, _F3$Obj);

      function Point () {
        var radius = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 5;

        _classCallCheck(this, Point);
        // eslint-disable-next-line
        var _this = _possibleConstructorReturn(this, (Point.__proto__ || Object.getPrototypeOf(Point)).call(this));

        _this.radius = radius;
        _this.color = 'rgba(' + [Math.random() * 255 | 0, Math.random() * 255 | 0, Math.random() * 255 | 0, Math.random()].join(',') + ')';
        _this.prevCrood = null;
        return _this;
      }

      _createClass(Point, [{
        key: 'render',
        value: function render (ctx) {
          ctx.fillStyle = '#f5f5f5';
          ctx.fillRect(
            this.croods2D.position.x,
            this.croods2D.position.y,
            this.radius * this.croods2D.scale * this.yScale,
            this.radius * this.croods2D.scale * this.yScale
          );
        }
      }]);

      return Point;
      // eslint-disable-next-line
    }(F3.Obj));

    var planeFunctions = {
      'cos(x)*sin(z)': function cosXSinZ (x, z, offset) {
        return Math.cos(x / 4 + offset) * Math.sin(z / 4 + offset) * 1;
      },
      'sin(sqrt(x^2+z^2))': function sinSqrtX2Z2 (x, z, offset) {
        return Math.sin(Math.sqrt(Math.pow(x / 2, 2) + Math.pow(z / 2, 2)) - offset);
      }
    };

    var Effect = (function (_F3$Time) {
      _inherits(Effect, _F3$Time);

      function Effect (renderer, scene, camera, cvs) {
        _classCallCheck(this, Effect);
        // eslint-disable-next-line
        var _this2 = _possibleConstructorReturn(this, (Effect.__proto__ || Object.getPrototypeOf(Effect)).call(this));

        _this2.renderer = renderer;
        _this2.scene = scene;
        _this2.camera = camera;
        _this2.cvs = cvs;

        _this2.xOffset = 0;
        _this2.waveHeight = 0.8; // 波高
        _this2.waveWidth = 16; // 波长

        _this2.col = 33;
        _this2.colPointNum = 33;

        _this2.flyTime = 2000;
        _this2.timePass = 1;

        _this2.scale = 1;
        _this2.scaleStep = 0.1;

        _this2.planeFunction = function () {
          return 0;
        };
        _this2.rotate = { x: false, y: false, z: false };
        // eslint-disable-next-line
        _this2.pointGroup = new F3.Obj();
        _this2.scene.add(_this2.pointGroup);

        _this2.resize(cvs.width, cvs.height);
        _this2.init();
        return _this2;
      }

      _createClass(Effect, [{
        key: 'resize',
        value: function resize (width, height) {
          this.cvs.width = width;
          this.cvs.height = height;
          // this.pointGroup.position.set(this.cvs.width/2, this.cvs.height, 0);
          this.stepWidth = width * 2.5 / this.col;
          this.pointGroup.setPosition(this.cvs.width / 2, this.cvs.height * 1.2, -this.col * this.stepWidth / 2);
          this.pointGroup.setRotation(0.1, 0, 0);
          // this.waveHeight = height/2;
          // this.waveWidth = this.waveHeight * 4;
          // console.log(this.stepWidth);
        }
      }, {
        key: 'init',
        value: function init () {
          // create point
          var point;
          // eslint-disable-next-line
          for (var x = -(this.col - 1) / 2, count = 0; x <= (this.col - 1) / 2; x++) {
            for (var z = -(this.colPointNum - 1) / 2; z <= (this.colPointNum - 1) / 2; z++) {
              point = new Point(10);
              this.pointGroup.add(point);
              /* point.initPos = new F3.Vector3(
                             x + Math.random() * -2 + 1,
                             -30 + -10 * Math.random(),
                             z + Math.random() * -2 + 1
                        );*/
              // eslint-disable-next-line
              point.initPos = new F3.Vector3(0, 0, 0);
              point.flyDelay = 0; // Math.random() * 1000 | 0;
            }
          }
        }
      }, {
        key: 'update',
        value: function update (delta) {
          this.timePass += delta;
          this.xOffset = this.timePass / 500;

          var point = void 0;
          var flyPecent = void 0;
          var x = void 0;
          var y = void 0;
          var z = void 0;
          var count = 0;

          // if (this.timePass < 100)
          for (x = -(this.col - 1) / 2; x <= (this.col - 1) / 2; x++) {
            for (z = -(this.colPointNum - 1) / 2; z <= (this.colPointNum - 1) / 2; z++) {
              // let y = Math.cos(x*Math.PI/this.waveWidth + this.xOffset)*Math.sin(z*Math.PI/this.waveWidth + this.xOffset) * this.waveHeight;

              y = this.planeFunction(x, z, this.xOffset);
              // let y = Math.sin(Math.sqrt(Math.pow(x/v, 2)+Math.pow(z/v, 2)) - this.xOffset) * 1
              // console.log(y);

              point = this.pointGroup.children[count];
              point.yScale = 1; // (-y + 0.6)/(this.waveHeight) * 1.5;

              flyPecent = (this.timePass - point.flyDelay) / this.flyTime;
              flyPecent = flyPecent > 1 ? 1 : flyPecent < 0 ? 0 : flyPecent;

              point.setPosition(x * this.stepWidth, y * this.stepWidth, z * this.stepWidth);
              count++;
            }
          }
          if (this.rotate.x || this.rotate.y || this.rotate.z) {
            this.pointGroup.setRotation(this.rotate.x ? this.pointGroup.rotation.x + 0.001 : 0, this.rotate.y ? this.pointGroup.rotation.y + 0.001 : 0, this.rotate.z ? this.pointGroup.rotation.z + 0.001 : 0);
          }
        }
      }, {
        key: 'setFunction',
        value: function setFunction (fun) {
          this.planeFunction = fun;
        }
      }, {
        key: 'toggleRotate',
        value: function toggleRotate (r) {
          this.rotate[r] = !this.rotate[r];
          if (!this.rotate[r]) {
            this.pointGroup.rotation[r] = 0;
          }
        }
      }, {
        key: 'animate',
        value: function animate () {
          var _this3 = this;

          this.addTick(function (delta) {
            _this3.update(delta);
            _this3.renderer.render(_this3.scene, _this3.camera);
          });
        }
      }]);

      return Effect;
      // eslint-disable-next-line
    }(F3.Time));

    function init (cvs) {
      var ctx = cvs.getContext('2d');
      // eslint-disable-next-line
      var scene = new F3.Scene();
      // eslint-disable-next-line
      var camera = new F3.Camera();
      // eslint-disable-next-line
      camera.origin = new F3.Vector3(cvs.width / 2, cvs.height / 3);
      camera.p = 1200;
      // eslint-disable-next-line
      var renderer = new F3.Renderer(ctx, cvs);
      var effect = new Effect(renderer, scene, camera, cvs);
      effect.animate();

      var functions = document.querySelector('.functions');
      var btnHTML = '';
      for (var name in planeFunctions) {
        btnHTML += '<div class="btn" data-function="' + name + '">' + name + '</div>';
      }
      functions.innerHTML = btnHTML;

      var btns = functions.querySelectorAll('.btn');
      function selectFunction (funName) {
        btns.forEach(function (btn) {
          var dataFunction = btn.dataset.function;
          if (dataFunction === funName) {
            btn.classList.add('active');
            effect.setFunction(planeFunctions[funName]);
          } else {
            btn.classList.remove('active');
          }
        });
      }
      selectFunction(btns[0].dataset.function);
      functions.addEventListener('click', function (e) {
        if (e.target.dataset.function) {
          selectFunction(e.target.dataset.function);
        }
      });

      var rotate = document.querySelector('.rotate');
      var rotateBtns = rotate.querySelectorAll('.btn');
      function toggleRotate (_r) {
        rotateBtns.forEach(function (rotateBtn) {
          var r = rotateBtn.dataset.rotate;
          if (r === _r) {
            rotateBtn.classList.toggle('active');
            effect.toggleRotate(r);
          }
        });
      }
      toggleRotate('y');
      rotate.addEventListener('click', function (e) {
        if (e.target.dataset.rotate) {
          toggleRotate(e.target.dataset.rotate);
        }
      });
      // eslint-disable-next-line
      F3.TIME.start();
    }
    init(this.$refs.canvas);
  },
  methods: {
    handleLogin () {
      // console.log(this.loginForm, 123);
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          // console.log(this.loginForm)
          this.$store
            .dispatch('LoginByUsername', this.loginForm)
            .then((res) => {
              // this.$router.push({ path: '/' });
              if (res) {
                this.$router.push({ path: '/' });
              } else {
                this.$message.error('用户名或密码错误！')
              }
            })
            .catch((err) => {
              this.$message.error(err.message)
              this.$router.push({ path: '/' });
            });
        }
      });
    },
    showPassword () {
      this.passwordType === ''
        ? (this.passwordType = 'password')
        : (this.passwordType = '');
    }
  }
}
</script>
<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  background: transparent;
  .bg-login {
    width: 100%;
    height: 200%;
    background: radial-gradient(closest-side, #50556d, #272a3b);
    position: fixed;
    z-index: 0;
    top: -100%;
  }
  .top-logo {
    position: relative;
    z-index: 2;
    padding: 3.4rem 0 0 6rem;
    .logo {
      display: flex;
      align-items: center;
      img {
        width: 4.8rem;
        height: 5.7rem;
        margin-right: 1rem;
      }
      .logo-title {
        font-size: 3.2rem;
        font-weight: 800;
        color: #fff;
        line-height: 3.2rem;
      }
    }
  }
  .login-content {
    width: 84.9rem;
    height: 35.6rem;
    background: url("../../assets/images/login-bg.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: relative;
    z-index: 2;
    top: 20%;
    margin: auto;
    display: flex;
    justify-content: space-between;
    box-shadow: 0 0 1rem #b7eed8;
    border-radius: 3rem;
    .logo-text {
      text-align: right;
      position: relative;
      top: 4.8rem;
      left: 18.9rem;
      .top {
        font-size: 4rem;
        color: #fff;
        .small {
          font-size: 1.6rem;
        }
      }
      .bottom {
        margin-top: 15rem;
      }
    }
    .login-form {
      width: 31.9rem;
      height: 33.6rem;
      color: #fff;
      padding: 2rem 1.5rem 0;
      border-radius: 0 2.5rem 2.5rem 0;
      background: linear-gradient(
        180deg,
        rgba(130, 255, 160, 0.5) 0%,
        rgba(80, 203, 200, 0.1) 100%
      );
      .title {
        position: relative;
        z-index: 2;
        text-align: center;
        color: #fff;
        font-weight: bold;
        font-size: 2.6rem;
        margin: 3.4rem auto 3.3rem;
      }
      .el-form-item {
        z-index: 20;
        margin: 0 1rem 3rem;
        :deep(input::-webkit-input-placeholder) {
          color: rgba(255, 255, 255, 0.5) !important;
        }
        :deep(.el-input) {
          line-height: 4rem;
        }
      }
      .save-pwd {
        font-size: 1.4rem;
        margin-bottom: 1rem;
      }
      .checked {
        z-index: 20;
        margin: 0 1rem 1.6rem;
      }
      .ipt {
        margin-bottom: 2rem;
      }
      .login-submit {
        width: 100%;
      }
      :deep(.el-button--success) {
        color: #1e705a;
        background-color: rgba(108, 233, 157, 1);
      }
    }
  }
}
</style>
