FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build-env
WORKDIR /app

# copy everything and build the project
COPY . ./
RUN dotnet restore API/*.csproj
RUN dotnet publish API/*.csproj -c Release -o out

# build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=build-env /app/API/out ./
ENTRYPOINT ["dotnet", "API.dll"]
EXPOSE 5000
