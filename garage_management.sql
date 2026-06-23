-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: localhost    Database: garage_management
-- ------------------------------------------------------
-- Server version	9.7.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ 'c098f9db-50e9-11f1-aa0c-f44d30bc0ed6:1-173';

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `mobile` varchar(15) NOT NULL,
  `address` text,
  `notes` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (16,'Akshay','7770002344','Bhatpada chandansar road','','2026-06-22 09:49:16');
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoice_items`
--

DROP TABLE IF EXISTS `invoice_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoice_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `invoice_id` int NOT NULL,
  `item_name` varchar(255) DEFAULT NULL,
  `qty` int DEFAULT '1',
  `rate` decimal(10,2) DEFAULT NULL,
  `total` decimal(10,2) DEFAULT NULL,
  `item_type` enum('Part','Labour') DEFAULT 'Part',
  PRIMARY KEY (`id`),
  KEY `invoice_id` (`invoice_id`),
  CONSTRAINT `invoice_items_ibfk_1` FOREIGN KEY (`invoice_id`) REFERENCES `invoices` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoice_items`
--

LOCK TABLES `invoice_items` WRITE;
/*!40000 ALTER TABLE `invoice_items` DISABLE KEYS */;
INSERT INTO `invoice_items` VALUES (4,2,'Sparkplug',1,500.00,500.00,'Part'),(5,2,'Bulb',1,100.00,100.00,'Part'),(6,2,'Labour',1,1000.00,1000.00,'Labour');
/*!40000 ALTER TABLE `invoice_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoices`
--

DROP TABLE IF EXISTS `invoices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoices` (
  `id` int NOT NULL AUTO_INCREMENT,
  `invoice_no` varchar(50) DEFAULT NULL,
  `customer_id` int NOT NULL,
  `vehicle_id` int NOT NULL,
  `job_card_id` int DEFAULT NULL,
  `total_amount` decimal(10,2) DEFAULT '0.00',
  `paid_amount` decimal(10,2) DEFAULT '0.00',
  `balance_amount` decimal(10,2) DEFAULT '0.00',
  `status` enum('Unpaid','Partial','Paid') DEFAULT 'Unpaid',
  `notes` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `invoice_no` (`invoice_no`),
  KEY `customer_id` (`customer_id`),
  KEY `vehicle_id` (`vehicle_id`),
  KEY `job_card_id` (`job_card_id`),
  CONSTRAINT `invoices_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE,
  CONSTRAINT `invoices_ibfk_2` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles` (`id`) ON DELETE CASCADE,
  CONSTRAINT `invoices_ibfk_3` FOREIGN KEY (`job_card_id`) REFERENCES `job_cards` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoices`
--

