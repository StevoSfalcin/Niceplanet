-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: 192.168.0.104    Database: teste
-- ------------------------------------------------------
-- Server version	5.5.5-10.6.12-MariaDB-0ubuntu0.22.04.1-log

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
-- Table structure for table `analiseAutomatica`
--

DROP TABLE IF EXISTS `analiseAutomatica`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `analiseAutomatica` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `produtorNome` varchar(100) DEFAULT NULL,
  `produtorCpf` varchar(15) DEFAULT NULL,
  `propriedadeNome` varchar(100) DEFAULT NULL,
  `car` varchar(100) DEFAULT NULL,
  `municipio` varchar(100) DEFAULT NULL,
  `uf` varchar(100) DEFAULT NULL,
  `estadoMonitoramento` int(11) DEFAULT NULL,
  `status` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `analiseAutomatica`
--

LOCK TABLES `analiseAutomatica` WRITE;
/*!40000 ALTER TABLE `analiseAutomatica` DISABLE KEYS */;
/*!40000 ALTER TABLE `analiseAutomatica` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produtores`
--

DROP TABLE IF EXISTS `produtores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `produtores` (
  `idProdutor` int(11) NOT NULL AUTO_INCREMENT,
  `registroIndividual` varchar(100) DEFAULT NULL,
  `nomeProdutor` varchar(100) DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`idProdutor`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produtores`
--

LOCK TABLES `produtores` WRITE;
/*!40000 ALTER TABLE `produtores` DISABLE KEYS */;
INSERT INTO `produtores` VALUES (1,'353.920.370-20','Manuel Theo da Mata',1),(2,'464.280.050-69','Petterson Abade',0),(3,'497.595.602-08','Evelyn Camila Raquel Ramos',1),(4,'307.878.410-05','Benjamin Bruno Nogueira',1),(5,'029.958.740-10',NULL,0),(6,'224.963.380-07','Renan Fábio Kaique Porto',1),(7,'','Daniel Vitor',1),(8,'078.573.730-87','Valentina Esther Jéssica Alves',1);
/*!40000 ALTER TABLE `produtores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `propriedades`
--

DROP TABLE IF EXISTS `propriedades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `propriedades` (
  `idPropriedade` int(11) NOT NULL AUTO_INCREMENT,
  `nomePropriedade` varchar(100) DEFAULT NULL,
  `numeroCar` varchar(100) DEFAULT NULL,
  `uf` varchar(100) DEFAULT NULL,
  `municipio` varchar(100) DEFAULT NULL,
  `pais` varchar(100) DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1 COMMENT 'Status de atividade, sendo 0 = inativo e 1 = ativo',
  `liberado` tinyint(1) NOT NULL COMMENT 'Status de liberado, sendo 0 = bloqueadp, 1 = liberado e 2 = alerta',
  PRIMARY KEY (`idPropriedade`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `propriedades`
--

LOCK TABLES `propriedades` WRITE;
/*!40000 ALTER TABLE `propriedades` DISABLE KEYS */;
INSERT INTO `propriedades` VALUES (1,'Fazenda Bela Vista','TO-15235304-5381E1396BB4E6TFBA16CA5AE14745213','TO','Palmas','Brasil',1,1),(2,'Fazenda Boi Dourado 1','PA-1714302-D3C4RFCWE4Q32E2FEWR34FCEW2E2323',NULL,'Redenção','Brasil',1,0),(3,'Fazenda Deus é Fiel',NULL,'AM','Barreirinha','Brasil',0,2),(4,'Fazenda Sol Nascente','MG-2132633-E32F45G53AC8423BRY23UBR3Y9U','MG','Belo Horizonte','Brasil',1,1),(5,NULL,'GO-5346543-FDESG45321CEWRQ543WQCWDVRE43WEQCEC','GO','Morrinhos','Brasil',1,0),(6,'Fazenda Bananal','MA-2102804-2PNU380GY64UHORJNIPM9J84Y5UHTRJFK','MA','Carolina','Brasil',0,2),(7,'Fazenda Boi Dourado 2',NULL,'TO','Porto Nacional','Brasil',1,1),(8,'Fazenda Vale Estrelado','BA-1501204-5381E32RQ4G3BWTRVE2343G5RECX3245RE','BA','Salvador','Brasil',1,0),(9,'Fazenda do Vovô José','AP-5435423-43T5YTRREG4567JYTREW435Y67YTGF3245','AP',NULL,'Brasil',1,2);
/*!40000 ALTER TABLE `propriedades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `idUsuario` int(11) NOT NULL AUTO_INCREMENT,
  `nomeUsuario` varchar(100) DEFAULT NULL,
  `emailUsuario` varchar(100) DEFAULT NULL,
  `senhaUsuario` varchar(100) DEFAULT NULL,
  `descricaoCargo` varchar(100) DEFAULT NULL,
  `industria` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Administrador','administrado@email.com','root','Administrador da NicePlanet','NicePlanet'),(2,'Denys Fernades','denysfernades@email.com','coxinha123','Desenvolvedor Mobile','NicePlanet'),(3,'Pedro Paulo','pedropaulo@email.com','pastelDeFlango',NULL,'Frigorífico 1'),(4,'Natanna Rocha','natannarocha@email.com',NULL,'Empacotadora','Curtume 1');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vinculos`
--

DROP TABLE IF EXISTS `vinculos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vinculos` (
  `idVinculo` int(11) NOT NULL AUTO_INCREMENT,
  `idPropriedade` int(11) NOT NULL,
  `idProdutor` int(11) NOT NULL,
  PRIMARY KEY (`idVinculo`),
  KEY `vinculos_FK` (`idPropriedade`),
  KEY `vinculos_FK_1` (`idProdutor`),
  CONSTRAINT `vinculos_FK` FOREIGN KEY (`idPropriedade`) REFERENCES `propriedades` (`idPropriedade`),
  CONSTRAINT `vinculos_FK_1` FOREIGN KEY (`idProdutor`) REFERENCES `produtores` (`idProdutor`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vinculos`
--

LOCK TABLES `vinculos` WRITE;
/*!40000 ALTER TABLE `vinculos` DISABLE KEYS */;
INSERT INTO `vinculos` VALUES (1,9,4),(2,1,1),(3,3,8),(4,2,4),(5,4,1),(6,4,3),(7,4,2),(8,5,6),(9,6,7),(10,7,3),(11,2,1),(12,3,5),(13,3,2),(14,5,7),(15,2,7),(16,3,1),(17,1,2),(18,1,5),(19,2,3),(20,3,5),(21,4,5);
/*!40000 ALTER TABLE `vinculos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'teste'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-10 14:53:32
