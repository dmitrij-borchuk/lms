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
    "jsx-a11y/anchor-is-valid": ["error", {
      "components": ["Link"],
      "specialLink": ["to"],
      "aspects": ["noHref", "invalidHref", "preferButton"]
    }]
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
