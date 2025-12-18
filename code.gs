/**
 * 이 코드는 Code.gs 파일에 붙여넣으세요.
 */

// 1. 접속 시 HTML 화면(index.html)을 보여주는 함수
function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('index')
      .setTitle('오늘의 배움 노트') // 브라우저 탭 제목 설정
      .addMetaTag('viewport', 'width=device-width, initial-scale=1'); // 모바일 화면 최적화
}

// 2. HTML 화면에서 데이터를 받아 시트에 저장하는 함수
function processForm(formObject) {
  var url = SpreadsheetApp.getActiveSpreadsheet().getUrl();
  var ss = SpreadsheetApp.openByUrl(url);
  var ws = ss.getActiveSheet();

  // 데이터 저장 (시간, 학번, 이름, 생각)
  ws.appendRow([
    new Date(),
    formObject.studentId, // HTML의 name="studentId"
    formObject.name,      // HTML의 name="name"
    formObject.thoughts   // HTML의 name="thoughts"
  ]);

  return "Success"; // 성공 신호를 HTML로 다시 보냄
}