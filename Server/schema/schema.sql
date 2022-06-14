
-- DROP DATABASE ;
CREATE DATABASE redshift;

USE BAE;

CREATE TABLE citizen (
   citizenID VARCHAR(255) PRIMARY KEY,
   forename VARCHAR(255),
   surname VARCHAR(255),
   homeAddress VARCHAR(255),
   dateOfBirth VARCHAR(255),
   placeOfBirth VARCHAR(255),
   sex VARCHAR(255)
);

CREATE TABLE passport (
passportNumber VARCHAR(255),
surname VARCHAR(255),
forename VARCHAR(255),
nationality VARCHAR(255),
dateOfBirth VARCHAR(255),
sex VARCHAR(255),
placeOfBirth VARCHAR(255),
issuingCountry VARCHAR(255),
dateOfIssue VARCHAR(255),
dateOfExpiry VARCHAR(255)
);

CREATE TABLE anprcamera (
    anprId VARCHAR(255) PRIMARY KEY,
    streetName VARCHAR(255),
    latitude VARCHAR(255),
    longitude VARCHAR(255)
);

CREATE TABLE atmpoint (
    atmId VARCHAR(255),
    operator VARCHAR(255),
    streetName VARCHAR(255),
    postcode VARCHAR(255),
    latitude VARCHAR(255),
    longitude VARCHAR(255)
);

CREATE TABLE bankcard (
  bankcardId VARCHAR(255),
  cardNumber VARCHAR(255),
  sortCode VARCHAR(255),
  bankAccountId VARCHAR(255),
  accountNumber VARCHAR(255),
  bank VARCHAR(255)
);


CREATE TABLE IF NOT EXISTS vehicleRegistration (
registrationID varchar(255),
registrationDate varchar(255),
vehRegNo varchar(255),
make varchar(255),
model varchar(255),
colour varchar(255),
forename varchar(255),
lastname varchar(255),
address varchar(255),
dateOfBirth varchar(255),
driverLicenceID varchar(255),
PRIMARY KEY(vehRegNo)
);

CREATE TABLE IF NOT EXISTS vehicleObservations (
ANPRPointId varchar(255),
vehicleRegistrationNumber varchar(255),
timestamp varchar(255),
);

CREATE TABLE IF NOT EXISTS peoplemobile (
forename varchar(255),
surname varchar(255),
dateOfBirth varchar(255),
address varchar(255),
mobileNumber varchar(255),
network varchar(255),
PRIMARY KEY (mobileNumber)
);

CREATE TABLE IF NOT EXISTS celltower(
    cellTower varchar(255),
    operator varchar(255),
    cellType varchar(255),
    latitude varchar(255),
    longitude varchar(255)
);

CREATE TABLE IF NOT EXISTS epos (
    id varchar(255),
    vendor varchar(255),
    streetName varchar(255),
    postcode varchar(255),
    latitude varchar(255),
    longitude varchar(255)
);

CREATE TABLE IF NOT EXISTS peoplebankaccount (
bankAccountId varchar(255),
accountNumber varchar(255),
bank varchar(255),
forename varchar(255),
surname varchar(255),
dateOfBirth varchar(255),
homeAddress varchar(255),
PRIMARY KEY (accountNumber)
);

CREATE TABLE IF NOT EXISTS atmTransaction (
    timestamp VARCHAR(255),
    atmId VARCHAR (255),
    bankCardNumber VARCHAR (255),
    typeAtm VARCHAR (255),
    amount VARCHAR (255)
);
CREATE TABLE IF NOT EXISTS mobileCallRecords (
timestamp varchar(255),
callerMSISDN varchar(255),
callCellTowerId varchar(255),
receiverMSISDN varchar(255),
receiverTowerId varchar(255),
FOREIGN KEY (receiverMSISDN) REFERENCES peoplemobile(mobileNumber)
);


CREATE TABLE IF NOT EXISTS eposTransactions (
    timestamp varchar(255),
    eposId varchar(255),
    bankCardNumber varchar(255),
    payeeAccount varchar(255),
    amount varchar(255)
)















