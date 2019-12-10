# 🎺 Frontend Dev Starter Kit. 🎺

Creating Optimization of I Think About Various Things Necessary for the Development of Recently Frontend & Designs.

## Usage.
- Clone or Download This Repository in Project Root Dir.
- Initialize package.json
  - -> `yarn init`
- Install All Packages.
  - -> `yarn install`
- When Creating Static Website.
  - -> `gulp`
- When Creating Simple Web Application.
  - Development -> `yarn dev`
  - Build -> `yarn build`

ー

- Check npm Package Update Version. ( ncu )
  - -> `yarn check-pkg`
- Update npm Package on package.json. ( ncu -u )
  - -> `yarn update-pkg`
- Re:Install All Packages. ( rm yarn.lock && rm -rf node_modules && yarn install )
  - -> `yarn re-install`

ー

## Related Repo.  
- Web App.  
  - [React Simple Starter Kit.](https://github.com/kojiyamauchi/react-simple-starter-kit)  
- Static Website.  
  - [TypeScript Templates.](https://github.com/kojiyamauchi/typescript-templates)
  - [Components Base Sass Template Kit.](https://github.com/kojiyamauchi/component-base-sass-template-kit)
  - [EJS Template.](https://github.com/kojiyamauchi/ejs-template-kit)  

ー  

## Memo.
- If HardSourceWebpackPlugin's Warning Displayed on Terminal.  
`[hardsource:***] Could not freeze...`  
  - -> Delete HardSourceWebpackPlugin's Cache Dir.  
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`rm -rf node_modules/.cache/hard-source/`  

ー

## TODO.
- @typescript-eslint ver.2 Parse Doesn't Work. (on Terminal && on VSCode)
  - <https://github.com/typescript-eslint/typescript-eslint/releases/tag/v2.0.0>  

🏄‍
