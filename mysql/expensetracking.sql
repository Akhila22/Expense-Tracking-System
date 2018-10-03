-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 24, 2017 at 11:38 AM
-- Server version: 10.1.25-MariaDB
-- PHP Version: 7.1.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `expensetracking`
--

-- --------------------------------------------------------

--
-- Table structure for table `budget`
--

CREATE TABLE `budget` (
  `financial_year` varchar(100) NOT NULL,
  `budget` bigint(20) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `budget`
--

INSERT INTO `budget` (`financial_year`, `budget`, `date`) VALUES
('FY17', 50000, '2017-08-23 13:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `category_name` varchar(100) NOT NULL,
  `user_id` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`category_name`, `user_id`, `date`, `category_id`) VALUES
('stationary', 1, '2017-08-23 13:00:00', 25),
('Travel', 1, '2017-08-23 13:00:00', 26),
('stationary', 1, '2017-08-23 13:00:00', 27),
('Teamlunch', 1, '2017-08-27 13:00:00', 28);

-- --------------------------------------------------------

--
-- Table structure for table `category_financial_year`
--

CREATE TABLE `category_financial_year` (
  `category_id` int(11) NOT NULL,
  `financial_year` varchar(100) NOT NULL,
  `initial_budget` bigint(20) NOT NULL,
  `remaining_budget` bigint(20) DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `category_financial_year`
--

INSERT INTO `category_financial_year` (`category_id`, `financial_year`, `initial_budget`, `remaining_budget`, `date`) VALUES
(25, 'FY17', 10000, 10000, '2017-08-24 09:16:43'),
(26, 'FY17', 10000, 10000, '2017-08-24 09:18:09'),
(28, 'FY17', 10000, 10000, '2017-08-24 09:19:14');

-- --------------------------------------------------------

--
-- Table structure for table `expenses`
--

CREATE TABLE `expenses` (
  `user_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `amount` bigint(20) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `description` varchar(255) DEFAULT NULL,
  `vendor_id` int(11) NOT NULL,
  `expense_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `quarterwise_budget`
--

CREATE TABLE `quarterwise_budget` (
  `financial_year` varchar(100) NOT NULL,
  `category_id` int(11) NOT NULL,
  `quarter_number` int(11) NOT NULL,
  `quarter_budget` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `quarterwise_budget`
--

INSERT INTO `quarterwise_budget` (`financial_year`, `category_id`, `quarter_number`, `quarter_budget`) VALUES
('FY17', 25, 1, 2500),
('FY17', 25, 2, 2500),
('FY17', 25, 3, 2500),
('FY17', 25, 4, 2500),
('FY17', 26, 1, 2500),
('FY17', 26, 2, 5000),
('FY17', 26, 3, 0),
('FY17', 26, 4, 2500),
('FY17', 28, 1, 2500),
('FY17', 28, 2, 5000),
('FY17', 28, 3, 0),
('FY17', 28, 4, 2500);

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `role_name` varchar(100) NOT NULL,
  `role_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`role_name`, `role_id`) VALUES
('Admin', 1),
('User', 2);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `user_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`username`, `password`, `user_id`, `role_id`) VALUES
('harshitha@ca.com', 'temp', 1, 1),
('aditya@gmail.com', 'temp', 4, 2),
('shivani@ca.com', 'temp', 6, 1),
('prasanna@ca.com', 'temp', 7, 2),
('rajesh@ca.com', 'temp', 9, 2);

-- --------------------------------------------------------

--
-- Table structure for table `vendor`
--

CREATE TABLE `vendor` (
  `vendor_id` int(11) NOT NULL,
  `vendor_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `vendor`
--

INSERT INTO `vendor` (`vendor_id`, `vendor_name`) VALUES
(2, 'amazon'),
(3, 'flipkart');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `budget`
--
ALTER TABLE `budget`
  ADD PRIMARY KEY (`financial_year`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `category_financial_year`
--
ALTER TABLE `category_financial_year`
  ADD PRIMARY KEY (`category_id`,`financial_year`);

--
-- Indexes for table `expenses`
--
ALTER TABLE `expenses`
  ADD PRIMARY KEY (`expense_id`);

--
-- Indexes for table `quarterwise_budget`
--
ALTER TABLE `quarterwise_budget`
  ADD PRIMARY KEY (`financial_year`,`category_id`,`quarter_number`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`role_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `vendor`
--
ALTER TABLE `vendor`
  ADD PRIMARY KEY (`vendor_id`),
  ADD UNIQUE KEY `vendor_name` (`vendor_name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;
--
-- AUTO_INCREMENT for table `expenses`
--
ALTER TABLE `expenses`
  MODIFY `expense_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `role_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `vendor`
--
ALTER TABLE `vendor`
  MODIFY `vendor_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `quarterwise_budget`
--
ALTER TABLE `quarterwise_budget`
  ADD CONSTRAINT `quarterwise_budget_ibfk_1` FOREIGN KEY (`financial_year`) REFERENCES `budget` (`financial_year`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
