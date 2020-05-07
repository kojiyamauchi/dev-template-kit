# Frontend Dev Starter.

Creating Optimization of I Think About Various Things Necessary for the Development of Recently Frontend & Designs.

## 🏄‍ Related Repo.  
- Web App.  
  - [React Simple Starter.](https://github.com/kojiyamauchi/react-simple-starter)  
- Static Website.  
  - [TypeScript Templates.](https://github.com/kojiyamauchi/typescript-templates)
  - [Components Base Sass Template.](https://github.com/kojiyamauchi/component-base-sass-template)
  - [EJS Template.](https://github.com/kojiyamauchi/ejs-template)  

ー  

## 🏄‍ Usage.  
### 🛹 Setup.
- Clone or Download This Repository in Project Root Dir.
- When Creating Simple Web Application.
  - Put [React Simple Starter](https://github.com/kojiyamauchi/react-simple-starter) in `resource` Dir.
  - -> `yarn setup:spa`
- When Creating Static Website.
  - Put [TypeScript Templates](https://github.com/kojiyamauchi/typescript-templates) / [Components Base Sass Template](https://github.com/kojiyamauchi/component-base-sass-template) / [EJS Template](https://github.com/kojiyamauchi/ejs-template) in `resource` Dir.
  - -> `yarn setup:static`  
- Setup Each Files Below.
  - -> `package.json` / `tsconfig.json` / `.eslintrc.yml` / `.github/workflows/delivery.yml`
- Initialize package.json
  - -> `yarn init`
- Install All Modules.
  - -> `yarn` or `yarn install`  

### 🛹 Development & Build. ( Manually Build on Local )
- When Creating Simple Web Application.
  - Development -> `yarn dev`
  - Build -> `yarn build`
- When Creating Static Website.
  - -> `gulp`  

### 🛹 Build & Deployment. ( Auto Build & Auto Deployment on GitHub )
- Use GitHub Actions. ( Deployment for Github Pages or Netlify or FTP )  
  - After Pushing to `develop` Branch, ( Mainly, Merge from Pull Request.)  
    It Will Auto Build in `delivery` Directory.
  - Contents of `delivery` Directory are Deployed to `master` Branch.
  - Use GitHub Pages. -> Displayed on GitHub Pages.
  - Use Netlify. -> Deploys via Netlify.
  - Use FTP. -> Deploys via FTP.  

Choose Which Type of Build & Deployment, Setting in `.github/workflows/delivery.yml`  
Even When Using SSG with Gatsby.

### 🛹 Unit Test.
- At Other Than `master`/`develop` Branch, When Put File with Test Code in `resource/tests` Directory & Push, Jest Will Launch. ( Mainly, Push within Pull Requests. )

### 🛹 Update Modules.
- Check to Latest Version of Modules on package.json ( ncu )
  - -> `yarn check-pkg`
- Update to Latest Version of Modules on package.json ( ncu -u )
  - -> `yarn update-pkg`
- Re:Install All Modules. ( rm yarn.lock && rm -rf node_modules && yarn install )
  - -> `yarn re-install`  

This Update Method's for Development by Personal Work 🤔  
To See Which Modules Can to Be Updated Which Version.  
Don't Use `yarn install --no-lockfile` and `yarn install --pure-lockfile`  
Because Want to Use Cache on GitHub Actions.   
When Development with Multiple People, Use `yarn upgrade`  
(Don't Remove `yarn.lock`, for Eliminate Difference in Version of Each Modules.)  

### 🛹 Memo.
- If HardSourceWebpackPlugin's Warning Displayed on Terminal.  
🔎`[hardsource:***] Could not freeze...`  
Delete HardSourceWebpackPlugin's Cache Dir.  
  - -> `yarn remove-fasters-cache`

ー  

## 🏄‍ TODO.
- Styled Components V5's `createGlobalStyle` Does Not Work, When `@import`'s (CSS Import, Google Web Fonts etc.) Written Inside. For That, Use V4's Latest.
  - <https://github.com/styled-components/styled-components/releases/tag/v5.0.0>
- @types/styled-components When Install Latest Version, @types/react-native's Installed Together.  
  Temporary -> Add `.yarnclean` Ignoring `@types/react-native`
  - <https://github.com/DefinitelyTyped/DefinitelyTyped/issues/33311>  
- When Use `gsap` V3 with `TypeScript`, Don't Currently Install `@types/gsap`  
  That Will Cause Conflicts as Types are Already Included in Package.
  - <https://greensock.com/forums/topic/19861-usage-with-typescript#comment-104764>  

☕️

‍
