-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 02, 2017 at 08:31 AM
-- Server version: 5.6.35
-- PHP Version: 7.0.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `Diplomado`
--

-- --------------------------------------------------------

--
-- Table structure for table `adicional`
--

CREATE TABLE `adicional` (
  `animo` varchar(255) NOT NULL,
  `emocional` varchar(255) NOT NULL,
  `nutriologo` tinyint(1) NOT NULL,
  `nutriologo_q` varchar(255) NOT NULL,
  `logro` tinyint(1) NOT NULL,
  `logro_q` varchar(255) NOT NULL,
  `motiva` varchar(255) NOT NULL,
  `resultados` varchar(255) NOT NULL,
  `sobrepeso` varchar(255) NOT NULL,
  `rfc_usuario` varchar(13) NOT NULL,
  `fecha_reg` date DEFAULT NULL,
  `hora_reg` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `adicional`
--

INSERT INTO `adicional` (`animo`, `emocional`, `nutriologo`, `nutriologo_q`, `logro`, `logro_q`, `motiva`, `resultados`, `sobrepeso`, `rfc_usuario`, `fecha_reg`, `hora_reg`) VALUES
('NO SABE O NO APLICA', 'NO SABE O NO APLICA', 0, 'NO SABE O NO APLICA', 0, 'NO SABE O NO APLICA', 'NO SABE O NO APLICA', 'NO SABE O NO APLICA', 'NO SABE O NO APLICA', 'GAEL8905141J7', '2017-02-23', '21:49:23');

-- --------------------------------------------------------

--
-- Table structure for table `antecedentes`
--

CREATE TABLE `antecedentes` (
  `colesterol` varchar(30) NOT NULL,
  `colesterol_t` varchar(30) NOT NULL,
  `colesterol_b` varchar(30) NOT NULL,
  `colesterol_m` varchar(30) NOT NULL,
  `trigliceridos` varchar(30) NOT NULL,
  `glucosa` varchar(30) NOT NULL,
  `diagnosticos` varchar(255) NOT NULL,
  `rfc_usuario` varchar(13) NOT NULL,
  `fecha_reg` date DEFAULT NULL,
  `hora_reg` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `antecedentes`
--

INSERT INTO `antecedentes` (`colesterol`, `colesterol_t`, `colesterol_b`, `colesterol_m`, `trigliceridos`, `glucosa`, `diagnosticos`, `rfc_usuario`, `fecha_reg`, `hora_reg`) VALUES
('NO SABE O NO APLICA', 'NO SABE O NO APLICA', 'NO SABE O NO APLICA', 'NO SABE O NO APLICA', 'NO SABE O NO APLICA', 'NO SABE O ', 'NO SABE O NO APLICA', 'GAEL8905141J7', '2017-02-23', '21:49:23'),
('NO SABE O NO APLICA', 'NO SABE O NO APLICA', 'NO SABE O NO APLICA', 'NO SABE O NO APLICA', 'NO SABE O NO APLICA', 'NO SABE O ', 'NO SABE O NO APLICA', 'GAEL8905141J7', '2017-02-23', '22:07:31');

-- --------------------------------------------------------

--
-- Table structure for table `comida`
--

CREATE TABLE `comida` (
  `horario` tinyint(1) NOT NULL,
  `num_comida` varchar(30) NOT NULL,
  `desayuno` varchar(255) NOT NULL,
  `almuerzo` varchar(255) NOT NULL,
  `comida` varchar(255) NOT NULL,
  `merienda` varchar(255) NOT NULL,
  `cena` varchar(255) NOT NULL,
  `bebidas` varchar(255) NOT NULL,
  `rfc_usuario` varchar(13) NOT NULL,
  `fecha_reg` date DEFAULT NULL,
  `hora_reg` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `comida`
--

INSERT INTO `comida` (`horario`, `num_comida`, `desayuno`, `almuerzo`, `comida`, `merienda`, `cena`, `bebidas`, `rfc_usuario`, `fecha_reg`, `hora_reg`) VALUES
(0, 'NO SABE O NO APLICA', 'NO SABE O NO APLICA', 'NO SABE O NO APLICA', 'NO SABE O NO APLICA', 'NO SABE O NO APLICA', 'NO SABE O NO APLICA', 'NO SABE O NO APLICA', 'GAEL8905141J7', '2017-02-23', '21:49:23');

-- --------------------------------------------------------

--
-- Table structure for table `cuantitativa`
--

CREATE TABLE `cuantitativa` (
  `edad` int(3) NOT NULL,
  `cm` float NOT NULL,
  `peso` float NOT NULL,
  `med_brazo` float NOT NULL,
  `masa_grasa` float NOT NULL,
  `med_cintura` float NOT NULL,
  `masa_musc` float NOT NULL,
  `med_cadera` float NOT NULL,
  `imc` float NOT NULL,
  `med_pierna` float NOT NULL,
  `complexion` varchar(255) NOT NULL,
  `ideal` float NOT NULL,
  `rfc_usuario` varchar(13) NOT NULL,
  `fecha_reg` date DEFAULT NULL,
  `hora_reg` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `cuantitativa`
--

INSERT INTO `cuantitativa` (`edad`, `cm`, `peso`, `med_brazo`, `masa_grasa`, `med_cintura`, `masa_musc`, `med_cadera`, `imc`, `med_pierna`, `complexion`, `ideal`, `rfc_usuario`, `fecha_reg`, `hora_reg`) VALUES
(27, 1.8, 83, 0, 0, 0, 0, 0, 25.62, 0, 'NO SABE O NO APLICA', 0, 'GAEL8905141J7', '2017-02-23', '21:49:23');

-- --------------------------------------------------------

--
-- Table structure for table `diagnosticos`
--

CREATE TABLE `diagnosticos` (
  `hipertension` tinyint(1) NOT NULL,
  `diabetes` tinyint(1) NOT NULL,
  `cardiaca` tinyint(1) NOT NULL,
  `pulmonar` tinyint(1) NOT NULL,
  `renal` tinyint(1) NOT NULL,
  `cancer` tinyint(1) NOT NULL,
  `tiroides` tinyint(1) NOT NULL,
  `autoinmune` tinyint(1) NOT NULL,
  `hace_cuanto` varchar(50) NOT NULL,
  `tratamiento` char(2) NOT NULL,
  `medicamentos` char(2) NOT NULL,
  `medica_info` varchar(50) NOT NULL,
  `embarazo` char(2) NOT NULL,
  `abortos` varchar(10) NOT NULL,
  `segura` char(2) NOT NULL,
  `periodo` varchar(50) NOT NULL,
  `alergico` varchar(255) NOT NULL,
  `deshidratacion` varchar(255) NOT NULL,
  `hormonas` varchar(255) NOT NULL,
  `ortopedicos` varchar(255) NOT NULL,
  `depresion` varchar(255) NOT NULL,
  `rfc_usuario` varchar(13) NOT NULL,
  `fecha_reg` date DEFAULT NULL,
  `hora_reg` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `diagnosticos`
--

INSERT INTO `diagnosticos` (`hipertension`, `diabetes`, `cardiaca`, `pulmonar`, `renal`, `cancer`, `tiroides`, `autoinmune`, `hace_cuanto`, `tratamiento`, `medicamentos`, `medica_info`, `embarazo`, `abortos`, `segura`, `periodo`, `alergico`, `deshidratacion`, `hormonas`, `ortopedicos`, `depresion`, `rfc_usuario`, `fecha_reg`, `hora_reg`) VALUES
(1, 0, 0, 0, 0, 0, 0, 1, 'NO SABE O NO APLICA', 'no', 'no', 'NO SABE O NO APLICA', 'no', 'no', 'si', 'NO SABE O NO APLICA', 'NO SABE O NO APLICA', 'NO SABE O NO APLICA', 'NO SABE O NO APLICA', 'NO SABE O NO APLICA', 'NO SABE O NO APLICA', 'GAEL8905141J7', '2017-02-23', '21:49:23'),
(0, 0, 0, 0, 0, 0, 0, 0, 'NO SABE O NO APLICA', 'no', 'no', 'NO SABE O NO APLICA', '', 'no', 'no', 'NO SABE O NO APLICA', 'NO SABE O NO APLICA', 'NO SABE O NO APLICA', 'NO SABE O NO APLICA', 'NO SABE O NO APLICA', 'NO SABE O NO APLICA', 'GAEL8905141J7', '2017-02-23', '22:07:31');

-- --------------------------------------------------------

--
-- Table structure for table `estomago`
--

CREATE TABLE `estomago` (
  `lengua` tinyint(1) NOT NULL,
  `abdominal` tinyint(1) NOT NULL,
  `nausea` tinyint(1) NOT NULL,
  `vomito` tinyint(1) NOT NULL,
  `boca_est` tinyint(1) NOT NULL,
  `colitis` tinyint(1) NOT NULL,
  `gastritis` tinyint(1) NOT NULL,
  `aliento` tinyint(1) NOT NULL,
  `eructos` tinyint(1) NOT NULL,
  `gases` tinyint(1) NOT NULL,
  `estrenimiento` tinyint(1) NOT NULL,
  `indigestion` tinyint(1) NOT NULL,
  `pies` tinyint(1) NOT NULL,
  `sed` tinyint(1) NOT NULL,
  `cabeza` tinyint(1) NOT NULL,
  `migrana` tinyint(1) NOT NULL,
  `vision` tinyint(1) NOT NULL,
  `mareos` tinyint(1) NOT NULL,
  `des_digestion` varchar(255) NOT NULL,
  `des_antojos` varchar(255) NOT NULL,
  `colon` varchar(255) NOT NULL,
  `des_evacua` varchar(255) NOT NULL,
  `rfc_usuario` varchar(13) NOT NULL,
  `fecha_reg` date DEFAULT NULL,
  `hora_reg` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `estomago`
--

INSERT INTO `estomago` (`lengua`, `abdominal`, `nausea`, `vomito`, `boca_est`, `colitis`, `gastritis`, `aliento`, `eructos`, `gases`, `estrenimiento`, `indigestion`, `pies`, `sed`, `cabeza`, `migrana`, `vision`, `mareos`, `des_digestion`, `des_antojos`, `colon`, `des_evacua`, `rfc_usuario`, `fecha_reg`, `hora_reg`) VALUES
(1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 'NO SABE O NO APLICA', 'NO SABE O NO APLICA', 'NO SABE O NO APLICA', 'NO SABE O NO APLICA', 'GAEL8905141J7', '2017-02-23', '21:49:23');

-- --------------------------------------------------------

--
-- Table structure for table `factores`
--

CREATE TABLE `factores` (
  `hipertension` varchar(2) NOT NULL,
  `q_hiper` varchar(50) NOT NULL,
  `diabetes` varchar(2) NOT NULL,
  `q_diabetes` varchar(50) NOT NULL,
  `cancer` varchar(2) NOT NULL,
  `q_cancer` varchar(50) NOT NULL,
  `cardiaca` varchar(2) NOT NULL,
  `q_cardiaca` varchar(50) NOT NULL,
  `pulmonar` varchar(2) NOT NULL,
  `q_pulmonar` varchar(50) NOT NULL,
  `otras` varchar(2) NOT NULL,
  `otras_enf` varchar(50) NOT NULL,
  `q_otras` varchar(50) NOT NULL,
  `rfc_usuario` varchar(13) NOT NULL,
  `fecha_reg` date DEFAULT NULL,
  `hora_reg` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `factores`
--

INSERT INTO `factores` (`hipertension`, `q_hiper`, `diabetes`, `q_diabetes`, `cancer`, `q_cancer`, `cardiaca`, `q_cardiaca`, `pulmonar`, `q_pulmonar`, `otras`, `otras_enf`, `q_otras`, `rfc_usuario`, `fecha_reg`, `hora_reg`) VALUES
('no', 'NO SABE O NO APLICA', 'si', 'ABUELA', 'si', 'MADRE', 'no', 'NO SABE O NO APLICA', 'no', 'NO SABE O NO APLICA', 'no', 'NO SABE O NO APLICA', 'NO SABE O NO APLICA', 'GAEL8905141J7', '2017-02-23', '21:49:23'),
('no', 'NO SABE O NO APLICA', 'no', 'NO SABE O NO APLICA', 'no', 'NO SABE O NO APLICA', 'no', 'NO SABE O NO APLICA', 'no', 'NO SABE O NO APLICA', 'no', 'NO SABE O NO APLICA', 'NO SABE O NO APLICA', 'GAEL8905141J7', '2017-02-23', '22:07:31');

-- --------------------------------------------------------

--
-- Table structure for table `generales`
--

CREATE TABLE `generales` (
  `entero` varchar(50) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `referenciado` varchar(50) NOT NULL,
  `motivo` varchar(50) NOT NULL,
  `fechaRegistro` date NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `ap_pat` varchar(50) NOT NULL,
  `ap_mat` varchar(50) NOT NULL,
  `rfc` varchar(13) NOT NULL,
  `genero` char(2) NOT NULL,
  `edo_civil` char(2) NOT NULL,
  `hijos` int(2) DEFAULT NULL,
  `nacimiento` date NOT NULL,
  `escolaridad` varchar(15) NOT NULL,
  `telefono` varchar(15) NOT NULL,
  `tel_oficina` varchar(15) DEFAULT NULL,
  `tel_celular` varchar(15) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `ad_email` varchar(50) DEFAULT NULL,
  `pais` varchar(10) NOT NULL,
  `cp` varchar(6) NOT NULL,
  `estado` varchar(30) NOT NULL,
  `colonia` varchar(50) NOT NULL,
  `delegacion` varchar(30) NOT NULL,
  `municipio` varchar(100) NOT NULL,
  `direccion` varchar(100) DEFAULT NULL,
  `hora_reg` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `generales`
--

INSERT INTO `generales` (`entero`, `referenciado`, `motivo`, `fechaRegistro`, `nombre`, `ap_pat`, `ap_mat`, `rfc`, `genero`, `edo_civil`, `hijos`, `nacimiento`, `escolaridad`, `telefono`, `tel_oficina`, `tel_celular`, `email`, `ad_email`, `pais`, `cp`, `estado`, `colonia`, `delegacion`, `municipio`, `direccion`, `hora_reg`) VALUES
('INTERNET', 'SERGIO', 'PRUEBA', '2017-02-23', 'LUIS MANUEL', 'GALLEGOS', 'ESTRADA', 'GAEL8905141J7', 'M', 'S', 0, '1989-05-14', 'UNIVERSIDAD', '56037657', '0', '0', 'LGALLEGOS@OHKASYSTEMS.COM', 'NO SABE O NO APLICA', 'MÉXICO', '04930', 'CIUDAD DE MÉXICO', 'SANTA CECILIA', 'COYOACÁN', 'NO SABE O NO APLICA', 'RANCHO GRANDE 122', '21:49:23');

-- --------------------------------------------------------

--
-- Table structure for table `habitos`
--

CREATE TABLE `habitos` (
  `fuma` varchar(255) NOT NULL,
  `ejercicio` varchar(255) NOT NULL,
  `duerme` varchar(255) NOT NULL,
  `meditacion` varchar(255) NOT NULL,
  `ocio` varchar(255) NOT NULL,
  `rfc_usuario` varchar(13) NOT NULL,
  `fecha_reg` date DEFAULT NULL,
  `hora_reg` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `habitos`
--

INSERT INTO `habitos` (`fuma`, `ejercicio`, `duerme`, `meditacion`, `ocio`, `rfc_usuario`, `fecha_reg`, `hora_reg`) VALUES
('NO SABE O NO APLICA', 'NO SABE O NO APLICA', 'NO SABE O NO APLICA', 'NO SABE O NO APLICA', 'NO SABE O NO APLICA', 'GAEL8905141J7', '2017-02-23', '21:49:23'),
('NO SABE O NO APLICA', 'NO SABE O NO APLICA', 'NO SABE O NO APLICA', 'NO SABE O NO APLICA', 'NO SABE O NO APLICA', 'GAEL8905141J7', '2017-02-23', '22:07:31');

-- --------------------------------------------------------

--
-- Table structure for table `imagenes`
--

CREATE TABLE `imagenes` (
  `ruta` varchar(255) NOT NULL,
  `seccion` varchar(50) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `rfc_usuario` varchar(13) NOT NULL,
  `fecha_reg` date DEFAULT NULL,
  `hora_reg` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `imagenes`
--

INSERT INTO `imagenes` (`ruta`, `seccion`, `descripcion`, `rfc_usuario`, `fecha_reg`, `hora_reg`) VALUES
('1487909015.png', 'iris', 'PLUS', 'GAEL8905141J7', '2017-02-23', '21:49:23'),
('1487909032.png', 'lengua', 'PLUS', 'GAEL8905141J7', '2017-02-23', '21:49:23'),
('1487909043.png', 'unas', 'TYU', 'GAEL8905141J7', '2017-02-23', '21:49:23'),
('1487909114.png', 'piel', 'QWERTY', 'GAEL8905141J7', '2017-02-23', '21:49:23'),
('1487909123.png', 'cuerpo_ad', 'cuerpo_ad', 'GAEL8905141J7', '2017-02-23', '21:49:23'),
('1487909130.png', 'cuerpo_at', 'cuerpo_at', 'GAEL8905141J7', '2017-02-23', '21:49:23');

-- --------------------------------------------------------

--
-- Table structure for table `metas`
--

CREATE TABLE `metas` (
  `meta` varchar(255) NOT NULL,
  `pretextos` varchar(255) NOT NULL,
  `compromisos` varchar(255) NOT NULL,
  `fecha_meta` date NOT NULL,
  `rfc_usuario` varchar(13) NOT NULL,
  `fecha_reg` date DEFAULT NULL,
  `hora_reg` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `metas`
--

INSERT INTO `metas` (`meta`, `pretextos`, `compromisos`, `fecha_meta`, `rfc_usuario`, `fecha_reg`, `hora_reg`) VALUES
('NO SABE O NO APLICA', 'NO SABE O NO APLICA', 'NO SABE O NO APLICA', '2017-03-01', 'GAEL8905141J7', '2017-02-23', '21:49:23');

-- --------------------------------------------------------

--
-- Table structure for table `nervios`
--

CREATE TABLE `nervios` (
  `ansiedad` tinyint(1) NOT NULL,
  `levantarse` tinyint(1) NOT NULL,
  `estres` tinyint(1) NOT NULL,
  `fiebre` tinyint(1) NOT NULL,
  `agitacion` tinyint(1) NOT NULL,
  `latidos` tinyint(1) NOT NULL,
  `peso` tinyint(1) NOT NULL,
  `malestar` tinyint(1) NOT NULL,
  `fatiga` tinyint(1) NOT NULL,
  `cansancio` tinyint(1) NOT NULL,
  `agotamiento` tinyint(1) NOT NULL,
  `debilidad` tinyint(1) NOT NULL,
  `rendimiento` tinyint(1) NOT NULL,
  `concentrar` tinyint(1) NOT NULL,
  `hiperactividad` tinyint(1) NOT NULL,
  `apetito` tinyint(1) NOT NULL,
  `aum_apetito` tinyint(1) NOT NULL,
  `sudor` tinyint(1) NOT NULL,
  `animo` tinyint(1) NOT NULL,
  `panico` tinyint(1) NOT NULL,
  `des_nervio` varchar(255) NOT NULL,
  `rfc_usuario` varchar(13) NOT NULL,
  `fecha_reg` date DEFAULT NULL,
  `hora_reg` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `nervios`
--

INSERT INTO `nervios` (`ansiedad`, `levantarse`, `estres`, `fiebre`, `agitacion`, `latidos`, `peso`, `malestar`, `fatiga`, `cansancio`, `agotamiento`, `debilidad`, `rendimiento`, `concentrar`, `hiperactividad`, `apetito`, `aum_apetito`, `sudor`, `animo`, `panico`, `des_nervio`, `rfc_usuario`, `fecha_reg`, `hora_reg`) VALUES
(1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 'NO SABE O NO APLICA', 'GAEL8905141J7', '2017-02-23', '21:49:23');

-- --------------------------------------------------------

--
-- Table structure for table `piel`
--

CREATE TABLE `piel` (
  `acne` tinyint(1) NOT NULL,
  `salpullido` tinyint(1) NOT NULL,
  `psoriasis` tinyint(1) NOT NULL,
  `ex_grasa` tinyint(1) NOT NULL,
  `cicatrices` tinyint(1) NOT NULL,
  `sequedad` tinyint(1) NOT NULL,
  `mucosa` tinyint(1) NOT NULL,
  `cabello` tinyint(1) NOT NULL,
  `envejecer` tinyint(1) NOT NULL,
  `descrip_piel` varchar(255) NOT NULL,
  `rfc_usuario` varchar(13) NOT NULL,
  `fecha_reg` date DEFAULT NULL,
  `hora_reg` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `piel`
--

INSERT INTO `piel` (`acne`, `salpullido`, `psoriasis`, `ex_grasa`, `cicatrices`, `sequedad`, `mucosa`, `cabello`, `envejecer`, `descrip_piel`, `rfc_usuario`, `fecha_reg`, `hora_reg`) VALUES
(1, 0, 0, 0, 0, 0, 0, 0, 1, 'NO SABE O NO APLICA', 'GAEL8905141J7', '2017-02-23', '21:49:23');

-- --------------------------------------------------------

--
-- Table structure for table `pulmones`
--

CREATE TABLE `pulmones` (
  `respirar` tinyint(1) NOT NULL,
  `jadeo` tinyint(1) NOT NULL,
  `asma` tinyint(1) NOT NULL,
  `moco` tinyint(1) NOT NULL,
  `constipada` tinyint(1) NOT NULL,
  `rinitis` tinyint(1) NOT NULL,
  `sinucitis` tinyint(1) NOT NULL,
  `bronquitis` tinyint(1) NOT NULL,
  `tos` tinyint(1) NOT NULL,
  `gripa` tinyint(1) NOT NULL,
  `des_pulmon` varchar(255) NOT NULL,
  `rfc_usuario` varchar(13) NOT NULL,
  `fecha_reg` date DEFAULT NULL,
  `hora_reg` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `pulmones`
--

INSERT INTO `pulmones` (`respirar`, `jadeo`, `asma`, `moco`, `constipada`, `rinitis`, `sinucitis`, `bronquitis`, `tos`, `gripa`, `des_pulmon`, `rfc_usuario`, `fecha_reg`, `hora_reg`) VALUES
(1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 'NO SABE O NO APLICA', 'GAEL8905141J7', '2017-02-23', '21:49:23');

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `usuario` varchar(15) NOT NULL,
  `password` varchar(15) NOT NULL,
  `nombre_completo` varchar(50) NOT NULL,
  `rol` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`usuario`, `password`, `nombre_completo`, `rol`) VALUES
('lgallegos', 'lgallegos', 'Luis Gallegos', 'admin'),
('pruebas', 'pruebas', 'Pruebas de desarrollo', 'capturista');
