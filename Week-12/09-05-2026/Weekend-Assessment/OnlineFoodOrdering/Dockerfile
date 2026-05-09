# Stage 1 – Build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY ["src/FoodOrdering.Web/FoodOrdering.Web.csproj", "FoodOrdering.Web/"]
COPY ["src/FoodOrdering.Core/FoodOrdering.Core.csproj", "FoodOrdering.Core/"]
COPY ["src/FoodOrdering.Infrastructure/FoodOrdering.Infrastructure.csproj", "FoodOrdering.Infrastructure/"]

RUN dotnet restore "FoodOrdering.Web/FoodOrdering.Web.csproj"

COPY src/ .

RUN dotnet build "FoodOrdering.Web/FoodOrdering.Web.csproj" -c Release -o /app/build
RUN dotnet publish "FoodOrdering.Web/FoodOrdering.Web.csproj" -c Release -o /app/publish

# Stage 2 – Runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
EXPOSE 80
EXPOSE 443
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "FoodOrdering.Web.dll"]