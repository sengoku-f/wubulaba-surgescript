/*
Bilibili简化去广告

[Rule]
URL-REGEX,https://app.bilibili.com/x/v2/(splash|search/(defaultword|square)),REJECT-TINYGIF
URL-REGEX,https://api.bilibili.com/x/v2/dm/advert,REJECT-TINYGIF

[MITM]
hostname = app.bilibili.com, api.bilibili.com, api.live.bilibili.com

[Script]
http-response ^https?:\/\/ap(i|p).(live.)?bilibili.com\/x(live)?\/(resource\/show\/tab|v2\/(reply\/main|view\/material|account\/(mine|teenagers\/status)|view|feed\/index|show\/popular\/index|rank)|app-room/v1/index/getInfoByRoom)\?access_key requires-body=1,max-size=0,script-path=https://raw.githubusercontent.com/wubulaba/surgescript/master/Script/Bilibili.js,script-update-interval=0
*/

const path1 = "/x/resource/show/tab?access_key";
const path2 = "/x/v2/feed/index?access_key";
const path3 = "/x/v2/account/mine?access_key";
const path4 = "/x/v2/view?access_key";
const path5 = "/x/v2/view/material?access_key";
const path6 = "/x/v2/reply/main?access_key";
const path7 = "/x/v2/rank?access_key";
const path8 = "/x/v2/show/popular/index";
const path9 = "/xlive/app-room/v1/index/getInfoByRoom?access_key";
const path10 = "/x/v2/account/teenagers/status?access_key";
const path11 = "/x/v2/account/mine/ipad?access_key";

let url = $request.url;
let body = JSON.parse($response.body);

if (url.indexOf(path1) != -1) {
  body['data']['tab'] = [{
      "id": 39,
      "name": "直播",
      "uri": "bilibili://live/home",
      "tab_id": "直播tab",
      "pos": 1
    },
    {
      "id": 40,
      "name": "推荐",
      "uri": "bilibili://pegasus/promo",
      "tab_id": "推荐tab",
      "pos": 2,
      "default_selected": 1
    },
    {
      "id": 41,
      "name": "热门",
      "uri": "bilibili://pegasus/hottopic",
      "tab_id": "热门tab",
      "pos": 3
    },
    {
      "id": 42,
      "name": "追番",
      "uri": "bilibili://pgc/home",
      "tab_id": "追番Tab",
      "pos": 4
    },
    {
      "id": 151,
      "name": "影视",
      "uri": "bilibili://pgc/cinema-tab",
      "tab_id": "影视tab",
      "pos": 5,
    },
  ]
  body['data']['top'] = [{
    "id": 176,
    "icon": "http://i0.hdslb.com/bfs/archive/d43047538e72c9ed8fd8e4e34415fbe3a4f632cb.png",
    "name": "消息",
    "uri": "bilibili://link/im_home",
    "tab_id": "消息Top",
    "pos": 1
  }]
  body['data']['bottom'] = [{
      "id": 177,
      "icon": "http://i0.hdslb.com/bfs/archive/63d7ee88d471786c1af45af86e8cb7f607edf91b.png",
      "icon_selected": "http://i0.hdslb.com/bfs/archive/e5106aa688dc729e7f0eafcbb80317feb54a43bd.png",
      "name": "首页",
      "uri": "bilibili://main/home/",
      "tab_id": "首页Bottom",
      "pos": 1
    },
    {
      "id": 178,
      "icon": "http://i0.hdslb.com/bfs/archive/9c453a54eb83f5140cd098bf2e8ed8a599edc7fe.png",
      "icon_selected": "http://i0.hdslb.com/bfs/archive/79d29e6ac3b6e52652881b050e63988e2038130f.png",
      "name": "频道",
      "uri": "bilibili://pegasus/channel/",
      "tab_id": "频道Bottom",
      "pos": 2
    },
    {
      "id": 179,
      "icon": "http://i0.hdslb.com/bfs/archive/86dfbe5fa32f11a8588b9ae0fccb77d3c27cedf6.png",
      "icon_selected": "http://i0.hdslb.com/bfs/archive/25b658e1f6b6da57eecba328556101dbdcb4b53f.png",
      "name": "动态",
      "uri": "bilibili://following/home/",
      "tab_id": "动态Bottom",
      "pos": 3
    },
    {
      "id": 181,
      "icon": "http://i0.hdslb.com/bfs/archive/4b0b2c49ffeb4f0c2e6a4cceebeef0aab1c53fe1.png",
      "icon_selected": "http://i0.hdslb.com/bfs/archive/a54a8009116cb896e64ef14dcf50e5cade401e00.png",
      "name": "我的",
      "uri": "bilibili://user_center/",
      "tab_id": "我的Bottom",
      "pos": 4
    }
  ]
}

