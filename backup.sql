-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Aug 06, 2026 at 08:08 AM
-- Server version: 8.4.3
-- PHP Version: 8.3.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `content_event_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `comment_id` int NOT NULL,
  `event_id` int NOT NULL,
  `user_id` int NOT NULL,
  `content` text NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`comment_id`, `event_id`, `user_id`, `content`, `created_at`, `updated_at`) VALUES
(1, 3, 5, 'asdjhbsahdvajhd', '2025-12-10 19:53:19', '2025-12-10 19:53:19'),
(2, 4, 5, 'sadhjbasdjhbasdjk', '2025-12-11 01:49:29', '2025-12-11 01:49:29');

-- --------------------------------------------------------

--
-- Table structure for table `eventrequests`
--

CREATE TABLE `eventrequests` (
  `id` int NOT NULL,
  `organizer_name` varchar(255) NOT NULL,
  `event_title` varchar(255) NOT NULL,
  `department` varchar(255) NOT NULL,
  `event_date` datetime NOT NULL,
  `venue` varchar(255) NOT NULL,
  `purpose` text NOT NULL,
  `proposal_file` varchar(255) DEFAULT NULL,
  `status` enum('Pending','Approved','Denied') NOT NULL DEFAULT 'Pending',
  `remarks` text,
  `user_id` int NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `event_end_date` datetime NOT NULL,
  `event_images` json DEFAULT NULL,
  `event_video` varchar(255) DEFAULT NULL,
  `is_expired` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Stores event requests submitted by departments or organizers';

--
-- Dumping data for table `eventrequests`
--

INSERT INTO `eventrequests` (`id`, `organizer_name`, `event_title`, `department`, `event_date`, `venue`, `purpose`, `proposal_file`, `status`, `remarks`, `user_id`, `created_at`, `updated_at`, `event_end_date`, `event_images`, `event_video`, `is_expired`) VALUES
(1, 'Test Organizer', 'CSS DAY', 'CSS', '2025-11-26 23:30:00', 'gym', 'asdawedwerf', NULL, 'Approved', NULL, 4, '2025-11-27 01:37:29', '2025-11-27 02:49:19', '2025-11-27 04:00:00', NULL, NULL, 1),
(2, 'john doe', 'HM Day', 'hm', '2025-12-04 21:00:00', 'GYM', 'qwertysdfsjnfkjnfjkdnsfkjnsfjeadfbjsbfskdbncksdnchjsdbdwedbhjbcuiehbf chubjwhefbusabsjdfs', '/uploads/1764897726757_BiliRoxas_1.docx', 'Approved', NULL, 3, '2025-12-05 01:22:06', '2025-12-05 01:24:18', '2025-12-06 10:00:00', NULL, NULL, 1),
(3, 'john doe', 'General meeting', 'HM', '2025-12-07 14:00:00', 'Quadrangle', 'sahgdvaghdvwhdbaondadjhbdhjabdhjabdhjbdjhavbdkjabdkjabndkjabdkjabsdakjhsbdhajsbdahjbdjhabjhabdhjabdhjabdhjabdjhabdjhabdhjabdjhabdjhawbdhjabdjhabdjhabhjsemdkabhvbaihcsdcioahbchjdkijabdijabchvajdbshcbjsbiohsefbrsuiohfoivjmpnjeiuheriufnxygdiuwhndiuqwhdiaqwhidnhfkjhsefsihdbusfbedhjbfeidbsbefhsbfh', '/uploads/1764913427270_33zzi_1764897726757_BiliRoxas_1.docx', 'Approved', NULL, 3, '2025-12-05 05:43:47', '2025-12-05 05:44:33', '2025-12-08 02:00:00', '[\"/uploads/1764913427187_s05787_Untitled_diagram-2025-12-01-223731.png\", \"/uploads/1764913427248_xj7jjl_boss.jpg\", \"/uploads/1764913427250_rivhk7n_profile.png\", \"/uploads/1764913427269_pfj71o_OIP.jpg\", \"/uploads/1764913427269_uspn5_gtr.jpg.jpg\"]', NULL, 1),
(4, 'Test Organizer', 'wydfuwagdbajsfsdjns', 'CBM', '2025-12-10 14:00:00', 'Gymnasium', 'sdbjfjisdbfsjdbfsd', '/uploads/1765417393925_zt31op_1764913427270_33zzi_1764897726757_BiliRoxas_1_(1).docx', 'Approved', NULL, 4, '2025-12-11 01:43:13', '2025-12-11 01:44:35', '2025-12-11 02:00:00', '[\"/uploads/1765417393846_s6q8vo_joy.webp\"]', '/uploads/1765417393852_sozns8a_Corporate_Event_Videography___Same_Day_Edit_1___Sugar_&_Tea_Philippines___Skyworth_Global.mp4', 1),
(5, 'Test Organizer', 'general meeting', 'CBM', '2025-12-14 14:00:00', 'Main Campus', 'asvdysadyasduysadyuaduahvduhsabdahusbdahj', '/uploads/1765431713918_fcfzed_1765417393925_zt31op_1764913427270_33zzi_1764897726757_BiliRoxas_1_(1)_(1).docx', 'Approved', NULL, 4, '2025-12-11 05:41:53', '2026-05-15 07:48:43', '2025-12-15 02:00:00', '[\"/uploads/1765431713826_70ides_mustang.jpg\"]', '/uploads/1765431713834_tfumf8_Corporate_Event_Videography___Same_Day_Edit_1___Sugar_&_Tea_Philippines___Skyworth_Global.mp4', 1),
(6, 'Test Organizer', 'trewqewert', 'CSS', '2025-12-11 13:00:00', 'Main Campus', 'wjyegdyjwgedjwegdkweukwejwjedhgwedgwjhgdhje', '/uploads/1765442043522_wmzkpb_1765417393925_zt31op_1764913427270_33zzi_1764897726757_BiliRoxas_1_(1).docx', 'Approved', NULL, 4, '2025-12-11 08:34:03', '2026-05-15 07:48:43', '2025-12-12 01:00:00', '[\"/uploads/1765442043379_0i3bz_boss.jpg\"]', '/uploads/1765442043388_qsv2mui_Corporate_Event_Videography___Same_Day_Edit_1___Sugar_&_Tea_Philippines___Skyworth_Global.mp4', 1),
(7, 'Test Organizer', 'CSS Day', 'CSS', '2026-05-15 08:28:00', 'Gym', 'party  time ', NULL, 'Approved', NULL, 4, '2026-05-15 08:29:41', '2026-08-06 05:58:49', '2026-05-16 14:29:00', '[\"/uploads/1778833781258_College-Acquaintance_25.jpg\"]', NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `participations`
--

CREATE TABLE `participations` (
  `participant_id` int NOT NULL,
  `user_id` int NOT NULL,
  `event_id` int NOT NULL,
  `status` enum('registered','attended','cancelled') NOT NULL DEFAULT 'registered',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `participations`
--

INSERT INTO `participations` (`participant_id`, `user_id`, `event_id`, `status`, `created_at`, `updated_at`) VALUES
(1, 5, 1, 'registered', '2025-11-27 03:11:04', '2025-11-27 03:11:04'),
(2, 1, 1, 'registered', '2025-12-05 00:43:35', '2025-12-05 00:43:35'),
(3, 1, 2, 'registered', '2025-12-05 05:38:53', '2025-12-05 05:38:53'),
(4, 5, 4, 'registered', '2025-12-11 01:50:21', '2025-12-11 01:50:21');

-- --------------------------------------------------------

--
-- Table structure for table `reactions`
--

CREATE TABLE `reactions` (
  `reaction_id` int NOT NULL,
  `event_id` int NOT NULL,
  `user_id` int NOT NULL,
  `reaction_type` enum('like','love','haha','wow','sad','angry') NOT NULL DEFAULT 'like',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `reactions`
--

INSERT INTO `reactions` (`reaction_id`, `event_id`, `user_id`, `reaction_type`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 'love', '2025-12-05 01:44:54', '2025-12-05 01:44:54'),
(2, 2, 1, 'like', '2025-12-05 05:19:29', '2025-12-05 05:19:29'),
(3, 3, 5, 'like', '2025-12-10 19:53:11', '2025-12-10 19:53:11'),
(4, 1, 5, 'like', '2025-12-10 20:39:38', '2025-12-10 20:39:38'),
(5, 2, 5, 'like', '2025-12-10 20:39:45', '2025-12-10 20:39:45'),
(6, 4, 5, 'like', '2025-12-11 01:49:23', '2025-12-11 01:49:23'),
(7, 5, 6, 'wow', '2025-12-11 05:44:06', '2025-12-11 05:44:06');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('participant','organizer','admin') DEFAULT 'participant',
  `department` varchar(255) DEFAULT NULL,
  `contact_number` varchar(255) DEFAULT NULL,
  `status` enum('active','pending','banned') NOT NULL DEFAULT 'active',
  `profile_picture` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `name`, `email`, `password`, `role`, `department`, `contact_number`, `status`, `profile_picture`, `created_at`, `updated_at`) VALUES
(1, 'Rainier M. Salas', 'rainiersalas@gmnail.com', '$2b$10$29YjeWrW7qqDFIGn3.0RuOU96NNOf3A9LnCcJdwYI55q72SE3J6u6', 'participant', 'CCS', NULL, 'active', NULL, '2025-11-20 06:29:16', '2026-05-15 08:06:30'),
(2, 'MinSU Administrator', 'admin@msu.edu', '$2b$10$qmjtATTstpPPkvOFNcU4e.02arvlgQd0ZrHVlMeuOvZmUtQDAWWxq', 'admin', 'Administration', '+63-912-3456789', 'active', NULL, '2025-11-26 13:03:47', '2026-05-15 07:28:17'),
(3, 'john doe', 'john@gmail.com', '$2b$10$/hR/M42w1zfzItN2i00S8eJdXQmgdvWjYhghO/qbdaqUbk50QcV/m', 'organizer', 'CBM', NULL, 'active', '/uploads/profiles/profile_1765415042372_lndtat.webp', '2025-11-26 21:08:37', '2026-05-15 08:06:27'),
(4, 'Test Organizer', 'organizer@test.com', '$2b$10$WOhIHTOisCzZfCNt3GBPN.z5GS4DEnoySpAqZD9Fxc8EVjkv.AFGa', 'organizer', 'CCS', NULL, 'active', NULL, '2025-11-26 21:36:03', '2026-05-15 07:30:08'),
(5, 'Test Participant', 'participant@test.com', '$2b$10$JAjLDAVGXu70rZ1.yjMOFuXPKcJaSWDXpOBdDkS4bzNUHhm9ZUXLy', 'participant', NULL, '09987654321', 'active', NULL, '2025-11-27 01:19:21', '2026-05-15 08:06:29'),
(6, 'rain', 'rain@gmail.com', '$2b$10$nh0lQ0rJsjhJMDE5.k.G/uGklY5F.rLUzROcJf.DbuFDOGcgtPQly', 'participant', NULL, NULL, 'active', '/uploads/profiles/profile_1765431431813_7imqpk.jpg', '2025-12-11 05:35:17', '2026-05-15 08:06:26');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`comment_id`),
  ADD KEY `event_id` (`event_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `eventrequests`
