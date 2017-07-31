(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["Slider"] = factory(require("react"), require("react-dom"));
	else
		root["Slider"] = factory(root["React"], root["ReactDOM"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_4__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(1);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _innerSlider = __webpack_require__(3);

	var _objectAssign = __webpack_require__(8);

	var _objectAssign2 = _interopRequireDefault(_objectAssign);

	var _json2mq = __webpack_require__(14);

	var _json2mq2 = _interopRequireDefault(_json2mq);

	var _defaultProps = __webpack_require__(6);

	var _defaultProps2 = _interopRequireDefault(_defaultProps);

	var _canUseDom = __webpack_require__(16);

	var _canUseDom2 = _interopRequireDefault(_canUseDom);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var enquire = _canUseDom2.default && __webpack_require__(17);

	var Slider = function (_React$Component) {
	  _inherits(Slider, _React$Component);

	  function Slider(props) {
	    _classCallCheck(this, Slider);

	    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

	    _this.state = {
	      breakpoint: null
	    };
	    _this._responsiveMediaHandlers = [];
	    _this.innerSliderRefHandler = _this.innerSliderRefHandler.bind(_this);
	    return _this;
	  }

	  Slider.prototype.innerSliderRefHandler = function innerSliderRefHandler(ref) {
	    this.innerSlider = ref;
	  };

	  Slider.prototype.media = function media(query, handler) {
	    enquire.register(query, handler);
	    this._responsiveMediaHandlers.push({ query: query, handler: handler });
	  };

	  Slider.prototype.componentWillMount = function componentWillMount() {
	    var _this2 = this;

	    if (this.props.responsive) {
	      var breakpoints = this.props.responsive.map(function (breakpt) {
	        return breakpt.breakpoint;
	      });
	      breakpoints.sort(function (x, y) {
	        return x - y;
	      });

	      breakpoints.forEach(function (breakpoint, index) {
	        var bQuery;
	        if (index === 0) {
	          bQuery = (0, _json2mq2.default)({ minWidth: 0, maxWidth: breakpoint });
	        } else {
	          bQuery = (0, _json2mq2.default)({ minWidth: breakpoints[index - 1], maxWidth: breakpoint });
	        }
	        _canUseDom2.default && _this2.media(bQuery, function () {
	          _this2.setState({ breakpoint: breakpoint });
	        });
	      });

	      // Register media query for full screen. Need to support resize from small to large
	      var query = (0, _json2mq2.default)({ minWidth: breakpoints.slice(-1)[0] });

	      _canUseDom2.default && this.media(query, function () {
	        _this2.setState({ breakpoint: null });
	      });
	    }
	  };

	  Slider.prototype.componentWillUnmount = function componentWillUnmount() {
	    this._responsiveMediaHandlers.forEach(function (obj) {
	      enquire.unregister(obj.query, obj.handler);
	    });
	  };

	  Slider.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
	    return this.state.breakpoint !== nextState.breakpoint || this.props.slickGoTo !== nextProps.slickGoTo;
	  };

	  Slider.prototype.slickPrev = function slickPrev() {
	    this.innerSlider.slickPrev();
	  };

	  Slider.prototype.slickNext = function slickNext() {
	    this.innerSlider.slickNext();
	  };

	  Slider.prototype.slickGoTo = function slickGoTo(slide) {
	    this.innerSlider.slickGoTo(slide);
	  };

	  Slider.prototype.render = function render() {
	    var _this3 = this;

	    var settings;
	    var newProps;
	    if (this.state.breakpoint) {
	      newProps = this.props.responsive.filter(function (resp) {
	        return resp.breakpoint === _this3.state.breakpoint;
	      });
	      settings = newProps[0].settings === 'unslick' ? 'unslick' : (0, _objectAssign2.default)({}, this.props, newProps[0].settings);
	    } else {
	      settings = (0, _objectAssign2.default)({}, _defaultProps2.default, this.props);
	    }

	    var children = this.props.children;
	    if (!Array.isArray(children)) {
	      children = [children];
	    }

	    // Children may contain false or null, so we should filter them
	    children = children.filter(function (child) {
	      return !!child;
	    });

	    if (settings === 'unslick') {
	      // if 'unslick' responsive breakpoint setting used, just return the <Slider> tag nested HTML
	      return _react2.default.createElement(
	        'div',
	        null,
	        children
	      );
	    } else {
	      return _react2.default.createElement(
	        _innerSlider.InnerSlider,
	        _extends({ ref: this.innerSliderRefHandler }, settings),
	        children
	      );
	    }
	  };

	  return Slider;
	}(_react2.default.Component);

	exports.default = Slider;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.InnerSlider = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(4);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _initialState = __webpack_require__(5);

	var _initialState2 = _interopRequireDefault(_initialState);

	var _defaultProps = __webpack_require__(6);

	var _defaultProps2 = _interopRequireDefault(_defaultProps);

	var _classnames = __webpack_require__(7);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _objectAssign = __webpack_require__(8);

	var _objectAssign2 = _interopRequireDefault(_objectAssign);

	var _canGoNext = __webpack_require__(9);

	var _canGoNext2 = _interopRequireDefault(_canGoNext);

	var _trackHelper = __webpack_require__(10);

	var _track = __webpack_require__(11);

	var _dots = __webpack_require__(12);

	var _arrows = __webpack_require__(13);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var InnerSlider = exports.InnerSlider = function (_React$Component) {
	  _inherits(InnerSlider, _React$Component);

	  function InnerSlider(props, context) {
	    _classCallCheck(this, InnerSlider);

	    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props, context));

	    _initialiseProps.call(_this);

	    _this.state = _extends({}, _initialState2.default, {
	      currentSlide: props.initialSlide
	    });
	    return _this;
	  }

	  InnerSlider.prototype.componentWillMount = function componentWillMount() {
	    if (this.props.init) {
	      this.props.init();
	    }
	    this.setState({
	      mounted: true
	    });
	    var lazyLoadedList = [];
	    for (var i = 0; i < _react2.default.Children.count(this.props.children); i++) {
	      if (i >= this.state.currentSlide && i < this.state.currentSlide + this.props.slidesToShow) {
	        lazyLoadedList.push(i);
	      }
	    }

	    if (this.props.lazyLoad && this.state.lazyLoadedList.length === 0) {
	      this.setState({
	        lazyLoadedList: lazyLoadedList
	      });
	    }
	  };

	  InnerSlider.prototype.componentDidMount = function componentDidMount() {
	    // Hack for autoplay -- Inspect Later
	    this.initialize(this.props);
	    this.adaptHeight();

	    // To support server-side rendering
	    if (!window) {
	      return;
	    }
	    if (window.addEventListener) {
	      window.addEventListener('resize', this.onWindowResized);
	    } else {
	      window.attachEvent('onresize', this.onWindowResized);
	    }
	  };

	  InnerSlider.prototype.componentWillUnmount = function componentWillUnmount() {
	    if (this.animationEndCallback) {
	      clearTimeout(this.animationEndCallback);
	    }
	    if (window.addEventListener) {
	      window.removeEventListener('resize', this.onWindowResized);
	    } else {
	      window.detachEvent('onresize', this.onWindowResized);
	    }
	    if (this.state.autoPlayTimer) {
	      clearInterval(this.state.autoPlayTimer);
	    }
	  };

	  InnerSlider.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	    if (this.props.slickGoTo != nextProps.slickGoTo) {
	      if ((undefined) !== 'production') {
	        console.warn('react-slick deprecation warning: slickGoTo prop is deprecated and it will be removed in next release. Use slickGoTo method instead');
	      }
	      this.changeSlide({
	        message: 'index',
	        index: nextProps.slickGoTo,
	        currentSlide: this.state.currentSlide
	      });
	    } else if (this.state.currentSlide >= nextProps.children.length) {
	      this.update(nextProps);
	      this.changeSlide({
	        message: 'index',
	        index: nextProps.children.length - nextProps.slidesToShow,
	        currentSlide: this.state.currentSlide
	      });
	    } else {
	      this.update(nextProps);
	    }
	  };

	  InnerSlider.prototype.componentDidUpdate = function componentDidUpdate() {
	    this.adaptHeight();
	  };

	  InnerSlider.prototype.render = function render() {
	    var className = (0, _classnames2.default)('slick-initialized', 'slick-slider', this.props.className, {
	      'slick-vertical': this.props.vertical
	    });

	    var trackProps = {
	      fade: this.props.fade,
	      cssEase: this.props.cssEase,
	      speed: this.props.speed,
	      infinite: this.props.infinite,
	      centerMode: this.props.centerMode,
	      focusOnSelect: this.props.focusOnSelect ? this.selectHandler : null,
	      currentSlide: this.state.currentSlide,
	      lazyLoad: this.props.lazyLoad,
	      lazyLoadedList: this.state.lazyLoadedList,
	      rtl: this.props.rtl,
	      slideWidth: this.state.slideWidth,
	      slidesToShow: this.props.slidesToShow,
	      slidesToScroll: this.props.slidesToScroll,
	      slideCount: this.state.slideCount,
	      trackStyle: this.state.trackStyle,
	      variableWidth: this.props.variableWidth
	    };

	    var dots;

	    if (this.props.dots === true && this.state.slideCount >= this.props.slidesToShow) {
	      var dotProps = {
	        dotsClass: this.props.dotsClass,
	        slideCount: this.state.slideCount,
	        slidesToShow: this.props.slidesToShow,
	        currentSlide: this.state.currentSlide,
	        slidesToScroll: this.props.slidesToScroll,
	        clickHandler: this.changeSlide,
	        children: this.props.children,
	        customPaging: this.props.customPaging
	      };

	      dots = _react2.default.createElement(_dots.Dots, dotProps);
	    }

	    var prevArrow, nextArrow;

	    var arrowProps = {
	      infinite: this.props.infinite,
	      centerMode: this.props.centerMode,
	      currentSlide: this.state.currentSlide,
	      slideCount: this.state.slideCount,
	      slidesToShow: this.props.slidesToShow,
	      prevArrow: this.props.prevArrow,
	      nextArrow: this.props.nextArrow,
	      clickHandler: this.changeSlide
	    };

	    if (this.props.arrows) {
	      prevArrow = _react2.default.createElement(_arrows.PrevArrow, arrowProps);
	      nextArrow = _react2.default.createElement(_arrows.NextArrow, arrowProps);
	    }

	    var verticalHeightStyle = null;

	    if (this.props.vertical) {
	      verticalHeightStyle = {
	        height: this.state.listHeight
	      };
	    }

	    var centerPaddingStyle = null;

	    if (this.props.vertical === false) {
	      if (this.props.centerMode === true) {
	        centerPaddingStyle = {
	          padding: '0px ' + this.props.centerPadding
	        };
	      }
	    } else {
	      if (this.props.centerMode === true) {
	        centerPaddingStyle = {
	          padding: this.props.centerPadding + ' 0px'
	        };
	      }
	    }

	    var listStyle = (0, _objectAssign2.default)({}, verticalHeightStyle, centerPaddingStyle);

	    return _react2.default.createElement(
	      'div',
	      {
	        className: className,
	        onMouseEnter: this.onInnerSliderEnter,
	        onMouseLeave: this.onInnerSliderLeave,
	        onMouseOver: this.onInnerSliderOver
	      },
	      prevArrow,
	      _react2.default.createElement(
	        'div',
	        {
	          ref: this.listRefHandler,
	          className: 'slick-list',
	          style: listStyle,
	          onMouseDown: this.swipeStart,
	          onMouseMove: this.state.dragging ? this.swipeMove : null,
	          onMouseUp: this.swipeEnd,
	          onMouseLeave: this.state.dragging ? this.swipeEnd : null,
	          onTouchStart: this.swipeStart,
	          onTouchMove: this.state.dragging ? this.swipeMove : null,
	          onTouchEnd: this.swipeEnd,
	          onTouchCancel: this.state.dragging ? this.swipeEnd : null,
	          onKeyDown: this.props.accessibility ? this.keyHandler : null },
	        _react2.default.createElement(
	          _track.Track,
	          _extends({ ref: this.trackRefHandler }, trackProps),
	          this.props.children
	        )
	      ),
	      nextArrow,
	      dots
	    );
	  };

	  // Event handler for previous and next


	  // Accessiblity handler for previous and next


	  // Focus on selecting a slide (click handler on track)


	  return InnerSlider;
	}(_react2.default.Component);

	InnerSlider.defaultProps = _defaultProps2.default;

	var _initialiseProps = function _initialiseProps() {
	  var _this2 = this;

	  this.list = null;
	  this.track = null;

	  this.listRefHandler = function (ref) {
	    _this2.list = ref;
	  };

	  this.trackRefHandler = function (ref) {
	    _this2.track = ref;
	  };

	  this.onWindowResized = function () {
	    _this2.update(_this2.props);
	    // animating state should be cleared while resizing, otherwise autoplay stops working
	    _this2.setState({
	      animating: false
	    });
	    clearTimeout(_this2.animationEndCallback);
	    delete _this2.animationEndCallback;
	  };

	  this.slickPrev = function () {
	    _this2.changeSlide({ message: 'previous' });
	  };

	  this.slickNext = function () {
	    _this2.changeSlide({ message: 'next' });
	  };

	  this.slickGoTo = function (slide) {
	    typeof slide === 'number' && _this2.changeSlide({
	      message: 'index',
	      index: slide,
	      currentSlide: _this2.state.currentSlide
	    });
	  };

	  this.initialize = function (props) {
	    var slickList = _reactDom2.default.findDOMNode(_this2.list);

	    var slideCount = _react2.default.Children.count(props.children);
	    var listWidth = _this2.getWidth(slickList);
	    var trackWidth = _this2.getWidth(_reactDom2.default.findDOMNode(_this2.track));
	    var slideWidth;

	    if (!props.vertical) {
	      if (props.variableWidth === true) {
	        slideWidth = _this2.getWidth(slickList.querySelector('[data-index="0"]'));
	      } else {
	        var centerPaddingAdj = props.centerMode && parseInt(props.centerPadding) * 2;
	        slideWidth = (_this2.getWidth(_reactDom2.default.findDOMNode(_this2)) - centerPaddingAdj) / props.slidesToShow;
	      }
	    } else {
	      slideWidth = _this2.getWidth(_reactDom2.default.findDOMNode(_this2));
	    }

	    var slideHeight = _this2.getHeight(slickList.querySelector('[data-index="0"]'));
	    var listHeight = slideHeight * props.slidesToShow;

	    var currentSlide = props.rtl ? slideCount - 1 - props.initialSlide : props.initialSlide;

	    _this2.setState({
	      slideCount: slideCount,
	      slideWidth: slideWidth,
	      listWidth: listWidth,
	      trackWidth: trackWidth,
	      currentSlide: currentSlide,
	      slideHeight: slideHeight,
	      listHeight: listHeight
	    }, function () {

	      var targetLeft = (0, _trackHelper.getTrackLeft)((0, _objectAssign2.default)({
	        slideIndex: this.state.currentSlide,
	        trackRef: this.track
	      }, props, this.state));
	      // getCSS function needs previously set state
	      var trackStyle = (0, _trackHelper.getTrackCSS)((0, _objectAssign2.default)({ left: targetLeft }, props, this.state));

	      this.setState({ trackStyle: trackStyle });

	      this.autoPlay(); // once we're set up, trigger the initial autoplay.
	    });
	  };

	  this.update = function (props) {
	    var slickList = _reactDom2.default.findDOMNode(_this2.list);
	    // This method has mostly same code as initialize method.
	    // Refactor it
	    var slideCount = _react2.default.Children.count(props.children);
	    var listWidth = _this2.getWidth(slickList);
	    var trackWidth = _this2.getWidth(_reactDom2.default.findDOMNode(_this2.track));
	    var slideWidth;

	    if (!props.vertical) {
	      if (props.variableWidth === true) {
	        slideWidth = _this2.getWidth(slickList.querySelector('[data-index="0"]'));
	      } else {
	        var centerPaddingAdj = props.centerMode && parseInt(props.centerPadding) * 2;
	        slideWidth = (_this2.getWidth(_reactDom2.default.findDOMNode(_this2)) - centerPaddingAdj) / props.slidesToShow;
	      }
	    } else {
	      slideWidth = _this2.getWidth(_reactDom2.default.findDOMNode(_this2));
	    }

	    var slideHeight = _this2.getHeight(slickList.querySelector('[data-index="0"]'));
	    var listHeight = slideHeight * props.slidesToShow;
	    var currentSlide = props.rtl ? slideCount - 1 - props.initialSlide : props.initialSlide;

	    // pause slider if autoplay is set to false
	    if (props.autoplay) {
	      _this2.pause();
	    } else {
	      _this2.autoPlay();
	    }

	    _this2.setState({
	      slideCount: slideCount,
	      slideWidth: slideWidth,
	      listWidth: listWidth,
	      trackWidth: trackWidth,
	      slideHeight: slideHeight,
	      listHeight: listHeight,
	      currentSlide: currentSlide
	    }, function () {

	      var targetLeft = (0, _trackHelper.getTrackLeft)((0, _objectAssign2.default)({
	        slideIndex: this.state.currentSlide,
	        trackRef: this.track
	      }, props, this.state));
	      // getCSS function needs previously set state
	      var trackStyle = (0, _trackHelper.getTrackCSS)((0, _objectAssign2.default)({ left: targetLeft }, props, this.state));

	      this.setState({ trackStyle: trackStyle });
	    });
	  };

	  this.getWidth = function (elem) {
	    return elem.getBoundingClientRect().width || elem.offsetWidth || 0;
	  };

	  this.getHeight = function (elem) {
	    return elem.getBoundingClientRect().height || elem.offsetHeight || 0;
	  };

	  this.adaptHeight = function () {
	    if (_this2.props.adaptiveHeight) {
	      var selector = '[data-index="' + _this2.state.currentSlide + '"]';
	      if (_this2.list) {
	        var slickList = _reactDom2.default.findDOMNode(_this2.list);
	        slickList.style.height = slickList.querySelector(selector).offsetHeight + 'px';
	      }
	    }
	  };

	  this.slideHandler = function (index) {
	    // Functionality of animateSlide and postSlide is merged into this function
	    // console.log('slideHandler', index);
	    var targetSlide, currentSlide;
	    var targetLeft, currentLeft;
	    var callback;

	    if (_this2.props.waitForAnimate && _this2.state.animating) {
	      return;
	    }

	    if (_this2.props.fade) {
	      currentSlide = _this2.state.currentSlide;

	      // Don't change slide if it's not infite and current slide is the first or last slide.
	      if (_this2.props.infinite === false && (index < 0 || index >= _this2.state.slideCount)) {
	        return;
	      }

	      //  Shifting targetSlide back into the range
	      if (index < 0) {
	        targetSlide = index + _this2.state.slideCount;
	      } else if (index >= _this2.state.slideCount) {
	        targetSlide = index - _this2.state.slideCount;
	      } else {
	        targetSlide = index;
	      }

	      if (_this2.props.lazyLoad && _this2.state.lazyLoadedList.indexOf(targetSlide) < 0) {
	        _this2.setState({
	          lazyLoadedList: _this2.state.lazyLoadedList.concat(targetSlide)
	        });
	      }

	      callback = function callback() {
	        _this2.setState({
	          animating: false
	        });
	        if (_this2.props.afterChange) {
	          _this2.props.afterChange(targetSlide);
	        }
	        delete _this2.animationEndCallback;
	      };

	      _this2.setState({
	        animating: true,
	        currentSlide: targetSlide
	      }, function () {
	        this.animationEndCallback = setTimeout(callback, this.props.speed);
	      });

	      if (_this2.props.beforeChange) {
	        _this2.props.beforeChange(_this2.state.currentSlide, targetSlide);
	      }

	      _this2.autoPlay();
	      return;
	    }

	    targetSlide = index;
	    if (targetSlide < 0) {
	      if (_this2.props.infinite === false) {
	        currentSlide = 0;
	      } else if (_this2.state.slideCount % _this2.props.slidesToScroll !== 0) {
	        currentSlide = _this2.state.slideCount - _this2.state.slideCount % _this2.props.slidesToScroll;
	      } else {
	        currentSlide = _this2.state.slideCount + targetSlide;
	      }
	    } else if (targetSlide >= _this2.state.slideCount) {
	      if (_this2.props.infinite === false) {
	        currentSlide = _this2.state.slideCount - _this2.props.slidesToShow;
	      } else if (_this2.state.slideCount % _this2.props.slidesToScroll !== 0) {
	        currentSlide = 0;
	      } else {
	        currentSlide = targetSlide - _this2.state.slideCount;
	      }
	    } else {
	      currentSlide = targetSlide;
	    }

	    targetLeft = (0, _trackHelper.getTrackLeft)((0, _objectAssign2.default)({
	      slideIndex: targetSlide,
	      trackRef: _this2.track
	    }, _this2.props, _this2.state));

	    currentLeft = (0, _trackHelper.getTrackLeft)((0, _objectAssign2.default)({
	      slideIndex: currentSlide,
	      trackRef: _this2.track
	    }, _this2.props, _this2.state));

	    if (_this2.props.infinite === false) {
	      targetLeft = currentLeft;
	    }

	    if (_this2.props.beforeChange) {
	      _this2.props.beforeChange(_this2.state.currentSlide, currentSlide);
	    }

	    if (_this2.props.lazyLoad) {
	      var loaded = true;
	      var slidesToLoad = [];
	      for (var i = targetSlide; i < targetSlide + _this2.props.slidesToShow; i++) {
	        var slideToLoad = i < 0 ? _this2.props.slideCount - i : i;
	        loaded = loaded && _this2.state.lazyLoadedList.indexOf(slideToLoad) >= 0;
	        if (!loaded) {
	          slidesToLoad.push(slideToLoad);
	        }
	      }
	      if (!loaded) {
	        _this2.setState({
	          lazyLoadedList: _this2.state.lazyLoadedList.concat(slidesToLoad)
	        });
	      }
	    }

	    // Slide Transition happens here.
	    // animated transition happens to target Slide and
	    // non - animated transition happens to current Slide
	    // If CSS transitions are false, directly go the current slide.

	    if (_this2.props.useCSS === false) {

	      _this2.setState({
	        currentSlide: currentSlide,
	        trackStyle: (0, _trackHelper.getTrackCSS)((0, _objectAssign2.default)({ left: currentLeft }, _this2.props, _this2.state))
	      }, function () {
	        if (this.props.afterChange) {
	          this.props.afterChange(currentSlide);
	        }
	      });
	    } else {

	      var nextStateChanges = {
	        animating: false,
	        currentSlide: currentSlide,
	        trackStyle: (0, _trackHelper.getTrackCSS)((0, _objectAssign2.default)({ left: currentLeft }, _this2.props, _this2.state)),
	        swipeLeft: null
	      };

	      callback = function callback() {
	        _this2.setState(nextStateChanges);
	        if (_this2.props.afterChange) {
	          _this2.props.afterChange(currentSlide);
	        }
	        delete _this2.animationEndCallback;
	      };

	      _this2.setState({
	        animating: true,
	        currentSlide: currentSlide,
	        trackStyle: (0, _trackHelper.getTrackAnimateCSS)((0, _objectAssign2.default)({ left: targetLeft }, _this2.props, _this2.state))
	      }, function () {
	        this.animationEndCallback = setTimeout(callback, this.props.speed);
	      });
	    }

	    _this2.autoPlay();
	  };

	  this.swipeDirection = function (touchObject) {
	    var xDist, yDist, r, swipeAngle;

	    xDist = touchObject.startX - touchObject.curX;
	    yDist = touchObject.startY - touchObject.curY;
	    r = Math.atan2(yDist, xDist);

	    swipeAngle = Math.round(r * 180 / Math.PI);
	    if (swipeAngle < 0) {
	      swipeAngle = 360 - Math.abs(swipeAngle);
	    }
	    if (swipeAngle <= 45 && swipeAngle >= 0 || swipeAngle <= 360 && swipeAngle >= 315) {
	      return _this2.props.rtl === false ? 'left' : 'right';
	    }
	    if (swipeAngle >= 135 && swipeAngle <= 225) {
	      return _this2.props.rtl === false ? 'right' : 'left';
	    }
	    if (_this2.props.verticalSwiping === true) {
	      if (swipeAngle >= 35 && swipeAngle <= 135) {
	        return 'down';
	      } else {
	        return 'up';
	      }
	    }

	    return 'vertical';
	  };

	  this.play = function () {
	    var nextIndex;

	    if (!_this2.state.mounted) {
	      return false;
	    }

	    if (_this2.props.rtl) {
	      nextIndex = _this2.state.currentSlide - _this2.props.slidesToScroll;
	    } else {
	      if ((0, _canGoNext2.default)(_extends({}, _this2.props, _this2.state))) {
	        nextIndex = _this2.state.currentSlide + _this2.props.slidesToScroll;
	      } else {
	        return false;
	      }
	    }

	    _this2.slideHandler(nextIndex);
	  };

	  this.autoPlay = function () {
	    if (_this2.state.autoPlayTimer) {
	      clearTimeout(_this2.state.autoPlayTimer);
	    }
	    if (_this2.props.autoplay) {
	      _this2.setState({
	        autoPlayTimer: setTimeout(_this2.play, _this2.props.autoplaySpeed)
	      });
	    }
	  };

	  this.pause = function () {
	    if (_this2.state.autoPlayTimer) {
	      clearTimeout(_this2.state.autoPlayTimer);
	      _this2.setState({
	        autoPlayTimer: null
	      });
	    }
	  };

	  this.changeSlide = function (options) {
	    var indexOffset, previousInt, slideOffset, unevenOffset, targetSlide;
	    var _props = _this2.props,
	        slidesToScroll = _props.slidesToScroll,
	        slidesToShow = _props.slidesToShow;
	    var _state = _this2.state,
	        slideCount = _state.slideCount,
	        currentSlide = _state.currentSlide;

	    unevenOffset = slideCount % slidesToScroll !== 0;
	    indexOffset = unevenOffset ? 0 : (slideCount - currentSlide) % slidesToScroll;

	    if (options.message === 'previous') {
	      slideOffset = indexOffset === 0 ? slidesToScroll : slidesToShow - indexOffset;
	      targetSlide = currentSlide - slideOffset;
	      if (_this2.props.lazyLoad) {
	        previousInt = currentSlide - slideOffset;
	        targetSlide = previousInt === -1 ? slideCount - 1 : previousInt;
	      }
	    } else if (options.message === 'next') {
	      slideOffset = indexOffset === 0 ? slidesToScroll : indexOffset;
	      targetSlide = currentSlide + slideOffset;
	      if (_this2.props.lazyLoad) {
	        targetSlide = (currentSlide + slidesToScroll) % slideCount + indexOffset;
	      }
	    } else if (options.message === 'dots' || options.message === 'children') {
	      // Click on dots
	      targetSlide = options.index * options.slidesToScroll;
	      if (targetSlide === options.currentSlide) {
	        return;
	      }
	    } else if (options.message === 'index') {
	      targetSlide = parseInt(options.index);
	      if (targetSlide === options.currentSlide) {
	        return;
	      }
	    }

	    _this2.slideHandler(targetSlide);
	  };

	  this.keyHandler = function (e) {
	    //Dont slide if the cursor is inside the form fields and arrow keys are pressed
	    if (!e.target.tagName.match('TEXTAREA|INPUT|SELECT')) {
	      if (e.keyCode === 37 && _this2.props.accessibility === true) {
	        _this2.changeSlide({
	          message: _this2.props.rtl === true ? 'next' : 'previous'
	        });
	      } else if (e.keyCode === 39 && _this2.props.accessibility === true) {
	        _this2.changeSlide({
	          message: _this2.props.rtl === true ? 'previous' : 'next'
	        });
	      }
	    }
	  };

	  this.selectHandler = function (options) {
	    _this2.changeSlide(options);
	  };

	  this.swipeStart = function (e) {
	    var touches, posX, posY;

	    if (_this2.props.swipe === false || 'ontouchend' in document && _this2.props.swipe === false) {
	      return;
	    } else if (_this2.props.draggable === false && e.type.indexOf('mouse') !== -1) {
	      return;
	    }
	    posX = e.touches !== undefined ? e.touches[0].pageX : e.clientX;
	    posY = e.touches !== undefined ? e.touches[0].pageY : e.clientY;
	    _this2.setState({
	      dragging: true,
	      touchObject: {
	        startX: posX,
	        startY: posY,
	        curX: posX,
	        curY: posY
	      }
	    });
	  };

	  this.swipeMove = function (e) {
	    if (!_this2.state.dragging) {
	      e.preventDefault();
	      return;
	    }
	    if (_this2.state.animating) {
	      return;
	    }
	    if (_this2.props.vertical && _this2.props.swipeToSlide && _this2.props.verticalSwiping) {
	      e.preventDefault();
	    }
	    var swipeLeft;
	    var curLeft, positionOffset;
	    var touchObject = _this2.state.touchObject;

	    curLeft = (0, _trackHelper.getTrackLeft)((0, _objectAssign2.default)({
	      slideIndex: _this2.state.currentSlide,
	      trackRef: _this2.track
	    }, _this2.props, _this2.state));
	    touchObject.curX = e.touches ? e.touches[0].pageX : e.clientX;
	    touchObject.curY = e.touches ? e.touches[0].pageY : e.clientY;
	    touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(touchObject.curX - touchObject.startX, 2)));

	    if (_this2.props.verticalSwiping) {
	      touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(touchObject.curY - touchObject.startY, 2)));
	    }

	    positionOffset = (_this2.props.rtl === false ? 1 : -1) * (touchObject.curX > touchObject.startX ? 1 : -1);

	    if (_this2.props.verticalSwiping) {
	      positionOffset = touchObject.curY > touchObject.startY ? 1 : -1;
	    }

	    var currentSlide = _this2.state.currentSlide;
	    var dotCount = Math.ceil(_this2.state.slideCount / _this2.props.slidesToScroll);
	    var swipeDirection = _this2.swipeDirection(_this2.state.touchObject);
	    var touchSwipeLength = touchObject.swipeLength;

	    if (_this2.props.infinite === false) {
	      if (currentSlide === 0 && swipeDirection === 'right' || currentSlide + 1 >= dotCount && swipeDirection === 'left') {
	        touchSwipeLength = touchObject.swipeLength * _this2.props.edgeFriction;

	        if (_this2.state.edgeDragged === false && _this2.props.edgeEvent) {
	          _this2.props.edgeEvent(swipeDirection);
	          _this2.setState({ edgeDragged: true });
	        }
	      }
	    }

	    if (_this2.state.swiped === false && _this2.props.swipeEvent) {
	      _this2.props.swipeEvent(swipeDirection);
	      _this2.setState({ swiped: true });
	    }

	    if (!_this2.props.vertical) {
	      swipeLeft = curLeft + touchSwipeLength * positionOffset;
	    } else {
	      swipeLeft = curLeft + touchSwipeLength * (_this2.state.listHeight / _this2.state.listWidth) * positionOffset;
	    }

	    if (_this2.props.verticalSwiping) {
	      swipeLeft = curLeft + touchSwipeLength * positionOffset;
	    }

	    _this2.setState({
	      touchObject: touchObject,
	      swipeLeft: swipeLeft,
	      trackStyle: (0, _trackHelper.getTrackCSS)((0, _objectAssign2.default)({ left: swipeLeft }, _this2.props, _this2.state))
	    });

	    if (Math.abs(touchObject.curX - touchObject.startX) < Math.abs(touchObject.curY - touchObject.startY) * 0.8) {
	      return;
	    }
	    if (touchObject.swipeLength > 4) {
	      e.preventDefault();
	    }
	  };

	  this.getNavigableIndexes = function () {
	    var max = void 0;
	    var breakPoint = 0;
	    var counter = 0;
	    var indexes = [];

	    if (!_this2.props.infinite) {
	      max = _this2.state.slideCount;
	    } else {
	      breakPoint = _this2.props.slidesToShow * -1;
	      counter = _this2.props.slidesToShow * -1;
	      max = _this2.state.slideCount * 2;
	    }

	    while (breakPoint < max) {
	      indexes.push(breakPoint);
	      breakPoint = counter + _this2.props.slidesToScroll;

	      counter += _this2.props.slidesToScroll <= _this2.props.slidesToShow ? _this2.props.slidesToScroll : _this2.props.slidesToShow;
	    }

	    return indexes;
	  };

	  this.checkNavigable = function (index) {
	    var navigables = _this2.getNavigableIndexes();
	    var prevNavigable = 0;

	    if (index > navigables[navigables.length - 1]) {
	      index = navigables[navigables.length - 1];
	    } else {
	      for (var n in navigables) {
	        if (index < navigables[n]) {
	          index = prevNavigable;
	          break;
	        }

	        prevNavigable = navigables[n];
	      }
	    }

	    return index;
	  };

	  this.getSlideCount = function () {
	    var centerOffset = _this2.props.centerMode ? _this2.state.slideWidth * Math.floor(_this2.props.slidesToShow / 2) : 0;

	    if (_this2.props.swipeToSlide) {
	      var swipedSlide = void 0;
	      var slidesTraversed = void 0;

	      var slickList = _reactDom2.default.findDOMNode(_this2.list);

	      var slides = slickList.querySelectorAll('.slick-slide');

	      Array.from(slides).every(function (slide) {
	        if (!_this2.props.vertical) {
	          if (slide.offsetLeft - centerOffset + _this2.getWidth(slide) / 2 > _this2.state.swipeLeft * -1) {
	            swipedSlide = slide;
	            return false;
	          }
	        } else {
	          if (slide.offsetTop + _this2.getHeight(slide) / 2 > _this2.state.swipeLeft * -1) {
	            swipedSlide = slide;
	            return false;
	          }
	        }

	        return true;
	      });

	      if (swipedSlide && swipedSlide.dataset) {
	        slidesTraversed = Math.abs(swipedSlide.dataset.index - _this2.state.currentSlide) || 1;
	      } else {
	        slidesTraversed = 0;
	      }

	      return slidesTraversed;
	    } else {
	      return _this2.props.slidesToScroll;
	    }
	  };

	  this.swipeEnd = function (e) {
	    if (!_this2.state.dragging) {
	      if (_this2.props.swipe) {
	        e.preventDefault();
	      }
	      return;
	    }
	    var touchObject = _this2.state.touchObject;
	    var minSwipe = _this2.state.listWidth / _this2.props.touchThreshold;
	    var swipeDirection = _this2.swipeDirection(touchObject);

	    if (_this2.props.verticalSwiping) {
	      minSwipe = _this2.state.listHeight / _this2.props.touchThreshold;
	    }

	    // reset the state of touch related state variables.
	    _this2.setState({
	      dragging: false,
	      edgeDragged: false,
	      swiped: false,
	      swipeLeft: null,
	      touchObject: {}
	    });
	    // Fix for #13
	    if (!touchObject.swipeLength) {
	      return;
	    }
	    if (touchObject.swipeLength > minSwipe) {
	      e.preventDefault();

	      var slideCount = void 0,
	          newSlide = void 0;

	      switch (swipeDirection) {

	        case 'left':
	        case 'down':
	          newSlide = _this2.state.currentSlide + _this2.getSlideCount();
	          slideCount = _this2.props.swipeToSlide ? _this2.checkNavigable(newSlide) : newSlide;
	          _this2.state.currentDirection = 0;
	          break;

	        case 'right':
	        case 'up':
	          newSlide = _this2.state.currentSlide - _this2.getSlideCount();
	          slideCount = _this2.props.swipeToSlide ? _this2.checkNavigable(newSlide) : newSlide;
	          _this2.state.currentDirection = 1;
	          break;

	        default:
	          slideCount = _this2.state.currentSlide;

	      }

	      _this2.slideHandler(slideCount);
	    } else {
	      // Adjust the track back to it's original position.
	      var currentLeft = (0, _trackHelper.getTrackLeft)((0, _objectAssign2.default)({
	        slideIndex: _this2.state.currentSlide,
	        trackRef: _this2.track
	      }, _this2.props, _this2.state));

	      _this2.setState({
	        trackStyle: (0, _trackHelper.getTrackAnimateCSS)((0, _objectAssign2.default)({ left: currentLeft }, _this2.props, _this2.state))
	      });
	    }
	  };

	  this.onInnerSliderEnter = function (e) {
	    if (_this2.props.autoplay && _this2.props.pauseOnHover) {
	      _this2.pause();
	    }
	  };

	  this.onInnerSliderOver = function (e) {
	    if (_this2.props.autoplay && _this2.props.pauseOnHover) {
	      _this2.pause();
	    }
	  };

	  this.onInnerSliderLeave = function (e) {
	    if (_this2.props.autoplay && _this2.props.pauseOnHover) {
	      _this2.autoPlay();
	    }
	  };
	};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	"use strict";

	var initialState = {
	    animating: false,
	    dragging: false,
	    autoPlayTimer: null,
	    currentDirection: 0,
	    currentLeft: null,
	    currentSlide: 0,
	    direction: 1,
	    listWidth: null,
	    listHeight: null,
	    // loadIndex: 0,
	    slideCount: null,
	    slideWidth: null,
	    slideHeight: null,
	    // sliding: false,
	    // slideOffset: 0,
	    swipeLeft: null,
	    touchObject: {
	        startX: 0,
	        startY: 0,
	        curX: 0,
	        curY: 0
	    },

	    lazyLoadedList: [],

	    // added for react
	    initialized: false,
	    edgeDragged: false,
	    swiped: false, // used by swipeEvent. differentites between touch and swipe.
	    trackStyle: {},
	    trackWidth: 0

	    // Removed
	    // transformsEnabled: false,
	    // $nextArrow: null,
	    // $prevArrow: null,
	    // $dots: null,
	    // $list: null,
	    // $slideTrack: null,
	    // $slides: null,
	};

	module.exports = initialState;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var defaultProps = {
	    className: '',
	    accessibility: true,
	    adaptiveHeight: false,
	    arrows: true,
	    autoplay: false,
	    autoplaySpeed: 3000,
	    centerMode: false,
	    centerPadding: '50px',
	    cssEase: 'ease',
	    customPaging: function customPaging(i) {
	        return _react2.default.createElement(
	            'button',
	            null,
	            i + 1
	        );
	    },
	    dots: false,
	    dotsClass: 'slick-dots',
	    draggable: true,
	    easing: 'linear',
	    edgeFriction: 0.35,
	    fade: false,
	    focusOnSelect: false,
	    infinite: true,
	    initialSlide: 0,
	    lazyLoad: false,
	    pauseOnHover: true,
	    responsive: null,
	    rtl: false,
	    slide: 'div',
	    slidesToShow: 1,
	    slidesToScroll: 1,
	    speed: 500,
	    swipe: true,
	    swipeToSlide: false,
	    touchMove: true,
	    touchThreshold: 5,
	    useCSS: true,
	    variableWidth: false,
	    vertical: false,
	    waitForAnimate: true,
	    afterChange: null,
	    beforeChange: null,
	    edgeEvent: null,
	    init: null,
	    swipeEvent: null,
	    // nextArrow, prevArrow are react componets
	    nextArrow: null,
	    prevArrow: null
	};

	module.exports = defaultProps;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2016 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
	/* global define */

	(function () {
		'use strict';

		var hasOwn = {}.hasOwnProperty;

		function classNames () {
			var classes = [];

			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;

				var argType = typeof arg;

				if (argType === 'string' || argType === 'number') {
					classes.push(arg);
				} else if (Array.isArray(arg)) {
					classes.push(classNames.apply(null, arg));
				} else if (argType === 'object') {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				}
			}

			return classes.join(' ');
		}

		if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else if (true) {
			// register as 'classnames', consistent with npm package name
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}
	}());


