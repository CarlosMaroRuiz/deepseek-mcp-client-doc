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
  baseUrl: '/deepseek-mcp-client-doc/',  // CORREGIDO: Debe coincidir con el nombre del repositorio
  
  // GitHub pages deployment config.
  organizationName: 'CarlosMaroRuiz', // Usually your GitHub org/user name.
  projectName: 'deepseek-mcp-client-doc', // CORREGIDO: Debe coincidir con el nombre real del repositorio
  
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
            'https://github.com/CarlosMaroRuiz/deepseek-mcp-client-doc/tree/main/docs', // CORREGIDO
        },
        // Blog section removed
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
      image: 'img/deepseekmcp.png',
      navbar: {
        title: 'DeepSeek MCP Client',
        logo: {
          alt: 'DeepSeek MCP Client Logo',
          src: 'img/deepseekmcp.png',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Documentation',
          },
          // Blog link removed
          {
            href: 'https://github.com/CarlosMaroRuiz/deepseek-mcp-client-doc', // CORREGIDO
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
              // Eliminado: Environment Variables (no existe)
            ],
          },
          // SECCIÓN ELIMINADA: API Reference
          {
            title: 'Community & More',
            items: [
              // Blog link removed
              {
                label: 'GitHub',
                href: 'https://github.com/CarlosMaroRuiz/deepseek-mcp-client-doc', // CORREGIDO
              },
              {
                label: 'PyPI',
                href: 'https://pypi.org/project/deepseek-mcp-client/',
              },
              // Eliminado: Compatible Servers (no existe)
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