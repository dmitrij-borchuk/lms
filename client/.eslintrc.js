module.exports = {
  "parser": "babel-eslint",
  "plugins": [
    "flowtype",
    "react",
  ],
  "extends": [
    "airbnb",
    "plugin:flowtype/recommended",
  ],
  "rules": {
    "flowtype/require-return-type": [
      0,
      "always",
      {
        "annotateUndefined": "never"
      }
    ],
    "function-paren-newline": 0,
    "import/prefer-default-export": 0,
  },
  "settings": {
    "flowtype": {
      "onlyFilesWithFlowAnnotation": false
    }
  },
  "globals": {
    "document": true
  },
};
