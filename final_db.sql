-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema final_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema final_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `final_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `final_db` ;

-- -----------------------------------------------------
-- Table `final_db`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `final_db`.`users` (
  `user_id` INT NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(15) NOT NULL DEFAULT '1234567890',
  `department` VARCHAR(50) NULL DEFAULT NULL,
  `last_login` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `account_status` TINYINT NULL DEFAULT NULL,
  `address_street` VARCHAR(45) NULL DEFAULT NULL,
  `city` VARCHAR(45) NULL DEFAULT NULL,
  `state` VARCHAR(45) NULL DEFAULT NULL,
  `gender` ENUM('male', 'female') NULL DEFAULT NULL,
  `dob` DATE NOT NULL DEFAULT '2000-01-01',
  `about` TEXT NULL DEFAULT NULL,
  `photo_url` VARCHAR(255) NULL DEFAULT NULL,
  `token` VARCHAR(255) NULL DEFAULT NULL,
  `reset_pass_expires` DATETIME NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `accountType` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `email` (`email` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `final_db`.`academic_details`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `final_db`.`academic_details` (
  `academic_id` INT NOT NULL,
  `user_id` INT NULL DEFAULT NULL,
  `class` VARCHAR(45) NULL DEFAULT NULL,
  `specialization` VARCHAR(100) NULL DEFAULT NULL,
  `institute` VARCHAR(255) NULL DEFAULT NULL,
  `board` VARCHAR(255) NULL DEFAULT NULL,
  `yop` INT NULL DEFAULT NULL,
  `percentage` DECIMAL(5,2) NULL DEFAULT NULL,
  `certificate_url` VARCHAR(255) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`academic_id`),
  INDEX `user_id` (`user_id` ASC) VISIBLE,
  CONSTRAINT `academic_details_ibfk_1`
    FOREIGN KEY (`user_id`)
    REFERENCES `final_db`.`users` (`user_id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `final_db`.`academic_gaps`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `final_db`.`academic_gaps` (
  `gap_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NULL DEFAULT NULL,
  `gap_duration` INT NULL DEFAULT NULL,
  `reason` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`gap_id`),
  INDEX `user_id` (`user_id` ASC) VISIBLE,
  CONSTRAINT `academic_gaps_ibfk_1`
    FOREIGN KEY (`user_id`)
    REFERENCES `final_db`.`users` (`user_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `final_db`.`companies`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `final_db`.`companies` (
  `company_id` INT NOT NULL AUTO_INCREMENT,
  `company_name` VARCHAR(100) NOT NULL,
  `industry` VARCHAR(100) NULL DEFAULT NULL,
  `hr_id` INT NULL DEFAULT NULL,
  `website` VARCHAR(255) NULL DEFAULT NULL,
  `address` VARCHAR(255) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`company_id`),
  INDEX `hr_id` (`hr_id` ASC) VISIBLE,
  CONSTRAINT `companies_ibfk_1`
    FOREIGN KEY (`hr_id`)
    REFERENCES `final_db`.`users` (`user_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 12
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `final_db`.`job_postings`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `final_db`.`job_postings` (
  `job_id` INT NOT NULL AUTO_INCREMENT,
  `job_title` VARCHAR(100) NOT NULL,
  `job_description` TEXT NULL DEFAULT NULL,
  `eligibility` JSON NOT NULL,
  `salary` DECIMAL(10,2) NOT NULL,
  `location` VARCHAR(100) NOT NULL,
  `application_deadline` DATE NOT NULL,
  `application_post_date` DATE NOT NULL,
  `company_id` INT NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `user_id` INT NULL DEFAULT NULL,
  PRIMARY KEY (`job_id`),
  INDEX `company_id_idx` (`company_id` ASC) VISIBLE,
  INDEX `user_id` (`user_id` ASC) VISIBLE,
  CONSTRAINT `company_id`
    FOREIGN KEY (`company_id`)
    REFERENCES `final_db`.`companies` (`company_id`)
    ON DELETE CASCADE,
  CONSTRAINT `job_postings_ibfk_1`
    FOREIGN KEY (`user_id`)
    REFERENCES `final_db`.`users` (`user_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 41
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `final_db`.`applications`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `final_db`.`applications` (
  `application_id` INT NOT NULL AUTO_INCREMENT,
  `job_id` INT NULL DEFAULT NULL,
  `student_id` INT NULL DEFAULT NULL,
  `submission_date` DATE NULL DEFAULT NULL,
  `status` ENUM('pending', 'submitted', 'approved', 'rejected', 'completed') NULL DEFAULT 'submitted',
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`application_id`),
  INDEX `job_id` (`job_id` ASC) VISIBLE,
  INDEX `student_id` (`student_id` ASC) VISIBLE,
  CONSTRAINT `applications_ibfk_1`
    FOREIGN KEY (`job_id`)
    REFERENCES `final_db`.`job_postings` (`job_id`)
    ON DELETE CASCADE,
  CONSTRAINT `applications_ibfk_2`
    FOREIGN KEY (`student_id`)
    REFERENCES `final_db`.`users` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE RESTRICT)
ENGINE = InnoDB
AUTO_INCREMENT = 67
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `final_db`.`contact_us`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `final_db`.`contact_us` (
  `contact_id` INT NOT NULL,
  `full_name` VARCHAR(45) NULL DEFAULT NULL,
  `mobile_no` VARCHAR(255) NULL DEFAULT NULL,
  `email_id` VARCHAR(45) NULL DEFAULT NULL,
  `message` TEXT NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`contact_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `final_db`.`curr_academics`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `final_db`.`curr_academics` (
  `academic_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `degree` VARCHAR(45) NOT NULL,
  `branch` VARCHAR(45) NOT NULL,
  `sgpa` JSON NULL DEFAULT NULL,
  `cgpa` DECIMAL(3,2) NULL DEFAULT NULL,
  `backlogs` INT NULL DEFAULT NULL,
  `resume` BLOB NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`academic_id`),
  INDEX `user_id_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `final_db`.`users` (`user_id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `final_db`.`feedback`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `final_db`.`feedback` (
  `feedback_id` INT NOT NULL AUTO_INCREMENT,
  `company_id` INT NULL DEFAULT NULL,
  `student_id` INT NULL DEFAULT NULL,
  `comments` TEXT NULL DEFAULT NULL,
  `rating` INT NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`feedback_id`),
  INDEX `company_id` (`company_id` ASC) VISIBLE,
  INDEX `student_id` (`student_id` ASC) VISIBLE,
  CONSTRAINT `feedback_ibfk_1`
    FOREIGN KEY (`company_id`)
    REFERENCES `final_db`.`companies` (`company_id`),
  CONSTRAINT `feedback_ibfk_2`
    FOREIGN KEY (`student_id`)
    REFERENCES `final_db`.`users` (`user_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `final_db`.`otp_table`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `final_db`.`otp_table` (
  `email_id` VARCHAR(255) NOT NULL,
  `otp` INT NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `final_db`.`place_details`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `final_db`.`place_details` (
  `place_id` INT NOT NULL,
  `student_id` INT NOT NULL,
  `job_id` INT NOT NULL,
  `offer_letter_no` INT NULL DEFAULT NULL,
  `offer_letter_date` DATE NULL DEFAULT NULL,
  `offer_letter` BLOB NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`place_id`),
  INDEX `student_id_idx` (`student_id` ASC) VISIBLE,
  INDEX `job_id_idx` (`job_id` ASC) VISIBLE,
  CONSTRAINT `job_id`
    FOREIGN KEY (`job_id`)
    REFERENCES `final_db`.`job_postings` (`job_id`),
  CONSTRAINT `student_id`
    FOREIGN KEY (`student_id`)
    REFERENCES `final_db`.`users` (`user_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `final_db`.`placement_schedules`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `final_db`.`placement_schedules` (
  `schedule_id` INT NOT NULL AUTO_INCREMENT,
  `company_id` INT NULL DEFAULT NULL,
  `date` DATE NULL DEFAULT NULL,
  `location` VARCHAR(100) NULL DEFAULT NULL,
  `rounds` INT NULL DEFAULT NULL,
  `coordinator_id` INT NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`schedule_id`),
  INDEX `company_id` (`company_id` ASC) VISIBLE,
  CONSTRAINT `placement_schedules_ibfk_1`
    FOREIGN KEY (`company_id`)
    REFERENCES `final_db`.`companies` (`company_id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 11
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
