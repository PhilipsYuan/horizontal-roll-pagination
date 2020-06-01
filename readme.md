# 横向滚动翻页
 横向滚动插件，是一个有横向翻页按钮，同时翻页时有滚动效果的插件。在公司官网展示不是很多东西情况下会经常用到。
 
demo
 
## 使用说明
1. 你需要引入horizontal-roll-pagination.js， 引入之后会在全局window下有个属性HorizontalRollPagination，你可以new 它创建实例。
```javascript
    let config = {
        // preDom: 前一页的按钮节点 -- 必须
        preDom: document.getElementsByClassName('prev')[0],
        // nextDom: 后一页的按钮节点 -- 必须
        nextDom: document.getElementsByClassName('next')[0],
        // box: 可视区域的节点 -- 必须
        box: document.getElementsByClassName('box')[0],
        // scrollDom: 会被移动的节点 -- 必须
        scrollDom: document.getElementsByClassName('scroll_list')[0],
        // parentDom: 展示项的父节点 -- 必须
        parentDom: document.getElementsByTagName('ul')[0],
        // 是否循环
        loop: true
    };
    let horizontalRollPagination = new HorizontalRollPagination(config);
    horizontalRollPagination.init();
```
2. 这个插件对dom节点需要一定要求。它的结构如下：
```html
<div class="scroll" >
    <button class="prev" >前一页</button>
    <div class="box">
        <div class="scroll_list">
            <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
                <li>5</li>
                <li>6</li>
                <li>7</li>
                <li>8</li>
                <li>9</li>
                <li>10</li>
                <li>11</li>
                <li>12</li>
                <li>13</li>
                <li>14</li>
                <li>15</li>
                <li>16</li>
                <li>17</li>
            </ul>
        </div>
    </div>
    <button class="next">后一页</button>
</div>
```
说明：
1. 前一页和后一页的按钮dom，可以放在任意位置。也可以不在这个结构里。
2. box节点： 必须是有具体width的。且overflow: hidden; position: relative;
3. scroll_list节点： 必须是position: absolute;


## 属性方法
<table border="1">
    <tbody>
    <tr>
        <th>参数</th>
        <th>类型</th>
        <th>是否必须</th>
        <th>含义</th>
    </tr>
    <tr>
        <td>preDom</td>
        <td>dom对象</td>
        <td>Y</td>
        <td>前一页的按钮节点</td>
    </tr>
    <tr>
        <td>nextDom</td>
        <td>dom对象</td>
        <td>Y</td>
        <td>后一页的按钮节点</td>
    </tr>
    <tr>
        <td>box</td>
        <td>dom对象</td>
        <td>Y</td>
        <td>可视区域的节点</td>
    </tr>
    <tr>
        <td>scrollDom</td>
        <td>dom对象</td>
        <td>Y</td>
        <td>会被移动的节点</td>
    </tr>
    <tr>
        <td>parentDom</td>
        <td>dom对象</td>
        <td>Y</td>
        <td>展示项的父节点</td>
    </tr>
    <tr>
        <td>loop</td>
        <td>Booleans</td>
        <td>N</td>
        <td>是否可以循环</td>
    </tr>
    <tr>
        <td>speed</td>
        <td>number</td>
        <td>N</td>
        <td>设置滚动的速度， 默认为5， 设置值的范围【1 - 10】</td>
    </tr>
    <tr>
        <td>reset</td>
        <td>Function</td>
        <td>N</td>
        <td>为实例下挂的方法（无参数）： 在展示项（li）发生改变时, 需要调用这个方法进行设置</td>
    </tr>
        <tr>
            <td>refresh</td>
            <td>Function</td>
            <td>N</td>
            <td>为实例下挂的方法（无参数）： 在可视区（box）发生改变时, 需要调用这个方法进行设置。一般发生在自适应布局时用到</td>
        </tr>
    </tbody>
</table>
