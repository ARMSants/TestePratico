USE [master]
GO
/****** Object:  Database [TestePraticoDesenvolvedor]    Script Date: 12/02/2021 19:03:27 ******/
CREATE DATABASE [TestePraticoDesenvolvedor]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'TestePraticoDesenvolvedor', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.SQLEXPRESS\MSSQL\DATA\TestePraticoDesenvolvedor.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'TestePraticoDesenvolvedor_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.SQLEXPRESS\MSSQL\DATA\TestePraticoDesenvolvedor_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [TestePraticoDesenvolvedor] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [TestePraticoDesenvolvedor].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [TestePraticoDesenvolvedor] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [TestePraticoDesenvolvedor] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [TestePraticoDesenvolvedor] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [TestePraticoDesenvolvedor] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [TestePraticoDesenvolvedor] SET ARITHABORT OFF 
GO
ALTER DATABASE [TestePraticoDesenvolvedor] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [TestePraticoDesenvolvedor] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [TestePraticoDesenvolvedor] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [TestePraticoDesenvolvedor] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [TestePraticoDesenvolvedor] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [TestePraticoDesenvolvedor] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [TestePraticoDesenvolvedor] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [TestePraticoDesenvolvedor] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [TestePraticoDesenvolvedor] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [TestePraticoDesenvolvedor] SET  DISABLE_BROKER 
GO
ALTER DATABASE [TestePraticoDesenvolvedor] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [TestePraticoDesenvolvedor] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [TestePraticoDesenvolvedor] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [TestePraticoDesenvolvedor] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [TestePraticoDesenvolvedor] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [TestePraticoDesenvolvedor] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [TestePraticoDesenvolvedor] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [TestePraticoDesenvolvedor] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [TestePraticoDesenvolvedor] SET  MULTI_USER 
GO
ALTER DATABASE [TestePraticoDesenvolvedor] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [TestePraticoDesenvolvedor] SET DB_CHAINING OFF 
GO
ALTER DATABASE [TestePraticoDesenvolvedor] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [TestePraticoDesenvolvedor] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [TestePraticoDesenvolvedor] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [TestePraticoDesenvolvedor] SET QUERY_STORE = OFF
GO
USE [TestePraticoDesenvolvedor]
GO
/****** Object:  User [acesso]    Script Date: 12/02/2021 19:03:27 ******/
CREATE USER [acesso] FOR LOGIN [acesso] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  Table [dbo].[Cliente]    Script Date: 12/02/2021 19:03:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Cliente](
	[Identificador] [int] IDENTITY(1,1) NOT NULL,
	[Nome] [nvarchar](40) NOT NULL,
	[CPF] [nvarchar](14) NOT NULL,
	[RG] [nvarchar](20) NOT NULL,
	[DataNascimento] [datetime] NOT NULL,
	[Ativo] [bit] NOT NULL,
 CONSTRAINT [PK_Cliente] PRIMARY KEY CLUSTERED 
(
	[Identificador] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Endereco]    Script Date: 12/02/2021 19:03:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Endereco](
	[Identificador] [int] IDENTITY(1,1) NOT NULL,
	[IdentificadorCliente] [int] NOT NULL,
	[Logradouro] [nvarchar](50) NOT NULL,
	[Numero] [nvarchar](15) NOT NULL,
	[Complemento] [nvarchar](40) NOT NULL,
	[Cidade] [nvarchar](40) NOT NULL,
	[UF] [nvarchar](2) NOT NULL,
	[CEP] [nvarchar](9) NOT NULL,
 CONSTRAINT [PK_Endereco] PRIMARY KEY CLUSTERED 
(
	[Identificador] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Loja]    Script Date: 12/02/2021 19:03:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Loja](
	[Identificador] [int] IDENTITY(1,1) NOT NULL,
	[Nome] [nvarchar](40) NOT NULL,
 CONSTRAINT [PK_Loja] PRIMARY KEY CLUSTERED 
(
	[Identificador] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
insert into [dbo].[Loja] (Nome)
Values ('MERCADO LIVRE'),('MAGAZINE LUIZA'),('OBABOX'),('AMERICANAS')

/****** Object:  Table [dbo].[Loja_has_Cliente]    Script Date: 12/02/2021 19:03:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Loja_has_Cliente](
	[IdentificadorLoja] [int] NOT NULL,
	[IdentificadorCliente] [int] NOT NULL
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Loja_has_Cliente]  WITH CHECK ADD  CONSTRAINT [FK_Loja_has_Cliente_Cliente] FOREIGN KEY([IdentificadorCliente])
REFERENCES [dbo].[Cliente] ([Identificador])
GO
ALTER TABLE [dbo].[Loja_has_Cliente] CHECK CONSTRAINT [FK_Loja_has_Cliente_Cliente]
GO
ALTER TABLE [dbo].[Loja_has_Cliente]  WITH CHECK ADD  CONSTRAINT [FK_Loja_has_Cliente_Loja] FOREIGN KEY([IdentificadorLoja])
REFERENCES [dbo].[Loja] ([Identificador])
GO
ALTER TABLE [dbo].[Loja_has_Cliente] CHECK CONSTRAINT [FK_Loja_has_Cliente_Loja]
GO
USE [master]
GO
ALTER DATABASE [TestePraticoDesenvolvedor] SET  READ_WRITE 
GO
