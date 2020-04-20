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

- If HardSourceWebpackPlugin's Warning Displayed on Terminal. ( Plugins for Build Faster. )  
`[hardsource:***] Could not freeze...`  
Delete HardSourceWebpackPlugin's Cache Dir.  
  - -> `yarn remove-fasters-cache`
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

## TODO.
- @typescript-eslint ver.2 Parse Doesn't Work. (on Terminal && on VSCode && Don't Want to Add Extra Config Files.)
  - <https://github.com/typescript-eslint/typescript-eslint/releases/tag/v2.0.0>  
- @types/styled-components When Install Latest Version, @types/react-native's Installed Together.  
  Temporary -> Fix @types/styled-components's Version 4.1.8 && `rm -rf node_modules/@types/react-native`
  - <https://github.com/DefinitelyTyped/DefinitelyTyped/issues/33311>  

🏄‍
