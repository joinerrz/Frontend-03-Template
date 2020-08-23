// // 在一个字符串中找到字符`abcabx`

// function match(str) {
//   let state = start;
//   for (let s of str ) {
//     state = state(s);
//   }

//   return state === end;
// }


// function start(s) {
//   if (s === 'a') {
//     return fundA;
//   } else {
//     return start;
//   }
// }

// function end() {
//   return end;
// }

// function fundA(s) {
//   if (s === 'b') {
//     return fundB
//   } else {
//     return start(s);
//   }
// }

// function fundB(s) {
//   if (s === 'c') {
//     return fundC;
//   } else {
//     return start(s);
//   }
// }

// function fundB2(s) {
//   if (s === 'x') {
//     return fundX();
//   } else {
//     return fundB(s);
//   }
// }

// function fundC(s) {
//   if(s === 'a') {
//     return fundA2;
//   }else {
//     return start(s);
//   }
// }

// function fundA2(s) {
//   if(s === 'b') {
//     return fundB2;
//   }else {
//     return start(s);
//   }
// }

// function fundX(s) {
//   return end;
// }


// const res = match('abcabcabx');

// console.log(res);

// console.log('sss')



require('./findabababx');


