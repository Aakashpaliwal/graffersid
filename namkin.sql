-- phpMyAdmin SQL Dump
-- version 4.8.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 22, 2019 at 11:23 AM
-- Server version: 10.1.34-MariaDB
-- PHP Version: 5.6.37

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `namkin`
--

-- --------------------------------------------------------

--
-- Table structure for table `area`
--

CREATE TABLE `area` (
  `area_id` int(11) NOT NULL,
  `area_name` varchar(255) NOT NULL,
  `area_status` int(11) NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `area`
--

INSERT INTO `area` (`area_id`, `area_name`, `area_status`) VALUES
(1, '', 0),
(2, 'area', 0),
(3, 'area2', 1),
(4, 'new indore', 1),
(5, '124545', 1),
(6, 'new indoreoo', 1),
(7, 'nnn', 1),
(8, 'nnnn', 1),
(9, 'nnnno', 1),
(10, 'new indoreoopp', 1);

-- --------------------------------------------------------

--
-- Table structure for table `company`
--

CREATE TABLE `company` (
  `company_id` int(11) NOT NULL,
  `company_name` varchar(255) NOT NULL,
  `company_detail` varchar(255) DEFAULT NULL,
  `company_mobile` varchar(13) NOT NULL,
  `company_email` varchar(255) DEFAULT NULL,
  `company_user_name` varchar(255) NOT NULL,
  `company_password` text NOT NULL,
  `company_profile_pic` text,
  `company_status` int(11) NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `company`
--

INSERT INTO `company` (`company_id`, `company_name`, `company_detail`, `company_mobile`, `company_email`, `company_user_name`, `company_password`, `company_profile_pic`, `company_status`) VALUES
(1, 'Parag Gupta', 'Parag Dinesh Gupta', '9584777922', 'guptaparag1996@gmail.com', 'parag@gmail.com', '94dcaf27d0a13076641f2940a390fd20422361265192122dca0f7a4beb47a60b', NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `day_date`
--

CREATE TABLE `day_date` (
  `day_date` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `employe`
--

CREATE TABLE `employe` (
  `employe_id` int(11) NOT NULL,
  `area_id` int(11) DEFAULT '1',
  `employe_name` varchar(255) NOT NULL,
  `employe_alias` varchar(255) DEFAULT 'e',
  `employe_mobile` varchar(13) DEFAULT NULL,
  `employe_email` varchar(255) DEFAULT NULL,
  `employe_user_name` varchar(255) DEFAULT NULL,
  `employe_password` varchar(255) DEFAULT NULL,
  `employe_profile_pic` text,
  `employe_status` int(11) NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `employe`
--

INSERT INTO `employe` (`employe_id`, `area_id`, `employe_name`, `employe_alias`, `employe_mobile`, `employe_email`, `employe_user_name`, `employe_password`, `employe_profile_pic`, `employe_status`) VALUES
(1, 0, 'Admin', '', '', '', 'ui_user_name', '692d899550cf5760becf769ea5f3a9383f7f89e2b818260a7ef35a9d9a67d78f', NULL, 1),
(2, 1, 'employwe', 'employee', '9999666666', 'employee@gmail.com', 'userrr', '47eed10c436251cc123230d02ca1df0baa72606b2472ad5cf0bf3475ee0dc82d', NULL, 0),
(3, 2, 'parag', 'par', '1234561234', 'parag567@gmail.com', 'pppppp', 'a7d23eec0740cbdeb4d58d35c344e19934297dee6263675e889e60a92764bf81', NULL, 1),
(4, 4, 'bruce wayne', 'batman', '8765058596', 'brucewayne34@gmail.com', 'batman', '94dcaf27d0a13076641f2940a390fd20422361265192122dca0f7a4beb47a60b', NULL, 1),
(5, 1, 'bnm', '', '8765059585', 'vbnm@gmail.com', '5555666311', '46011b5aab12a95bc104e3c7abc184e2d9e0bc7994159ef9b337d781db97cce0', NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `employe_inventory`
--

CREATE TABLE `employe_inventory` (
  `employe_inventory_id` int(11) NOT NULL,
  `employe_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `emp_pro_quantity` decimal(10,3) NOT NULL,
  `employe_inventory_status` int(11) NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `employe_inventory`
--

INSERT INTO `employe_inventory` (`employe_inventory_id`, `employe_id`, `product_id`, `emp_pro_quantity`, `employe_inventory_status`) VALUES
(1, 1, 1, '53.000', 1),
(2, 3, 2, '10.000', 1),
(3, 3, 1, '42.000', 1);

-- --------------------------------------------------------

--
-- Table structure for table `inventory`
--

CREATE TABLE `inventory` (
  `inventory_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `pack_multiplier` int(11) NOT NULL,
  `packaging_id` int(11) NOT NULL DEFAULT '1',
  `quantity_level` decimal(10,3) NOT NULL,
  `inventory_status` int(11) NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `inventory`
--

INSERT INTO `inventory` (`inventory_id`, `product_id`, `pack_multiplier`, `packaging_id`, `quantity_level`, `inventory_status`) VALUES
(1, 1, 12, 1, '600.000', 1),
(2, 2, 10, 1, '100.000', 1);

-- --------------------------------------------------------

--
-- Table structure for table `packaging_type`
--

CREATE TABLE `packaging_type` (
  `packaging_id` int(11) NOT NULL,
  `packaging_type` varchar(255) NOT NULL,
  `packaging_status` int(11) NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `packaging_type`
--

INSERT INTO `packaging_type` (`packaging_id`, `packaging_type`, `packaging_status`) VALUES
(1, 'BOX', 1),
(2, 'PACKET', 1),
(3, 'DOZEN', 1);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `product_id` int(11) NOT NULL,
  `product_type_id` int(11) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `product_description` text,
  `product_status` int(11) NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COMMENT='product of company of specific type';

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`product_id`, `product_type_id`, `product_name`, `product_description`, `product_status`) VALUES
(1, 3, 'UI_PRODUCT_NAME', 'ui_product_description', 1),
(2, 5, 'TEST_PRO', 'abcd', 1),
(3, 5, 'MM2', 'skghmhnnvd', 1),
(4, 6, 'NAME', 'nenenene122', 1),
(5, 5, 'AAA', 'aaa', 0);

-- --------------------------------------------------------

--
-- Table structure for table `product_at_user`
--

CREATE TABLE `product_at_user` (
  `product_at_user_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `date_dispatched` datetime NOT NULL,
  `date_arrived` datetime NOT NULL,
  `employe_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `product_at_user_status` int(11) NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `product_employe`
--

CREATE TABLE `product_employe` (
  `product_employe_id` int(11) NOT NULL,
  `employe_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `packaging_id` int(11) DEFAULT '1',
  `date_of_given_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `payment_received` varchar(11) DEFAULT '1',
  `quantity_given` decimal(10,3) NOT NULL,
  `rate_given` decimal(10,3) DEFAULT NULL,
  `total_rate_given` decimal(10,3) DEFAULT NULL,
  `total_payment` decimal(10,3) DEFAULT NULL,
  `product_employe_status` int(11) NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COMMENT='product given from godown to employe';

--
-- Dumping data for table `product_employe`
--

INSERT INTO `product_employe` (`product_employe_id`, `employe_id`, `product_id`, `packaging_id`, `date_of_given_time`, `payment_received`, `quantity_given`, `rate_given`, `total_rate_given`, `total_payment`, `product_employe_status`) VALUES
(1, 1, 1, 1, '2019-01-23 06:42:22', '', '30.000', '0.000', '0.000', '0.000', 1),
(2, 1, 1, 1, '2019-01-23 06:42:22', '', '20.000', '0.000', '0.000', '0.000', 1),
(3, 1, 2, 1, '2019-01-23 06:42:22', '', '10.000', '0.000', '0.000', '0.000', 1),
(4, 1, 1, 1, '2019-01-23 06:42:22', '', '20.000', '0.000', '0.000', '0.000', 1),
(5, 1, 2, 1, '2019-01-23 06:42:22', '', '10.000', '0.000', '0.000', '0.000', 1),
(6, 1, 1, 1, '2019-01-23 06:42:22', NULL, '10.000', '5.000', '45.000', NULL, 1),
(7, 1, 1, 1, '2019-01-23 06:42:22', NULL, '12.000', '1.000', '100.000', NULL, 1),
(8, 1, 1, 1, '2019-01-23 06:42:22', NULL, '12.000', '1.000', '100.000', NULL, 1),
(9, 1, 1, 1, '2019-01-23 06:42:22', NULL, '12.000', '1.000', '100.000', NULL, 1),
(10, 1, 1, 1, '2019-01-23 06:42:22', NULL, '12.000', '1.000', '100.000', NULL, 1),
(11, 1, 1, 1, '2019-01-23 06:42:22', NULL, '12.000', '1.000', '100.000', NULL, 1),
(12, 1, 2, 1, '2019-01-23 06:42:22', NULL, '12.000', NULL, '0.000', NULL, 1),
(13, 1, 1, 1, '2019-01-23 06:42:22', '1', '12.000', '1.000', '100.000', NULL, 1),
(14, 1, 1, 1, '2019-01-23 06:42:22', '1', '15.000', '12.000', '170.000', NULL, 1),
(15, 1, 1, 1, '2019-01-23 06:42:22', '1', '15.000', '12.000', '170.000', NULL, 1),
(16, 1, 1, 1, '2019-01-23 06:42:22', '1', '15.000', '12.000', '170.000', NULL, 1),
(17, 1, 1, 1, '2019-01-23 06:42:22', '1', '15.000', '12.000', '170.000', NULL, 1),
(18, 1, 1, 1, '2019-01-23 06:42:22', '1', '25.000', '12.000', '170.000', NULL, 1),
(19, 1, 1, 1, '2019-01-23 06:42:22', '1', '25.000', '12.000', '170.000', NULL, 1),
(20, 3, 2, 1, '2019-01-23 06:42:22', '1', '5.000', NULL, NULL, NULL, 1),
(21, 3, 2, 1, '2019-01-23 06:42:22', '1', '5.000', NULL, NULL, NULL, 1),
(22, 3, 1, 1, '2019-01-23 06:42:22', '1', '42.000', NULL, NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `product_in`
--

CREATE TABLE `product_in` (
  `product_in_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `packaging_id` int(11) DEFAULT '1',
  `product_in_unit_cost` decimal(10,3) NOT NULL,
  `product_in_quantity` decimal(10,3) DEFAULT NULL,
  `piece_quantity` int(11) NOT NULL,
  `piece_price` decimal(10,3) NOT NULL,
  `product_in_total_cost` int(11) NOT NULL,
  `date_of_coming` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `product_in_status` int(11) NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COMMENT='product that comes in godown';

--
-- Dumping data for table `product_in`
--

INSERT INTO `product_in` (`product_in_id`, `product_id`, `packaging_id`, `product_in_unit_cost`, `product_in_quantity`, `piece_quantity`, `piece_price`, `product_in_total_cost`, `date_of_coming`, `product_in_status`) VALUES
(1, 1, 1, '45.000', '50.000', 12, '4.000', 2250, '2019-01-23 06:42:22', 1),
(2, 2, 1, '340.000', '11.000', 10, '34.000', 3740, '2019-01-23 06:42:22', 1),
(3, 1, 1, '150.000', '10.000', 10, '15.000', 1500, '2019-01-23 06:42:22', 1);

-- --------------------------------------------------------

--
-- Table structure for table `product_type`
--

CREATE TABLE `product_type` (
  `product_type_id` int(11) NOT NULL,
  `product_type_description` text NOT NULL,
  `product_type_name` varchar(255) DEFAULT NULL,
  `product_type_status` int(11) NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product_type`
--

INSERT INTO `product_type` (`product_type_id`, `product_type_description`, `product_type_name`, `product_type_status`) VALUES
(3, 'Crunchy and spicy, This delicious snack is made of wholesome natural gram flour and fresh spices. With its puffy texture and peppery punch, it forms the perfect accompaniment to chai and chaat, alike.', 'GATHIYA', 1),
(4, 'A famous crisp snack, originating from Bikaner, a town in the western state of Rajasthan, it is prepared by using gram flour and spices. Its other ingredients include moth dal, salt, red chilli, black pepper, cardamom, cloves, groundnut oil, etc. ', 'BIKANERI BHUJIA', 1),
(5, 'Mukhorochak`s Masala Muri is their version of the classic Bengali Jhal Muri. Made of high quality puffed rice with ground nuts & a blend of spices, this classic Indian street side snack is an anytime favourite treat.\nThe ingredients include puffed rice (m', 'MASALA MURI', 1),
(6, 'Known for its crispiness and mouthwatering taste, this corn chiwda is appreciated across the world. The freshness and crispiness of this product lasts for long which is facilitated by air-tight packaging. This chiwda is a mixture of cornflakes, nuts', 'CORNFLAKES CHIWDA', 1),
(7, 'Altom Foods brings you the Roasted peanuts. A great snack for when you feel the munchies. Peanuts are roasted and then tossed in a special spice mix for you to enjoy great crunch and great flavour too. You won’t be able to stop munching on these and the p', 'PEANUT ROAST', 1),
(8, 'Indian snack food consisting of small pieces of crunchy noodles made from chickpea flour paste, which are seasoned with turmeric, cayenne, and ajwain before being deep-fried in oil. These noodles vary in thickness.', 'SEV', 0),
(9, 'Add2', 'ADD', 0),
(10, 'ui_product_type_description', 'UI_PRODUCT_TYPE_NAME', 1),
(11, 'cat description', 'AA', 1),
(12, 'demo desc', 'INDORI CORNFLAKES', 1);

-- --------------------------------------------------------

--
-- Table structure for table `product_user`
--

CREATE TABLE `product_user` (
  `product_user_id` int(11) NOT NULL,
  `user_product_master_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `product_id` int(11) NOT NULL,
  `packaging_id` int(11) NOT NULL,
  `employe_id` int(11) DEFAULT NULL,
  `quantity` decimal(10,3) DEFAULT NULL,
  `rate` decimal(10,3) NOT NULL,
  `total_rate` decimal(10,3) NOT NULL,
  `payment` decimal(10,3) DEFAULT NULL,
  `date_of_delivery` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `product_user_status` int(11) NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COMMENT='product given to user by employe';

--
-- Dumping data for table `product_user`
--

INSERT INTO `product_user` (`product_user_id`, `user_product_master_id`, `user_id`, `product_id`, `packaging_id`, `employe_id`, `quantity`, `rate`, `total_rate`, `payment`, `date_of_delivery`, `product_user_status`) VALUES
(2, 0, 1, 1, 1, 1, '30.000', '0.000', '0.000', NULL, '2019-01-23 06:42:22', 1),
(3, 0, 1, 1, 1, 1, '30.000', '0.000', '0.000', NULL, '2019-01-23 06:42:22', 1),
(4, 0, 1, 1, 1, 1, '25.000', '100.000', '2400.000', NULL, '2019-01-23 06:42:22', 1),
(5, 0, NULL, 2, 1, NULL, '20.000', '100.000', '2000.000', NULL, '2019-02-13 07:04:04', 1),
(6, 2, NULL, 3, 1, NULL, '20.000', '100.000', '4000.000', NULL, '2019-02-13 07:26:03', 1),
(7, 3, NULL, 3, 1, NULL, '20.000', '100.000', '1000.000', NULL, '2019-02-13 07:27:25', 1),
(8, 3, NULL, 4, 1, NULL, '20.000', '100.000', '2000.000', NULL, '2019-02-13 07:27:25', 1);

-- --------------------------------------------------------

--
-- Table structure for table `product_user_payment`
--

CREATE TABLE `product_user_payment` (
  `product_user_payment_id` int(11) NOT NULL,
  `user_product_master_id` int(11) NOT NULL,
  `recieved_payment` int(11) NOT NULL,
  `date_of_payment` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `received_by` int(11) NOT NULL,
  `product_user_payment_status` int(11) NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `return_product`
--

CREATE TABLE `return_product` (
  `return_product_id` int(11) NOT NULL,
  `employe_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `packaging_id` int(11) NOT NULL,
  `date_of_return_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `quantity_return` decimal(10,3) NOT NULL,
  `rate_return` decimal(10,3) DEFAULT NULL,
  `total_rate_return` decimal(10,3) DEFAULT NULL,
  `payment` decimal(10,3) DEFAULT '0.000',
  `return_product_status` int(11) NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COMMENT='rest product that comes in godown at evening by employe';

--
-- Dumping data for table `return_product`
--

INSERT INTO `return_product` (`return_product_id`, `employe_id`, `product_id`, `packaging_id`, `date_of_return_time`, `quantity_return`, `rate_return`, `total_rate_return`, `payment`, `return_product_status`) VALUES
(1, 1, 1, 1, '2019-01-23 06:42:22', '12.000', '1.000', '100.000', '0.000', 1),
(2, 1, 1, 1, '2019-01-23 06:42:22', '12.000', '1.000', '100.000', '0.000', 1),
(3, 1, 1, 1, '2019-01-23 06:42:22', '12.000', '1.000', '100.000', '0.000', 1),
(4, 1, 1, 1, '2019-01-23 06:42:22', '12.000', '1.000', '100.000', '0.000', 1),
(5, 1, 1, 1, '2019-01-23 06:42:22', '12.000', '1.000', '100.000', '0.000', 1),
(6, 1, 1, 1, '2019-01-23 06:42:22', '12.000', '1.000', '100.000', '0.000', 1),
(7, 1, 1, 1, '2019-01-23 06:42:22', '12.000', '1.000', '100.000', '0.000', 1),
(8, 1, 1, 1, '2019-01-23 06:42:22', '12.000', '1.000', '100.000', '0.000', 1),
(9, 1, 1, 1, '2019-01-23 06:42:22', '12.000', '1.000', '100.000', '0.000', 1);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `area_id` int(11) DEFAULT NULL,
  `user_name` varchar(255) NOT NULL,
  `user_owner_name` varchar(255) DEFAULT NULL,
  `user_mobile` varchar(13) DEFAULT NULL,
  `user_location` varchar(255) NOT NULL,
  `user_email` varchar(255) DEFAULT NULL,
  `user_latitude` varchar(10) DEFAULT NULL,
  `user_longitude` varchar(10) DEFAULT NULL,
  `user_status` int(11) NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `area_id`, `user_name`, `user_owner_name`, `user_mobile`, `user_location`, `user_email`, `user_latitude`, `user_longitude`, `user_status`) VALUES
(1, 3, 'ui_name', 'ui_owner_name', NULL, 'ui_location', NULL, NULL, NULL, 1),
(2, 3, 'ui_name2', 'ui_owner_name2', NULL, 'ui_location2', NULL, NULL, NULL, 1),
(3, 3, 'ui_name3', 'ui_owner_name3', NULL, 'ui_location3', NULL, NULL, NULL, 1),
(4, 3, 'srk', 'ui_owner_name', NULL, '', NULL, NULL, NULL, 1),
(5, 3, 'srk', 'ui_owner_name', NULL, '', NULL, NULL, NULL, 1),
(6, 3, 'srk', 'ui_owner_name', '', 'asdfh', '', NULL, NULL, 1),
(7, 3, 'srk', 'ui_owner_name', '', 'asdfh', '', NULL, NULL, 1),
(8, 3, 'shoppy', 'its me', '9898912345', '', 'shppy@gmail.com', NULL, NULL, 1),
(9, 3, 'parag test', 'test parag', '1234512345', 'location', 'paraggg@gmail.com', NULL, NULL, 0),
(10, 4, 'prakashkiranastore', 'jay', '9416582590', 'nea mandir', 'prakash45@gmail.com', '22.730728', '75.8473241', 1);

-- --------------------------------------------------------

--
-- Table structure for table `user_order`
--

CREATE TABLE `user_order` (
  `user_order_id` int(11) NOT NULL,
  `employe_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `packaging_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `quantity_required` int(11) NOT NULL,
  `rate_required` decimal(10,3) DEFAULT NULL,
  `total_rate_required` decimal(10,3) DEFAULT NULL,
  `date_of_order` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fulfillment` int(11) NOT NULL DEFAULT '0' COMMENT '1 for fullfillment',
  `fulfillment_date` timestamp NULL DEFAULT NULL,
  `user_order_status` int(11) NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_order`
--

INSERT INTO `user_order` (`user_order_id`, `employe_id`, `product_id`, `packaging_id`, `user_id`, `quantity_required`, `rate_required`, `total_rate_required`, `date_of_order`, `fulfillment`, `fulfillment_date`, `user_order_status`) VALUES
(107, 1, 1, 1, 3, 4, NULL, NULL, '2019-01-29 13:33:30', 0, NULL, 1),
(106, 1, 1, 1, 3, 4, NULL, NULL, '2019-01-29 13:33:30', 0, NULL, 1),
(105, 1, 1, 1, 3, 4, NULL, NULL, '2019-01-29 13:33:06', 0, NULL, 1),
(104, 1, 1, 1, 3, 4, NULL, NULL, '2019-01-29 11:47:12', 0, NULL, 1),
(103, 1, 1, 1, 3, 4, NULL, NULL, '2019-01-29 11:33:54', 0, NULL, 1),
(102, 1, 1, 1, 3, 4, NULL, NULL, '2019-01-29 11:24:35', 0, NULL, 1),
(101, 1, 1, 1, 3, 4, NULL, NULL, '2019-01-29 11:23:08', 0, NULL, 1),
(100, 1, 1, 1, 3, 4, NULL, NULL, '2019-01-29 11:18:44', 0, NULL, 1),
(99, 1, 1, 1, 3, 4, NULL, NULL, '2019-01-29 11:11:06', 0, NULL, 1),
(98, 1, 1, 1, 3, 4, NULL, NULL, '2019-01-29 11:08:39', 0, NULL, 1),
(97, 1, 1, 1, 3, 42, NULL, NULL, '2019-01-29 11:07:03', 0, NULL, 1),
(96, 1, 1, 1, 3, 42, NULL, NULL, '2019-01-29 11:06:13', 0, NULL, 1),
(95, 1, 1, 1, 3, 42, NULL, NULL, '2019-01-29 10:53:03', 0, NULL, 1),
(94, 1, 1, 1, 3, 42, NULL, NULL, '2019-01-29 10:51:36', 0, NULL, 1),
(93, 1, 1, 1, 3, 42, NULL, NULL, '2019-01-29 10:50:24', 0, NULL, 1),
(92, 1, 1, 1, 3, 42, NULL, NULL, '2019-01-29 10:49:57', 0, NULL, 1),
(91, 1, 1, 1, 3, 42, NULL, NULL, '2019-01-29 09:27:08', 0, NULL, 1),
(90, 1, 1, 1, 3, 42, NULL, NULL, '2019-01-29 09:24:38', 0, NULL, 1),
(89, 1, 1, 1, 3, 2, NULL, NULL, '2019-01-25 10:56:52', 0, NULL, 1),
(88, 1, 1, 1, 3, 2, NULL, NULL, '2019-01-25 10:56:52', 0, NULL, 1),
(87, 1, 1, 1, 3, 2, NULL, NULL, '2019-01-25 10:20:06', 0, NULL, 1),
(86, 1, 1, 1, 3, 2, NULL, NULL, '2019-01-25 10:20:06', 0, NULL, 1),
(85, 1, 1, 1, 3, 2, NULL, NULL, '2019-01-25 10:11:25', 0, NULL, 1),
(84, 1, 1, 1, 3, 2, NULL, NULL, '2019-01-25 10:10:13', 0, NULL, 1),
(83, 1, 1, 1, 3, 2, NULL, NULL, '2019-01-25 10:09:00', 0, NULL, 1),
(82, 1, 1, 1, 3, 92, NULL, NULL, '2019-01-25 10:07:08', 0, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `user_product_master`
--

CREATE TABLE `user_product_master` (
  `user_product_master_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `employe_id` int(11) NOT NULL,
  `total_payment` decimal(10,3) DEFAULT NULL,
  `date_of_delivery` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_product_master_status` int(11) NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_product_master`
--

INSERT INTO `user_product_master` (`user_product_master_id`, `user_id`, `employe_id`, `total_payment`, `date_of_delivery`, `user_product_master_status`) VALUES
(1, 1, 1, NULL, '2019-02-11 07:04:02', 1),
(2, 2, 1, '4000.000', '2019-02-12 07:26:03', 1),
(3, 1, 1, '4000.000', '2019-02-13 07:27:25', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `area`
--
ALTER TABLE `area`
  ADD PRIMARY KEY (`area_id`);

--
-- Indexes for table `company`
--
ALTER TABLE `company`
  ADD PRIMARY KEY (`company_id`);

--
-- Indexes for table `employe`
--
ALTER TABLE `employe`
  ADD PRIMARY KEY (`employe_id`),
  ADD KEY `employe_fk0` (`area_id`);

--
-- Indexes for table `employe_inventory`
--
ALTER TABLE `employe_inventory`
  ADD PRIMARY KEY (`employe_inventory_id`);

--
-- Indexes for table `inventory`
--
ALTER TABLE `inventory`
  ADD PRIMARY KEY (`inventory_id`),
  ADD KEY `inventory_fk0` (`product_id`);

--
-- Indexes for table `packaging_type`
--
ALTER TABLE `packaging_type`
  ADD PRIMARY KEY (`packaging_id`),
  ADD UNIQUE KEY `packaging_type` (`packaging_type`,`packaging_status`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `product_at_user`
--
ALTER TABLE `product_at_user`
  ADD PRIMARY KEY (`product_at_user_id`),
  ADD KEY `product_at_user_fk0` (`user_id`);

--
-- Indexes for table `product_employe`
--
ALTER TABLE `product_employe`
  ADD PRIMARY KEY (`product_employe_id`),
  ADD KEY `product_employe_fk0` (`employe_id`),
  ADD KEY `product_employe_fk1` (`product_id`);

--
-- Indexes for table `product_in`
--
ALTER TABLE `product_in`
  ADD PRIMARY KEY (`product_in_id`),
  ADD KEY `product_fk0` (`product_id`);

--
-- Indexes for table `product_type`
--
ALTER TABLE `product_type`
  ADD PRIMARY KEY (`product_type_id`);

--
-- Indexes for table `product_user`
--
ALTER TABLE `product_user`
  ADD PRIMARY KEY (`product_user_id`);

--
-- Indexes for table `product_user_payment`
--
ALTER TABLE `product_user_payment`
  ADD PRIMARY KEY (`product_user_payment_id`);

--
-- Indexes for table `return_product`
--
ALTER TABLE `return_product`
  ADD PRIMARY KEY (`return_product_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `user_order`
--
ALTER TABLE `user_order`
  ADD PRIMARY KEY (`user_order_id`);

--
-- Indexes for table `user_product_master`
--
ALTER TABLE `user_product_master`
  ADD PRIMARY KEY (`user_product_master_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `area`
--
ALTER TABLE `area`
  MODIFY `area_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `company`
--
ALTER TABLE `company`
  MODIFY `company_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `employe`
--
ALTER TABLE `employe`
  MODIFY `employe_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `employe_inventory`
--
ALTER TABLE `employe_inventory`
  MODIFY `employe_inventory_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `inventory`
--
ALTER TABLE `inventory`
  MODIFY `inventory_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `packaging_type`
--
ALTER TABLE `packaging_type`
  MODIFY `packaging_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `product_at_user`
--
ALTER TABLE `product_at_user`
  MODIFY `product_at_user_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product_employe`
--
ALTER TABLE `product_employe`
  MODIFY `product_employe_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `product_in`
--
ALTER TABLE `product_in`
  MODIFY `product_in_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `product_type`
--
ALTER TABLE `product_type`
  MODIFY `product_type_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `product_user`
--
ALTER TABLE `product_user`
  MODIFY `product_user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `product_user_payment`
--
ALTER TABLE `product_user_payment`
  MODIFY `product_user_payment_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `return_product`
--
ALTER TABLE `return_product`
  MODIFY `return_product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `user_order`
--
ALTER TABLE `user_order`
  MODIFY `user_order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=108;

--
-- AUTO_INCREMENT for table `user_product_master`
--
ALTER TABLE `user_product_master`
  MODIFY `user_product_master_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
