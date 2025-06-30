module.exports = {
  // 句尾是否加分号
  semi: true,
  // 使用单引号
  singleQuote: true,
  // 尾随逗号风格 (none | es5 | all)
  trailingComma: 'es5',
  // 每行代码长度
  printWidth: 80,
  // 缩进空格数
  tabWidth: 2,
  // 是否使用制表符缩进
  useTabs: false,
  // 对象字面量中括号是否有空格 (true: { foo: bar }, false: {foo: bar})
  bracketSpacing: true,
  // 多行 JSX 元素的 > 放在最后一行的末尾
  jsxBracketSameLine: false,
  // 箭头函数参数是否加括号 (avoid: 省略括号, always: 总是加括号)
  arrowParens: 'avoid',
  // 文件顶部是否需要 @format 标记
  requirePragma: false,
  // 是否在文件头部插入 @prettier 标记
  insertPragma: false,
  // HTML 文件空格敏感度 (css|strict|ignore)
  htmlWhitespaceSensitivity: 'css',
  // 换行符风格 (lf|crlf|cr|auto)
  endOfLine: 'lf',
  // Vue 文件中 script 和 style 标签是否缩进
  vueIndentScriptAndStyle: false,
  // 格式化嵌入的代码 (markdown, code blocks)
  embeddedLanguageFormatting: 'auto',
  // 是否对引用代码进行格式化
  quoteProps: 'as-needed',
  // 多行时是否尽可能打印尾随逗号
  proseWrap: 'preserve',
  // JSX 使用单引号
  jsxSingleQuote: false,
  // 每个属性单独一行 (仅适用于对象、数组等)
  singleAttributePerLine: false,
};
