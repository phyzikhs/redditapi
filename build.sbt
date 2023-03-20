ThisBuild / version := "0.1.0-SNAPSHOT"

ThisBuild / scalaVersion := "2.13.10"

lazy val root = (project in file("."))
  .settings(
    name := "redditapi",
    idePackagePrefix := Some("com.ngelemar.redditapi"),
    libraryDependencies += "javax" %% "inject" % "1.7.0"
  )

