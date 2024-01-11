-- MySQL dump 10.13  Distrib 8.0.35, for Linux (x86_64)
--
-- Host: localhost    Database: leaf
-- ------------------------------------------------------
-- Server version	8.0.35-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `labs`
--

DROP TABLE IF EXISTS `labs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `labs` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `exist` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `labs`
--

LOCK TABLES `labs` WRITE;
/*!40000 ALTER TABLE `labs` DISABLE KEYS */;
INSERT INTO `labs` VALUES (1,'菅原研究室',1),(2,'永井研究室',1),(3,'竹端研究室',1),(4,'吉田研究室',1),(5,'関東研究室',1);
/*!40000 ALTER TABLE `labs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` bigint unsigned NOT NULL,
  `user_id` int NOT NULL,
  `lab_id` int DEFAULT NULL,
  `contents` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,1,NULL,'あいうえお'),(2,1,NULL,'かきくけこ'),(3,1,NULL,'さしすせそ'),(4,2,NULL,'たちつてと'),(5,2,NULL,'なにぬねの'),(6,1,NULL,'はひふへほ');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `student_num` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `lab_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,NULL,NULL,'k00000@tck.ac.jp','$2b$10$NKJspRJAlr7ucciaW3N4we6xV1Ja.d42KaDELvYFfcPRgIxpoqGK6',1),(2,NULL,NULL,'test@tck.ac.jp','$2b$10$SYbenqkmGh079uHT.YG.A.q9Ize34gQsKiQmRb3nY4io35xm0d6ri',NULL),(3,NULL,NULL,'k00001@tck.ac.jp','$2b$10$CPavGZ9wybGGlpb0n7BSYeM0l7hGvoaPjnrnbXk1NHTD6n2R1QBCm',NULL),(4,NULL,NULL,'k00002@tck.ac.jp','$2b$10$7xq.Vsw8U93WV1bxu3qv9ermc8W8jRAizLpgxGMNNMj4inEj0M8Ri',1),(5,NULL,NULL,'k00003@tck.ac.jp','$2b$10$RUCJI6h11uQjxtLaZuo8VOJ4oufSq1kEgolS3AJfUueF87s4.uIbq',2),(6,NULL,NULL,'k00004@tck.ac.jp','$2b$10$bu/LDwwN0z7I9.23.urqQ.DmNTNpGa5a3FgtoUgXyYfw9fJQOcRVK',NULL),(7,NULL,NULL,'k00005@tck.ac.jp','$2b$10$sbgKWx0p.jHHr1uSEn9DhupKqat1DBE7EOxlamgZGxV2.IqzspRSW',NULL),(8,NULL,NULL,'k00006@tck.ac.jp','$2b$10$cHJl9PKNsrDi.5C5hAy0Mus7RYJwSkYiNOYOwv.SExFCyjb.Ta9Le',NULL),(9,NULL,NULL,'k00007@tck.ac.jp','$2b$10$K1gIQYI5ezfkXzlLZ3HASOKJFltPSqNHbKOmSFHaU/eS.AjeG0IAO',5),(10,NULL,NULL,'k00008@tck.ac.jp','$2b$10$UWOlWKb.LMSMmmk1W1UMkOPJJyezH8MuPFb5vjKEcTZyU3.ZzZUCy',NULL),(11,NULL,NULL,'k00009@tck.ac.jp','$2b$10$.otrI./mM183mtVSsQ7v/.LaK0E9eI.9pwiQUU7wpFgb5/ERigOqa',NULL),(12,NULL,NULL,'k00010@tck.ac.jp','$2b$10$wQtytnJFE.jiqF1scAR08.KHdoJGlZGkSQFNLbjXCVcVcUBUyNZ5i',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-22 14:14:11
