// 過ぎたシフト日は空白にして、残りシフト数を計算するメソッド。通知botを送信し終えて最後の発火させる。
function sellClear() {
 let today = new Date();
 let day_count = today.getDate();
 let manage_sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('管理用'); 
 manage_sheet.getRange(13,2,14,day_count).clearContent();
}