module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  transform: {
    '^.+\\.vue$': 'vue-jest'
  },
  transformIgnorePatterns: ['/node_modules/(?!@ionic/vue|@ionic/vue-router)'],
  roots: ['<rootDir>/app/tests'],
  moduleFileExtensions: ['js', 'ts', 'json', 'vue'],
  testMatch: [
    '**/?(*.)+(spec|test).[jt]s?(x)'
  ]
}
