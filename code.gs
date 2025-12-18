/**
 * 이 코드는 Code.gs 파일에 붙여넣으세요.
 * GitHub Pages 등 외부 웹사이트에서 데이터를 받을 수 있도록 API 형태로 변경된 코드입니다.
 */

// 1. 브라우저 주소창에 URL을 입력했을 때 (GET 요청) - 서버 상태 확인용
function doGet(e) {
  return ContentService.createTextOutput("✅ 서버가 정상 작동 중입니다! GitHub Pages에서 데이터를 보낼 수 있습니다.");
}

// 2. 외부(GitHub 등)에서 데이터를 보냈을 때 (POST 요청) - 데이터 저장
function doPost(e) {
  // 현재 활성화된 시트 가져오기
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // 데이터 추출 준비
  var studentId = "";
  var name = "";
  var thoughts = "";

  try {
    // 전송 방식에 따라 데이터 파싱 (FormData 또는 JSON)
    if (e.parameter.studentId) {
      // 일반 폼 데이터 (application/x-www-form-urlencoded)
      studentId = e.parameter.studentId;
      name = e.parameter.name;
      thoughts = e.parameter.thoughts;
    } else if (e.postData) {
      // JSON 데이터 (application/json)
      var data = JSON.parse(e.postData.contents);
      studentId = data.studentId;
      name = data.name;
      thoughts = data.thoughts;
    }
  } catch (err) {
    // 에러 발생 시 로그 남기기
    console.error(err);
    return ContentService.createTextOutput(JSON.stringify({result: "error", error: err.message}))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  // 시트에 저장 (시간, 학번, 이름, 생각)
  sheet.appendRow([new Date(), studentId, name, thoughts]);
  
  // 성공 메시지 반환 (CORS 문제 방지를 위해 JSON 문자열 반환)
  var output = JSON.stringify({
    result: "success",
    message: "Data saved successfully"
  });

  return ContentService.createTextOutput(output)
    .setMimeType(ContentService.MimeType.JSON);
}