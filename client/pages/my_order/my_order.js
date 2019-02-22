Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentData: 0,
    scoreput: true,
    book: [],
    note: [],
    bookhasList: false,          // 列表是否有数据
    notehasList: false,          // 列表是否有数据
  },
  //获取当前滑块的index
  bindchange: function (e) {
    const that = this;
    that.setData({
      currentData: e.detail.current
    })
  },
  //点击切换，滑块index赋值
  checkCurrent: function (e) {
    const that = this;

    if (that.data.currentData === e.target.dataset.current) {
      return false;
    } else {

      that.setData({
        currentData: e.target.dataset.current
      })
    }
  },

  scoreinput: function () {

    this.setData({

      scoreput: !this.data.scoreput

    })

  },

  //取消按钮

  scorecancel: function () {

    this.setData({

      scoreput: true

    })

  },

  //确认

  scoreconfirm: function () {

    this.setData({

      scoreput: true

    })

  },

  onShow: function () {
    this.setData({
      book: [
        { id: 1, title: '书名', image: '../../image/1.jpg', state: '已送达，在中山北路校区第x提货点' },
        { id: 2, title: '书名', image: '../../image/2.jpg', state: '已送达，在中山北路校区第x提货点' },
        { id: 4, title: '书名', image: '../../image/3.jpg', state: '已送达，在中山北路校区第x提货点' },
        { id: 3, title: '书名', image: '../../image/4.jpg', state: '已送达，在中山北路校区第x提货点' }
      ],
      note: [
        { id: 1, title: '资料名', image: '../../image/1.jpg', state: '已送达，在中山北路校区第x提货点' },
        { id: 2, title: '资料名', image: '../../image/2.jpg', state: '已送达，在中山北路校区第x提货点' },
        { id: 4, title: '资料名', image: '../../image/3.jpg', state: '已送达，在中山北路校区第x提货点' },
        { id: 3, title: '资料名', image: '../../image/4.jpg', state: '已送达，在中山北路校区第x提货点' }
      ]
    });
    this.initialize();
  },

  initialize() {
    let book = this.data.book;
    let note = this.data.note;
    let hasbook = false, hasnote = false;
    let i = 0, j = 0;
    for (i = 0; i < book.length; i++) { }
    for (j = 0; j < note.length; j++) { }

    if (i != 0) hasbook = true;
    if (j != 0) hasnote = true;

    this.setData({                                // 最后赋值到data中渲染到页面
      bookhasList: hasbook,
      notehasList: hasnote,
      book: book,
      note: note
    });
  }
})