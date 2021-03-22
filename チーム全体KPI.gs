function teamTotalWeekBotPost() {
  
  // 最初の設定でやること
  // 1行目→メンバー用の関数名に変更（例：tanakaBotPost）
  // 12行目→コピーしてきたWebhookURLに変更
  // 14行目→投稿したいch名に変更
  // 16行目→参照したいシート名に変更
  // 78、93行目→メンションつけたいメンバーIDに変更（ちゃんとこのような形になるように注意する 例 <@U010TR72L72> ）UUFBB8C77
  // 最後に「command + s」で保存しましょう！

  // WebhookURLを追加
  let postUrl = "https://hooks.slack.com/services/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";　

  // botを投入したいチャンネル名を追加
  let postChannel = "#hoge_ch"; 
  // 使用するシートを取得
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('チーム全体'); 

  // 今日が何日かを計算
  let today = new Date();
  var weekdays = [ "日", "月", "火", "水", "木", "金", "土" ];
  var todayMonth = today.getMonth() + 1;

  var todayWeek = weekdays[today.getDay()];
  var todayWeekNumber = Math.floor((today.getDate() - today.getDay() + 12 ) / 7);

  // 今日の日付によって処理を変える
  if (todayWeek == "日") {
    postToSlack_();
  }

  // 通知botの作成
  function postToSlack_() {
    //それぞれの値を取得
    let team_name = sheet.getSheetValues(2,1,1,1);
    let team_leader_id = sheet.getSheetValues(2,2,1,1);
    let ave_satisfaction = sheet.getSheetValues(4, 2, 1, 1); 
    let ave_every_score = sheet.getSheetValues(4, 3, 1, 1);
    let ave_every_score_review = sheet.getSheetValues(4, 4, 1, 1);
    let ave_comments = sheet.getSheetValues(4, 5, 1, 1);
    let ave_every_hour = sheet.getSheetValues(4, 6, 1, 1);

    sendHttpPost_('<@' + team_leader_id + '>さん、こんにちは！チーム全体KPI平均通知botです！\
                \n*' + team_name + '*\
                \n*' + todayMonth + '* 月 第 *' + todayWeekNumber +'* 週目\
                \n満足度　　　　　　： *' + ave_satisfaction + '* %\
                \n時間対応数（通話）： *' + ave_every_score + '* 件\
                \n時間対応数（レビ）： *' + ave_every_score_review + '* 件\
                \n感動コメント率　　： *' + ave_comments + '* %\
                \n対応時間平均　　　： *' + ave_every_hour + '* 分\
                \n','目標達成bot',':tuuti_bot:');

    
    sheet.getRange(4 + todayWeekNumber,2,1,1).setValue(ave_satisfaction);
    sheet.getRange(4 + todayWeekNumber,3,1,1).setValue(ave_every_score);
    sheet.getRange(4 + todayWeekNumber,4,1,1).setValue(ave_every_score_review);
    sheet.getRange(4 + todayWeekNumber,5,1,1).setValue(ave_comments);
    sheet.getRange(4 + todayWeekNumber,6,1,1).setValue(ave_every_hour);

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
