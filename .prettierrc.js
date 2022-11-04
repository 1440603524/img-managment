module.exports = {
  printWidth: 80,
  // 缩进所占列数，默认是 2 列
  tabWidth: 2,
  // 缩进风格是否是Tab，默认是 false ，使用空格缩进
  useTabs: false,
  // 在语句末尾添加分号，默认是 true
  semi: false,
  // 使用单引号，默认是 false
  singleQuote: true,
  // JSX中使用单引号，默认是 false
  jsxSingleQuote: true,
  // jsx 标签的反尖括号需要换行
  jsxBracketSameLine: false,
  // 是否保留对象内侧两端的空格，比如 { foo: bar } 和 {foo:bar} 的区别
  bracketSpacing: true,
  // 换行符
  endOfLine: 'lf',
  // perserve: 按照文件原样折行 （v1.9.0+）
  proseWrap: 'never',
  // 只格式化文件中的一部分，范围开始于第几行
  rangeStart: 0,
  // 只格式化文件中的一部分，范围结束于第几行
  rangeEnd: Infinity,
}
