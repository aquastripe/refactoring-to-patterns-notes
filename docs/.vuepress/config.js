module.exports = {
  title: 'Refactoring to Patterns Notes',
  description: '重構－向範式前進 (Refactoring to Patterns) 的學習筆記',
  base: '/refactoring-to-patterns-notes/',
  head: [
    ['meta', { name: "viewport", content: "width=device-width,user-scaleble=0,initial-scale=1.0,maximum-scale=1.0" }],
  ],
  locales: {
    '/': {
      lang: 'zh-TW',
    }
  },
  repo: 'https://github.com/aquastripe/refactoring-to-patterns-notes',
  themeConfig: {
    sidebar: [
      ['/', 'Preface'],
      {
        title: 'Ch 1: Why I wrote this book',
        collapsable: false,
        children: [
          'ch1/'
        ],
      },
      {
        title: 'Ch 2: Refactoring',
        collapsable: false,
        children: [
          'ch2/'
        ],
      },
      {
        title: 'Ch 3: Patterns',
        collapsable: false,
        children: [
          'ch3/'
        ],
      },
      {
        title: 'Ch 4: Code Smells',
        collapsable: false,
        children: [
          'ch4/'
        ],
      },
      {
        title: 'Ch 5: A Catalog of Refactorings to Patterns',
        collapsable: false,
        children: [
          'ch5/'
        ],
      },
      {
        title: 'Ch 6: Creation',
        collapsable: false,
        children: [
          'ch6/',
          'ch6/replace-constructors-with-creation-methods',
          'ch6/move-creation-knowledge-to-factory',
          'ch6/encapsulate-classes-with-factory',
          'ch6/introduce-polymorphic-creation-with-factory-method',
          // 'ch6/encapsulate-composite-with-builder',
          // 'ch6/inline-singleton',
        ],
      },
      {
        title: 'Ch 7: Simplification',
        collapsable: false,
        children: [
          'ch7/compose-method',
          'ch7/replace-conditional-logic-with-strategy'
        ],
      },
      {
        title: 'Ch 8: Generalization',
        collapsable: false,
        children: [
          'ch8/form-template-method',
        ],
      },
      {
        title: 'Ch 11: Utilities',
        collapsable: false,
        children: [
          'ch11/',
          'ch11/chain-constructors',
        ],
      },
    ],
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Github', link: 'https://github.com/aquastripe/refactoring-to-patterns-notes' }
    ]
  },
  markdown: {
    lineNumbers: true
  }
}
