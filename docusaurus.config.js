// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config
import {themes as prismThemes} from 'prism-react-renderer';
// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'DeepSeek MCP Client',
  tagline: 'Python client for connecting DeepSeek language models with MCP servers',
  favicon: 'img/favicon.ico',
  
  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },
  
  // Set the production url of your site here
  url: 'https://carlosmaroruiz.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/deepseek-mcp-client/',
  
  // GitHub pages deployment config.
  organizationName: 'CarlosMaroRuiz', // Usually your GitHub org/user name.
  projectName: 'deepseek-mcp-client', // Usually your repo name.
  
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  
  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/CarlosMaroRuiz/deepseek-mcp-client/tree/main/docs',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/CarlosMaroRuiz/deepseek-mcp-client/tree/main/blog',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/deepseek-mcp-social-card.jpg',
      navbar: {
        title: 'DeepSeek MCP Client',
        logo: {
          alt: 'DeepSeek MCP Client Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar', // ✅ CAMBIADO: era 'docsSidebar'
            position: 'left',
            label: 'Documentation',
          },
          {to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://github.com/CarlosMaroRuiz/deepseek-mcp-client',
            label: 'GitHub',
            position: 'right',
          },
          {
            href: 'https://pypi.org/project/deepseek-mcp-client/',
            label: 'PyPI',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Getting Started',
            items: [
              {
                label: 'Introduction',
                to: '/docs/intro',
              },
              {
                label: 'Installation',
                to: '/docs/installation',
              },
              {
                label: 'Quick Start',
                to: '/docs/quickstart',
              },
            ],
          },
          {
            title: 'Configuration',
            items: [
              {
                label: 'HTTP Servers',
                to: '/docs/configuration/http-servers',
              },
              {
                label: 'STDIO Servers',
                to: '/docs/configuration/stdio-servers',
              },
              {
                label: 'Environment Variables',
                to: '/docs/environment-variables',
              },
            ],
          },
          {
            title: 'API Reference',
            items: [
              {
                label: 'DeepSeek Client',
                to: '/docs/api-reference/deepseek-client',
              },
              {
                label: 'Client Result',
                to: '/docs/api-reference/client-result',
              },
              {
                label: 'MCP Server Config',
                to: '/docs/api-reference/mcp-server-config',
              },
            ],
          },
          {
            title: 'Community & More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/CarlosMaroRuiz/deepseek-mcp-client',
              },
              {
                label: 'PyPI',
                href: 'https://pypi.org/project/deepseek-mcp-client/',
              },
              {
                label: 'Compatible Servers',
                to: '/docs/compatible-servers',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} DeepSeek MCP Client. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['python', 'json', 'bash'],
      },
    }),
};

export default config;