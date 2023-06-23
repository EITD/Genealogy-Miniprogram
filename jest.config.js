module.exports = {
    verbose: true,
    transform: {
      '^.+\\.[jt]s?$': 'ts-jest'
    },
    globals: {
      NODE_ENV: 'test',
      __wxConfig: {
        global: {
          window: {},
        },
      },
    },
    testEnvironment: 'jsdom'
  };