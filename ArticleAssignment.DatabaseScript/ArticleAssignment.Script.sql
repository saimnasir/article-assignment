USE [master]
GO
/****** Object:  Database [ArticleAssignment]    Script Date: 23.04.2020 02:06:56 ******/
CREATE DATABASE [ArticleAssignment]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'ArticleAssingnment', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL12.PCSERVER\MSSQL\DATA\ArticleAssingnment.mdf' , SIZE = 5120KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'ArticleAssingnment_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL12.PCSERVER\MSSQL\DATA\ArticleAssingnment_log.ldf' , SIZE = 1024KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [ArticleAssignment] SET COMPATIBILITY_LEVEL = 120
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [ArticleAssignment].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [ArticleAssignment] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [ArticleAssignment] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [ArticleAssignment] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [ArticleAssignment] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [ArticleAssignment] SET ARITHABORT OFF 
GO
ALTER DATABASE [ArticleAssignment] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [ArticleAssignment] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [ArticleAssignment] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [ArticleAssignment] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [ArticleAssignment] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [ArticleAssignment] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [ArticleAssignment] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [ArticleAssignment] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [ArticleAssignment] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [ArticleAssignment] SET  DISABLE_BROKER 
GO
ALTER DATABASE [ArticleAssignment] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [ArticleAssignment] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [ArticleAssignment] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [ArticleAssignment] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [ArticleAssignment] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [ArticleAssignment] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [ArticleAssignment] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [ArticleAssignment] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [ArticleAssignment] SET  MULTI_USER 
GO
ALTER DATABASE [ArticleAssignment] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [ArticleAssignment] SET DB_CHAINING OFF 
GO
ALTER DATABASE [ArticleAssignment] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [ArticleAssignment] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
ALTER DATABASE [ArticleAssignment] SET DELAYED_DURABILITY = DISABLED 
GO
USE [ArticleAssignment]
GO
/****** Object:  Table [dbo].[Article]    Script Date: 23.04.2020 02:06:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Article](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Title] [nvarchar](200) NOT NULL,
	[Content] [nvarchar](max) NULL,
	[Author] [bigint] NOT NULL,
	[CreateDate] [datetime] NOT NULL,
	[UpdateDate] [datetime] NULL,
	[Deleted] [bit] NOT NULL CONSTRAINT [DF_Article_Deleted]  DEFAULT ((0)),
 CONSTRAINT [PK_Article] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Author]    Script Date: 23.04.2020 02:06:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Author](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
	[Surname] [nvarchar](100) NOT NULL,
	[BirthDate] [datetime] NULL,
	[Email] [nvarchar](100) NOT NULL,
	[Phone] [nvarchar](100) NULL,
	[Deleted] [bit] NOT NULL CONSTRAINT [DF_Author_Deleted]  DEFAULT ((0)),
 CONSTRAINT [PK_Author] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
ALTER TABLE [dbo].[Article]  WITH CHECK ADD  CONSTRAINT [FK_Article_Author] FOREIGN KEY([Author])
REFERENCES [dbo].[Author] ([Id])
GO
ALTER TABLE [dbo].[Article] CHECK CONSTRAINT [FK_Article_Author]
GO
/****** Object:  StoredProcedure [dbo].[DEL_ARTICLE_SP]    Script Date: 23.04.2020 02:06:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[DEL_ARTICLE_SP]
(
	@Id BIGINT
)
AS
BEGIN
	
	Declare @IsDeleted bit = 0;
	
	UPDATE [dbo].[Article] 
	SET [Deleted] = 1 
	WHERE Id = @Id;

	IF @@ROWCOUNT> 0
		SET @IsDeleted = 1

	Select @IsDeleted AS IsDeleted;
END

GO
/****** Object:  StoredProcedure [dbo].[DEL_AUTHOR_SP]    Script Date: 23.04.2020 02:06:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[DEL_AUTHOR_SP]
(
	@Id BIGINT
)
AS
BEGIN	
	
	Declare @IsDeleted bit = 0;
	
	UPDATE [dbo].[Author] 
	SET [Deleted] = 1 
	WHERE Id = @Id;

	IF @@ROWCOUNT> 0
		SET @IsDeleted = 1

	Select @IsDeleted AS IsDeleted;

END

GO
/****** Object:  StoredProcedure [dbo].[INS_ARTICLE_SP]    Script Date: 23.04.2020 02:06:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[INS_ARTICLE_SP]
(
	@Title NVARCHAR(100),
	@Content NVARCHAR(100),
	@Author BIGINT
)
AS
BEGIN
 

	INSERT INTO [dbo].[Article] 
			([Title], [Content], [Author], [CreateDate])  
	OUTPUT Inserted.Id
	SELECT   @Title,  @Content,  @Author,  GETDATE() 
	FROM  [dbo].[Author]  A
	WHERE A.Deleted = 0;

END

GO
/****** Object:  StoredProcedure [dbo].[INS_AUTHOR_SP]    Script Date: 23.04.2020 02:06:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[INS_AUTHOR_SP]
(
	@Name NVARCHAR(100), 
	@Surname NVARCHAR(100),
	@BirthDate DATETIME, 
	@Email NVARCHAR(100), 
	@Phone NVARCHAR(100)
)
AS
BEGIN
	INSERT INTO [dbo].[Author] (	
		[Name], 
		[Surname], 
		[BirthDate], 
		[Email],
		[Phone],
		[Deleted]) 
	OUTPUT Inserted.Id 
	VALUES  (
		@Name, 
		@Surname, 
		@BirthDate,
		@Email,
		@Phone,
		0
		);
END

GO
/****** Object:  StoredProcedure [dbo].[LST_ARTICLE_SP]    Script Date: 23.04.2020 02:06:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[LST_ARTICLE_SP]
AS
BEGIN
	SELECT A.* FROM [dbo].[Article] A
	INNER JOIN [dbo].[Author] AU ON AU.Id = A.Author
	WHERE A.[Deleted] = 0 AND AU.[Deleted] = 0;
END

GO
/****** Object:  StoredProcedure [dbo].[LST_AUTHOR_SP]    Script Date: 23.04.2020 02:06:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[LST_AUTHOR_SP]

AS
BEGIN
	SELECT * FROM [dbo].[Author]
	WHERE Deleted = 0;
END

GO
/****** Object:  StoredProcedure [dbo].[LST_SEARCHARTICLE_SP]    Script Date: 23.04.2020 02:06:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[LST_SEARCHARTICLE_SP](
	@Title NVARCHAR(100)= NULL,
	@Content NVARCHAR(100)= NULL,
	@Author BIGINT = NULL,
	@CreateDateStart DATETIME = NULL,
	@CreateDateEnd DATETIME = NULL,
	@UpdateDateStart DATETIME = NULL,
	@UpdateDateEnd DATETIME = NULL
)
AS
BEGIN
	SELECT AR.*	FROM [dbo].[Article] AR  
		INNER JOIN [dbo].[Author] AU ON AU.Id = AR.Author 
	WHERE AR.[Deleted] = 0 AND AU.[Deleted] = 0 
		AND (@Author IS NULL OR [Author] = @Author) 
		AND (@CreateDateStart IS NULL OR CreateDate >= @CreateDateStart) 
		AND (@CreateDateEnd IS NULL OR CreateDate <= @CreateDateEnd) 
		AND (@UpdateDateStart IS NULL OR UpdateDate >= @UpdateDateStart) 
		AND (@UpdateDateEnd IS NULL OR UpdateDate <= @UpdateDateEnd) 
		AND (@Title IS NULL OR Title like  '%'+@Title+'%');	
END;
GO
/****** Object:  StoredProcedure [dbo].[SEL_ARTICLE_SP]    Script Date: 23.04.2020 02:06:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SEL_ARTICLE_SP]
( 
	@Id BIGINT  
)
AS
BEGIN
	SELECT A.* FROM [dbo].[Article]  A
	INNER JOIN [dbo].[Author] AU ON AU.Id = A.Author
	WHERE A.Id = @Id 
		AND  A.[Deleted] = 0 
		AND AU.[Deleted] = 0;
END

GO
/****** Object:  StoredProcedure [dbo].[SEL_AUTHOR_SP]    Script Date: 23.04.2020 02:06:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SEL_AUTHOR_SP]
(
	@Id BIGINT
)
AS
BEGIN
	SELECT * FROM [dbo].[Author]
	WHERE Deleted = 0 AND Id = @Id;
END

GO
/****** Object:  StoredProcedure [dbo].[UPD_ARTICLE_SP]    Script Date: 23.04.2020 02:06:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[UPD_ARTICLE_SP]
(
	@Title NVARCHAR(100),
	@Content NVARCHAR(100),
	@Author BIGINT,
	@Id BIGINT  
)
AS
BEGIN
	UPDATE [dbo].[Article] 
	SET 
		[Title] = @Title, 
		[Content] = @Content, 
		[Author] = @Author, 
		[UpdateDate] = GETDATE(),
		[Deleted] = 0
	WHERE Id = @Id;

	exec [dbo].[SEL_ARTICLE_SP] @Id;	
END

GO
/****** Object:  StoredProcedure [dbo].[UPD_AUTHOR_SP]    Script Date: 23.04.2020 02:06:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[UPD_AUTHOR_SP]
(
	@Name NVARCHAR(100), 
	@Surname NVARCHAR(100),
	@BirthDate DATETIME, 
	@Email NVARCHAR(100), 
	@Phone NVARCHAR(100),
	@Id BIGINT
)
AS
BEGIN

	UPDATE [dbo].[Author]
    SET [Name] = @Name
      ,[Surname] = @Surname
      ,[BirthDate] = @BirthDate
      ,[Email] = @Email
      ,[Phone] = @Phone
	WHERE Id = @Id;

	exec [dbo].[SEL_AUTHOR_SP] @Id;		

END

GO
USE [master]
GO
ALTER DATABASE [ArticleAssignment] SET  READ_WRITE 
GO
