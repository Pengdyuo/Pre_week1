// ValidateValue.js
export function ValidateValue(values) {
    for (const value of values) {
        if (value.trim() === "") {
            throw new Error("[ERROR] 구분자만 있고 숫자는 없습니다.");
        }
        if (isNaN(value)) {
            throw new Error("[ERROR] 숫자가 아닌 값이 포함되어 있습니다.");
        }
        if (parseInt(value, 10) < 0) {
            throw new Error("[ERROR] 음수 값이 포함되어 있습니다.");
        }
    }
}