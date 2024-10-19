// StrSumFunc.js
import { ValidateValue } from "./ValidateValue";

export function StrSumFunc(input) {
    let divisionStr = /[,:]/; // 기본 구분자: 쉼표(,)와 콜론(:)
    let inputValueStr = input;

    // 커스텀 구분자 추출
    if (inputValueStr.startsWith("//")) {
        const customDelimiterMatch = inputValueStr.split("\n");
        if (customDelimiterMatch.length < 2) {
            throw new Error("[ERROR] 커스텀할 문자와 숫자를 입력해야 합니다.");
        }
        divisionStr = new RegExp(`[${customDelimiterMatch[0][2]}]`);
        inputValueStr = customDelimiterMatch[1];
    }

    // 문자열을 구분자로 나누기
    const numberStrings = inputValueStr.split(divisionStr);

    // 빈 문자열 처리: 모든 값이 빈 문자열인 경우 0 반환
    if (numberStrings.every((value) => value.trim() === "")) {
        return 0;
    }

    // 예외 처리 및 숫자 합산
    ValidateValue(numberStrings);

    let sum = 0;
    for (const value of numberStrings) {
        sum += parseInt(value, 10);
    }

    return sum;
}