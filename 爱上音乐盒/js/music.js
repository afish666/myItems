var index = 0;
var li = $(".banner ul li");
var img = $(".music .m_img img");
var text = $(".music .m_text");
var prev = $(".music .m_btn .m_prev");
var play = $(".music .m_btn .m_play");
var next = $(".music .m_btn .m_next");
var mp3 = $(".music .m_mp3");
var flag = false;  //false表示暂停
var close = true; //false表示播放器隐藏


// 点击图片获取序号
li.click(function () {
    // console.log($(this).index());
    index = $(this).index();
    show();
});

// 功能展现的函数
function show() {
    //更换背景图
    change_bg(index + 1);
    change_img_text(index + 1);
    change_btn_title();
    img_rotate();
    play_mp3();
}


function change_bg(idx) {
    $("body").css({
        "background": "url(img/" + idx + "_bg.jpg) no-repeat",
        "background-size": "cover"
    });
}

function change_img_text(idx) {
    img.attr("src", "img/" + idx + "_bg.jpg");
    text.html(li.eq(index).attr("title"));
}

function change_btn_title() {
    play.removeClass("m_play");
    play.addClass("m_pause");
    play.attr("title", "暂停");
}

function img_rotate() {
    li.children().removeClass("img_rotate");
    li.eq(index).children().addClass("img_rotate");

}

function play_mp3() {
    mp3.attr("src", li.eq(index).attr("datasrc"));
    mp3.get(0).play();
    flag = true;
}

play.click(function () {
    if (flag) {
        mp3.get(0).pause();
        li.eq(index).children().removeClass("img_rotate");
        play.removeClass("m_pause").addClass("m_play").attr("title", "播放");
        flag = false;
    } else {
        mp3.get(0).play();
        li.eq(index).children().addClass("img_rotate");
        play.removeClass("m_play").addClass("m_pause").attr("title", "暂停");
        flag = true;
        change_bg(index + 1);
    }
});

prev.click(function () {
    index--;
    if (0 > index) {
        index = li.length - 1;
    }
    show();
})

next.click(function () {
    index++;
    if (li.length - 1 < index) {
        index = 0;
    }
    show();
});

$(".m_close").click(function () {
    if (close) {
        $(this).addClass("m_open");
        $(".music").animate({ "left": "-472px" }, 800);
        close = false;
    } else {
        $(this).removeClass("m_open");
        $(".music").animate({ "left": "0px" }, 800);
        close = true;
    }
})