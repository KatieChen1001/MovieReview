
-- Create another list that stores all comments
CREATE TABLE `comment` (
  `id` int(11) NOT NULL,
  `user` varchar(255) NOT NULL,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `useravatar` varchar(255) NOT NULL,
  `content` varchar(511) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `movie_id` int(11) NOT NULL,
  `type` varchar(255) NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- SET @AUDIO_BASE_URL = "https://audio-comment-1257643707.cos.ap-guangzhou.myqcloud.com/"; 
--
-- 转存表中的数据 `moive_comment`
--

-- INSERT INTO `comment` (`id`, `user`, `username`, `useravatar`, `content`, `movie_id`, `type`) VALUES
-- (1, 'ozOee4rpeT6nP0YakKAryJakHgFY', 'KatieChen', 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJ9Tqqn1hgO2EfniczZYSTOEp85Qn8UEQnYk3T9niaOibib3bbyp7GCKzZNVM99PvqibaSyHTqUrATMAkQ/132', '电影超级赞！', 1, 'text'),
-- (2, 'ozOee4rpeT6nP0YakKAryJakHgFY', 'KatieChen', 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJ9Tqqn1hgO2EfniczZYSTOEp85Qn8UEQnYk3T9niaOibib3bbyp7GCKzZNVM99PvqibaSyHTqUrATMAkQ/132', '电影超级赞！', 2, 'text'),
-- (3, 'ozOee4rpeT6nP0YakKAryJakHgFY', 'KatieChen', 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJ9Tqqn1hgO2EfniczZYSTOEp85Qn8UEQnYk3T9niaOibib3bbyp7GCKzZNVM99PvqibaSyHTqUrATMAkQ/132', '电影超级赞！', 3, 'text'),
-- (4, 'ozOee4rpeT6nP0YakKAryJakHgFY', 'KatieChen', 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJ9Tqqn1hgO2EfniczZYSTOEp85Qn8UEQnYk3T9niaOibib3bbyp7GCKzZNVM99PvqibaSyHTqUrATMAkQ/132', '电影超级赞！', 4, 'text'),
-- (5, 'ozOee4rpeT6nP0YakKAryJakHgFY', 'KatieChen', 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJ9Tqqn1hgO2EfniczZYSTOEp85Qn8UEQnYk3T9niaOibib3bbyp7GCKzZNVM99PvqibaSyHTqUrATMAkQ/132', '电影超级赞！', 4, 'text'),
-- (6, 'ozOee4rpeT6nP0YakKAryJakHgFY', 'KatieChen', 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJ9Tqqn1hgO2EfniczZYSTOEp85Qn8UEQnYk3T9niaOibib3bbyp7GCKzZNVM99PvqibaSyHTqUrATMAkQ/132', CONCAT(@AUDIO_BASE_URL, '1.mp3'), 5, 'audio')

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `movie` (`movie_id`);

--
-- AUTO_INCREMENT for table `comment`
--
ALTER TABLE `comment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;