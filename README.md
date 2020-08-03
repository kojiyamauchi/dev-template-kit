# Frontend Dev Starter.

Creating Optimization of I Think About Various Things Necessary for the Development of Recently Frontend & Designs.

ー  

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
  - -> `package.json` / `tsconfig.json` / `.eslintrc.yml` / `.github/workflows/delivery.yml && ci.yml`
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

### 🛹 Setting on GitHub. ( When Use Auto Build & Auto Deployment & CI )
- Use Repositories...
  - `Settings` -> `Branches` -> `Branch protection rules`
    - -> `Branch name pattern`
      - Add `develop`
    - -> `Protect matching branches`
      - Check `Require status checks to pass before merging`
      - Check `Require branches to be up to date before merging`
      - Check `Build Test`
      - Check `Jest & ESLint`

### 🛹 Build & Deployment. ( Auto Build & Auto Deployment on GitHub )
- Use GitHub Actions. ( Deployment for Github Pages or Netlify or FTP )  
  - When Pull Requests to the `develop` Branch are Closed & Merged,  
    It Will Auto Build in `delivery` Directory of the Corresponding Branch.
  - Contents of `delivery` Directory are Deployed to `master` Branch.
  - Use GitHub Pages. -> Displayed on GitHub Pages.
  - Use Netlify. -> Deploys via Netlify.
  - Use FTP. -> Deploys via FTP.  

Choose Which Type of Build & Deployment, Setting in `.github/workflows/delivery.yml`  
Even When Using SSG with Gatsby.

### 🛹 Continuous Integration.
- When Commit & Push to the Pull Request, ( Only Pull Request to `develop` Branch )
  - When There is a File Containing Test Code in  `resource/tests` Directory, Jest Will Launch.
  - Statically Analyze Code with ESLint. ( Before That, Husky & Lint Staged also Uses ESLint 💣 )
  - Test the Build at Every Commit.  

Choose Launch Jest & ESLint & Test Build & Which Type of Build, Setting in `.github/workflows/ci.yml`  

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
- Styled Components Autofix Stylelint Doesn't Work Yet.  
  Maybe Auto Fix of Stylelint Doesn't Work in Template Literals.  
  So, Display Only Warning on the Terminal.
  - <https://github.com/styled-components/stylelint-processor-styled-components/issues/264>  
  - <https://github.com/stylelint/stylelint/blob/master/CHANGELOG.md#9100>
- When Use `gsap` V3 with `TypeScript`, Don't Currently Install `@types/gsap`  
  That Will Cause Conflicts as Types are Already Included in Package.
  - <https://greensock.com/forums/topic/19861-usage-with-typescript#comment-104764>  

☕️
