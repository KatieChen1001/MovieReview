
-- Create another list that stores all comments
CREATE TABLE `fav` (
  `id` int(11) NOT NULL,
  `comment_id` int(11) NOT NULL,
  `user` varchar(255) NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for table `fav`
--
ALTER TABLE `fav`
  ADD PRIMARY KEY (`id`),
  ADD KEY `commentId` (`comment_id`);

--
-- AUTO_INCREMENT for table `comment`
--
ALTER TABLE `fav`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;