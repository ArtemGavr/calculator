let baseFrom = 2;

let baseTo;


function toDecimal(number, baseFrom) {
    number = number.toString();
    let k = 0;
    let res = 0;
    let currentSymbol = number.length - 1;
    while (currentSymbol >= 0) {
        let symbolValue = valueOfSymbol(number[currentSymbol]);
        res += symbolValue * (baseFrom ** k);
        k++;
        currentSymbol--;
    }
    return res;
}

// var X = prompt("Choose your number");

var A = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
function fromDecimal(number, base) {
    let runner  = -1;
    let Z = [];
    for (i = number; 0 < i; i = Math.floor(i / base)) {
        if(i % base >= 10) {
            Z.push(A[i % base - 10]);
        } else {
            Z.push(i % base);
        }
        runner = runner + 1;
    }
    Z.reverse();
    return Z.join('');
}



function toTwoBase (number, base) {
    number = number.toString();
    let Z = [];
    var eightDigits =["000", '001', '010', '011', '100', '101', '110' ,'111'];
    let sixteen = ['0000', '0001', '0010', '0011', '0100', '0101', '0110', '0111', '1000', '1001', '1010', '1011', '1100', '1101', '1110', '1111' ]
    if (base == 8) {
        for (let i = number.length-1; i >=0; i--) {
           Z.push( eightDigits[Number(number[i])]);
        }
        Z.reverse()
        let s =Z.join('');

        return s.substr(s.indexOf('1'))

    }

    if (base == 16) {
        for (let i = number.length-1; i >=0; i--) {
            Z.push( sixteen[valueOfSymbol(number[i])]);
        }
        Z.reverse()
        let s =Z.join('');

        return s.substr(s.indexOf('1'))

    }

}

function fromTwoto (number, base) {
    number = number.toString();
    let Z = [];
    var eightDigits =["000", '001', '010', '011', '100', '101', '110' ,'111'];
    let sixteen = ['0000', '0001', '0010', '0011', '0100', '0101', '0110', '0111', '1000', '1001', '1010', '1011', '1100', '1101', '1110', '1111' ]
    if (base == 8) {
        if (number.length % 3 == 1){
            number = '00' + number;
        }
        if (number.length % 3 == 2){
            number = '0' + number;
        }
        let kolvo = number.length /3;
        for (let i = 0; i <kolvo; i++) {
            let str = number.substr(3*i, 3)
            Z.push( eightDigits.indexOf(str));
        }

        let s =Z.join('');

        return s

    }

    if (base == 16) {
        if (number.length % 4 == 1){
            number = '000' + number;
        }
        if (number.length % 4 == 2){
            number = '00' + number;
        }
        if (number.length % 4 == 3){
            number = '0' + number;
        }
        let kolvo = number.length /4;
        for (let i = 0; i <kolvo; i++) {
            let str = number.substr(4*i, 4)
            let indx = sixteen.indexOf(str)
            if (indx > 9) {
                Z.push( valueToSymbol(indx));
            } else {
                Z.push(indx);
            }

        }

        let s =Z.join('');

        return s

    }

}
function sum(num1, num2, base) {
    num1 = num1.toString();
    num2 = num2.toString();
    let Z = [];

    while (num1.length < num2.length) {
        num1 = '0' + num1;
    }
    while (num2.length < num1.length) {
        num2 = '0' + num2;
    }

    let carry = 0;
    for (let i = num1.length-1; i >= 0; i--) {
        let res = valueOfSymbol(num1.charAt(i)) + valueOfSymbol(num2.charAt(i)) + carry;
        carry = (res - res % base) / base;

        if (res % base > 9) {
            Z.push(valueToSymbol(res % base));
        }
        else {
            Z.push(res % base);
        }
    }
    if (carry == 1)
        Z.push(carry);

    Z.reverse();
    return (Z.join(''));
}




function subt(num1, num2, base) {
    num1 = num1.toString();
    num2 = num2.toString();
    let Z = [];
    while (num1.length < num2.length) {
        num1 = '0' + num1;
    }
    while (num2.length < num1.length) {
        num2 = '0' + num2;
    }
    let carry = 0;
    for (let i = num1.length-1; i >= 0; i--) {
        let res = 0;
        if (valueOfSymbol(num1.charAt(i))+carry >= valueOfSymbol(num2.charAt(i)))
            res = valueOfSymbol(num1.charAt(i)) - valueOfSymbol(num2.charAt(i)) - carry;

        else {
            res = valueOfSymbol(num1.charAt(i))+ base - valueOfSymbol(num2.charAt(i)) - carry ;
            carry = 1;
        }

        if (res % base > 9) {
            Z.push(valueToSymbol(res % base));
        }
        else {
            Z.push(res % base);
        }
    }
    Z.reverse();
    let a = 0;
    for (let i=0; i< Z.length; i++) {
        if (Z[i] != '0') {
            a = i;
            break;
        }
    }
    return Z.join('').substr(a);

}


function mult(num1, num2, base) {
    num1 = num1.toString();
    num2 = num2.toString();
    let ans= '0';
    for (let j = num2.length-1; j >= 0; j--) {
        let multiplicator = valueOfSymbol(num2.charAt(j));
        let carry = 0;
        let Z=[];

        for (let i = num1.length - 1; i >= 0; i--) {
            let res = valueOfSymbol(num1.charAt(i)) * multiplicator + carry;
            carry = (res - res % base) / base;

            if (res % base > 9) {
                Z.push(valueToSymbol(res % base));
            } else {
                Z.push(res % base);
            }
        }

        if (carry > 9) {
            Z.push(valueToSymbol(carry));
        } else {
            Z.push(carry);
        }
        Z.reverse();
        for (let k=0; k < num2.length-1-j; k++)
            Z.push('0');
        ans = sum(Z.join(''), ans, base)
    }

    let a = 0;
    for (let i=0; i< ans.length; i++) {
        if (ans[i] != '0') {
            a = i;
            break;
        }
    }
    return ans.substr(a);
}

function valueOfSymbol(symbol) {
    let symbolCharCode = symbol.charCodeAt(0);
    if (symbolCharCode >= 48 && symbolCharCode <= 57)
        return (symbolCharCode - 48);

    if (symbolCharCode >= 65 && symbolCharCode <= 70)
        return (symbolCharCode - 55);

    console.log('Wrong symbol');
    return -1;
}

function valueToSymbol(value) {
    if (value == 10) return 'A'
    if (value == 11) return 'B'
    if (value == 12) return 'C'
    if (value == 13) return 'D'
    if (value == 14) return 'E'
    if (value == 15)
        return 'F'
    console.log("Wrong input")
    return ''
}

console.log(mult('A', 'B', 16));









