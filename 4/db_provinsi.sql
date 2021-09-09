-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 09 Sep 2021 pada 15.55
-- Versi server: 10.4.18-MariaDB
-- Versi PHP: 7.3.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_provinsi`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `kabupaten_tb`
--

CREATE TABLE `kabupaten_tb` (
  `id` int(11) NOT NULL,
  `nama` varchar(50) DEFAULT NULL,
  `diresmikan` date DEFAULT NULL,
  `provinsi_id` int(11) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `kabupaten_tb`
--

INSERT INTO `kabupaten_tb` (`id`, `nama`, `diresmikan`, `provinsi_id`, `photo`) VALUES
(4, 'tegal', '2021-09-06', NULL, '1631187274589-LOGO_3300_JAWA-TENGAH-503x540.png'),
(5, 'semarang', '1891-05-12', NULL, '1631194662755-LOGO_KABUPATEN_SEMARANG.png'),
(6, 'tegal', '1801-05-18', NULL, '1631194809504-1200px-Shield_of_Tegal_Regency.svg.png');

-- --------------------------------------------------------

--
-- Struktur dari tabel `provinsi_tb`
--

CREATE TABLE `provinsi_tb` (
  `id` int(11) NOT NULL,
  `nama` varchar(50) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `pulau` varchar(50) DEFAULT NULL,
  `diresmikan` date DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `provinsi_tb`
--

INSERT INTO `provinsi_tb` (`id`, `nama`, `photo`, `pulau`, `diresmikan`) VALUES
(4, 'Jawa Tengah', '1631191391635-LOGO_3300_JAWA-TENGAH-503x540.png', NULL, '2021-08-31'),
(5, 'Jawa Barat', '1631194059636-LOGO_3200_JAWA-BARAT-484x540.png', NULL, '1945-08-19'),
(6, 'Jawa Timur', '1631194229479-LOGO_3500_JAWA-TIMUR-376x540.png', NULL, '1945-10-12');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `kabupaten_tb`
--
ALTER TABLE `kabupaten_tb`
  ADD PRIMARY KEY (`id`),
  ADD KEY `provinsi_id` (`provinsi_id`);

--
-- Indeks untuk tabel `provinsi_tb`
--
ALTER TABLE `provinsi_tb`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `kabupaten_tb`
--
ALTER TABLE `kabupaten_tb`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `provinsi_tb`
--
ALTER TABLE `provinsi_tb`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `kabupaten_tb`
--
ALTER TABLE `kabupaten_tb`
  ADD CONSTRAINT `provinsi_id` FOREIGN KEY (`provinsi_id`) REFERENCES `provinsi_tb` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
