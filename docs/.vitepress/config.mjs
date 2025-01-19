import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "笔记",
  description: "笔记",
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '博客', link: '/docker/build' }
    ],
    sidebar: [
      // {
      //   text: 'java', collapsed: false, items: [
      //     { text: 'java基础', link: '/java' },
      //     { text: 'java高级', link: '/java/senior' },
      //   ]
      // },
      {
        text: 'java', collapsed: false,
        items: [
          { text: 'jdk-1.8多线程', link: '/java/index' },
        ]
      },
      {
        text: 'github', collapsed: false,
        items: [
          { text: '部署vitepress', link: '/github/index' },
        ]
      },
      {
        text: 'vue', collapsed: false,
        items: [
          { text: 'vue-router', link: '/vue/router' },
          { text: 'vue-pina', link: '/vue/pina' },
          { text: 'vue-axios', link: '/vue/axios' },
        ]
      },
      // {
      //   text: 'mysql', collapsed: false,
      //   items: [
      //     { text: 'mysql基础', link: '/mysql' },
      //   ]
      // },
      {
        text: 'docker', collapsed: false,
        items: [
          { text: 'docker持续集成', link: '/docker/extends' },
          { text: 'docker软件安装', link: '/docker/soft' },
          { text: 'docker项目构建', link: '/docker/build' },
        ]
      },

    ]

    // socialLinks: [
    //   { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    // ]
  }
})
