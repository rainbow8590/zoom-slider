# 遮罩层轮播图
    实现效果：
    1.鼠标经过图片改变图片的透明度
    2.点击图片，弹出遮罩层
    3.点击遮罩层左右箭头，实现轮播；
    4.点击遮罩层图片以外的部分，关闭遮罩层

    使用方法：
    html:
    <div id="wrap">
    </div> 

    css:
        *{
            margin: 0;
            padding: 0;
        }
        img{
            border: none;
            display: block;
            float: left;
        }
        #wrap{
            width: 800px;
            height: 400px;
            background: #000;
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            margin: auto;
        }
        #wrap img.smallImg{
            float: left;
            display: block;
            opacity: 0.5;
            filter: alpha(opacity=50);
        }
        #wrap img.cur{
            opacity: 1;
            filter: alpha(opacity=100);
        }
        #wrap img.current{
            opacity: 1;
            filter: alpha(opacity=100);
        }

    js：
    jump({
        //所有图片的最外层容器的ID
        wrapId:'wrap',  
        //显示图片的最外层容器的ID
        itemId:'item',
        //遮罩层的最外层容器的ID
        zoomId:'zoom',
        //遮罩层图片的宽度
        width: 1000,
        //遮罩层图片的高度
        height: 420,
        //打开页面显示的小图片
        imgsArr:['images/1.jpg','images/2.jpg','images/3.jpg','images/4.jpg','images/5.jpg','images/6.jpg'],
        //遮罩层的大图片
        bigImgsArr:['images/-1.jpg','images/-2.jpg','images/-3.jpg','images/-4.jpg','images/-5.jpg','images/-6.jpg']
    })