--
ALTER TABLE `eventrequests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `participations`
--
ALTER TABLE `participations`
  ADD PRIMARY KEY (`participant_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `event_id` (`event_id`);

--
-- Indexes for table `reactions`
--
ALTER TABLE `reactions`
  ADD PRIMARY KEY (`reaction_id`),
  ADD UNIQUE KEY `reactions_event_id_user_id` (`event_id`,`user_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `email_2` (`email`),
  ADD UNIQUE KEY `email_3` (`email`),
  ADD UNIQUE KEY `email_4` (`email`),
  ADD UNIQUE KEY `email_5` (`email`),
  ADD UNIQUE KEY `email_6` (`email`),
  ADD UNIQUE KEY `email_7` (`email`),
  ADD UNIQUE KEY `email_8` (`email`),
  ADD UNIQUE KEY `email_9` (`email`),
  ADD UNIQUE KEY `email_10` (`email`),
  ADD UNIQUE KEY `email_11` (`email`),
  ADD UNIQUE KEY `email_12` (`email`),
  ADD UNIQUE KEY `email_13` (`email`),
  ADD UNIQUE KEY `email_14` (`email`),
  ADD UNIQUE KEY `email_15` (`email`),
  ADD UNIQUE KEY `email_16` (`email`),
  ADD UNIQUE KEY `email_17` (`email`),
  ADD UNIQUE KEY `email_18` (`email`),
  ADD UNIQUE KEY `email_19` (`email`),
  ADD UNIQUE KEY `email_20` (`email`),
  ADD UNIQUE KEY `email_21` (`email`),
  ADD UNIQUE KEY `email_22` (`email`),
  ADD UNIQUE KEY `email_23` (`email`),
  ADD UNIQUE KEY `email_24` (`email`),
  ADD UNIQUE KEY `email_25` (`email`),
  ADD UNIQUE KEY `email_26` (`email`),
  ADD UNIQUE KEY `email_27` (`email`),
  ADD UNIQUE KEY `email_28` (`email`),
  ADD UNIQUE KEY `email_29` (`email`),
  ADD UNIQUE KEY `email_30` (`email`),
  ADD UNIQUE KEY `email_31` (`email`),
  ADD UNIQUE KEY `email_32` (`email`),
  ADD UNIQUE KEY `email_33` (`email`),
  ADD UNIQUE KEY `email_34` (`email`),
  ADD UNIQUE KEY `email_35` (`email`),
  ADD UNIQUE KEY `email_36` (`email`),
  ADD UNIQUE KEY `email_37` (`email`),
  ADD UNIQUE KEY `email_38` (`email`),
  ADD UNIQUE KEY `email_39` (`email`),
  ADD UNIQUE KEY `email_40` (`email`),
  ADD UNIQUE KEY `email_41` (`email`),
  ADD UNIQUE KEY `email_42` (`email`),
  ADD UNIQUE KEY `email_43` (`email`),
  ADD UNIQUE KEY `email_44` (`email`),
  ADD UNIQUE KEY `email_45` (`email`),
  ADD UNIQUE KEY `email_46` (`email`),
  ADD UNIQUE KEY `email_47` (`email`),
  ADD UNIQUE KEY `email_48` (`email`),
  ADD UNIQUE KEY `email_49` (`email`),
  ADD UNIQUE KEY `email_50` (`email`),
  ADD UNIQUE KEY `email_51` (`email`),
  ADD UNIQUE KEY `email_52` (`email`),
  ADD UNIQUE KEY `email_53` (`email`),
  ADD UNIQUE KEY `email_54` (`email`),
  ADD UNIQUE KEY `email_55` (`email`),
  ADD UNIQUE KEY `email_56` (`email`),
  ADD UNIQUE KEY `email_57` (`email`),
  ADD UNIQUE KEY `email_58` (`email`),
  ADD UNIQUE KEY `email_59` (`email`),
  ADD UNIQUE KEY `email_60` (`email`),
  ADD UNIQUE KEY `email_61` (`email`),
  ADD UNIQUE KEY `email_62` (`email`),
  ADD UNIQUE KEY `email_63` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `comment_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `eventrequests`
--
ALTER TABLE `eventrequests`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `participations`
--
ALTER TABLE `participations`
  MODIFY `participant_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `reactions`
--
ALTER TABLE `reactions`
  MODIFY `reaction_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `eventrequests` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_10` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_11` FOREIGN KEY (`event_id`) REFERENCES `eventrequests` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_12` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_13` FOREIGN KEY (`event_id`) REFERENCES `eventrequests` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_14` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_15` FOREIGN KEY (`event_id`) REFERENCES `eventrequests` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_16` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_17` FOREIGN KEY (`event_id`) REFERENCES `eventrequests` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_18` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_19` FOREIGN KEY (`event_id`) REFERENCES `eventrequests` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_20` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_21` FOREIGN KEY (`event_id`) REFERENCES `eventrequests` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_22` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_23` FOREIGN KEY (`event_id`) REFERENCES `eventrequests` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_24` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_25` FOREIGN KEY (`event_id`) REFERENCES `eventrequests` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_26` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_27` FOREIGN KEY (`event_id`) REFERENCES `eventrequests` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_28` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_3` FOREIGN KEY (`event_id`) REFERENCES `eventrequests` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_4` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_5` FOREIGN KEY (`event_id`) REFERENCES `eventrequests` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_6` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_7` FOREIGN KEY (`event_id`) REFERENCES `eventrequests` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_8` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_9` FOREIGN KEY (`event_id`) REFERENCES `eventrequests` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `eventrequests`
--
ALTER TABLE `eventrequests`
  ADD CONSTRAINT `eventrequests_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `eventrequests_ibfk_10` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `eventrequests_ibfk_11` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `eventrequests_ibfk_12` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `eventrequests_ibfk_13` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `eventrequests_ibfk_14` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `eventrequests_ibfk_15` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `eventrequests_ibfk_16` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `eventrequests_ibfk_17` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `eventrequests_ibfk_18` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `eventrequests_ibfk_19` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `eventrequests_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `eventrequests_ibfk_20` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `eventrequests_ibfk_21` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `eventrequests_ibfk_22` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `eventrequests_ibfk_23` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `eventrequests_ibfk_24` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `eventrequests_ibfk_25` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `eventrequests_ibfk_26` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `eventrequests_ibfk_27` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `eventrequests_ibfk_28` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `eventrequests_ibfk_29` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `eventrequests_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `eventrequests_ibfk_30` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `eventrequests_ibfk_31` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `eventrequests_ibfk_32` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `eventrequests_ibfk_33` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `eventrequests_ibfk_34` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `eventrequests_ibfk_35` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `eventrequests_ibfk_36` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `eventrequests_ibfk_37` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `eventrequests_ibfk_38` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `eventrequests_ibfk_39` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `eventrequests_ibfk_4` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `eventrequests_ibfk_40` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `eventrequests_ibfk_41` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `eventrequests_ibfk_42` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `eventrequests_ibfk_43` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `eventrequests_ibfk_44` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `eventrequests_ibfk_45` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `eventrequests_ibfk_46` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `eventrequests_ibfk_47` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `eventrequests_ibfk_48` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `eventrequests_ibfk_49` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `eventrequests_ibfk_5` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `eventrequests_ibfk_50` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `eventrequests_ibfk_51` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `eventrequests_ibfk_52` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `eventrequests_ibfk_53` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `eventrequests_ibfk_54` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `eventrequests_ibfk_55` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `eventrequests_ibfk_56` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `eventrequests_ibfk_6` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `eventrequests_ibfk_7` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `eventrequests_ibfk_8` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `eventrequests_ibfk_9` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE;

--
-- Constraints for table `participations`
--
ALTER TABLE `participations`
  ADD CONSTRAINT `participations_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `participations_ibfk_10` FOREIGN KEY (`event_id`) REFERENCES `eventrequests` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `participations_ibfk_11` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `participations_ibfk_12` FOREIGN KEY (`event_id`) REFERENCES `eventrequests` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `participations_ibfk_13` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `participations_ibfk_14` FOREIGN KEY (`event_id`) REFERENCES `eventrequests` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `participations_ibfk_15` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `participations_ibfk_16` FOREIGN KEY (`event_id`) REFERENCES `eventrequests` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `participations_ibfk_17` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `participations_ibfk_18` FOREIGN KEY (`event_id`) REFERENCES `eventrequests` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `participations_ibfk_19` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `participations_ibfk_2` FOREIGN KEY (`event_id`) REFERENCES `eventrequests` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `participations_ibfk_20` FOREIGN KEY (`event_id`) REFERENCES `eventrequests` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `participations_ibfk_21` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `participations_ibfk_22` FOREIGN KEY (`event_id`) REFERENCES `eventrequests` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `participations_ibfk_23` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `participations_ibfk_24` FOREIGN KEY (`event_id`) REFERENCES `eventrequests` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `participations_ibfk_25` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `participations_ibfk_26` FOREIGN KEY (`event_id`) REFERENCES `eventrequests` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `participations_ibfk_27` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `participations_ibfk_28` FOREIGN KEY (`event_id`) REFERENCES `eventrequests` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `participations_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `participations_ibfk_4` FOREIGN KEY (`event_id`) REFERENCES `eventrequests` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `participations_ibfk_5` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `participations_ibfk_6` FOREIGN KEY (`event_id`) REFERENCES `eventrequests` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `participations_ibfk_7` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `participations_ibfk_8` FOREIGN KEY (`event_id`) REFERENCES `eventrequests` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `participations_ibfk_9` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE;

--
-- Constraints for table `reactions`
--
ALTER TABLE `reactions`
  ADD CONSTRAINT `reactions_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `eventrequests` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `reactions_ibfk_10` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `reactions_ibfk_11` FOREIGN KEY (`event_id`) REFERENCES `eventrequests` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `reactions_ibfk_12` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `reactions_ibfk_13` FOREIGN KEY (`event_id`) REFERENCES `eventrequests` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `reactions_ibfk_14` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `reactions_ibfk_15` FOREIGN KEY (`event_id`) REFERENCES `eventrequests` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `reactions_ibfk_16` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `reactions_ibfk_17` FOREIGN KEY (`event_id`) REFERENCES `eventrequests` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `reactions_ibfk_18` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `reactions_ibfk_19` FOREIGN KEY (`event_id`) REFERENCES `eventrequests` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `reactions_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `reactions_ibfk_20` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `reactions_ibfk_21` FOREIGN KEY (`event_id`) REFERENCES `eventrequests` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `reactions_ibfk_22` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `reactions_ibfk_23` FOREIGN KEY (`event_id`) REFERENCES `eventrequests` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `reactions_ibfk_24` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `reactions_ibfk_25` FOREIGN KEY (`event_id`) REFERENCES `eventrequests` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `reactions_ibfk_26` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `reactions_ibfk_27` FOREIGN KEY (`event_id`) REFERENCES `eventrequests` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `reactions_ibfk_28` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `reactions_ibfk_3` FOREIGN KEY (`event_id`) REFERENCES `eventrequests` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `reactions_ibfk_4` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `reactions_ibfk_5` FOREIGN KEY (`event_id`) REFERENCES `eventrequests` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `reactions_ibfk_6` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `reactions_ibfk_7` FOREIGN KEY (`event_id`) REFERENCES `eventrequests` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `reactions_ibfk_8` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `reactions_ibfk_9` FOREIGN KEY (`event_id`) REFERENCES `eventrequests` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
