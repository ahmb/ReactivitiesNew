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