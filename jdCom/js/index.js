//1、实现模糊查询
let keyword = document.querySelector('.keyword');
let search_helper = document.querySelector('.search_helper');

//定义数组，存储搜索的内容
let searchArr = ['小米手机', '华为手机', '苹果手机', '小米电视', '小米平板', '苹果12', '苹果手表', '苹果13'];

//给输入框绑定内容改变事件
keyword.addEventListener('input', function () {
    search_helper.innerHTML = '';
    for (let i = 0; i < searchArr.length; i++) {

        //这里的判断就是查找数组元素是否有指定的用户输入的内容
        if (searchArr[i].indexOf(keyword.value) != -1) {
            search_helper.innerHTML += '<p>' + searchArr[i] + '</p>';
            search_helper.style.display = 'block';
        }
    }
})
//失去光标，搜索匹配到的内容消失
keyword.addEventListener('blur', function () {
    search_helper.style.display = 'none';
})


//2、实现轮播图的切换
let img = document.querySelector('.img');
let prev = document.querySelector('.prev');
let next = document.querySelector('.next');
let slide = document.querySelector('.slide');
let lis = document.querySelectorAll('.banner_btn li');



let imgArr = ['1.webp', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg'];

let count = 0;

//定义函数,切换图片的路径
function cutImg() {
    img.src = './images/' + imgArr[count];
    //将其他小圆点active样式全部去掉
    for (let i = 0; i < lis.length; i++) {
        lis[i].className = 'active';
    }
    //唯独被点击的小圆点亮起
    lis[count].className = 'active';
}
//设置定时器，每隔3秒自动切换图片
let timer = setInterval(function () {
    count++;
    if (count > imgArr.length - 1) {
        count = 0;
    }
    cutImg();
}, 4000)
//点击上一张切换图片
prev.addEventListener('click', function () {
    count--;
    if (count < 0) {
        count = imgArr.length - 1;
    }
    cutImg();
})
//点击下一张切换图片
next.addEventListener('click', function () {
    console.log(1111);
    count++;
    if (count > imgArr.length - 1) {
        count = 0;
    }
    cutImg();
})
//当鼠标放在图片，图片不切换
slide.addEventListener('mouseover', function () {
    clearInterval(timer);
})
//鼠标滑出图片，定时器重新跑，重新赋值
slide.addEventListener('mouseout', function () {
    timer = setInterval(function () {
        count++;
        if (count > imgArr.length - 1) {
            count = 0;
        }
        cutImg();
    }, 2000)
})
//给li绑定点击事件，点击li小圆点，跳转图片
for (let i = 0; i < lis.length; i++) {
    lis[i].addEventListener('click', function () {
        count = i;
        cutImg();
    })
}


//3、楼层定位切换
let header = document.querySelector('.header');
let banner = document.querySelector('.banner');
let elevator = document.querySelector('.elevator');
let items = document.querySelectorAll('.item');
let elevatorA = document.querySelectorAll('.elevator a');
let search = document.querySelector('.search');
let searchM = document.querySelector('.search-m');
let form = document.querySelector('.form');
let search_logo = document.querySelector('.search_logo');



//获取header的高度
let headerHeight = header.offsetHeight;
let bannerHeight = banner.offsetHeight;

//一个数组，放每个板块对应的截止高度
let elevatorArr = [];

//基础的高度，头部加上版心的高度
let base = headerHeight + bannerHeight;
for (let i = 0; i < items.length; i++) {
    base = base + items[i].offsetHeight + 30;
    elevatorArr.push(base);
}

function clearColor() {
    for (let i = 0; i < elevatorA.length; i++) {
        elevatorA[i].style.color = '';
    }
}

document.addEventListener('scroll', function () {
    //获取滚动条垂直方向滚了多少距离
    let top = document.documentElement.scrollTop || document.body.scrollTop;

    //当滚动距离大于头部和版心高度之和,将楼层的定位改为固定定位
    if (top > headerHeight + bannerHeight) {
        elevator.className = 'elevator elevator-fix';
        search.className = 'search  search-fix';
        searchM.style.height = '50px';
        form.style.top = '8px';
        search_logo.style.display = 'block';
    } else {
        elevator.className = 'elevator';
        search.className = 'search';
        searchM.style.height = '60px';
        form.style.top = '25px';
        search_logo.style.display = 'none';
    }

    //实现楼层滚动，文字变色的效果
    if (top < headerHeight + bannerHeight) {
        clearColor();
    } else if (top >= headerHeight + bannerHeight && top < elevatorArr[0]) {
        clearColor();
        elevatorA[0].style.color = 'red';
    } else if (top >= elevatorArr[0] && top < elevatorArr[1]) {
        clearColor();
        elevatorA[1].style.color = 'red';
    } else if (top >= elevatorArr[1] && top < elevatorArr[2]) {
        clearColor();
        elevatorA[2].style.color = 'red';
    } else if (top >= elevatorArr[2]) {
        clearColor();
        elevatorA[3].style.color = 'red';
    }
})
