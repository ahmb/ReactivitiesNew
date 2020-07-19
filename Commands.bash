dotnet ef migrations add InitialCreate -p Persistence/ -s API/ 
^^ p is for project and -s is for startup, run out of main solution folder

dotnet ef migrations add "ActivityEntityAdded" -p Persistence/ -s API/

Ahmads-MacBook-Pro:API Newton$ dotnet watch run

git init
git add . (to stage)
git commit -m "Initial Commit"

git remote add origin https://github.com/c0ldlimit/vimcolors.git
git push -u origin master
 
# Push an existing repository from the command line
 
git remote add origin https://github.com/ahmb/SchoolExercises.git
git push -u origin master

I think that the best way to do this is:

Stash your local changes:

git stash
Update the branch to the latest code

git pull
Merge your local changes into the latest code:

git stash apply
Add, commit and push your changes

git add
git commit
git push




browse to folder and then run npm start

Prep:

Restore ownership of the user's npm related folders, to the current user, like this:
sudo chown -R $(whoami) ~/.npm

sudo chown -R $(whoami) ~/.config
sudo npm cache clean --force --unsafe-perm
npm install -g node@latest --unsafe-perm
npx --ignore-existing create-react-app
another solution:
npm uninstall -g create-react-app
when I uninstall it,I can't find the folder in /usr/local/lib/node_modules;
but It is still failed.(npx --ignore-existing create-react-app can work.)
then I found the folder in /usr/local/bin ,I delete the create-react-app folder,
and it can work.

Try unistalling create-react-app if you have installed it globally using npm uninstall -g create-react-app and then use npx create-react-app my-app. It should work.

sudo rm -rf $(xcode-select -print-path)
xcode-select --install

sudo rm -rf $(xcode-select -print-path)
xcode-select --install
/usr/sbin/pkgutil --packages | grep CL && sudo npm install -g node-gyp

npx create-react-app client-app --use-npm --template typescript
npm start

add Semntic ui 

Adding semantic uninstall$  yarn add semantic-ui-react


rm -rf node_modules package-lock.json && npm install && npm start