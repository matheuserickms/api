-- CreateTable
CREATE TABLE `anamneses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `patient_id` INTEGER NULL,
    `consultation_reason` TEXT NULL,
    `medical_history` TEXT NULL,
    `psychological_history` TEXT NULL,
    `family_history` TEXT NULL,
    `disorder_history` TEXT NULL,
    `significant_events` TEXT NULL,
    `interpersonal_relationships` TEXT NULL,
    `behavioral_development` TEXT NULL,
    `emotional_development` TEXT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` TIMESTAMP(0) NULL,

    INDEX `patient_id`(`patient_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `appointments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `appointment_date` DATETIME(0) NOT NULL,
    `status_id` INTEGER NULL,
    `notes` TEXT NULL,
    `patient_id` INTEGER NULL,
    `professor_id` INTEGER NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` TIMESTAMP(0) NULL,

    INDEX `status_id`(`status_id`),
    INDEX `patient_id`(`patient_id`),
    INDEX `professor_id`(`professor_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `appointmentsaudit` (
    `audit_id` INTEGER NOT NULL AUTO_INCREMENT,
    `id` INTEGER NULL,
    `appointment_date` DATETIME(0) NULL,
    `status_id` INTEGER NULL,
    `notes` TEXT NULL,
    `patient_id` INTEGER NULL,
    `professor_id` INTEGER NULL,
    `operation_type` ENUM('INSERT', 'UPDATE', 'DELETE') NULL,
    `operation_timestamp` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `performed_by` VARCHAR(100) NULL,

    PRIMARY KEY (`audit_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `appointmentstatuses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status_name` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `status_name`(`status_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `clinicalrecords` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `patient_id` INTEGER NULL,
    `diagnosis` TEXT NULL,
    `previous_treatments` TEXT NULL,
    `session_notes` TEXT NULL,
    `patient_progress` TEXT NULL,
    `intervention_strategy` TEXT NULL,
    `observations` TEXT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` TIMESTAMP(0) NULL,

    INDEX `patient_id`(`patient_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `consultations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `duration` INTEGER NOT NULL,
    `type_id` INTEGER NULL,
    `status_id` INTEGER NULL,
    `schedule` DATETIME(0) NOT NULL,
    `observations` TEXT NULL,
    `appointment_id` INTEGER NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` TIMESTAMP(0) NULL,

    INDEX `appointment_id`(`appointment_id`),
    INDEX `status_id`(`status_id`),
    INDEX `type_id`(`type_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `consultationsaudit` (
    `audit_id` INTEGER NOT NULL AUTO_INCREMENT,
    `id` INTEGER NULL,
    `duration` INTEGER NULL,
    `type_id` INTEGER NULL,
    `status_id` INTEGER NULL,
    `schedule` DATETIME(0) NULL,
    `observations` TEXT NULL,
    `appointment_id` INTEGER NULL,
    `operation_type` ENUM('INSERT', 'UPDATE', 'DELETE') NULL,
    `operation_timestamp` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `performed_by` VARCHAR(100) NULL,

    PRIMARY KEY (`audit_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `consultationstatuses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status_name` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `status_name`(`status_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `consultationtypes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type_name` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `type_name`(`type_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notifications` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type_id` INTEGER NULL,
    `send_date` DATETIME(0) NOT NULL,
    `content` TEXT NOT NULL,
    `recipient_id` INTEGER NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` TIMESTAMP(0) NULL,

    INDEX `type_id`(`type_id`),
    INDEX `recipient_id`(`recipient_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notificationtypes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type_name` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `type_name`(`type_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `patients` (
    `id` INTEGER NOT NULL,
    `allergies` TEXT NULL,
    `medical_conditions` TEXT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `professors` (
    `id` INTEGER NOT NULL,
    `professional_registration` VARCHAR(20) NOT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `students` (
    `id` INTEGER NOT NULL,
    `registration` VARCHAR(20) NOT NULL,
    `semester` INTEGER NOT NULL,
    `advisor_id` INTEGER NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` TIMESTAMP(0) NULL,

    INDEX `advisor_id`(`advisor_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cpf` VARCHAR(11) NULL,
    `name` VARCHAR(100) NOT NULL,
    `phone` VARCHAR(15) NULL,
    `email` VARCHAR(100) NULL,
    `address` VARCHAR(255) NULL,
    `complement` VARCHAR(100) NULL,
    `number` VARCHAR(10) NULL,
    `zip_code` VARCHAR(9) NULL,
    `birth_date` DATE NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` TIMESTAMP(0) NULL,

    UNIQUE INDEX `cpf`(`cpf`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usersaudit` (
    `audit_id` INTEGER NOT NULL AUTO_INCREMENT,
    `id` INTEGER NULL,
    `cpf` VARCHAR(11) NULL,
    `name` VARCHAR(100) NULL,
    `phone` VARCHAR(15) NULL,
    `email` VARCHAR(100) NULL,
    `address` VARCHAR(255) NULL,
    `complement` VARCHAR(100) NULL,
    `number` VARCHAR(10) NULL,
    `zip_code` VARCHAR(9) NULL,
    `birth_date` DATE NULL,
    `password` VARCHAR(255) NULL,
    `operation_type` ENUM('INSERT', 'UPDATE', 'DELETE') NULL,
    `operation_timestamp` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `performed_by` VARCHAR(100) NULL,

    PRIMARY KEY (`audit_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `anamneses` ADD CONSTRAINT `anamneses_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `appointments` ADD CONSTRAINT `appointments_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `appointments` ADD CONSTRAINT `appointments_ibfk_2` FOREIGN KEY (`professor_id`) REFERENCES `professors`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `appointments` ADD CONSTRAINT `appointments_ibfk_4` FOREIGN KEY (`status_id`) REFERENCES `appointmentstatuses`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `clinicalrecords` ADD CONSTRAINT `clinicalrecords_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `consultations` ADD CONSTRAINT `consultations_ibfk_1` FOREIGN KEY (`appointment_id`) REFERENCES `appointments`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `consultations` ADD CONSTRAINT `consultations_ibfk_2` FOREIGN KEY (`type_id`) REFERENCES `consultationtypes`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `consultations` ADD CONSTRAINT `consultations_ibfk_3` FOREIGN KEY (`status_id`) REFERENCES `consultationstatuses`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `notifications` ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`recipient_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `notifications` ADD CONSTRAINT `notifications_ibfk_2` FOREIGN KEY (`type_id`) REFERENCES `notificationtypes`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `patients` ADD CONSTRAINT `patients_ibfk_1` FOREIGN KEY (`id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `professors` ADD CONSTRAINT `professors_ibfk_1` FOREIGN KEY (`id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `students` ADD CONSTRAINT `students_ibfk_1` FOREIGN KEY (`id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `students` ADD CONSTRAINT `students_ibfk_2` FOREIGN KEY (`advisor_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
