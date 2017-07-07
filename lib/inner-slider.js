'use strict';

exports.__esModule = true;
exports.InnerSlider = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _initialState = require('./initial-state');

var _initialState2 = _interopRequireDefault(_initialState);

var _defaultProps = require('./default-props');

var _defaultProps2 = _interopRequireDefault(_defaultProps);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _canGoNext = require('./helpers/canGoNext');

var _canGoNext2 = _interopRequireDefault(_canGoNext);

var _trackHelper = require('./helpers/trackHelper');

var _track = require('./track');

var _dots = require('./dots');

var _arrows = require('./arrows');

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
      if (process.env.NODE_ENV !== 'production') {
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
      var centerPaddingAdj = props.centerMode && parseInt(props.centerPadding) * 2;
      slideWidth = (_this2.getWidth(_reactDom2.default.findDOMNode(_this2)) - centerPaddingAdj) / props.slidesToShow;
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
      var centerPaddingAdj = props.centerMode && parseInt(props.centerPadding) * 2;
      slideWidth = (_this2.getWidth(_reactDom2.default.findDOMNode(_this2)) - centerPaddingAdj) / props.slidesToShow;
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
        loaded = loaded && _this2.state.lazyLoadedList.indexOf(i) >= 0;
        if (!loaded) {
          slidesToLoad.push(i);
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

      var slidesTraversed = Math.abs(swipedSlide.dataset.index - _this2.state.currentSlide) || 1;

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