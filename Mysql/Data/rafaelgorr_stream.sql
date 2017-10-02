-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: rafaelgorr
-- ------------------------------------------------------
-- Server version	5.7.19-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `stream`
--

DROP TABLE IF EXISTS `stream`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stream` (
  `idStream` int(11) NOT NULL AUTO_INCREMENT,
  `idSensor` int(11) DEFAULT NULL,
  `idUnit` varchar(45) DEFAULT NULL,
  `_key` varchar(45) DEFAULT NULL,
  `label` varchar(45) DEFAULT NULL,
  `enabled` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`idStream`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stream`
--

LOCK TABLES `stream` WRITE;
/*!40000 ALTER TABLE `stream` DISABLE KEYS */;
INSERT INTO `stream` VALUES (1,11,'1','QYRju4mio31e9PtECM6bwUzwnEfViVfhNxUF3brwYeaE','temperature',1),(2,11,'2','UqxppGtwb8g9Vi7N13bjZKrv4L1x8PQoVDwY32URHYuA','temperature',1),(3,11,'3','CLFZAHTe7oS9Aq8yGywrBnjL6EHucFcZm5keHupUaReC','temperature',1),(4,11,'4','NsSvfbxvCgGMmPAJaRCHDHVpaQyZhE1w7u5BK3fGomaH','temperature',1),(5,11,'5','P4DYR2UeNoQznaZJ4yBSA9fYxknTMvekNCpDF5RZz5L6','temperature',1),(6,8,'5','8dExahNeVei9ACb8SxRuoDDn6vVw3HfkfX9pH8cjNqu8','temperature',1),(7,8,'5','UFtdJVemtaZu7HoUQDRrpraJnGVmNgQXezfWKkDHkxp5','temperature',1),(8,8,'5','XeCWT1Eb7vimvRLN4wNTnTHxXBiMRrfVLrzrEuf8WxtB','temperature',1),(9,8,'5','Sg8v7KRroCRxMuxLozA5ApjDB5F4g8zTGDP7HnemygeC','temperature',1),(10,10,'5','6BXcsXN3wrS1xqPADbAfaqDz1b8i4RoU8K3Si3MLdCfA','temperature',1),(11,10,'5','5LA6yNYL46T3SfWWHDs8tZqaKiaHSRQKpFfu7HP4hSh8','temperature',1),(12,10,'5','V7yX7QCKXPskKgVMEDDZaA4ZEzFtP8LLCuZoQLB1mfG7','temperature',1),(13,10,'5','DKCVYRUs7a7QkPJWSVFrDswmfp554io91cq2PvTi9Lu6','temperature',1);
/*!40000 ALTER TABLE `stream` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-09-29 22:45:11
