export const cmbCategories =[
  "",
  "ギター",
  "ベース",
  "ドラム",
  "エフェクター",
  "アンプ",
  "改造・パーツ総合",
  "シンセ・DTM",
  "小物・アクセサリー総合",
  "宅録・スタジオ環境"
];

export const categories =[
  "🎸 ギター",
  "🎸 ベース",
  "🥁 ドラム",
  "🎚 エフェクター",
  "🔊 アンプ",
  "🔧 改造・パーツ総合",
  "🎹 シンセ・DTM",
  "🧰 小物・アクセサリー総合",
  "🏠 宅録・スタジオ環境"
]
export const baseUrl = "http://localhost:3000";

//テスト用のスレデータ
export const filteredThreads =[
  {id:"1",
    title:"スレタイのテスト",
    summary:"ここは概要欄です。ちゃんと表示されるかの確認用",
    last:"2025-07-22 16:23",
    resNum:Math.floor(Math.random()*1000)
  },
  {id:"2",
    title:"スレタイのテスト2",
    summary:"ここは概要欄です2。ちゃんと表示されるかの確認用",
    last:"2025-07-25 16:34",
    resNum:Math.floor(Math.random()*1000)
  },
  {id:"3",
    title:"スレタイのテスト3",
    summary:"ここは概要欄です3。ちゃんと表示されるかの確認用",
    last:"2025-07-25 16:00",
    resNum:Math.floor(Math.random()*1000)
  },
  {id:"4",
    title:"スレタイのテスト4",
    summary:"ここは概要欄です4。ちゃんと表示されるかの確認用",
    last:"2025-07-25 16:14",
    resNum:Math.floor(Math.random()*1000)
  },
  {id:"5",
    title:"スレタイのテスト5",
    summary:"ここは概要欄です5。ちゃんと表示されるかの確認用",
    last:"2025-07-25 16:20",
    resNum:Math.floor(Math.random()*1000)
  },
  {id:"6",
    title:"スレタイのテスト6",
    summary:"ここは概要欄です6。ちゃんと表示されるかの確認用",
    last:"2025-07-25 16:15",
    resNum:Math.floor(Math.random()*1000)
  },
  {id:"7",
    title:"スレタイのテスト7",
    summary:"ここは概要欄です7。ちゃんと表示されるかの確認用",
    last:"2025-07-25 16:52",
    resNum:Math.floor(Math.random()*1000)
  },
  {id:"8",
    title:"スレタイのテスト8",
    summary:"ここは概要欄です8。ちゃんと表示されるかの確認用",
    last:"2025-07-25 16:32",
    resNum:Math.floor(Math.random()*1000)
  },
  {id:"9",
    title:"スレタイのテスト9",
    summary:"ここは概要欄です9。ちゃんと表示されるかの確認用",
    last:"2025-07-25 16:03",
    resNum:Math.floor(Math.random()*1000)
  },
  {id:"10",
    title:"スレタイのテスト10",
    summary:"ここは概要欄です10。ちゃんと表示されるかの確認用",
    last:"2025-07-25 16:20",
    resNum:Math.floor(Math.random()*1000)
  },
]
//テスト用のレスデータ
//idとかつけて追えた方が良いと思う
export const responses =[
  {
    responseId:1,
    threadId:1,
    autherId:987654321,
    postDay:'2025-08-04 13:00',
    auther:'testman1',
    main:'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.Nunc viverra imperdiet enim. Fusce est. Vivamus a tellus.Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin pharetra nonummy pede. Mauris et orci.Aenean nec lorem. In porttitor. Donec laoreet nonummy augue.Suspendisse dui purus, scelerisque at, vulputate vitae, pretium mattis, nunc. Mauris eget neque at sem venenatis eleifend. Ut nonummy.'
  },
  {
    responseId:123,
    threadId:1,
    autherId:987654327,
    postDay:'2025-08-04 15:00',
    auther:'testman2',
    main:'ロレムイプサムとか使ってるジジイまだいたんだ。'
  },
  {
    responseId:254,
    threadId:3,
    autherId:987654324,
    postDay:'2025-08-04 13:00',
    auther:'testwoman21',
    main:'初心者歓迎！'
  },
  {
    responseId:345,
    threadId:1,
    autherId:987654326,
    postDay:'2025-08-04 13:00',
    auther:'asdfqewr',
    main:'うぃすう'
  },
  {
    responseId:786,
    threadId:2,
    autherId:987654328,
    postDay:'2025-08-04 13:00',
    auther:'nenennsa',
    main:'waoon'
  },
]