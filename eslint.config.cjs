const nx = require('@nx/eslint-plugin');

module.exports = [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: ['**/dist'],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?js$'],
          depConstraints: [
            {
              sourceTag: 'type:app',
              onlyDependOnLibsWithTags: [
                'type:routes',
                'type:api',
                'type:feature',
                'type:ui',
                'type:data-access',
                'type:utils',
                'type:models',
              ],
            },
            {
              sourceTag: 'type:routes',
              onlyDependOnLibsWithTags: [
                'type:feature',
                'type:data-access',
                'type:utils',
              ],
            },
            {
              sourceTag: 'type:api',
              onlyDependOnLibsWithTags: [
                'type:feature',
                'type:ui',
                'type:data-access',
                'type:utils',
                'type:models',
              ],
            },
            {
              sourceTag: 'type:feature',
              onlyDependOnLibsWithTags: [
                'type:feature',
                'type:ui',
                'type:data-access',
                'type:utils',
                'type:api',
                'type:models',
              ],
            },
            {
              sourceTag: 'type:ui',
              onlyDependOnLibsWithTags: [
                'type:ui',
                'type:utils',
                'type:models',
              ],
            },
            {
              sourceTag: 'type:data-access',
              onlyDependOnLibsWithTags: [
                'type:data-access',
                'type:utils',
                'type:api',
                'type:models',
              ],
            },
            {
              sourceTag: 'type:utils',
              onlyDependOnLibsWithTags: ['type:utils', 'type:models'],
            },
            {
              sourceTag: 'type:models',
              onlyDependOnLibsWithTags: ['type:models'],
            },
            {
              sourceTag: 'domain:shared',
              onlyDependOnLibsWithTags: ['domain:shared'],
            },
            {
              sourceTag: 'domain:layout',
              onlyDependOnLibsWithTags: ['domain:layout', 'domain:shared'],
            },
            {
              sourceTag: 'domain:design',
              onlyDependOnLibsWithTags: ['domain:design', 'domain:shared'],
            },
          ],
        },
      ],
    },
  },
  {
    files: [
      '**/*.ts',
      '**/*.tsx',
      '**/*.js',
      '**/*.jsx',
      '**/*.cjs',
      '**/*.mjs',
    ],
    // Override or add rules here
    rules: {},
  },
];