if (url.indexOf(path2) != -1) {
  let blacklist = [];
  body['data']['items'].forEach((element, index) => {
    if (element.hasOwnProperty('ad_info') || element.hasOwnProperty('banner_item') || element['card_type'] != 'small_cover_v2' || blacklist.includes(element['args']['up_name'])) {
      body['data']['items'].splice(index, 1);
    }
  })
}

if (url.indexOf(path3) != -1) {
  body['data']['sections'] = [{
    "title": "个人中心",
    "items": [{
       "title": "历史记录",
       "uri": "bilibili://user_center/history"
      },
      {
        "title": "我的收藏",
        "uri": "bilibili://user_center/favourite"
      },
      {
        "title": "稍后再看",
        "uri": "bilibili://user_center/watch_later"
      },
      {
        "title": "离线缓存",
        "uri": "bilibili://user_center/download"
      }
    ]
  }]
}

if (url.indexOf(path4) != -1) {
  if (body['data'].hasOwnProperty('relates')) {
    body['data']['relates'].forEach((element, index) => {
      if (element.hasOwnProperty('is_ad') || !element.hasOwnProperty('aid')) {
        body['data']['relates'].splice(index, 1);
      }
    })
    delete body['data']['cms'];
  }
}

if (url.indexOf(path5) != -1) {
  body.data = null;
}

if (url.indexOf(path6) != -1) {
  if (body.hasOwnProperty('data')) {
    delete body['data']['notice'];
  }
}

if (url.indexOf(path7) != -1) {
  //Customize blacklist
  let blacklist = [];
  body['data'].forEach((element, index) => {
    if (blacklist.includes(element['name'])) {
      body['data'].splice(index, 1);
    }
  })
}

if (url.indexOf(path8) != -1) {
  //Customize blacklist
  let blacklist = [];
  body['data'].forEach((element, index) => {
    if (blacklist.includes(element['right_desc_1']) || element["card_type"] !== "small_cover_v5") {
      body['data'].splice(index, 1);
    }
  })
}

if (url.indexOf(path9) != -1) {
  body['data']['activity_banner_info'] = null;
}

if (url.indexOf(path10) != -1) {
  body['data']['teenagers_status'] = 0;
}

if (url.indexOf(path11) != -1) {
  body['data']['ipad_upper_sections'] = [{
      "title": "投稿",
      "uri": "/uper/user_center/add_archive"
    },
    {
      "title": "创作中心",
      "uri": "/uper/homevc"
    },
    {
      "title": "稿件管理",
      "uri": "/uper/user_center/archive_list"
    }
  ];
  body['data']['ipad_sections'] = [{
      "title": "历史记录",
      "uri": "bilibili://user_center/history"
    },
    {
      "title": "我的收藏",
      "uri": "bilibili://user_center/favourite"
    },
    {
      "title": "稍后再看",
      "uri": "bilibili://user_center/watch_later"
    },
    {
      "title": "我的消息",
      "uri": "bilibili://link/im_home"
    },
    {
      "title": "设置",
      "uri": "bilibili://user_center/setting"
    }
  ]
}

$done({
  body: JSON.stringify(body)
});
