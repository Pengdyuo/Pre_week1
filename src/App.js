// App.js
import { Console } from "@woowacourse/mission-utils";

class App {
  async run() {
    try {
      const input = await Console.readLineAsync("덧셈할 문자열을 입력해 주세요: ");
      const result = this.calculateSum(input);
      this.printResult(result);
    } catch (error) {
      this.printError(error.message);
    }
  }

  calculateSum(input) {
    let delimiters = /[,:]/; // 기본 구분자: 쉼표(,)와 콜론(:)
    let numbersString = input;

    // 커스텀 구분자 추출
    if (numbersString.startsWith("//")) {
      const customDelimiterMatch = numbersString.split("\n");
      if (customDelimiterMatch.length < 2) {
        throw new Error("[ERROR] 커스텀할 문자와 숫자를 입력해야 합니다.");
      }
      delimiters = new RegExp(`[${customDelimiterMatch[0][2]}]`);
      numbersString = customDelimiterMatch[1];
    }

    // 문자열을 구분자로 나누기
    const numberStrings = numbersString.split(delimiters);

    // 빈 문자열 처리: 모든 값이 빈 문자열인 경우 0 반환
    if (numberStrings.every((value) => value.trim() === "")) {
      return 0;
    }

    // 예외 처리 및 숫자 합산
    let sum = 0;
    for (const value of numberStrings) {
      if (value.trim() === "") {
        throw new Error("[ERROR] 구분자만 있고 숫자는 없습니다.");
      }
      if (isNaN(value)) {
        throw new Error("[ERROR] 숫자가 아닌 값이 포함되어 있습니다.");
      }
      const number = parseInt(value, 10);
      if (number < 0) {
        throw new Error("[ERROR] 음수 값이 포함되어 있습니다.");
      }
      sum += number;
    }

    return sum;
  }

  printResult(result) {
    // 결과 출력 처리
    Console.print(`결과: ${result}`);
  }

  printError(message) {
    // 에러 메시지 출력
    Console.print(message);
  }
}

export default App;
