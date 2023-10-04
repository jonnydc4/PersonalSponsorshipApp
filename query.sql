CREATE TABLE Tag (
    TagID INT PRIMARY KEY AUTO_INCREMENT,
    TagName VARCHAR(50) NOT NULL
);

CREATE TABLE User (
    username VARCHAR(100) PRIMARY KEY,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL, -- Consider hashing passwords!
    email VARCHAR(255) NOT NULL UNIQUE,
    TagID INT,
    FOREIGN KEY (TagID) REFERENCES Tag(TagID)
);

CREATE TABLE Company (
    CompanyID INT PRIMARY KEY AUTO_INCREMENT,
    contactInfo TEXT,
    username VARCHAR(100),
    FOREIGN KEY (username) REFERENCES User(username)
);

CREATE TABLE Influencer (
    BrandName VARCHAR(255) PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    FOREIGN KEY (username) REFERENCES User(username)
);
