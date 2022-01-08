/**
 * Created by 110 on 2018/8/17.
 */

var common = (function () {
    var top_id = []//[50009, 50001, 50003, 50031, 50030, 50026, 50019, 50016, 50012, 50023, 50007, 50008, 50027, 50004, 50013, 50029];//top16 id

    var top_snh = [
        {
            sid: 50000,
            noun: 66
        }
    ];//总团的排名
    //页面之间的参数传递
    function getPath(data){
        var result;
        var path = location.search.substring(1).split("&");
        for(var i = 0;i < path.length;i++){
            var keyVal = path[i].split("=");
            if(keyVal[0] == data){
                result = keyVal[1];
            }
        }
        return result;
    }
    //新闻列表的时间格式化
    function formateNewsDate(newsDate) {
        var reg= /\d{4}-\d{2}-\d{2}/;
        var date = reg.exec(newsDate)[0];
        return date;
    }
    //格式化unix时间
    function formatTime(time) {
        var unixTimestamp = new Date((time) * 1000);
        var Y = unixTimestamp.getFullYear();
        var M = ((unixTimestamp.getMonth() + 1) > 9 ? (unixTimestamp.getMonth() + 1) : '0' + (unixTimestamp.getMonth() + 1));
        var D = (unixTimestamp.getDate() > 9 ? unixTimestamp.getDate() : '0' + unixTimestamp.getDate());
        var h = unixTimestamp.getHours();
        var m = unixTimestamp.getMinutes();
        return Y + '-' + M + '-' + D + " "+h+":"+(m < 10 ? "0"+ 0 : m);
    }
    //新闻列表li的字符串拼接
    function liStr(data){
        var listData = data.rows;
        var listStr = "",len = listData.length;
        if (len > 0) {
            for (var i = 0; i < len; i++) {
                var curNews = listData[i];
                listStr += '<li>';
                listStr+= '<span class="news-date">'+common.formateNewsDate(curNews.show_time)+'</span>';
                if(curNews.cid == 1){
                    listStr += '<span class="news-type" style="border-color: #cecefd;color:#cecefd">资讯</span>';
                }else if(curNews.cid == 2){
                    listStr += '<span class="news-type" style="border-color: #be7b41;color:#be7b41">公告</span>';
                }else if(curNews.cid == 3){
                    listStr += '<span class="news-type" style="border-color: #f97eb6;color:#f97eb6">演出</span>';
                }else if(curNews.cid == 4){
                    listStr += '<span class="news-type" style="border-color: #f6bc9c;color:#f6bc9c">握手</span>';
                }else if(curNews.cid == 5){
                    listStr += '<span class="news-type" style="border-color: #88d7ec;color:#88d7ec">唱片</span>';
                }
                listStr += '<a href="../newsdetails.html?id='+curNews.id+'" target="_blank" class="news-tit">'+curNews.title+'</a>';
                listStr += '</li>';
            }
        }
        return listStr;
    }
    //新闻分类页面的ajax,curBox->新闻列表容器,offset->偏移量,cid->新闻分类参数
    function newsList(curBox, offset, cid){
        $.ajax({
            url: "https://h5.48.cn/resource/jsonp/news.php?num"+Math.random(),
            type: 'get',
            dataType: 'jsonp',
            data: {
                gid: 50,
                limit: 20,
                offset: offset,
                cid: cid
            },
            jsonp: 'callback',
            success: function (data) {
                curBox.html(common.liStr(data));
            },
            error: function () {
                return false;
            }
        });

    }
    return {
        top_id:top_id,
        top_snh:top_snh,
        getPath:getPath,
        formateNewsDate:formateNewsDate,
        formatTime:formatTime,
        liStr:liStr,
        newsList:newsList
    }
})();