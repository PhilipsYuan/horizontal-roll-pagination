class HorizontalRollPagination {
    constructor(config) {
        // 左按钮
        this.preDom = config.preDom;
        // 又按钮
        this.nextDom = config.nextDom;
        // 放东西的父节点
        this.parentDom = config.parentDom;
        // 盒子
        this.boxDom = config.box;
        this.loop = config.loop || false;
        this.speed = config.speed || 5;
        // 盒子的宽
        this.parentWidth = parseInt(window.getComputedStyle(this.boxDom).width);
        this.itemsDom = config.itemsDom;
        // 子节点数组
        this.subList = this.getChildren(config.itemsDom);
        // 子节点宽
        this.subWidth = parseInt(window.getComputedStyle(this.subList[0]).width)
            + parseInt(window.getComputedStyle(this.subList[0]).marginLeft)
            + parseInt(window.getComputedStyle(this.subList[0]).marginRight);
        // 每页容纳项目数
        this.count = this.getTotalPage(this.parentWidth, this.subWidth, this.subList.length);
        // 初时值
        this.left = 0;
        //  移动的总长度 = 组件总长度 - 可视框的宽度
        this.moveWidth = this.subList.length * this.subWidth - this.parentWidth;
        // 现在剩余长度
        this.restWidth = this.moveWidth;
    }

    init() {
        if(!this.loop) {
            this.preDom.style.display = 'none';
        }

        this.preDom.addEventListener('click', this.preEvent.bind(this), false);

        this.nextDom.addEventListener('click', this.nextEvent.bind(this), false);
    }

    refresh() {
        let parentWidth = parseInt(window.getComputedStyle(this.boxDom).width);
        let gap = parentWidth - this.parentWidth;
        this.moveWidth = this.moveWidth - gap;
        this.restWidth = this.restWidth - gap;
        this.parentWidth = parentWidth;
        this.count = this.getTotalPage(this.parentWidth, this.subWidth, this.subList.length);
    }

    /**
     * 相数发生改变时，需要重新设置
     */
    reset() {
        this.subList = this.getChildren(this.itemsDom);
        let parentWidth = parseInt(window.getComputedStyle(this.boxDom).width);
        this.moveWidth = this.subList.length * this.subWidth - parentWidth;
        this.restWidth = this.moveWidth;
        this.parentWidth = parentWidth;
        this.count = this.getTotalPage(this.parentWidth, this.subWidth, this.subList.length);
    }

    preEvent() {
        // 移动的项
        let restWidth = this.subWidth * this.count;
        // 最后一页
        if(this.restWidth === this.moveWidth && this.loop) {
            let element = this.parentDom;
            let target = - this.moveWidth;
            this.animate(element, this.left, target, true, this.speed, true);
            this.left = target;
            this.restWidth = 0;
            this.checkClickButton();
        } else {
            if(this.moveWidth - this.restWidth < restWidth) {
                restWidth = this.moveWidth - this.restWidth;
            }
            let element = this.parentDom;
            let target = this.left + restWidth;
            this.animate(element, this.left, target, false, this.speed);
            this.left = target;
            this.restWidth = this.restWidth + restWidth;
            this.checkClickButton();
        }
    }

    nextEvent() {
        let restWidth = this.count * this.subWidth;
        if(this.restWidth === 0 && this.loop) {
            let element = this.parentDom;
            let target = 0;
            this.animate(element, this.left, target, false, this.speed, true);
            this.left = target;
            this.restWidth = this.moveWidth;
            this.checkClickButton();
        } else {
            // 最后一页
            if(this.restWidth < restWidth) {
                restWidth = this.restWidth;
            }
            let element = this.parentDom;
            let target = this.left - restWidth;
            this.animate(element, this.left, target, true, this.speed);
            this.left = target;
            this.restWidth = this.restWidth - restWidth;
            this.checkClickButton();
        }
    }

    checkClickButton () {
        if(!this.loop) {
            if(this.restWidth == 0) {
                this.preDom.style.display = 'block';
                this.nextDom.style.display = 'none';
            } else if(this.restWidth == this.moveWidth) {
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
    getTotalPage(pWidth, sWidth, totalNum) {
        let count = parseInt(parseInt(pWidth) / parseInt(sWidth));
        return count;
    }

    /**
     * 执行动画
     * @param direction 在next 为true， prev 为false
     * @param isLoop 是否跑整个组件
     */
    animate(element, base, target, direction, speed, isLoop) {
        if(isLoop) {
            speed = speed * 2;
        }
        function step() {
            if(direction) {
                base = base - speed;
            } else  {
                base = base + speed;
            }
            element.style.left = base +  'px';
            if(direction) {
                if (target < base) {
                    window.requestAnimationFrame(step);
                } else {
                    element.style.left = base +  'px';
                }
            } else {
                if (target > base) {
                    window.requestAnimationFrame(step);
                } else {
                    element.style.left = base +  'px';
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
    getChildren (obj) {
        let objChild = [] ;
        let objs = obj.getElementsByTagName('*');
        for (let i = 0, j = objs.length; i < j; ++i) {
            if (objs[i].nodeType !== 1) { alert(objs[i].nodeType)
                continue
            }
            let temp = objs[i].parentNode;
            if (temp.nodeType == 1) {
                if (temp == obj) {
                    objChild[objChild.length] = objs[i]
                }
            } else if (temp.parentNode == obj) {
                objChild[objChild.length] = objs[i]
            }
        }
        return objChild
    }
}

window.HorizontalRollPagination = HorizontalRollPagination
