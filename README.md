## Starter app

This starter app is designed as a best-practices example of dotnet web services

### Build with dotnet

```
dotnet restore
dotnet build
dotnet run
```

### build with docker

```
cd MenuApi
docker build . -t burgers
docker run -p 8888:80 burgers
```
