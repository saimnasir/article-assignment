USE [master]
GO
/****** Object:  Database [ArticleAssignment]    Script Date: 26.04.2020 23:44:50 ******/
CREATE DATABASE [ArticleAssignment]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'ArticleAssignmentV1', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL12.PCSERVER\MSSQL\DATA\ArticleAssignmentV1.mdf' , SIZE = 5120KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'ArticleAssignmentV1_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL12.PCSERVER\MSSQL\DATA\ArticleAssignmentV1_log.ldf' , SIZE = 1024KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
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
/****** Object:  Table [dbo].[Article]    Script Date: 26.04.2020 23:44:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Article](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Title] [nvarchar](200) NOT NULL,
	[Content] [nvarchar](max) NULL,
	[AuthorId] [bigint] NOT NULL,
	[CategoryId] [bigint] NOT NULL,
	[CreateDate] [datetime] NOT NULL,
	[UpdateDate] [datetime] NULL,
	[EntityState] [bigint] NOT NULL,
	[State] [bigint] NOT NULL,
 CONSTRAINT [PK_Article] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[ArticleComment]    Script Date: 26.04.2020 23:44:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ArticleComment](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[ArticleId] [bigint] NOT NULL,
	[CommentId] [bigint] NOT NULL,
	[CreateDate] [datetime] NOT NULL,
	[UpdateDate] [datetime] NULL,
	[EntityState] [bigint] NOT NULL,
 CONSTRAINT [PK_ArticleComment] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[ArticleTag]    Script Date: 26.04.2020 23:44:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ArticleTag](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[ArticleId] [bigint] NOT NULL,
	[TagId] [bigint] NOT NULL,
	[CreateDate] [datetime] NOT NULL,
	[UpdateDate] [datetime] NULL,
	[EntityState] [bigint] NOT NULL,
 CONSTRAINT [PK_ArticleTag] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Author]    Script Date: 26.04.2020 23:44:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Author](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[FirstName] [nvarchar](100) NOT NULL,
	[MiddleName] [nvarchar](100) NOT NULL,
	[LastName] [nvarchar](100) NOT NULL,
	[BirthDate] [datetime] NULL,
	[Email] [nvarchar](100) NOT NULL,
	[Phone] [nvarchar](100) NULL,
	[About] [nvarchar](1000) NOT NULL,
	[CreateDate] [datetime] NOT NULL,
	[UpdateDate] [datetime] NULL,
	[EntityState] [bigint] NOT NULL,
 CONSTRAINT [PK_Author] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Category]    Script Date: 26.04.2020 23:44:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Category](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Header] [nvarchar](100) NOT NULL,
	[Description] [nvarchar](200) NOT NULL,
	[CreateDate] [datetime] NOT NULL,
	[UpdateDate] [datetime] NULL,
	[EntityState] [bigint] NOT NULL,
 CONSTRAINT [PK_Category] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Comment]    Script Date: 26.04.2020 23:44:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Comment](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Content] [nvarchar](max) NOT NULL,
	[AuthorId] [bigint] NOT NULL,
	[CreateDate] [datetime] NOT NULL,
	[UpdateDate] [datetime] NULL,
	[EntityState] [bigint] NOT NULL,
 CONSTRAINT [PK_Comment] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[EntityState]    Script Date: 26.04.2020 23:44:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EntityState](
	[Id] [bigint] NOT NULL,
	[Name] [nvarchar](20) NOT NULL,
	[Description] [nvarchar](200) NULL,
 CONSTRAINT [PK_EntityState] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[State]    Script Date: 26.04.2020 23:44:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[State](
	[Id] [bigint] NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
	[Description] [nvarchar](200) NOT NULL,
	[CreateDate] [datetime] NOT NULL,
	[UpdateDate] [datetime] NULL,
	[EntityState] [bigint] NOT NULL,
 CONSTRAINT [PK_State] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Tag]    Script Date: 26.04.2020 23:44:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tag](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Title] [nvarchar](100) NOT NULL,
	[Description] [nvarchar](200) NOT NULL,
	[CreateDate] [datetime] NOT NULL,
	[UpdateDate] [datetime] NULL,
	[EntityState] [bigint] NOT NULL,
 CONSTRAINT [PK_Tag] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
ALTER TABLE [dbo].[Article]  WITH CHECK ADD  CONSTRAINT [FK_Article_Author] FOREIGN KEY([AuthorId])
REFERENCES [dbo].[Author] ([Id])
GO
ALTER TABLE [dbo].[Article] CHECK CONSTRAINT [FK_Article_Author]
GO
ALTER TABLE [dbo].[Article]  WITH CHECK ADD  CONSTRAINT [FK_Article_EntityState] FOREIGN KEY([EntityState])
REFERENCES [dbo].[EntityState] ([Id])
GO
ALTER TABLE [dbo].[Article] CHECK CONSTRAINT [FK_Article_EntityState]
GO
ALTER TABLE [dbo].[Article]  WITH CHECK ADD  CONSTRAINT [FK_Article_State] FOREIGN KEY([State])
REFERENCES [dbo].[State] ([Id])
GO
ALTER TABLE [dbo].[Article] CHECK CONSTRAINT [FK_Article_State]
GO
ALTER TABLE [dbo].[ArticleComment]  WITH CHECK ADD  CONSTRAINT [FK_ArticleComment_Article] FOREIGN KEY([ArticleId])
REFERENCES [dbo].[Article] ([Id])
GO
ALTER TABLE [dbo].[ArticleComment] CHECK CONSTRAINT [FK_ArticleComment_Article]
GO
ALTER TABLE [dbo].[ArticleComment]  WITH CHECK ADD  CONSTRAINT [FK_ArticleComment_Comment] FOREIGN KEY([CommentId])
REFERENCES [dbo].[Comment] ([Id])
GO
ALTER TABLE [dbo].[ArticleComment] CHECK CONSTRAINT [FK_ArticleComment_Comment]
GO
ALTER TABLE [dbo].[ArticleComment]  WITH CHECK ADD  CONSTRAINT [FK_ArticleComment_EntityState] FOREIGN KEY([EntityState])
REFERENCES [dbo].[EntityState] ([Id])
GO
ALTER TABLE [dbo].[ArticleComment] CHECK CONSTRAINT [FK_ArticleComment_EntityState]
GO
ALTER TABLE [dbo].[ArticleTag]  WITH CHECK ADD  CONSTRAINT [FK_ArticleTag_Article] FOREIGN KEY([ArticleId])
REFERENCES [dbo].[Article] ([Id])
GO
ALTER TABLE [dbo].[ArticleTag] CHECK CONSTRAINT [FK_ArticleTag_Article]
GO
ALTER TABLE [dbo].[ArticleTag]  WITH CHECK ADD  CONSTRAINT [FK_ArticleTag_EntityState] FOREIGN KEY([EntityState])
REFERENCES [dbo].[EntityState] ([Id])
GO
ALTER TABLE [dbo].[ArticleTag] CHECK CONSTRAINT [FK_ArticleTag_EntityState]
GO
ALTER TABLE [dbo].[ArticleTag]  WITH CHECK ADD  CONSTRAINT [FK_ArticleTag_Tag] FOREIGN KEY([TagId])
REFERENCES [dbo].[Tag] ([Id])
GO
ALTER TABLE [dbo].[ArticleTag] CHECK CONSTRAINT [FK_ArticleTag_Tag]
GO
ALTER TABLE [dbo].[Author]  WITH CHECK ADD  CONSTRAINT [FK_Author_EntityState] FOREIGN KEY([EntityState])
REFERENCES [dbo].[EntityState] ([Id])
GO
ALTER TABLE [dbo].[Author] CHECK CONSTRAINT [FK_Author_EntityState]
GO
ALTER TABLE [dbo].[Category]  WITH CHECK ADD  CONSTRAINT [FK_Category_EntityState] FOREIGN KEY([EntityState])
REFERENCES [dbo].[EntityState] ([Id])
GO
ALTER TABLE [dbo].[Category] CHECK CONSTRAINT [FK_Category_EntityState]
GO
ALTER TABLE [dbo].[Comment]  WITH CHECK ADD  CONSTRAINT [FK_Comment_Author] FOREIGN KEY([AuthorId])
REFERENCES [dbo].[Author] ([Id])
GO
ALTER TABLE [dbo].[Comment] CHECK CONSTRAINT [FK_Comment_Author]
GO
ALTER TABLE [dbo].[Comment]  WITH CHECK ADD  CONSTRAINT [FK_Comment_EntityState] FOREIGN KEY([EntityState])
REFERENCES [dbo].[EntityState] ([Id])
GO
ALTER TABLE [dbo].[Comment] CHECK CONSTRAINT [FK_Comment_EntityState]
GO
ALTER TABLE [dbo].[State]  WITH CHECK ADD  CONSTRAINT [FK_State_EntityState] FOREIGN KEY([EntityState])
REFERENCES [dbo].[EntityState] ([Id])
GO
ALTER TABLE [dbo].[State] CHECK CONSTRAINT [FK_State_EntityState]
GO
ALTER TABLE [dbo].[Tag]  WITH CHECK ADD  CONSTRAINT [FK_Tag_EntityState] FOREIGN KEY([EntityState])
REFERENCES [dbo].[EntityState] ([Id])
GO
ALTER TABLE [dbo].[Tag] CHECK CONSTRAINT [FK_Tag_EntityState]
GO
/****** Object:  StoredProcedure [dbo].[DEL_ARTICLE_SP]    Script Date: 26.04.2020 23:44:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[DEL_ARTICLE_SP]
(
	@Id BIGINT,
	@EntityState BIGINT = NULL
)
AS
BEGIN 
	
	IF @EntityState IS NULL
		SET @EntityState = (Select Id from [dbo].[EntityState] WHERE Name = 'Deleted') 

	UPDATE [dbo].[Article] 
		SET EntityState = @EntityState
	WHERE Id = @Id

	Select EntityState from [dbo].[Article] WHERE Id = @Id;
	 
END


GO
/****** Object:  StoredProcedure [dbo].[DEL_ARTICLECOMMENT_SP]    Script Date: 26.04.2020 23:44:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[DEL_ARTICLECOMMENT_SP]
(
	@Id BIGINT,
	@EntityState BIGINT = NULL
)
AS
BEGIN 
	
	IF @EntityState IS NULL
		SET @EntityState = (Select Id from [dbo].[EntityState] WHERE Name = 'Deleted') 

	UPDATE [dbo].[ArticleComment] 
		SET EntityState = @EntityState 
	WHERE Id = @Id

	Select EntityState from [dbo].[ArticleComment] WHERE Id = @Id;
	 
END



GO
/****** Object:  StoredProcedure [dbo].[DEL_ARTICLETAG_SP]    Script Date: 26.04.2020 23:44:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[DEL_ARTICLETAG_SP]
(
	@Id BIGINT,
	@EntityState BIGINT = NULL
)
AS
BEGIN 
	
	IF @EntityState IS NULL
		SET @EntityState = (Select Id from [dbo].[EntityState] WHERE Name = 'Deleted') 

	UPDATE [dbo].[ArticleTag] 
		SET EntityState = @EntityState
	WHERE Id = @Id

	Select EntityState from [dbo].[ArticleTag] WHERE Id = @Id;
	 
END



GO
/****** Object:  StoredProcedure [dbo].[DEL_AUTHOR_SP]    Script Date: 26.04.2020 23:44:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[DEL_AUTHOR_SP]
(
	@Id BIGINT,
	@EntityState BIGINT = NULL
)
AS
BEGIN	
	
	
	IF @EntityState IS NULL
		SET @EntityState = (Select Id from [dbo].[EntityState] WHERE Name = 'Deleted') 

	UPDATE [dbo].[Author] 
	SET EntityState = @EntityState 
	WHERE Id = @Id

	Select EntityState from [dbo].[Author] WHERE Id = @Id;

END

GO
/****** Object:  StoredProcedure [dbo].[DEL_CATEGORY_SP]    Script Date: 26.04.2020 23:44:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[DEL_CATEGORY_SP]
(
	@Id BIGINT,
	@EntityState BIGINT = NULL
)
AS
BEGIN 
	
	IF @EntityState IS NULL
		SET @EntityState = (Select Id from [dbo].[EntityState] WHERE Name = 'Deleted') 

	UPDATE [dbo].[Category] 
		SET EntityState = @EntityState
	WHERE Id = @Id

	Select EntityState from [dbo].[Category] WHERE Id = @Id;
	 
END



GO
/****** Object:  StoredProcedure [dbo].[DEL_COMMENT_SP]    Script Date: 26.04.2020 23:44:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[DEL_COMMENT_SP]
(
	@Id BIGINT,
	@EntityState BIGINT = NULL
)
AS
BEGIN 
	
	IF @EntityState IS NULL
		SET @EntityState = (Select Id from [dbo].[EntityState] WHERE Name = 'Deleted') 

	UPDATE [dbo].[Comment] 
	SET EntityState = @EntityState
	WHERE Id = @Id

	Select EntityState from [dbo].[Comment] WHERE Id = @Id;
	 
END



GO
/****** Object:  StoredProcedure [dbo].[DEL_ENTITYSTATE_SP]    Script Date: 26.04.2020 23:44:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE PROCEDURE [dbo].[DEL_ENTITYSTATE_SP]

AS
BEGIN 	
	RAISERROR (15600,-1,-1, 'DELETE ENTITYSTATE COULD NOT BE DONE.');  
END




GO
/****** Object:  StoredProcedure [dbo].[DEL_STATE_SP]    Script Date: 26.04.2020 23:44:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[DEL_STATE_SP]
(
	@Id BIGINT,
	@EntityState BIGINT = NULL
)
AS
BEGIN 
	
	IF @EntityState IS NULL
		SET @EntityState = (Select Id from [dbo].[EntityState] WHERE Name = 'Deleted') 

	UPDATE [dbo].[State] 
		SET EntityState = @EntityState
	WHERE Id = @Id

	Select EntityState from [dbo].[State] WHERE Id = @Id;
	 
END



GO
/****** Object:  StoredProcedure [dbo].[DEL_TAG_SP]    Script Date: 26.04.2020 23:44:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[DEL_TAG_SP]
(
	@Id BIGINT,
	@EntityState BIGINT = NULL
)
AS
BEGIN 
	
	IF @EntityState IS NULL
		SET @EntityState = (Select Id from [dbo].[EntityState] WHERE Name = 'Deleted') 

	UPDATE [dbo].[Tag] 
	SET EntityState = @EntityState
	WHERE Id = @Id

	Select EntityState from [dbo].[Tag] WHERE Id = @Id;
	 
END



GO
/****** Object:  StoredProcedure [dbo].[INS_ARTICLE_SP]    Script Date: 26.04.2020 23:44:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[INS_ARTICLE_SP]
(
	@Title NVARCHAR(200),
	@Content NVARCHAR(MAX),
	@AuthorId BIGINT,
	@EntityState BIGINT = NULL,
	@State BIGINT
)
AS
BEGIN 

	IF @EntityState IS NULL
		SET @EntityState = (Select Id from [dbo].[EntityState] WHERE Name = 'Created') 

	INSERT INTO [dbo].[Article]
           ([Title]
           ,[Content]
           ,[AuthorId]
           ,[CreateDate]
           ,[EntityState]
           ,[State]) 
	OUTPUT Inserted.Id
	SELECT @Title,  
		   @Content,  
		   @AuthorId,  
		   GETDATE(), 
		   @EntityState, 
		   @State
	FROM  [dbo].[Author]  A
	WHERE A.EntityState != 'Deleted';

END

GO
/****** Object:  StoredProcedure [dbo].[INS_ARTICLECOMMENT_SP]    Script Date: 26.04.2020 23:44:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[INS_ARTICLECOMMENT_SP]
(	
	@ArticleId BIGINT,
	@CommentId BIGINT,
	@EntityState BIGINT = NULL
)
AS
BEGIN 
 
 
	IF @EntityState IS NULL
		SET @EntityState = (Select Id from [dbo].[EntityState] WHERE Name = 'Created') 

	INSERT INTO [dbo].[ArticleComment]
            ([ArticleId]
			,[CommentId]
			,CreateDate
			,[EntityState]) 
	OUTPUT Inserted.Id
	VALUES(@ArticleId,  
		   @CommentId,
		   GETDATE(), 
		   @EntityState); 


END
GO
/****** Object:  StoredProcedure [dbo].[INS_ARTICLETAG_SP]    Script Date: 26.04.2020 23:44:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[INS_ARTICLETAG_SP]
(	
	@ArticleId BIGINT,
	@TagId BIGINT,
	@EntityState BIGINT = NULL
)
AS
BEGIN  
 
	IF @EntityState IS NULL
		SET @EntityState = (Select Id from [dbo].[EntityState] WHERE Name = 'Created') 


	INSERT INTO [dbo].[ArticleTag]
            ([ArticleId]
			,TagId
			,CreateDate
			,[EntityState]) 
	OUTPUT Inserted.Id
	VALUES(@ArticleId,  
		   @TagId,
		   GETDATE(), 
		   @EntityState); 


END
GO
/****** Object:  StoredProcedure [dbo].[INS_AUTHOR_SP]    Script Date: 26.04.2020 23:44:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[INS_AUTHOR_SP]
(
	@FirstName NVARCHAR(100), 
	@MiddleName NVARCHAR(100), 
	@LastName NVARCHAR(100),
	@BirthDate DATETIME, 
	@Email NVARCHAR(100), 
	@Phone NVARCHAR(100),
	@About NVARCHAR(1000),
	@EntityState BIGINT = NULL
)
AS
BEGIN

	IF @EntityState IS NULL
		SET @EntityState = (Select Id from [dbo].[EntityState] WHERE Name = 'Created') 

	INSERT INTO  [dbo].[Author]
           ([FirstName]
           ,[MiddleName]
           ,[LastName]
           ,[BirthDate]
           ,[Email]
           ,[Phone]
           ,[About]
           ,[CreateDate]
           ,[EntityState])
	OUTPUT Inserted.Id 
	VALUES  (
			@FirstName, 
			@MiddleName, 
			@LastName, 
			@BirthDate,
			@Email,
			@Phone,
			@About,
			GETDATE(),
			@EntityState
		);
END

GO
/****** Object:  StoredProcedure [dbo].[INS_CATEGORY_SP]    Script Date: 26.04.2020 23:44:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[INS_CATEGORY_SP]
(	 
	@Header NVARCHAR(100),
	@Description NVARCHAR(200),
	@EntityState BIGINT = NULL
)
AS
BEGIN 
 
	IF @EntityState IS NULL
		SET @EntityState = (Select Id from [dbo].[EntityState] WHERE Name = 'Created') 


	INSERT INTO [dbo].[Category]
            (Header
			,Description
			,CreateDate
			,[EntityState]) 
	OUTPUT Inserted.Id
	VALUES(@Header,  
		   @Description,
		   GETDATE(), 
		   @EntityState); 


END
GO
/****** Object:  StoredProcedure [dbo].[INS_COMMENT_SP]    Script Date: 26.04.2020 23:44:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[INS_COMMENT_SP]
(	 
	@Content NVARCHAR(MAX),
	@AuthorId BIGINT,
	@EntityState BIGINT = NULL 
)
AS
BEGIN 
 
 
	IF @EntityState IS NULL
		SET @EntityState = (Select Id from [dbo].[EntityState] WHERE Name = 'Created') 

	INSERT INTO [dbo].[Comment]
            (Content
			,AuthorId
			,CreateDate
			,[EntityState]) 
	OUTPUT Inserted.Id
	VALUES(@Content,  
		   @AuthorId,
		   GETDATE(), 
		   @EntityState); 


END
GO
/****** Object:  StoredProcedure [dbo].[INS_ENTITYSTATE_SP]    Script Date: 26.04.2020 23:44:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[INS_ENTITYSTATE_SP]
 
AS
BEGIN 	
	RAISERROR (15600,-1,-1, 'INSERT ENTITYSTATE COULD NOT BE DONE.');  
END
GO
/****** Object:  StoredProcedure [dbo].[INS_STATE_SP]    Script Date: 26.04.2020 23:44:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[INS_STATE_SP]
(	 
	@Name NVARCHAR(100),
	@Description  NVARCHAR(200),
	@EntityState BIGINT = NULL
)
AS
BEGIN 
 
	Declare @Id BIGINT
	Select @Id = MAX(Id)+1  from [dbo].[State];

	IF @EntityState IS NULL
		SET @EntityState = (Select Id from [dbo].[EntityState] WHERE Name = 'Created') 

	INSERT INTO [dbo].[State]
            ([Name]
			,[Description]
			,CreateDate
			,[EntityState]) 
	OUTPUT Inserted.Id
	VALUES(@Name,  
		   @Description,
		   GETDATE(), 
		   @EntityState); 


END
GO
/****** Object:  StoredProcedure [dbo].[INS_TAG_SP]    Script Date: 26.04.2020 23:44:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[INS_TAG_SP]
(	 
	@Title NVARCHAR(100),
	@Description  NVARCHAR(100),
	@EntityState BIGINT = NULL
)
AS
BEGIN 
 
 
	IF @EntityState IS NULL
		SET @EntityState = (Select Id from [dbo].[EntityState] WHERE Name = 'Created') 

	INSERT INTO [dbo].[Tag]
            (Title
			,[Description]
			,CreateDate
			,[EntityState]) 
	OUTPUT Inserted.Id
	VALUES(@Title,  
		   @Description,
		   GETDATE(), 
		   @EntityState); 


END
GO
/****** Object:  StoredProcedure [dbo].[LST_ARTICLE_SP]    Script Date: 26.04.2020 23:44:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[LST_ARTICLE_SP]
AS
BEGIN
	
	DECLARE @DeletedState BIGINT = (SELECT Id FROM  EntityState WHERE Name = 'Deleted')

	SELECT ART.* FROM [dbo].[Article] ART
		INNER JOIN [dbo].[Author] AUT ON AUT.Id = ART.AuthorId
		INNER JOIN [dbo].[State] S ON S.Id = ART.[State]
	WHERE   ART.EntityState != @DeletedState
		AND AUT.EntityState != @DeletedState
		AND S.EntityState != @DeletedState

END;


GO
/****** Object:  StoredProcedure [dbo].[LST_ARTICLECOMMENT_SP]    Script Date: 26.04.2020 23:44:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[LST_ARTICLECOMMENT_SP]

AS
BEGIN
	
	DECLARE @DeletedState BIGINT = (SELECT Id FROM  EntityState WHERE Name = 'Deleted')
	
	SELECT * FROM [dbo].[ArticleComment]  
	WHERE EntityState != @DeletedState

END;

GO
/****** Object:  StoredProcedure [dbo].[LST_ARTICLETAG_SP]    Script Date: 26.04.2020 23:44:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[LST_ARTICLETAG_SP]

AS
BEGIN
	
	DECLARE @DeletedState BIGINT = (SELECT Id FROM  EntityState WHERE Name = 'Deleted')
	
	SELECT * FROM [dbo].[ArticleTag]  
	WHERE EntityState != @DeletedState

END

GO
/****** Object:  StoredProcedure [dbo].[LST_AUTHOR_SP]    Script Date: 26.04.2020 23:44:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[LST_AUTHOR_SP]

AS
BEGIN
	
	DECLARE @DeletedState BIGINT = (SELECT Id FROM  EntityState WHERE Name = 'Deleted')
	
	SELECT * FROM [dbo].[Author]  
	WHERE EntityState != @DeletedState	

END;

GO
/****** Object:  StoredProcedure [dbo].[LST_CATEGORY_SP]    Script Date: 26.04.2020 23:44:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[LST_CATEGORY_SP]

AS
BEGIN
	
	
	DECLARE @DeletedState BIGINT = (SELECT Id FROM  EntityState WHERE Name = 'Deleted')
	
	SELECT * FROM [dbo].[Category]  
	WHERE EntityState != @DeletedState	

END;

GO
/****** Object:  StoredProcedure [dbo].[LST_COMMENT_SP]    Script Date: 26.04.2020 23:44:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[LST_COMMENT_SP]

AS
BEGIN

	DECLARE @DeletedState BIGINT = (SELECT Id FROM  EntityState WHERE Name = 'Deleted')
	
	SELECT * FROM [dbo].[Comment]  
	WHERE EntityState != @DeletedState		

END;

GO
/****** Object:  StoredProcedure [dbo].[LST_ENTITYSTATE_SP]    Script Date: 26.04.2020 23:44:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[LST_ENTITYSTATE_SP]

AS
BEGIN
	
	SELECT * FROM [dbo].[EntityState]

END;

GO
/****** Object:  StoredProcedure [dbo].[LST_STATE_SP]    Script Date: 26.04.2020 23:44:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[LST_STATE_SP]

AS
BEGIN
	
	DECLARE @DeletedState BIGINT = (SELECT Id FROM  EntityState WHERE Name = 'Deleted')
	
	SELECT * FROM [dbo].[State]  
	WHERE EntityState != @DeletedState	

END;


GO
/****** Object:  StoredProcedure [dbo].[LST_TAG_SP]    Script Date: 26.04.2020 23:44:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[LST_TAG_SP]

AS
BEGIN
	
	SELECT T.* 
	FROM [dbo].[Tag] T
		INNER JOIN [dbo].[EntityState] ES ON ES.Id = T.EntityState
	WHERE ES.Name != 'Deleted';

END;


GO
/****** Object:  StoredProcedure [dbo].[SEL_ARTICLE_SP]    Script Date: 26.04.2020 23:44:50 ******/
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
	
	DECLARE @DeletedState BIGINT = (SELECT Id FROM  EntityState WHERE Name = 'Deleted')

	SELECT ART.* FROM [dbo].[Article] ART
		INNER JOIN [dbo].[Author] AUT ON AUT.Id = ART.AuthorId
		INNER JOIN [dbo].[State] S ON S.Id = ART.[State]
	WHERE  ART.Id = @Id 
		AND ART.EntityState != @DeletedState
		AND AUT.EntityState != @DeletedState
		AND S.EntityState != @DeletedState
		 
