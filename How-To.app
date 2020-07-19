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