// @ts-check

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.

 @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
  // Sidebar manual organizado con categorías
  tutorialSidebar: [
    // Documentos de inicio
    'intro',
    'installation', 
    'quickstart',
    
    // Configuración
    {
      type: 'category',
      label: '⚙️ Configuración',
      collapsed: false,
      items: [
        'configuration/http-servers',
        'configuration/stdio-servers', 
        'configuration/mixed-configuration',
      ],
    },
    
    // Logging
    {
      type: 'category',
      label: '📝 Logging',
      collapsed: false,
      items: [
        'logging/enable-logging',
        'logging/colored-logging',
        'logging/silent-operation',
      ],
    },
    
    // Uso avanzado
    {
      type: 'category',
      label: '🚀 Uso Avanzado',
      collapsed: false,
      items: [
        'advanced-usage/custom-server-config',
        'advanced-usage/error-handling',
        'advanced-usage/working-with-results',
      ],
    },
    
    // Casos de uso
    {
      type: 'category',
      label: '💼 Casos de Uso',
      collapsed: false,
      items: [
        'use-cases/database-analysis',
        'use-cases/e-commerce-integration',
        'use-cases/document-generation',
      ],
    },
    
    // Referencia de API
    {
      type: 'category',
      label: '📚 API Reference',
      collapsed: false,
      items: [
        'api-reference/deepseek-client',
        'api-reference/client-result',
        'api-reference/mcp-server-config',
      ],
    },
    
    // Documentos adicionales
    'environment-variables',
    'compatible-servers',
  ],
};

export default sidebars;