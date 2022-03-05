#create the solution
dotnet new sln
dotnet new classlib -n Domain
dotnet new classlib -n Application
dotnet new classlib -n Persistance
dotnet new webapi -n API

#add dependencies to the solution file for all the dependencies
#dotnet sln -h
#dotnet sln -list
dotnet sln add Domain/
dotnet sln add Application/
dotnet sln add Persistance/
dotnet sln add API/

#cd to the app project
dotnet add reference ../Domain/
dotnet add reference ../Persistance/

#cd into the API project
dotnet add reference ../Application/

#cd into the Persistance project
dotnet add reference ../Domain/

#add all the bin and obj folders, VScode settings: 
# add pattern for **/bin and **/obj

#run a project out of the solution
 dotnet run -p API

 #MS shortcuts
 use prop keywork with tab tab 

 #set up a domain class and pass that values from the DBContext class in the Persistance project
 in the startup file
 #run dotnet ef migrations 

 #install dotnet ef for DB migrations
 dotnet tool install --global dotnet-ef

dotnet ef migrations add InitialCreate -p Persistance/ -s API/

 dotnet ef migrations add 'xxx' -p Persistance/ -s API/

dotnet ef migrations add 'Added interests ' -p Persistance/ -s API/


 #check if db is there, and if it isn then create it
# create this in these in the program class
var context = services.GetRequiredService<DataContext>();
                    context.Database.Migrate();

#move to the API folder and run dotnet watch run to restore the project from source as changes are made
dotnet watch run

#install react
npx create-react-app client-app --use-npm --typescript

#configure react 
#install react dev tools
 

 After creating an Activity Domain object, and then adding that class into the DataContext class
 #dotnet ef migrations add "ActivitiesEntityAdded" -p Persistance/ -s API
 #dotnet ef migrations add "Updated referential constraint useractivities " -p Persistance/ -s API
dotnet watch run
npm start 

Next chapter:
-------------
#seeding data into sqllite Database : Seed.cs

Next chapter:
-------------
#Command and Queries: - Design Pattern
    Command - Does something , modifies the state
    Queries - Answeres a question, does not modify the state, should return a value 

  
#option shift F - format c# code

#snippet for react fuctional component /hooks : rfc



#drop Database
dotnet ef database drop -p Persistance/ -s API/

#reload bashprofile
. ~/.bash_profile

#open mysql
mysql -u root -p 
show databases;
CREATE USER 'appuser'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Pa$$w0rd';
GRANT ALL PRIVILEGES ON *.* TO 'appuser'@'localhost' WITH GRANT OPTION;
flush privileges;
#
 dotnet user-secrets list

DOCKER
-------
These two commands, to be run from project folder where Dockerfile is located:
https://www.softwaredeveloper.blog/multi-project-dotnet-core-solution-in-docker-image#docker-run-command

single project solution:
docker build -t aspnetapp .

multiproject solution:
docker build -f PROJECT_DIRECTORY/Dockerfile -t IMAGE_NAME .

docker run -d -p 8080:80 --name myapp aspnetapp




 #how to
 ssh 68.183.19.105
 mysql -u root -p
#setup mysql
 - follow the install steps here: https://docs.microsoft.com/en-us/dotnet/core/install/linux-ubuntu
- configure apache
a2enmod proxy proxy_http proxy_html rewrite

sudo nano /etc/apache2/sites-available/reactivities.configure
<VirtualHost *:80>
ProxyPreserveHost On
ProxyPass / http://127.0.0.1:5000
ProxyPassReverse / http://127.0.01:5000

ErrorLog /var/log/apache2/reactivities-error.log
CustomLog /var/log/apache2/reactivities-access.log common

RewriteEngine on
RewriteCond %{HTTP:UPGRADE} ^WebSocet$ [NC]
RewriteCond %{HTTP:CONNECTION} Upgrade$ [NC]
RewriteRule /(.*) ws://127.0.0.1:5000/$1 [P]

</VirtualHost>

a2ensite reactivities

There is some syntax error in the file apache2.conf.

In a terminal, type:

cd /etc/apache2
Then:

apache2ctl configtest

There is some syntax error in the file apache2.conf.

In a terminal, type:

cd /etc/apache2
Then:

apache2ctl configtest

--------
BUILD
use: npm run build
to build the react app and deploy it into the API projects wwwroot folder




-------------------

UPDATE DB:

-- SQLite
update UserActivities
SET IsApproved = 0 , Read = 0




Koustabs query
-- SQLite
select a.AppUserId, a.TheadId, x.msgid, x.SentDateTime, x.Body
from
ThreadParticipants a 
Inner join 
(
select * 
from (
select b.ThreadId, b.Id as msgid, b.SentDateTime, b.Body,
row_number() over (partition by b.ThreadId order by b.SentDateTime desc) as rankValue
FROM 
Msgs b 
)
where rankValue = 1
) x
ON 
a.TheadId = x.ThreadId
where a.AppUserId = 'd5adf925-e1ef-4da9-93c6-c0f1d659e673';



GIT

git push -u upstream --all
list all remotes
$git remote -v

git push origin


==============================
PRODUCTION BUILD & RELEASE PROCESS:::: 

ClientSide - React Steps:
1.npm run build // to build the app
2."postbuild" : "mv build ../API/wwwroot",//postbuild script in package.json
3.npm run build //rerun the command to create a new ver and move the folder into our api folder 


ServerSide - dotnet Steps
1. add config to serve static content from api project, so it can serve from local directory
2. create a fallbackcontroller

Database 
1. run postgresql container
docker run --name devPostgreSQL -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=secret -p 5432:5432 -d postgres:latest

2. dotnet install correct package
                
3. update with correct dbcontext services : opt.UseNpgsql(config.GetConnectionString("DefaultConnection"));

4. update appsettings.json with connection string: 
    "DefaultConnection": "Server=localhost; Database=reactivities; Uid=appuser; Pwd=Pa$$w0rd"

5. remove all previous migration files and perform new migration:
dotnet ef migrations add PGInitial -p Persistance -s API

how to update client packaegs
npm install // get a list of all packages
npm outdated // get a list of packages and what theyll be updated to
npm update// update the respective packages to the latest minor versions
npx npm-check-updates -u //update to the latest version <-- RISKY , need to run npm install afterwards