LOCK TABLES `invoices` WRITE;
/*!40000 ALTER TABLE `invoices` DISABLE KEYS */;
INSERT INTO `invoices` VALUES (2,'INV-2026-000001',16,11,NULL,1600.00,0.00,1600.00,'Unpaid','','2026-06-22 11:30:48');
/*!40000 ALTER TABLE `invoices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_cards`
--

DROP TABLE IF EXISTS `job_cards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_cards` (
  `id` int NOT NULL AUTO_INCREMENT,
  `quotation_id` int DEFAULT NULL,
  `customer_id` int NOT NULL,
  `vehicle_id` int NOT NULL,
  `job_card_no` varchar(50) DEFAULT NULL,
  `date_in` datetime DEFAULT CURRENT_TIMESTAMP,
  `status` enum('Open','In Progress','Waiting Parts','Ready Delivery','Delivered') DEFAULT 'Open',
  `notes` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `delivery_date` datetime DEFAULT NULL,
  `estimated_cost` decimal(10,2) DEFAULT '0.00',
  `current_km` int DEFAULT '0',
  `complaint` text,
  `diagnosis` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `job_card_no` (`job_card_no`),
  KEY `job_cards_ibfk_2` (`customer_id`),
  KEY `job_cards_ibfk_1` (`quotation_id`),
  KEY `job_cards_ibfk_3` (`vehicle_id`),
  CONSTRAINT `job_cards_ibfk_1` FOREIGN KEY (`quotation_id`) REFERENCES `quotations` (`id`) ON DELETE CASCADE,
  CONSTRAINT `job_cards_ibfk_2` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE,
  CONSTRAINT `job_cards_ibfk_3` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_cards`
--

LOCK TABLES `job_cards` WRITE;
/*!40000 ALTER TABLE `job_cards` DISABLE KEYS */;
/*!40000 ALTER TABLE `job_cards` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_work_items`
--

DROP TABLE IF EXISTS `job_work_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_work_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `job_card_id` int NOT NULL,
  `work_name` varchar(255) DEFAULT NULL,
  `work_type` enum('Labour','Part') DEFAULT 'Labour',
  `qty` int DEFAULT '1',
  `rate` decimal(10,2) DEFAULT NULL,
  `total` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `job_card_id` (`job_card_id`),
  CONSTRAINT `job_work_items_ibfk_1` FOREIGN KEY (`job_card_id`) REFERENCES `job_cards` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_work_items`
--

LOCK TABLES `job_work_items` WRITE;
/*!40000 ALTER TABLE `job_work_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `job_work_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `job_card_id` int DEFAULT NULL,
  `customer_id` int DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `payment_mode` varchar(50) DEFAULT NULL,
  `payment_status` varchar(20) DEFAULT 'Pending',
  `payment_date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
INSERT INTO `payments` VALUES (1,2,14,5000.00,'Cash','Paid','2026-06-20 17:17:48');
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `photos`
--

DROP TABLE IF EXISTS `photos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `photos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `job_card_id` int NOT NULL,
  `photo_type` enum('Before','After','Work Progress') DEFAULT NULL,
  `photo_path` varchar(500) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `job_card_id` (`job_card_id`),
  CONSTRAINT `photos_ibfk_1` FOREIGN KEY (`job_card_id`) REFERENCES `job_cards` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `photos`
--

LOCK TABLES `photos` WRITE;
/*!40000 ALTER TABLE `photos` DISABLE KEYS */;
/*!40000 ALTER TABLE `photos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quotation_items`
--

DROP TABLE IF EXISTS `quotation_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quotation_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `quotation_id` int NOT NULL,
  `item_name` varchar(255) DEFAULT NULL,
  `qty` int DEFAULT '1',
  `rate` decimal(10,2) DEFAULT NULL,
  `total` decimal(10,2) DEFAULT NULL,
  `item_type` enum('Labour','Part') DEFAULT 'Part',
  PRIMARY KEY (`id`),
  KEY `quotation_id` (`quotation_id`),
  CONSTRAINT `quotation_items_ibfk_1` FOREIGN KEY (`quotation_id`) REFERENCES `quotations` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quotation_items`
--

LOCK TABLES `quotation_items` WRITE;
/*!40000 ALTER TABLE `quotation_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `quotation_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quotations`
--

DROP TABLE IF EXISTS `quotations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quotations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int NOT NULL,
  `vehicle_id` int NOT NULL,
  `quotation_no` varchar(50) DEFAULT NULL,
  `total_amount` decimal(10,2) DEFAULT '0.00',
  `status` enum('Draft','Sent','Approved','Rejected','Converted') DEFAULT 'Draft',
  `notes` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `approved_at` datetime DEFAULT NULL,
  `validity_days` int DEFAULT '7',
  PRIMARY KEY (`id`),
  UNIQUE KEY `quotation_no` (`quotation_no`),
  KEY `quotations_ibfk_1` (`customer_id`),
  KEY `quotations_ibfk_2` (`vehicle_id`),
  CONSTRAINT `quotations_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE,
  CONSTRAINT `quotations_ibfk_2` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quotations`
--

LOCK TABLES `quotations` WRITE;
/*!40000 ALTER TABLE `quotations` DISABLE KEYS */;
/*!40000 ALTER TABLE `quotations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vehicle_inspections`
--

DROP TABLE IF EXISTS `vehicle_inspections`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vehicle_inspections` (
  `id` int NOT NULL AUTO_INCREMENT,
  `job_card_id` int NOT NULL,
  `km_reading` int DEFAULT NULL,
  `fuel_level` varchar(20) DEFAULT NULL,
  `battery_status` varchar(50) DEFAULT NULL,
  `tyre_status` varchar(50) DEFAULT NULL,
  `brake_status` varchar(50) DEFAULT NULL,
  `ac_status` varchar(50) DEFAULT NULL,
  `lights_status` varchar(50) DEFAULT NULL,
  `notes` text,
  PRIMARY KEY (`id`),
  KEY `job_card_id` (`job_card_id`),
  CONSTRAINT `vehicle_inspections_ibfk_1` FOREIGN KEY (`job_card_id`) REFERENCES `job_cards` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehicle_inspections`
--

LOCK TABLES `vehicle_inspections` WRITE;
/*!40000 ALTER TABLE `vehicle_inspections` DISABLE KEYS */;
/*!40000 ALTER TABLE `vehicle_inspections` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vehicles`
--

DROP TABLE IF EXISTS `vehicles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vehicles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int NOT NULL,
  `vehicle_number` varchar(20) NOT NULL,
  `vehicle_model` varchar(100) DEFAULT NULL,
  `vehicle_make` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `km_reading` int DEFAULT '0',
  `fuel_level` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `vehicle_number` (`vehicle_number`),
  KEY `vehicles_ibfk_1` (`customer_id`),
  CONSTRAINT `vehicles_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehicles`
--

LOCK TABLES `vehicles` WRITE;
/*!40000 ALTER TABLE `vehicles` DISABLE KEYS */;
INSERT INTO `vehicles` VALUES (11,16,'MH04BK0704','Interceptor 650','Royal Enfield','2026-06-22 09:49:16',28000,'3');
/*!40000 ALTER TABLE `vehicles` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-06-22 18:05:47
