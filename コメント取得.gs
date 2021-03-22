function firstCheck() {
  var check = Browser.msgBox("セル内のコメントを取得します。", "続行しますか？", Browser.Buttons.OK_CANCEL);
  if (check == 'ok') {
    commentGet_();
    Browser.msgBox("完了しました。");
  }
  if (check == 'cancel') {
    Browser.msgBox("処理はキャンセルされました。");
  }
}

function commentGet_() {
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('管理用');
  let shifts = sheet.getRange("B12:AF18");
  let all_comments = shifts.getNotes();
  
  all_comments.forEach(function(comments, index) {
    var result = comments.filter(shift => shift.match(/-/));
    if (result.length != 0) {
      var first_sel = sheet.getRange("B" + (13 + index));
      comments.forEach(function (comment, index) {
        first_sel.offset(0, index).setValue(comment);
      })
    }
  });
}


