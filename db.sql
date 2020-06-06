-- MySQL dump 10.13  Distrib 8.0.19, for Linux (x86_64)
--
-- Host: localhost    Database: footytrivia_db
-- ------------------------------------------------------
-- Server version	8.0.19-0ubuntu5

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
-- Table structure for table `questions`
--

DROP TABLE IF EXISTS `questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `questions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `question` varchar(256) DEFAULT NULL,
  `opt1` varchar(128) DEFAULT NULL,
  `opt2` varchar(128) DEFAULT NULL,
  `opt3` varchar(128) DEFAULT NULL,
  `opt4` varchar(128) DEFAULT NULL,
  `answer` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=108 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questions`
--

LOCK TABLES `questions` WRITE;
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;
INSERT INTO `questions` VALUES (1,'What is the home stadium of Chelsea FC?','Anfield','Old Trafford','Emirates','Stamford Bridge','Stamford Bridge'),(77,'Which player holds the record for most Premier League appearances?','Ryan Giggs','Tony Adams','Jamie Carragher','Paul Scholes','Ryan Giggs'),(78,'\"Which English player from the following has played for Middlesborough',' Liverpool and West Ham? \"','Andy Carroll','Stewart Downing','Harry Kewell','Joe Hart'),(79,'Liverpool won the UEFA Champions League final against AC Milan in 2005. Which player’s penalty was saved resulting in victory?','Andriy Shevchenko','Kaka','Alessandro Nesta','Hernan Crespo','Andriy Shevchenko'),(80,'Which player made the famous backheel assist for Karim Benzema against Deportiva La Coruna?','Mesut Ozil','Raul','Guti','Cristiano Ronaldo','Guti'),(81,'Which of the following players have won a club’s Player of the Year Award 4 years in a row for the same Premier League club?','Steven Gerrard','Ryan Giggs','Richard Dunne','John Terry','Richard Dunne'),(82,'\"Which of the following player has played for Chelsea',' Bayern Munich and Real Madrid?\"','Michael Ballack','Deco','Arjen Robben','Wesley Sneijder'),(83,'Which player holds the record for quickest goal in the Premier League?','Peter Crouch','Christian Eriksen','Shane Long','Alan Shearer ','Shane Long'),(84,'Which of the following players has won both Serie A and Serie B with Juventus?','Gianluca Zambrotta','Fabio Cannavaro','Andrea Pirlo','David Trezeguet','David Trezeguet'),(85,'Who won the UEFA Champions league in 1996-97 season?','Borussia Dortmund','Juventus','Manchester United','Ajax','Borussia Dortmund'),(86,'Which player holds the record for most goals in a single Premier League season?','Cristiano Ronaldo','Luis Suarez','Robin Van Persie','Mohamed Salah','Mohamed Salah'),(87,'Which of the following players scored the infamous ‘Ghost Goal’ against Chelsea in 2004-05 champions league semi final?','Milan Baros','Luis Garcia','Harry Kewell','Dietmar Hamann','Luis Garcia'),(88,'Which player holds the record for scoring in most consecutive Premier League games?','Daniel Sturridge','Didier Drogba','Jamie Vardy','Wayne Rooney','Jamie Vardy'),(89,'Alan Shearer holds the record for most Premier League goals. How many Premier League goals did he score?','250','260','270','240','260'),(90,'Arsenal did not lost a single match in the 2003-04 season. Which player won Premier League Player of the Season award that season?','Jens Lehmann','Patrick Vieira','Thierry Henry','Robert Pires','Thierry Henry'),(91,'Which player holds the record for most red cards in the Premier League?','Nemanja Vidic','John Terry','Joey Barton','Duncan Ferguson','Duncan Ferguson'),(92,'Watford defeated Leicester in 2013 FL Championship Playoff semi final with a last moment goal immediately after Leicester City missed a penalty. Which Leicester Player missed the penalty?','Andy King','Anthony Knockaert','Jamie Vardy','Leandro Ulloa','Anthony Knockaert'),(93,'Which of the following clubs has not played in every single La Liga season since the inception of the competition?','Barcelona','Real Madrid','Athletic Bilbao','Atletico Madrid','Atletico Madrid'),(94,'Which player holds the record for most assists every in La Liga?','Lionel Messi','Cristiano Ronaldo','Karim Benzema ','Koke','Lionel Messi');
/*!40000 ALTER TABLE `questions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-05-17 18:55:30
