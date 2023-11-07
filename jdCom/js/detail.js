let prev = document.querySelector('.prev');
let next = document.querySelector('.next');
let ul = document.querySelector('.spec-items ul');
let lis = document.querySelectorAll('.spec-items ul li');
let img = document.querySelector('.main-img img');
let imgs = document.querySelectorAll('.spec-items img');
let mainImg = document.querySelector('.main-img');
let zoomPup = document.querySelector('.zoom-pup');
let zoomDiv = document.querySelector('.zoom-div');
let bigImg = document.querySelector('.zoom-div img');
let buyNum = document.querySelector('.buy-num');
let reduce = document.querySelector('.reduce');
let add = document.querySelector('.add');



//1、实现上一张下一张小图片的切换
prev.addEventListener('click', function () {
    ul.style.left = '0';
    //说明一下图片路径，不能从这个js文件去找图片路径
    //而是应该从html文件出发找路径，因为最终背景图片的样式是应用到html
    prev.style.background = 'url(./images/disabled-prev.png)';
})

next.addEventListener('click', function () {
    ul.style.left = '-116px';
})

//2、实现显示中图的效果
for (let i = 0; i < lis.length; i++) {
    lis[i].addEventListener('click', function () {
        for (let j = 0; j < lis.length; j++) {
            lis[j].className = '';
        }
        lis[i].className = 'img-hover';
        img.src = lis[i].children[0].src; //获取li里面的img的路径
        // img.src = imgs[i].src; //或者用这种方法

    })
}

//3、实现放大镜
mainImg.addEventListener('mouseover', function () {
    zoomPup.style.display = 'block';
    zoomDiv.style.display = 'block';
})

mainImg.addEventListener('mouseleave', function () {
    zoomPup.style.display = 'none';
    zoomDiv.style.display = 'none';
})

mainImg.addEventListener('mousemove', function (e) {
    //获取鼠标距离文档顶部的距离
    let pageY = e.pageY;
    //获取鼠标距离文档左侧的距离
    let pageX = e.pageX;
    //获取中图距离文档顶部的距离
    let offsetTop = mainImg.offsetTop;
    //获取中图距离文档左侧的距离
    let offsetLeft = mainImg.offsetLeft;
    //获取放大镜（粉块）的高度的一半
    let h = zoomPup.clientHeight / 2;
    //获取放大镜（粉块）的宽度的一半
    let w = zoomPup.clientWidth / 2;
    //因为鼠标移动的时候，粉色方块也是跟着移动的，所以，鼠标指针处于块中心
    let top = pageY - offsetTop - h;
    let left = pageX - offsetLeft - w;

    if (top <= 0) {
        top = 0;
    } else if (mainImg.clientHeight - zoomPup.clientHeight) {
        top = mainImg.clientHeight - zoomPup.clientHeight;
    }

    if (left <= 0) {
        left = 0;
    } else if (left > mainImg.clientWidth - zoomPup.clientWidth) {
        left = mainImg.clientWidth - zoomPup.clientWidth;
    }

    zoomPup.style.top = top + 'px';
    zoomPup.style.left = left + 'px';

    //一个等比例公式，top/图片盒子高-粉色方块高=大图往上移出去的距离/大图原高-大图显示的图高
    let y = top / (mainImg.clientHeight - zoomPup.clientHeight);
    bigImg.style.top = -(y * (800 - 540)) + 'px';
    //水平方向的放大
    let x = left / (mainImg.clientWidth - zoomPup.clientWidth)
    bigImg.style.left = -(x * (800 - 540)) + 'px';
})

//4、实现购物车数字计算
reduce.addEventListener('click', function () {
    buyNum.value--;
    if (buyNum.value <= 1) {
        buyNum.value = 1;
        reduce.className = 'reduce disabled';
    }
})

add.addEventListener('click', function () {
    buyNum.value++;
    if (buyNum.value > 1) {
        reduce.classList.remove('disabled');
    }
})