END;


GO
/****** Object:  StoredProcedure [dbo].[SEL_ARTICLECOMMENT_SP]    Script Date: 26.04.2020 23:44:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[SEL_ARTICLECOMMENT_SP]
( 
	@Id BIGINT 
)
AS
BEGIN
		
	
	DECLARE @DeletedState BIGINT = (SELECT Id FROM  EntityState WHERE Name = 'Deleted')
	
	SELECT * FROM [dbo].[ArticleComment]  
	WHERE Id = @Id
		AND EntityState != @DeletedState 

END;


GO
/****** Object:  StoredProcedure [dbo].[SEL_ARTICLETAG_SP]    Script Date: 26.04.2020 23:44:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[SEL_ARTICLETAG_SP]
( 
	@Id BIGINT 
)
AS
BEGIN

	
	DECLARE @DeletedState BIGINT = (SELECT Id FROM  EntityState WHERE Name = 'Deleted')
	
	SELECT * FROM [dbo].[ArticleTag]  
	WHERE Id = @Id
		AND EntityState != @DeletedState		

END


GO
/****** Object:  StoredProcedure [dbo].[SEL_AUTHOR_SP]    Script Date: 26.04.2020 23:44:50 ******/
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
	
	
	DECLARE @DeletedState BIGINT = (SELECT Id FROM  EntityState WHERE Name = 'Deleted')
	
	SELECT * FROM [dbo].[Author]  
	WHERE Id = @Id
		AND EntityState != @DeletedState
				
