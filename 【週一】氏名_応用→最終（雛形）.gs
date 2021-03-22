function ouyoWeekBotPost() {
  
  // 最初の設定でやること
  // 1行目→メンバー用の関数名に変更（例：tanakaBotPost）
  // 12行目→コピーしてきたWebhookURLに変更
  // 14行目→投稿したいch名に変更
  // 16行目→参照したいシート名に変更
  // 78、93行目→メンションつけたいメンバーIDに変更（ちゃんとこのような形になるように注意する 例 <@U010TR72L72> ）
  // 最後に「command + s」で保存しましょう！

  // WebhookURLを追加
  let postUrl = "https://hooks.slack.com/services/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";　
  // botを投入したいチャンネル名を追加
  let postChannel = "#hoge_ch"; 
  // 使用するシートを取得
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('応用→最終（雛形）'); 

  // 今日が何日かを計算
  let today = new Date();
  let day_count = today.getDate();

  // 今日の日付によって処理を変える
  if (day_count != 1) {
    postToSlack_();
  } else if (day_count == 1) {
    newMonthStart_();
    postToSlack_();
  } else {
    sendHttpPost_('不正な値が検出されました。管理者にご連絡ください。','目標達成bot',':perap');
  }

  // 残シフトのセルに数式を入れる為に、月の一番初めに行うメソッド
  function newMonthStart_() {
    // 各シフト残数を取得する関数をそれぞれの変数へ代入
    let shiftSetForm = "=IFERROR(VLOOKUP(A2,'管理用'!A24:D46,2, false), \"-\")"
    let shiftgaiSetForm = "=IFERROR(VLOOKUP(A2,'管理用'!A24:D46,4, false), \"-\")"
    // それぞれのセルに関数をセット
    sheet.getRange(3,2,1,1).setValue(shiftSetForm);
    sheet.getRange(3,4,1,1).setValue(shiftgaiSetForm);
  }

  // 通知botの作成
  function postToSlack_() {
    //それぞれの値を取得
    let name = sheet.getSheetValues(2, 1, 1, 1); 
    let last_shift_total = sheet.getSheetValues(3, 4, 1, 1);
    let last_shift = sheet.getSheetValues(3, 2, 1, 1);
    let last_shift_gai = sheet.getSheetValues(3, 3, 1, 1);
    let month_goal = sheet.getSheetValues(6, 4, 1, 1); 
    let month_now = sheet.getSheetValues(6, 3, 1, 1);
    let saishu_goal = sheet.getSheetValues(7, 4, 1, 1); 
    let saishu_now = sheet.getSheetValues(7, 3, 1, 1);
    var last_day_ave = sheet.getSheetValues(10, 2, 1, 1); 
    var last_saishu_ave = sheet.getSheetValues(10, 3, 1, 1); 
    let every_hour = sheet.getSheetValues(11, 2, 1, 1); 
    let average_time = sheet.getSheetValues(12, 2, 1, 1);
    let last_time = sheet.getSheetValues(6, 5, 1, 1);
    var comment_ave = sheet.getSheetValues(14, 2, 1, 1);
    var comment_ave = comment_ave[0][0].toFixed(2);
    let satisfaction = sheet.getSheetValues(15, 2, 1, 1);
    let lank_score_ave = sheet.getSheetValues(18, 2, 1, 3);
    let lank_every_ave = sheet.getSheetValues(19, 2, 1, 3);
    let lank_comment_ave = sheet.getSheetValues(20, 2, 1, 3);

    // 通話件数ランキングチェック
    if (month_now[0][0] == lank_score_ave[0][0]) {
      var lank_score_alert = "（全国１位）:tada:" ;
    } else if (month_now[0][0] == lank_score_ave[0][1]) {
      var lank_score_alert = "（全国２位）:tada:" ;
    } else if (month_now[0][0] == lank_score_ave[0][2]) {
      var lank_score_alert = "（全国３位）:tada:" ;
    } else if (month_now[0][0] == lank_score_ave[0][3]) {
      var lank_score_alert = "（全国４位）:tada:" ;
    } else if (month_now[0][0] == lank_score_ave[0][4]) {
      var lank_score_alert = "（全国５位）:tada:" ;
    } else {
      var lank_score_alert = "" 
    }

    // １時間あたり通話件数ランキングチェック
    if (every_hour[0][0] == lank_every_ave[0][0]) {
      var lank_every_alert = "（全国１位）:tada:" ;
    } else if (every_hour[0][0] == lank_every_ave[0][1]) {
      var lank_every_alert = "（全国２位）:tada:" ;
    } else if (every_hour[0][0] == lank_every_ave[0][2]) {
      var lank_every_alert = "（全国３位）:tada:" ;
    } else if (every_hour[0][0] == lank_every_ave[0][3]) {
      var lank_every_alert = "（全国４位）:tada:" ;
    } else if (every_hour[0][0] == lank_every_ave[0][4]) {
      var lank_every_alert = "（全国５位）:tada:" ;
    } else {
      var lank_every_alert = "" 
    }

    // コメント率ランキングチェック
    if (comment_ave[0][0] == lank_comment_ave[0][0]) {
      var lank_comment_alert = "（全国１位）:tada:" ;
    } else if (comment_ave[0][0] == lank_comment_ave[0][1]) {
      var lank_comment_alert = "（全国２位）:tada:" ;
    } else if (comment_ave[0][0] == lank_comment_ave[0][2]) {
      var lank_comment_alert = "（全国３位）:tada:" ;
    } else if (comment_ave[0][0] == lank_comment_ave[0][3]) {
      var lank_comment_alert = "（全国４位）:tada:" ;
    } else if (comment_ave[0][0] == lank_comment_ave[0][4]) {
      var lank_comment_alert = "（全国５位）:tada:" ;
    } else {
      var lank_comment_alert = "" 
    }


    // 目標達成したら「clear!」表示させる
    if (Math.sign(last_day_ave) == -1) {
      var last_day_ave = "clear!";
    } else {
      true
    };
    
    if (Math.sign(last_saishu_ave) == -1) {
      var last_saishu_ave = "clear!";
    } else {
      true
    };
    // シフト残数あり
    if (last_shift_total > 0) {
      sendHttpPost_('<@U010TR72L72>さん、こんにちは！週刊通知botです！\
                  \n現在の目標までの道のりです！頑張っていきましょう！ \
                  \n\n *' + name +'* さん【残シフト（通話） *' + last_shift + '* 日, 残シフト外 *' + last_shift_gai + '* 日】 \
                  \n実働時間（通話）： 残り *' + last_time + '* 時間\
                  \n月次目標（通話）： *' + month_now + '* / *' + month_goal + '* 件 ' + lank_score_alert + ' \
                  \n最終課題目標　　： *' + saishu_now + '* / *' + saishu_goal + '* 件 \
                  \n感動コメント率　： *' + comment_ave + '* ％ ' + lank_comment_alert + ' \
                  \n満足度（合計）　： *' + satisfaction + '* ％ \
                  \n\n通話１時間あたり： *' + every_hour + '* 件 ' + lank_every_alert + ' \
                  \n通話平均時間　　： *' + average_time + '* 分 \
                  \n1日 *' + last_day_ave + '* 件（最終： *' + last_saishu_ave + '* 件）以上取ればKPI達成見込み '
                  ,'目標達成bot',':tuuti_bot:');

    // シフト残数なし
    } else if (last_shift_total == 0 ) {
      sendHttpPost_('<@U010TR72L72>さん、こんにちは！週刊通知botです！\
                      \n今月のシフトはもうございません。お疲れさまでした！\
                      \n\n【最終結果】\
                      \n\n *' + name +'* さん \
                      \n月次目標（通話）： *' + month_now + '* / *' + month_goal + '* 件 ' + lank_score_alert + '\
                      \n最終課題目標　　： *' + saishu_now + '* / *' + saishu_goal + '* 件 \
                      \n感動コメント率　： *' + comment_ave + '* ％ ' + lank_comment_alert + ' \
                      \n満足度（合計）　： *' + satisfaction + '* ％ \
                      \n\n通話１時間あたり： *' + every_hour + '* 件 ' + lank_every_alert + ' \
                      \n通話平均時間　　： *' + average_time + '* 分 \
                      \nまた来月に向けて、頑張りましょう〜！','目標達成bot',':tuuti_bot:');
      sheet.getRange(3,4,1,1).setValue('終わり');

    // シフト残数なし→最終通達後は何もしない
    } else if (last_shift_total == '終わり' ){
      return
    // シフト残数に異常値が検出された時のエラー文
    } else {
      sendHttpPost_('不正な値が検出されました。管理者にご連絡ください。','目標達成bot',':perap');
    };
  };

  // ポストするための記述
  function sendHttpPost_(message, username, icon) {
    let jsonData = {
      "channel" : postChannel,
      "username" : username,
      "icon_emoji": icon,
      "text" : message
    };
    let payload = JSON.stringify(jsonData);
    let options = {
      "method" : "post",
      "contentType" : "application/json",
      "payload" : payload
    };
    UrlFetchApp.fetch(postUrl, options);
  }
}