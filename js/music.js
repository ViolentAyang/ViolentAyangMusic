/*
分析：
1.获取li的index()
2.更换背景图片
3.更换播放器图片、文本
4.更换播放器按钮及title为暂停
5.图片旋转
6.播放歌曲
 其他：
 1.暂停/播放
 2.上一首/下一首
 3.播放器可以显示和隐藏
*/

//准备工作，收集数据
var index = 0;//li初始索引
var li = $(".banner ul li");//获取所有li元素
var img = $(".music .m_img img");//获取播放器img元素
var text = $(".music .m_text");//获取播放器m_text元素
var prev = $(".music .m_btn .m_prev");//获取播放器上一首a元素按钮
var play = $(".music .m_btn .m_play");//获取播放器暂停/播放a元素按钮
var next = $(".music .m_btn .m_next");//获取播放器1下一首a元素按钮
var mp3 = $(".music .m_mp3");//媒体元素
var flag = false;//歌曲是否播放的标记 true播放 false暂停
var close = true;//播放器是否显示 true显示 false不显示

/*
获取点击的li索引
*/
li.click(function(){
    //console.log($(this).index());
    index = $(this).index();//获取当前点击的li索引
    //播放歌曲
    show();
});

/**
 封装一个函数，方便上一首下一首调用
 */

function show(){
    //更换背景图片，背景要加一，索引从0开始，图片从1开始
    change_bg(index+1);
    //更换播放器图片文本
    change_img_text(index+1);
    //更换播放器按钮及title为暂停
    change_btn_title();
    //图片旋转
    img_rotate();
    //播放歌曲
    play_mp3();

}
//更换背景
function change_bg(idx){
    $("body").css({
        "background": "url(img/" + idx + "_bg.jpg) no-repeat",
        "background-size": "cover"
    });
}
//更换播放器图片、文本
function change_img_text(idx){
    img.attr("src","img/" + idx + ".jpg");//更换播放器图片
    text.html(li.eq(index).attr("title"));//获取li的title属性然后替换文本
}
//更换播放按钮及title为暂停
function change_btn_title(){
    play.removeClass("m_play");//移除原有的播放样式
    play.addClass("m_pause");//添加新的暂停样式
    play.attr("title","暂停");//更换title
}
//图片旋转
function img_rotate(){
    //移除所有的img图片旋转样式
    li.children().removeClass("img_rotate");
    //给当前点击的li添加样式
    li.eq(index).children().addClass("img_rotate");
}
//播放歌曲
function play_mp3(){
    //获取我们选中的li的datasrc属性
    mp3.attr("src",li.eq(index).attr("datasrc"));
    mp3.get(0).play();//播放歌曲
    //修改歌曲播放的标记 true播放 false暂停
    flag = true;
}
//暂停或者歌曲
play.click(function(){
    /*如果歌曲播放
    1.暂停歌曲
    2.图片停止旋转
    3.暂停按钮更换为播放
    4.title更换为播放
    */
    if(flag){
        mp3.get(0).pause();//暂停歌曲
        li.eq(index).children().removeClass("img_rotate");//移除图片旋转
        play.removeClass("m_pause").addClass("m_play").attr("title","播放");//暂停按钮更换为播放，title变换为播放
        flag = false;
    }else{
    /*如果歌曲暂停
    1.播放歌曲
    2.图片旋转
    3.播放按钮更换为暂停
    4.title更换为暂停
    */
        mp3.get(0).play();//播放歌曲
        li.eq(index).children().addClass("img_rotate");//图片旋转
        play.removeClass("m_play").addClass("m_pause").attr("title","暂停");//播放按钮更换为暂停，title变换为暂停
        flag = true;
        change_bg(index+1);//第一次进去时候切换背景
    }
});
//上一首
prev.click(function(){
    index--;
    if(0>index){
        index = li.length - 1;
    }
    //播放歌曲
    show();
});
//下一首
next.click(function(){
    index++;
    if(index>li.length-1){
        index = 0;
    }
    show();
})
//播放器隐藏与显示
$(".m_close").click(function(){
    //如果显示则隐藏，添加样式
    if(close){
        $(this).addClass("m_open");
        //添加向左移动样式，1秒完成
        $(".music").animate({"left":"-475px"},800);
        close = false;
    }else{
        //如果隐藏则显示，移除样式
        $(this).removeClass("m_open");
        //恢复初始值
        $(".music").animate({"left":"0px"},800);
        close = true;
    }
})