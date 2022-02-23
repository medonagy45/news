module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: 'react-native-dotenv',
        path: '.env',
        blacklist: null,
        whitelist: ['MARVEL_API', 'MARVEL_PUBLIC_KEY', 'MARVEL_PRIVATE_KEY'],
        safe: false,
        allowUndefined: true,
      },
    ],
  ],
};
