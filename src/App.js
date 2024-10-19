// App.js
const { Console } = require('@woowacourse/mission-utils');

class App {
  async run() {
    try {
      const input = await Console.readLineAsync('덧셈할 문자열을 입력해 주세요.\n');
      const result = this.add(input);
      Console.print(`결과 : ${result}`);
    } catch (error) {
      Console.print(error.message);
    }
    // Console.close(); // 제거되었습니다.
  }

  add(input) {
    if (input === null || input === '') {
      return 0;
    }

    let delimiters = [',', ':'];
    let numbers = input;

    if (input.startsWith('//')) {
      const delimiterEndIndex = input.indexOf('\n');
      if (delimiterEndIndex === -1) {
        throw new Error('[ERROR] 잘못된 형식입니다.');
      }
      const customDelimiter = input.substring(2, delimiterEndIndex);
      delimiters.push(customDelimiter);
      numbers = input.substring(delimiterEndIndex + 1);
    }

    const tokens = numbers.split(new RegExp(`[${delimiters.join('')}]`));

    const sum = tokens.reduce((acc, curr) => {
      if (!/^\d+$/.test(curr)) {
        throw new Error('[ERROR] 숫자 이외의 값이 포함되어 있습니다.');
      }
      const number = parseInt(curr, 10);
      if (number < 0) {
        throw new Error('[ERROR] 음수는 입력할 수 없습니다.');
      }
      return acc + number;
    }, 0);

    return sum;
  }
}

module.exports = App;