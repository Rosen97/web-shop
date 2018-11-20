//解决遮罩层滚动穿透问题，分别在遮罩层弹出后和关闭前调用
const ModalHelper = ((bodyCls) => {
  let scrollTop;
  return {
    afterOpen: function () {
      scrollTop = document.scrollingElement.scrollTop;
      document.body.classList.add(bodyCls);
      document.body.style.top = -scrollTop + 'px';
    },
    beforeClose: function () {
      document.body.classList.remove(bodyCls);
      // scrollTop lost after set position:fixed, restore it back.
      document.scrollingElement.scrollTop = scrollTop;
    }
  };
})('dialog-open');
