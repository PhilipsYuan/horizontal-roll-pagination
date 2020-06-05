'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HorizontalRollPagination = function () {
    function HorizontalRollPagination(config) {
        _classCallCheck(this, HorizontalRollPagination);

        // 左按钮
        this.preDom = config.preDom;
        // 又按钮
        this.nextDom = config.nextDom;
        // 放东西的父节点
        this.scrollDom = config.scrollDom;
        // 盒子
        this.boxDom = config.box;
        this.loop = config.loop || false;
        this.speed = config.speed || 5;
        // 盒子的宽
        this.parentWidth = parseInt(window.getComputedStyle(this.boxDom).width);
        this.parentDom = config.parentDom;
        // 子节点数组
        this.subList = this.getChildren(config.parentDom);
        // 子节点宽
        this.subWidth = parseInt(window.getComputedStyle(this.subList[0]).width) + parseInt(window.getComputedStyle(this.subList[0]).marginLeft) + parseInt(window.getComputedStyle(this.subList[0]).marginRight);
        // 每页容纳项目数
        this.count = this.getTotalPage(this.parentWidth, this.subWidth, this.subList.length);
        // 初时值
        this.left = 0;
        //  移动的总长度 = 组件总长度 - 可视框的宽度
        this.moveWidth = this.subList.length * this.subWidth - this.parentWidth;
        // 现在剩余长度
        this.restWidth = this.moveWidth;
    }

    _createClass(HorizontalRollPagination, [{
        key: 'init',
        value: function init() {
            if (!this.loop) {
                this.preDom.style.display = 'none';
            }
            this.preDom.addEventListener('click', this.preEvent.bind(this), false);
            this.nextDom.addEventListener('click', this.nextEvent.bind(this), false);
        }

        /**
         * 可视区域发生改变时
         */

    }, {
        key: 'refresh',
        value: function refresh() {
            var parentWidth = parseInt(window.getComputedStyle(this.boxDom).width);
            var gap = parentWidth - this.parentWidth;
            this.moveWidth = this.moveWidth - gap;
            this.restWidth = this.restWidth - gap;
            this.parentWidth = parentWidth;
            this.count = this.getTotalPage(this.parentWidth, this.subWidth, this.subList.length);
            this.checkClickButton();
        }

        /**
         * 相数发生改变时，需要重新设置
         */

    }, {
        key: 'reset',
        value: function reset() {
            this.subList = this.getChildren(this.parentDom);
            var newMoveWidth = this.subList.length * this.subWidth - this.parentWidth;
            if (newMoveWidth !== this.moveWidth) {
                this.moveWidth = newMoveWidth;
                this.restWidth = this.moveWidth;
                this.count = this.getTotalPage(this.parentWidth, this.subWidth, this.subList.length);
                this.checkClickButton();
            }
        }
    }, {
        key: 'preEvent',
        value: function preEvent() {
            // 移动的项
            var restWidth = this.subWidth * this.count;
            // 最后一页
            if (this.restWidth === this.moveWidth && this.loop) {
                var element = this.scrollDom;
                var target = -this.moveWidth;
                this.animate(element, this.left, target, true, this.speed, true);
                this.left = target;
                this.restWidth = 0;
                this.checkClickButton();
            } else {
                if (this.moveWidth - this.restWidth < restWidth) {
                    restWidth = this.moveWidth - this.restWidth;
                }
                var _element = this.scrollDom;
                var _target = this.left + restWidth;
                this.animate(_element, this.left, _target, false, this.speed);
                this.left = _target;
                this.restWidth = this.restWidth + restWidth;
                this.checkClickButton();
            }
        }
    }, {
        key: 'nextEvent',
        value: function nextEvent() {
            var restWidth = this.count * this.subWidth;
            if (this.restWidth === 0 && this.loop) {
                var element = this.scrollDom;
                var target = 0;
                this.animate(element, this.left, target, false, this.speed, true);
                this.left = target;
                this.restWidth = this.moveWidth;
                this.checkClickButton();
            } else {
                // 最后一页
                if (this.restWidth < restWidth) {
                    restWidth = this.restWidth;
                }
                var _element2 = this.scrollDom;
                var _target2 = this.left - restWidth;
                this.animate(_element2, this.left, _target2, true, this.speed);
                this.left = _target2;
                this.restWidth = this.restWidth - restWidth;
                this.checkClickButton();
            }
        }
    }, {
        key: 'checkClickButton',
        value: function checkClickButton() {
            if (this.subList.length * this.subWidth < this.parentWidth) {
                this.preDom.style.display = 'none';
                this.nextDom.style.display = 'none';
            } else if (!this.loop) {
                if (this.restWidth == 0) {
                    this.preDom.style.display = 'block';
                    this.nextDom.style.display = 'none';
                } else if (this.restWidth == this.moveWidth) {
                    this.preDom.style.display = 'none';
                    this.nextDom.style.display = 'block';
                } else {
                    this.preDom.style.display = 'block';
                    this.nextDom.style.display = 'block';
                }
            }
        }

        /**
         * 获取总共的页数
         * 1. 先算出容纳多少个子节点
         * 2. 再根据总数除以容纳数
         */

    }, {
        key: 'getTotalPage',
        value: function getTotalPage(pWidth, sWidth, totalNum) {
            var count = parseInt(parseInt(pWidth) / parseInt(sWidth));
            return count;
        }

        /**
         * 执行动画
         * @param direction 在next 为true， prev 为false
         * @param isLoop 是否跑整个组件
         */

    }, {
        key: 'animate',
        value: function animate(element, base, target, direction, speed, isLoop) {
            if (isLoop) {
                speed = speed * 2;
            }
            function step() {
                if (direction) {
                    base = base - speed;
                } else {
                    base = base + speed;
                }
                element.style.left = base + 'px';
                if (direction) {
                    if (target < base) {
                        window.requestAnimationFrame(step);
                    } else {
                        element.style.left = base + 'px';
                    }
                } else {
                    if (target > base) {
                        window.requestAnimationFrame(step);
                    } else {
                        element.style.left = base + 'px';
                    }
                }
            }

            window.requestAnimationFrame(step);
        }

        /**
         * 获取一级子节点
         * @param obj
         * @return {Array}
         */

    }, {
        key: 'getChildren',
        value: function getChildren(obj) {
            var objChild = [];
            var objs = obj.getElementsByTagName('*');
            for (var i = 0, j = objs.length; i < j; ++i) {
                if (objs[i].nodeType !== 1) {
                    alert(objs[i].nodeType);
                    continue;
                }
                var temp = objs[i].parentNode;
                if (temp.nodeType == 1) {
                    if (temp == obj) {
                        objChild[objChild.length] = objs[i];
                    }
                } else if (temp.parentNode == obj) {
                    objChild[objChild.length] = objs[i];
                }
            }
            return objChild;
        }
    }]);

    return HorizontalRollPagination;
}();

window.HorizontalRollPagination = HorizontalRollPagination;