END;


GO
/****** Object:  StoredProcedure [dbo].[SEL_CATEGORY_SP]    Script Date: 26.04.2020 23:44:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[SEL_CATEGORY_SP]
( 
	@Id BIGINT 
)
AS
BEGIN
	
	
	DECLARE @DeletedState BIGINT = (SELECT Id FROM  EntityState WHERE Name = 'Deleted')
	
	SELECT * FROM [dbo].[Category]  
	WHERE Id = @Id
		AND EntityState != @DeletedState		

END;


GO
/****** Object:  StoredProcedure [dbo].[SEL_COMMENT_SP]    Script Date: 26.04.2020 23:44:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[SEL_COMMENT_SP]
( 
	@Id BIGINT 
)
AS
BEGIN
	
	
	DECLARE @DeletedState BIGINT = (SELECT Id FROM  EntityState WHERE Name = 'Deleted')
	
	SELECT * FROM [dbo].[Comment]  
	WHERE Id = @Id
		AND EntityState != @DeletedState
		
END;


GO
/****** Object:  StoredProcedure [dbo].[SEL_ENTITYSTATE_SP]    Script Date: 26.04.2020 23:44:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[SEL_ENTITYSTATE_SP]
( 
	@Id BIGINT 
)
AS
BEGIN
	
	SELECT * FROM [dbo].[EntityState] 
	WHERE Id = @Id 	
		 
END;


GO
/****** Object:  StoredProcedure [dbo].[SEL_STATE_SP]    Script Date: 26.04.2020 23:44:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[SEL_STATE_SP]
( 
	@Id BIGINT 
)
AS
BEGIN
	

	DECLARE @DeletedState BIGINT = (SELECT Id FROM  EntityState WHERE Name = 'Deleted')
	
	SELECT * FROM [dbo].[State]  
	WHERE Id = @Id
		AND EntityState != @DeletedState	

END;


GO
/****** Object:  StoredProcedure [dbo].[SEL_TAG_SP]    Script Date: 26.04.2020 23:44:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[SEL_TAG_SP]
( 
	@Id BIGINT 
)
AS
BEGIN

	DECLARE @DeletedState BIGINT = (SELECT Id FROM  EntityState WHERE Name = 'Deleted')
	
	SELECT * FROM [dbo].[Tag]  
	WHERE Id = @Id
		AND EntityState != @DeletedState

END;


GO
/****** Object:  StoredProcedure [dbo].[SRC_ARTICLE_SP]    Script Date: 26.04.2020 23:44:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[SRC_ARTICLE_SP](
	@QueryText NVARCHAR(200)= NULL,
	@AuthorId BIGINT = NULL,
	@CreateDateStart DATETIME = NULL,
	@CreateDateEnd DATETIME = NULL,
	@UpdateDateStart DATETIME = NULL,
	@UpdateDateEnd DATETIME = NULL,
	@State BIGINT = NULL
)
AS
BEGIN
	
	DECLARE @DeletedState BIGINT = (SELECT Id FROM  EntityState WHERE Name = 'Deleted')
	
	SELECT A.* FROM [dbo].[Article] A
		INNER JOIN [dbo].[Author] AU ON AU.Id = A.AuthorId
	WHERE A.EntityState != @DeletedState 
		AND AU.EntityState != @DeletedState 
		AND (@AuthorId IS NULL OR [AuthorId] = @AuthorId) 
		AND (@CreateDateStart IS NULL OR A.CreateDate >= @CreateDateStart) 
		AND (@CreateDateEnd IS NULL OR A.CreateDate <= @CreateDateEnd) 
		AND (@UpdateDateStart IS NULL OR A.UpdateDate >= @UpdateDateStart) 
		AND (@UpdateDateEnd IS NULL OR A.UpdateDate <= @UpdateDateEnd) 
		AND (@State IS NULL OR A.[State] = @State) 
		AND (@QueryText IS NULL OR (Title like  '%'+@QueryText+'%' OR Content like  '%'+@QueryText+'%'))

END;

GO
/****** Object:  StoredProcedure [dbo].[SRC_ARTICLETAG_SP]    Script Date: 26.04.2020 23:44:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[SRC_ARTICLETAG_SP](
	@CreateDateStart DATETIME = NULL,
	@CreateDateEnd DATETIME = NULL,
	@UpdateDateStart DATETIME = NULL,
	@UpdateDateEnd DATETIME = NULL,	
	@ArticleId BIGINT = NULL,	
	@TagId BIGINT = NULL
)
AS
BEGIN
	
	DECLARE @DeletedState BIGINT = (SELECT Id FROM  EntityState WHERE Name = 'Deleted')
	
	SELECT AT.* FROM [dbo].[ArticleTag] AT
	WHERE AT.EntityState != @DeletedState 
		AND AT.EntityState != @DeletedState 
		AND (@ArticleId IS NULL OR AT.ArticleId = @ArticleId) 
		AND (@TagId IS NULL OR AT.TagId = @TagId) 
		AND (@CreateDateStart IS NULL OR AT.CreateDate >= @CreateDateStart) 
		AND (@CreateDateEnd IS NULL OR AT.CreateDate <= @CreateDateEnd) 
		AND (@UpdateDateStart IS NULL OR AT.UpdateDate >= @UpdateDateStart) 
		AND (@UpdateDateEnd IS NULL OR AT.UpdateDate <= @UpdateDateEnd) 
			
END;

GO
/****** Object:  StoredProcedure [dbo].[SRC_AUTHOR_SP]    Script Date: 26.04.2020 23:44:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[SRC_AUTHOR_SP](
	@QueryText NVARCHAR(100) = NULL,	
	@Id BIGINT = NULL,
	@BirthDateStart DATETIME = NULL,
	@BirthDateEnd DATETIME = NULL,
	@CreateDateStart DATETIME = NULL,
	@CreateDateEnd DATETIME = NULL,
	@UpdateDateStart DATETIME = NULL,
	@UpdateDateEnd DATETIME = NULL
)
AS
BEGIN
	
	DECLARE @DeletedState BIGINT = (SELECT Id FROM  EntityState WHERE Name = 'Deleted')
	
	SELECT A.* FROM [dbo].[Author] A
	WHERE A.EntityState != @DeletedState
		AND (@Id IS NULL OR A.[Id] = @Id) 
		AND (@BirthDateStart IS NULL OR A.BirthDate >= @BirthDateStart) 
		AND (@BirthDateEnd IS NULL OR A.BirthDate <= @BirthDateEnd) 
		AND (@CreateDateStart IS NULL OR A.CreateDate >= @CreateDateStart) 
		AND (@CreateDateEnd IS NULL OR A.CreateDate <= @CreateDateEnd) 
		AND (@UpdateDateStart IS NULL OR A.UpdateDate >= @UpdateDateStart) 
		AND (@UpdateDateEnd IS NULL OR A.UpdateDate <= @UpdateDateEnd) 
		AND (@QueryText IS NULL OR 
			(FirstName like  '%'+@QueryText+'%' 
			 OR MiddleName like  '%'+@QueryText+'%'  
			 OR Email like  '%'+@QueryText+'%'  
			 OR Phone like  '%'+@QueryText+'%'  
			 OR About like  '%'+@QueryText+'%' 
		));	
END;


GO
/****** Object:  StoredProcedure [dbo].[SRC_CATEGORY_SP]    Script Date: 26.04.2020 23:44:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[SRC_CATEGORY_SP](
	@QueryText NVARCHAR(MAX)= NULL,
	@CreateDateStart DATETIME = NULL,
	@CreateDateEnd DATETIME = NULL,
	@UpdateDateStart DATETIME = NULL,
	@UpdateDateEnd DATETIME = NULL,	
	@ArticleId BIGINT = NULL
)
AS
BEGIN
	
	DECLARE @DeletedState BIGINT = (SELECT Id FROM  EntityState WHERE Name = 'Deleted')
	
	
	SELECT C.* FROM [dbo].[Category] C
		LEFT JOIN [dbo].[Article] A ON A.CategoryId = C.Id
	WHERE C.EntityState != @DeletedState 
		AND A.EntityState != @DeletedState  
		AND (@ArticleId IS NULL OR A.Id = @ArticleId) 
		AND (@CreateDateStart IS NULL OR C.CreateDate >= @CreateDateStart) 
		AND (@CreateDateEnd IS NULL OR C.CreateDate <= @CreateDateEnd) 
		AND (@UpdateDateStart IS NULL OR C.UpdateDate >= @UpdateDateStart) 
		AND (@UpdateDateEnd IS NULL OR C.UpdateDate <= @UpdateDateEnd) 
		AND (@QueryText IS NULL OR (C.Header like  '%'+@QueryText+'%' OR C.Description like  '%'+@QueryText+'%'));	
END;

GO
/****** Object:  StoredProcedure [dbo].[SRC_COMMENT_SP]    Script Date: 26.04.2020 23:44:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[SRC_COMMENT_SP](
	@QueryText NVARCHAR(MAX)= NULL,
	@CreateDateStart DATETIME = NULL,
	@CreateDateEnd DATETIME = NULL,
	@UpdateDateStart DATETIME = NULL,
	@UpdateDateEnd DATETIME = NULL,	
	@ArticleId BIGINT = NULL
)
AS
BEGIN
	
	DECLARE @DeletedState BIGINT = (SELECT Id FROM  EntityState WHERE Name = 'Deleted')
	
	SELECT C.* FROM [dbo].[Comment] C
		INNER JOIN [dbo].[ArticleComment] AC ON AC.CommentId = C.Id
		INNER JOIN [dbo].[Article] A ON A.Id = AC.ArticleId
	WHERE C.EntityState != @DeletedState 
		AND AC.EntityState != @DeletedState 
		AND A.EntityState != @DeletedState  
		AND AC.ArticleId = @ArticleId 
		AND (@CreateDateStart IS NULL OR C.CreateDate >= @CreateDateStart) 
		AND (@CreateDateEnd IS NULL OR C.CreateDate <= @CreateDateEnd) 
		AND (@UpdateDateStart IS NULL OR C.UpdateDate >= @UpdateDateStart) 
		AND (@UpdateDateEnd IS NULL OR C.UpdateDate <= @UpdateDateEnd) 
		AND (@QueryText IS NULL OR C.Content like  '%'+@QueryText+'%');	

END;

GO
/****** Object:  StoredProcedure [dbo].[SRC_TAG_SP]    Script Date: 26.04.2020 23:44:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[SRC_TAG_SP](
	@QueryText NVARCHAR(MAX)= NULL,
	@CreateDateStart DATETIME = NULL,
	@CreateDateEnd DATETIME = NULL,
	@UpdateDateStart DATETIME = NULL,
	@UpdateDateEnd DATETIME = NULL,	
	@ArticleId BIGINT = NULL
)
AS
BEGIN
	
	DECLARE @DeletedState BIGINT = (SELECT Id FROM  EntityState WHERE Name = 'Deleted')
	
	SELECT T.* FROM [dbo].[Tag] T
	LEFT JOIN [dbo].[ArticleTag] AT ON AT.TagId = T.Id
	WHERE T.EntityState != @DeletedState 
		AND AT.EntityState != @DeletedState 
		AND (@ArticleId IS NULL OR AT.ArticleId = @ArticleId) 
		AND (@CreateDateStart IS NULL OR T.CreateDate >= @CreateDateStart) 
		AND (@CreateDateEnd IS NULL OR T.CreateDate <= @CreateDateEnd) 
		AND (@UpdateDateStart IS NULL OR T.UpdateDate >= @UpdateDateStart) 
		AND (@UpdateDateEnd IS NULL OR T.UpdateDate <= @UpdateDateEnd) 
		AND (@QueryText IS NULL OR (Title like  '%'+@QueryText+'%' OR T.[Description] like '%'+@QueryText+'%'));
			
END;

GO
/****** Object:  StoredProcedure [dbo].[UPD_ARTICLE_SP]    Script Date: 26.04.2020 23:44:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[UPD_ARTICLE_SP]
(
	@Id BIGINT,
	@Title NVARCHAR(200),
	@Content NVARCHAR(MAX),
	@EntityState BIGINT = NULL,
	@State BIGINT,
	@AuthorId BIGINT,
	@CategoryId BIGINT
)
AS
BEGIN
	
	IF @EntityState IS NULL
		SET @EntityState = (Select Id from [dbo].[EntityState] WHERE Name = 'Updated') 
	
	UPDATE [dbo].[Article] 
	SET 
		[Title] = @Title, 
		[Content] = @Content, 
		[AuthorId] = @AuthorId,
		[CategoryId] = @CategoryId,
		[UpdateDate] = GETDATE(),
		[EntityState] = @EntityState,		
		[State] = @State
	WHERE Id = @Id;

	SELECT EntityState FROM [dbo].[Article] WHERE Id = @Id;

END

GO
/****** Object:  StoredProcedure [dbo].[UPD_ARTICLECOMMENT_SP]    Script Date: 26.04.2020 23:44:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[UPD_ARTICLECOMMENT_SP]
(
	@Id BIGINT,
	@EntityState BIGINT = NULL
)
AS
BEGIN

	IF @EntityState IS NULL
		SET @EntityState = (Select Id from [dbo].[EntityState] WHERE Name = 'Updated') 

	UPDATE [dbo].[ArticleComment] 
	SET 
		[UpdateDate] = GETDATE(),
		[EntityState] = @EntityState
	WHERE Id = @Id;

	SELECT EntityState FROM [dbo].[ArticleComment] WHERE Id = @Id;

END




GO
/****** Object:  StoredProcedure [dbo].[UPD_ARTICLETAG_SP]    Script Date: 26.04.2020 23:44:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[UPD_ARTICLETAG_SP]
(
	@Id BIGINT,	
	@EntityState BIGINT = NULL
)
AS
BEGIN

	IF @EntityState IS NULL
		SET @EntityState = (Select Id from [dbo].[EntityState] WHERE Name = 'Updated') 

	UPDATE [dbo].[ArticleTag] 
	SET  
		[UpdateDate] = GETDATE(),
		[EntityState] = @EntityState
	WHERE Id = @Id;

	SELECT EntityState FROM [dbo].[ArticleTag] WHERE Id = @Id;

END




GO
/****** Object:  StoredProcedure [dbo].[UPD_AUTHOR_SP]    Script Date: 26.04.2020 23:44:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[UPD_AUTHOR_SP]
(	
	@Id BIGINT,
	@FirstName NVARCHAR(100), 
	@MiddleName NVARCHAR(100),
	@LastName NVARCHAR(100),
	@BirthDate DATETIME, 
	@Email NVARCHAR(100), 
	@Phone NVARCHAR(100),
	@About NVARCHAR(100),
	@EntityState BIGINT = NULL
)
AS
BEGIN

	IF @EntityState IS NULL
		SET @EntityState = (Select Id from [dbo].[EntityState] WHERE Name = 'Updated') 

	UPDATE [dbo].[Author]
    SET [FirstName] = @FirstName
      ,[MiddleName] = @MiddleName 
	  ,[LastName] = @LastName
      ,[BirthDate] = @BirthDate
      ,[Email] = @Email
      ,[Phone] = @Phone
	  ,[About] = @About
	  ,[EntityState] = @EntityState
	WHERE Id = @Id;

	SELECT EntityState FROM [dbo].[Author] WHERE Id = @Id;		

END

GO
/****** Object:  StoredProcedure [dbo].[UPD_CATEGORY_SP]    Script Date: 26.04.2020 23:44:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[UPD_CATEGORY_SP]
(
	@Id BIGINT,
	@Header NVARCHAR(100),
	@Description NVARCHAR(200),
	@EntityState BIGINT = NULL
)
AS
BEGIN

	IF @EntityState IS NULL
		SET @EntityState = (Select Id from [dbo].[EntityState] WHERE Name = 'Updated') 

	UPDATE [dbo].[Category]
	SET 
		Header = @Header, 
		[Description] = @Description, 
		[UpdateDate] = GETDATE(),
		[EntityState] = @EntityState
	WHERE Id = @Id;

	SELECT EntityState FROM [dbo].[Category] WHERE Id = @Id;

END




GO
/****** Object:  StoredProcedure [dbo].[UPD_COMMENT_SP]    Script Date: 26.04.2020 23:44:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[UPD_COMMENT_SP]
(
	@Id BIGINT,
	@Content NVARCHAR(MAX),
	@EntityState BIGINT = NULL 
)
AS
BEGIN

	IF @EntityState IS NULL
		SET @EntityState = (Select Id from [dbo].[EntityState] WHERE Name = 'Updated') 

	UPDATE [dbo].[Comment]
	SET 
		Content = @Content,
		[UpdateDate] = GETDATE(),
		[EntityState] = @EntityState
	WHERE Id = @Id;

	SELECT EntityState FROM [dbo].[Comment] WHERE Id = @Id;

END




GO
/****** Object:  StoredProcedure [dbo].[UPD_ENTITYSTATE_SP]    Script Date: 26.04.2020 23:44:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE PROCEDURE [dbo].[UPD_ENTITYSTATE_SP]
AS
BEGIN 	
	RAISERROR (15600,-1,-1, 'UPDATE ENTITYSTATE COULD NOT BE DONE.');  
END




GO
/****** Object:  StoredProcedure [dbo].[UPD_STATE_SP]    Script Date: 26.04.2020 23:44:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[UPD_STATE_SP]
(
	@Id BIGINT,
	@Name NVARCHAR(100),
	@Description  NVARCHAR(200),
	@EntityState BIGINT = NULL
)
AS
BEGIN

	IF @EntityState IS NULL
		SET @EntityState = (Select Id from [dbo].[EntityState] WHERE Name = 'Updated') 

	UPDATE [dbo].[State]
	SET 
		[Name] = @Name, 
		[Description] = @Description, 
		[UpdateDate] = GETDATE(),
		[EntityState] = @EntityState
	WHERE Id = @Id;

	SELECT EntityState FROM [dbo].[State] WHERE Id = @Id;

END




GO
/****** Object:  StoredProcedure [dbo].[UPD_TAG_SP]    Script Date: 26.04.2020 23:44:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[UPD_TAG_SP]
(
	@Id BIGINT,
	@Title NVARCHAR(100),
	@Description  NVARCHAR(100),
	@EntityState BIGINT = NULL
)
AS
BEGIN

	IF @EntityState IS NULL
		SET @EntityState = (Select Id from [dbo].[EntityState] WHERE Name = 'Updated') 

	UPDATE [dbo].[Tag]
	SET 
		Title = @Title, 
		[Description] = @Description, 
		[UpdateDate] = GETDATE(),
		[EntityState] = @EntityState
	WHERE Id = @Id;

	SELECT EntityState FROM [dbo].[Tag] WHERE Id = @Id;

END




GO
USE [master]
GO
ALTER DATABASE [ArticleAssignment] SET  READ_WRITE 
GO


USE [ArticleAssignment]
GO
INSERT [dbo].[EntityState] ([Id], [Name], [Description]) VALUES (1, N'Created', N'Created.Not Updated yet.')
GO
INSERT [dbo].[EntityState] ([Id], [Name], [Description]) VALUES (2, N'Updated', N'Updated.')
GO
INSERT [dbo].[EntityState] ([Id], [Name], [Description]) VALUES (3, N'Deleted', N'Deleted.')
GO
INSERT [dbo].[State] ([Id], [Name], [Description], [CreateDate], [UpdateDate], [EntityState]) VALUES (1, N'Waiting', N'Wating for Editor Check', GETDATE(), NULL, 1)
GO
INSERT [dbo].[State] ([Id], [Name], [Description], [CreateDate], [UpdateDate], [EntityState]) VALUES (2, N'Checking', N'Editor Checking', GETDATE(), NULL, 1)
GO
INSERT [dbo].[State] ([Id], [Name], [Description], [CreateDate], [UpdateDate], [EntityState]) VALUES (3, N'Approved', N'Editor Approved. Article published.', GETDATE(), NULL, 1)
GO
INSERT [dbo].[State] ([Id], [Name], [Description], [CreateDate], [UpdateDate], [EntityState]) VALUES (4, N'Rejected', N'Editor Rejected. Article not published.', GETDATE(), NULL, 1)
GO