/***/ }),
/* 8 */
/***/ (function(module, exports) {

	/*
	object-assign
	(c) Sindre Sorhus
	@license MIT
	*/

	'use strict';
	/* eslint-disable no-unused-vars */
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}

			// Detect buggy property enumeration order in older V8 versions.

			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}

			return true;
		} catch (err) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}

	module.exports = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (getOwnPropertySymbols) {
				symbols = getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};


/***/ }),
/* 9 */
/***/ (function(module, exports) {

	"use strict";

	exports.__esModule = true;
	exports.default = canGoNext;
	function canGoNext(opts) {
	  var canGo = true;
	  if (!opts.infinite) {
	    if (opts.centerMode) {
	      // check if current slide is last slide
	      if (opts.currentSlide >= opts.slideCount - 1) {
	        canGo = false;
	      }
	    } else {
	      // check if all slides are shown in slider
	      if (opts.slideCount <= opts.slidesToShow || opts.currentSlide >= opts.slideCount - opts.slidesToShow) {
	        canGo = false;
	      }
	    }
	  }
	  return canGo;
	}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.getTrackLeft = exports.getTrackAnimateCSS = exports.getTrackCSS = undefined;

	var _reactDom = __webpack_require__(4);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _objectAssign = __webpack_require__(8);

	var _objectAssign2 = _interopRequireDefault(_objectAssign);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var checkSpecKeys = function checkSpecKeys(spec, keysArray) {
	  return keysArray.reduce(function (value, key) {
	    return value && spec.hasOwnProperty(key);
	  }, true) ? null : console.error('Keys Missing', spec);
	};

	var getTrackCSS = exports.getTrackCSS = function getTrackCSS(spec) {
	  checkSpecKeys(spec, ['left', 'variableWidth', 'slideCount', 'slidesToShow', 'slideWidth']);

	  var trackWidth, trackHeight;

	  var trackChildren = spec.slideCount + 2 * spec.slidesToShow;

	  if (!spec.vertical) {
	    if (spec.variableWidth) {
	      trackWidth = (spec.slideCount + 2 * spec.slidesToShow) * spec.slideWidth;
	    } else if (spec.centerMode) {
	      trackWidth = (spec.slideCount + 2 * (spec.slidesToShow + 1)) * spec.slideWidth;
	    } else {
	      trackWidth = (spec.slideCount + 2 * spec.slidesToShow) * spec.slideWidth;
	    }
	  } else {
	    trackHeight = trackChildren * spec.slideHeight;
	  }

	  var style = {
	    opacity: 1,
	    WebkitTransform: !spec.vertical ? 'translate3d(' + spec.left + 'px, 0px, 0px)' : 'translate3d(0px, ' + spec.left + 'px, 0px)',
	    transform: !spec.vertical ? 'translate3d(' + spec.left + 'px, 0px, 0px)' : 'translate3d(0px, ' + spec.left + 'px, 0px)',
	    transition: '',
	    WebkitTransition: '',
	    msTransform: !spec.vertical ? 'translateX(' + spec.left + 'px)' : 'translateY(' + spec.left + 'px)'
	  };

	  if (trackWidth) {
	    (0, _objectAssign2.default)(style, { width: trackWidth });
	  }

	  if (trackHeight) {
	    (0, _objectAssign2.default)(style, { height: trackHeight });
	  }

	  // Fallback for IE8
	  if (window && !window.addEventListener && window.attachEvent) {
	    if (!spec.vertical) {
	      style.marginLeft = spec.left + 'px';
	    } else {
	      style.marginTop = spec.left + 'px';
	    }
	  }

	  return style;
	};

	var getTrackAnimateCSS = exports.getTrackAnimateCSS = function getTrackAnimateCSS(spec) {
	  checkSpecKeys(spec, ['left', 'variableWidth', 'slideCount', 'slidesToShow', 'slideWidth', 'speed', 'cssEase']);

	  var style = getTrackCSS(spec);
	  // useCSS is true by default so it can be undefined
	  style.WebkitTransition = '-webkit-transform ' + spec.speed + 'ms ' + spec.cssEase;
	  style.transition = 'transform ' + spec.speed + 'ms ' + spec.cssEase;
	  return style;
	};

	var getTrackLeft = exports.getTrackLeft = function getTrackLeft(spec) {

	  checkSpecKeys(spec, ['slideIndex', 'trackRef', 'infinite', 'centerMode', 'slideCount', 'slidesToShow', 'slidesToScroll', 'slideWidth', 'listWidth', 'variableWidth', 'slideHeight']);

	  var slideOffset = 0;
	  var targetLeft;
	  var targetSlide;
	  var verticalOffset = 0;

	  if (spec.fade) {
	    return 0;
	  }

	  if (spec.infinite) {
	    if (spec.slideCount >= spec.slidesToShow) {
	      slideOffset = spec.slideWidth * spec.slidesToShow * -1;
	      verticalOffset = spec.slideHeight * spec.slidesToShow * -1;
	    }
	    if (spec.slideCount % spec.slidesToScroll !== 0) {
	      if (spec.slideIndex + spec.slidesToScroll > spec.slideCount && spec.slideCount > spec.slidesToShow) {
	        if (spec.slideIndex > spec.slideCount) {
	          slideOffset = (spec.slidesToShow - (spec.slideIndex - spec.slideCount)) * spec.slideWidth * -1;
	          verticalOffset = (spec.slidesToShow - (spec.slideIndex - spec.slideCount)) * spec.slideHeight * -1;
	        } else {
	          slideOffset = spec.slideCount % spec.slidesToScroll * spec.slideWidth * -1;
	          verticalOffset = spec.slideCount % spec.slidesToScroll * spec.slideHeight * -1;
	        }
	      }
	    }
	  } else {

	    if (spec.slideCount % spec.slidesToScroll !== 0) {
	      if (spec.slideIndex + spec.slidesToScroll > spec.slideCount && spec.slideCount > spec.slidesToShow) {
	        var slidesToOffset = spec.slidesToShow - spec.slideCount % spec.slidesToScroll;
	        slideOffset = slidesToOffset * spec.slideWidth;
	      }
	    }
	  }

	  if (spec.centerMode) {
	    if (spec.infinite) {
	      slideOffset += spec.slideWidth * Math.floor(spec.slidesToShow / 2);
	    } else {
	      slideOffset = spec.slideWidth * Math.floor(spec.slidesToShow / 2);
	    }
	  }

	  if (!spec.vertical) {
	    targetLeft = spec.slideIndex * spec.slideWidth * -1 + slideOffset;
	  } else {
	    targetLeft = spec.slideIndex * spec.slideHeight * -1 + verticalOffset;
	  }

	  if (spec.variableWidth === true) {
	    var targetSlideIndex;
	    if (spec.slideCount <= spec.slidesToShow || spec.infinite === false) {
	      targetSlide = _reactDom2.default.findDOMNode(spec.trackRef).childNodes[spec.slideIndex];
	    } else {
	      targetSlideIndex = spec.slideIndex + spec.slidesToShow;
	      targetSlide = _reactDom2.default.findDOMNode(spec.trackRef).childNodes[targetSlideIndex];
	    }
	    targetLeft = targetSlide ? targetSlide.offsetLeft * -1 : 0;
	    if (spec.centerMode === true) {
	      if (spec.infinite === false) {
	        targetSlide = _reactDom2.default.findDOMNode(spec.trackRef).children[spec.slideIndex];
	      } else {
	        targetSlide = _reactDom2.default.findDOMNode(spec.trackRef).children[spec.slideIndex + spec.slidesToShow + 1];
	      }

	      if (targetSlide) {
	        targetLeft = spec.slideWidth * spec.slideIndex * -1 + (spec.listWidth - targetSlide.offsetWidth) / 2;
	      }
	    }
	  }

	  return targetLeft;
	};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.Track = undefined;

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _objectAssign = __webpack_require__(8);

	var _objectAssign2 = _interopRequireDefault(_objectAssign);

	var _classnames = __webpack_require__(7);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var getSlideClasses = function getSlideClasses(spec) {
	  var slickActive, slickCenter, slickCloned;
	  var centerOffset, index;

	  if (spec.rtl) {
	    index = spec.slideCount - 1 - spec.index;
	  } else {
	    index = spec.index;
	  }

	  slickCloned = index < 0 || index >= spec.slideCount;
	  if (spec.centerMode) {
	    centerOffset = Math.floor(spec.slidesToShow / 2);
	    slickCenter = (index - spec.currentSlide) % spec.slideCount === 0;
	    if (index > spec.currentSlide - centerOffset - 1 && index <= spec.currentSlide + centerOffset) {
	      slickActive = true;
	    }
	  } else {
	    slickActive = spec.currentSlide <= index && index < spec.currentSlide + spec.slidesToShow;
	  }
	  return (0, _classnames2.default)({
	    'slick-slide': true,
	    'slick-active': slickActive,
	    'slick-center': slickCenter,
	    'slick-cloned': slickCloned
	  });
	};

	var getSlideStyle = function getSlideStyle(spec) {
	  var style = {};

	  if (spec.variableWidth === undefined || spec.variableWidth === false) {
	    style.width = spec.slideWidth;
	  }

	  if (spec.fade) {
	    style.position = 'relative';
	    style.left = -spec.index * spec.slideWidth;
	    style.opacity = spec.currentSlide === spec.index ? 1 : 0;
	    style.transition = 'opacity ' + spec.speed + 'ms ' + spec.cssEase;
	    style.WebkitTransition = 'opacity ' + spec.speed + 'ms ' + spec.cssEase;
	  }

	  return style;
	};

	var getKey = function getKey(child, fallbackKey) {
	  // key could be a zero
	  return child.key === null || child.key === undefined ? fallbackKey : child.key;
	};

	var renderSlides = function renderSlides(spec) {
	  var key;
	  var slides = [];
	  var preCloneSlides = [];
	  var postCloneSlides = [];
	  var count = _react2.default.Children.count(spec.children);

	  _react2.default.Children.forEach(spec.children, function (elem, index) {
	    var child = void 0;
	    var childOnClickOptions = {
	      message: 'children',
	      index: index,
	      slidesToScroll: spec.slidesToScroll,
	      currentSlide: spec.currentSlide
	    };

	    if (!spec.lazyLoad | (spec.lazyLoad && spec.lazyLoadedList.indexOf(index) >= 0)) {
	      child = elem;
	    } else {
	      child = _react2.default.createElement('div', null);
	    }
	    var childStyle = getSlideStyle((0, _objectAssign2.default)({}, spec, { index: index }));
	    var slickClasses = getSlideClasses((0, _objectAssign2.default)({ index: index }, spec));
	    var cssClasses;

	    if (child.props.className) {
	      cssClasses = (0, _classnames2.default)(slickClasses, child.props.className);
	    } else {
	      cssClasses = slickClasses;
	    }

	    var onClick = function onClick(e) {
	      child.props && child.props.onClick && child.props.onClick(e);
	      if (spec.focusOnSelect) {
	        spec.focusOnSelect(childOnClickOptions);
	      }
	    };

	    slides.push(_react2.default.cloneElement(child, {
	      key: 'original' + getKey(child, index),
	      'data-index': index,
	      className: cssClasses,
	      tabIndex: '-1',
	      style: (0, _objectAssign2.default)({ outline: 'none' }, child.props.style || {}, childStyle),
	      onClick: onClick
	    }));

	    // variableWidth doesn't wrap properly.
	    if (spec.infinite && spec.fade === false) {
	      var infiniteCount = spec.variableWidth ? spec.slidesToShow + 1 : spec.slidesToShow;

	      if (index >= count - infiniteCount) {
	        key = -(count - index);
	        preCloneSlides.push(_react2.default.cloneElement(child, {
	          key: 'precloned' + getKey(child, key),
	          'data-index': key,
	          className: cssClasses,
	          style: (0, _objectAssign2.default)({}, child.props.style || {}, childStyle),
	          onClick: onClick
	        }));
	      }

	      if (index < infiniteCount) {
	        key = count + index;
	        postCloneSlides.push(_react2.default.cloneElement(child, {
	          key: 'postcloned' + getKey(child, key),
	          'data-index': key,
	          className: cssClasses,
	          style: (0, _objectAssign2.default)({}, child.props.style || {}, childStyle),
	          onClick: onClick
	        }));
	      }
	    }
	  });

	  if (spec.rtl) {
	    return preCloneSlides.concat(slides, postCloneSlides).reverse();
	  } else {
	    return preCloneSlides.concat(slides, postCloneSlides);
	  }
	};

	var Track = exports.Track = function (_React$Component) {
	  _inherits(Track, _React$Component);

	  function Track() {
	    _classCallCheck(this, Track);

	    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
	  }

	  Track.prototype.render = function render() {
	    var slides = renderSlides.call(this, this.props);
	    return _react2.default.createElement(
	      'div',
	      { className: 'slick-track', style: this.props.trackStyle },
	      slides
	    );
	  };

	  return Track;
	}(_react2.default.Component);

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.Dots = undefined;

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(7);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var getDotCount = function getDotCount(spec) {
	  var dots;
	  dots = Math.ceil(spec.slideCount / spec.slidesToScroll);
	  return dots;
	};

	var Dots = exports.Dots = function (_React$Component) {
	  _inherits(Dots, _React$Component);

	  function Dots() {
	    _classCallCheck(this, Dots);

	    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
	  }

	  Dots.prototype.clickHandler = function clickHandler(options, e) {
	    // In Autoplay the focus stays on clicked button even after transition
	    // to next slide. That only goes away by click somewhere outside
	    e.preventDefault();
	    this.props.clickHandler(options);
	  };

	  Dots.prototype.render = function render() {
	    var _this2 = this;

	    var dotCount = getDotCount({
	      slideCount: this.props.slideCount,
	      slidesToScroll: this.props.slidesToScroll
	    });

	    // Apply join & split to Array to pre-fill it for IE8
	    //
	    // Credit: http://stackoverflow.com/a/13735425/1849458
	    var dots = Array.apply(null, Array(dotCount + 1).join('0').split('')).map(function (x, i) {

	      var leftBound = i * _this2.props.slidesToScroll;
	      var rightBound = i * _this2.props.slidesToScroll + (_this2.props.slidesToScroll - 1);
	      var className = (0, _classnames2.default)({
	        'slick-active': _this2.props.currentSlide >= leftBound && _this2.props.currentSlide <= rightBound
	      });

	      var dotOptions = {
	        message: 'dots',
	        index: i,
	        slidesToScroll: _this2.props.slidesToScroll,
	        currentSlide: _this2.props.currentSlide
	      };

	      var onClick = _this2.clickHandler.bind(_this2, dotOptions);

	      return _react2.default.createElement(
	        'li',
	        { key: i, className: className },
	        _react2.default.cloneElement(_this2.props.customPaging(i), { onClick: onClick })
	      );
	    });

	    return _react2.default.createElement(
	      'ul',
	      { className: this.props.dotsClass, style: { display: 'block' } },
	      dots
	    );
	  };

	  return Dots;
	}(_react2.default.Component);

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.NextArrow = exports.PrevArrow = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(7);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _canGoNext = __webpack_require__(9);

	var _canGoNext2 = _interopRequireDefault(_canGoNext);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var PrevArrow = exports.PrevArrow = function (_React$Component) {
	  _inherits(PrevArrow, _React$Component);

	  function PrevArrow() {
	    _classCallCheck(this, PrevArrow);

	    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
	  }

	  PrevArrow.prototype.clickHandler = function clickHandler(options, e) {
	    if (e) {
	      e.preventDefault();
	    }
	    this.props.clickHandler(options, e);
	  };

	  PrevArrow.prototype.render = function render() {
	    var prevClasses = { 'slick-arrow': true, 'slick-prev': true };
	    var prevHandler = this.clickHandler.bind(this, { message: 'previous' });

	    if (!this.props.infinite && (this.props.currentSlide === 0 || this.props.slideCount <= this.props.slidesToShow)) {
	      prevClasses['slick-disabled'] = true;
	      prevHandler = null;
	    }

	    var prevArrowProps = {
	      key: '0',
	      'data-role': 'none',
	      className: (0, _classnames2.default)(prevClasses),
	      style: { display: 'block' },
	      onClick: prevHandler
	    };
	    var customProps = {
	      currentSlide: this.props.currentSlide,
	      slideCount: this.props.slideCount
	    };
	    var prevArrow;

	    if (this.props.prevArrow) {
	      prevArrow = _react2.default.cloneElement(this.props.prevArrow, _extends({}, prevArrowProps, customProps));
	    } else {
	      prevArrow = _react2.default.createElement(
	        'button',
	        _extends({ key: '0', type: 'button' }, prevArrowProps),
	        ' Previous'
	      );
	    }

	    return prevArrow;
	  };

	  return PrevArrow;
	}(_react2.default.Component);

	var NextArrow = exports.NextArrow = function (_React$Component2) {
	  _inherits(NextArrow, _React$Component2);

	  function NextArrow() {
	    _classCallCheck(this, NextArrow);

	    return _possibleConstructorReturn(this, _React$Component2.apply(this, arguments));
	  }

	  NextArrow.prototype.clickHandler = function clickHandler(options, e) {
	    if (e) {
	      e.preventDefault();
	    }
	    this.props.clickHandler(options, e);
	  };

	  NextArrow.prototype.render = function render() {
	    var nextClasses = { 'slick-arrow': true, 'slick-next': true };
	    var nextHandler = this.clickHandler.bind(this, { message: 'next' });

	    if (!(0, _canGoNext2.default)(this.props)) {
	      nextClasses['slick-disabled'] = true;
	      nextHandler = null;
	    }

	    var nextArrowProps = {
	      key: '1',
	      'data-role': 'none',
	      className: (0, _classnames2.default)(nextClasses),
	      style: { display: 'block' },
	      onClick: nextHandler
	    };
	    var customProps = {
	      currentSlide: this.props.currentSlide,
	      slideCount: this.props.slideCount
	    };
	    var nextArrow;

	    if (this.props.nextArrow) {
	      nextArrow = _react2.default.cloneElement(this.props.nextArrow, _extends({}, nextArrowProps, customProps));
	    } else {
	      nextArrow = _react2.default.createElement(
	        'button',
	        _extends({ key: '1', type: 'button' }, nextArrowProps),
	        ' Next'
	      );
	    }

	    return nextArrow;
	  };

	  return NextArrow;
	}(_react2.default.Component);

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	var camel2hyphen = __webpack_require__(15);

	var isDimension = function (feature) {
	  var re = /[height|width]$/;
	  return re.test(feature);
	};

	var obj2mq = function (obj) {
	  var mq = '';
	  var features = Object.keys(obj);
	  features.forEach(function (feature, index) {
	    var value = obj[feature];
	    feature = camel2hyphen(feature);
	    // Add px to dimension features
	    if (isDimension(feature) && typeof value === 'number') {
	      value = value + 'px';
	    }
	    if (value === true) {
	      mq += feature;
	    } else if (value === false) {
	      mq += 'not ' + feature;
	    } else {
	      mq += '(' + feature + ': ' + value + ')';
	    }
	    if (index < features.length-1) {
	      mq += ' and '
	    }
	  });
	  return mq;
	};

	var json2mq = function (query) {
	  var mq = '';
	  if (typeof query === 'string') {
	    return query;
	  }
	  // Handling array of media queries
	  if (query instanceof Array) {
	    query.forEach(function (q, index) {
	      mq += obj2mq(q);
	      if (index < query.length-1) {
	        mq += ', '
	      }
	    });
	    return mq;
	  }
	  // Handling single media query
	  return obj2mq(query);
	};

	module.exports = json2mq;

/***/ }),
/* 15 */
/***/ (function(module, exports) {

	var camel2hyphen = function (str) {
	  return str
	          .replace(/[A-Z]/g, function (match) {
	            return '-' + match.toLowerCase();
	          })
	          .toLowerCase();
	};

	module.exports = camel2hyphen;

/***/ }),
/* 16 */
/***/ (function(module, exports) {

	var canUseDOM = !!(
	  typeof window !== 'undefined' &&
	  window.document &&
	  window.document.createElement
	);

	module.exports = canUseDOM;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	var MediaQueryDispatch = __webpack_require__(18);
	module.exports = new MediaQueryDispatch();


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	var MediaQuery = __webpack_require__(19);
	var Util = __webpack_require__(21);
	var each = Util.each;
	var isFunction = Util.isFunction;
	var isArray = Util.isArray;

	/**
	 * Allows for registration of query handlers.
	 * Manages the query handler's state and is responsible for wiring up browser events
	 *
	 * @constructor
	 */
	function MediaQueryDispatch () {
	    if(!window.matchMedia) {
	        throw new Error('matchMedia not present, legacy browsers require a polyfill');
	    }

	    this.queries = {};
	    this.browserIsIncapable = !window.matchMedia('only all').matches;
	}

	MediaQueryDispatch.prototype = {

	    constructor : MediaQueryDispatch,

	    /**
	     * Registers a handler for the given media query
	     *
	     * @param {string} q the media query
	     * @param {object || Array || Function} options either a single query handler object, a function, or an array of query handlers
	     * @param {function} options.match fired when query matched
	     * @param {function} [options.unmatch] fired when a query is no longer matched
	     * @param {function} [options.setup] fired when handler first triggered
	     * @param {boolean} [options.deferSetup=false] whether setup should be run immediately or deferred until query is first matched
	     * @param {boolean} [shouldDegrade=false] whether this particular media query should always run on incapable browsers
	     */
	    register : function(q, options, shouldDegrade) {
	        var queries         = this.queries,
	            isUnconditional = shouldDegrade && this.browserIsIncapable;

	        if(!queries[q]) {
	            queries[q] = new MediaQuery(q, isUnconditional);
	        }

	        //normalise to object in an array
	        if(isFunction(options)) {
	            options = { match : options };
	        }
	        if(!isArray(options)) {
	            options = [options];
	        }
	        each(options, function(handler) {
	            if (isFunction(handler)) {
	                handler = { match : handler };
	            }
	            queries[q].addHandler(handler);
	        });

	        return this;
	    },

	    /**
	     * unregisters a query and all it's handlers, or a specific handler for a query
	     *
	     * @param {string} q the media query to target
	     * @param {object || function} [handler] specific handler to unregister
	     */
	    unregister : function(q, handler) {
	        var query = this.queries[q];

	        if(query) {
	            if(handler) {
	                query.removeHandler(handler);
	            }
	            else {
	                query.clear();
	                delete this.queries[q];
	            }
	        }

	        return this;
	    }
	};

	module.exports = MediaQueryDispatch;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	var QueryHandler = __webpack_require__(20);
	var each = __webpack_require__(21).each;

	/**
	 * Represents a single media query, manages it's state and registered handlers for this query
	 *
	 * @constructor
	 * @param {string} query the media query string
	 * @param {boolean} [isUnconditional=false] whether the media query should run regardless of whether the conditions are met. Primarily for helping older browsers deal with mobile-first design
	 */
	function MediaQuery(query, isUnconditional) {
	    this.query = query;
	    this.isUnconditional = isUnconditional;
	    this.handlers = [];
	    this.mql = window.matchMedia(query);

	    var self = this;
	    this.listener = function(mql) {
	        // Chrome passes an MediaQueryListEvent object, while other browsers pass MediaQueryList directly
	        self.mql = mql.currentTarget || mql;
	        self.assess();
	    };
	    this.mql.addListener(this.listener);
	}

	MediaQuery.prototype = {

	    constuctor : MediaQuery,

	    /**
	     * add a handler for this query, triggering if already active
	     *
	     * @param {object} handler
	     * @param {function} handler.match callback for when query is activated
	     * @param {function} [handler.unmatch] callback for when query is deactivated
	     * @param {function} [handler.setup] callback for immediate execution when a query handler is registered
	     * @param {boolean} [handler.deferSetup=false] should the setup callback be deferred until the first time the handler is matched?
	     */
	    addHandler : function(handler) {
	        var qh = new QueryHandler(handler);
	        this.handlers.push(qh);

	        this.matches() && qh.on();
	    },

	    /**
	     * removes the given handler from the collection, and calls it's destroy methods
	     *
	     * @param {object || function} handler the handler to remove
	     */
	    removeHandler : function(handler) {
	        var handlers = this.handlers;
	        each(handlers, function(h, i) {
	            if(h.equals(handler)) {
	                h.destroy();
	                return !handlers.splice(i,1); //remove from array and exit each early
	            }
	        });
	    },

	    /**
	     * Determine whether the media query should be considered a match
	     *
	     * @return {Boolean} true if media query can be considered a match, false otherwise
	     */
	    matches : function() {
	        return this.mql.matches || this.isUnconditional;
	    },

	    /**
	     * Clears all handlers and unbinds events
	     */
	    clear : function() {
	        each(this.handlers, function(handler) {
	            handler.destroy();
	        });
	        this.mql.removeListener(this.listener);
	        this.handlers.length = 0; //clear array
	    },

	    /*
	        * Assesses the query, turning on all handlers if it matches, turning them off if it doesn't match
	        */
	    assess : function() {
	        var action = this.matches() ? 'on' : 'off';

	        each(this.handlers, function(handler) {
	            handler[action]();
	        });
	    }
	};

	module.exports = MediaQuery;


/***/ }),
/* 20 */
/***/ (function(module, exports) {

	/**
	 * Delegate to handle a media query being matched and unmatched.
	 *
	 * @param {object} options
	 * @param {function} options.match callback for when the media query is matched
	 * @param {function} [options.unmatch] callback for when the media query is unmatched
	 * @param {function} [options.setup] one-time callback triggered the first time a query is matched
	 * @param {boolean} [options.deferSetup=false] should the setup callback be run immediately, rather than first time query is matched?
	 * @constructor
	 */
	function QueryHandler(options) {
	    this.options = options;
	    !options.deferSetup && this.setup();
	}

	QueryHandler.prototype = {

	    constructor : QueryHandler,

	    /**
	     * coordinates setup of the handler
	     *
	     * @function
	     */
	    setup : function() {
	        if(this.options.setup) {
	            this.options.setup();
	        }
	        this.initialised = true;
	    },

	    /**
	     * coordinates setup and triggering of the handler
	     *
	     * @function
	     */
	    on : function() {
	        !this.initialised && this.setup();
	        this.options.match && this.options.match();
	    },

	    /**
	     * coordinates the unmatch event for the handler
	     *
	     * @function
	     */
	    off : function() {
	        this.options.unmatch && this.options.unmatch();
	    },

	    /**
	     * called when a handler is to be destroyed.
	     * delegates to the destroy or unmatch callbacks, depending on availability.
	     *
	     * @function
	     */
	    destroy : function() {
	        this.options.destroy ? this.options.destroy() : this.off();
	    },

	    /**
	     * determines equality by reference.
	     * if object is supplied compare options, if function, compare match callback
	     *
	     * @function
	     * @param {object || function} [target] the target for comparison
	     */
	    equals : function(target) {
	        return this.options === target || this.options.match === target;
	    }

	};

	module.exports = QueryHandler;


/***/ }),
/* 21 */
/***/ (function(module, exports) {

	/**
	 * Helper function for iterating over a collection
	 *
	 * @param collection
	 * @param fn
	 */
	function each(collection, fn) {
	    var i      = 0,
	        length = collection.length,
	        cont;

	    for(i; i < length; i++) {
	        cont = fn(collection[i], i);
	        if(cont === false) {
	            break; //allow early exit
	        }
	    }
	}

	/**
	 * Helper function for determining whether target object is an array
	 *
	 * @param target the object under test
	 * @return {Boolean} true if array, false otherwise
	 */
	function isArray(target) {
	    return Object.prototype.toString.apply(target) === '[object Array]';
	}

	/**
	 * Helper function for determining whether target object is a function
	 *
	 * @param target the object under test
	 * @return {Boolean} true if function, false otherwise
	 */
	function isFunction(target) {
	    return typeof target === 'function';
	}

	module.exports = {
	    isFunction : isFunction,
	    isArray : isArray,
	    each : each
	};


/***/ })
/******/ ])
});
;