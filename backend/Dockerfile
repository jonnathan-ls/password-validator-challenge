FROM maven:3.9.9-eclipse-temurin-21-alpine AS build

WORKDIR /backend

COPY pom.xml .

RUN mvn dependency:go-offline

COPY src ./src

RUN mvn clean package

FROM eclipse-temurin:21-jre-alpine

RUN adduser -S api

WORKDIR /backend

COPY --from=build /backend/target/*.jar ./pwd-validor-api.jar

RUN chown -R api /backend

USER api

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "pwd-validor-api.jar"]
